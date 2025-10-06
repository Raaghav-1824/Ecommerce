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

const PageWrapper = styled.div`
  background-color: #f8f9fa;
  min-height: 100vh;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const WishlistPage = () => {
  const wishlistProduct = useSelector((state) => state.wishlist.products);
  console.log("wishlistProducts : ", wishlistProduct);

  return (
    <PageWrapper>
      <Announcements />
      <Navbar />
      <Container>
        {wishlistProduct.length > 0 ? (
          wishlistProduct.map((product) => (
            <ProductWrapper>
              <WishListProduct item={product.item} />
              <Button
                variant="outlined"
                sx={{ width: "100%", borderRadius: 0, fontWeight: 600, py: 1.5 }}
              >
                Add to Cart
              </Button>
            </ProductWrapper>
          ))
        ) : (
          <p style={{ color: "#555", gridColumn: "1 / -1", textAlign: "center" }}>
            Your wishlist is empty.
          </p>
        )}
      </Container>
    </PageWrapper>
  );
};

export default WishlistPage;
