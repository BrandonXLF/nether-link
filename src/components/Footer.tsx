import Box from "./Box";
import FooterLink from "./FooterLink";

export default function Footer() {
	return <Box className="border-t border-gray-500">
		Created by <FooterLink href="https://www.brandonfowler.me/">Brandon Fowler</FooterLink>.{' '}
		<FooterLink href="https://github.com/BrandonXLF/nether-link">View code on GitHub</FooterLink>.
	</Box>
}