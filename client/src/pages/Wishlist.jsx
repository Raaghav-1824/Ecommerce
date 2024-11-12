import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import fetchWishlist from "../redux/wishListRedux"; // asyncThunk action to fetch wishlist from DB
import WishListProduct from "../Components/WishListProduct";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import Announcements from "../Components/Announcements";
import Navbar from "../Components/Navbar";
import Button from "@mui/material/Button";
import { width } from "@mui/system";

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

const WishlistPage = () => {
  const wishlistProduct = useSelector((state) => state.wishlist.products);
  console.log("wishlistProducts : ", wishlistProduct);

  return (
    <div>
      <Announcements />
      <Navbar />
      <Container>
        {wishlistProduct.length > 0 ? (
          wishlistProduct.map((product) => (
            <ProductWrapper>
              <WishListProduct item={product.item} />
              <Button
                variant="outlined"
                sx={{ width: "100%", borderRadius: "0px", fontWeight: "500" }}
              >
                Add to Cart
              </Button>
            </ProductWrapper>
          ))
        ) : (
          <p>Your wishlist is empty.</p>
        )}
      </Container>
    </div>
  );
};

export default WishlistPage;
