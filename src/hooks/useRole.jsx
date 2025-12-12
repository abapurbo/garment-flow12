import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import { useAuth } from './useAuth';

export const useRole = () => {
  const { user,} = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: role = 'buyer', roleLoading: isLoading } = useQuery({
    queryKey: ['user-role', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      console.log(res.data.role)
      return res.data?.role;
    },
  });

  return { role, isLoading };
};
