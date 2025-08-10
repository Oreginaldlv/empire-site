import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Credit Repair — Oreginald Empire",
  description: "Monthly credit repair service powered by Metro 2 workflows.",
};

export default function CreditRepairPage() {
  const paymentLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_CREDIT_REPAIR || "#";

  const features = [
    "Metro 2–aligned dispute workflow",
    "Monthly credit analysis & report",
    "Guided next steps and support"
  ];

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">Oreginald Credit</h1>
        <p className="mt-3 text-lg text-gray-600">
          Clean, compliant, and consistent credit repair — $14.95/month.
        </p>
      </header>

      <section className="mb-12 grid gap-4">
        {features.map((f) => (
          <div key={f} className="rounded-2xl border p-4 shadow-sm">{f}</div>
        ))}
      </section>

      <section className="rounded-2xl border p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">$14.95<span className="text-base font-normal">/month</span></h2>
            <p className="text-gray-600">Cancel anytime.</p>
          </div>
          <a
            href={paymentLink}
            className="rounded-2xl border bg-black px-6 py-3 font-semibold text-white"
          >
            Get Started
          </a>
        </div>
      </section>

      <section className="mt-14">
        <h3 className="text-xl font-semibold">FAQ</h3>
        <details className="mt-4 rounded-xl border p-4">
          <summary className="cursor-pointer font-medium">How long until I see results?</summary>
          <p className="mt-2 text-gray-600">Most members see movement within 30–60 days, but results can vary.</p>
        </details>
        <details className="mt-3 rounded-xl border p-4">
          <summary className="cursor-pointer font-medium">Is this Metro 2 compliant?</summary>
          <p className="mt-2 text-gray-600">We use a structured workflow aligned to Metro 2 formatting principles.</p>
        </details>
      </section>
    </main>
  );
}
