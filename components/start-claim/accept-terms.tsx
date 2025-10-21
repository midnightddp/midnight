import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";

interface TermsStepProps {
	onNext: () => void;
	onPrevious: () => void;
}

function AcceptTerms({ onNext, onPrevious }: TermsStepProps) {
	const [accepted, setAccepted] = useState(false);
	return (
		<div>
			<button
				onClick={onPrevious}
				className="flex items-center text-blue-600 hover:text-blue-700 mb-6"
			>
				<ChevronDown
					className="rotate-90 mr-2"
					size={20}
				/>
				Back
			</button>

			<h2 className="text-2xl font-bold text-gray-900 mb-6">
				Accept terms and conditions
			</h2>
			<p className="text-gray-700 mb-6">
				Please review and accept our terms and conditions to proceed.
			</p>

			<div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6 max-h-64 overflow-y-auto">
				<p className="text-sm text-gray-700 leading-relaxed">
					By participating in the Glacier Drop token claim, you agree to the
					following terms and conditions...
				</p>
			</div>

			<label className="flex items-center mb-6">
				<input
					type="checkbox"
					checked={accepted}
					onChange={(e) => setAccepted(e.target.checked)}
					className="w-5 h-5 text-blue-600 rounded"
				/>
				<span className="ml-3 text-gray-700">
					I accept the terms and conditions
				</span>
			</label>

			<Button
				onClick={onNext}
				disabled={!accepted}
				className="button-primary w-full disabled:bg-gray-300"
			>
				Continue
			</Button>
		</div>
	);
}

export default AcceptTerms;
