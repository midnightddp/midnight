import Footer from "@/components/layouts/footer";
import Navbar from "@/components/layouts/navbar";
import { DM_Mono, Outfit } from "next/font/google";

// Outfit
const outfit = Outfit({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<div>
				<Navbar />
			</div>
			<main className={`${outfit.className} relative`}>{children}</main>
			<div>
				<Footer />
			</div>
		</>
	);
}
