import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Utensils, X, ShoppingBag, Check } from 'lucide-react';

const combos = [
    {
        img: "/img/combo2.jpg",
        name: "Combinado Matsuri Especial",
        description: "Nossa seleção mais completa com 32 peças variadas, perfeita para compartilhar.",
        serves: "2-3 pessoas",
        pieces: "32 peças",
        includes: [
            "8 Sashimis de Salmão",
            "6 Niguiris variados",
            "8 Uramakis especiais",
            "6 Hot Rolls",
            "4 Hossomakis"
        ],
        featured: true
    },
    {
        img: "/img/combo3.jpg",
        name: "Combinado Seleção",
        description: "Seleção premium com os melhores cortes e combinações escolhidas pelo chef.",
        serves: "1-2 pessoas",
        pieces: "24 peças",
        includes: [
            "6 Sashimis de Salmão",
            "4 Niguiris variados",
            "6 Uramakis",
            "4 Hot Rolls",
            "4 Hossomakis"
        ],
        featured: false
    },
];

export default function Combos() {
    const [selectedCombo, setSelectedCombo] = useState(null);

    // 11.5 - Keyboard navigation for modal
    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Escape' && selectedCombo) {
            setSelectedCombo(null);
        }
    }, [selectedCombo]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedCombo) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedCombo]);

    return (
        <section id="combos" className="py-24 bg-gradient-to-b from-neutral-900 via-black to-black relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-red-500 tracking-[0.3em] uppercase text-sm font-medium">Para Compartilhar</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-white mt-4 mb-4">
                        Nossos Combos
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-red-600 via-amber-500 to-red-600 mx-auto rounded-full" />
                    <p className="text-white/60 max-w-2xl mx-auto mt-6">
                        Combinações especiais pensadas para você aproveitar o melhor da culinária japonesa com quem você ama.
                    </p>
                </motion.div>

                {/* Combos grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {combos.map((combo, index) => (
                        <motion.div
                            key={combo.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="group"
                        >
                            {/* Premium card */}
                            <div className={`relative overflow-hidden rounded-2xl border transition-all duration-500 h-full ${
                                combo.featured
                                    ? 'bg-gradient-to-b from-amber-500/10 to-black border-amber-500/50 hover:border-amber-500 hover:shadow-[0_0_50px_rgba(245,158,11,0.3)]'
                                    : 'bg-gradient-to-b from-neutral-900 to-black border-white/10 hover:border-red-500/50 hover:shadow-[0_0_50px_rgba(220,38,38,0.2)]'
                            }`}>
                                {/* Featured badge */}
                                {combo.featured && (
                                    <div className="absolute top-4 right-4 z-10 px-4 py-1.5 bg-amber-500 text-black text-xs font-bold uppercase tracking-wide rounded-full flex items-center gap-1">
                                        <Utensils size={12} />
                                        Mais Pedido
                                    </div>
                                )}

                                {/* Image */}
                                <div className="relative h-64 overflow-hidden">
                                    <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
                                    <img
                                        src={combo.img}
                                        alt={`${combo.name} - Combo especial do Matsuri Container Sushi`}
                                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 relative z-[1]"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black via-black/30 to-transparent" />

                                    {/* Info badges on image */}
                                    <div className="absolute bottom-4 left-4 z-[3] flex gap-3">
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-full text-white text-sm">
                                            <Users size={14} className="text-amber-500" />
                                            {combo.serves}
                                        </div>
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-full text-white text-sm">
                                            <Utensils size={14} className="text-amber-500" />
                                            {combo.pieces}
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-2xl font-serif text-white group-hover:text-amber-500 transition-colors duration-300 mb-3">
                                        {combo.name}
                                    </h3>
                                    <p className="text-white/60 mb-6">
                                        {combo.description}
                                    </p>

                                    {/* Actions */}
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setSelectedCombo(combo)}
                                            className="flex-1 py-3 rounded-lg border border-white/20 text-white font-medium transition-all duration-300 hover:border-amber-500 hover:text-amber-500"
                                        >
                                            Ver Detalhes
                                        </button>
                                        <button className={`flex-1 py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                                            combo.featured
                                                ? 'bg-amber-500 text-black hover:bg-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.5)]'
                                                : 'bg-red-600 text-white hover:bg-red-500 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)]'
                                        }`}>
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

            {/* Modal for combo details */}
            <AnimatePresence>
                {selectedCombo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
                        onClick={() => setSelectedCombo(null)}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="combo-modal-title"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25 }}
                            className="relative max-w-3xl w-full bg-gradient-to-b from-neutral-900 to-black rounded-2xl overflow-hidden border border-amber-500/30 shadow-[0_0_60px_rgba(245,158,11,0.2)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setSelectedCombo(null)}
                                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white hover:bg-red-600 hover:border-red-600 transition-all duration-300"
                                aria-label="Fechar detalhes do combo"
                            >
                                <X size={20} aria-hidden="true" />
                            </button>

                            <div className="flex flex-col md:flex-row">
                                {/* Image */}
                                <div className="md:w-1/2 h-64 md:h-auto relative">
                                    <img
                                        src={selectedCombo.img}
                                        alt={selectedCombo.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50 md:block hidden" />
                                </div>

                                {/* Content */}
                                <div className="md:w-1/2 p-8">
                                    <div className="flex gap-3 mb-4">
                                        <span className="px-3 py-1 bg-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-wide rounded-full">
                                            {selectedCombo.serves}
                                        </span>
                                        <span className="px-3 py-1 bg-white/10 text-white text-xs font-bold uppercase tracking-wide rounded-full">
                                            {selectedCombo.pieces}
                                        </span>
                                    </div>

                                    <h3 id="combo-modal-title" className="text-2xl font-serif text-white mb-3">
                                        {selectedCombo.name}
                                    </h3>
                                    <p className="text-white/70 mb-6">
                                        {selectedCombo.description}
                                    </p>

                                    {/* Includes list */}
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

                                    <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-amber-500 text-black font-bold transition-all duration-300 hover:bg-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]">
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
