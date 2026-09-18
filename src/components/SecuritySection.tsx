import { ArrowRight } from 'lucide-react';

function WealthCoin() {
  return (
    <svg
      viewBox="0 0 360 360"
      className="w-64 h-64 md:w-80 md:h-80 lg:w-[26rem] lg:h-[26rem] drop-shadow-[0_24px_28px_rgba(0,0,0,0.15)]"
      role="img"
      aria-label="Wlcro wealth coin"
    >
      <defs>
        <radialGradient id="coin-face" cx="35%" cy="28%" r="78%">
          <stop offset="0%" stopColor="#fff5b0" />
          <stop offset="32%" stopColor="#f7c94f" />
          <stop offset="72%" stopColor="#c98512" />
          <stop offset="100%" stopColor="#754008" />
        </radialGradient>
        <linearGradient id="coin-rim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff7bd" />
          <stop offset="28%" stopColor="#d99a1c" />
          <stop offset="58%" stopColor="#8a4e08" />
          <stop offset="100%" stopColor="#f6c94d" />
        </linearGradient>
        <linearGradient id="coin-letter" x1="25%" y1="10%" x2="75%" y2="90%">
          <stop offset="0%" stopColor="#fffbd0" />
          <stop offset="36%" stopColor="#f4c13e" />
          <stop offset="100%" stopColor="#9b5608" />
        </linearGradient>
      </defs>
      <circle cx="180" cy="184" r="168" fill="#754008" opacity="0.7" />
      <circle cx="180" cy="174" r="164" fill="url(#coin-rim)" stroke="#ffd965" strokeWidth="3" />
      <circle cx="180" cy="174" r="140" fill="url(#coin-face)" stroke="#8d500a" strokeWidth="5" />
      <circle cx="180" cy="174" r="122" fill="none" stroke="#fce27b" strokeWidth="2" strokeDasharray="2 10" />
      <path
        d="M102 112h34l44 82 44-82h34l-59 126h-38l-59-126Zm-3 0h33v126H99V112Zm132 0h33v126h-33V112Z"
        fill="url(#coin-letter)"
        stroke="#9a5709"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M180 82v184M137 112l43 78 43-78" fill="none" stroke="#fff4a5" strokeWidth="2" opacity="0.7" />
      <circle cx="180" cy="174" r="145" fill="none" stroke="#fff4a5" strokeWidth="2" opacity="0.65" />
    </svg>
  );
}

function SecuritySection() {
  return (
    <section className="bg-[#0d0d0d] px-6 py-24">
      <div className="relative w-full max-w-[88rem] mx-auto rounded-[2rem] bg-[#F7F7F7] overflow-hidden p-8 md:p-16 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-black/55 text-sm mb-2">Built-in Protection</p>
            <h2
              className="text-black text-4xl md:text-5xl font-medium leading-tight mb-6"
              style={{ letterSpacing: '-0.03em' }}
            >
              Your money&apos;s
              <br />
              safe space
            </h2>
            <p className="text-black/70 text-base md:text-lg leading-relaxed max-w-md mb-8">
              Every account connection is read-only and encrypted end-to-end. Wlcro can orchestrate
              your money, but it can never hold it. Foreign holdings are flagged for PFIC exposure
              before they become a filing surprise.
            </p>
            <button className="inline-flex items-center gap-3 bg-black text-white text-base font-medium pl-7 pr-2 py-2 rounded-full hover:bg-gray-800 transition-colors duration-200">
              Learn more
              <span className="bg-white rounded-full p-2 hover:bg-gray-100 transition-colors duration-200">
                <ArrowRight className="w-5 h-5 text-black" />
              </span>
            </button>
          </div>

          <div className="relative flex items-center justify-center min-h-[280px] md:min-h-[360px]">
            <WealthCoin />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SecuritySection;
