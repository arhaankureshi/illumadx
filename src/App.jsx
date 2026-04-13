import { useState, useEffect, useRef } from 'react'

function useInView(threshold = 0.12) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, inView]
}

function FadeUp({ children, delay = 0 }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0px)' : 'translateY(36px)',
      transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`
    }}>
      {children}
    </div>
  )
}

const translations = {
  en: {
    live: 'LIVE CLINICAL AI SYSTEM',
    tagline: 'BECAUSE DIAGNOSIS STARTS WITH CLARITY',
    desc: '40 trained deep learning models · GradCAM++ interpretability · Statistical validation across 4 augmentation strategies',
    upload: 'UPLOAD MRI',
    research: 'View Research',
    thesis: 'THE THESIS',
    finding: 'THE FINDING',
    features: 'WHAT ILLUMADX DOES',
    hawkingLine1: '"The greatest enemy of knowledge is not ignorance',
    hawkingLine2: 'it is the illusion of knowledge."',
    quote: '"Accuracy measures outcomes. GradCAM++ measures reasoning. A model that looks at the wrong region will fail silently the moment it sees a scan from a different hospital."',
    featuresTitle: 'A complete clinical AI platform',
    featuresDesc: 'Not just a model. A deployable diagnostic system built for real clinical environments.',
  },
  fr: {
    live: 'SYSTÈME IA CLINIQUE EN DIRECT',
    tagline: 'PARCE QUE LE DIAGNOSTIC COMMENCE PAR LA CLARTÉ',
    desc: '40 modèles d\'apprentissage profond · Interprétabilité GradCAM++ · Validation statistique sur 4 stratégies',
    upload: 'TÉLÉCHARGER IRM',
    research: 'Voir la Recherche',
    thesis: 'LA THÈSE',
    finding: 'LA DÉCOUVERTE',
    features: 'CE QUE FAIT ILLUMADX',
    hawkingLine1: '"Le plus grand ennemi de la connaissance n\'est pas l\'ignorance',
    hawkingLine2: 'c\'est l\'illusion de la connaissance."',
    quote: '"La précision mesure les résultats. GradCAM++ mesure le raisonnement. Un modèle qui regarde la mauvaise région échouera silencieusement."',
    featuresTitle: 'Une plateforme IA clinique complète',
    featuresDesc: 'Pas seulement un modèle. Un système diagnostique déployable conçu pour les environnements cliniques.',
  }
}

const navItems = [
  {
    label: 'System',
    labelFr: 'Système',
    desc: 'Live AI Demo',
    color: '#00B4D8',
    bg: 'rgba(0,180,216,0.1)',
    border: 'rgba(0,180,216,0.35)',
    icon: '⚡'
  },
  {
    label: 'Patient Records',
    labelFr: 'Dossiers Patients',
    desc: 'EHR / Connect Care',
    color: '#10B981',
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.25)',
    icon: '🗂'
  },
  {
    label: 'PDF Report',
    labelFr: 'Rapport PDF',
    desc: 'Diagnostic Export',
    color: '#FFB703',
    bg: 'rgba(255,183,3,0.08)',
    border: 'rgba(255,183,3,0.25)',
    icon: '📄'
  },
  {
    label: 'Research',
    labelFr: 'Recherche',
    desc: 'Findings & Stats',
    color: 'rgba(255,255,255,0.7)',
    bg: 'rgba(255,255,255,0.04)',
    border: 'rgba(255,255,255,0.1)',
    icon: '📊'
  },
  {
    label: 'Ethics',
    labelFr: 'Éthique',
    desc: 'Health Canada',
    color: 'rgba(255,255,255,0.7)',
    bg: 'rgba(255,255,255,0.04)',
    border: 'rgba(255,255,255,0.1)',
    icon: '⚖'
  },
]

const features = [
  { icon: '⬆', title: 'Live MRI Upload', titleFr: 'Téléchargement IRM', desc: 'Upload any brain MRI scan. IllumaDx runs real-time inference across all 4 trained model groups instantly.', descFr: 'Téléchargez n\'importe quelle IRM cérébrale pour une inférence en temps réel.', color: '#00B4D8', tag: 'REAL-TIME' },
  { icon: '🧠', title: 'GradCAM++ Heatmaps', titleFr: 'Cartes GradCAM++', desc: 'See exactly what the AI is looking at. All 4 group heatmaps side-by-side + consensus overlay.', descFr: 'Voyez exactement ce que l\'IA regarde. 4 cartes de chaleur côte à côte.', color: '#10B981', tag: 'INTERPRETABILITY' },
  { icon: '📄', title: 'Diagnostic PDF Export', titleFr: 'Export PDF Diagnostique', desc: 'Auto-generated clinical report with prediction, heatmap, benchmark stats, and clinical disclaimer. Print-ready.', descFr: 'Rapport clinique auto-généré avec prédiction, carte de chaleur et statistiques.', color: '#FFB703', tag: 'CLINICAL' },
  { icon: '🗂', title: 'EHR Integration', titleFr: 'Intégration DSE', desc: 'Mock Connect Care–style patient profiles. Enter a patient ID, run the AI, save the diagnostic PDF to their record.', descFr: 'Profils patients style Connect Care. Entrez un ID patient, lancez l\'IA.', color: '#00B4D8', tag: 'PATIENT RECORDS' },
  { icon: '🛡', title: 'Confidence Gate', titleFr: 'Seuil de Confiance', desc: 'If model confidence falls below 60%, IllumaDx flags the scan as invalid rather than guessing.', descFr: 'Si la confiance tombe sous 60%, IllumaDx signale le scan comme invalide.', color: '#E63946', tag: 'SAFETY' },
  { icon: '⚖', title: 'Ethics & Compliance', titleFr: 'Éthique et Conformité', desc: 'Health Canada regulatory pathway, AI bias analysis, data privacy framework, and clinical limitations.', descFr: 'Voie réglementaire Santé Canada, analyse des biais IA, cadre de confidentialité.', color: '#FFB703', tag: 'REGULATORY' },
]

export default function App() {
  const [scrollY, setScrollY] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [hoveredStat, setHoveredStat] = useState(null)
  const [hoveredFeature, setHoveredFeature] = useState(null)
  const [hoveredNav, setHoveredNav] = useState(null)
  const [lang, setLang] = useState('en')

  const t = translations[lang]

  useEffect(() => { const timer = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(timer) }, [])
  useEffect(() => {
    const fn = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  useEffect(() => {
    const fn = (e) => { setMouseX((e.clientX / window.innerWidth - 0.5) * 30); setMouseY((e.clientY / window.innerHeight - 0.5) * 30) }
    window.addEventListener('mousemove', fn, { passive: true })
    return () => window.removeEventListener('mousemove', fn)
  }, [])

  const stats = [
    { value: '99.69%', label: 'Peak Accuracy', color: '#10B981' },
    { value: '33×', label: 'Loss Gap Detected', color: '#E63946' },
    { value: '40', label: 'Models Trained', color: '#00B4D8' },
    { value: '300K+', label: 'Patients Underserved Globally', color: '#FFB703' },
  ]

  const groups = [
    { group: 'A', label: 'No Augmentation', acc: '99.48%', ece: '0.0041', loss: '~0.025', color: '#00B4D8', desc: 'Control — baseline performance' },
    { group: 'B', label: 'Basic Augmentation', acc: '99.69%', ece: '0.0030', loss: '~0.003', color: '#10B981', desc: 'Flip, rotation 15°, brightness jitter', badge: '✓ WINNER' },
    { group: 'C', label: 'Extreme Augmentation', acc: '98.66%', ece: '0.0082', loss: '~0.100', color: '#E63946', desc: 'Illusion of knowledge — looks fine, fails silently', badge: '✗ DANGER' },
    { group: 'D', label: 'Domain-Specific', acc: '99.68%', ece: '0.0030', loss: '~0.050', color: '#FFB703', desc: 'Expected winner — hypothesis rejected' },
  ]

  return (
    <div style={{ background: '#05080F', minHeight: '100vh', overflowX: 'hidden', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Bebas+Neue&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes ripple { 0% { box-shadow: 0 0 0 0 rgba(16,185,129,0.5); } 70% { box-shadow: 0 0 0 14px rgba(16,185,129,0); } 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); } }
        @keyframes scrollline { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.7; } }
        @keyframes subtleGlow { 0%, 100% { text-shadow: 0 0 60px rgba(230,57,70,0.2); } 50% { text-shadow: 0 0 100px rgba(230,57,70,0.5); } }
        @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .nav-btn:hover .nav-desc { opacity: 1 !important; }
      `}</style>

      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', backgroundImage: `linear-gradient(rgba(0,180,216,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,216,0.025) 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', background: `radial-gradient(800px circle at ${50 + mouseX * 0.4}% ${50 + mouseY * 0.4}%, rgba(0,180,216,0.065), transparent 60%)` }} />

      {/* ── NAV ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 32px', height: '60px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: scrollY > 60 ? 'rgba(5,8,15,0.94)' : 'rgba(5,8,15,0.6)',
        backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        transition: 'background 0.4s ease',
        opacity: loaded ? 1 : 0,
        animation: loaded ? 'fadeSlideIn 0.8s ease 0.2s both' : 'none',
      }}>
        {/* Logo */}
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '24px', letterSpacing: '2px', color: '#fff', cursor: 'pointer', flexShrink: 0 }}>
          IllumaDx
        </div>

        {/* Nav buttons — each with purpose */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {navItems.map((item, i) => (
            <div key={item.label} className="nav-btn"
              onMouseEnter={() => setHoveredNav(i)}
              onMouseLeave={() => setHoveredNav(null)}
              style={{ position: 'relative', cursor: 'pointer' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '6px 12px',
                background: hoveredNav === i ? item.bg : 'transparent',
                border: `1px solid ${hoveredNav === i ? item.border : 'transparent'}`,
                borderRadius: '5px',
                transition: 'all 0.2s ease',
              }}>
                <span style={{ fontSize: '12px' }}>{item.icon}</span>
                <span style={{
                  fontSize: '12px', fontWeight: '600',
                  color: hoveredNav === i ? item.color : 'rgba(255,255,255,0.45)',
                  transition: 'color 0.2s', whiteSpace: 'nowrap'
                }}>
                  {lang === 'fr' ? item.labelFr : item.label}
                </span>
              </div>
              {/* Tooltip on hover */}
              <div className="nav-desc" style={{
                position: 'absolute', top: '110%', left: '50%', transform: 'translateX(-50%)',
                background: 'rgba(10,22,40,0.98)', border: `1px solid ${item.border}`,
                borderRadius: '4px', padding: '5px 10px', whiteSpace: 'nowrap',
                fontSize: '10px', color: item.color, letterSpacing: '0.5px',
                opacity: 0, transition: 'opacity 0.2s', pointerEvents: 'none',
                backdropFilter: 'blur(12px)', zIndex: 200
              }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Upload CTA */}
        <button style={{
          padding: '7px 16px', background: '#00B4D8', color: '#05080F',
          border: 'none', borderRadius: '3px', fontSize: '11px', fontWeight: '800',
          cursor: 'pointer', letterSpacing: '1px', transition: 'all 0.2s',
          boxShadow: '0 0 20px rgba(0,180,216,0.2)', fontFamily: 'inherit', flexShrink: 0
        }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 40px rgba(0,180,216,0.5)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 20px rgba(0,180,216,0.2)'; e.currentTarget.style.transform = 'translateY(0)' }}>
          {t.upload}
        </button>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '80px 24px 40px', position: 'relative', zIndex: 1 }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px', animation: loaded ? 'fadeSlideIn 0.8s ease 0.4s both' : 'none', opacity: 0 }}>
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10B981', animation: 'ripple 2s infinite' }} />
          <span style={{ fontSize: '11px', color: '#10B981', letterSpacing: '3px', fontWeight: '700' }}>{t.live}</span>
        </div>

        <div style={{ animation: loaded ? 'fadeSlideIn 1s cubic-bezier(0.16,1,0.3,1) 0.5s both' : 'none', opacity: 0 }}>
          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(80px, 13vw, 160px)',
            fontWeight: '400', letterSpacing: '6px', lineHeight: '0.9', margin: 0, color: '#fff',
            transform: `translate(${mouseX * 0.15}px, ${mouseY * 0.1}px)`,
            transition: 'transform 0.2s ease', userSelect: 'none',
          }}>
            IllumaDx
          </h1>
        </div>

        <div style={{ animation: loaded ? 'fadeSlideIn 0.8s ease 0.8s both' : 'none', opacity: 0, marginTop: '28px' }}>
          <p style={{ fontSize: '11px', color: '#00B4D8', letterSpacing: '4px', fontWeight: '600', marginBottom: '14px' }}>{t.tagline}</p>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.3)', maxWidth: '500px', lineHeight: '1.85', margin: '0 auto 44px' }}>{t.desc}</p>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', animation: loaded ? 'fadeSlideIn 0.8s ease 1s both' : 'none', opacity: 0 }}>
          <button style={{ padding: '14px 40px', background: '#00B4D8', color: '#05080F', border: 'none', borderRadius: '3px', fontSize: '13px', fontWeight: '800', cursor: 'pointer', letterSpacing: '1.5px', boxShadow: '0 0 40px rgba(0,180,216,0.25)', transition: 'all 0.25s', fontFamily: 'inherit' }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 70px rgba(0,180,216,0.55)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 40px rgba(0,180,216,0.25)'; e.currentTarget.style.transform = 'translateY(0)' }}>
            {t.upload}
          </button>
          <button style={{ padding: '14px 40px', background: 'transparent', color: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '3px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.25s', fontFamily: 'inherit' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; e.currentTarget.style.transform = 'translateY(0)' }}>
            {t.research}
          </button>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '64px', flexWrap: 'wrap', justifyContent: 'center', animation: loaded ? 'fadeSlideIn 0.8s ease 1.2s both' : 'none', opacity: 0 }}>
          {stats.map((stat, i) => (
            <div key={stat.label}
              onMouseEnter={() => setHoveredStat(i)}
              onMouseLeave={() => setHoveredStat(null)}
              style={{
                padding: '18px 22px',
                border: `1px solid ${hoveredStat === i ? stat.color + '55' : 'rgba(255,255,255,0.06)'}`,
                borderRadius: '6px', background: hoveredStat === i ? stat.color + '0A' : 'rgba(255,255,255,0.015)',
                textAlign: 'center', minWidth: '110px', cursor: 'default',
                transition: 'all 0.3s ease', transform: hoveredStat === i ? 'translateY(-4px)' : 'translateY(0)'
              }}>
              <div style={{ fontSize: '24px', fontWeight: '900', color: stat.color, letterSpacing: '-0.5px' }}>{stat.value}</div>
              <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.28)', marginTop: '5px', letterSpacing: '1.5px', fontWeight: '600' }}>{stat.label.toUpperCase()}</div>
            </div>
          ))}
        </div>

        <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', opacity: 0.4 }}>
          <div style={{ width: '1px', height: '52px', background: 'linear-gradient(to bottom, transparent, #00B4D8)', animation: 'scrollline 2s ease-in-out infinite' }} />
        </div>
      </section>

      {/* ── HAWKING QUOTE ── */}
      <section style={{
        minHeight: '50vh', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', textAlign: 'center',
        padding: '100px 24px', position: 'relative', zIndex: 1,
        borderTop: '1px solid rgba(255,255,255,0.04)',
        background: 'linear-gradient(180deg, rgba(0,180,216,0.02) 0%, transparent 100%)'
      }}>
        <FadeUp>
          <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', letterSpacing: '5px', marginBottom: '44px', fontWeight: '600' }}>{t.thesis}</p>
        </FadeUp>
        <FadeUp delay={0.12}>
          <blockquote style={{ fontSize: 'clamp(20px, 3.5vw, 40px)', fontWeight: '300', color: 'rgba(255,255,255,0.72)', lineHeight: '1.5', maxWidth: '800px', margin: '0 auto 16px', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>
            {t.hawkingLine1}<br />
            <span style={{ color: '#fff', fontWeight: '400' }}>{t.hawkingLine2}</span>
          </blockquote>
        </FadeUp>
        <FadeUp delay={0.22}>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', letterSpacing: '3px', marginBottom: '48px' }}>— STEPHEN HAWKING</p>
        </FadeUp>
        <FadeUp delay={0.34}>
          <p style={{ fontSize: 'clamp(14px, 1.8vw, 17px)', color: 'rgba(255,255,255,0.38)', maxWidth: '520px', lineHeight: '1.9' }}>
            {lang === 'en'
              ? <>A model scoring <span style={{ color: '#fff', fontWeight: '600' }}>99.69% accuracy</span> can still be <span style={{ color: '#E63946', fontWeight: '600' }}>completely wrong</span> about what it sees.<br /><br />This research proves it — and builds the system that fixes it.</>
              : t.hawkingBody
            }
          </p>
        </FadeUp>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: '100px 48px', position: 'relative', zIndex: 1, borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <FadeUp>
          <p style={{ fontSize: '10px', color: '#00B4D8', letterSpacing: '5px', marginBottom: '14px', fontWeight: '700', textAlign: 'center' }}>{t.features}</p>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: '900', textAlign: 'center', letterSpacing: '-2px', marginBottom: '14px', color: '#fff' }}>{t.featuresTitle}</h2>
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.35)', fontSize: '15px', maxWidth: '500px', margin: '0 auto 60px', lineHeight: '1.7' }}>{t.featuresDesc}</p>
        </FadeUp>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px', maxWidth: '1000px', margin: '0 auto' }}>
          {features.map((f, i) => (
            <FadeUp key={f.title} delay={i * 0.07}>
              <div onMouseEnter={() => setHoveredFeature(i)} onMouseLeave={() => setHoveredFeature(null)}
                style={{
                  padding: '28px 26px',
                  border: `1px solid ${hoveredFeature === i ? f.color + '40' : 'rgba(255,255,255,0.05)'}`,
                  borderRadius: '8px', background: hoveredFeature === i ? f.color + '08' : 'rgba(255,255,255,0.015)',
                  transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
                  transform: hoveredFeature === i ? 'translateY(-5px)' : 'translateY(0)',
                  cursor: 'default', height: '100%'
                }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <span style={{ fontSize: '26px' }}>{f.icon}</span>
                  <span style={{ fontSize: '9px', fontWeight: '700', color: f.color, border: `1px solid ${f.color}44`, padding: '3px 8px', borderRadius: '20px', letterSpacing: '1px' }}>{f.tag}</span>
                </div>
                <p style={{ fontSize: '15px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>{lang === 'fr' ? f.titleFr : f.title}</p>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.38)', lineHeight: '1.7' }}>{lang === 'fr' ? f.descFr : f.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── BEYOND ACCURACY ── */}
      <section style={{ padding: '100px 48px 140px', position: 'relative', zIndex: 1, borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <FadeUp>
          <p style={{ fontSize: '10px', color: '#00B4D8', letterSpacing: '5px', marginBottom: '14px', fontWeight: '700', textAlign: 'center' }}>{t.finding}</p>
          <h2 style={{ fontSize: 'clamp(40px, 7vw, 88px)', fontWeight: '900', textAlign: 'center', letterSpacing: '-3px', marginBottom: '72px', lineHeight: '0.9', color: '#fff' }}>Beyond Accuracy</h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div style={{ maxWidth: '800px', margin: '0 auto 60px', padding: '48px', background: 'rgba(230,57,70,0.03)', border: '1px solid rgba(230,57,70,0.14)', borderRadius: '8px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 50% -10%, rgba(230,57,70,0.1), transparent 55%)' }} />
            <div style={{ fontSize: 'clamp(72px, 12vw, 140px)', fontWeight: '900', color: '#E63946', letterSpacing: '-5px', lineHeight: '1', marginBottom: '18px', animation: 'subtleGlow 3s ease-in-out infinite' }}>33×</div>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', maxWidth: '460px', margin: '0 auto', lineHeight: '1.85' }}>
              Group C had <strong style={{ color: '#fff' }}>33× higher training loss</strong> than Group B with nearly <strong style={{ color: '#fff' }}>identical accuracy</strong>. Same score. Completely different trustworthiness.
            </p>
          </div>
        </FadeUp>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(215px, 1fr))', gap: '10px', maxWidth: '960px', margin: '0 auto' }}>
          {groups.map((g, i) => (
            <FadeUp key={g.group} delay={i * 0.08}>
              <div style={{ padding: '24px 20px', border: `1px solid ${g.color}18`, borderRadius: '6px', background: `${g.color}04`, transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)', cursor: 'default', height: '100%' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = g.color + '44'; e.currentTarget.style.background = g.color + '0C'; e.currentTarget.style.transform = 'translateY(-5px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = g.color + '18'; e.currentTarget.style.background = g.color + '04'; e.currentTarget.style.transform = 'translateY(0)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{ fontSize: '32px', fontWeight: '900', color: g.color, lineHeight: 1 }}>G{g.group}</span>
                  {g.badge && <span style={{ fontSize: '9px', fontWeight: '800', color: g.color, border: `1px solid ${g.color}55`, padding: '3px 8px', borderRadius: '2px', letterSpacing: '1px' }}>{g.badge}</span>}
                </div>
                <p style={{ fontSize: '12px', fontWeight: '700', color: '#fff', marginBottom: '6px' }}>{g.label}</p>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.28)', lineHeight: '1.6', marginBottom: '14px' }}>{g.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '12px' }}>
                  {[['Accuracy', g.acc, '#fff'], ['ECE', g.ece, g.group === 'C' ? '#E63946' : '#10B981'], ['Epoch 50 Loss', g.loss, g.group === 'C' ? '#E63946' : 'rgba(255,255,255,0.45)']].map(([label, val, col]) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)' }}>{label}</span>
                      <span style={{ fontSize: '11px', fontWeight: '700', color: col }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.2}>
          <div style={{ maxWidth: '600px', margin: '60px auto 0', textAlign: 'center', padding: '36px 28px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.9', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>{t.quote}</p>
          </div>
        </FadeUp>
      </section>

      {/* ── FLOATING LANGUAGE TOGGLE ── */}
      <div style={{
        position: 'fixed', bottom: '28px', right: '28px', zIndex: 200,
        display: 'flex', alignItems: 'center',
        background: 'rgba(10,22,40,0.95)', border: '1px solid rgba(0,180,216,0.2)',
        borderRadius: '40px', overflow: 'hidden',
        backdropFilter: 'blur(20px)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        animation: loaded ? 'fadeSlideIn 0.8s ease 1.5s both' : 'none', opacity: 0,
      }}>
        {['en', 'fr'].map((l) => (
          <button key={l} onClick={() => setLang(l)} style={{
            padding: '10px 18px',
            background: lang === l ? '#00B4D8' : 'transparent',
            color: lang === l ? '#05080F' : 'rgba(255,255,255,0.4)',
            border: 'none', cursor: 'pointer',
            fontSize: '11px', fontWeight: '800', letterSpacing: '1.5px',
            transition: 'all 0.25s ease', fontFamily: 'inherit'
          }}>
            {l.toUpperCase()}
          </button>
        ))}
      </div>

    </div>
  )
}