import type { AppProps } from 'next/app';
import MainProvider from 'providers/MainProvider';

import { TypeComponentAuthFields } from '@/shared/types/auth.types';

import '@/assets/styles/globals.scss';

type TypedAppProps = AppProps & TypeComponentAuthFields;

function MyApp({ Component, pageProps }: TypedAppProps) {
	return (
		<MainProvider Component={Component}>
			<Component {...pageProps} />
		</MainProvider>
	);
}

export default MyApp;
