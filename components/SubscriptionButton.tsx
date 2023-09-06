'use client';

import { FC, useState } from 'react';

import axios from 'axios';
import { toast } from 'react-hot-toast';

import { Button } from './ui/button';

import { Zap } from 'lucide-react';

interface SubscriptionButtonProps {
	isPro: boolean;
}

const SubscriptionButton: FC<SubscriptionButtonProps> = ({
	isPro = false,
}: SubscriptionButtonProps) => {
	const [loading, setLoading] = useState(false);

	const onClick = async () => {
		try {
			setLoading(true);

			const response = await axios.get('/api/stripe');

			window.location.href = response.data.url;
		} catch (error: any) {
			toast.error('Something went wrong...');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Button
			variant={isPro ? 'default' : 'premium'}
			onClick={onClick}
			disabled={loading}
		>
			{isPro ? 'Manage Subscription' : 'Upgrade'}{' '}
			{!isPro && <Zap className="w-4 h-4 ml-2 fill-neutral-50" />}
		</Button>
	);
};

export default SubscriptionButton;
