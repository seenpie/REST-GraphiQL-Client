import { useDocsSchema } from "@/hooks/useDocsSchema";
import { useAppSelector } from "@/hooks/storeHooks";
import { expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { GraphQLScalarType } from "graphql";

vitest.mock("@/hooks/storeHooks");

describe("useDocsSchema hook", () => {
  const mockSchema = {
    getQueryType: vitest
      .fn()
      .mockReturnValue(new GraphQLScalarType({ name: "Query" })),
    getMutationType: vitest
      .fn()
      .mockReturnValue(new GraphQLScalarType({ name: "Mutation" })),
    getSubscriptionType: vitest
      .fn()
      .mockReturnValue(new GraphQLScalarType({ name: "Subscription" }))
  };

  beforeEach(() => {
    vi.mocked(useAppSelector).mockReturnValue({
      data: mockSchema,
      error: null
    });
  });

  it("should initialize with correct default values", () => {
    const { result } = renderHook(() => useDocsSchema());

    expect(result.current.query).toEqual(mockSchema.getQueryType());
    expect(result.current.mutation).toEqual(mockSchema.getMutationType());
    expect(result.current.subscription).toEqual(
      mockSchema.getSubscriptionType()
    );
    expect(result.current.title).toBe("root");
    expect(result.current.history).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it("should update history and title when push is called", () => {
    const { result } = renderHook(() => useDocsSchema());

    const testData = new GraphQLScalarType({ name: "TestObject" });

    act(() => {
      result.current.push(testData);
    });

    expect(result.current.history.length).toBe(1);
    expect(result.current.history[0].name).toBe("TestObject");
    expect(result.current.title).toBe("root");
  });

  it("should pop history and update title when pop is called", () => {
    const { result } = renderHook(() => useDocsSchema());

    const testData1 = new GraphQLScalarType({ name: "TestObject1" });
    const testData2 = new GraphQLScalarType({ name: "TestObject2" });

    act(() => {
      result.current.push(testData1);
      result.current.push(testData2);
    });

    expect(result.current.history.length).toBe(2);

    act(() => {
      result.current.pop();
    });

    expect(result.current.history.length).toBe(1);
  });

  it("should return error if there is an error in docs", () => {
    vi.mocked(useAppSelector).mockReturnValue({
      data: null,
      error: "Some error"
    });

    const { result } = renderHook(() => useDocsSchema());

    expect(result.current.error).toBe("Some error");
  });

  it("should handle empty schema gracefully", () => {
    vi.mocked(useAppSelector).mockReturnValue({
      data: null,
      error: null
    });

    const { result } = renderHook(() => useDocsSchema());

    expect(result.current.query).toBeNull();
    expect(result.current.mutation).toBeNull();
    expect(result.current.subscription).toBeNull();
  });
});
