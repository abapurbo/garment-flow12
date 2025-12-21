import axios from 'axios';

const useAxiosPublic = () => {
  const axiosPublic = axios.create({
    baseURL:'https://garment-server-flow12.vercel.app'
  });

  return axiosPublic;
};

export default useAxiosPublic;
