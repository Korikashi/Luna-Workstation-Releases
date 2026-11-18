import { useEffect, useRef, useState } from 'react';
import { site } from '../config/site';
import { Icon, MoonMark } from './Icon';

export const navItems = [
  { id: 'features', label: 'Features' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'download', label: 'Download' },
  { id: 'faq', label: 'FAQ' },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the mobile menu with Escape (returning focus to the toggle) or when the viewport becomes wide.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const wide = window.matchMedia('(min-width: 801px)');
    const onWide = () => wide.matches && setOpen(false);
    document.addEventListener('keydown', onKey);
    wide.addEventListener('change', onWide);
    return () => {
      document.removeEventListener('keydown', onKey);
      wide.removeEventListener('change', onWide);
    };
  }, [open]);

  return (
    <header className="header">
      <div className="container header__bar">
        <a className="brand" href="#top" aria-label={`${site.name}, back to top`}>
          <MoonMark size={20} className="brand__mark" />
          <span className="brand__name">{site.name}</span>
        </a>

        <nav className="nav" aria-label="Main">
          <ul className="nav__list" id="main-nav" data-open={open}>
            {navItems.map((item) => (
              <li key={item.id}>
                <a className="nav__link" href={`#${item.id}`} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <a
            className="btn btn--primary btn--sm header__download"
            href={site.downloadUrl}
            aria-label="Download for Windows"
          >
            <Icon name="download" size={14} />
            <span>Download</span>
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="btn btn--ghost btn--icon nav-toggle"
            aria-controls="main-nav"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'close' : 'menu'} size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
