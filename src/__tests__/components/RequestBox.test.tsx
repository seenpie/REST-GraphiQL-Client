import { screen, fireEvent } from "@testing-library/react";
import { RequestBox } from "@/components/playgrounds/graphiql/requestPanel/RequestBox/RequestBox";
import { useRequest } from "@/hooks/useRequest";
import { renderWithProviders } from "@/__tests__/setup/testStore";

vi.mock("@/hooks/useRequest", () => ({
  useRequest: vi.fn()
}));

vi.mock("@/components/playgrounds/graphiql/shared/codemirror", () => ({
  RequestEditor: ({
    value,
    onChange,
    onBlur
  }: {
    value: string;
    onChange: (v: string) => void;
    onBlur: () => void;
  }) => (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
    />
  )
}));

describe("RequestBox", () => {
  const mockSendRequest = vi.fn();
  const mockFixQuery = vi.fn();
  const mockHandleChange = vi.fn();
  const mockHandleBlur = vi.fn();

  beforeEach(() => {
    vi.mocked(useRequest).mockReturnValue({
      queryValue: "{ query { test } }",
      handleChange: mockHandleChange,
      sendRequest: mockSendRequest,
      handleBlur: mockHandleBlur,
      globalLoading: false,
      isSchemaExists: true,
      fixQuery: mockFixQuery
    });

    vi.clearAllMocks();
  });

  it("renders RequestBox with all tools and buttons", () => {
    renderWithProviders(<RequestBox />);

    expect(screen.getByText(/tools/i)).toBeInTheDocument();

    expect(screen.getByText("headers")).toBeInTheDocument();
    expect(screen.getByText("variables tool")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /fix/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /run/i })).toBeInTheDocument();
  });

  it("calls fixQuery when 'fix' button is clicked", () => {
    renderWithProviders(<RequestBox />);

    const fixButton = screen.getByRole("button", { name: /fix/i });

    fireEvent.click(fixButton);

    expect(mockFixQuery).toHaveBeenCalledTimes(1);
  });

  it("calls sendRequest when 'run' button is clicked", () => {
    renderWithProviders(<RequestBox />);

    const runButton = screen.getByRole("button", { name: /run/i });

    fireEvent.click(runButton);

    expect(mockSendRequest).toHaveBeenCalledTimes(1);
  });

  it("calls handleChange when editing the RequestEditor", () => {
    renderWithProviders(<RequestBox />);

    const editor = screen.getByRole("textbox");

    fireEvent.change(editor, {
      target: { value: "{ query { anotherTest } }" }
    });

    expect(mockHandleChange).toHaveBeenCalledWith("{ query { anotherTest } }");
  });

  it("disables 'run' button when queryValue is empty or schema doesn't exist", () => {
    vi.mocked(useRequest).mockReturnValue({
      queryValue: "",
      handleChange: mockHandleChange,
      sendRequest: mockSendRequest,
      handleBlur: mockHandleBlur,
      globalLoading: false,
      isSchemaExists: true,
      fixQuery: mockFixQuery
    });

    renderWithProviders(<RequestBox />);

    const runButton = screen.getByRole("button", { name: /run/i });

    expect(runButton).toBeDisabled();
  });
});
