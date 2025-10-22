import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const address = searchParams.get("address");

	if (!address)
		return NextResponse.json({ error: "Address is required" }, { status: 400 });

	const PROJECT_ID = process.env.BLOCKFROST_PROJECT_ID;
	if (!PROJECT_ID)
		return NextResponse.json({ error: "Project ID not set" }, { status: 500 });

	try {
		const response = await axios.get(
			`https://cardano-mainnet.blockfrost.io/api/v0/addresses/${address}`,
			{ headers: { project_id: PROJECT_ID } }
		);

		const adaEntry = response.data.amount.find(
			(a: any) => a.unit === "lovelace"
		);
		const adaBalance = adaEntry ? Number(adaEntry.quantity) / 1_000_000 : 0;

		const tokens = response.data.amount
			.filter((a: any) => a.unit !== "lovelace")
			.map((a: any) => {
				const policyId = a.unit.slice(0, 56);
				const hexName = a.unit.slice(56);
				const name = hexName
					? Buffer.from(hexName, "hex").toString()
					: "Unknown";
				return { name, quantity: a.quantity };
			});

		return NextResponse.json({ adaBalance, tokens });
	} catch (err: any) {
		console.error(err.response?.data || err.message);
		return NextResponse.json(
			{ error: "Failed to fetch balance" },
			{ status: 500 }
		);
	}
}
