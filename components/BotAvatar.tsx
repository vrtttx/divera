import { Avatar, AvatarImage } from '@/components/ui/avatar';

export const BotAvatar = () => {
	return (
		<Avatar className="w-8 h-8">
			<AvatarImage className="p-1" src="/assets/images/logo-icon-pb.png" />
		</Avatar>
	);
};
