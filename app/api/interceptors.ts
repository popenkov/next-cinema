import axios from 'axios';
import Cookies from 'js-cookie';

import { removeTokensStorage } from '@/services/auth/auth.helper';
import { AuthService } from '@/services/auth/auth.service';

import { API_SERVER_URL, API_URL } from '@/configs/api.config';
import { IS_PRODUCTION } from '@/configs/constants';

import { errorCatch } from './api.helpers';

const instance = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

// интерцепторы. сервер проверяет аксесс токен, и есл все ок, возвращает данные
//  если аксесс токен кончается, возвращается ошибка, которая проверяется интерцепторами
// интерцептор отправляется запрос с рефрештокеном для получения нового аксес токена

instance.interceptors.request.use((config) => {
	// добавляем к запросу в заголовок аксес токен
	const accessToken = Cookies.get('accessToken');
	if (config.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`;

	return config;
});

// проверки токена на ответ сервера
instance.interceptors.response.use(
	(config) => config,
	async (error) => {
		// записываем в переменную, чтобы сделать запрос повторынй с теми же параметрами
		const originalRequest = error.config;

		if (
			(error.response.status === 401 || //401 - не авторизован
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry //не повторный запрос
		) {
			originalRequest._isRetry = true;
			try {
				// обновляем токен
				await AuthService.getNewTokens();
				// отправляем заново запрос
				return instance.request(originalRequest);
			} catch (e) {
				// удаляем токены и разлогиниваем пользователя
				if (errorCatch(e) === 'jwt expired') removeTokensStorage();
			}
		}

		throw error;
	}
);

export default instance;

export const axiosClassic = axios.create({
	baseURL: IS_PRODUCTION ? API_SERVER_URL : API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});
