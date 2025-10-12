import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../Components/layout/Navbar";
import Announcements from "../Components/home/Announcements";
import Footer from "../Components/layout/Footer";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import { mobile } from "../reponsive";
import { useSelector } from "react-redux";
import ResetStore from "../Components/cart/ResetStore";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router-dom";
import { userRequest } from "../requestMethods";

const KEY = process.env.PUBLIC_KEY;

const Container = styled.div`
  background: #ffffff;
  min-height: 100vh;
`;

const Wrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 60px 40px;
  
  ${mobile({ padding: "30px 20px" })}
`;

const Header = styled.div`
  margin-bottom: 50px;
`;

const Title = styled.h1`
  font-size: 42px;
  font-weight: 200;
  text-transform: uppercase;
  letter-spacing: 8px;
  color: #1a1a1a;
  margin: 0 0 10px 0;
  
  ${mobile({ 
    fontSize: "32px",
    letterSpacing: "4px"
  })}
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
  letter-spacing: 1px;
  margin: 0;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 0;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 40px;
  
  ${mobile({ 
    flexDirection: "column",
    gap: "20px",
    alignItems: "flex-start"
  })}
`;

const TopButtons = styled.div`
  display: flex;
  gap: 15px;
  
  ${mobile({ 
    width: "100%",
    flexDirection: "column"
  })}
`;

const TopButton = styled.button`
  padding: 12px 30px;
  border: 1px solid #1a1a1a;
  background: ${props => props.filled ? '#1a1a1a' : 'transparent'};
  color: ${props => props.filled ? '#ffffff' : '#1a1a1a'};
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.filled ? '#333' : '#1a1a1a'};
    color: #ffffff;
  }
  
  ${mobile({ width: "100%" })}
`;

const TopTexts = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  
  ${mobile({ 
    width: "100%",
    justifyContent: "space-between"
  })}
`;

const TopText = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &:hover {
    color: #1a1a1a;
  }
  
  svg {
    font-size: 18px;
  }
`;

const Bottom = styled.div`
  display: flex;
  gap: 40px;
  
  ${mobile({ 
    flexDirection: "column",
    gap: "30px"
  })}
`;

const Info = styled.div`
  flex: 2;
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 80px 20px;
  
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
  }
`;

const Product = styled.div`
  display: flex;
  gap: 30px;
  padding: 30px 0;
  border-bottom: 1px solid #e0e0e0;
  position: relative;
  
  ${mobile({ 
    flexDirection: "column",
    gap: "20px",
    padding: "20px 0"
  })}
  
  &:last-child {
    border-bottom: none;
  }
`;

const ProductDetail = styled.div`
  display: flex;
  gap: 25px;
  flex: 1;
  
  ${mobile({ 
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center"
  })}
`;

const ImageWrapper = styled.div`
  width: 150px;
  height: 180px;
  background: #f8f8f8;
  border: 1px solid #e0e0e0;
  overflow: hidden;
  flex-shrink: 0;
  
  ${mobile({ 
    width: "100%",
    height: "250px"
  })}
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
`;

const ProductName = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #1a1a1a;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ProductId = styled.span`
  font-size: 11px;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ProductAttributes = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  
  ${mobile({ 
    justifyContent: "center"
  })}
`;

const ProductColor = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 2px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProductSize = styled.span`
  font-size: 13px;
  color: #666;
  padding: 4px 12px;
  border: 1px solid #e0e0e0;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 30px;
  right: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  transition: all 0.3s ease;
  
  svg {
    font-size: 20px;
    color: #999;
  }
  
  &:hover svg {
    color: #1a1a1a;
  }
  
  ${mobile({ 
    top:20,
    right: 0
  })}
`;

const PriceDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  
  ${mobile({ 
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%"
  })}
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #1a1a1a;
  height: 40px;
`;

const AmountButton = styled.button`
  width: 40px;
  height: 100%;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f8f8f8;
  }
  
  svg {
    font-size: 16px;
    color: #1a1a1a;
  }
`;

const ProductAmount = styled.div`
  min-width: 50px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
`;

const ProductPrice = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #1a1a1a;
  letter-spacing: 1px;
`;

const Summary = styled.div`
  flex: 1;
  background: #f8f8f8;
  padding: 40px;
  height: fit-content;
  position: sticky;
  top: 100px;
  
  ${mobile({ 
    position: "relative",
    top: 0,
    padding: "30px 20px"
  })}
`;

const SummaryTitle = styled.h2`
  font-weight: 300;
  font-size: 24px;
  color: #1a1a1a;
  margin-bottom: 30px;
  text-transform: uppercase;
  letter-spacing: 3px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
`;

const SummaryItem = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: ${(props) => props.type === "total" ? "#1a1a1a" : "#666"};
  padding: ${(props) => props.type === "total" ? "20px 0" : "0"};
  border-top: ${(props) => props.type === "total" ? "2px solid #1a1a1a" : "none"};
  margin-top: ${(props) => props.type === "total" ? "30px" : "20px"};
`;

