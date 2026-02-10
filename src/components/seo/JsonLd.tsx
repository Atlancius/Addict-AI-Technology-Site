import type { ReactNode } from "react";

interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
  children?: ReactNode;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
