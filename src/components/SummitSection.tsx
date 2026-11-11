import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   Types & Constants
   ═══════════════════════════════════════════════════════════════ */
type RiskProfile = 'conservative' | 'balanced' | 'growth';
type Outlook = 'sunny' | 'neutral' | 'rainy';

const GROWTH_RATES: Record<RiskProfile, number> = {
  conservative: 0.04,
  balanced: 0.07,
  growth: 0.10,
};

const GROWTH_PERCENT: Record<RiskProfile, string> = {
  conservative: '4%',
  balanced: '7%',
  growth: '10%',
};

const OUTLOOK_TEXT: Record<Outlook, { headline: string; description: string }> = {
  sunny: {
    headline: 'Clear skies ahead.',
    description:
      'You\u2019re on pace to reach your financial summit \u2014 no action needed this week.',
  },
  neutral: {
    headline: 'Partly cloudy.',
    description:
      'You\u2019re making progress, but a few adjustments could sharpen your trajectory.',
  },
  rainy: {
    headline: 'Rain on the horizon.',
    description:
      'At this pace the summit is out of reach \u2014 consider raising your savings rate or extending the timeline.',
  },
};

/* ═══════════════════════════════════════════════════════════════
   Financial helpers
   ═══════════════════════════════════════════════════════════════ */
function computeFV(monthly: number, years: number, annualRate: number): number {
  if (annualRate === 0) return monthly * years * 12;
  const r = annualRate / 12;
  const n = years * 12;
  return monthly * ((Math.pow(1 + r, n) - 1) / r);
}

function deriveOutlook(pct: number): Outlook {
  if (pct >= 100) return 'sunny';
  if (pct >= 60) return 'neutral';
  return 'rainy';
}

/* ═══════════════════════════════════════════════════════════════
   Sub-components
   ═══════════════════════════════════════════════════════════════ */

/* ── Circular progress gauge ──────────────────────────────────── */
function GoalProgressPanel({ pct, outlook }: { pct: number; outlook: Outlook }) {
  const R = 46;
  const C = 2 * Math.PI * R;
  const offset = C - (Math.min(pct, 100) / 100) * C;
  const color =
    outlook === 'sunny' ? '#34D399' : outlook === 'neutral' ? '#F5C842' : '#EF4444';

  return (
    <div className="rounded-2xl border border-[#414942]/70 bg-[#141815]/50 p-5 lg:p-6 flex-1 flex flex-col justify-between items-center w-full min-h-[220px]">
      <p className="text-white/40 text-xs font-medium tracking-wide self-start">
        Goal Progress
      </p>
      <div className="relative flex items-center justify-center my-auto py-2">
        <svg width="128" height="128" viewBox="0 0 128 128" className="-rotate-90">
          <circle
            cx="64"
            cy="64"
            r={R}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="6"
          />
          <circle
            cx="64"
            cy="64"
            r={R}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeDasharray={C}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <span className="absolute text-2xl lg:text-3xl font-semibold text-white tracking-tight tabular-nums">
          {Math.min(pct, 999)}%
        </span>
      </div>
      <p className="text-white/40 text-xs text-center">
        {outlook === 'sunny'
          ? 'On track to summit'
          : outlook === 'neutral'
            ? 'Getting there'
            : 'Needs attention'}
      </p>
    </div>
  );
}

