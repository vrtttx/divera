'use client';

import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useProModal } from '@/hooks/useProModal';

import { amountOptions, formSchema, resolutionOptions } from './constants';

import axios from 'axios';
import Image from 'next/image';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Empty from '@/components/Empty';
import Heading from '@/components/Heading';
import { Loader } from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { Card, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { Download, ImageIcon } from 'lucide-react';

interface ImagePageProps {}

const ImagePage: FC<ImagePageProps> = ({}) => {
	const proModal = useProModal();

	const router = useRouter();

	const [images, setImages] = useState<string[]>([]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: '',
			amount: '1',
			resolution: '512x512',
		},
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setImages([]);

			const response = await axios.post('/api/image', values);

			const urls = response.data.map((image: { url: string }) => image.url);

			setImages(urls);

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
				title="Image Generation"
				description="Turn a prompt into an image."
				icon={ImageIcon}
				iconColor="text-sky-400"
				bgColor="bg-sky-400/20"
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
									<FormItem className="col-span-12 lg:col-span-6">
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
							<FormField
								name="amount"
								control={form.control}
								render={({ field }) => (
									<FormItem className="col-span-12 lg:col-span-2">
										<Select
											disabled={isLoading}
											onValueChange={field.onChange}
											value={field.value}
											defaultValue={field.value}
										>
											<FormControl className="text-sky-400 border-neutral-500 bg-neutral-900">
												<SelectTrigger>
													<SelectValue defaultValue={field.value} />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{amountOptions.map((option) => (
													<SelectItem key={option.value} value={option.value}>
														{option.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>
							<FormField
								name="resolution"
								control={form.control}
								render={({ field }) => (
									<FormItem className="col-span-12 lg:col-span-2">
										<Select
											disabled={isLoading}
											onValueChange={field.onChange}
											value={field.value}
											defaultValue={field.value}
										>
											<FormControl className="text-sky-400 border-neutral-500 bg-neutral-900">
												<SelectTrigger>
													<SelectValue defaultValue={field.value} />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{resolutionOptions.map((option) => (
													<SelectItem key={option.value} value={option.value}>
														{option.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>
							<Button
								className="w-full col-span-12 bg-sky-600 lg:col-span-2 hover:bg-sky-600/75"
								disabled={isLoading}
							>
								Generate
							</Button>
						</form>
					</Form>
				</div>
				<div className="space-y-4 mt-4">
					{isLoading && (
						<div className="p-20">
							<Loader />
						</div>
					)}
					{images.length === 0 && !isLoading && (
						<Empty label="No images generated. Go ahead and give it a try!" />
					)}
					<div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{images.map((src) => (
							<Card
								key={src}
								className="rounded-lg border-sky-600 bg-neutral-800 overflow-hidden"
							>
								<div className="aspect-square relative">
									<Image src={src} alt="Image" fill />
								</div>
								<CardFooter className="p-2">
									<Button
										className="w-full text-sky-400 border border-sky-600 bg-transparent transition hover:text-neutral-100 hover:bg-sky-600"
										onClick={() => window.open(src)}
									>
										<Download className="w-4 h-4 mr-2" />
										Download
									</Button>
								</CardFooter>
							</Card>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ImagePage;
