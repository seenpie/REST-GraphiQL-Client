import { renderWithProviders } from "@/__tests__/setup/testStore";
import { QueryUrl } from "@/components/playgrounds/graphiql/requestPanel";
import { fireEvent, screen } from "@testing-library/react";
import { setUrl } from "@/store";
import { useAppDispatch } from "@/hooks/storeHooks";

vi.mock("@/hooks/storeHooks");

describe("Query Url", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("Should render on the page", () => {
    renderWithProviders(<QueryUrl className="" />);
    expect(screen.queryByRole("textbox")).toBeInTheDocument();
  });

  it("should update input value and dispatch the correct action", () => {
    const mockDispatch = vi.fn();
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);

    const value = "123";

    renderWithProviders(<QueryUrl className="" />);

    const input = screen.getByRole("textbox");

    expect(input).toHaveValue("");

    fireEvent.change(input, { target: { value } });

    expect(input).toHaveValue(value);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(setUrl(value));
  });
});
