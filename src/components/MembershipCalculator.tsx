import { useMemo, useState } from 'react';
import { Calculator, Check, Zap } from 'lucide-react';

const PLANS = {
  basic: { label: 'Basic', monthly: 3500 },
  pro: { label: 'Pro', monthly: 5500 },
  elite: { label: 'Elite', monthly: 8500 },
} as const;

type PlanKey = keyof typeof PLANS;

const DURATION_MULTIPLIERS = {
  '1': { months: 1, discount: 0 },
  '3': { months: 3, discount: 0.05 },
  '6': { months: 6, discount: 0.1 },
  '12': { months: 12, discount: 0.2 },
} as const;

type DurationKey = keyof typeof DURATION_MULTIPLIERS;

const ADDONS = {
  personalTraining: { label: 'Personal Training (2x/week)', monthly: 4000 },
  nutritionPlan: { label: 'Custom Nutrition Plan', monthly: 2500 },
  sauna: { label: 'Sauna & Recovery Zone', monthly: 1500 },
} as const;

type AddonKey = keyof typeof ADDONS;

const PLAN_FEATURES: Record<PlanKey, string[]> = {
  basic: ['Gym floor access', 'Locker room', 'Cardio zone'],
  pro: ['Everything in Basic', 'Group classes', 'Strength zone', 'Guest pass (1/month)'],
  elite: ['Everything in Pro', '24/7 access', 'Sauna access', 'Free PT session monthly'],
};

function formatPKR(n: number) {
  return 'Rs ' + n.toLocaleString('en-PK');
}

