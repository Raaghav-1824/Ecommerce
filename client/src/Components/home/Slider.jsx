import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import ArrowLeftOutlinedIcon from "@mui/icons-material/ArrowLeftOutlined";
// import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import { sliderItems } from "../../data";
import { mobile } from "../../reponsive";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  background: #f8f9fa;
  ${mobile({ height: "100vh" })}
`;

const Arrow = styled.div`
  height: 50px;
  width: 50px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  opacity: 0;
  z-index: 2;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  ${Container}:hover & {
    opacity: 1;
  }

  &:hover {
    background-color: #fff;
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  left: ${(props) => props.direction === "left" && "20px"};
  right: ${(props) => props.direction === "right" && "20px"};

  ${mobile({
    opacity: 1,
    height: "40px",
    width: "40px",
    left: (props) => props.direction === "left" && "10px",
    right: (props) => props.direction === "right" && "10px"
  })}
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(${(props) => props.sliderIndex * -100}vw);
`;

const Slide = styled.div`
  height: 100%;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #${props => props.bg};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0) 100%
    );
    z-index: 1;
  }

  ${mobile({ 
    flexDirection: "column", 
    justifyContent: "flex-start",
    background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 100%)"
  })}
`;

const ImgContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const Image = styled.img`
  height: 90%;
  width: auto;
  max-width: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));

  ${Slide}:hover & {
    transform: scale(1.05);
  }

  ${mobile({ 
    height: "70%",
    marginTop: "20px"
  })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
  color: #333;
  text-align: left;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  ${mobile({ 
    textAlign: "center", 
    padding: "20px", 
    position: "absolute", 
    bottom: "5%", 
    width: "100%",
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(5px)"
  })}
`;

const Title = styled.h1`
  font-size: 60px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #1a1a1a;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s ease forwards;
  
  ${mobile({ 
    fontSize: "32px",
    marginBottom: "10px"
  })}
`;

const Desc = styled.p`
  margin: 20px 0;
  font-weight: 500;
  font-size: 18px;
  letter-spacing: 1px;
  color: #555;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s ease 0.2s forwards;
  
  ${mobile({ 
    fontSize: "16px",
    margin: "10px 0",
    display: "block"
  })}
`;

const Button = styled.button`
  font-size: 18px;
  padding: 12px 30px;
  border: 2px solid #1a1a1a;
  background-color: transparent;
  color: #1a1a1a;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  border-radius: 30px;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s ease 0.4s forwards;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background-color: #1a1a1a;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  ${mobile({
    fontSize: "16px",
    padding: "10px 25px"
  })}
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 2;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#1a1a1a' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.active ? '#1a1a1a' : 'rgba(255, 255, 255, 0.8)'};
  }
`;

// Add styled components for the hero section
const HeroContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0.1) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 80px;
  z-index: 2;
  color: white;

  ${mobile({
    padding: "0 20px",
    alignItems: "center",
    textAlign: "center",
    // flexDirection: "row"
  })}
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 1s ease forwards;

  ${mobile({
    fontSize: "2.5rem",
    marginBottom: "15px",
    letterSpacing: "1px"
  })}
`;

const HeroDescription = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.6;
  margin-bottom: 30px;
  max-width: 600px;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 1s ease 0.3s forwards;

  ${mobile({
    fontSize: "1rem",
    marginBottom: "20px",
    maxWidth: "100%"
  })}
`;

const HeroButton = styled.button`
  font-size: 1.1rem;
  padding: 15px 40px;
  border: 2px solid white;
  background-color: transparent;
  color: white;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  border-radius: 30px;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 1s ease 0.6s forwards;

  &:hover {
    background-color: white;
    color: #1a1a1a;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
  }

  ${mobile({
    fontSize: "1rem",
    padding: "12px 30px"
  })}
`;

// Add keyframes for animation
const keyframes = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Slider = () => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const navigate = useNavigate();

  const handleClick = (direction) => {
    if (direction === "left") {
      setSliderIndex(sliderIndex > 0 ? sliderIndex - 1 : sliderItems.length - 1);
    } else {
      setSliderIndex(sliderIndex < sliderItems.length - 1 ? sliderIndex + 1 : 0);
    }
  };

  const handleBtnClick = () => {
    navigate("/products");
  };

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setSliderIndex((prevIndex) => 
        prevIndex < sliderItems.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Container>
      <style>{keyframes}</style>
      
      {/* <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlinedIcon />
      </Arrow>
      <Wrapper sliderIndex={sliderIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} alt={item.title} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Button onClick={handleBtnClick}>Shop Now</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlinedIcon />
      </Arrow>
      <DotsContainer>
        {sliderItems.map((_, index) => (
          <Dot 
            key={index} 
            active={index === sliderIndex}
            onClick={() => setSliderIndex(index)}
          />
        ))}
      </DotsContainer> */}

      <HeroContainer>
        <BackgroundVideo
          autoPlay
          loop
          muted
          playsInline
          src="https://res.cloudinary.com/djkdzifmo/video/upload/v1760210485/7871230-uhd_4096_2160_25fps_hum2hy.mp4"
          type="video/mp4"
        />
        <Overlay>
          <HeroTitle>FEEL STRONG FEEL FASHIONABLE</HeroTitle>
          <HeroDescription>
            "Fashion is not something that exists in dresses only. Fashion is in the sky, in the street, fashion has to do with ideas, the way we live, what is happening."
          </HeroDescription>
          <HeroButton onClick={handleBtnClick}>BUY NOW</HeroButton>
        </Overlay>
      </HeroContainer>
    </Container>
  );
};

export default Slider;
