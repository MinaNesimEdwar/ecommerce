import { useContext } from 'react';
import { userContext } from '../../context/UserContext';
import { Navigate } from 'react-router-dom';
export default function ProtectedRoute({children}) {
  const { token } = useContext(userContext);
  if (token) {
    return children;
  }
  else {
    return<Navigate to='/login'/>
  }
}
