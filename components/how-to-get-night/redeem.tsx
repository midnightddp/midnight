import { ArrowDown } from "lucide-react";
import React from "react";
import ThawSlider from "../shared/thaw-slider";
import ThawingScheduleTable from "../guide/thawing-schedule-table";
import MainAccordion from "../shared/main-accordion";

function Redeem() {
	const REDEEM_INFO = [
		{
			id: "r1",
			header: "01. Access the NIGHT Claim Portal",
			content:
				"The NIGHT Claim Portal is the official user interface of the NIGHT token distribution. Through the Portal, you can participate in the Glacier Drop and Scavenger Mine claim phases, and later on redeem your claimed allocation(s).",
		},
		{
			id: "r2",
			header: "02. Enter or connect Destination address wallet",
			content:
				"This is the same Destination address which you registered during the Glacier Drop and/or Scavenger Mine claim phases.",
		},
		{
			id: "r3",
			header: "03. Check if your token allocation has thawed",
			content:
				"Thawing is the gradual unlocking of tokens that have been claimed during the first two claim phases, Glacier Drop and Scavenger Mine. Thawing happens in four equal installments of 25%, with 90 days in between each installment. The date of the first thaw will randomly fall between the first and 90th day of the Redemption period.",
		},
		{
			id: "r4",
			header: "04. Redeem thawed tokens",
			content:
				"Each redemption of thawed tokens involves executing a Cardano transaction. You must cover the ADA network fees for each such transaction. Neither the Midnight TGE nor its associated entities collect any portion of these fees.",
		},
	];
	return (
		<>
			<section className="relative w-full overflow-hidden m-auto py-24 sc-divider p-primary bg-neutral-100 flex flex-col gap-8">
				<div className="flex flex-col gap-4 text-center justify-center items-center lg:text-start w-full h-full mb-10">
					<span className="w-16 aspect-square rounded-full bg-white flex justify-center items-center text-xl text-blue-700">
						03
					</span>
					<h3 className="text-3xl md:text-5xl lg:text-6xl">
						Redeem your allocation
					</h3>
					<p className="lg:text-lg">
						To complete the process and receive your NIGHT, you must redeem your
						allocation after it thaws.
					</p>
					<p className="lg:text-lg">Dates to be confirmed (360 days)</p>
				</div>
				<span className="w-full border-b-2 border-black/20 relative">
					<span className="bg-neutral-100 flex justify-center items-center w-8 h-8 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
						<ArrowDown />
					</span>
				</span>
				<p className="mb-8">
					Redeeming is the act of transferring thawed tokens into your
					Destination address during the Redemption period. It’s the final step
					to complete the process and receive the tokens claimed during Glacier
					Drop and/or Scavenger Mine.
				</p>
				<p className="mb-8">
					You may choose to redeem each share of your allotted tokens as they
					thaw, or wait until they fully unlock to redeem the whole allocation
					at once. Each redemption involves a Cardano transaction, requiring you
					to cover the cost of the Cardano network transaction fee.
				</p>

				<span className="w-full border-b-2 border-black/20 relative"></span>

				<div>
					<MainAccordion
						title="How to redeem your allocation"
						items={REDEEM_INFO}
					/>
				</div>

				<div className="flex flex-col gap-8">
					<div className="flex flex-col gap-4 text-center justify-center items-center lg:text-start w-full h-full">
						<h3 className="text-3xl md:text-5xl lg:text-6xl">
							What happens next
						</h3>
					</div>
					<div className="flex flex-col gap-4 text-start">
						<span className="bg-white rounded-lg p-4 text-sm">
							After the Redemption period ends, the NIGHT Claim Portal may be
							taken offline, and any un-redeemed allocations must be manually
							redeemed by their owners.
						</span>
					</div>
				</div>
			</section>
		</>
	);
}

export default Redeem;
