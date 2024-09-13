import { renderHook, act } from "@testing-library/react";
import { useResponse } from "@/hooks/useResponse";
import { useSelector } from "react-redux";
import { selectDocs } from "@/store";

vi.mock("react-redux", () => ({
  useSelector: vi.fn()
}));

describe("useResponse", () => {
  beforeEach(() => {
    vi.mocked(useSelector).mockImplementation((selector) => {
      if (selector === selectDocs) {
        return {
          data: { __schema: {} },
          error: null
        };
      }
      return {
        isLoading: false,
        response: { data: "response data" }
      };
    });
  });

  it("should return initial state and Redux data", () => {
    const { result } = renderHook(() => useResponse());

    expect(result.current.isDocsVisible).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.response).toEqual({ data: "response data" });
    expect(result.current.docs).toEqual({ __schema: {} });
    expect(result.current.docsError).toBe(null);
  });

  it("should set docs visibility to true", () => {
    const { result } = renderHook(() => useResponse());

    act(() => {
      result.current.setDocsVisibility();
    });

    expect(result.current.isDocsVisible).toBe(true);
  });

  it("should set result visibility to false", () => {
    const { result } = renderHook(() => useResponse());

    act(() => {
      result.current.setDocsVisibility();
    });
    act(() => {
      result.current.setResultVisibility();
    });

    expect(result.current.isDocsVisible).toBe(false);
  });

  it("should correctly handle docs state", () => {
    vi.mocked(useSelector).mockImplementation((selector) => {
      if (selector === selectDocs) {
        return {
          data: null,
          error: new Error("Failed to load docs")
        };
      }

      return {
        isLoading: false,
        response: { data: "response data" }
      };
    });

    const { result } = renderHook(() => useResponse());

    expect(result.current.docsError).toEqual(new Error("Failed to load docs"));
    expect(result.current.docs).toBeNull();
  });
});
