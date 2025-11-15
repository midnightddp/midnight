import React from "react";
import TokenIcon from "../icons/token-icon";
import { Button } from "../ui/button";
import Link from "next/link";

function Tokenomics() {
	return (
		<>
			<section className="relative w-full overflow-hidden m-auto p-primary pt-16 md:pt-28 mb-12">
				<div className="grid lg:grid-cols-2 gap-6">
					<div className="w-full h-40 lg:h-[34rem] flex justify-center items-center">
						<div className="w-full h-full p-8 lg:h-1/2">
							<TokenIcon />
						</div>
					</div>
					<div className="flex flex-col gap-6 text-lg pb-6 justify-center items-center lg:items-start  text-center lg:text-start">
						<h3 className="text-h3">Dual-component tokenomics</h3>
						<p>
							Midnight introduces a composite system where NIGHT, the native
							token, continually generates DUST, the shielded network resource
							that powers transactions. This segregation enables metadata
							protection and promotes sustainable operations.
						</p>
						<p>
							There’s no capital expenditure for executing transactions: NIGHT
							holders can effectively transact on Midnight for free for as long
							as they hold enough tokens to generate the minimum required DUST.
						</p>
						<div className="flex flex-col gap-4 md:flex-row w-full">
							<Link
								href="#"
								className="w-full lg:w-auto"
							>
								<Button className="button-primary text-sm w-full">
									READ TOKENOMICS WHITEPAPER
								</Button>
							</Link>
							<Link
								href="#"
								className="w-full lg:w-auto"
							>
								<Button className="button-secondary text-sm w-full">
									READ MICA WHITEPAPER
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Tokenomics;
