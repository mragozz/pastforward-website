import { motion } from "motion/react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router";
import { FadeIn, PageHero } from "../components/ui";

const faqs = [
  { q: "How long does the conversion process take?",
    a: "Most orders are completed within 1–2 weeks. The average turnaround is just 3 days from the time I pick up your materials. Rush orders are available for a $25 add-on — just mention it when you submit your order." },
  { q: "What tape and disc formats do you accept?",
    a: "I accept VHS, VHS-C, 8mm Camcorder, Hi8, Digital8, MiniDV, Betamax, and DVDs. If you have a format you're unsure about, just reach out — I'm happy to check before you commit." },
  { q: "How does pickup and dropoff work?",
    a: "I personally pick up your tapes from anywhere in the Indianapolis area at a time that works for you. Once everything is digitized, I return all your original tapes and discs in person — nothing is kept or discarded without your permission." },
  { q: "How are my digital files delivered?",
    a: "Your memories are delivered as high-quality MP4 files via a private Google Drive link, a USB drive, or an external hard drive — whichever you prefer. Just let me know when you place your order." },
  { q: "Is my footage kept private and secure?",
    a: "Absolutely. Your videos are never shared, posted, or stored anywhere after the project is complete. I handle every tape as if it were my own family's memories." },
  { q: "What if my tape is damaged or hard to play?",
    a: "I have equipment for handling worn or fragile tapes and will do my best to recover as much footage as possible. I'll always let you know upfront if a tape has issues before proceeding — no surprises." },
  { q: "How do I pay?",
    a: "Payment is accepted via Venmo, PayPal, cash, or check — whichever is easiest for you. Payment is due upon delivery of your digital files." },
  { q: "Do you service areas outside Indianapolis?",
    a: "I serve the greater Indianapolis metro area, including surrounding suburbs like Carmel, Fishers, Westfield, Zionsville, Avon, and Greenwood. If you're not sure, just reach out and I'll do my best to accommodate." },
  { q: "What quality will my converted files be?",
    a: "Files are captured at the best quality available from the source tape, typically at 720×480 (standard definition) for VHS/Hi8, and exported as H.264 MP4 files that play on any device without special software." },
  { q: "Can I get my files on a physical drive?",
    a: "Yes! I can deliver your files on a USB flash drive or external hard drive. Just mention your preference in your order notes. There may be a small charge for the physical media depending on size." },
];

export default function FaqsPage() {
  return (
    <>
      <PageHero
        tag="FAQs"
        title={<>Common questions,<br /><em className="not-italic text-accent">clear answers.</em></>}
        subtitle="Everything you need to know before getting started — no jargon, no fine print."
      />

      <section className="py-24 bg-background">
        <div className="max-w-3xl mx-auto px-6">
          <Accordion.Root type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <Accordion.Item
                  value={`faq-${i}`}
                  className="bg-card rounded-2xl border border-border overflow-hidden"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="w-full flex items-center justify-between px-8 py-6 text-left text-xl font-semibold text-foreground hover:bg-muted/40 transition-colors group gap-4 cursor-pointer">
                      <span>{faq.q}</span>
                      <ChevronDown
                        size={22}
                        className="shrink-0 text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-180"
                      />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="px-8 pb-7 text-lg text-foreground/65 leading-relaxed data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2">
                    {faq.a}
                  </Accordion.Content>
                </Accordion.Item>
              </FadeIn>
            ))}
          </Accordion.Root>

          {/* Still have questions CTA */}
          <FadeIn delay={0.3}>
            <div className="mt-16 bg-primary/6 rounded-2xl p-10 border border-primary/15 text-center">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="font-display text-2xl font-bold mb-3">Still have a question?</h3>
              <p className="text-foreground/60 text-lg mb-6">
                I'm happy to answer anything before you commit to an order. Just
                reach out.
              </p>
              <Link to="/contact">
                <motion.span
                  whileHover={{ scale: 1.03, y: -1 }}
                  className="inline-block bg-primary text-primary-foreground font-bold text-lg px-8 py-4 rounded-2xl hover:bg-[#D9B564] transition-colors cursor-pointer"
                >
                  Send Me a Message
                </motion.span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
