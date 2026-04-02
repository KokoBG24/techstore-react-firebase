import { render, screen } from "@testing-library/react";
import AdminProductsPage from "./AdminProductsPage";

describe("AdminProductsPage Integration", () => {
  test("renders admin title after loading", async () => {
    render(<AdminProductsPage />);

    const title = await screen.findByText(/Админ:/i);
    expect(title).toBeInTheDocument();
  });
});
export {};