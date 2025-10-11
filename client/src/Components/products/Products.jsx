import React from "react";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import { publicRequest } from "../../requestMethods";



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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
  button {
    margin: 0 10px;
    padding: 5px 10px;
    cursor: pointer;
  }
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
`;
const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;


  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          cat
            ? `/products?category=${cat}`
            : "/products"
        );
        // console.log("@@@@",res.data[1].img);
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

  // paginate the products

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <>
      <Container>
        {cat
          ? filteredProducts.map((item) => (
              <ProductWrapper key={item._id}>
                <Product item={item} />
              </ProductWrapper>
            ))
          : currentProducts.slice(0, productsPerPage).map((item) => (
              <ProductWrapper key={item._id}>
                <Product item={item} />
              </ProductWrapper>
            ))}
      </Container>
      {/* Pagination Controls */}
      <Pagination>
        <Button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <NavigateBeforeOutlinedIcon />
        </Button>
        <span style={{ display: "flex", alignItems: "center" }}>
          {currentPage} / {totalPages}
        </span>
        <Button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <NavigateNextOutlinedIcon />
        </Button>
      </Pagination>
    </>
  );
};

export default Products;
