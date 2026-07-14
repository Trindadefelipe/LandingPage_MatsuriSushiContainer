import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, MessageCircle, Navigation, Calendar } from 'lucide-react';
import { site, whatsappUrl, telUrl, mapsDirectionsUrl, mapEmbedUrl } from '../config/site';

const scheduleData = [
    { day: 'Segunda a Quinta', hours: '18h - 22:30h', open: true },
    { day: 'Sexta e Sábado', hours: '18h - 23:00h', open: true },
    { day: 'Domingo', hours: 'Fechado', open: false },
];

const contactInfo = {
    address: site.address.street,
    neighborhood: site.address.neighborhood,
    city: site.address.city,
    cep: site.address.cep,
    phone: site.phoneDisplay,
    mapUrl: mapsDirectionsUrl,
    embedUrl: mapEmbedUrl,
};

const revealViewport = { once: true, amount: 0.18 };
const revealTransition = { duration: 0.38, ease: [0.22, 1, 0.36, 1] };

export default function Location() {
    return (
        <section id="localizacao" className="content-section py-16 md:py-24 bg-gradient-to-b from-black via-neutral-950 to-black relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
            <div className="mobile-hide-glow absolute top-20 left-0 w-72 h-72 bg-red-600/5 rounded-full blur-3xl" />
            <div className="mobile-hide-glow absolute bottom-20 right-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={revealViewport}
                    transition={revealTransition}
                    className="text-center mb-10 md:mb-16"
                >
                    <span className="text-amber-500 tracking-[0.18em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm font-medium">Venha nos Visitar</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mt-4 mb-4">
                        Nossa Localização
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-red-600 via-amber-500 to-red-600 mx-auto rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={revealViewport}
                        transition={revealTransition}
                        className="space-y-6 md:space-y-8"
                    >
                        <div className="perf-card bg-gradient-to-b from-neutral-900 to-black rounded-xl border border-white/10 p-5 sm:p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                                    <MapPin className="text-amber-500" size={24} />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-xl font-serif text-white mb-2">Endereço</h3>
                                    <p className="text-white/80 font-medium break-words">{contactInfo.address}</p>
                                    <p className="text-white/60">{contactInfo.neighborhood}</p>
                                    <p className="text-white/60">{contactInfo.city}</p>
                                    <p className="text-white/40 text-sm mt-1">CEP: {contactInfo.cep}</p>
                                </div>
                            </div>

                            <a
                                href={contactInfo.mapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-amber-500/50 text-amber-500 font-medium transition-colors duration-200 hover:bg-amber-500 hover:text-black"
                            >
                                <Navigation size={18} />
                                <span>Como Chegar</span>
                            </a>
                        </div>

                        <div className="perf-card bg-gradient-to-b from-neutral-900 to-black rounded-xl border border-white/10 p-5 sm:p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                                    <Clock className="text-amber-500" size={24} />
                                </div>
                                <h3 className="text-xl font-serif text-white">Horário de Funcionamento</h3>
                            </div>

                            <div className="space-y-3">
                                {scheduleData.map((item) => (
                                    <div
                                        key={item.day}
                                        className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between py-2 border-b border-white/5 last:border-0"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} className="text-white/40" />
                                            <span className="text-white/80">{item.day}</span>
                                        </div>
                                        <span className={`font-medium ${item.open ? 'text-amber-500' : 'text-red-500'}`}>
                                            {item.hours}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <a
                                href={telUrl}
                                className="flex items-center justify-center gap-2 py-3.5 sm:py-4 px-3 rounded-xl bg-gradient-to-b from-neutral-900 to-black border border-white/10 text-white transition-colors duration-200 hover:border-amber-500/50 group"
                            >
                                <Phone size={20} className="text-amber-500 transition-transform duration-200 md:group-hover:scale-105" />
                                <span className="font-medium text-sm sm:text-base">{contactInfo.phone}</span>
                            </a>

                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 py-3.5 sm:py-4 px-3 rounded-xl bg-[#25D366] text-white font-medium transition-colors duration-200 hover:bg-[#20BD5A]"
                            >
                                <MessageCircle size={20} />
                                <span>WhatsApp</span>
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={revealViewport}
                        transition={{ ...revealTransition, delay: 0.06 }}
                        className="relative"
                    >
                        <div className="h-[320px] sm:h-[380px] lg:h-full lg:min-h-[420px] rounded-xl overflow-hidden border border-white/10 relative bg-neutral-900">
                            <iframe
                                src={contactInfo.embedUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Localização do Matsuri Container Sushi no Google Maps"
                                className="absolute inset-0"
                            />

                            <div className="absolute inset-0 pointer-events-none border-4 border-black/20 rounded-xl" />
                        </div>

                        <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-auto z-10 px-3 sm:px-4 py-2 bg-black/80 mobile-no-backdrop md:backdrop-blur-sm rounded-full border border-amber-500/30 w-fit max-w-[calc(100%-1.5rem)]">
                            <p className="text-amber-500 text-xs sm:text-sm font-medium flex items-center gap-2">
                                <MapPin size={14} />
                                <span className="truncate">{contactInfo.neighborhood} - Londrina</span>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
