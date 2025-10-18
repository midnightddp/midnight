import React from "react";
import AllocattionsAccordion from "../guide/allocation";
import { Card, CardContent, CardHeader } from "../ui/card";
import MainIcon from "../icons/main-icon";

function Allocations() {
	return (
		<>
			<section className="relative w-full overflow-hidden m-auto  sc-divider p-primary pt-16 md:pt-28 pb-16 md:py-28 sc-divider">
				<div className="text-center flex flex-col gap-6 text-lg mb-12 lg:px-36">
					<h3 className="text-h3">Token allocations</h3>
					<p>
						The allocation of the NIGHT token supply will follow the three claim
						phases below. Community participation levels during each phase will
						determine allocations towards core network constituents.
					</p>
				</div>
				<div>
					<Card className="overflow-hidden rounded-xl border-0 bg-neutral-100 flex flex-col w-full shadow-none">
						<CardContent className="grid lg:grid-cols-2 w-full lg:justify-center lg:items-center">
							<div className="lg:order-1 w-full h-40 lg:h-[34rem] flex justify-center items-center">
								<div className="w-full h-full p-8 lg:h-3/5">
									<MainIcon />
								</div>
							</div>
							<div>
								<AllocattionsAccordion />
							</div>
						</CardContent>
					</Card>
				</div>
			</section>
		</>
	);
}

export default Allocations;
