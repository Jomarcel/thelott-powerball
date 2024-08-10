import { render, screen } from "@testing-library/react";
import { HomePage } from "../pages";
import { POWER_BALL_LABEL, POWERBALL_HEADER } from "../constants";

describe("Lotto Main Page", () => {
  it("renders the correct default state for normal draw elements and Powerball", async () => {
    const { container } = render(<HomePage />);
    // Select all draw elements'
    const drawNodes = container.querySelectorAll(".draw-item");

    // Separate the normal draw elements from the Powerball element
    const normalDrawElements = Array.from(drawNodes).slice(0, -1);
    const powerBallElement = drawNodes[drawNodes.length - 1];

    // Find the Autofill and Clear buttons by their aria-labels
    const autoFillButton = screen.getByRole("button", { name: /Autofill/i });
    const clearButton = screen.getByRole("button", { name: /Clear/i });

    // Get the Powerball heading element by its text content
    const powerBallTitleNode = screen.getByText(POWERBALL_HEADER);

    // Ensure that both Autofill and Clear buttons are rendered and visible
    expect(autoFillButton).toBeVisible();
    expect(clearButton).toBeVisible();

    // Ensure that all normal draw elements are initially empty,
    // while the last element (Powerball) has a text set to "PB".
    normalDrawElements.forEach((node) => {
      expect(node.textContent).toBe("");
    });
    expect(powerBallElement.textContent).toEqual(POWER_BALL_LABEL);
    // Ensure that the powerball heading is visible
    expect(powerBallTitleNode.textContent).toEqual(POWERBALL_HEADER);
    // Total number of displayed draw elements, including the Powerball
    expect(drawNodes.length).toEqual(8);
  });

  it("renders numbers from 1 to 35 in the normal draws section", async () => {
    render(<HomePage />);
    // Get the number of child elements within the section-one element
    const normalDraws = screen.getByTestId("draw-numbers-section");
    const totalNormalDraws = normalDraws.childNodes.length;

    // Verify that there are exactly 35 child elements,
    // corresponding to the numbers from 1 to 35
    normalDraws.childNodes.forEach((el, index) => {
      expect(el.textContent).toEqual(`${index + 1}`);
    });
    expect(totalNormalDraws).toEqual(35);
  });

  it("renders all numbers from 1 to 20 in the normal draws section", async () => {
    render(<HomePage />);
    // Query all child elements within the Powerball section and expect numbers to be in the range of 1 to 20
    const powerBallSection = screen.getByTestId("powerball-numbers-section");
    powerBallSection.childNodes.forEach((el, index) => {
      expect(el.textContent).toEqual(`${index + 1}`);
    });

    // Expect 20 items to be in the document
    const totalPowerBallOptions = powerBallSection.childNodes.length;
    expect(totalPowerBallOptions).toEqual(20);
  });
});
