import React from "react";
import ClaimSlider from "../shared/claim-slider";
import { ArrowDown, ArrowRight } from "lucide-react";
import Link from "next/link";

const CLAIM_STEPS = [
	{
		id: 1,
		heading: "Make a claim",
		context:
			"The first step to receiving NIGHT tokens is to claim an allocation.",
		link: "#",
	},
	{
		id: 2,
		heading: "Wait for your allocation to thaw",
		context:
			"Claimed allocations are initially frozen (locked) and must thaw before they can be redeemed.",
		link: "#",
	},
	{
		id: 3,
		heading: "Redeem your allocation",
		context:
			"You must redeem your thawed allocation to complete the process and receive your tokens.",
		link: "#",
	},
];

function Claim() {
	return (
		<>
			<section className="relative w-full overflow-hidden m-auto py-24 sc-divider p-primary">
				<div className="flex flex-col gap-4 text-center justify-center lg:text-start w-full h-full mb-10">
					<h3 className="text-3xl md:text-5xl lg:text-6xl">
						NIGHT distribution,step-by-step
					</h3>
					<p className="lg:text-lg">
						To complete the process and receive your tokens, you must follow
						three steps:
					</p>
				</div>
				<div className="flex lg:hidden">
					<ClaimSlider slidercontents={CLAIM_STEPS} />
				</div>
				<div>
					<div className="lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-10 mb-8 hidden lg:grid">
						{CLAIM_STEPS.map((step, idx) => {
							return (
								<React.Fragment key={step.id}>
									<div className="overflow-hidden rounded-xl border-0 flex flex-col h-full w-full relative m-1 justify-end py-10">
										<div className="flex justify-center items-center p-4">
											<span className="w-16 aspect-square rounded-full bg-white flex justify-center items-center text-xl text-blue-700">
												0{step.id}
											</span>
										</div>
										<div className="flex flex-col gap-3.5 justify-center items-center text-center">
											<h4 className="text-xl">{step.heading}</h4>
											<p>{step.context}</p>
											<Link
												href={step.link}
												className="text-blue-700 underline text-xs"
											>
												Read more
											</Link>
										</div>
									</div>
									{idx < CLAIM_STEPS.length - 1 && (
										<span
											key={(idx + 1) * 10}
											className="w-full border-b lg:border-b-0 lg:border-r border-gray-300 relative"
										>
											<span className="bg-white w-6 h-6 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
												<ArrowRight className="" />
											</span>
										</span>
									)}
								</React.Fragment>
							);
						})}
					</div>
				</div>
			</section>
		</>
	);
}

export default Claim;
