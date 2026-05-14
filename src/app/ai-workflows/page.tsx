"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import {
  ArrowRight,
  Bot,
  CalendarCheck2,
  CheckCircle2,
  Clock3,
  MessageSquareQuote,
  PhoneCall,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const stripePaymentLink = (process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK ?? "").trim();
const leadFormWebhookUrl = (process.env.NEXT_PUBLIC_LEADFORM_WEBHOOK_URL ?? "").trim();

const initialFormData = {
  fullName: "",
  businessName: "",
  email: "",
  phone: "",
  website: "",
  businessType: "",
  biggestProblem: "",
  message: "",
};

const problemCards = [
  {
    title: "Missed calls become missed revenue",
    description:
      "If nobody responds fast enough, interested prospects move on to the next business that picks up.",
  },
  {
    title: "Slow follow-up cools down hot leads",
    description:
      "Leads that wait hours or days for a reply rarely stay ready to book, buy, or show up.",
  },
  {
    title: "Lost details break the sales process",
    description:
      "When customer info sits in texts, voicemails, and scattered notes, follow-up gets inconsistent.",
  },
  {
    title: "Manual admin steals selling time",
    description:
      "Calling back, sending reminders, and requesting reviews by hand slows down the rest of the business.",
  },
];

const serviceCards = [
  {
    title: "AI Receptionist",
    description:
      "Give new leads an immediate first response so basic intake starts even when you are busy.",
    icon: Bot,
  },
  {
    title: "Lead Capture",
    description:
      "Collect the key customer details you need instead of letting inquiries disappear into your inbox.",
    icon: ReceiptText,
  },
  {
    title: "Follow-Up Automation",
    description:
      "Trigger consistent outreach after form fills, missed calls, or new inquiries without chasing every lead manually.",
    icon: MessageSquareQuote,
  },
  {
    title: "Appointment Booking",
    description:
      "Guide prospects toward the next step so more conversations turn into booked appointments.",
    icon: CalendarCheck2,
  },
  {
    title: "Review Requests",
    description:
      "Prompt happy customers for feedback after the job instead of relying on memory and spare time.",
    icon: ShieldCheck,
  },
  {
    title: "Customer Dashboard Coming Soon",
    description:
      "A future dashboard will make it easier to track activity, responses, and follow-up in one place.",
    icon: CheckCircle2,
  },
];

const nextSteps = [
  {
    title: "1. We review your lead flow",
    description:
      "After you submit the form, we look at how your business currently captures and follows up with new inquiries.",
  },
  {
    title: "2. We confirm the setup scope",
    description:
      "If you want a demo first, say so in the form. If you are ready to move forward, the Stripe setup payment starts the build.",
  },
  {
    title: "3. We install the system",
    description:
      "We configure the intake flow, follow-up logic, and the practical next steps needed to move leads toward a conversation.",
  },
];

const faqs = [
  {
    question: "What is included in the $297 setup?",
    answer:
      "The setup covers the initial LeadFlow Engine implementation for your intake and follow-up flow. Exact setup details depend on your business process and what tools you already use.",
  },
  {
    question: "What does the $49 monthly maintenance cover?",
    answer:
      "The monthly maintenance fee covers ongoing upkeep for the installed workflow so the system can continue running and be adjusted as needed.",
  },
  {
    question: "Do I have to pay before requesting a demo?",
    answer:
      "No. You can use the form to request a demo first. If you are ready to begin immediately, you can also use the Stripe button to pay the setup fee.",
  },
  {
    question: "Do I need to buy more software first?",
    answer:
      "Not always. We review what you already use and keep the setup practical. If additional tools are needed, that gets discussed before implementation.",
  },
  {
    question: "Will this replace my entire front desk or sales process?",
    answer:
      "No. LeadFlow Engine is meant to support faster intake and follow-up, not to pretend your business no longer needs human judgment.",
  },
];

type LeadFormData = typeof initialFormData;
type FieldName = keyof LeadFormData;
type FieldErrors = Partial<Record<FieldName, string>>;

function validateLeadForm(formData: LeadFormData): FieldErrors {
  const errors: FieldErrors = {};

  if (!formData.fullName.trim()) {
    errors.fullName = "Full name is required.";
  }

  if (!formData.businessName.trim()) {
    errors.businessName = "Business name is required.";
  }

  if (!formData.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!formData.biggestProblem.trim()) {
    errors.biggestProblem = "Select your biggest problem.";
  }

  return errors;
}

