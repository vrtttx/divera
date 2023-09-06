'use client';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const testimonials = [
	{
		name: 'Luiz Carlos Silva',
		title: 'Entrepeneur',
		description:
			"This AI app is a game-changer for my company. The best AI application I've ever used!",
	},
	{
		name: 'Leandro Lobo',
		title: 'Movies Director',
		description:
			"It's like having a co-writer who's always ready to brainstorm the next blockbuster.",
	},
	{
		name: 'Isadora Azevedo',
		title: 'Designer',
		description:
			'This AI app fuels my creativity. It offers fresh design ideas, color palettes, and even helps with layout suggestions.',
	},
	{
		name: 'Marcela Terra',
		title: 'Journalist',
		description:
			"Quick research and content generation. It helps me meet deadlines and deliver top-notch stories. It's a journalist's dream tool!",
	},
];

export const LandingContent = () => {
	return (
		<div className="px-10 pb-20">
			<h2 className="mb-10 font-normal text-4xl text-center text-neutral-300">
				Testimonials
			</h2>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{testimonials.map((item) => (
					<Card
						key={item.description}
						className="text-neutral-50 border border-neutral-500 bg-neutral-900"
					>
						<CardHeader>
							<CardTitle className="flex items-center gap-x-2">
								<div>
									<p className="text-lg">{item.name}</p>
									<p className="font-normal text-sm text-pink-500">
										{item.title}
									</p>
								</div>
							</CardTitle>
							<CardContent className="px-0 py-0 pt-4 font-normal text-sm">
								{item.description}
							</CardContent>
						</CardHeader>
					</Card>
				))}
			</div>
		</div>
	);
};
