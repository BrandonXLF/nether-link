import { ReactNode } from "react";

export default function Heading({ children }: Readonly<{
	children: ReactNode
}>) {
	return <h2 className="text-lg font-semibold mt-4 mb-2">{children}</h2>;
}