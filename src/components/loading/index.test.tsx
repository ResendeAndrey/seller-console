import { render, screen } from "@testing-library/react";
import Loading from ".";

describe("Testes of Loading Component", () => {
  it("should render a loading", () => {
    render(<Loading />);
    expect(screen.getByTestId("loading-component")).toBeInTheDocument();
  });
});
