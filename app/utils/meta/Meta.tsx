import { MetaNoIndex } from '.';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC } from 'react';

import logoImage from '@/assets/images/logo.svg';

import { siteName, titleMerge } from '@/configs/seo.config';

import { onlyText } from '../string/clearText';

import { ISeo } from './meta.types';

export const Meta: FC<ISeo> = ({
	title,
	description,
	image = null,
	children,
}) => {
	const { asPath } = useRouter();
	const currentUrl = `${process.env.APP_URL}${asPath}`;
	// если есть description, то страница общедостпная и должна индексироваться
	// страница администратора не должна индиксироваться и для этого есть спец теги

	return (
		<>
			{description ? (
				<Head>
					<title itemProp="headline">{titleMerge(title)}</title>
					<meta
						itemProp="description"
						name="description"
						content={onlyText(description, 152)}
					/>
					<link rel="canonical" href={currentUrl} />
					<meta property="og:locale" content="en" />
					<meta property="og:title" content={titleMerge(title)} />
					<meta property="og:url" content={currentUrl} />
					<meta property="og:image" content={image || logoImage} />
					<meta property="og:site_name" content={siteName} />
					<meta
						property="og:description"
						content={onlyText(description, 197)}
					/>
				</Head>
			) : (
				<MetaNoIndex title={title} />
			)}
			{children}
		</>
	);
};
