"use client";

import React from "react";
import { motion } from "motion/react";
import { MapPinIcon, CompassIcon } from "@phosphor-icons/react";

interface Location {
  description?: string;
  paths?: string[];
  discovered?: boolean;
  [key: string]: any;
}

interface LocationsPanelProps {
  locations?: Record<string, Location> | null;
  currentLocation?: string;
}

export function LocationsPanel({ locations, currentLocation = "village" }: LocationsPanelProps) {
  const locationList = locations ? Object.entries(locations) : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="pointer-events-auto relative w-64 rounded-lg border-2 border-border/40 bg-card/90 backdrop-blur-sm p-4 shadow-lg hover-lift parchment"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <CompassIcon size={20} weight="duotone" className="text-primary" />
          <h3 className="text-lg font-bold text-foreground font-serif">Locations</h3>
        </div>
        <div className="text-xs text-muted-foreground font-mono">
          {locationList.length} known
        </div>
      </div>

      <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
        {locationList.length === 0 ? (
          <div className="text-sm text-muted-foreground italic text-center py-4">
            No locations discovered
          </div>
        ) : (
          locationList.map(([name, location], index) => {
            const isCurrent = name === currentLocation;
            return (
              <motion.div
                key={name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`
                  rounded-md border p-3 transition-all duration-200
                  ${isCurrent 
                    ? 'border-primary/60 bg-primary/10 shadow-md' 
                    : 'border-border/30 bg-background/40 hover:bg-background/60'
                  }
                `}
              >
                <div className="flex items-start gap-2">
                  <MapPinIcon 
                    size={16} 
                    weight={isCurrent ? "fill" : "regular"}
                    className={isCurrent ? "text-primary mt-0.5" : "text-muted-foreground mt-0.5"}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-semibold text-sm capitalize ${isCurrent ? 'text-primary' : 'text-foreground'}`}>
                        {name.replace(/_/g, ' ')}
                      </h4>
                      {isCurrent && (
                        <span className="text-xs text-primary font-mono badge-pulse">
                          Current
                        </span>
                      )}
                    </div>
                    {location.description && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {location.description}
                      </p>
                    )}
                    {location.paths && location.paths.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {location.paths.map((path) => (
                          <span
                            key={path}
                            className="text-xs px-2 py-0.5 rounded-full bg-secondary/20 text-secondary-foreground border border-secondary/30"
                          >
                            {path.replace(/_/g, ' ')}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </motion.div>
  );
}

export default LocationsPanel;
