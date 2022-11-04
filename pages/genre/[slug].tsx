// import { errorCatch } from 'api/api.helpers'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import Genre from '@/screens/genre/Genre';
import { IGenrePage } from '@/screens/genre/genre.types';

import { GenreService } from '@/services/genre/genre.service';
import { MovieService } from '@/services/movie/movie.service';

import Error404 from '../404';

const GenrePage: NextPage<IGenrePage> = ({ genre, movies }) => {
	return genre ? <Genre genre={genre} movies={movies} /> : <Error404 />;
};

// обязателен для динамического роутинга при getStaticProps
// если данных на этапе сборки по нашему слагу нет, то сработает getStaticPaths и создаст сборку с нужными жанными, которые нам вернутся
export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: genres } = await GenreService.getAll();
		const paths = genres.map((g) => ({
			params: { slug: g.slug },
		}));

		return {
			paths,
			fallback: 'blocking', //а-ля сср, если не найдена страница по слагу
		};
	} catch (e) {
		console.log(e);

		return {
			paths: [],
			fallback: false,
		};
	}
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: genre } = await GenreService.getBySlug(String(params?.slug));

		const { data: movies } = await MovieService.getByGenres([genre._id]);

		return {
			props: { movies, genre },
			revalidate: 60,
		};
	} catch (e) {
		// console.log(errorCatch(e))

		return {
			props: {},
			// notFound: true,
		};
	}
};

export default GenrePage;
