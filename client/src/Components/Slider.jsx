import React, { useState } from "react";
import styled from "styled-components";
import ArrowLeftOutlinedIcon from "@mui/icons-material/ArrowLeftOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import { sliderItems } from "../data";
import { mobile } from "../reponsive";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  height: 90vh;
  width: 100%;
  display: flex;
  position: relative;
  overflow: hidden;
  background-color: #${(props) => props.bg};
  ${mobile({ height: "60vh" })}
`;

const Arrow = styled.div`
  height: 50px;
  width: 50px;
  background-color: rgba(255, 255, 255, 0.8); /* Slightly transparent background */
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  opacity: 0.7;
  z-index: 2;
  transition: background-color 0.3s ease, opacity 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 1);
    opacity: 1;
  }
  
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: transform 1.5s ease;
  transform: translateX(${(props) => props.sliderIndex * -100}vw);
`;

const Slide = styled.div`
  height: 100%;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center; /* Center the content horizontally */
  background-color: #${(props) => props.bg};
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center; /* Center the image vertically */
`;

const Image = styled.img`
  height: 80%;
  max-width: 100%;
  object-fit: cover; /* Ensure the image covers the container */
  transition: transform 0.5s ease;
  
  ${Slide}:hover & {
    transform: scale(1.05); /* Slight zoom effect on hover */
  }
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
  color: black;
  text-align: left;
`;

const Title = styled.h1`
  font-size: 70px;
  font-weight: 700;
  margin-bottom: 20px;
  ${mobile({ fontSize: "40px" })}
`;

const Desc = styled.p`
  margin: 20px 0;
  font-weight: 500;
  font-size: 20px;
  letter-spacing: 2px;
  ${mobile({ fontSize: "16px" })}
`;

const Button = styled.button`
  font-size: 20px;
  padding: 10px 20px;
  border: none;
  background-color: white;
  color: black;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
  border-radius: 5px;
  
  &:hover {
    background-color: black;
    color: white;
    transform: scale(1.05);
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

  const handleBtnClick = () =>{
    // console.log("clicked")
    navigate("/products");
  }

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlinedIcon />
      </Arrow>
      <Wrapper sliderIndex={sliderIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Button onClick={handleBtnClick}>SHOP NOW</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlinedIcon />
      </Arrow>
    </Container>
  );
};

export default Slider;
