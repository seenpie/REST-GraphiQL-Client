import { encodeToBase64 } from "@/utils/encodeToBase64";
import { act, renderHook } from "@testing-library/react";
import { useGraphQlRouter } from "@/hooks/useGraphQlRouter";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams
} from "next/navigation";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
  usePathname: vi.fn()
}));

describe("useGraphQlRouter", () => {
  const pushMock = vi.fn();
  let searchParamsMock: URLSearchParams;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useRouter).mockReturnValue({
      push: pushMock,
      prefetch: () => {},
      refresh: () => {},
      replace: () => {},
      back: () => {},
      forward: () => {}
    });

    searchParamsMock = new URLSearchParams("param=value");
    vi.mocked(useSearchParams).mockReturnValue(
      searchParamsMock as ReadonlyURLSearchParams
    );

    vi.mocked(usePathname).mockReturnValue("/test-path");
  });

  it("should update the URL with base64 encoded value", () => {
    const { result } = renderHook(() => useGraphQlRouter());

    act(() => {
      result.current.setParam("query", "myQuery");
    });

    const encodedValue = encodeURIComponent(encodeToBase64("myQuery"));
    expect(pushMock).toHaveBeenCalledWith(
      `/test-path?param=value&query=${encodedValue}`
    );
  });

  it("should set headers and variables when options are passed", () => {
    const { result } = renderHook(() => useGraphQlRouter());

    act(() => {
      result.current.setParam("query", "myQuery", {
        headers: { Authorization: "Bearer token" },
        variables: { id: 1 }
      });
    });

    const encodedValue = encodeURIComponent(encodeToBase64("myQuery"));
    const encodedHeaders = encodeURIComponent(
      JSON.stringify({ Authorization: "Bearer token" })
    ).replace(/%20/g, "+");
    const encodedVariables = encodeURIComponent(JSON.stringify({ id: 1 }));

    expect(pushMock).toHaveBeenCalledWith(
      `/test-path?param=value&query=${encodedValue}&headers=${encodedHeaders}&variables=${encodedVariables}`
    );
  });

  it("should remove headers and variables if null is passed in options", () => {
    const { result } = renderHook(() => useGraphQlRouter());

    act(() => {
      result.current.setParam("query", "myQuery", {
        headers: null,
        variables: null
      });
    });

    const encodedValue = encodeURIComponent(encodeToBase64("myQuery"));
    expect(pushMock).toHaveBeenCalledWith(
      `/test-path?param=value&query=${encodedValue}`
    );
  });
});
