import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../reponsive";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
  transition: filter 0.3s ease; /* Smooth transition for the hover effect */
  ${mobile({ height: "20vh" })}

  &:hover {
    filter: brightness(1.1); /* Increase brightness on hover */
  }
`;


const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "20vh" })}

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
    color:white;
    margin-bottom: 20px;
`;

const Button = styled.button`
    border:none;
    padding: 10px;
    background-color: white;
    color:gray;
    cursor: pointer;
    font-weight: 600;
`;

const CategoryItem = ({ items }) => {
  return (
    <Container>
      <Link to={`/products/${items.cat}`}>
      {/* {console.log(items)} */}
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