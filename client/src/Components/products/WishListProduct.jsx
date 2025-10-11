import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const Info = styled.div`
  opacity: 0;
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 100%);
  z-index: 2;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 16px;
  transition: opacity 0.3s ease;
  cursor: pointer;
`;

const Container = styled.div`
  width: 100%;
  aspect-ratio: 4 / 5;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5fbfd;
  position: relative;
  overflow: hidden;
  
  &:hover ${Info} {
    opacity: 1;
  }
`;
// const Circle = styled.div`
//   width: 200px;
//   height: 200px;
//   background-color: white;
//   border-radius: 50%;
//   position: absolute;
// `;
const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  transform: scale(1.02);
  transition: transform 0.4s ease;
  z-index: 1;
  
  ${Container}:hover & {
    transform: scale(1.06);
  }
`;

const Icon = styled.div`
  margin: 8px;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: rgba(255,255,255,0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  
  &:hover {
    background-color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
`;

const WishListProduct = ({ item}) => {
  return (
    <Container>
      {/* <Circle /> */}
      <Image src={item.img} />
      <Info>
        <Icon>
          <Link to={`/product/${item._id}`}>
            <SearchOutlinedIcon />
            
          </Link>
        </Icon>
      </Info>
    </Container>
  );
};

export default WishListProduct;
