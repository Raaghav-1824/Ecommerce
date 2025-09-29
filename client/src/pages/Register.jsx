import React from "react";
import styled from "styled-components";
import { mobile } from "../reponsive";
import { useDispatch , useSelector } from "react-redux";
import { register } from "../redux/userRedux";
import { registerStart } from "../redux/apiCalls";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../ui/error";

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 5px 10px grey;
  border-radius: 10px;
  ${mobile({ width: "75%" })}
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 300;
  padding-left:5px;
  ${mobile({ fontSize: "18px" })}
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  margin: 20px 10px 0 5px;
  padding: 10px;
  min-width: 40%;
  text-align: left;
  ${mobile({ minWidth: "30%", height: "10px" })}
`;

const Agreement = styled.span`
  font-size: 15px;
  font-weight: 200;
  margin: 20px 0;
  padding : 10px;
  text-align: left;
  ${mobile({ fontSize: "13px", margin: "15px 0" })}
`;

const Button = styled.button`
  width: 40%;
  font-size: 20px;
  font-weight: 200;
  padding: 10px;
  margin-left :7px;
  background-color: teal;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: teal;
    border: 1px solid teal;
  }
  ${mobile({ fontSize: "15px", width: "30%", padding: "7px" })}
`;

const Register = () => {
  const [formData , setFormData] = useState({
    firstName : '',
    lastName : '',
    userName : '',
    email : '',
    password :'',
    confirmPassword : '',
      
  })

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passworderror , setPassworderror] = useState(null);
  const {isFetching , error ,currentUser} =  useSelector((state) => state.user);
 

  const handleChange = (e) => {
    const {name , value} = e.target;
     setFormData((prev) =>( { 
      ...prev ,[name] : value
     }))
  }

  const handleRegister = (e) => {
     e.preventDefault();
    setPassworderror("");
     if(formData.password !== formData.confirmPassword){
         setPassworderror("Password does not match");
         return;
    }
     registerStart(dispatch , formData).then(()=>{
        if(currentUser){
          navigate("/"); 
        }
     })
  }

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input value ={formData.firstName} name = "firstName" onChange = {handleChange}  placeholder="First Name" />
          <Input value ={formData.lastName} name = "lastName" onChange = {handleChange} placeholder="Last Name" />
          <Input value ={formData.userName} name = "userName" onChange = {handleChange} placeholder="Username" />
          <Input value ={formData.email} name = "email" onChange = {handleChange} placeholder="Email" />
          <Input value ={formData.password} name = "password" onChange = {handleChange} placeholder="Password" />
          <Input value ={formData.confirmPassword} name = "confirmPassword" onChange = {handleChange} placeholder="Confirm Password" />
          {passworderror && (
            <ErrorMessage error = {passworderror}/>
          )}
          <Agreement>
            {" "}
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleRegister}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
