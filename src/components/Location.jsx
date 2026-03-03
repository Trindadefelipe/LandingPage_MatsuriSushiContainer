import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, MessageCircle, Navigation, Calendar } from 'lucide-react';

const scheduleData = [
    { day: 'Segunda a Quinta', hours: '18h - 22:30h', open: true },
    { day: 'Sexta e Sábado', hours: '18h - 23:00h', open: true },
    { day: 'Domingo', hours: 'Fechado', open: false },
];

const contactInfo = {
    address: 'Rua Prefeito Faria Lima, 1234',
    neighborhood: 'Park Container',
    city: 'Londrina - PR',
    cep: '86000-000',
    phone: '(43) 99999-9999',
    whatsapp: '5543999999999',
    mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=Rua+Prefeito+Faria+Lima+1234+Londrina+PR',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3625.7!2d-51.1696!3d-23.3045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDE4JzE2LjIiUyA1McKwMTAnMTAuNiJX!5e0!3m2!1spt-BR!2sbr!4v1'
};

export default function Location() {
    return (
        <section id="localizacao" className="py-24 bg-gradient-to-b from-black via-neutral-950 to-black relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
            <div className="absolute top-20 left-0 w-72 h-72 bg-red-600/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-amber-500 tracking-[0.3em] uppercase text-sm font-medium">Venha nos Visitar</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-white mt-4 mb-4">
                        Nossa Localização
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-red-600 via-amber-500 to-red-600 mx-auto rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Info side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        {/* Address card */}
                        <div className="bg-gradient-to-b from-neutral-900 to-black rounded-2xl border border-white/10 p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                                    <MapPin className="text-amber-500" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-serif text-white mb-2">Endereço</h3>
                                    <p className="text-white/80 font-medium">{contactInfo.address}</p>
                                    <p className="text-white/60">{contactInfo.neighborhood}</p>
                                    <p className="text-white/60">{contactInfo.city}</p>
                                    <p className="text-white/40 text-sm mt-1">CEP: {contactInfo.cep}</p>
                                </div>
                            </div>

                            {/* 8.5 - How to get there button */}
                            <a
                                href={contactInfo.mapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-amber-500/50 text-amber-500 font-medium transition-all duration-300 hover:bg-amber-500 hover:text-black hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                            >
                                <Navigation size={18} />
                                <span>Como Chegar</span>
                            </a>
                        </div>

                        {/* 8.2 - Schedule card */}
                        <div className="bg-gradient-to-b from-neutral-900 to-black rounded-2xl border border-white/10 p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                                    <Clock className="text-amber-500" size={24} />
                                </div>
                                <h3 className="text-xl font-serif text-white">Horário de Funcionamento</h3>
                            </div>

                            <div className="space-y-3">
                                {scheduleData.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
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

                        {/* Contact buttons */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* 8.3 - Clickable phone */}
                            <a
                                href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}
                                className="flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-b from-neutral-900 to-black border border-white/10 text-white transition-all duration-300 hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.1)] group"
                            >
                                <Phone size={20} className="text-amber-500 group-hover:scale-110 transition-transform" />
                                <span className="font-medium">{contactInfo.phone}</span>
                            </a>

                            {/* 8.4 - WhatsApp link */}
                            <a
                                href={`https://wa.me/${contactInfo.whatsapp}?text=Olá! Gostaria de fazer um pedido.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 py-4 rounded-xl bg-[#25D366] text-white font-medium transition-all duration-300 hover:bg-[#20BD5A] hover:shadow-[0_0_20px_rgba(37,211,102,0.3)]"
                            >
                                <MessageCircle size={20} />
                                <span>WhatsApp</span>
                            </a>
                        </div>
                    </motion.div>

                    {/* 8.1 - Map side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="h-full min-h-[400px] rounded-2xl overflow-hidden border border-white/10 relative">
                            {/* Map iframe with dark styling */}
                            <iframe
                                src={contactInfo.embedUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(90%)' }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Localização do Matsuri Container Sushi no Google Maps"
                                className="absolute inset-0"
                            />

                            {/* Gradient overlay for better integration */}
                            <div className="absolute inset-0 pointer-events-none border-4 border-black/20 rounded-2xl" />
                        </div>

                        {/* Map label */}
                        <div className="absolute top-4 left-4 z-10 px-4 py-2 bg-black/80 backdrop-blur-sm rounded-full border border-amber-500/30">
                            <p className="text-amber-500 text-sm font-medium flex items-center gap-2">
                                <MapPin size={14} />
                                Park Container Londrina
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
