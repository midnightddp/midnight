import { CircleQuestionMark, X } from "lucide-react";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface AllocationProps {
	onCancel: () => void;
}

function ViewClaimedAllocation({ onCancel }: AllocationProps) {
	const [searchTerm, setSearchTerm] = useState("");

	return (
		<>
			<section className="absolute inset-0 z-50">
				{/* ───── Desktop  ───── */}
				<div className="hidden md:flex bg-black/75  items-center justify-center  fixed bottom-0 left-0 w-dvw h-screen">
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
							<div className="flex  items-center gap-8">
								<div className="text-lg  flex justify-center items-center border border-black/700 rounded-md py-7 bg-neutral-100/80 w-full">
									Connect a wallet
								</div>
								<div className="text-lg  flex justify-center items-center border border-blue-700 rounded-md py-6 bg-indigo-100/80 w-full">
									Enter an address
								</div>
							</div>
							<div className="flex flex-col gap-4">
								<div>
									<p className="mb-2">Blockchain network</p>
									<span className="text-lg  flex gap-2  justify-star items-center border border-black rounded-md p-4 text-black/50">
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
									<p className="mb-2 flex items-center gap-2">
										<span>Destination adress </span>
										<CircleQuestionMark />
									</p>
									<Input
										id="search"
										placeholder="Please Enter a destination address"
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										className="p-8 rounded-sm text-lg"
									/>
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-4 p-8">
							<Button className="button-primary w-full disabled:bg-gray-100 disabled:text-gray-700">
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
				{/* ───── Mobile  ───── */}
				<div className="bg-black/75 flex items-end justify-center md:hidden fixed bottom-0 left-0 w-dvw h-screen">
					<div className="bg-white w-full h-5/6 rounded-t-lg flex flex-col">
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
							<div className="text-lg  flex justify-center items-center border border-blue-700 rounded-md py-6 bg-indigo-100/80">
								Enter an address
							</div>
							<div className="flex flex-col gap-4">
								<div>
									<p className="mb-2">Blockchain network</p>
									<span className="text-lg  flex gap-2  justify-star items-center border border-black rounded-md px-4 py-3 text-black/50">
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
									<p className="mb-2 flex items-center gap-2">
										<span>Destination adress </span>
										<CircleQuestionMark />
									</p>
									<Input
										id="search"
										placeholder="Please Enter a destination address"
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										className="p-6 rounded-sm "
									/>
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-4 p-8">
							<Button className="button-primary w-full disabled:bg-gray-100 disabled:text-gray-700">
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
		</>
	);
}

export default ViewClaimedAllocation;
