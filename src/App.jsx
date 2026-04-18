import { useState, useEffect, useRef } from 'react'

const API_URL = 'https://arhaanie-illumadx-backend.hf.space'

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
    live: 'LIVE CLINICAL AI SYSTEM', tagline: 'BECAUSE DIAGNOSIS STARTS WITH CLARITY',
    desc: '40 trained deep learning models · GradCAM++ interpretability · Statistical validation across 4 augmentation strategies',
    upload: 'UPLOAD MRI', research: 'View Research', thesis: 'THE THESIS', finding: 'THE FINDING', features: 'WHAT ILLUMADX DOES',
    hawkingLine1: '"The greatest enemy of knowledge is not ignorance',
    hawkingLine2: 'it is the illusion of knowledge."',
    hawkingBody1: 'A model scoring', hawkingBody2: '99.69% accuracy', hawkingBody3: 'can still be',
    hawkingBody4: 'completely wrong', hawkingBody5: 'about what it sees.',
    hawkingBody6: 'This research proves it — and builds the system that fixes it.',
    quote: '"Accuracy measures outcomes. GradCAM++ measures reasoning. A model that looks at the wrong region will fail silently the moment it sees a scan from a different hospital."',
    featuresTitle: 'A complete clinical AI platform',
    featuresDesc: 'Not just a model. A deployable diagnostic system built for real clinical environments.',
    finding33x: 'Group C had 33× higher training loss than Group B with nearly identical accuracy. Same score. Completely different trustworthiness.',
    groupLabels: ['No Augmentation', 'Basic Augmentation', 'Extreme Augmentation', 'Domain-Specific'],
    groupDescs: ['Control — baseline performance', 'Flip, rotation 15°, brightness jitter', 'Illusion of knowledge — looks fine, fails silently', 'Expected winner — hypothesis rejected'],
    statLabels: ['Accuracy', 'ECE', 'Epoch 50 Loss'],
    peakAcc: 'Peak Accuracy', lossGap: 'Loss Gap Detected', modelsTrained: 'Models Trained', patients: 'Patients Underserved Globally',
  },
  fr: {
    live: 'SYSTÈME IA CLINIQUE EN DIRECT', tagline: 'PARCE QUE LE DIAGNOSTIC COMMENCE PAR LA CLARTÉ',
    desc: '40 modèles d\'apprentissage profond · Interprétabilité GradCAM++ · Validation statistique sur 4 stratégies',
    upload: 'TÉLÉCHARGER IRM', research: 'Voir la Recherche', thesis: 'LA THÈSE', finding: 'LA DÉCOUVERTE', features: 'CE QUE FAIT ILLUMADX',
    hawkingLine1: '"Le plus grand ennemi de la connaissance n\'est pas l\'ignorance',
    hawkingLine2: 'c\'est l\'illusion de la connaissance."',
    hawkingBody1: 'Un modèle avec', hawkingBody2: '99,69% de précision', hawkingBody3: 'peut encore être',
    hawkingBody4: 'complètement erroné', hawkingBody5: 'dans ce qu\'il observe.',
    hawkingBody6: 'Cette recherche le prouve — et construit le système qui le corrige.',
    quote: '"La précision mesure les résultats. GradCAM++ mesure le raisonnement. Un modèle qui regarde la mauvaise région échouera silencieusement dès qu\'il verra un scan d\'un autre hôpital."',
    featuresTitle: 'Une plateforme IA clinique complète',
    featuresDesc: 'Pas seulement un modèle. Un système diagnostique déployable conçu pour les environnements cliniques réels.',
    finding33x: 'Le Groupe C avait une perte d\'entraînement 33× plus élevée que le Groupe B avec une précision presque identique. Même score. Fiabilité clinique complètement différente.',
    groupLabels: ['Aucune Augmentation', 'Augmentation Basique', 'Augmentation Extrême', 'Spécifique au Domaine'],
    groupDescs: ['Contrôle — performance de référence', 'Retournement, rotation 15°, variation de luminosité', 'Illusion de connaissance — semble correct, échoue silencieusement', 'Gagnant attendu — hypothèse rejetée'],
    statLabels: ['Précision', 'ECE', 'Perte Époque 50'],
    peakAcc: 'Précision Maximale', lossGap: 'Écart de Perte Détecté', modelsTrained: 'Modèles Entraînés', patients: 'Patients Non Desservis Mondialement',
  }
}

const navItems = [
  { label: 'System', labelFr: 'Système', desc: 'Live AI Demo', descFr: 'Démo IA en direct', color: '#00B4D8', bg: 'rgba(0,180,216,0.1)', border: 'rgba(0,180,216,0.35)', icon: '⚡', mobileShow: true },
  { label: 'Patient Records', labelFr: 'Dossiers', desc: 'EHR / Connect Care', descFr: 'DSE / Connect Care', color: '#10B981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.25)', icon: '🗂', mobileShow: true },
  { label: 'PDF Report', labelFr: 'Rapport PDF', desc: 'Diagnostic Export', descFr: 'Export Diagnostique', color: '#FFB703', bg: 'rgba(255,183,3,0.08)', border: 'rgba(255,183,3,0.25)', icon: '📄', mobileShow: true },
  { label: 'Research', labelFr: 'Recherche', desc: 'Findings & Stats', descFr: 'Résultats & Stats', color: 'rgba(255,255,255,0.8)', bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.12)', icon: '📊', mobileShow: false },
  { label: 'Ethics', labelFr: 'Éthique', desc: 'Health Canada', descFr: 'Santé Canada', color: 'rgba(255,255,255,0.8)', bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.12)', icon: '⚖', mobileShow: false },
]

