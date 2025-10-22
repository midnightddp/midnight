"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react"; // <- eye icons

import { DM_Mono, Outfit } from "next/font/google";
import { cn } from "@/lib/utils";
import { useSignin } from "@/hooks/authHooks/use-signIn";
import { useToast } from "@/hooks/use-toast";

const outfit = Outfit({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});
const dmMono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"] });

export default function SignInPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false); // <-- toggle state
	const [emailValid, setEmailValid] = useState(true);
	const router = useRouter();
	const { toast } = useToast();
	const { signin } = useSignin();
	const [isLoading, setIsLoading] = useState(false);
	const [dots, setDots] = useState("");

	// ------------------------------
	// Email validation effect
	// ------------------------------
	useEffect(() => {
		const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (email === "") {
			setEmailValid(true);
		} else {
			setEmailValid(pattern.test(email));
		}
	}, [email]);

	// Animate dots for loading
	useEffect(() => {
		if (!isLoading) {
			setDots("");
			return;
		}
		const interval = setInterval(() => {
			setDots((prev) => (prev.length < 3 ? prev + "." : ""));
		}, 500);
		return () => clearInterval(interval);
	}, [isLoading]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!emailValid) {
			toast({
				title: "Invalid Email",
				description: "Please enter a valid email address.",
				variant: "destructive",
			});
			return;
		}
		setIsLoading(true);
		if (!email || !password) {
			toast({
				title: "Missing fields",
				description: "Please enter both email and password.",
				variant: "destructive",
			});
			setIsLoading(false);
			return;
		}
		try {
			const { user, error } = await signin(email, password);
			if (user) {
				toast({
					title: "Welcome back!",
					description: "You have successfully signed in.",
				});
				router.push("/admin");
			}
			if (error) {
				toast({
					title: "Sign in failed",
					description: "Invalid email or password.",
					variant: "destructive",
				});
				throw new Error(error);
			}
		} catch (error) {
			toast({
				title: "Error",
				description:
					"An unexpected error occurred. This may be an invalid email or password. Please try again.",
				variant: "destructive",
			});
		} finally {
			setEmail("");
			setPassword("");
			setIsLoading(false);
		}
	};

	const togglePasswordVisibility = () => setShowPassword(!showPassword);

	return (
		<div
			className={cn(
				"bg-white p-8 flex justify-center items-center",
				outfit.className
			)}
		>
			<div className="flex items-center justify-center p-8 border rounded-sm w-full md:max-w-1/2">
				<div className="w-full max-w-md space-y-8">
					<div className="text-center">
						<h1 className={cn("text-4xl font-semibold", dmMono.className)}>
							Sign In
						</h1>
					</div>

					<form
						onSubmit={handleSubmit}
						className="mt-8 space-y-6"
					>
						<div className="space-y-4">
							{/* Email Input */}
							<div>
								<Label
									htmlFor="email"
									className="font-dm-mono text-sm"
								>
									Email
								</Label>
								<Input
									id="email"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									placeholder="you@example.com"
									className={cn(
										"mt-1 rounded-sm",
										emailValid
											? "border-black"
											: "bg-orange-100 border-orange-800"
									)}
								/>
								{/* Validation Indicator */}
								{!emailValid && (
									<p className="text-xs text-orange-800 mt-1 font-dm-mono">
										Emails should be in the format emailname@domain.com
									</p>
								)}
							</div>

							{/* Password Input with toggle */}
							<div className="relative">
								<Label
									htmlFor="password"
									className="font-dm-mono text-sm"
								>
									Password
								</Label>
								<Input
									id="password"
									type={showPassword ? "text" : "password"}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									className="mt-1 border-black rounded-sm pr-10" // space for eye
									placeholder="••••••••"
								/>
								{/* Eye toggle button */}
								<button
									type="button"
									onClick={togglePasswordVisibility}
									className="absolute right-2 top-[38px] text-gray-500"
								>
									{showPassword ? (
										<EyeOff className="w-5 h-5" />
									) : (
										<Eye className="w-5 h-5" />
									)}
								</button>
							</div>
						</div>
						<Button
							type="submit"
							disabled={isLoading || !email || !password || !emailValid}
							className="button-primary w-full py-4 font-dm-mono text-xs"
						>
							{isLoading ? `SIGNING ${dots}` : "SIGN IN"}
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
}
