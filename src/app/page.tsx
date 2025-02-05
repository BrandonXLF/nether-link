'use client';

import Portal from "@/classes/Portal";
import ConnectionList from "@/components/connection-list";
import Mapping from "@/components/mapping";
import PortalList from "@/components/portal-list";
import Visualizer from "@/components/visualizer";
import StoredPortal from "@/types/stored-portal";
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
    <h1 className="text-3xl font-semibold mb-8">Nether Link</h1>

    <div className="flex w-full max-lg:flex-col">
      <div className="flex-1">
        <h2 className="text-lg font-semibold mt-4">Overworld Portals</h2>
        {!loaded
          ? 'Loading...'
          : <PortalList portals={overworld} getExits={() => overworldExits.values()} portalsChanged={setOverworld} isNether={false} />}

        <h2 className="text-lg font-semibold mt-4">Nether Portals</h2>
        {!loaded
          ? 'Loading...'
          : <PortalList portals={nether} getExits={() => netherExits.values()} portalsChanged={setNether} isNether={true} />}
      </div>
      <div className="flex-0">
        <h2 className="text-lg font-semibold mt-4">Overlay Map</h2>
        <Visualizer exitMaps={[overworldExits, netherExits]} />
        <h2 className="text-lg font-semibold mt-4">Connections</h2>
        <ConnectionList overworldExits={overworldExits} netherExits={netherExits} />
      </div>
    </div>
  </div>
}
