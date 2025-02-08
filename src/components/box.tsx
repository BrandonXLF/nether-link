import { ReactNode } from "react";

export default function Box({ className, title, children }: Readonly<{
	className?: string,
	title: string,
	children: ReactNode
}>) {
	return <div className={`${className ?? ''} p-4`}>
		<h2 className="text-lg font-semibold mb-3">{title}</h2>
		{children}
	</div>;
}