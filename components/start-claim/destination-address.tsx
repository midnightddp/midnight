import { ChevronDown, CircleQuestionMark, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useWalletStore } from "@/store/walletStore";

interface DestinationAddressStepProps {
	onNext: () => void;
	onPrevious: () => void;
}

function DestinationAddress({
	onNext,
	onPrevious,
}: DestinationAddressStepProps) {
	const [destinationAddress, setDestinationAddress] = useState("");
	const [isValid, setIsValid] = useState(true);
	const [isTyping, setIsTyping] = useState(false);
	const { setDestinationAddress: setDestinationAddressToStore } =
		useWalletStore();

	// Cardano address validator
	const isValidCardanoAddress = (addr: string): boolean => {
		if (/^addr1[0-9a-z]{20,}$/i.test(addr)) return true; // Shelley format
		if (/^(Ae2|DdzFF)[A-Za-z0-9]{20,}$/i.test(addr)) return true; // Byron format
		return false;
	};

	const handleNext = () => {
		if (isValid && destinationAddress) {
			setDestinationAddressToStore(destinationAddress);
			onNext();
		}
	};

	// useEffect to debounce validation
	useEffect(() => {
		if (!destinationAddress) {
			setIsValid(true);
			return;
		}

		setIsTyping(true);
		const timer = setTimeout(() => {
			setIsTyping(false);
			setIsValid(isValidCardanoAddress(destinationAddress));
		}, 600); // user stops typing for 600ms

		return () => clearTimeout(timer);
	}, [destinationAddress]);

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
				<div className="flex flex-col gap-6">
					{/* Blockchain Info */}
					<div>
						<p className="mb-2">Blockchain network</p>
						<span className="text-lg flex gap-2 items-center border border-black rounded-md p-3 text-black/50">
							<i className="w-6 h-6">
								<img
									src="/images/cardanoIcon.svg"
									alt="Cardano"
								/>
							</i>
							Cardano
						</span>
					</div>

					{/* Destination Input */}
					<div>
						<label className="mb-2 flex items-center gap-2">
							<span>Destination address</span>
							<CircleQuestionMark className="text-black/65 w-4" />
						</label>

						<Input
							type="text"
							placeholder="Please enter a destination address"
							value={destinationAddress}
							onChange={(e) => setDestinationAddress(e.target.value)}
							className={cn(
								"p-6 rounded-sm text-lg  ",
								!isTyping && !isValid && destinationAddress
									? "bg-orange-100 border border-orange-600"
									: ""
							)}
						/>

						{/* Warning message */}
						{!isTyping && !isValid && destinationAddress && (
							<p className="mt-2 text-sm text-orange-700 flex items-center gap-2">
								<AlertTriangle size={16} />
								Invalid Cardano address. Please check again.
							</p>
						)}
					</div>
				</div>
			</div>

			<Button
				onClick={handleNext}
				disabled={!destinationAddress || !isValid}
				className="button-primary w-full disabled:bg-gray-100 disabled:text-gray-700"
			>
				Continue
			</Button>
		</div>
	);
}

export default DestinationAddress;
