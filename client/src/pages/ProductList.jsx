import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../Components/layout/Navbar";
import Announcements from "../Components/home/Announcements";
import Products from "../Components/products/Products";
import Newsletter from "../Components/home/Newsletter";
import Footer from "../Components/layout/Footer";
import { mobile } from "../reponsive";
import { useLocation } from "react-router";

const Container = styled.div`
  background: #ffffff;
  min-height: 100vh;
`;

const HeaderSection = styled.div`
  padding: 60px 40px 40px;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
  color: #ffffff;
  
  ${mobile({ padding: "40px 20px 30px" })}
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 200;
  text-transform: uppercase;
  letter-spacing: 8px;
  margin: 0 0 10px 0;
  
  ${mobile({ fontSize: "32px", letterSpacing: "4px" })}
`;

const Subtitle = styled.p`
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 2px;
  opacity: 0.7;
  margin: 0;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 40px;
  background: #f8f8f8;
  border-bottom: 1px solid #e0e0e0;
  
  ${mobile({ 
    flexDirection: "column", 
    padding: "20px",
    gap: "20px",
    alignItems: "stretch"
  })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  
  ${mobile({ 
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%"
  })}
`;

const FilterText = styled.span`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #1a1a1a;
  
  ${mobile({ marginBottom: "10px" })}
`;

const Select = styled.select`
  padding: 12px 20px;
  border: 1px solid #1a1a1a;
  background: #ffffff;
  color: #1a1a1a;
  font-size: 13px;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &:hover {
    background: #1a1a1a;
    color: #ffffff;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(26, 26, 26, 0.2);
  }
  
  ${mobile({ 
    width: "100%",
    marginBottom: "10px"
  })}
`;

const Option = styled.option`
  background: #ffffff;
  color: #1a1a1a;
`;

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  return (
    <Container>
      {/* <Announcements/> */}
      {/* <Navbar /> */}
      
      {/* <HeaderSection>
        <Title>{cat || "All Products"}</Title>
        <Subtitle>Curated Collection</Subtitle>
      </HeaderSection> */}
      
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option disabled>Color</Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>red</Option>
            <Option>blue</Option>
            <Option>yellow</Option>
            <Option>green</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option disabled>Size</Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      
      <Products cat={cat} filters={filters} sort={sort} />
      <Footer />
    </Container>
  );
};

export default ProductList;