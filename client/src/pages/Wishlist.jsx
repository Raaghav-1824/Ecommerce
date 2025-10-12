import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Announcements from "../Components/home/Announcements";
import Navbar from "../Components/layout/Navbar";
import WishListProduct from "../Components/products/WishListProduct";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const mobile = (styles) => `
  @media only screen and (max-width: 768px) {
    ${styles}
  }
`;

const PageWrapper = styled.div`
  background: #ffffff;
  min-height: 100vh;
`;

const Header = styled.div`
  padding: 20px 10px 10px;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
  color: #ffffff;
  
  ${mobile(`
    padding: 40px 20px 30px;
  `)}
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 200;
  text-transform: uppercase;
  letter-spacing: 8px;
  margin: 0 0 10px 0;
  
  ${mobile(`
    font-size: 32px;
    letter-spacing: 4px;
  `)}
`;

const Subtitle = styled.p`
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 2px;
  opacity: 0.7;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  
  svg {
    font-size: 18px;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 60px 40px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;

  ${mobile(`
    padding: 40px 20px;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  `)}

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  /* border: 1px solid #e0e0e0; */
  overflow: hidden;
  transition: all 0.4s ease;
  
  &:hover {
    border-color: #1a1a1a;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  }
`;

const ProductImageContainer = styled.div`
  width: 100%;
  height: 400px;
  overflow: hidden;
  
  ${mobile(`
    height: 300px;
  `)}
`;

const ProductInfo = styled.div`
  padding: 20px;
  /* border-top: 1px solid #e0e0e0; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const ProductName = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProductPrice = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  letter-spacing: 1px;
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 10px;
  /* border-top: 1px solid #e0e0e0; */
`;

const AddToCartButton = styled.button`
  flex: 1;
  padding: 16px;
  border: 1px solid #1a1a1a;
  background: transparent;
  color: #1a1a1a;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: #1a1a1a;
    transition: left 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    z-index: 0;
  }
  
  &:hover::before {
    left: 0;
  }
  
  &:hover {
    color: #ffffff;
    
    svg {
      color: #ffffff;
    }
  }
  
  svg {
    font-size: 16px;
    position: relative;
    z-index: 1;
    color: #1a1a1a;
    transition: color 0.4s ease;
  }
  
  span {
    position: relative;
    z-index: 1;
  }
  
  ${mobile(`
    font-size: 10px;
    padding: 14px;
    gap: 6px;
  `)}
`;

const RemoveButton = styled.button`
  flex: 1;
  padding: 16px;
  border: 1px solid #e0e0e0;
  background: transparent;
  color: #999;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: #f44336;
    transition: left 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    z-index: 0;
  }
  
  &:hover::before {
    left: 0;
  }
  
  &:hover {
    color: #ffffff;
    border-color: #f44336;
    
    svg {
      color: #ffffff;
    }
  }
  
  svg {
    font-size: 16px;
    position: relative;
    z-index: 1;
    color: #999;
    transition: color 0.3s ease;
  }
  
  span {
    position: relative;
    z-index: 1;
  }
  
  ${mobile(`
    font-size: 10px;
    padding: 14px;
    gap: 6px;
  `)}
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 100px 20px;
  
  svg {
    font-size: 80px;
    color: #e0e0e0;
    margin-bottom: 20px;
  }
  
  h3 {
    font-size: 24px;
    font-weight: 300;
    color: #1a1a1a;
    margin-bottom: 10px;
    text-transform: uppercase;
    letter-spacing: 3px;
  }
  
  p {
    font-size: 14px;
    color: #666;
    margin-bottom: 30px;
    letter-spacing: 1px;
  }
`;

const EmptyStateButton = styled.button`
  padding: 16px 40px;
  border: 1px solid #1a1a1a;
  background: #1a1a1a;
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #333;
    border-color: #333;
  }
`;

const WishlistPage = () => {
  const wishlistProduct = useSelector((state) => state.wishlist.products);

  const handleAddToCart = (product) => {
    console.log("Add to cart:", product);
    // Add your cart dispatch logic here
  };

  const handleRemove = (productId) => {
    console.log("Remove from wishlist:", productId);
    // Add your remove from wishlist logic here
  };

  return (
    <PageWrapper>
      <Navbar />
      <Announcements />
      
      <Header>
        <HeaderContent>
          <Title>Wishlist</Title>
          <Subtitle>
            <FavoriteBorderOutlinedIcon />
            {wishlistProduct.length} {wishlistProduct.length === 1 ? 'Item' : 'Items'} Saved
          </Subtitle>
        </HeaderContent>
      </Header>

      <Container>
        {wishlistProduct.length > 0 ? (
          wishlistProduct.map((product, index) => (
            <ProductWrapper key={index}>
              <ProductImageContainer>
                <WishListProduct item={product.item} />
              </ProductImageContainer>
              
              <ProductInfo>
                <ProductDetails>
                  <ProductName>{product.item?.title || 'Product Name'}</ProductName>
                  <ProductPrice>$ {product.item?.price || '0.00'}</ProductPrice>
                </ProductDetails>
              </ProductInfo>
              
              <ActionsContainer>
                <AddToCartButton onClick={() => handleAddToCart(product)}>
                  <ShoppingBagOutlinedIcon />
                  <span>Add to Cart</span>
                </AddToCartButton>
                
                <RemoveButton onClick={() => handleRemove(product.item?._id)}>
                  <DeleteOutlineIcon />
                  <span>Remove</span>
                </RemoveButton>
              </ActionsContainer>
            </ProductWrapper>
          ))
        ) : (
          <EmptyState>
            <FavoriteBorderOutlinedIcon />
            <h3>Your Wishlist is Empty</h3>
            <p>Save your favorite items to view them later</p>
            <EmptyStateButton onClick={() => window.location.href = '/products'}>
              Start Shopping
            </EmptyStateButton>
          </EmptyState>
        )}
      </Container>
    </PageWrapper>
  );
};

export default WishlistPage;