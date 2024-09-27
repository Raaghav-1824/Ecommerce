import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { resetCart } from '../redux/cartRedux';

const ClearStore = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  background-color: black;
  color: white;

`;

const ClearCartButton = () => {
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(resetCart());
  };

  return (
    <ClearStore onClick={handleClearCart}>Clear Cart</ClearStore>
  );
};

export default ClearCartButton;
