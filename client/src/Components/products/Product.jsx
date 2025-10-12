import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/wishListRedux";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  font-family: 'Spartan', sans-serif;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background: linear-gradient(45deg, black,rgba(49, 47, 47, 0.59));
    transition: all 0.3s ease-in-out;
    z-index: 9;
  }
  
  &:hover::before {
    width: 100%;
  }
  
  &:hover {
    background-position: top left;
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
  gap: 12px;
  transition: all 0.3s ease-in-out;
  
  ${Container}:hover & {
    opacity: 1;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const ProductTitle = styled.p`
  color: rgba(255, 255, 255, 0.897);
  font-size: 14px;
  text-transform: uppercase;
  font-family: 'Spartan', sans-serif;
  margin: 0;
  position: relative;
  z-index: 999;
`;

const ProductPrice = styled.span`
  color: #ffffffe5;
  font-size: 16px;
  display: inline-block;
  margin : 10px 0px;
  position: relative;
  z-index: 9999;
`;

const IconGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  cursor: pointer;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #1a1a1a;
    text-decoration: none;
  }
  
  svg {
    font-size: 20px;
    color: #1a1a1a;
  }
  
  &:hover {
    background: #1a1a1a;
    transform: translateY(-5px);
    
    svg {
      color: #ffffff;
    }
    
    a {
      color: #ffffff;
    }
  }
`;

const Product = ({ item }) => {
  const dispatch = useDispatch();

  const handleWishlistClick = () => {
    dispatch(addProduct({item}));
  };

  return (
    <Container>
      <Image src={item.image} alt={item.title} />
      <Info>
        <ProductInfo>
          <ProductTitle>{item.title}</ProductTitle>
          <ProductPrice>${item.price}</ProductPrice>
        </ProductInfo>
        
        <IconGroup>
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
        </IconGroup>
      </Info>
    </Container>
  );
};

export default Product;