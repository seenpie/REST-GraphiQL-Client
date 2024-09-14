import { render, screen, fireEvent } from "@testing-library/react";
import { VariablesTool } from "@/components/playgrounds/graphiql/requestPanel/VariablesTool/VariablesTool";
import { useAppDispatch } from "@/hooks/storeHooks";
import { setVariables } from "@/store";
import { vi } from "vitest";
import { renderWithProviders } from "@/__tests__/setup/testStore";

vi.mock("@/hooks/storeHooks");

vi.mock("@/components/playgrounds/graphiql/shared/codemirror", () => ({
  MetadataEditor: ({
    value,
    onChange
  }: {
    value: string;
    onChange: (v: string) => void;
  }) => <textarea value={value} onChange={(e) => onChange(e.target.value)} />
}));

describe("VariablesTool", () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    // Мокаем dispatch перед каждым тестом
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
    vi.clearAllMocks();
  });

  it("renders variables tool text", () => {
    renderWithProviders(<VariablesTool />);

    expect(screen.getByText(/variables tool/i)).toBeInTheDocument();
  });

  it("toggles the MetadataEditor when button is clicked", () => {
    render(<VariablesTool />);

    const toggleButton = screen.getByRole("button", { name: /open/i });

    expect(toggleButton).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();

    fireEvent.click(toggleButton);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /close/i }));

    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("updates input value and dispatches action on change", () => {
    render(<VariablesTool />);

    fireEvent.click(screen.getByRole("button", { name: /open/i }));

    const textarea = screen.getByRole("textbox");

    fireEvent.change(textarea, { target: { value: '{"test": "value"}' } });

    expect(textarea).toHaveValue('{"test": "value"}');
    expect(mockDispatch).toHaveBeenCalledWith(
      setVariables('{"test": "value"}')
    );
  });
});
