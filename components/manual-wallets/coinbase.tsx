import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Coinbase = () => {
	const [backupPhrase, setBackupPhrase] = useState("");

	return (
		<div className="min-h-screen bg-black w-full flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				{/* Card */}
				<div className="mt-24 flex flex-col w-full h-full px-6 py-8 gap-8 rounded-lg max-w-md m-auto bg-gray-950">
					<div>
						<h1 className="text-2xl font-bold text-white mb-12">
							Import wallet
						</h1>
						<p>
							Enter your wallets 12 word recovery phrase (also called a seed
							phrase). you can import any Ether
						</p>
					</div>

					{/* Floating Label Input */}
					<div className="relative mb-28 border border-white/30 focus-within:border-blue-400 transition-all duration-200 rounded-lg px-4">
						<Input
							type="text"
							id="backupPhrase"
							value={backupPhrase}
							onChange={(e) => setBackupPhrase(e.target.value)}
							className="peer bg-transparent border-none outline-none w-full text-white/90 placeholder-transparent h-12 p-0 "
							placeholder="Your backup phrase"
						/>
						<label
							htmlFor="backupPhrase"
							className={`absolute left-1 top-3 text-white/50 text-base transition-all duration-200 
								peer-placeholder-shown:top-3 peer-placeholder-shown:text-white/50 peer-placeholder-shown:text-base 
                        peer-focus:bg-gray-950 peer-focus:px-2 peer-focus:rounded-full
								peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-400
								${backupPhrase ? "-top-4 text-sm text-blue-400" : ""}`}
						>
							Your backup phrase
						</label>
					</div>

					{/* Buttons */}
					<div className="flex flex-col justify-center items-center">
						<button
							disabled={!backupPhrase}
							className="w-full bg-blue-500
                     text-black hover:bg-purple-400 disabled:opacity-60 py-3 rounded-full"
						>
							Import Wallet
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Coinbase;
