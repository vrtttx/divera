import type { Metadata } from 'next';

import { ClerkProvider } from '@clerk/nextjs';

import { CrispProvider } from '@/components/CrispProvider';
import { ModalProvider } from '@/components/ModalProvider';
import { ToasterProvider } from '@/components/ToasterProvider';

import './globals.css';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Divera | AI-driven versatility!',
	description:
		'An AI-powered SAAS app offering custom AI services - conversation, music, images, videos, and code. Enter a prompt and get precise results tailored to your needs.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang="en">
				<CrispProvider />
				<body className={`${inter.className} bg-neutral-950`}>
					<ModalProvider />
					<ToasterProvider />
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
