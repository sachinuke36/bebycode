import React from 'react'
import { useAuth } from '../context/AuthContext';

const Right = () => {
    const { selectedUser, allUsers } = useAuth();
    if(!selectedUser) return (
        <div className='flex-1 h-screen flex justify-center items-center'>
            <h1 className='text-xl px-2 md:text-2xl font-bold'>Select a user to view their information</h1>
        </div>
    );
    const user = allUsers?.find((user: any) => user.id === selectedUser);
  return (
    <div className='flex-1 bg-gray-100'>
      {user && (
        <div className="flex flex-col w-full md:w-1/2 mx-auto h-screen p-4 ">
          <h2 className="text-2xl font-bold mb-4">{user.name}</h2>
          <p className="text-sm md:text-lg mb-2"><span className='font-bold'>Age:</span> {(() => {
            if (!user.dob || typeof user.dob.toDate !== 'function') return 'N/A';
            const dob = user.dob.toDate();
            const diff = Date.now() - dob.getTime();
            const ageDate = new Date(diff);
            return Math.abs(ageDate.getUTCFullYear() - 1970);
          })()}</p>
          <p className="text-sm md:text-lg mb-2"><span className='font-bold'>Phone Number:</span> {user.phone}</p>
          <p className="text-sm md:text-lg mb-2"><span className='font-bold'>Courses:</span> {user.courses.join(', ')}</p>
          <p className="text-sm md:text-lg mb-2"><span className='font-bold'>Date of Birth:</span> {user.dob ? user.dob.toDate().toLocaleDateString() : 'N/A'}</p>
          </div>
      )}
    </div>
  )
}

export default Right
