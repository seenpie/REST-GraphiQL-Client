import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/Footer/Footer";

describe("Footer", () => {
  it("renders GitHub links with correct hrefs", () => {
    render(<Footer />);

    const seenpieLink = screen.getByText("seenpie").closest("a");

    expect(seenpieLink).toHaveAttribute("href", "https://github.com/seenpie");
  });

  it("renders GitHub icons with alt text", () => {
    render(<Footer />);

    const images = screen.getAllByAltText("git_icon");

    expect(images.length).toBe(1);
  });

  it("renders the correct year", () => {
    render(<Footer />);

    const yearItem = screen.getByText("2024");

    expect(yearItem).toBeInTheDocument();
  });
});
