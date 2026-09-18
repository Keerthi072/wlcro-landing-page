function OrbitIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 256 256"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="14"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="24" y="24" width="132" height="132" rx="30" />
      <rect x="100" y="100" width="132" height="132" rx="30" />
    </svg>
  );
}

export default OrbitIcon;
