'use client';

import { FC } from 'react';

import { useForm } from 'react-hook-form';

import { formSchema } from './constants';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Heading from '@/components/Heading';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { MessageSquare } from 'lucide-react';

interface ConversationPageProps {}

const ConversationPage: FC<ConversationPageProps> = ({}) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: '',
		},
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log(values);
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
				<div className="space-y-4 mt-4 text-white">Messages Content</div>
			</div>
		</div>
	);
};

export default ConversationPage;
