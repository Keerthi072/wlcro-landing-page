import { useEffect, useRef } from 'react';

function AIAssistantSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const hasPlayed = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const iframe = iframeRef.current;
    if (!container || !iframe) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!hasPlayed.current) {
              hasPlayed.current = true;
            }
            iframe.contentWindow?.postMessage(
              JSON.stringify({ event: 'cmd', action: 'play' }),
              '*'
            );
          } else {
            iframe.contentWindow?.postMessage(
              JSON.stringify({ event: 'cmd', action: 'pause' }),
              '*'
            );
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-black px-6 py-24 md:py-32">
      <div className="max-w-[88rem] mx-auto flex flex-col items-center text-center">
        <h2
          className="text-white text-4xl md:text-6xl font-medium leading-tight mb-6 max-w-3xl"
          style={{ letterSpacing: '-0.04em' }}
        >
          Ask, and Wlcro makes it happen.
        </h2>
        <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-xl mb-10">
          Your AI assistant is on call — ask a question, get a plan, or get handed to a real
          cross-border advisor the moment it&apos;s complex.
        </p>
        <button className="inline-flex items-center justify-center bg-white text-black text-base font-medium px-7 py-2.5 rounded-full hover:bg-gray-200 transition-colors duration-200 mb-16">
          Learn more
        </button>

        <div
          ref={containerRef}
          className="relative w-full max-w-3xl mx-auto rounded-t-3xl overflow-hidden"
        >
          <iframe
            ref={iframeRef}
            src="https://player.cloudinary.com/embed/?cloud_name=hzvhv0gz&public_id=Ai-demo-video&autoplay=false&loop=true&muted=true&controls=false"
            className="w-full h-full aspect-[9/16] md:aspect-video border-0"
            allow="autoplay; fullscreen"
            title="Wlcro AI assistant demo"
          />
        </div>
      </div>
    </section>
  );
}

export default AIAssistantSection;
