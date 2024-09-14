import { renderHook, act } from "@testing-library/react";
import { useRequest } from "@/hooks/useRequest";
import { useAppDispatch } from "@/hooks/storeHooks";
import {
  selectDocs,
  setIsLoading,
  setQuery,
  setResponse,
  useGetResponseMutation
} from "@/store";
import { useSelector } from "react-redux";
import { useGraphQlRouter } from "@/hooks/useGraphQlRouter";
import { prettify } from "@/utils/prettify";

// Мокаем необходимые функции
vi.mock("react-redux", () => ({
  useSelector: vi.fn()
}));

vi.mock("@/hooks/storeHooks", () => ({
  useAppDispatch: vi.fn()
}));

vi.mock("@/store", () => ({
  selectTab: vi.fn(),
  selectDocs: vi.fn(),
  setIsLoading: vi.fn(),
  setQuery: vi.fn(),
  setResponse: vi.fn(),
  useGetResponseMutation: vi.fn()
}));

vi.mock("@/hooks/useGraphQlRouter", () => ({
  useGraphQlRouter: vi.fn()
}));

vi.mock("@/utils/prettify", () => ({
  prettify: vi.fn()
}));

describe("useRequest", () => {
  const dispatchMock = vi.fn();
  const triggerMock = vi.fn();
  const setParamMock = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();

    vi.mocked(useAppDispatch).mockReturnValue(dispatchMock);

    vi.mocked(useSelector).mockImplementation((selector) => {
      if (selector === selectDocs) {
        return { data: { __schema: {} } };
      }

      return {
        url: "http://test-url.com",
        query: "query {}",
        headers: [{ key: "Authorization", value: "Bearer token" }],
        variables: '{"id":1}',
        isLoading: false
      };
    });

    vi.mocked(useGetResponseMutation).mockReturnValue([
      triggerMock,
      { data: null, error: null, isLoading: false, reset: () => {} }
    ]);

    vi.mocked(useGraphQlRouter).mockReturnValue({
      setParam: setParamMock
    });

    vi.mocked(prettify).mockResolvedValue("query {}");
  });

  it("should send GraphQL request and set parameters", () => {
    const { result } = renderHook(() => useRequest());

    act(() => {
      result.current.sendRequest();
    });

    expect(setParamMock).toHaveBeenCalledWith("body", "query {}", {
      headers: { Authorization: "Bearer token" },
      variables: { id: 1 }
    });

    expect(triggerMock).toHaveBeenCalledWith({
      url: "http://test-url.com",
      query: "query {}",
      headers: { Authorization: "Bearer token" },
      variables: '{"id":1}'
    });
  });

  it("should dispatch loading state when request is in progress", () => {
    vi.mocked(useGetResponseMutation).mockReturnValue([
      triggerMock,
      { data: null, error: null, isLoading: true, reset: () => {} }
    ]);

    renderHook(() => useRequest());

    expect(dispatchMock).toHaveBeenCalledWith(setIsLoading(true));
  });

  it("should handle response data and dispatch setResponse", () => {
    const mockData = { data: "response" };

    vi.mocked(useGetResponseMutation).mockReturnValue([
      triggerMock,
      { data: mockData, error: null, isLoading: false, reset: () => {} }
    ]);

    renderHook(() => useRequest());

    expect(dispatchMock).toHaveBeenCalledWith(setResponse(mockData));
  });

  it("should handle errors and dispatch setResponse with error data", () => {
    const mockError = { status: 400, data: { message: "Error" } };

    vi.mocked(useGetResponseMutation).mockReturnValue([
      triggerMock,
      { data: null, error: mockError, isLoading: false, reset: () => {} }
    ]);

    renderHook(() => useRequest());

    expect(dispatchMock).toHaveBeenCalledWith(
      setResponse({
        status: 400,
        data: JSON.stringify(mockError.data, null, 2)
      })
    );
  });

  it("should prettify the query and update it", async () => {
    const { result } = renderHook(() => useRequest());

    await act(async () => {
      await result.current.fixQuery();
    });

    // Проверяем, что запрос был "приукрашен" и обновлен
    expect(prettify).toHaveBeenCalledWith("query {}");
    expect(dispatchMock).toHaveBeenCalledWith(setQuery("query {}"));
  });
});
