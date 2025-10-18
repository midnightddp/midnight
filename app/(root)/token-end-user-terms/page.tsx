"use client";

import React from "react";

export default function TokenTermsPage() {
	return (
		<div className="max-w-4xl mx-auto px-4 py-12 prose prose-neutral dark:prose-invert text-center">
			<h1 className="text-3xl font-bold mb-4">Token End User Terms</h1>
			<p>
				<strong>Last updated:</strong> 3 October 2025
			</p>

			<p>
				These Token End-User Terms (the “Token End-User Terms”) are a legally
				binding agreement between you (“User”, “you”, or “your”) and Midnight
				TGE Ltd., a company registered in the British Virgin Islands with
				registered address at Craigmuir Chambers, Road Town, Tortola, VG, 1110,
				BVI (“Midnight,” “we”, “us”, or “our”).
			</p>

			<p>
				Midnight provides the NIGHT website and portal (the “Website”) and
				related services and products, including the ability to Claim and redeem
				via the Website the digital blockchain tokens known as ‘NIGHT’ and their
				smallest denomination sub-unit ‘STAR’ (the “Tokens”).
			</p>

			<p>
				The Tokens are being distributed through the Glacier Drop distribution
				program, which comprises the following phases:
			</p>

			<ul>
				<li>i. the ‘Glacier Drop’ (the first claim phase)</li>
				<li>ii. the ‘Scavenger Mine’ (the second claim phase)</li>
				<li>iii. the ‘Lost &amp; Found’ claim phase (the third phase)</li>
			</ul>

			<p>
				(with these phases (and the related redemption functionality provided by
				Midnight) together referred to in these Token End-User Terms as the
				“Glacier Drop Program”).
			</p>

			<p>
				These Token End-User Terms, the Website Terms of Use and (once in
				effect) the Global Terms (together, the “Agreement”) govern your use of
				the Website, and related services and products, including governing your
				ability to Claim and redeem via the Website the Tokens distributed
				through the Glacier Drop Program. If you hold or use Tokens, please note
				that additional terms (the Global Terms) will also apply to your use and
				ownership of the Tokens once such terms are in effect.
			</p>

			<p>
				We encourage you to review these Token End-User Terms carefully. These
				Token End-User Terms are entered into between you and Midnight when you
				click to agree to these Token End-User Terms at the start of your
				participation in the Glacier Drop Program and when Claiming and/or
				redeeming the Token(s) via the Glacier Drop Program. These Token
				End-User Terms will remain in full force and effect until terminated in
				accordance with Section 10 (Term and Termination). If you do not agree
				with any of the provisions of these Token End-User Terms, you may not
				participate in or use the Website or the Glacier Drop Program.
			</p>

			<div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
				<p className="font-semibold uppercase text-yellow-800">
					Important for U.S. Residents
				</p>
				<p className="text-sm text-yellow-800">
					IF YOU RESIDE IN THE UNITED STATES, PLEASE NOTE SECTION 13 CONTAINS AN
					ARBITRATION CLAUSE AND CLASS ACTION WAIVER...
				</p>
			</div>

			{/* SECTION 1 */}
			<section id="definitions">
				<h2>1. Definitions</h2>
				<p>
					1.1 “Agreement” means the Token End-User Terms, the Website Terms of
					Use, and (once in effect) the Global Terms.
				</p>
				<p>
					1.2 “Blockchain” means any blockchain on which the Tokens are issued.
				</p>
				<p>
					1.3 “Claim” or “Claiming” means the process by which you claim Tokens
					via the Website.
				</p>
				{/* ... continue adding the rest of the definitions here ... */}
			</section>

			{/* SECTION 2 */}
			<section id="token-claim-rights">
				<h2>2. Token Claim Rights</h2>
				<p>
					2.1 Subject to your compliance with these Token End-User Terms,
					Midnight grants you a limited, non-exclusive, non-transferable,
					revocable right to Claim and/or receive the Tokens...
				</p>
				{/* ... */}
			</section>

			{/* Repeat structure for each section: 3, 4, 5, etc. */}
			{/* Each <section> should have an <h2> for the section number and title, followed by <p> or <ul> for content */}

			{/* FINAL SECTION */}
			<section id="governing-law">
				<h2>14. Governing Law and Jurisdiction</h2>
				<p>
					These Token End-User Terms and any dispute arising out of or in
					connection with them shall be governed by and construed in accordance
					with the laws of the British Virgin Islands, without regard to its
					conflict of law principles.
				</p>
			</section>

			<p className="mt-12 text-sm text-gray-600">
				© {new Date().getFullYear()} Midnight TGE Ltd. All rights reserved.
			</p>
		</div>
	);
}
