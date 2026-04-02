describe("Price Sorting", () => {
  const products = [
    { price: 200 },
    { price: 50 },
    { price: 100 },
  ];

  test("sort ascending", () => {
    const sorted = [...products].sort((a, b) => a.price - b.price);
    expect(sorted[0].price).toBe(50);
    expect(sorted[2].price).toBe(200);
  });

  test("sort descending", () => {
    const sorted = [...products].sort((a, b) => b.price - a.price);
    expect(sorted[0].price).toBe(200);
    expect(sorted[2].price).toBe(50);
  });
});
export {};