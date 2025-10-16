"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type NewsCardProps = {
	image: string;
	date: string;
	heading: string;
	paragraph: string;
	readMoreLink: string;
};

const NewsCard: React.FC<NewsCardProps> = ({
	image,
	date,
	heading,
	paragraph,
	readMoreLink,
}) => {
	return (
		<Card className="overflow-hidden rounded-xl border bg-neutral-100 flex flex-col md:flex-row">
			{/* Image Section */}
			<div className="relative w-full md:w-1/3 h-48 md:h-auto">
				<Image
					src={image}
					alt={heading}
					fill
					className="object-cover"
					sizes="(max-width: 768px) 100vw, 33vw"
				/>
			</div>

			{/* Content Section */}
			<div className="flex flex-col justify-between w-full md:w-2/3">
				<CardHeader className="pb-0">
					<p className="text-sm text-gray-500">{date}</p>
					<h3>
						<span></span>Midnight TGE{" "}
					</h3>
					<h2 className="text-xl font-semibold mt-1">{heading}</h2>
				</CardHeader>

				<CardContent className="flex flex-col gap-4">
					<p className="text-gray-700">{paragraph}</p>

					{/* Buttons Row */}
					<div className="flex flex-wrap gap-2">
						<Link href={readMoreLink}>
							<Button
								variant="link"
								className="text-green-600 text-sm p-0"
							>
								Read More →
							</Button>
						</Link>
					</div>
				</CardContent>
			</div>
		</Card>
	);
};

export default NewsCard;
