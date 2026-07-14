import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingBag, Sparkles, Flame, Star } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const menuItems = [
    {
        img: "/img/sashimi.jpg",
        name: "Sashimi de Salmão",
        description: "Fatias frescas de salmão premium, cortadas na hora com técnica tradicional japonesa.",
        category: "sashimi",
        badge: "Especialidade",
        badgeIcon: Star
    },
    {
        img: "/img/combo2.jpg",
        name: "Combinado Matsuri Especial",
        description: "32 peças variadas incluindo sashimis, niguiris e uramakis especiais da casa.",
        category: "combos",
        badge: "Mais Pedido",
        badgeIcon: Flame
    },
    {
        img: "/img/combo3.jpg",
        name: "Combinado Seleção",
        description: "24 peças selecionadas com os melhores cortes e combinações do chef.",
        category: "combos",
        badge: null,
        badgeIcon: null
    },
    {
        img: "/img/fila.jpg",
        name: "Filadélfia Crispy",
        description: "Uramaki empanado com cream cheese, salmão e cebolinha, finalizado com molho especial.",
        category: "rolls",
        badge: "Novo",
        badgeIcon: Sparkles
    },
    {
        img: "/img/niguiri.jpg",
        name: "Niguiri Tradicional",
        description: "Bolinho de arroz prensado à mão coberto com fatia de peixe fresco.",
        category: "niguiri",
        badge: null,
        badgeIcon: null
    },
    {
        img: "/img/carpaccio.jpg",
        name: "Carpaccio de Salmão",
        description: "Lâminas finas de salmão com azeite trufado, alcaparras e raspas de limão siciliano.",
        category: "sashimi",
        badge: "Especialidade",
        badgeIcon: Star
    },
    {
        img: "/img/hotroll.jpg",
        name: "Hot Roll Crocante",
        description: "Roll empanado e frito, recheado com salmão e cream cheese, servido quente.",
        category: "rolls",
        badge: "Mais Pedido",
        badgeIcon: Flame
    },
    {
        img: "/img/ceviche.jpg",
        name: "Ceviche",
        description: "Cubos de peixe branco marinados em leite de tigre com cebola roxa e coentro.",
        category: "entradas",
        badge: null,
        badgeIcon: null
    },
];

const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'combos', label: 'Combos' },
    { id: 'sashimi', label: 'Sashimis' },
    { id: 'rolls', label: 'Rolls' },
    { id: 'niguiri', label: 'Niguiris' },
    { id: 'entradas', label: 'Entradas' },
];

export default function Menu() {
    const [activeCategory, setActiveCategory] = useState('todos');
    const swiperRef = useRef(null);

    const filteredItems = activeCategory === 'todos'
        ? menuItems
        : menuItems.filter(item => item.category === activeCategory);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section id="menu" className="py-20 bg-gradient-to-b from-black via-neutral-950 to-black relative z-10">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

            <div className="container mx-auto px-4">
                {/* 1.10 - Animated header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <span className="text-amber-500 tracking-[0.3em] uppercase text-sm font-medium">Sabores Exclusivos</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-white mt-4 mb-4">
                        Nosso Menu
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-red-600 via-amber-500 to-red-600 mx-auto rounded-full" />
                </motion.div>

                {/* 1.8 - Category filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 border ${
                                activeCategory === cat.id
                                    ? 'bg-amber-500 text-black border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                                    : 'bg-transparent text-white/80 border-white/20 hover:border-amber-500/50 hover:text-amber-500'
                            }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </motion.div>

                {/* Carousel container */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative px-12"
                >
                    {/* 1.1 - Navigation arrows */}
                    <button
                        className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/80 border border-amber-500/50 flex items-center justify-center text-amber-500 hover:bg-amber-500 hover:text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.5)]"
                        onClick={() => swiperRef.current?.slidePrev()}
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/80 border border-amber-500/50 flex items-center justify-center text-amber-500 hover:bg-amber-500 hover:text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.5)]"
                        onClick={() => swiperRef.current?.slideNext()}
                    >
                        <ChevronRight size={24} />
                    </button>

                    <Swiper
                        key={activeCategory}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={24}
                        slidesPerView={1}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                            1280: { slidesPerView: 4 },
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                        speed={800}
                        className="pb-14"
                    >
                        {filteredItems.map((item, index) => (
                            <SwiperSlide key={`${item.name}-${index}`}>
                                <motion.div
                                    variants={itemVariants}
                                    className="group relative overflow-hidden rounded-xl bg-gradient-to-b from-neutral-900 to-black border border-white/10 transition-all duration-500 hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]"
                                >
                                    {/* Image container */}
                                    <div className="relative h-64 overflow-hidden">
                                        {/* 1.4 - Badge */}
                                        {item.badge && (
                                            <div className={`absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                                                item.badge === 'Especialidade' ? 'bg-amber-500 text-black' :
                                                item.badge === 'Mais Pedido' ? 'bg-red-600 text-white' :
                                                'bg-white text-black'
                                            }`}>
                                                {item.badgeIcon && <item.badgeIcon size={12} />}
                                                {item.badge}
                                            </div>
                                        )}

                                        {/* 2.5 - No dark overlay, just subtle gradient for text readability */}
                                        <img
                                            src={item.img}
                                            alt={`${item.name} - Prato japonês do Matsuri Container Sushi`}
                                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                                            loading="lazy"
                                            decoding="async"
                                            width={1280}
                                            height={853}
                                        />

                                        {/* 1.9 - Improved hover overlay with golden glow */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                                        {/* 2.6 - Golden glow effect on hover */}
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-amber-500/20 via-transparent to-transparent" />
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        <h3 className="text-lg font-serif text-white group-hover:text-amber-500 transition-colors duration-300 mb-2">
                                            {item.name}
                                        </h3>

                                        {/* 1.3 - Description */}
                                        <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-2">
                                            {item.description}
                                        </p>

                                        {/* 1.7 - CTA Button */}
                                        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-transparent border border-amber-500/50 text-amber-500 font-medium text-sm transition-all duration-300 hover:bg-amber-500 hover:text-black hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] group/btn">
                                            <ShoppingBag size={16} className="transition-transform group-hover/btn:scale-110" />
                                            <span>Fazer Pedido</span>
                                        </button>
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>

                {/* View full menu CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-8"
                >
                    <a
                        href="#"
                        className="inline-flex items-center gap-2 text-amber-500 hover:text-white transition-colors duration-300 font-medium"
                    >
                        Ver cardápio completo
                        <ChevronRight size={18} />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
