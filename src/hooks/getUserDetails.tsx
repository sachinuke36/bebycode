import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { toast } from 'react-toastify';

const getUserDetails = () => {
    const {user, selectedUser, setAllUsers } = useAuth();
    if(!user) return null;

    const getUsers = async () => {
          const querySnapShot = await getDocs(collection(db, "students"));
          const allUsers = querySnapShot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setAllUsers(allUsers);
         }
    const UserData = async () => {
        const q = query(collection(db, "students"), where("userId", "==", selectedUser));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data();
          console.log("Document data:", docData);
          return docData;
        } else {
          console.log("No such document!");
          toast.error("No such document!");
          return null;
        }
      }
  return { getUsers, UserData }
}

export default getUserDetails
