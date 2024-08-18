import Navbar from "./components/Navbar";
import Simulador from "./components/Simulador";

export default function Home() {
  return (
    <div className="bg-white">
      <Navbar/>
      <Simulador/>
    </div>
  );
}
