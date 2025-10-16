import Navbar from "@/components/layouts/navbar";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<div className="">
				<Navbar />
			</div>
			<main>{children}</main>
		</>
	);
}
