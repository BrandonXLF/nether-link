import { ReactNode } from "react";

export default function Heading({ children }: Readonly<{
	children: ReactNode
}>) {
	return <h2 className="text-lg font-semibold pt-4 mb-3">{children}</h2>;
}