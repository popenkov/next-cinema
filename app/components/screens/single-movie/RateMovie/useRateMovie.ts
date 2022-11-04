import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { useAuth } from '@/hooks/useAuth';

import { RatingService } from '@/services/rating/rating.service';

import { toastError } from '@/utils/api/withToastrErrorRedux';

export const useRateMovie = (movieId: string) => {
	const { user } = useAuth();
	const [rating, setRating] = useState(0);
	const [isSended, setIsSended] = useState(false);

	const { refetch } = useQuery(
		['your movie rating', movieId],
		() => RatingService.getByUserMovie(movieId),
		{
			onSuccess({ data }) {
				setRating(data);
			},
			enabled: !!movieId && !!user,
		}
	);

	const { mutateAsync: rateMovie } = useMutation(
		'set rating movie',
		({ value }: { value: number }) => RatingService.setRating(movieId, value),
		{
			onError(error) {
				toastError(error, 'Rate movie');
			},
			onSuccess() {
				toastr.success('Rate movie', 'You have successfully rated!');

				setIsSended(true);
				// повторный запрос за обновленными данными
				refetch();

				setTimeout(() => {
					setIsSended(false);
				}, 2400);
			},
		}
	);

	// по документации библиотеки рейтинга
	const handleClick = async (nextValue: number) => {
		setRating(nextValue);
		await rateMovie({ value: nextValue });
	};

	return {
		isSended,
		rating,
		handleClick,
	};
};
