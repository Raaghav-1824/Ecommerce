import React from "react";
import styled from "styled-components";
import { mobile } from "../reponsive";
import { useDispatch, useSelector } from "react-redux";
// import { register } from "../redux/userRedux";
import { registerStart } from "../redux/apiCalls";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../ui/error";
// import { useForm, SubmitHandler } from "react-hook-form"


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: drift 20s linear infinite;
  }
  
  @keyframes drift {
    0% { transform: translate(0, 0); }
    100% { transform: translate(50px, 50px); }
  }
`;

const Wrapper = styled.div`
  width: 550px;
  max-width: 90%;
  padding: 50px 40px;
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  /* border-radius: 20px; */
  position: relative;
  z-index: 1;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 70px rgba(0, 0, 0, 0.6);
  }
  
  ${mobile({ width: "85%", padding: "40px 25px" })}
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 35px;
  color: #1a1a1a;
  letter-spacing: 2px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, #1a1a1a, #666);
  }
  
  ${mobile({ fontSize: "24px" })}
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const InputWrapper = styled.div`
  flex: 1;
  min-width: calc(50% - 8px);
  position: relative;
  
  ${mobile({ minWidth: "100%" })}
`;

const Input = styled.input`
  width: 100%;
  padding: 15px 20px;
  font-size: 15px;
  border: 2px solid #e0e0e0;
  /* border-radius: 10px; */
  background-color: #fafafa;
  color: #1a1a1a;
  transition: all 0.3s ease;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #1a1a1a;
    background-color: #fff;
    box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.05);
  }
  
  &::placeholder {
    color: #999;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 1px;
  }
  
  ${mobile({ padding: "12px 15px", fontSize: "14px" })}
`;

const FullWidthInputWrapper = styled(InputWrapper)`
  min-width: 100%;
`;

const Agreement = styled.span`
  font-size: 13px;
  font-weight: 400;
  color: #666;
  line-height: 1.6;
  text-align: center;
  width: 100%;
  margin: 10px 0;
  
  b {
    color: #1a1a1a;
    font-weight: 600;
    cursor: pointer;
    transition: color 0.3s ease;
    
    &:hover {
      color: #000;
      text-decoration: underline;
    }
  }
  
  ${mobile({ fontSize: "12px", margin: "10px 0" })}
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Button = styled.button`
  width: 60%;
  font-size: 16px;
  font-weight: 600;
  padding: 16px 20px;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: white;
  border: none;
  cursor: pointer;
  /* border-radius: 10px; */
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  ${mobile({ fontSize: "14px", width: "70%", padding: "12px 15px" })}
`;

const ErrorWrapper = styled.div`
  width: 100%;
  margin-top: 5px;
`;

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passworderror, setPassworderror] = useState(null);
  const { isFetching, error, currentUser } = useSelector((state) => state.user);

  // useEffect(() => {
  //   if (currentUser) navigate("/");
  // }, [currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev, [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setPassworderror("");
    if (formData.password !== formData.confirmPassword) {
      setPassworderror("Password does not match");
      return;
    }
    try {
      const data = await registerStart(dispatch, formData);
      // console.log("Component response " ,data);
      if (data) navigate("/");
    } catch (e) {
      console.error(e)
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE ACCOUNT</Title>
        <Form>
          <InputWrapper>
            <Input
              value={formData.firstName}
              name="firstName"
              onChange={handleChange}
              placeholder="First Name"
              required
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              value={formData.lastName}
              name="lastName"
              onChange={handleChange}
              placeholder="Last Name"
              required
            />
          </InputWrapper>
          <FullWidthInputWrapper>
            <Input
              value={formData.userName}
              name="userName"
              onChange={handleChange}
              placeholder="Username"
              required
            />
          </FullWidthInputWrapper>
          <FullWidthInputWrapper>
            <Input
              value={formData.email}
              name="email"
              onChange={handleChange}
              placeholder="Email"
              type="email"
              required
            />
          </FullWidthInputWrapper>
          <InputWrapper>
            <Input
              value={formData.password}
              name="password"
              onChange={handleChange}
              placeholder="Password"
              type="password"
              required
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              value={formData.confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
              placeholder="Confirm Password"
              type="password"
              required
            />
          </InputWrapper>
          {passworderror && (
            <ErrorWrapper>
              <ErrorMessage error={passworderror} />
            </ErrorWrapper>
          )}
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <ButtonWrapper>
            <Button onClick={handleRegister}>CREATE</Button>
          </ButtonWrapper>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;