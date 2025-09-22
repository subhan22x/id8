﻿"use client";
import React from "react";
import Image from "next/image";
import { emblems } from "@/lib/assets";

type Props = {
  selected: string | null;
  onSelect: (id: string | null) => void;
  disabled?: boolean;
};

export default function EmblemPicker({ selected, onSelect, disabled = false }: Props) {
  // Toggle layout for the 3+2 emblem grid; adjust spacing or ordering here if the mock changes.
  const topRow = emblems.slice(0, 3);
  const bottomRow = emblems.slice(3);

  return (
    <div className={disabled ? "pointer-events-none opacity-40" : ""}>
      <div className="flex justify-center gap-2 sm:gap-4">
        {topRow.map(asset => (
          <EmblemDiamond
            key={asset.id}
            assetId={asset.id}
            label={asset.label}
            src={asset.src}
            active={selected === asset.id}
            onSelect={onSelect}
          />
        ))}
      </div>
      <div className="mt-3 flex justify-center gap-2 sm:mt-4 sm:gap-4">
        <div className="mr-9 sm:mr-12" />
        {bottomRow.map(asset => (
          <EmblemDiamond
            key={asset.id}
            assetId={asset.id}
            label={asset.label}
            src={asset.src}
            active={selected === asset.id}
            onSelect={onSelect}
          />
        ))}
        <div className="ml-9 sm:ml-12" />
      </div>
    </div>
  );
}

type EmblemDiamondProps = {
  assetId: string;
  label: string;
  src: string;
  active: boolean;
  onSelect: (id: string | null) => void;
};

function EmblemDiamond({ assetId, label, src, active, onSelect }: EmblemDiamondProps) {
  // Single emblem tile: update sizes, shadows, or outline treatment here.
  const handleClick = () => {
    onSelect(active ? null : assetId);
  };

  return (
    <button
      type="button"
      title={label}
      aria-pressed={active}
      onClick={handleClick}
      className={`group relative flex h-28 w-28 items-center justify-center rounded-[30px] p-3 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 sm:h-32 sm:w-32`}
    >
      <span className="absolute inset-0 flex items-center justify-center">
        <span
          className={`inline-flex h-full w-full rotate-45 items-center justify-center rounded-[14px] bg-gradient-to-b from-black/80 via-black/85 to-black/60 shadow-[0_16px_28px_rgba(0,0,0,0.55)] transition ${active ? "shadow-[0_20px_40px_rgba(59,130,246,0.45)]" : ""}`}
        />
        {active && (
          <span className="absolute -inset-1 rotate-45 rounded-[18px] border-[3px] border-blue-400" aria-hidden />
        )}
      </span>
      <span className="relative flex h-[90%] w-[90%] items-center justify-center">
        <Image src={src} alt={label} fill sizes="(max-width: 480px) 160px, 176px" className="object-contain" />
      </span>
    </button>
  );
}
