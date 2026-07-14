import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight, ShoppingBag, Clock } from 'lucide-react';
import { ifoodUrl } from '../config/site';

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

const slideVariants = {
    enter: (direction) => ({
        x: direction > 0 ? 28 : -28,
        opacity: 0
    }),
    center: {
        x: 0,
        opacity: 1
    },
    exit: (direction) => ({
        x: direction < 0 ? 28 : -28,
        opacity: 0
    })
};

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState(0);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        const warmImages = () => {
            slides.slice(1).forEach((slide) => {
                const image = new Image();
                image.decoding = 'async';
                image.src = slide.image;
            });
        };

        if ('requestIdleCallback' in window) {
            const idleId = window.requestIdleCallback(warmImages, { timeout: 1500 });
            return () => window.cancelIdleCallback(idleId);
        }

        const timeoutId = window.setTimeout(warmImages, 800);
        return () => window.clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        if (prefersReducedMotion) return;

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
            }, 6500);
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
        if (index === currentSlide) return;
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

    const scrollToContent = () => {
        const target = document.getElementById('destaques');
        if (target) {
            target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        }
    };

    const slideTransition = prefersReducedMotion
        ? { duration: 0 }
        : { duration: 0.45, ease: [0.22, 1, 0.36, 1] };

    return (
        <section className="relative min-h-[100svh] md:min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-28 pb-32 sm:pt-32 sm:pb-36 md:px-0 md:py-0">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                    key={currentSlide}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={slideTransition}
                    className="absolute inset-0 gpu-layer"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-[1.03]"
                        style={{ backgroundImage: `url('${slides[currentSlide].image}')` }}
                    />
                </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/85 z-[1]" />
            <div className="mobile-hide-glow absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-red-600 rounded-full blur-[110px] opacity-15 z-[1]" />
            <div className="mobile-hide-glow absolute bottom-1/4 right-1/4 w-[320px] h-[320px] bg-amber-500 rounded-full blur-[90px] opacity-10 z-[1]" />

            <div className="relative z-10 w-full max-w-5xl mx-auto text-center">
                {slides[currentSlide].badge && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={slideTransition}
                        className={`inline-flex items-center gap-2 ${slides[currentSlide].badge.color} text-white px-4 py-2 rounded-full text-xs sm:text-sm font-bold mb-5 sm:mb-6`}
                    >
                        <Clock size={16} />
                        {slides[currentSlide].badge.text}
                    </motion.div>
                )}

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -18 }}
                        transition={slideTransition}
                    >
                        <p className="text-amber-500 tracking-[0.18em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm md:text-base mb-5 sm:mb-6 font-medium">
                            {slides[currentSlide].subtitle}
                        </p>
                        <h2 className="text-[clamp(2.35rem,12vw,4.75rem)] md:text-7xl font-serif text-white leading-[1.05] mb-4">
                            {slides[currentSlide].title}
                            <br />
                            <span className="italic text-amber-500/90">{slides[currentSlide].highlight}</span>
                        </h2>
                    </motion.div>
                </AnimatePresence>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: prefersReducedMotion ? 0 : 0.2, duration: 0.35 }}
                    className="w-20 sm:w-24 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-7 mb-8 sm:mt-8 sm:mb-10"
                />

                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: prefersReducedMotion ? 0 : 0.28, duration: 0.35 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
                >
                    <a
                        href={ifoodUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full max-w-xs sm:w-auto sm:max-w-none flex items-center justify-center gap-2 px-7 py-3.5 sm:px-8 sm:py-4 bg-amber-500 text-black font-bold rounded-full transition-colors duration-200 hover:bg-amber-400 active:scale-95"
                    >
                        <ShoppingBag size={20} />
                        <span>Ver Cardápio</span>
                    </a>
                    <a
                        href="#sobre"
                        className="w-full max-w-xs sm:w-auto sm:max-w-none flex items-center justify-center gap-2 px-7 py-3.5 sm:px-8 sm:py-4 border-2 border-white/30 text-white font-medium rounded-full transition-colors duration-200 hover:border-amber-500 hover:text-amber-500"
                    >
                        <span>Conheça o Matsuri</span>
                    </a>
                </motion.div>
            </div>

            <button
                onClick={prevSlide}
                className="hidden sm:flex absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full bg-black/45 border border-white/10 items-center justify-center text-white/75 hover:text-white hover:bg-black/60 hover:border-amber-500/50 transition-colors duration-200"
                aria-label="Slide anterior"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={nextSlide}
                className="hidden sm:flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full bg-black/45 border border-white/10 items-center justify-center text-white/75 hover:text-white hover:bg-black/60 hover:border-amber-500/50 transition-colors duration-200"
                aria-label="Próximo slide"
            >
                <ChevronRight size={24} />
            </button>

            <div className="absolute bottom-20 sm:bottom-28 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-2 rounded-full transition-[width,background-color] duration-200 ${
                            currentSlide === index
                                ? 'w-8 bg-amber-500'
                                : 'w-2 bg-white/40 hover:bg-white/60'
                        }`}
                        aria-label={`Ir para slide ${index + 1}`}
                    />
                ))}
            </div>

            <motion.button
                onClick={scrollToContent}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.45, duration: 0.35 }}
                className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-2 text-white/60 hover:text-amber-500 transition-colors cursor-pointer group"
                aria-label="Rolar para conteúdo"
            >
                <span className="text-xs tracking-widest uppercase">Explorar</span>
                <motion.div
                    animate={prefersReducedMotion ? undefined : { y: [0, 6, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <ChevronDown size={24} className="group-hover:text-amber-500" />
                </motion.div>
            </motion.button>
        </section>
    );
}
