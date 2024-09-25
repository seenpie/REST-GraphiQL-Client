import { screen } from "@testing-library/react";
import { MetadataEditor } from "@/components/playgrounds/graphiql/shared/codemirror";
import { describe, it, expect } from "vitest";
import { renderWithProviders } from "@/test/setup/testStore";

describe("MetadataEditor", () => {
  it("renders the MetadataEditor component", () => {
    renderWithProviders(<MetadataEditor value="metadata info" />);
    const editor = screen.getByRole("textbox");
    expect(editor).toBeInTheDocument();
  });

  it("should allow editing", () => {
    renderWithProviders(<MetadataEditor value="metadata info" />);
    const editor = screen.getByRole("textbox");
    expect(editor).toHaveAttribute("contenteditable", "true");
  });
});
