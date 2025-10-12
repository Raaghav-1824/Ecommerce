import React, { useEffect, useState } from "react";
import AddOutlined from "@mui/icons-material/AddOutlined";
import RemoveOutlined from "@mui/icons-material/RemoveOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import styled from "styled-components";
import Announcements from "../Components/home/Announcements";
import Footer from "../Components/layout/Footer";
import Navbar from "../Components/layout/Navbar";
import Newsletter from "../Components/home/Newsletter";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { mobile } from "../reponsive";
import axios from "axios";

const Container = styled.div`
  background: #ffffff;
  min-height: 100vh;
`;

const Wrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 80px 60px;
  display: flex;
  gap: 80px;
  
  ${mobile({ 
    padding: "40px 20px",
    flexDirection: "column",
    gap: "40px"
  })}
`;

const ImgContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MainImageWrapper = styled.div`
  width: 80%;
  height: 600px;
  background: #f8f8f8;
  border: 1px solid #e0e0e0;
  overflow: hidden;
  position: relative;
  
  ${mobile({ height: "400px" })}
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: zoom-in;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Breadcrumb = styled.div`
  font-size: 12px;
  color: #666;
  letter-spacing: 1px;
  text-transform: uppercase;
  
  span {
    margin: 0 8px;
    color: #ccc;
  }
`;

const Title = styled.h1`
  font-size: 42px;
  font-weight: 200;
  color: #1a1a1a;
  text-transform: uppercase;
  letter-spacing: 4px;
  margin: 0;
  line-height: 1.2;
  
  ${mobile({ fontSize: "32px", letterSpacing: "2px" })}
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: baseline;
  gap: 20px;
  /* padding: 10px 0; */
  /* border-top: 1px solid #e0e0e0; */
  /* border-bottom: 1px solid #e0e0e0; */
`;

const Price = styled.span`
  font-weight: 300;
  font-size: 48px;
  color: #1a1a1a;
  letter-spacing: 2px;
  
  ${mobile({ fontSize: "36px" })}
`;

const OldPrice = styled.span`
  font-size: 24px;
  color: #999;
  text-decoration: line-through;
`;

const Desc = styled.p`
  font-size: 15px;
  line-height: 1.8;
  color: #666;
  letter-spacing: 0.5px;
  margin: 0;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 30px 0;
`;

const Filter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FilterTitle = styled.span`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #1a1a1a;
`;

const ColorOptions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const FilterColor = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  cursor: pointer;
  border: 2px solid ${(props) => props.selected ? '#1a1a1a' : '#e0e0e0'};
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    border-color: #1a1a1a;
    transform: scale(1.1);
  }
  
  ${props => props.selected && `
    &::after {
      content: '✓';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: ${props.color === '#ffffff' || props.color === 'white' ? '#1a1a1a' : '#ffffff'};
      font-size: 16px;
      font-weight: bold;
    }
  `}
`;

const SizeOptions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const FilterSize = styled.button`
  padding: 12px 20px;
  border: 1px solid ${(props) => props.selected ? '#1a1a1a' : '#e0e0e0'};
  background: ${(props) => props.selected ? '#1a1a1a' : '#ffffff'};
  color: ${(props) => props.selected ? '#ffffff' : '#1a1a1a'};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &:hover {
    border-color: #1a1a1a;
    background: #1a1a1a;
    color: #ffffff;
  }
`;

const AddContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 30px 0;
  
  ${mobile({ 
    flexDirection: "column",
    alignItems: "stretch"
  })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #1a1a1a;
  height: 50px;
`;

const AmountButton = styled.button`
  width: 50px;
  height: 100%;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f8f8f8;
  }
  
  &:active {
    background: #e0e0e0;
  }
  
  svg {
    font-size: 18px;
    color: #1a1a1a;
  }
`;

const Amount = styled.span`
  min-width: 60px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  flex: 1;
  
  ${mobile({ 
    flexDirection: "column"
  })}
`;

