export default function Header() {
  return (
    <header className="hn-orange shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center font-bold text-[#ff6600]">
            HN
          </div>
          <h1 className="text-white text-xl font-bold">Hacker News</h1>
        </div>
      </div>
    </header>
  );
}