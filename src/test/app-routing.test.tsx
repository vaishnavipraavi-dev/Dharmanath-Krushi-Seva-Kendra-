import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { App } from "@/App";

function open(path: string) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

beforeEach(() => localStorage.clear());

describe("React Router pages", () => {
  it.each([
    ["/", /Growing Better Farms/],
    ["/about", /Rooted in Agriculture/],
    ["/products", /Good Things Start/],
    ["/products/vegetable-seeds", /Vegetable Seeds/],
    ["/crop-solutions", /Different Crops/],
    ["/gallery", /The Beauty Behind/],
    ["/contact", /Let's Connect/],
    ["/privacy", /Your Information/],
    ["/terms", /A Clear Starting Point/],
    ["/missing-page", /Page not found/],
    ["/products/missing-product", /Page not found/],
  ])("renders %s directly", async (path, title) => {
    open(path as string);
    expect(await screen.findByRole("heading", { level: 1, name: title })).toBeInTheDocument();
    expect(document.title).toContain("Dharmanath Krushi Seva Kendra");
  });

  it("filters by URL category and searches within that category", async () => {
    open("/products?cat=seeds");
    const cards = await screen.findAllByRole("article");
    expect(cards).toHaveLength(2);
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "vegetable" } });
    expect(screen.getAllByRole("article")).toHaveLength(1);
    expect(screen.getByRole("article")).toHaveTextContent("Vegetable Seeds");
  });

  it("keeps category navigation in the app and clears filters", async () => {
    open("/products");
    await screen.findByRole("heading", { level: 1 });
    const main = within(document.querySelector("main")!);
    fireEvent.click(main.getByRole("link", { name: "Seeds & Sowing Essentials" }));
    await waitFor(() => expect(screen.getAllByRole("article")).toHaveLength(2));
    fireEvent.click(main.getByRole("link", { name: "All Products" }));
    await waitFor(() => expect(screen.getAllByRole("article")).toHaveLength(8));
  });

  it("selects crops from the URL", async () => {
    open("/crop-solutions?crop=fruits");
    await screen.findByRole("heading", { level: 1 });
    expect(screen.getAllByRole("heading", { level: 2, name: "Fruits" })).toHaveLength(2);
  });

  it("prefills a product enquiry and validates contact details", async () => {
    open("/contact?product=vegetable-seeds");
    expect(await screen.findByLabelText(/Product requirement/)).toHaveValue("Vegetable Seeds");
    expect(screen.getByLabelText(/Product category/)).toHaveValue("seeds");
    fireEvent.click(screen.getByRole("button", { name: "Send Enquiry" }));
    expect(
      await screen.findByText("Enter a valid 10-digit Indian mobile number."),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Full name/)).toHaveFocus();
  });
});
