import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="h-full relative">
			<div className="h-full hidden bg-gray-900 z-[80] md:w-64 md:flex md:flex-col md:fixed md:inset-y-0">
				<Sidebar />
			</div>
			<main className="md:pl-64">
				<Navbar />
				{children}
			</main>
		</div>
	);
};

export default DashboardLayout;