const Button = styled.button`
  flex: 1;
  padding: 16px 40px;
  border: 1px solid #1a1a1a;
  background: ${props => props.primary ? '#1a1a1a' : '#ffffff'};
  color: ${props => props.primary ? '#ffffff' : '#1a1a1a'};
  cursor: pointer;
  font-weight: 600;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: ${props => props.primary ? '#ffffff' : '#1a1a1a'};
    transition: left 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    z-index: 0;
  }
  
  &:hover::before {
    left: 0;
  }
  
  &:hover {
    color: ${props => props.primary ? '#1a1a1a' : '#ffffff'};
  }
  
  span {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
`;

const IconButton = styled.button`
  width: 50px;
  height: 50px;
  border: 1px solid #1a1a1a;
  background: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: #1a1a1a;
    
    svg {
      color: #ffffff;
    }
  }
  
  svg {
    font-size: 22px;
    color: #1a1a1a;
    transition: color 0.3s ease;
  }
`;

const Features = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 30px 0;
  border-top: 1px solid #e0e0e0;
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  
  svg {
    font-size: 24px;
    color: #1a1a1a;
  }
`;

const FeatureText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  
  strong {
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #1a1a1a;
  }
  
  span {
    font-size: 12px;
    color: #666;
    letter-spacing: 0.5px;
  }
`;

const LoadingState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  
  &::after {
    content: '';
    width: 50px;
    height: 50px;
    border: 2px solid #f0f0f0;
    border-top: 2px solid #1a1a1a;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:3000/api/products/find/${id}`
        );
        setProduct(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...product, quantity, color, size }));
  };
  
  if (loading) {
    return (
      <Container>
        <Navbar />
        <LoadingState />
        <Footer />
      </Container>
    );
  }

  return (
    <Container>
      <Navbar />
      {/* <Announcements /> */}
      
      <Wrapper>
        <ImgContainer>
          <MainImageWrapper>
            <Image src={product.img} alt={product.title} />
          </MainImageWrapper>
        </ImgContainer>
        
        <InfoContainer>
          <Breadcrumb>
            Home <span>/</span> Products <span>/</span> {product.title}
          </Breadcrumb>
          
          <Title>{product.title}</Title>
          
          <PriceContainer>
            <Price>$ {product.price}</Price>
            {product.oldPrice && <OldPrice>$ {product.oldPrice}</OldPrice>}
          </PriceContainer>
          
          <Desc>{product.desc}</Desc>
          
          <FilterContainer>
            <Filter>
              <FilterTitle>Select Color</FilterTitle>
              <ColorOptions>
                {product.color?.map((c) => (
                  <FilterColor 
                    color={c} 
                    key={c} 
                    selected={color === c}
                    onClick={() => setColor(c)} 
                  />
                ))}
              </ColorOptions>
            </Filter>
            
            <Filter>
              <FilterTitle>Select Size</FilterTitle>
              <SizeOptions>
                {product.size?.map((s) => (
                  <FilterSize 
                    key={s}
                    selected={size === s}
                    onClick={() => setSize(s)}
                  >
                    {s}
                  </FilterSize>
                ))}
              </SizeOptions>
            </Filter>
          </FilterContainer>
          
          <AddContainer>
            <AmountContainer>
              <AmountButton onClick={() => handleQuantity("dec")}>
                <RemoveOutlined />
              </AmountButton>
              <Amount>{quantity}</Amount>
              <AmountButton onClick={() => handleQuantity("inc")}>
                <AddOutlined />
              </AmountButton>
            </AmountContainer>
            
            <ButtonGroup>
              <Button primary onClick={handleClick}>
                <span>Add to Cart</span>
              </Button>
              <IconButton>
                <FavoriteBorderOutlinedIcon />
              </IconButton>
            </ButtonGroup>
          </AddContainer>
          
          <Features>
            <Feature>
              <LocalShippingOutlinedIcon />
              <FeatureText>
                <strong>Free Shipping</strong>
                <span>On orders over $100</span>
              </FeatureText>
            </Feature>
            <Feature>
              <SecurityOutlinedIcon />
              <FeatureText>
                <strong>Secure Payment</strong>
                <span>100% secure transaction</span>
              </FeatureText>
            </Feature>
          </Features>
        </InfoContainer>
      </Wrapper>
      
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;