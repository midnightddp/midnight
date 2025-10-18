"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search, Tags } from "lucide-react";
import { useState } from "react";

function FAQsPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [activeTag, setActiveTag] = useState(0);
	const TAG_OPTIONS = [
		"ALL",
		"BLOCK REWARDS",
		"DUST",
		"GENERAL",
		"GLACIER DROP",
		"GLOSSARY",
		"LOST AND FOUND",
		"NIGHT",
		"REDEMPTION",
		"SCAVENGER MINE",
	];
	const ALL_FAQS = [
		{
			question: "What is the Midnight NIGHT token distribution?",
			answerPreview:
				"The Midnight NIGHT Token Distribution is a multi-phase process that aims to disseminate the NIGHT token...",
			answer:
				"The Midnight NIGHT Token Distribution is a multi-phase process that aims to disseminate the NIGHT token to a broad and diverse community. It includes three main claim phases — Glacier Drop, Scavenger Mine, and Lost-and-Found — as well as a Redemption period. The goal is to ensure a broad, inclusive, and free distribution of tokens, empowering users from across Web3 and beyond to participate in the Midnight ecosystem.",
			tags: ["GENERAL", "GLOSSARY"],
		},
		{
			question: "What is the Midnight Glacier Drop?",
			answerPreview:
				"The Midnight Glacier Drop is the namesake and first phase of the Midnight NIGHT token distribution. An evolution of the traditional airdrop formula...",
			answer:
				"The Midnight Glacier Drop is the namesake and first phase of the Midnight NIGHT token distribution. An evolution of the traditional airdrop formula, where tokens are merely dropped into eligible users’ wallets, the Glacier Drop includes mechanisms designed to increase its fairness, systemic integrity, and resistance to being exploited by malicious parties – including the gradual thawing (unlocking) of claimed allocations, which inspires the Glacier part of its name.",
			tags: ["GLACIER DROP", "GLOSSARY"],
		},
		{
			question: "What is the Scavenger Mine claim phase?",
			answerPreview:
				"What is the Scavenger Mine claim phase?The Scavenger Mine is the second phase of the Midnight token distribution, designed to be fair and...",
			answer: `The Scavenger Mine is the second phase of the Midnight token distribution, designed to be fair and accessible to the general public. It expands the eligibility criteria of the token distribution and offers any prospective participant the opportunity to play a role in the process of originating and seeding Midnight’s core network constituents by solving computational tasks. Rewards are proportional to the computational effort contributed.

         During Scavenger Mine, 100% of the tokens that were left unclaimed during Glacier Drop will be processed and apportioned. A share of the unclaimed Glacier Drop tokens will be allocated for claiming by Scavenger Mine participants, while the remainder will be apportioned to seed the core Midnight network ecosystem constituents, who are integral to the launch and operation of the network, and to the third claim phase.

         `,
			tags: ["GLOSSARY", "SCAVENGER MINE"],
		},
		{
			question: "What is the Lost-and-Found claim phase?",
			answerPreview:
				"The Lost-and-Found phase is the third and final phase of the Midnight token distribution. It gives eligible participants from the Glacier Drop...",
			answer: `The Lost-and-Found phase is the third and final phase of the Midnight token distribution. It gives eligible participants from the Glacier Drop another opportunity to claim a fraction of their originally allocated NIGHT tokens if they missed the first claim window.

         Lost-and-Found will take place sometime after the Midnight mainnet launch. Lost-and-Found phase claimants must use their own means to interact with the relevant smart contracts and claim/redeem their allocations. Lost-and-Found will remain open for four years, after which remaining tokens will be reallocated to the Reserve.`,
			tags: ["GLOSSARY", "LOST AND FOUND"],
		},
		{
			question: "What is the NIGHT token?",
			answerPreview:
				"NIGHT is Midnight’s native token. Its main function is to generate DUST, the resource used to execute transactions on the Midnight network...",
			answer:
				"NIGHT is Midnight’s native token. Its main function is to generate DUST, the resource used to execute transactions on the Midnight network. NIGHT will also be used for block production rewards, and its expected to be used for the intended decentralized on-chain governance system and ecosystem growth incentivization. One unit of NIGHT is further divided into one million subunits called STAR.",
			tags: ["GENERAL", "GLOSSARY", "NIGHT"],
		},
		{
			question: "What is a STAR?",
			answerPreview:
				"A STAR is the smallest subunit of NIGHT (the atomic unit). There are 1 million STARs to one NIGHT.",
			answer:
				"A STAR is the smallest subunit of NIGHT (the atomic unit). There are 1 million STARs to one NIGHT.",
			tags: ["GENERAL", "GLOSSARY"],
		},
		{
			question: "Why should I participate in Midnight's token distribution?",
			answerPreview:
				"Taking part in the NIGHT Token Distribution offers an opportunity for eligible participants to claim and redeem NIGHT tokens. NIGHT generates...",
			answer:
				"Taking part in the NIGHT Token Distribution offers an opportunity for eligible participants to claim and redeem NIGHT tokens. NIGHT generates DUST, the network resource used for transaction fees on Midnight. Once the Midnight mainnet is launched, NIGHT will thus give its holders the option to generate DUST and execute transactions on the Midnight network.",
			tags: ["GENERAL"],
		},
		{
			question: "How long will I have to claim NIGHT tokens?",
			answerPreview:
				"The first phase of the token distrubtion, the Glacier Drop, will run for 60 days. It will be followed by the second phase, Scavenger Mine, which will run...",
			answer: `The first phase of the token distrubtion, the Glacier Drop, will run for 60 days. It will be followed by the second phase, Scavenger Mine, which will run for an additional 30 days.

         After these two phases, the Midnight mainnet will launch, and the Redemption period will start. From there, you will have 450 days to use the NIGHT Claim Portal to redeem your tokens, as they thaw, into your Destination address. See "When will I be able to redeem my NIGHT tokens?" for more details.

         If you're eligible for Glacier Drop but miss the first 60-day claim window, you may still be able to claim a share of your original entitled allocation during the third phase, Lost-and-Found, which will kick off after mainnet launches and run for four years. See "What is the Lost-and-Found claim phase? " for more information.`,
			tags: ["GENERAL"],
		},
		{
			question:
				"Why is NIGHT being distributed as a Cardano Native Asset (CNA) instead of on the Midnight Network?",
			answerPreview:
				"Launching as a Cardano Native Asset provides immediate access to wallets, network bridges, and exchanges, creating mutual benefits for both ecosystems.",
			answer:
				"Launching as a Cardano Native Asset provides immediate access to wallets, network bridges, and exchanges, creating mutual benefits for both ecosystems.",
			tags: ["GENERAL"],
		},
		{
			question:
				"What share of the supply of NIGHT tokens is being distributed?",
			answerPreview:
				"The supply of 24 billion tokens is being distributed. For the duration of the first claim phase...",
			answer: `The total supply of 24 billion tokens is being distributed.

         For the duration of the first claim phase, 100% of the supply will remain claimable by eligible participants as per the criteria established for the Glacier Drop phase. See "What are the eligibility criteria for the Glacier Drop phase?" for more details.

         Unclaimed tokens shall carry over to the next claim phase, Scavenger Mine, and be apportioned between that phase's claimants, the network's core constituents, and a potential third claim phase. See "What happens to unclaimed NIGHT tokens?" for more details`,
			tags: ["GENERAL"],
		},
		{
			question: "What happens to unclaimed NIGHT tokens?",
			answerPreview:
				"100% of the tokens that were left unclaimed during Glacier Drop will be processed and apportioned during the second claim phase, Scavenger Mine...",
			answer:
				"100% of the tokens that were left unclaimed during Glacier Drop will be processed and apportioned during the second claim phase, Scavenger Mine. A share of the unclaimed Glacier Drop tokens will be allocated for claiming by Scavenger Mine participants, while the remainder will be apportioned to seed the core Midnight network ecosystem constituents (Reserve, Midnight Foundation, Midnight TGE, and on-chain Treasury.), who are integral to the launch and operation of the network, and to the third claim phase.",
			tags: ["GENERAL"],
		},
		{
			question: "How are NIGHT block production rewards calculated?",
			answerPreview:
				"Midnight block rewards taper down over time following a descending curve. Rewards are calculated at each block as a percentage of the...",
			answer:
				"Midnight block rewards taper down over time following a descending curve. Rewards are calculated at each block as a percentage of the current outstanding tokens in the Reserve. Each block reward consists of a fixed subsidy and a variable component that is based on how full that block is. The fixed component incentivizes participation, while the variable component stimulates maximum transaction inclusion. The ratio between fixed and variable rewards can be adjusted via governance action. For details on the calculations, please read the Tokenomics and Incentives whitepaper.",
			tags: ["BLOCK REWARDS"],
		},
		{
			question: "What are the costs of claiming and redeeming NIGHT tokens?",
			answerPreview:
				"NIGHT tokens are not for sale and will be offered for free. There are no fees to place a claim. However, redeeming a Glacier Drop or Scavenger Mine claim...",
			answer:
				"NIGHT tokens are not for sale and will be offered for free. There are no fees to place a claim. However, redeeming a Glacier Drop or Scavenger Mine claim...",
			tags: ["GENERAL", "GLACIER DROP", "REDEMPTION"],
		},
		{
			question:
				"How will I be able to receive DUST generated by my NIGHT tokens?",
			answerPreview:
				"More information pertaining to DUST will become available closer to the launch of the Midnight mainnet.",
			answer:
				"More information pertaining to DUST will become available closer to the launch of the Midnight mainnet.",
			tags: ["DUST"],
		},
	];

	// basic client-side search (safe-guard each field)
	const filteredFAQs = ALL_FAQS.filter((faq) => {
		const term = searchTerm.trim().toLowerCase();
		const selectedTag = TAG_OPTIONS[activeTag];

		// ✅ Search filter
		const matchesSearch =
			!term ||
			faq.question.toLowerCase().includes(term) ||
			faq.answer.toLowerCase().includes(term) ||
			faq.answerPreview.toLowerCase().includes(term);

		// ✅ Tag filter (if not "ALL", match by tag)
		const matchesTag = selectedTag === "ALL" || faq.tags.includes(selectedTag);

		return matchesSearch && matchesTag;
	});

	return (
		<>
			<section className="relative w-full overflow-hidden m-auto py-24 sc-divider p-primary flex flex-col gap-8">
				<div className="w-full flex justify-center items-center text-3xl font-bold">
					<h3>FAQs</h3>
				</div>
				<div className="flex flex-col gap-6">
					<span className="outline outline-black rounded-sm h-auto w-full flex gap-2 justify-center items-center px-8 ">
						<Input
							id="search"
							placeholder="A search term..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="py-6 px-0 rounded-sm outline-0 border-0"
						/>
						<Search />
					</span>
					<span className="flex justify-center items-center flex-wrap gap-1 px-4">
						{TAG_OPTIONS.map((tag, idx) => (
							<Button
								key={idx}
								variant="outline"
								size="sm"
								className={cn(
									"p-4 bg-violet-200 border border-blue-700 rounded-3xl text-xs",
									activeTag === idx && "bg-violet-300"
								)}
								onClick={() => setActiveTag(idx)}
							>
								{tag}
							</Button>
						))}
					</span>
				</div>
				<div className="flex flex-col gap-8">
					{filteredFAQs.map((faq, idx) => {
						return (
							<Card
								key={idx * 3 + 1}
								className="bg-neutral-100 py-8 border-0 shadow-none"
							>
								<CardContent>
									<div className="flex flex-col gap-4 justify-center items-start">
										<h6 className="text-semibold text-lg">{faq.question}</h6>
										<p className="text-gray-500">{faq.answerPreview}</p>
										<Button
											variant="link"
											className="p-0 underline text-blue-700"
										>
											Read more
										</Button>
									</div>
									<div className="flex gap-2 mt-6">
										{faq.tags.map((tags, index) => {
											return (
												<Button
													variant="outline"
													size="sm"
													className="border border-blue-700 bg-violet-200 rounded-3xl p-4 text-xs w-fit  font-normal"
												>
													{tags}
												</Button>
											);
										})}
									</div>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</section>
		</>
	);
}

export default FAQsPage;
