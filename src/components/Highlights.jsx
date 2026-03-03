import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ChevronRight, ShoppingBag } from 'lucide-react';

const highlights = [
    {
        img: "/img/sashimi.jpg",
        name: "Sashimi de Salmão",
        description: "Fatias frescas de salmão premium, cortadas na hora com técnica tradicional japonesa. Servido com wasabi fresco e gengibre.",
        tag: "Chef's Choice"
    },
    {
        img: "/img/carpaccio.jpg",
        name: "Carpaccio de Salmão",
        description: "Lâminas finas de salmão com azeite trufado, alcaparras e raspas de limão siciliano. Uma explosão de sabores.",
        tag: "Premium"
    },
    {
        img: "/img/hotroll.jpg",
        name: "Hot Roll Crocante",
        description: "Roll empanado e frito na hora, recheado com salmão e cream cheese. Servido quente com molho tarê.",
        tag: "Mais Pedido"
    },
    {
        img: "/img/ceviche.jpg",
        name: "Ceviche Matsuri",
        description: "Cubos de peixe branco marinados em leite de tigre com cebola roxa, coentro fresco e pimenta dedo-de-moça.",
        tag: "Novidade"
    },
];

export default function Highlights() {
    const [selectedItem, setSelectedItem] = useState(null);

    // 11.5 - Keyboard navigation for modal
    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Escape' && selectedItem) {
            setSelectedItem(null);
        }
    }, [selectedItem]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    // Trap focus when modal is open
    useEffect(() => {
        if (selectedItem) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedItem]);

    return (
        <section id="destaques" className="py-24 bg-gradient-to-b from-black via-neutral-950 to-neutral-900 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-20 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Star className="text-amber-500" size={20} fill="currentColor" />
                        <span className="text-amber-500 tracking-[0.3em] uppercase text-sm font-medium">Seleção Especial</span>
                        <Star className="text-amber-500" size={20} fill="currentColor" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
                        Destaques da Casa
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto">
                        Pratos cuidadosamente selecionados pelo nosso chef, preparados com os melhores ingredientes e técnicas tradicionais japonesas.
                    </p>
                </motion.div>

                {/* 2.2 - Grid gallery */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {highlights.map((item, index) => (
                        <motion.article
                            key={item.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group cursor-pointer"
                            onClick={() => setSelectedItem(item)}
                            onKeyDown={(e) => e.key === 'Enter' && setSelectedItem(item)}
                            tabIndex={0}
                            role="button"
                            aria-label={`Ver detalhes de ${item.name}`}
                        >
                            {/* 2.4 - Premium card */}
                            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-neutral-800 to-neutral-900 border border-white/10 transition-all duration-500 hover:border-amber-500/50 hover:shadow-[0_0_40px_rgba(245,158,11,0.2)] h-full">
                                {/* Image */}
                                <div className="relative h-56 overflow-hidden">
                                    {/* Tag */}
                                    <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-amber-500 text-black text-xs font-bold uppercase tracking-wide rounded-full">
                                        {item.tag}
                                    </div>

                                    {/* 2.7 - Lazy loading with blur placeholder */}
                                    <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
                                    <img
                                        src={item.img}
                                        alt={`${item.name} - Destaque do Matsuri Container Sushi`}
                                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 relative z-[1]"
                                        loading="lazy"
                                        style={{ filter: 'none' }}
                                    />

                                    {/* 2.6 - Golden glow effect */}
                                    <div className="absolute inset-0 z-[2] opacity-0 group-hover:opacity-100 transition-all duration-500">
                                        <div className="absolute inset-0 bg-gradient-to-t from-amber-500/30 via-transparent to-transparent" />
                                        <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(245,158,11,0.3)]" />
                                    </div>

                                    {/* View icon overlay */}
                                    <div className="absolute inset-0 z-[3] flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                            <ChevronRight className="text-white" size={24} />
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h3 className="text-lg font-serif text-white group-hover:text-amber-500 transition-colors duration-300 mb-2">
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

            {/* 2.3 - Modal/Lightbox */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
                        onClick={() => setSelectedItem(null)}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25 }}
                            className="relative max-w-4xl w-full bg-gradient-to-b from-neutral-900 to-black rounded-2xl overflow-hidden border border-amber-500/30 shadow-[0_0_60px_rgba(245,158,11,0.2)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white hover:bg-red-600 hover:border-red-600 transition-all duration-300"
                                aria-label="Fechar detalhes do prato"
                            >
                                <X size={20} aria-hidden="true" />
                            </button>

                            <div className="flex flex-col md:flex-row">
                                {/* Image */}
                                <div className="md:w-1/2 h-64 md:h-auto relative">
                                    <img
                                        src={selectedItem.img}
                                        alt={selectedItem.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50 md:block hidden" />
                                </div>

                                {/* Content */}
                                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                                    <span className="inline-block px-3 py-1 bg-amber-500 text-black text-xs font-bold uppercase tracking-wide rounded-full w-fit mb-4">
                                        {selectedItem.tag}
                                    </span>
                                    <h3 id="modal-title" className="text-3xl font-serif text-white mb-4">
                                        {selectedItem.name}
                                    </h3>
                                    <p className="text-white/70 leading-relaxed mb-6">
                                        {selectedItem.description}
                                    </p>
                                    <button className="flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-amber-500 text-black font-bold transition-all duration-300 hover:bg-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] w-fit">
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
