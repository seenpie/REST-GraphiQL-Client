import { encodeToBase64 } from "@/utils/encodeToBase64";

describe("encodeToBase64", () => {
  it("should correctly encode a string to Base64", () => {
    const input = "Hello, World!";
    const expectedOutput = "SGVsbG8sIFdvcmxkIQ==";

    const result = encodeToBase64(input);

    expect(result).toBe(expectedOutput);
  });

  it("should correctly encode an empty string", () => {
    const input = "";
    const expectedOutput = "";
    const result = encodeToBase64(input);

    expect(result).toBe(expectedOutput);
  });

  it("should correctly encode a string with special characters", () => {
    const input = "test123!@#";
    const expectedOutput = "dGVzdDEyMyFAIw==";

    const result = encodeToBase64(input);

    expect(result).toBe(expectedOutput);
  });
});
