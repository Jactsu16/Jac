import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const HomePage = () => {
  const barsRef = useRef<NodeListOf<HTMLElement> | null>(null);

  useEffect(() => {
    // Animación de barras DISC
    const timer = setTimeout(() => {
      barsRef.current = document.querySelectorAll('.bar-fill');
      barsRef.current.forEach((bar) => {
        const width = bar.getAttribute('data-width');
        if (width) {
          (bar as HTMLElement).style.width = width + '%';
        }
      });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header Sticky */}
      <div className="sticky top-0 z-50 bg-white border-b border-primary-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <div>
            <h1 className="font-name text-2xl font-bold text-primary-700">Jamileth Jackelinne</h1>
            <p className="text-xs font-semibold text-primary-500">BUYER PERSONA</p>
          </div>
          <nav className="flex gap-6">
            <Link to="/portfolio" className="text-sm font-semibold text-primary-700 transition hover:opacity-70">
              PORTAFOLIO
            </Link>
            <Link to="/admin" className="text-sm font-semibold text-accent1-500 transition hover:opacity-70">
              PANEL
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-5 mb-5">
          {/* Perfil Card */}
          <div className="relative bg-white border border-primary-100 rounded-2xl p-6 transition-all hover:border-primary-300 hover:shadow-lg">
            <span className="inline-block mb-3 px-3 py-1 bg-primary-500 text-white text-xs font-bold rounded-md">
              PERFIL
            </span>
            
            <h2 className="font-name text-4xl leading-tight mb-1 text-primary-700">
              Jamileth<br/>Jackelinne
            </h2>
            <h3 className="font-name text-3xl leading-tight mb-4 text-primary-600">
              Guerra Aguilar
            </h3>
            
            <p className="text-sm font-semibold mb-6 text-primary-700">
              Estratega Publicitaria & AI Hybrid
            </p>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="p-2 bg-primary-50 rounded-lg">
                <p className="text-xs font-semibold text-primary-600 mb-0.5">CÉDULA</p>
                <p className="text-xs font-semibold text-primary-900">8-1008-914</p>
              </div>
              <div className="p-2 bg-primary-50 rounded-lg">
                <p className="text-xs font-semibold text-primary-600 mb-0.5">EDAD</p>
                <p className="text-xs font-semibold text-primary-900">21 años</p>
              </div>
              <div className="p-2 bg-primary-50 rounded-lg">
                <p className="text-xs font-semibold text-primary-600 mb-0.5">ESTADO</p>
                <p className="text-xs font-semibold text-primary-900">Soltera</p>
              </div>
              <div className="p-2 bg-primary-50 rounded-lg">
                <p className="text-xs font-semibold text-primary-600 mb-0.5">UBICACIÓN</p>
                <p className="text-xs font-semibold text-primary-900">Villa Daniela</p>
              </div>
            </div>

            {/* Contacto */}
            <div className="border-t border-primary-100 pt-3">
              <p className="text-xs font-semibold mb-2 text-primary-600">CONTACTO</p>
              <a href="tel:66043511" className="block text-xs font-semibold text-primary-600 hover:opacity-70 transition">
                6604-3511
              </a>
              <a href="tel:65300791" className="block text-xs font-semibold text-primary-600 hover:opacity-70 transition">
                6530-0791
              </a>
            </div>

            {/* Profile Image */}
            <div className="absolute right-5 top-5 w-40 hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop" 
                alt="Jamileth" 
                className="w-full h-auto rounded-xl object-cover"
              />
            </div>
          </div>

          {/* DISC Section */}
          <div className="bg-white border border-primary-100 rounded-2xl p-5 transition-all hover:border-primary-300 hover:shadow-lg">
            <p className="text-xs font-semibold mb-3 text-primary-600">PERFIL DISC</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs font-semibold mb-1 text-primary-700">Dominio</p>
                <div className="bg-primary-100 rounded-full overflow-hidden h-1">
                  <div className="bar-fill h-full bg-primary-600 rounded-full transition-all duration-1000" style={{width: '0%'}} data-width="32"></div>
                </div>
                <p className="text-xs mt-1 font-bold text-primary-600">32%</p>
              </div>
              <div>
                <p className="text-xs font-semibold mb-1 text-primary-700">Influencia</p>
                <div className="bg-primary-100 rounded-full overflow-hidden h-1">
                  <div className="bar-fill h-full bg-primary-600 rounded-full transition-all duration-1000" style={{width: '0%'}} data-width="25"></div>
                </div>
                <p className="text-xs mt-1 font-bold text-primary-600">25%</p>
              </div>
              <div>
                <p className="text-xs font-semibold mb-1 text-primary-700">Estabilidad</p>
                <div className="bg-primary-100 rounded-full overflow-hidden h-1">
                  <div className="bar-fill h-full bg-primary-600 rounded-full transition-all duration-1000" style={{width: '0%'}} data-width="20"></div>
                </div>
                <p className="text-xs mt-1 font-bold text-primary-600">20%</p>
              </div>
              <div>
                <p className="text-xs font-semibold mb-1 text-primary-700">Cumplimiento</p>
                <div className="bg-primary-100 rounded-full overflow-hidden h-1">
                  <div className="bar-fill h-full bg-primary-600 rounded-full transition-all duration-1000" style={{width: '0%'}} data-width="23"></div>
                </div>
                <p className="text-xs mt-1 font-bold text-primary-600">23%</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-primary-100">
              <p className="text-xs font-semibold mb-2 text-primary-600">INTERPRETACIÓN</p>
              <p className="text-xs leading-relaxed text-neutral-700">
                Perfil orientado a resultados con capacidad de liderazgo moderado. Balance entre acción directa y colaboración efectiva.
              </p>
            </div>
          </div>
        </div>

        {/* Competencias CFI */}
        <div className="bg-white border border-primary-100 rounded-2xl p-5 mb-5 transition-all hover:border-primary-300 hover:shadow-lg">
          <p className="text-xs font-semibold mb-4 text-primary-600">COMPETENCIAS CFI (Calificador de Factores de Interés)</p>
          <div className="space-y-3">
            {[
              { name: 'Análisis Estratégico', value: 85 },
              { name: 'Creatividad Digital', value: 92 },
              { name: 'Gestión de Proyectos', value: 78 },
              { name: 'Comunicación Persuasiva', value: 88 },
              { name: 'Adaptabilidad Tecnológica', value: 95 },
              { name: 'Trabajo en Equipo', value: 82 }
            ].map((comp) => (
              <div key={comp.name} className="flex justify-between items-center pb-2.5 border-b border-primary-100 last:border-b-0">
                <p className="text-sm font-semibold text-primary-700">{comp.name}</p>
                <span className="inline-block px-2.5 py-0.5 bg-primary-500 text-white text-xs font-bold rounded">
                  {comp.value}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Frase Personal */}
        <div className="bg-gradient-to-br from-primary-50 to-white border border-primary-100 rounded-2xl p-8 text-center transition-all hover:border-primary-300 hover:shadow-lg">
          <p className="font-quote text-xl text-primary-700 mb-3">
            "La creatividad sin estrategia es arte; la estrategia sin creatividad es aburrimiento."
          </p>
          <p className="text-xs font-semibold text-primary-600">— Jamileth Guerra</p>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
