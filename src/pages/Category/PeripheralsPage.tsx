import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";
import ProductCard from "../../components/product/ProductCard";
import { Product } from "../../types";

const Peripherals = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts();

      const filtered = data.filter(
        (product: Product) =>
          product.category === "Headphones" ||
          product.category === "Mouse" ||
          product.category === "Keyboard" ||
          product.category === "Speakers"
      );

      setProducts(filtered);
    };

    loadProducts();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Peripherals</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Peripherals;