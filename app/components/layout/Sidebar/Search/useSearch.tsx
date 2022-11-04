import { useState } from 'react';
import { useQuery } from 'react-query';

import { useDebounce } from '@/hooks/useDebounce';

import { MovieService } from '@/services/movie/movie.service';

export const useSearch = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const debouncedSearch = useDebounce(searchTerm, 300);

	const { isSuccess, data: popularMovies } = useQuery(
		['search movie list', debouncedSearch], //так передавать аргументы в запрос
		() => MovieService.getMovies(debouncedSearch),
		{
			select: ({ data }) => data,
			enabled: !!debouncedSearch, //работает только при получении аргумента
		}
	);

	return { isSuccess, popularMovies, searchTerm };
};
