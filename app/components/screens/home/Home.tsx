import Head from 'next/head';
import Image from 'next/image';
import { FC } from 'react';

import Layout from '@/components/layout/Layout';

import styles from './/Home.module.scss';

import { IHome } from './home.interface';

const Home: FC<IHome> = () => {
	return (
		<Layout>
			<h1>Hello, world</h1>
		</Layout>
	);
};

export default Home;
