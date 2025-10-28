'use client';

export default function SectionSkeleton() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="h-8 w-64 bg-white/10 rounded mb-6 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-40 rounded-xl bg-white/5 animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  );
}
