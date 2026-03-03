import { motion } from 'framer-motion';
import { Award, Leaf, Heart } from 'lucide-react';

const values = [
    {
        icon: Award,
        title: "Excelência",
        description: "Ingredientes premium selecionados diariamente"
    },
    {
        icon: Leaf,
        title: "Frescor",
        description: "Peixes frescos e vegetais orgânicos"
    },
    {
        icon: Heart,
        title: "Paixão",
        description: "Cada prato feito com dedicação artesanal"
    }
];

export default function About() {
    return (
        <section id="sobre" className="relative overflow-hidden">
            {/* 3.9 - Gradient divider top */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

            {/* 3.10 - Light section background */}
            <div className="py-24 bg-gradient-to-b from-amber-50 via-white to-amber-50 relative">
                {/* 3.12 - Subtle texture */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        {/* Logo side */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="w-full lg:w-1/2"
                        >
                            <div className="relative">
                                {/* Decorative frame */}
                                <div className="absolute -inset-4 border-2 border-amber-500/30 rounded-lg" />
                                <div className="absolute -inset-8 border border-amber-500/10 rounded-lg" />

                                <div className="bg-black p-8 rounded-lg shadow-2xl relative">
                                    <img
                                        src="/img/logo-white.jpg"
                                        alt="Logo Matsuri Container Sushi - Restaurante Japonês Premium em Londrina"
                                        className="w-full max-w-md mx-auto"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Content side */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="w-full lg:w-1/2"
                        >
                            <span className="text-amber-600 tracking-[0.3em] uppercase text-sm font-medium">
                                Nossa História
                            </span>
                            <h2 className="text-4xl md:text-5xl font-serif text-black mt-4 mb-6">
                                Tradição & <span className="text-red-600">Modernidade</span>
                            </h2>

                            {/* 7.3 - Improved text contrast */}
                            <p className="text-neutral-700 leading-relaxed mb-6 text-lg">
                                No <strong className="text-black">Matsuri Container Sushi</strong>, unimos a milenar arte da culinária japonesa com a conveniência e o estilo da vida moderna.
                            </p>
                            <p className="text-neutral-600 leading-relaxed mb-8">
                                Cada prato é uma obra de arte, preparada com ingredientes selecionados e um respeito profundo pela técnica. Experimente o sabor autêntico em um ambiente sofisticado, projetado para elevar seus sentidos.
                            </p>

                            {/* 7.2 - Stats/Values */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {values.map((value, index) => (
                                    <motion.div
                                        key={value.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                        className="text-center"
                                    >
                                        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-amber-500/10 flex items-center justify-center">
                                            <value.icon className="text-amber-600" size={24} />
                                        </div>
                                        <h4 className="font-serif text-black font-semibold mb-1">
                                            {value.title}
                                        </h4>
                                        <p className="text-neutral-500 text-sm">
                                            {value.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* 3.9 - Gradient divider bottom */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
        </section>
    );
}
