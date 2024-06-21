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
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const login = async (data) => {
    const user = await YodlrApi.login(data);
    console.log(user);
    setCurrentUser(user);
  }

  const signup = async (data) => {
    const user = await YodlrApi.createUser(data);
    setCurrentUser(user);
  }

  const updateUser = async (data) => {
    const user = await YodlrApi.updateUser(currentUser.username, data);
    setCurrentUser(user);
  }

  const logout = () => {
    setCurrentUser(null);
  }

  const handleActiv = async (data) => {
    const user = await YodlrApi.handleActiv(data);
    return user.activ;
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
      <AuthContext.Provider value={{ currentUser, login, signup, updateUser, logout, handleActiv }}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    </div>
  );
}

export default App