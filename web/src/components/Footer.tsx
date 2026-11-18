import { site } from '../config/site';
import { MoonMark } from './Icon';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <div className="brand">
            <MoonMark size={18} className="brand__mark" />
            <span className="brand__name">{site.name}</span>
          </div>
          <p className="footer__text">
            Developed by {site.developer}. Version {site.version} for Windows.
          </p>
          <a className="btn btn--secondary btn--sm" href={site.kofiUrl} target="_blank" rel="noopener noreferrer">
            Support on Ko-fi
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        </div>

        <nav className="footer__links" aria-label="Project links">
          <h2 className="footer__heading">Project</h2>
          <ul>
            <li>
              <a href={site.downloadUrl}>Download</a>
            </li>
            <li>
              <a href={site.releasesUrl} target="_blank" rel="noopener noreferrer">
                Releases<span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href={site.repositoryUrl} target="_blank" rel="noopener noreferrer">
                GitHub repository<span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href={site.kofiUrl} target="_blank" rel="noopener noreferrer">
                Ko-fi<span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className="footer__links">
          <h2 className="footer__heading">Contact</h2>
          <ul>
            <li>
              <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer__legal">
        <p>
          © {year} {site.developer}. {site.name} is free of charge for personal and commercial use, distributed under
          a proprietary license (EULA) shown during installation. It is not open source.
        </p>
        <p>
          The installer includes AutoHotkey v2, distributed under the GNU General Public License v2.0; its license and
          notices are installed with Luna WorkStation. Windows and Remote Desktop are trademarks of Microsoft.
          Roblox is a trademark of Roblox Corporation. This project is not affiliated with Microsoft, Roblox or
          Discord.
        </p>
      </div>
    </footer>
  );
}
