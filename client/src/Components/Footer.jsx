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
import { grey } from "@mui/material/colors";

const Container = styled.div`
  display: flex;
  justify-content: center;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

const Logo = styled.h1`
  font-size: 40px;
`;

const Desc = styled.p`
  font-size: 15px;
  font-weight: 300;
  margin: 20px 0;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
`;
const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: #${(props) => props.color};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  transition: transform 0.3s ease, background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    background-color: #${(props) => props.hoverColor};
  }
`;
const Title = styled.h3`
  margin-bottom: 30px;
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 20px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #000;
  }
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin: 20px;
`;

const Payment = styled.img`
  margin-left: 20px;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>LAMA.</Logo>
        <Desc>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit, ex
          veniam. Eius laudantium dolorem sed, nulla voluptas amet, voluptates
          dicta, neque reiciendis corporis repudiandae inventore necessitatibus
          ratione quasi ut velit?
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <FacebookOutlinedIcon />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <InstagramIcon />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <XIcon />
          </SocialIcon>
          <SocialIcon color="E60023">
            <PinterestIcon />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title style={{ paddingLeft: "20px" }}>Contact</Title>
        <ContactItem>
          <LocationOnOutlinedIcon style={{ marginRight: "10px" }} /> 622 Dixie
          Path , South Tobinchester 98336
        </ContactItem>
        <ContactItem>
          <CallOutlinedIcon style={{ marginRight: "10px" }} /> +1 234 56 78
        </ContactItem>
        <ContactItem>
          <MailOutlinedIcon style={{ marginRight: "10px" }} /> contact@email.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png"></Payment>
      </Right>
    </Container>
  );
};

export default Footer;
