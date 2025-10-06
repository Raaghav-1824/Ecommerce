import React, { useState } from "react";
import styled from "styled-components";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { mobile } from "../reponsive";

const Container = styled.div`
  min-height: 60vh;
  background-color: #f8f9fa;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 80px 20px;
  position: relative;
  
  ${mobile({ 
    minHeight: "50vh", 
    padding: "60px 20px" 
  })}
`;

const ContentWrapper = styled.div`
  text-align: center;
  z-index: 2;
  position: relative;
  max-width: 800px;
  width: 100%;
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: 24px;
  text-align: center;
  color: #1a1a1a;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
  
  ${mobile({ 
    fontSize: "2.5rem",
    marginBottom: "16px"
  })}
`;

const Desc = styled.p`
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-weight: 400;
  color: #555;
  margin-bottom: 48px;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  ${mobile({ 
    fontSize: "1rem",
    marginBottom: "32px",
    padding: "0 20px"
  })}
`;

const InputContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 500px;
  height: 56px;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #e0e0e0;
  
  &:focus-within {
    border-color: #2196f3;
    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1);
    transform: translateY(-2px);
  }
  
  ${mobile({ 
    width: "90%",
    height: "48px"
  })}
`;

const Input = styled.input`
  flex: 1;
  padding: 0 24px;
  border: none;
  background: transparent;
  font-size: 16px;
  color: #333;
  font-weight: 400;
  
  &::placeholder {
    color: #999;
    font-weight: 400;
  }
  
  &:focus {
    outline: none;
  }
  
  ${mobile({ 
    padding: "0 20px",
    fontSize: "14px"
  })}
`;

const Button = styled.button`
  flex: 0 0 56px;
  border: none;
  background-color: #1a1a1a;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #333;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  ${mobile({ 
    flex: "0 0 48px"
  })}
`;

const SuccessMessage = styled.div`
  margin-top: 20px;
  padding: 12px 24px;
  background: rgba(76, 175, 80, 0.1);
  border: 1px solid rgba(76, 175, 80, 0.3);
  border-radius: 12px;
  color: #4caf50;
  font-size: 14px;
  font-weight: 500;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
  
  &.show {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <Container>
      <ContentWrapper>
        <Title>Stay in the Loop</Title>
        <Desc>
          Get exclusive updates, early access to new products, and special offers delivered straight to your inbox.
        </Desc>
        <form onSubmit={handleSubmit}>
          <InputContainer>
            <Input 
              placeholder="Enter your email address" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit">
              <SendOutlinedIcon />
            </Button>
          </InputContainer>
        </form>
        {isSubmitted && (
          <SuccessMessage className="show">
            ✓ Thank you for subscribing! Check your inbox for confirmation.
          </SuccessMessage>
        )}
      </ContentWrapper>
    </Container>
  );
};

export default Newsletter;
