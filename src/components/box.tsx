import { ReactNode } from "react";

export default function Box({ className, level, title, children }: Readonly<{
	className?: string,
	level?: 1 | 2,
	title?: string,
	children: ReactNode
}>) {
	const HeadingTag = `h${level ?? 2}` as const;
	const headingSize = level == 1 ? 'text-3xl' : 'text-lg';

	return <div className={`${className ?? ''} p-4`}>
		{title && <HeadingTag className={`${headingSize} font-semibold mb-3`}>{title}</HeadingTag>}
		{children}
	</div>;
}