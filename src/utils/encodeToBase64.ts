export function encodeToBase64(value: string) {
  const encoded = new TextEncoder().encode(value);
  const binString = Array.from(encoded, (byte) =>
    String.fromCodePoint(byte)
  ).join("");
  return btoa(binString);
}
