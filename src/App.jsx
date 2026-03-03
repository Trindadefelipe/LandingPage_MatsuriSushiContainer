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
    <div className="bg-black min-h-screen text-white font-sans selection:bg-red-600 selection:text-white">
      <Header />
      <main id="main-content">
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
  );
}

export default App;
