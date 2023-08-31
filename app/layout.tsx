import type { Metadata } from 'next';

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
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
