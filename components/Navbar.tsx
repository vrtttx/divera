import { getApiLimitCount } from '@/lib/apiLimit';

import { UserButton } from '@clerk/nextjs';

import MobileSidebar from './MobileSidebar';

const Navbar = async () => {
	const apiLimitCount = await getApiLimitCount();

	return (
		<div className="flex items-center p-4">
			<MobileSidebar apiLimitCount={apiLimitCount} />
			<div className="w-full flex justify-end">
				<UserButton afterSignOutUrl="/" />
			</div>
		</div>
	);
};

export default Navbar;
