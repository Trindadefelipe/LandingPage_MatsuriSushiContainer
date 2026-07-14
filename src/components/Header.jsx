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

// Opções de pedido — mesmos canais do botão flutuante (FAB): WhatsApp, ligação e iFood.
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

    // Fecha o menu de pedido ao clicar fora ou pressionar Esc
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
        // Estado "scrolled": listener passivo + rAF (sem leituras de layout a cada evento de scroll)
        let ticking = false;
        const handleScroll = () => {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(() => {
                setScrolled(window.scrollY > 50);
                ticking = false;
            });
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        // 5.6 - Seção ativa via IntersectionObserver (evita layout thrashing com offsetTop/offsetHeight)
        const sections = navLinks
            .map((link) => document.getElementById(link.href.slice(1)))
            .filter(Boolean);
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
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

    // 5.5 - Smooth scroll handler
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
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
                    scrolled
                        ? 'bg-black/95 backdrop-blur-md py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
                        : 'bg-gradient-to-b from-black/80 to-transparent py-5'
                }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8 }}
                role="banner"
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        {/* 5.4 - Logo */}
                        <a href="#" className="flex flex-col group" aria-label="Matsuri Container Sushi - Página inicial">
                            <span className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
                                Matsuri
                            </span>
                            <span className="text-sm sm:text-base font-serif italic text-matsuri-red -mt-1">
                                Container Sushi
                            </span>
                        </a>

                        {/* 5.1 - Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Menu principal">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                                        activeSection === link.href.replace('#', '')
                                            ? 'text-amber-500'
                                            : 'text-white/80 hover:text-white'
                                    }`}
                                >
                                    {link.label}
                                    {/* Active indicator */}
                                    {activeSection === link.href.replace('#', '') && (
                                        <motion.div
                                            layoutId="activeIndicator"
                                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-500"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </a>
                            ))}
                        </nav>

                        {/* 5.2 - CTA "Fazer Pedido" com as 3 opções (WhatsApp, Ligar, iFood) */}
                        <div className="flex items-center gap-4">
                            <div className="relative hidden md:block" ref={orderRef}>
                                <button
                                    type="button"
                                    onClick={() => setOrderOpen((v) => !v)}
                                    aria-haspopup="menu"
                                    aria-expanded={orderOpen}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-black font-bold text-sm rounded-full transition-all duration-300 hover:bg-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] active:scale-95"
                                >
                                    <ShoppingBag size={16} />
                                    <span>Fazer Pedido</span>
                                    <ChevronDown size={14} className={`transition-transform duration-300 ${orderOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {orderOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.2 }}
                                            role="menu"
                                            className="absolute right-0 mt-2 w-56 bg-black/95 backdrop-blur-md border border-white/10 rounded-xl p-2 shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
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

                            {/* 5.3 - Mobile menu button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="lg:hidden w-10 h-10 flex items-center justify-center text-white hover:text-amber-500 transition-colors"
                                aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
                                aria-expanded={mobileMenuOpen}
                            >
                                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* 5.3 - Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 lg:hidden"
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/90 backdrop-blur-md"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Menu content */}
                        <motion.nav
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="relative pt-24 px-6 pb-8"
                            role="navigation"
                            aria-label="Menu mobile"
                        >
                            <div className="flex flex-col items-center gap-2">
                                {navLinks.map((link, index) => (
                                    <motion.a
                                        key={link.href}
                                        href={link.href}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + index * 0.05 }}
                                        className={`w-full text-center py-4 text-xl font-serif border-b border-white/10 transition-colors ${
                                            activeSection === link.href.replace('#', '')
                                                ? 'text-amber-500'
                                                : 'text-white hover:text-amber-500'
                                        }`}
                                    >
                                        {link.label}
                                    </motion.a>
                                ))}

                                {/* Mobile CTA — 3 opções de pedido (WhatsApp, Ligar, iFood) */}
                                <div className="mt-6 w-full">
                                    <p className="text-center text-white/50 text-xs uppercase tracking-[0.3em] mb-3">Fazer Pedido</p>
                                    <div className="flex flex-col gap-3">
                                        {orderOptions.map((opt, index) => (
                                            <motion.a
                                                key={opt.id}
                                                href={opt.href}
                                                target={opt.external ? '_blank' : undefined}
                                                rel={opt.external ? 'noopener noreferrer' : undefined}
                                                onClick={() => setMobileMenuOpen(false)}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.4 + index * 0.05 }}
                                                className="w-full flex items-center justify-center gap-2 py-4 bg-amber-500 text-black font-bold text-lg rounded-full hover:bg-amber-400 transition-colors"
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