/* ── Risk / allocation selector ───────────────────────────────── */
function RiskAllocationPanel({
  risk,
  onRiskChange,
}: {
  risk: RiskProfile;
  onRiskChange: (r: RiskProfile) => void;
}) {
  return (
    <div className="w-full shrink-0 pt-2 pb-1">
      <p className="text-white/40 text-xs font-medium tracking-wide mb-3">
        Risk &amp; Allocation
      </p>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onRiskChange('conservative')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium border transition-all duration-200 text-center ${
              risk === 'conservative'
                ? 'bg-[#CBE2CF] text-[#181D19] border-transparent font-semibold shadow-sm'
                : 'bg-[#181D19] text-white/70 border-[#414942] hover:text-white hover:border-white/40'
            }`}
          >
            Conservative
          </button>
          <button
            type="button"
            onClick={() => onRiskChange('balanced')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium border transition-all duration-200 text-center ${
              risk === 'balanced'
                ? 'bg-[#CBE2CF] text-[#181D19] border-transparent font-semibold shadow-sm'
                : 'bg-[#181D19] text-white/70 border-[#414942] hover:text-white hover:border-white/40'
            }`}
          >
            Balanced
          </button>
        </div>
        <div className="flex">
          <button
            type="button"
            onClick={() => onRiskChange('growth')}
            className={`w-[48%] py-2 px-3 rounded-lg text-xs font-medium border transition-all duration-200 text-center ${
              risk === 'growth'
                ? 'bg-[#CBE2CF] text-[#181D19] border-transparent font-semibold shadow-sm'
                : 'bg-[#181D19] text-white/70 border-[#414942] hover:text-white hover:border-white/40'
            }`}
          >
            Growth
          </button>
        </div>
      </div>
      <p className="text-white/30 text-[11px] mt-3">
        Est. {GROWTH_PERCENT[risk]} annual return
      </p>
    </div>
  );
}

/* ── Single control row ───────────────────────────────────────── */
function ControlRow({
  label,
  display,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  display: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-baseline">
        <span className="text-white/80 text-xs md:text-sm font-medium">{label}</span>
        <span className="text-white text-xs md:text-sm font-semibold tabular-nums">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="summit-slider"
      />
    </div>
  );
}

