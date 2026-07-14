import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight, ShoppingBag, Clock } from 'lucide-react';

// 6.4 - Banner slides data
const slides = [
    {
        id: 1,
        image: '/img/hero-bg.jpg',
        subtitle: 'Sushi Experience',
        title: 'A essência da tradição japonesa,',
        highlight: 'servida com elegância.',
        badge: null
    },
    {
        id: 2,
        image: '/img/combo2.jpg',
        subtitle: 'Promoção Especial',
        title: 'Combinado Matsuri',
        highlight: '32 peças por um preço especial.',
        badge: { text: '-15% OFF', color: 'bg-red-600' }
    },
    {
        id: 3,
        image: '/img/sashimi.jpg',
        subtitle: 'Frescor Garantido',
        title: 'Sashimis frescos,',
        highlight: 'cortados na hora.',
        badge: { text: 'Premium', color: 'bg-amber-500' }
    }
];

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState(0);
    const prefersReducedMotion = useReducedMotion();

    // Auto-advance slides — respeita prefers-reduced-motion e pausa quando a aba está oculta
    useEffect(() => {
        if (prefersReducedMotion) return; // sem rotação automática para quem prefere menos movimento

        let timer;
        const stop = () => {
            if (timer) {
                clearInterval(timer);
                timer = undefined;
            }
        };
        const start = () => {
            stop();
            timer = setInterval(() => {
                setDirection(1);
                setCurrentSlide((prev) => (prev + 1) % slides.length);
            }, 6000);
        };
        const handleVisibility = () => (document.hidden ? stop() : start());

        start();
        document.addEventListener('visibilitychange', handleVisibility);
        return () => {
            stop();
            document.removeEventListener('visibilitychange', handleVisibility);
        };
    }, [prefersReducedMotion]);

    const goToSlide = (index) => {
        setDirection(index > currentSlide ? 1 : -1);
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0
        })
    };

    // 6.3 - Scroll indicator handler
    const scrollToContent = () => {
        const target = document.getElementById('destaques');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* 6.4 - Background carousel with 6.7 - Parallax effect */}
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={currentSlide}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute inset-0"
                >
                    <motion.div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
                        style={{ backgroundImage: `url('${slides[currentSlide].image}')` }}
                        animate={prefersReducedMotion ? undefined : { scale: [1.05, 1.1] }}
                        transition={{ duration: 6, ease: 'linear' }}
                    />
                </motion.div>
            </AnimatePresence>

            {/* 6.1 - Reduced overlay (60%) */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-[1]" />

            {/* 6.6 - Improved glow effects */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600 rounded-full filter blur-[150px] opacity-20 z-[1]" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-500 rounded-full filter blur-[120px] opacity-15 z-[1]" />

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                {/* 6.5 - Promotional badge */}
                {slides[currentSlide].badge && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className={`inline-flex items-center gap-2 ${slides[currentSlide].badge.color} text-white px-4 py-2 rounded-full text-sm font-bold mb-6`}
                    >
                        <Clock size={16} />
                        {slides[currentSlide].badge.text}
                    </motion.div>
                )}

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-amber-500 tracking-[0.3em] uppercase text-sm md:text-base mb-6 font-medium">
                            {slides[currentSlide].subtitle}
                        </p>
                        <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif text-white leading-tight mb-4">
                            {slides[currentSlide].title}
                            <br />
                            <span className="italic text-amber-500/90">{slides[currentSlide].highlight}</span>
                        </h2>
                    </motion.div>
                </AnimatePresence>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="w-24 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-8 mb-10"
                />

                {/* 6.2 - CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <a
                        href="#menu"
                        className="flex items-center gap-2 px-8 py-4 bg-amber-500 text-black font-bold rounded-full transition-all duration-300 hover:bg-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] active:scale-95"
                    >
                        <ShoppingBag size={20} />
                        <span>Ver Cardápio</span>
                    </a>
                    <a
                        href="#sobre"
                        className="flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-medium rounded-full transition-all duration-300 hover:border-amber-500 hover:text-amber-500"
                    >
                        <span>Conheça o Matsuri</span>
                    </a>
                </motion.div>
            </div>

            {/* Carousel navigation arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/50 hover:border-amber-500/50 transition-all duration-300"
                aria-label="Slide anterior"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/50 hover:border-amber-500/50 transition-all duration-300"
                aria-label="Próximo slide"
            >
                <ChevronRight size={24} />
            </button>

            {/* Slide indicators */}
            <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                            currentSlide === index
                                ? 'w-8 bg-amber-500'
                                : 'w-2 bg-white/40 hover:bg-white/60'
                        }`}
                        aria-label={`Ir para slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* 6.3 - Scroll indicator */}
            <motion.button
                onClick={scrollToContent}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/60 hover:text-amber-500 transition-colors cursor-pointer group"
                aria-label="Rolar para conteúdo"
            >
                <span className="text-xs tracking-widest uppercase">Explorar</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ChevronDown size={24} className="group-hover:text-amber-500" />
                </motion.div>
            </motion.button>
        </section>
    );
}
