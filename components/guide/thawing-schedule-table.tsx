import { cn } from "@/lib/utils";
import React from "react";

// Data for the table
const tableHeaders = ["Thaw #", "1st thaw", "2nd thaw", "3rd thaw", "4th thaw"];
const unlockedData = {
	label: "Unlocked %",
	values: ["25%", "50%", "75%", "100%"],
};
const dayData = [
	{ values: ["1", "91", "181", "271"] },
	{ values: ["25", "115", "205", "295"] },
	{ values: ["90", "180", "270", "360"] },
];

/**
 * A React component for the "Thawing schedule examples" table,
 * styled with Tailwind CSS.
 */
const ThawingScheduleTable = () => {
	return (
		<div className="w-full max-w-4xl mx-auto my-10 p-4 font-sans">
			{/* Headings */}
			<h2 className="text-3xl font-light text-center text-gray-900 mb-2">
				Thawing schedule examples
			</h2>
			<p className="text-center text-gray-600 mb-8">
				When would each share of an allocation unlock based on the day of the
				first thaw.
			</p>

			{/* Table Wrapper */}
			<div className="border border-blue-700 rounded-lg overflow-hidden">
				<table className="w-full text-center table-fixed">
					{/* Table Head */}
					<thead className="text-sm font-medium text-gray-700">
						<tr>
							{tableHeaders.map((header, index) => (
								<th
									key={header}
									className={cn(
										"py-5 px-4 border-r border-blue-700",

										index % 2 == 0 && "bg-gray-200",
										index === 0 ? "w-[20%] bg-indigo-50" : "w-[20%]"
									)}
								>
									{header}
								</th>
							))}
						</tr>
					</thead>

					{/* Table Body */}
					<tbody className="text-gray-800 text-sm">
						{/* Unlocked % Row */}
						<tr className=" border-t border-blue-700">
							<th className="py-5 px-4 align-middle border-r border-blue-700 bg-indigo-50 font-bold">
								{unlockedData.label}
							</th>
							{unlockedData.values.map((value, index) => (
								<td
									key={index}
									className={cn(
										"py-5 px-4 font-bold border-r border-blue-700 text-center",
										index % 2 !== 0 && "bg-gray-200"
									)}
								>
									{value}
								</td>
							))}
						</tr>

						{/* Day Rows */}
						{dayData.map((row, rowIndex) => (
							<tr
								key={rowIndex}
								className="border-t  border-blue-700"
							>
								{/* Day Row Header (only on the first row of this group) */}
								{rowIndex === 0 && (
									<th
										rowSpan={dayData.length}
										className="py-5 px-4 font-bold text-center align-center border-r border-blue-700 bg-indigo-50 "
									>
										Day
									</th>
								)}

								{/* Day Data Cells */}
								{row.values.map((value, colIndex) => (
									<td
										key={colIndex}
										className={cn(
											"py-5 px-4 align-middle border-r border-blue-700",
											colIndex % 2 !== 0 && "bg-gray-200"
										)}
									>
										{value}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ThawingScheduleTable;
