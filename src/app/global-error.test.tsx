import GlobalError from "@/app/global-error";
import { fireEvent, render, screen } from "@testing-library/react";

vi.spyOn(console, "error").mockImplementation(() => {});

describe("GlobalError component", () => {
  it("renders correctly with an error message", () => {
    const mockError = new Error("Test error");
    const mockReset = vi.fn();

    render(<GlobalError error={mockError} reset={mockReset} />);

    expect(screen.getByText("Something went wrong!")).toBeInTheDocument();

    const button = screen.getByRole("button", { name: /try again/i });
    expect(button).toBeInTheDocument();
  });

  it("logs the error to the console", () => {
    const mockError = new Error("Test error");
    const mockReset = vi.fn();

    render(<GlobalError error={mockError} reset={mockReset} />);

    expect(console.error).toHaveBeenCalledWith(
      "LOG: This error was caught by Error Boundary",
      mockError
    );
  });

  it("calls the reset function when Try again button is clicked", () => {
    const mockError = new Error("Test error");
    const mockReset = vi.fn();

    render(<GlobalError error={mockError} reset={mockReset} />);

    const button = screen.getByRole("button", { name: /try again/i });
    fireEvent.click(button);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });
});
