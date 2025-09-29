import React from "react";
import styled from "styled-components";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useState } from "react";

const Container = styled.div`
  height: 30px;
  background-color: #6767ef;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  color: white;
  font-size: 14px;
  padding: 0 1rem;
  display: ${({ isVisible }) => (isVisible ? "flex" : "none")};

`;

const Message = styled.p`
  margin: 0;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Announcements = () => {
  const [isVisible , setVisible] = useState(true);

  const handleClose = () => {
      setVisible(false)
  };

  return (
    <Container isVisible={isVisible}>
      <Message>Super Deal! Free Shipping on orders above ₹500</Message>
      <IconWrapper onClick={handleClose}>
        <CloseOutlinedIcon fontSize="small" />
      </IconWrapper>
    </Container>
  );
};

export default Announcements;
