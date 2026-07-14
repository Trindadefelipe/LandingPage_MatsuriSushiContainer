import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, MessageCircle, Phone, Utensils, ChevronDown } from 'lucide-react';
import { whatsappUrl, telUrl, ifoodUrl } from '../config/site';

const navLinks = [
    { href: '#destaques', label: 'Destaques' },
    { href: '#menu', label: 'Cardápio' },
    { href: '#combos', label: 'Combos' },
    { href: '#sobre', label: 'Sobre' },
    { href: '#localizacao', label: 'Localização' },
];

const orderOptions = [
    { id: 'whatsapp', label: 'WhatsApp', href: whatsappUrl, icon: MessageCircle, color: 'text-[#25D366]', external: true },
    { id: 'phone', label: 'Ligar', href: telUrl, icon: Phone, color: 'text-amber-500', external: false },
    { id: 'ifood', label: 'iFood', href: ifoodUrl, icon: Utensils, color: 'text-[#EA1D2C]', external: true },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [orderOpen, setOrderOpen] = useState(false);
    const orderRef = useRef(null);
    const scrolledRef = useRef(false);

    useEffect(() => {
        if (!orderOpen) return;
        const onDocClick = (e) => {
            if (orderRef.current && !orderRef.current.contains(e.target)) setOrderOpen(false);
        };
        const onEsc = (e) => e.key === 'Escape' && setOrderOpen(false);
        document.addEventListener('mousedown', onDocClick);
        document.addEventListener('keydown', onEsc);
        return () => {
            document.removeEventListener('mousedown', onDocClick);
            document.removeEventListener('keydown', onEsc);
        };
    }, [orderOpen]);

    useEffect(() => {
        let ticking = false;
        const updateScrolled = () => {
            const nextScrolled = window.scrollY > 48;
            if (scrolledRef.current !== nextScrolled) {
                scrolledRef.current = nextScrolled;
                setScrolled(nextScrolled);
            }
        };
        const handleScroll = () => {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(() => {
                updateScrolled();
                ticking = false;
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        updateScrolled();

        const sections = navLinks
            .map((link) => document.getElementById(link.href.slice(1)))
            .filter(Boolean);
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection((current) => (current === entry.target.id ? current : entry.target.id));
                    }
                });
            },
            { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
        );
        sections.forEach((section) => observer.observe(section));

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    const handleNavClick = (e, href) => {
        e.preventDefault();
        setMobileMenuOpen(false);

        const target = document.querySelector(href);
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <>
            <motion.header
                className={`fixed top-0 left-0 w-full z-50 transition-[background-color,box-shadow,padding] duration-300 ${
                    scrolled
                        ? 'bg-black/95 md:backdrop-blur-md py-3 shadow-[0_4px_24px_rgba(0,0,0,0.45)]'
                        : 'bg-gradient-to-b from-black/85 to-transparent py-4 sm:py-5'
                }`}
                initial={{ y: -72 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                role="banner"
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between gap-4">
                        <a href="#" className="flex flex-col group shrink-0" aria-label="Matsuri Container Sushi - Página inicial">
                            <span className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide leading-none">
                                Matsuri
                            </span>
                            <span className="text-sm sm:text-base font-serif italic text-matsuri-red -mt-0.5">
                                Container Sushi
                            </span>
                        </a>

                        <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Menu principal">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                                        activeSection === link.href.replace('#', '')
                                            ? 'text-amber-500'
                                            : 'text-white/80 hover:text-white'
                                    }`}
                                >
                                    {link.label}
                                    {activeSection === link.href.replace('#', '') && (
                                        <motion.div
                                            layoutId="activeIndicator"
                                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-500"
                                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </a>
                            ))}
                        </nav>

                        <div className="flex items-center gap-3 sm:gap-4">
                            <div className="relative hidden md:block" ref={orderRef}>
                                <button
                                    type="button"
                                    onClick={() => setOrderOpen((v) => !v)}
                                    aria-haspopup="menu"
                                    aria-expanded={orderOpen}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-black font-bold text-sm rounded-full transition-colors duration-200 hover:bg-amber-400 active:scale-95"
                                >
                                    <ShoppingBag size={16} />
                                    <span>Fazer Pedido</span>
                                    <ChevronDown size={14} className={`transition-transform duration-200 ${orderOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {orderOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -6 }}
                                            transition={{ duration: 0.18 }}
                                            role="menu"
                                            className="absolute right-0 mt-2 w-56 bg-black/95 mobile-no-backdrop md:backdrop-blur-md border border-white/10 rounded-xl p-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                                        >
                                            {orderOptions.map((opt) => (
                                                <a
                                                    key={opt.id}
                                                    href={opt.href}
                                                    target={opt.external ? '_blank' : undefined}
                                                    rel={opt.external ? 'noopener noreferrer' : undefined}
                                                    onClick={() => setOrderOpen(false)}
                                                    role="menuitem"
                                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white text-sm font-medium hover:bg-white/10 transition-colors"
                                                >
                                                    <opt.icon size={18} className={opt.color} aria-hidden="true" />
                                                    <span>{opt.label}</span>
                                                </a>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="lg:hidden w-11 h-11 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:text-amber-500 transition-colors"
                                aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
                                aria-expanded={mobileMenuOpen}
                            >
                                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.header>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 lg:hidden"
                    >
                        <div
                            className="absolute inset-0 bg-black/95 mobile-no-backdrop md:backdrop-blur-md"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        <motion.nav
                            initial={{ opacity: 0, y: -12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.22 }}
                            className="relative h-full overflow-y-auto pt-24 px-4 sm:px-6 pb-[calc(2rem+env(safe-area-inset-bottom))]"
                            role="navigation"
                            aria-label="Menu mobile"
                        >
                            <div className="flex flex-col items-center gap-2 max-w-md mx-auto">
                                {navLinks.map((link, index) => (
                                    <motion.a
                                        key={link.href}
                                        href={link.href}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.04 + index * 0.03, duration: 0.2 }}
                                        className={`w-full text-center py-4 text-xl font-serif border-b border-white/10 transition-colors ${
                                            activeSection === link.href.replace('#', '')
                                                ? 'text-amber-500'
                                                : 'text-white hover:text-amber-500'
                                        }`}
                                    >
                                        {link.label}
                                    </motion.a>
                                ))}

                                <div className="mt-6 w-full">
                                    <p className="text-center text-white/50 text-xs uppercase tracking-[0.25em] mb-3">Fazer Pedido</p>
                                    <div className="flex flex-col gap-3">
                                        {orderOptions.map((opt, index) => (
                                            <motion.a
                                                key={opt.id}
                                                href={opt.href}
                                                target={opt.external ? '_blank' : undefined}
                                                rel={opt.external ? 'noopener noreferrer' : undefined}
                                                onClick={() => setMobileMenuOpen(false)}
                                                initial={{ opacity: 0, y: 12 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.18 + index * 0.03, duration: 0.2 }}
                                                className="w-full flex items-center justify-center gap-2 py-3.5 bg-amber-500 text-black font-bold text-base rounded-full hover:bg-amber-400 transition-colors"
                                            >
                                                <opt.icon size={20} aria-hidden="true" />
                                                <span>{opt.label}</span>
                                            </motion.a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
