import OrbitIcon from '@/components/OrbitIcon';

function CrossBorderSection() {
  return (
    <section className="bg-[#0d0d0d] px-6 py-28 md:py-36">
      <div className="max-w-[88rem] mx-auto">
        <div className="max-w-5xl">
          <OrbitIcon className="w-16 h-16 md:w-20 md:h-20 mb-8 md:mb-10 text-white" />
          <h2
            className="text-white text-6xl md:text-8xl lg:text-[7.25rem] font-medium leading-[0.98] mb-10 max-w-5xl"
            style={{ letterSpacing: '-0.04em' }}
          >
            Welcome to the future of
            <br />
            cross-border money.
          </h2>
          <p className="text-white/70 text-xl md:text-2xl lg:text-[1.75rem] leading-[1.45] max-w-3xl mb-12">
            Why are we here? Because two tax systems were never built to talk to each other.
            Wlcro connects your US and Indian finances into a single automated plan — so you save
            more, avoid the PFIC and FBAR surprises, and stop reconciling two spreadsheets by hand.
          </p>
          <p
            className="text-white/40 text-sm md:text-base leading-relaxed max-w-3xl"
            style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
          >
            Wlcro is a financial orchestration platform. It is not a bank, broker, or lender, and
            does not hold customer funds.
          </p>
        </div>
      </div>
    </section>
  );
}

export default CrossBorderSection;
