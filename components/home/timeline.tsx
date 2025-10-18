"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import LiveButton from "../shared/live-button";

function Timeline() {
	return (
		<section className="bg-neutral-100 relative w-full overflow-hidden m-auto p-primary pt-16 md:pt-28 pb-20">
			<div className="grid lg:grid-cols-2">
				<div className="flex w-full mb-12 justify-center items-center lg:justify-start lg:items-start">
					<h3 className="text-4xl lg:text-5xl">Timeline</h3>
				</div>
				<div>
					<Accordion.Root
						type="single"
						collapsible
						className="w-full mx-auto flex flex-col gap-8 items-stretch"
					>
						{/* Phase 1 */}
						<Accordion.Item
							value="p1"
							className="overflow-hidden bg-white rounded-lg"
						>
							<Accordion.Header>
								<Accordion.Trigger
									// <-- use data-[state=open] variant directly on the Trigger
									className={cn(
										"flex w-full items-center justify-between p-8 text-left text-lg lg:text-4xl font-medium transition min-h-36",
										// show border only when the trigger has data-state="open"
										"data-[state=open]:border-b",
										"data-[state=open]:border-b-black/30",
										// rotate chevron when open (chevron uses its own data variant)
										"group"
									)}
								>
									<span className="flex flex-col gap-1">
										<p className="text-sm text-black/60">Claim phase 1</p>
										<span className="flex gap-2 justify-center items-center">
											<LiveButton />
											<p className="text-2xl">Glacier Drop</p>
										</span>

										<p className="text-sm text-black/60">Duration: 76 days</p>
									</span>
									<ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-300 data-[state=open]:rotate-180" />
								</Accordion.Trigger>
							</Accordion.Header>

							<Accordion.Content className="px-8 py-10 pb-4 text-black/60 text-sm lg:text-lg space-y-4 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
								<p>
									An evolution of the traditional airdrop formula, where tokens
									are merely dropped into eligible users’ wallets, the Glacier
									Drop includes mechanisms to increase its fairness, integrity,
									and resistance to being exploited by malicious parties –
									including the gradual thawing (unlocking) of claims, which
									inspires the Glacier part of its name.
								</p>
								<p>
									Claimants holding a minimum balance equivalent to $100 in one
									or more eligible tokens (ADA, BTC, ETH, SOL, XRP, BNB, AVAX,
									or BAT) in their native blockchains – based on a random
									historical snapshot of each – are eligible to participate.
									Individual allocations are calculated based on their holdings
									and on the share of the supply apportioned to each network.
								</p>
								<p>
									Successful claims are subject to thawing during the Redemption
									period. Unclaimed tokens carry over to the next phase.
								</p>
								<Link
									href="#"
									className="text-blue-700 underline text-sm font-semibold"
								>
									How To Claim
								</Link>
							</Accordion.Content>
						</Accordion.Item>

						{/* Phase 2 */}
						<Accordion.Item
							value="p2"
							className="overflow-hidden bg-white rounded-lg"
						>
							<Accordion.Header>
								<Accordion.Trigger
									className={cn(
										"flex w-full items-center justify-between p-8 text-left text-lg lg:text-4xl font-medium transition min-h-36",
										"data-[state=open]:border-b",
										"data-[state=open]:border-b-black/30",
										"group"
									)}
								>
									<span className="flex flex-col gap-1">
										<p className="text-sm text-black/60">Claim phase 2</p>
										<p className="text-2xl">Scavenger Mine</p>
										<p className="text-sm text-black/60">Duration: 30 days</p>
									</span>
									<ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-300 data-[state=open]:rotate-180" />
								</Accordion.Trigger>
							</Accordion.Header>

							<Accordion.Content className="px-8 py-10 pb-4 text-black/60 text-sm lg:text-lg space-y-4 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
								<p>
									Scavenger Mine expands eligibility requirements and allows
									anyone to claim a share of unclaimed tokens from the previous
									phase by solving computational tasks. Successful claimants
									will be rewarded with NIGHT tokens in proportion to the
									computational efforts they put in.
								</p>
								<p>
									During Scavenger Mine, all tokens that were left unclaimed
									during Glacier Drop will be processed and apportioned.
								</p>
								<ul className="list-disc list-inside space-y-4">
									<li>
										A share of the tokens will be allocated for claiming by
										Scavenger Mine participants. This share will be determined
										based on the result of Glacier Drop.
									</li>
									<li>
										The remaining tokens will be apportioned to the core network
										constituents – Reserve, Treasury, Midnight Foundation, and
										Midnight TGE (the token issuer) – and to the third claim
										phase, as detailed in the whitepaper.
									</li>
								</ul>
								<p>
									Successful claims are subject to thawing during the Redemption
									period. More details on eligibility requirements and how to
									participate will be published at a later date.
								</p>
							</Accordion.Content>
						</Accordion.Item>
						{/* mid-phase  */}
						<Accordion.Item
							value="p3"
							className="overflow-hidden bg-white rounded-lg"
						>
							<Accordion.Header>
								<Accordion.Trigger
									className={cn(
										"flex w-full items-center justify-between p-8 text-left text-lg lg:text-4xl font-medium transition min-h-36",
										"data-[state=open]:border-b",
										"data-[state=open]:border-b-black/30",
										"group"
									)}
								>
									<span className="flex flex-col gap-1">
										<p className="text-2xl">Thawing & Redemption period</p>
										<p className="text-sm text-black/60">Duration: 450 days</p>
									</span>
									<ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-300 data-[state=open]:rotate-180" />
								</Accordion.Trigger>
							</Accordion.Header>

							<Accordion.Content className="px-8 py-10 pb-4 text-black/60 text-sm lg:text-lg space-y-4 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
								<p>
									During the Redemption period, Glacier Drop and Scavenger Mine
									claims thaw (unlock) following a staggered schedule in four
									installments over the course of 360 days. The date of a
									claimed allocation’s first installment is randomly determined
									to fall over a range of 1-90 days), with subsequent
									installments following every 90 days. Allocation thaws happen
									in equal 25% shares.
								</p>
								<p>
									Claimants may choose to redeem each share of their allotted
									tokens as they thaw, or wait until they fully unlock to redeem
									the whole allotment at once. Each redemption involves a
									Cardano transaction, thus requiring claimants to cover the
									cost of the Cardano network transaction fee.
								</p>

								<p>
									The Redemption period concludes with a 90-day grace period
									during which the NIGHT Claim Portal website will remain
									operational, allowing redemptions to continue beyond the
									thawing of the last tokens.
								</p>
								<Link
									href="#"
									className="text-blue-700 underline text-sm font-semibold"
								>
									How To Claim
								</Link>
							</Accordion.Content>
						</Accordion.Item>

						{/* phase 3  */}
						<Accordion.Item
							value="p4"
							className="overflow-hidden bg-white rounded-lg"
						>
							<Accordion.Header>
								<Accordion.Trigger
									className={cn(
										"flex w-full items-center justify-between p-8 text-left text-lg lg:text-4xl font-medium transition min-h-36",
										"data-[state=open]:border-b",
										"data-[state=open]:border-b-black/30",
										"group"
									)}
								>
									<span className="flex flex-col gap-1">
										<p className="text-sm text-black/60">Claim phase 3</p>
										<p className="text-2xl">Lost-and-Found</p>
										<p className="text-sm text-black/60">Duration: 4 years</p>
									</span>
									<ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-300 data-[state=open]:rotate-180" />
								</Accordion.Trigger>
							</Accordion.Header>

							<Accordion.Content className="px-8 py-10 pb-4 text-black/60 text-sm lg:text-lg space-y-4 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
								<p>
									The Lost-and-Found phase will begin sometime after the
									Midnight mainnet launches, giving original Glacier
									Drop-eligible participants (who did not claim during the
									initial 60-day claim period) another chance to claim a
									fraction of their original allocations.
								</p>
								<p>
									Participants claiming during this phase will have to use their
									own means to interact with the Midnight network smart contract
									that will hold their allocated tokens, and to submit and
									process their claims. Unclaimed tokens after the four-year
									period will be reallocated to the on-chain Treasury.
								</p>

								<p>
									More information about this phase will be published at a later
									date.
								</p>
							</Accordion.Content>
						</Accordion.Item>
						{/* last phase  */}
						<Accordion.Item
							value="p5"
							className="overflow-hidden bg-white rounded-lg"
						>
							<Accordion.Header>
								<Accordion.Trigger
									className={cn(
										"flex w-full items-center justify-between p-8 text-left text-lg lg:text-4xl font-medium transition min-h-36",
										"data-[state=open]:border-b",
										"data-[state=open]:border-b-black/30",
										"group"
									)}
								>
									<span className="flex flex-col gap-1">
										<p className="text-2xl">NIGHT Claim Portal sunsetting</p>
									</span>
									<ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-300 data-[state=open]:rotate-180" />
								</Accordion.Trigger>
							</Accordion.Header>

							<Accordion.Content className="px-8 py-10 pb-4 text-black/60 text-sm lg:text-lg space-y-4 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
								<p>
									Following the Redemption period 90-day grace period, the NIGHT
									Claim Portal will cease to be operational, and participants in
									Glacier Drop and Scavenger Mine who have not yet redeemed
									their tokens will have to use their own means to interact with
									the smart contracts on the Cardano network to do so.
								</p>
							</Accordion.Content>
						</Accordion.Item>
					</Accordion.Root>
				</div>
			</div>
		</section>
	);
}

export default Timeline;
