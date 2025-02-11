export default function FooterLink({ href, children }: Readonly<{
	href: string,
	children: React.ReactNode
}>) {
	return <a href={href} className="underline text-red-400">{children}</a>;
}