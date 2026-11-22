import { Dumbbell } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-ink-950/80 backdrop-blur-lg border-b border-ink-700">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-lg bg-ember-500 flex items-center justify-center">
            <Dumbbell className="w-5 h-5 text-ink-950" />
          </span>
          <span className="font-display text-lg text-white tracking-wide">
            IRON<span className="text-ember-400">CORE</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
          <a href="#plans" className="hover:text-ember-400 transition-colors">Plans</a>
          <a href="#calculator" className="hover:text-ember-400 transition-colors">Calculator</a>
          <a href="#join" className="hover:text-ember-400 transition-colors">Contact</a>
        </div>

        <a
          href="#calculator"
          className="px-5 py-2.5 rounded-lg bg-ember-500 hover:bg-ember-400 text-ink-950 font-bold text-sm transition-colors"
        >
          Join Now
        </a>
      </div>
    </nav>
  );
}
