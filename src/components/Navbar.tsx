import LogoIcon from '@/components/LogoIcon';

const navLinks = ['Network', 'Ecosystem', 'Rewards', 'Help', 'News'];

function Navbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-20 px-6 py-5">
      <div className="max-w-[88rem] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <LogoIcon className="w-7 h-7 text-white" />
          <span className="text-2xl font-medium tracking-tight text-white">Wlcro</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-base text-white/70 hover:text-white font-medium transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </div>

        <button className="bg-white text-black text-base font-medium px-7 py-2.5 rounded-full hover:bg-white/85 transition-colors duration-200">
          Get started
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
