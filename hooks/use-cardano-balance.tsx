"use client";

import { useState } from "react";

interface Token {
	name: string;
	quantity: string;
}

interface BalanceData {
	adaBalance: number;
	tokens: Token[];
}

interface UseCardanoBalanceReturn {
	balance: BalanceData | null;
	loading: boolean;
	error: string;
	fetchBalance: (address: string) => Promise<void>;
}

export function useCardanoBalance(): UseCardanoBalanceReturn {
	const [balance, setBalance] = useState<BalanceData | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const fetchBalance = async (address: string) => {
		setLoading(true);
		setError("");
		setBalance(null);

		try {
			const res = await fetch(`/api/cardano-balance?address=${address}`);
			if (!res.ok) throw new Error("Failed to fetch balance");
			const data: BalanceData = await res.json();
			setBalance(data);
		} catch (err: any) {
			console.error(err);
			setError(err.message || "Failed to fetch balance");
		} finally {
			setLoading(false);
		}
	};

	return { balance, loading, error, fetchBalance };
}
