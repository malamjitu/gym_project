import { useState, type FormEvent } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="join" className="py-24">
      <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
        <div>
          <p className="text-ember-400 font-semibold tracking-[0.3em] uppercase text-sm mb-4">
            Join Today
          </p>
          <h2 className="font-display text-4xl text-white leading-tight">
            Your First Session Is On Us
          </h2>
          <p className="text-neutral-400 mt-4 leading-relaxed">
            Drop your details and our team will call you within 24 hours to book
            your free trial workout and facility tour.
          </p>

          <div className="mt-10 space-y-5">
            <div className="flex items-center gap-4">
              <MapPin className="w-5 h-5 text-ember-400 shrink-0" />
              <span className="text-neutral-300">Main Boulevard, Gulberg III, Lahore</span>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="w-5 h-5 text-ember-400 shrink-0" />
              <span className="text-neutral-300">+92 300 1234567</span>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-ember-400 shrink-0" />
              <span className="text-neutral-300">join@ironcore.pk</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-ink-700 bg-ink-900 p-8">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <CheckCircle className="w-14 h-14 text-emerald-400 mb-5" />
              <h3 className="font-display text-2xl text-white">You're In!</h3>
              <p className="text-neutral-400 mt-3">
                We've received your request. Our team will contact you shortly to
                schedule your free trial.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Ali Ahmed"
                  className="w-full px-4 py-3 rounded-lg bg-ink-800 border border-ink-700 text-white placeholder-neutral-500 focus:outline-none focus:border-ember-500 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-neutral-300 mb-2">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  placeholder="0300 1234567"
                  className="w-full px-4 py-3 rounded-lg bg-ink-800 border border-ink-700 text-white placeholder-neutral-500 focus:outline-none focus:border-ember-500 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="goal" className="block text-sm font-medium text-neutral-300 mb-2">
                  Your Fitness Goal
                </label>
                <select
                  id="goal"
                  className="w-full px-4 py-3 rounded-lg bg-ink-800 border border-ink-700 text-white focus:outline-none focus:border-ember-500 transition-colors"
                  defaultValue="muscle"
                >
                  <option value="muscle">Build Muscle</option>
                  <option value="fatloss">Lose Weight</option>
                  <option value="strength">Gain Strength</option>
                  <option value="fitness">General Fitness</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-ember-500 hover:bg-ember-400 text-ink-950 font-bold transition-colors"
              >
                <Send className="w-4 h-4" /> Claim Free Trial
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
