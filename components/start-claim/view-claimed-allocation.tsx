import { CircleQuestionMark, X, AlertTriangle } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface AllocationProps {
	onCancel: () => void;
}

function ViewClaimedAllocation({ onCancel }: AllocationProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [isValid, setIsValid] = useState(true);
	const [showWarning, setShowWarning] = useState(false);

	// ✅ Cardano address validation
	const isValidCardanoAddress = (addr: string): boolean => {
		if (/^(addr1|addr_test1)[0-9a-z]{20,}$/i.test(addr)) return true; // Shelley (mainnet/testnet)
		if (/^(Ae2|DdzFF)[A-Za-z0-9]{20,}$/i.test(addr)) return true; // Byron
		return false;
	};

	// ✅ Debounced validation (runs when user stops typing)
	useEffect(() => {
		if (!searchTerm) {
			setIsValid(true);
			setShowWarning(false);
			return;
		}

		const timer = setTimeout(() => {
			const valid = isValidCardanoAddress(searchTerm);
			setIsValid(valid);
			setShowWarning(!valid);
		}, 600); // wait 600ms after typing stops

		return () => clearTimeout(timer);
	}, [searchTerm]);

	return (
		<section className="absolute inset-0 z-50">
			{/* ───── Desktop ───── */}
			<div className="hidden md:flex bg-black/75 items-center justify-center fixed bottom-0 left-0 w-dvw h-screen">
				<div className="bg-white rounded-lg flex flex-col">
					<div className="flex justify-between items-center px-8 py-6">
						<h4 className="font-bold text-xl">View claimed allocations</h4>
						<button onClick={onCancel}>
							<X />
						</button>
					</div>

					<div className="border-y border-black/20 p-8 flex flex-col gap-6">
						<p className="text-center text-lg">
							To view claimed allocations please enter a destination address
						</p>

						<div className="flex items-center gap-8">
							<div className="text-lg flex justify-center items-center border border-black/700 rounded-md py-7 bg-neutral-100/80 w-full">
								Connect a wallet
							</div>
							<div className="text-lg flex justify-center items-center border border-blue-700 rounded-md py-6 bg-indigo-100/80 w-full">
								Enter an address
							</div>
						</div>

						<div className="flex flex-col gap-4">
							{/* Blockchain section */}
							<div>
								<p className="mb-2">Blockchain network</p>
								<span className="text-lg flex gap-2 justify-start items-center border border-black rounded-md p-4 text-black/50">
									<i className="w-6 h-6">
										<img
											src="/images/cardanoIcon.svg"
											alt="Cardano"
										/>
									</i>
									Cardano
								</span>
							</div>

							{/* Destination address */}
							<div>
								<p className="mb-2 flex items-center gap-2">
									<span>Destination address</span>
									<CircleQuestionMark />
								</p>

								<div className="relative">
									<Input
										id="search"
										placeholder="Please enter a destination address"
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value.trim())}
										className={`p-8 rounded-sm text-lg pr-10 ${
											showWarning
												? "bg-orange-100 border border-orange-800"
												: ""
										}`}
									/>
									{showWarning && (
										<AlertTriangle
											className="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-800"
											size={20}
										/>
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
					</div>

					<div className="flex flex-col gap-4 p-8">
						<Button
							className="button-primary w-full disabled:bg-gray-100 disabled:text-gray-700"
							disabled={!isValid || !searchTerm}
						>
							View claimed allocations
						</Button>

						<Button
							onClick={onCancel}
							className="button-secondary w-full"
						>
							Cancel
						</Button>
					</div>
				</div>
			</div>

			{/* ───── Mobile ───── */}
			<div className="bg-black/75 flex items-end justify-center md:hidden fixed bottom-0 left-0 w-dvw h-screen">
				<div className="bg-white w-full h-11/12 rounded-t-lg flex flex-col">
					<div className="flex justify-between items-center px-8 py-6">
						<h4 className="font-bold text-xl">View claimed allocations</h4>
						<button onClick={onCancel}>
							<X />
						</button>
					</div>

					<div className="border-y border-black/20 p-8 flex flex-col gap-6">
						<p className="text-center">
							To view claimed allocations please enter a destination address
						</p>

						<div className="text-lg flex justify-center items-center border border-blue-700 rounded-md py-6 bg-indigo-100/80">
							Enter an address
						</div>

						<div className="flex flex-col gap-4">
							<div>
								<p className="mb-2">Blockchain network</p>
								<span className="text-lg flex gap-2 justify-start items-center border border-black rounded-md px-4 py-3 text-black/50">
									<i className="w-6 h-6">
										<img
											src="/images/cardanoIcon.svg"
											alt="Cardano"
										/>
									</i>
									Cardano
								</span>
							</div>

							<div>
								<p className="mb-2 flex items-center gap-2">
									<span>Destination address</span>
									<CircleQuestionMark />
								</p>

								<div className="relative">
									<Input
										id="search-mobile"
										placeholder="Please enter a destination address"
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value.trim())}
										className={`p-6 rounded-sm pr-10 ${
											showWarning
												? "bg-orange-100 border border-orange-800"
												: ""
										}`}
									/>
									{showWarning && (
										<AlertTriangle
											className="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-800"
											size={20}
										/>
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
					</div>

					<div className="flex flex-col gap-4 p-8">
						<Button
							className="button-primary w-full disabled:bg-gray-100 disabled:text-gray-700"
							disabled={!isValid || !searchTerm}
						>
							View claimed allocations
						</Button>

						<Button
							onClick={onCancel}
							className="button-secondary w-full"
						>
							Cancel
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}

export default ViewClaimedAllocation;
