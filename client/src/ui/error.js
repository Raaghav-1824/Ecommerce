import React from 'react'
import styled from 'styled-components'

const Error = styled.div`
  color: red;
  margin: 10px 0;
  font-size: 14px;
  padding: 10px;
  background-color: #ffe6e6;
  border-radius: 5px;
  border: 1px solid #ffcccc;
`

const ErrorMessage = ({error}) => {

  return (
    <Error>{error}</Error>
  )
}

export default ErrorMessage