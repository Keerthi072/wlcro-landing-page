import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const summitStates = [
  {
    headline: 'Rain on the horizon.',
    description: 'A $2,400 tax payment is due next month, and here is how it shifts your summit date.',
  },
  {
    headline: 'Back to clear.',
    description: 'Your Autopilot rule caught the dip. You are on pace again.',
  },
  {
    headline: 'Clear skies ahead.',
    description: "You're 84% on pace for your $1.5M summit — no action needed this week.",
  },
];

function SummitSection() {
  const [activeState, setActiveState] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIsFading(true);
      window.setTimeout(() => {
        setActiveState((currentState) => (currentState + 1) % summitStates.length);
        setIsFading(false);
      }, 350);
    }, 6000);

    return () => window.clearInterval(interval);
  }, []);

  const currentState = summitStates[activeState];

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-transparent">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(circle at 15% 20%, #8CF0CE 0%, transparent 55%), radial-gradient(circle at 60% 50%, #6BC4C9 0%, transparent 60%), radial-gradient(circle at 90% 85%, #4A8FC0 0%, transparent 55%), linear-gradient(135deg, #7FEBC4 0%, #5DA9C7 100%)',
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 grid min-h-screen grid-cols-1 items-center px-6 md:grid-cols-2 md:px-16">
        <div
          className={`order-2 py-16 transition-opacity duration-700 md:order-1 md:py-0 ${isFading ? 'opacity-0' : 'opacity-100'}`}
          aria-live="polite"
        >
          <p className="mb-4 text-sm font-medium text-black/80">Wlcro Portfolios</p>
          <h2
            className="mb-4 max-w-xl text-4xl font-medium leading-tight text-black md:text-5xl"
            style={{ letterSpacing: '-0.03em' }}
          >
            {currentState.headline}
          </h2>
          <p className="mb-8 max-w-md text-lg leading-relaxed text-black/80 md:text-xl">
            {currentState.description}
          </p>
          <button
            type="button"
            aria-label="Continue to Wlcro portfolios"
            className="flex h-14 w-14 items-center justify-center rounded-full border border-black/40 text-black transition-colors duration-200 hover:bg-black hover:text-white"
          >
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="order-1 flex h-full min-h-[400px] items-center justify-center md:order-2 md:min-h-[600px]">
          <model-viewer
            src="/models/summit.glb"
            auto-rotate
            auto-rotate-delay="0"
            rotation-per-second="8deg"
            camera-orbit="0deg 75deg 100%"
            field-of-view="30deg"
            camera-controls="false"
            disable-zoom
            interaction-prompt="none"
            shadow-intensity="0"
            exposure="1"
            aria-label="A rotating 3D model of a financial summit"
            className="h-full min-h-[400px] w-full bg-transparent md:min-h-[600px]"
          />
        </div>
      </div>
    </section>
  );
}

export default SummitSection;
