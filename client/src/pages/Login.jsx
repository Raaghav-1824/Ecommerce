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
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
    center;
  background-size: cover;
   display: flex;
  justify-content: center;
  align-items: center;
`;


const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({width :"75%"})}
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  margin: 20px 10px 0 0;
  padding: 10px;
  min-width: 80%;
`;

const Button = styled.button`
  width: 30%;
  padding: 10px;
  background-color: teal;
  color: white;
  border: none;
  cursor: pointer;
  margin : 10px 0;
  letter-spacing: 2px;
  &:hover {
    background-color: white;
    color: teal;
    border: 1px solid teal;
  }
  
`;

const Link = styled.a`
   margin: 5px 0;
   font-size: 15px;
   font-weight: 200;
   text-decoration: underline;
   cursor: pointer;
`;

const Login = () => {
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input placeholder="Email" />
          <Input placeholder="Password" />
          <Button>LOG IN</Button>
          <Link>Forgot Password ?</Link>
          <Link>Create Account</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
