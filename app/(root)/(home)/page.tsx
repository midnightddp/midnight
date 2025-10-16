import Allocations from "@/components/home/allocations";
import Distribution from "@/components/home/distribution";
import Hero from "@/components/home/hero";

export default function Home() {
	return (
		<>
			<Hero />
			<Distribution />
			<Allocations />
		</>
	);
}
