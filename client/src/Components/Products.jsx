import { useEffect, useState } from "react";
import styled from "styled-components";
import popularProducts from "../data";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
  display: flex;
  padding: 10px;
  flex-wrap: wrap;
`;

const ProductWrapper = styled.div`
  flex: 1 1 23%; // Ensure each product takes 23% width, making room for 4 per row
  margin: 5px; // Add some spacing between the products
  min-width: 250px; // Minimum width to prevent too small items on small screens
  box-sizing: border-box; // To account for padding/margin inside the element
`;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:3000/api/product?category=${cat}`
            : "http://localhost:3000/api/product/find"
        );
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {cat
        ? filteredProducts.map((item) => (
            <ProductWrapper key={item.id}>
              <Product item={item} />
            </ProductWrapper>
          ))
        : products.slice(0, 8).map((item) => (
            <ProductWrapper key={item.id}>
              <Product item={item} />
            </ProductWrapper>
          ))}
    </Container>
  );
};

export default Products;
