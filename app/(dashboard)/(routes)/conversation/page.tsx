'use client';

import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useProModal } from '@/hooks/useProModal';

import { formSchema } from './constants';

import OpenAI from 'openai';

import axios from 'axios';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Empty from '@/components/Empty';
import Heading from '@/components/Heading';
import { Loader } from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserAvatar } from '@/components/UserAvatar';
import { BotAvatar } from '@/components/BotAvatar';

interface ConversationPageProps {}

const ConversationPage: FC<ConversationPageProps> = ({}) => {
	const proModal = useProModal();

	const router = useRouter();

	const [messages, setMessages] = useState<
		OpenAI.Chat.ChatCompletionMessageParam[]
	>([]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: '',
		},
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const userMessage: OpenAI.Chat.ChatCompletionMessageParam = {
				role: 'user',
				content: values.prompt,
			};

			const newMessages = [...messages, userMessage];

			const response = await axios.post('/api/conversation', {
				messages: newMessages,
			});

			setMessages((current) => [...current, userMessage, response.data]);

			form.reset();
		} catch (error: any) {
			if (error?.response?.status === 403) {
				proModal.onOpen();
			}
		} finally {
			router.refresh();
		}
	};

	return (
		<div>
			<Heading
				title="Conversation"
				description="Our most advanced conversation model."
				icon={MessageSquare}
				iconColor="text-violet-400"
				bgColor="bg-violet-400/20"
			/>
			<div className="px-4 lg:px-8">
				<div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="w-full grid grid-cols-12 gap-2 p-4 px-3 rounded-lg border border-neutral-800 bg-neutral-900 focus-within:shadow-sm md:px-6"
						>
							<FormField
								name="prompt"
								render={({ field }) => (
									<FormItem className="col-span-12 lg:col-span-10">
										<FormControl className="p-0 m-0">
											<Input
												className="font-light text-neutral-50 bg-transparent border-0 outline-none placeholder:text-neutral-500 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-0 focus-visible:ring-transparent"
												disabled={isLoading}
												placeholder="Enter your prompt here..."
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<Button
								className="w-full col-span-12 bg-violet-600 lg:col-span-2 hover:bg-violet-600/75"
								disabled={isLoading}
							>
								Generate
							</Button>
						</form>
					</Form>
				</div>
				<div className="space-y-4 mt-4">
					{isLoading && (
						<div className="w-full flex items-center justify-center p-8 rounded-lg bg-neutral-900/30">
							<Loader />
						</div>
					)}
					{messages.length === 0 && !isLoading && (
						<Empty label="No conversations found. Go ahead and start a new one!" />
					)}
					<div className="flex flex-col-reverse gap-y-4">
						{messages.map((message) => (
							<div
								key={message.content}
								className={cn(
									'w-full flex items-start gap-x-6 p-4 font-light border rounded-lg',
									message.role === 'user'
										? 'text-neutral-50 border-neutral-600 bg-neutral-50/10'
										: 'text-violet-100 border-violet-400 bg-violet-400/10'
								)}
							>
								{message.role === 'user' ? <UserAvatar /> : <BotAvatar />}
								<p className="font-light text-sm">{message.content}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConversationPage;
