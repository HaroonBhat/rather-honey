import { BeeIcon } from '../Icons';

const WORDS = [
  { text: 'PURE HONEY', style: '' },
  { text: 'NATURAL GOODNESS', style: 'outline' },
  { text: "NATURE'S GOLD", style: 'italic' },
  { text: 'RATHER HONEY', style: '' },
];

function Track({ tone }) {
  return (
    <div className="marquee__track" aria-hidden="true">
      {WORDS.map((word) => (
        <span className="marquee__item" key={word.text}>
          <span className={word.style === 'outline' ? 'outline' : undefined}>
            {word.style === 'italic' ? <em>{word.text}</em> : word.text}
          </span>
          <BeeIcon className="marquee__sep" size={26} />
        </span>
      ))}
    </div>
  );
}

/**
 * Infinite brand marquee. Two identical tracks scroll in sequence so the loop is
 * seamless; the second is hidden from assistive tech and motion is disabled for
 * `prefers-reduced-motion`.
 */
export default function Marquee({ tone = 'dark' }) {
  return (
    <div className={`marquee${tone === 'gold' ? ' marquee--gold' : ''}`}>
      <span className="visually-hidden">
        Pure honey. Natural goodness. Nature&apos;s gold. Rather Honey.
      </span>
      <Track />
      <Track />
    </div>
  );
}
