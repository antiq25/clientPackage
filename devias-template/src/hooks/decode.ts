import { useState, useEffect } from 'react';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { useRouter } from 'next/router';

interface CustomJwtPayload extends JwtPayload {
  id: string;
  fistName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  // Assuming the ID is a string. Adjust the type if necessary.
  // Add other custom properties that you expect to be in the JWT payload here
}

const useUser = () => {
  const [user, setUser] = useState<CustomJwtPayload | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedUser = jwtDecode<CustomJwtPayload>(token);
        setUser(decodedUser);
      } catch (error) {
        console.error('Failed to decode JWT', error);
        // Redirect to login page if the token is invalid
        router.push('/login');
      }
    } else {
      // Redirect to login page if there is no token
      router.push('/login');
    }
  }, [router]);

  return user;
};

export default useUser;
