function Base({ size = 20, children, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

export function BowlIcon(props) {
  return (
    <Base {...props}>
      <path d="M3 11h18a9 8 0 0 1-18 0Z" />
      <path d="M7 11c.5-2 1.6-3 2-4M12 11c.3-2 .8-3.4.5-5M17 11c-.3-2-1-3-1.6-4" />
    </Base>
  );
}

export function FlameIcon(props) {
  return (
    <Base {...props}>
      <path d="M12 3c1 2.5-1 3.5-1 5.5 0 1.2 1 2 2 2s2-1 1.7-2.4C15.5 10 17 12 17 14.5A5 5 0 0 1 7 15c0-3 2-4.5 2.5-7C9.8 6.8 10.5 4.8 12 3Z" />
    </Base>
  );
}

export function KnifeIcon(props) {
  return (
    <Base {...props}>
      <path d="M4 20 15 9" />
      <path d="M13 7l4 4 3-3a4 4 0 0 0-4-4l-3 3Z" />
    </Base>
  );
}

export function LeafIcon(props) {
  return (
    <Base {...props}>
      <path d="M5 19c-1-6 2-13 14-14 1 12-6 15-14 14Z" />
      <path d="M6 18c3-3 6-6 12-12" />
    </Base>
  );
}

export function CupIcon(props) {
  return (
    <Base {...props}>
      <path d="M6 8h10v6a5 5 0 0 1-5 5v0a5 5 0 0 1-5-5V8Z" />
      <path d="M16 9h1.5a2.5 2.5 0 0 1 0 5H16" />
      <path d="M9 3.5c-.6.8-.6 1.4 0 2.2M12 3.5c-.6.8-.6 1.4 0 2.2" />
    </Base>
  );
}

export function PlateIcon(props) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
    </Base>
  );
}

export function ListIcon(props) {
  return (
    <Base {...props}>
      <path d="M8 6h12M8 12h12M8 18h12" />
      <circle cx="4" cy="6" r="1" fill="currentColor" stroke="none" />
      <circle cx="4" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="4" cy="18" r="1" fill="currentColor" stroke="none" />
    </Base>
  );
}

export function StarIcon(props) {
  return (
    <Base {...props}>
      <path d="M12 3.5l2.4 5 5.5.6-4.1 3.8 1.1 5.4L12 15.8l-4.9 2.5 1.1-5.4-4.1-3.8 5.5-.6L12 3.5Z" />
    </Base>
  );
}

export function BasketIcon(props) {
  return (
    <Base {...props}>
      <path d="M4 9h16l-1.5 9.5a2 2 0 0 1-2 1.5H7.5a2 2 0 0 1-2-1.5L4 9Z" />
      <path d="M8 9 10 4M16 9 14 4M9 13v3M15 13v3" />
    </Base>
  );
}

export function UserIcon(props) {
  return (
    <Base {...props}>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20c1.2-3.6 4-5.5 7-5.5s5.8 1.9 7 5.5" />
    </Base>
  );
}

export function PhoneIcon(props) {
  return (
    <Base {...props}>
      <rect x="7" y="3" width="10" height="18" rx="2.2" />
      <path d="M11 18h2" />
    </Base>
  );
}

export function MailIcon(props) {
  return (
    <Base {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </Base>
  );
}

export function LockIcon(props) {
  return (
    <Base {...props}>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V7.5a4 4 0 0 1 8 0V11" />
    </Base>
  );
}

export function EyeIcon(props) {
  return (
    <Base {...props}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.6" />
    </Base>
  );
}

export function ArrowRightIcon(props) {
  return (
    <Base {...props}>
      <path d="M4 12h16M13 5l7 7-7 7" />
    </Base>
  );
}

export function BackArrowIcon(props) {
  return (
    <Base {...props}>
      <path d="M20 12H4M11 5l-7 7 7 7" />
    </Base>
  );
}

export function CloseIcon(props) {
  return (
    <Base {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Base>
  );
}

export function GoogleMark(props) {
  return (
    <Base {...props} strokeWidth="0">
      <circle cx="12" cy="12" r="10" fill="#fff" stroke="#e3d9c8" strokeWidth="1" />
      <text x="12" y="16.5" textAnchor="middle" fontSize="11" fontWeight="700" fill="#4285F4">
        G
      </text>
    </Base>
  );
}

export function TelebirrMark(props) {
  return (
    <Base {...props} strokeWidth="0">
      <rect x="2" y="2" width="20" height="20" rx="6" fill="#1877D1" />
      <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">
        t
      </text>
    </Base>
  );
}

export function AwardIcon(props) {
  return (
    <Base {...props}>
      <circle cx="12" cy="9" r="5" />
      <path d="M9 13.5 7.5 21 12 18.5 16.5 21 15 13.5" />
    </Base>
  );
}

export function CategoryIcon({ category = "", ...props }) {
  const c = category.toLowerCase();
  if (c.includes("stew")) return <BowlIcon {...props} />;
  if (c.includes("tibs") || c.includes("grill")) return <FlameIcon {...props} />;
  if (c.includes("kitfo") || c.includes("raw") || c.includes("cured")) return <KnifeIcon {...props} />;
  if (c.includes("fasting") || c.includes("vegan")) return <LeafIcon {...props} />;
  if (c.includes("beverage") || c.includes("tej")) return <CupIcon {...props} />;
  return <PlateIcon {...props} />;
}
