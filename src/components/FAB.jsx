import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Utensils, Phone, X, MessageCircle } from 'lucide-react';
import { site, whatsappUrl, telUrl, ifoodUrl } from '../config/site';

export default function FAB() {
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);
    const prefersReducedMotion = useReducedMotion();

    const menuItems = [
        {
            id: 'whatsapp',
            href: whatsappUrl,
            label: 'WhatsApp',
            tooltip: 'Peça pelo WhatsApp',
            icon: MessageCircle,
            bgColor: 'bg-[#25D366]',
            hoverColor: 'hover:bg-[#20BD5A]',
            delay: 0.04,
        },
        {
            id: 'telefone',
            href: telUrl,
            label: 'Ligar',
            tooltip: site.phoneDisplay,
            icon: Phone,
            bgColor: 'bg-matsuri-red',
            hoverColor: 'hover:bg-red-700',
            delay: 0.07,
        },
        {
            id: 'ifood',
            href: ifoodUrl,
            label: 'iFood',
            tooltip: 'Peça pelo iFood',
            icon: Utensils,
            bgColor: 'bg-[#EA1D2C]',
            hoverColor: 'hover:bg-[#C41622]',
            delay: 0.1,
        },
    ];

    return (
        <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-50 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
            <AnimatePresence>
                {isOpen && (
                    <div id="fab-menu" className="flex flex-col gap-3">
                        {menuItems.map((item) => (
                            <motion.div
                                key={item.id}
                                className="relative flex items-center justify-end"
                                onMouseEnter={() => setHoveredItem(item.id)}
                                onMouseLeave={() => setHoveredItem(null)}
                                onFocus={() => setHoveredItem(item.id)}
                                onBlur={() => setHoveredItem(null)}
                            >
                                <AnimatePresence>
                                    {hoveredItem === item.id && (
                                        <motion.span
                                            initial={{ opacity: 0, x: 8 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 8 }}
                                            transition={{ duration: 0.16 }}
                                            className="absolute right-full mr-3 bg-matsuri-black text-white text-sm px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap hidden sm:block"
                                        >
                                            {item.tooltip}
                                            <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full border-8 border-transparent border-l-matsuri-black" />
                                        </motion.span>
                                    )}
                                </AnimatePresence>

                                <motion.a
                                    href={item.href}
                                    target={item.id === 'telefone' ? undefined : '_blank'}
                                    rel={item.id === 'telefone' ? undefined : 'noopener noreferrer'}
                                    initial={{ opacity: 0, x: 16, scale: 0.96 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: 16, scale: 0.96 }}
                                    transition={{ delay: prefersReducedMotion ? 0 : item.delay, duration: 0.18 }}
                                    whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
                                    whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
                                    className={`flex items-center gap-3 ${item.bgColor} ${item.hoverColor} text-white px-4 py-3 sm:px-5 rounded-full shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-matsuri-gold focus:ring-offset-2 focus:ring-offset-matsuri-black`}
                                    aria-label={item.tooltip}
                                >
                                    <span className="font-medium text-sm sm:text-base">{item.label}</span>
                                    <item.icon size={20} aria-hidden="true" />
                                </motion.a>
                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
                className="relative h-14 w-14 sm:h-auto sm:w-auto bg-matsuri-gold text-matsuri-black font-bold sm:px-6 sm:py-4 rounded-full shadow-[0_0_18px_rgba(197,160,89,0.32)] flex items-center justify-center sm:justify-start sm:gap-2 hover:bg-[#d4b06a] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-matsuri-black"
                aria-expanded={isOpen}
                aria-label={isOpen ? 'Fechar menu de pedidos' : 'Abrir menu de pedidos'}
                aria-controls="fab-menu"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.span
                            key="close"
                            initial={{ opacity: 0, rotate: -45 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 45 }}
                            transition={{ duration: 0.16 }}
                            className="flex items-center gap-2"
                        >
                            <span className="hidden sm:inline text-sm sm:text-base">Fechar</span>
                            <X size={22} aria-hidden="true" />
                        </motion.span>
                    ) : (
                        <motion.span
                            key="open"
                            initial={{ opacity: 0, rotate: 45 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: -45 }}
                            transition={{ duration: 0.16 }}
                            className="flex items-center gap-2"
                        >
                            <span className="hidden sm:inline text-sm sm:text-base">Fazer Pedido</span>
                            <Utensils size={22} aria-hidden="true" />
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
}
