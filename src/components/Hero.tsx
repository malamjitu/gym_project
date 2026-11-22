import { Dumbbell, Flame, Users, Clock, ChevronDown } from 'lucide-react';

const stats = [
  { icon: Users, value: '2,400+', label: 'Active Members' },
  { icon: Dumbbell, value: '150+', label: 'Equipment Stations' },
  { icon: Clock, value: '24/7', label: 'Open Every Day' },
  { icon: Flame, value: '40+', label: 'Weekly Classes' },
];

export default function Hero() {
  return (
    <header className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at center, rgba(10,10,11,0.55) 0%, rgba(10,10,11,0.92) 75%), url(https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6 pt-40 pb-24">
        <p className="text-ember-400 font-semibold tracking-[0.3em] uppercase text-sm mb-6">
          IronCore Fitness Club
        </p>
        <h1 className="font-display text-5xl md:text-7xl leading-[1.05] text-white max-w-3xl">
          Train Hard.
          <span className="block text-ember-400">Live Strong.</span>
        </h1>
        <p className="mt-6 text-lg text-neutral-300 max-w-xl leading-relaxed">
          Pakistan's most complete training facility — strength zones, cardio
          decks, personal coaching and classes that actually push you.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#calculator"
            className="px-8 py-4 rounded-lg bg-ember-500 hover:bg-ember-400 text-ink-950 font-bold transition-all hover:shadow-lg hover:shadow-ember-500/25 hover:-translate-y-0.5"
          >
            Calculate Membership
          </a>
          <a
            href="#plans"
            className="px-8 py-4 rounded-lg border border-neutral-600 hover:border-ember-400 hover:text-ember-300 text-neutral-200 font-semibold transition-colors"
          >
            View Plans
          </a>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="bg-ink-900/70 backdrop-blur border border-ink-700 rounded-xl p-5 hover:border-ember-500/50 transition-colors"
            >
              <Icon className="w-6 h-6 text-ember-400 mb-3" />
              <p className="font-display text-2xl text-white">{value}</p>
              <p className="text-sm text-neutral-400 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
      <ChevronDown className="absolute bottom-6 left-1/2 -translate-x-1/2 w-8 h-8 text-neutral-500 animate-bounce" />
    </header>
  );
}
