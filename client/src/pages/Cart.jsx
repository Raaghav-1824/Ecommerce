import React from "react";
import styled from "styled-components";
import Navbar from "../Components/layout/Navbar";
import Announcements from "../Components/home/Announcements";
import Footer from "../Components/layout/Footer";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { mobile } from "../reponsive";
import { useSelector } from "react-redux";
import ResetStore from "../Components/cart/ResetStore";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userRequest } from "../requestMethods";
import Button from "@mui/material/Button";

const KEY = process.env.PUBLIC_KEY;

const Container = styled.div`
  background-color: #f8f9fa;
  min-height: 100vh;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  ${mobile({ padding: "20px 10px" })}
`;

const Title = styled.h1`
  font: bold;
  font-size: clamp(2rem, 4vw, 3rem);
  text-align: center;
  color: #1a1a1a;
  margin-bottom: 40px;
  font-weight: 300;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
  ${mobile({ flexDirection: "column", gap: "20px", padding: "20px" })}
`;

const TopTexts = styled.div`
  display: flex;
  gap: 20px;
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  color: #555;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: #1a1a1a;
  }
`;

const Bottom = styled.div`
  display: flex;
  gap: 20px;
  ${mobile({ flexDirection: "column-reverse" })}
`;

const Info = styled.div`
  flex: 3;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const Product = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0;
  gap: 20px;
  ${mobile({ flexDirection: "column", padding: "20px 0" })}
  &:not(:last-child) {
    border-bottom: 1px solid #e0e0e0;
  }
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  gap: 20px;
  ${mobile({ flexDirection: "column", textAlign: "center", gap: "15px" })}
`;

const Image = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  ${mobile({ width: "100px", height: "100px" })}
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ProductName = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 4px;
`;

const ProductId = styled.span`
  font-size: 12px;
  color: #999;
`;

const ProductColor = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 2px solid #fff;
  box-shadow: 0 0 0 1px #e0e0e0;
`;

const ProductSize = styled.span`
  font-size: 14px;
  color: #555;
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 8px 12px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
`;

const ProductAmount = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #1a1a1a;
  min-width: 30px;
  text-align: center;
`;

const ProductPrice = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
`;

const Summary = styled.div`
  flex: 1;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 30px;
  height: fit-content;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  ${mobile({ marginTop: "20px" })}
`;

const SummaryTitle = styled.h1`
  font-weight: 600;
  font-size: 24px;
  color: #1a1a1a;
  margin-bottom: 20px;
`;

const SummaryItem = styled.div`
  margin: 20px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: ${(props) => props.type === "total" ? "600" : "400"};
  font-size: ${(props) => props.type === "total" ? "18px" : "16px"};
  color: ${(props) => props.type === "total" ? "#1a1a1a" : "#555"};
  padding: ${(props) => props.type === "total" ? "15px 0" : "0"};
  border-top: ${(props) => props.type === "total" ? "2px solid #e0e0e0" : "none"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span`
  font-weight: ${(props) => props.type === "total" ? "700" : "500"};
  color: ${(props) => props.type === "total" ? "#1a1a1a" : "#555"};
`;

// const Button = styled.button`
//   width: 100%;
//   padding: 10px;
//   background-color: black;
//   color: white;
//   font-weight: 600;
// `;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  // const [wishlistItem , setwishListItem] =  useState();
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
      <Announcements />
      <Navbar />

      {/* <ResetStore /> */}
      <Wrapper>
        {/* <Title>YOUR BAG</Title> */}
        <Top>
          <Button variant="contained">CONTINUE SHOPPING</Button>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <ResetStore />
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>{product.title}</ProductName>
                    <ProductId>ID: {product._id}</ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>Size: {product.size}</ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <AddOutlinedIcon />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <RemoveOutlinedIcon />
                  </ProductAmountContainer>
                  <ProductPrice>
                    ${product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            {/* <Hr /> */}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
                  <SummaryItemText>Subtotal</SummaryItemText>
                  <SummaryItemPrice>${cart.total}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Estimated Shipping</SummaryItemText>
                  <SummaryItemPrice>$5.90</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Shipping Discount</SummaryItemText>
                  <SummaryItemPrice>- $5.90</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem type="total">
                  <SummaryItemText>Total</SummaryItemText>
                  <SummaryItemPrice type="total">${cart.total}</SummaryItemPrice>
                </SummaryItem>
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
              {" "}
              <Button variant="contained" >
                PROCEED TO PAYMENT{" "}
              </Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