const features = [
  { icon: '⬆', title: 'Live MRI Upload', titleFr: 'Téléchargement IRM', desc: 'Upload any brain MRI scan. IllumaDX runs real-time inference across trained model groups instantly.', descFr: 'Téléchargez n\'importe quelle IRM cérébrale pour une inférence en temps réel.', color: '#00B4D8', tag: 'REAL-TIME', tagFr: 'TEMPS RÉEL' },
  { icon: '🧠', title: 'GradCAM++ Heatmaps', titleFr: 'Cartes GradCAM++', desc: 'See exactly what the AI is looking at. Group B + Group D heatmaps side-by-side + consensus overlay.', descFr: 'Voyez exactement ce que l\'IA regarde. Cartes de chaleur côte à côte + superposition consensus.', color: '#10B981', tag: 'INTERPRETABILITY', tagFr: 'INTERPRÉTABILITÉ' },
  { icon: '📄', title: 'Diagnostic PDF Export', titleFr: 'Export PDF Diagnostique', desc: 'Auto-generated clinical report with prediction, heatmap, benchmark stats, and clinical disclaimer.', descFr: 'Rapport clinique auto-généré avec prédiction, carte de chaleur, statistiques et avertissement clinique.', color: '#FFB703', tag: 'CLINICAL', tagFr: 'CLINIQUE' },
  { icon: '🗂', title: 'EHR Integration', titleFr: 'Intégration DSE', desc: 'Mock Connect Care–style patient profiles. Enter a patient ID, run the AI, save the diagnostic PDF to their record.', descFr: 'Profils patients style Connect Care. Entrez un ID patient, lancez l\'IA, sauvegardez le PDF.', color: '#00B4D8', tag: 'PATIENT RECORDS', tagFr: 'DOSSIERS PATIENTS' },
  { icon: '🛡', title: 'Confidence Gate', titleFr: 'Seuil de Confiance', desc: 'If model confidence falls below 60%, IllumaDX flags the scan as invalid rather than guessing.', descFr: 'Si la confiance tombe sous 60%, IllumaDX signale le scan comme invalide plutôt que de deviner.', color: '#E63946', tag: 'SAFETY', tagFr: 'SÉCURITÉ' },
  { icon: '⚖', title: 'Ethics & Compliance', titleFr: 'Éthique et Conformité', desc: 'Health Canada regulatory pathway, AI bias analysis, data privacy framework, and clinical limitations.', descFr: 'Voie réglementaire Santé Canada, analyse des biais IA, cadre de confidentialité des données.', color: '#FFB703', tag: 'REGULATORY', tagFr: 'RÉGLEMENTAIRE' },
]

const groups = [
  { group: 'A', color: '#00B4D8', acc: '99.48%', ece: '0.0041', loss: '~0.025' },
  { group: 'B', color: '#10B981', acc: '99.69%', ece: '0.0030', loss: '~0.003', badge: true, badgeType: 'winner' },
  { group: 'C', color: '#E63946', acc: '98.66%', ece: '0.0082', loss: '~0.100', badge: true, badgeType: 'danger' },
  { group: 'D', color: '#FFB703', acc: '99.68%', ece: '0.0030', loss: '~0.050' },
]

const CLASS_COLORS = {
  glioma: '#E63946',
  meningioma: '#FFB703',
  notumor: '#10B981',
  pituitary: '#00B4D8',
}

