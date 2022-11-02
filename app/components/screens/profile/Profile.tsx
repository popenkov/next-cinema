import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import AuthFields from '@/components/shared/user/AuthFields';
import Button from '@/components/ui/form-elements/Button';
import Heading from '@/components/ui/heading/Heading';
import SkeletonLoader from '@/components/ui/skeleton-loader/SkeletonLoader';

import { UserService } from '@/services/user/user.service';

import { toastError } from '@/utils/api/withToastrErrorRedux';
import { Meta } from '@/utils/meta';

import styles from './Profile.module.scss';
import { IProfileInput } from './profile.interface';
import { useProfile } from './useProfile';

const Profile: FC = () => {
	const { handleSubmit, register, formState, setValue } =
		useForm<IProfileInput>({
			mode: 'onChange',
		});

	const { onSubmit, isLoading } = useProfile(setValue);

	return (
		<Meta title="Profile">
			<Heading title="Profile" />
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				{isLoading ? (
					<SkeletonLoader count={2} />
				) : (
					<AuthFields
						register={register}
						formState={formState}
						isPasswordRequired={false}
					/>
				)}

				<Button>Update</Button>
			</form>
		</Meta>
	);
};

export default Profile;
