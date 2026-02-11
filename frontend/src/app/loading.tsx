export default function GlobalLoading() {
  return (
    <main className="min-h-screen pt-28 pb-16 px-6">
      <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
        <div className="h-4 w-44 rounded-full bg-surface-3/70" />
        <div className="h-16 w-full max-w-3xl rounded-2xl bg-surface-2/65" />
        <div className="h-6 w-full max-w-2xl rounded-xl bg-surface-2/50" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
          <div className="h-72 rounded-3xl bg-surface-2/60 border border-stroke-subtle" />
          <div className="h-72 rounded-3xl bg-surface-2/60 border border-stroke-subtle" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="h-28 rounded-2xl bg-surface-2/50 border border-stroke-subtle" />
          <div className="h-28 rounded-2xl bg-surface-2/50 border border-stroke-subtle" />
          <div className="h-28 rounded-2xl bg-surface-2/50 border border-stroke-subtle" />
        </div>
      </div>
    </main>
  );
}
