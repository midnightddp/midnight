"use client";

import Link from "next/link";

export default function Footer() {
	return (
		<footer className="bg-blue-700 text-white py-12 px-6 md:px-12 lg:px-24">
			<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
				{/* Column 1 - Brand */}
				<div className="space-y-4">
					<h2 className="text-xl font-bold">Midnight</h2>
					<p className="text-sm opacity-80 max-w-xs">
						Building the future of token distribution with transparency and
						fairness.
					</p>
				</div>

				{/* Column 2 - Links */}
				<div>
					<h3 className="text-sm font-semibold uppercase mb-4">Navigate</h3>
					<ul className="space-y-2 text-sm">
						<li>
							<Link
								href="#"
								className="hover:underline"
							>
								Home
							</Link>
						</li>
						<li>
							<Link
								href="#"
								className="hover:underline"
							>
								About
							</Link>
						</li>
						<li>
							<Link
								href="#"
								className="hover:underline"
							>
								Claim
							</Link>
						</li>
						<li>
							<Link
								href="#"
								className="hover:underline"
							>
								Timeline
							</Link>
						</li>
					</ul>
				</div>

				{/* Column 3 - Resources */}
				<div>
					<h3 className="text-sm font-semibold uppercase mb-4">Resources</h3>
					<ul className="space-y-2 text-sm">
						<li>
							<Link
								href="#"
								className="hover:underline"
							>
								Docs
							</Link>
						</li>
						<li>
							<Link
								href="#"
								className="hover:underline"
							>
								FAQ
							</Link>
						</li>
						<li>
							<Link
								href="#"
								className="hover:underline"
							>
								Support
							</Link>
						</li>
					</ul>
				</div>

				{/* Column 4 - Newsletter */}
				<div>
					<h3 className="text-sm font-semibold uppercase mb-4">
						Stay in the loop
					</h3>
					<form className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
						<input
							type="email"
							placeholder="Enter your email"
							className="px-3 py-2 rounded-md text-black w-full sm:flex-1 focus:outline-none"
						/>
						<button
							type="submit"
							className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-md hover:bg-gray-100 transition"
						>
							Subscribe
						</button>
					</form>
				</div>
			</div>

			{/* Bottom section */}
			<div className="border-t border-white/20 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm opacity-80 gap-4">
				<p>© {new Date().getFullYear()} Midnight. All rights reserved.</p>
				<div className="flex gap-4">
					<Link
						href="#"
						className="hover:underline"
					>
						Privacy Policy
					</Link>
					<Link
						href="#"
						className="hover:underline"
					>
						Terms of Service
					</Link>
				</div>
			</div>
		</footer>
	);
}
