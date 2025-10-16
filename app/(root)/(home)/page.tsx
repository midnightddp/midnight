import Allocations from "@/components/home/allocations";
import Distribution from "@/components/home/distribution";
import Hero from "@/components/home/hero";
import Night from "@/components/home/night";
import Tokenomics from "@/components/home/tokenomics";

export default function Home() {
	return (
		<>
			<Hero />
			<Distribution />
			<Allocations />
			<Tokenomics />
			<Night />
		</>
	);
}
