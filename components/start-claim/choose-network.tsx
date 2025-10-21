import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Button } from "../ui/button";
import OriginAddress from "./origin-address";
import DestinationAddress from "./destination-address";
import AcceptTerms from "./accept-terms";
import Sign from "./sign";

function ChooseNetwork() {
	const [currentStep, setCurrentStep] = useState(0);

	const handleNext = () => {
		if (currentStep < 4) {
			setCurrentStep(currentStep + 1);
		}
	};

	const handlePrevious = () => {
		if (currentStep >= 1) {
			setCurrentStep(currentStep - 1);
		}
	};
	return (
		<section className="w-full lg:h-screen grid lg:grid-cols-5 py-8 px-8 md:px-16 lg:px-40 xl:px-72 gap-4 bg-neutral-100">
			<div className="flex flex-col justify-between w-full h-full lg:col-span-3 bg-white p-6 rounded-lg lg:order-1">
				{currentStep == 0 && <OriginAddress onNext={handleNext} />}
				{currentStep == 1 && (
					<DestinationAddress
						onNext={handleNext}
						onPrevious={handlePrevious}
					/>
				)}
				{currentStep == 2 && (
					<AcceptTerms
						onNext={handleNext}
						onPrevious={handlePrevious}
					/>
				)}
				{currentStep == 3 && <Sign onPrevious={handlePrevious} />}
			</div>
			<div className="flex flex-col justify-between w-full h-full lg:col-span-2 bg-white p-6 rounded-lg gap-20">
				<div>
					<div>
						<h3 className="text-blue-700 text-3xl font-semibold  mb-8">
							GlacierDrop
						</h3>
						<div className="flex flex-col gap-8 text-black/70">
							{
								/* currentStep */
								[
									"Choose an Origin address",
									"Choose a Destination address",
									"Accept terms and conditions",
									"Sign and complete claim",
								].map((step, index) => (
									<div
										key={index}
										className="flex gap-2 justify-between"
									>
										<span className="flex gap-4 justify-center items-center">
											<span
												className={cn(
													"w-10 h-10 rounded-full border border-black/40  flex justify-center items-center text-xs p-2",
													currentStep == index && "border-black"
												)}
											>
												{index + 1}
											</span>
											<p className={cn(currentStep == index && "font-medium")}>
												{step}
											</p>
										</span>
										<span className="w-4 h-4 rounded-full border-2 border-black/50  flex justify-center items-center text-xs p-2">
											?
										</span>
									</div>
								))
							}
						</div>
					</div>
				</div>
				<span className="w-full border-b border-black/20 relative"></span>
				<div className="w-full flex">
					<Button
						onClick={() => {
							setCurrentStep(0);
						}}
						className="button-secondary w-full"
					>
						Start over
					</Button>
				</div>
			</div>
		</section>
	);
}

export default ChooseNetwork;
