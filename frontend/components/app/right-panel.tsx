"use client";

import React from "react";
import CharacterPanel from "./character-panel";
import LocationsPanel from "./locations-panel";

interface RightPanelProps {
  player?: any;
  locations?: any;
}

export function RightPanel({ player, locations }: RightPanelProps) {
  return (
    <div className="flex flex-col space-y-4 p-4">
      <CharacterPanel player={player} />
      <LocationsPanel locations={locations} />
    </div>
  );
}

export default RightPanel;