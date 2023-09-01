'use client';

import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';

import { Card } from '@/components/ui/card';

import {
	ArrowRight,
	Code,
	ImageIcon,
	MessageSquare,
	Music,
	VideoIcon,
} from 'lucide-react';

const tools = [
	{
		label: 'Conversation',
		icon: MessageSquare,
		href: '/conversation',
		color: 'text-violet-400',
		bgColor: 'bg-neutral-50/5',
	},
	{
		label: 'Code Generation',
		icon: Code,
		href: '/code',
		color: 'text-pink-400',
		bgColor: 'bg-neutral-50/5',
	},
	{
		label: 'Image Generation',
		icon: ImageIcon,
		href: '/image',
		color: 'text-sky-400',
		bgColor: 'bg-neutral-50/5',
	},
	{
		label: 'Video Generation',
		icon: VideoIcon,
		href: '/video',
		color: 'text-amber-300',
		bgColor: 'bg-neutral-50/5',
	},
	{
		label: 'Music Generation',
		icon: Music,
		href: '/music',
		color: 'text-red-400',
		bgColor: 'bg-neutral-50/5',
	},
];

const DashboardPage = () => {
	const router = useRouter();

	return (
		<div>
			<div className="space-y-4 mb-8">
				<h2 className="font-extralight text-xl text-center tracking-wider text-neutral-50 md:text-3xl">
					The gateway to{' '}
					<span className="text-emerald-500">AI-driven versatility!</span>
				</h2>
				<p className="w-[90%] md:w-[90%] mx-auto font-light text-sm text-neutral-400 text-center md:text-sm">
					Designed to be your personalized AI companion with Divera the
					possibilities are as limitless as your imagination.
				</p>
			</div>
			<div className="space-y-4 px-4 md:px-20 lg:px32">
				{tools.map((tool) => (
					<Card
						key={tool.href}
						onClick={() => router.push(tool.href)}
						className="flex items-center justify-between p-4 text-neutral-400 border-neutral-700 bg-neutral-950 hover:text-neutral-50 hover:border-neutral-600 hover:bg-neutral-50/5 hover:shadow-md transition cursor-pointer"
					>
						<div className="flex items-center gap-x-4">
							<div className={cn('w-fit p-2 rounded-md', tool.bgColor)}>
								<tool.icon className={cn('w-8 h-8', tool.color)} />
							</div>
							<div className="font-light tracking-wider">{tool.label}</div>
						</div>
						<ArrowRight className="w-5 h-5" />
					</Card>
				))}
			</div>
		</div>
	);
};

export default DashboardPage;
