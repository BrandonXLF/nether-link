'use client';

import Portal from "@/classes/Portal";
import ConnectionList from "@/components/connection-list";
import Box from "@/components/box";
import PortalList from "@/components/portal-list";
import Visualizer from "@/components/visualizer";
import StoredPortal from "@/types/StoredPortal";
import getExits from "@/utils/get-exits";
import { useEffect, useState } from "react";

function loadArray(name: string, isNether: boolean) {
  try {
    const arr: StoredPortal[] = JSON.parse(localStorage.getItem(name) ?? '[]');
    return arr.map(stored => Portal.fromStored(stored, isNether));
  } catch {
    return [];
  }
}

export default function Tool() {
  const [overworld, setOverworld] = useState<Portal[]>([]);
  const [nether, setNether] = useState<Portal[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(()=> {
    setOverworld(loadArray('overworld', false));
    setNether(loadArray('nether', true));
    setLoaded(true);
}, [])

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem('overworld', JSON.stringify(overworld));
  }, [overworld, loaded]);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem('nether', JSON.stringify(nether));
  }, [nether, loaded]);

  const overworldExits = getExits(overworld, nether);
  const netherExits = getExits(nether, overworld);

  return <div>
    <hgroup className="border-b border-gray-400 pb-8">
      <h1 className="text-3xl font-semibold mt-8 mb-2">Nether Link</h1>
      <p>Coordinate Minecraft Nether portals.</p>
    </hgroup>
    <div className="flex justify-between flex-wrap">
      <div className="flex-1 max-lg:basis-full">
        <Box title="Overworld Portals">
          {!loaded
            ? 'Loading...'
            : <PortalList portals={overworld} getExits={() => overworldExits.values()} portalsChanged={setOverworld} isNether={false} />}
        </Box>
        <Box title="Nether Portals" className="border-t border-gray-400">
          {!loaded
            ? 'Loading...'
            : <PortalList portals={nether} getExits={() => netherExits.values()} portalsChanged={setNether} isNether={true} />}
        </Box>
      </div>
      <div className="flex-1 flex flex-col lg:max-w-md lg:border-l max-lg:border-t border-gray-400">
        <Box title="Overlay Map">
          <div className="max-w-md">
            <Visualizer exitMaps={[overworldExits, netherExits]} />
          </div>
        </Box>
        <Box title="Connections" className="border-t border-gray-400">
          <ConnectionList overworldExits={overworldExits} netherExits={netherExits} />
        </Box>
      </div>
    </div>
  </div>
}
