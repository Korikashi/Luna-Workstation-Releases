import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from 'react';
import { site } from '../config/site';
import { Icon } from './Icon';
import { screenshotSrcSet, screenshotUrl } from './screenshots';

/**
 * Screenshot gallery with an in-page viewer based on the native <dialog> element (focus containment, Escape to
 * close, focus returned to the opening thumbnail). Arrow keys move between screenshots.
 */
export function Gallery() {
  const shots = site.screenshots;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const [index, setIndex] = useState(0);

  const open = (i: number, opener: HTMLButtonElement) => {
    openerRef.current = opener;
    setIndex(i);
    dialogRef.current?.showModal();
  };

  const close = () => dialogRef.current?.close();

  const step = useCallback(
    (delta: number) => setIndex((i) => (i + delta + shots.length) % shots.length),
    [shots.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => openerRef.current?.focus();
    dialog.addEventListener('close', onClose);
    return () => dialog.removeEventListener('close', onClose);
  }, []);

  const onKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (shots.length < 2) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      step(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      step(-1);
    }
  };

  // A click on the dialog itself (outside its content box) closes it.
  const onDialogClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) close();
  };

  const current = shots[index];

  return (
    <section className="section section--alt" id="gallery" aria-labelledby="gallery-title">
      <div className="container">
        <header className="section__head">
          <p className="eyebrow">Gallery</p>
          <h2 id="gallery-title" className="section__title">
            Screenshots
          </h2>
          {shots.length > 0 && <p className="section__lead">Select a screenshot to enlarge it.</p>}
        </header>

        {shots.length === 0 ? (
          <p className="empty-state">
            <Icon name="info" size={16} />
            <span>Screenshots of version {site.version} will be published here soon.</span>
          </p>
        ) : (
          <ul className="gallery">
            {shots.map((s, i) => (
              <li key={s.file} className="gallery__item">
                <button
                  type="button"
                  className="gallery__thumb"
                  onClick={(e) => open(i, e.currentTarget)}
                  aria-label={`Enlarge screenshot: ${s.caption}`}
                  aria-describedby={`shot-desc-${i}`}
                  aria-haspopup="dialog"
                >
                  {/* The button carries the label; the full description is read in the viewer. */}
                  <img
                    src={screenshotUrl(s.thumb)}
                    srcSet={screenshotSrcSet(s)}
                    sizes="(max-width: 760px) calc(100vw - 32px), 560px"
                    width={s.width}
                    height={s.height}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </button>
                <h3 className="gallery__caption">{s.caption}</h3>
                <p className="gallery__desc" id={`shot-desc-${i}`}>
                  {s.description}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {shots.length > 0 && (
        <dialog
          ref={dialogRef}
          className="lightbox"
          aria-labelledby="lightbox-caption"
          aria-describedby="lightbox-desc"
          onKeyDown={onKeyDown}
          onClick={onDialogClick}
        >
          {current && (
            <div className="lightbox__body">
              <div className="lightbox__bar">
                <p id="lightbox-caption" className="lightbox__caption">
                  {current.caption}
                  {shots.length > 1 && (
                    <span className="lightbox__count">
                      {' '}
                      · {index + 1} of {shots.length}
                    </span>
                  )}
                </p>
                <button type="button" className="btn btn--ghost btn--icon" onClick={close} aria-label="Close">
                  <Icon name="close" size={14} />
                </button>
              </div>
              <div className="lightbox__stage">
                {shots.length > 1 && (
                  <button
                    type="button"
                    className="btn btn--secondary btn--icon lightbox__nav lightbox__nav--prev"
                    onClick={() => step(-1)}
                    aria-label="Previous screenshot"
                  >
                    <Icon name="chevronLeft" size={14} />
                  </button>
                )}
                <img
                  className="lightbox__img"
                  src={screenshotUrl(current.file)}
                  width={current.width}
                  height={current.height}
                  alt={current.alt}
                />
                {shots.length > 1 && (
                  <button
                    type="button"
                    className="btn btn--secondary btn--icon lightbox__nav lightbox__nav--next"
                    onClick={() => step(1)}
                    aria-label="Next screenshot"
                  >
                    <Icon name="chevronRight" size={14} />
                  </button>
                )}
              </div>
              <p id="lightbox-desc" className="lightbox__desc">
                {current.description}
              </p>
            </div>
          )}
        </dialog>
      )}
    </section>
  );
}
