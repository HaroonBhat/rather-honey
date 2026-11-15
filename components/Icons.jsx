/* Hand-drawn icon set — inline SVG keeps the page dependency-free and crisp. */

const Svg = ({ children, size = 20, stroke = 1.7, fill = 'none', ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    {children}
  </svg>
);

export const SearchIcon = (p) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </Svg>
);

export const UserIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
  </Svg>
);

export const BagIcon = (p) => (
  <Svg {...p}>
    <path d="M5 8h14l-1.1 12H6.1L5 8Z" />
    <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
  </Svg>
);

export const CloseIcon = (p) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
);

export const ArrowUpRight = (p) => (
  <Svg {...p}>
    <path d="M7 17 17 7M9 7h8v8" />
  </Svg>
);

export const ArrowRight = (p) => (
  <Svg {...p}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </Svg>
);

export const PlusIcon = (p) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);

export const MinusIcon = (p) => (
  <Svg {...p}>
    <path d="M5 12h14" />
  </Svg>
);

export const CheckIcon = (p) => (
  <Svg {...p}>
    <path d="m4 12.5 5 5L20 6.5" />
  </Svg>
);

export const StarIcon = ({ filled = true, ...p }) => (
  <Svg {...p} fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.4}>
    <path d="m12 3.6 2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.9 6.8 19.6l1-5.8-4.2-4.1 5.8-.8L12 3.6Z" />
  </Svg>
);

export const ChevronDown = (p) => (
  <Svg {...p}>
    <path d="m6 9 6 6 6-6" />
  </Svg>
);

export const TrashIcon = (p) => (
  <Svg {...p}>
    <path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13M10 11v6M14 11v6" />
  </Svg>
);

export const TruckIcon = (p) => (
  <Svg {...p}>
    <path d="M2 7h11v9H2zM13 10h4.5l3 3.2V16H13z" />
    <circle cx="6" cy="18" r="1.7" />
    <circle cx="17" cy="18" r="1.7" />
  </Svg>
);

export const ShieldIcon = (p) => (
  <Svg {...p}>
    <path d="M12 3 5 6v6c0 4.2 3 7.6 7 9 4-1.4 7-4.8 7-9V6l-7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </Svg>
);

export const LeafIcon = (p) => (
  <Svg {...p}>
    <path d="M5 19c0-7 5-12 14-13 1 9-4 14-11 14H5Z" />
    <path d="M5 19c3-4 6-6 10-8" />
  </Svg>
);

export const HexIcon = (p) => (
  <Svg {...p}>
    <path d="M12 3 20 7.5v9L12 21 4 16.5v-9L12 3Z" />
    <path d="M12 8.2 16 10.6v4.8L12 17.8 8 15.4v-4.8L12 8.2Z" />
  </Svg>
);

export const SunIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M5 5l1.8 1.8M17.2 17.2 19 19M19 5l-1.8 1.8M6.8 17.2 5 19" />
  </Svg>
);

export const DropIcon = (p) => (
  <Svg {...p}>
    <path d="M12 3s6 6.3 6 10.5A6 6 0 0 1 6 13.5C6 9.3 12 3 12 3Z" />
    <path d="M9.4 14.2a2.7 2.7 0 0 0 2.6 2.6" />
  </Svg>
);

export const MailIcon = (p) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 6.5 8.5 6 8.5-6" />
  </Svg>
);

export const PhoneIcon = (p) => (
  <Svg {...p}>
    <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z" />
  </Svg>
);

export const PinIcon = (p) => (
  <Svg {...p}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </Svg>
);

export const InstagramIcon = (p) => (
  <Svg {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="3.8" />
    <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
  </Svg>
);

export const WhatsappIcon = (p) => (
  <Svg {...p}>
    <path d="M20 11.7a8 8 0 0 1-11.8 7L4 20l1.4-4.1A8 8 0 1 1 20 11.7Z" />
    <path d="M9.2 8.4c.3-.5.7-.5 1-.4l.8 1.7c.1.3 0 .6-.2.8l-.4.4c.4 1 1.3 1.9 2.3 2.3l.4-.4c.2-.2.5-.3.8-.2l1.7.8c.2.3.1.7-.4 1-1.3.8-3 .3-4.4-1.1s-1.9-3.1-1.1-4.4l-.5-.5Z" strokeWidth="1.3" />
  </Svg>
);

export const BeeIcon = ({ size = 24, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false" {...p}>
    <ellipse cx="16" cy="12" rx="6" ry="7" fill="currentColor" opacity=".92" />
    <path d="M10.4 9.5h11.2M10 12.5h12M10.6 15.5h10.6" stroke="#2A140A" strokeWidth="1.6" strokeLinecap="round" />
    <ellipse cx="9" cy="9" rx="4.2" ry="3" fill="currentColor" opacity=".45" transform="rotate(-24 9 9)" />
    <ellipse cx="23" cy="9" rx="4.2" ry="3" fill="currentColor" opacity=".45" transform="rotate(24 23 9)" />
    <path d="M16 19v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const HoneycombMark = ({ size = 40, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true" {...p}>
    <path
      d="M20 2.5 34.5 11v17L20 36.5 5.5 28V11L20 2.5Z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path d="M20 10.5 27.5 15v9L20 28.5 12.5 24v-9L20 10.5Z" fill="currentColor" opacity=".22" />
    <circle cx="20" cy="19" r="2.6" fill="currentColor" />
  </svg>
);

export const SparkleIcon = (p) => (
  <Svg {...p}>
    <path d="M12 3.5 13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9 12 3.5Z" />
  </Svg>
);

export const QuoteIcon = (p) => (
  <Svg {...p} fill="currentColor" stroke="none">
    <path d="M9.5 6C6.5 7.4 5 9.9 5 13.4c0 2.8 1.5 4.6 3.7 4.6 2 0 3.4-1.4 3.4-3.4 0-1.9-1.3-3.2-3.1-3.2-.3 0-.7 0-1 .1.3-1.5 1.4-2.8 3-3.6L9.5 6Zm9 0c-3 1.4-4.5 3.9-4.5 7.4 0 2.8 1.5 4.6 3.7 4.6 2 0 3.4-1.4 3.4-3.4 0-1.9-1.3-3.2-3.1-3.2-.3 0-.7 0-1 .1.3-1.5 1.4-2.8 3-3.6L18.5 6Z" />
  </Svg>
);
