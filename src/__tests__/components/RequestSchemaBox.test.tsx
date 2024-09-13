import { screen, fireEvent } from "@testing-library/react";
import { RequestSchemaBox } from "@/components/playgrounds/graphiql/requestPanel/RequestSchemaBox/RequestSchemaBox";
import { useGraphQlSchema } from "@/hooks/useGraphQlSchema";
import { renderWithProviders } from "@/__tests__/setup/testStore";

vi.mock("@/hooks/useGraphQlSchema");

describe("RequestSchemaBox", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render QueryUrl and Button components", () => {
    vi.mocked(useGraphQlSchema).mockReturnValue({
      getSchema: vi.fn(),
      isSchemaLoading: false,
      url: "123",
      error: undefined
    });

    renderWithProviders(<RequestSchemaBox />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /get schema/i })
    ).toBeInTheDocument();
  });

  it("should disable the button when url is not provided", () => {
    vi.mocked(useGraphQlSchema).mockReturnValue({
      getSchema: vi.fn(),
      isSchemaLoading: false,
      url: "",
      error: undefined
    });

    renderWithProviders(<RequestSchemaBox />);

    const button = screen.getByRole("button", { name: /get schema/i });
    expect(button).toBeDisabled();
  });

  it("should enable the button when url is provided", () => {
    vi.mocked(useGraphQlSchema).mockReturnValue({
      getSchema: vi.fn(),
      isSchemaLoading: false,
      url: "123",
      error: undefined
    });

    renderWithProviders(<RequestSchemaBox />);

    const button = screen.getByRole("button", { name: /get schema/i });
    expect(button).toBeEnabled();
  });

  it("should call getSchema when button is clicked", () => {
    const mockFn = vi.fn();
    vi.mocked(useGraphQlSchema).mockReturnValue({
      getSchema: mockFn,
      isSchemaLoading: false,
      url: "123",
      error: undefined
    });

    renderWithProviders(<RequestSchemaBox />);

    const button = screen.getByRole("button", { name: /get schema/i });

    fireEvent.click(button);

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("should button disable when isSchemaLoading is true", () => {
    vi.mocked(useGraphQlSchema).mockReturnValue({
      getSchema: vi.fn(),
      isSchemaLoading: true,
      url: "123",
      error: undefined
    });

    renderWithProviders(<RequestSchemaBox />);

    const button = screen.getByRole("button", { name: /get schema/i });

    expect(button).toHaveAttribute("disabled");
  });
});
