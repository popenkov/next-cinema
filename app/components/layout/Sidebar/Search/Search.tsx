<<<<<<< HEAD
import { ChangeEvent, FC, useState } from 'react';
import { useQuery } from 'react-query';

import SearchField from '@/ui/search-field/SearchField';

import { useDebounce } from '@/hooks/useDebounce';

import { MovieService } from '@/services/movie/movie.service';

import styles from './Search.module.scss';
import SearchList from './SearchList/SearchList';

const Search: FC = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const debouncedSearch = useDebounce(searchTerm, 500);

	const { isSuccess, data: popularMovies } = useQuery(
		['search movie list', debouncedSearch], //так передавать аргументы в запрос
		() => MovieService.getMovies(debouncedSearch),
		{
			select: ({ data }) => data,
			enabled: !!debouncedSearch, //работает только при получении аргумента
		}
	);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};
=======
import { ChangeEvent, FC, useState } from 'react'
import { useQuery } from 'react-query'

import SearchField from '@/ui/search-field/SearchField'

import { useDebounce } from '@/hooks/useDebounce'

import { MovieService } from '@/services/movie/movie.service'

import styles from './Search.module.scss'
import SearchList from './SearchList/SearchList'

const Search: FC = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const { isSuccess, data: popularMovies } = useQuery(
		['search movie list', debouncedSearch],
		() => MovieService.getMovies(debouncedSearch),
		{
			select: ({ data }) => data,
			enabled: !!debouncedSearch,
		}
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}
>>>>>>> 87f21dd881357ffea4003283b0f8b9ec30e80e70

	return (
		<div className={styles.wrapper}>
			<SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
			{isSuccess && <SearchList movies={popularMovies || []} />}
		</div>
<<<<<<< HEAD
	);
};

export default Search;
=======
	)
}

export default Search
>>>>>>> 87f21dd881357ffea4003283b0f8b9ec30e80e70
