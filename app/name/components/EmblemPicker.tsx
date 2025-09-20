"use client";
import React from "react";
import { emblems } from "@/lib/assets";

export default function EmblemPicker({
  selected,
  onSelect
}: { selected: string | null; onSelect: (id: string | null) => void }) {
  return (
    <div className="grid grid-cols-5 gap-3">
      {emblems.map(e => (
        <button
          key={e.id}
          onClick={() => onSelect(selected === e.id ? null : e.id)}
          className={`rounded-xl p-2 bg-neutral-900/80 border border-white/10 hover:border-white/30 transition ${selected === e.id ? "outline outline-2 outline-blue-400" : ""}`}
          title={e.label}
        >
          <img src={e.src} alt={e.label} className="w-full h-20 object-contain" />
        </button>
      ))}
    </div>
  );
}
