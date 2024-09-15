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

  it("toggles the language on button click", () => {
    render(<Header />);

    const languageButton = screen.getByRole("button", { name: "ru" });
    fireEvent.click(languageButton);

    expect(languageButton).toHaveTextContent("en");

    fireEvent.click(languageButton);

    expect(languageButton).toHaveTextContent("ru");
  });

  it("navigates to sign in page on button click", () => {
    render(<Header />);

    const signInButton = screen.getByRole("button", { name: "sign in" });
    fireEvent.click(signInButton);

    expect(pushMock).toHaveBeenCalledWith("/signin");
  });

  it("navigates to sign up page on button click", () => {
    render(<Header />);

    const signUpButton = screen.getByRole("button", { name: "registration" });
    fireEvent.click(signUpButton);

    expect(pushMock).toHaveBeenCalledWith("/signup");
  });

  it("renders Russian text when language is toggled", () => {
    render(<Header />);

    const languageButton = screen.getByRole("button", { name: "ru" });
    fireEvent.click(languageButton);

    expect(screen.getByRole("button", { name: "войти" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "зарегистрироваться" })
    ).toBeInTheDocument();
  });
});