function UploadModal({ onClose, lang }) {
  const [phase, setPhase] = useState('idle') // idle | loading | result | error | invalid
  const [result, setResult] = useState(null)
  const [preview, setPreview] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef(null)

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) return
    setPreview(URL.createObjectURL(file))
    setPhase('loading')
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch(`${API_URL}/predict`, { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok) {
        if (data.error === 'not_mri') { setPhase('not_mri'); return }
        setPhase('invalid'); return
      }
      setResult(data)
      setPhase('result')
    } catch (e) {
      setPhase('error')
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }

  const reset = () => { setPhase('idle'); setResult(null); setPreview(null) }

  const classOrder = ['glioma', 'meningioma', 'notumor', 'pituitary']

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(5,8,15,0.92)', backdropFilter: 'blur(20px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#0A1628', border: '1px solid rgba(0,180,216,0.2)',
        borderRadius: '12px', width: '100%', maxWidth: phase === 'result' ? '900px' : '520px',
        maxHeight: '90vh', overflowY: 'auto',
        padding: '36px', position: 'relative',
        boxShadow: '0 40px 120px rgba(0,0,0,0.8)',
        transition: 'max-width 0.5s cubic-bezier(0.16,1,0.3,1)',
      }}>
        {/* Close */}
        <button onClick={onClose} style={{
          position: 'absolute', top: '16px', right: '16px',
          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
          color: 'rgba(255,255,255,0.5)', borderRadius: '6px', width: '32px', height: '32px',
          cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>×</button>

        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', animation: 'ripple 2s infinite' }} />
            <span style={{ fontSize: '9px', color: '#10B981', letterSpacing: '3px', fontWeight: '700' }}>
              {lang === 'fr' ? 'SYSTÈME EN DIRECT' : 'LIVE SYSTEM'}
            </span>
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '32px', color: '#fff', letterSpacing: '2px', margin: 0 }}>
            Illuma<span style={{ color: '#00B4D8' }}>DX</span> {lang === 'fr' ? 'ANALYSE' : 'ANALYSIS'}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', marginTop: '6px' }}>
            {lang === 'fr' ? 'Téléchargez une IRM cérébrale pour une analyse en temps réel' : 'Upload a brain MRI scan for real-time AI analysis'}
          </p>
        </div>

        {/* IDLE — drop zone */}
        {phase === 'idle' && (
          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current.click()}
            style={{
              border: `2px dashed ${dragOver ? '#00B4D8' : 'rgba(0,180,216,0.25)'}`,
              borderRadius: '8px', padding: '60px 24px',
              textAlign: 'center', cursor: 'pointer',
              background: dragOver ? 'rgba(0,180,216,0.05)' : 'rgba(0,180,216,0.02)',
              transition: 'all 0.2s ease',
            }}>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }}
              onChange={e => handleFile(e.target.files[0])} />
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🧠</div>
            <p style={{ color: '#00B4D8', fontSize: '14px', fontWeight: '700', marginBottom: '8px' }}>
              {lang === 'fr' ? 'Glissez une IRM ici' : 'Drop MRI scan here'}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '12px' }}>
              {lang === 'fr' ? 'ou cliquez pour parcourir' : 'or click to browse'} · PNG, JPG, JPEG
            </p>
            <div style={{ marginTop: '24px', padding: '10px 20px', background: '#00B4D8', color: '#05080F', borderRadius: '4px', display: 'inline-block', fontSize: '11px', fontWeight: '800', letterSpacing: '1px' }}>
              {lang === 'fr' ? 'CHOISIR FICHIER' : 'CHOOSE FILE'}
            </div>
          </div>
        )}

        {/* LOADING */}
        {phase === 'loading' && (
          <div style={{ textAlign: 'center', padding: '60px 24px' }}>
            {preview && <img src={preview} alt="scan" style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '24px', opacity: 0.6, border: '1px solid rgba(0,180,216,0.3)' }} />}
            <div style={{ width: '48px', height: '48px', border: '3px solid rgba(0,180,216,0.2)', borderTop: '3px solid #00B4D8', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }} />
            <p style={{ color: '#00B4D8', fontSize: '13px', fontWeight: '700', letterSpacing: '2px' }}>
              {lang === 'fr' ? 'ANALYSE EN COURS...' : 'ANALYSING SCAN...'}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '11px', marginTop: '8px' }}>
              {lang === 'fr' ? 'GradCAM++ génère les cartes de chaleur' : 'GradCAM++ generating heatmaps'}
            </p>
          </div>
        )}

        {/* NOT MRI */}
        {phase === 'not_mri' && (
          <div style={{ textAlign: 'center', padding: '48px 24px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🧠</div>
            <h3 style={{ color: '#E63946', fontSize: '18px', fontWeight: '800', marginBottom: '12px', letterSpacing: '1px' }}>
              {lang === 'fr' ? 'PAS UNE IRM' : 'NOT A BRAIN MRI'}
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', lineHeight: '1.7', maxWidth: '340px', margin: '0 auto 28px' }}>
              {lang === 'fr'
                ? 'Veuillez télécharger une IRM cérébrale valide en niveaux de gris.'
                : 'This does not appear to be a brain MRI scan. Please upload a valid greyscale brain MRI.'}
            </p>
            <button onClick={reset} style={{ padding: '10px 24px', background: '#00B4D8', color: '#05080F', border: 'none', borderRadius: '4px', fontSize: '11px', fontWeight: '800', cursor: 'pointer', letterSpacing: '1px' }}>
              {lang === 'fr' ? 'RÉESSAYER' : 'TRY AGAIN'}
            </button>
          </div>
        )}

        {/* INVALID */}
        {phase === 'invalid' && (
          <div style={{ textAlign: 'center', padding: '48px 24px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛡</div>
            <h3 style={{ color: '#E63946', fontSize: '18px', fontWeight: '800', marginBottom: '12px', letterSpacing: '1px' }}>
              {lang === 'fr' ? 'SCAN INVALIDE' : 'INVALID SCAN'}
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', lineHeight: '1.7', maxWidth: '340px', margin: '0 auto 28px' }}>
              {lang === 'fr'
                ? 'Confiance du modèle insuffisante. Veuillez télécharger une IRM cérébrale valide.'
                : 'Model confidence below 60%. Please upload a valid brain MRI scan.'}
            </p>
            <button onClick={reset} style={{ padding: '10px 24px', background: '#00B4D8', color: '#05080F', border: 'none', borderRadius: '4px', fontSize: '11px', fontWeight: '800', cursor: 'pointer', letterSpacing: '1px' }}>
              {lang === 'fr' ? 'RÉESSAYER' : 'TRY AGAIN'}
            </button>
          </div>
        )}

        {/* ERROR */}
        {phase === 'error' && (
          <div style={{ textAlign: 'center', padding: '48px 24px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
            <h3 style={{ color: '#E63946', fontSize: '18px', fontWeight: '800', marginBottom: '12px' }}>
              {lang === 'fr' ? 'ERREUR DE CONNEXION' : 'CONNECTION ERROR'}
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', lineHeight: '1.7', maxWidth: '340px', margin: '0 auto 28px' }}>
              {lang === 'fr' ? 'Impossible de contacter le serveur IA. Réessayez dans un moment.' : 'Could not reach the AI server. Please try again in a moment.'}
            </p>
            <button onClick={reset} style={{ padding: '10px 24px', background: '#00B4D8', color: '#05080F', border: 'none', borderRadius: '4px', fontSize: '11px', fontWeight: '800', cursor: 'pointer', letterSpacing: '1px' }}>
              {lang === 'fr' ? 'RÉESSAYER' : 'TRY AGAIN'}
            </button>
          </div>
        )}

        {/* RESULT */}
        {phase === 'result' && result && (
          <div>
            {/* Top prediction */}
            <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '8px', padding: '24px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '3px', marginBottom: '6px' }}>
                  {lang === 'fr' ? 'PRÉDICTION PRINCIPALE' : 'TOP PREDICTION'}
                </p>
                <h3 style={{ fontSize: '28px', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px', color: CLASS_COLORS[result.prediction] || '#10B981', margin: 0 }}>
                  {result.prediction.toUpperCase()}
                </h3>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '3px', marginBottom: '6px' }}>
                  {lang === 'fr' ? 'CONFIANCE' : 'CONFIDENCE'}
                </p>
                <p style={{ fontSize: '36px', fontWeight: '900', color: '#10B981', margin: 0, letterSpacing: '-1px' }}>
                  {(result.confidence * 100).toFixed(1)}%
                </p>
              </div>
            </div>

            {/* Confidence bar chart */}
            <div style={{ marginBottom: '28px' }}>
              <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '3px', marginBottom: '14px' }}>
                {lang === 'fr' ? 'DISTRIBUTION DE CONFIANCE' : 'CONFIDENCE DISTRIBUTION'}
              </p>
              {classOrder.map(cls => {
                const prob = result.probabilities[cls] || 0
                const pct = (prob * 100).toFixed(1)
                const isTop = cls === result.prediction
                return (
                  <div key={cls} style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '11px', color: isTop ? CLASS_COLORS[cls] : 'rgba(255,255,255,0.4)', fontWeight: isTop ? '700' : '400', textTransform: 'uppercase', letterSpacing: '1px' }}>{cls}</span>
                      <span style={{ fontSize: '11px', color: isTop ? CLASS_COLORS[cls] : 'rgba(255,255,255,0.4)', fontWeight: isTop ? '700' : '400' }}>{pct}%</span>
                    </div>
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: isTop ? CLASS_COLORS[cls] : 'rgba(255,255,255,0.12)', borderRadius: '3px', transition: 'width 1s cubic-bezier(0.16,1,0.3,1)' }} />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Heatmaps */}
            <div>
              <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '3px', marginBottom: '14px' }}>
                {lang === 'fr' ? 'ANALYSE GRADCAM++' : 'GRADCAM++ ANALYSIS'}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                {[
                  { key: 'heatmap_b', label: lang === 'fr' ? 'Groupe B — Basique ✓' : 'Group B — Basic ✓', color: '#10B981' },
                  { key: 'heatmap_d', label: lang === 'fr' ? 'Groupe D — Spécifique' : 'Group D — Domain', color: '#FFB703' },
                ].map(({ key, label, color }) => (
                  <div key={key} style={{ border: `1px solid ${color}33`, borderRadius: '8px', overflow: 'hidden' }}>
                    <img src={`data:image/png;base64,${result[key]}`} alt={label} style={{ width: '100%', display: 'block' }} />
                    <div style={{ padding: '8px 10px', background: `${color}0A` }}>
                      <p style={{ fontSize: '10px', color, fontWeight: '700', margin: 0, letterSpacing: '0.5px' }}>{label}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Consensus — full width, biggest */}
              <div style={{ border: '1px solid rgba(0,180,216,0.35)', borderRadius: '8px', overflow: 'hidden' }}>
                <img src={`data:image/png;base64,${result.heatmap_consensus}`} alt="consensus" style={{ width: '100%', display: 'block' }} />
                <div style={{ padding: '10px 14px', background: 'rgba(0,180,216,0.06)' }}>
                  <p style={{ fontSize: '10px', color: '#00B4D8', fontWeight: '700', margin: 0, letterSpacing: '0.5px' }}>
                    {lang === 'fr' ? '⬡ CONSENSUS B+D — HEATMAP FINALE' : '⬡ CONSENSUS B+D — FINAL HEATMAP'}
                  </p>
                  <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', margin: '2px 0 0', lineHeight: '1.5' }}>
                    {lang === 'fr' ? 'Moyenne des deux modèles les plus performants' : 'Average of the two highest-performing models'}
                  </p>
                </div>
              </div>
            </div>

            {/* Clinical disclaimer */}
            <div style={{ marginTop: '20px', padding: '12px 16px', background: 'rgba(255,183,3,0.05)', border: '1px solid rgba(255,183,3,0.15)', borderRadius: '6px' }}>
              <p style={{ fontSize: '10px', color: 'rgba(255,183,3,0.7)', margin: 0, lineHeight: '1.6' }}>
                ⚠ {lang === 'fr'
                  ? 'Outil de recherche uniquement. Ne remplace pas le diagnostic clinique. Non approuvé par Santé Canada.'
                  : 'Research tool only. Not a substitute for clinical diagnosis. Not approved by Health Canada.'}
              </p>
            </div>

            <button onClick={reset} style={{ marginTop: '20px', width: '100%', padding: '12px', background: 'rgba(0,180,216,0.1)', border: '1px solid rgba(0,180,216,0.25)', color: '#00B4D8', borderRadius: '6px', fontSize: '11px', fontWeight: '800', cursor: 'pointer', letterSpacing: '1.5px' }}>
              {lang === 'fr' ? '← ANALYSER UN AUTRE SCAN' : '← ANALYSE ANOTHER SCAN'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function App() {
  const [scrollY, setScrollY] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [hoveredStat, setHoveredStat] = useState(null)
  const [hoveredFeature, setHoveredFeature] = useState(null)
  const [hoveredNav, setHoveredNav] = useState(null)
  const [lang, setLang] = useState('en')
  const [isMobile, setIsMobile] = useState(false)
  const [showUpload, setShowUpload] = useState(false)

  const t = translations[lang]

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

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
    { value: '99.69%', label: t.peakAcc, color: '#10B981' },
    { value: '33×', label: t.lossGap, color: '#E63946' },
    { value: '40', label: t.modelsTrained, color: '#00B4D8' },
    { value: '300K+', label: t.patients, color: '#FFB703' },
  ]

  const visibleNavItems = isMobile ? navItems.filter(n => n.mobileShow) : navItems

  return (
    <div style={{ background: '#05080F', minHeight: '100vh', overflowX: 'hidden', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Bebas+Neue&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes ripple { 0% { box-shadow: 0 0 0 0 rgba(16,185,129,0.5); } 70% { box-shadow: 0 0 0 14px rgba(16,185,129,0); } 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); } }
        @keyframes scrollline { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.7; } }
        @keyframes subtleGlow { 0%, 100% { text-shadow: 0 0 60px rgba(230,57,70,0.2); } 50% { text-shadow: 0 0 100px rgba(230,57,70,0.5); } }
        @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .nav-btn:hover .nav-tooltip { opacity: 1 !important; transform: translateX(-50%) translateY(0px) !important; }
      `}</style>

      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', backgroundImage: `linear-gradient(rgba(0,180,216,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,216,0.025) 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', background: `radial-gradient(800px circle at ${50 + mouseX * 0.4}% ${50 + mouseY * 0.4}%, rgba(0,180,216,0.065), transparent 60%)` }} />

      {showUpload && <UploadModal onClose={() => setShowUpload(false)} lang={lang} />}

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 24px', height: '60px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: scrollY > 60 ? 'rgba(5,8,15,0.94)' : 'rgba(5,8,15,0.6)',
        backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        transition: 'background 0.4s ease',
        opacity: loaded ? 1 : 0,
        animation: loaded ? 'fadeSlideIn 0.8s ease 0.2s both' : 'none',
      }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: isMobile ? '22px' : '26px', letterSpacing: '2px', cursor: 'pointer', flexShrink: 0 }}>
          <span style={{ color: '#fff' }}>Illuma</span><span style={{ color: '#00B4D8' }}>DX</span>
        </div>

        <div style={{ display: 'flex', gap: isMobile ? '4px' : '6px', alignItems: 'center' }}>
          {visibleNavItems.map((item, i) => (
            <div key={item.label} className="nav-btn"
              onMouseEnter={() => setHoveredNav(i)}
              onMouseLeave={() => setHoveredNav(null)}
              onClick={() => { if (item.label === 'System') setShowUpload(true) }}
              style={{ position: 'relative', cursor: 'pointer' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: isMobile ? '4px' : '6px',
                padding: isMobile ? '6px 8px' : '7px 14px',
                background: hoveredNav === i ? item.bg : 'transparent',
                border: `1px solid ${hoveredNav === i ? item.border : 'transparent'}`,
                borderRadius: '6px', transition: 'all 0.2s ease',
              }}>
                <span style={{ fontSize: isMobile ? '11px' : '12px' }}>{item.icon}</span>
                <span style={{
                  fontSize: isMobile ? '11px' : '15px', fontWeight: '600',
                  color: hoveredNav === i ? item.color : 'rgba(255,255,255,0.5)',
                  transition: 'color 0.2s', whiteSpace: 'nowrap'
                }}>
                  {isMobile
                    ? (lang === 'fr' ? item.labelFr : item.label).split(' ')[0]
                    : (lang === 'fr' ? item.labelFr : item.label)
                  }
                </span>
              </div>
              {!isMobile && (
                <div className="nav-tooltip" style={{
                  position: 'absolute', top: 'calc(100% + 8px)', left: '50%',
                  transform: 'translateX(-50%) translateY(4px)',
                  background: 'rgba(10,22,40,0.98)', border: `1px solid ${item.border}`,
                  borderRadius: '5px', padding: '5px 10px', whiteSpace: 'nowrap',
                  fontSize: '10px', color: item.color, letterSpacing: '0.5px',
                  opacity: 0, transition: 'opacity 0.2s, transform 0.2s', pointerEvents: 'none',
                  backdropFilter: 'blur(12px)', zIndex: 200
                }}>
                  {lang === 'fr' ? item.descFr : item.desc}
                </div>
              )}
            </div>
          ))}
        </div>

        <button onClick={() => setShowUpload(true)} style={{
          padding: isMobile ? '6px 12px' : '8px 18px',
          background: '#00B4D8', color: '#05080F',
          border: 'none', borderRadius: '4px',
          fontSize: isMobile ? '10px' : '11px',
          fontWeight: '800', cursor: 'pointer', letterSpacing: '1px',
          transition: 'all 0.2s', boxShadow: '0 0 20px rgba(0,180,216,0.2)',
          fontFamily: 'inherit', flexShrink: 0
        }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 40px rgba(0,180,216,0.5)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 20px rgba(0,180,216,0.2)'; e.currentTarget.style.transform = 'translateY(0)' }}>
          {isMobile ? 'UPLOAD' : t.upload}
        </button>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: isMobile ? '80px 20px 40px' : '80px 24px 40px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px', animation: loaded ? 'fadeSlideIn 0.8s ease 0.4s both' : 'none', opacity: 0 }}>
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10B981', animation: 'ripple 2s infinite' }} />
          <span style={{ fontSize: isMobile ? '9px' : '11px', color: '#10B981', letterSpacing: '3px', fontWeight: '700' }}>{t.live}</span>
        </div>

        <div style={{ animation: loaded ? 'fadeSlideIn 1s cubic-bezier(0.16,1,0.3,1) 0.5s both' : 'none', opacity: 0 }}>
          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: isMobile ? 'clamp(72px, 22vw, 130px)' : 'clamp(80px, 13vw, 160px)',
            fontWeight: '400', letterSpacing: '6px', lineHeight: '0.9', margin: 0,
            transform: `translate(${mouseX * 0.15}px, ${mouseY * 0.1}px)`,
            transition: 'transform 0.2s ease', userSelect: 'none',
          }}>
            <span style={{ color: '#fff' }}>Illuma</span><span style={{ color: '#00B4D8' }}>DX</span>
          </h1>
        </div>

        <div style={{ animation: loaded ? 'fadeSlideIn 0.8s ease 0.8s both' : 'none', opacity: 0, marginTop: '28px' }}>
          <p style={{ fontSize: isMobile ? '9px' : '11px', color: '#00B4D8', letterSpacing: isMobile ? '2px' : '4px', fontWeight: '600', marginBottom: '14px' }}>{t.tagline}</p>
          <p style={{ fontSize: isMobile ? '13px' : '15px', color: 'rgba(255,255,255,0.3)', maxWidth: '500px', lineHeight: '1.85', margin: '0 auto 44px' }}>{t.desc}</p>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', animation: loaded ? 'fadeSlideIn 0.8s ease 1s both' : 'none', opacity: 0 }}>
          <button onClick={() => setShowUpload(true)} style={{ padding: isMobile ? '12px 28px' : '14px 40px', background: '#00B4D8', color: '#05080F', border: 'none', borderRadius: '3px', fontSize: '13px', fontWeight: '800', cursor: 'pointer', letterSpacing: '1.5px', boxShadow: '0 0 40px rgba(0,180,216,0.25)', transition: 'all 0.25s', fontFamily: 'inherit' }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 70px rgba(0,180,216,0.55)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 40px rgba(0,180,216,0.25)'; e.currentTarget.style.transform = 'translateY(0)' }}>
            {t.upload}
          </button>
          <button style={{ padding: isMobile ? '12px 28px' : '14px 40px', background: 'transparent', color: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '3px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.25s', fontFamily: 'inherit' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; e.currentTarget.style.transform = 'translateY(0)' }}>
            {t.research}
          </button>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginTop: '56px', flexWrap: 'wrap', justifyContent: 'center', animation: loaded ? 'fadeSlideIn 0.8s ease 1.2s both' : 'none', opacity: 0 }}>
          {stats.map((stat, i) => (
            <div key={i} onMouseEnter={() => setHoveredStat(i)} onMouseLeave={() => setHoveredStat(null)}
              style={{
                padding: isMobile ? '12px 14px' : '18px 22px',
                border: `1px solid ${hoveredStat === i ? stat.color + '55' : 'rgba(255,255,255,0.06)'}`,
                borderRadius: '6px', background: hoveredStat === i ? stat.color + '0A' : 'rgba(255,255,255,0.015)',
                textAlign: 'center', minWidth: isMobile ? '70px' : '110px', cursor: 'default',
                transition: 'all 0.3s ease', transform: hoveredStat === i ? 'translateY(-4px)' : 'translateY(0)'
              }}>
              <div style={{ fontSize: isMobile ? '16px' : '24px', fontWeight: '900', color: stat.color, letterSpacing: '-0.5px' }}>{stat.value}</div>
              <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.28)', marginTop: '4px', letterSpacing: '1px', fontWeight: '600' }}>{stat.label.toUpperCase()}</div>
            </div>
          ))}
        </div>

        <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', opacity: 0.4 }}>
          <div style={{ width: '1px', height: '52px', background: 'linear-gradient(to bottom, transparent, #00B4D8)', animation: 'scrollline 2s ease-in-out infinite' }} />
        </div>
      </section>

      {/* HAWKING QUOTE */}
      <section style={{ minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: isMobile ? '80px 20px' : '100px 24px', position: 'relative', zIndex: 1, borderTop: '1px solid rgba(255,255,255,0.04)', background: 'linear-gradient(180deg, rgba(0,180,216,0.02) 0%, transparent 100%)' }}>
        <FadeUp><p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', letterSpacing: '5px', marginBottom: '44px', fontWeight: '600' }}>{t.thesis}</p></FadeUp>
        <FadeUp delay={0.12}>
          <blockquote style={{ fontSize: isMobile ? 'clamp(18px, 5vw, 28px)' : 'clamp(20px, 3.5vw, 40px)', fontWeight: '300', color: 'rgba(255,255,255,0.72)', lineHeight: '1.5', maxWidth: '800px', margin: '0 auto 16px', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>
            {t.hawkingLine1}<br /><span style={{ color: '#fff', fontWeight: '400' }}>{t.hawkingLine2}</span>
          </blockquote>
        </FadeUp>
        <FadeUp delay={0.22}><p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', letterSpacing: '3px', marginBottom: '48px' }}>— STEPHEN HAWKING</p></FadeUp>
        <FadeUp delay={0.34}>
          <p style={{ fontSize: isMobile ? '14px' : 'clamp(14px, 1.8vw, 17px)', color: 'rgba(255,255,255,0.38)', maxWidth: '520px', lineHeight: '1.9' }}>
            {t.hawkingBody1} <span style={{ color: '#fff', fontWeight: '600' }}>{t.hawkingBody2}</span> {t.hawkingBody3} <span style={{ color: '#E63946', fontWeight: '600' }}>{t.hawkingBody4}</span> {t.hawkingBody5}
            <br /><br />{t.hawkingBody6}
          </p>
        </FadeUp>
      </section>

      {/* FEATURES */}
      <section style={{ padding: isMobile ? '80px 20px' : '100px 48px', position: 'relative', zIndex: 1, borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <FadeUp>
          <p style={{ fontSize: '10px', color: '#00B4D8', letterSpacing: '5px', marginBottom: '14px', fontWeight: '700', textAlign: 'center' }}>{t.features}</p>
          <h2 style={{ fontSize: isMobile ? 'clamp(28px, 8vw, 48px)' : 'clamp(32px, 5vw, 60px)', fontWeight: '900', textAlign: 'center', letterSpacing: '-2px', marginBottom: '14px', color: '#fff' }}>{t.featuresTitle}</h2>
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.35)', fontSize: '15px', maxWidth: '500px', margin: '0 auto 60px', lineHeight: '1.7' }}>{t.featuresDesc}</p>
        </FadeUp>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px', maxWidth: '1000px', margin: '0 auto' }}>
          {features.map((f, i) => (
            <FadeUp key={f.title} delay={i * 0.07}>
              <div onMouseEnter={() => setHoveredFeature(i)} onMouseLeave={() => setHoveredFeature(null)}
                onClick={() => { if (f.title === 'Live MRI Upload') setShowUpload(true) }}
                style={{ padding: '28px 26px', border: `1px solid ${hoveredFeature === i ? f.color + '40' : 'rgba(255,255,255,0.05)'}`, borderRadius: '8px', background: hoveredFeature === i ? f.color + '08' : 'rgba(255,255,255,0.015)', transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)', transform: hoveredFeature === i ? 'translateY(-5px)' : 'translateY(0)', cursor: f.title === 'Live MRI Upload' ? 'pointer' : 'default', height: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <span style={{ fontSize: '26px' }}>{f.icon}</span>
                  <span style={{ fontSize: '9px', fontWeight: '700', color: f.color, border: `1px solid ${f.color}44`, padding: '3px 8px', borderRadius: '20px', letterSpacing: '1px' }}>{lang === 'fr' ? f.tagFr : f.tag}</span>
                </div>
                <p style={{ fontSize: '15px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>{lang === 'fr' ? f.titleFr : f.title}</p>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.38)', lineHeight: '1.7' }}>{lang === 'fr' ? f.descFr : f.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* BEYOND ACCURACY */}
      <section style={{ padding: isMobile ? '80px 20px 100px' : '100px 48px 140px', position: 'relative', zIndex: 1, borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <FadeUp>
          <p style={{ fontSize: '10px', color: '#00B4D8', letterSpacing: '5px', marginBottom: '14px', fontWeight: '700', textAlign: 'center' }}>{t.finding}</p>
          <h2 style={{ fontSize: isMobile ? 'clamp(36px, 10vw, 64px)' : 'clamp(40px, 7vw, 88px)', fontWeight: '900', textAlign: 'center', letterSpacing: '-3px', marginBottom: '72px', lineHeight: '0.9', color: '#fff' }}>
            {lang === 'fr' ? 'Au-Delà de la Précision' : 'Beyond Accuracy'}
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div style={{ maxWidth: '800px', margin: '0 auto 60px', padding: isMobile ? '36px 24px' : '48px', background: 'rgba(230,57,70,0.03)', border: '1px solid rgba(230,57,70,0.14)', borderRadius: '8px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 50% -10%, rgba(230,57,70,0.1), transparent 55%)' }} />
            <div style={{ fontSize: isMobile ? 'clamp(60px, 18vw, 100px)' : 'clamp(72px, 12vw, 140px)', fontWeight: '900', color: '#E63946', letterSpacing: '-5px', lineHeight: '1', marginBottom: '18px', animation: 'subtleGlow 3s ease-in-out infinite' }}>33×</div>
            <p style={{ fontSize: isMobile ? '13px' : '15px', color: 'rgba(255,255,255,0.5)', maxWidth: '460px', margin: '0 auto', lineHeight: '1.85' }}>{t.finding33x}</p>
          </div>
        </FadeUp>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fit, minmax(215px, 1fr))', gap: '10px', maxWidth: '960px', margin: '0 auto' }}>
          {groups.map((g, i) => (
            <FadeUp key={g.group} delay={i * 0.08}>
              <div style={{ padding: '20px 16px', border: `1px solid ${g.color}18`, borderRadius: '6px', background: `${g.color}04`, transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)', cursor: 'default', height: '100%' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = g.color + '44'; e.currentTarget.style.background = g.color + '0C'; e.currentTarget.style.transform = 'translateY(-5px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = g.color + '18'; e.currentTarget.style.background = g.color + '04'; e.currentTarget.style.transform = 'translateY(0)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <span style={{ fontSize: '28px', fontWeight: '900', color: g.color, lineHeight: 1 }}>G{g.group}</span>
                  {g.badge && <span style={{ fontSize: '8px', fontWeight: '800', color: g.color, border: `1px solid ${g.color}55`, padding: '2px 6px', borderRadius: '2px', letterSpacing: '0.5px' }}>
                    {g.badgeType === 'winner' ? (lang === 'fr' ? '✓ GAGNANT' : '✓ WINNER') : '✗ DANGER'}
                  </span>}
                </div>
                <p style={{ fontSize: '11px', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>{t.groupLabels[i]}</p>
                <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.28)', lineHeight: '1.5', marginBottom: '12px' }}>{t.groupDescs[i]}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '10px' }}>
                  {[[t.statLabels[0], g.acc, '#fff'], [t.statLabels[1], g.ece, g.group === 'C' ? '#E63946' : '#10B981'], [t.statLabels[2], g.loss, g.group === 'C' ? '#E63946' : 'rgba(255,255,255,0.45)']].map(([label, val, col]) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.25)' }}>{label}</span>
                      <span style={{ fontSize: '10px', fontWeight: '700', color: col }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.2}>
          <div style={{ maxWidth: '600px', margin: '60px auto 0', textAlign: 'center', padding: '36px 28px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
            <p style={{ fontSize: isMobile ? '14px' : '16px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.9', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>{t.quote}</p>
          </div>
        </FadeUp>
      </section>

      {/* LANGUAGE TOGGLE */}
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
            padding: '10px 18px', background: lang === l ? '#00B4D8' : 'transparent',
            color: lang === l ? '#05080F' : 'rgba(255,255,255,0.4)',
            border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: '800',
            letterSpacing: '1.5px', transition: 'all 0.25s ease', fontFamily: 'inherit'
          }}>
            {l.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  )
}