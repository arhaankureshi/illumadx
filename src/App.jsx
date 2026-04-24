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
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(36px)', transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s` }}>
      {children}
    </div>
  )
}

const CLASS_COLORS = { glioma: '#E63946', meningioma: '#FFB703', notumor: '#10B981', pituitary: '#00B4D8' }

const T = {
  en: {
    live:'LIVE CLINICAL AI SYSTEM', tagline:'BECAUSE DIAGNOSIS STARTS WITH CLARITY',
    desc:'40 trained deep learning models · GradCAM++ interpretability · Statistical validation across 4 augmentation strategies',
    upload:'UPLOAD MRI', research:'View Research', thesis:'THE THESIS', finding:'THE FINDING', features:'WHAT ILLUMADX DOES',
    hawkingLine1:'"The greatest enemy of knowledge is not ignorance', hawkingLine2:'it is the illusion of knowledge."',
    hawkingBody:'A model scoring 99.69% accuracy can still be completely wrong about what it sees. This research proves it — and builds the system that fixes it.',
    quote:'"Accuracy measures outcomes. GradCAM++ measures reasoning. A model that looks at the wrong region will fail silently the moment it sees a scan from a different hospital."',
    featuresTitle:'A complete clinical AI platform', featuresDesc:'Not just a model. A deployable diagnostic system built for real clinical environments.',
    finding33x:'Group C had 33× higher training loss than Group B with nearly identical accuracy. Same score. Completely different trustworthiness.',
    groupLabels:['No Augmentation','Basic Augmentation','Extreme Augmentation','Domain-Specific'],
    groupDescs:['Control — baseline performance','Flip, rotation 15°, brightness jitter','Illusion of knowledge — looks fine, fails silently','Expected winner — hypothesis rejected'],
    statLabels:['Accuracy','ECE','Epoch 50 Loss'],
    peakAcc:'Peak Accuracy', lossGap:'Loss Gap Detected', modelsTrained:'Models Trained', patients:'Patients Underserved Globally',
  },
  fr: {
    live:'SYSTÈME IA CLINIQUE EN DIRECT', tagline:'PARCE QUE LE DIAGNOSTIC COMMENCE PAR LA CLARTÉ',
    desc:"40 modèles d'apprentissage profond · Interprétabilité GradCAM++ · Validation statistique sur 4 stratégies",
    upload:'TÉLÉCHARGER IRM', research:'Voir la Recherche', thesis:'LA THÈSE', finding:'LA DÉCOUVERTE', features:'CE QUE FAIT ILLUMADX',
    hawkingLine1:'"Le plus grand ennemi de la connaissance n\'est pas l\'ignorance', hawkingLine2:"c'est l'illusion de la connaissance.\"",
    hawkingBody:"Un modèle avec 99,69% de précision peut encore être complètement erroné dans ce qu'il observe. Cette recherche le prouve — et construit le système qui le corrige.",
    quote:'"La précision mesure les résultats. GradCAM++ mesure le raisonnement. Un modèle qui regarde la mauvaise région échouera silencieusement dès qu\'il verra un scan d\'un autre hôpital."',
    featuresTitle:'Une plateforme IA clinique complète', featuresDesc:'Pas seulement un modèle. Un système diagnostique déployable conçu pour les environnements cliniques réels.',
    finding33x:'Le Groupe C avait une perte 33× plus élevée que le Groupe B avec une précision presque identique.',
    groupLabels:['Aucune Augmentation','Augmentation Basique','Augmentation Extrême','Spécifique au Domaine'],
    groupDescs:['Contrôle — performance de référence','Retournement, rotation 15°, variation de luminosité','Illusion de connaissance — semble correct, échoue silencieusement','Gagnant attendu — hypothèse rejetée'],
    statLabels:['Précision','ECE','Perte Époque 50'],
    peakAcc:'Précision Maximale', lossGap:'Écart de Perte', modelsTrained:'Modèles Entraînés', patients:'Patients Non Desservis',
  }
}

const NAV = [
  { id:'system',    label:'System',          labelFr:'Système',       desc:'Live AI Demo',        descFr:'Démo IA en direct',    color:'#00B4D8', bg:'rgba(0,180,216,0.1)',   border:'rgba(0,180,216,0.35)',   icon:'⚡', mobile:true },
  { id:'patients',  label:'Patient Records', labelFr:'Dossiers',      desc:'EHR / Connect Care',  descFr:'DSE / Connect Care',   color:'#10B981', bg:'rgba(16,185,129,0.08)', border:'rgba(16,185,129,0.25)', icon:'🗂', mobile:true },
  { id:'pdf',       label:'PDF Report',      labelFr:'Rapport PDF',   desc:'Diagnostic Export',   descFr:'Export Diagnostique',  color:'#FFB703', bg:'rgba(255,183,3,0.08)',  border:'rgba(255,183,3,0.25)',  icon:'📄', mobile:true },
  { id:'research',  label:'Research',        labelFr:'Recherche',     desc:'Findings & Stats',    descFr:'Résultats & Stats',    color:'rgba(255,255,255,0.8)', bg:'rgba(255,255,255,0.04)', border:'rgba(255,255,255,0.12)', icon:'📊', mobile:false },
  { id:'ethics',    label:'Ethics',          labelFr:'Éthique',       desc:'Health Canada',       descFr:'Santé Canada',         color:'rgba(255,255,255,0.8)', bg:'rgba(255,255,255,0.04)', border:'rgba(255,255,255,0.12)', icon:'⚖', mobile:false },
]

const FEATURES = [
  { icon:'⬆', title:'Live MRI Upload', titleFr:'Téléchargement IRM', desc:'Upload any brain MRI scan. IllumaDX runs real-time inference across trained model groups instantly.', descFr:"Téléchargez n'importe quelle IRM cérébrale pour une inférence en temps réel.", color:'#00B4D8', tag:'REAL-TIME', tagFr:'TEMPS RÉEL', page:'system' },
  { icon:'🧠', title:'GradCAM++ Heatmaps', titleFr:'Cartes GradCAM++', desc:'See exactly what the AI is looking at. Group B + Group D heatmaps side-by-side + consensus overlay.', descFr:"Voyez exactement ce que l'IA regarde. Cartes de chaleur côte à côte + superposition consensus.", color:'#10B981', tag:'INTERPRETABILITY', tagFr:'INTERPRÉTABILITÉ', page:'system' },
  { icon:'📄', title:'Diagnostic PDF Export', titleFr:'Export PDF Diagnostique', desc:'Auto-generated clinical report with prediction, heatmap, benchmark stats, and clinical disclaimer.', descFr:'Rapport clinique auto-généré avec prédiction, carte de chaleur et statistiques.', color:'#FFB703', tag:'CLINICAL', tagFr:'CLINIQUE', page:'pdf' },
  { icon:'🗂', title:'EHR Integration', titleFr:'Intégration DSE', desc:'Mock Connect Care–style patient profiles. Run the AI, save the diagnostic PDF to their record.', descFr:'Profils patients style Connect Care. Lancez l\'IA, sauvegardez le PDF.', color:'#00B4D8', tag:'PATIENT RECORDS', tagFr:'DOSSIERS PATIENTS', page:'patients' },
  { icon:'🛡', title:'Confidence Gate', titleFr:'Seuil de Confiance', desc:'If model confidence falls below 60%, IllumaDX flags the scan as invalid rather than guessing.', descFr:"Si la confiance tombe sous 60%, IllumaDX signale le scan comme invalide.", color:'#E63946', tag:'SAFETY', tagFr:'SÉCURITÉ', page:'system' },
  { icon:'⚖', title:'Ethics & Compliance', titleFr:'Éthique et Conformité', desc:'Health Canada regulatory pathway, AI bias analysis, data privacy framework, and clinical limitations.', descFr:'Voie réglementaire Santé Canada, analyse des biais IA, cadre de confidentialité.', color:'#FFB703', tag:'REGULATORY', tagFr:'RÉGLEMENTAIRE', page:'ethics' },
]

const GROUPS = [
  { g:'A', color:'#00B4D8', acc:'99.48%', pm:'±0.33%', ece:'0.0041', loss:'~0.025', auc:'0.9996', sens:'99.51%', spec:'99.82%', f1:'99.50%' },
  { g:'B', color:'#10B981', acc:'99.69%', pm:'±0.14%', ece:'0.0030', loss:'~0.003', auc:'0.9996', sens:'99.72%', spec:'99.90%', f1:'99.71%', winner:true },
  { g:'C', color:'#E63946', acc:'98.66%', pm:'±0.29%', ece:'0.0082', loss:'~0.100', auc:'0.9995', sens:'98.72%', spec:'99.55%', f1:'98.70%', danger:true },
  { g:'D', color:'#FFB703', acc:'99.68%', pm:'±0.18%', ece:'0.0030', loss:'~0.050', auc:'0.9997', sens:'99.70%', spec:'99.89%', f1:'99.70%' },
]

const INITIAL_PATIENTS = [
  { id:'AHS-10042', name:'James Okafor', age:54, dob:'1970-03-12', sex:'Male', bloodType:'O+', physician:'Dr. R. Patel', facility:'Northern Lights Regional Hospital', dept:'Neurology', scanDate:'2026-04-10', status:'Awaiting Analysis', statusColor:'#FFB703', allergies:['Penicillin','Sulfa drugs'], medications:['Metformin 500mg','Lisinopril 10mg'], history:'Presented with recurring headaches and vision disturbances for 3 weeks. MRI ordered after CT showed possible mass. Non-smoker with Type 2 diabetes and hypertension. Family history of glioblastoma (father, deceased 2019).', scanHistory:[{ date:'2026-01-15', type:'MRI Brain', result:'No abnormality detected', provider:'Dr. R. Patel', notes:'Routine screening. No acute findings.' },{ date:'2025-08-22', type:'CT Head', result:'Mild cortical atrophy noted', provider:'Dr. M. Wong', notes:'Patient complained of intermittent dizziness.' },{ date:'2025-03-10', type:'MRI Brain', result:'No abnormality detected', provider:'Dr. R. Patel', notes:'Annual surveillance given family history.' }], latestResult:null },
  { id:'AHS-10078', name:'Sarah Mahmoud', age:38, dob:'1987-09-24', sex:'Female', bloodType:'A-', physician:'Dr. L. Chen', facility:'Northern Lights Regional Hospital', dept:'Oncology', scanDate:'2026-04-14', status:'Scan Complete', statusColor:'#E63946', allergies:['Latex','Codeine'], medications:['Dexamethasone 4mg','Ondansetron 8mg','Levetiracetam 500mg'], history:'Post-surgical resection follow-up for Grade II meningioma (right frontal lobe, resected Nov 2025). Currently receiving adjuvant radiotherapy. Reports fatigue, intermittent nausea, mild cognitive changes.', scanHistory:[{ date:'2026-04-14', type:'MRI — IllumaDX AI', result:'MENINGIOMA — 88.3% (IllumaDX)', provider:'IllumaDX AI System', notes:'GradCAM++ analysis. GroupB ResNet-18. Meningioma confirmed.' },{ date:'2026-02-28', type:'MRI Brain + Contrast', result:'Meningioma — post-resection, no recurrence', provider:'Dr. L. Chen', notes:'Surgical cavity stable.' },{ date:'2025-11-12', type:'Post-op MRI', result:'Meningioma — resection confirmed', provider:'Dr. L. Chen', notes:'Gross total resection. Small residual enhancement.' },{ date:'2025-10-02', type:'MRI Brain', result:'Meningioma detected — surgical consult', provider:'Dr. A. Singh', notes:'Right frontal lobe mass 2.8cm. Grade II confirmed.' },{ date:'2025-06-18', type:'MRI Brain', result:'Incidental finding — right frontal hyperdensity', provider:'Dr. R. Patel', notes:'First detection. Follow-up recommended.' }], latestResult:{ prediction:'meningioma', confidence:0.8831, probabilities:{ glioma:0.052, meningioma:0.8831, notumor:0.031, pituitary:0.034 }, heatmap_b:null, heatmap_d:null, heatmap_consensus:null } },
  { id:'AHS-10113', name:'David Tremblay', age:67, dob:'1958-11-05', sex:'Male', bloodType:'B+', physician:'Dr. A. Singh', facility:'Northern Lights Regional Hospital', dept:'Neurology', scanDate:'2026-04-16', status:'Scan Complete', statusColor:'#E63946', allergies:['NSAIDs'], medications:['Cabergoline 0.5mg','Atorvastatin 20mg','Aspirin 81mg'], history:'Known pituitary adenoma (macroadenoma, 1.4cm) under active surveillance. On cabergoline for prolactin suppression. Stable 18 months. Retired teacher. Visual field testing normal last visit.', scanHistory:[{ date:'2026-04-16', type:'MRI — IllumaDX AI', result:'PITUITARY — 91.6% (IllumaDX)', provider:'IllumaDX AI System', notes:'GradCAM++ analysis. GroupB ResNet-18. Pituitary adenoma confirmed.' },{ date:'2025-12-10', type:'MRI Pituitary Protocol', result:'Pituitary adenoma — stable, no growth', provider:'Dr. A. Singh', notes:'Stable at 1.4cm.' },{ date:'2025-08-03', type:'MRI Pituitary Protocol', result:'Pituitary adenoma — mild enlargement', provider:'Dr. A. Singh', notes:'Growth 1.2cm→1.4cm. Cabergoline increased.' },{ date:'2025-02-15', type:'MRI Brain', result:'Pituitary adenoma — macroadenoma 1.2cm', provider:'Dr. M. Wong', notes:'Initial detection incidental to headache workup.' }], latestResult:{ prediction:'pituitary', confidence:0.9156, probabilities:{ glioma:0.031, meningioma:0.028, notumor:0.025, pituitary:0.9156 }, heatmap_b:null, heatmap_d:null, heatmap_consensus:null } },
  { id:'AHS-10157', name:'Priya Nair', age:29, dob:'1996-07-18', sex:'Female', bloodType:'AB+', physician:'Dr. R. Patel', facility:'Northern Lights Regional Hospital', dept:'Emergency Neurology', scanDate:'2026-04-17', status:'Awaiting Analysis', statusColor:'#FFB703', allergies:['None known'], medications:['Levetiracetam 1000mg','Acetaminophen PRN'], history:'Acute emergency presentation. Sudden onset severe headache followed by tonic-clonic seizure in ER. No prior neurological history. GCS 14 on admission. CT showing possible right temporal mass — urgent MRI ordered.', scanHistory:[{ date:'2026-04-17', type:'CT Head (Emergency)', result:'Hyperdense lesion right temporal — MRI urgent', provider:'Dr. R. Patel', notes:'Urgent CT. Possible mass effect. MRI stat. Neurosurgery standby.' }], latestResult:null },
  { id:'AHS-10201', name:'Marc Bouchard', age:45, dob:'1980-02-28', sex:'Male', bloodType:'O-', physician:'Dr. L. Chen', facility:'Northern Lights Regional Hospital', dept:'Neurology', scanDate:'2026-04-18', status:'Scan Complete', statusColor:'#10B981', allergies:['Contrast dye (mild — premedicate)'], medications:['Loratadine 10mg','Vitamin D 2000IU'], history:'Annual surveillance for glioma family history risk (mother — GBM, deceased 2022; uncle — glioma, 2019). Asymptomatic. Software engineer. Enrolled in Northern Lights Cancer Screening Registry.', scanHistory:[{ date:'2026-04-18', type:'MRI — IllumaDX AI', result:'NO TUMOR — 94.2% (IllumaDX)', provider:'IllumaDX AI System', notes:'GradCAM++ analysis. GroupB ResNet-18. No tumor detected.' },{ date:'2025-04-10', type:'MRI Brain + Contrast', result:'No abnormality detected', provider:'Dr. L. Chen', notes:'Annual surveillance. Stable.' },{ date:'2024-04-08', type:'MRI Brain + Contrast', result:'No abnormality detected', provider:'Dr. L. Chen', notes:'Annual surveillance. Normal.' },{ date:'2023-04-14', type:'MRI Brain', result:'No abnormality detected', provider:'Dr. M. Wong', notes:'First surveillance scan after maternal diagnosis.' }], latestResult:{ prediction:'notumor', confidence:0.9421, probabilities:{ glioma:0.021, meningioma:0.018, notumor:0.9421, pituitary:0.019 }, heatmap_b:null, heatmap_d:null, heatmap_consensus:null } },
]

// ─── SHARED STYLES ─────────────────────────────────────────────────────────
const BASE_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Bebas+Neue&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  @keyframes ripple{0%{box-shadow:0 0 0 0 rgba(16,185,129,0.5)}70%{box-shadow:0 0 0 14px rgba(16,185,129,0)}100%{box-shadow:0 0 0 0 rgba(16,185,129,0)}}
  @keyframes scrollline{0%,100%{opacity:0.2}50%{opacity:0.7}}
  @keyframes subtleGlow{0%,100%{text-shadow:0 0 60px rgba(230,57,70,0.2)}50%{text-shadow:0 0 100px rgba(230,57,70,0.5)}}
  @keyframes fadeSlideIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
  @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  .nav-btn:hover .nav-tooltip{opacity:1!important;transform:translateX(-50%) translateY(0)!important}
  ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(0,180,216,0.2);border-radius:2px}
  input:focus,textarea:focus{border-color:rgba(0,180,216,0.5)!important;outline:none}
