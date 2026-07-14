import { MotionConfig } from 'framer-motion';
import { OrderModalProvider } from './context/OrderModalContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Menu from './components/Menu';
import Combos from './components/Combos';
import About from './components/About';
import Location from './components/Location';
import Footer from './components/Footer';
import FAB from './components/FAB';

function App() {
  return (
    // reducedMotion="user" faz todas as animações de transform/layout do framer-motion
    // respeitarem prefers-reduced-motion automaticamente (complementa o @media do index.css).
    <MotionConfig reducedMotion="user">
      {/* Disponibiliza o pop-up de escolha do canal de pedido (WhatsApp/iFood) para toda a página. */}
      <OrderModalProvider>
        <div className="bg-black min-h-screen text-white font-sans selection:bg-red-600 selection:text-white">
          <Header />
          <main id="main-content">
            {/* H1 único e rastreável da página (não altera o layout visual; o hero segue com H2). */}
            <h1 className="sr-only">
              Matsuri Container Sushi — sushi premium em Londrina com delivery e retirada pelo WhatsApp e iFood
            </h1>
            <Hero />
            <Highlights />
            <Menu />
            <Combos />
            <About />
            <Location />
          </main>
          <Footer />
          <FAB />
        </div>
      </OrderModalProvider>
    </MotionConfig>
  );
}

export default App;
