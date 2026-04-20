"use client";

import { useState } from "react";

type CollapsibleSectionProps = {
  title: string;
  defaultOpen?: boolean;
  badge?: string;
  children: React.ReactNode;
};

export function CollapsibleSection({ title, defaultOpen = true, badge, children }: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <details className="collapsible" open={open} onToggle={(e) => setOpen(e.currentTarget.open)}>
      <summary className="collapsible__trigger">
        <span className="collapsible__chevron" aria-hidden />
        <span className="collapsible__title">{title}</span>
        {badge ? <span className="collapsible__badge">{badge}</span> : null}
      </summary>
      <div className="collapsible__panel">{children}</div>
    </details>
  );
}
