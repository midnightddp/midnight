"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export type AccordionItemType = {
	id: string; // unique value for each accordion item
	header: React.ReactNode | string; // can be JSX
	subHeader?: React.ReactNode | string;
	content: React.ReactNode | string; // JSX content
	link?: { href: string; label: string };
};

type MainAccordionProps = {
	items: AccordionItemType[];
	title?: string;
};

function MainAccordion({ items, title }: MainAccordionProps) {
	return (
		<section className="bg-transparent relative w-full overflow-hidden m-auto pt-12 pb-10">
			<div className="grid lg:grid-cols-2">
				{title && (
					<div className="hidden lg:flex">
						<h3 className="text-h3">{title}</h3>
					</div>
				)}

				<div>
					<Accordion.Root
						type="single"
						collapsible
						className="w-full mx-auto flex flex-col gap-4 items-stretch"
					>
						{items.map((item) => (
							<Accordion.Item
								key={item.id}
								value={item.id}
								className="overflow-hidden bg-white rounded-lg"
							>
								<Accordion.Header>
									<Accordion.Trigger
										className={cn(
											"flex w-full items-center justify-between p-8 text-left lg:text-4xl font-medium transition min-h-20",
											"data-[state=open]:border-b",
											"data-[state=open]:border-b-black/30",
											"group"
										)}
									>
										<span className="flex flex-col gap-1">
											{item.subHeader && (
												<p className="text-sm text-black/60">
													{item.subHeader}
												</p>
											)}
											<p className="text-xs">{item.header}</p>
										</span>
										<ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-300 data-[state=open]:rotate-180" />
									</Accordion.Trigger>
								</Accordion.Header>

								<Accordion.Content className="px-8 py-10 pb-4 text-black/80 text-xs space-y-4 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp text-start">
									{item.content}
									{item.link && (
										<Link
											href={item.link.href}
											className="text-blue-700 underline text-sm font-semibold"
										>
											{item.link.label}
										</Link>
									)}
								</Accordion.Content>
							</Accordion.Item>
						))}
					</Accordion.Root>
				</div>
			</div>
		</section>
	);
}

export default MainAccordion;
