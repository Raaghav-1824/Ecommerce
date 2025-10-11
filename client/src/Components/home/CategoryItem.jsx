import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../../reponsive";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease; /* Smooth transition for hover effect */
  ${mobile({ height: "20vh" })}

  &:hover {
    filter: brightness(1.1); /* Increase brightness on hover */
  }

  &:hover button {
    background-color: white;
    color: black;
    transform: scale(1.1); /* Slightly increase the button size */
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease; /* Smooth image zoom */
  ${mobile({ height: "20vh" })}

  ${Container}:hover & {
    transform: scale(1.05); /* Slightly zoom the image on hover */
  }
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
  transition: color 0.3s ease;

  ${Container}:hover & {
    color: #f4f4f4;
  }
`;

const Button = styled.button`
  border: none;
  padding: 10px 20px;
  background-color: transparent;
  color: gray;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background-color: white;
    color: black;
  }
`;

const CategoryItem = ({ items }) => {
  return (
    <Container>
      <Link to={`/products/${items.cat}`}>
        <Image src={items.img} />
        <Info>
          <Title>{items.title}</Title>
          <Button>SHOP NOW</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
