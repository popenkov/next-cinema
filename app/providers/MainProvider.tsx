// import AuthProvider from './AuthProvider/AuthProvider'
// import HeadProvider from './HeadProvider/HeadProvider'
// import { FC } from 'react'
// import { QueryClient, QueryClientProvider } from 'react-query'
// import { Provider } from 'react-redux'
// import { store } from 'store/store'
// import Layout from '@/components/layout/Layout'
// import ReduxToastr from '@/ui/redux-toastr/ReduxToastr'
// import { TypeComponentAuthFields } from '@/shared/types/auth.types'
// const queryClient = new QueryClient({
// 	defaultOptions: {
// 		queries: {
// 			refetchOnWindowFocus: false,
// 		},
// 	},
// })
// const MainProvider: FC<TypeComponentAuthFields> = ({ children, Component }) => {
// 	return (
// 		<HeadProvider>
// 			<Provider store={store}>
// 				<QueryClientProvider client={queryClient}>
// 					<ReduxToastr />
// 					<AuthProvider Component={Component}>
// 						<Layout>{children}</Layout>
// 					</AuthProvider>
// 				</QueryClientProvider>
// 			</Provider>
// 		</HeadProvider>
// 	)
// }
// export default MainProvider
import React, { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false, //запрещаю перезагрузку при повторном возвращении на страницу
		},
	},
});

const MainProvider: FC = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};

export default MainProvider;
