import { Check, Dumbbell, HeartPulse, Zap, PersonStanding } from 'lucide-react';

const PLANS = [
  {
    name: 'Basic',
    price: '3,500',
    tag: 'Get started',
    highlight: false,
    features: ['Full gym floor access', 'Cardio & strength zones', 'Locker room & showers', 'Fitness assessment'],
  },
  {
    name: 'Pro',
    price: '5,500',
    tag: 'Most popular',
    highlight: true,
    features: ['Everything in Basic', 'All group classes', 'Free guest pass monthly', 'Nutrition guidance'],
  },
  {
    name: 'Elite',
    price: '8,500',
    tag: 'All access',
    highlight: false,
    features: ['Everything in Pro', '24/7 access', 'Sauna & recovery zone', 'Monthly PT session'],
  },
];

const FEATURES = [
  { icon: Dumbbell, title: 'Premium Equipment', desc: 'Imported strength machines, free weights and dedicated lifting platforms.' },
  { icon: HeartPulse, title: 'Health First', desc: 'Regular body composition scans and trainer-guided progress tracking.' },
  { icon: PersonStanding, title: 'Expert Trainers', desc: 'Certified coaches for strength, hypertrophy, CrossFit and rehab.' },
  { icon: Zap, title: 'High-Energy Classes', desc: 'HIIT, spinning, yoga and boxing — 40+ sessions every week.' },
];

export default function Plans() {
  return (
    <>
      <section id="plans" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-ember-400 font-semibold tracking-[0.3em] uppercase text-sm mb-4">
              Membership Plans
            </p>
            <h2 className="font-display text-4xl text-white">Simple, Honest Pricing</h2>
            <p className="text-neutral-400 mt-4">No hidden fees. Cancel anytime with 30 days notice.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={`relative rounded-2xl p-8 border transition-all hover:-translate-y-1 ${
                  p.highlight
                    ? 'border-ember-500 bg-gradient-to-b from-ember-500/15 to-ink-900 shadow-xl shadow-ember-500/10'
                    : 'border-ink-700 bg-ink-900 hover:border-neutral-500'
                }`}
              >
                {p.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-ember-500 text-ink-950 text-xs font-bold uppercase tracking-wide">
                    {p.tag}
                  </span>
                )}
                <h3 className="font-display text-xl text-white">{p.name}</h3>
                <p className="mt-4">
                  <span className="text-4xl font-display text-white">Rs {p.price}</span>
                  <span className="text-neutral-400 text-sm"> /month</span>
                </p>
                {!p.highlight && <p className="text-ember-400/70 text-sm mt-1">{p.tag}</p>}
                <ul className="mt-6 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-neutral-300">
                      <Check className="w-4 h-4 text-ember-400 mt-0.5 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#calculator"
                  className={`block text-center mt-8 px-6 py-3 rounded-lg font-bold transition-colors ${
                    p.highlight
                      ? 'bg-ember-500 hover:bg-ember-400 text-ink-950'
                      : 'border border-neutral-600 hover:border-ember-400 text-white'
                  }`}
                >
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-ink-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-ember-400 font-semibold tracking-[0.3em] uppercase text-sm mb-4">
              Why IronCore
            </p>
            <h2 className="font-display text-4xl text-white">More Than a Gym</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-6 rounded-xl border border-ink-700 bg-ink-800 hover:border-ember-500/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-ember-500/15 flex items-center justify-center mb-4 group-hover:bg-ember-500/25 transition-colors">
                  <Icon className="w-6 h-6 text-ember-400" />
                </div>
                <h3 className="font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
