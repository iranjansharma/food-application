import { useState } from 'react'
import { LoginBg, Logo } from '../assets'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { app } from '../config/firebase.config'
import { validateUserJWTToken } from '../api'
import { setUserDetails } from '../context/actions/userActions'
import { useDispatch } from 'react-redux';



const Signup = () => {

    const [userEmail, setUserEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cnfPassword, setCnfPassword] = useState('')

    const firebaseAuth = getAuth(app);
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const signUpWithEmailPassword = async (e) => {
        e.preventDefault();

        if (userEmail === '' || password === '' || cnfPassword === '') {
            alert('Enter All Details')
        } else {
            if (password.length <= 6 || cnfPassword.length <= 6) {
                alert('Password Must Be Greater Than 6 digit')
            } else if (password.length >= 24 || cnfPassword.length >= 24) {
                alert('Password Must Be Less Than 24 digit')
            }
            if (password === cnfPassword) {
                setUserEmail('')
                setPassword('')
                setCnfPassword('')
                await createUserWithEmailAndPassword(firebaseAuth, userEmail, password).then(userCred => {
                    firebaseAuth.onAuthStateChanged((cred) => {
                        if (cred) {
                            cred.getIdToken().then((token) => {
                                validateUserJWTToken(token).then((data) => {

                                    dispatch(setUserDetails(data))
                                })
                                navigate('/login', { replace: true })

                            })
                        }
                    })
                })

            }
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
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src={Logo} alt="logo" />
                        Food Court
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create and account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={signUpWithEmailPassword}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Email" required=""
                                        value={userEmail}
                                        onChange={(e) => setUserEmail(e.target.value)}

                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" id="password" placeholder="Enter Password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                    <input type="password" name="confirm-password" id="confirm-password" placeholder="Confirm Password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                                        value={cnfPassword}
                                        onChange={e => setCnfPassword(e.target.value)}
                                    />
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                    </div>
                                </div>
                                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"

                                >Create an account</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <Link to='/login' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Signup