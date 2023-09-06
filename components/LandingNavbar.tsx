'use client';

import { cn } from '@/lib/utils';

import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';

import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ weight: '200', subsets: ['latin'] });

export const LandingNavbar = () => {
	const { isSignedIn } = useAuth();

	return (
		<nav className="flex items-center justify-between p-4 bg-transparent">
			<Link href="/" className="flex items-center">
				<div className="w-8 h-8 relative mr-3">
					<Image src="/assets/images/logo-icon-pb.png" alt="logo" fill />
				</div>
				<h1
					className={cn(
						'text-2xl tracking-wider text-neutral-50',
						montserrat.className
					)}
				>
					Divera
				</h1>
			</Link>
			<div className="flex items-center gap-x-2">
				<Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
					<Button variant="outline" className="rounded-full">
						Get Started
					</Button>
				</Link>
			</div>
		</nav>
	);
};
