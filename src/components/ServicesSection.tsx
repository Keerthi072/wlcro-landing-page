const services = ['Automate', 'Track', 'Advice', 'Grow'];

function ServicesSection() {
  return (
    <section className="bg-[#0d0d0d] px-6 py-24 md:py-32 min-h-screen flex items-center justify-center">
      <div className="max-w-[1000px] w-full mx-auto text-center flex flex-col items-center justify-center gap-10 md:gap-14 lg:gap-16">
        {services.map((word) => (
          <span
            key={word}
            className="text-white text-6xl md:text-8xl lg:text-[112px] font-medium leading-[1.05] block"
            style={{ letterSpacing: '-0.03em' }}
          >
            {word}
          </span>
        ))}
      </div>
    </section>
  );
}

export default ServicesSection;
