import { Route, Routes } from "react-router-dom"
import Register from "./components/Register"
import { useAuth } from "./context/AuthContext";
import Home from "./components/Home";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";
import GetUser from "./utils/GetUser";
import React, { useEffect } from "react";
import UserInformation from "./components/UserInformation";
import { ToastContainer, toast } from 'react-toastify';


const App = () => {
      const { user } = useAuth();
      const [userData, setUserData] = React.useState<any>(null);

      useEffect(()=>{
        const getUserData = async () => {
          if (!user) return;
          const q = query(collection(db, "students"), where("userId", "==", user.uid));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const docData = querySnapshot.docs[0].data();
            console.log("Document data:", docData);
            setUserData(docData);
          } else {
            console.log("No such document!");
            setUserData(null);
          }
      }
    getUserData();
      },[user])

      
  return (
    <div>
      <Routes>
        {
          user ? (
            <Route path="/" element={userData ? <Home/> : <UserInformation/>} />
          ) : (
            <Route path="/" element={<Register/>} />
          )
        }
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </div>
  )
}

export default App
