"use client";

import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";
import CardWrapper from "./card-wrapper";

export const NewVerificationForm = () => {
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();
	const searchParams = useSearchParams();
	const token = searchParams.get("token");
	const onSubmit = useCallback(() => {
		if (success || error) {
			return;
		}

		if (!token) {
			setError("No token found");
			return;
		}
		newVerification(token)
			.then((data) => {
				setSuccess(data.success);
				setError(data.error);
			})
			.catch(() => {
				setError("An error occurred");
			});
	}, [token, success, error]);

	useEffect(() => {
		onSubmit();
	}, [onSubmit]);
	return (
		<CardWrapper
			headerLabel="Confirming your verfication"
			backButtonLabel="Back to login"
			backButtonHref="/auth/login">
			<div className="flex items-center w-full justify-center">
				{!success && !error && <BeatLoader />}
				<FormSuccess message={success} />
				{!success && <FormError message={error} />}
			</div>
		</CardWrapper>
	);
};
