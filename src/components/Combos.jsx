import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Utensils, X, ShoppingBag, Check } from 'lucide-react';
import { useOrderModal } from '../context/OrderModalContext';

const combos = [
    {
        img: '/img/combo2.jpg',
        name: 'Combinado Matsuri Especial',
        description: 'Nossa seleção mais completa com 32 peças variadas, perfeita para compartilhar.',
        serves: '2-3 pessoas',
        pieces: '32 peças',
        includes: [
            '8 Sashimis de Salmão',
            '6 Niguiris variados',
            '8 Uramakis especiais',
            '6 Hot Rolls',
            '4 Hossomakis'
        ],
        featured: true
    },
    {
        img: '/img/combo3.jpg',
        name: 'Combinado Seleção',
        description: 'Seleção premium com os melhores cortes e combinações escolhidas pelo chef.',
        serves: '1-2 pessoas',
        pieces: '24 peças',
        includes: [
            '6 Sashimis de Salmão',
            '4 Niguiris variados',
            '6 Uramakis',
            '4 Hot Rolls',
            '4 Hossomakis'
        ],
        featured: false
    },
];

const revealViewport = { once: true, amount: 0.18 };
const revealTransition = { duration: 0.38, ease: [0.22, 1, 0.36, 1] };

export default function Combos() {
    const [selectedCombo, setSelectedCombo] = useState(null);
    const { openOrder } = useOrderModal();

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Escape' && selectedCombo) {
            setSelectedCombo(null);
        }
    }, [selectedCombo]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    useEffect(() => {
        document.body.style.overflow = selectedCombo ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedCombo]);

    return (
        <section id="combos" className="content-section py-16 md:py-24 bg-gradient-to-b from-neutral-900 via-black to-black relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />
            <div className="mobile-hide-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] lg:w-[600px] lg:h-[600px] bg-red-600/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={revealViewport}
                    transition={revealTransition}
                    className="text-center mb-10 md:mb-16"
                >
                    <span className="text-red-500 tracking-[0.18em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm font-medium">Para Compartilhar</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mt-4 mb-4">
                        Nossos Combos
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-red-600 via-amber-500 to-red-600 mx-auto rounded-full" />
                    <p className="text-white/60 max-w-2xl mx-auto mt-6 text-sm sm:text-base">
                        Combinações especiais pensadas para você aproveitar o melhor da culinária japonesa com quem você ama.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
                    {combos.map((combo, index) => (
                        <motion.div
                            key={combo.name}
                            initial={{ opacity: 0, y: 22 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={revealViewport}
                            transition={{ ...revealTransition, delay: index * 0.06 }}
                            className="group"
                        >
                            <div className={`perf-card touch-static mobile-no-shadow relative overflow-hidden rounded-xl border transition-[border-color,box-shadow] duration-200 h-full ${
                                combo.featured
                                    ? 'bg-gradient-to-b from-amber-500/10 to-black border-amber-500/50 hover:border-amber-500 hover:shadow-[0_0_30px_rgba(245,158,11,0.18)]'
                                    : 'bg-gradient-to-b from-neutral-900 to-black border-white/10 hover:border-red-500/50 hover:shadow-[0_0_28px_rgba(220,38,38,0.14)]'
                            }`}>
                                {combo.featured && (
                                    <div className="absolute top-4 right-4 z-10 px-3 sm:px-4 py-1.5 bg-amber-500 text-black text-xs font-bold uppercase tracking-wide rounded-full flex items-center gap-1">
                                        <Utensils size={12} />
                                        Mais Pedido
                                    </div>
                                )}

                                <div className="relative h-56 sm:h-64 overflow-hidden bg-neutral-900">
                                    <img
                                        src={combo.img}
                                        alt={`${combo.name} - Combo especial do Matsuri Container Sushi`}
                                        className="w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-105 relative z-[1]"
                                        loading="lazy"
                                        decoding="async"
                                        width={1280}
                                        height={853}
                                    />
                                    <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black via-black/30 to-transparent" />

                                    <div className="absolute bottom-4 left-4 right-4 z-[3] flex flex-wrap gap-2 sm:gap-3">
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black/75 rounded-full text-white text-xs sm:text-sm">
                                            <Users size={14} className="text-amber-500" />
                                            {combo.serves}
                                        </div>
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black/75 rounded-full text-white text-xs sm:text-sm">
                                            <Utensils size={14} className="text-amber-500" />
                                            {combo.pieces}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 sm:p-6">
                                    <h3 className="text-xl sm:text-2xl font-serif text-white group-hover:text-amber-500 transition-colors duration-200 mb-3">
                                        {combo.name}
                                    </h3>
                                    <p className="text-white/60 mb-6 text-sm sm:text-base">
                                        {combo.description}
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <button
                                            onClick={() => setSelectedCombo(combo)}
                                            className="flex-1 py-3 rounded-lg border border-white/20 text-white font-medium transition-colors duration-200 hover:border-amber-500 hover:text-amber-500"
                                        >
                                            Ver Detalhes
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => openOrder(combo.name)}
                                            className={`flex-1 py-3 rounded-lg font-bold transition-colors duration-200 flex items-center justify-center gap-2 ${
                                            combo.featured
                                                ? 'bg-amber-500 text-black hover:bg-amber-400'
                                                : 'bg-red-600 text-white hover:bg-red-500'
                                        }`}
                                        >
                                            <ShoppingBag size={18} />
                                            Pedir
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedCombo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 mobile-no-backdrop md:backdrop-blur-sm"
                        onClick={() => setSelectedCombo(null)}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="combo-modal-title"
                    >
                        <motion.div
                            initial={{ scale: 0.96, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.96, opacity: 0, y: 10 }}
                            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="mobile-safe-modal mobile-no-shadow relative max-w-3xl w-full bg-gradient-to-b from-neutral-900 to-black rounded-xl md:rounded-2xl overflow-hidden border border-amber-500/30 shadow-[0_0_36px_rgba(245,158,11,0.16)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedCombo(null)}
                                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/55 border border-white/20 flex items-center justify-center text-white hover:bg-red-600 hover:border-red-600 transition-colors duration-200"
                                aria-label="Fechar detalhes do combo"
                            >
                                <X size={20} aria-hidden="true" />
                            </button>

                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-1/2 h-56 sm:h-64 md:h-auto relative bg-neutral-900">
                                    <img
                                        src={selectedCombo.img}
                                        alt={selectedCombo.name}
                                        className="w-full h-full object-cover"
                                        decoding="async"
                                        width={1280}
                                        height={853}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50 md:block hidden" />
                                </div>

                                <div className="md:w-1/2 p-6 sm:p-8">
                                    <div className="flex flex-wrap gap-3 mb-4 pr-10 md:pr-0">
                                        <span className="px-3 py-1 bg-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-wide rounded-full">
                                            {selectedCombo.serves}
                                        </span>
                                        <span className="px-3 py-1 bg-white/10 text-white text-xs font-bold uppercase tracking-wide rounded-full">
                                            {selectedCombo.pieces}
                                        </span>
                                    </div>

                                    <h3 id="combo-modal-title" className="text-2xl font-serif text-white mb-3 pr-8 md:pr-0">
                                        {selectedCombo.name}
                                    </h3>
                                    <p className="text-white/70 mb-6">
                                        {selectedCombo.description}
                                    </p>

                                    <div className="mb-6">
                                        <h4 className="text-sm font-bold text-amber-500 uppercase tracking-wide mb-3">
                                            O que está incluso:
                                        </h4>
                                        <ul className="space-y-2">
                                            {selectedCombo.includes.map((item, idx) => (
                                                <li key={idx} className="flex items-center gap-2 text-white/80 text-sm">
                                                    <Check size={16} className="text-amber-500 flex-shrink-0" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            openOrder(selectedCombo.name);
                                            setSelectedCombo(null);
                                        }}
                                        className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-amber-500 text-black font-bold transition-colors duration-200 hover:bg-amber-400"
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
