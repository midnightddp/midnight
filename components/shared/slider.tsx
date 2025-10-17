"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

type SliderProps = {
	icon: any;
	slidercontents: any;
	className?: string;
};

export default function Slider({
	icon,
	slidercontents,
	className,
}: SliderProps) {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		loop: true,
		align: "start",
		dragFree: true,
	});

	useEffect(() => {
		if (!emblaApi) return;

		const animate = () => {
			emblaApi.scrollNext();
			setTimeout(() => requestAnimationFrame(animate), 3000);
		};

		const raf = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(raf);
	}, [emblaApi]);

	return (
		<div className="overflow-hidden">
			{/* Embla viewport */}
			<div
				className="overflow-hidden h-[60vh] md:h-[60vh] lg:h-[65vh]"
				ref={emblaRef}
			>
				{/* Embla container */}
				<div className="flex gap-4 items-stretch">
					{slidercontents.map((contents: any, idx: number) => (
						<div
							key={idx}
							className="relative flex-[0_0_80%] md:flex-[0_0_50%] lg:flex-[0_0_30%] flex"
						>
							<Card
								className={cn(
									"h-full w-full rounded-xl relative m-1 flex flex-col justify-end",
									className
								)}
							>
								<CardHeader className="mb-auto">
									<span className="w-10 h-10">{icon}</span>
								</CardHeader>
								<CardContent className="flex flex-col gap-4 mt-32">
									<h5 className="text-lg">{contents.header}</h5>
									<p className="opacity-70">{contents.context}</p>
								</CardContent>
							</Card>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
