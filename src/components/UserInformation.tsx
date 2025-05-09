import React, { useState } from 'react';
import Select, { type MultiValue } from 'react-select';
import type { CourseOption } from '../types';
import { useAuth } from '../context/AuthContext';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const courseOptions = [
  { value: 'Mathematics', label: 'Mathematics' },
  { value: 'Physics', label: 'Physics' },
  { value: 'Computer Science', label: 'Computer Science' },
  { value: 'Biology', label: 'Biology' },
  { value: 'Economics', label: 'Economics' },
  { value: 'History', label: 'History' },
];

const UserInformation = () => {
    const { user } = useAuth();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState<Date | null>(null);
  const [selectedCourses, setSelectedCourses] = useState<CourseOption[]>([]);
  const navigate = useNavigate();

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }
    const userData = {
      name,
      phone,
      courses: selectedCourses.map((c: any) => c.value),
      userId: user?.uid,
      email: user?.email,
      dob: dob,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    console.log('Submitted:', userData);
    await addDoc(collection(db, 'students'), userData);
    // Reset form
    setName('');
    setPhone('');
    setSelectedCourses([]);
    navigate('/');
    window.location.reload();
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-center justify-center h-screen px-4'
      >
        <h1 className='text-2xl font-bold mb-4'>User Information</h1>

        <input
          type='text'
          placeholder='Full Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='border border-gray-300 p-2 rounded mb-4 w-full max-w-md'
        />

        <input
          type='number'
          maxLength={10}
          pattern='\d*'
          itemType='tel'
          placeholder='Phone Number'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className='border border-gray-300 p-2 rounded mb-4 w-full max-w-md'
        />
        <div className='w-full max-w-md mb-4'>
            <label className='block text-gray-700 mb-2' htmlFor="dob">Date of Birth</label>
            <input
                type='date'
                name="dob"
                onChange={(e) => setDob(new Date(e.target.value))}
                value={dob ? dob.toISOString().split('T')[0] : ''}
                placeholder='Date of Birth'
                required
                className='border border-gray-300 p-2 rounded mb-4 w-full max-w-md'
            />
        </div>

        <div className='w-full max-w-md mb-4'>
          <Select
            isMulti
            options={courseOptions}
            placeholder='Select Courses...'
            onChange={(selected: MultiValue<CourseOption>) => setSelectedCourses(selected as CourseOption[])}
            value={selectedCourses}
          />
        </div>

        <button
          type='submit'
          className='bg-blue-500 text-white p-2 rounded w-40'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserInformation;
