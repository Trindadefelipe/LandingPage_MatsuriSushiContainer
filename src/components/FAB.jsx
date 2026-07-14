import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, Phone, X, MessageCircle } from 'lucide-react';
import { site, whatsappUrl, telUrl, ifoodUrl } from '../config/site';

export default function FAB() {
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);

    const menuItems = [
        {
            id: 'whatsapp',
            href: whatsappUrl,
            label: 'WhatsApp',
            tooltip: 'Peça pelo WhatsApp',
            icon: MessageCircle,
            bgColor: 'bg-[#25D366]',
            hoverColor: 'hover:bg-[#20BD5A]',
            delay: 0.1,
        },
        {
            id: 'telefone',
            href: telUrl,
            label: 'Ligar',
            tooltip: site.phoneDisplay,
            icon: Phone,
            bgColor: 'bg-matsuri-red',
            hoverColor: 'hover:bg-red-700',
            delay: 0.15,
        },
        {
            id: 'ifood',
            href: ifoodUrl,
            label: 'iFood',
            tooltip: 'Peça pelo iFood',
            icon: Utensils,
            bgColor: 'bg-[#EA1D2C]',
            hoverColor: 'hover:bg-[#C41622]',
            delay: 0.2,
        },
    ];

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
            {/* Menu de Opções */}
            <AnimatePresence>
                {isOpen && (
                    <div className="flex flex-col gap-3">
                        {menuItems.map((item) => (
                            <motion.div
                                key={item.id}
                                className="relative flex items-center justify-end"
                                onMouseEnter={() => setHoveredItem(item.id)}
                                onMouseLeave={() => setHoveredItem(null)}
                                onFocus={() => setHoveredItem(item.id)}
                                onBlur={() => setHoveredItem(null)}
                            >
                                {/* Tooltip */}
                                <AnimatePresence>
                                    {hoveredItem === item.id && (
                                        <motion.span
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            className="absolute right-full mr-3 bg-matsuri-black text-white text-sm px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap hidden sm:block"
                                        >
                                            {item.tooltip}
                                            {/* Seta do tooltip */}
                                            <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full border-8 border-transparent border-l-matsuri-black" />
                                        </motion.span>
                                    )}
                                </AnimatePresence>

                                {/* Botão */}
                                <motion.a
                                    href={item.href}
                                    target={item.id === 'telefone' ? '_self' : '_blank'}
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, x: 20, scale: 0.8 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: 20, scale: 0.8 }}
                                    transition={{ delay: item.delay }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`flex items-center gap-3 ${item.bgColor} ${item.hoverColor} text-white px-5 py-3 rounded-full shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-matsuri-gold focus:ring-offset-2 focus:ring-offset-matsuri-black`}
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

            {/* Botão Principal */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative bg-matsuri-gold text-matsuri-black font-bold px-5 py-3 sm:px-6 sm:py-4 rounded-full shadow-[0_0_20px_rgba(197,160,89,0.4)] flex items-center gap-2 hover:bg-[#d4b06a] transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-matsuri-black"
                aria-expanded={isOpen}
                aria-label={isOpen ? 'Fechar menu de pedidos' : 'Abrir menu de pedidos'}
                aria-controls="fab-menu"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.span
                            key="close"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                            className="flex items-center gap-2"
                        >
                            <span className="text-sm sm:text-base">Fechar</span>
                            <X size={22} aria-hidden="true" />
                        </motion.span>
                    ) : (
                        <motion.span
                            key="open"
                            initial={{ opacity: 0, rotate: 90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: -90 }}
                            className="flex items-center gap-2"
                        >
                            <span className="text-sm sm:text-base">Fazer Pedido</span>
                            <Utensils size={22} aria-hidden="true" />
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
}
