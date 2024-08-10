import { render, screen } from "@testing-library/react";
import DrawResults from "./draw-results";
import {
  INITIAL_DRAW_COUNT,
  POWER_BALL_LABEL,
} from "../../constants/lottery-config";

describe("DrawResults Component", () => {
  it("renders initial state with no draw results and no Powerball", () => {
    const { container } = render(
      <DrawResults drawResults={[]} powerBall={[]} />
    );
    const drawNodes = container.querySelectorAll(".draw-item");
    // Separate the normal draw elements from the Powerball element
    const initialDrawItems = Array.from(drawNodes).slice(0, -1);
    expect(initialDrawItems).toHaveLength(INITIAL_DRAW_COUNT);

    // Check that the initial draw items are empty
    initialDrawItems.forEach((item) => {
      expect(item.textContent).toBe("");
    });

    // Check that the Powerball item is rendered with the label
    const powerBallItem = screen.getByText(POWER_BALL_LABEL);
    expect(powerBallItem).toBeInTheDocument();
  });

  it("renders with provided draw results", () => {
    const drawResults = [1, 2, 3, 4, 5, 6, 7];
    render(<DrawResults drawResults={drawResults} powerBall={[]} />);
    // Check that the draw results are rendered
    drawResults.forEach((result) => {
      const drawItem = screen.getByText(result.toString());
      expect(drawItem).toBeInTheDocument();
    });
    // Check that the Powerball item is rendered with the label
    const powerBallItem = screen.getByText(POWER_BALL_LABEL);
    expect(powerBallItem).toBeInTheDocument();
  });

  it("renders with provided Powerball result", () => {
    const powerBall = [10];
    const { container } = render(
      <DrawResults drawResults={[]} powerBall={powerBall} />
    );

    const drawNodes = container.querySelectorAll(".draw-item");
    // Separate the normal draw elements from the Powerball element
    const initialDrawItems = Array.from(drawNodes).slice(0, -1);
    // Check that the initial draw items are rendered
    expect(initialDrawItems).toHaveLength(INITIAL_DRAW_COUNT);
    // Check that the initial draw items are empty
    initialDrawItems.forEach((item) => {
      expect(item.textContent).toBe("");
    });

    // Check that the Powerball item is rendered with the provided result
    const powerBallItem = screen.getByText(powerBall[0].toString());
    expect(powerBallItem).toBeInTheDocument();
  });

  it("renders with both draw results and Powerball result", () => {
    const drawResults = [1, 2, 3, 4, 5, 6, 7];
    const powerBall = [8];
    render(<DrawResults drawResults={drawResults} powerBall={powerBall} />);

    // Check that the draw results are rendered
    drawResults.forEach((result) => {
      const drawItem = screen.getByText(result.toString());
      expect(drawItem).toBeInTheDocument();
    });

    // Check that the Powerball item is rendered with the provided result
    const powerBallItem = screen.getByText(powerBall[0].toString());
    expect(powerBallItem).toBeInTheDocument();
  });
});
