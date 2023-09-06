'use client';

import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useProModal } from '@/hooks/useProModal';

import { cn } from '@/lib/utils';

import { formSchema } from './constants';

import * as z from 'zod';
import axios from 'axios';
import OpenAI from 'openai';
import ReactMarkdown from 'react-markdown';
import { toast } from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';

import Empty from '@/components/Empty';
import Heading from '@/components/Heading';
import { BotAvatar } from '@/components/BotAvatar';
import { Loader } from '@/components/Loader';
import { UserAvatar } from '@/components/UserAvatar';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Code } from 'lucide-react';

interface CodePageProps {}

const CodePage: FC<CodePageProps> = ({}) => {
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

			const response = await axios.post('/api/code', {
				messages: newMessages,
			});

			setMessages((current) => [...current, userMessage, response.data]);

			form.reset();
		} catch (error: any) {
			if (error?.response?.status === 403) {
				proModal.onOpen();
			} else {
				toast.error('Something went wrong...');
			}
		} finally {
			router.refresh();
		}
	};

	return (
		<div>
			<Heading
				title="Code Generation"
				description="Generate code using descriptive text."
				icon={Code}
				iconColor="text-pink-400"
				bgColor="bg-pink-400/20"
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
								className="w-full col-span-12 bg-pink-600 lg:col-span-2 hover:bg-pink-600/75"
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
						<Empty label="No code requests found. Go ahead and try it!" />
					)}
					<div className="flex flex-col-reverse gap-y-4">
						{messages.map((message) => (
							<div
								key={message.content}
								className={cn(
									'w-full flex items-start gap-x-6 p-4 font-light border rounded-lg',
									message.role === 'user'
										? 'text-neutral-50 border-neutral-600 bg-neutral-50/10'
										: 'text-pink-50 border-pink-400 bg-pink-400/10'
								)}
							>
								{message.role === 'user' ? <UserAvatar /> : <BotAvatar />}
								<ReactMarkdown
									components={{
										pre: ({ node, ...props }) => (
											<div className="w-full p-2 my-2 rounded-lg bg-black overflow-auto">
												<pre {...props} />
											</div>
										),
										code: ({ node, ...props }) => (
											<code className="bg-black rounded-lg p-1" {...props} />
										),
									}}
									className="text-sm overflow-hidden leading-7"
								>
									{message.content || ''}
								</ReactMarkdown>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CodePage;
