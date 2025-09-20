"use client";
import { useState } from "react";
import EmblemPicker from "./components/EmblemPicker";

const styles = [
  { id: "deja", label: "Deja" },
  { id: "lexy", label: "Lexy" },
  { id: "king", label: "KING" },
  { id: "jhon", label: "JHON" },
  { id: "jwae", label: "JWAE" },
  { id: "neiko", label: "NEIKO" }
] as const;

export default function NameBuilder() {
  const [name, setName] = useState("");
  const [style, setStyle] = useState<string | null>(styles[0].id);
  const [emblem, setEmblem] = useState<string | null>(null);
  const [twoTone, setTwoTone] = useState(false);
  const [primary, setPrimary] = useState<"yg" | "rg" | "wg">("yg");
  const [secondary, setSecondary] = useState<"yg" | "rg" | "wg">("wg");

  return (
    <main className="mx-auto max-w-5xl p-6">
      <div className="card p-6">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="your name…"
          className="w-full rounded-xl bg-neutral-900/80 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
        />

        <h2 className="mt-6 text-xl opacity-90">Choose Style</h2>
        <div className="mt-3 grid grid-cols-3 md:grid-cols-6 gap-3">
          {styles.map(s => (
            <button
              key={s.id}
              onClick={() => setStyle(s.id)}
              className={`rounded-xl px-3 py-2 bg-neutral-900/80 border border-white/10 hover:border-white/30 transition ${style === s.id ? "outline outline-2 outline-blue-400" : ""}`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <h2 className="mt-8 text-xl opacity-90">Emblem</h2>
        <div className="mt-3">
          <EmblemPicker selected={emblem} onSelect={setEmblem} />
        </div>

        <h2 className="mt-8 text-xl opacity-90">Gold Color</h2>
        <div className="mt-2 flex items-center gap-3">
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" checked={twoTone} onChange={e => setTwoTone(e.target.checked)} />
            two tone
          </label>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-6">
          <div>
            <div className="text-sm opacity-70 mb-2">Primary</div>
            <div className="flex gap-2">
              {(["yg", "rg", "wg"] as const).map(c => (
                <button
                  key={c}
                  onClick={() => setPrimary(c)}
                  className={`h-9 min-w-24 rounded-lg border border-white/10 bg-neutral-900/80 capitalize ${primary === c ? "outline outline-2 outline-blue-400" : ""}`}
                >
                  {c === "yg" ? "Yellow gold" : c === "rg" ? "Rose gold" : "White gold"}
                </button>
              ))}
            </div>
          </div>
          <div className={twoTone ? "" : "opacity-40 pointer-events-none"}>
            <div className="text-sm opacity-70 mb-2">Secondary</div>
            <div className="flex gap-2">
              {(["yg", "rg", "wg"] as const).map(c => (
                <button
                  key={c}
                  onClick={() => setSecondary(c)}
                  className={`h-9 min-w-24 rounded-lg border border-white/10 bg-neutral-900/80 capitalize ${secondary === c ? "outline outline-2 outline-blue-400" : ""}`}
                >
                  {c === "yg" ? "Yellow gold" : c === "rg" ? "Rose gold" : "White gold"}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button className="rounded-xl bg-white/10 px-4 py-2 border border-white/20 hover:bg-white/15">draft</button>
          <button className="rounded-xl bg-blue-600 px-4 py-2 hover:bg-blue-500">accept</button>
        </div>
      </div>
    </main>
  );
}
