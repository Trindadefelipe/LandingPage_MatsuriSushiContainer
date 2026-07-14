import { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingBag, Sparkles, Flame, Star } from 'lucide-react';
import { ifoodUrl } from '../config/site';
import { useOrderModal } from '../context/OrderModalContext';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const menuItems = [
    {
        img: '/img/sashimi.jpg',
        name: 'Sashimi de Salmão',
        description: 'Fatias frescas de salmão premium, cortadas na hora com técnica tradicional japonesa.',
        category: 'sashimi',
        badge: 'Especialidade',
        badgeIcon: Star
    },
    {
        img: '/img/combo2.jpg',
        name: 'Combinado Matsuri Especial',
        description: '32 peças variadas incluindo sashimis, niguiris e uramakis especiais da casa.',
        category: 'combos',
        badge: 'Mais Pedido',
        badgeIcon: Flame
    },
    {
        img: '/img/combo3.jpg',
        name: 'Combinado Seleção',
        description: '24 peças selecionadas com os melhores cortes e combinações do chef.',
        category: 'combos',
        badge: null,
        badgeIcon: null
    },
    {
        img: '/img/fila.jpg',
        name: 'Filadélfia Crispy',
        description: 'Uramaki empanado com cream cheese, salmão e cebolinha, finalizado com molho especial.',
        category: 'rolls',
        badge: 'Novo',
        badgeIcon: Sparkles
    },
    {
        img: '/img/niguiri.jpg',
        name: 'Niguiri Tradicional',
        description: 'Bolinho de arroz prensado à mão coberto com fatia de peixe fresco.',
        category: 'niguiri',
        badge: null,
        badgeIcon: null
    },
    {
        img: '/img/carpaccio.jpg',
        name: 'Carpaccio de Salmão',
        description: 'Lâminas finas de salmão com azeite trufado, alcaparras e raspas de limão siciliano.',
        category: 'sashimi',
        badge: 'Especialidade',
        badgeIcon: Star
    },
    {
        img: '/img/hotroll.jpg',
        name: 'Hot Roll Crocante',
        description: 'Roll empanado e frito, recheado com salmão e cream cheese, servido quente.',
        category: 'rolls',
        badge: 'Mais Pedido',
        badgeIcon: Flame
    },
    {
        img: '/img/ceviche.jpg',
        name: 'Ceviche',
        description: 'Cubos de peixe branco marinados em leite de tigre com cebola roxa e coentro.',
        category: 'entradas',
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

function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        const update = () => setMatches(media.matches);
        update();

        if (media.addEventListener) {
            media.addEventListener('change', update);
            return () => media.removeEventListener('change', update);
        }

        media.addListener(update);
        return () => media.removeListener(update);
    }, [query]);

    return matches;
}

export default function Menu() {
    const [activeCategory, setActiveCategory] = useState('todos');
    const swiperRef = useRef(null);
    const { openOrder } = useOrderModal();
    const prefersReducedMotion = useReducedMotion();
    const isMobile = useMediaQuery('(max-width: 767px)');

    const filteredItems = activeCategory === 'todos'
        ? menuItems
        : menuItems.filter(item => item.category === activeCategory);

    const enableAutoplay = !prefersReducedMotion && !isMobile;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: isMobile ? 0 : 0.04
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.34, ease: [0.22, 1, 0.36, 1] }
        }
    };

    return (
        <section id="menu" className="content-section py-16 md:py-20 bg-gradient-to-b from-black via-neutral-950 to-black relative z-10 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-9 md:mb-12"
                >
                    <span className="text-amber-500 tracking-[0.18em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm font-medium">Sabores Exclusivos</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mt-4 mb-4">
                        Nosso Menu
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-red-600 via-amber-500 to-red-600 mx-auto rounded-full" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.34, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="no-scrollbar -mx-4 mb-9 md:mb-12 flex flex-nowrap justify-start gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:gap-3 sm:overflow-visible sm:px-0 sm:pb-0"
                    aria-label="Categorias do cardápio"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`shrink-0 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-[background-color,border-color,color,box-shadow] duration-200 border ${
                                activeCategory === cat.id
                                    ? 'bg-amber-500 text-black border-amber-500 mobile-no-shadow shadow-[0_0_16px_rgba(245,158,11,0.28)]'
                                    : 'bg-transparent text-white/80 border-white/20 hover:border-amber-500/50 hover:text-amber-500'
                            }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.12 }}
                    className="relative px-0 sm:px-12"
                >
                    <button
                        className="hidden sm:flex swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/80 border border-amber-500/50 items-center justify-center text-amber-500 hover:bg-amber-500 hover:text-black transition-colors duration-200"
                        onClick={() => swiperRef.current?.slidePrev()}
                        aria-label="Item anterior do cardápio"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        className="hidden sm:flex swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/80 border border-amber-500/50 items-center justify-center text-amber-500 hover:bg-amber-500 hover:text-black transition-colors duration-200"
                        onClick={() => swiperRef.current?.slideNext()}
                        aria-label="Próximo item do cardápio"
                    >
                        <ChevronRight size={24} />
                    </button>

                    <Swiper
                        key={activeCategory}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={isMobile ? 16 : 24}
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
                        autoplay={enableAutoplay ? { delay: 5200, disableOnInteraction: false, pauseOnMouseEnter: true } : false}
                        speed={isMobile ? 420 : 650}
                        className="pb-14"
                    >
                        {filteredItems.map((item, index) => (
                            <SwiperSlide key={`${item.name}-${index}`}>
                                <motion.div
                                    variants={itemVariants}
                                    className="perf-card touch-static mobile-no-shadow group relative overflow-hidden rounded-xl bg-gradient-to-b from-neutral-900 to-black border border-white/10 transition-[border-color,box-shadow] duration-200 hover:border-amber-500/50 hover:shadow-[0_0_24px_rgba(245,158,11,0.12)]"
                                >
                                    <div className="relative h-60 sm:h-64 overflow-hidden bg-neutral-900">
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

                                        <img
                                            src={item.img}
                                            alt={`${item.name} - Prato japonês do Matsuri Container Sushi`}
                                            className="w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-105"
                                            loading="lazy"
                                            decoding="async"
                                            width={1280}
                                            height={853}
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 md:group-hover:opacity-45 transition-opacity duration-200" />
                                        <div className="absolute inset-0 opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-t from-amber-500/18 via-transparent to-transparent" />
                                    </div>

                                    <div className="p-5">
                                        <h3 className="text-lg font-serif text-white group-hover:text-amber-500 transition-colors duration-200 mb-2">
                                            {item.name}
                                        </h3>

                                        <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-2">
                                            {item.description}
                                        </p>

                                        <button
                                            type="button"
                                            onClick={() => openOrder(item.name)}
                                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-transparent border border-amber-500/50 text-amber-500 font-medium text-sm transition-colors duration-200 hover:bg-amber-500 hover:text-black group/btn"
                                        >
                                            <ShoppingBag size={16} className="transition-transform duration-200 group-hover/btn:scale-105" />
                                            <span>Fazer Pedido</span>
                                        </button>
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.34, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mt-6 md:mt-8"
                >
                    <a
                        href={ifoodUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-amber-500 hover:text-white transition-colors duration-200 font-medium"
                    >
                        Ver cardápio completo
                        <ChevronRight size={18} />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
