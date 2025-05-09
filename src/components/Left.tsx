import React, { useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import getUserDetails from "../hooks/getUserDetails";
import { useAuth } from "../context/AuthContext";

const Left = () => {
    const { allUsers, setAllUsers, setSelectedUser, selectedUser } = useAuth();
    const [searchTerm, setSearchTerm] = React.useState<string>("");
    const userDetails = getUserDetails();
    const getUsers = userDetails ? userDetails.getUsers : null;
    useEffect(() => {
        const fetchData = async () => {
            if (getUsers) {
                await getUsers();
            }
        };
        fetchData();
      }, [setAllUsers]);
      const students = allUsers ? allUsers?.map((user: any) => ({
        name: user.name,
        age:(() => {
            if (!user.dob || typeof user.dob.toDate !== 'function') return 'N/A';
            const dob = user.dob.toDate();
            const diff = Date.now() - dob.getTime();
            const ageDate = new Date(diff);
            return Math.abs(ageDate.getUTCFullYear() - 1970);
          })(),
        id: user.id,
        ...user
      })) : [];

      console.log(students);

      const filteredStudents = students.filter((student: any) => {
        return (
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.age.toString().includes(searchTerm) || student.courses?.some((course: any) => course.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }
      );
      
    
  return (
    <div className="flex flex-col w-1/2 md:w-1/4 bg-gray-200 h-screen p-2 md:p-4">
      <div className="flex gap-2 items-center">
        <div className="border rounded-full flex">
          <input
            placeholder="filter by name, age or course"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            className="p-2 w-3/4  rounded-bl-full rounded-tl-full outline-none"
            type="search"
            name=""
            id=""
          />
          <button className="p-1 font-bold text-[20px] md:text-[22px] cursor-pointer rounded-tr-full rounded-br-full  md:w-10 md:h-10 flex items-center justify-center">
            <IoSearch />
          </button>
        </div>
        
      </div>
      <hr className="my-5 text-gray-300" />
      {/* list */}
        <div className="flex flex-col gap-2 overflow-y-auto h-[80%]">
            {filteredStudents?.map((student:any) => (
            <div
                key={student.id}
                className="flex justify-between items-center bg-white p-2 rounded-lg shadow-md"
            >
                <div>
                <h3 className="text-lg font-semibold">{student.name}</h3>
                <p className="text-gray-600">Age: {student.age}</p>
                </div>
                <button onClick={()=>setSelectedUser(student.id)} className={`${selectedUser === student.id ? "bg-blue-900":"bg-blue-500"} text-white px-4 py-1 rounded`}>
                View
                </button>
            </div>
            ))}</div>
    </div>
  );
};

export default Left;
