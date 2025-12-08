import axios from 'axios';
import { useAuth } from './useAuth';

const useAxiosSecure = () => {
  const { user } = useAuth();

  

  return axiosSecure;
};

export default useAxiosSecure;
