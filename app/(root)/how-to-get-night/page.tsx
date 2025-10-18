import Claim from "@/components/how-to-get-night/claim";
import FirstSection from "@/components/how-to-get-night/first-section";
import MakeAClaim from "@/components/how-to-get-night/make-a-claim";
import Redeem from "@/components/how-to-get-night/redeem";
import Thaw from "@/components/how-to-get-night/thaw";
import React from "react";

function HowToGetNightPage() {
	return (
		<>
			<FirstSection />
			<Claim />
			<MakeAClaim />
			<Thaw />
			<Redeem />
		</>
	);
}

export default HowToGetNightPage;
