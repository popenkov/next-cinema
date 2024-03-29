import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { useMutation } from 'react-query';

import { FileService } from '@/services/file/file.service';

import { toastError } from '@/utils/api/withToastrErrorRedux';

type TypeUpload = (
	onChange: (...event: any[]) => void,
	folder?: string
) => {
	uploadImage: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
	isLoading: boolean;
};

export const useUpload: TypeUpload = (onChange, folder) => {
	const [isLoading, setIsLoading] = useState(false);

	const { mutateAsync } = useMutation(
		'upload file',
		(data: FormData) => FileService.upload(data, folder),
		{
			onSuccess({ data }) {
				// с сервера мы получаем урл для загруженного фото и записываем его в react hook form
				onChange(data[0].url);
			},
			onError(error) {
				toastError(error, 'Upload image');
			},
		}
	);

	const uploadImage = useCallback(
		async (e: ChangeEvent<HTMLInputElement>) => {
			setIsLoading(true);
			const files = e.target.files;
			if (!files?.length) return;

			const formData = new FormData();
			// image => file
			formData.append('image', files[0]);
			await mutateAsync(formData);

			setTimeout(() => {
				setIsLoading(false);
			}, 1000);
		},
		[mutateAsync]
	);

	return useMemo(() => ({ uploadImage, isLoading }), [uploadImage, isLoading]);
};
