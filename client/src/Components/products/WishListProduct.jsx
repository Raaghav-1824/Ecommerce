import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  font-family: 'Spartan', sans-serif;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background: linear-gradient(45deg, black,rgba(54, 51, 51, 0.59));
    transition: all 0.3s ease-in-out;
    z-index: 9;
  }
  
  &:hover::before {
    width: 100%;
  }
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  position: relative;
  z-index: 1;
`;

const Info = styled.div`
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
  
  ${Container}:hover & {
    opacity: 1;
  }
`;

const Icon = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #1a1a1a;
    text-decoration: none;
    width: 100%;
    height: 100%;
  }
  
  svg {
    font-size: 24px;
    color: #1a1a1a;
  }
  
  &:hover {
    background:rgb(41, 38, 38);
    transform: scale(1.1);
    
    svg {
      color: #ffffff;
    }
    
    a {
      color: #ffffff;
    }
  }
`;

const WishListProduct = ({ item }) => {
  return (
    <Container>
      <Image src={item?.img} alt={item?.title} />
      <Info>
        <Icon>
          <Link to={`/product/${item?._id}`}>
            <SearchOutlinedIcon />
          </Link>
        </Icon>
      </Info>
    </Container>
  );
};

export default WishListProduct;