import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, MessageCircle, Utensils } from 'lucide-react';
import { site, whatsappUrl, ifoodUrl } from '../config/site';

const OrderModalContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useOrderModal() {
    return useContext(OrderModalContext);
}

export function OrderModalProvider({ children }) {
    const [state, setState] = useState({ open: false, itemName: null });

    // itemName (opcional) pré-preenche a mensagem do WhatsApp com o prato escolhido
    const openOrder = useCallback((itemName = null) => {
        setState({ open: true, itemName });
    }, []);
    const close = useCallback(() => setState((s) => ({ ...s, open: false })), []);

    // Fecha com Esc e trava o scroll do body enquanto o modal está aberto
    useEffect(() => {
        if (!state.open) return;
        const onEsc = (e) => e.key === 'Escape' && close();
        document.addEventListener('keydown', onEsc);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onEsc);
            document.body.style.overflow = '';
        };
    }, [state.open, close]);

    const waHref = state.itemName
        ? `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
              `Olá! Gostaria de fazer um pedido para retirada: ${state.itemName}.`
          )}`
        : whatsappUrl;

    return (
        <OrderModalContext.Provider value={{ openOrder }}>
            {children}

            <AnimatePresence>
                {state.open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
                        onClick={close}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="order-modal-title"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 10 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-md bg-gradient-to-b from-neutral-900 to-black rounded-2xl border border-amber-500/30 shadow-[0_0_60px_rgba(245,158,11,0.2)] p-6 sm:p-8"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={close}
                                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white hover:bg-red-600 hover:border-red-600 transition-all duration-300"
                                aria-label="Fechar"
                            >
                                <X size={18} aria-hidden="true" />
                            </button>

                            <h2
                                id="order-modal-title"
                                className="text-lg sm:text-xl font-serif text-white text-center pr-6 mb-6"
                            >
                                Continuar pedido no iFood ou WhatsApp (Retirada)?
                            </h2>

                            <div className="flex flex-col gap-3">
                                {/* Verde — WhatsApp (Retirada) */}
                                <a
                                    href={waHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={close}
                                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#25D366] text-white font-bold transition-all duration-300 hover:bg-[#20BD5A] hover:shadow-[0_0_25px_rgba(37,211,102,0.4)]"
                                >
                                    <MessageCircle size={20} aria-hidden="true" />
                                    <span>WhatsApp (Retirada)</span>
                                </a>

                                {/* Vermelho — iFood */}
                                <a
                                    href={ifoodUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={close}
                                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#EA1D2C] text-white font-bold transition-all duration-300 hover:bg-[#C41622] hover:shadow-[0_0_25px_rgba(234,29,44,0.4)]"
                                >
                                    <Utensils size={20} aria-hidden="true" />
                                    <span>iFood</span>
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </OrderModalContext.Provider>
    );
}
