import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ChevronRight, ShoppingBag } from 'lucide-react';
import { useOrderModal } from '../context/OrderModalContext';

const highlights = [
    {
        img: '/img/sashimi.jpg',
        name: 'Sashimi de Salmão',
        description: 'Fatias frescas de salmão premium, cortadas na hora com técnica tradicional japonesa. Servido com wasabi fresco e gengibre.',
        tag: "Chef's Choice"
    },
    {
        img: '/img/carpaccio.jpg',
        name: 'Carpaccio de Salmão',
        description: 'Lâminas finas de salmão com azeite trufado, alcaparras e raspas de limão siciliano. Uma explosão de sabores.',
        tag: 'Premium'
    },
    {
        img: '/img/hotroll.jpg',
        name: 'Hot Roll Crocante',
        description: 'Roll empanado e frito na hora, recheado com salmão e cream cheese. Servido quente com molho tarê.',
        tag: 'Mais Pedido'
    },
    {
        img: '/img/ceviche.jpg',
        name: 'Ceviche Matsuri',
        description: 'Cubos de peixe branco marinados em leite de tigre com cebola roxa, coentro fresco e pimenta dedo-de-moça.',
        tag: 'Novidade'
    },
];

const revealViewport = { once: true, amount: 0.18 };
const revealTransition = { duration: 0.38, ease: [0.22, 1, 0.36, 1] };

export default function Highlights() {
    const [selectedItem, setSelectedItem] = useState(null);
    const { openOrder } = useOrderModal();

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Escape' && selectedItem) {
            setSelectedItem(null);
        }
    }, [selectedItem]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    useEffect(() => {
        document.body.style.overflow = selectedItem ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedItem]);

    return (
        <section id="destaques" className="content-section py-16 md:py-24 bg-gradient-to-b from-black via-neutral-950 to-neutral-900 relative overflow-hidden">
            <div className="mobile-hide-glow absolute top-20 right-0 w-72 h-72 lg:w-96 lg:h-96 bg-amber-500/5 rounded-full blur-3xl" />
            <div className="mobile-hide-glow absolute bottom-20 left-0 w-72 h-72 lg:w-96 lg:h-96 bg-red-600/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={revealViewport}
                    transition={revealTransition}
                    className="text-center mb-10 md:mb-16"
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Star className="text-amber-500" size={20} fill="currentColor" />
                        <span className="text-amber-500 tracking-[0.18em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm font-medium">Seleção Especial</span>
                        <Star className="text-amber-500" size={20} fill="currentColor" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mb-4">
                        Destaques da Casa
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto text-sm sm:text-base">
                        Pratos cuidadosamente selecionados pelo nosso chef, preparados com os melhores ingredientes e técnicas tradicionais japonesas.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
                    {highlights.map((item, index) => (
                        <motion.article
                            key={item.name}
                            initial={{ opacity: 0, y: 22 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={revealViewport}
                            transition={{ ...revealTransition, delay: index * 0.04 }}
                            className="group cursor-pointer"
                            onClick={() => setSelectedItem(item)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    setSelectedItem(item);
                                }
                            }}
                            tabIndex={0}
                            role="button"
                            aria-label={`Ver detalhes de ${item.name}`}
                        >
                            <div className="perf-card touch-static mobile-no-shadow relative overflow-hidden rounded-xl bg-gradient-to-b from-neutral-800 to-neutral-900 border border-white/10 transition-[border-color,box-shadow] duration-200 hover:border-amber-500/50 hover:shadow-[0_0_28px_rgba(245,158,11,0.16)] h-full">
                                <div className="relative h-52 sm:h-56 overflow-hidden bg-neutral-800">
                                    <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-amber-500 text-black text-xs font-bold uppercase tracking-wide rounded-full">
                                        {item.tag}
                                    </div>

                                    <img
                                        src={item.img}
                                        alt={`${item.name} - Destaque do Matsuri Container Sushi`}
                                        className="w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-105 relative z-[1]"
                                        loading="lazy"
                                        decoding="async"
                                        width={1280}
                                        height={853}
                                    />

                                    <div className="absolute inset-0 z-[2] opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                                        <div className="absolute inset-0 bg-gradient-to-t from-amber-500/24 via-transparent to-transparent" />
                                    </div>

                                    <div className="absolute inset-0 z-[3] hidden md:flex items-center justify-center bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center">
                                            <ChevronRight className="text-white" size={24} />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5">
                                    <h3 className="text-lg font-serif text-white group-hover:text-amber-500 transition-colors duration-200 mb-2">
                                        {item.name}
                                    </h3>
                                    <p className="text-white/50 text-sm line-clamp-2">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 mobile-no-backdrop md:backdrop-blur-sm"
                        onClick={() => setSelectedItem(null)}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                    >
                        <motion.div
                            initial={{ scale: 0.96, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.96, opacity: 0, y: 10 }}
                            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="mobile-safe-modal mobile-no-shadow relative max-w-4xl w-full bg-gradient-to-b from-neutral-900 to-black rounded-xl md:rounded-2xl overflow-hidden border border-amber-500/30 shadow-[0_0_36px_rgba(245,158,11,0.16)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/55 border border-white/20 flex items-center justify-center text-white hover:bg-red-600 hover:border-red-600 transition-colors duration-200"
                                aria-label="Fechar detalhes do prato"
                            >
                                <X size={20} aria-hidden="true" />
                            </button>

                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-1/2 h-56 sm:h-64 md:h-auto relative bg-neutral-900">
                                    <img
                                        src={selectedItem.img}
                                        alt={selectedItem.name}
                                        className="w-full h-full object-cover"
                                        decoding="async"
                                        width={1280}
                                        height={853}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50 md:block hidden" />
                                </div>

                                <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
                                    <span className="inline-block px-3 py-1 bg-amber-500 text-black text-xs font-bold uppercase tracking-wide rounded-full w-fit mb-4">
                                        {selectedItem.tag}
                                    </span>
                                    <h3 id="modal-title" className="text-2xl sm:text-3xl font-serif text-white mb-4 pr-8 md:pr-0">
                                        {selectedItem.name}
                                    </h3>
                                    <p className="text-white/70 leading-relaxed mb-6">
                                        {selectedItem.description}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            openOrder(selectedItem.name);
                                            setSelectedItem(null);
                                        }}
                                        className="w-full sm:w-fit flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-amber-500 text-black font-bold transition-colors duration-200 hover:bg-amber-400"
                                    >
                                        <ShoppingBag size={18} />
                                        <span>Fazer Pedido</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
