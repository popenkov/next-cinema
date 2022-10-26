import { useEffect, useState } from 'react';

// исправление ошибки гидратации
export const useRenderClient = () => {
	const [isRenderClient, setIsRenderClient] = useState(false);
	// юзЭффект всегда срабатывает только на клиенте
	useEffect(() => {
		!isRenderClient && setIsRenderClient(true);
	}, [isRenderClient]);

	return { isRenderClient };
};
