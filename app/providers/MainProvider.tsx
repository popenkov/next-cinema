import React, { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import Layout from '@/components/Layout/Layout';

import { store } from '@/store/store';

import AuthProvider from './AuthProvider/AuthProvider';
import HeadProvider from './HeadProvider';
import ReduxToast from './ReduxToast';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false, //запрещаю перезагрузку при повторном возвращении на страницу
		},
	},
});

{
	/* <TypeComponentAuthFields>  Component в пропсы*/
}
const MainProvider: FC<any> = ({ children, Component }) => {
	return (
		<HeadProvider>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<ReduxToast />
					{/* Component={Component} */}
					<AuthProvider Component={Component}>
						<Layout>{children}</Layout>
					</AuthProvider>
				</QueryClientProvider>
			</Provider>
		</HeadProvider>
	);
};

export default MainProvider;
