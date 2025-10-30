import type { Metadata } from "next";
import { DM_Mono, Outfit } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

// DM Mono
const dmMono = DM_Mono({
	subsets: ["latin"],
	weight: ["400", "500"],
});

// Outfit
const outfit = Outfit({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
	title: "Midnight Drop",
	description: "Be part of the  Drop, and the lunch of out token NIGHT",
	icons: [
		{
			rel: "icon",
			url: "/faviconV2-16.png",
			sizes: "16x16",
			type: "image/png",
		},
		{
			rel: "icon",
			url: "/faviconV2-32.png",
			sizes: "32x32",
			type: "image/png",
		},
		{
			rel: "icon",
			url: "/faviconV2-48.png",
			sizes: "48x48",
			type: "image/png",
		},
		{
			rel: "icon",
			url: "/faviconV2-64.png",
			sizes: "64x64",
			type: "image/png",
		},
		{
			rel: "icon",
			url: "/faviconV2-128.png",
			sizes: "128x128",
			type: "image/png",
		},
		{
			rel: "icon",
			url: "/faviconV2-256.png",
			sizes: "256x256",
			type: "image/png",
		},
	],
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className="antialiased">
				<Theme>{children}</Theme>
			</body>
		</html>
	);
}
