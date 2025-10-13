import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { login, registerStart } from "../redux/apiCalls";
import { mobile } from "../reponsive";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../redux/userRedux";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: drift 20s linear infinite;
  }
  
  @keyframes drift {
    0% { transform: translate(0, 0); }
    100% { transform: translate(50px, 50px); }
  }
`;

const Wrapper = styled.div`
  width: 400px;
  padding: 50px 40px;
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  /* border-radius: 20px; */
  position: relative;
  z-index: 1;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 70px rgba(0, 0, 0, 0.6);
  }
  
  ${mobile({ width: "85%", padding: "40px 30px" })}
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 35px;
  color: #1a1a1a;
  letter-spacing: 2px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #1a1a1a, #666);
  }
  
  ${mobile({ fontSize: "26px" })}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px 20px;
  font-size: 15px;
  border: 2px solid #e0e0e0;
  /* border-radius: 10px; */
  background-color: #fafafa;
  color: #1a1a1a;
  transition: all 0.3s ease;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #1a1a1a;
    background-color: #fff;
    box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.05);
  }
  
  &::placeholder {
    color: #999;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 1px;
  }
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 16px 20px;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: white;
  cursor: pointer;
  margin-top: 10px;
  /* border-radius: 10px; */
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover:not(:disabled)::before {
    left: 100%;
  }
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    background: linear-gradient(135deg, #666 0%, #888 100%);
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
`;

const Link = styled.a`
  font-size: 13px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  position: relative;
  
  &:hover {
    color: #1a1a1a;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 1px;
    background: #1a1a1a;
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, #e0e0e0, transparent);
  margin: 10px 0;
`;

const Error = styled.span`
  color: #d32f2f;
  font-size: 14px;
  text-align: center;
  padding: 12px;
  background-color: rgba(211, 47, 47, 0.1);
  /* border-radius: 8px; */
  border-left: 3px solid #d32f2f;
  animation: shake 0.3s ease;
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching, error, currentUser, isAuthenticated } = useSelector((state) => state.user);


  console.log(isFetching, error, currentUser, isAuthenticated)
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const userData = await login(dispatch, { username, password });
      // console.log(userData)
      // console.log("Authentication check", isAuthenticated);
      if (userData) {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleCreateUser = (e) => {
    navigate("/register");
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <InputWrapper>
            <Input
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputWrapper>
          <Button onClick={handleClick} disabled={isFetching}>            {isFetching ? "SIGNING IN..." : "LOGIN"}
          </Button>
          {error && <Error>Something went wrong...</Error>}
          <Divider />
          <LinksContainer>
            <Link>Forgot your password?</Link>
            <Link onClick={handleCreateUser}>Create a new account</Link>
          </LinksContainer>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;