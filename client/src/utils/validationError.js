  export const validationField = (name, value) => {
    const newErrors = {};
    switch (name) {
      case "firstName":
      case "lastName":
        if (value.length < 2)
          newErrors[name] = `${
            value.charAt(0).toUpperCase() + value.slice(1)
          } must be at least 2 characters.`;
        else if (!/^[A-Za-z]+$/.test(value))
          newErrors[name] = `${
            value.charAt(0).toUpperCase() + value.slice(1)
          } must contain only letters.`;
        break;
      case "userName":
        if (value.length < 4)
          newErrors.userName = "Username must be at least 4 characters.";
        else if (!/^[a-zA-Z0-9_]+$/.test(value))
          newErrors.userName =
            "Username can only contain letters, numbers, and underscores.";
        break;
      case "email":
        if (!value.length) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(value))
          newErrors.email = "Email is invalid";
        break;
      case "confirmPassword":
      case "password":
        if (value.length < 8)
          newErrors.password = "Password must be at least 8 characters.";
        else if (!/[A-Z]/.test(value))
          newErrors.password =
            "Password must contain at least one uppercase letter.";
        else if (!/[0-9]/.test(value))
          newErrors.password = "Password must contain at least one number.";
         break;

      case "passwordMatch":
        if (value.password !== value.confirmPassword)
           console.log(value.password , value.confirmPassword )
           newErrors.passwordMatch = "Passwords do not match.";
        break;
      default:
        break;
    }
    return newErrors;
  };



