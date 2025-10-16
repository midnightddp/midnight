import React from "react";
import HomeIcon from "../icons/home-icon";
import Link from "next/link";

function Navbar() {
	const navLinks = [
		{ href: "/", label: "Home" },
		{ href: "/how-to-get-nights", label: "How to get Night" },
		{ href: "/news", label: "News" },
		{ href: "/faq", label: "FAQs" },
	];
	return (
		<nav className="sticky top-0 z-50 w-full sc-divider  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background py-3 p-primary flex">
			<div>
				<span>
					<HomeIcon />
				</span>
				<span></span>
			</div>
			{/* Desktop Navigation */}
			<div className="hidden md:flex items-center space-x-8">
				{navLinks.map((link) => (
					<Link
						key={link.href}
						href={link.href}
						className="text-sm font-medium transition-colors hover:text-primary"
					>
						{link.label}
					</Link>
				))}
			</div>
		</nav>
	);
}

export default Navbar;
