import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../redux/wishListRedux";
import { addProduct } from "../redux/wishListRedux";

const Info = styled.div`
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;

  margin: 2px;
  height: 300px;
  min-width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5fbfd;
  position: relative;
  &:hover ${Info} {
    opacity: 1;
  }
`;
const Circle = styled.div`
//   width: 200px;
//   height: 200px;
//   background-color: white;
//   border-radius: 50%;
//   position: absolute;
// `;
const Image = styled.img`
  height: 100%;
  width : 100%;
  z-index: 2;
  object-fit: cover;
`;

const Icon = styled.div`
  margin: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ item }) => {
  const dispatch = useDispatch();

  const handleWishlistClick = () => {
    dispatch(addProduct({item}));
  };

  return (
    <Container>
      <Image src={item.image} />
      <Info>
        <Link to={`/cart`}>
          <Icon>
            <ShoppingCartOutlinedIcon />
          </Icon>
        </Link>
        <Icon>
          <Link to={`/product/${item._id}`}>
            <SearchOutlinedIcon />
          </Link>
        </Icon>
        <Icon onClick={handleWishlistClick}>
          <FavoriteBorderOutlinedIcon />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
