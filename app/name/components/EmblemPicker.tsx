"use client";
import React from "react";
import Image from "next/image";
import { emblems } from "@/lib/assets";

type Props = {
  selected: string | null;
  onSelect: (id: string | null) => void;
  disabled?: boolean;
};

export default function EmblemPicker({ selected, onSelect, disabled = false }: Props) {
  return (
    <div className={`grid grid-cols-4 gap-3 ${disabled ? "pointer-events-none opacity-40" : ""}`}>
      {emblems.map(asset => {
        const isActive = selected === asset.id;
        return (
          <button
            key={asset.id}
            onClick={() => onSelect(isActive ? null : asset.id)}
            className={`rounded-2xl border border-white/15 bg-black/40 p-2 transition hover:border-white/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 ${isActive ? "border-[3px] border-blue-400" : ""}`}
            title={asset.label}
            type="button"
            aria-pressed={isActive}
          >
            <div className="relative mx-auto h-16 w-full max-w-[72px]">
              <Image
                src={asset.src}
                alt={asset.label}
                fill
                sizes="(max-width: 480px) 72px, 96px"
                className="object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.7)]"
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}