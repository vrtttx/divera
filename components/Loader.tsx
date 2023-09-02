import Image from 'next/image';

export const Loader = () => {
	return (
		<div className="h-full flex flex-col items-center justify-center gap-y-4">
			<div className="w-10 h-10 relative animate-bounce">
				<Image src="/assets/images/logo-icon-pb.png" alt="Logo" fill />
			</div>
			<p className="font-light tracking-wider text-neutral-400">
				Divera is thinking...
			</p>
		</div>
	);
};
