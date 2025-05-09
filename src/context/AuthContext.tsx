import React, { createContext, use, useContext, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext<any>(null);
export const useAuth=()=> useContext(AuthContext)

const AuthProvider =({children}: { children: React.ReactNode }) => {
    const [user, setUser]= useState<any>(null);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [allUsers, setAllUsers] = useState<any>(null);
    const navigate = useNavigate();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user);
            navigate('/');

        } else {
            console.log("User is not logged in");
        }
      });
    return(<AuthContext.Provider value={{user, setUser, selectedUser, setSelectedUser, allUsers, setAllUsers}}>
        {children}
    </AuthContext.Provider>)
}

export default AuthProvider