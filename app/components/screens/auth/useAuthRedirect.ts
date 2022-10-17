import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAuth } from '@/hooks/useAuth';

//если человек без авторизации открывает закрытую страницу,
// его перенаправляет на авторизацию
// чтобы после авторизации человека снова возвращало на предыдущую страницу
export const useAuthRedirect = () => {
	const { user } = useAuth();

	const { query, push } = useRouter();

	// если в запросе был redirect, то возвращаем на страницу,
	// если нет, то на главную
	const redirect = query.redirect ? String(query.redirect) : '/';

	useEffect(() => {
		if (user) push(redirect);
	}, [user, redirect, push]); //так требует реакт
};
