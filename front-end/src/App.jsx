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
import HomePage from './components/HomePage'
import Header from './components/Header'
import UserLogin from './components/UserLogin'
import UserSignup from './components/UserSignup'
import UserList from './components/UserList'
import UserProfile from './components/UserProfile'
import UserUpdate from './components/UserUpdate'
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
    setCurrentUser(user);
  }

  const signup = async (data) => {
    const user = await YodlrApi.createUser(data);
    setCurrentUser(user);
  }

  const updateUser = async (data) => {
    const user = await YodlrApi.updateUser(currentUser.id, data);
    setCurrentUser(user);
  }

  const logout = () => {
    setCurrentUser(null);
  }

  const handleState = async (data) => {
    const user = await YodlrApi.handleState(currentUser.id, data);
    return user;
  }

  const userLoader = async ({ params }) => {
    const user = await YodlrApi.getUser(params.id);

    if (!user) {
      throw new Error('Fetching user failed')
    }
    return { user };
  }

  const usersLoader = async () => {
    const users = await YodlrApi.getUsers();

    if (!users) {
      throw new Error('Fetching users failed')
    }
    return { users };
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={< Header />} path='/'>
          <Route element={< Navigate to='feed' />} index />
          <Route element={< HomePage />} path='feed' />
          <Route element={< UserLogin />} path='login' />
          <Route element={< UserSignup />} path='signup' />
          <Route element={<RequireAuth>< UserList /></RequireAuth>}
            path='users/admin'
            loader={usersLoader} />
          <Route element={<RequireAuth>< UserProfile /></RequireAuth>} path='users/:id' loader={userLoader} />
          <Route element={<RequireAuth>< UserUpdate /></RequireAuth>} path='users/:id/edit' />
          <Route element={< Navigate to='feed' />} path='*' />
        </Route>
      </>
    )
  );

  return (
    <div className='App'>
      <AuthContext.Provider value={{ currentUser, login, signup, updateUser, logout, handleState }}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    </div>
  );
}

export default App