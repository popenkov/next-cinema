import { useRouter } from 'next/router';
import { FC } from 'react';

import { useAuth } from '@/hooks/useAuth';

import { TypeComponentAuthFields } from '@/shared/types/auth.types';

const CheckRole: FC<TypeComponentAuthFields> = ({
	children,
	Component: { isOnlyAdmin, isOnlyUser },
}) => {
	const { user } = useAuth();

	const router = useRouter();

	const Children = () => <>{children}</>;

	// если общедоступная страница то просто возвращаем компонент
	if (!isOnlyAdmin && !isOnlyUser) return <Children />;

	if (user?.isAdmin) return <Children />;

	// если страница для админов, а смотрит юзер
	if (isOnlyAdmin) {
		router.pathname !== '/404' && router.replace('/404');
		return null;
	}

	// проверка на авторизацию пользователя
	const isUser = user && !user.isAdmin;

	if (isUser && isOnlyUser) return <Children />;
	else {
		// если пользователь не авторизован
		router.pathname !== '/auth' && router.replace('/auth');
		return null;
	}
};

export default CheckRole;
