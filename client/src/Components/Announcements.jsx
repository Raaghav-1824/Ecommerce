import React from 'react'
import styled from 'styled-components' ;

const Container= styled.div`
height :30px;
background-color : #6767ef;
display:flex;
align-items: center;
justify-content: center;
font-weight: 500;
color: white;
font-size: 14px;

`



const Announcements = () => {
  return (
    <Container>Super Deal ! Free Shiping on order above Rs.500.</Container>
  )
}

export default Announcements