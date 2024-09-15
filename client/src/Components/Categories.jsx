import React from 'react'
import styled from 'styled-components'
import CategoryItem from './CategoryItem'
import { categories } from '../data';
import { mobile } from "../reponsive";


const Container = styled.div`
display:flex;
justify-content: space-between;
padding : 10px;
${mobile({flexDirection : "column" , padding :"0px"})}

`;

const Categories = () => {
  return (
    <Container>
        {categories.map((item)=>{
            return( <CategoryItem items = {item}/>)
            
        })}
    </Container>
  )
}

export default Categories