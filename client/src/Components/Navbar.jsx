import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Badge } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import styled from "styled-components";
import { mobile } from "../reponsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const Container = styled.div`
  height: 8vh;
  ${mobile({ height: "50px" })}
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;
const Left = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Language = styled.span`
  font-size: 16px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;
const SearchContainer = styled.div`
  border: 0.5px solid lightgrey;
  margin-left: 25px;
  padding: 5px;
  display: flex;
  align-items: center;
  width: 50%;
`;
const Input = styled.input`
  border: none;
  outline: none;
  flex: 1;
  font-size: 16px;
  background-color: transparent;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:focus {
    background-color: #fff;
  }
`;

const Center = styled.div`
  text-align: left;
  flex: 1;
  justify-content: left;
`;
const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 0.4;
  display: flex;
  justify-content: space-around;
  align-items: center;
  ${mobile({ flexDirection: "column", justifyContent: "center" })}
`;
// const MenuItem = styled.div`
//   color: black;
//   display: flex;
//   align-items: center;
//   margin: 0px 10px;
//   font-size: 16px;
//   cursor: pointer;
//   text-decoration: none;

//   ${mobile({ fontSize: "12px", marginLeft: "10px" })};
// `;

// const Button = styled.button`
//   color: black;
//   font-size: 16px;
//   border: none;
//   background-color: white;
//   cursor: pointer;
//   &:disabled {
//     color: green;
//     cursor: not-allowed;
//   }
// `;

const Icon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 45px; /* Set a fixed width for each icon container */
  height: 45px; /* Set a fixed height for consistent spacing */
  color: black;
  font-size: 12px; /* Adjust font size for the label */
  text-align: center; /* Center align the text */
  cursor: pointer;
`;

function Navbar() {
  // const quantity = useSelector((state) => state.cart.quantity);

  return (
    <Container>
      <Wrapper>
        <Center>
          <Link style={{ textDecoration: "none" }} to={`/`}>
            <Logo>Mart.</Logo>
          </Link>
        </Center>
        <Left>
          <Language>ENG</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <SearchIcon style={{ color: "grey", fontSize: "16px" }} />
          </SearchContainer>
        </Left>
        <Right>
          <Icon>
            <Profile sx={{ fontSize: "30px", padding: "0px" }} />
            <span>Profile</span>
          </Icon>
          <Link to = {'/wishlist'}> 
            <Icon>
              <FavoriteBorderOutlinedIcon sx={{ fontSize: "24px" }} />
              <span>Wishlist</span>
            </Icon>
          </Link>

          <Link to={`/cart`}>
            <Icon>
              <ShoppingCartOutlinedIcon sx={{ fontSize: "24px" }} />
              <span style={{ textDecoration: "none" }}>Cart</span>
            </Icon>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
}

export default Navbar;
