import { ArrowDown } from "lucide-react";
import React from "react";
import ThawSlider from "../shared/thaw-slider";
import ThawingScheduleTable from "../guide/thawing-schedule-table";

function Thaw() {
	const THAW_SLIDES = [
		{ thaw: "1st", percentage: 25, day: "1, 25, 90" },
		{ thaw: "2nd", percentage: 50, day: "91, 115, 180" },
		{ thaw: "3rd", percentage: 75, day: "181, 205, 270" },
		{ thaw: "4th", percentage: 100, day: "271, 295, 360" },
	];
	return (
		<>
			<section className="relative w-full overflow-hidden m-auto py-24 sc-divider p-primary  flex flex-col gap-10 text-center">
				<div className="flex flex-col gap-4 lg:gap-0 text-center justify-center items-center lg:text-start w-full h-full mb-10 lg:grid lg:grid-cols-2">
					<span className="w-18 aspect-square rounded-full bg-indigo-50 flex justify-center items-center text-2xl lg:text-7xl text-blue-700 lg:justify-self-center lg:w-52">
						02
					</span>
					<span>
						<h3 className="text-4xl">Wait for your allocation to thaw</h3>
						<p className="text-black/60">
							Allocations must thaw before they can be redeemed.
						</p>
					</span>
					<p className="text-black/60 col-span-2 text-center mt-12  text-lg">
						During the redemption period (360 days)
					</p>
				</div>
				<span className="w-full border-b-2 border-black/20 relative">
					<span className="bg-white flex justify-center items-center w-8 h-8 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
						<ArrowDown />
					</span>
				</span>
				<p className="lg:px-30">
					During the Redemption period, token allocations thaw and become
					redeemable. Successfully-claimed token allocations during Glacier Drop
					and Scavenger Mine are initially frozen (locked). Allocations thaw
					(unlock) following a staggered schedule in four equally-spaced, 25%
					installments over the course of 360 days.
				</p>
				<p className="mb-8   lg:px-30">
					For each individual allocation, the first thaw falls randomly between
					days 1 and 90, with subsequent thaws following every 90 days.
				</p>
				<div>
					<div className="flex flex-col gap-2 text-center justify-center items-center lg:text-start w-full h-full mb-4 lg:px-26">
						<h3 className="text-3xl md:text-4xl">Thawing schedule examples</h3>
						<p className="text-sm lg:text-lg">
							When would each share of an allocation unlock based on the day of
							the first thaw.
						</p>
					</div>
					<div>
						<span className="flex md:hidden">
							<ThawSlider slidercontents={THAW_SLIDES} />
						</span>
						<span className="hidden md:flex">
							<ThawingScheduleTable />
						</span>
					</div>
				</div>
				<span className="w-full border-b-2 border-black/20 relative"></span>
				<div className="flex flex-col gap-8 lg:grid lg:grid-cols-2">
					<div className="flex flex-col gap-4 text-center justify-center items-center lg:text-start w-full h-full lg:justify-start lg:items-start">
						<h3 className="text-3xl ">What you need to do</h3>
					</div>
					<div className="flex flex-col gap-4 text-start">
						{[
							"At each thaw, a 25% share of the allocation unlocks",
							"Each thawed share can be individually redeemed as it unlocks",
							"After the last thaw, the full allocation is unlocked and available for redemption",
							"Claimants can wait until the last thaw to claim their full allocations in one go",
						].map((item, index) => (
							<span
								key={index}
								className="bg-neutral-100 rounded-lg p-8 text-sm "
							>
								{item}
							</span>
						))}
					</div>
				</div>
				<div className="flex flex-col gap-8 lg:grid lg:grid-cols-2">
					<div className="flex flex-col gap-4 text-center justify-center items-center lg:text-start w-full h-full lg:justify-start lg:items-start">
						<h3 className="text-3xl">What happens next</h3>
					</div>
					<div className="flex flex-col gap-4 text-start">
						<span className="bg-neutral-100 rounded-lg p-4">
							After the last allocation thaws, the NIGHT Claim Portal will
							remain open for redemptions for another 90 days
						</span>
					</div>
				</div>
			</section>
		</>
	);
}

export default Thaw;
