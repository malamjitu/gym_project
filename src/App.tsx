import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Plans from '@/components/Plans';
import MembershipCalculator from '@/components/MembershipCalculator';
import Contact from '@/components/Contact';

function Footer() {
  return (
    <footer className="border-t border-ink-700 py-10 bg-ink-900">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
        <p>© 2026 IronCore Fitness Club. All rights reserved.</p>
        <p>Main Boulevard, Gulberg III, Lahore — Open 24/7</p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-ink-950">
      <Navbar />
      <main>
        <Hero />
        <Plans />
        <MembershipCalculator />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
