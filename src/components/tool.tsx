'use client';

import ConnectionList from "@/components/ConnectionList";
import Box from "@/components/Box";
import PortalList from "@/components/PortalList";
import Visualizer from "@/components/Visualizer";
import ShowAllToggle from "./ShowAllToggle";
import FileIO from "./FileIO";

export default function Tool() {
  return <>
    <Box className="flex flex-wrap gap-2 justify-between border-b border-gray-500">
      <ShowAllToggle />
      <FileIO />
    </Box>
    <div className="flex justify-between flex-wrap">
      <div className="flex-1 max-lg:basis-full">
        <Box title="Overworld Portals">
          <PortalList type="overworld" isNether={false} />
        </Box>
        <Box title="Nether Portals" className="border-t border-gray-500">
          <PortalList type="nether" isNether={true} />
        </Box>
      </div>
      <div className="flex-1 flex flex-col lg:max-w-md lg:border-l max-lg:border-t border-gray-500">
        <Box title="Overlay Map">
          <div className="max-w-md">
            <Visualizer />
          </div>
        </Box>
        <Box title="Connections" className="border-t border-gray-500">
          <ConnectionList />
        </Box>
      </div>
    </div>
  </>
}