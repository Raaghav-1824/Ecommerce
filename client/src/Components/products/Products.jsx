import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import { publicRequest } from "../../requestMethods";

const mobile = (styles) => `
  @media only screen and (max-width: 768px) {
    ${styles}
  }
`;

const Wrapper = styled.div`
  padding: 20px;
  background: #ffffff;
  
  ${mobile(`
    padding: 20px;
  `)}
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 10px;
  margin-bottom: 20px;
  
  ${mobile(`
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    margin-bottom: 40px;
  `)}
`;

const ProductWrapper = styled.div`
  width: 100%;
  height: 400px;
  /* border: 1px solid #e0e0e0; */
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #1a1a1a;
  }
  
  ${mobile(`
    height: 300px;
  `)}
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 100px 20px;
  
  h3 {
    font-size: 24px;
    font-weight: 300;
    color: #1a1a1a;
    margin-bottom: 10px;
    text-transform: uppercase;
    letter-spacing: 3px;
  }
  
  p {
    font-size: 14px;
    color: #666;
    letter-spacing: 1px;
  }
`;

const LoadingState = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 20px;
  
  &::after {
    content: '';
    width: 50px;
    height: 50px;
    border: 2px solid #f0f0f0;
    border-top: 2px solid #1a1a1a;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  /* padding: 10px 0; */
  /* border-top: 1px solid #e0e0e0; */
`;

const PaginationButton = styled.button`
  width: 45px;
  height: 45px;
  border: 1px solid #1a1a1a;
  background: ${props => props.disabled ? '#f5f5f5' : '#ffffff'};
  color: ${props => props.disabled ? '#ccc' : '#1a1a1a'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover:not(:disabled) {
    background: #1a1a1a;
    color: #ffffff;
  }
  
  svg {
    font-size: 24px;
  }
`;

const PageInfo = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
  letter-spacing: 1px;
  /* padding: 0 20px; */
`;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 10;

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const res = await publicRequest.get(
          cat ? `/products?category=${cat}` : "/products"
        );
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    if (cat && filters) {
      const filtered = products.filter((item) =>
        Object.entries(filters).every(([key, value]) =>
          item[key]?.includes(value)
        )
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [cat, filters, products]);

  const sortedProducts = useMemo(() => {
    const productsToSort = cat ? filteredProducts : products;
    
    if (sort === "newest") {
      return [...productsToSort].sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (sort === "asc") {
      return [...productsToSort].sort((a, b) => a.price - b.price);
    } else if (sort === "desc") {
      return [...productsToSort].sort((a, b) => b.price - a.price);
    }
    return productsToSort;
  }, [filteredProducts, products, sort, cat]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  return (
    <Wrapper>
      <Container>
        {loading ? (
          <LoadingState />
        ) : currentProducts.length === 0 ? (
          <EmptyState>
            <h3>No Products Found</h3>
            <p>Try adjusting your filters</p>
          </EmptyState>
        ) : (
          currentProducts.map((item) => (
            <ProductWrapper key={item._id}>
              <Product item={item} />
            </ProductWrapper>
          ))
        )}
      </Container>

      {!loading && sortedProducts.length > 0 && totalPages > 1 && (
        <PaginationWrapper>
          <PaginationButton
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <NavigateBeforeOutlinedIcon />
          </PaginationButton>
          
          <PageInfo>
            {currentPage} / {totalPages}
          </PageInfo>
          
          <PaginationButton
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <NavigateNextOutlinedIcon />
          </PaginationButton>
        </PaginationWrapper>
      )}
    </Wrapper>
  );
};

export default Products;