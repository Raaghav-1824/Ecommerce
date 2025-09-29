import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import styled from "styled-components";
import { mobile } from "../reponsive";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import TemporaryDrawer from "./Drawer";
import { useMediaQuery } from "@mui/material";

const Container = styled.div`
  height: 70px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 1000;
  ${mobile({ height: "60px" })}
`;

const Wrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  ${mobile({ padding: "10px 15px" })}
`;

const Left = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  font-weight: 500;
  color: #555;
  transition: color 0.2s ease;
  
  &:hover {
    color: #000;
  }
  
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 400px;
  transition: all 0.2s ease;
  background: #f8f9fa;

  &:focus-within {
    border-color: #2196f3;
    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1);
    background: #fff;
  }
`;

const Input = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: 14px;
  background: transparent;
  color: #333;
  
  &::placeholder {
    color: #999;
  }
`;

const Center = styled.div`
  flex: 1;
  text-align: left;
`;

const Logo = styled.h1`
  font-weight: bold;
  font-size: 28px;
  color: #1a1a1a;
  margin: 0;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.02);
  }
  
  ${mobile({ fontSize: "22px", paddingLeft: "0" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 24px;
  
  ${mobile({
    display: "none"
  })}
`;

const Icon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
  color: #333;
  
  &:hover {
    background: #f5f5f5;
    transform: translateY(-2px);
  }

  span {
    font-size: 12px;
    font-weight: 500;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  
  &:hover {
    text-decoration: none;
  }
`;

const MobileMenuIcon = styled.div`
  display: none;
  ${mobile({
    display: "block"
  })}
`;

function Navbar() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [searchFocus, setSearchFocus] = useState(false);

  return (
    <Container>
      <Wrapper>
        <Center>
          <StyledLink to="/">
            <Logo>Mart.</Logo>
          </StyledLink>
        </Center>
        
        <Left>
          <Language>ENG</Language>
          <SearchContainer style={{ background: searchFocus ? "#fff" : "#f8f9fa" }}>
            <Input 
              placeholder="Search products..." 
              onFocus={() => setSearchFocus(true)}
              onBlur={() => setSearchFocus(false)}
            />
            <SearchIcon style={{ color: searchFocus ? "#2196f3" : "#757575", fontSize: "20px", cursor: "pointer" }} />
          </SearchContainer>
        </Left>

        {isMobile ? (
          <MobileMenuIcon>
            <TemporaryDrawer />
          </MobileMenuIcon>
        ) : (
          <Right>
            <Icon>
              <Profile sx={{ fontSize: "24px" }} />
              <span>Profile</span>
            </Icon>
            
            <StyledLink to="/wishlist">
              <Icon>
                <FavoriteBorderOutlinedIcon sx={{ fontSize: "24px" }} />
                <span>Wishlist</span>
              </Icon>
            </StyledLink>

            <StyledLink to="/cart">
              <Icon>
                <ShoppingCartOutlinedIcon sx={{ fontSize: "24px" }} />
                <span>Cart</span>
              </Icon>
            </StyledLink>
          </Right>
        )}
      </Wrapper>
    </Container>
  );
}

export default Navbar;
