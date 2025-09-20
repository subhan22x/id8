export default function Page() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <section className="card p-8">
        <h1 className="text-4xl font-bold" style={{ fontFamily: "var(--font-figtree)" }}>
          Dream it first
        </h1>
        <p className="mt-2 text-2xl italic" style={{ fontFamily: "var(--font-nostalgic)" }}>
          we’ll build it.
        </p>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href="/name" className="card p-6 hover:opacity-90 transition">
            <div className="h-24 w-full bg-neutral-900 rounded-lg mb-3" />
            <div className="text-sm opacity-80">name/initials</div>
          </a>
          <div className="card p-6 opacity-40"><div className="h-24 w-full bg-neutral-900 rounded-lg mb-3" />logo</div>
          <div className="card p-6 opacity-40"><div className="h-24 w-full bg-neutral-900 rounded-lg mb-3" />picture pendants</div>
          <div className="card p-6 opacity-40"><div className="h-24 w-full bg-neutral-900 rounded-lg mb-3" />custom design</div>
        </div>
      </section>
    </main>
  );
}
