import { useState, useEffect } from 'react'
import './App.css'
import {
  Route,
  Navigate,
  createBrowserRouter,
  RouterProvider,
  redirect,
  createRoutesFromElements
} from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import HomePage from './components/HomePage'
import Header from './components/Header'
import UserLogin from './components/UserLogin'
import UserSignup from './components/UserSignup'
import UserAdmin from './components/UserAdmin'
import AuthContext from './AuthContext'
import RequireAuth from './RequireAuth'
import YodlrApi from './api/api'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('token') || null)

  useEffect(() => {
    if (token) {
      YodlrApi.token = token;
      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      async function getUser() {
        let user = await YodlrApi.getUser(decoded.username);
        setCurrentUser(user);
      }
      getUser();
    } else {
      YodlrApi.token = null;
      localStorage.removeItem('token');
      setCurrentUser(null);
    }
  }, [token])

  const login = async (data) => {
    const token = await YodlrApi.login(data);
    YodlrApi.token = token;
    setToken(token);
    const user = await YodlrApi.getUser(data.username);
    setCurrentUser(user);
  }

  const signup = async (data) => {
    const token = await YodlrApi.signup(data);
    YodlrApi.token = token;
    setToken(token);
    const user = await YodlrApi.getUser(data.username);
    setCurrentUser(user);
  }

  const updateUser = async (data) => {
    const user = await YodlrApi.updateUser(currentUser.username, data);
    setCurrentUser(user);
  }

  const logout = () => {
    setCurrentUser(null);
    YodlrApi.token = null;
    setToken(null);
  }
  
  const handleActive = async (data) => {
    const user = await YodlrApi.handleActive(data);
    return user.active;
  }

  const userLoader = async ({ params }) => {
    const user = await YodlrApi.getUser(params.username);
    if (!user) {
      throw new Response('User not found', { status: 404 })
    }
    return user;
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={< Header />} path='/'>
          <Route element={< Navigate to='feed' />} index />
          <Route element={< HomePage />} path='feed' />
          <Route element={< UserLogin />} path='login' />
          <Route element={< UserSignup />} path='signup' />
          <Route element={<RequireAuth>< UserAdmin /></RequireAuth>} path='users/admin' />
          <Route element={< Navigate to='feed' />} path='*' />
        </Route>
      </>
    )
  );

  return (
    <div className='App'>
      <AuthContext.Provider value={{ currentUser, login, signup, updateUser, logout, handleActive }}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    </div>
  );
}

export default App