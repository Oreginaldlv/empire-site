export default function Home() {
  return (
    <main className="min-h-screen bg-[#08111f] text-white">
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.16),transparent_40%)]"
        />
        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-5 py-16 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-6 text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">
              Founding Customer Special
            </p>

            <h1 className="text-balance text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Get Your Business Using AI in 24 Hours
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              We&apos;ll set up AI tools that help your business capture more leads and save time.
            </p>

            <div className="mx-auto mt-9 w-fit rounded-3xl border border-cyan-300/30 bg-white/5 px-8 py-6 shadow-2xl shadow-cyan-500/10 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Founding Customer Special
              </p>
              <p className="mt-2 text-5xl font-black">$49 Setup</p>
            </div>

            <a
              href="#lead-form"
              className="mt-9 inline-flex min-h-14 items-center justify-center rounded-xl bg-cyan-300 px-9 py-4 text-lg font-extrabold text-slate-950 shadow-lg shadow-cyan-400/20 transition hover:bg-cyan-200 focus:outline-none focus:ring-4 focus:ring-cyan-300/40"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>

      <section id="lead-form" className="scroll-mt-4 bg-white px-5 py-16 text-slate-950 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <div className="mb-9 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-700">
              Start Here
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Tell us about your business
            </h2>
          </div>

          <form className="grid gap-5" method="post" action="/api/leads">
            <label className="grid gap-2 font-semibold">
              Business Name
              <input
                required
                name="businessName"
                autoComplete="organization"
                className="min-h-12 rounded-xl border border-slate-300 bg-white px-4 py-3 text-base font-normal outline-none transition focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
              />
            </label>

            <label className="grid gap-2 font-semibold">
              Owner
              <input
                required
                name="owner"
                autoComplete="name"
                className="min-h-12 rounded-xl border border-slate-300 bg-white px-4 py-3 text-base font-normal outline-none transition focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
              />
            </label>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 font-semibold">
                Phone
                <input
                  required
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  className="min-h-12 rounded-xl border border-slate-300 bg-white px-4 py-3 text-base font-normal outline-none transition focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
                />
              </label>

              <label className="grid gap-2 font-semibold">
                Email
                <input
                  required
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  className="min-h-12 rounded-xl border border-slate-300 bg-white px-4 py-3 text-base font-normal outline-none transition focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
                />
              </label>
            </div>

            <label className="grid gap-2 font-semibold">
              Website
              <input
                name="website"
                type="url"
                inputMode="url"
                placeholder="https://"
                className="min-h-12 rounded-xl border border-slate-300 bg-white px-4 py-3 text-base font-normal outline-none transition focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
              />
            </label>

            <label className="grid gap-2 font-semibold">
              Biggest Business Problem
              <textarea
                required
                name="biggestBusinessProblem"
                rows={5}
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-base font-normal outline-none transition focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
              />
            </label>

            <button
              type="submit"
              className="mt-2 min-h-14 rounded-xl bg-slate-950 px-8 py-4 text-lg font-extrabold text-white transition hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200"
            >
              Get Started
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
