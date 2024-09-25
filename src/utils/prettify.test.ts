import { prettify } from "@/utils/prettify";

const formatMock = vi.fn();

vi.doMock("prettier", () => ({
  format: formatMock
}));

describe("prettify", () => {
  beforeEach(() => {
    formatMock.mockClear();
  });

  it("should handle an empty string correctly", async () => {
    const mockQuery = "";
    const expectedFormattedQuery = ""; // Ожидаем, что пустая строка не изменится

    formatMock.mockResolvedValue(expectedFormattedQuery);

    const result = await prettify(mockQuery);

    expect(result).toBe(expectedFormattedQuery);
  });
});
