import { render, screen, fireEvent } from "@testing-library/react";
import { Main } from "@/components/Main/Main";
import { useRouter } from "next/navigation";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn()
}));

describe("Main", () => {
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

  it("navigates to the GraphiQL page when the button is clicked", () => {
    render(<Main />);

    const graphiqlButton = screen.getByText("go GraphiQL");

    fireEvent.click(graphiqlButton);

    expect(pushMock).toHaveBeenCalledWith("/graphiql");
  });

  it("does not navigate when the RESTFull button is disabled", () => {
    render(<Main />);

    const restfullButton = screen.getByText("go RESTFull");

    expect(restfullButton).toBeDisabled();

    fireEvent.click(restfullButton);

    expect(pushMock).not.toHaveBeenCalledWith("/restfull");
  });
});
