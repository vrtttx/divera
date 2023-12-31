'use client';

import { FC, useEffect, useState } from 'react';

import { MAX_FREE_COUNTS } from '@/constants';

import { useProModal } from '@/hooks/useProModal';

import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';

import { Zap } from 'lucide-react';

interface FreeCounterProps {
	apiLimitCount: number;
	isPro: boolean;
}

const FreeCounter: FC<FreeCounterProps> = ({
	apiLimitCount = 0,
	isPro = false,
}: FreeCounterProps) => {
	const proModal = useProModal();

	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	if (isPro) return null;

	return (
		<div className="px-3">
			<Card className="border border-neutral-700 bg-neutral-900 shadow-xl">
				<CardContent className="py-6">
					<div className="space-y-2 mb-4 font-light text-sm text-center text-neutral-50">
						<p>
							{apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
						</p>
						<Progress
							className="h-3"
							value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
						/>
					</div>
					<Button
						className="w-full"
						variant="premium"
						onClick={proModal.onOpen}
					>
						Upgrade <Zap className="w-3 h-4 ml-2 fill-neutral-50" />
					</Button>
				</CardContent>
			</Card>
		</div>
	);
};

export default FreeCounter;
