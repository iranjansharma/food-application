import { useState, useEffect } from 'react'
import { LoginBg, Logo } from '../assets'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth'
import { app } from '../config/firebase.config'
import { validateUserJWTToken } from '../api'
import { setUserDetails } from '../context/actions/userActions';


const Login = () => {

    const [userEmail, setUserEmail] = useState('')
    const [password, setPassword] = useState('')


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = useSelector(state => state.user)

    useEffect(() => {
        if (user) {
            navigate('/', {
                replace: true
            })
        }
    }, [user])


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('email', userEmail);
        console.log('Password', password);
    }

    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const loginWithGoogle = async () => {
        await signInWithPopup(firebaseAuth, provider).then((userCred) => {
            firebaseAuth.onAuthStateChanged((cred) => {
                if (cred) {
                    cred.getIdToken().then((token) => {
                        validateUserJWTToken(token).then((data) => {
                            dispatch(setUserDetails(data))
                        })
                        navigate('/', { replace: true })
                    })
                }
            })
        })
    }

    // actions

    // reducer

    // Store -> Globalize

    // dispatch



    const signInWithEmailPassword = async () => {
        if (userEmail !== '' && password !== '') {
            await signInWithEmailAndPassword(firebaseAuth, userEmail, password).then(userCred => {
                firebaseAuth.onAuthStateChanged((cred) => {
                    if (cred) {
                        cred.getIdToken().then((token) => {
                            validateUserJWTToken(token).then((data) => {
                                dispatch(setUserDetails(data))
                            })
                            navigate('/', { replace: true })
                        })
                    }
                })

            })
        } else {
            alert('Hello')
        }
    }


    return (
        <div className='relative w-screen h-screen overflow-hidden flex'>
            <img
                src={LoginBg}
                className='w-full h-full object-cover absolute top-0 left-0' alt="Login Images"
            />

            <section className="bg-gray-50 dark:bg-gray-900 z-10">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src={Logo} alt="logo" />
                        Food Court
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Log in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>

                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Email" required=""

                                        value={userEmail}
                                        onChange={(e) => setUserEmail(e.target.value)}

                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>

                                    <input type="password" name="password" id="password" placeholder="Enter Your Password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}

                                    />
                                </div>

                                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    onClick={signInWithEmailPassword}


                                >Sign in</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet? <Link to='/signup' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Create Account</Link>
                                </p>
                            </form>

                            <div className='flex justify-center'>
                                <div className='w-24 h-[1px] rounded-md bg-white'></div>
                                <p className='text-white '>or</p>
                                <div className='w-24 h-[1px] rounded-md bg-white'></div>
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                onClick={loginWithGoogle}
                            >Sign In With Google</button>
                        </div>
                    </div>
                </div>
            </section>


        </div >
    )
}

export default Login