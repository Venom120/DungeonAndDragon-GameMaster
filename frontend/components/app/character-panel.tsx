"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UserIcon, HeartIcon, SwordIcon, BackpackIcon, XIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface AttributeMap {
  [key: string]: number | string;
}

interface PlayerDetails {
  level?: number;
  xp?: number;
  bio?: string;
  [key: string]: any;
}

interface InventoryItem {
  name: string;
  qty?: number;
  desc?: string;
  durability?: number;
  weight?: number;
  value?: number;
  type?: string;
  damage?: string;
  armor_class?: number;
  properties?: string[];
}

interface PlayerState {
  name: string;
  class?: string;
  hp: number;
  status?: string;
  attributes?: AttributeMap;
  inventory?: InventoryItem[];
  details?: PlayerDetails;
}

interface CharacterPanelProps {
  player?: PlayerState;
}

export function CharacterPanel({ player }: CharacterPanelProps) {
  const p: PlayerState = player ?? {
    name: 'Adventurer',
    hp: 0,
    status: 'Unknown',
    inventory: [],
    attributes: {},
    details: {},
  };

  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const maxHp = 100; // Could be dynamic based on player data
  const hpPercentage = (p.hp / maxHp) * 100;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pointer-events-auto relative w-72 rounded-lg border-2 border-border/40 bg-card/90 backdrop-blur-sm p-5 shadow-xl parchment hover-lift"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4 pb-3 border-b border-border/30">
          <div className="flex items-center gap-2">
            <UserIcon size={24} weight="duotone" className="text-primary" />
            <div>
              <h3 className="text-xl font-bold text-foreground font-serif">{p.name}</h3>
              <p className="text-sm text-muted-foreground">{p.class}</p>
            </div>
          </div>
          {p.details?.level && (
            <div className="text-center px-3 py-1 rounded-full bg-secondary/20 border border-secondary/40">
              <span className="text-xs text-secondary-foreground font-bold">LV {p.details.level}</span>
            </div>
          )}
        </div>

        {/* Bio */}
        {p.details?.bio && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-4 text-xs italic text-muted-foreground p-2 rounded bg-background/30 border-l-2 border-primary/40"
          >
            {p.details.bio}
          </motion.div>
        )}

        {/* HP Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <HeartIcon size={18} weight="fill" className="text-red-500" />
              <span className="text-sm font-semibold text-foreground">Health</span>
            </div>
            <span className="text-sm font-bold font-mono">
              <span className={cn(
                "transition-colors",
                p.hp <= 25 ? "text-red-500 animate-pulse" : "text-foreground"
              )}>
                {p.hp}
              </span>
              <span className="text-muted-foreground"> / {maxHp}</span>
            </span>
          </div>
          <div className="h-3 rounded-full bg-background/50 border border-border/30 overflow-hidden">
            <motion.div
              className={cn(
                "h-full hp-bar rounded-full",
                p.hp <= 25 && "animate-pulse"
              )}
              initial={{ width: 0 }}
              animate={{ width: `${hpPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <div className="mt-1 text-xs text-center">
            <span className={cn(
              "font-medium",
              p.status === "Healthy" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            )}>
              {p.status}
            </span>
          </div>
        </div>

        {/* XP Progress (if applicable) */}
        {p.details?.xp !== undefined && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-4"
          >
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Experience</span>
              <span className="font-mono text-foreground">{p.details.xp} XP</span>
            </div>
            <div className="h-2 rounded-full bg-background/50 border border-border/30 overflow-hidden">
              <div className="h-full bg-linear-to-r from-secondary to-gold" style={{ width: '60%' }} />
            </div>
          </motion.div>
        )}

        {/* Attributes */}
        {Object.keys(p.attributes || {}).length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <SwordIcon size={16} weight="duotone" className="text-primary" />
              <h4 className="text-sm font-semibold text-foreground">Attributes</h4>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(p.attributes || {}).sort().map(([key, value]) => (
                <motion.div
                  key={key}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-2 rounded bg-background/40 border border-border/30"
                >
                  <div className="text-xs text-muted-foreground truncate">{key}</div>
                  <div className="text-lg font-bold font-mono text-foreground">{value}</div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Inventory */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <BackpackIcon size={16} weight="duotone" className="text-primary" />
            <h4 className="text-sm font-semibold text-foreground">Inventory</h4>
            <span className="text-xs text-muted-foreground">
              ({p.inventory?.length || 0})
            </span>
          </div>
          {(!p.inventory || p.inventory.length === 0) ? (
            <div className="text-center py-4 text-sm italic text-muted-foreground">
              Empty
            </div>
          ) : (
            <div className="space-y-1 max-h-48 overflow-y-auto pr-2">
              {p.inventory!.map((item, i) => (
                <motion.button
                  key={i}
                  onClick={() => setSelectedItem(item)}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "w-full flex items-center justify-between p-2 rounded text-left",
                    "bg-background/40 hover:bg-background/60 border border-border/30",
                    "transition-colors cursor-pointer group"
                  )}
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {item.name}
                    </span>
                    {item.durability !== undefined && item.durability < 100 && (
                      <div className="mt-1 h-1 rounded-full bg-background/50 overflow-hidden">
                        <div 
                          className={cn(
                            "h-full transition-all",
                            item.durability > 50 ? "bg-green-500" : 
                            item.durability > 25 ? "bg-yellow-500" : "bg-red-500"
                          )}
                          style={{ width: `${item.durability}%` }}
                        />
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-mono text-muted-foreground ml-2">
                    ×{item.qty || 1}
                  </span>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Item Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-9999 p-4 pointer-events-auto"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-card border-2 border-border/50 rounded-lg p-6 max-w-md w-full parchment shadow-2xl pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-foreground font-serif magic-glow-text">
                    {selectedItem.name}
                  </h4>
                  {selectedItem.type && (
                    <span className="inline-block mt-1 text-xs px-2 py-1 rounded bg-primary/20 text-primary border border-primary/30">
                      {selectedItem.type}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer pointer-events-auto shrink-0"
                >
                  <XIcon size={24} />
                </button>
              </div>

              {selectedItem.desc && (
                <p className="text-sm text-muted-foreground mb-4 italic leading-relaxed">
                  {selectedItem.desc}
                </p>
              )}

              <div className="space-y-2 text-sm">
                {selectedItem.qty !== undefined && (
                  <div className="flex justify-between py-1 border-b border-border/30">
                    <span className="text-muted-foreground">Quantity</span>
                    <span className="font-mono font-semibold text-foreground">{selectedItem.qty}</span>
                  </div>
                )}
                {selectedItem.durability !== undefined && (
                  <div className="flex justify-between py-1 border-b border-border/30">
                    <span className="text-muted-foreground">Durability</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 rounded-full bg-background/50 overflow-hidden">
                        <div 
                          className={cn(
                            "h-full transition-all",
                            selectedItem.durability > 50 ? "bg-green-500" : 
                            selectedItem.durability > 25 ? "bg-yellow-500" : "bg-red-500"
                          )}
                          style={{ width: `${selectedItem.durability}%` }}
                        />
                      </div>
                      <span className="font-mono font-semibold text-foreground">
                        {selectedItem.durability}%
                      </span>
                    </div>
                  </div>
                )}
                {selectedItem.weight !== undefined && (
                  <div className="flex justify-between py-1 border-b border-border/30">
                    <span className="text-muted-foreground">Weight</span>
                    <span className="font-mono font-semibold text-foreground">{selectedItem.weight} lbs</span>
                  </div>
                )}
                {selectedItem.value !== undefined && (
                  <div className="flex justify-between py-1 border-b border-border/30">
                    <span className="text-muted-foreground">Value</span>
                    <span className="font-mono font-semibold text-gold">{selectedItem.value} GP</span>
                  </div>
                )}
                {selectedItem.damage && (
                  <div className="flex justify-between py-1 border-b border-border/30">
                    <span className="text-muted-foreground">Damage</span>
                    <span className="font-mono font-semibold text-red-500">{selectedItem.damage}</span>
                  </div>
                )}
                {selectedItem.armor_class !== undefined && (
                  <div className="flex justify-between py-1 border-b border-border/30">
                    <span className="text-muted-foreground">Armor Class</span>
                    <span className="font-mono font-semibold text-foreground">+{selectedItem.armor_class}</span>
                  </div>
                )}
                {selectedItem.properties && selectedItem.properties.length > 0 && (
                  <div className="py-1">
                    <span className="text-muted-foreground">Properties</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedItem.properties.map((prop, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 rounded-full bg-secondary/20 text-secondary-foreground border border-secondary/30"
                        >
                          {prop}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default CharacterPanel;
