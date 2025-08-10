type Props = {
  name: string;
  price: string;
  ctaHref: string;
  features: string[];
};

export default function PlanCard({ name, price, ctaHref, features }: Props) {
  return (
    <div className="rounded-2xl border p-6 shadow-sm">
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="mt-2 text-3xl font-bold">{price}</p>
      <ul className="mt-4 space-y-2">
        {features.map((f) => <li key={f} className="text-gray-700">• {f}</li>)}
      </ul>
      <a className="mt-6 inline-block rounded-2xl bg-black px-5 py-3 font-semibold text-white" href={ctaHref}>
        Get Started
      </a>
    </div>
  );
}
