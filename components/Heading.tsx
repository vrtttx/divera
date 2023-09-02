import { FC } from 'react';

import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeadingProps {
	title: string;
	description: string;
	icon: LucideIcon;
	iconColor?: string;
	bgColor?: string;
}

const Heading: FC<HeadingProps> = ({
	title,
	description,
	icon: Icon,
	iconColor,
	bgColor,
}) => {
	return (
		<div className="flex items-center gap-x-3 px-4 mb-8 lg:px-8">
			<div className={cn('w-fit px-2 rounded-md', bgColor)}>
				<Icon className={cn('w-10, h-10', iconColor)} />
			</div>
			<div>
				<h2 className="font-extralight text-2xl tracking-wider text-neutral-50">
					{title}
				</h2>
				<p
					className={cn('font-extralight text-sm text-neutral-400', iconColor)}
				>
					{description}
				</p>
			</div>
		</div>
	);
};

export default Heading;
