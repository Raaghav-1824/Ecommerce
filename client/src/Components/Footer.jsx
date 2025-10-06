import React from "react";
import styled from "styled-components";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import PinterestIcon from "@mui/icons-material/Pinterest";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import { mobile } from "../reponsive";

const Container = styled.div`
  background-color: #1a1a1a;
  color: white;
  padding: 60px 0 20px;
  position: relative;
  margin-top:100px ;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 40px;
  position: relative;
  z-index: 2;
  
  ${mobile({ 
    gridTemplateColumns: "1fr",
    gap: "30px",
    padding: "0 20px"
  })}
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
`;

const Logo = styled.h1`
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: bold;
  color: white;
  margin-bottom: 20px;
  letter-spacing: -0.02em;
`;

const Desc = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 30px;
  max-width: 300px;
`;

const SocialContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const SocialIcon = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: #333;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #555;
    transform: scale(1.1);
  }
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
  color: white;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  
  ${mobile({ 
    gridTemplateColumns: "1fr",
    gap: "8px"
  })}
`;

const ListItem = styled.li`
  padding: 8px 0;
  cursor: pointer;
  transition: color 0.3s ease;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  font-weight: 400;
  
  &:hover {
    color: white;
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  padding: 12px 0;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  transition: color 0.3s ease;
  
  &:hover {
    color: white;
  }
  
  svg {
    margin-right: 12px;
    color: #2196f3;
    font-size: 20px;
  }
`;

const PaymentContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const PaymentTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
  color: rgba(255, 255, 255, 0.9);
`;

const Payment = styled.img`
  width: 100%;
  max-width: 200px;
  height: auto;
  border-radius: 4px;
  opacity: 0.8;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 1;
  }
`;

const BottomBar = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 40px;
  padding: 20px 0;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  position: relative;
  z-index: 2;
`;

const Footer = () => {
  return (
    <Container>
      <FooterContent>
        <Left>
          <Logo>Mart.</Logo>
          <Desc>
            Your premier destination for quality products and exceptional service. 
            We're committed to bringing you the best shopping experience with 
            fast delivery and customer satisfaction guaranteed.
          </Desc>
          <SocialContainer>
            <SocialIcon>
              <FacebookOutlinedIcon />
            </SocialIcon>
            <SocialIcon>
              <InstagramIcon />
            </SocialIcon>
            <SocialIcon>
              <XIcon />
            </SocialIcon>
            <SocialIcon>
              <PinterestIcon />
            </SocialIcon>
          </SocialContainer>
        </Left>
        
        <Center>
          <Title>Quick Links</Title>
          <List>
            <ListItem>Home</ListItem>
            <ListItem>Shopping Cart</ListItem>
            <ListItem>Men's Collection</ListItem>
            <ListItem>Women's Collection</ListItem>
            <ListItem>Accessories</ListItem>
            <ListItem>My Account</ListItem>
            <ListItem>Order Tracking</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Customer Support</ListItem>
            <ListItem>Terms & Conditions</ListItem>
            <ListItem>Privacy Policy</ListItem>
            <ListItem>Returns & Exchanges</ListItem>
          </List>
        </Center>
        
        <Right>
          <Title>Get in Touch</Title>
          <ContactItem>
            <LocationOnOutlinedIcon />
            <span>123 Commerce Street, Business District, City 12345</span>
          </ContactItem>
          <ContactItem>
            <CallOutlinedIcon />
            <span>+1 (555) 123-4567</span>
          </ContactItem>
          <ContactItem>
            <MailOutlinedIcon />
            <span>support@lama.com</span>
          </ContactItem>
          
          <PaymentContainer>
            <PaymentTitle>We Accept</PaymentTitle>
            <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" alt="Payment Methods" />
          </PaymentContainer>
        </Right>
      </FooterContent>
      
      <BottomBar>
        © 2024 Mart. All rights reserved. | Designed with ❤️ for our customers
      </BottomBar>
    </Container>
  );
};

export default Footer;
