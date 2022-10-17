import dynamic from 'next/dynamic';
import { FC } from 'react';

import Menu from './Menu';
import AuthItems from './auth/AuthItems';
import GenreMenu from './genres/GenreMenu';
import { menus } from './menu.data';

// const DynamicGenreMenu = dynamic(() => import('./genres/GenreMenu'), {
// 	ssr: false,
// })

const MenuContainer: FC = () => {
	return (
		<div>
			<Menu menu={menus[0]} />

			{/* <Menu menu={menus[1]} /> */}
			{/* <DynamicGenreMenu /> */}
			<GenreMenu />

			<Menu menu={{ title: 'General', items: [] }} />
		</div>
	);
};

export default MenuContainer;
