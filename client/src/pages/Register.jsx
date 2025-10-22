import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../reponsive";
import { useDispatch, useSelector } from "react-redux";
import { registerStart } from "../redux/apiCalls";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../ui/error";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { validationField } from "../utils/validationError";

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
    content: "";
    position: absolute;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.03) 1px,
      transparent 1px
    );
    background-size: 50px 50px;
    animation: drift 20s linear infinite;
  }

  @keyframes drift {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(50px, 50px);
    }
  }
`;

const Wrapper = styled.div`
  width: 550px;
  max-width: 90%;
  padding: 50px 40px;
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
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
    content: "";
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

const FullWidthInputWrapper = styled(InputWrapper)`
  min-width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px 20px;
  font-size: 15px;
  border: 2px solid ${(props) => (props.error ? "red" : "#e0e0e0")};
  background-color: #fafafa;
  color: #1a1a1a;
  transition: all 0.3s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.error ? "red" : "#1a1a1a")};
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

const EyeIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #666;
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
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
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
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };



  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate all fields
    const validationErrors = {
      ...validationField("firstName", formData.firstName),
      ...validationField("lastName", formData.lastName),
      ...validationField("userName", formData.userName),
      ...validationField("email", formData.email),
      ...validationField("password", formData.password),
      ...validationField("confirmPassword", formData.confirmPassword),
      ...validationField("passwordMatch" , {"password" : formData.password , "confirmPassword" : formData.password})
    };

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      console.log(validationErrors)
      return;
    }

    try {
      const data = await registerStart(dispatch, formData);
      if (data) navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE ACCOUNT</Title>
        <Form onSubmit={handleRegister}>
          <InputWrapper>
            <Input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              error={errors.firstName}
            />

            {errors.firstName && (
              <ErrorWrapper>
                <ErrorMessage error={errors.firstName} />
              </ErrorWrapper>
            )}
          </InputWrapper>

          <InputWrapper>
            <Input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              error={errors.lastName}
            />
            {errors.lastName && (
              <ErrorWrapper>
                <ErrorMessage error={errors.lastName} />
              </ErrorWrapper>
            )}
          </InputWrapper>

          <FullWidthInputWrapper>
            <Input
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="Username"
              error={errors.userName}
            />
            {errors.userName && (
              <ErrorWrapper>
                <ErrorMessage error={errors.userName} />
              </ErrorWrapper>
            )}
          </FullWidthInputWrapper>

          <FullWidthInputWrapper>
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              type="email"
              error={errors.email}
            />
            {errors.email && (
              <ErrorWrapper>
                <ErrorMessage error={errors.email} />
              </ErrorWrapper>
            )}
          </FullWidthInputWrapper>

          <InputWrapper>
            <Input
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              error={errors.password}
            />
            { formData.password && 
              <EyeIcon onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <VisibilityIcon style={{ fontSize: "18px" }} />
              ) : (
                <VisibilityOffIcon style={{ fontSize: "18px" }} />
              )}
            </EyeIcon>
            }
            
            {errors.password && (
              <ErrorWrapper>
                <ErrorMessage error={errors.password || errors.passwordMatch} />
              </ErrorWrapper>
            )}
          </InputWrapper>

          <InputWrapper>
            <Input
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              error={errors.confirmPassword}
            />
            {formData.confirmPassword &&
              <EyeIcon
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <VisibilityIcon style={{ fontSize: "18px" }} />
              ) : (
                <VisibilityOffIcon style={{ fontSize: "18px" }} />
              )}
            </EyeIcon> }
            
            {errors.confirmPassword && (
              <ErrorWrapper>
                <ErrorMessage error={errors.confirmPassword || errors.passwordMatch} />
              </ErrorWrapper>
            )}
          </InputWrapper>
          

          {errors.passwordMatch && !errors.password && !errors.confirmPassword && (
          <ErrorWrapper>
                <ErrorMessage error={errors.passwordMatch} />
          </ErrorWrapper>
          )}

          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>

          <ButtonWrapper>
            <Button type="submit" disabled={isFetching}>
              CREATE
            </Button>
          </ButtonWrapper>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
