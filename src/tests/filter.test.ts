describe("Category Filter", () => {
  const products = [
    { category: "cpu" },
    { category: "gpu" },
    { category: "cpu" },
  ];

  test("filters cpu category", () => {
    const filtered = products.filter(p => p.category === "cpu");
    expect(filtered.length).toBe(2);
  });
});
export {};