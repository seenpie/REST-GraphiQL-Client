import { renderHook, act } from "@testing-library/react";
import { useRequestSchema } from "@/components/playgrounds/graphiql/requestPanel/RequestSchemaBox/RequestSchemaBox.hooks";
import {
  setDocs,
  setDocsError,
  setIsLoading,
  useGetSchemaMutation
} from "@/store";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { useGraphQlRouter } from "@/hooks/useGraphQlRouter";
import { buildClientSchema } from "graphql";
import { GraphQLSchema } from "graphql/type";

vi.mock("@/hooks/storeHooks", () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn()
}));

vi.mock("@/store", () => ({
  selectTab: vi.fn(),
  setDocs: vi.fn(),
  setDocsError: vi.fn(),
  setIsLoading: vi.fn(),
  useGetSchemaMutation: vi.fn()
}));

vi.mock("@/hooks/useGraphQlRouter", () => ({
  useGraphQlRouter: vi.fn()
}));

vi.mock("graphql", () => ({
  buildClientSchema: vi.fn()
}));

describe("useGraphQlSchema", () => {
  const dispatchMock = vi.fn();
  const triggerMock = vi.fn();
  const setParamMock = vi.fn();

  beforeEach(() => {
    vi.restoreAllMocks();

    vi.mocked(useAppDispatch).mockReturnValue(dispatchMock);

    vi.mocked(useAppSelector).mockReturnValue({
      url: "https://test-url.com"
    });

    vi.mocked(useGetSchemaMutation).mockReturnValue([
      triggerMock,
      { data: null, error: null, isLoading: false, reset: () => {} }
    ]);

    vi.mocked(useGraphQlRouter).mockReturnValue({
      setParam: setParamMock
    });
  });

  it("should trigger schema fetch and set parameter", () => {
    const { result } = renderHook(() => useRequestSchema());

    act(() => {
      result.current.getSchema();
    });

    expect(triggerMock).toHaveBeenCalledWith("https://test-url.com");

    expect(setParamMock).toHaveBeenCalledWith(
      "endpoint",
      "https://test-url.com"
    );
  });

  it("should dispatch loading state", () => {
    vi.mocked(useGetSchemaMutation).mockReturnValue([
      triggerMock,
      { data: null, error: null, isLoading: true, reset: () => {} }
    ]);

    renderHook(() => useRequestSchema());

    expect(dispatchMock).toHaveBeenCalledWith(setIsLoading(true));
  });

  it("should dispatch schema when data is available", () => {
    const mockSchema = { data: { __schema: {} } };
    const builtSchema = {};

    vi.mocked(buildClientSchema).mockReturnValue(builtSchema as GraphQLSchema);
    vi.mocked(useGetSchemaMutation).mockReturnValue([
      triggerMock,
      { data: mockSchema, error: null, isLoading: false, reset: () => {} }
    ]);

    renderHook(() => useRequestSchema());

    expect(dispatchMock).toHaveBeenCalledWith(
      setDocs(builtSchema as GraphQLSchema)
    );
    expect(dispatchMock).toHaveBeenCalledWith(setDocsError(null));
  });
});
