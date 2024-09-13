import { render, screen, fireEvent } from "@testing-library/react";
import { ResponseBox } from "@/components/playgrounds/graphiql/responsePanel/ResponseBox/ResponseBox";
import { useResponse } from "@/hooks/useResponse";
import { renderWithProviders } from "@/__tests__/setup/testStore";
import { GraphQLSchema } from "graphql/type";

vi.mock("@/hooks/useResponse", () => ({
  useResponse: vi.fn()
}));

vi.mock("@/components/playgrounds/graphiql/shared/codemirror", () => ({
  ResponseEditor: ({ value }: { value: string }) => (
    <textarea value={value} readOnly />
  )
}));

vi.mock(
  "@/components/playgrounds/graphiql/responsePanel/docs/DocsSchema/DocsSchema",
  () => ({
    DocsSchema: () => <div>DocsSchema</div>
  })
);

describe("ResponseBox", () => {
  const mockSetDocsVisibility = vi.fn();
  const mockSetResultVisibility = vi.fn();

  beforeEach(() => {
    vi.mocked(useResponse).mockReturnValue({
      setDocsVisibility: mockSetDocsVisibility,
      setResultVisibility: mockSetResultVisibility,
      isLoading: false,
      docs: null,
      isDocsVisible: false,
      docsError: null,
      response: { status: 200, data: "{ data: 'response' }" }
    });

    vi.clearAllMocks();
  });

  it("renders ResponseBox with response data", () => {
    renderWithProviders(<ResponseBox />);

    expect(screen.getByRole("button", { name: /result/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /schema/i })).toBeInTheDocument();

    expect(screen.getByText(/status 200/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveValue("{ data: 'response' }");
  });

  it("renders DocsSchema when isDocsVisible is true", () => {
    vi.mocked(useResponse).mockReturnValueOnce({
      setDocsVisibility: mockSetDocsVisibility,
      setResultVisibility: mockSetResultVisibility,
      isLoading: false,
      docs: null,
      isDocsVisible: true,
      docsError: null,
      response: { status: 200, data: "{ data: 'response' }" }
    });

    renderWithProviders(<ResponseBox />);

    expect(screen.getByText("DocsSchema")).toBeInTheDocument();
  });

  it("renders loading state when isLoading is true", () => {
    vi.mocked(useResponse).mockReturnValueOnce({
      setDocsVisibility: mockSetDocsVisibility,
      setResultVisibility: mockSetResultVisibility,
      isLoading: true,
      docs: null,
      isDocsVisible: false,
      docsError: null,
      response: { status: 200, data: "{ data: 'response' }" }
    });

    renderWithProviders(<ResponseBox />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders error message when docsError exists", () => {
    vi.mocked(useResponse).mockReturnValueOnce({
      setDocsVisibility: mockSetDocsVisibility,
      setResultVisibility: mockSetResultVisibility,
      isLoading: false,
      docs: null,
      isDocsVisible: false,
      docsError: { message: "Error loading docs", name: "Error loading docs" },
      response: { status: 200, data: "{ data: 'response' }" }
    });

    renderWithProviders(<ResponseBox />);

    expect(screen.getByText("Error loading docs")).toBeInTheDocument();
  });

  it("calls setDocsVisibility and setResultVisibility on button clicks", () => {
    vi.mocked(useResponse).mockReturnValueOnce({
      setDocsVisibility: mockSetDocsVisibility,
      setResultVisibility: mockSetResultVisibility,
      isLoading: false,
      docs: {} as GraphQLSchema,
      isDocsVisible: true,
      docsError: null,
      response: { status: 200, data: "{ data: 'response' }" }
    });

    renderWithProviders(<ResponseBox />);

    const resultButton = screen.getByRole("button", { name: /result/i });
    const schemaButton = screen.getByRole("button", { name: /schema/i });

    fireEvent.click(resultButton);
    expect(mockSetResultVisibility).toHaveBeenCalledTimes(1);

    fireEvent.click(schemaButton);
    expect(mockSetDocsVisibility).toHaveBeenCalledTimes(1);
  });

  it("disables schema button if docs is null", () => {
    render(<ResponseBox />);

    const schemaButton = screen.getByRole("button", { name: /schema/i });
    expect(schemaButton).toBeDisabled();
  });
});
