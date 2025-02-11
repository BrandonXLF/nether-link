import Footer from "@/components/Footer";
import MainHeading from "@/components/MainHeading";
import StoreProvider from "@/components/StoreProvider";
import Tool from "@/components/Tool";

export default function ToolPage() {
  return <div>
    <MainHeading />
    <StoreProvider>
      <Tool />
   </StoreProvider>
   <Footer />
  </div>
}
