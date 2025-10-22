// components/AdminAuth.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

type Props = {
	children: ReactNode;
	allowedEmails?: string[]; // optional override
	redirectTo?: string; // default "/admin/sign-in"
};

export default function AdminAuth({
	children,
	allowedEmails,
	redirectTo = "/admin/sign-in",
}: Props) {
	const router = useRouter();
	const pathname = usePathname();
	const isSignInPage = pathname === redirectTo;

	const [status, setStatus] = useState<"authorized" | "unauthorized">(
		"unauthorized"
	);
	const [checkingAuth, setCheckingAuth] = useState(true);

	useEffect(() => {
		const envEmails =
			typeof process !== "undefined" && process.env.NEXT_PUBLIC_ADMIN_EMAILS
				? process.env.NEXT_PUBLIC_ADMIN_EMAILS.split(",")
						.map((s) => s.trim())
						.filter(Boolean)
				: [];

		const allowed = allowedEmails?.length
			? allowedEmails
			: envEmails.length
			? envEmails
			: ["midnightddp@gmail.com"];

		const handleUnauthorized = () => {
			setStatus("unauthorized");
			if (!isSignInPage) router.replace(redirectTo);
		};

		if (!allowed || allowed.length === 0) {
			console.warn(
				"AdminAuth: no allowed emails found. Set NEXT_PUBLIC_ADMIN_EMAILS or pass allowedEmails prop."
			);
			setCheckingAuth(false);
			handleUnauthorized();
			return;
		}

		const unsub = onAuthStateChanged(auth, (user: User | null) => {
			// Authorize if user exists, is not anonymous, AND email is in allowed list
			if (
				user &&
				!user.isAnonymous &&
				user.email &&
				allowed.includes(user.email)
			) {
				setStatus("authorized");
			} else {
				handleUnauthorized();
			}
			setCheckingAuth(false);
		});

		return () => unsub();
	}, [allowedEmails, router, redirectTo, pathname, isSignInPage]);

	if (checkingAuth) {
		return (
			<div className="w-full h-screen flex items-center justify-center bg-white">
				<div className="text-center">
					<div className="mb-2">Verifying admin access…</div>
					<div className="h-3 w-16 rounded bg-gray-200 animate-pulse" />
				</div>
			</div>
		);
	}

	if (status === "unauthorized" && !isSignInPage) {
		return null; // redirect in progress
	}

	return <>{children}</>;
}
