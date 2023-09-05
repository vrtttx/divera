'use client';

import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useProModal } from '@/hooks/useProModal';

import { formSchema } from './constants';

import axios from 'axios';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Empty from '@/components/Empty';
import Heading from '@/components/Heading';
import { Loader } from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Music } from 'lucide-react';

interface MusicPageProps {}

const MusicPage: FC<MusicPageProps> = ({}) => {
	const proModal = useProModal();

	const router = useRouter();

	const [music, setMusic] = useState<string>();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: '',
		},
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setMusic(undefined);

			const response = await axios.post('/api/music', values);

			setMusic(response.data.audio);

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
				title="Music Generation"
				description="Turn a prompt into music."
				icon={Music}
				iconColor="text-red-400"
				bgColor="bg-red-400/20"
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
								className="w-full col-span-12 bg-red-600 lg:col-span-2 hover:bg-red-600/75"
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
					{!music && !isLoading && (
						<Empty label="No music generated. Go ahead and give it a try!" />
					)}
					{music && (
						<audio controls className="w-full mt-8">
							<source src={music} />
						</audio>
					)}
				</div>
			</div>
		</div>
	);
};

export default MusicPage;