export default function Page() {
  const [formData, setFormData] = useState<LeadFormData>(initialFormData);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionState, setSubmissionState] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [submissionMessage, setSubmissionMessage] = useState("");

  const clearFieldError = (fieldName: FieldName) => {
    setFieldErrors((currentErrors) => {
      if (!currentErrors[fieldName]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[fieldName];
      return nextErrors;
    });
  };

  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    const fieldName = name as FieldName;

    setFormData((currentData) => ({
      ...currentData,
      [fieldName]: value,
    }));
    clearFieldError(fieldName);

    if (submissionState !== "idle") {
      setSubmissionState("idle");
      setSubmissionMessage("");
    }
  };

  const scrollToLeadForm = (prefillMessage?: string) => {
    if (prefillMessage) {
      setFormData((currentData) => ({
        ...currentData,
        message: currentData.message.trim() ? currentData.message : prefillMessage,
      }));
    }

    document.getElementById("lead-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateLeadForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      setSubmissionState("error");
      setSubmissionMessage("Please complete the required fields before submitting.");
      return;
    }

    if (!leadFormWebhookUrl) {
      setSubmissionState("error");
      setSubmissionMessage(
        "Lead form submission is not configured yet. Add NEXT_PUBLIC_LEADFORM_WEBHOOK_URL."
      );
      return;
    }

    setIsSubmitting(true);
    setSubmissionState("idle");
    setSubmissionMessage("");

    try {
      const response = await fetch(leadFormWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          offer: "LeadFlow Engine",
          pricing: {
            setupFee: 297,
            monthlyMaintenance: 49,
          },
          source: "/ai-workflows",
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Webhook request failed with status ${response.status}.`);
      }

      setFormData(initialFormData);
      setFieldErrors({});
      setSubmissionState("success");
      setSubmissionMessage(
        "Thanks. Your request was sent successfully. We will review your details and follow up with next steps."
      );
    } catch (error) {
      console.error(error);
      setSubmissionState("error");
      setSubmissionMessage(
        "We could not submit the form right now. Your details are still here, so you can try again in a moment."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-stone-50 text-slate-950">
      <section className="overflow-hidden bg-slate-950 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-amber-400/40 bg-amber-300/10 px-4 py-1 text-sm font-medium text-amber-200">
                LeadFlow Engine for small businesses
              </p>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Stop losing leads to missed calls, slow follow-up, and manual admin.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                LeadFlow Engine installs an AI-powered lead capture and follow-up
                system that helps your business respond faster, collect customer
                details, trigger follow-up, and move prospects toward booked
                appointments or paid invoices.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="bg-amber-400 text-slate-950 hover:bg-amber-300"
                  onClick={() => scrollToLeadForm()}
                >
                  Start My LeadFlow Setup
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-700 bg-transparent text-white hover:bg-slate-900"
                  onClick={() =>
                    scrollToLeadForm("I would like to book a demo before getting started.")
                  }
                >
                  Book a Demo
                </Button>
              </div>
              <div className="mt-8 grid gap-4 text-sm text-slate-300 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="mb-2 flex items-center gap-2 text-amber-200">
                    <PhoneCall className="h-4 w-4" />
                    Faster first response
                  </div>
                  <p>Capture new inquiries before they disappear into voicemail and inbox clutter.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="mb-2 flex items-center gap-2 text-amber-200">
                    <Clock3 className="h-4 w-4" />
                    More consistent follow-up
                  </div>
                  <p>Keep leads moving instead of depending on manual reminders and callbacks.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="mb-2 flex items-center gap-2 text-amber-200">
                    <CheckCircle2 className="h-4 w-4" />
                    Practical implementation
                  </div>
                  <p>No fake case studies or inflated promises. Just a system built around your workflow.</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-amber-200">
                Locked Offer
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white">LeadFlow Engine</h2>
              <p className="mt-3 text-slate-300">
                A focused setup for businesses that need better intake, faster
                replies, and a cleaner follow-up process.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white p-5 text-slate-950">
                  <p className="text-sm uppercase tracking-wide text-slate-500">Setup fee</p>
                  <p className="mt-2 text-4xl font-semibold">$297</p>
                  <p className="mt-2 text-sm text-slate-600">
                    One-time payment to start installation.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 text-white">
                  <p className="text-sm uppercase tracking-wide text-slate-400">Maintenance</p>
                  <p className="mt-2 text-4xl font-semibold">$49</p>
                  <p className="mt-2 text-sm text-slate-400">
                    Monthly upkeep after setup is live.
                  </p>
                </div>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-slate-200">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-amber-200" />
                  AI-powered intake and lead capture setup
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-amber-200" />
                  Follow-up logic to help move inquiries toward the next step
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-amber-200" />
                  Clear handoff for demo requests, appointments, or payment-ready leads
                </li>
              </ul>
              <div className="mt-8">
                {stripePaymentLink ? (
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-amber-400 text-slate-950 hover:bg-amber-300"
                  >
                    <a href={stripePaymentLink} rel="noreferrer" target="_blank">
                      Pay $297 Setup Fee
                    </a>
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    className="w-full bg-amber-400 text-slate-950"
                    disabled
                  >
                    Pay $297 Setup Fee
                  </Button>
                )}
                <p className="mt-3 text-sm text-slate-400">
                  {stripePaymentLink
                    ? "Use the setup payment when you are ready to begin. Maintenance is $49 per month."
                    : "Add NEXT_PUBLIC_STRIPE_PAYMENT_LINK to enable the Stripe setup payment button."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main>
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              The problem
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">
              Small businesses lose real opportunities when follow-up depends on spare time.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-700">
              LeadFlow Engine is designed for teams that need a cleaner process,
              not more chaos. It addresses the common points where leads go cold
              before anyone gets back to them.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {problemCards.map((problem) => (
              <div
                key={problem.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-slate-950">{problem.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{problem.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                  The offer
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">
                  LeadFlow Engine gives your business a practical lead response system.
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-700">
                  We focus on the front end of revenue: capturing new inquiries,
                  responding faster, and reducing the manual work required to keep
                  prospects moving.
                </p>
                <div className="mt-6 rounded-3xl bg-slate-100 p-6">
                  <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Honest build promise
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-700">
                    This page avoids made-up results, fake testimonials, and empty
                    guarantees. The promise is simple: install a better lead
                    capture and follow-up workflow that fits the way your business
                    already works.
                  </p>
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                {serviceCards.map((service) => {
                  const Icon = service.icon;

                  return (
                    <div
                      key={service.title}
                      className="rounded-3xl border border-slate-200 bg-stone-50 p-6 shadow-sm"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-slate-950">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 text-xl font-semibold text-slate-950">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {service.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-3xl bg-slate-950 p-8 text-white shadow-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-200">
                Pricing
              </p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
                Clear pricing for a focused setup.
              </h2>
              <div className="mt-8 space-y-4">
                <div className="rounded-3xl bg-white p-5 text-slate-950">
                  <p className="text-sm uppercase tracking-wide text-slate-500">One-time setup</p>
                  <p className="mt-2 text-4xl font-semibold">$297</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm uppercase tracking-wide text-slate-400">
                    Monthly maintenance
                  </p>
                  <p className="mt-2 text-4xl font-semibold">$49</p>
                </div>
              </div>
              <p className="mt-6 text-sm leading-7 text-slate-300">
                Start by sending your business details through the form. If you are
                ready to move immediately, use the Stripe setup payment button.
              </p>
              <div className="mt-6">
                {stripePaymentLink ? (
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-amber-400 text-slate-950 hover:bg-amber-300"
                  >
                    <a href={stripePaymentLink} rel="noreferrer" target="_blank">
                      Pay with Stripe
                    </a>
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    className="w-full bg-amber-400 text-slate-950"
                    disabled
                  >
                    Pay with Stripe
                  </Button>
                )}
              </div>
            </div>

            <div
              id="lead-form"
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                Lead capture form
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">
                Tell us about your business and your biggest lead problem.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Use this form to request setup or ask for a demo first. Required
                fields are full name, business name, email, and biggest problem.
              </p>

              <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="fullName">
                      Full name *
                    </label>
                    <Input
                      autoComplete="name"
                      id="fullName"
                      name="fullName"
                      onChange={handleFieldChange}
                      placeholder="Jane Smith"
                      value={formData.fullName}
                    />
                    {fieldErrors.fullName ? (
                      <p className="mt-2 text-sm text-red-600">{fieldErrors.fullName}</p>
                    ) : null}
                  </div>

                  <div>
                    <label
                      className="mb-2 block text-sm font-medium text-slate-700"
                      htmlFor="businessName"
                    >
                      Business name *
                    </label>
                    <Input
                      autoComplete="organization"
                      id="businessName"
                      name="businessName"
                      onChange={handleFieldChange}
                      placeholder="Smith Plumbing"
                      value={formData.businessName}
                    />
                    {fieldErrors.businessName ? (
                      <p className="mt-2 text-sm text-red-600">{fieldErrors.businessName}</p>
                    ) : null}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="email">
                      Email *
                    </label>
                    <Input
                      autoComplete="email"
                      id="email"
                      name="email"
                      onChange={handleFieldChange}
                      placeholder="jane@business.com"
                      type="email"
                      value={formData.email}
                    />
                    {fieldErrors.email ? (
                      <p className="mt-2 text-sm text-red-600">{fieldErrors.email}</p>
                    ) : null}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="phone">
                      Phone
                    </label>
                    <Input
                      autoComplete="tel"
                      id="phone"
                      name="phone"
                      onChange={handleFieldChange}
                      placeholder="(555) 555-5555"
                      type="tel"
                      value={formData.phone}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="website">
                      Website
                    </label>
                    <Input
                      autoComplete="url"
                      id="website"
                      name="website"
                      onChange={handleFieldChange}
                      placeholder="https://yourbusiness.com"
                      type="url"
                      value={formData.website}
                    />
                  </div>

                  <div>
                    <label
                      className="mb-2 block text-sm font-medium text-slate-700"
                      htmlFor="businessType"
                    >
                      Business type
                    </label>
                    <Input
                      id="businessType"
                      name="businessType"
                      onChange={handleFieldChange}
                      placeholder="HVAC, med spa, law firm, dental, roofing..."
                      value={formData.businessType}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="mb-2 block text-sm font-medium text-slate-700"
                    htmlFor="biggestProblem"
                  >
                    Biggest problem *
                  </label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    id="biggestProblem"
                    name="biggestProblem"
                    onChange={handleFieldChange}
                    value={formData.biggestProblem}
                  >
                    <option value="">Select your biggest problem</option>
                    <option value="Missed calls">Missed calls</option>
                    <option value="Slow follow-up">Slow follow-up</option>
                    <option value="Lost leads">Lost leads</option>
                    <option value="Manual customer management">Manual customer management</option>
                    <option value="Need better appointment booking">Need better appointment booking</option>
                    <option value="Need better review requests">Need better review requests</option>
                  </select>
                  {fieldErrors.biggestProblem ? (
                    <p className="mt-2 text-sm text-red-600">{fieldErrors.biggestProblem}</p>
                  ) : null}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="message">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    onChange={handleFieldChange}
                    placeholder="Tell us how leads currently come in, how your team handles them, or say if you want a demo first."
                    rows={5}
                    value={formData.message}
                  />
                </div>

                {submissionMessage ? (
                  <div
                    aria-live="polite"
                    className={`rounded-2xl px-4 py-3 text-sm ${
                      submissionState === "success"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {submissionMessage}
                  </div>
                ) : null}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button
                    className="bg-slate-950 text-white hover:bg-slate-800"
                    disabled={isSubmitting}
                    size="lg"
                    type="submit"
                  >
                    {isSubmitting ? "Submitting..." : "Start My LeadFlow Setup"}
                  </Button>
                  <p className="text-sm text-slate-500">
                    This form submits JSON to the lead webhook configured in
                    `NEXT_PUBLIC_LEADFORM_WEBHOOK_URL`.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>

        <section id="what-happens-next" className="bg-slate-950 text-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-200">
                What happens next
              </p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
                A simple next-step process instead of a vague sales pitch.
              </h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {nextSteps.map((step) => (
                <div
                  key={step.title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6"
                >
                  <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">
              Questions before you start?
            </h2>
          </div>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-white px-6 py-2 shadow-sm">
            <Accordion className="w-full" collapsible type="single">
              {faqs.map((faq) => (
                <AccordionItem key={faq.question} value={faq.question}>
                  <AccordionTrigger className="text-left text-base text-slate-950 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-7 text-slate-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-semibold text-slate-950 sm:text-4xl">
              Ready to install a better lead capture and follow-up system?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              Start with the form if you want to talk through your setup. If you are
              ready to move now, use the Stripe payment link for the $297 setup fee.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                className="bg-slate-950 text-white hover:bg-slate-800"
                onClick={() => scrollToLeadForm()}
              >
                Start My LeadFlow Setup
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() =>
                  scrollToLeadForm("I would like to book a demo before getting started.")
                }
              >
                Book a Demo
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
