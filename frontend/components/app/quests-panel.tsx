"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ScrollIcon, CheckCircleIcon, CircleIcon, CaretDownIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface Quest {
  id?: string | number;
  title?: string;
  name?: string;
  description?: string;
  status?: string;
}

interface QuestsPanelProps {
  quests?: { active?: Quest[]; completed?: Quest[] } | null;
}

export function QuestsPanel({ quests }: QuestsPanelProps) {
  const active = quests?.active ?? [];
  const completed = quests?.completed ?? [];
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpanded = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pointer-events-auto relative w-64 rounded-lg border-2 border-border/40 bg-card/90 backdrop-blur-sm p-4 shadow-lg hover-lift parchment"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <ScrollIcon size={20} weight="duotone" className="text-primary" />
          <h3 className="text-lg font-bold text-foreground font-serif">Quests</h3>
        </div>
        <div className="flex items-center gap-2">
          {active.length > 0 && (
            <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary font-mono border border-primary/30 badge-pulse">
              {active.length}
            </span>
          )}
          <span className="text-xs text-muted-foreground font-mono">
            {completed.length} done
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {/* Active Quests */}
        {active.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-muted-foreground">
              <CircleIcon size={12} weight="duotone" className="text-primary" />
              <span>Active</span>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {active.map((q, i) => {
                const id = String(q.id ?? `active-${i}`);
                const title = q.title ?? q.name ?? "Untitled";
                return (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="rounded-md border border-primary/30 bg-primary/5 hover:bg-primary/10 p-3 transition-all cursor-pointer"
                    onClick={() => toggleExpanded(id)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <CircleIcon size={14} weight="bold" className="text-primary shrink-0" />
                          <h4 className="font-semibold text-sm text-foreground truncate">
                            {title}
                          </h4>
                        </div>
                        {q.status && q.status !== "active" && (
                          <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-secondary/20 text-secondary-foreground border border-secondary/30">
                            {q.status}
                          </span>
                        )}
                      </div>
                      <motion.div
                        animate={{ rotate: expanded[id] ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-muted-foreground"
                      >
                        <CaretDownIcon size={16} />
                      </motion.div>
                    </div>
                    <AnimatePresence>
                      {expanded[id] && (q.description || (q as any).description) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border/20 leading-relaxed">
                            {q.description ?? (q as any).description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Completed Quests */}
        {completed.length > 0 && (
          <div className={cn(active.length > 0 && "pt-3 border-t-2 border-border/30")}>
            <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-muted-foreground">
              <CheckCircleIcon size={12} weight="fill" className="text-green-500" />
              <span>Completed</span>
            </div>
            <div className="space-y-1 max-h-40 overflow-y-auto pr-2">
              {completed.map((q, i) => {
                const id = String(q.id ?? `completed-${i}`);
                const title = q.title ?? q.name ?? "Untitled";
                return (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: i * 0.05 }}
                    className="flex items-center gap-2 p-2 rounded-md bg-background/40 border border-border/20"
                  >
                    <CheckCircleIcon size={14} weight="fill" className="text-green-500 shrink-0" />
                    <span className="text-xs text-foreground truncate">{title}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {active.length === 0 && completed.length === 0 && (
          <div className="text-center py-6 text-sm italic text-muted-foreground">
            No quests yet
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default QuestsPanel;
