import Admin from '@/screens/admin/home/Admin'

import { NextPageAuth } from '@/shared/types/auth.types'

const AdminPage: NextPageAuth = () => {
	return <Admin />
}

// такой параметр делает страницу только для админа
AdminPage.isOnlyAdmin = true

export default AdminPage
