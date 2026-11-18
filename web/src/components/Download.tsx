import { site } from '../config/site';
import { Icon, MoonMark } from './Icon';

export function Download() {
  return (
    <section className="section" id="download" aria-labelledby="download-title">
      <div className="container">
        <header className="section__head">
          <p className="eyebrow">Download</p>
          <h2 id="download-title" className="section__title">
            Get Luna WorkStation
          </h2>
        </header>

        <div className="download-card">
          <div className="download-card__main">
            <MoonMark size={40} className="download-card__mark" />
            <div>
              <h3 className="download-card__title">{site.name}</h3>
              <dl className="specs">
                <div>
                  <dt>Version</dt>
                  <dd>{site.version} (stable)</dd>
                </div>
                <div>
                  <dt>Platform</dt>
                  <dd>{site.platform}</dd>
                </div>
                <div>
                  <dt>File</dt>
                  <dd>
                    <code>{site.installerFileName}</code>
                  </dd>
                </div>
                <div>
                  <dt>License</dt>
                  <dd>Free, proprietary (EULA)</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="download-card__actions">
            <a className="btn btn--primary btn--lg" href={site.downloadUrl}>
              <Icon name="download" size={16} />
              <span>Download for Windows</span>
            </a>
            <a className="link" href={site.releasesUrl} target="_blank" rel="noopener noreferrer">
              Release notes and checksums
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </div>
        </div>

        <ul className="requirements" aria-label="Requirements">
          <li>
            <Icon name="monitor" size={14} />
            <span>64-bit Windows with the Remote Desktop components</span>
          </li>
          <li>
            <Icon name="shield" size={14} />
            <span>Administrator account (UAC prompt on start)</span>
          </li>
          <li>
            <Icon name="keyboard" size={14} />
            <span>AutoHotkey v2 included, no separate install</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
