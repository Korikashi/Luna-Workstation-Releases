import { site } from '../config/site';
import { Icon } from './Icon';
import { screenshotSrcSet, screenshotUrl } from './screenshots';

export function Hero() {
  const shot = site.screenshots[0];

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__text">
          <p className="eyebrow">Windows desktop application · Version {site.version}</p>
          <h1 id="hero-title" className="hero__title">
            {site.name}
          </h1>
          <p className="hero__lead">
            Run several local Remote Desktop sessions side by side in one window. Each desktop gets its own tab,
            Luna can create the Windows account it uses, and automations can run when it connects.
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary btn--lg" href={site.downloadUrl}>
              <Icon name="download" size={16} />
              <span>Download for Windows</span>
            </a>
            <a className="btn btn--secondary btn--lg" href={site.kofiUrl} target="_blank" rel="noopener noreferrer">
              <span>Support on Ko-fi</span>
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </div>
          <p className="hero__meta">
            <span className="badge badge--accent">v{site.version}</span>
            <span>{site.platform}</span>
            <span aria-hidden="true">·</span>
            <span>Free</span>
            <span aria-hidden="true">·</span>
            <span>English and Spanish</span>
          </p>
        </div>

        <div className="hero__visual">
          {shot ? (
            <figure className="window-frame">
              <img
                src={screenshotUrl(shot.file)}
                srcSet={screenshotSrcSet(shot)}
                sizes="(max-width: 900px) calc(100vw - 32px), 560px"
                width={shot.width}
                height={shot.height}
                alt={shot.alt}
                fetchPriority="high"
                decoding="async"
              />
            </figure>
          ) : (
            <div className="brand-panel">
              <img
                className="brand-panel__icon"
                src={`${import.meta.env.BASE_URL}icon-256.png`}
                width={192}
                height={192}
                alt="Luna WorkStation official icon"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
