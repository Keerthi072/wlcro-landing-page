import { openContactModal } from '@/components/ContactModal';

const navLinks = ['About us', 'Product', 'Support'];

function Navbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-20 px-6 py-5">
      <div className="max-w-[88rem] mx-auto flex items-center justify-between">
        {/* Brand Area */}
        <a href="#" className="flex items-center">
          <img
            src="/model/wlcro_logo.svg"
            alt="Wlcro"
            className="h-9 w-auto object-contain"
          />
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={link === 'Support' ? '#contact' : '#'}
              onClick={(e) => {
                if (link === 'Support') {
                  e.preventDefault();
                  openContactModal();
                }
              }}
              className="text-base text-white/70 hover:text-white font-medium transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <button className="bg-white text-black text-base font-medium px-7 py-2.5 rounded-full hover:bg-white/85 transition-colors duration-200">
          Get started
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
