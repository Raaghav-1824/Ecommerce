import React from "react";
import styled from "styled-components";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { mobile } from "../reponsive";
import { fontSize, textAlign } from "@mui/system";

const Container = styled.div`
  height: 70vh;
  background-color: #fcf5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* ${mobile({ height: "50vh", padding: "10px" })} */
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
  text-align: center;
  ${mobile({ fontSize: "34px" })}
`;
const Desc = styled.p`
  font-size: 24px;
  font-weight: 300;
  ${mobile({ fontSize: "14px", textAlign: "center" })}
`;
const InputContainer = styled.div`
  display: flex;
  width: 50%;
  height: 40px;
  margin: 20px;
  background-color: white;
  justify-content: space-between;
  border: 1px solid grey;
  ${mobile({ width: "80%" })}
`;

const Input = styled.input`
  flex: 8;
  padding-left: 20px;
  border: none;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
  ${mobile({})}
`;

const Newsletter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>Get timely update from your favourite products.</Desc>
      <InputContainer>
        <Input placeholder="Your email" type="email"></Input>
        <Button>
          <SendOutlinedIcon />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
