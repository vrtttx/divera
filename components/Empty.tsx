import Image from 'next/image';
import { FC } from 'react';

interface EmptyProps {
	label: string;
}

const Empty: FC<EmptyProps> = ({ label }) => {
	return (
		<div className="h-full flex flex-col items-center justify-center p-6 lg:p-20">
			<div className="w-64 h-64 relative">
				<Image src="/assets/images/empty.png" alt="Empty State" fill />
			</div>
			<p className="font-light tracking-wider text-center text-neutral-500">
				{label}
			</p>
		</div>
	);
};

export default Empty;
