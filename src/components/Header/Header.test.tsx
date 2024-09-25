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

    expect(screen.getByText("seenGraphQl")).toBeInTheDocument();
    expect(screen.getByText("sign in")).toBeInTheDocument();
    expect(screen.getByText("sign up")).toBeInTheDocument();
  });

  it("navigates to sign in page on button click", () => {
    render(<Header />);

    const signInButton = screen.getByRole("button", { name: "sign in" });
    fireEvent.click(signInButton);

    expect(pushMock).toHaveBeenCalledWith("/signin");
  });

  it("navigates to sign up page on button click", () => {
    render(<Header />);

    const signUpButton = screen.getByRole("button", { name: "sign up" });
    fireEvent.click(signUpButton);

    expect(pushMock).toHaveBeenCalledWith("/signup");
  });
});
