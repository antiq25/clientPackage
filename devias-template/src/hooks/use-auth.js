import { useContext } from 'react';
import { AuthContext } from 'src/src2/contexts/auth/jwt';

export const useAuth = () => useContext(AuthContext);