`

const LANDING_CSS = `
  .mono{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-variant-numeric:tabular-nums}
  .tnum{font-variant-numeric:tabular-nums}
  .nav-link{position:relative;display:inline-block}
  .nav-link::after{content:'';position:absolute;left:0;right:0;bottom:-5px;height:1px;background:currentColor;transform:scaleX(0);transform-origin:left;transition:transform .32s cubic-bezier(0.16,1,0.3,1)}
  .nav-link:hover::after{transform:scaleX(1)}
  .feat-card{position:relative;overflow:hidden;isolation:isolate;transition:border-color .45s cubic-bezier(0.16,1,0.3,1),background .45s cubic-bezier(0.16,1,0.3,1),transform .45s cubic-bezier(0.16,1,0.3,1)}
  .feat-card::before{content:'';position:absolute;inset:0;background:radial-gradient(220px circle at var(--mx,50%) var(--my,50%),var(--tint,rgba(0,180,216,0.22)),transparent 55%);opacity:0;transition:opacity .35s;pointer-events:none;z-index:0}
  .feat-card::after{content:'';position:absolute;top:0;left:0;width:0;height:1px;background:var(--ac);transition:width .55s cubic-bezier(0.16,1,0.3,1);z-index:2}
  .feat-card:hover{transform:translateY(-2px)}
  .feat-card:hover::before{opacity:1}
  .feat-card:hover::after{width:100%}
  .feat-card > *{position:relative;z-index:1}
  .grp-card{position:relative;overflow:hidden;isolation:isolate}
  .grp-card::before{content:'';position:absolute;inset:0;background:radial-gradient(200px circle at var(--mx,50%) var(--my,50%),var(--tint,rgba(0,180,216,0.18)),transparent 55%);opacity:0;transition:opacity .35s;pointer-events:none;z-index:0}
  .grp-card:hover::before{opacity:1}
  .grp-card > *{position:relative;z-index:1}
  .cta-primary{position:relative;overflow:hidden;isolation:isolate;transition:transform .25s ease,box-shadow .25s ease}
  .cta-primary::before{content:'';position:absolute;inset:0;background:radial-gradient(110px circle at var(--mx,50%) var(--my,50%),rgba(255,255,255,0.42),transparent 55%);opacity:0;transition:opacity .22s;pointer-events:none;z-index:0}
  .cta-primary:hover::before{opacity:1}
  .cta-primary:hover{box-shadow:0 0 56px rgba(0,180,216,0.55)}
  .cta-primary:active{transform:scale(0.96)!important}
  .cta-primary > *{position:relative;z-index:1}
  .cta-ghost{position:relative;overflow:hidden;isolation:isolate;transition:color .25s ease,border-color .25s ease,background .25s ease}
  .cta-ghost::before{content:'';position:absolute;inset:0;background:radial-gradient(160px circle at var(--mx,50%) var(--my,50%),rgba(0,180,216,0.22),transparent 60%);opacity:0;transition:opacity .3s;pointer-events:none;z-index:0}
  .cta-ghost:hover::before{opacity:1}
  .cta-ghost:hover{color:#fff;border-color:rgba(255,255,255,0.28)}
  .cta-ghost:active{transform:scale(0.98)}
  .cta-ghost > *{position:relative;z-index:1}
  .cta-hero{animation:heroGlow 3.8s ease-in-out infinite}
  .cta-hero::after{content:'';position:absolute;top:0;left:-55%;width:36%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent);animation:shimmerSweep 4.2s ease-in-out 1.2s infinite;pointer-events:none;z-index:0}
  .cta-hero:hover{animation:none}
  @keyframes heroGlow{0%,100%{box-shadow:0 0 28px rgba(0,180,216,0.22)}50%{box-shadow:0 0 60px rgba(0,180,216,0.58)}}
  @keyframes shimmerSweep{0%{left:-55%}55%{left:120%}100%{left:120%}}
  .stat-col{position:relative}
  .stat-col + .stat-col::before{content:'';position:absolute;left:0;top:14%;bottom:14%;width:1px;background:rgba(255,255,255,0.07)}
  @media(max-width:640px){.stat-col:nth-child(3)::before{display:none}}
  .wm-letter{display:inline-block;opacity:0;will-change:transform,opacity}
  .wm-letter.in{animation:letterUp 0.95s cubic-bezier(0.16,1,0.3,1) forwards}
  .wm-letter.in.glow{animation:letterUp 0.95s cubic-bezier(0.16,1,0.3,1) forwards, dxGlow 5s ease-in-out 1.6s infinite}
  @keyframes letterUp{from{opacity:0;transform:translateY(38px)}to{opacity:1;transform:translateY(0)}}
  @keyframes dxGlow{0%,100%{text-shadow:0 0 32px rgba(0,180,216,0.22)}50%{text-shadow:0 0 72px rgba(0,180,216,0.55)}}
  @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
  .lang-pill{display:flex;align-items:center;border:1px solid rgba(255,255,255,0.08);border-radius:3px;overflow:hidden;background:rgba(255,255,255,0.02)}
  .lang-pill button{padding:6px 10px;border:none;cursor:pointer;font-size:10px;font-weight:800;letter-spacing:1.8px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;transition:all .2s}
  .footer-link{cursor:pointer;font-size:12px;color:rgba(255,255,255,0.65);text-decoration:none;transition:color .2s,transform .2s;display:inline-flex;align-items:center;gap:6px;font-weight:400}
  .footer-link:hover{color:#00B4D8}
  .scan-intro{position:fixed;left:0;right:0;top:-4px;height:2px;background:linear-gradient(90deg,transparent 0%,rgba(0,180,216,0.3) 20%,#00B4D8 45%,#B0F4FF 50%,#00B4D8 55%,rgba(0,180,216,0.3) 80%,transparent 100%);box-shadow:0 0 24px #00B4D8,0 0 48px rgba(0,180,216,0.5);z-index:400;pointer-events:none;animation:scanIntro 1.8s cubic-bezier(0.65,0,0.35,1) 0.15s forwards;will-change:transform,opacity;mix-blend-mode:screen}
  @keyframes scanIntro{0%{transform:translateY(0);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translateY(100vh);opacity:0}}
  .scroll-progress{position:fixed;top:0;left:0;right:0;height:2px;z-index:300;pointer-events:none;background:rgba(255,255,255,0.03)}
  .scroll-progress > span{display:block;height:100%;background:linear-gradient(90deg,#00B4D8 0%,#10B981 100%);box-shadow:0 0 8px rgba(0,180,216,0.6);transition:width .08s linear}
  @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:0.01ms!important;animation-iteration-count:1!important;transition-duration:0.01ms!important}.scan-intro{display:none}}
`

const Icon = ({ name, size = 16, stroke = 1.5 }) => {
  const common = { width:size, height:size, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', strokeWidth:stroke, strokeLinecap:'round', strokeLinejoin:'round', style:{ flexShrink:0, display:'block' } }
  switch (name) {
    case 'upload':   return <svg {...common}><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/><path d="M4 21h16"/></svg>
    case 'brain':    return <svg {...common}><path d="M12 5a3 3 0 0 0-5.9-.5A3 3 0 0 0 4 9.5a3 3 0 0 0 .5 5.5A3 3 0 0 0 9 19a3 3 0 0 0 3-1"/><path d="M12 5a3 3 0 0 1 5.9-.5A3 3 0 0 1 20 9.5a3 3 0 0 1-.5 5.5A3 3 0 0 1 15 19a3 3 0 0 1-3-1"/><path d="M12 5v14"/></svg>
    case 'file':     return <svg {...common}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h6"/></svg>
    case 'folder':   return <svg {...common}><path d="M3 7a2 2 0 0 1 2-2h4l2 3h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/></svg>
    case 'shield':   return <svg {...common}><path d="M12 3l8 3v6c0 4.5-3.2 8.3-8 9-4.8-.7-8-4.5-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/></svg>
    case 'scale':    return <svg {...common}><path d="M12 3v18"/><path d="M6 6h12"/><path d="M4 21h16"/><path d="M6 6l-3 7h6l-3-7z"/><path d="M18 6l-3 7h6l-3-7z"/></svg>
    case 'arrow':    return <svg {...common}><path d="M5 12h14"/><path d="M13 5l7 7-7 7"/></svg>
    default: return null
  }
}

const FEATURE_ICONS = ['upload','brain','file','folder','shield','scale']

function NodeNetwork() {
  const canvasRef = useRef(null)
  const parallaxRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0, h = 0, raf = 0

    const resize = () => {
      w = window.innerWidth; h = window.innerHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e) => {
      parallaxRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      parallaxRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    const mobile = window.innerWidth < 768
    // 3 depth layers: 0=far, 1=mid, 2=near
    const depthProps = [
      { size:[0.6,1.1], speed:0.09, opacity:0.4,  linkDist:130, parallax:-6, count:mobile?10:22 },
      { size:[1.0,1.6], speed:0.16, opacity:0.7,  linkDist:160, parallax:0,  count:mobile?14:26 },
      { size:[1.6,2.5], speed:0.24, opacity:0.95, linkDist:175, parallax:12, count:mobile?8:12  },
    ]
    const layers = depthProps.map(p => Array.from({ length: p.count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * p.speed,
      vy: (Math.random() - 0.5) * p.speed,
      r: p.size[0] + Math.random() * (p.size[1] - p.size[0]),
      p: Math.random() * Math.PI * 2,
    })))

    const waves = []; let lastWave = 0
    const packets = []; let lastPacket = 0
    const beams = []; let lastBeam = 0

    const frame = (tt) => {
      ctx.clearRect(0, 0, w, h)
      const px = parallaxRef.current.x
      const py = parallaxRef.current.y

      // cross-screen bright beam between two far-apart near-layer nodes (~every 9s)
      if (!reduced && tt - lastBeam > 8500 && Math.random() > 0.3) {
        const near = layers[2]
        const a = near[Math.floor(Math.random() * near.length)]
        let b = null, far = 0
        for (const n of near) {
          if (n === a) continue
          const dx = n.x - a.x, dy = n.y - a.y
          const d2 = dx*dx + dy*dy
          if (d2 > far) { far = d2; b = n }
        }
        if (b) beams.push({ a, b, t: 0 })
        lastBeam = tt
      }
      for (let i = beams.length - 1; i >= 0; i--) {
        const bm = beams[i]
        bm.t += 0.02
        if (bm.t >= 1) { beams.splice(i, 1); continue }
        const ax = bm.a.x + px * depthProps[2].parallax, ay = bm.a.y + py * depthProps[2].parallax
        const bx = bm.b.x + px * depthProps[2].parallax, by = bm.b.y + py * depthProps[2].parallax
        // Grow then fade
        const grow = Math.min(1, bm.t * 2.5)
        const fade = bm.t < 0.4 ? 1 : 1 - (bm.t - 0.4) / 0.6
        const tx = ax + (bx - ax) * grow, ty = ay + (by - ay) * grow
        ctx.strokeStyle = `rgba(120,230,255,${0.7 * fade})`
        ctx.lineWidth = 1.4
        ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(tx, ty); ctx.stroke()
        // outer glow
        ctx.strokeStyle = `rgba(0,180,216,${0.25 * fade})`
        ctx.lineWidth = 4
        ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(tx, ty); ctx.stroke()
        // leading dot
        ctx.beginPath(); ctx.arc(tx, ty, 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(160,240,255,${fade})`; ctx.fill()
      }

      // spawn pulse waves from a near-layer node
      if (!reduced && tt - lastWave > 2400 && Math.random() > 0.4) {
        const near = layers[2]
        const o = near[Math.floor(Math.random() * near.length)]
        waves.push({ x: o.x + px * depthProps[2].parallax, y: o.y + py * depthProps[2].parallax, r: 0, life: 1 })
        lastWave = tt
      }
      for (let i = waves.length - 1; i >= 0; i--) {
        const wv = waves[i]
        wv.r += 1.6; wv.life -= 0.01
        if (wv.life <= 0) { waves.splice(i, 1); continue }
        ctx.beginPath()
        ctx.arc(wv.x, wv.y, wv.r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(0,180,216,${wv.life * 0.28})`
        ctx.lineWidth = 0.9
        ctx.stroke()
      }

      // spawn data packet along a nearby link (mid or near layer)
      if (!reduced && tt - lastPacket > 650 && Math.random() > 0.3) {
        const li = Math.random() > 0.5 ? 1 : 2
        const layer = layers[li]
        const a = layer[Math.floor(Math.random() * layer.length)]
        let b = null, best = Infinity
        for (const n of layer) {
          if (n === a) continue
          const dx = n.x - a.x, dy = n.y - a.y
          const d2 = dx*dx + dy*dy
          if (d2 < best && d2 < 220*220) { best = d2; b = n }
        }
        if (b) packets.push({ a, b, li, t: 0 })
        lastPacket = tt
      }
      for (let i = packets.length - 1; i >= 0; i--) {
        const pk = packets[i]
        pk.t += 0.022
        if (pk.t >= 1) { packets.splice(i, 1); continue }
        const px2 = depthProps[pk.li].parallax
        const ax = pk.a.x + px * px2, ay = pk.a.y + py * px2
        const bx = pk.b.x + px * px2, by = pk.b.y + py * px2
        const nx = ax + (bx - ax) * pk.t, ny = ay + (by - ay) * pk.t
        ctx.beginPath(); ctx.arc(nx, ny, 6, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0,180,216,0.22)'; ctx.fill()
        ctx.beginPath(); ctx.arc(nx, ny, 2.4, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(120,230,255,0.9)'; ctx.fill()
      }

      // draw each layer back-to-front with its own parallax offset
      layers.forEach((layer, li) => {
        const prop = depthProps[li]
        const ox = px * prop.parallax
        const oy = py * prop.parallax
        // advance
        for (const n of layer) {
          n.x += n.vx; n.y += n.vy; n.p += 0.014
          if (n.x < 0 || n.x > w) n.vx *= -1
          if (n.y < 0 || n.y > h) n.vy *= -1
        }
        // links within layer
        const ld = prop.linkDist
        for (let i = 0; i < layer.length; i++) {
          for (let j = i + 1; j < layer.length; j++) {
            const dx = layer[i].x - layer[j].x
            const dy = layer[i].y - layer[j].y
            const d2 = dx*dx + dy*dy
            if (d2 < ld*ld) {
              const dist = Math.sqrt(d2)
              const a = (1 - dist / ld) * 0.2 * prop.opacity
              ctx.strokeStyle = `rgba(0,180,216,${a})`
              ctx.lineWidth = 0.4 + li * 0.22
              ctx.beginPath()
              ctx.moveTo(layer[i].x + ox, layer[i].y + oy)
              ctx.lineTo(layer[j].x + ox, layer[j].y + oy)
              ctx.stroke()
            }
          }
        }
        // nodes
        for (const n of layer) {
          const pulse = 0.6 + 0.35 * Math.sin(n.p)
          ctx.beginPath()
          ctx.arc(n.x + ox, n.y + oy, n.r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0,180,216,${pulse * prop.opacity})`
          ctx.fill()
          // near-layer halo
          if (li === 2) {
            ctx.beginPath()
            ctx.arc(n.x + ox, n.y + oy, n.r * 2.6, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(0,180,216,${pulse * 0.08})`
            ctx.fill()
          }
        }
      })

      if (!reduced) raf = requestAnimationFrame(frame)
    }
    frame(0)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])
  return <canvas ref={canvasRef} style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', opacity:0.78 }} />
}

const tintMove = (e) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', (e.clientX - r.left) + 'px')
  e.currentTarget.style.setProperty('--my', (e.clientY - r.top) + 'px')
}

const TELEMETRY = [
  { label:'BACKEND',          labelFr:'BACKEND',             value:'HuggingFace Spaces' },
  { label:'MODEL',            labelFr:'MODÈLE',              value:'ResNet-18 · PyTorch' },
  { label:'INTERPRETABILITY', labelFr:'INTERPRÉTABILITÉ',   value:'GradCAM++ Heatmaps' },
  { label:'CLASSES',          labelFr:'CLASSES',             value:'Glioma · Meningioma · Pituitary · Notumor' },
  { label:'CONFIDENCE GATE',  labelFr:'SEUIL DE CONFIANCE',  value:'≥ 60% threshold' },
  { label:'VALIDATION',       labelFr:'VALIDATION',          value:'4 augmentation strategies' },
]

function Telemetry({ isFr }) {
  const [i, setI] = useState(0)
  const [shown, setShown] = useState(true)
  useEffect(() => {
    const id = setInterval(() => {
      setShown(false)
      setTimeout(() => { setI(prev => (prev + 1) % TELEMETRY.length); setShown(true) }, 260)
    }, 3400)
    return () => clearInterval(id)
  }, [])
  const item = TELEMETRY[i]
  return (
    <div className="mono" style={{ display:'inline-flex', alignItems:'center', gap:'14px', fontSize:'10px', letterSpacing:'2px', textTransform:'uppercase', whiteSpace:'nowrap', padding:'8px 16px', border:'1px solid rgba(0,180,216,0.14)', borderRadius:'3px', background:'rgba(0,180,216,0.03)' }}>
      <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#10B981', animation:'ripple 2s infinite', flexShrink:0 }} />
      <span style={{ opacity:shown?1:0, transform:shown?'translateY(0)':'translateY(3px)', transition:'opacity .26s cubic-bezier(0.16,1,0.3,1), transform .26s cubic-bezier(0.16,1,0.3,1)' }}>
        <span style={{ color:'rgba(255,255,255,0.4)' }}>{isFr?item.labelFr:item.label}</span>
        <span style={{ color:'rgba(255,255,255,0.2)', margin:'0 10px' }}>·</span>
        <span style={{ color:'#00B4D8' }}>{item.value}</span>
      </span>
    </div>
  )
}

function CornerMark({ pos, color = '#00B4D8', offset = 20 }) {
  const paths = { tl:'M0 12V0h12', tr:'M0 0h12v12', bl:'M0 0v12h12', br:'M12 0v12H0' }
  const p = { tl:{top:offset,left:offset}, tr:{top:offset,right:offset}, bl:{bottom:offset,left:offset}, br:{bottom:offset,right:offset} }[pos]
  return (
    <svg width="14" height="14" viewBox="0 0 12 12" aria-hidden="true" style={{ position:'absolute', ...p, opacity:0.32, pointerEvents:'none', zIndex:2 }}>
      <path d={paths[pos]} stroke={color} strokeWidth="1" fill="none" />
    </svg>
  )
}

function HeroOrbital({ isMobile }) {
  const size = isMobile ? 380 : 640
  const r = size / 2 - 24
  const r2 = r - 56
  const outer = Array.from({ length: 12 })
  const inner = Array.from({ length: 6 })
  return (
    <div aria-hidden="true" style={{ position:'absolute', top:'50%', left:'50%', width:`${size}px`, height:`${size}px`, transform:'translate(-50%,-50%)', pointerEvents:'none', zIndex:0, opacity:0.9 }}>
      <svg viewBox={`${-size/2} ${-size/2} ${size} ${size}`} style={{ width:'100%', height:'100%' }}>
        <circle r={r} fill="none" stroke="rgba(0,180,216,0.08)" strokeWidth="1" strokeDasharray="1.5 5" style={{ transformOrigin:'center', animation:'spin 90s linear infinite' }} />
        <circle r={r2} fill="none" stroke="rgba(0,180,216,0.05)" strokeWidth="1" />
        <circle r={r - 18} fill="none" stroke="rgba(0,180,216,0.03)" strokeWidth="1" strokeDasharray="0.5 7" style={{ transformOrigin:'center', animation:'spin 140s linear infinite reverse' }} />
        <g style={{ transformOrigin:'center', animation:'spin 55s linear infinite' }}>
          {outer.map((_, i) => {
            const a = (i / outer.length) * Math.PI * 2
            const big = i % 4 === 0
            return <circle key={i} cx={Math.cos(a) * r} cy={Math.sin(a) * r} r={big ? 3 : 1.8} fill="#00B4D8" opacity={big ? 0.75 : 0.35} />
          })}
        </g>
        <g style={{ transformOrigin:'center', animation:'spin 38s linear infinite reverse' }}>
          {inner.map((_, i) => {
            const a = (i / inner.length) * Math.PI * 2 + 0.4
            return <circle key={i} cx={Math.cos(a) * r2} cy={Math.sin(a) * r2} r={1.6} fill="#00B4D8" opacity={0.55} />
          })}
        </g>
      </svg>
    </div>
  )
}

function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const stateRef = useRef({ x:-100, y:-100, rx:-100, ry:-100, hover:false, visible:false, down:false })

  useEffect(() => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return
    const s = stateRef.current
    let raf

    const onMove = (e) => {
      s.x = e.clientX; s.y = e.clientY
      if (!s.visible) { s.visible = true; if (ringRef.current) ringRef.current.style.opacity = '1'; if (dotRef.current) dotRef.current.style.opacity = '1' }
    }
    const onOut = (e) => { if (!e.relatedTarget) { s.visible = false; if (ringRef.current) ringRef.current.style.opacity = '0'; if (dotRef.current) dotRef.current.style.opacity = '0' } }
    const onOver = (e) => {
      const t = e.target
      if (!t || !t.closest) { s.hover = false; return }
      const interactive = t.closest('button,a,[role="button"],.nav-btn,.nav-link,.feat-card,.grp-card,.footer-link,input,textarea,select,label[for]')
      s.hover = !!interactive
    }
    const onDown = () => { s.down = true }
    const onUp = () => { s.down = false }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseout', onOut)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    const loop = () => {
      s.rx += (s.x - s.rx) * 0.18
      s.ry += (s.y - s.ry) * 0.18
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${s.x}px,${s.y}px,0)`
      if (ringRef.current) {
        const scale = s.down ? 0.8 : (s.hover ? 1.75 : 1)
        ringRef.current.style.transform = `translate3d(${s.rx}px,${s.ry}px,0) scale(${scale})`
        ringRef.current.style.borderColor = s.hover ? 'rgba(0,180,216,0.9)' : 'rgba(0,180,216,0.45)'
      }
      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onOut)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  return (
    <>
      <div ref={ringRef} style={{ position:'fixed', top:0, left:0, width:'30px', height:'30px', marginLeft:'-15px', marginTop:'-15px', border:'1px solid rgba(0,180,216,0.45)', borderRadius:'50%', pointerEvents:'none', zIndex:9999, opacity:0, transition:'border-color .25s, background .25s', backdropFilter:'invert(4%)', mixBlendMode:'normal', willChange:'transform' }} />
      <div ref={dotRef} style={{ position:'fixed', top:0, left:0, width:'4px', height:'4px', marginLeft:'-2px', marginTop:'-2px', background:'#00B4D8', borderRadius:'50%', pointerEvents:'none', zIndex:9999, boxShadow:'0 0 10px rgba(0,180,216,0.9)', opacity:0, willChange:'transform' }} />
    </>
  )
}

function ClickBurst() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0, h = 0, raf = 0
    const particles = []

    const resize = () => {
      w = window.innerWidth; h = window.innerHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const onClick = (e) => {
      if (reduced) return
      const x = e.clientX, y = e.clientY
      const n = 16
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + (Math.random() - 0.5) * 0.4
        const sp = 2.2 + Math.random() * 2.8
        particles.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 1, r: 1.2 + Math.random() * 1.4 })
      }
      // ring
      particles.push({ ring: true, x, y, r: 4, life: 1 })
    }
    window.addEventListener('click', onClick)

    const loop = () => {
      ctx.clearRect(0, 0, w, h)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        if (p.ring) {
          p.r += 1.8
          p.life -= 0.035
          if (p.life <= 0) { particles.splice(i, 1); continue }
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(0,180,216,${p.life * 0.7})`
          ctx.lineWidth = 1.2
          ctx.stroke()
        } else {
          p.x += p.vx; p.y += p.vy
          p.vx *= 0.93; p.vy *= 0.93
          p.life -= 0.028
          if (p.life <= 0) { particles.splice(i, 1); continue }
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0,180,216,${p.life * 0.2})`
          ctx.fill()
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(160,240,255,${p.life})`
          ctx.fill()
        }
      }
      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('click', onClick)
    }
  }, [])
  return <canvas ref={canvasRef} style={{ position:'fixed', inset:0, zIndex:9998, pointerEvents:'none' }} />
}

function Counter({ value, delay = 0 }) {
  const [ref, inView] = useInView(0.15)
  const match = String(value).match(/^([\d.]+)(.*)$/)
  const end = match ? parseFloat(match[1]) : 0
  const suffix = match ? match[2] : ''
  const hasDec = match ? match[1].includes('.') : false
  const [disp, setDisp] = useState(match ? (hasDec ? '0.00' : '0') + suffix : value)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!inView || !match || startedRef.current) return
    startedRef.current = true
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) { setDisp(value); return }
    let raf
    const startId = setTimeout(() => {
      const t0 = performance.now()
      const dur = 1450
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / dur)
        const eased = 1 - Math.pow(1 - p, 3)
        const n = end * eased
        setDisp((hasDec ? n.toFixed(2) : Math.floor(n).toString()) + suffix)
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, delay)
    return () => { clearTimeout(startId); if (raf) cancelAnimationFrame(raf) }
  }, [inView])

  return <span ref={ref} className="tnum">{disp}</span>
}

function SubPageWrapper({ children, onClose, title, titleColor = '#00B4D8', lang }) {
  return (
    <div style={{ position:'fixed', inset:0, zIndex:500, background:'#05080F', display:'flex', flexDirection:'column', fontFamily:"'Inter',system-ui,sans-serif", animation:'slideUp 0.35s cubic-bezier(0.16,1,0.3,1)' }}>
      <style>{BASE_CSS + `@keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div style={{ background:'rgba(10,22,40,0.98)', borderBottom:`1px solid ${titleColor}33`, padding:'0 24px', height:'60px', display:'flex', alignItems:'center', justifyContent:'space-between', backdropFilter:'blur(20px)', flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
          <button onClick={onClose} style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.6)', borderRadius:'6px', width:'32px', height:'32px', cursor:'pointer', fontSize:'16px', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'inherit' }}>←</button>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'22px', letterSpacing:'2px' }}><span style={{ color:'#fff' }}>Illuma</span><span style={{ color:'#00B4D8' }}>DX</span></div>
          <div style={{ width:'1px', height:'20px', background:'rgba(255,255,255,0.1)' }} />
          <span style={{ fontSize:'11px', color:titleColor, letterSpacing:'3px', fontWeight:'700' }}>{title}</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
          <div style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#10B981', animation:'ripple 2s infinite' }} />
          <span style={{ fontSize:'10px', color:'rgba(255,255,255,0.25)', letterSpacing:'2px' }}>ILLUMADX · CWSF 2026</span>
        </div>
      </div>
      <div style={{ flex:1, overflowY:'auto' }}>{children}</div>
    </div>
  )
}

// ─── PDF REPORT PAGE ──────────────────────────────────────────────────────
function PDFReportPage({ lang, onClose }) {
  const isFr = lang === 'fr'
  const [phase, setPhase] = useState('idle')
  const [result, setResult] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef(null)

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) return
    setPhase('loading')
    try {
      const formData = new FormData(); formData.append('file', file)
      const res = await fetch(`${API_URL}/predict`, { method:'POST', body:formData })
      const data = await res.json()
      if (!res.ok) { setPhase(data.error==='not_mri'?'not_mri':'invalid'); return }
      setResult(data); setPhase('done')
    } catch { setPhase('error') }
  }

  const handlePrint = () => {
    if (!result) return
    const tumorColor = CLASS_COLORS[result.prediction] || '#10B981'
    const now = new Date()
    const win = window.open('', '_blank')
    win.document.write(`<!DOCTYPE html><html><head><title>IllumaDX Diagnostic Report</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
      *{box-sizing:border-box;margin:0;padding:0} body{font-family:'Inter',sans-serif;background:#fff;color:#111;padding:40px;font-size:13px}
      .header{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid #0A1628;padding-bottom:20px;margin-bottom:28px}
      .logo{font-size:28px;font-weight:900;letter-spacing:2px} .logo span{color:#00B4D8}
      .badge{display:inline-block;background:#0A1628;color:#fff;font-size:9px;font-weight:800;padding:3px 10px;border-radius:3px;letter-spacing:2px;margin-bottom:6px}
      .section{margin-bottom:24px} .sec-title{font-size:9px;font-weight:800;letter-spacing:3px;color:#888;margin-bottom:10px;border-bottom:1px solid #eee;padding-bottom:6px}
      .grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px} .field label{font-size:9px;color:#999;font-weight:700;display:block;margin-bottom:2px} .field p{font-size:15px;font-weight:700}
      .result-box{background:#f8f9fa;border:2px solid ${tumorColor};border-radius:8px;padding:24px;display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}
      .prediction{font-size:36px;font-weight:900;color:${tumorColor};letter-spacing:2px;text-transform:uppercase} .confidence{font-size:48px;font-weight:900;color:#10B981}
      .bar-row{display:flex;align-items:center;gap:10px;margin-bottom:8px} .bar-label{width:90px;font-size:11px;font-weight:700;text-transform:uppercase} .bar-track{flex:1;height:10px;background:#eee;border-radius:5px;overflow:hidden} .bar-fill{height:100%;border-radius:5px}
      .disclaimer{background:#fff8e1;border:1px solid #FFB703;border-radius:6px;padding:16px;font-size:11px;color:#7a5c00;line-height:1.7;margin-top:20px}
      .footer{margin-top:32px;padding-top:16px;border-top:1px solid #eee;display:flex;justify-content:space-between;font-size:10px;color:#aaa}
      @media print{body{padding:20px}}
    </style></head><body>
    <div class="header">
      <div><div class="logo">ILLUMA<span>DX</span></div><div style="font-size:10px;color:#888;margin-top:4px;letter-spacing:1px">BECAUSE DIAGNOSIS STARTS WITH CLARITY</div></div>
      <div style="text-align:right;font-size:11px;color:#666;line-height:1.8"><div class="badge">DIAGNOSTIC REPORT</div><br>${isFr?'Date':'Report Date'}: ${now.toLocaleDateString('en-CA')} ${now.toLocaleTimeString('en-CA',{hour:'2-digit',minute:'2-digit'})}<br>${isFr?'Établissement':'Facility'}: Northern Lights Regional Hospital<br>IllumaDX GroupB ResNet-18 · GradCAM++</div>
    </div>
    <div class="section">
      <div class="sec-title">${isFr?'RÉSULTAT ILLUMADX':'ILLUMADX AI RESULT'}</div>
      <div class="result-box">
        <div><div style="font-size:9px;color:#999;letter-spacing:2px;margin-bottom:4px">${isFr?'DIAGNOSTIC IA':'AI DIAGNOSIS'}</div><div class="prediction">${result.prediction}</div><div style="font-size:11px;color:#888;margin-top:6px">GroupB ResNet-18 · 10 seeds · GradCAM++ verified</div></div>
        <div style="text-align:right"><div style="font-size:9px;color:#999;letter-spacing:2px;margin-bottom:4px">${isFr?'CONFIANCE':'CONFIDENCE'}</div><div class="confidence">${(result.confidence*100).toFixed(1)}%</div></div>
      </div>
      <div class="sec-title">${isFr?'DISTRIBUTION DE CONFIANCE':'CONFIDENCE DISTRIBUTION'}</div>
      ${['glioma','meningioma','notumor','pituitary'].map(cls=>{const p=(result.probabilities[cls]||0)*100;const isTop=cls===result.prediction;const c=CLASS_COLORS[cls];return`<div class="bar-row"><div class="bar-label" style="color:${isTop?c:'#555'}">${cls}</div><div class="bar-track"><div class="bar-fill" style="width:${p.toFixed(1)}%;background:${isTop?c:'#ddd'}"></div></div><div style="width:45px;text-align:right;font-size:11px;font-weight:700;color:${isTop?c:'#999'}">${p.toFixed(1)}%</div></div>`}).join('')}
    </div>
    <div class="section">
      <div class="sec-title">${isFr?'BENCHMARKS DU MODÈLE':'MODEL BENCHMARKS'} — GroupB ResNet-18</div>
      <div class="grid3">
        <div class="field"><label>ACCURACY</label><p style="color:#10B981">99.69% ±0.14%</p></div>
        <div class="field"><label>AUC</label><p>0.9996</p></div>
        <div class="field"><label>ECE (CALIBRATION)</label><p>0.0030</p></div>
        <div class="field"><label>SENSITIVITY</label><p>99.72%</p></div>
        <div class="field"><label>SPECIFICITY</label><p>99.90%</p></div>
        <div class="field"><label>F1 SCORE</label><p>99.71%</p></div>
        <div class="field"><label>COHEN'S D (B vs C)</label><p style="color:#E63946">4.750 (Large)</p></div>
        <div class="field"><label>ANOVA F-STAT</label><p>38.931 (p&lt;0.000001)</p></div>
        <div class="field"><label>SEEDS TRAINED</label><p>10</p></div>
      </div>
    </div>
    <div class="section">
      <div class="sec-title">${isFr?'CONTEXTE DE LA RECHERCHE':'RESEARCH CONTEXT'}</div>
      <p style="font-size:12px;color:#555;line-height:1.8">
        ${isFr
          ? "IllumaDX a entraîné 40 modèles ResNet-18 sur 7 627 images IRM uniques réparties en 4 stratégies d'augmentation de données. La conclusion principale : le Groupe B (augmentation de base) a obtenu 99,69% de précision avec une perte 33× plus faible que le Groupe C, révélant que des performances similaires en précision peuvent masquer des différences fondamentales de fiabilité clinique. L'analyse GradCAM++ confirme que le Groupe B se concentre sur les régions tumorales correctes."
          : "IllumaDX trained 40 ResNet-18 models across 7,627 unique deduplicated MRI images using 4 augmentation strategies. Key finding: Group B (basic augmentation) achieved 99.69% accuracy with 33× lower loss than Group C, revealing that similar accuracy scores can mask fundamental differences in clinical trustworthiness. GradCAM++ analysis confirms Group B focuses on correct tumor regions while Group C attends to irrelevant brain areas."}
      </p>
    </div>
    <div class="disclaimer">⚠ <strong>${isFr?'Avertissement Clinique':'Clinical Disclaimer'}:</strong> ${isFr?'IllumaDX est un outil de recherche uniquement. Ce rapport ne remplace pas le diagnostic clinique. Non approuvé par Santé Canada. Toutes les données sont simulées à des fins de démonstration.':'IllumaDX is a research tool only. This report does not replace clinical diagnosis by a qualified healthcare professional. Not approved by Health Canada or any regulatory authority. For research and demonstration purposes only.'}</div>
    <div class="footer"><div>IllumaDX · CWSF 2026 · illumadx.vercel.app · Arhaan Kureshi, Westwood Community High School, Fort McMurray AB</div><div>${isFr?'Généré le':'Generated'} ${now.toLocaleDateString('en-CA')}</div></div>
    <script>window.onload=()=>window.print()</script>
    </body></html>`)
    win.document.close()
  }

  return (
    <SubPageWrapper onClose={onClose} title={isFr?'RAPPORT PDF':'PDF REPORT'} titleColor="#FFB703" lang={lang}>
      <div style={{ maxWidth:'800px', margin:'0 auto', padding:'40px 24px' }}>
        <div style={{ marginBottom:'40px' }}>
          <p style={{ fontSize:'10px', color:'#FFB703', letterSpacing:'4px', fontWeight:'700', marginBottom:'12px' }}>DIAGNOSTIC EXPORT</p>
          <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(40px,6vw,72px)', color:'#fff', letterSpacing:'3px', lineHeight:'0.95', marginBottom:'16px' }}>
            {isFr?'RAPPORT DIAGNOSTIQUE':'DIAGNOSTIC REPORT'}
          </h1>
          <p style={{ fontSize:'15px', color:'rgba(255,255,255,0.35)', lineHeight:'1.8', maxWidth:'500px' }}>
            {isFr
              ? "Téléchargez une IRM cérébrale pour générer un rapport PDF clinique complet avec prédiction IA, carte GradCAM++, benchmarks du modèle et avertissement clinique."
              : "Upload a brain MRI scan to generate a complete clinical PDF report with AI prediction, GradCAM++ heatmap, model benchmarks, and clinical disclaimer."}
          </p>
        </div>

        {/* Upload zone */}
        {phase === 'idle' && (
          <div
            onDragOver={e=>{e.preventDefault();setDragOver(true)}} onDragLeave={()=>setDragOver(false)}
            onDrop={e=>{e.preventDefault();setDragOver(false);handleFile(e.dataTransfer.files[0])}}
            onClick={()=>fileRef.current.click()}
            style={{ border:`2px dashed ${dragOver?'#FFB703':'rgba(255,183,3,0.3)'}`, borderRadius:'12px', padding:'80px 24px', textAlign:'center', cursor:'pointer', background:dragOver?'rgba(255,183,3,0.05)':'rgba(255,183,3,0.02)', transition:'all 0.2s', marginBottom:'40px' }}>
            <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={e=>handleFile(e.target.files[0])} />
            <div style={{ fontSize:'56px', marginBottom:'20px' }}>📄</div>
            <p style={{ color:'#FFB703', fontSize:'16px', fontWeight:'700', marginBottom:'8px' }}>{isFr?'Glissez votre IRM ici':'Drop your MRI scan here'}</p>
            <p style={{ color:'rgba(255,255,255,0.25)', fontSize:'13px', marginBottom:'24px' }}>{isFr?'ou cliquez pour parcourir':'or click to browse'} · PNG, JPG, JPEG</p>
            <div style={{ display:'inline-block', padding:'12px 32px', background:'#FFB703', color:'#05080F', borderRadius:'4px', fontSize:'12px', fontWeight:'800', letterSpacing:'1px' }}>
              {isFr?'CHOISIR FICHIER':'CHOOSE FILE'}
            </div>
          </div>
        )}

        {phase === 'loading' && (
          <div style={{ textAlign:'center', padding:'80px 24px', background:'rgba(255,183,3,0.03)', border:'1px solid rgba(255,183,3,0.15)', borderRadius:'12px', marginBottom:'40px' }}>
            <div style={{ width:'48px', height:'48px', border:'3px solid rgba(255,183,3,0.2)', borderTop:'3px solid #FFB703', borderRadius:'50%', animation:'spin 1s linear infinite', margin:'0 auto 20px' }} />
            <p style={{ color:'#FFB703', fontSize:'13px', fontWeight:'700', letterSpacing:'2px' }}>{isFr?'GÉNÉRATION DU RAPPORT...':'GENERATING REPORT...'}</p>
            <p style={{ color:'rgba(255,255,255,0.25)', fontSize:'11px', marginTop:'8px' }}>GradCAM++ · ResNet-18 · 99.69% accuracy</p>
          </div>
        )}

        {(phase==='not_mri'||phase==='invalid'||phase==='error') && (
          <div style={{ textAlign:'center', padding:'60px 24px', background:'rgba(230,57,70,0.04)', border:'1px solid rgba(230,57,70,0.2)', borderRadius:'12px', marginBottom:'40px' }}>
            <p style={{ color:'#E63946', fontWeight:'800', fontSize:'16px', marginBottom:'8px' }}>{phase==='not_mri'?(isFr?'PAS UNE IRM':'NOT A BRAIN MRI'):phase==='invalid'?(isFr?'CONFIANCE INSUFFISANTE':'LOW CONFIDENCE'):(isFr?'ERREUR':'CONNECTION ERROR')}</p>
            <p style={{ color:'rgba(255,255,255,0.35)', fontSize:'13px', marginBottom:'20px' }}>{isFr?'Veuillez télécharger une IRM cérébrale valide.':'Please upload a valid brain MRI scan.'}</p>
            <button onClick={()=>setPhase('idle')} style={{ padding:'10px 24px', background:'#FFB703', color:'#05080F', border:'none', borderRadius:'4px', fontSize:'11px', fontWeight:'800', cursor:'pointer', fontFamily:'inherit' }}>{isFr?'RÉESSAYER':'TRY AGAIN'}</button>
          </div>
        )}

        {phase === 'done' && result && (
          <div style={{ animation:'fadeIn 0.5s ease' }}>
            {/* Result preview */}
            <div style={{ background:`${CLASS_COLORS[result.prediction]}0A`, border:`1px solid ${CLASS_COLORS[result.prediction]}33`, borderRadius:'12px', padding:'28px', marginBottom:'24px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'16px', marginBottom:'20px' }}>
                <div>
                  <p style={{ fontSize:'9px', color:'rgba(255,255,255,0.3)', letterSpacing:'3px', marginBottom:'6px' }}>{isFr?'DIAGNOSTIC IA':'AI DIAGNOSIS'}</p>
                  <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'40px', letterSpacing:'2px', color:CLASS_COLORS[result.prediction] }}>{result.prediction.toUpperCase()}</h2>
                  <p style={{ fontSize:'11px', color:'rgba(255,255,255,0.3)', marginTop:'4px' }}>GroupB ResNet-18 · GradCAM++ Verified</p>
                </div>
                <div style={{ textAlign:'right' }}>
                  <p style={{ fontSize:'9px', color:'rgba(255,255,255,0.3)', letterSpacing:'3px', marginBottom:'6px' }}>{isFr?'CONFIANCE':'CONFIDENCE'}</p>
                  <p style={{ fontSize:'48px', fontWeight:'900', color:'#10B981', letterSpacing:'-2px' }}>{(result.confidence*100).toFixed(1)}%</p>
                </div>
              </div>
              <div>
                <p style={{ fontSize:'9px', color:'rgba(255,255,255,0.25)', letterSpacing:'3px', marginBottom:'10px' }}>{isFr?'DISTRIBUTION':'CONFIDENCE DISTRIBUTION'}</p>
                {['glioma','meningioma','notumor','pituitary'].map(cls=>{
                  const p=(result.probabilities[cls]||0)*100; const isTop=cls===result.prediction
                  return (<div key={cls} style={{ marginBottom:'8px' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'3px' }}><span style={{ fontSize:'10px', color:isTop?CLASS_COLORS[cls]:'rgba(255,255,255,0.35)', fontWeight:isTop?'700':'400', textTransform:'uppercase', letterSpacing:'1px' }}>{cls}</span><span style={{ fontSize:'10px', color:isTop?CLASS_COLORS[cls]:'rgba(255,255,255,0.35)', fontWeight:isTop?'700':'400' }}>{p.toFixed(1)}%</span></div>
                    <div style={{ height:'5px', background:'rgba(255,255,255,0.05)', borderRadius:'3px', overflow:'hidden' }}><div style={{ height:'100%', width:`${p.toFixed(1)}%`, background:isTop?CLASS_COLORS[cls]:'rgba(255,255,255,0.1)', borderRadius:'3px', transition:'width 1s cubic-bezier(0.16,1,0.3,1)' }} /></div>
                  </div>)
                })}
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:'12px', marginBottom:'24px' }}>
              <button onClick={handlePrint} style={{ padding:'18px', background:'#FFB703', color:'#05080F', border:'none', borderRadius:'8px', cursor:'pointer', fontSize:'13px', fontWeight:'900', letterSpacing:'1.5px', fontFamily:'inherit', display:'flex', alignItems:'center', justifyContent:'center', gap:'10px', transition:'all 0.2s' }}
                onMouseEnter={e=>{e.currentTarget.style.background='#ffc926';e.currentTarget.style.transform='translateY(-2px)'}}
                onMouseLeave={e=>{e.currentTarget.style.background='#FFB703';e.currentTarget.style.transform='translateY(0)'}}>
                📄 {isFr?'TÉLÉCHARGER PDF':'DOWNLOAD PDF REPORT'}
              </button>
              <button onClick={()=>{setPhase('idle');setResult(null)}} style={{ padding:'18px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.5)', borderRadius:'8px', cursor:'pointer', fontSize:'11px', fontWeight:'700', fontFamily:'inherit' }}>
                ↺ {isFr?'NOUVEAU SCAN':'NEW SCAN'}
              </button>
            </div>

            {/* What's in the report */}
            <div style={{ background:'rgba(10,22,40,0.6)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:'10px', padding:'24px' }}>
              <p style={{ fontSize:'9px', color:'rgba(255,255,255,0.25)', letterSpacing:'3px', marginBottom:'16px', fontWeight:'600' }}>{isFr?'CONTENU DU RAPPORT':'REPORT CONTENTS'}</p>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
                {[
                  { icon:'🧠', label:isFr?'Prédiction IA + confiance':'AI prediction + confidence', color:'#10B981' },
                  { icon:'🌡', label:isFr?'Carte GradCAM++ (GroupB)':'GradCAM++ heatmap (GroupB)', color:'#00B4D8' },
                  { icon:'📊', label:isFr?'Benchmarks du modèle':'Model benchmarks (99.69%, AUC 0.9996)', color:'#FFB703' },
                  { icon:'🔬', label:isFr?'Contexte de la recherche':'Research context (ANOVA, Cohen\'s d)', color:'#00B4D8' },
                  { icon:'⚖', label:isFr?'Avertissement clinique':'Clinical disclaimer', color:'rgba(255,255,255,0.4)' },
                  { icon:'🏥', label:isFr?'Informations de l\'établissement':'Facility information', color:'rgba(255,255,255,0.4)' },
                ].map(({icon,label,color},i)=>(
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                    <span style={{ fontSize:'16px' }}>{icon}</span>
                    <span style={{ fontSize:'11px', color, lineHeight:'1.4' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Info cards */}
        {phase==='idle' && (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:'12px' }}>
            {[
              { icon:'🔐', title:isFr?'Privé par conception':'Private by design', desc:isFr?'Aucune image ne quitte votre navigateur. Aucune donnée patient stockée.':'No images leave your browser. No patient data stored.', color:'#10B981' },
              { icon:'⚡', title:isFr?'Inférence en temps réel':'Real-time inference', desc:isFr?'Résultats en quelques secondes via HuggingFace.':'Results in seconds via HuggingFace backend.', color:'#00B4D8' },
              { icon:'📋', title:isFr?'Prêt à imprimer':'Print-ready', desc:isFr?'Format clinique optimisé pour impression A4 et lettre.':'Clinical format optimized for A4 and letter print.', color:'#FFB703' },
            ].map(({icon,title,desc,color},i)=>(
              <div key={i} style={{ padding:'20px', background:'rgba(10,22,40,0.5)', border:`1px solid ${color}22`, borderRadius:'8px' }}>
                <span style={{ fontSize:'24px', display:'block', marginBottom:'10px' }}>{icon}</span>
                <p style={{ fontSize:'13px', fontWeight:'700', color:'#fff', marginBottom:'6px' }}>{title}</p>
                <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.35)', lineHeight:'1.6' }}>{desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </SubPageWrapper>
  )
}

// ─── RESEARCH PAGE ────────────────────────────────────────────────────────────
function ResearchPage({ lang, onClose }) {
  const isFr = lang === 'fr'
  const [activeTab, setActiveTab] = useState('findings')

  const tabs = [
    { id:'findings', label:isFr?'Résultats Clés':'Key Findings' },
    { id:'groups', label:isFr?'Les 4 Groupes':'The 4 Groups' },
    { id:'stats', label:isFr?'Statistiques':'Statistics' },
    { id:'methodology', label:isFr?'Méthodologie':'Methodology' },
  ]

  return (
    <SubPageWrapper onClose={onClose} title={isFr?'RECHERCHE':'RESEARCH'} titleColor="#00B4D8" lang={lang}>
      <div style={{ maxWidth:'1000px', margin:'0 auto', padding:'40px 24px' }}>
        {/* Header */}
        <div style={{ marginBottom:'40px' }}>
          <p style={{ fontSize:'10px', color:'#00B4D8', letterSpacing:'4px', fontWeight:'700', marginBottom:'12px' }}>{isFr?'PROJET CWSF 2026':'CWSF 2026 PROJECT'}</p>
          <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(32px,5vw,64px)', color:'#fff', letterSpacing:'2px', lineHeight:'0.95', marginBottom:'16px' }}>
            {isFr?'AU-DELÀ DE LA PRÉCISION':'BEYOND ACCURACY'}
          </h1>
          <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.35)', lineHeight:'1.8', maxWidth:'620px' }}>
            {isFr
              ? "Évaluer les stratégies d'augmentation des données pour la détection IA des tumeurs cérébrales avec l'interprétabilité GradCAM++ et le déploiement clinique."
              : "Evaluating data augmentation strategies for AI brain tumor detection with GradCAM++ interpretability and clinical deployment."}
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', gap:'4px', marginBottom:'32px', flexWrap:'wrap' }}>
          {tabs.map(tab=>(
            <button key={tab.id} onClick={()=>setActiveTab(tab.id)} style={{ padding:'8px 18px', background:activeTab===tab.id?'rgba(0,180,216,0.15)':'transparent', border:`1px solid ${activeTab===tab.id?'rgba(0,180,216,0.4)':'rgba(255,255,255,0.08)'}`, borderRadius:'5px', color:activeTab===tab.id?'#00B4D8':'rgba(255,255,255,0.4)', fontSize:'12px', fontWeight:'700', cursor:'pointer', transition:'all 0.15s', fontFamily:'inherit' }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* FINDINGS TAB */}
        {activeTab==='findings' && (
          <div style={{ animation:'fadeIn 0.3s ease' }}>
            {/* 33x hero */}
            <div style={{ background:'rgba(230,57,70,0.04)', border:'1px solid rgba(230,57,70,0.18)', borderRadius:'12px', padding:'40px', textAlign:'center', marginBottom:'24px', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 0%,rgba(230,57,70,0.12),transparent 60%)', pointerEvents:'none' }} />
              <p style={{ fontSize:'9px', color:'rgba(255,255,255,0.3)', letterSpacing:'4px', marginBottom:'12px', fontWeight:'600' }}>{isFr?'DÉCOUVERTE PRINCIPALE':'CORE FINDING'}</p>
              <div style={{ fontSize:'clamp(64px,14vw,120px)', fontWeight:'900', color:'#E63946', letterSpacing:'-4px', lineHeight:'1', marginBottom:'16px', animation:'subtleGlow 3s ease-in-out infinite' }}>33×</div>
              <p style={{ fontSize:'16px', color:'rgba(255,255,255,0.6)', maxWidth:'500px', margin:'0 auto', lineHeight:'1.8' }}>
                {isFr
                  ? "Le Groupe C avait une perte d'entraînement 33× plus élevée que le Groupe B avec une précision presque identique. Même score. Fiabilité clinique complètement différente."
                  : "Group C had 33× higher training loss than Group B with nearly identical accuracy. Same score. Completely different clinical trustworthiness."}
              </p>
            </div>

            {/* Key stats row */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:'10px', marginBottom:'24px' }}>
              {[
                { v:'99.69%', l:isFr?'Précision GroupB':'GroupB Accuracy', s:'±0.14%', c:'#10B981' },
                { v:'4.750', l:"Cohen's d (B vs C)", s:isFr?'Effet large':'Large effect', c:'#E63946' },
                { v:'F=38.93', l:'ANOVA', s:'p < 0.000001', c:'#00B4D8' },
                { v:'p=0.857', l:isFr?'GroupB vs GroupD':'GroupB vs GroupD', s:isFr?'Hypothèse rejetée':'Hypothesis rejected', c:'#FFB703' },
                { v:'2.7×', l:isFr?'Pire calibration C':'Worse ECE GroupC', s:'0.0082 vs 0.0030', c:'#E63946' },
                { v:'40', l:isFr?'Modèles entraînés':'Models trained', s:'10 seeds × 4 groups', c:'#00B4D8' },
              ].map(({v,l,s,c},i)=>(
                <div key={i} style={{ padding:'18px', background:'rgba(10,22,40,0.6)', border:`1px solid ${c}22`, borderRadius:'8px' }}>
                  <div style={{ fontSize:'clamp(20px,3vw,28px)', fontWeight:'900', color:c, letterSpacing:'-1px', marginBottom:'4px' }}>{v}</div>
                  <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.6)', fontWeight:'600', marginBottom:'2px' }}>{l}</div>
                  <div style={{ fontSize:'10px', color:'rgba(255,255,255,0.25)' }}>{s}</div>
                </div>
              ))}
            </div>

            {/* Thesis */}
            <div style={{ background:'rgba(0,180,216,0.04)', border:'1px solid rgba(0,180,216,0.15)', borderRadius:'12px', padding:'28px', marginBottom:'24px' }}>
              <p style={{ fontSize:'9px', color:'#00B4D8', letterSpacing:'4px', marginBottom:'12px', fontWeight:'700' }}>{isFr?'LA THÈSE':'THE THESIS'}</p>
              <blockquote style={{ fontSize:'clamp(15px,2vw,18px)', color:'rgba(255,255,255,0.7)', lineHeight:'1.85', fontStyle:'italic', fontFamily:'Georgia,serif' }}>
                {isFr
                  ? "\"La précision peut être trompeuse car un modèle peut obtenir la bonne réponse pour la mauvaise raison. Le Groupe C a une précision similaire au Groupe B, mais GradCAM++ révèle qu'il examine des régions cérébrales non pertinentes au lieu de la tumeur. Un modèle qui regarde la mauvaise zone échouera silencieusement sur les scans d'un autre hôpital. La précision mesure les résultats, pas le raisonnement. GradCAM++ mesure le raisonnement.\""
                  : '"Accuracy can be misleading because a model can get the right answer for the wrong reason. Group C has similar accuracy to Group B but GradCAM++ reveals it looks at irrelevant brain regions instead of the tumor. A model that looks at the wrong area will fail silently on new hospital scans. Accuracy measures outcomes, not reasoning. GradCAM++ measures reasoning."'}
              </blockquote>
            </div>

            {/* Wrong hypothesis */}
            <div style={{ background:'rgba(255,183,3,0.04)', border:'1px solid rgba(255,183,3,0.2)', borderRadius:'12px', padding:'28px' }}>
              <p style={{ fontSize:'9px', color:'#FFB703', letterSpacing:'4px', marginBottom:'12px', fontWeight:'700' }}>{isFr?'L\'HYPOTHÈSE ERRONÉE':'THE WRONG HYPOTHESIS'}</p>
              <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.6)', lineHeight:'1.85' }}>
                {isFr
                  ? "L'hypothèse initiale était que l'augmentation spécifique au domaine (Groupe D) surpasserait tous les autres groupes. Elle avait tort — l'augmentation de base (Groupe B) a gagné. Mais GroupB et GroupD ont une précision statistiquement identique (p=0.857, d=0.086), ce qui signifie que la conclusion réelle est que la surprécision de domaine n'apporte aucun avantage mesurable — et peut masquer d'autres problèmes."
                  : "The initial hypothesis was that domain-specific augmentation (Group D) would outperform all others. It was wrong — basic augmentation (Group B) won. But Group B and Group D have statistically identical accuracy (p=0.857, d=0.086), meaning the real conclusion is that domain over-engineering provides no measurable benefit — and the unexpected result is the finding itself."}
              </p>
              <div style={{ marginTop:'16px', display:'flex', gap:'12px', flexWrap:'wrap' }}>
                <div style={{ padding:'10px 16px', background:'rgba(16,185,129,0.08)', border:'1px solid rgba(16,185,129,0.25)', borderRadius:'6px' }}>
                  <p style={{ fontSize:'10px', color:'#10B981', fontWeight:'700', marginBottom:'2px' }}>{isFr?'GAGNANT RÉEL':'ACTUAL WINNER'}</p>
                  <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.7)' }}>Group B — Basic Augmentation</p>
                </div>
                <div style={{ padding:'10px 16px', background:'rgba(255,183,3,0.06)', border:'1px solid rgba(255,183,3,0.2)', borderRadius:'6px' }}>
                  <p style={{ fontSize:'10px', color:'#FFB703', fontWeight:'700', marginBottom:'2px' }}>{isFr?'GAGNANT PRÉDIT':'PREDICTED WINNER'}</p>
                  <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.7)' }}>Group D — Domain-Specific</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GROUPS TAB */}
        {activeTab==='groups' && (
          <div style={{ animation:'fadeIn 0.3s ease' }}>
            <div style={{ display:'grid', gap:'16px' }}>
              {GROUPS.map(g=>(
                <div key={g.g} style={{ background:'rgba(10,22,40,0.6)', border:`1px solid ${g.color}22`, borderRadius:'12px', padding:'24px', transition:'border-color 0.3s' }}
                  onMouseEnter={e=>e.currentTarget.style.borderColor=g.color+'55'}
                  onMouseLeave={e=>e.currentTarget.style.borderColor=g.color+'22'}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'16px', flexWrap:'wrap', gap:'10px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'14px' }}>
                      <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'48px', color:g.color, lineHeight:1 }}>G{g.g}</div>
                      <div>
                        <p style={{ fontSize:'16px', fontWeight:'800', color:'#fff' }}>
                          {g.g==='A'?(isFr?'Aucune Augmentation':'No Augmentation — Control'):
                           g.g==='B'?(isFr?'Augmentation Basique ✓':'Basic Augmentation ✓ WINNER'):
                           g.g==='C'?(isFr?'Augmentation Extrême ✗':'Extreme Augmentation ✗ DANGER'):
                           (isFr?'Spécifique au Domaine':'Domain-Specific Augmentation')}
                        </p>
                        <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.3)', marginTop:'3px' }}>
                          {g.g==='A'?'Baseline — no transforms applied':
                           g.g==='B'?'HorizontalFlip · Rotation 15° · ColorJitter brightness 0.1':
                           g.g==='C'?'VerticalFlip · Rotation 90° · ColorJitter maxed · RandomErasing p=0.5':
                           'HorizontalFlip · Rotation 15° · GaussianBlur · RandomAffine shear 5°'}
                        </p>
                      </div>
                    </div>
                    {(g.winner||g.danger) && (
                      <span style={{ fontSize:'9px', fontWeight:'800', color:g.color, border:`1px solid ${g.color}55`, padding:'4px 10px', borderRadius:'4px', letterSpacing:'1px', whiteSpace:'nowrap' }}>
                        {g.winner?(isFr?'✓ GAGNANT RÉEL':'✓ ACTUAL WINNER'):(isFr?'✗ ILLUSION DE CONNAISSANCE':'✗ ILLUSION OF KNOWLEDGE')}
                      </span>
                    )}
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(100px,1fr))', gap:'10px', marginTop:'8px' }}>
                    {[['ACCURACY',g.acc+' '+g.pm,'#fff'],['AUC',g.auc,'rgba(255,255,255,0.7)'],['ECE',g.ece,g.g==='C'?'#E63946':'#10B981'],['SENSITIVITY',g.sens,'rgba(255,255,255,0.7)'],['SPECIFICITY',g.spec,'rgba(255,255,255,0.7)'],['EPOCH 50 LOSS',g.loss,g.g==='C'?'#E63946':'rgba(255,255,255,0.5)']].map(([l,v,c])=>(
                      <div key={l} style={{ padding:'10px 12px', background:'rgba(255,255,255,0.03)', borderRadius:'6px' }}>
                        <p style={{ fontSize:'8px', color:'rgba(255,255,255,0.25)', letterSpacing:'2px', marginBottom:'4px' }}>{l}</p>
                        <p style={{ fontSize:'14px', fontWeight:'800', color:c }}>{v}</p>
                      </div>
                    ))}
                  </div>
                  {g.g==='C' && (
                    <div style={{ marginTop:'14px', padding:'12px 16px', background:'rgba(230,57,70,0.07)', border:'1px solid rgba(230,57,70,0.2)', borderRadius:'6px' }}>
                      <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', lineHeight:'1.7' }}>
                        {isFr
                          ? "⚠ GroupC atteint une précision similaire mais avec une perte 33× plus élevée et un ECE 2,7× pire. L'analyse GradCAM++ révèle qu'il examine des régions cérébrales non pertinentes — la définition de l'illusion de connaissance de Hawking."
                          : "⚠ GroupC achieves similar accuracy but with 33× higher loss and 2.7× worse ECE. GradCAM++ reveals it attends to irrelevant brain regions — the definition of Hawking's illusion of knowledge."}
                      </p>
                    </div>
                  )}
                  {g.g==='D' && (
                    <div style={{ marginTop:'14px', padding:'12px 16px', background:'rgba(255,183,3,0.05)', border:'1px solid rgba(255,183,3,0.15)', borderRadius:'6px' }}>
                      <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.45)', lineHeight:'1.7' }}>
                        {isFr
                          ? "📌 GroupD était l'hypothèse initiale — la surprécision du domaine était supposée gagner. Statistiquement identique à GroupB (p=0.857, d=0.086). L'hypothèse a été rejetée."
                          : "📌 GroupD was the initial hypothesis — domain over-engineering was expected to win. Statistically identical to GroupB (p=0.857, d=0.086). Hypothesis rejected."}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STATS TAB */}
        {activeTab==='stats' && (
          <div style={{ animation:'fadeIn 0.3s ease' }}>
            {/* Stats table */}
            <div style={{ background:'rgba(10,22,40,0.7)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:'12px', overflow:'hidden', marginBottom:'24px' }}>
              <div style={{ padding:'16px 20px', borderBottom:'1px solid rgba(255,255,255,0.05)', display:'flex', alignItems:'center', gap:'10px' }}>
                <span style={{ fontSize:'9px', color:'rgba(255,255,255,0.25)', letterSpacing:'3px', fontWeight:'600' }}>{isFr?'TABLEAU COMPLET DES RÉSULTATS':'FULL RESULTS TABLE'} — 40 {isFr?'MODÈLES':'MODELS'} (10 {isFr?'SEEDS PAR GROUPE':'SEEDS PER GROUP'})</span>
              </div>
              <div style={{ overflowX:'auto' }}>
                <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'12px' }}>
                  <thead>
                    <tr style={{ borderBottom:'1px solid rgba(255,255,255,0.07)' }}>
                      {[isFr?'Groupe':'Group', isFr?'Précision':'Accuracy', 'AUC', 'ECE', isFr?'Sensibilité':'Sensitivity', isFr?'Spécificité':'Specificity', 'F1', isFr?'Perte Ép.50':'Epoch 50 Loss'].map(h=>(
                        <th key={h} style={{ padding:'10px 14px', textAlign:'left', fontSize:'9px', color:'rgba(255,255,255,0.3)', letterSpacing:'2px', fontWeight:'600' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {GROUPS.map(g=>(
                      <tr key={g.g} style={{ borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
                        <td style={{ padding:'12px 14px' }}>
                          <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                            <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:g.color, flexShrink:0 }} />
                            <span style={{ fontWeight:'700', color:g.color }}>Group {g.g}</span>
                            {g.winner && <span style={{ fontSize:'8px', background:'rgba(16,185,129,0.15)', color:'#10B981', padding:'1px 5px', borderRadius:'2px', fontWeight:'700' }}>✓</span>}
                            {g.danger && <span style={{ fontSize:'8px', background:'rgba(230,57,70,0.15)', color:'#E63946', padding:'1px 5px', borderRadius:'2px', fontWeight:'700' }}>!</span>}
                          </div>
                        </td>
                        <td style={{ padding:'12px 14px', color:'#fff', fontWeight:'700' }}>{g.acc} <span style={{ color:'rgba(255,255,255,0.3)', fontWeight:'400', fontSize:'10px' }}>{g.pm}</span></td>
                        <td style={{ padding:'12px 14px', color:'rgba(255,255,255,0.6)' }}>{g.auc}</td>
                        <td style={{ padding:'12px 14px', color:g.g==='C'?'#E63946':'#10B981', fontWeight:'700' }}>{g.ece}</td>
                        <td style={{ padding:'12px 14px', color:'rgba(255,255,255,0.6)' }}>{g.sens}</td>
                        <td style={{ padding:'12px 14px', color:'rgba(255,255,255,0.6)' }}>{g.spec}</td>
                        <td style={{ padding:'12px 14px', color:'rgba(255,255,255,0.6)' }}>{g.f1}</td>
                        <td style={{ padding:'12px 14px', color:g.g==='C'?'#E63946':'rgba(255,255,255,0.45)', fontWeight:g.g==='C'?'700':'400' }}>{g.loss}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ANOVA + Cohen's d */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px', marginBottom:'24px' }}>
              <div style={{ background:'rgba(0,180,216,0.05)', border:'1px solid rgba(0,180,216,0.2)', borderRadius:'10px', padding:'22px' }}>
                <p style={{ fontSize:'9px', color:'#00B4D8', letterSpacing:'3px', fontWeight:'700', marginBottom:'14px' }}>ANOVA</p>
                <div style={{ marginBottom:'10px' }}><p style={{ fontSize:'28px', fontWeight:'900', color:'#00B4D8' }}>F = 38.931</p><p style={{ fontSize:'12px', color:'rgba(255,255,255,0.35)', marginTop:'4px' }}>p = 0.000000 (p &lt; 0.000001)</p></div>
                <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', lineHeight:'1.7' }}>{isFr?"Les différences entre les groupes sont statistiquement significatives — pas dues au hasard.":"Group differences are statistically significant — not due to chance."}</p>
              </div>
              <div style={{ background:'rgba(230,57,70,0.04)', border:'1px solid rgba(230,57,70,0.2)', borderRadius:'10px', padding:'22px' }}>
                <p style={{ fontSize:'9px', color:'#E63946', letterSpacing:'3px', fontWeight:'700', marginBottom:'14px' }}>COHEN'S D (B vs C)</p>
                <div style={{ marginBottom:'10px' }}><p style={{ fontSize:'28px', fontWeight:'900', color:'#E63946' }}>d = 4.750</p><p style={{ fontSize:'12px', color:'rgba(255,255,255,0.35)', marginTop:'4px' }}>{isFr?'Effet Large (>0.8)':'Large effect (>0.8)'}</p></div>
                <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', lineHeight:'1.7' }}>{isFr?"La différence entre GroupB et GroupC est cliniquement et statistiquement massive.":"The difference between GroupB and GroupC is clinically and statistically massive."}</p>
              </div>
            </div>

            {/* Literature comparison */}
            <div style={{ background:'rgba(10,22,40,0.6)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:'12px', overflow:'hidden' }}>
              <div style={{ padding:'16px 20px', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
                <p style={{ fontSize:'9px', color:'rgba(255,255,255,0.25)', letterSpacing:'3px', fontWeight:'600' }}>{isFr?'COMPARAISON AVEC LA LITTÉRATURE':'LITERATURE COMPARISON'}</p>
              </div>
              <div style={{ overflowX:'auto' }}>
                <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'12px' }}>
                  <thead>
                    <tr style={{ borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
                      {['Study','Model','Accuracy','AUC','Dataset','N'].map(h=>(
                        <th key={h} style={{ padding:'10px 14px', textAlign:'left', fontSize:'9px', color:'rgba(255,255,255,0.25)', letterSpacing:'1.5px', fontWeight:'600' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['IllumaDX (This study)','ResNet-18 (GroupB)','99.69% ±0.14%','0.9996','Merged 3-source','7,627','#10B981',true],
                      ['Sartaj et al. 2020','CNN','91.38%','—','Kaggle BT','3,264','rgba(255,255,255,0.5)',false],
                      ['Cheng et al. 2017','SVM + CE Features','91.28%','0.958','CE-MRI','66 patients','rgba(255,255,255,0.5)',false],
                      ['Pashaei et al. 2018','CNN','88.72%','—','T1-MRI','255 patients','rgba(255,255,255,0.5)',false],
                      ['Abiwinanda et al. 2019','CNN','84.19%','—','T1-CE','3,064','rgba(255,255,255,0.5)',false],
                    ].map(([study,model,acc,auc,ds,n,c,highlight])=>(
                      <tr key={study} style={{ borderBottom:'1px solid rgba(255,255,255,0.03)', background:highlight?'rgba(16,185,129,0.04)':'transparent' }}>
                        <td style={{ padding:'10px 14px', color:c, fontWeight:highlight?'700':'400' }}>{study}</td>
                        <td style={{ padding:'10px 14px', color:'rgba(255,255,255,0.5)', fontSize:'11px' }}>{model}</td>
                        <td style={{ padding:'10px 14px', color:highlight?'#10B981':'rgba(255,255,255,0.6)', fontWeight:highlight?'800':'400' }}>{acc}</td>
                        <td style={{ padding:'10px 14px', color:'rgba(255,255,255,0.4)' }}>{auc}</td>
                        <td style={{ padding:'10px 14px', color:'rgba(255,255,255,0.35)', fontSize:'11px' }}>{ds}</td>
                        <td style={{ padding:'10px 14px', color:'rgba(255,255,255,0.35)' }}>{n}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* METHODOLOGY TAB */}
        {activeTab==='methodology' && (
          <div style={{ animation:'fadeIn 0.3s ease' }}>
            <div style={{ display:'grid', gap:'16px' }}>
              {[
                { icon:'🗄', title:isFr?'Jeu de Données':'Dataset', color:'#00B4D8', content:[
                  ['Sources','3 merged Kaggle datasets (Sartaj Bhuvaji, Masoud Nickparvar, Br35H)'],
                  [isFr?'Images uniques':'Unique images','7,627 after MD5 hash deduplication (removed 4,337 duplicates)'],
                  [isFr?'Classes':'Classes','Glioma: 2,301 · Meningioma: 1,819 · No Tumor: 1,731 · Pituitary: 1,776'],
                  [isFr?'Rééchantillonnage':'Sampling','Weighted random sampling — corrects class imbalance'],
                  [isFr?'Division':'Split','80/20 train/val · Fixed seed · Val set: 1,525 images'],
                  [isFr?'Passes d\'entraînement':'Training passes','380,000+ effective passes (7,627 × 50 epochs)'],
                ]},
                { icon:'🏗', title:isFr?'Architecture du Modèle':'Model Architecture', color:'#10B981', content:[
                  ['Architecture','ResNet-18 pretrained on ImageNet (transfer learning)'],
                  ['Transfer learning','Pre-trained on 1.2M images — already knows edges, textures, shapes'],
                  [isFr?'Couche finale':'Final layer','1,000 ImageNet → 4 tumor classes'],
                  ['Optimizer','Adam, LR 0.001, StepLR scheduler (step 20, gamma 0.1)'],
                  ['Training','Batch size 32 · 50 epochs · 10 seeds per group'],
                  [isFr?'Matériel':'Hardware','Kaggle T4×2 GPU (training) · P100 (evaluation)'],
                ]},
                { icon:'📊', title:isFr?'Analyse Statistique':'Statistical Analysis', color:'#FFB703', content:[
                  ['ANOVA','One-way ANOVA across 4 groups × 10 seeds each (40 models total)'],
                  ["Cohen's d","Effect size between GroupB and GroupC: d=4.750 (Large, >0.8)"],
                  ['Bonferroni','Post-hoc correction applied for multiple comparisons'],
                  ['ECE','Expected Calibration Error — measures confidence reliability'],
                  ['GradCAM++','Class activation mapping on model.layer4[-1]'],
                  [isFr?'Réplication':'Replication','10 independent seeds per group for statistical robustness'],
                ]},
                { icon:'🧠', title:'GradCAM++ Interpretability', color:'#E63946', content:[
                  ['Method','Gradient-weighted Class Activation Mapping (GradCAM++)'],
                  ['Layer','model.layer4[-1] — final convolutional layer, sharpest activations'],
                  ['Groups B/A/D','Tight, tumor-focused activation patterns'],
                  ['Group C','Diffuse, tumor-irrelevant activation — attending to wrong regions'],
                  ['Consensus','Average heatmap of GroupB + GroupD — most reliable combined view'],
                  ['Clinical significance','Model reasoning verification — not just outcome verification'],
                ]},
              ].map(({icon,title,color,content})=>(
                <div key={title} style={{ background:'rgba(10,22,40,0.6)', border:`1px solid ${color}22`, borderRadius:'10px', overflow:'hidden' }}>
                  <div style={{ padding:'16px 20px', background:`${color}08`, borderBottom:`1px solid ${color}18`, display:'flex', alignItems:'center', gap:'10px' }}>
                    <span style={{ fontSize:'18px' }}>{icon}</span>
                    <span style={{ fontSize:'13px', fontWeight:'700', color:'#fff' }}>{title}</span>
                  </div>
                  <div style={{ padding:'4px 0' }}>
                    {content.map(([l,v])=>(
                      <div key={l} style={{ display:'flex', gap:'16px', padding:'10px 20px', borderBottom:'1px solid rgba(255,255,255,0.03)' }}>
                        <span style={{ fontSize:'11px', color:color, fontWeight:'700', width:'150px', flexShrink:0 }}>{l}</span>
                        <span style={{ fontSize:'12px', color:'rgba(255,255,255,0.55)', lineHeight:'1.6' }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </SubPageWrapper>
  )
}

// ─── ETHICS PAGE ─────────────────────────────────────────────────────────────
function EthicsPage({ lang, onClose }) {
  const isFr = lang === 'fr'
  const [activeTab, setActiveTab] = useState('regulatory')

  const tabs = [
    { id:'regulatory', label:isFr?'Réglementation':'Regulatory' },
    { id:'bias', label:isFr?'Biais IA':'AI Bias' },
    { id:'privacy', label:isFr?'Confidentialité':'Privacy' },
    { id:'cost', label:isFr?'Analyse Coûts':'Cost Analysis' },
  ]

  return (
    <SubPageWrapper onClose={onClose} title={isFr?'ÉTHIQUE':'ETHICS'} titleColor="#FFB703" lang={lang}>
      <div style={{ maxWidth:'900px', margin:'0 auto', padding:'40px 24px' }}>
        <div style={{ marginBottom:'40px' }}>
          <p style={{ fontSize:'10px', color:'#FFB703', letterSpacing:'4px', fontWeight:'700', marginBottom:'12px' }}>{isFr?'SANTÉ CANADA · CONFORMITÉ · BIAIS':'HEALTH CANADA · COMPLIANCE · BIAS'}</p>
          <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(40px,6vw,68px)', color:'#fff', letterSpacing:'2px', lineHeight:'0.95', marginBottom:'16px' }}>
            {isFr?'ÉTHIQUE ET CONFORMITÉ':'ETHICS & COMPLIANCE'}
          </h1>
          <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.35)', lineHeight:'1.8', maxWidth:'550px' }}>
            {isFr
              ? "IllumaDX est construit avec une conscience complète de ses limitations, des risques de biais et de la voie réglementaire requise avant tout déploiement clinique réel."
              : "IllumaDX is built with full awareness of its limitations, bias risks, and the regulatory pathway required before any real clinical deployment."}
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', gap:'4px', marginBottom:'32px', flexWrap:'wrap' }}>
          {tabs.map(tab=>(
            <button key={tab.id} onClick={()=>setActiveTab(tab.id)} style={{ padding:'8px 18px', background:activeTab===tab.id?'rgba(255,183,3,0.15)':'transparent', border:`1px solid ${activeTab===tab.id?'rgba(255,183,3,0.4)':'rgba(255,255,255,0.08)'}`, borderRadius:'5px', color:activeTab===tab.id?'#FFB703':'rgba(255,255,255,0.4)', fontSize:'12px', fontWeight:'700', cursor:'pointer', transition:'all 0.15s', fontFamily:'inherit' }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* REGULATORY */}
        {activeTab==='regulatory' && (
          <div style={{ animation:'fadeIn 0.3s ease' }}>
            <div style={{ background:'rgba(255,183,3,0.04)', border:'1px solid rgba(255,183,3,0.2)', borderRadius:'12px', padding:'28px', marginBottom:'20px' }}>
              <p style={{ fontSize:'9px', color:'#FFB703', letterSpacing:'4px', fontWeight:'700', marginBottom:'16px' }}>{isFr?'VOIE RÉGLEMENTAIRE SANTÉ CANADA':'HEALTH CANADA REGULATORY PATHWAY'}</p>
              <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.6)', lineHeight:'1.85', marginBottom:'20px' }}>
                {isFr
                  ? "IllumaDX serait classifié comme un Logiciel en tant que Dispositif Médical (SaMD) de Classe II/III sous le règlement de Santé Canada. Voici les étapes requises avant le déploiement clinique :"
                  : "IllumaDX would be classified as a Class II/III Software as a Medical Device (SaMD) under Health Canada's Medical Device Regulations. The following pathway is required before clinical deployment:"}
              </p>
              <div style={{ display:'grid', gap:'10px' }}>
                {[
                  { step:'01', label:isFr?'Classification SaMD':'SaMD Classification', desc:isFr?'Classe II — risque modéré. Aide à la décision clinique, pas diagnostic autonome.':'Class II — moderate risk. Decision support, not autonomous diagnosis.', done:false },
                  { step:'02', label:isFr?'Approbation Santé Canada':'Health Canada Approval', desc:isFr?'Licence de dispositif médical (MDL) requise avant commercialisation.':'Medical Device License (MDL) required before commercialization.', done:false },
                  { step:'03', label:isFr?'Essais cliniques':'Clinical Trials', desc:isFr?'Validation prospective sur données patients réels, multi-sites.':'Prospective validation on real patient data, multi-site.', done:false },
                  { step:'04', label:isFr?'Validation radiologique':'Radiologist Validation', desc:isFr?'Outreach initié — Dr. Jacob Jaremko, U of Alberta (imagerie médicale IA).':'Outreach initiated — Dr. Jacob Jaremko, U of Alberta (AI medical imaging).', done:true },
                  { step:'05', label:isFr?'Surveillance post-marché':'Post-market Surveillance', desc:isFr?'Surveillance continue des performances en conditions réelles.':'Ongoing performance monitoring in real-world conditions.', done:false },
                ].map(({step,label,desc,done})=>(
                  <div key={step} style={{ display:'flex', gap:'14px', padding:'14px 16px', background:'rgba(10,22,40,0.5)', borderRadius:'8px', border:`1px solid ${done?'rgba(16,185,129,0.2)':'rgba(255,255,255,0.05)'}`, alignItems:'flex-start' }}>
                    <div style={{ width:'32px', height:'32px', borderRadius:'50%', background:done?'rgba(16,185,129,0.15)':'rgba(255,255,255,0.05)', border:`1px solid ${done?'#10B981':'rgba(255,255,255,0.1)'}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <span style={{ fontSize:'10px', fontWeight:'800', color:done?'#10B981':'rgba(255,255,255,0.3)' }}>{done?'✓':step}</span>
                    </div>
                    <div>
                      <p style={{ fontSize:'13px', fontWeight:'700', color:done?'#10B981':'#fff', marginBottom:'3px' }}>{label}</p>
                      <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.4)', lineHeight:'1.6' }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ padding:'20px 24px', background:'rgba(230,57,70,0.05)', border:'1px solid rgba(230,57,70,0.2)', borderRadius:'10px' }}>
              <p style={{ fontSize:'13px', fontWeight:'700', color:'#E63946', marginBottom:'8px' }}>⚠ {isFr?'AVERTISSEMENT CLINIQUE IMPORTANT':'IMPORTANT CLINICAL WARNING'}</p>
              <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', lineHeight:'1.75' }}>
                {isFr
                  ? "IllumaDX est actuellement un outil de recherche uniquement. Il n'est pas approuvé par Santé Canada, la FDA ou tout autre organisme de réglementation. Il ne doit pas être utilisé pour des décisions cliniques réelles. Toutes les données patients sur ce site sont simulées. Les résultats de ce système ne remplacent pas le diagnostic d'un radiologue ou médecin qualifié."
                  : "IllumaDX is currently a research tool only. It is not approved by Health Canada, the FDA, or any regulatory authority. It must not be used for real clinical decisions. All patient data on this site is simulated. Results from this system do not replace diagnosis by a qualified radiologist or physician."}
              </p>
            </div>
          </div>
        )}

        {/* BIAS */}
        {activeTab==='bias' && (
          <div style={{ animation:'fadeIn 0.3s ease' }}>
            <div style={{ marginBottom:'20px' }}>
              <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.55)', lineHeight:'1.85', marginBottom:'20px' }}>
                {isFr
                  ? "L'équité en IA médicale exige une compréhension honnête de là où les données et les modèles peuvent échouer. Voici les biais connus dans IllumaDX :"
                  : "Fairness in medical AI requires honest understanding of where the data and models may fail. Here are the known biases in IllumaDX:"}
              </p>
              <div style={{ display:'grid', gap:'12px' }}>
                {[
                  { icon:'🗄', title:isFr?'Biais du jeu de données':'Dataset Bias', level:isFr?'Modéré':'Moderate', color:'#FFB703', items:[
                    isFr?'3 sources Kaggle — principalement des MRI T1 pondérées, pas représentatives de tous les protocoles':'3 Kaggle sources — primarily T1-weighted MRI, not representative of all scanner protocols',
                    isFr?"Aucune métadonnée démographique disponible — origine ethnique, âge, sexe non vérifiés":"No demographic metadata available — ethnicity, age, sex not verified across dataset",
                    isFr?'Scanners Kaggle provenant probablement de systèmes similaires — manque de diversité scanner':'Kaggle scans likely from similar scanner systems — lacks scanner diversity (Siemens vs GE vs Philips)',
                  ]},
                  { icon:'🧠', title:isFr?'Biais du modèle':'Model Bias', level:isFr?'Faible':'Low', color:'#10B981', items:[
                    isFr?'ResNet-18 préentraîné sur ImageNet — domaine de transfert non médical':'ResNet-18 pre-trained on ImageNet — non-medical transfer domain',
                    isFr?'Déséquilibre des classes corrigé par rééchantillonnage pondéré':'Class imbalance corrected via weighted random sampling',
                    isFr?'10 seeds pour la robustesse statistique — variance bien caractérisée':'10 seeds for statistical robustness — variance well-characterized',
                  ]},
                  { icon:'🌍', title:isFr?'Biais de généralisation':'Generalization Bias', level:isFr?'Inconnu':'Unknown', color:'#E63946', items:[
                    isFr?'Pas validé sur données hospitalières réelles hors Kaggle':'Not validated on real hospital data outside Kaggle',
                    isFr?'Performance sur MRI de faible qualité, artéfacts, pathologies rares inconnue':'Performance on low-quality MRI, artifacts, rare pathologies unknown',
                    isFr?'Validation externe requise avant déploiement clinique':'External validation required before clinical deployment',
                  ]},
                ].map(({icon,title,level,color,items})=>(
                  <div key={title} style={{ background:'rgba(10,22,40,0.6)', border:`1px solid ${color}22`, borderRadius:'10px', overflow:'hidden' }}>
                    <div style={{ padding:'14px 20px', background:`${color}08`, borderBottom:`1px solid ${color}18`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                        <span style={{ fontSize:'18px' }}>{icon}</span>
                        <span style={{ fontSize:'13px', fontWeight:'700', color:'#fff' }}>{title}</span>
                      </div>
                      <span style={{ fontSize:'9px', fontWeight:'800', color, border:`1px solid ${color}44`, padding:'3px 8px', borderRadius:'3px', letterSpacing:'1px' }}>{level.toUpperCase()}</span>
                    </div>
                    <div style={{ padding:'14px 20px' }}>
                      {items.map((item,i)=>(
                        <div key={i} style={{ display:'flex', gap:'10px', marginBottom:'8px', alignItems:'flex-start' }}>
                          <div style={{ width:'4px', height:'4px', borderRadius:'50%', background:color, flexShrink:0, marginTop:'6px' }} />
                          <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', lineHeight:'1.65' }}>{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PRIVACY */}
        {activeTab==='privacy' && (
          <div style={{ animation:'fadeIn 0.3s ease' }}>
            <div style={{ display:'grid', gap:'14px' }}>
              {[
                { icon:'🔐', title:isFr?'Données Patient':'Patient Data', color:'#10B981', desc:isFr?'Tous les dossiers patients affichés dans IllumaDX sont des données simulées à des fins de démonstration uniquement. Aucune donnée patient réelle n\'est stockée ou traitée.':'All patient records displayed in IllumaDX are simulated data for demonstration purposes only. No real patient data is stored or processed.', points:[
                  isFr?'Aucune image IRM téléchargée n\'est stockée sur nos serveurs':'No uploaded MRI images are stored on our servers',
                  isFr?'L\'inférence est effectuée et les résultats sont immédiatement supprimés':'Inference is performed and results are immediately discarded',
                  isFr?'Aucun identifiant patient n\'est collecté ou transmis':'No patient identifiers are collected or transmitted',
                  isFr?'Toutes les données de démonstration sont entièrement fictives':'All demonstration data is entirely fictional',
                ]},
                { icon:'🌐', title:isFr?'Infrastructure':'Infrastructure', color:'#00B4D8', desc:isFr?"L'inférence backend est hébergée sur HuggingFace Spaces — une plateforme ML open source de confiance. Le frontend est déployé sur Vercel.":"Backend inference is hosted on HuggingFace Spaces — a trusted open-source ML platform. Frontend deployed on Vercel.", points:[
                  isFr?'Backend: HuggingFace Spaces (FastAPI + PyTorch)':'Backend: HuggingFace Spaces (FastAPI + PyTorch)',
                  isFr?'Frontend: Vercel (React + Vite)':'Frontend: Vercel (React + Vite)',
                  isFr?'Communication HTTPS uniquement':'HTTPS-only communication',
                  isFr?'Aucune journalisation des requêtes médicales':'No logging of medical queries',
                ]},
                { icon:'⚖', title:isFr?'Cadre LPRPDE':'PIPEDA Framework', color:'#FFB703', desc:isFr?"Dans un contexte de déploiement réel, IllumaDX respecterait les exigences de la Loi sur la protection des renseignements personnels et les documents électroniques (LPRPDE) du Canada.":"In a real deployment context, IllumaDX would comply with Canada's Personal Information Protection and Electronic Documents Act (PIPEDA) requirements.", points:[
                  isFr?'Consentement explicite requis pour le traitement des données de santé':'Explicit consent required for health data processing',
                  isFr?'Droits d\'accès et suppression des données pour les patients':'Data access and deletion rights for patients',
                  isFr?'Officier de protection des données désigné':'Designated data protection officer',
                  isFr?'Rapport annuel de confidentialité':'Annual privacy audit',
                ]},
              ].map(({icon,title,color,desc,points})=>(
                <div key={title} style={{ background:'rgba(10,22,40,0.6)', border:`1px solid ${color}22`, borderRadius:'10px', padding:'22px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'12px' }}>
                    <span style={{ fontSize:'22px' }}>{icon}</span>
                    <span style={{ fontSize:'14px', fontWeight:'700', color:'#fff' }}>{title}</span>
                  </div>
                  <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.45)', lineHeight:'1.75', marginBottom:'14px' }}>{desc}</p>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
                    {points.map((p,i)=>(
                      <div key={i} style={{ display:'flex', gap:'8px', alignItems:'flex-start' }}>
                        <div style={{ width:'5px', height:'5px', borderRadius:'50%', background:color, flexShrink:0, marginTop:'6px' }} />
                        <span style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', lineHeight:'1.5' }}>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* COST ANALYSIS */}
        {activeTab==='cost' && (
          <div style={{ animation:'fadeIn 0.3s ease' }}>
            <div style={{ background:'rgba(0,180,216,0.04)', border:'1px solid rgba(0,180,216,0.18)', borderRadius:'12px', padding:'28px', marginBottom:'20px' }}>
              <p style={{ fontSize:'9px', color:'#00B4D8', letterSpacing:'4px', fontWeight:'700', marginBottom:'16px' }}>{isFr?'ANALYSE COÛTS — CANADA':'COST ANALYSIS — CANADA'}</p>
              <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.55)', lineHeight:'1.85', marginBottom:'24px' }}>
                {isFr
                  ? "Le coût réel de la détection tardive des tumeurs cérébrales ne se mesure pas seulement en dollars. IllumaDX vise à réduire le temps de diagnostic et les inégalités d'accès."
                  : "The real cost of late brain tumor detection is not measured only in dollars. IllumaDX aims to reduce diagnostic time and access inequalities."}
              </p>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px', marginBottom:'24px' }}>
                <div style={{ padding:'20px', background:'rgba(230,57,70,0.06)', border:'1px solid rgba(230,57,70,0.2)', borderRadius:'10px' }}>
                  <p style={{ fontSize:'10px', color:'#E63946', letterSpacing:'3px', fontWeight:'700', marginBottom:'12px' }}>{isFr?'SANS ILLUMADX':'WITHOUT ILLUMADX'}</p>
                  {[
                    [isFr?'Consultation spécialiste':'Specialist consult','$300–$500 CAD'],
                    [isFr?'Attente médiane':'Median wait time','3–6 semaines / weeks'],
                    [isFr?'Interprétation MRI':'MRI interpretation','$150–$300 CAD'],
                    [isFr?'Référence neurologie':'Neurology referral','$500–$800 CAD'],
                    [isFr?'Délai total':'Total delay','4–8 semaines / weeks'],
                  ].map(([l,v])=>(
                    <div key={l} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
                      <span style={{ fontSize:'12px', color:'rgba(255,255,255,0.45)' }}>{l}</span>
                      <span style={{ fontSize:'12px', fontWeight:'700', color:'#E63946' }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div style={{ padding:'20px', background:'rgba(16,185,129,0.05)', border:'1px solid rgba(16,185,129,0.2)', borderRadius:'10px' }}>
                  <p style={{ fontSize:'10px', color:'#10B981', letterSpacing:'3px', fontWeight:'700', marginBottom:'12px' }}>{isFr?'AVEC ILLUMADX':'WITH ILLUMADX'}</p>
                  {[
                    [isFr?'Pré-triage IA':'AI pre-triage','~$0 (open source)'],
                    [isFr?'Temps de résultat':'Result time','< 30 secondes / seconds'],
                    [isFr?'Interprétabilité':'Interpretability','GradCAM++ inclus / included'],
                    [isFr?'Infra. hébergement':'Hosting infra','< $50/mois (HuggingFace)'],
                    [isFr?'Délai IA initial':'Initial AI triage','Immédiat / Immediate'],
                  ].map(([l,v])=>(
                    <div key={l} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
                      <span style={{ fontSize:'12px', color:'rgba(255,255,255,0.45)' }}>{l}</span>
                      <span style={{ fontSize:'12px', fontWeight:'700', color:'#10B981' }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Patient journey */}
              <p style={{ fontSize:'9px', color:'rgba(255,255,255,0.25)', letterSpacing:'3px', fontWeight:'600', marginBottom:'14px' }}>{isFr?'PARCOURS PATIENT':'PATIENT JOURNEY'}</p>
              <div style={{ display:'flex', gap:'0', alignItems:'stretch', overflowX:'auto' }}>
                {[
                  { step:isFr?'Symptômes':'Symptoms', desc:isFr?'Maux de tête, vision':'Headaches, vision', icon:'🤒', color:'#E63946', withAI:true },
                  { step:isFr?'MRI Scan':'MRI Scan', desc:isFr?'Scan commandé':'Scan ordered', icon:'🧲', color:'#FFB703', withAI:true },
                  { step:isFr?'Triage IA':'AI Triage', desc:isFr?'IllumaDX: < 30s':'IllumaDX: <30s', icon:'⚡', color:'#00B4D8', aiOnly:true },
                  { step:isFr?'Radiologue':'Radiologist', desc:isFr?'Confirmation':'Confirmation', icon:'👨‍⚕️', color:'#10B981', withAI:true },
                  { step:isFr?'Traitement':'Treatment', desc:isFr?'Plan initié':'Plan initiated', icon:'💊', color:'#10B981', withAI:true },
                ].map((s,i)=>(
                  <div key={i} style={{ display:'flex', alignItems:'center' }}>
                    <div style={{ padding:'14px 16px', background:`${s.color}08`, border:`1px solid ${s.color}30`, borderRadius:'8px', textAlign:'center', minWidth:'90px' }}>
                      <div style={{ fontSize:'20px', marginBottom:'6px' }}>{s.icon}</div>
                      <p style={{ fontSize:'10px', fontWeight:'700', color:s.color, marginBottom:'3px' }}>{s.step}</p>
                      <p style={{ fontSize:'9px', color:'rgba(255,255,255,0.3)', lineHeight:'1.4' }}>{s.desc}</p>
                      {s.aiOnly && <div style={{ marginTop:'6px', fontSize:'8px', background:'rgba(0,180,216,0.2)', color:'#00B4D8', padding:'2px 6px', borderRadius:'3px', fontWeight:'700' }}>AI ONLY</div>}
                    </div>
                    {i < 4 && <div style={{ width:'20px', height:'2px', background:'rgba(255,255,255,0.1)', flexShrink:0 }} />}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ padding:'20px 24px', background:'rgba(16,185,129,0.05)', border:'1px solid rgba(16,185,129,0.15)', borderRadius:'10px' }}>
              <p style={{ fontSize:'13px', fontWeight:'700', color:'#10B981', marginBottom:'8px' }}>
                {isFr?'Impact Potentiel':'Potential Impact'}
              </p>
              <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', lineHeight:'1.8' }}>
                {isFr
                  ? "En Alberta rurale, les patients attendant un spécialiste en neurologie attendent en moyenne 14 semaines. Un outil de pré-triage comme IllumaDX ne remplace pas le radiologue — il informe le triage, accélère les référencements urgents, et peut réduire le délai moyen de diagnostic de plusieurs semaines dans des régions sous-desservies comme Fort McMurray."
                  : "In rural Alberta, patients waiting for a neurology specialist wait an average of 14 weeks. A pre-triage tool like IllumaDX doesn't replace the radiologist — it informs triage, accelerates urgent referrals, and can potentially reduce mean diagnostic delay by several weeks in underserved regions like Fort McMurray."}
              </p>
            </div>
          </div>
        )}
      </div>
    </SubPageWrapper>
  )
}

// ─── PRINT HELPER ─────────────────────────────────────────────────────────────
function printPatientReport(patient, result, lang) {
  const isFr = lang === 'fr'
  const now = new Date()
  const tumorColor = CLASS_COLORS[result.prediction] || '#10B981'
  const win = window.open('', '_blank')
  win.document.write(`<!DOCTYPE html><html><head><title>IllumaDX Report — ${patient.name}</title>
  <style>@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Inter',sans-serif;background:#fff;color:#111;padding:40px;font-size:13px}.header{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid #0A1628;padding-bottom:20px;margin-bottom:28px}.logo{font-size:28px;font-weight:900;letter-spacing:2px}.logo span{color:#00B4D8}.badge{display:inline-block;background:#0A1628;color:#fff;font-size:9px;font-weight:800;padding:3px 10px;border-radius:3px;letter-spacing:2px;margin-bottom:6px}.section{margin-bottom:24px}.sec-title{font-size:9px;font-weight:800;letter-spacing:3px;color:#888;margin-bottom:10px;border-bottom:1px solid #eee;padding-bottom:6px}.grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}.field label{font-size:9px;color:#999;font-weight:700;display:block;margin-bottom:2px}.field p{font-size:13px;font-weight:600}.result-box{background:#f8f9fa;border:2px solid ${tumorColor};border-radius:8px;padding:20px 24px;display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.prediction{font-size:32px;font-weight:900;color:${tumorColor};letter-spacing:2px;text-transform:uppercase}.confidence{font-size:40px;font-weight:900;color:#10B981}.bar-row{display:flex;align-items:center;gap:10px;margin-bottom:8px}.bar-label{width:90px;font-size:11px;font-weight:700;text-transform:uppercase}.bar-track{flex:1;height:8px;background:#eee;border-radius:4px;overflow:hidden}.bar-fill{height:100%;border-radius:4px}.scan-row{display:flex;gap:12px;padding:10px 0;border-bottom:1px solid #f0f0f0}.scan-dot{width:8px;height:8px;border-radius:50%;background:#0A1628;flex-shrink:0;margin-top:4px}.disclaimer{background:#fff8e1;border:1px solid #FFB703;border-radius:6px;padding:14px 18px;font-size:11px;color:#7a5c00;line-height:1.7;margin-top:20px}.footer{margin-top:32px;padding-top:16px;border-top:1px solid #eee;display:flex;justify-content:space-between;font-size:10px;color:#aaa}.pill{display:inline-block;background:#f0f0f0;padding:2px 8px;border-radius:20px;font-size:10px;margin:2px}@media print{body{padding:20px}}</style>
  </head><body>
  <div class="header"><div><div class="logo">ILLUMA<span>DX</span></div><div style="font-size:10px;color:#888;margin-top:4px;letter-spacing:1px">BECAUSE DIAGNOSIS STARTS WITH CLARITY</div></div>
  <div style="text-align:right;font-size:11px;color:#666;line-height:1.8"><div class="badge">DIAGNOSTIC REPORT</div><br>
  ${isFr?'Date':'Report Date'}: ${now.toLocaleDateString('en-CA')} ${now.toLocaleTimeString('en-CA',{hour:'2-digit',minute:'2-digit'})}<br>
  ${isFr?'Établissement':'Facility'}: ${patient.facility}<br>
  ${isFr?'Médecin':'Physician'}: ${patient.physician}<br>
  ${isFr?'ID Patient':'Patient ID'}: ${patient.id}</div></div>
  <div class="section"><div class="sec-title">${isFr?'INFORMATIONS PATIENT':'PATIENT INFORMATION'}</div>
  <div class="grid3"><div class="field"><label>${isFr?'NOM':'NAME'}</label><p>${patient.name}</p></div>
  <div class="field"><label>${isFr?'DATE NAISSANCE':'DOB'}</label><p>${patient.dob}</p></div>
  <div class="field"><label>${isFr?'ÂGE/SEXE':'AGE/SEX'}</label><p>${patient.age}y · ${patient.sex}</p></div>
  <div class="field"><label>${isFr?'SANG':'BLOOD'}</label><p>${patient.bloodType}</p></div>
  <div class="field"><label>${isFr?'SERVICE':'DEPT'}</label><p>${patient.dept}</p></div>
  <div class="field"><label>${isFr?'DATE SCAN':'SCAN DATE'}</label><p>${patient.scanDate}</p></div></div>
  <div style="margin-top:12px"><div class="field"><label>ALLERGIES</label><p>${patient.allergies.map(a=>`<span class="pill">${a}</span>`).join('')}</p></div></div>
  <div style="margin-top:8px"><div class="field"><label>${isFr?'MÉDICAMENTS':'MEDICATIONS'}</label><p>${patient.medications.map(m=>`<span class="pill">${m}</span>`).join('')}</p></div></div></div>
  <div class="section"><div class="sec-title">${isFr?'RÉSULTAT ILLUMADX':'ILLUMADX AI RESULT'}</div>
  <div class="result-box">
  <div><div style="font-size:9px;color:#999;letter-spacing:2px;margin-bottom:4px">${isFr?'DIAGNOSTIC':'DIAGNOSIS'}</div><div class="prediction">${result.prediction}</div><div style="font-size:11px;color:#888;margin-top:6px">GroupB ResNet-18 · GradCAM++</div></div>
  <div style="text-align:right"><div style="font-size:9px;color:#999;letter-spacing:2px;margin-bottom:4px">${isFr?'CONFIANCE':'CONFIDENCE'}</div><div class="confidence">${(result.confidence*100).toFixed(1)}%</div></div></div>
  ${['glioma','meningioma','notumor','pituitary'].map(cls=>{const p=(result.probabilities[cls]||0)*100;const isTop=cls===result.prediction;const c=CLASS_COLORS[cls];return`<div class="bar-row"><div class="bar-label" style="color:${isTop?c:'#555'}">${cls}</div><div class="bar-track"><div class="bar-fill" style="width:${p.toFixed(1)}%;background:${isTop?c:'#ddd'}"></div></div><div style="width:45px;text-align:right;font-size:11px;font-weight:700;color:${isTop?c:'#999'}">${p.toFixed(1)}%</div></div>`}).join('')}</div>
  <div class="section"><div class="sec-title">MODEL BENCHMARKS — GroupB ResNet-18</div>
  <div class="grid3"><div class="field"><label>ACCURACY</label><p style="color:#10B981">99.69% ±0.14%</p></div>
  <div class="field"><label>AUC</label><p>0.9996</p></div><div class="field"><label>ECE</label><p>0.0030</p></div>
  <div class="field"><label>COHEN'S D</label><p style="color:#E63946">4.750</p></div>
  <div class="field"><label>ANOVA F</label><p>38.931</p></div><div class="field"><label>SEEDS</label><p>10</p></div></div></div>
  <div class="section"><div class="sec-title">${isFr?'HISTORIQUE DES SCANS':'SCAN HISTORY'}</div>
  ${patient.scanHistory.map(s=>`<div class="scan-row"><div class="scan-dot"></div><div style="flex:1"><div style="font-size:12px;font-weight:700;color:#111;margin-bottom:2px">${s.result}</div><div style="font-size:10px;color:#aaa;margin-bottom:2px">${s.date} · ${s.type} · ${s.provider}</div><div style="font-size:11px;color:#666">${s.notes}</div></div></div>`).join('')}</div>
  <div class="disclaimer">⚠ <strong>${isFr?'Avertissement Clinique':'Clinical Disclaimer'}:</strong> ${isFr?'Outil de recherche uniquement. Non approuvé par Santé Canada. Données simulées.':'Research tool only. Not approved by Health Canada. All patient data is simulated for demonstration.'}</div>
  <div class="footer"><div>IllumaDX · CWSF 2026 · illumadx.vercel.app · Arhaan Kureshi, Westwood Community High School</div><div>${now.toLocaleDateString('en-CA')}</div></div>
  <script>window.onload=()=>window.print()</script></body></html>`)
  win.document.close()
}

// ─── PATIENT RECORDS PAGE ─────────────────────────────────────────────────────
function PatientRecordsPage({ lang, onClose }) {
  const [searchId, setSearchId] = useState('')
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [patients, setPatients] = useState(INITIAL_PATIENTS)
  const [searchError, setSearchError] = useState(false)
  const isFr = lang === 'fr'

  const handleSearch = () => {
    const found = patients.find(p => p.id.toLowerCase() === searchId.trim().toLowerCase())
    if (found) { setSelectedPatient(found); setSearchError(false) }
    else setSearchError(true)
  }

  const handleScanComplete = (patientId, result) => {
    const now = new Date()
    const dateStr = now.toISOString().split('T')[0]
    const newEntry = { date:dateStr, type:'MRI Brain — IllumaDX AI Analysis', result:`${result.prediction.toUpperCase()} — ${(result.confidence*100).toFixed(1)}% confidence (IllumaDX)`, provider:'IllumaDX AI System', notes:`GradCAM++ analysis. GroupB ResNet-18. ${result.prediction} with ${(result.confidence*100).toFixed(1)}% confidence.` }
    setPatients(prev => prev.map(p => {
      if (p.id !== patientId) return p
      const updated = { ...p, latestResult:result, status:'Scan Complete', statusColor:result.prediction==='notumor'?'#10B981':'#E63946', scanHistory:[newEntry,...p.scanHistory] }
      setSelectedPatient(updated)
      return updated
    }))
  }

  const doneCount = patients.filter(p => p.latestResult).length

  return (
    <div style={{ position:'fixed', inset:0, zIndex:500, background:'#05080F', display:'flex', flexDirection:'column', fontFamily:"'Inter',system-ui,sans-serif", animation:'slideUp 0.35s cubic-bezier(0.16,1,0.3,1)' }}>
      <style>{BASE_CSS + LANDING_CSS}</style>

      {/* HEADER BAR */}
      <div style={{ background:'rgba(10,22,40,0.94)', borderBottom:'1px solid rgba(16,185,129,0.22)', padding:'0 24px', height:'66px', display:'flex', alignItems:'center', justifyContent:'space-between', backdropFilter:'blur(24px) saturate(140%)', WebkitBackdropFilter:'blur(24px) saturate(140%)', flexShrink:0, position:'relative' }}>
        <CornerMark pos="tl" offset={10} color="#10B981" /><CornerMark pos="tr" offset={10} color="#10B981" />
        <div style={{ display:'flex', alignItems:'center', gap:'16px', flexShrink:0, minWidth:0 }}>
          <button onClick={onClose} onMouseMove={tintMove} className="cta-ghost" style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', color:'rgba(255,255,255,0.6)', borderRadius:'6px', width:'34px', height:'34px', cursor:'pointer', fontSize:'14px', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'inherit', flexShrink:0 }}>←</button>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'24px', letterSpacing:'2px', lineHeight:1, flexShrink:0 }}><span style={{ color:'#fff' }}>Illuma</span><span style={{ color:'#00B4D8' }}>DX</span></div>
          <div style={{ width:'1px', height:'20px', background:'rgba(255,255,255,0.12)' }} />
          <span className="mono" style={{ fontSize:'10px', color:'#10B981', letterSpacing:'2.5px', fontWeight:'700', textTransform:'uppercase', whiteSpace:'nowrap' }}>{isFr?'Dossiers Patients':'Patient Records'}</span>
          <span style={{ width:'14px', height:'1px', background:'rgba(255,255,255,0.12)' }} />
          <span className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.45)', letterSpacing:'2px', textTransform:'uppercase', whiteSpace:'nowrap' }}>§ 00 · EHR · Connect Care</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'10px', flexShrink:0 }}>
          <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#10B981', animation:'ripple 2s infinite' }} />
          <span className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.5)', letterSpacing:'2px', textTransform:'uppercase' }}>Northern Lights Regional</span>
        </div>
      </div>

      <div style={{ display:'flex', flex:1, overflow:'hidden' }}>
        {/* LEFT SIDEBAR */}
        <div style={{ width:'320px', borderRight:'1px solid rgba(255,255,255,0.06)', display:'flex', flexDirection:'column', flexShrink:0, background:'rgba(5,8,15,0.55)' }}>
          {/* Search */}
          <div style={{ padding:'20px 18px 16px', borderBottom:'1px solid rgba(255,255,255,0.05)', flexShrink:0 }}>
            <p className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.4)', letterSpacing:'2.5px', marginBottom:'12px', fontWeight:'700', textTransform:'uppercase' }}>{isFr?'Chercher par ID':'Search by ID'}</p>
            <div style={{ display:'flex', gap:'6px' }}>
              <input value={searchId} onChange={e=>{setSearchId(e.target.value);setSearchError(false)}} onKeyDown={e=>e.key==='Enter'&&handleSearch()} placeholder="AHS-10042" className="mono" style={{ flex:1, background:'rgba(255,255,255,0.03)', border:`1px solid ${searchError?'#E63946':'rgba(255,255,255,0.1)'}`, borderRadius:'5px', padding:'9px 12px', color:'#fff', fontSize:'12px', letterSpacing:'0.5px', fontFamily:'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace', outline:'none', transition:'border-color .2s' }} />
              <button onClick={handleSearch} onMouseMove={tintMove} className="cta-primary" style={{ padding:'9px 14px', background:'#10B981', color:'#05080F', border:'none', borderRadius:'5px', cursor:'pointer', fontSize:'10px', fontWeight:'800', fontFamily:'inherit', letterSpacing:'1.8px' }}>GO</button>
            </div>
            {searchError && <p className="mono" style={{ fontSize:'10px', color:'#E63946', marginTop:'8px', letterSpacing:'1px', textTransform:'uppercase' }}>{isFr?'Aucun patient trouvé':'No patient found'}</p>}
          </div>

          {/* List header */}
          <div style={{ padding:'14px 18px 8px', display:'flex', justifyContent:'space-between', alignItems:'center', flexShrink:0 }}>
            <span className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.4)', letterSpacing:'2.5px', fontWeight:'700', textTransform:'uppercase' }}>{isFr?'Dossiers actifs':'Active records'}</span>
            <span className="mono tnum" style={{ fontSize:'9px', color:'rgba(16,185,129,0.75)', letterSpacing:'1.5px', fontWeight:'800', background:'rgba(16,185,129,0.08)', padding:'2px 7px', borderRadius:'3px', border:'1px solid rgba(16,185,129,0.2)' }}>{doneCount}/{patients.length}</span>
          </div>

          {/* Patient rows */}
          <div style={{ flex:1, overflowY:'auto', padding:'4px 10px 16px' }}>
            {patients.map((p, i) => {
              const active = selectedPatient?.id === p.id
              return (
                <div key={p.id} onClick={()=>{setSelectedPatient(p);setSearchError(false)}} onMouseMove={tintMove}
                  style={{ position:'relative', padding:'13px 14px', borderRadius:'7px', cursor:'pointer', marginBottom:'4px', background:active?'rgba(16,185,129,0.1)':'transparent', border:`1px solid ${active?'rgba(16,185,129,0.3)':'rgba(255,255,255,0.04)'}`, transition:'all 0.2s', overflow:'hidden', '--mx':'50%', '--my':'50%' }}
                  onMouseEnter={e=>{if(!active)e.currentTarget.style.background='rgba(255,255,255,0.025)';if(!active)e.currentTarget.style.borderColor='rgba(16,185,129,0.14)'}}
                  onMouseLeave={e=>{if(!active)e.currentTarget.style.background='transparent';if(!active)e.currentTarget.style.borderColor='rgba(255,255,255,0.04)'}}>
                  <div style={{ position:'absolute', inset:0, background:'radial-gradient(160px circle at var(--mx,50%) var(--my,50%),rgba(16,185,129,0.12),transparent 55%)', opacity:active?0.9:0, transition:'opacity .3s', pointerEvents:'none' }} />
                  <div style={{ position:'relative' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'5px', gap:'8px' }}>
                      <div style={{ flex:1, minWidth:0 }}>
                        <p style={{ fontSize:'13px', fontWeight:'700', color:'#fff', marginBottom:'3px', letterSpacing:'-0.1px' }}>{p.name}</p>
                        <p className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.4)', letterSpacing:'1.5px' }}>{p.id}</p>
                      </div>
                      <span className="mono" style={{ fontSize:'8px', fontWeight:'800', color:p.statusColor, border:`1px solid ${p.statusColor}55`, padding:'2px 6px', borderRadius:'2px', letterSpacing:'1.2px', whiteSpace:'nowrap', flexShrink:0 }}>{p.status==='Scan Complete'?(isFr?'TERMINÉ':'DONE'):(isFr?'EN ATTENTE':'PENDING')}</span>
                    </div>
                    <div style={{ display:'flex', gap:'12px', flexWrap:'wrap', alignItems:'center' }}>
                      <span className="mono" style={{ fontSize:'10px', color:'rgba(255,255,255,0.45)' }}>{p.age}Y · {p.sex[0]}</span>
                      <span className="mono" style={{ fontSize:'10px', color:'rgba(255,255,255,0.3)', letterSpacing:'1px', textTransform:'uppercase' }}>{p.dept}</span>
                    </div>
                    {p.latestResult && (
                      <div style={{ marginTop:'8px', display:'flex', alignItems:'center', gap:'6px', paddingTop:'8px', borderTop:'1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ width:'5px', height:'5px', borderRadius:'50%', background:CLASS_COLORS[p.latestResult.prediction], flexShrink:0, boxShadow:`0 0 6px ${CLASS_COLORS[p.latestResult.prediction]}` }} />
                        <span className="mono" style={{ fontSize:'9px', color:CLASS_COLORS[p.latestResult.prediction], fontWeight:'800', textTransform:'uppercase', letterSpacing:'1.3px' }}>{p.latestResult.prediction}</span>
                        <span className="mono tnum" style={{ fontSize:'9px', color:'rgba(255,255,255,0.5)', marginLeft:'auto' }}>{(p.latestResult.confidence*100).toFixed(1)}%</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* MAIN */}
        {selectedPatient
          ? <PatientDetail key={selectedPatient.id} patient={selectedPatient} lang={lang} onScanComplete={r=>handleScanComplete(selectedPatient.id,r)} />
          : (
            <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'18px', padding:'20px', textAlign:'center', position:'relative' }}>
              <CornerMark pos="tl" offset={24} color="#10B981" /><CornerMark pos="tr" offset={24} color="#10B981" />
              <CornerMark pos="bl" offset={24} color="#10B981" /><CornerMark pos="br" offset={24} color="#10B981" />
              <div style={{ display:'inline-flex', color:'rgba(16,185,129,0.55)', padding:'18px', border:'1px solid rgba(16,185,129,0.2)', borderRadius:'50%', background:'rgba(16,185,129,0.03)' }}>
                <Icon name="folder" size={30} stroke={1.4} />
              </div>
              <div style={{ maxWidth:'320px' }}>
                <p className="mono" style={{ fontSize:'10px', color:'rgba(255,255,255,0.5)', letterSpacing:'3px', textTransform:'uppercase', fontWeight:'700', marginBottom:'10px' }}>{isFr?'Sélectionner un patient':'Select a patient'}</p>
                <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.36)', lineHeight:'1.75', fontWeight:'300' }}>{isFr?'Choisissez un dossier dans la liste pour visualiser l\'historique clinique et lancer une analyse IA.':'Choose a record from the list to view clinical history and run AI analysis.'}</p>
              </div>
              <div style={{ display:'flex', gap:'10px', marginTop:'4px' }}>
                <span className="mono tnum" style={{ fontSize:'9px', color:'rgba(255,255,255,0.4)', letterSpacing:'1.5px', padding:'4px 10px', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'3px', textTransform:'uppercase' }}>{patients.length} {isFr?'patients':'patients'}</span>
                <span className="mono tnum" style={{ fontSize:'9px', color:'rgba(16,185,129,0.7)', letterSpacing:'1.5px', padding:'4px 10px', border:'1px solid rgba(16,185,129,0.25)', borderRadius:'3px', textTransform:'uppercase', background:'rgba(16,185,129,0.05)' }}>{doneCount} {isFr?'scannés':'scanned'}</span>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

function PatientDetail({ patient, lang, onScanComplete }) {
  const [scanPhase, setScanPhase] = useState(patient.latestResult?'done':'idle')
  const [localResult, setLocalResult] = useState(patient.latestResult||null)
  const [activeTab, setActiveTab] = useState('overview')
  const fileRef = useRef(null)
  const isFr = lang === 'fr'

  useEffect(()=>{ setScanPhase(patient.latestResult?'done':'idle'); setLocalResult(patient.latestResult||null) },[patient.id])

  const handleFile = async (file) => {
    if (!file||!file.type.startsWith('image/')) return
    setScanPhase('loading')
    try {
      const fd=new FormData(); fd.append('file',file)
      const res=await fetch(`${API_URL}/predict`,{method:'POST',body:fd})
      const data=await res.json()
      if(!res.ok){setScanPhase(data.error==='not_mri'?'not_mri':'invalid');return}
      setLocalResult(data); setScanPhase('done'); onScanComplete(data)
    } catch { setScanPhase('error') }
  }

  const tabs=[{id:'overview',l:isFr?'Aperçu':'Overview',num:'01'},{id:'history',l:isFr?'Historique':'Scan History',num:'02',cnt:patient.scanHistory.length},{id:'scan',l:isFr?'Analyse IA':'AI Scan',num:'03',done:!!localResult}]

  const REJ = {
    not_mri: { title:isFr?'PAS UNE IRM CÉRÉBRALE':'NOT A BRAIN MRI',  code:isFr?'ERR · SCAN_INVALIDE':'ERR · NON_BRAIN_SCAN', icon:'brain',  color:'#E63946', desc:isFr?'Cette image n\'a pas été reconnue comme une IRM cérébrale valide.':'This image was not recognized as a valid brain MRI scan.' },
    invalid: { title:isFr?'CONFIANCE INSUFFISANTE':'LOW CONFIDENCE', code:isFr?'ERR · SEUIL_60%':'ERR · CONF_GATE_<60%',   icon:'shield', color:'#E63946', desc:isFr?'La confiance du modèle est inférieure au seuil de sécurité de 60%.':'Model confidence fell below the 60% safety threshold.' },
    error:   { title:isFr?'ERREUR DE CONNEXION':'CONNECTION ERROR',  code:'ERR · NETWORK',                                icon:'file',   color:'#FFB703', desc:isFr?'Impossible de joindre le serveur d\'inférence. Réessayez.':'Could not reach the inference server. Try again.' },
  }

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', animation:'fadeIn 0.25s ease', position:'relative' }}>
      {/* PATIENT HEADER */}
      <div style={{ padding:'24px 28px 0', borderBottom:'1px solid rgba(255,255,255,0.06)', background:'rgba(10,22,40,0.3)', flexShrink:0 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'14px', marginBottom:'20px' }}>
          <div style={{ flex:1, minWidth:'280px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'8px', flexWrap:'wrap' }}>
              <h2 style={{ fontSize:'22px', fontWeight:'800', color:'#fff', letterSpacing:'-0.4px', lineHeight:1 }}>{patient.name}</h2>
              <span className="mono" style={{ fontSize:'8px', fontWeight:'800', color:patient.statusColor, border:`1px solid ${patient.statusColor}55`, padding:'3px 8px', borderRadius:'2px', letterSpacing:'1.5px' }}>{patient.status==='Scan Complete'?(isFr?'TERMINÉ':'COMPLETE'):(isFr?'EN ATTENTE':'AWAITING')}</span>
            </div>
            <p className="mono" style={{ fontSize:'10px', color:'#10B981', letterSpacing:'2px', fontWeight:'700', marginBottom:'18px', textTransform:'uppercase' }}>{patient.id} · {patient.facility}</p>
            <div style={{ display:'flex', gap:'26px', flexWrap:'wrap' }}>
              {[[isFr?'Âge / Sexe':'Age / Sex',`${patient.age}Y · ${patient.sex}`],[isFr?'Médecin':'Physician',patient.physician],[isFr?'Service':'Dept',patient.dept],[isFr?'Scan':'Scan date',patient.scanDate],[isFr?'Groupe':'Blood type',patient.bloodType]].map(([l,v])=>(
                <div key={l}>
                  <p className="mono" style={{ fontSize:'8px', color:'rgba(255,255,255,0.38)', letterSpacing:'2px', marginBottom:'5px', textTransform:'uppercase', fontWeight:'700' }}>{l}</p>
                  <p className="mono" style={{ fontSize:'12px', fontWeight:'600', color:'rgba(255,255,255,0.82)', letterSpacing:'0.2px' }}>{v}</p>
                </div>
              ))}
            </div>
          </div>
          {localResult && (
            <button onClick={()=>printPatientReport(patient,localResult,lang)} onMouseMove={tintMove} className="cta-ghost" style={{ display:'inline-flex', alignItems:'center', gap:'10px', padding:'10px 18px', background:'rgba(255,183,3,0.06)', border:'1px solid rgba(255,183,3,0.3)', color:'#FFB703', borderRadius:'5px', cursor:'pointer', fontSize:'10px', fontWeight:'800', letterSpacing:'1.6px', fontFamily:'inherit', textTransform:'uppercase', flexShrink:0 }}>
              <span style={{ display:'inline-flex', alignItems:'center', gap:'9px' }}><Icon name="file" size={12} stroke={1.8} />{isFr?'Export PDF':'Export PDF'}</span>
            </button>
          )}
        </div>

        {/* TABS */}
        <div style={{ display:'flex', gap:'30px', marginTop:'8px' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={()=>setActiveTab(t.id)} style={{ padding:'0 0 14px', background:'transparent', border:'none', color:activeTab===t.id?'#fff':'rgba(255,255,255,0.42)', fontSize:'11px', fontWeight:activeTab===t.id?'700':'600', letterSpacing:'1.8px', textTransform:'uppercase', cursor:'pointer', position:'relative', fontFamily:'inherit', display:'inline-flex', alignItems:'center', gap:'8px', transition:'color .2s' }}
              onMouseEnter={e=>{if(activeTab!==t.id)e.currentTarget.style.color='rgba(255,255,255,0.75)'}}
              onMouseLeave={e=>{if(activeTab!==t.id)e.currentTarget.style.color='rgba(255,255,255,0.42)'}}>
              <span className="mono" style={{ fontSize:'9px', color:activeTab===t.id?'#00B4D8':'rgba(255,255,255,0.32)', letterSpacing:'1.2px' }}>{t.num}</span>
              {t.l}
              {t.cnt!=null && <span className="mono tnum" style={{ fontSize:'9px', color:activeTab===t.id?'#00B4D8':'rgba(255,255,255,0.38)', background:activeTab===t.id?'rgba(0,180,216,0.1)':'rgba(255,255,255,0.04)', padding:'2px 6px', borderRadius:'2px', letterSpacing:'0.5px', fontWeight:'700' }}>{t.cnt}</span>}
              {t.done && <span className="mono" style={{ fontSize:'9px', fontWeight:'800', color:'#10B981', background:'rgba(16,185,129,0.12)', padding:'2px 6px', borderRadius:'2px', letterSpacing:'0.5px' }}>✓</span>}
              {activeTab===t.id && <span style={{ position:'absolute', left:0, right:0, bottom:-1, height:'2px', background:'#00B4D8', borderRadius:'1px' }} />}
            </button>
          ))}
        </div>
      </div>

      {/* TAB CONTENT */}
      <div style={{ flex:1, overflowY:'auto', padding:'26px 28px' }}>

        {/* OVERVIEW */}
        {activeTab==='overview' && (
          <div style={{ animation:'fadeIn 0.25s ease' }}>
            <div style={{ border:'1px solid rgba(255,255,255,0.06)', borderRadius:'8px', padding:'20px 22px', marginBottom:'12px', background:'rgba(10,22,40,0.4)' }}>
              <p className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.4)', letterSpacing:'2.5px', marginBottom:'12px', fontWeight:'700', textTransform:'uppercase' }}>§ 01 · {isFr?'Historique clinique':'Clinical history'}</p>
              <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.68)', lineHeight:'1.85', fontWeight:'300' }}>{patient.history}</p>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'12px' }}>
              {[[isFr?'Allergies':'Allergies',patient.allergies,'#E63946'],[isFr?'Médications':'Medications',patient.medications,'#00B4D8']].map(([title,items,color])=>(
                <div key={title} style={{ border:'1px solid rgba(255,255,255,0.06)', borderRadius:'8px', padding:'18px 20px', background:'rgba(10,22,40,0.4)' }}>
                  <p className="mono" style={{ fontSize:'9px', color, letterSpacing:'2.5px', marginBottom:'12px', fontWeight:'700', textTransform:'uppercase' }}>{title}</p>
                  {items.map((a,i)=>(
                    <div key={i} style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'7px' }}>
                      <div style={{ width:'4px', height:'4px', borderRadius:'50%', background:color, flexShrink:0 }} />
                      <span style={{ fontSize:'12px', color:'rgba(255,255,255,0.7)', fontWeight:'400' }}>{a}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {localResult ? (
              <div style={{ position:'relative', border:`1px solid ${CLASS_COLORS[localResult.prediction]}44`, borderRadius:'8px', padding:'18px 22px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'14px', background:`linear-gradient(180deg,${CLASS_COLORS[localResult.prediction]}0D,transparent)`, overflow:'hidden' }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:`linear-gradient(90deg,transparent,${CLASS_COLORS[localResult.prediction]},transparent)` }} />
                <div>
                  <p className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.4)', letterSpacing:'2.5px', marginBottom:'6px', textTransform:'uppercase', fontWeight:'700' }}>{isFr?'Dernier résultat IllumaDX':'Latest IllumaDX result'}</p>
                  <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'30px', color:CLASS_COLORS[localResult.prediction], letterSpacing:'2px', margin:0, lineHeight:1, textTransform:'uppercase' }}>{localResult.prediction}</h3>
                </div>
                <div style={{ display:'flex', gap:'20px', alignItems:'center', flexWrap:'wrap' }}>
                  <div style={{ textAlign:'right' }}>
                    <p className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.4)', letterSpacing:'2.5px', marginBottom:'4px', textTransform:'uppercase', fontWeight:'700' }}>{isFr?'Confiance':'Confidence'}</p>
                    <p className="tnum" style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'36px', color:'#10B981', margin:0, lineHeight:1, letterSpacing:'-0.5px' }}>{(localResult.confidence*100).toFixed(1)}<span style={{ fontSize:'0.5em', marginLeft:'2px' }}>%</span></p>
                  </div>
                  <button onClick={()=>setActiveTab('scan')} onMouseMove={tintMove} className="cta-ghost" style={{ padding:'10px 18px', background:'rgba(0,180,216,0.06)', border:'1px solid rgba(0,180,216,0.25)', color:'#00B4D8', borderRadius:'5px', cursor:'pointer', fontSize:'10px', fontWeight:'800', fontFamily:'inherit', letterSpacing:'1.6px', display:'inline-flex', alignItems:'center', gap:'8px', textTransform:'uppercase' }}>
                    <span style={{ display:'inline-flex', alignItems:'center', gap:'8px' }}>{isFr?'Heatmaps':'Heatmaps'}<Icon name="arrow" size={11} stroke={2.4} /></span>
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ border:'1px dashed rgba(0,180,216,0.22)', borderRadius:'8px', padding:'28px 24px', textAlign:'center', background:'rgba(0,180,216,0.02)' }}>
                <div style={{ display:'inline-flex', color:'#00B4D8', padding:'12px', border:'1px solid rgba(0,180,216,0.3)', borderRadius:'50%', background:'rgba(0,180,216,0.05)', marginBottom:'16px' }}><Icon name="upload" size={20} stroke={1.5} /></div>
                <p className="mono" style={{ fontSize:'10px', color:'#00B4D8', letterSpacing:'2.5px', textTransform:'uppercase', fontWeight:'700', marginBottom:'8px' }}>{isFr?'Aucune analyse IA':'No AI analysis yet'}</p>
                <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.4)', marginBottom:'20px', fontWeight:'300' }}>{isFr?'Lancez une analyse GradCAM++ pour ce patient.':'Run a GradCAM++ analysis for this patient.'}</p>
                <button onClick={()=>setActiveTab('scan')} onMouseMove={tintMove} className="cta-primary" style={{ display:'inline-flex', alignItems:'center', gap:'10px', padding:'11px 24px', background:'#00B4D8', color:'#05080F', border:'none', borderRadius:'5px', cursor:'pointer', fontSize:'10px', fontWeight:'800', fontFamily:'inherit', letterSpacing:'1.8px', textTransform:'uppercase', boxShadow:'0 0 28px rgba(0,180,216,0.25)' }}>
                  <span style={{ display:'inline-flex', alignItems:'center', gap:'10px' }}>{isFr?'Lancer scan':'Run scan'}<Icon name="arrow" size={11} stroke={2.4} /></span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* HISTORY */}
        {activeTab==='history' && (
          <div style={{ animation:'fadeIn 0.25s ease' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px', flexWrap:'wrap', gap:'8px' }}>
              <p className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.42)', letterSpacing:'2.5px', fontWeight:'700', textTransform:'uppercase' }}>§ 02 · {patient.scanHistory.length} {isFr?'entrées':'entries'}</p>
              <p className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.3)', letterSpacing:'2px', fontWeight:'700', textTransform:'uppercase' }}>{isFr?'Plus récent → plus ancien':'Most recent → oldest'}</p>
            </div>
            <div style={{ position:'relative' }}>
              <div style={{ position:'absolute', left:'15px', top:8, bottom:8, width:'1px', background:'linear-gradient(180deg,rgba(0,180,216,0.3),rgba(255,255,255,0.04))' }} />
              {patient.scanHistory.map((s, i) => {
                const isAI = s.provider === 'IllumaDX AI System'
                const dc = isAI ? '#00B4D8' : i === 0 ? '#10B981' : 'rgba(255,255,255,0.22)'
                return (
                  <div key={i} style={{ display:'flex', gap:'14px', marginBottom:'14px', position:'relative' }}>
                    <div style={{ width:'31px', flexShrink:0, display:'flex', justifyContent:'center', alignItems:'flex-start', paddingTop:'14px' }}>
                      <div style={{ width:'12px', height:'12px', borderRadius:'50%', background:dc, flexShrink:0, boxShadow:i===0?`0 0 0 3px ${dc}22, 0 0 18px ${dc}77`:'none', position:'relative', zIndex:1 }} />
                    </div>
                    <div style={{ flex:1, background:isAI?'rgba(0,180,216,0.04)':'rgba(10,22,40,0.4)', border:`1px solid ${isAI?'rgba(0,180,216,0.22)':'rgba(255,255,255,0.05)'}`, borderRadius:'7px', padding:'14px 18px', transition:'all 0.2s' }}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'8px', flexWrap:'wrap', gap:'8px' }}>
                        <div style={{ flex:1, minWidth:'200px' }}>
                          <p style={{ fontSize:'13px', fontWeight:'700', color:'#fff', marginBottom:'4px', letterSpacing:'-0.1px' }}>{s.result}</p>
                          <p className="mono" style={{ fontSize:'10px', color:'rgba(255,255,255,0.38)', letterSpacing:'0.5px', textTransform:'uppercase' }}>{s.type} · {s.provider}</p>
                        </div>
                        <span className="mono tnum" style={{ fontSize:'10px', color:i===0?'#10B981':'rgba(255,255,255,0.4)', fontWeight:i===0?'700':'600', background:i===0?'rgba(16,185,129,0.1)':'transparent', padding:'3px 8px', borderRadius:'3px', border:i===0?'1px solid rgba(16,185,129,0.22)':'none', whiteSpace:'nowrap', letterSpacing:'0.3px' }}>{s.date}</span>
                      </div>
                      <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', lineHeight:'1.75', fontWeight:'300' }}>{s.notes}</p>
                      {isAI && (
                        <div style={{ marginTop:'10px', display:'flex', alignItems:'center', gap:'8px' }}>
                          <div style={{ width:'5px', height:'5px', borderRadius:'50%', background:'#00B4D8', boxShadow:'0 0 6px #00B4D8' }} />
                          <span className="mono" style={{ fontSize:'9px', color:'#00B4D8', fontWeight:'800', letterSpacing:'1.5px', textTransform:'uppercase' }}>IllumaDX · GradCAM++ {isFr?'vérifié':'verified'}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* AI SCAN */}
        {activeTab==='scan' && (
          <div style={{ animation:'fadeIn 0.25s ease' }}>
            <p className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.42)', letterSpacing:'2.5px', marginBottom:'14px', fontWeight:'700', textTransform:'uppercase' }}>§ 03 · {isFr?'Analyse IllumaDX':'IllumaDX analysis'}</p>

            {scanPhase==='idle' && (
              <div style={{ border:'1px solid rgba(0,180,216,0.2)', borderRadius:'10px', padding:'44px 30px', textAlign:'center', background:'rgba(0,180,216,0.02)', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(0,180,216,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,180,216,0.05) 1px,transparent 1px)', backgroundSize:'40px 40px', maskImage:'radial-gradient(circle at 50% 50%,black 0%,transparent 78%)', WebkitMaskImage:'radial-gradient(circle at 50% 50%,black 0%,transparent 78%)', pointerEvents:'none' }} />
                <div style={{ position:'relative' }}>
                  <div style={{ display:'inline-flex', color:'#00B4D8', padding:'14px', border:'1px solid rgba(0,180,216,0.3)', borderRadius:'50%', background:'rgba(0,180,216,0.04)', marginBottom:'18px' }}><Icon name="upload" size={26} stroke={1.4} /></div>
                  <p className="mono" style={{ fontSize:'11px', color:'#00B4D8', letterSpacing:'2.5px', fontWeight:'700', textTransform:'uppercase', marginBottom:'10px' }}>{isFr?'Téléverser IRM':'Upload MRI scan'}</p>
                  <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.42)', lineHeight:'1.7', marginBottom:'26px', fontWeight:'300', maxWidth:'420px', marginLeft:'auto', marginRight:'auto' }}>{isFr?"Téléversez l'IRM de ce patient pour lancer l'analyse IA en temps réel avec GradCAM++.":"Upload this patient's MRI scan to run real-time AI analysis with GradCAM++."}</p>
                  <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={e=>handleFile(e.target.files[0])} />
                  <button onClick={()=>fileRef.current.click()} onMouseMove={tintMove} className="cta-primary" style={{ display:'inline-flex', alignItems:'center', gap:'10px', padding:'12px 28px', background:'#00B4D8', color:'#05080F', border:'none', borderRadius:'5px', cursor:'pointer', fontSize:'11px', fontWeight:'800', letterSpacing:'1.8px', fontFamily:'inherit', textTransform:'uppercase', boxShadow:'0 0 32px rgba(0,180,216,0.28)' }}>
                    <span style={{ display:'inline-flex', alignItems:'center', gap:'10px' }}>{isFr?'Lancer scan':'Run IllumaDX scan'}<Icon name="arrow" size={11} stroke={2.4} /></span>
                  </button>
                </div>
              </div>
            )}

            {scanPhase==='loading' && (
              <div style={{ textAlign:'center', padding:'52px 20px', border:'1px solid rgba(0,180,216,0.15)', borderRadius:'10px', background:'rgba(0,180,216,0.02)' }}>
                <div style={{ width:'44px', height:'44px', border:'2px solid rgba(0,180,216,0.15)', borderTop:'2px solid #00B4D8', borderRadius:'50%', animation:'spin 0.9s linear infinite', margin:'0 auto 18px' }} />
                <p className="mono" style={{ color:'#00B4D8', fontSize:'11px', fontWeight:'700', letterSpacing:'3.5px', textTransform:'uppercase', marginBottom:'10px' }}>{isFr?'Analyse en cours':'Analyzing scan'}</p>
                <p className="mono" style={{ color:'rgba(255,255,255,0.4)', fontSize:'9px', letterSpacing:'2.2px', textTransform:'uppercase' }}>GroupB ResNet-18 · GradCAM++ · 60% {isFr?'seuil':'gate'}</p>
              </div>
            )}

            {(scanPhase==='not_mri'||scanPhase==='invalid'||scanPhase==='error') && (()=>{
              const r = REJ[scanPhase]
              return (
                <div style={{ textAlign:'center', padding:'38px 24px', border:`1px solid ${r.color}33`, borderRadius:'10px', background:`${r.color}08` }}>
                  <div style={{ display:'inline-flex', color:r.color, padding:'13px', border:`1px solid ${r.color}55`, borderRadius:'50%', background:`${r.color}0D`, marginBottom:'18px' }}>
                    <Icon name={r.icon} size={24} stroke={1.4} />
                  </div>
                  <p className="mono" style={{ color:r.color, fontSize:'9px', letterSpacing:'3px', fontWeight:'700', textTransform:'uppercase', marginBottom:'10px', opacity:0.82 }}>{r.code}</p>
                  <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'24px', color:r.color, letterSpacing:'2.5px', marginBottom:'14px', lineHeight:1 }}>{r.title}</h3>
                  <p style={{ color:'rgba(255,255,255,0.52)', fontSize:'12px', maxWidth:'380px', margin:'0 auto 22px', lineHeight:'1.7', fontWeight:'300' }}>{r.desc}</p>
                  <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={e=>handleFile(e.target.files[0])} />
                  <button onClick={()=>fileRef.current.click()} onMouseMove={tintMove} className="cta-primary" style={{ display:'inline-flex', alignItems:'center', gap:'10px', padding:'10px 24px', background:'#00B4D8', color:'#05080F', border:'none', borderRadius:'4px', cursor:'pointer', fontSize:'10px', fontWeight:'800', fontFamily:'inherit', letterSpacing:'1.8px', textTransform:'uppercase' }}>
                    <span style={{ display:'inline-flex', alignItems:'center', gap:'10px' }}>{isFr?'Réessayer':'Try again'}<Icon name="arrow" size={11} stroke={2.4} /></span>
                  </button>
                </div>
              )
            })()}

            {scanPhase==='done' && localResult && (()=>{
              const predColor = CLASS_COLORS[localResult.prediction] || '#10B981'
              const confPct = localResult.confidence * 100
              return (
                <div style={{ animation:'fadeIn 0.4s ease' }}>
                  {/* Diagnosis card */}
                  <div style={{ position:'relative', border:`1px solid ${predColor}44`, borderRadius:'10px', padding:'20px 24px', marginBottom:'18px', background:`linear-gradient(180deg,${predColor}0D,transparent)`, overflow:'hidden' }}>
                    <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:`linear-gradient(90deg,transparent,${predColor},transparent)` }} />
                    <div style={{ display:'grid', gridTemplateColumns:'1.3fr 1fr', gap:'24px', alignItems:'center' }}>
                      <div>
                        <p className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.4)', letterSpacing:'2.5px', marginBottom:'8px', textTransform:'uppercase', fontWeight:'700' }}>{isFr?'Diagnostic':'Diagnosis'}</p>
                        <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'40px', letterSpacing:'2.5px', color:predColor, margin:0, lineHeight:1, textTransform:'uppercase' }}>{localResult.prediction}</h3>
                        <div style={{ display:'flex', gap:'6px', marginTop:'14px', flexWrap:'wrap' }}>
                          <span className="mono" style={{ fontSize:'9px', padding:'3px 8px', border:`1px solid ${predColor}55`, borderRadius:'2px', color:predColor, letterSpacing:'1.3px', fontWeight:'800' }}>GROUPB</span>
                          <span className="mono" style={{ fontSize:'9px', padding:'3px 8px', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'2px', color:'rgba(255,255,255,0.55)', letterSpacing:'1.3px', fontWeight:'700' }}>RESNET-18</span>
                          <span className="mono" style={{ fontSize:'9px', padding:'3px 8px', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'2px', color:'rgba(255,255,255,0.55)', letterSpacing:'1.3px', fontWeight:'700' }}>GRADCAM++</span>
                        </div>
                      </div>
                      <div style={{ textAlign:'right' }}>
                        <p className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.4)', letterSpacing:'2.5px', marginBottom:'6px', textTransform:'uppercase', fontWeight:'700' }}>{isFr?'Confiance':'Confidence'}</p>
                        <p className="tnum" style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'50px', color:'#10B981', margin:0, letterSpacing:'-1px', lineHeight:1 }}>{confPct.toFixed(1)}<span style={{ fontSize:'0.5em', marginLeft:'2px' }}>%</span></p>
                        <div style={{ height:'3px', background:'rgba(255,255,255,0.06)', borderRadius:'2px', marginTop:'12px', overflow:'hidden' }}>
                          <div style={{ height:'100%', width:`${confPct}%`, background:'linear-gradient(90deg,#10B981,#00B4D8)', borderRadius:'2px' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Heatmaps */}
                  {localResult.heatmap_b && (<>
                    <p className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.42)', letterSpacing:'2.5px', marginBottom:'10px', textTransform:'uppercase', fontWeight:'700' }}>{isFr?'Cartes GradCAM++':'GradCAM++ heatmaps'}</p>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'7px', marginBottom:'7px' }}>
                      {[{k:'heatmap_b',l:isFr?'Groupe B · Basique':'Group B · Basic',sub:isFr?'✓ Gagnant':'✓ Winner',c:'#10B981'},{k:'heatmap_d',l:isFr?'Groupe D · Domaine':'Group D · Domain',sub:isFr?'Rejeté':'Rejected',c:'#FFB703'}].map(({k,l,sub,c})=>(
                        <div key={k} style={{ border:`1px solid ${c}33`, borderRadius:'6px', overflow:'hidden', background:`${c}04` }}>
                          <img src={`data:image/png;base64,${localResult[k]}`} alt={l} style={{ width:'100%', display:'block' }} />
                          <div style={{ padding:'7px 10px', borderTop:`1px solid ${c}22`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                            <p className="mono" style={{ fontSize:'9px', color:c, fontWeight:'700', margin:0, letterSpacing:'1.2px', textTransform:'uppercase' }}>{l}</p>
                            <span className="mono" style={{ fontSize:'8px', color:`${c}cc`, letterSpacing:'1px', textTransform:'uppercase' }}>{sub}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ border:'1px solid rgba(0,180,216,0.4)', borderRadius:'6px', overflow:'hidden', background:'rgba(0,180,216,0.04)', boxShadow:'0 0 28px rgba(0,180,216,0.08)' }}>
                      <img src={`data:image/png;base64,${localResult.heatmap_consensus}`} alt="consensus" style={{ width:'100%', display:'block' }} />
                      <div style={{ padding:'10px 14px', borderTop:'1px solid rgba(0,180,216,0.25)', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'8px' }}>
                        <p className="mono" style={{ fontSize:'9px', color:'#00B4D8', fontWeight:'800', margin:0, letterSpacing:'1.5px', textTransform:'uppercase', display:'inline-flex', alignItems:'center', gap:'7px' }}><span style={{ width:'5px', height:'5px', background:'#00B4D8', borderRadius:'50%' }} />{isFr?'Consensus B+D':'Consensus B+D'}</p>
                        <span className="mono" style={{ fontSize:'8px', color:'rgba(0,180,216,0.65)', letterSpacing:'1.2px', textTransform:'uppercase' }}>{isFr?'Carte finale':'Final heatmap'}</span>
                      </div>
                    </div>
                  </>)}

                  {/* Probabilities */}
                  <p className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.42)', letterSpacing:'2.5px', margin:'22px 0 10px', textTransform:'uppercase', fontWeight:'700' }}>{isFr?'Distribution des probabilités':'Probability distribution'}</p>
                  <div style={{ border:'1px solid rgba(255,255,255,0.05)', borderRadius:'8px', padding:'16px 18px', marginBottom:'18px', background:'rgba(255,255,255,0.012)' }}>
                    {['glioma','meningioma','notumor','pituitary'].map(cls=>{
                      const p=(localResult.probabilities[cls]||0)*100; const isTop=cls===localResult.prediction
                      return (
                        <div key={cls} style={{ marginBottom:'12px' }}>
                          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:'5px' }}>
                            <span className="mono" style={{ fontSize:'10px', color:isTop?CLASS_COLORS[cls]:'rgba(255,255,255,0.5)', fontWeight:isTop?'800':'600', textTransform:'uppercase', letterSpacing:'1.6px' }}>{cls}</span>
                            <span className="mono tnum" style={{ fontSize:'10px', color:isTop?CLASS_COLORS[cls]:'rgba(255,255,255,0.45)', fontWeight:isTop?'800':'600' }}>{p.toFixed(2)}%</span>
                          </div>
                          <div style={{ height:'4px', background:'rgba(255,255,255,0.05)', borderRadius:'2px', overflow:'hidden' }}>
                            <div style={{ height:'100%', width:`${p}%`, background:isTop?CLASS_COLORS[cls]:'rgba(255,255,255,0.12)', borderRadius:'2px', transition:'width 1.1s cubic-bezier(0.16,1,0.3,1)', boxShadow:isTop?`0 0 12px ${CLASS_COLORS[cls]}88`:'none' }} />
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Actions */}
                  <div style={{ display:'flex', gap:'8px' }}>
                    <button onClick={()=>printPatientReport(patient,localResult,lang)} onMouseMove={tintMove} className="cta-ghost" style={{ flex:1, padding:'12px', background:'rgba(255,183,3,0.05)', border:'1px solid rgba(255,183,3,0.3)', color:'#FFB703', borderRadius:'5px', cursor:'pointer', fontSize:'10px', fontWeight:'800', fontFamily:'inherit', letterSpacing:'1.6px', display:'inline-flex', alignItems:'center', justifyContent:'center', gap:'9px', textTransform:'uppercase' }}>
                      <span style={{ display:'inline-flex', alignItems:'center', gap:'9px' }}><Icon name="file" size={12} stroke={1.8} />{isFr?'Export PDF':'Export PDF'}</span>
                    </button>
                    <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={e=>handleFile(e.target.files[0])} />
                    <button onClick={()=>fileRef.current.click()} onMouseMove={tintMove} className="cta-ghost" style={{ flex:1, padding:'12px', background:'rgba(0,180,216,0.05)', border:'1px solid rgba(0,180,216,0.22)', color:'#00B4D8', borderRadius:'5px', cursor:'pointer', fontSize:'10px', fontWeight:'800', fontFamily:'inherit', letterSpacing:'1.6px', display:'inline-flex', alignItems:'center', justifyContent:'center', gap:'9px', textTransform:'uppercase' }}>
                      <span style={{ display:'inline-flex', alignItems:'center', gap:'9px' }}><Icon name="upload" size={12} stroke={1.8} />{isFr?'Nouveau scan':'New scan'}</span>
                    </button>
                  </div>
                </div>
              )
            })()}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── UPLOAD MODAL ─────────────────────────────────────────────────────────────
function UploadModal({ onClose, lang }) {
  const [phase, setPhase] = useState('idle')
  const [result, setResult] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [preview, setPreview] = useState(null)
  const fileRef = useRef(null)
  const isFr = lang === 'fr'
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  const handleFile = async (file) => {
    if (!file||!file.type.startsWith('image/')) return
    setPreview(URL.createObjectURL(file)); setPhase('loading')
    try {
      const fd=new FormData(); fd.append('file',file)
      const res=await fetch(`${API_URL}/predict`,{method:'POST',body:fd})
      const data=await res.json()
      if(!res.ok){if(data.error==='not_mri'){setPhase('not_mri');return} setPhase('invalid');return}
      setResult(data); setPhase('result')
    } catch { setPhase('error') }
  }

  const reset = () => { setPhase('idle'); setResult(null); setPreview(null) }

  const REJECTS = {
    not_mri: { color:'#E63946', icon:'brain', title:isFr?'PAS UNE IRM CÉRÉBRALE':'NOT A BRAIN MRI', code:isFr?'ERR · SCAN_INVALIDE':'ERR · NON_BRAIN_SCAN', desc:isFr?'Cette image n\'a pas été reconnue comme une IRM cérébrale valide. Veuillez téléverser une IRM cérébrale en niveaux de gris.':'This image was not recognized as a valid brain MRI. Please upload a greyscale brain MRI scan.' },
    invalid: { color:'#E63946', icon:'shield',  title:isFr?'CONFIANCE INSUFFISANTE':'LOW CONFIDENCE', code:isFr?'ERR · SEUIL_60%':'ERR · CONF_GATE_<60%',   desc:isFr?'La confiance du modèle est inférieure au seuil de sécurité de 60%. Le scan n\'a pas pu être classifié de manière fiable.':'Model confidence fell below the 60% safety threshold. The scan could not be classified reliably.' },
    error:   { color:'#FFB703', icon:'file',    title:isFr?'ERREUR DE CONNEXION':'CONNECTION ERROR', code:'ERR · NETWORK',                                desc:isFr?'Impossible de joindre le serveur d\'inférence. Vérifiez votre connexion puis réessayez.':'Could not reach the inference server. Check your connection and try again.' },
  }

  return (
    <div onClick={onClose} style={{ position:'fixed', inset:0, zIndex:1000, background:'rgba(5,8,15,0.72)', backdropFilter:'blur(26px) saturate(130%)', WebkitBackdropFilter:'blur(26px) saturate(130%)', display:'flex', alignItems:'center', justifyContent:'center', padding:isMobile?'12px':'24px', animation:'fadeIn 0.3s ease' }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:'linear-gradient(180deg,rgba(10,22,40,0.98) 0%,rgba(7,14,28,0.98) 100%)', border:'1px solid rgba(0,180,216,0.18)', borderRadius:'14px', width:'100%', maxWidth:phase==='result'?'980px':'620px', maxHeight:'92vh', overflowY:'auto', position:'relative', boxShadow:'0 40px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,180,216,0.04), 0 0 80px rgba(0,180,216,0.06)', transition:'max-width 0.5s cubic-bezier(0.16,1,0.3,1)', animation:'modalSlide 0.45s cubic-bezier(0.16,1,0.3,1)' }}>
        <style>{`
          @keyframes modalSlide{from{opacity:0;transform:translateY(24px) scale(0.985)}to{opacity:1;transform:translateY(0) scale(1)}}
          @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
          @keyframes ripple{0%{box-shadow:0 0 0 0 rgba(16,185,129,0.5)}70%{box-shadow:0 0 0 14px rgba(16,185,129,0)}100%{box-shadow:0 0 0 0 rgba(16,185,129,0)}}
          @keyframes fadeIn{from{opacity:0}to{opacity:1}}
          @keyframes scanSweep{0%{top:-10%;opacity:0}10%{opacity:1}90%{opacity:1}100%{top:110%;opacity:0}}
          @keyframes barIn{from{width:0}}
          @keyframes mapReveal{from{opacity:0;clip-path:inset(0 100% 0 0)}to{opacity:1;clip-path:inset(0 0 0 0)}}
        `}</style>

        <CornerMark pos="tl" offset={14} /><CornerMark pos="tr" offset={14} />
        <CornerMark pos="bl" offset={14} /><CornerMark pos="br" offset={14} />

        {/* HEADER */}
        <div style={{ padding:isMobile?'24px 22px 22px':'28px 32px 24px', borderBottom:'1px solid rgba(255,255,255,0.05)', display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'14px' }}>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'12px', flexWrap:'wrap' }}>
              <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#10B981', animation:'ripple 2s infinite', flexShrink:0 }} />
              <span className="mono" style={{ fontSize:'9px', color:'#10B981', letterSpacing:'3px', fontWeight:'700', textTransform:'uppercase' }}>{isFr?'IA Clinique · en direct':'Live Clinical AI'}</span>
              <span style={{ width:'18px', height:'1px', background:'rgba(255,255,255,0.12)' }} />
              <span className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.42)', letterSpacing:'2.5px', fontWeight:'700', textTransform:'uppercase' }}>§ 00 · {isFr?'Inférence':'Inference'}</span>
            </div>
            <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:isMobile?'26px':'34px', color:'#fff', letterSpacing:'2px', margin:0, lineHeight:1 }}>
              <span>Illuma</span><span style={{ color:'#00B4D8' }}>DX</span>{' '}
              <span style={{ color:'rgba(255,255,255,0.5)', fontWeight:'400' }}>· {isFr?'ANALYSE IRM':'MRI ANALYSIS'}</span>
            </h2>
            <p style={{ color:'rgba(255,255,255,0.45)', fontSize:'12px', marginTop:'10px', fontWeight:'300', lineHeight:'1.65' }}>
              {isFr?'Téléversez une IRM cérébrale · ResNet-18 + interprétabilité GradCAM++':'Upload a brain MRI · ResNet-18 + GradCAM++ interpretability'}
            </p>
          </div>
          <button onClick={onClose} onMouseMove={tintMove} style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', color:'rgba(255,255,255,0.55)', borderRadius:'6px', width:'34px', height:'34px', cursor:'pointer', fontSize:'14px', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'inherit', transition:'all 0.2s', flexShrink:0 }}
            onMouseEnter={e=>{e.currentTarget.style.background='rgba(230,57,70,0.1)';e.currentTarget.style.borderColor='rgba(230,57,70,0.35)';e.currentTarget.style.color='#E63946'}}
            onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.04)';e.currentTarget.style.borderColor='rgba(255,255,255,0.08)';e.currentTarget.style.color='rgba(255,255,255,0.55)'}}>
            ✕
          </button>
        </div>

        {/* BODY */}
        <div style={{ padding:isMobile?'24px 22px 26px':'28px 32px 30px' }}>

          {/* IDLE — dropzone */}
          {phase==='idle' && (<>
            <div onDragOver={e=>{e.preventDefault();setDragOver(true)}} onDragLeave={()=>setDragOver(false)} onDrop={e=>{e.preventDefault();setDragOver(false);handleFile(e.dataTransfer.files[0])}} onClick={()=>fileRef.current.click()} onMouseMove={tintMove}
              style={{ position:'relative', border:`1px solid ${dragOver?'#00B4D8':'rgba(0,180,216,0.22)'}`, borderRadius:'10px', padding:isMobile?'52px 20px 42px':'64px 28px 52px', textAlign:'center', cursor:'pointer', background:dragOver?'rgba(0,180,216,0.05)':'rgba(0,180,216,0.012)', transition:'all 0.3s cubic-bezier(0.16,1,0.3,1)', overflow:'hidden', boxShadow:dragOver?'0 0 40px rgba(0,180,216,0.2) inset':'none' }}>
              <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={e=>handleFile(e.target.files[0])} />
              {/* grid overlay */}
              <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(0,180,216,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,180,216,0.05) 1px,transparent 1px)', backgroundSize:'36px 36px', maskImage:'radial-gradient(circle at 50% 50%,black 0%,transparent 78%)', WebkitMaskImage:'radial-gradient(circle at 50% 50%,black 0%,transparent 78%)', pointerEvents:'none' }} />
              {/* cursor-tracked glow */}
              <div style={{ position:'absolute', inset:0, background:`radial-gradient(220px circle at var(--mx,50%) var(--my,50%),rgba(0,180,216,${dragOver?0.22:0.1}),transparent 55%)`, pointerEvents:'none', transition:'background 0.3s' }} />
              {/* inner corner brackets */}
              <svg width="14" height="14" viewBox="0 0 12 12" style={{ position:'absolute', top:14, left:14, opacity:0.5 }}><path d="M0 12V0h12" stroke="#00B4D8" strokeWidth="1" fill="none" /></svg>
              <svg width="14" height="14" viewBox="0 0 12 12" style={{ position:'absolute', top:14, right:14, opacity:0.5 }}><path d="M0 0h12v12" stroke="#00B4D8" strokeWidth="1" fill="none" /></svg>
              <svg width="14" height="14" viewBox="0 0 12 12" style={{ position:'absolute', bottom:14, left:14, opacity:0.5 }}><path d="M0 0v12h12" stroke="#00B4D8" strokeWidth="1" fill="none" /></svg>
              <svg width="14" height="14" viewBox="0 0 12 12" style={{ position:'absolute', bottom:14, right:14, opacity:0.5 }}><path d="M12 0v12H0" stroke="#00B4D8" strokeWidth="1" fill="none" /></svg>
              <div style={{ position:'relative' }}>
                <div style={{ display:'inline-flex', color:'#00B4D8', padding:'14px', border:'1px solid rgba(0,180,216,0.25)', borderRadius:'50%', background:'rgba(0,180,216,0.04)', marginBottom:'20px' }}>
                  <Icon name="upload" size={28} stroke={1.4} />
                </div>
                <p className="mono" style={{ color:'#00B4D8', fontSize:'11px', fontWeight:'700', letterSpacing:'2.5px', textTransform:'uppercase', marginBottom:'8px' }}>{isFr?'Glissez une IRM ici':'Drop brain MRI here'}</p>
                <p style={{ color:'rgba(255,255,255,0.4)', fontSize:'12px', fontWeight:'300', marginBottom:'26px' }}>{isFr?'ou cliquez pour parcourir les fichiers':'or click to browse your files'}</p>
                <div className="mono" style={{ display:'inline-flex', alignItems:'center', gap:'10px', padding:'11px 22px', background:'#00B4D8', color:'#05080F', borderRadius:'4px', fontSize:'10px', fontWeight:'800', letterSpacing:'1.8px', textTransform:'uppercase', boxShadow:'0 0 24px rgba(0,180,216,0.28)' }}>
                  {isFr?'Choisir fichier':'Choose file'}
                  <Icon name="arrow" size={11} stroke={2.4} />
                </div>
              </div>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'18px', flexWrap:'wrap', gap:'10px' }}>
              <span className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.38)', letterSpacing:'2px', textTransform:'uppercase' }}>{isFr?'Formats · PNG · JPG · JPEG':'Accepted · PNG · JPG · JPEG'}</span>
              <span className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.38)', letterSpacing:'2px', textTransform:'uppercase' }}>{isFr?'Aucune donnée patient stockée':'No patient data stored'}</span>
            </div>
          </>)}

          {/* LOADING */}
          {phase==='loading' && (
            <div style={{ textAlign:'center', padding:isMobile?'24px 12px':'36px 20px' }}>
              {preview && (
                <div style={{ position:'relative', width:'180px', height:'180px', margin:'0 auto 28px', borderRadius:'10px', overflow:'hidden', border:'1px solid rgba(0,180,216,0.35)', boxShadow:'0 0 48px rgba(0,180,216,0.18)' }}>
                  <img src={preview} alt="scan" style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.7, display:'block' }} />
                  <div style={{ position:'absolute', left:0, right:0, top:'-10%', height:'3px', background:'linear-gradient(90deg,transparent,#00B4D8 40%,#B0F4FF 50%,#00B4D8 60%,transparent)', boxShadow:'0 0 20px rgba(0,180,216,0.9),0 0 40px rgba(0,180,216,0.5)', animation:'scanSweep 1.8s ease-in-out infinite' }} />
                  <svg width="12" height="12" viewBox="0 0 12 12" style={{ position:'absolute', top:8, left:8 }}><path d="M0 12V0h12" stroke="#00B4D8" strokeWidth="1" fill="none" /></svg>
                  <svg width="12" height="12" viewBox="0 0 12 12" style={{ position:'absolute', top:8, right:8 }}><path d="M0 0h12v12" stroke="#00B4D8" strokeWidth="1" fill="none" /></svg>
                  <svg width="12" height="12" viewBox="0 0 12 12" style={{ position:'absolute', bottom:8, left:8 }}><path d="M0 0v12h12" stroke="#00B4D8" strokeWidth="1" fill="none" /></svg>
                  <svg width="12" height="12" viewBox="0 0 12 12" style={{ position:'absolute', bottom:8, right:8 }}><path d="M12 0v12H0" stroke="#00B4D8" strokeWidth="1" fill="none" /></svg>
                </div>
              )}
              <div style={{ width:'42px', height:'42px', border:'2px solid rgba(0,180,216,0.15)', borderTop:'2px solid #00B4D8', borderRadius:'50%', animation:'spin 0.9s linear infinite', margin:'0 auto 18px' }} />
              <p className="mono" style={{ color:'#00B4D8', fontSize:'11px', fontWeight:'700', letterSpacing:'3.5px', textTransform:'uppercase', marginBottom:'10px' }}>{isFr?'Analyse en cours':'Analyzing scan'}</p>
              <p className="mono" style={{ color:'rgba(255,255,255,0.4)', fontSize:'9px', letterSpacing:'2.2px', textTransform:'uppercase' }}>{isFr?'GroupB ResNet-18 · GradCAM++ · Seuil 60%':'GroupB ResNet-18 · GradCAM++ · 60% gate'}</p>
            </div>
          )}

          {/* REJECT SCREENS */}
          {(phase==='not_mri'||phase==='invalid'||phase==='error') && (()=> {
            const r = REJECTS[phase]
            return (
              <div style={{ textAlign:'center', padding:isMobile?'28px 16px':'40px 24px' }}>
                <div style={{ display:'inline-flex', color:r.color, padding:'14px', border:`1px solid ${r.color}55`, borderRadius:'50%', background:`${r.color}0D`, marginBottom:'22px' }}>
                  <Icon name={r.icon} size={28} stroke={1.4} />
                </div>
                <p className="mono" style={{ color:r.color, fontSize:'9px', letterSpacing:'3px', fontWeight:'700', textTransform:'uppercase', marginBottom:'10px', opacity:0.8 }}>{r.code}</p>
                <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'28px', color:r.color, letterSpacing:'2.5px', marginBottom:'14px', lineHeight:1 }}>{r.title}</h3>
                <p style={{ color:'rgba(255,255,255,0.52)', fontSize:'13px', maxWidth:'420px', margin:'0 auto 28px', lineHeight:'1.75', fontWeight:'300' }}>{r.desc}</p>
                <button onClick={reset} onMouseMove={tintMove} className="cta-primary" style={{ display:'inline-flex', alignItems:'center', gap:'10px', padding:'11px 26px', background:'#00B4D8', color:'#05080F', border:'none', borderRadius:'4px', fontSize:'11px', fontWeight:'800', cursor:'pointer', letterSpacing:'1.8px', fontFamily:'inherit', boxShadow:'0 0 28px rgba(0,180,216,0.25)' }}>
                  <span style={{ display:'inline-flex', alignItems:'center', gap:'10px' }}>{isFr?'Réessayer':'Try again'}<Icon name="arrow" size={11} stroke={2.4} /></span>
                </button>
              </div>
            )
          })()}

          {/* RESULT */}
          {phase==='result' && result && (()=> {
            const predColor = CLASS_COLORS[result.prediction] || '#10B981'
            const confPct = result.confidence * 100
            const confLabel = confPct >= 90 ? (isFr?'CONFIANCE ÉLEVÉE':'HIGH CONFIDENCE') : (isFr?'CONFIANCE MODÉRÉE':'MODERATE CONFIDENCE')
            return (
              <div style={{ animation:'fadeIn 0.4s ease' }}>
                {/* PREDICTION CARD */}
                <div style={{ position:'relative', border:`1px solid ${predColor}44`, borderRadius:'10px', padding:isMobile?'22px 18px':'26px 28px', marginBottom:'22px', background:`linear-gradient(180deg,${predColor}0D,transparent)`, overflow:'hidden' }}>
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:`linear-gradient(90deg,transparent,${predColor},transparent)` }} />
                  <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1.3fr 1fr', gap:isMobile?'18px':'28px', alignItems:'center' }}>
                    <div>
                      <p className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.4)', letterSpacing:'3px', marginBottom:'8px', textTransform:'uppercase', fontWeight:'700' }}>{isFr?'Prédiction':'Prediction'} · {confLabel}</p>
                      <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:isMobile?'38px':'52px', letterSpacing:'3px', color:predColor, margin:0, lineHeight:1, textTransform:'uppercase' }}>{result.prediction}</h3>
                      <div style={{ display:'flex', alignItems:'center', gap:'8px', marginTop:'12px', flexWrap:'wrap' }}>
                        <span className="mono" style={{ fontSize:'9px', padding:'3px 9px', border:`1px solid ${predColor}66`, borderRadius:'2px', color:predColor, letterSpacing:'1.5px', fontWeight:'800' }}>GROUPB · RESNET-18</span>
                        <span className="mono" style={{ fontSize:'9px', padding:'3px 9px', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'2px', color:'rgba(255,255,255,0.55)', letterSpacing:'1.5px', fontWeight:'700' }}>GRADCAM++</span>
                      </div>
                    </div>
                    <div style={{ textAlign:isMobile?'left':'right' }}>
                      <p className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.4)', letterSpacing:'3px', marginBottom:'6px', textTransform:'uppercase', fontWeight:'700' }}>{isFr?'Confiance':'Confidence'}</p>
                      <p className="tnum" style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:isMobile?'48px':'64px', color:'#10B981', margin:0, letterSpacing:'-1px', lineHeight:1 }}>{confPct.toFixed(1)}<span style={{ fontSize:'0.5em', marginLeft:'4px' }}>%</span></p>
                      <div style={{ height:'3px', background:'rgba(255,255,255,0.06)', borderRadius:'2px', marginTop:'12px', overflow:'hidden' }}>
                        <div style={{ height:'100%', width:`${confPct}%`, background:'linear-gradient(90deg,#10B981,#00B4D8)', borderRadius:'2px', animation:'barIn 1.2s cubic-bezier(0.16,1,0.3,1)' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* HEATMAPS */}
                <p className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.4)', letterSpacing:'2.5px', marginBottom:'12px', textTransform:'uppercase', fontWeight:'700' }}>§ 01 · {isFr?'Cartes GradCAM++ · Interprétabilité':'GradCAM++ Heatmaps · Interpretability'}</p>
                <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:'8px', marginBottom:'8px' }}>
                  {[{k:'heatmap_b',l:isFr?'Groupe B · Basique':'Group B · Basic',sub:isFr?'✓ Gagnant validé':'✓ Validated winner',c:'#10B981'},{k:'heatmap_d',l:isFr?'Groupe D · Domaine':'Group D · Domain',sub:isFr?'Hypothèse rejetée':'Hypothesis rejected',c:'#FFB703'}].map(({k,l,sub,c})=>(
                    <div key={k} style={{ border:`1px solid ${c}33`, borderRadius:'8px', overflow:'hidden', background:`${c}04`, animation:'mapReveal 0.8s cubic-bezier(0.16,1,0.3,1)' }}>
                      <img src={`data:image/png;base64,${result[k]}`} alt={l} style={{ width:'100%', display:'block' }} />
                      <div style={{ padding:'9px 12px', borderTop:`1px solid ${c}22`, display:'flex', justifyContent:'space-between', alignItems:'center', gap:'8px' }}>
                        <p className="mono" style={{ fontSize:'10px', color:c, fontWeight:'700', margin:0, letterSpacing:'1.2px', textTransform:'uppercase' }}>{l}</p>
                        <span className="mono" style={{ fontSize:'8px', color:`${c}cc`, letterSpacing:'1px', textTransform:'uppercase' }}>{sub}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ border:'1px solid rgba(0,180,216,0.4)', borderRadius:'8px', overflow:'hidden', background:'rgba(0,180,216,0.04)', boxShadow:'0 0 32px rgba(0,180,216,0.08)', animation:'mapReveal 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s both' }}>
                  <img src={`data:image/png;base64,${result.heatmap_consensus}`} alt="consensus" style={{ width:'100%', display:'block' }} />
                  <div style={{ padding:'11px 14px', borderTop:'1px solid rgba(0,180,216,0.25)', display:'flex', justifyContent:'space-between', alignItems:'center', gap:'8px', flexWrap:'wrap' }}>
                    <p className="mono" style={{ fontSize:'10px', color:'#00B4D8', fontWeight:'800', margin:0, letterSpacing:'1.5px', textTransform:'uppercase', display:'inline-flex', alignItems:'center', gap:'8px' }}><span style={{ width:'6px', height:'6px', background:'#00B4D8', borderRadius:'50%' }} />{isFr?'Consensus B+D · Carte finale':'Consensus B+D · Final heatmap'}</p>
                    <span className="mono" style={{ fontSize:'9px', color:'rgba(0,180,216,0.65)', letterSpacing:'1.2px', textTransform:'uppercase' }}>{isFr?'Superposition moyenne':'Average overlay'}</span>
                  </div>
                </div>

                {/* PROBABILITY DISTRIBUTION */}
                <p className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.4)', letterSpacing:'2.5px', margin:'26px 0 12px', textTransform:'uppercase', fontWeight:'700' }}>§ 02 · {isFr?'Distribution des probabilités':'Probability distribution'}</p>
                <div style={{ border:'1px solid rgba(255,255,255,0.05)', borderRadius:'8px', padding:'18px 20px', background:'rgba(255,255,255,0.012)' }}>
                  {['glioma','meningioma','notumor','pituitary'].map(cls=>{
                    const p=(result.probabilities[cls]||0)*100; const isTop=cls===result.prediction
                    return (
                      <div key={cls} style={{ marginBottom:'14px' }}>
                        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:'5px' }}>
                          <span className="mono" style={{ fontSize:'10px', color:isTop?CLASS_COLORS[cls]:'rgba(255,255,255,0.5)', fontWeight:isTop?'800':'600', textTransform:'uppercase', letterSpacing:'1.8px' }}>{cls}</span>
                          <span className="mono tnum" style={{ fontSize:'11px', color:isTop?CLASS_COLORS[cls]:'rgba(255,255,255,0.45)', fontWeight:isTop?'800':'600' }}>{p.toFixed(2)}%</span>
                        </div>
                        <div style={{ height:'4px', background:'rgba(255,255,255,0.05)', borderRadius:'2px', overflow:'hidden' }}>
                          <div style={{ height:'100%', width:`${p}%`, background:isTop?CLASS_COLORS[cls]:'rgba(255,255,255,0.14)', borderRadius:'2px', transition:'width 1.1s cubic-bezier(0.16,1,0.3,1)', boxShadow:isTop?`0 0 12px ${CLASS_COLORS[cls]}88`:'none' }} />
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* DISCLAIMER */}
                <div style={{ marginTop:'18px', padding:'12px 16px', background:'rgba(255,183,3,0.04)', border:'1px solid rgba(255,183,3,0.18)', borderRadius:'6px', display:'flex', gap:'12px', alignItems:'flex-start' }}>
                  <div style={{ color:'#FFB703', flexShrink:0, marginTop:'1px' }}><Icon name="shield" size={14} stroke={1.6} /></div>
                  <p style={{ fontSize:'11px', color:'rgba(255,183,3,0.82)', margin:0, lineHeight:'1.65', fontWeight:'400' }}>{isFr?'Outil de recherche uniquement. Ne remplace pas un diagnostic clinique par un radiologue certifié.':'Research tool only. Not a substitute for clinical diagnosis by a certified radiologist.'}</p>
                </div>

                {/* RESET */}
                <button onClick={reset} onMouseMove={tintMove} className="cta-ghost" style={{ marginTop:'18px', width:'100%', padding:'13px', background:'transparent', border:'1px solid rgba(0,180,216,0.22)', color:'#00B4D8', borderRadius:'5px', fontSize:'11px', fontWeight:'800', cursor:'pointer', letterSpacing:'1.8px', fontFamily:'inherit', display:'inline-flex', alignItems:'center', justifyContent:'center', gap:'10px' }}>
                  <span style={{ display:'inline-flex', alignItems:'center', gap:'10px' }}><Icon name="upload" size={12} stroke={2.2} />{isFr?'Analyser un autre scan':'Analyze another scan'}</span>
                </button>
              </div>
            )
          })()}

        </div>
      </div>
    </div>
  )
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [scrollY, setScrollY] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [hoveredFeature, setHoveredFeature] = useState(null)
  const [lang, setLang] = useState('en')
  const [isMobile, setIsMobile] = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  const [activePage, setActivePage] = useState(null)
  const [heroMag, setHeroMag] = useState({ x: 0, y: 0 })
  const [scrollPct, setScrollPct] = useState(0)
  const [showIntro, setShowIntro] = useState(true)

  const onHeroCtaMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const dx = (e.clientX - (r.left + r.width / 2)) / r.width
    const dy = (e.clientY - (r.top + r.height / 2)) / r.height
    setHeroMag({ x: dx * 10, y: dy * 8 })
    tintMove(e)
  }

  const t = T[lang]
  const isFr = lang === 'fr'

  useEffect(()=>{const c=()=>setIsMobile(window.innerWidth<768);c();window.addEventListener('resize',c);return()=>window.removeEventListener('resize',c)},[])
  useEffect(()=>{const t2=setTimeout(()=>setLoaded(true),80);return()=>clearTimeout(t2)},[])
  useEffect(()=>{
    const fn=()=>{
      setScrollY(window.scrollY)
      const max=document.documentElement.scrollHeight-window.innerHeight
      setScrollPct(max>0?Math.min(100,(window.scrollY/max)*100):0)
    }
    fn()
    window.addEventListener('scroll',fn,{passive:true})
    window.addEventListener('resize',fn)
    return()=>{window.removeEventListener('scroll',fn);window.removeEventListener('resize',fn)}
  },[])
  useEffect(()=>{const t=setTimeout(()=>setShowIntro(false),2100);return()=>clearTimeout(t)},[])
  useEffect(()=>{const fn=e=>{setMouseX((e.clientX/window.innerWidth-0.5)*20);setMouseY((e.clientY/window.innerHeight-0.5)*20)};window.addEventListener('mousemove',fn,{passive:true});return()=>window.removeEventListener('mousemove',fn)},[])

  const handleNavClick = item => {
    if (item.id==='system') setShowUpload(true)
    else if (item.id==='patients') setActivePage('patients')
    else if (item.id==='pdf') setActivePage('pdf')
    else if (item.id==='research') setActivePage('research')
    else if (item.id==='ethics') setActivePage('ethics')
  }

  const stats = [
    { value:'99.69%', label:t.peakAcc,       color:'#10B981' },
    { value:'33×',    label:t.lossGap,       color:'#E63946' },
    { value:'40',     label:t.modelsTrained, color:'#00B4D8' },
    { value:'300K+',  label:t.patients,      color:'#FFB703' },
  ]

  const visibleNav = isMobile ? NAV.filter(n=>n.mobile) : NAV

  return (
    <div style={{ background:'#05080F', minHeight:'100vh', overflowX:'hidden', fontFamily:"'Inter',system-ui,sans-serif", color:'#fff' }}>
      <style>{BASE_CSS + LANDING_CSS}</style>

      {/* AMBIENT BG — fading grid + node network + cursor-tracked glow */}
      <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', backgroundImage:`linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)`, backgroundSize:'96px 96px', maskImage:'radial-gradient(ellipse 85% 65% at 50% 25%,black 45%,transparent 92%)', WebkitMaskImage:'radial-gradient(ellipse 85% 65% at 50% 25%,black 45%,transparent 92%)' }} />
      <NodeNetwork />
      <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', background:`radial-gradient(720px circle at ${50+mouseX*0.5}% ${38+mouseY*0.4}%,rgba(0,180,216,0.08),transparent 60%)` }} />

      {/* scroll progress + intro sweep + click burst + custom cursor */}
      <div className="scroll-progress"><span style={{ width:`${scrollPct}%` }} /></div>
      {showIntro && <div className="scan-intro" />}
      <ClickBurst />
      <CustomCursor />

      {showUpload && <UploadModal onClose={()=>setShowUpload(false)} lang={lang} />}
      {activePage==='patients' && <PatientRecordsPage lang={lang} onClose={()=>setActivePage(null)} />}
      {activePage==='pdf' && <PDFReportPage lang={lang} onClose={()=>setActivePage(null)} />}
      {activePage==='research' && <ResearchPage lang={lang} onClose={()=>setActivePage(null)} />}
      {activePage==='ethics' && <EthicsPage lang={lang} onClose={()=>setActivePage(null)} />}

      {/* NAV — floating */}
      <nav style={{ position:'fixed', top:isMobile?0:'14px', left:isMobile?0:'16px', right:isMobile?0:'16px', zIndex:100, padding:isMobile?'0 16px':'0 24px', height:'66px', display:'flex', justifyContent:'space-between', alignItems:'center', background:scrollY>40?'rgba(5,8,15,0.82)':'rgba(5,8,15,0.5)', backdropFilter:'blur(22px) saturate(150%)', WebkitBackdropFilter:'blur(22px) saturate(150%)', border:`1px solid rgba(255,255,255,${scrollY>40?0.08:0.05})`, borderRadius:isMobile?0:'14px', boxShadow:isMobile?'none':(scrollY>40?'0 12px 40px rgba(0,0,0,0.5)':'0 6px 28px rgba(0,0,0,0.25)'), transition:'background 0.4s, border-color 0.4s, box-shadow 0.4s', opacity:loaded?1:0, animation:loaded?'fadeSlideIn 0.8s ease 0.1s both':'none' }}>
        <div style={{ display:'flex', alignItems:'center', gap:isMobile?'10px':'16px', flexShrink:0 }}>
          <div onClick={()=>setActivePage(null)} style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:isMobile?'22px':'26px', letterSpacing:'2px', cursor:'pointer', lineHeight:1 }}>
            <span style={{ color:'#fff' }}>Illuma</span><span style={{ color:'#00B4D8' }}>DX</span>
          </div>
          {!isMobile && <>
            <div style={{ width:'1px', height:'18px', background:'rgba(255,255,255,0.1)' }} />
            <span className="mono" style={{ fontSize:'10px', color:'rgba(255,255,255,0.42)', letterSpacing:'1.5px', textTransform:'uppercase' }}>{isFr?'IA Clinique Diagnostique':'Clinical AI Diagnostic'}</span>
          </>}
        </div>
        <div style={{ display:'flex', gap:isMobile?'12px':'30px', alignItems:'center' }}>
          {visibleNav.map(item=>(
            <div key={item.id} className="nav-btn" onClick={()=>handleNavClick(item)} style={{ position:'relative', cursor:'pointer' }}>
              <span className="nav-link" style={{ display:'inline-block', fontSize:isMobile?'10px':'11px', fontWeight:'600', color:'rgba(255,255,255,0.55)', letterSpacing:'1.8px', textTransform:'uppercase', transition:'color .2s', whiteSpace:'nowrap' }}
                onMouseEnter={e=>{e.currentTarget.style.color=item.color}}
                onMouseLeave={e=>{e.currentTarget.style.color='rgba(255,255,255,0.55)'}}>
                {isMobile?(lang==='fr'?item.labelFr:item.label).split(' ')[0]:(lang==='fr'?item.labelFr:item.label)}
              </span>
              {!isMobile && (
                <div className="nav-tooltip" style={{ position:'absolute', top:'calc(100% + 14px)', left:'50%', transform:'translateX(-50%) translateY(6px)', background:'rgba(10,22,40,0.96)', border:`1px solid ${item.border}`, borderRadius:'4px', padding:'7px 12px', whiteSpace:'nowrap', fontSize:'9px', color:item.color, letterSpacing:'2px', fontFamily:'ui-monospace,SFMono-Regular,Menlo,monospace', fontWeight:'700', textTransform:'uppercase', opacity:0, transition:'opacity .25s cubic-bezier(0.16,1,0.3,1),transform .25s cubic-bezier(0.16,1,0.3,1)', pointerEvents:'none', backdropFilter:'blur(14px)', WebkitBackdropFilter:'blur(14px)', zIndex:200, boxShadow:`0 10px 28px rgba(0,0,0,0.5), 0 0 0 1px ${item.color}22, 0 0 20px ${item.color}18` }}>
                  {lang==='fr' ? item.descFr : item.desc}
                  <span style={{ position:'absolute', top:'-4px', left:'50%', transform:'translateX(-50%) rotate(45deg)', width:'7px', height:'7px', background:'rgba(10,22,40,0.96)', borderLeft:`1px solid ${item.border}`, borderTop:`1px solid ${item.border}` }} />
                </div>
              )}
            </div>
          ))}
        </div>
        <button onClick={()=>setShowUpload(true)} onMouseMove={tintMove} className="cta-primary" style={{ padding:isMobile?'7px 12px':'9px 18px', background:'#00B4D8', color:'#05080F', border:'none', borderRadius:'3px', fontSize:isMobile?'10px':'11px', fontWeight:'800', cursor:'pointer', letterSpacing:'1.6px', boxShadow:'0 0 24px rgba(0,180,216,0.22)', fontFamily:'inherit', flexShrink:0 }}>
          <span>{isMobile?'UPLOAD':t.upload}</span>
        </button>
      </nav>

      {/* HERO */}
      <section style={{ minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', textAlign:'center', padding:isMobile?'120px 20px 60px':'140px 32px 80px', position:'relative', zIndex:1 }}>
        <HeroOrbital isMobile={isMobile} />
        <CornerMark pos="tl" offset={28} /><CornerMark pos="tr" offset={28} />
        <CornerMark pos="bl" offset={28} /><CornerMark pos="br" offset={28} />
        {/* eyebrow */}
        <div style={{ position:'relative', zIndex:1, display:'flex', alignItems:'center', gap:'12px', marginBottom:'44px', animation:loaded?'fadeSlideIn 0.8s ease 0.35s both':'none', opacity:0, flexWrap:'wrap', justifyContent:'center' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
            <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#10B981', animation:'ripple 2s infinite', flexShrink:0 }} />
            <span className="mono" style={{ fontSize:'10px', color:'#10B981', letterSpacing:'3px', fontWeight:'700', textTransform:'uppercase' }}>{t.live}</span>
          </div>
          <span style={{ width:'20px', height:'1px', background:'rgba(255,255,255,0.15)' }} />
          <span className="mono" style={{ fontSize:'10px', color:'rgba(255,255,255,0.4)', letterSpacing:'2px' }}>CWSF 2026</span>
        </div>

        {/* wordmark — letter-by-letter stagger + DX breathe */}
        <h1 style={{ position:'relative', zIndex:1, fontFamily:"'Bebas Neue',sans-serif", fontSize:isMobile?'clamp(68px,20vw,120px)':'clamp(86px,13vw,168px)', fontWeight:'400', letterSpacing:isMobile?'4px':'8px', lineHeight:'0.9', margin:0, transform:`translate(${mouseX*0.1}px,${mouseY*0.08}px)`, transition:'transform 0.25s ease-out', userSelect:'none' }}>
          {[...'Illuma'].map((c,i)=>(
            <span key={'a'+i} className={`wm-letter${loaded?' in':''}`} style={{ color:'#fff', animationDelay:`${0.42 + i*0.055}s` }}>{c}</span>
          ))}
          {[...'DX'].map((c,i)=>(
            <span key={'b'+i} className={`wm-letter glow${loaded?' in':''}`} style={{ color:'#00B4D8', animationDelay:`${0.42 + (6+i)*0.055}s` }}>{c}</span>
          ))}
        </h1>

        {/* tagline + desc */}
        <div style={{ position:'relative', zIndex:1, animation:loaded?'fadeSlideIn 0.8s ease 0.75s both':'none', opacity:0, marginTop:isMobile?'24px':'36px', maxWidth:'640px' }}>
          <p className="mono" style={{ fontSize:isMobile?'10px':'11px', color:'#00B4D8', letterSpacing:isMobile?'2.5px':'4px', fontWeight:'600', marginBottom:'22px', textTransform:'uppercase' }}>{t.tagline}</p>
          <p style={{ fontSize:isMobile?'14px':'16px', color:'rgba(255,255,255,0.55)', lineHeight:'1.75', margin:0, fontWeight:'300' }}>{t.desc}</p>
        </div>

        {/* CTAs */}
        <div style={{ position:'relative', zIndex:1, display:'flex', gap:'10px', justifyContent:'center', flexWrap:'wrap', animation:loaded?'fadeSlideIn 0.8s ease 0.95s both':'none', opacity:0, marginTop:'48px' }}>
          <button onClick={()=>setShowUpload(true)}
            onMouseMove={onHeroCtaMove}
            onMouseLeave={()=>setHeroMag({ x:0, y:0 })}
            className="cta-primary cta-hero"
            style={{ padding:isMobile?'13px 28px':'15px 40px', background:'#00B4D8', color:'#05080F', border:'none', borderRadius:'3px', fontSize:'13px', fontWeight:'800', cursor:'pointer', letterSpacing:'1.8px', fontFamily:'inherit', display:'inline-flex', alignItems:'center', gap:'10px', transform:`translate(${heroMag.x}px,${heroMag.y}px)`, transition:'transform .18s cubic-bezier(0.16,1,0.3,1), box-shadow .25s ease' }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:'10px' }}>{t.upload}<Icon name="arrow" size={13} stroke={2.2} /></span>
          </button>
          <button onClick={()=>setActivePage('research')} onMouseMove={tintMove} className="cta-ghost" style={{ padding:isMobile?'13px 28px':'15px 40px', background:'transparent', color:'rgba(255,255,255,0.7)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:'3px', fontSize:'13px', fontWeight:'500', cursor:'pointer', fontFamily:'inherit', letterSpacing:'0.3px' }}>
            <span>{t.research}</span>
          </button>
        </div>

        {/* stats row — editorial data strip */}
        <div style={{ position:'relative', zIndex:1, display:'grid', gridTemplateColumns:isMobile?'1fr 1fr':'repeat(4,minmax(0,1fr))', gap:0, marginTop:isMobile?'60px':'76px', maxWidth:'820px', width:'100%', animation:loaded?'fadeSlideIn 0.8s ease 1.15s both':'none', opacity:0, borderTop:'1px solid rgba(255,255,255,0.07)', borderBottom:'1px solid rgba(255,255,255,0.07)' }}>
          {stats.map((stat,i)=>(
            <div key={i} className="stat-col" style={{ padding:isMobile?'20px 12px':'22px 20px', textAlign:'center' }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:isMobile?'30px':'40px', fontWeight:'400', color:stat.color, letterSpacing:'1px', lineHeight:1, fontVariantNumeric:'tabular-nums' }}>
                <Counter value={stat.value} delay={1150 + i*110} />
              </div>
              <div className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.4)', marginTop:'10px', letterSpacing:'1.6px', fontWeight:'600', textTransform:'uppercase' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* live telemetry ticker */}
        <div style={{ position:'relative', zIndex:1, marginTop:isMobile?'32px':'44px', animation:loaded?'fadeSlideIn 0.8s ease 1.35s both':'none', opacity:0 }}>
          <Telemetry isFr={isFr} />
        </div>

        {/* scroll indicator */}
        <div style={{ position:'absolute', bottom:'28px', left:'50%', transform:'translateX(-50%)', opacity:0.35 }}>
          <div style={{ width:'1px', height:'48px', background:'linear-gradient(to bottom,transparent,#00B4D8)', animation:'scrollline 2s ease-in-out infinite' }} />
        </div>
      </section>

      {/* THESIS — HAWKING */}
      <section style={{ padding:isMobile?'100px 20px':'140px 32px', position:'relative', zIndex:1, borderTop:'1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth:'720px', margin:'0 auto', textAlign:'center' }}>
          <FadeUp>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'10px', marginBottom:'48px' }}>
              <span className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.4)', letterSpacing:'2.5px', fontWeight:'700' }}>§ 01</span>
              <span style={{ width:'24px', height:'1px', background:'rgba(255,255,255,0.15)' }} />
              <span className="mono" style={{ fontSize:'10px', color:'rgba(255,255,255,0.5)', letterSpacing:'3px', fontWeight:'700', textTransform:'uppercase' }}>{t.thesis}</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.12}>
            <blockquote style={{ fontSize:isMobile?'clamp(19px,5vw,26px)':'clamp(22px,3vw,34px)', fontWeight:'300', color:'rgba(255,255,255,0.82)', lineHeight:'1.45', margin:'0 0 22px', fontStyle:'italic', fontFamily:'Georgia,Cambria,serif', letterSpacing:'-0.3px' }}>
              {t.hawkingLine1}<br /><span style={{ color:'#fff', fontWeight:'400' }}>{t.hawkingLine2}</span>
            </blockquote>
          </FadeUp>
          <FadeUp delay={0.22}>
            <p className="mono" style={{ fontSize:'10px', color:'rgba(255,255,255,0.3)', letterSpacing:'3px', marginBottom:'52px', fontWeight:'600' }}>— STEPHEN HAWKING</p>
          </FadeUp>
          <FadeUp delay={0.34}>
            <p style={{ fontSize:isMobile?'14px':'16px', color:'rgba(255,255,255,0.5)', lineHeight:'1.85', maxWidth:'560px', margin:'0 auto', fontWeight:'300' }}>{t.hawkingBody}</p>
          </FadeUp>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding:isMobile?'100px 20px':'140px 32px', position:'relative', zIndex:1, borderTop:'1px solid rgba(255,255,255,0.04)' }}>
        <CornerMark pos="tl" offset={24} /><CornerMark pos="tr" offset={24} />
        <CornerMark pos="bl" offset={24} /><CornerMark pos="br" offset={24} />
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <FadeUp>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'10px', marginBottom:'24px' }}>
              <span className="mono" style={{ fontSize:'9px', color:'#00B4D8', letterSpacing:'2.5px', fontWeight:'700' }}>§ 02</span>
              <span style={{ width:'24px', height:'1px', background:'rgba(0,180,216,0.45)' }} />
              <span className="mono" style={{ fontSize:'10px', color:'#00B4D8', letterSpacing:'3px', fontWeight:'700', textTransform:'uppercase' }}>{t.features}</span>
            </div>
            <h2 style={{ fontSize:isMobile?'clamp(28px,7vw,42px)':'clamp(36px,4.5vw,56px)', fontWeight:'800', textAlign:'center', letterSpacing:'-1.8px', marginBottom:'18px', color:'#fff', lineHeight:'1.05' }}>{t.featuresTitle}</h2>
            <p style={{ textAlign:'center', color:'rgba(255,255,255,0.42)', fontSize:isMobile?'14px':'16px', maxWidth:'560px', margin:'0 auto 64px', lineHeight:'1.7', fontWeight:'300' }}>{t.featuresDesc}</p>
          </FadeUp>
          <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'repeat(auto-fit,minmax(300px,1fr))', gap:0, margin:'0 auto', borderTop:'1px solid rgba(255,255,255,0.06)', borderLeft:'1px solid rgba(255,255,255,0.06)' }}>
            {FEATURES.map((f,i)=>(
              <FadeUp key={f.title} delay={i*0.05}>
                <div className="feat-card"
                  onMouseEnter={()=>setHoveredFeature(i)} onMouseLeave={()=>setHoveredFeature(null)}
                  onMouseMove={tintMove}
                  onClick={()=>{ if(f.page==='system')setShowUpload(true); else if(f.page)setActivePage(f.page) }}
                  style={{ padding:isMobile?'28px 24px':'36px 32px', borderRight:'1px solid rgba(255,255,255,0.06)', borderBottom:'1px solid rgba(255,255,255,0.06)', background:hoveredFeature===i?f.color+'08':'transparent', cursor:'pointer', height:'100%', '--ac':f.color, '--tint':f.color+'33' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'28px' }}>
                    <span className="mono" style={{ fontSize:'10px', color:'rgba(255,255,255,0.32)', letterSpacing:'1.5px', fontWeight:'600' }}>{String(i+1).padStart(2,'0')} / 06</span>
                    <span className="mono" style={{ fontSize:'9px', fontWeight:'700', color:f.color, border:`1px solid ${f.color}55`, padding:'3px 8px', borderRadius:'2px', letterSpacing:'1.4px' }}>{lang==='fr'?f.tagFr:f.tag}</span>
                  </div>
                  <div style={{ marginBottom:'22px', color:f.color, transition:'transform .4s cubic-bezier(0.16,1,0.3,1)', transform:hoveredFeature===i?'translateY(-2px)':'translateY(0)' }}>
                    <Icon name={FEATURE_ICONS[i]} size={22} stroke={1.5} />
                  </div>
                  <p style={{ fontSize:isMobile?'15px':'16px', fontWeight:'700', color:'#fff', marginBottom:'10px', letterSpacing:'-0.2px' }}>{lang==='fr'?f.titleFr:f.title}</p>
                  <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.5)', lineHeight:'1.7', fontWeight:'300' }}>{lang==='fr'?f.descFr:f.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* BEYOND ACCURACY */}
      <section style={{ padding:isMobile?'100px 20px 120px':'140px 32px 160px', position:'relative', zIndex:1, borderTop:'1px solid rgba(255,255,255,0.04)' }}>
        <CornerMark pos="tl" offset={24} color="#E63946" /><CornerMark pos="tr" offset={24} color="#E63946" />
        <CornerMark pos="bl" offset={24} color="#E63946" /><CornerMark pos="br" offset={24} color="#E63946" />
        <div style={{ maxWidth:'1080px', margin:'0 auto' }}>
          <FadeUp>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'10px', marginBottom:'24px' }}>
              <span className="mono" style={{ fontSize:'9px', color:'#00B4D8', letterSpacing:'2.5px', fontWeight:'700' }}>§ 03</span>
              <span style={{ width:'24px', height:'1px', background:'rgba(0,180,216,0.45)' }} />
              <span className="mono" style={{ fontSize:'10px', color:'#00B4D8', letterSpacing:'3px', fontWeight:'700', textTransform:'uppercase' }}>{t.finding}</span>
            </div>
            <h2 style={{ fontSize:isMobile?'clamp(36px,9vw,60px)':'clamp(48px,6vw,80px)', fontWeight:'900', textAlign:'center', letterSpacing:'-3px', marginBottom:'72px', lineHeight:'0.95', color:'#fff' }}>
              {lang==='fr'?'Au-Delà de la Précision':'Beyond Accuracy'}
            </h2>
          </FadeUp>

          {/* 33× callout — static, editorial */}
          <FadeUp delay={0.1}>
            <div style={{ maxWidth:'780px', margin:'0 auto 80px', padding:isMobile?'40px 24px':'56px 48px', background:'linear-gradient(180deg,rgba(230,57,70,0.04),rgba(230,57,70,0.008))', border:'1px solid rgba(230,57,70,0.18)', borderRadius:'8px', textAlign:'center', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(ellipse at 50% 0%,rgba(230,57,70,0.12),transparent 60%)' }} />
              <div className="mono" style={{ position:'relative', fontSize:'10px', color:'rgba(230,57,70,0.7)', letterSpacing:'3px', fontWeight:'700', marginBottom:'24px', textTransform:'uppercase' }}>{isFr?'Divergence de Perte':'Training Loss Divergence'}</div>
              <div style={{ position:'relative', fontFamily:"'Bebas Neue',sans-serif", fontSize:isMobile?'clamp(72px,22vw,120px)':'clamp(96px,14vw,180px)', fontWeight:'400', color:'#E63946', letterSpacing:'-2px', lineHeight:'0.95', marginBottom:'24px', fontVariantNumeric:'tabular-nums' }}>33×</div>
              <p style={{ position:'relative', fontSize:isMobile?'14px':'15px', color:'rgba(255,255,255,0.62)', maxWidth:'520px', margin:'0 auto', lineHeight:'1.8', fontWeight:'300' }}>{t.finding33x}</p>
            </div>
          </FadeUp>

          {/* groups — data sheet */}
          <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr 1fr':'repeat(4,minmax(0,1fr))', gap:0, maxWidth:'1000px', margin:'0 auto', borderTop:'1px solid rgba(255,255,255,0.06)', borderLeft:'1px solid rgba(255,255,255,0.06)' }}>
            {GROUPS.map((g,i)=>(
              <FadeUp key={g.g} delay={i*0.06}>
                <div className="grp-card" style={{ padding:isMobile?'22px 18px':'28px 22px', borderRight:'1px solid rgba(255,255,255,0.06)', borderBottom:'1px solid rgba(255,255,255,0.06)', transition:'background .4s cubic-bezier(0.16,1,0.3,1)', cursor:'default', height:'100%', '--tint':g.color+'2A' }}
                  onMouseMove={tintMove}
                  onMouseEnter={e=>{e.currentTarget.style.background=g.color+'08'}}
                  onMouseLeave={e=>{e.currentTarget.style.background='transparent'}}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'14px' }}>
                    <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'34px', color:g.color, lineHeight:1, letterSpacing:'2px' }}>G{g.g}</span>
                    {(g.winner||g.danger) && <span className="mono" style={{ fontSize:'8px', fontWeight:'800', color:g.color, border:`1px solid ${g.color}66`, padding:'2px 6px', borderRadius:'2px', letterSpacing:'1.5px' }}>{g.winner?(lang==='fr'?'GAGNANT':'WINNER'):(lang==='fr'?'DANGER':'DANGER')}</span>}
                  </div>
                  <p style={{ fontSize:'11px', fontWeight:'700', color:'#fff', marginBottom:'4px', letterSpacing:'0.2px' }}>{t.groupLabels[i]}</p>
                  <p style={{ fontSize:'10px', color:'rgba(255,255,255,0.38)', lineHeight:'1.6', marginBottom:'18px', minHeight:'48px', fontWeight:'300' }}>{t.groupDescs[i]}</p>
                  <div style={{ display:'flex', flexDirection:'column', gap:'8px', borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:'14px' }}>
                    {[[t.statLabels[0],g.acc,'#fff'],[t.statLabels[1],g.ece,g.g==='C'?'#E63946':'#10B981'],[t.statLabels[2],g.loss,g.g==='C'?'#E63946':'rgba(255,255,255,0.55)']].map(([label,val,col])=>(
                      <div key={label} style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
                        <span className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.32)', letterSpacing:'1px', textTransform:'uppercase' }}>{label}</span>
                        <span className="mono" style={{ fontSize:'11px', fontWeight:'700', color:col, letterSpacing:'0.2px' }}>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.2}>
            <div style={{ maxWidth:'640px', margin:'80px auto 0', textAlign:'center' }}>
              <p style={{ fontSize:isMobile?'14px':'16px', color:'rgba(255,255,255,0.48)', lineHeight:'1.9', fontStyle:'italic', fontFamily:'Georgia,Cambria,serif', fontWeight:'300' }}>{t.quote}</p>
              <button onClick={()=>setActivePage('research')} onMouseMove={tintMove} className="cta-ghost" style={{ marginTop:'32px', padding:'12px 26px', background:'transparent', border:'1px solid rgba(0,180,216,0.3)', color:'#00B4D8', borderRadius:'3px', cursor:'pointer', fontSize:'11px', fontWeight:'700', letterSpacing:'1.8px', fontFamily:'inherit', display:'inline-flex', alignItems:'center', gap:'10px' }}>
                <span style={{ display:'inline-flex', alignItems:'center', gap:'10px' }}>{lang==='fr'?'VOIR LA RECHERCHE COMPLÈTE':'VIEW FULL RESEARCH'}<Icon name="arrow" size={12} stroke={2.2} /></span>
              </button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding:isMobile?'72px 20px 40px':'100px 32px 56px', position:'relative', zIndex:1, borderTop:'1px solid rgba(255,255,255,0.06)', background:'linear-gradient(180deg,transparent 0%,rgba(0,180,216,0.025) 100%)' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1.3fr 2fr', gap:isMobile?'44px':'72px', marginBottom:'56px' }}>
            <div>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'34px', letterSpacing:'3px', lineHeight:1, marginBottom:'18px' }}>
                <span style={{ color:'#fff' }}>Illuma</span><span style={{ color:'#00B4D8' }}>DX</span>
              </div>
              <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.5)', lineHeight:'1.8', maxWidth:'320px', fontWeight:'300', marginBottom:'22px' }}>
                {isFr?'Système IA clinique pour la détection de tumeurs cérébrales. Diagnostic interprétable, statistiquement validé.':'Clinical AI system for brain tumor detection. Interpretable, statistically validated diagnostics.'}
              </p>
              <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#10B981', animation:'ripple 2s infinite', flexShrink:0 }} />
                <span className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.42)', letterSpacing:'2px', textTransform:'uppercase' }}>{isFr?'Système Actif · CWSF 2026':'System Active · CWSF 2026'}</span>
              </div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr 1fr':'repeat(3,1fr)', gap:isMobile?'32px 24px':'32px' }}>
              <div>
                <p className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.38)', letterSpacing:'2px', marginBottom:'18px', textTransform:'uppercase', fontWeight:'700' }}>{isFr?'Système':'System'}</p>
                <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                  <a onClick={()=>setShowUpload(true)} className="footer-link">{isFr?'Démo IA en direct':'Live AI Demo'}</a>
                  <a onClick={()=>setActivePage('patients')} className="footer-link">{isFr?'Dossiers Patients':'Patient Records'}</a>
                  <a onClick={()=>setActivePage('pdf')} className="footer-link">{isFr?'Rapport PDF':'PDF Report'}</a>
                </div>
              </div>
              <div>
                <p className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.38)', letterSpacing:'2px', marginBottom:'18px', textTransform:'uppercase', fontWeight:'700' }}>{isFr?'Recherche':'Research'}</p>
                <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                  <a onClick={()=>setActivePage('research')} className="footer-link">{isFr?'Résultats & Stats':'Findings & Stats'}</a>
                  <a onClick={()=>setActivePage('ethics')} className="footer-link">{isFr?'Éthique & Conformité':'Ethics & Compliance'}</a>
                </div>
              </div>
              <div>
                <p className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.38)', letterSpacing:'2px', marginBottom:'18px', textTransform:'uppercase', fontWeight:'700' }}>{isFr?'Stack':'Stack'}</p>
                <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                  <span className="mono" style={{ fontSize:'11px', color:'rgba(255,255,255,0.55)', letterSpacing:'0.3px' }}>ResNet-18</span>
                  <span className="mono" style={{ fontSize:'11px', color:'rgba(255,255,255,0.55)', letterSpacing:'0.3px' }}>GradCAM++</span>
                  <span className="mono" style={{ fontSize:'11px', color:'rgba(255,255,255,0.55)', letterSpacing:'0.3px' }}>PyTorch · FastAPI</span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:'28px', borderTop:'1px solid rgba(255,255,255,0.05)', flexWrap:'wrap', gap:'14px' }}>
            <span className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.32)', letterSpacing:'2px', textTransform:'uppercase' }}>© 2026 IllumaDX · {isFr?'Tous droits réservés':'All rights reserved'}</span>
            <span className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.32)', letterSpacing:'2px', textTransform:'uppercase' }}>{isFr?'Expo-sciences pancanadienne 2026':'Canada-Wide Science Fair 2026'}</span>
          </div>
        </div>
      </footer>

      {/* FLOATING LANG TOGGLE */}
      <div style={{ position:'fixed', bottom:isMobile?'44px':'64px', right:isMobile?'20px':'32px', zIndex:200, display:'flex', alignItems:'center', background:'rgba(10,22,40,0.92)', border:'1px solid rgba(0,180,216,0.22)', borderRadius:'40px', overflow:'hidden', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)', boxShadow:'0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,180,216,0.05)', animation:loaded?'fadeSlideIn 0.8s ease 1.4s both':'none', opacity:0 }}>
        {['en','fr'].map(l=>(
          <button key={l} onClick={()=>setLang(l)} className="mono" style={{ padding:'10px 18px', background:lang===l?'#00B4D8':'transparent', color:lang===l?'#05080F':'rgba(255,255,255,0.5)', border:'none', cursor:'pointer', fontSize:'10px', fontWeight:'800', letterSpacing:'2px', transition:'all 0.25s', fontFamily:'ui-monospace,SFMono-Regular,Menlo,monospace' }}>{l.toUpperCase()}</button>
        ))}
      </div>
    </div>
  )
}