export default function MembershipCalculator() {
  const [plan, setPlan] = useState<PlanKey>('pro');
  const [duration, setDuration] = useState<DurationKey>('3');
  const [addons, setAddons] = useState<Set<AddonKey>>(new Set());
  const [isStudent, setIsStudent] = useState(false);
  const [isCorporate, setIsCorporate] = useState(false);

  const toggleAddon = (key: AddonKey) =>
    setAddons((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const result = useMemo(() => {
    const { months, discount } = DURATION_MULTIPLIERS[duration];
    const addonMonthly = [...addons].reduce((sum, k) => sum + ADDONS[k].monthly, 0);
    const baseMonthly = PLANS[plan].monthly + addonMonthly;
    const subtotal = baseMonthly * months;

    const promoDiscount = Math.round(subtotal * discount);
    let afterPromo = subtotal - promoDiscount;

    let bundleDiscount = 0;
    if (isStudent) bundleDiscount += afterPromo * 0.15;
    if (isCorporate) bundleDiscount += afterPromo * 0.1;
    bundleDiscount = Math.round(bundleDiscount);
    afterPromo -= bundleDiscount;

    return {
      months,
      baseMonthly,
      subtotal,
      promoDiscount,
      bundleDiscount,
      perMonth: Math.round(afterPromo / months),
      total: afterPromo,
      savings: subtotal - afterPromo,
    };
  }, [plan, duration, addons, isStudent, isCorporate]);

  return (
    <section id="calculator" className="py-24 bg-ink-900">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-ember-400 font-semibold tracking-[0.3em] uppercase text-sm mb-4 flex items-center justify-center gap-2">
            <Zap className="w-4 h-4" /> Membership Calculator
          </p>
          <h2 className="font-display text-4xl text-white">
            Build Your Perfect Plan
          </h2>
          <p className="text-neutral-400 mt-4 max-w-xl mx-auto">
            Pick your plan, duration and extras — see your price update instantly.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-8">
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
                1. Choose your plan
              </h3>
              <div className="grid sm:grid-cols-3 gap-3">
                {(Object.keys(PLANS) as PlanKey[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => setPlan(key)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      plan === key
                        ? 'border-ember-500 bg-ember-500/10 shadow-md shadow-ember-500/10'
                        : 'border-ink-700 bg-ink-800 hover:border-neutral-500'
                    }`}
                  >
                    <span className="font-bold text-white">{PLANS[key].label}</span>
                    <span className="block text-sm text-neutral-400 mt-1">
                      {formatPKR(PLANS[key].monthly)}/mo
                    </span>
                  </button>
                ))}
              </div>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-neutral-400">
                {PLAN_FEATURES[plan].map((f) => (
                  <li key={f} className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-ember-400" /> {f}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
                2. Membership duration
              </h3>
              <div className="grid grid-cols-4 gap-3">
                {(Object.keys(DURATION_MULTIPLIERS) as DurationKey[]).map((key) => {
                  const d = DURATION_MULTIPLIERS[key];
                  return (
                    <button
                      key={key}
                      onClick={() => setDuration(key)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        duration === key
                          ? 'border-ember-500 bg-ember-500/10'
                          : 'border-ink-700 bg-ink-800 hover:border-neutral-500'
                      }`}
                    >
                      <span className="font-bold text-white">{key} mo</span>
                      {d.discount > 0 && (
                        <span className="block text-xs text-ember-400 mt-1">
                          −{d.discount * 100}%
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
                3. Add extras (optional)
              </h3>
              <div className="space-y-3">
                {(Object.keys(ADDONS) as AddonKey[]).map((key) => {
                  const checked = addons.has(key);
                  return (
                    <label
                      key={key}
                      className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                        checked
                          ? 'border-ember-500 bg-ember-500/10'
                          : 'border-ink-700 bg-ink-800 hover:border-neutral-500'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                            checked ? 'bg-ember-500 border-ember-500' : 'border-neutral-500'
                          }`}
                        >
                          {checked && <Check className="w-3.5 h-3.5 text-ink-950" />}
                        </span>
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={checked}
                          onChange={() => toggleAddon(key)}
                        />
                        <span className="text-white">{ADDONS[key].label}</span>
                      </span>
                      <span className="text-neutral-400 text-sm">
                        +{formatPKR(ADDONS[key].monthly)}/mo
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
                4. Discounts
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <label
                  className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    isStudent ? 'border-ember-500 bg-ember-500/10' : 'border-ink-700 bg-ink-800 hover:border-neutral-500'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-ember-500"
                    checked={isStudent}
                    onChange={(e) => setIsStudent(e.target.checked)}
                  />
                  <span className="text-white">Student discount</span>
                  <span className="ml-auto text-ember-400 text-sm font-semibold">−15%</span>
                </label>
                <label
                  className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    isCorporate ? 'border-ember-500 bg-ember-500/10' : 'border-ink-700 bg-ink-800 hover:border-neutral-500'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-ember-500"
                    checked={isCorporate}
                    onChange={(e) => setIsCorporate(e.target.checked)}
                  />
                  <span className="text-white">Corporate plan</span>
                  <span className="ml-auto text-ember-400 text-sm font-semibold">−10%</span>
                </label>
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 h-fit glow-card rounded-2xl border border-ember-500/30 bg-ink-800/90 p-6">
            <div className="flex items-center gap-2 text-ember-400 font-semibold mb-6">
              <Calculator className="w-5 h-5" /> Price Summary
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-400">Plan</span>
                <span className="text-white font-semibold">{PLANS[plan].label}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Duration</span>
                <span className="text-white font-semibold">{result.months} months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Extras</span>
                <span className="text-white font-semibold">
                  {addons.size ? `${addons.size} selected` : 'None'}
                </span>
              </div>
              <div className="border-t border-ink-700 pt-3 flex justify-between">
                <span className="text-neutral-400">Subtotal</span>
                <span className="text-white">{formatPKR(result.subtotal)}</span>
              </div>
              {result.promoDiscount > 0 && (
                <div className="flex justify-between text-ember-400">
                  <span>Long-term discount</span>
                  <span>−{formatPKR(result.promoDiscount)}</span>
                </div>
              )}
              {result.bundleDiscount > 0 && (
                <div className="flex justify-between text-ember-400">
                  <span>Student / corporate</span>
                  <span>−{formatPKR(result.bundleDiscount)}</span>
                </div>
              )}
            </div>

            <div className="mt-6 bg-ink-900 rounded-xl p-5 text-center">
              <p className="text-neutral-400 text-sm">Total for {result.months} months</p>
              <p className="font-display text-4xl text-ember-400 mt-2">
                {formatPKR(result.total)}
              </p>
              <p className="text-neutral-400 text-sm mt-2">
                ≈ {formatPKR(result.perMonth)} / month
              </p>
              {result.savings > 0 && (
                <p className="text-emerald-400 text-sm font-semibold mt-3">
                  You save {formatPKR(result.savings)}
                </p>
              )}
            </div>

            <a
              href="#join"
              className="block text-center mt-5 px-6 py-3.5 rounded-lg bg-ember-500 hover:bg-ember-400 text-ink-950 font-bold transition-colors"
            >
              Join Now — {formatPKR(result.perMonth)}/mo
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
