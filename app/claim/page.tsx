"use client";
import WaterIcon from "@/components/icons/water-icon";
import VideoEmbed from "@/components/shared/video-embed";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ChooseNetwork from "@/components/start-claim/choose-network";
import ViewClaimedAllocation from "@/components/start-claim/view-claimed-allocation";
function ClaimPage() {
	const [process, setProcess] = useState(false);
	const [viewingAllocations, setViewingAllocations] = useState(false);

	const handleCancel = () => {
		setViewingAllocations(false);
	};
	if (!process) {
		return (
			<section className="w-full h-full grid lg:grid-cols-3">
				<div className="bg-white lg:col-span-2 lg:order-2 w-full flex flex-col px-6 pt-6 md:pt-16">
					<div className="w-full flex flex-col justify-center items-center gap-4 mb-8">
						<span className="relative w-32 h-16">
							<WaterIcon />
						</span>
						<p className="text-lg">The official NIGHT token claim portal</p>
					</div>
					<div className="flex flex-col gap-4 mb-6 w-full md:px-30 lg:px-40 xl:px-60">
						<p className="text-center text-sm">Introducing the NIGHT token</p>
						<VideoEmbed
							videoId="Nn39DYe1otU"
							thumbnailSrc="https://cdn.sanity.io/images/sf3fvyjf/production/5c1fd91ba9abc0276c70630ac50ee6682be30f66-1217x668.png"
							title="What is the NIGHT token?"
						/>
						<span className="w-full flex justify-center items-center mt-2">
							<Button
								onClick={() => {
									setProcess(true);
								}}
								className="button-primary w-full  lg:px-8 text-sm"
							>
								START A NEW CLAIM NOW
							</Button>
						</span>
					</div>
					<div className="w-full flex flex-col justify-center items-center">
						<p>Already made a Glacier Drop claim</p>
						<Button
							onClick={() => {
								setViewingAllocations((p) => !p);
							}}
							variant="link"
							className="underline text-sm"
						>
							View claimed allocations
						</Button>
					</div>
				</div>
				<div className="bg-neutral-100 lg:col-span-1 p-6 md:p-16 flex flex-col w-full h-dvh gap-8">
					<div className="flex flex-col justify-center items-center">
						<p className="text-sm">How it works</p>
						<h3>Claim phase 1: Glacier Drop</h3>
					</div>
					<div className="flex flex-col gap-2 text-black/70">
						{
							/* Steps */
							[
								"Choose an origin address",
								"Choose a Destination address",
								"Accept terms and conditions",
								"Sign and complete claim",
							].map((step, index) => (
								<div
									key={index}
									className="flex gap-2 justify-between"
								>
									<span className="flex gap-4 justify-center items-center">
										<span className="w-10 h-10 rounded-full border border-black/40  flex justify-center items-center text-xs p-2">
											{index + 1}
										</span>
										<p>{step}</p>
									</span>
									<span className="w-4 h-4 rounded-full border-2 border-black/50  flex justify-center items-center text-xs p-2">
										?
									</span>
								</div>
							))
						}
					</div>
					<div className="bg-white p-4 flex flex-col gap-2 rounded-xl ">
						<div className="flex gap-2 items-center">
							<span className="w-6 h-6 text-black/50 rounded-full border-2 border-black/50  flex justify-center items-center text-lg p-2">
								i
							</span>
							<p className="text-xl font-medium">What happens next ?</p>
						</div>
						<div>
							<ul className="list-disc list-inside space-y-1 p-2 text-black/50">
								<li>
									After this claim phase ends , a second claim phase 'Scavenger
									Mine' will start.
								</li>
								<li>
									When that phase ends, the Redemption period will start, and
									you'll be able to redeem your claimed allocations as they
									thaw.
								</li>
							</ul>
						</div>
						<div></div>
					</div>
				</div>
				{viewingAllocations && (
					<ViewClaimedAllocation onCancel={handleCancel} />
				)}
			</section>
		);
	} else {
		return (
			<div>
				<ChooseNetwork />
			</div>
		);
	}
}

export default ClaimPage;
