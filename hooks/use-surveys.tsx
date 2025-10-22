// hooks/useSurveys.ts
import { fetchAllSurveys } from "@/lib/firebaseUtils";
import { useState, useEffect } from "react";

export const useSurveys = () => {
	const [surveys, setSurveys] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadSurveys = async () => {
			setLoading(true);
			setError(null);
			try {
				const data = await fetchAllSurveys();
				setSurveys(data);
			} catch (err: any) {
				setError(err.message || "Something went wrong");
			} finally {
				setLoading(false);
			}
		};

		loadSurveys();
	}, []);

	return { surveys, loading, error };
};
