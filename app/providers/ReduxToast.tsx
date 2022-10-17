import { FC } from 'react';
import ReduxToastr from 'react-redux-toastr';

const ReduxToast: FC = () => {
	return (
		<ReduxToastr
			newestOnTop={false}
			preventDuplicates
			position="top-right"
			transitionIn="fadeIn"
			transitionOut="fadeOut"
			progressBar
			closeOnToastrClick
		/>
	);
};

export default ReduxToast;
