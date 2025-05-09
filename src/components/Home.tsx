import { signOut } from "firebase/auth";
import Left from "./Left"
import { CgProfile } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";
import { auth } from "../firebase";
import Right from "./Right";
import { toast } from "react-toastify";


const Home = () => {
  return (
    <div>
      <nav className="bg-gray-800 p-4 flex justify-between items-center px-6">
        <h2 className="text-white font-bold">StudentsInfo</h2>
        <ul className="flex space-x-4">
          <li onClick={
            ()=>{
                signOut(auth);
                window.location.reload();
            }
          } className="text-white text-2xl cursor-pointer"><IoMdLogOut /></li>
          </ul>
      </nav>
      {/* left container containing students list */}
      <div className="flex">
      <Left/>
      {/* right container containing information of selected student */}
      <Right/>
      </div>
    </div>
  )
}

export default Home
