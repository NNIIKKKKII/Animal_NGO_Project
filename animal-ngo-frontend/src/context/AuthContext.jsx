// animal-ngo-frontend/src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as loginService, register as registerService, logout as logoutService } from '../api/authService';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    // Initialize state from localStorage if a user is saved
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [isLoading, setIsLoading] = useState(false);

    // Effect to update localStorage whenever user or token changes
    useEffect(() => {
        if (user && token) {
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
    }, [user, token]);

    // Function to handle login API call
    const login = async (email, password) => {
        setIsLoading(true);
        try {
            const data = await loginService(email, password);
            setUser(data.user);
            setToken(data.token);
            setIsLoading(false);
            navigate('/'); // Redirect to Dashboard on success
        } catch (error) {
            setIsLoading(false);
            // Throw error to be caught by the Login component for display
            throw error.response?.data?.message || 'Login failed';
        }
    };

    // Function to handle registration API call
    const register = async (userData) => {
        setIsLoading(true);
        try {
            const data = await registerService(userData);
            setUser(data.user);
            setToken(data.token);
            setIsLoading(false);
            navigate('/'); // Redirect to Dashboard on success
        } catch (error) {
            setIsLoading(false);
            // Throw error to be caught by the Register component for display
            throw error.response?.data?.message || 'Registration failed';
        }
    };

    // Function to handle logout
    const logout = () => {
        logoutService();
        setUser(null);
        setToken(null);
        navigate('/login');
    };

    const value = {
        user,
        token,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
    };

    return <AuthContext.Provider value={value}>
        {children}
        </AuthContext.Provider>;
};