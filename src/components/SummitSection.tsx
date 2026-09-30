import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════ */
type RiskProfile = 'conservative' | 'balanced' | 'growth';
type Outlook = 'sunny' | 'neutral' | 'rainy';

const GROWTH_RATES: Record<RiskProfile, number> = {
  conservative: 0.04,
  balanced: 0.07,
  growth: 0.10,
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
  const R = 44;
  const C = 2 * Math.PI * R;
  const offset = C - (Math.min(pct, 100) / 100) * C;
  const color =
    outlook === 'sunny' ? '#8CF0CE' : outlook === 'neutral' ? '#F5C842' : '#E55B5B';

  return (
    <div className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-4 lg:p-5 flex-1 flex flex-col justify-between">
      <p className="text-white/40 text-[11px] font-medium tracking-widest uppercase mb-1">
        Goal Progress
      </p>
      <div className="relative flex items-center justify-center flex-1 my-1">
        <svg width="116" height="116" viewBox="0 0 116 116" className="-rotate-90">
          <circle
            cx="58" cy="58" r={R}
            fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6"
          />
          <circle
            cx="58" cy="58" r={R}
            fill="none" stroke={color} strokeWidth="6"
            strokeDasharray={C} strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <span className="absolute text-2xl lg:text-3xl font-medium text-white tabular-nums">
          {Math.min(pct, 999)}%
        </span>
      </div>
      <p className="text-white/30 text-[11px] text-center">
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
  const opts: RiskProfile[] = ['conservative', 'balanced', 'growth'];

  return (
    <div className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-4 lg:p-5 shrink-0">
      <p className="text-white/40 text-[11px] font-medium tracking-widest uppercase mb-2.5">
        Risk &amp; Allocation
      </p>
      <div className="flex gap-2">
        {opts.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onRiskChange(o)}
            className={`flex-1 py-2 rounded-xl text-[11px] font-medium transition-all duration-300 ${
              risk === o
                ? 'bg-white/[0.10] text-white border border-white/[0.12]'
                : 'text-white/35 hover:text-white/55 border border-transparent'
            }`}
          >
            {o.charAt(0).toUpperCase() + o.slice(1)}
          </button>
        ))}
      </div>
      <p className="text-white/25 text-[10px] text-center mt-2.5">
        Est.{' '}
        {risk === 'conservative' ? '4%' : risk === 'balanced' ? '7%' : '10%'}{' '}
        annual return
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
    <div className="mb-3 lg:mb-3.5 last:mb-0">
      <div className="flex justify-between items-baseline mb-1">
        <span className="text-white/40 text-[11px] font-medium">{label}</span>
        <span className="text-white text-xs lg:text-sm font-medium tabular-nums">{display}</span>
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

