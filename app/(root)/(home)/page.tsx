"use client";

import { Link, Element } from "react-scroll";
import { DM_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";

import Hero from "@/components/home/hero";
import Distribution from "@/components/home/distribution";
import Allocations from "@/components/home/allocations";
import Tokenomics from "@/components/home/tokenomics";
import Night from "@/components/home/night";
import Dust from "@/components/home/dust";
import Timeline from "@/components/home/timeline";

// DM Mono
const dmMono = DM_Mono({
	subsets: ["latin"],
	weight: ["400", "500"],
});

const sections = [
	{ id: "distribution", label: "DISTRIBUTION" },
	{ id: "allocations", label: "ALLOCATIONS" },
	{ id: "tokenomics", label: "TOKENOMICS" },
	{ id: "night", label: "NIGHT" },
	{ id: "dust", label: "DUST" },
	{ id: "timeline", label: "TIMELINE" },
];

export default function Home() {
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
					"fixed top-16 md:top-14 lg:top-14 bg-white/30 flex items-center left-0 right-0 z-50 backdrop-blur px-6 h-12 text-xs sc-divider",
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

			{/* Sections */}
			<Element name="hero">
				<Hero />
			</Element>
			<Element name="distribution">
				<Distribution />
			</Element>
			<Element name="allocations">
				<Allocations />
			</Element>
			<Element name="tokenomics">
				<Tokenomics />
			</Element>
			<Element name="night">
				<Night />
			</Element>
			<Element name="dust">
				<Dust />
			</Element>
			<Element name="timeline">
				<Timeline />
			</Element>
		</div>
	);
}
