"use client";

import Link from "next/link";
import NightIcon from "../icons/night-icon";
import { DM_Mono, Outfit } from "next/font/google";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";

// DM Mono
const dmMono = DM_Mono({
	subsets: ["latin"],
	weight: ["400", "500"],
});

// Outfit
const outfit = Outfit({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

export default function Footer() {
	const [searchTerm, setSearchTerm] = useState("");
	return (
		<footer
			className={cn(
				"bg-blue-700 text-white py-12 px-6 md:px-12 lg:px-24 w-full",
				outfit.className
			)}
		>
			<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
				{/* Column 1 - Brand */}
				<div className="space-y-4">
					<span className="flex gap-2 justify-start items-center">
						<div className="h-10">
							<NightIcon />
						</div>
						<h2 className="text-3xl font-medium">midnight</h2>
					</span>
				</div>

				{/* Column 3 - Resources */}
				<div>
					<h3 className={cn(" text-xs uppercase mb-4", dmMono.className)}>
						WHITEPAPERS
					</h3>
					<ul className="space-y-2 text-2xl">
						<li>
							<Link
								href="#"
								className="hover:underline"
							>
								MICA
							</Link>
						</li>
						<li>
							<Link
								href="#"
								className="hover:underline"
							>
								Tokenomics
							</Link>
						</li>
					</ul>
				</div>

				{/* Column 4 - Newsletter */}
				<div className="w-full flex flex-col">
					<h3 className={cn("text-sm uppercase mb-4", dmMono.className)}>
						SIGN UP FOR UPDATES
					</h3>
					<form className="flex flex-col  items-start sm:items-center gap-3">
						<p>
							Email<span className="text-red-500">*</span>
						</p>
						<Input
							id="search"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="py-6 rounded-sm border-white/20 w-full"
						/>

						<Button
							type="button"
							onClick={() => {
								setSearchTerm("");
							}}
							className="text-white bg-blue-900 p-6 rounded-md hover:bg-blue-900/50 transition self-start"
						>
							SUBMIT
						</Button>
					</form>
				</div>
			</div>

			{/* Bottom section */}
			<div
				className={cn(
					"border-t border-black/60 mt-10 pt-8 gap-4 ",
					dmMono.className
				)}
			>
				<div className="flex flex-col md:flex-row gap-2 text-sm md:gap-4">
					<Link
						href="/privacy-policy"
						className="hover:text-white/50"
					>
						PRIVACY POLICY
					</Link>
					<Link
						href="/website-term-of-use"
						className="hover:text-white/50"
					>
						WEBSITE TERMS OF USE
					</Link>
					<Link
						href="/cookie-policy"
						className="hover:text-white/50"
					>
						COOKIES POLICY
					</Link>
					<Link
						href="/token-end-user-terms"
						className="hover:text-white/50"
					>
						TOKEN END USER TERMS
					</Link>
				</div>
			</div>
		</footer>
	);
}
