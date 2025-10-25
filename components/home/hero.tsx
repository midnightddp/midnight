import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

import { DM_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

const dmMono = DM_Mono({
	subsets: ["latin"],
	weight: ["400", "500"],
	// variable: "--font-dm-mono",
	// display: "swap",
});

function Hero() {
	return (
		<>
			<section className="relative w-full overflow-hidden m-auto  sc-divider p-primary">
				<div className="w-full grid lg:grid-cols-2 gap-10">
					<div className="relative w-full lg:order-1">
						<div className="relative flex justify-center w-full">
							<img
								src="/images/midnighthero.svg"
								alt="midnight "
								className="object-contain w-20 md:w-32 lg:w-48"
							/>
						</div>
					</div>
					<div className="flex flex-col gap-8 pb-16 md:py-28">
						<div className="flex flex-col gap-4 text-center lg:text-start">
							<p className={cn(dmMono.className, "font-medium")}>
								MIDNIGHT TOKEN DISTRIBUTION
							</p>
							<h3 className="text-4xl md:text-5xl lg:text-6xl font-medium">
								Glacier Drop claim is now Live
							</h3>
							<p className="text-lg lg:text-2xl">
								Glacier Drop, the first claim phase of the NIGHT token
								distribution, is now open to eligible participants. Claim now
								and secure your place in the future of Midnight.
							</p>
						</div>
						<div className="flex flex-col gap-4 lg:flex-row">
							<Link
								href="claim"
								className="w-full lg:w-auto"
							>
								<Button className="button-primary w-full">
									CLICK TO CLAIM
								</Button>
							</Link>
							<Link
								href="how-to-get-night"
								className="w-full lg:w-auto"
							>
								<Button className="button-secondary w-full">
									LEARN HOW TO CLAIM
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Hero;
