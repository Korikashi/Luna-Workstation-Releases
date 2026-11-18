import { faq } from '../content/faq';
import { Icon } from './Icon';

/** Native <details>/<summary>: keyboard accessible and readable without JavaScript state. */
export function Faq() {
  return (
    <section className="section section--alt" id="faq" aria-labelledby="faq-title">
      <div className="container container--narrow">
        <header className="section__head">
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-title" className="section__title">
            Frequently asked questions
          </h2>
        </header>

        <div className="faq">
          {faq.map((item) => (
            <details key={item.question} className="faq__item">
              <summary className="faq__question">
                <span>{item.question}</span>
                <Icon name="chevronDown" size={12} className="faq__chevron" />
              </summary>
              <div className="faq__answer">
                {item.answer.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
