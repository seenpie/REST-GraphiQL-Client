import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Page404 } from "@/views/Page404/Page404";
import { useRouter } from "next/navigation";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn()
}));

describe("Page404", () => {
  it("should render the 404 page correctly", () => {
    render(<Page404 />);
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("page not found")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /return main page/i })
    ).toBeInTheDocument();
  });

  it("should call router.push('/') when the button is clicked", async () => {
    const pushMock = vi.fn();
    vi.mocked(useRouter).mockReturnValue({
      push: pushMock,
      prefetch: () => {},
      refresh: () => {},
      replace: () => {},
      back: () => {},
      forward: () => {}
    });

    render(<Page404 />);

    const button = screen.getByRole("button", { name: /return main page/i });
    await userEvent.click(button);

    expect(pushMock).toHaveBeenCalledWith("/");
  });
});
