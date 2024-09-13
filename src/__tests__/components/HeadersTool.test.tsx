import { HeadersTool } from "@/components/playgrounds/graphiql/requestPanel/HeadersTool/HeadersTool";
import { renderWithProviders } from "@/__tests__/setup/testStore";
import { fireEvent, screen } from "@testing-library/react";

const mockedUseAppDispatch = vi.fn();
const mockedSetHeaders = vi.fn();
const mockedRemoveHeaders = vi.fn();

vi.doMock("@/hooks/storeHooks", () => ({
  useAppDispatch: mockedUseAppDispatch
}));

vi.doMock("@/store", () => ({
  setHeaders: mockedSetHeaders,
  removeHeaders: mockedRemoveHeaders
}));

describe("HeadersTool", () => {
  let dispatchMock = vi.fn();

  beforeEach(() => {
    vi.restoreAllMocks();
    dispatchMock = vi.fn();
    mockedUseAppDispatch.mockReturnValue(dispatchMock);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render header text", () => {
    renderWithProviders(<HeadersTool />);
    expect(screen.getByText("headers")).toBeInTheDocument();
  });

  it("should add a new tab when 'add tab' button is clicked", () => {
    renderWithProviders(<HeadersTool />);

    const addTabButton = screen.getByText("add tab");
    fireEvent.click(addTabButton);

    expect(screen.getByPlaceholderText("header key")).toBeInTheDocument();
  });

  it("should toggle open/close state", () => {
    renderWithProviders(<HeadersTool />);

    const addTabButton = screen.getByText("add tab");
    fireEvent.click(addTabButton);

    const toggleButton = screen.getByText("close");
    fireEvent.click(toggleButton);

    expect(screen.queryByPlaceholderText("header key")).not.toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(screen.getByPlaceholderText("header key")).toBeInTheDocument();
  });

  it("should remove a tab when removeTab is called", () => {
    renderWithProviders(<HeadersTool />);

    const addTabButton = screen.getByText("add tab");
    fireEvent.click(addTabButton);

    const removeTabButton = screen.getByText("del");

    fireEvent.click(removeTabButton);

    // Проверяем, что dispatch был вызван с removeHeaders
    // expect(dispatchMock).toHaveBeenCalledWith(
    //   mockedRemoveHeaders(expect.any(Array))
    // );
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });
});
