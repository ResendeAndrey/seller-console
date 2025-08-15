// src/components/Select.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useForm } from "react-hook-form";
import Select from ".";

type FormValues = {
  status: string;
};

const renderWithForm = (props?: Partial<FormValues>) => {
  const Wrapper = () => {
    const { control } = useForm<FormValues>({
      defaultValues: { status: props?.status || "" }
    });

    return (
      <Select
        fieldName="status"
        control={control}
        label="Status label"
        options={["New", "Qualified", "Disqualified"]}
        {...props}
      />
    );
  };

  return render(<Wrapper />);
};

describe("Select component", () => {
  it("renders label", () => {
    renderWithForm();
    expect(screen.getByText("Status label")).toBeInTheDocument();
  });

  it("renders options", () => {
    renderWithForm();
    expect(screen.getByText("New")).toBeInTheDocument();
    expect(screen.getByText("Qualified")).toBeInTheDocument();
    expect(screen.getByText("Disqualified")).toBeInTheDocument();
  });

  it("renders error message if provided", () => {
    const Wrapper = () => {
      const { control } = useForm<FormValues>();
      return (
        <Select
          fieldName="status"
          control={control}
          label="Status label"
          options={["New", "Qualified", "Disqualified"]}
          error="This field is required"
        />
      );
    };

    render(<Wrapper />);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });
});
