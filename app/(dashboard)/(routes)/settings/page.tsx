import Heading from '@/components/Heading';

import { Settings } from 'lucide-react';
import { checkSubscription } from '@/lib/subscription';
import SubscriptionButton from '@/components/SubscriptionButton';

const SettingsPage = async () => {
	const isPro = await checkSubscription();

	return (
		<div>
			<Heading
				title="Settings"
				description="Manage account settings"
				icon={Settings}
				iconColor="text-neutral-300"
				bgColor="bg-neutral-800"
			/>
			<div className="space-y-4 px-4 lg:px-8">
				<div className="font-light text-sm tracking-wide text-neutral-400">
					{isPro
						? 'You are currently a pro tier user.'
						: 'You are currently a free tier user.'}
				</div>
				<SubscriptionButton isPro={isPro} />
			</div>
		</div>
	);
};

export default SettingsPage;
