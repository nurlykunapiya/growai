import Planner from "./Planner.tsx";
import "./App.css"; // вот это добавь

export default function App() {
  return (
    <div>
      {/* Первый блок: Intro */}
      <section className="container">
        <h1 className="titlegrow">GrowAI</h1>
        <p className="slogan">GROW UP! ONLY UP!</p>
        
      </section>

      {/* Второй блок: Planner */}
      <section id="planner" className="planner-section">
        <Planner />
      </section>
    </div>
  );
}