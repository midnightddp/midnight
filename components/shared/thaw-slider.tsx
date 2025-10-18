"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type SliderProps = {
	slidercontents: {
		thaw: string;
		percentage: number;
		day: string;
	}[];
	className?: string;
};

export default function ThawSlider({
	slidercontents = [],
	className,
}: SliderProps) {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		loop: false,
		align: "start",
	});
	const [selectedIndex, setSelectedIndex] = useState(0);

	useEffect(() => {
		if (!emblaApi) return;

		const onSelect = () => {
			setSelectedIndex(emblaApi.selectedScrollSnap());
		};

		emblaApi.on("select", onSelect);
		onSelect();
	}, [emblaApi]);

	return (
		<div className="overflow-hidden">
			{/* Viewport */}
			<div
				className="overflow-hidden h-[28vh] md:h-[60vh] lg:h-[65vh]"
				ref={emblaRef}
			>
				{/* Slides container */}
				<div className="flex gap-4 items-stretch">
					{slidercontents.map((contents, idx) => (
						<div
							key={idx}
							className="
								flex-[0_0_100%]  /* mobile: 1 card */
								md:flex-[0_0_50%] /* tablet: 2 cards */
								lg:flex-[0_0_33.333%] /* desktop: 3 cards */
								flex
							"
						>
							<Card
								className={cn(
									"h-full w-full rounded-xl relative m-1 flex flex-col justify-end bg-indigo-50 border-0 py-4",
									className
								)}
							>
								<CardContent className="flex flex-col  w-full [&>*]:flex [&>*]:justify-between text-xs gap-6">
									<p className="text-lg">{contents.thaw} thaw</p>
									<div>
										<p>Unlocked %</p>
										<p>{contents.percentage}%</p>
									</div>
									<span className="w-full border-b border-black/20 relative"></span>
									<div>
										<p>Day</p>
										<p>{contents.day}</p>
									</div>
								</CardContent>
							</Card>
						</div>
					))}
				</div>
			</div>

			{/* Indicators */}
			<div className="flex justify-center mt-4 gap-2">
				{slidercontents.map((_, idx) => (
					<button
						key={idx}
						className={cn(
							"h-3 w-3 rounded-full transition",
							selectedIndex === idx
								? "bg-blue-700"
								: "bg-gray-300 hover:bg-gray-400"
						)}
						onClick={() => emblaApi?.scrollTo(idx)}
						aria-label={`Go to slide ${idx + 1}`}
					/>
				))}
			</div>
		</div>
	);
}
