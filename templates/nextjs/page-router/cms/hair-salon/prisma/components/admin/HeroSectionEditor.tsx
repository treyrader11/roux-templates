import SectionEditor from "@/components/admin/SectionEditor";
import { Field } from "@/components/ui/input";
import type { SectionHero } from "@/lib/services-defaults";

interface HeroSectionEditorProps {
  slug: string;
  initial: SectionHero;
  previewHref?: string;
}

/** Shared editor for the common { kicker, title, subtitle } hero shape. */
export default function HeroSectionEditor({
  slug,
  initial,
  previewHref,
}: HeroSectionEditorProps) {
  return (
    <SectionEditor slug={slug} initialData={initial} previewHref={previewHref}>
      {({ data, update, inputStyles }) => (
        <div className="space-y-5">
          <Field label="Kicker">
            <input
              className={inputStyles}
              value={data.kicker}
              onChange={(e) => update("kicker", e.target.value)}
            />
          </Field>
          <Field label="Title">
            <input
              className={inputStyles}
              value={data.title}
              onChange={(e) => update("title", e.target.value)}
            />
          </Field>
          <Field label="Subtitle">
            <textarea
              className={inputStyles}
              rows={3}
              value={data.subtitle}
              onChange={(e) => update("subtitle", e.target.value)}
            />
          </Field>
        </div>
      )}
    </SectionEditor>
  );
}
