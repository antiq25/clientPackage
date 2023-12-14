import { useRouter } from 'next/router';

const useLogout = () => {
  const router = useRouter();

  const logout = () => {
    // Clear the token from localStorage or wherever it's stored
    localStorage.removeItem('token');
    // Redirect to login page
    router.push('/login');
  };

  return logout;
};

export default useLogout;
