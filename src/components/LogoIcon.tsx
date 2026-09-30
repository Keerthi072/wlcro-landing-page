function LogoIcon({ className = 'h-8 w-auto' }: { className?: string }) {
  return (
    <img
      src="/models/wlcro_logo.svg"
      alt="Wlcro"
      className={`object-contain ${className}`}
    />
  );
}

export default LogoIcon;
