import { features, securityNotes } from '../content/features';
import { Icon } from './Icon';

export function Features() {
  return (
    <section className="section" id="features" aria-labelledby="features-title">
      <div className="container">
        <header className="section__head">
          <p className="eyebrow">Features</p>
          <h2 id="features-title" className="section__title">
            What Luna WorkStation does
          </h2>
          <p className="section__lead">Everything listed here is included in the current public version.</p>
        </header>

        <ul className="feature-grid">
          {features.map((f) => (
            <li key={f.title} className="feature">
              <div className="feature__head">
                <span className="feature__icon">
                  <Icon name={f.icon} size={18} />
                </span>
                <h3 className="feature__title">{f.title}</h3>
                {f.experimental && <span className="badge badge--warning">Experimental</span>}
              </div>
              <p className="feature__text">{f.text}</p>
            </li>
          ))}
        </ul>

        <aside className="note" aria-labelledby="security-title">
          <div className="note__head">
            <Icon name="shield" size={16} />
            <h3 id="security-title" className="note__title">
              Security by design
            </h3>
          </div>
          <ul className="note__list">
            {securityNotes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
