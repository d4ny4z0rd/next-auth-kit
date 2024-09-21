"use client";

import React, { Suspense, useState, useTransition } from "react";
import CardWrapper from "./card-wrapper";
import { useForm } from "react-hook-form";
import { newPasswordSchema } from "@/schemas";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/new-password";

const NewPasswordForm = () => {
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [isPending, startTransition] = useTransition();
	const form = useForm<z.infer<typeof newPasswordSchema>>({
		resolver: zodResolver(newPasswordSchema),
		defaultValues: {
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof newPasswordSchema>) => {
		setError("");
		setSuccess("");

		console.log(values);

		startTransition(() => {
			newPassword(values, token).then((data) => {
				setError(data?.error);
				setSuccess(data?.success);
			});
		});
	};

	return (
		<Suspense>
			<CardWrapper
				headerLabel="Enter a new password"
				backButtonLabel="Back to login"
				backButtonHref="/auth/login">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<div className="space-y-4">
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>New password</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="********"
												type="password"
												disabled={isPending}
											/>
										</FormControl>
										<FormMessage />;
									</FormItem>
								)}
							/>
						</div>
						<FormError message={error} />
						<FormSuccess message={success} />
						<Button type="submit" className="w-full" disabled={isPending}>
							Reset Password
						</Button>
					</form>
				</Form>
			</CardWrapper>
		</Suspense>
	);
};

export default NewPasswordForm;
