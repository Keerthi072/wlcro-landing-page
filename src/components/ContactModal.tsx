import { useState, useEffect } from 'react';
import { X, ArrowRight, Instagram, Linkedin } from 'lucide-react';
import LogoIcon from '@/components/LogoIcon';

export const openContactModal = () => {
  window.dispatchEvent(new CustomEvent('open-contact-modal'));
};

interface ContactModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

function ContactModal({ isOpen: controlledIsOpen, onClose: controlledOnClose }: ContactModalProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const isControlled = controlledIsOpen !== undefined;
  const showModal = isControlled ? controlledIsOpen : internalIsOpen;

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      if (controlledOnClose) {
        controlledOnClose();
      } else {
        setInternalIsOpen(false);
      }
    }, 250);
  };

  useEffect(() => {
    const handleOpenEvent = () => {
      setInternalIsOpen(true);
    };

    window.addEventListener('open-contact-modal', handleOpenEvent);
    return () => window.removeEventListener('open-contact-modal', handleOpenEvent);
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
      // Trigger enter animation on next frame
      requestAnimationFrame(() => setIsAnimating(true));
    } else {
      document.body.style.overflow = '';
      setIsAnimating(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showModal]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showModal) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showModal]);

  if (!showModal && !isAnimating) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      email ? `Inquiry from ${email}` : 'New Wlcro Inquiry'
    );
    const bodyContent = `${message || 'Hello, I would like to get in touch with Wlcro.'}\n\n---\nSender Email: ${
      email || 'Not specified'
    }\nSource: Wlcro Landing Page Contact Form`;
    const body = encodeURIComponent(bodyContent);

    // Direct hidden mailto trigger
    window.location.href = `mailto:keerthikaa072@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 transition-all duration-300 ${
        isAnimating ? 'bg-black/75 backdrop-blur-md opacity-100' : 'bg-black/0 backdrop-blur-none opacity-0'
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      {/* ── Main Modal Card Frame ── */}
      <div
        className={`relative w-full max-w-5xl rounded-[2.2rem] md:rounded-[2.8rem] bg-[#1d1c1a] border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300 transform ${
          isAnimating ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-6 opacity-0'
        }`}
      >
        {/* Close Button — High visibility pill button with crisp contrast */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 md:top-6 md:right-6 z-50 w-11 h-11 rounded-full bg-[#3d3b38] hover:bg-[#52504b] text-white flex items-center justify-center transition-all duration-200 hover:rotate-90 shadow-xl border border-white/20"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        <div className="relative flex flex-col lg:flex-row justify-between min-h-[520px] md:min-h-[560px]">
          {/* ═══ Left Side: Artistic & Brand Stage ═══ */}
          <div className="relative flex-1 p-6 md:p-10 flex flex-col justify-between overflow-hidden">
            {/* Top Brand Logo */}
            <div className="flex items-center z-10">
              <img
                src="/models/wlcro_logo.svg"
                alt="Wlcro"
                className="h-7 md:h-8 w-auto object-contain"
              />
            </div>

            {/* Large Watermark Background Typography (exact to reference) */}
            <div className="absolute top-8 left-6 md:left-10 right-4 pointer-events-none select-none z-0">
              <h2
                className="text-white/[0.05] text-5xl sm:text-6xl md:text-7xl font-semibold leading-[0.95] max-w-lg tracking-tighter"
              >
                Cross-border
                <br />
                wealth &amp; global
                <br />
                planning
              </h2>
            </div>

            {/* Center Emblem: 4 organic circles in clover pattern (matches reference visual) */}
            <div className="relative my-8 lg:my-0 flex items-center justify-center z-10 pointer-events-none">
              <div className="grid grid-cols-2 gap-3.5 opacity-80 animate-pulse duration-1000">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#2d5236] shadow-lg shadow-black/40" />
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#284930] shadow-lg shadow-black/40" />
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#223d29] shadow-lg shadow-black/40" />
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#2f5538] shadow-lg shadow-black/40" />
              </div>
            </div>

            {/* Bottom Left Meta & Socials */}
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-4 border-t border-white/[0.06]">
              <div className="flex items-center gap-3">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.15] text-white/70 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.15] text-white/70 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.15] text-white/70 hover:text-white flex items-center justify-center transition-colors text-xs font-semibold"
                  aria-label="X (Twitter)"
                >
                  𝕏
                </a>
              </div>

              <p className="text-white/35 text-[11px] font-medium tracking-tight">
                Autonomous Cross-Border Portfolio Solution
              </p>
            </div>
          </div>

          {/* ═══ Right Side: 'Get in touch' Curved Card (Exact layout reference) ═══ */}
          <div className="relative w-full lg:w-[420px] p-2 sm:p-3 md:p-4 flex flex-col justify-end">
            <div className="w-full bg-[#F5F5F5] text-black rounded-[2rem] md:rounded-tl-[2.2rem] md:rounded-tr-[5.5rem] md:rounded-bl-[2.2rem] md:rounded-br-[2.2rem] p-6 sm:p-7 md:p-8 flex flex-col justify-between shadow-2xl">
              <div>
                {/* Heading */}
                <h3
                  className="text-4xl md:text-5xl font-medium tracking-tight text-[#1a1a1a] leading-none mb-3"
                  style={{ letterSpacing: '-0.035em' }}
                >
                  Get in
                  <br />
                  touch
                </h3>

                {/* Subtext */}
                <p className="text-black/65 text-xs md:text-[13px] leading-relaxed mb-6">
                  We&apos;re here to help you explore how autonomous cross-border management
                  can streamline your assets across US and India. Get in touch with us directly!
                </p>

                {/* Contact Form */}
                <form onSubmit={handleSend} className="space-y-4">
                  {/* Field 1: Your email */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-[11px] font-semibold uppercase tracking-wider text-black/75 mb-1.5"
                    >
                      Your email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/[0.04] border border-black/10 text-black placeholder:text-black/35 focus:outline-none focus:ring-2 focus:ring-black/20 text-sm transition-all"
                    />
                  </div>

                  {/* Field 2: Your message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-[11px] font-semibold uppercase tracking-wider text-black/75 mb-1.5"
                    >
                      Your message
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your portfolio or goals..."
                      className="w-full px-4 py-2.5 rounded-xl bg-black/[0.04] border border-black/10 text-black placeholder:text-black/35 focus:outline-none focus:ring-2 focus:ring-black/20 text-sm transition-all resize-none"
                    />
                  </div>

                  {/* Call to action button: "Let's Discuss" */}
                  <button
                    type="submit"
                    className="w-full mt-2 py-3.5 px-6 rounded-full bg-black text-white font-medium text-sm hover:bg-neutral-800 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 shadow-lg group"
                  >
                    <span>Let&apos;s Discuss</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactModal;
