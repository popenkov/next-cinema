import dynamic from 'next/dynamic';
import { FC } from 'react';

import PopularMovieList from './PopularMovieList/PopularMovieList';

const DynamicFavoriteMovieList = dynamic(
	() => import('./FavoriteMovieList/FavoriteMovieList'),
	{
		ssr: false,
	}
);

const MoviesContainer: FC = () => {
	return (
		<div>
			<PopularMovieList />
			<DynamicFavoriteMovieList />
		</div>
	);
};

export default MoviesContainer;
