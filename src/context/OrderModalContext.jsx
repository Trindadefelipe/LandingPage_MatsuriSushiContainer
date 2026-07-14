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

    const openOrder = useCallback((itemName = null) => {
        setState({ open: true, itemName });
    }, []);
    const close = useCallback(() => setState((s) => ({ ...s, open: false })), []);

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
                        transition={{ duration: 0.18 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 mobile-no-backdrop md:backdrop-blur-sm"
                        onClick={close}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="order-modal-title"
                    >
                        <motion.div
                            initial={{ scale: 0.96, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.96, opacity: 0, y: 10 }}
                            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="mobile-safe-modal mobile-no-shadow relative w-full max-w-md bg-gradient-to-b from-neutral-900 to-black rounded-xl md:rounded-2xl border border-amber-500/30 shadow-[0_0_36px_rgba(245,158,11,0.16)] p-6 sm:p-8"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={close}
                                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/55 border border-white/20 flex items-center justify-center text-white hover:bg-red-600 hover:border-red-600 transition-colors duration-200"
                                aria-label="Fechar"
                            >
                                <X size={18} aria-hidden="true" />
                            </button>

                            <h2
                                id="order-modal-title"
                                className="text-lg sm:text-xl font-serif text-white text-center pr-7 mb-6"
                            >
                                Continuar pedido no iFood ou WhatsApp (Retirada)?
                            </h2>

                            <div className="flex flex-col gap-3">
                                <a
                                    href={waHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={close}
                                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#25D366] text-white font-bold transition-colors duration-200 hover:bg-[#20BD5A]"
                                >
                                    <MessageCircle size={20} aria-hidden="true" />
                                    <span>WhatsApp (Retirada)</span>
                                </a>

                                <a
                                    href={ifoodUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={close}
                                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#EA1D2C] text-white font-bold transition-colors duration-200 hover:bg-[#C41622]"
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
