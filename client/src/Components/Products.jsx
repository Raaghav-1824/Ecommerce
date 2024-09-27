import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import popularProducts from "../data";
import Product from "./Product";
import axios from "axios";
import useFetchProducts from "./useFetchProducts";

const Container = styled.div`
  display: flex;
  padding: 10px;
  flex-wrap: wrap;
`;
const ProductWrapper = styled.div`
  flex: 1 1 23%;
  margin: 5px;
  min-width: 250px;
  box-sizing: border-box;
`;
const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:3000/api/products?category=${cat}`
            : "http://localhost:3000/api/products"
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat]);

  // Using useMemo to memoize the results of the sort filter an category

  const FilteredProducts = useMemo(() => {
    return cat
      ? products.filter((items) =>
          Object.entries(filters).every(([key, value]) =>
            items[key].includes(value)
          )
        )
      : products;
  }, [cat, filters, sort]);

  // Memoize the sorted products based on sort type
  const sortedProducts = useMemo(() => {
    if (sort === "newest") {
      return [...filteredProducts].sort((a, b) => a.createdAt - b.createdAt);
    } else if (sort === "asc") {
      return [...filteredProducts].sort((a, b) => a.price - b.price);
    } else {
      return [...filteredProducts].sort((a, b) => b.price - a.price);
    }
  }, [filteredProducts, sort]);

  return (
    <Container>
      {cat
        ? filteredProducts.map((item) => (
            <ProductWrapper key={item._id}>
              <Product item={item} />
            </ProductWrapper>
          ))
        : products.slice(0, 8).map((item) => (
            <ProductWrapper key={item._id}>
              <Product item={item} />
            </ProductWrapper>
          ))}
    </Container>
  );
};

export default Products;
