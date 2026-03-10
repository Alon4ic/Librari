import Tooltip from "./components/Badge1";
import Badges from './components/Badges'
import Banners from './components/Banners';
import Cards from "./components/Cards";
import Check from './components/Check';
import Footer from './components/Footer';
import Testimonials from "./components/Testimonials";
import Toasts from './components/Toasts';
import Tooltips from "./components/Tooltips";

export default function App() {
  

  return (
    <>
      <div className="container">
        <h1 className="title">React Component Library</h1>
        <Badges />
        <Check />
        <Banners />
        <Cards />
        <Testimonials />
        <Tooltips />
        <Toasts />
      </div>
      <Footer />
    </>
  );
}

