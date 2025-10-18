import React from "react";

function FirstSection() {
	return (
		<>
			<section className="relative w-full overflow-hidden m-auto py-24 sc-divider p-primary bg-neutral-100">
				<div className="w-full grid lg:grid-cols-2 gap-10">
					<div className="flex flex-col gap-4 text-center justify-center lg:text-start w-full h-full">
						<h3 className="text-4xl md:text-5xl lg:text-6xl font-medium">
							How to get NIGHT tokens
						</h3>
						<p className="text-lg lg:text-2xl">
							Learn how to participate in the free NIGHT token distribution and
							shape the future of the Midnight network. This page will guide you
							through all the steps you need to take in order to take part.
						</p>
					</div>

					<div className="relative w-full">
						<div className="relative flex justify-center w-full lg:p-10">
							<img
								src="/images/how-to-get.webp"
								alt="midnight "
								className="object-contain"
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default FirstSection;
