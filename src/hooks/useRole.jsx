import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import { useAuth } from './useAuth';

export const useRole = () => {
  const { user, isLoading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: role = 'buyer', isLoading: roleLoading } = useQuery({
    queryKey: ['user-role', user?.email],
    enabled: !!user?.email && !authLoading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data?.role;
    },
  });

  return { role, roleLoading };
};
