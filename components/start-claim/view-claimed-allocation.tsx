"use client";

import { CircleQuestionMark, X, AlertTriangle, Copy } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

// --- Types ---
interface Token {
	name: string;
	quantity: string;
}

interface BalanceData {
	adaBalance: number;
	tokens: Token[];
}

interface AllocationProps {
	onCancel: () => void;
}

function ViewClaimedAllocation({ onCancel }: AllocationProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [isValid, setIsValid] = useState(true);
	const [showWarning, setShowWarning] = useState(false);
	const [activeAllocations, setActiveAllocations] = useState(false);

	const [balance, setBalance] = useState<BalanceData | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const formatAddress = (address: string): string => {
		if (!address) return "";
		if (address.length <= 10) return address;
		return `${address.slice(0, 50)}...${address.slice(-3)}`;
	};

	const isValidCardanoAddress = (addr: string): boolean => {
		if (/^(addr1|addr_test1)[0-9a-z]{20,}$/i.test(addr)) return true;
		if (/^(Ae2|DdzFF)[A-Za-z0-9]{20,}$/i.test(addr)) return true;
		return false;
	};

	useEffect(() => {
		if (!searchTerm) {
			setIsValid(true);
			setShowWarning(false);
			setBalance(null);
			setError(null);
			setActiveAllocations(false);
			return;
		}

		const timer = setTimeout(() => {
			const lengthValid = searchTerm.length >= 58;
			const validFormat = isValidCardanoAddress(searchTerm);
			const isValidNow = validFormat && lengthValid;

			setIsValid(isValidNow);
			setShowWarning(!isValidNow);
		}, 300);

		return () => clearTimeout(timer);
	}, [searchTerm]);

	const handleCheckBalance = async () => {
		if (!isValid || !searchTerm) return;

		setLoading(true);
		setError(null);
		setBalance(null);
		setActiveAllocations(false);

		try {
			const response = await fetch(
				`/api/cardano-balance?address=${searchTerm}`
			);
			const data = await response.json();

			if (!response.ok)
				throw new Error(data.error || "Failed to fetch balance");

			setBalance(data as BalanceData);
			setActiveAllocations(true); // Activate allocations
		} catch (err: any) {
			setError(err.message || "An unknown error occurred");
		} finally {
			setLoading(false);
		}
	};

	const RenderLoading = () => (
		<div className="w-full h-full flex flex-col justify-center items-center text-center p-20 gap-2">
			<div className="mb-4 animate-spin border-4 border-blue-500 border-t-transparent rounded-full w-10 h-10"></div>
			<p className="text-lg font-medium">Loading your claims</p>
			<p>Please do not close your browser or navigate from this page</p>
		</div>
	);

	const RenderClaimedAllocations = ({
		balance,
		searchTerm,
	}: {
		balance: BalanceData;
		searchTerm: string;
	}) => (
		<>
			<div className="w-full h-full bg-green-50/60 px-8 py-4 flex flex-col  border-y border-black/20">
				<div className="mb-4">
					<p className="mb-2 flex items-center gap-2 text-sm">
						<span>Total allocated amount:</span>
						<CircleQuestionMark className="w-4" />
					</p>
					<p className="text-3xl mb-1">{balance.adaBalance} NIGHT</p>
					<p className="text-sm flex gap-2">
						<span className="text-black/60">
							Night allocation based on assets in the Origin Address provided
						</span>
					</p>
				</div>

				<div className="border-t border-black/20 pt-2">
					<p className="mb-2 flex items-center gap-2 text-sm py-2">
						<span>Destination address details:</span>
						<CircleQuestionMark className="w-4" />
					</p>
					<div className="flex flex-col gap-2 mb-4">
						<p className="text-xs text-black/60">Blockchain network:</p>
						<div className="flex gap-2 justify-start items-center text-sm">
							<img
								src="/images/cardanoIcon.svg"
								alt="Cardano"
								className="w-6 h-6"
							/>
							Cardano
						</div>
					</div>

					<div className="flex gap-2 flex-col mb-4">
						<p className="text-xs">Destination address:</p>
						<span className="flex justify-between">
							<span className="text-xs break-all">
								{formatAddress(searchTerm)}
							</span>
							<button onClick={() => navigator.clipboard.writeText(searchTerm)}>
								<Copy size={16} />
							</button>
						</span>
					</div>

					{/* {balance.tokens.length > 0 && (
						<div className="mt-2 w-full max-h-28 overflow-scroll">
							<p className="font-semibold text-sm">Other Tokens:</p>
							<ul className="list-disc list-inside text-xs">
								{balance.tokens.map((t, i) => (
									<li key={i}>
										{t.name}: {t.quantity}
									</li>
								))}
							</ul>
						</div>
					)} */}
				</div>
			</div>
			<div className="flex flex-col gap-4 px-6 py-4">
				<Button
					className="button-primary w-full text-xs"
					onClick={() => {
						setActiveAllocations(false);
						setSearchTerm("");
					}}
				>
					View claimed allocations for another address
				</Button>

				<Button
					onClick={onCancel}
					className="button-secondary w-full"
				>
					Cancel
				</Button>
			</div>
		</>
	);

	const renderInputSection = () => (
		<div className="flex flex-col gap-4">
			<div>
				<p className="mb-2">Blockchain network</p>
				<span className="flex gap-2 justify-start items-center border border-black rounded-md p-4 text-black/50">
					<img
						src="/images/cardanoIcon.svg"
						alt="Cardano"
						className="w-5 h-5"
					/>
					Cardano
				</span>
			</div>

			<div>
				<p className="mb-2 flex items-center gap-2">
					<span>Destination address</span>
					<CircleQuestionMark className="w-4" />
				</p>
				<div className="relative">
					<Input
						id="search"
						placeholder="Please enter a destination address"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value.trim())}
						className={`p-7 rounded-sm pr-10
              ${showWarning ? "bg-orange-100 border border-orange-800" : ""}
              ${
								isValid && searchTerm
									? "bg-green-100/60 border border-green-800 text-green-800"
									: ""
							}
            `}
					/>
					{showWarning && (
						<AlertTriangle
							className="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-800"
							size={20}
						/>
					)}
					{isValid && searchTerm && (
						<span className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-green-800 rounded-full p-1">
							<svg
								className="w-3 h-3 text-white"
								fill="none"
								stroke="currentColor"
								strokeWidth={2}
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M5 13l4 4L19 7"
								/>
							</svg>
						</span>
					)}
				</div>
				{showWarning && (
					<p className="mt-2 text-sm text-orange-800 flex items-center gap-2">
						<AlertTriangle size={16} />
						Please enter a valid destination address.
					</p>
				)}
			</div>
		</div>
	);

	return (
		<section className="absolute inset-0 z-50">
			<>
				<div className="hidden md:flex bg-black/75 items-center justify-center fixed bottom-0 left-0 w-dvw h-screen">
					<div className="bg-white rounded-lg flex flex-col w-[500px]">
						{/* Header */}
						<div className="flex justify-between items-center px-8 py-6">
							<h4 className="font-bold text-xl">View claimed allocations</h4>
							<button onClick={onCancel}>
								<X />
							</button>
						</div>

						{/* Body */}

						{loading && <RenderLoading />}

						{!activeAllocations && !loading && (
							<React.Fragment>
								<div className="border-y border-black/20 p-8 flex flex-col gap-4">
									<p className="text-sm font-medium">
										To view claimed allocations please enter a destination
										address
									</p>

									<div className="flex items-center gap-4">
										<div className=" flex justify-center items-center border border-black/700 rounded-md py-6 bg-neutral-100/80 w-full">
											Connect a wallet
										</div>
										<div className="flex justify-center items-center border border-blue-700 rounded-md py-6 bg-indigo-100/80 w-full">
											Enter an address
										</div>
									</div>

									{!activeAllocations && renderInputSection()}
								</div>
								{/* Footer */}
								<div className="flex flex-col gap-2 p-8">
									<Button
										className="button-primary w-full disabled:bg-gray-100 disabled:text-gray-700"
										disabled={!isValid || !searchTerm || loading}
										onClick={handleCheckBalance}
									>
										{loading ? "Checking..." : "View claimed allocations"}
									</Button>

									<Button
										onClick={onCancel}
										className="button-secondary w-full"
									>
										Cancel
									</Button>
								</div>
							</React.Fragment>
						)}
						{activeAllocations && balance && (
							<RenderClaimedAllocations
								balance={balance}
								searchTerm={searchTerm}
							/>
						)}
					</div>
				</div>

				{/* Mobile */}
				<div className="bg-black/75 flex items-end justify-center md:hidden fixed bottom-0 left-0 w-dvw h-screen">
					<div className="bg-white w-full h-auto rounded-t-lg flex flex-col">
						{/* Header */}
						<div className="flex justify-between items-center px-6 py-4">
							<h4 className="font-bold text-lg">View claimed allocations</h4>
							<button onClick={onCancel}>
								<X />
							</button>
						</div>
						{loading && <RenderLoading />}

						{/* Body */}
						{!activeAllocations && !loading && (
							<React.Fragment>
								<div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
									<p className="text-center text-base">
										To view claimed allocations please enter a destination
										address
									</p>
									<div className="flex justify-center items-center border border-blue-700 rounded-md py-8 bg-indigo-100/80 w-full">
										Enter an address
									</div>

									{renderInputSection()}
								</div>
								<div className="flex flex-col gap-4 p-6 border-t border-black/20">
									<Button
										className="button-primary w-full disabled:bg-neutral-300 disabled:text-black/90"
										disabled={!isValid || !searchTerm || loading}
										onClick={handleCheckBalance}
									>
										{loading ? "Checking..." : "View claimed allocations"}
									</Button>

									<Button
										onClick={onCancel}
										className="button-secondary w-full"
									>
										Cancel
									</Button>
								</div>
							</React.Fragment>
						)}
						{activeAllocations && balance && (
							<RenderClaimedAllocations
								balance={balance}
								searchTerm={searchTerm}
							/>
						)}
					</div>
				</div>
			</>
		</section>
	);
}

export default ViewClaimedAllocation;
