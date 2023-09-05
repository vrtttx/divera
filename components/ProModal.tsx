'use client';

import { useProModal } from '@/hooks/useProModal';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from './ui/dialog';
import { Badge } from './ui/badge';

import {
	Check,
	Code,
	ImageIcon,
	MessageSquare,
	Music,
	VideoIcon,
	Zap,
} from 'lucide-react';
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import axios from 'axios';
import { useState } from 'react';

const tools = [
	{
		label: 'Conversation',
		icon: MessageSquare,
		color: 'text-violet-400',
		bgColor: 'bg-violet-400/20',
	},
	{
		label: 'Code Generation',
		icon: Code,
		color: 'text-pink-400',
		bgColor: 'bg-pink-400/20',
	},
	{
		label: 'Image Generation',
		icon: ImageIcon,
		color: 'text-sky-400',
		bgColor: 'bg-sky-400/20',
	},
	{
		label: 'Video Generation',
		icon: VideoIcon,
		color: 'text-amber-300',
		bgColor: 'bg-amber-300/20',
	},
	{
		label: 'Music Generation',
		icon: Music,
		color: 'text-red-400',
		bgColor: 'bg-red-400/20',
	},
];

export const ProModal = () => {
	const proModal = useProModal();

	const [loading, setLoading] = useState(false);

	const onSubscribe = async () => {
		try {
			setLoading(true);

			const response = await axios.get('/api/stripe');

			window.location.href = response.data.url;
		} catch (error: any) {
			console.log(error, 'STRIPE_CLIENT_ERROR');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
			<DialogContent className="bg-neutral-950">
				<DialogHeader>
					<DialogTitle className="flex flex-col items-center justify-center gap-y-4 pb-2 font-light text-2xl tracking-wide text-neutral-50">
						<div className="flex items-center gap-x-2 py-1">
							Divera
							<Badge
								className="py-1 font-light text-sm uppercase"
								variant="premium"
							>
								Pro
							</Badge>
						</div>
					</DialogTitle>
					<DialogDescription className="space-y-2 pt-2 font-medium text-center text-neutral-400">
						{tools.map((tool) => (
							<Card
								key={tool.label}
								className="flex items-center justify-between p-3 border-neutral-950/5 bg-neutral-800"
							>
								<div className="flex items-center gap-x-4">
									<div className={cn('w-fit p-2 rounded-md', tool.bgColor)}>
										<tool.icon className={cn('w-6 h-6', tool.color)} />
									</div>
									<div className="font-light text-sm tracking-wider text-neutral-400">
										{tool.label}
									</div>
								</div>
								<Check className="w-5 h-5 text-emerald-500" />
							</Card>
						))}
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button
						size="lg"
						variant="premium"
						className="w-full"
						onClick={onSubscribe}
					>
						Upgrade <Zap className="w-4 h-4 ml-2 fill-neutral-50" />
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
