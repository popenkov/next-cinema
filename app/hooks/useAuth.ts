import { useTypedSelector } from './useTypedSelector';

// если пользователь неавторизован - вернется null
export const useAuth = () => useTypedSelector((state) => state.user);
