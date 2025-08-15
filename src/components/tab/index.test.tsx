// src/components/Tab.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import Tab from ".";

// Mock do Button, se necessário, mas aqui podemos usar real
// vi.mock("../button", () => ({ default: (props: any) => <button {...props} /> }));

describe("Tab component", () => {
  const tabItems = [
    { name: "Tab1", component: <div>Content 1</div> },
    { name: "Tab2", component: <div>Content 2</div> },
    { name: "Tab3", component: <div>Content 3</div> }
  ];

  it("renders all tab buttons", () => {
    render(<Tab tabItems={tabItems} />);
    tabItems.forEach((tab) => {
      expect(screen.getByText(tab.name)).toBeInTheDocument();
    });
  });

  it("renders content of the first tab by default", () => {
    render(<Tab tabItems={tabItems} />);
    expect(screen.getByText("Content 1")).toBeInTheDocument();
  });

  it("changes active tab and content when a tab is clicked", async () => {
    render(<Tab tabItems={tabItems} />);
    const tab2Button = screen.getByText("Tab2");
    await userEvent.click(tab2Button);

    expect(screen.getByText("Content 2")).toBeInTheDocument();
    expect(screen.queryByText("Content 1")).toBeNull();
  });

  it("renders correct content when clicking multiple tabs", async () => {
    render(<Tab tabItems={tabItems} />);
    await userEvent.click(screen.getByText("Tab3"));
    expect(screen.getByText("Content 3")).toBeInTheDocument();

    await userEvent.click(screen.getByText("Tab1"));
    expect(screen.getByText("Content 1")).toBeInTheDocument();
  });
});
