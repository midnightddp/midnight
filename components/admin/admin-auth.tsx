// components/AdminAuth.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

type Props = {
	children: ReactNode;
	allowedUids?: string[]; // optional override
	redirectTo?: string; // default "/admin/sign-in"
};

export default function AdminAuth({
	children,
	allowedUids,
	redirectTo = "/admin/sign-in",
}: Props) {
	const router = useRouter();
	const pathname = usePathname();
	const isSignInPage = pathname === redirectTo;

	const [status, setStatus] = useState<"authorized" | "unauthorized">(
		"unauthorized"
	);
	const [checkingAuth, setCheckingAuth] = useState(true); // wait for Firebase

	useEffect(() => {
		const envUids =
			typeof process !== "undefined" && process.env.NEXT_PUBLIC_ADMIN_UIDS
				? process.env.NEXT_PUBLIC_ADMIN_UIDS.split(",")
						.map((s) => s.trim())
						.filter(Boolean)
				: [];

		const allowed = allowedUids?.length ? allowedUids : envUids;

		const handleUnauthorized = () => {
			setStatus("unauthorized");
			if (!isSignInPage) router.replace(redirectTo);
		};

		if (!allowed || allowed.length === 0) {
			console.warn(
				"AdminAuth: no allowed UIDs found. Set NEXT_PUBLIC_ADMIN_UIDS or pass allowedUids prop."
			);
			setCheckingAuth(false);
			handleUnauthorized();
			return;
		}

		// components/AdminAuth.tsx

		// components/AdminAuth.tsx

		const unsub = onAuthStateChanged(auth, (user: User | null) => {
			// We only authorize if the user exists, is NOT anonymous, AND is in the list
			if (user && !user.isAnonymous && allowed.includes(user.uid)) {
				setStatus("authorized");
			} else {
				// Any other case (null, anonymous, or non-admin) is unauthorized
				handleUnauthorized();
			}
			setCheckingAuth(false); // stop loading only after Firebase responds
		});

		return () => unsub();
	}, [allowedUids, router, redirectTo, pathname, isSignInPage]);

	if (checkingAuth) {
		// Wait for Firebase check
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
