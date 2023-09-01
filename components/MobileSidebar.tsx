'use client';

import { FC, useEffect, useState } from 'react';

import Sidebar from './Sidebar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { Menu } from 'lucide-react';

interface MobileSidebarProps {}

const MobileSidebar: FC<MobileSidebarProps> = ({}) => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<Sheet>
			<SheetTrigger>
				<Button variant="ghost" size="icon" className="md:hidden">
					<Menu className="text-neutral-50" />
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="p-0">
				<Sidebar />
			</SheetContent>
		</Sheet>
	);
};

export default MobileSidebar;
