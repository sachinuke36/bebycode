import React from 'react'
import  useAuth  from '../hooks/useAuth'

const Register = () => {
    const { Register, Login } = useAuth();
    const [haveAccount, setHaveAccount] = React.useState<boolean>(false);
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'> 
        <h1 className='text-4xl font-bold mb-4'>{ haveAccount ? "Login" :"Register"}</h1>
        <form className='bg-white p-6 w-7/8 md:w-1/2 rounded shadow-md'>
            <div className='mb-4'>
            <label className='block text-gray-700' htmlFor="Email">Email</label>
            <input className='border border-gray-300 p-2 w-full' onChange={(e)=>setEmail(e.target.value)} type="text" id="email" required />
            </div>
            <div className='mb-4'>
            <label className='block text-gray-700' htmlFor="password">Password</label>
            <input className='border border-gray-300 p-2 w-full' onChange={(e)=>setPassword(e.target.value)} type="password" id="password" required />
            </div>
            {haveAccount ? (<>
              <button className='bg-blue-500 text-white p-2 rounded' onClick={(e)=>{
                e.preventDefault();
                Login(email, password)}} type="submit">Login</button>
                <p className='p-2'>Don't have an account? <span className='text-blue-500' onClick={()=>setHaveAccount(prev=>!prev)}>Register</span></p>
                </>
             ): <>
             <button className='bg-blue-500 text-white p-2 rounded' onClick={(e)=>{
              e.preventDefault();
              Register(email, password)}} type="submit">Register</button>
              <p className='p-2'>Have an account? <span className='text-blue-500' onClick={()=>setHaveAccount(prev=>!prev)}>Login</span></p>
             </>
             }

        </form>
    </div>
  )
}

export default Register
