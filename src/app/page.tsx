'use client';

import Portal from "@/classes/Portal";
import ConnectionList from "@/components/connection-list";
import Heading from "@/components/heading";
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
    <div className="flex-1">
      <Heading>Overworld Portals</Heading>
      {!loaded
        ? 'Loading...'
        : <PortalList portals={overworld} getExits={() => overworldExits.values()} portalsChanged={setOverworld} isNether={false} />}

      <Heading>Nether Portals</Heading>
      {!loaded
        ? 'Loading...'
        : <PortalList portals={nether} getExits={() => netherExits.values()} portalsChanged={setNether} isNether={true} />}
    </div>
    <div className="flex-0">
      <Heading>Overlay Map</Heading>
      <Visualizer exitMaps={[overworldExits, netherExits]} />
      <Heading>Connections</Heading>
      <ConnectionList overworldExits={overworldExits} netherExits={netherExits} />
    </div>
  </div>
}
