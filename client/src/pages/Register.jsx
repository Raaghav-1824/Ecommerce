import React from "react";
import styled from "styled-components";
import { mobile } from "../reponsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 300;
  padding-left:5px;
  ${mobile({ fontSize: "18px" })}
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  margin: 20px 10px 0 5px;
  padding: 10px;
  min-width: 40%;
  text-align: left;
  ${mobile({ minWidth: "30%", height: "10px" })}
`;

const Agreement = styled.span`
  font-size: 15px;
  font-weight: 200;
  margin: 20px 0;
  padding : 10px;
  text-align: left;
  ${mobile({ fontSize: "13px", margin: "15px 0" })}
`;

const Button = styled.button`
  width: 40%;
  font-size: 20px;
  font-weight: 200;
  padding: 10px;
  margin-left :7px;
  background-color: teal;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: teal;
    border: 1px solid teal;
  }
  ${mobile({ fontSize: "15px", width: "30%", padding: "7px" })}
`;

const Register = () => {
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="First Name" />
          <Input placeholder="Last Name" />
          <Input placeholder="Username" />
          <Input placeholder="Email" />
          <Input placeholder="Password" />
          <Input placeholder="Confirm Password" />
          <Agreement>
            {" "}
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
