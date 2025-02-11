import MainHeading from "@/components/main-heading";
import StoreProvider from "@/components/store-provider";
import Tool from "@/components/tool";

export default function ToolPage() {
  return <div>
    <MainHeading />
    <StoreProvider>
      <Tool />
   </StoreProvider>
  </div>
}
