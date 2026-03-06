import { Canvas } from '@react-three/fiber'
import { Loader } from '@react-three/drei'
import { Suspense, useState } from 'react'
import Scene from './components/Scene'
import Overlay from './components/Overlay'

const PROJECTS = [
  { id: 1, name: "La Paté", description: "Sitio web elegante con CMS para pastelería", color: "#ec4899", image: "/lapate.png", url: "https://lapate.vercel.app", type: "App con CMS", challenge: "Menú desactualizado y clientes perdidos por procesos manuales complejos.", solution: "Plataforma E-Commerce rápida con integración directa a WhatsApp y CMS a la medida.", tech: ["React", "Sanity CMS", "Tailwind"] },
  { id: 2, name: "Canto de Sol", description: "Experiencia premium para restaurante", color: "#f59e0b", image: "/cantosol.png", url: "https://canto-de-sol.vercel.app", type: "Concepto Premium", challenge: "Falta de una experiencia digital que reflejara la exclusividad del restaurante.", solution: "Diseño inmersivo de alta gama enfocado en destacar la atmósfera y el menú.", tech: ["React", "Framer Motion", "Vite"] },
  { id: 3, name: "Las Quesudas", description: "Sistema de pedidos con carrito integrado", color: "#eab308", image: "/quesudas.png", url: "https://lasquesudasdealeja.vercel.app", type: "E-Commerce", challenge: "Caos operativo gestionando pedidos desordenados a través del chat.", solution: "Sistema de carrito inteligente que automatiza y estructura pedidos por WhatsApp.", tech: ["React", "Context API", "CSS"] },
  { id: 4, name: "Terapia Serena", description: "Diseño calmante con superposiciones inmersivas", color: "#3b82f6", image: "/terapia.png", url: "https://terapia-serena.vercel.app", type: "UX/UI Clínico", challenge: "Páginas de servicios psicológicos frías y poco empáticas con el usuario.", solution: "Interfaz relajante, accesible y fluida diseñada para brindar calma y confianza.", tech: ["Frontend", "UX Design", "WebGL"] },
  { id: 5, name: "Planes y Servicios", description: "Soluciones de diseño a la medida", color: "#fbbf24", isPricing: true, type: "Catálogo Exclusivo" },
]

