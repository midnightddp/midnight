import React from "react";
import { Button } from "../ui/button";
import { Dot } from "lucide-react";

function LiveButton() {
	return (
		<span className="py-1 px-2.5 text-sm rounded-4xl border border-green-800/60 bg-green-200/30 text-green-700 flex justify-center items-center gap-0.5 font-medium">
			Live
			<Dot className=" animate-pulse w-4 h-4" />
		</span>
	);
}

export default LiveButton;
