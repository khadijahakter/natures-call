import {useState, createContext} from "react";

export const AuthContext = createContext();

 const AuthProvider = ({children}) =>{
    console.log("AuthProvider component initialized from AuthContext.jsx");
    const[currentUser, setCurrentUser] = useState(null);

    return(
            <AuthContext.Provider value = {{currentUser, setCurrentUser}}>
            {children}
            </AuthContext.Provider>
          //      <h1> {currentUser}</h1>
    );
};
    

export default AuthProvider;