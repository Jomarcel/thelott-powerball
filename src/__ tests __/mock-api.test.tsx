import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { useQueryClient } from "@tanstack/react-query";
import { HomeView } from "../pages/home/home-view";
import { useLotteryDraws } from "../hooks";

const MOCK_PRIMARY_NUMBERS = [8, 14, 17, 6, 23, 10];
const MOCK_SECONDARY_NUMBERS = [19];

// Mock the useLotteryDraws hook
jest.mock("../hooks/useLotteryDraws", () => ({
  useLotteryDraws: jest.fn(),
}));

// Mock the useQueryClient hook
jest.mock("@tanstack/react-query", () => ({
  useQueryClient: jest.fn(),
}));

describe("HomeView Component", () => {
  const mockQueryClient = {
    resetQueries: jest.fn(),
  };

  beforeEach(() => {
    (useQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders HomeView with initial state and displays correct numbers and buttons on API success", async () => {
    (useLotteryDraws as jest.Mock).mockReturnValue({
      data: {
        PrimaryNumbers: MOCK_PRIMARY_NUMBERS,
        SecondaryNumbers: MOCK_SECONDARY_NUMBERS,
      },
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });

    const { container } = render(
      <SnackbarProvider>
        <HomeView />
      </SnackbarProvider>
    );

    const drawNodes = container.querySelectorAll(".draw-item");

    // Separate the normal draw elements from the Powerball element
    const normalDrawElements = Array.from(drawNodes).slice(0, -1);
    const powerBallElement = drawNodes[drawNodes.length - 1];

    normalDrawElements.forEach((node) => {
      expect(MOCK_PRIMARY_NUMBERS).toContain(parseInt(node.textContent!));
    });

    expect(powerBallElement.textContent).toEqual(
      MOCK_SECONDARY_NUMBERS[0].toString()
    );
    // Check if the AutofillButton and TrashButton are rendered
    expect(
      screen.getByRole("button", { name: /Autofill/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Clear/i })).toBeInTheDocument();
  });

  it("handles API error", async () => {
    (useLotteryDraws as jest.Mock).mockReturnValue({
      data: { PrimaryNumbers: [], SecondaryNumbers: [] },
      isLoading: false,
      isError: true,
      error: new Error("API Error"),
      refetch: jest.fn(),
    });

    await act(async () => {
      render(
        <SnackbarProvider>
          <HomeView />
        </SnackbarProvider>
      );
    });

    // Check if the error message is displayed
    await waitFor(() => {
      expect(screen.getByText("API Error")).toBeInTheDocument();
    });
  });

  it("handles refetch and clear actions", async () => {
    const mockRefetch = jest.fn();
    (useLotteryDraws as jest.Mock).mockReturnValue({
      data: { PrimaryNumbers: [], SecondaryNumbers: [] },
      isLoading: false,
      isError: false,
      refetch: mockRefetch,
    });

    render(
      <SnackbarProvider>
        <HomeView />
      </SnackbarProvider>
    );

    // Trigger the AutofillButton click
    fireEvent.click(screen.getByRole("button", { name: /Autofill/i }));
    expect(mockRefetch).toHaveBeenCalled();

    // Trigger the TrashButton click
    fireEvent.click(screen.getByRole("button", { name: /Clear/i }));
    expect(mockQueryClient.resetQueries).toHaveBeenCalled();
  });
});
