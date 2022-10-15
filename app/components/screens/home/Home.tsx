import { FC } from 'react';

import Layout from '@/components/Layout/Layout';
import Heading from '@/components/ui/heading/Heading';

import { Meta } from '@/utils/meta';

import { IHome } from './home.types';

const Home: FC<IHome> = () => {
	return (
		<Meta title="Online cinema" description="Watch movies online">
			<Heading
				title="Watch movies online"
				className="text-gray-300 mb-8 text-xl"
			/>
			<h1>Home page</h1>
		</Meta>
	);
};

export default Home;
