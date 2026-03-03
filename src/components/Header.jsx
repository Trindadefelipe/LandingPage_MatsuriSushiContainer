import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag } from 'lucide-react';

const navLinks = [
    { href: '#destaques', label: 'Destaques' },
    { href: '#menu', label: 'Cardápio' },
    { href: '#combos', label: 'Combos' },
    { href: '#sobre', label: 'Sobre' },
    { href: '#localizacao', label: 'Localização' },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // 5.6 - Active section indicator
            const sections = navLinks.map(link => link.href.replace('#', ''));
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
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

                        {/* 5.2 - CTA Button */}
                        <div className="flex items-center gap-4">
                            <a
                                href="#"
                                className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-black font-bold text-sm rounded-full transition-all duration-300 hover:bg-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] active:scale-95"
                            >
                                <ShoppingBag size={16} />
                                <span>Fazer Pedido</span>
                            </a>

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

                                {/* Mobile CTA */}
                                <motion.a
                                    href="#"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="mt-6 w-full flex items-center justify-center gap-2 py-4 bg-amber-500 text-black font-bold text-lg rounded-full hover:bg-amber-400 transition-colors"
                                >
                                    <ShoppingBag size={20} />
                                    <span>Fazer Pedido</span>
                                </motion.a>
                            </div>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
