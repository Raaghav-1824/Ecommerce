import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Badge } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import styled from "styled-components";
import { mobile } from "../reponsive";
import { useSelector } from "react-redux";

const Container = styled.div`
  height: 7vh;
  ${mobile({ height: "50px" })}
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;
const SearchContainer = styled.div`
  border: 0.5px solid lightgrey;
  margin-left: 25px;
  padding: 5px;
  display: flex;
  align-items: center;
`;
const Input = styled.input`
  border: none;
  outline: none; /* Remove default focus outline */
  flex: 1; /* Take up remaining space in the container */
  font-size: 12px; /* Ensure text is readable */
  background-color: transparent; /* Transparent background to match container */
  border-radius: 4px; /* Match the border radius of the container */
  transition: background-color 0.3s ease;

  &:focus {
    background-color: #fff; /* Brighter background on focus */
  }
`;


const Center = styled.div`
  text-align: center;
  flex: 1;
`;
const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: right;
  ${mobile({ flex: "2", justifyContent: "center" })}
`;
const MenuItem = styled.div`
  display: flex;
  align-items: center;
  margin: 0px 10px;
  font-size: 14px;
  cursor: pointer;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
function Navbar() {
  const quantity = useSelector((state) => state.cart.quantity);
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>ENG</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <SearchIcon style={{ color: "grey", fontSize: "16px" }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>LAMA.</Logo>
        </Center>
        <Right>
          <MenuItem>Register</MenuItem>
          <MenuItem>Sign In </MenuItem>
          <MenuItem>
            <Badge badgeContent={quantity} color="primary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
}

export default Navbar;
