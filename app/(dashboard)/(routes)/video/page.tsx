'use client';

import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

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

import { VideoIcon } from 'lucide-react';

interface VideoPageProps {}

const VideoPage: FC<VideoPageProps> = ({}) => {
	const router = useRouter();

	const [video, setVideo] = useState<string>();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: '',
		},
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setVideo(undefined);

			const response = await axios.post('/api/video', values);

			setVideo(response.data[0]);

			form.reset();
		} catch (error: any) {
			// TODO: Open Pro Modal
			console.log(error);
		} finally {
			router.refresh();
		}
	};

	return (
		<div>
			<Heading
				title="Video Generation"
				description="Turn a prompt into video."
				icon={VideoIcon}
				iconColor="text-amber-300"
				bgColor="bg-amber-300/20"
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
								className="w-full col-span-12 bg-amber-600 lg:col-span-2 hover:bg-amber-600/75"
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
					{!video && !isLoading && (
						<Empty label="No video generated. Go ahead and give it a try!" />
					)}
					{video && (
						<video
							controls
							className="aspect-video w-full mt-8 rounded-lg border border-amber-600 bg-neutral-800"
						>
							<source src={video} />
						</video>
					)}
				</div>
			</div>
		</div>
	);
};

export default VideoPage;
