import { Routes, Route } from "react-router-dom";
import Hero from "./ui/Hero.jsx";
import Navbar from "./ui/Navbar";
import Footer from "./ui/Footer";
import WorkingSection from "./ui/Working";
import Imaging from "./ui/Imaging";
import ChatUI from "./ui/Chat";

function App() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden text-white">
      {/* Crimson Depth Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(125% 125% at 50% 10%, #000000 60%, #1f1f1f 100%)",
        }}
      />

      {/* Main Content Layer */}
      <div className="relative z-10">
        
        <Routes>
          <Route
            path="/"
            element={
              <>
              <Navbar />
                <Hero />
                <WorkingSection />
                <div className="mt-10">
                  <Imaging />
                </div>
                
              </>
            }
          />
          <Route path="/chat" element={<ChatUI />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