function App() {
  const [active, setActive] = useState(null)

  return (
    <>
      <Overlay />
      <div className="w-screen h-screen fixed inset-0 z-0 bg-[#050511]">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <color attach="background" args={['#050511']} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1.5} />
          <Suspense fallback={null}>
            <Scene active={active} setActive={setActive} projects={PROJECTS} />
          </Suspense>
        </Canvas>
        <Loader
          containerStyles={{ background: '#050511', zIndex: 100000 }}
          dataInterpolation={(p) => `Preparando experiencia inmersiva... ${Math.round(p)}%`}
          innerStyles={{ width: '250px', background: 'rgba(255,255,255,0.1)', height: '4px', borderRadius: '4px' }}
          barStyles={{ background: '#ffffff', height: '4px', borderRadius: '4px' }}
          dataStyles={{ color: '#a1a1aa', fontSize: '12px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '16px' }}
        />
      </div>

      {/* Floating Responsive Modal UI (Rendered purely in React DOM, outside WebGL) */}
      {active !== null && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4 md:p-8 pointer-events-none"
          style={{ zIndex: 99999 }}
        >
          {/* Blur Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md pointer-events-auto"
            onClick={() => setActive(null)}
          />

          {/* Responsive Card Container */}
          <div className="relative w-full max-w-6xl h-full max-h-[85vh] bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col border border-white/20">
            {/* Header Bar */}
            <div className="bg-neutral-800 p-3 px-5 flex justify-between items-center z-10 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" style={{ backgroundColor: PROJECTS.find(p => p.id === active)?.color }}></div>
                <h3 className="text-white font-semibold tracking-wide flex items-center gap-3">
                  {PROJECTS.find(p => p.id === active)?.name}
                  <span className="hidden md:inline-block text-[10px] font-bold uppercase tracking-wider border border-white/20 bg-white/5 px-2 py-0.5 rounded-full text-white/70">
                    {PROJECTS.find(p => p.id === active)?.type}
                  </span>
                </h3>
              </div>
              <button
                onClick={() => setActive(null)}
                className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-full transition-colors text-sm flex items-center gap-2 font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                <span className="hidden sm:inline">Cerrar Experiencia</span>
              </button>
            </div>

            {/* Content Area */}
            {PROJECTS.find(p => p.id === active)?.isPricing ? (
              <div className="flex-1 w-full bg-neutral-900 border-t border-white/5 p-6 md:p-10 overflow-y-auto">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pt-4 md:pt-8">

                  {/* Basic Plan */}
                  <div className="bg-neutral-800 rounded-2xl p-6 border border-white/10 flex flex-col hover:border-white/30 transition-colors">
                    <h4 className="text-white text-xl font-bold">Plan Presencia</h4>
                    <p className="text-white/60 text-sm mt-2 mb-6">Ideal para marcas personales y negocios locales que necesitan existir online.</p>
                    <div className="text-3xl font-bold text-white mb-8">Básico</div>
                    <ul className="text-sm text-white/80 space-y-4 mb-8 flex-1">
                      <li className="flex items-center gap-3"><svg className="w-5 h-5 text-green-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Landing Page (1 página)</li>
                      <li className="flex items-center gap-3"><svg className="w-5 h-5 text-green-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Botón WhatsApp integrado</li>
                      <li className="flex items-center gap-3"><svg className="w-5 h-5 text-green-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Diseño responsivo rápido</li>
                    </ul>
                    <a href="https://wa.me/573116445034" target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-white/10 hover:bg-white/20 text-center text-white rounded-xl font-medium transition-colors">Solicitar Plan Básico</a>
                  </div>

                  {/* Advanced Plan */}
                  <div className="bg-gradient-to-b from-neutral-800 to-neutral-800/50 rounded-2xl p-6 border-2 border-amber-500/50 relative flex flex-col transform md:-translate-y-6 shadow-[0_0_30px_rgba(245,158,11,0.15)]">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Más Popular</div>
                    <h4 className="text-white text-xl font-bold mt-2">Plan E-Commerce</h4>
                    <p className="text-white/60 text-sm mt-2 mb-6">Vende online con un sistema escalable y altamente persuasivo.</p>
                    <div className="text-3xl font-bold text-amber-400 mb-8">Avanzado</div>
                    <ul className="text-sm text-white/80 space-y-4 mb-8 flex-1">
                      <li className="flex items-center gap-3"><svg className="w-5 h-5 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Tienda completa / Menú interactivo</li>
                      <li className="flex items-center gap-3"><svg className="w-5 h-5 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Carrito de compras a WhatsApp</li>
                      <li className="flex items-center gap-3"><svg className="w-5 h-5 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Panel autogestionable (CMS Sanity)</li>
                    </ul>
                    <a href="https://wa.me/573116445034" target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black text-center rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(245,158,11,0.4)] hover:shadow-[0_0_25px_rgba(245,158,11,0.6)]">Solicitar E-Commerce</a>
                  </div>

                  {/* Premium Plan */}
                  <div className="bg-neutral-800 rounded-2xl p-6 border border-white/10 flex flex-col hover:border-white/30 transition-colors">
                    <h4 className="text-white text-xl font-bold">Experiencia 3D</h4>
                    <p className="text-white/60 text-sm mt-2 mb-6">Deslumbra a tus inversores o clientes con WebGL inmersivo.</p>
                    <div className="text-3xl font-bold text-fuchsia-400 mb-8">Premium</div>
                    <ul className="text-sm text-white/80 space-y-4 mb-8 flex-1">
                      <li className="flex items-center gap-3"><svg className="w-5 h-5 text-fuchsia-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Todo lo del plan Avanzado</li>
                      <li className="flex items-center gap-3"><svg className="w-5 h-5 text-fuchsia-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Gráficos y modelos 3D interactivos</li>
                      <li className="flex items-center gap-3"><svg className="w-5 h-5 text-fuchsia-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Factor "Wow" garantizado</li>
                    </ul>
                    <a href="https://wa.me/573116445034" target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-white/10 hover:bg-white/20 text-center text-white rounded-xl font-medium transition-colors">Solicitar Premium 3D</a>
                  </div>

                </div>
              </div>
            ) : (
              <div className="flex-1 w-full flex flex-col md:flex-row relative bg-neutral-900 border-t border-white/5">

                {/* Iframe Workspace (Left side) */}
                <div className="flex-1 relative bg-white flex items-center justify-center border-b md:border-b-0 md:border-r border-white/10 h-[50vh] md:h-auto">
                  <div className="absolute flex flex-col items-center gap-4 opacity-50 bg-neutral-900 p-8 rounded-xl z-0">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                    <p className="text-white text-sm">Cargando...</p>
                  </div>
                  <iframe
                    src={PROJECTS.find(p => p.id === active)?.url}
                    className="absolute inset-0 w-full h-full border-none z-10"
                    title={PROJECTS.find(p => p.id === active)?.name}
                  />
                </div>

                {/* Sales Panel (Right side) */}
                <div className="w-full md:w-80 lg:w-96 bg-neutral-800/80 p-6 md:p-8 flex flex-col gap-8 overflow-y-auto">

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                      <h4 className="text-white/60 text-xs font-bold uppercase tracking-widest">El Problema</h4>
                    </div>
                    <p className="text-white/90 text-sm leading-relaxed">{PROJECTS.find(p => p.id === active)?.challenge}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      <h4 className="text-white/60 text-xs font-bold uppercase tracking-widest">La Solución</h4>
                    </div>
                    <p className="text-white/90 text-sm leading-relaxed">{PROJECTS.find(p => p.id === active)?.solution}</p>
                  </div>

                  <div className="mt-auto pt-6 border-t border-white/10">
                    <h4 className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-3">Tecnologías Clave</h4>
                    <div className="flex flex-wrap gap-2">
                      {PROJECTS.find(p => p.id === active)?.tech.map((t, i) => (
                        <span key={i} className="text-xs font-medium bg-black/40 border border-white/5 text-white/80 px-3 py-1.5 rounded-md hover:bg-white/10 transition-colors cursor-default">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating CTA Buttons */}
      {active === null && (
        <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[50] flex flex-col gap-4">

          {/* Email Button */}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=Fb125050@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex justify-end"
          >
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
            <div className="relative bg-gradient-to-tr from-blue-600 to-blue-400 hover:scale-110 transition-transform duration-300 text-white p-3 md:p-4 rounded-full shadow-2xl shadow-blue-900/50 flex items-center justify-center">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            {/* Tooltip */}
            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-neutral-900/90 text-white px-3 py-1.5 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none backdrop-blur-sm border border-white/10">
              Enviar Correo
            </span>
          </a>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/573116445034"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex justify-end"
          >
            <div className="absolute inset-0 bg-green-400 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
            <div className="relative bg-gradient-to-tr from-green-500 to-green-400 hover:scale-110 transition-transform duration-300 text-white p-3 md:p-4 rounded-full shadow-2xl shadow-green-900/50 flex items-center gap-3">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 0 5.384 0 12.031c0 2.124.553 4.19 1.603 6.01L.005 24l6.113-1.605A11.967 11.967 0 0012.031 24c6.646 0 12.03-5.384 12.03-12.03S18.677 0 12.031 0zm3.876 17.203c-.266.75-1.527 1.455-2.115 1.5-1.472.117-3.414-.62-6.526-3.732-3.21-3.212-3.92-5.234-3.79-6.666.082-.87 1.053-1.674 1.41-1.674.22 0 .445.023.635.045.318.037.49.096.7.625.264.664.838 2.053.916 2.213.195.4-.103.732-.387 1.056-.232.26-.432.427-.645.703-.223.275-.461.57-.197.986.262.422 1.155 1.889 2.482 3.078 1.705 1.528 3.084 1.944 3.486 2.115.4.172.846.126 1.137-.179.352-.37.985-1.127 1.258-1.52.274-.393.578-.328.984-.176.406.155 2.508 1.182 2.937 1.393.432.211.72.336.825.52.105.183.105 1.066-.16 1.816z" /></svg>
              <span className="font-semibold hidden md:block whitespace-nowrap pr-2">Cotizar Proyecto</span>
            </div>
            {/* Mobile Tooltip */}
            <span className="md:hidden absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-neutral-900/90 text-white px-3 py-1.5 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none backdrop-blur-sm border border-white/10">
              Escribir por WhatsApp
            </span>
          </a>
        </div>
      )}
    </>
  )
}

export default App
