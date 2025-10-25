"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Equal, Menu, X } from "lucide-react"; // using lucide icons
import HomeIcon from "../icons/home-icon";
import { DM_Mono, Outfit } from "next/font/google";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";

// Outfit
const outfit = Outfit({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

// DM Mono
const dmMono = DM_Mono({
	subsets: ["latin"],
	weight: ["400", "500"],
});

const navLinks = [
	{ href: "/", label: "HOME" },
	{ href: "/how-to-get-night", label: "HOW TO GET NIGHT" },

	{ href: "/faqs", label: "FAQs" },
];

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();
	const router = useRouter();

	return (
		<>
			{/* ───── Desktop Nav ───── */}
			<nav
				className={cn(
					"fixed top-0 z-50 w-full sc-divider bg-white/80 backdrop-blur p-primary hidden md:flex items-center md:gap-10 lg:gap-12 h-14",
					outfit.className
				)}
			>
				<div className="flex items-center space-x-2">
					<HomeIcon />
					<span className="font-outfit font-semibold text-blue-700 text-2xl">
						midnight
					</span>
				</div>

				<div
					className={cn(
						"flex items-center space-x-6 text-sm",
						dmMono.className
					)}
				>
					{navLinks.map((link) => {
						const isActive = pathname === link.href;

						return (
							<Link
								key={link.href}
								href={link.href}
								className={cn(
									" transition-colors hover:text-black/50 h-full py-4",
									isActive ? "border-b border-black font-medium" : "border-0"
								)}
							>
								{link.label}
							</Link>
						);
					})}
				</div>
				<div className="ml-auto">
					<Button
						variant="default"
						size="sm"
						onClick={() => {
							router.push("/claim");
						}}
						className={cn("button-primary py-4 text-xs px-4", dmMono.className)}
					>
						CLAIM NOW
					</Button>
				</div>
			</nav>

			{/* ───── Mobile Top Bar ───── */}
			<nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200 flex items-center justify-between px-6 py-3 md:hidden h-16">
				<Link
					href="/"
					className="flex flex-col items-center "
				>
					<HomeIcon />
				</Link>

				<button
					onClick={() => setIsOpen(true)}
					className="flex flex-col items-center"
				>
					<Equal className="w-6 h-6" />
				</button>
			</nav>

			{/* ───── Mobile Menu Overlay ───── */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						// This class was changed from 'bg-background' to 'bg-white'
						className="fixed inset-0 z-[60] bg-white flex flex-col items-start justify-start p-2 pt-28"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.65 }}
					>
						{/* Close Button */}
						<Link
							href="/"
							className="flex flex-col items-center absolute top-2 left-5 p-2"
						>
							<HomeIcon />
						</Link>
						<button
							onClick={() => setIsOpen(false)}
							className="absolute top-2 right-5 p-2 "
						>
							<X className="w-6 h-6" />
						</button>

						{/* Animated Nav Links */}
						<motion.ul
							initial="hidden"
							animate="visible"
							exit="hidden"
							variants={{
								hidden: { opacity: 0, y: 20 },
								visible: {
									opacity: 1,
									y: 0,
									transition: { staggerChildren: 0.1 },
								},
							}}
							className="space-y-4 text-start w-full"
						>
							{navLinks.map((link) => (
								<motion.li
									key={link.href}
									variants={{
										hidden: { opacity: 0, y: 20 },
										visible: { opacity: 1, y: 0 },
									}}
									className="border-b border-black/20 flex items-center w-full pb-4 first:border-t first:pt-4"
								>
									<Link
										href={link.href}
										onClick={() => setIsOpen(false)}
										className="text-2xl font-medium hover:text-primary transition-colors hover:text-black/60"
									>
										{link.label}
									</Link>
								</motion.li>
							))}
						</motion.ul>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
