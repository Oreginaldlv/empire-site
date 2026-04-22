const stripeLink = "https://buy.stripe.com/cNi4gy9cLfsRh2P5DXfQI03";

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-16">
          <p className="text-sm text-gray-600 uppercase tracking-wide mb-4">Instant Download</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            10 AI Workflows Small Businesses Can Implement This Week
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Boost productivity and automate repetitive tasks with proven AI strategies designed for small business owners.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={stripeLink}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300"
            >
              Buy Now for $9
            </a>
            <a
              href="#features"
              className="text-blue-600 hover:text-blue-800 font-semibold underline"
            >
              See What’s Inside
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What this guide helps you do</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Automate follow-ups
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Handle repetitive customer questions
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Repurpose content faster
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Research leads faster
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Organize email/admin work
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Who this is for</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Small business owners
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Solo operators
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Freelancers
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Local service businesses
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Value Section */}
        <section className="py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant PDF download</h3>
              <p className="text-gray-600">Get immediate access to the guide after purchase.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Step-by-step workflows</h3>
              <p className="text-gray-600">Clear, actionable instructions for each AI workflow.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Simple tools list</h3>
              <p className="text-gray-600">Recommended free and affordable AI tools.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Beginner-friendly explanations</h3>
              <p className="text-gray-600">No technical jargon, easy to understand and implement.</p>
            </div>
          </div>
        </section>

        {/* Conversion Block */}
        <section className="py-16 bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why buy this now</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Don't let outdated processes hold your business back. These AI workflows can save you hours each week and give you a competitive edge. Start implementing them today and see immediate improvements in your productivity.
          </p>
          <a
            href={stripeLink}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300"
          >
            Buy Now for $9
          </a>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6 max-w-2xl mx-auto">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is this beginner friendly?</h3>
              <p className="text-gray-700">Yes, this guide is designed for beginners with no prior AI experience. All workflows include step-by-step instructions and simple explanations.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I receive it?</h3>
              <p className="text-gray-700">After purchase, you'll receive an immediate download link via email from Stripe. The PDF will also be available in your account dashboard.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What format is it in?</h3>
              <p className="text-gray-700">The guide is provided as a downloadable PDF file that you can read on any device or print for easy reference.</p>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to transform your business with AI?</h2>
          <p className="text-gray-600 mb-6">Join hundreds of small business owners who are already saving time and boosting productivity.</p>
          <a
            href={stripeLink}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300"
          >
            Get Your AI Workflows Guide Now - $9
          </a>
        </section>
      </div>
    </div>
  );
}