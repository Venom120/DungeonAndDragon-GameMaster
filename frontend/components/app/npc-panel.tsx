"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UsersIcon, SkullIcon, HeartIcon, MapPinIcon, CaretDownIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface NPC {
  role?: string;
  attitude?: string;
  alive?: boolean;
  location?: string;
  description?: string;
}

interface NPCPanelProps {
  npcs?: Record<string, NPC> | null;
}

export function NPCPanel({ npcs }: NPCPanelProps) {
  const npcList = npcs ? Object.entries(npcs) : [];
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpanded = (name: string) => {
    setExpanded(prev => ({ ...prev, [name]: !prev[name] }));
  };

  // Separate alive and dead NPCs
  const aliveNPCs = npcList.filter(([_, npc]) => npc.alive !== false);
  const deadNPCs = npcList.filter(([_, npc]) => npc.alive === false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="pointer-events-auto relative w-64 rounded-lg border-2 border-border/40 bg-card/90 backdrop-blur-sm p-4 shadow-lg hover-lift parchment"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <UsersIcon size={20} weight="duotone" className="text-primary" />
          <h3 className="text-lg font-bold text-foreground font-serif">NPCs</h3>
        </div>
        <div className="text-xs text-muted-foreground font-mono">
          {aliveNPCs.length} alive{deadNPCs.length > 0 && `, ${deadNPCs.length} fallen`}
        </div>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
        {npcList.length === 0 ? (
          <div className="text-sm text-muted-foreground italic text-center py-4">
            No known NPCs
          </div>
        ) : (
          <>
            {/* Alive NPCs */}
            {aliveNPCs.map(([name, npc], index) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="rounded-md border border-border/30 bg-background/40 hover:bg-background/60 p-3 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <HeartIcon size={14} weight="fill" className="text-green-500 shrink-0" />
                      <h4 className="font-semibold text-sm text-foreground truncate">{name}</h4>
                    </div>
                    {npc.role && (
                      <p className="text-xs text-muted-foreground mt-1">{npc.role}</p>
                    )}
                    {npc.attitude && (
                      <span className={cn(
                        "inline-block mt-1 text-xs px-2 py-0.5 rounded-full border",
                        npc.attitude === "friendly" && "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30",
                        npc.attitude === "hostile" && "bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30",
                        npc.attitude === "neutral" && "bg-gray-500/20 text-gray-600 dark:text-gray-400 border-gray-500/30"
                      )}>
                        {npc.attitude}
                      </span>
                    )}
                  </div>
                  <motion.button
                    onClick={() => toggleExpanded(name)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="ml-2 text-muted-foreground hover:text-foreground transition-colors shrink-0"
                  >
                    <CaretDownIcon
                      size={18}
                      className={cn(
                        "transition-transform duration-200",
                        expanded[name] && "rotate-180"
                      )}
                    />
                  </motion.button>
                </div>
                <AnimatePresence>
                  {expanded[name] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 pt-3 border-t border-border/30 space-y-1 text-xs">
                        {npc.location && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPinIcon size={12} className="shrink-0" />
                            <span>{npc.location}</span>
                          </div>
                        )}
                        {npc.description && (
                          <p className="text-muted-foreground italic leading-relaxed">
                            {npc.description}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            {/* Dead NPCs */}
            {deadNPCs.length > 0 && (
              <div className="pt-2 mt-2 border-t-2 border-border/30">
                <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                  <SkullIcon size={14} weight="fill" />
                  <span className="text-xs font-semibold">Fallen</span>
                </div>
                {deadNPCs.map(([name, npc]) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    className="rounded-md border border-border/20 bg-background/20 p-2 mb-1 opacity-60"
                  >
                    <div className="flex items-center gap-2">
                      <SkullIcon size={12} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground line-through">{name}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}

export default NPCPanel;