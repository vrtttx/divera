'use client';

import { FC } from 'react';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

import Image from 'next/image';
import Link from 'next/link';

import FreeCounter from './FreeCounter';

import {
	Code,
	ImageIcon,
	LayoutDashboard,
	MessageSquare,
	Music,
	Settings,
	VideoIcon,
} from 'lucide-react';

import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ weight: '200', subsets: ['latin'] });

const routes = [
	{
		label: 'Dashboard',
		icon: LayoutDashboard,
		href: '/dashboard',
		color: 'text-white',
	},
	{
		label: 'Conversation',
		icon: MessageSquare,
		href: '/conversation',
		color: 'text-violet-400',
	},
	{
		label: 'Code Generation',
		icon: Code,
		href: '/code',
		color: 'text-pink-400',
	},
	{
		label: 'Image Generation',
		icon: ImageIcon,
		href: '/image',
		color: 'text-sky-400',
	},
	{
		label: 'Video Generation',
		icon: VideoIcon,
		href: '/video',
		color: 'text-amber-300',
	},
	{
		label: 'Music Generation',
		icon: Music,
		href: '/music',
		color: 'text-red-400',
	},
	{
		label: 'Settings',
		icon: Settings,
		href: '/settings',
		color: 'text-neutral-500',
	},
];

interface SidebarProps {
	apiLimitCount: number;
}

const Sidebar: FC<SidebarProps> = ({ apiLimitCount = 0 }: SidebarProps) => {
	const pathname = usePathname();

	return (
		<div className="h-full flex flex-col space-y-4 py-4 text-white border-r border-neutral-800 bg-gradient-to-tr from-neutral-800 to-neutral-950">
			<div className="flex-1 px-3 py-2">
				<Link
					href="/dashboard"
					className="flex items-center justify-center mt-3 mb-9"
				>
					<div className="w-10 h-10 relative mr-3">
						<Image src="/assets/images/logo-icon-pb.png" alt="logo" fill />
					</div>
					<h1
						className={cn(
							'text-3xl tracking-wider text-neutral-50',
							montserrat.className
						)}
					>
						Divera
					</h1>
				</Link>
				<hr className="border-neutral-800" />
				<div className="space-y-1 mt-9">
					{routes.map((route) => (
						<Link
							key={route.href}
							href={route.href}
							className={cn(
								'group w-full flex justify-start p-3 font-light text-sm tracking-wider rounded-lg transition cursor-pointer hover:text-neutral-100 hover:bg-neutral-50/5',
								pathname === route.href
									? 'text-white bg-neutral-50/5'
									: 'text-neutral-500'
							)}
						>
							<div className="flex flex-1 items-center">
								<route.icon className={cn('w-6 h-6 mr-3', route.color)} />
								{route.label}
							</div>
						</Link>
					))}
				</div>
			</div>
			<FreeCounter apiLimitCount={apiLimitCount} />
		</div>
	);
};

export default Sidebar;
