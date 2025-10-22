"use client";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export const useSignOut = () => {
	const router = useRouter();

	const handleSignOut = async () => {
		try {
			await signOut(auth);
			router.push("/"); // Redirect to home or login page
		} catch (error) {
			console.error("Error signing out:", error);
			// Optional: Add error toast here
		}
	};

	return { handleSignOut };
};