/* ── Right-side financial controls panel ──────────────────────── */
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
    <div className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-4 lg:p-5 flex-1 flex flex-col justify-between">
      <p className="text-white/40 text-[11px] font-medium tracking-widest uppercase mb-2">
        Plan Your Goal
      </p>
      <div className="flex-1 flex flex-col justify-center">
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
          display={`${duration} yr${duration !== 1 ? 's' : ''}`}
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
    <section
      className="relative w-full min-h-screen py-10 md:py-16 lg:h-screen lg:max-h-screen lg:py-6 px-4 md:px-6 flex flex-col justify-center items-center overflow-hidden"
      style={{ background: 'none' }}
    >
      {/* ═══ Weather overlays ═══════════════════════════════════ */}

      {/* Rain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 2, opacity: outlook === 'rainy' ? 1 : 0, transition: 'opacity 1s ease' }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'repeating-linear-gradient(115deg, transparent, transparent 4px, rgba(180,200,220,0.18) 4px, rgba(180,200,220,0.08) 5px)',
            backgroundSize: '12px 12px',
            animation: 'summit-rain 1.8s linear infinite',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(60,75,95,0.25) 0%, rgba(40,55,75,0.15) 100%)',
          }}
        />
      </div>

      {/* Sunny */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 2, opacity: outlook === 'sunny' ? 1 : 0, transition: 'opacity 1s ease' }}
      >
        <div
          className="absolute"
          style={{
            top: '8%', right: '12%',
            width: '420px', height: '420px', borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(255,255,230,0.45) 0%, rgba(255,245,200,0.2) 40%, transparent 70%)',
            animation: 'summit-sun-pulse 6s ease-in-out infinite',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div
          className="absolute"
          style={{
            top: '12%', left: '15%',
            width: '260px', height: '70px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.18)', filter: 'blur(28px)',
            animation: 'summit-cloud-drift 18s ease-in-out infinite alternate',
          }}
        />
        <div
          className="absolute"
          style={{
            top: '20%', left: '55%',
            width: '200px', height: '55px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.14)', filter: 'blur(24px)',
            animation: 'summit-cloud-drift 22s ease-in-out infinite alternate-reverse',
          }}
        />
        <div
          className="absolute"
          style={{
            top: '6%', left: '70%',
            width: '180px', height: '50px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)', filter: 'blur(20px)',
            animation: 'summit-cloud-drift 14s ease-in-out infinite alternate',
          }}
        />
      </div>

      {/* Neutral */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 2, opacity: outlook === 'neutral' ? 1 : 0, transition: 'opacity 1s ease' }}
      />

      {/* ═══ Overall Section Bento Container ══════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[88rem] h-full max-h-[96vh] rounded-[2rem] border border-white/[0.06] bg-white/[0.02] p-3.5 md:p-4 lg:p-5 flex flex-col overflow-hidden shadow-2xl justify-between"
      >
        {/* Top/Middle Area: Left Panels + Center Mountain + Right Controls & White Tab */}
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr_290px] lg:grid-cols-[280px_1fr_320px] gap-3 md:gap-4 items-stretch flex-1 min-h-0">

          {/* ── Left Column: 2 stacked boxes (Goal Progress + Risk & Allocation) ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:flex flex-col gap-3 justify-between h-full min-h-0 order-2 md:order-1"
          >
            <GoalProgressPanel pct={progressPct} outlook={outlook} />
            <RiskAllocationPanel risk={risk} onRiskChange={setRisk} />
          </motion.div>

          {/* ── Center Column: Title + 3D Mountain Only (clean & unobstructed) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.95, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-2xl bg-white/[0.02] border border-white/[0.04] overflow-hidden flex flex-col items-center justify-between h-full min-h-[340px] p-4 order-1 md:order-2"
          >
            {/* Top Center: Title */}
            <div className="z-20 text-center pt-1">
              <p className="text-white/40 text-xs font-medium tracking-widest uppercase whitespace-nowrap">
                <span className="text-white/70 font-semibold">Wlcro</span> Finmap
              </p>
            </div>

            {/* 3D Mountain Model */}
            <model-viewer
              src="/models/summit-original.glb"
              auto-rotate
              auto-rotate-delay="0"
              rotation-per-second="12deg"
              camera-orbit="10deg 68deg 90%"
              field-of-view="24deg"
              camera-controls="false"
              disable-zoom
              interaction-prompt="none"
              shadow-intensity="0"
              exposure="1.2"
              environment-image="neutral"
              aria-label="Rotating 3D mountain — Wlcro Finmap"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                background: 'transparent',
              }}
            />
          </motion.div>

          {/* ── Right Column: 2 stacked boxes (Plan Your Goal + White Weather Tab) ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 md:order-3 flex flex-col gap-3 justify-between h-full min-h-0"
          >
            <FinancialControlsPanel
              income={income} onIncomeChange={setIncome}
              savingsRate={savingsRate} onSavingsRateChange={setSavingsRate}
              duration={duration} onDurationChange={setDuration}
              target={target} onTargetChange={setTarget}
            />

            {/* ── White Bento Tab (inside right column below Plan your goal) ── */}
            <div
              className="shrink-0 w-full rounded-2xl bg-[#F7F7F7] p-4 lg:p-5 text-black shadow-sm"
            >
              <h3
                className="text-black text-base lg:text-lg font-medium leading-tight mb-1 transition-all duration-500"
                style={{ letterSpacing: '-0.02em' }}
              >
                {headline}
              </h3>
              <p className="text-black/65 text-xs lg:text-[13px] leading-relaxed transition-all duration-500">
                {description}
              </p>
            </div>
          </motion.div>

          {/* ── Mobile-only Left Column view ───────────────────── */}
          <div className="flex md:hidden flex-col gap-3 order-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <GoalProgressPanel pct={progressPct} outlook={outlook} />
              </div>
              <div className="flex-1">
                <RiskAllocationPanel risk={risk} onRiskChange={setRisk} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default SummitSection;
