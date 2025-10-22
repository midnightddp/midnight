// hooks/useSignin.ts
import { signInWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

export const useSignin = () => {
	const signin = async (
		email: string,
		password: string
	): Promise<{ user?: User; error?: string }> => {
		try {
			const res = await signInWithEmailAndPassword(auth, email, password);
			return { user: res.user };
		} catch (err: any) {
			return { error: err.message || "Sign in failed" };
		}
	};

	return { signin };
};
