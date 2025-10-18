export const metadata = {
  title: "SolUPI App",
}

export default function AppPage() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center bg-black text-white">
      <div className="container text-center py-24">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Welcome to <span className="gradient-text">SolUPI</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          This is a placeholder for the trading app. We’ll wire the full order flow here next.
        </p>
      </div>
    </main>
  )
}
