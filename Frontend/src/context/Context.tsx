import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

// Define the shape of the user object
interface User {
    fullName: string;
    phoneNumber: string;
    email: string;
    bio?: string;
}

interface UserContextType {
    user: User | null;
    userRole: string | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    fetchUser: () => void;
    updateUser: (updatedData: Partial<User>) => Promise<User | null>;
}

// Create the context
const UserContext = createContext<UserContextType>({
    user: null,
    userRole: null,
    setUser: () => { },
    fetchUser: () => { },
    updateUser: async () => null,
});

// Custom hook to access the context
export const useUser = () => useContext(UserContext);

// UserProvider component to wrap the application
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Function to fetch user details using userId from localStorage
    const fetchUser = async () => {
        try {
            const storedUserId = localStorage.getItem('userId');
            const storedUserRole = localStorage.getItem('userRole');
            if (!storedUserId) {
                throw new Error('User ID not found in localStorage');
            }

            const response = await fetch(`http://localhost:5000/user/${storedUserId}`);
            if (!response.ok) {
                throw new Error('User not found');
            }

            const userData = await response.json();
            setUser(userData);
            setUserRole(storedUserRole); // Set userRole from localStorage
        } catch (error) {
            console.error('Error fetching user:', error);
            setUser(null);
        }
    };

    // Function to update user details
    const updateUser = async (updatedData: Partial<User>) => {
        try {
            setLoading(true);
            setError('');

            const storedUserId = localStorage.getItem('userId');
            if (!storedUserId) {
                throw new Error('User ID not found in localStorage');
            }

            const response = await fetch(`http://localhost:5000/change/${storedUserId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error('Failed to update user');
            }

            // Update user context with the new data
            const updatedUser: User = {
                fullName: updatedData.fullName || user?.fullName || '',
                phoneNumber: updatedData.phoneNumber || user?.phoneNumber || '',
                email: updatedData.email || user?.email || '',
                bio: updatedData.bio || user?.bio || ''
            };
            setUser(updatedUser);

            return updatedUser;
        } catch (error) {
            console.error('Error updating user:', error);
            setError('Failed to update user data');
            return null;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser(); // Fetch user details when component mounts
    }, []); // Run this effect only once when component mounts

    return (
        <UserContext.Provider value={{ user, userRole, setUser, fetchUser, updateUser }}>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {!loading && !error && children}
        </UserContext.Provider>
    );
};
