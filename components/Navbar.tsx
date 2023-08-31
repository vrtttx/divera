import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';

import { Menu } from 'lucide-react';
import MobileSidebar from './MobileSidebar';

const Navbar = () => {
	return (
		<div className="flex items-center p-4">
			<MobileSidebar />
			<div className="w-full flex justify-end">
				<UserButton afterSignOutUrl="/" />
			</div>
		</div>
	);
};

export default Navbar;
