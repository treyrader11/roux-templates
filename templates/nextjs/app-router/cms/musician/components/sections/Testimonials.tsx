type Quote = { quote: string; author: string; role: string };

const QUOTES: Quote[] = [
  {
    quote:
      "They captured our festival with a soul most crews miss. The footage felt like New Orleans itself.",
    author: "Marcus Boudreaux",
    role: "Jazz & Heritage Festival",
  },
  {
    quote:
      "From storyboard to final cut, a genuine creative partner. Our brand film exceeded every expectation.",
    author: "Elise Toussaint",
    role: "Creative Director, Maison Rouge",
  },
  {
    quote:
      "Live scoring, cinematography, the whole package. Booking them was the best call we made all year.",
    author: "Devon Price",
    role: "Producer",
  },
];

export default function Testimonials() {
  return (
    <section className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-accent">
            Kind Words
          </p>
          <h2 className="mt-3 font-heading text-4xl font-bold text-foreground">
            What People Say
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {QUOTES.map((q) => (
            <figure
              key={q.author}
              className="flex flex-col justify-between rounded-sm border border-border bg-background p-8"
            >
              <blockquote className="font-heading text-lg italic leading-relaxed text-foreground/90">
                “{q.quote}”
              </blockquote>
              <figcaption className="mt-6">
                <p className="text-sm font-medium text-foreground">{q.author}</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  {q.role}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
