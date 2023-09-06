'use client';

import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';

import TypewriterComponent from 'typewriter-effect';
import { Button } from '@/components/ui/button';

export const LandingHero = () => {
	const { isSignedIn } = useAuth();

	return (
		<div className="max-w-[90%] space-y-5 py-24 mx-auto font-bold text-center text-neutral-50">
			<h1 className="space-y-5 font-bold text-3xl md:text-5xl lg:text-6xl">
				AI Models for Every Need
			</h1>
			<div className="space-y-5 font-extrabold text-4xl md:text-6xl lg:text-7xl">
				<div className="p-4 text-transparent text-center border-2 border-neutral-800 bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600 sm:p-6 md:p-8">
					<TypewriterComponent
						options={{
							strings: [
								'Chatbot',
								'Code Generation',
								'Image Generation',
								'Video Generation',
								'Music Generation',
							],
							autoStart: true,
							loop: true,
						}}
					/>
				</div>
			</div>
			<div className="font-light text-neutral-400 text-sm md:text-base">
				Designed to be your personalized AI companion, Divera offers a diverse
				range of services, including custom conversations, curated music
				creation, stunning images, captivating videos, and even code generation.
				With Divera, the possibilities are as limitless as your imagination.
			</div>
			<div className="pt-4 sm:pt-6">
				<Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
					<Button
						variant="premium"
						className="p-4 font-light rounded-full md:p-6 md:text-base"
					>
						Start for Free
					</Button>
				</Link>
			</div>
			<div className="font-normal text-xs text-neutral-600 md:text-sm">
				No credit card required.
			</div>
		</div>
	);
};
