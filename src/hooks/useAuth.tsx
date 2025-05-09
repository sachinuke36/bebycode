import { createUserWithEmailAndPassword,  signInWithEmailAndPassword,
    setPersistence,
    browserLocalPersistence, } from 'firebase/auth'
import React from 'react'
import { auth } from '../firebase'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Auth = () => {
    const { setUser } = useAuth();
    const navigate = useNavigate()
    const [loading, setLoading] = React.useState<boolean>(false)
    const [error, setError] = React.useState<string | null>(null)

    const Login = async (username: string, password: string) => {
        setLoading(true)
        setError(null)
        try {
            setPersistence(auth, browserLocalPersistence).then(() => {
                return signInWithEmailAndPassword(auth, username, password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        setUser(user);
                        navigate('/')
                        toast.success('Login successful')
                        console.log(user)
                    })
                    .catch((error) => {
                        toast.error(error.message)
                        console.log(error.message);
                    });
            });
        } catch (error:any) {
            console.log(error);
            toast.error(error.message)
            setError('Error logging in')
        }
    }

    const Register = async (email: string, password: string) => {
        setLoading(true)
        setError(null)
        try {
            setPersistence(auth, browserLocalPersistence).then(() => {
           return createUserWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                const user = userCredential.user;
                setUser(user);
                navigate('/')
                console.log(user)
              })
              .catch((error) => {
                toast.error(error.message)
                setError('Error creating user')
                console.log("Error in Register",error.message) ;
             })});

        } catch (error:any) {
            console.log("error in regi",error);
            toast.error(error.message)
            setError('Error creating user')
        }finally{
            setLoading(false)
            setError(null)
        }
    }




  return { Login, Register, loading, error }
}

export default Auth
