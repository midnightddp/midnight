import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Equal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const navLinks = [
	{ href: "/", label: "Dashboard" },
	{ href: "/sign-in", label: "Sign In" },
];

interface NavbarProps {
	isAuthenticated?: boolean;
	onSignOut?: () => void;
}

export default function Navbar({
	isAuthenticated = false,
	onSignOut,
}: NavbarProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			{/* Desktop Nav */}
			<nav
				className={cn(
					"fixed top-0 z-50 w-full sc-divider bg-white/80 backdrop-blur-md p-primary hidden md:flex items-center md:gap-10 lg:gap-12 h-14"
				)}
			>
				<div className="flex items-center space-x-6 text-sm font-dm-mono">
					{navLinks.map((link) => {
						if (link.href === "/sign-in" && isAuthenticated) return null;
						const isActive = location.pathname === link.href;

						return (
							<Link
								key={link.href}
								href={link.href}
								className={cn(
									"transition-colors hover:text-black/50 h-full py-4",
									isActive ? "border-b border-black font-medium" : "border-0"
								)}
							>
								{link.label}
							</Link>
						);
					})}
					{isAuthenticated && (
						<button
							onClick={onSignOut}
							className="transition-colors hover:text-black/50 h-full py-4"
						>
							Sign Out
						</button>
					)}
				</div>
				<div className="ml-auto">
					<Button
						variant="default"
						size="sm"
						className="button-primary py-4 text-xs px-4"
					>
						CLAIM NOW
					</Button>
				</div>
			</nav>

			{/* Mobile Top Bar */}
			<nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-6 py-3 md:hidden h-16">
				<Button
					onClick={() => setIsOpen(true)}
					className="flex flex-col items-center"
				>
					<Equal className="w-6 h-6" />
				</Button>
			</nav>

			{/* Mobile Menu Overlay */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						className="fixed inset-0 z-[60] bg-white flex flex-col items-start justify-start p-2 pt-28"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.65 }}
					>
						<button
							onClick={() => setIsOpen(false)}
							className="absolute top-2 right-5 p-2"
						>
							<X className="w-6 h-6" />
						</button>

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
							{navLinks.map((link) => {
								if (link.href === "/sign-in" && isAuthenticated) return null;
								return (
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
								);
							})}
							{isAuthenticated && (
								<motion.li
									variants={{
										hidden: { opacity: 0, y: 20 },
										visible: { opacity: 1, y: 0 },
									}}
									className="border-b border-black/20 flex items-center w-full pb-4"
								>
									<button
										onClick={() => {
											onSignOut?.();
											setIsOpen(false);
										}}
										className="text-2xl font-medium hover:text-primary transition-colors hover:text-black/60"
									>
										Sign Out
									</button>
								</motion.li>
							)}
						</motion.ul>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
