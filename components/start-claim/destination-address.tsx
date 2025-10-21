import { ChevronDown, CircleQuestionMark } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface DestinationAddressStepProps {
	onNext: () => void;
	onPrevious: () => void;
}
function DestinationAddress({
	onNext,
	onPrevious,
}: DestinationAddressStepProps) {
	const [destinationAddress, setDestinationAddress] = useState("");

	return (
		<div>
			<button
				onClick={onPrevious}
				className="flex items-center text-blue-600 hover:text-blue-700 mb-6"
			>
				<ChevronDown
					className="rotate-90 mr-2"
					size={20}
				/>
				Back
			</button>

			<h2 className="text-2xl font-bold text-gray-900 mb-6">
				Choose a Destination address
			</h2>
			<div className="mb-6">
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-6">
						<div>
							<p className="mb-2">Blockchain network</p>
							<span className="text-lg  flex gap-2  justify-star items-center border border-black rounded-md p-3 text-black/50">
								<i className="w-6 h-6">
									<img
										src="/images/cardanoIcon.svg"
										alt=""
									/>
								</i>
								Cardano
							</span>
						</div>
						<div>
							<label className="mb-2 flex items-center gap-2">
								<span>Destination adress </span>
								<CircleQuestionMark className="text-black/65 w-4" />
							</label>
							<Input
								type="text"
								placeholder="Please enter a destination address"
								value={destinationAddress}
								onChange={(e) => setDestinationAddress(e.target.value)}
								className="p-6 rounded-sm text-lg"
							/>
						</div>
					</div>
				</div>
			</div>

			<Button
				onClick={onNext}
				disabled={!destinationAddress}
				className="button-primary w-full disabled:bg-gray-100 disabled:text-gray-700"
			>
				Continue
			</Button>
		</div>
	);
}

export default DestinationAddress;
