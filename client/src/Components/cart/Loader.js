import React from "react";
// import "./Loader.css";
import { PuffLoader } from "react-spinners";
import styled from "styled-components";

const LoaderContainer = styled.div`
display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`
    
const Loader = () => {
  return (
    <LoaderContainer>
      <PuffLoader color={"#DDD"} size={155} />
    </LoaderContainer>
  );
};

export default Loader;