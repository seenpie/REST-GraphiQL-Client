import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "@/components/Header/Header";
import { useRouter } from "next/navigation";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn()
}));

describe("Header", () => {
  const pushMock = vi.fn();

  beforeEach(() => {
    vi.mocked(useRouter).mockReturnValue({
      push: pushMock,
      prefetch: () => {},
      refresh: () => {},
      replace: () => {},
      back: () => {},
      forward: () => {}
    });
  });

  it("renders with initial English language state", () => {
    render(<Header />);

    expect(screen.getByText("client")).toBeInTheDocument();
    expect(screen.getByText("ru")).toBeInTheDocument();
    expect(screen.getByText("sign in")).toBeInTheDocument();
    expect(screen.getByText("registration")).toBeInTheDocument();
  });

  it("does not navigate when buttons are disabled", () => {
    render(<Header />);

    const signInButton = screen.getByText("sign in");
    const signUpButton = screen.getByText("registration");

    fireEvent.click(signInButton);
    fireEvent.click(signUpButton);

    expect(pushMock).not.toHaveBeenCalled();
  });

  it("buttons are disabled", () => {
    render(<Header />);

    expect(screen.getByText("sign in")).toBeDisabled();
    expect(screen.getByText("registration")).toBeDisabled();
  });
});
