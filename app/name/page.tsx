"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import EmblemPicker from "./components/EmblemPicker";
import { pendantStyles, type PendantStyle } from "@/lib/assets";

type GoldTone = "yg" | "rg" | "wg";
type Step = 0 | 1 | 2;

const stepLabels: readonly string[] = ["Name 1", "Name 2", "Name 3"];

const goldToneMeta: Record<GoldTone, { label: string; from: string; to: string }> = {
  yg: { label: "Yellow gold", from: "#F8DC8B", to: "#C78A29" },
  rg: { label: "Rose gold", from: "#F4C1B0", to: "#B66344" },
  wg: { label: "White gold", from: "#F6F7FA", to: "#A4AEBC" }
};

const pendantColumns: PendantStyle[][] = pendantStyles.reduce((columns, style, index) => {
  if (index % 2 === 0) {
    columns.push([style]);
  } else {
    const last = columns[columns.length - 1];
    if (last) {
      last.push(style);
    }
  }
  return columns;
}, [] as PendantStyle[][]);

export default function NameBuilder() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(0);
  const [lines, setLines] = useState<string[]>([""]);
  const [styleId, setStyleId] = useState<string>(pendantStyles[0]?.id ?? "");
  const [includeEmblem, setIncludeEmblem] = useState(true);
  const [emblemId, setEmblemId] = useState<string | null>(null);
  const [goldMode, setGoldMode] = useState<"solid" | "twoTone">("solid");
  const [primaryTone, setPrimaryTone] = useState<GoldTone>("yg");
  const [secondaryTone, setSecondaryTone] = useState<GoldTone>("rg");
  const [diamondQuality, setDiamondQuality] = useState<"vs" | "vvs">("vvs");

  const activeStyle = pendantStyles.find(style => style.id === styleId) ?? pendantStyles[0];

  const canAddLine = lines.length < 2;
  const secondaryDisabled = goldMode === "solid";
  const hasPrimaryName = lines[0]?.trim().length > 0;

  const updateLine = (value: string, index: number) => {
    setLines(prev => prev.map((entry, idx) => (idx === index ? value : entry)));
  };

  const addLine = () => {
    if (canAddLine) {
      setLines(prev => [...prev, ""]);
    }
  };

  const removeLine = (index: number) => {
    setLines(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleBack = () => {
    if (step === 0) {
      router.push("/");
      return;
    }
    setStep(prev => ((prev - 1) as Step));
  };

  const handleNext = () => {
    if (step === 0 && !hasPrimaryName) {
      return;
    }
    if (step < stepLabels.length - 1) {
      setStep(prev => ((prev + 1) as Step));
    }
  };

  const isNextDisabled = step === 0 && !hasPrimaryName;

  return (
    <main className="min-h-dvh px-4 py-10 text-white md:px-8">
      <div className="mx-auto flex min-h-[70vh] w-full max-w-4xl flex-col px-4 pb-12 pt-10 sm:px-6 md:px-12">
        <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col">
          <button
            type="button"
            onClick={handleBack}
            className="mb-6 flex w-fit items-center gap-2 rounded-full border border-white/20 bg-black/35 px-4 py-2 text-sm uppercase tracking-wide transition hover:border-white/45"
          >
            back
          </button>

          <header>
            <p className="text-xs uppercase tracking-[0.35em] text-white/70">{stepLabels[step]}</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-[2.25rem]">Dream it first</h1>
            <p
              className="mt-1 text-2xl italic text-white/90"
              style={{ fontFamily: "var(--font-nostalgic)" }}
            >
              we&apos;ll build it.
            </p>
          </header>

          <section className="mt-8 flex-1">
            {step === 0 && (
              <div className="space-y-7">
                <div>
                  <label className="text-sm font-medium tracking-wide text-white/70">Your name</label>
                  <div className="mt-3 space-y-3">
                    {lines.map((value, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <input
                          value={value}
                          onChange={event => updateLine(event.target.value, index)}
                          placeholder={index === 0 ? "your name..." : "add another line"}
                          className="flex-1 rounded-2xl border border-white/15 bg-black/45 px-4 py-3 text-base outline-none transition focus:border-white/40"
                        />
                        <div className="flex items-center gap-2">
                          {lines.length > 1 && index > 0 && (
                            <button
                              type="button"
                              onClick={() => removeLine(index)}
                              className="h-11 w-11 rounded-2xl border border-white/15 bg-black/60 text-2xl font-semibold leading-none text-white/80 transition hover:border-white/40"
                              aria-label="Remove name line"
                            >
                              -
                            </button>
                          )}
                          {index === lines.length - 1 && canAddLine && (
                            <button
                              type="button"
                              onClick={addLine}
                              className="h-11 w-11 rounded-2xl border border-white/15 bg-black/60 text-2xl font-semibold leading-none text-white/80 transition hover:border-white/40"
                              aria-label="Add another line"
                            >
                              +
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold">Choose Style</h2>
                  <p className="mt-1 text-sm text-white/60">Swipe through to explore different pendant looks.</p>
                  <div className="mt-4 -mx-1 overflow-x-auto pb-2">
                    <div className="flex snap-x snap-mandatory gap-3 px-1">
                      {pendantColumns.map((column, columnIndex) => (
                        <div key={columnIndex} className="grid min-w-[164px] grid-rows-2 gap-3 snap-start">
                          {column.map(style => {
                            const isActive = style.id === styleId;
                            return (
                              <button
                                key={style.id}
                                onClick={() => setStyleId(style.id)}
                                type="button"
                                className={`group relative h-36 w-full overflow-hidden rounded-[30px] border border-white/15 bg-black/40 transition hover:border-white/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 ${isActive ? "border-[3px] border-blue-400 shadow-[0_0_0_2px_rgba(0,120,255,0.35)]" : ""}`}
                                aria-pressed={isActive}
                              >
                                <Image
                                  src={style.src}
                                  alt={`${style.label} pendant style`}
                                  fill
                                  sizes="(max-width: 640px) 160px, 200px"
                                  className="object-cover object-center transition duration-500 group-hover:scale-105"
                                />
                                <span className="pointer-events-none absolute inset-0 rounded-[30px] border border-white/12 bg-gradient-to-b from-transparent via-transparent to-black/35" aria-hidden />
                              </button>
                            );
                          })}
                          {column.length === 1 && (
                            <div className="h-36 w-full rounded-[30px] border border-transparent" aria-hidden />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">Emblem</h2>
                    <p className="text-sm text-white/60">Add a symbol on top of the pendant where the chain loops through.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIncludeEmblem(value => !value)}
                    className={`relative h-7 w-12 rounded-full border border-white/15 transition ${includeEmblem ? "bg-blue-500/80" : "bg-black/50"}`}
                    aria-pressed={includeEmblem}
                    aria-label="Toggle emblem"
                  >
                    <span
                      className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white transition ${includeEmblem ? "left-6" : "left-1"}`}
                    />
                  </button>
                </div>

                <EmblemPicker
                  selected={includeEmblem ? emblemId : null}
                  onSelect={setEmblemId}
                  disabled={!includeEmblem}
                />

                <div>
                  <h2 className="text-lg font-semibold text-center">Gold Color</h2>
                  <div className="mt-4 flex justify-center gap-3">
                    {(["solid", "twoTone"] as const).map(mode => {
                      const isActive = goldMode === mode;
                      return (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setGoldMode(mode)}
                          className={`min-w-[96px] rounded-2xl border border-white/15 px-4 py-2 text-sm capitalize transition hover:border-white/35 ${isActive ? "border-[3px] border-blue-400 bg-blue-500/20" : "bg-black/45"}`}
                        >
                          {mode === "twoTone" ? "two tone" : mode}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-6">
                    <ToneSelector
                      label="Primary"
                      value={primaryTone}
                      onChange={setPrimaryTone}
                    />
                    <ToneSelector
                      label="Secondary"
                      value={secondaryTone}
                      onChange={setSecondaryTone}
                      disabled={secondaryDisabled}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-lg font-semibold">Diamond Quality</h2>
                  <div className="mt-4 flex gap-3">
                    {(["vs", "vvs"] as const).map(option => {
                      const isActive = diamondQuality === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setDiamondQuality(option)}
                          className={`min-w-[72px] rounded-2xl border border-white/15 px-4 py-2 text-lg uppercase transition hover:border-white/35 ${isActive ? "border-[3px] border-blue-400 bg-blue-500/15" : "bg-black/45"}`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-[0.35em] text-white/60">Drafting your imagination...</h3>
                  <div className="mt-4 rounded-3xl border border-white/12 bg-black/50 p-4">
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-black/70">
                      {activeStyle && (
                        <Image
                          src={activeStyle.src}
                          alt={`${activeStyle.label} preview`}
                          fill
                          sizes="(max-width: 640px) 220px, 360px"
                          className="object-cover"
                          priority={false}
                        />
                      )}
                    </div>
                    <dl className="mt-4 space-y-2 text-sm text-white/60">
                      <div className="flex justify-between">
                        <dt>Name</dt>
                        <dd className="font-medium text-white/90">{lines.filter(Boolean).join(" ") || "Your idea"}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>Style</dt>
                        <dd className="font-medium text-white/90">{activeStyle?.label}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>Gold</dt>
                        <dd className="font-medium text-white/90">
                          {goldToneMeta[primaryTone].label}
                          {goldMode === "twoTone" ? ` + ${goldToneMeta[secondaryTone].label}` : ""}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>Diamond</dt>
                        <dd className="font-medium text-white/90">{diamondQuality.toUpperCase()}</dd>
                      </div>
                    </dl>
                  </div>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => setStep(0)}
                      className="flex-1 rounded-2xl border border-white/15 bg-black/45 px-5 py-3 text-base font-medium transition hover:border-white/35"
                    >
                      edit
                    </button>
                    <button
                      type="button"
                      className="flex-1 rounded-2xl bg-blue-500 px-5 py-3 text-base font-semibold text-white transition hover:bg-blue-400"
                    >
                      accept
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>

          <footer className="mt-12 flex items-center justify-between">
            <span className="w-16" aria-hidden />

            <div className="flex items-center justify-center gap-2">
              {stepLabels.map((_, index) => (
                <span
                  key={index}
                  className={`h-2.5 w-2.5 rounded-full transition ${index === step ? "bg-blue-400" : "bg-white/25"}`}
                />
              ))}
            </div>

            {step < stepLabels.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={isNextDisabled}
                aria-disabled={isNextDisabled}
                className={`rounded-full border px-4 py-2 text-sm uppercase tracking-wide transition ${isNextDisabled ? "cursor-not-allowed border-white/20 bg-white/5 text-white/40" : "border-blue-500 bg-blue-500/20 text-blue-100 hover:bg-blue-500/30"}`}
              >
                next
              </button>
            ) : (
              <span className="w-16" aria-hidden />
            )}
          </footer>
        </div>
      </div>
    </main>
  );
}

function ToneSelector({
  label,
  value,
  onChange,
  disabled = false
}: {
  label: string;
  value: GoldTone;
  onChange: (tone: GoldTone) => void;
  disabled?: boolean;
}) {
  return (
    <div className={disabled ? "opacity-40" : ""}>
      <p className="text-sm uppercase tracking-[0.3em] text-white/60">{label}</p>
      <div className="mt-3 flex gap-3">
        {(Object.keys(goldToneMeta) as GoldTone[]).map(option => {
          const meta = goldToneMeta[option];
          const isActive = value === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => !disabled && onChange(option)}
              className={`flex min-w-[96px] flex-col items-center gap-2 rounded-2xl border border-white/15 px-3 py-3 text-xs font-medium uppercase tracking-wide transition hover:border-white/35 ${isActive ? "border-[3px] border-blue-400 bg-blue-500/15" : "bg-black/45"}`}
            >
              <span
                className="h-10 w-full rounded-2xl"
                style={{
                  background: `linear-gradient(180deg, ${meta.from} 0%, ${meta.to} 100%)`
                }}
              />
              {meta.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}