const SummaryItemText = styled.span`
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: ${(props) => props.type === "total" ? "600" : "400"};
`;

const SummaryItemPrice = styled.span`
  font-weight: ${(props) => props.type === "total" ? "600" : "500"};
  font-size: ${(props) => props.type === "total" ? "20px" : "14px"};
  color: ${(props) => props.type === "total" ? "#1a1a1a" : "#666"};
  letter-spacing: 1px;
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 16px;
  background: #1a1a1a;
  color: #ffffff;
  border: none;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  margin-top: 30px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #333;
  }
`;

const ShippingInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  margin-top: 20px;
  
  svg {
    font-size: 22px;
    color: #1a1a1a;
  }
  
  div {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  strong {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #1a1a1a;
  }
  
  span {
    font-size: 11px;
    color: #666;
  }
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const history = useNavigate();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 500,
        });
        history.push("/success", {
          stripeData: res.data,
          products: cart,
        });
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, history]);

  return (
    <Container>
      {/* <Announcements /> */}
      <Navbar />

      <Wrapper>
        <Header>
          <Title>Shopping Cart</Title>
          <Subtitle>{cart.products.length} {cart.products.length === 1 ? 'Item' : 'Items'}</Subtitle>
        </Header>

        <Top>
          <TopButtons>
            <TopButton onClick={() => history('/')}>
              Continue Shopping
            </TopButton>
          </TopButtons>
          
          <TopTexts>
            <TopText>
              <ShoppingBagOutlinedIcon />
              Bag ({cart.products.length})
            </TopText>
            <TopText>
              <FavoriteBorderOutlinedIcon />
              Wishlist (0)
            </TopText>
          </TopTexts>
          
          <ResetStore />
        </Top>

        {cart.products.length === 0 ? (
          <EmptyCart>
            <ShoppingBagOutlinedIcon />
            <h3>Your Cart is Empty</h3>
            <p>Add some items to get started</p>
            <TopButton filled onClick={() => history('/')}>
              Start Shopping
            </TopButton>
          </EmptyCart>
        ) : (
          <Bottom>
            <Info>
              {cart.products.map((product, index) => (
                <Product key={index}>
                  <ProductDetail>
                    <ImageWrapper>
                      <Image src={product.img} alt={product.title} />
                    </ImageWrapper>
                    <Details>
                       
                      <ProductName>{product.title}</ProductName>
                      <ProductId>ID: {product._id}</ProductId>
                      <ProductAttributes>
                        <ProductColor color={product.color} />
                        <ProductSize>Size: {product.size}</ProductSize>
                      </ProductAttributes>
                      <DeleteButton>
                          <DeleteOutlineIcon />
                       </DeleteButton>
                    </Details>
                  </ProductDetail>
                  
                  <PriceDetail>
                    <ProductAmountContainer>
                      <AmountButton>
                        <RemoveOutlinedIcon />
                      </AmountButton>
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <AmountButton>
                        <AddOutlinedIcon />
                      </AmountButton>
                    </ProductAmountContainer>
                    
                    <ProductPrice>
                      $ {(product.price * product.quantity).toFixed(2)}
                    </ProductPrice>
                  </PriceDetail>
                  
                 
                </Product>
              ))}
            </Info>

            <Summary>
              <SummaryTitle>Order Summary</SummaryTitle>
              
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>$ {cart.total.toFixed(2)}</SummaryItemPrice>
              </SummaryItem>
              
              <SummaryItem>
                <SummaryItemText>Shipping</SummaryItemText>
                <SummaryItemPrice>$ 5.90</SummaryItemPrice>
              </SummaryItem>
              
              <SummaryItem>
                <SummaryItemText>Discount</SummaryItemText>
                <SummaryItemPrice>- $ 5.90</SummaryItemPrice>
              </SummaryItem>
              
              <SummaryItem type="total">
                <SummaryItemText type="total">Total</SummaryItemText>
                <SummaryItemPrice type="total">
                  $ {cart.total.toFixed(2)}
                </SummaryItemPrice>
              </SummaryItem>

              <ShippingInfo>
                <LocalShippingOutlinedIcon />
                <div>
                  <strong>Free Shipping</strong>
                  <span>On orders over $100</span>
                </div>
              </ShippingInfo>

              <StripeCheckout
                name="Mart Shop"
                image="https://avatars.githubusercontent.com/u/1486366?v=4"
                billingAddress
                shippingAddress
                description={`Your total is $${cart.total}`}
                amount={cart.total * 100}
                token={onToken}
                stripeKey={KEY}
              >
                <CheckoutButton>
                  Proceed to Checkout
                </CheckoutButton>
              </StripeCheckout>
            </Summary>
          </Bottom>
        )}
      </Wrapper>
      
      <Footer />
    </Container>
  );
};

export default Cart;