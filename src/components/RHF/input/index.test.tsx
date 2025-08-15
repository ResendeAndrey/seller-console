import { render, screen } from "@testing-library/react";
import Input from ".";
import { useForm } from "react-hook-form";

vi.mock("react-hook-form", async () => {
  const actual = await vi.importActual("react-hook-form");
  return {
    ...actual,
    useForm: () => ({
      control: {
        register: vi.fn(),
        setValue: vi.fn(),
        getValues: vi.fn(),
        formState: {
          errors: {}
        }
      },
      handleSubmit: vi.fn(),
      reset: vi.fn(),
      watch: vi.fn()
    }),
    useController: vi.fn().mockReturnValue({
      field: {
        onChange: vi.fn(),
        onBlur: vi.fn(),
        value: "",
        name: "test",
        ref: vi.fn()
      }
    }),
    useFormContext: () => ({
      register: vi.fn(),
      setValue: vi.fn(),
      getValues: vi.fn(),
      formState: {
        errors: {}
      }
    })
  };
});

describe("Input Component", () => {
  it("should render without crashing", () => {
    render(
      <Input fieldName="test" label="Test Input" control={useForm().control} />
    );
    expect(screen.getByText("Test Input")).toBeInTheDocument();
  });
  it("should render rhf input with error message", () => {
    render(
      <Input
        fieldName="test"
        label="Test Input"
        control={useForm().control}
        error="This is an error message"
      />
    );
    expect(screen.getByText("This is an error message")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveClass("border-red-500");
  });
  it("should render rhf input without error message", () => {
    render(
      <Input fieldName="test" label="Test Input" control={useForm().control} />
    );
    expect(
      screen.queryByText("This is an error message")
    ).not.toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveClass("border-gray-300");
  });
});
