import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { allActions } from '@/store/rootActions';

export const useActions = () => {
	const dispatch = useDispatch();

	return useMemo(() => bindActionCreators(allActions, dispatch), [dispatch]);
};

// теперь не надо писать диспатч и передавать в него экшн
// const {register} = useActions();
