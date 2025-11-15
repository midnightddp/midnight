import React from "react";
import NightIcon from "../icons/night-icon";
import VideoEmbed from "../shared/video-embed";
import NIGHT_INFO from "@/lib/data/night-info";
import Slider from "../shared/slider";
import { Button } from "../ui/button";
import Link from "next/link";

function Night() {
	return (
		<>
			<section className="relative w-full overflow-hidden m-auto p-primary pt-16 md:pt-28 pb-2 text-white bg-black lg:bg-white">
				<div className=" bg-black p-2 lg:p-16 rounded-2xl mb-8 h-auto flex flex-col gap-8">
					<div className="grid lg:grid-cols-2 gap-4">
						<div className="flex flex-col gap-12">
							<div className="flex flex-col gap-6 text-lg pb-6 justify-center items-center lg:items-start  text-center lg:text-start">
								<h4 className="text-5xl">NIGHT</h4>
								<p className="text-gray-300">
									NIGHT is the{" "}
									<strong className="text-white">utility token</strong> and the
									main component driving the Midnight economic system.
								</p>
							</div>
							<div className="w-full h-44 lg:h-64 flex justify-center items-center lg:opacity-0">
								<div className="w-full h-full">
									<NightIcon />
								</div>
							</div>
							<div className="flex flex-col gap-6  pb-6 justify-center items-start">
								<h5 className="text-2xl">NIGHT utility</h5>
								<ul className="list-disc list-inside space-y-4">
									<li>Generating DUST resources to power transactions</li>
									<li>
										Promoting network security as block production rewards
									</li>
									<li>Enabling decentralized on-chain governance (expected)</li>
									<li>Driving ecosystem growth initiatives (expected)</li>
								</ul>
							</div>
						</div>
						<div className="justify-center items-center p-4 hidden lg:flex">
							<div className="w-full h-44 lg:h-64 flex justify-center items-center">
								<div className="w-full h-full">
									<NightIcon />
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-4 mb-10">
						<p className="text-center">What is the NIGHT token?</p>
						<VideoEmbed
							videoId="Nn39DYe1otU"
							thumbnailSrc="https://cdn.sanity.io/images/sf3fvyjf/production/5c1fd91ba9abc0276c70630ac50ee6682be30f66-1217x668.png"
							title="What is the NIGHT token?"
						/>
					</div>
					<div>
						<Slider
							icon={<NightIcon />}
							slidercontents={NIGHT_INFO}
							className="border-white/40 bg-neutral-900"
						/>
					</div>
					<div className="w-full flex lg:justify-center items-center">
						<Link
							href="#"
							className="w-full lg:w-auto"
						>
							<Button className="button-primary w-full lg:w-fit lg:px-8 text-sm">
								READ TOKENOMICS WHITEPAPER
							</Button>
						</Link>
					</div>
				</div>
			</section>
		</>
	);
}

export default Night;
