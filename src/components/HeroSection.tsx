import { ArrowRight } from 'lucide-react';

function HeroSection() {
  return (
    <section className="flex-1 px-6 pt-20 pb-6 flex items-end justify-center">
      <div
        className="relative w-full rounded-2xl overflow-hidden max-w-[88rem] mx-auto"
        style={{ height: 'calc(100vh - 104px)' }}
      >
        <div className="absolute inset-0 bg-black/30 z-[1]" />

        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_161253_c72b1869-400f-45ed-ac0c-52f68c2ed5bd.mp4"
            type="video/mp4"
          />
        </video>

        <div className="relative z-10 flex flex-col items-start justify-center h-full p-12">
          <h1
            className="text-white text-5xl md:text-6xl font-medium leading-tight max-w-xl mb-4"
            style={{ letterSpacing: '-0.04em' }}
          >
            Your Wealth
            <br />
            Connected
          </h1>
          <p
            className="text-white/80 text-base md:text-lg max-w-md mb-8 leading-relaxed"
            style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
          >
            An intelligent cross-border wealth plan built to automate your US and Indian
            finances, simplify every decision, and keep your money working in sync.
          </p>
          <button className="inline-flex items-center gap-3 bg-white text-black text-base md:text-lg font-medium pl-8 pr-2 py-2 rounded-full hover:bg-white/85 transition-colors duration-200">
            Join us
            <span className="bg-black rounded-full p-2 hover:bg-black/80 transition-colors duration-200">
              <ArrowRight className="w-5 h-5 text-white" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
