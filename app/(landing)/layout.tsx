const LandingLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="h-full bg-neutral-950 overflow-auto">
			<div className="max-w-screen-xl h-full mx-auto">{children}</div>
		</main>
	);
};

export default LandingLayout;
