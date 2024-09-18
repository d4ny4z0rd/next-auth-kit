"use client";
import { signIn, signOut } from "next-auth/react";

const Appbar = () => {
	return (
		<div>
			<button onClick={() => signIn()}>Signin</button>
			<button onClick={() => signOut()}>Sign out</button>
		</div>
	);
};

export default Appbar;
