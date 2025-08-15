import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import WithHeader from "./withHeader";

vi.mock("../layout/Header", () => ({
  default: () => <div>Mocked Header</div>
}));

describe("WithHeader HOC", () => {
  it("renders Header and wrapped component", () => {
    const MockComponent = ({ text }: { text: string }) => <div>{text}</div>;
    const Wrapped = WithHeader(MockComponent);

    render(<Wrapped text="Hello World" />);

    expect(screen.getByText("Mocked Header")).toBeInTheDocument();

    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });
});
