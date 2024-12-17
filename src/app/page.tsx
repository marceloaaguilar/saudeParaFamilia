import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Info from "./components/Info";
import Benefits from "./components/Benefits";
import CardPrices from "./components/CardPrices";
import Footer from "./components/Footer";

export default function Home() {
  
  return (
    <div className="bg-white">
      <Navbar/>
      <Header/>
      <Info/>
      <Benefits/>
      <CardPrices/>
      <Footer/>
    </div>
  );
}
