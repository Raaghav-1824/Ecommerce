import { Children, useState } from "react";
import AuthenticationContext from "./authContext";

const  AuthProvider  = ({Children}) => {

    const [isAuthenticated , setUserAuthentication] = useState();
    

    return (
        <AuthenticationContext.Provider value = {isAuthenticated}>
            <div>
                {Children}
            </div>
        </AuthenticationContext.Provider>
    )
}

export default AuthProvider;