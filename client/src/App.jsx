import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import { Main, Login, Signup } from './containers';
import { getAuth } from 'firebase/auth';
import { app } from './config/firebase.config';
import { useDispatch } from 'react-redux';
import { validateUserJWTToken } from './api'
import { setUserDetails } from './context/actions/userActions';

function App() {

  const firebaseAuth = getAuth(app);
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    setIsLoading(true)
    firebaseAuth.onAuthStateChanged((cred) => {
      if (cred) {
        cred.getIdToken().then((token) => {
          validateUserJWTToken(token).then((data) => {
            dispatch(setUserDetails(data))
          })
        })
      }
    })
    setInterval(() => {
      setIsLoading(false)
    }, 3000);
  }, [])


  return (
    <div className="w-screen min-h-screen h-auto flex flex-col  items-center justify-center">
      {isLoading && (
        <div className='fixed z-50 inset-0 bg-lightOverlay backdrop-blur-md flex items-center justify-center w-full'>
          Loading..
        </div>
      )}

      <Routes>
        <Route path='/*' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App
