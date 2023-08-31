import { UserButton } from '@clerk/nextjs';

const DashboardPage = () => {
	return (
		<div>
			<div>Dashboard Page (Protected)</div>
			<UserButton afterSignOutUrl="/" />
		</div>
	);
};

export default DashboardPage;
