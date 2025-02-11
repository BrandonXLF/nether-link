'use client';

import ConnectionList from "@/components/connection-list";
import Box from "@/components/box";
import PortalList from "@/components/portal-list";
import Visualizer from "@/components/visualizer";
import ShowAllToggle from "./show-all-toggle";

export default function Tool() {
  return <>
    <Box className="border-b border-gray-500">
      <ShowAllToggle />
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