import React from "react";
import NightIcon from "../icons/night-icon";
import VideoEmbed from "../shared/video-embed";
import Slider from "../shared/slider";
import { Button } from "../ui/button";
import DustIcon from "../icons/dust-icon";
import DUST_INFO from "@/lib/data/dust-info";

function Dust() {
	return (
		<>
			<section className="relative w-full overflow-hidden m-auto p-primary pt-16 md:pt-28 pb-2">
				<div className="lg:bg-neutral-100 lg:p-16 rounded-2xl mb-8 h-auto lg:border lg:border-black/20">
					<div className="grid lg:grid-cols-2 gap-12 mb-20">
						<div className="flex flex-col gap-6 text-lg pb-6 justify-center items-center lg:items-start  text-center lg:text-start">
							<h4 className="text-5xl">DUST</h4>
							<p className="text-gray-700">
								DUST is the shielded and renewable
								<strong className="text-black"> network resource </strong> whose
								single function is to allow users to execute transactions on
								Midnight.
							</p>
						</div>
						<div className="w-full h-44 lg:h-64 flex justify-center items-center lg:opacity-0">
							<div className="w-full h-full">
								<DustIcon />
							</div>
						</div>
					</div>

					<div>
						<Slider
							icon={<DustIcon />}
							slidercontents={DUST_INFO}
							className="border-black/20 bg-neutral-200 text-black"
						/>
					</div>
					<div className="w-full flex lg:justify-center items-center">
						<Button className="button-primary w-full lg:w-fit lg:px-8 text-sm">
							READ WHITEPAPER
						</Button>
					</div>
				</div>
			</section>
		</>
	);
}

export default Dust;
