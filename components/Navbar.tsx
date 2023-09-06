import { getApiLimitCount } from '@/lib/apiLimit';

import { UserButton } from '@clerk/nextjs';

import MobileSidebar from './MobileSidebar';
import { checkSubscription } from '@/lib/subscription';

const Navbar = async () => {
	const apiLimitCount = await getApiLimitCount();

	const isPro = await checkSubscription();

	return (
		<div className="flex items-center p-4">
			<MobileSidebar apiLimitCount={apiLimitCount} isPro={isPro} />
			<div className="w-full flex justify-end">
				<UserButton afterSignOutUrl="/" />
			</div>
		</div>
	);
};

export default Navbar;
