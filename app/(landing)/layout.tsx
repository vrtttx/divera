const LandingLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="h-full bg-gradient-to-br from-neutral-900 to-neutral-950 overflow-auto">
			<div className="max-w-screen-xl h-full mx-auto">{children}</div>
		</main>
	);
};

export default LandingLayout;
