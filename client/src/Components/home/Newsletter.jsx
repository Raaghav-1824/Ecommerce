import React, { useState } from "react";
import styled from "styled-components";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { mobile } from "../../reponsive";

const Container = styled.div`
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
`;

const ContentSection = styled.div`
  flex: 1;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 3;
  height: 100%;
  padding: 40px;

  /* Create diagonal cut - tilted clockwise */
  clip-path: polygon(0 0, 85% 0, 100% 100%, 0% 100%);
  
  ${mobile({
    clipPath: "none",
    padding: "20px",
  })}
`;

const EmptySection = styled.div`
  flex: 1;
  position: relative;
  z-index: 2;
  height: 100%;
  
  ${mobile({
    display: "none",
  })}
`;

const ContentWrapper = styled.div`
  text-align: center;
  position: relative;
  max-width: 600px;
  width: 100%;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 4vw, 3.5rem);
  margin-bottom: 24px;
  text-align: center;
  color: #1a1a1a;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
  
  ${mobile({ 
    fontSize: "2rem",
    marginBottom: "16px"
  })}
`;

const Desc = styled.p`
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-weight: 500;
  color: #333;
  margin-bottom: 48px;
  line-height: 1.6;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  
  ${mobile({ 
    fontSize: "1rem",
    marginBottom: "32px",
  })}
`;

const InputContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 500px;
  height: 56px;
  margin: 0 auto;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #ddd;
  border-radius: 4px;
  
  &:focus-within {
    border-color: #1a1a1a;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  ${mobile({ 
    width: "100%",
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
    padding: "0 16px",
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
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.98);
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
  border-radius: 8px;
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
      <VideoBackground autoPlay loop muted playsInline>
        <source 
          src="https://res.cloudinary.com/djkdzifmo/video/upload/v1760306141/subscribe_dd1xxx.mp4" 
          type="video/mp4" 
        />
      </VideoBackground>

      <ContentSection>
        <ContentWrapper>
          <Desc> SUBSCRIBE OUR WEBSITE AND BECOME A MEMBER OF OUR WEBSITE</Desc>
          <form onSubmit={handleSubmit}>
            <InputContainer>
              <Input
                placeholder="EMAIL"
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
      </ContentSection>

      <EmptySection />
    </Container>
  );
};

export default Newsletter;