"use client";
import { Link, Element } from "react-scroll";
import { DM_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";

import Claim from "@/components/how-to-get-night/claim";
import FirstSection from "@/components/how-to-get-night/first-section";
import MakeAClaim from "@/components/how-to-get-night/make-a-claim";
import Redeem from "@/components/how-to-get-night/redeem";
import Thaw from "@/components/how-to-get-night/thaw";

// DM Mono
const dmMono = DM_Mono({
	subsets: ["latin"],
	weight: ["400", "500"],
});

const sections = [
	{ id: "claim", label: "CLAIM" },
	{ id: "thaw", label: "THAW" },
	{ id: "redeem", label: "REDEEM" },
];

function HowToGetNightPage() {
	const [activeIndex, setActiveIndex] = useState(0);
	const linksRef = useRef<Array<HTMLDivElement | null>>([]);
	const containerRef = useRef<HTMLDivElement | null>(null);

	// Scroll active link into view whenever it changes
	useEffect(() => {
		const activeLink = linksRef.current[activeIndex];
		if (activeLink && containerRef.current) {
			activeLink.scrollIntoView({
				behavior: "smooth",
				inline: "center",
				block: "nearest",
			});
		}
	}, [activeIndex]);
	return (
		<div className="relative">
			{/* Sticky Sub-Nav */}
			<nav
				className={cn(
					"fixed top-16 md:top-12 lg:top-12 bg-white/30 flex items-center left-0 right-0 z-50 backdrop-blur px-6 h-10 text-xs sc-divider",
					dmMono.className
				)}
			>
				<span className="mr-4 font-medium text-sm whitespace-nowrap">
					JUMP TO:
				</span>

				{/* Scrollable container */}
				<div
					ref={containerRef}
					className="flex gap-6 overflow-x-auto "
					style={{
						// Hide scrollbar on all browsers
						scrollbarWidth: "none", // Firefox
						msOverflowStyle: "none", // IE 10+
					}}
				>
					{sections.map((section, index) => (
						<div
							key={section.id}
							ref={(el: HTMLDivElement | null) => {
								linksRef.current[index] = el;
							}}
						>
							<Link
								to={section.id}
								spy={true}
								smooth={true}
								offset={10}
								duration={500}
								className={cn(
									"cursor-pointer py-2 whitespace-nowrap",
									activeIndex === index
										? "text-black font-medium border-b-2 border-black"
										: "text-gray-700"
								)}
								onSetActive={() => setActiveIndex(index)}
							>
								{section.label}
							</Link>
						</div>
					))}
				</div>
			</nav>

			<FirstSection />
			<Claim />
			{/* Sections */}
			<Element name="claim">
				<MakeAClaim />
			</Element>
			<Element name="thaw">
				<Thaw />
			</Element>
			<Element name="redeem">
				<Redeem />
			</Element>
		</div>
	);
}

export default HowToGetNightPage;
