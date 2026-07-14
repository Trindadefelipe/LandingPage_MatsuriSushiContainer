import { Instagram, Facebook, Phone, Mail, MapPin, Clock, ChevronRight } from 'lucide-react';
import { site, telUrl, mapsDirectionsUrl } from '../config/site';

const navLinks = [
    { href: '#destaques', label: 'Destaques' },
    { href: '#menu', label: 'Cardápio' },
    { href: '#combos', label: 'Combos' },
    { href: '#sobre', label: 'Sobre Nós' },
    { href: '#localizacao', label: 'Localização' },
];

const scheduleData = [
    { day: 'Seg - Qui', hours: '18h - 22:30h' },
    { day: 'Sex - Sáb', hours: '18h - 23:00h' },
    { day: 'Domingo', hours: 'Fechado' },
];

const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/matsurisushi', label: 'Instagram' },
    { icon: Facebook, href: 'https://www.facebook.com/matsurisushi', label: 'Facebook' },
];

export default function Footer() {
    // 9.1 - Dynamic year
    const currentYear = new Date().getFullYear();

    const handleNavClick = (e, href) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    };

    return (
        <footer className="bg-black text-white relative" role="contentinfo">
            {/* Top gradient line */}
            <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

            {/* Main footer content */}
            <div className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                        {/* 9.6 - Brand column with logo */}
                        <div className="lg:col-span-1">
                            <div className="mb-6">
                                <div className="flex flex-col">
                                    <span className="text-3xl font-serif font-bold text-white tracking-wide">
                                        Matsuri
                                    </span>
                                    <span className="text-lg font-serif italic text-matsuri-red -mt-1">
                                        Container Sushi
                                    </span>
                                </div>
                            </div>

                            <p className="text-white/60 text-sm leading-relaxed mb-6">
                                A essência da tradição japonesa servida com elegância. Sushi premium em Londrina.
                            </p>

                            {/* 9.2 - Social links */}
                            <div className="flex gap-3">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 transition-all duration-300 hover:bg-amber-500 hover:border-amber-500 hover:text-black hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                                        aria-label={social.label}
                                    >
                                        <social.icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* 9.3 - Navigation links */}
                        <div>
                            <h3 className="text-lg font-serif text-white mb-6 flex items-center gap-2">
                                <span className="w-8 h-px bg-amber-500" />
                                Navegação
                            </h3>
                            <nav aria-label="Links do rodapé">
                                <ul className="space-y-3">
                                    {navLinks.map((link) => (
                                        <li key={link.href}>
                                            <a
                                                href={link.href}
                                                onClick={(e) => handleNavClick(e, link.href)}
                                                className="text-white/60 hover:text-amber-500 transition-colors duration-300 flex items-center gap-2 group"
                                            >
                                                <ChevronRight size={14} className="text-amber-500/50 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>

                        {/* Schedule column */}
                        <div>
                            <h3 className="text-lg font-serif text-white mb-6 flex items-center gap-2">
                                <span className="w-8 h-px bg-amber-500" />
                                Horário
                            </h3>
                            <ul className="space-y-3">
                                {scheduleData.map((item, index) => (
                                    <li key={index} className="flex justify-between items-center">
                                        <span className="text-white/60 flex items-center gap-2">
                                            <Clock size={14} className="text-amber-500/50" />
                                            {item.day}
                                        </span>
                                        <span className={`font-medium ${item.hours === 'Fechado' ? 'text-red-500' : 'text-amber-500'}`}>
                                            {item.hours}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 9.4, 9.5, 9.7 - Contact & Address column */}
                        <div>
                            <h3 className="text-lg font-serif text-white mb-6 flex items-center gap-2">
                                <span className="w-8 h-px bg-amber-500" />
                                Contato
                            </h3>

                            <ul className="space-y-4">
                                {/* Address */}
                                <li>
                                    <a
                                        href={mapsDirectionsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-start gap-3 text-white/60 hover:text-amber-500 transition-colors group"
                                    >
                                        <MapPin size={18} className="text-amber-500/50 group-hover:text-amber-500 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p>{site.address.street}</p>
                                            <p className="text-sm">{site.address.neighborhood} - {site.address.city}</p>
                                        </div>
                                    </a>
                                </li>

                                {/* Phone */}
                                <li>
                                    <a
                                        href={telUrl}
                                        className="flex items-center gap-3 text-white/60 hover:text-amber-500 transition-colors group"
                                    >
                                        <Phone size={18} className="text-amber-500/50 group-hover:text-amber-500 flex-shrink-0" />
                                        <span>{site.phoneDisplay}</span>
                                    </a>
                                </li>

                                {/* Email */}
                                <li>
                                    <a
                                        href={`mailto:${site.email}`}
                                        className="flex items-center gap-3 text-white/60 hover:text-amber-500 transition-colors group"
                                    >
                                        <Mail size={18} className="text-amber-500/50 group-hover:text-amber-500 flex-shrink-0" />
                                        <span>{site.email}</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar — frase e copyright centralizados; pb extra no mobile p/ o FAB não cobrir */}
            <div className="border-t border-white/5 py-6 pb-24 md:pb-6">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center gap-2 text-center text-sm text-white/40">
                        <p className="flex items-center justify-center gap-1">
                            Feito com <span className="text-red-500">♥</span> em Londrina, PR
                        </p>
                        <p>
                            © {currentYear} Matsuri Container Sushi. Todos os direitos reservados.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