/* ── Financial controls panel ─────────────────────────────────── */
function FinancialControlsPanel({
  income,
  onIncomeChange,
  savingsRate,
  onSavingsRateChange,
  duration,
  onDurationChange,
  target,
  onTargetChange,
}: {
  income: number;
  onIncomeChange: (v: number) => void;
  savingsRate: number;
  onSavingsRateChange: (v: number) => void;
  duration: number;
  onDurationChange: (v: number) => void;
  target: number;
  onTargetChange: (v: number) => void;
}) {
  return (
    <div className="rounded-2xl border border-[#414942]/70 bg-[#141815]/50 p-5 lg:p-6 flex-1 flex flex-col justify-between w-full min-h-[280px]">
      <p className="text-white/40 text-xs font-medium tracking-wide mb-3">
        Plan Your Goal
      </p>
      <div className="flex-1 flex flex-col justify-around py-1 gap-3.5">
        <ControlRow
          label="Monthly Income"
          display={`$${income.toLocaleString()}`}
          min={1000} max={50000} step={500}
          value={income} onChange={onIncomeChange}
        />
        <ControlRow
          label="Savings Rate"
          display={`${savingsRate}%`}
          min={5} max={80} step={1}
          value={savingsRate} onChange={onSavingsRateChange}
        />
        <ControlRow
          label="Goal Duration"
          display={`${duration} yrs`}
          min={1} max={30} step={1}
          value={duration} onChange={onDurationChange}
        />
        <ControlRow
          label="Target Amount"
          display={`$${target.toLocaleString()}`}
          min={10000} max={5000000} step={10000}
          value={target} onChange={onTargetChange}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Main Section
   ═══════════════════════════════════════════════════════════════ */
function SummitSection() {
  const [income, setIncome] = useState(8000);
  const [savingsRate, setSavingsRate] = useState(20);
  const [duration, setDuration] = useState(10);
  const [target, setTarget] = useState(150000);
  const [risk, setRisk] = useState<RiskProfile>('balanced');

  const { progressPct, outlook } = useMemo(() => {
    const monthly = income * (savingsRate / 100);
    const fv = computeFV(monthly, duration, GROWTH_RATES[risk]);
    const pct = Math.min(999, Math.round((fv / target) * 100));
    return { progressPct: pct, outlook: deriveOutlook(pct) };
  }, [income, savingsRate, duration, target, risk]);

  const { headline, description } = OUTLOOK_TEXT[outlook];

  return (
    <section className="relative w-full bg-[#0d0d0d] px-4 md:px-6 py-20 md:py-28 flex flex-col justify-center items-center overflow-hidden">
      <div className="w-full max-w-[84rem] mx-auto">
        {/* ── Top Header Row ─────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 md:mb-10">
          {/* Left: Badge + Headline */}
          <div className="flex flex-col items-start">
            {/* Top Left: Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#414942] bg-[#181D19]/60 text-[#DFE4DD] text-xs font-medium self-start shadow-sm mb-4 md:mb-5">
              <Check className="w-3.5 h-3.5 text-[#34D399]" strokeWidth={2.5} />
              <span>Wlcro Finmap</span>
            </div>

            {/* Headline: Plan your goal live. */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-medium tracking-tight text-white leading-[1.12]">
              Plan your goal<br />live.
            </h2>
          </div>

          {/* Top Right: Explainer text */}
          <p className="text-left sm:text-right text-xs md:text-sm text-[#8E988F] font-normal leading-relaxed max-w-sm sm:pb-1">
            Drag the sliders - this is a real projection engine, not a screenshot
          </p>
        </div>

        {/* ── Main Bento Card ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[2rem] md:rounded-[2.5rem] bg-[#181D19] border border-[#414942]/60 p-4 sm:p-6 md:p-8 shadow-2xl overflow-hidden"
        >
          {/* Responsive 3-Column Grid with balanced column widths */}
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_310px] xl:grid-cols-[300px_1fr_330px] gap-4 md:gap-5 items-stretch w-full min-h-[480px] lg:h-[520px]">

            {/* ── Left Column: Goal Progress + Risk & Allocation ── */}
            <div className="flex flex-col gap-4 md:gap-5 justify-between h-full order-2 lg:order-1">
              <GoalProgressPanel pct={progressPct} outlook={outlook} />
              <RiskAllocationPanel risk={risk} onRiskChange={setRisk} />
            </div>

            {/* ── Center Column: Title + 3D Modal Finmap Asset ───── */}
            <div className="rounded-2xl border border-[#414942]/70 bg-[#141815]/50 p-4 sm:p-5 flex flex-col items-center justify-between h-full min-h-[380px] relative overflow-hidden order-1 lg:order-2">
              {/* Header Title */}
              <div className="z-10 text-center pt-1 mb-1">
                <p className="text-white/60 text-xs md:text-sm font-medium tracking-widest uppercase">
                  WLCRO Finmap
                </p>
              </div>

              {/* 3D Model Finmap Asset */}
              <div className="relative w-full flex-1 flex items-center justify-center min-h-[320px]">
                <model-viewer
                  src="/models/summit-original.glb"
                  auto-rotate
                  auto-rotate-delay="0"
                  rotation-per-second="10deg"
                  camera-orbit="0deg 68deg 95%"
                  camera-target="0m -0.05m 0m"
                  field-of-view="26deg"
                  camera-controls="false"
                  disable-zoom
                  interaction-prompt="none"
                  shadow-intensity="0"
                  exposure="1.2"
                  environment-image="neutral"
                  aria-label="3D Finmap model — Wlcro Finmap"
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'transparent',
                  }}
                />
              </div>
            </div>

            {/* ── Right Column: Plan Your Goal + White Weather Status Card ── */}
            <div className="flex flex-col gap-4 md:gap-5 justify-between h-full order-3">
              <FinancialControlsPanel
                income={income} onIncomeChange={setIncome}
                savingsRate={savingsRate} onSavingsRateChange={setSavingsRate}
                duration={duration} onDurationChange={setDuration}
                target={target} onTargetChange={setTarget}
              />

              {/* White Status Card */}
              <div className="rounded-2xl bg-white p-5 text-[#181D19] shadow-md transition-all duration-300 shrink-0">
                <h3 className="text-[#183B2B] text-base md:text-lg font-semibold tracking-tight mb-1.5 transition-all duration-300">
                  {headline}
                </h3>
                <p className="text-[#3A4A3F] text-xs md:text-[13px] leading-relaxed transition-all duration-300">
                  {description}
                </p>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default SummitSection;
