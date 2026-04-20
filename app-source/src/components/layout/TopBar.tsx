"use client";

type TopBarProps = {
  projectTitle: string;
  storyStatus: "Draft" | "In Revision" | "Ready to Publish";
  saveLabel: string;
  onSyncPreview?: () => void;
};

export function TopBar({ projectTitle, storyStatus, saveLabel, onSyncPreview }: TopBarProps) {
  return (
    <header className="top-bar">
      <div className="top-bar__left">
        <div className="brand-mark" aria-hidden />
        <div className="project-picker">
          <span className="project-picker__label">Project</span>
          <button type="button" className="project-picker__title">
            {projectTitle}
            <span className="caret" aria-hidden />
          </button>
        </div>
        <span className={`status-pill status-pill--${storyStatus.replace(/\s+/g, "-").toLowerCase()}`}>{storyStatus}</span>
      </div>

      <div className="top-bar__center">
        <label className="sr-only" htmlFor="global-search">
          Search chapters, characters, lore
        </label>
        <div className="search-field">
          <span className="search-field__icon" aria-hidden />
          <input id="global-search" type="search" placeholder="Search chapters, characters, lore…" autoComplete="off" />
        </div>
        <button type="button" className="btn btn--ghost btn--sm">
          Quick command
        </button>
        <div className="breadcrumbs" role="navigation" aria-label="Workspace">
          <span>Project</span>
          <span className="breadcrumbs__sep">/</span>
          <span>Manuscript</span>
          <span className="breadcrumbs__sep">/</span>
          <span className="breadcrumbs__current">Live Session</span>
        </div>
      </div>

      <div className="top-bar__right">
        <span className="save-indicator">{saveLabel}</span>
        <button type="button" className="icon-btn" aria-label="Notifications">
          <span className="icon-bell" aria-hidden />
        </button>
        <button type="button" className="icon-btn" aria-label="Theme">
          <span className="icon-theme" aria-hidden />
        </button>
        <div className="export-dropdown">
          <button type="button" className="btn btn--secondary btn--sm">
            Export
          </button>
          <div className="export-dropdown__menu" role="group" aria-label="Export options">
            <a href="/api/export/pdf" target="_blank" rel="noreferrer">
              Export PDF
            </a>
            <a href="/api/export/ebook" target="_blank" rel="noreferrer">
              Export E-Book
            </a>
          </div>
        </div>
        <button type="button" className="avatar-btn" aria-label="Account">
          Z
        </button>
        <button type="button" className="btn btn--primary btn--sm" onClick={onSyncPreview}>
          Sync to Book Preview
        </button>
      </div>
    </header>
  );
}
