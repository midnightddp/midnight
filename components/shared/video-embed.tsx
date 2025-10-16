"use client";

import { useState } from "react";
import Image from "next/image";

type VideoEmbedProps = {
	videoId: string;
	thumbnailSrc: string;
	title?: string;
};

export default function VideoEmbed({
	videoId,
	thumbnailSrc,
	title = "Video player",
}: VideoEmbedProps) {
	const [isPlaying, setIsPlaying] = useState(false);

	return (
		<div className="w-full max-w-[36.25rem] mx-auto">
			<div className="relative aspect-video group rounded-lg overflow-hidden">
				{isPlaying ? (
					<iframe
						width="100%"
						height="100%"
						src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
						title={title}
						className="absolute inset-0 h-full w-full object-cover"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
						allowFullScreen
						sandbox="allow-scripts allow-same-origin allow-presentation"
					></iframe>
				) : (
					<>
						<Image
							src={thumbnailSrc}
							alt={title}
							fill
							className="object-cover rounded-lg"
							priority
						/>
						<button
							aria-label="Play video"
							onClick={() => setIsPlaying(true)}
							className="absolute bottom-2.5 right-2.5 size-14 bg-white/80 group-hover:bg-white flex items-center justify-center rounded-full transition-colors text-black p-6"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="18"
								viewBox="0 0 8 10"
								fill="none"
								className="text-lightBlack"
							>
								<path
									fill="currentColor"
									d="M0 8.235V.808Q0 .44.244.22a.82.82 0 0 1 .78-.192 1 1 0 0 1 .212.083L7.08 3.844a.9.9 0 0 1 .28.299.76.76 0 0 1 .093.378.76.76 0 0 1-.093.379.9.9 0 0 1-.28.298L1.237 8.931a.9.9 0 0 1-.427.112.82.82 0 0 1-.568-.22A.76.76 0 0 1 0 8.234"
								></path>
							</svg>
						</button>
					</>
				)}
			</div>
		</div>
	);
}
