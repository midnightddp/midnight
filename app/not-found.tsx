import Link from "next/link";
import { DM_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
// DM Mono
const dmMono = DM_Mono({
	subsets: ["latin"],
	weight: ["400", "500"],
});

const NotFound = () => {
	return (
		<div
			className={cn(
				"flex min-h-screen items-center justify-center bg-gray-100",
				dmMono.className
			)}
		>
			<div className="text-center border border-black p-12 bg-white">
				<h1 className="mb-4 text-4xl font-bold">404</h1>
				<p className="mb-4 text-xl text-gray-600">Oops! Page not found</p>
				<Link
					href="/"
					className="text-blue-500 underline hover:text-blue-700"
				>
					Return to Home
				</Link>
			</div>
		</div>
	);
};

export default NotFound;
