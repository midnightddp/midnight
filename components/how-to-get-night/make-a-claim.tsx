"use client";
import { cn } from "@/lib/utils";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Button } from "../ui/button";
import { ArrowDown } from "lucide-react";
import VideoEmbed from "../shared/video-embed";
import MainAccordion from "../shared/main-accordion";

function MakeAClaim() {
	const [phase, setPhase] = useState<number>(0);

	// --- Start of Tracker Logic ---

	// State to manage whether the element should be sticky
	const [isSticky, setIsSticky] = useState(false);
	// State to hold the height of the sticky element for the placeholder
	const [stickyHeight, setStickyHeight] = useState(0);
	// State to hold the original top position (the trigger point)
	const [triggerTop, setTriggerTop] = useState(0);

	// Refs to track the DOM elements
	const sectionRef = useRef<HTMLElement>(null);
	const buttonGroupRef = useRef<HTMLDivElement>(null);

	// 3. Use useLayoutEffect to measure the element's position and height
	//    This runs before the browser paints, preventing flicker.
	useLayoutEffect(() => {
		if (buttonGroupRef.current) {
			// Get the element's height
			setStickyHeight(buttonGroupRef.current.offsetHeight);
			// Get its initial top position relative to the whole document
			setTriggerTop(
				buttonGroupRef.current.getBoundingClientRect().top + window.scrollY
			);
		}
	}, []); // Empty array means this runs only once on mount

	// 4. Use useEffect to add the scroll event listener
	useEffect(() => {
		const sectionEl = sectionRef.current;

		// Wait until we have the trigger position and section ref
		if (!triggerTop || !sectionEl) return;

		const handleScroll = () => {
			const scrollY = window.scrollY;

			// Get the section's bottom position relative to the viewport
			const sectionBottomOnScreen = sectionEl.getBoundingClientRect().bottom;

			// This is the pixel value for 'top-4' (1rem = 16px)
			const topPadding = 16;

			// Condition 1: Stick if we scroll past its original top position
			// (minus the padding we'll give it)
			const shouldBeFixed = scrollY >= triggerTop - topPadding;

			// Condition 2: Unstick if the section's bottom is about to scroll
			// past the sticky element's position (height + padding)
			const sectionOutOfView =
				sectionBottomOnScreen <= stickyHeight + topPadding;

			// Apply the logic you requested
			if (shouldBeFixed && !sectionOutOfView) {
				setIsSticky(true); // "change from relative to fixed"
			} else {
				setIsSticky(false); // "go back to relative"
			}
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		// Cleanup listener on unmount
		return () => window.removeEventListener("scroll", handleScroll);

		// Re-run this effect if these values change (they shouldn't, but it's good practice)
	}, [triggerTop, stickyHeight, sectionRef]);

	// --- End of Tracker Logic ---

	return (
		<>
			{/* 2. Add the ref to the section */}
			<section
				ref={sectionRef}
				className="relative w-full m-auto py-24 sc-divider p-primary bg-neutral-100"
			>
				<div className="flex flex-col gap-4 text-center justify-center items-center lg:text-start w-full h-full mb-10">
					<span className="w-16 aspect-square rounded-full bg-white flex justify-center items-center text-xl text-blue-700">
						01
					</span>
					<h3 className="text-3xl md:text-5xl lg:text-6xl">Make a claim</h3>
					<p className="text-black/60">
						Making a claim requires demonstrating you meet the eligibility
						criteria for one (or more) of the three claim phases: Glacier Drop,
						Scavenger Mine, and Lost-and-Found.
					</p>
				</div>
				<div className="flex flex-col justify-center items-center gap-4 bg-neutral-100 py-4">
					<p className="text-lg text-black/60">There are three claim phases:</p>

					{/* 5. Add a placeholder div. 
                It's invisible but will have the same height as the button group
                ONLY when the button group is sticky, preventing a layout jump. */}
					{isSticky && <div style={{ height: `${stickyHeight}px` }} />}

					{/* 6. Add the ref to the button group and apply conditional classes */}
					<div
						ref={buttonGroupRef}
						className={cn(
							"bg-white w-fit rounded-4xl flex justify-evenly items-center text-xs overflow-hidden", // 'relative' is the default
							isSticky && "fixed top-4 z-50 left-1/2 -translate-x-1/2" // When sticky, center it and add 'top-4' padding
						)}
					>
						{["Glacier Drop", "Scavenger Mine", "Lost-and-Found"].map(
							(link, idx) => {
								return (
									<button
										key={idx}
										onClick={() => {
											setPhase(idx);
										}}
										className={cn(
											"px-5 py-5 whitespace-nowrap",
											phase === idx
												? "bg-black text-white rounded-4xl"
												: "bg-white text-black"
										)}
									>
										{link}
									</button>
								);
							}
						)}
					</div>
				</div>
				<div className="mt-12">
					{phase === 0 && <GlacierDrop />}
					{phase === 1 && <ScavengerMine />}
					{phase === 2 && <LostAndFound />}
				</div>
			</section>
		</>
	);
}

function GlacierDrop() {
	const DROP_INFO = [
		{
			id: "d1",
			header: "01. Access the NIGHT Claim Portal",
			content:
				"The NIGHT Claim Portal is the official user interface of the NIGHT token distribution. Through the Portal, you can participate in the Glacier Drop and Scavenger Mine claim phases, and later on redeem your claimed allocation(s).",
		},
		{
			id: "d2",
			header: "02. Enter an Origin address",
			content:
				"An Origin address is an unsanctioned blockchain address from a Glacier Drop-participating network that, at the time of the snapshot, met the minimum ($100 equivalent) balance in qualifying tokens to be eligible for the first claim phase. The Origin address will be used as the basis for determining a claim's specific allocation of NIGHT tokens.",
		},
		{
			id: "d3",
			header: "03. Enter a Destination address",
			content:
				"A Destination address is the registered location for the redemption of your claimed NIGHT allocations -- that is, for receiving your redeemed tokens. Destination addresses for the Glacier Drop and Scavenger Mine claim phases must be Cardano addresses, and must be unused -- i.e., must have no transaction history. One Destination address may be used to receive multiple NIGHT claims, and the same Destination address can be assigned for claims made during the first two claim phases.",
		},
		{
			id: "d4",
			header: "04. Accept token distribution terms",
			content:
				"You must accept the NIGHT token distribution terms and conditions in order to participate and claim an allocation.",
		},
		{
			id: "d5",
			header: "05. Sign your unique claim message and complete the claim",
			content:
				"For each Origin address, a unique claim message binds together the corresponding allocation size, Destination address, and a hash of terms and conditions into a bundle that a claimant must cryptographically sign, thus proving ownership over the Origin address and being allowed to complete the claim.",
		},
	];
	return (
		<section className="flex flex-col w-full gap-10 text-center ">
			<div className="flex flex-col gap-4 text-center justify-center items-center lg:text-start w-full h-full">
				<h3 className="text-3xl md:text-5xl lg:text-6xl">Glacier Drop</h3>
				<p className="lg:text-lg">
					The first claim phase and the namesake of the NIGHT token
					distribution.
				</p>
			</div>
			<div className="flex flex-col justify-center items-center gap-4">
				<span className="flex justify-center items-center gap-2">
					<p>From</p>{" "}
					<Button
						variant="outline"
						className="bg-indigo-50 border-indigo-300 rounded-4xl text-blue-700 text-lg p-6"
					>
						05 Aug
					</Button>{" "}
					<p>to</p>
					<Button
						variant="outline"
						className="bg-indigo-50 border-indigo-300 rounded-4xl text-blue-700 text-lg p-6"
					>
						20 Oct
					</Button>
					<p>2025</p>
				</span>
				<p>(76 days)</p>
			</div>
			<span className="w-full border-b-2 border-black/20 relative">
				<span className="bg-neutral-100 flex justify-center items-center w-8 h-8 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
					<ArrowDown />
				</span>
			</span>
			<p className="mb-8">
				If you held a minimum $100-equivalent balance in native tokens in an
				address belonging to a participating network (ADA, BTC, ETH, SOL, XRP,
				BNB, AVAX, or BAT) during the snapshot, you’re entitled to an
				allocation.
			</p>
			<div className="flex flex-col gap-4 mb-10">
				<p className="text-center text-2xl md:text-3xl">
					Demo: How to claim NIGHT
				</p>
				<VideoEmbed
					videoId="8yaS5gH3DpQ"
					thumbnailSrc="https://cdn.sanity.io/images/sf3fvyjf/production/376f4d6b2587b78a025587871dc3797fb8e8d7ba-1920x1080.png"
					title="How to claim NIGHT"
				/>
			</div>
			<span className="w-full border-b border-black/20 relative"></span>
			<div>
				<MainAccordion
					title="How to make a claim"
					items={DROP_INFO}
				/>
			</div>
			<span className="w-full border-b border-black/20 relative"></span>
			<div className="flex flex-col gap-8">
				<div className="flex flex-col gap-4 text-center justify-center items-center lg:text-start w-full h-full">
					<h3 className="text-3xl md:text-5xl lg:text-6xl">
						What happens next
					</h3>
				</div>
				<div className="flex flex-col gap-4 text-start">
					<span className="bg-white rounded-lg p-4">
						Unclaimed tokens carry over to Scavenger Mine, the second claim
						phase
					</span>
					<span className="bg-white rounded-lg p-4">
						The Scavenger Mine claim phase opens
					</span>
				</div>
			</div>
		</section>
	);
}
function ScavengerMine() {
	return (
		<section className="flex flex-col w-full gap-10 text-center">
			<div className="flex flex-col gap-4 text-center justify-center items-center lg:text-start w-full h-full">
				<h3 className="text-3xl md:text-5xl lg:text-6xl">Scavenger Mine</h3>
				<p className="lg:text-lg">
					The second claim phase, opening up eligibility beyond the original
					requirements.
				</p>
			</div>
			<div className="flex flex-col justify-center items-center gap-4">
				<p>Dates to be confirmed</p>
			</div>
			<span className="w-full border-b-2 border-black/20 relative">
				<span className="bg-neutral-100 flex justify-center items-center w-8 h-8 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
					<ArrowDown />
				</span>
			</span>
			<p className="">
				Scavenger Mine opens up eligibility beyond token holders and includes
				anyone who provides computing power to solve computational tasks,
				whether they participated in the previous claim phase or not. No special
				hardware is needed, and claimants may use their own computers to
				participate. If you participated in Glacier Drop, you can use the same
				Destination address, so long as it remains unused.
			</p>
			<p className="mb-8">
				Successful claimants are entitled to a share of Glacier Drop-unclaimed
				tokens in proportion to the computing power they contribute, with the
				remaining share being apportioned to the core network constituents.
			</p>

			<span className="w-full border-b border-black/20 relative"></span>
			<div className="flex flex-col gap-8">
				<div className="flex flex-col gap-4 text-center justify-center items-center lg:text-start w-full h-full">
					<h3 className="text-3xl md:text-5xl lg:text-6xl">
						What happens next
					</h3>
				</div>
				<div className="flex flex-col gap-4 text-start">
					<span className="bg-white rounded-lg p-4">
						Midnight mainnet launches and Redemption period starts
					</span>
					<span className="bg-white rounded-lg p-4">
						Claimed token allocations begin to thaw
					</span>
					<span className="bg-white rounded-lg p-4">
						Lost-and-Found phase opens (if conditions are met)
					</span>
				</div>
			</div>
		</section>
	);
}
function LostAndFound() {
	return (
		<section className="flex flex-col w-full gap-10 text-center">
			<div className="flex flex-col gap-4 text-center justify-center items-center lg:text-start w-full h-full">
				<h3 className="text-3xl md:text-5xl lg:text-6xl">Lost-and-Found</h3>
				<p className="lg:text-lg">The third and last claim phase.</p>
			</div>
			<div className="flex flex-col justify-center items-center gap-4">
				<p>Dates to be confirmed</p>
			</div>
			<span className="w-full border-b-2 border-black/20 relative">
				<span className="bg-neutral-100 flex justify-center items-center w-8 h-8 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
					<ArrowDown />
				</span>
			</span>
			<p className="">
				Sometime after mainnet launches, participants who were originally
				eligible to Glacier Drop, but who did not claim during the initial
				60-day claim period, have another opportunity to claim a fraction of
				their original allocations.
			</p>
			<span>
				<h3 className="text-h3">What you need to do</h3>
				<p className="mb-8">
					The NIGHT Claim Portal won’t support the Lost-and-Found phase. To make
					a Lost-and-Found claim, you must use your own means to interact with
					the Midnight network smart contract that will hold your allocation,
					and to submit and process your claim.
				</p>
			</span>

			<span className="w-full border-b border-black/20 relative"></span>
			<div className="flex flex-col gap-8">
				<div className="flex flex-col gap-4 text-center justify-center items-center lg:text-start w-full h-full">
					<h3 className="text-3xl md:text-5xl lg:text-6xl">
						What happens next
					</h3>
				</div>
				<div className="flex flex-col gap-4 text-start">
					<span className="bg-white rounded-lg p-4">
						Lost-and-Found claims are not subject to thawing and thus are
						immediately unlocked
					</span>
					<span className="bg-white rounded-lg p-4">
						After the four-year period, any unclaimed tokens will be reallocated
						to the on-chain Treasury.
					</span>
				</div>
			</div>
		</section>
	);
}

export default MakeAClaim;
