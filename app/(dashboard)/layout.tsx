import { getApiLimitCount } from '@/lib/apiLimit';

import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { checkSubscription } from '@/lib/subscription';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
	const apiLimitCount = await getApiLimitCount();

	const isPro = await checkSubscription();

	return (
		<div className="h-full relative">
			<div className="h-full hidden bg-gray-900 md:w-64 md:flex md:flex-col md:fixed md:inset-y-0">
				<Sidebar apiLimitCount={apiLimitCount} isPro={isPro} />
			</div>
			<main className="md:pl-64">
				<Navbar />
				{children}
			</main>
		</div>
	);
};

export default DashboardLayout;
