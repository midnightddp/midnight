import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import { ArrowDown, Dot } from "lucide-react";
import LiveButton from "../shared/live-button";
import Link from "next/link";

function Distribution() {
	return (
		<>
			<section className="relative w-full overflow-hidden m-auto p-primary pt-16 md:pt-28 pb-2">
				<div className="text-center flex flex-col gap-6 text-lg mb-12 lg:mb-16 lg:px-30">
					<h3 className="text-h3">Multi-phase token distribution</h3>
					<p>
						NIGHT token allocations will be granted for free to eligible
						participants through a multi-phase token distribution: no purchase
						is involved.
					</p>
					<p>
						The distribution will consist primarily of three Claim phases and a
						Redemption period, giving a broad community of users multiple
						opportunities to participate.
					</p>
				</div>
				<div className="grid lg:grid-cols-[1fr_auto_1fr] gap-10 mb-8">
					<Card className="overflow-hidden rounded-xl border-0 bg-neutral-100 flex flex-col">
						<CardHeader>
							<div className="flex justify-between items-center">
								<p className="text-4xl">Claims</p>
								<LiveButton />
							</div>
						</CardHeader>
						<CardContent className="flex flex-col gap-4">
							<div className="relative ">
								<img
									src="/images/midnightclaims.webp"
									alt="Glacier Drop claim screen"
									className="object-fill w-full h-full"
								/>
							</div>
							<p className="w-full text-center text-xs text-black/60">
								Participants claim their token allocations by demonstrating they
								meet the eligibility criteria for each phase.
							</p>
						</CardContent>
					</Card>
					<span className="w-full border-b lg:border-b-0 lg:border-r border-gray-300 relative">
						<span className="bg-white w-6 h-6 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
							<ArrowDown className="lg:transform lg:-rotate-90" />
						</span>
					</span>
					<Card className="overflow-hidden rounded-xl border-0 bg-neutral-100 flex flex-col">
						<CardHeader>
							<div className="flex justify-between items-center">
								<p className="text-3xl">Redemption</p>
								<LiveButton />
							</div>
						</CardHeader>
						<CardContent className="flex flex-col gap-4">
							<div className="relative ">
								<img
									src="/images/midnightredemption.webp"
									alt="Glacier Drop claim screen"
									className="object-fill w-full h-full"
								/>
							</div>
							<p className="w-full text-center text-xs text-black/60">
								Participants claim their token allocations by demonstrating they
								meet the eligibility criteria for each phase.
							</p>
						</CardContent>
					</Card>
				</div>
				<div className="w-full flex lg:justify-center items-center">
					<Link
						href="/how-to-get-night"
						className="w-full lg:w-auto"
					>
						<Button className="button-primary w-full lg:w-fit lg:px-8 text-sm">
							How To Claim
						</Button>
					</Link>
				</div>
			</section>
		</>
	);
}

export default Distribution;
