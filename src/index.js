import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'

import { useAuth } from './contexts/AuthContext'

import ThemeProvider from './contexts/ThemeContext'
import AuthProvider from './contexts/AuthContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Users from './pages/Users'
import User from './pages/User'
import EditUser from './pages/EditUser'
import NewUser from './pages/NewUser'
import Resources from './pages/Resources'
import Resource from './pages/Resource'
import EditResource from './pages/EditResource'

const root = ReactDOM.createRoot(document.getElementById('root'))

const RequireAuth = ({ children }) => {
    const { user } = useAuth()
    if (!user) return <Navigate to="/login" />
    return children
}

const RoutesContainer = () => (
    <Router>
        <Routes>
            <Route
                element={
                    <RequireAuth>
                        <Layout />
                    </RequireAuth>
                }
            >
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<User />} />
                <Route path="/users/:id/edit" element={<EditUser />} />
                <Route path="/new-user" element={<NewUser />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/resources/:id" element={<Resource />} />
                <Route path="/resources/:id/edit" element={<EditResource />} />
            </Route>
            <Route path="/login" element={<Login />} />
        </Routes>
    </Router>
)

const AuthContainer = () => (
    <AuthProvider>
        <RoutesContainer />
    </AuthProvider>
)

const UiContainer = () => (
    <ThemeProvider>
        <AuthContainer />
    </ThemeProvider>
)

root.render(
    <React.StrictMode>
        <UiContainer />
    </React.StrictMode>
)
