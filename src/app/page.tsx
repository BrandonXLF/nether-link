'use client';

import Portal from "@/classes/Portal";
import CompResult from "@/components/comp-result";
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

    <div className="flex">
      <div>
        <h2 className="text-lg font-semibold mt-4">Overworld Links</h2>
        {overworldExits.map(exit => <CompResult key={exit.from.uuid} exitInfo={exit} />)}

        <h2 className="text-lg font-semibold mt-4">Nether Links</h2>
        {netherExits.map(exit => <CompResult key={exit.from.uuid} exitInfo={exit} />)}
      </div>
      <Visualizer exitLists={[overworldExits, netherExits]} />
    </div>

    <div>
      <h2 className="text-lg font-semibold mt-4">Manage Portals</h2>
      <h3 className="text-md font-semibold mt-4">Overworld Portals</h3>
      {!loaded
        ? 'Loading...'
        : <PortalList portals={overworld} portalsChanged={setOverworld} isNether={false} />}

      <h3 className="text-md font-semibold mt-4">Nether Portals</h3>
      {!loaded
        ? 'Loading...'
        : <PortalList portals={nether} portalsChanged={setNether} isNether={true} />}
    </div>
  </div>
}
