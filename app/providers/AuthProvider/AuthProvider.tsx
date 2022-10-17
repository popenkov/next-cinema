import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

import { useActions } from '@/hooks/useActions';
import { useAuth } from '@/hooks/useAuth';

import { TypeComponentAuthFields } from '@/shared/types/auth.types';

// динамичный импорт. только на клиентской части ssr: false
const DynamicCheckRole = dynamic(() => import('./CheckRole'), { ssr: false });

const AuthProvider: FC<TypeComponentAuthFields> = ({
	children,
	Component: { isOnlyAdmin, isOnlyUser },
}) => {
	const { user } = useAuth();
	const { checkAuth, logout } = useActions();
	const { pathname } = useRouter();

	// при первой загрузке смотрим есть ли токен и проверяем авторизацию
	useEffect(() => {
		const accessToken = Cookies.get('accessToken');
		if (accessToken) checkAuth();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	// если токен пропал, то надо разлогинить
	useEffect(() => {
		const refreshToken = Cookies.get('refreshToken');
		if (!refreshToken && user) logout();
	}, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

	return !isOnlyAdmin && !isOnlyUser ? (
		<>{children}</>
	) : (
		<DynamicCheckRole Component={{ isOnlyAdmin, isOnlyUser }}>
			{children}
		</DynamicCheckRole>
	);
};

export default AuthProvider;
