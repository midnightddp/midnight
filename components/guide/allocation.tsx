"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AllocattionsAccordion() {
	return (
		<Accordion.Root
			type="single"
			collapsible
			className="w-full mx-auto divide-y divide-gray-200"
		>
			{/* Question 1 */}
			<Accordion.Item
				value="q1"
				className="overflow-hidden"
			>
				<Accordion.Header>
					<Accordion.Trigger
						className={cn(
							"group flex w-full items-center justify-between p-4 py-8 text-left text-lg lg:text-4xl font-medium transition"
						)}
					>
						Claim phase 1: Glacier Drop
						<ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180" />
					</Accordion.Trigger>
				</Accordion.Header>
				<Accordion.Content className="px-4 pb-4 text-gray-800 text-xs lg:text-lg space-y-4 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
					<p>
						Up to 100% of the total supply claimable by eligible Glacier Drop
						participants in proportion to tokens held across key networks as per
						the breakdown below. Unclaimed tokens carry over to the next phase.
					</p>
					<ul className="list-disc list-inside space-y-4">
						<li>
							<span>50%</span> of the supply allocated to ADA holders
						</li>
						<li>
							<span>20%</span> 20% of the supply allocated to BTC holders
						</li>
						<li>
							<span>30%</span> split among holders of ETH, SOL, XRP, BNB, AVAX,
							and BAT, in proportion to their relative USD value
						</li>
					</ul>
				</Accordion.Content>
			</Accordion.Item>

			{/* Question 2 */}
			<Accordion.Item
				value="q2"
				className="overflow-hidden"
			>
				<Accordion.Header>
					<Accordion.Trigger
						className={cn(
							"group flex w-full items-center justify-between p-4 py-8 text-left text-lg lg:text-4xl font-medium transition"
						)}
					>
						Claim phase 2: Scavenger Mine
						<ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180" />
					</Accordion.Trigger>
				</Accordion.Header>
				<Accordion.Content className="px-4 pb-4 text-gray-800 text-xs lg:text-lg space-y-4 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
					<p>
						During this phase, 100% of the unclaimed tokens from the Glacier
						Drop phase will be processed and apportioned between participants,
						core network constituents (Midnight Foundation, Midnight TGE,
						Reserve, and on-chain Treasury), and the third claim phase. For more
						details, check out the Midnight tokenomics and incentives
						whitepaper.
					</p>
				</Accordion.Content>
			</Accordion.Item>

			{/* Question 3 */}
			<Accordion.Item
				value="q3"
				className="overflow-hidden"
			>
				<Accordion.Header>
					<Accordion.Trigger
						className={cn(
							"group flex w-full items-center justify-between p-4 py-8 text-left text-lg lg:text-4xl font-medium transition"
						)}
					>
						Claim phase 3: Lost-and-Found
						<ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180" />
					</Accordion.Trigger>
				</Accordion.Header>
				<Accordion.Content className="px-4 pb-4 text-gray-800 text-xs lg:text-lg space-y-4 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
					<p>
						The amount of tokens remaining on the Lost-and-Found pool will be
						claimable by those Glacier Drop-eligible individuals who missed the
						first claim phase as a fraction of their original entitlements.
					</p>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	);
}
