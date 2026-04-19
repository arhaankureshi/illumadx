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
  const [hoveredRow, setHoveredRow] = useState(null)
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

  return (
    <div style={{ position:'fixed', inset:0, zIndex:500, background:'#05080F', display:'flex', flexDirection:'column', fontFamily:"'Inter',system-ui,sans-serif", animation:'slideUp 0.35s cubic-bezier(0.16,1,0.3,1)' }}>
      <style>{BASE_CSS}</style>
      <div style={{ background:'rgba(10,22,40,0.98)', borderBottom:'1px solid rgba(16,185,129,0.2)', padding:'0 24px', height:'60px', display:'flex', alignItems:'center', justifyContent:'space-between', backdropFilter:'blur(20px)', flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
          <button onClick={onClose} style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.6)', borderRadius:'6px', width:'32px', height:'32px', cursor:'pointer', fontSize:'16px', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'inherit' }}>←</button>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'22px', letterSpacing:'2px' }}><span style={{ color:'#fff' }}>Illuma</span><span style={{ color:'#00B4D8' }}>DX</span></div>
          <div style={{ width:'1px', height:'20px', background:'rgba(255,255,255,0.1)' }} />
          <span style={{ fontSize:'11px', color:'#10B981', letterSpacing:'3px', fontWeight:'700' }}>{isFr?'DOSSIERS PATIENTS':'PATIENT RECORDS'}</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
          <div style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#10B981', animation:'ripple 2s infinite' }} />
          <span style={{ fontSize:'10px', color:'rgba(255,255,255,0.25)', letterSpacing:'2px' }}>NORTHERN LIGHTS REGIONAL · CONNECT CARE</span>
        </div>
      </div>
      <div style={{ display:'flex', flex:1, overflow:'hidden' }}>
        <div style={{ width:'300px', borderRight:'1px solid rgba(255,255,255,0.06)', display:'flex', flexDirection:'column', flexShrink:0, background:'rgba(5,8,15,0.6)' }}>
          <div style={{ padding:'16px', borderBottom:'1px solid rgba(255,255,255,0.05)', flexShrink:0 }}>
            <p style={{ fontSize:'8px', color:'rgba(255,255,255,0.25)', letterSpacing:'3px', marginBottom:'8px', fontWeight:'600' }}>{isFr?'CHERCHER PAR ID':'SEARCH BY ID'}</p>
            <div style={{ display:'flex', gap:'6px' }}>
              <input value={searchId} onChange={e=>{setSearchId(e.target.value);setSearchError(false)}} onKeyDown={e=>e.key==='Enter'&&handleSearch()} placeholder="AHS-10042" style={{ flex:1, background:'rgba(255,255,255,0.04)', border:`1px solid ${searchError?'#E63946':'rgba(255,255,255,0.1)'}`, borderRadius:'5px', padding:'8px 12px', color:'#fff', fontSize:'12px', fontFamily:'inherit' }} />
              <button onClick={handleSearch} style={{ padding:'8px 12px', background:'#10B981', color:'#05080F', border:'none', borderRadius:'5px', cursor:'pointer', fontSize:'10px', fontWeight:'800', fontFamily:'inherit' }}>GO</button>
            </div>
            {searchError && <p style={{ fontSize:'10px', color:'#E63946', marginTop:'6px' }}>{isFr?'Aucun patient trouvé.':'No patient found.'}</p>}
          </div>
          <div style={{ flex:1, overflowY:'auto', padding:'8px' }}>
            <p style={{ fontSize:'8px', color:'rgba(255,255,255,0.2)', letterSpacing:'3px', margin:'8px 8px 10px', fontWeight:'600' }}>{patients.length} {isFr?'DOSSIERS':'ACTIVE RECORDS'}</p>
            {patients.map((p,i)=>(
              <div key={p.id} onClick={()=>{setSelectedPatient(p);setSearchError(false)}} onMouseEnter={()=>setHoveredRow(i)} onMouseLeave={()=>setHoveredRow(null)}
                style={{ padding:'12px 14px', borderRadius:'7px', cursor:'pointer', marginBottom:'3px', background:selectedPatient?.id===p.id?'rgba(16,185,129,0.08)':hoveredRow===i?'rgba(255,255,255,0.03)':'transparent', border:`1px solid ${selectedPatient?.id===p.id?'rgba(16,185,129,0.25)':'rgba(255,255,255,0.04)'}`, transition:'all 0.15s' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'4px' }}>
                  <div><p style={{ fontSize:'13px', fontWeight:'700', color:'#fff', marginBottom:'1px' }}>{p.name}</p><p style={{ fontSize:'9px', color:'rgba(255,255,255,0.3)', letterSpacing:'1px' }}>{p.id}</p></div>
                  <span style={{ fontSize:'7px', fontWeight:'800', color:p.statusColor, border:`1px solid ${p.statusColor}44`, padding:'2px 6px', borderRadius:'3px', letterSpacing:'0.5px', whiteSpace:'nowrap', marginLeft:'6px', flexShrink:0 }}>{p.status==='Scan Complete'?(isFr?'TERMINÉ':'DONE'):(isFr?'EN ATTENTE':'AWAITING')}</span>
                </div>
                <div style={{ display:'flex', gap:'10px' }}><span style={{ fontSize:'10px', color:'rgba(255,255,255,0.25)' }}>{p.age}y · {p.sex}</span><span style={{ fontSize:'10px', color:'rgba(255,255,255,0.2)' }}>{p.dept}</span></div>
                {p.latestResult && <div style={{ marginTop:'5px', display:'flex', alignItems:'center', gap:'5px' }}><div style={{ width:'5px', height:'5px', borderRadius:'50%', background:CLASS_COLORS[p.latestResult.prediction] }} /><span style={{ fontSize:'9px', color:CLASS_COLORS[p.latestResult.prediction], fontWeight:'700', textTransform:'uppercase' }}>{p.latestResult.prediction} · {(p.latestResult.confidence*100).toFixed(0)}%</span></div>}
              </div>
            ))}
          </div>
        </div>
        {selectedPatient
          ? <PatientDetail key={selectedPatient.id} patient={selectedPatient} lang={lang} onScanComplete={r=>handleScanComplete(selectedPatient.id,r)} />
          : <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'10px' }}><div style={{ fontSize:'48px', opacity:0.1 }}>🗂</div><p style={{ fontSize:'11px', color:'rgba(255,255,255,0.18)', letterSpacing:'3px' }}>{isFr?'SÉLECTIONNER UN PATIENT':'SELECT A PATIENT'}</p></div>
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

  const tabs=[{id:'overview',l:isFr?'Aperçu':'Overview'},{id:'history',l:isFr?'Historique':'Scan History',cnt:patient.scanHistory.length},{id:'scan',l:isFr?'Analyse IA':'AI Scan',done:!!localResult}]

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', animation:'fadeIn 0.25s ease' }}>
      <div style={{ padding:'18px 24px', borderBottom:'1px solid rgba(255,255,255,0.05)', background:'rgba(10,22,40,0.4)', flexShrink:0 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'10px' }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'3px' }}>
              <h2 style={{ fontSize:'20px', fontWeight:'800', color:'#fff' }}>{patient.name}</h2>
              <span style={{ fontSize:'7px', fontWeight:'800', color:patient.statusColor, border:`1px solid ${patient.statusColor}44`, padding:'3px 8px', borderRadius:'3px', letterSpacing:'1px' }}>{patient.status==='Scan Complete'?(isFr?'TERMINÉ':'COMPLETE'):(isFr?'EN ATTENTE':'AWAITING')}</span>
            </div>
            <p style={{ fontSize:'10px', color:'#10B981', letterSpacing:'2px', fontWeight:'700', marginBottom:'8px' }}>{patient.id}</p>
            <div style={{ display:'flex', gap:'18px', flexWrap:'wrap' }}>
              {[[isFr?'ÂGE':'AGE',`${patient.age}y · ${patient.sex}`],[isFr?'MÉDECIN':'PHYSICIAN',patient.physician],[isFr?'SERVICE':'DEPT',patient.dept],['SCAN',patient.scanDate],['BLOOD',patient.bloodType]].map(([l,v])=>(
                <div key={l}><p style={{ fontSize:'7px', color:'rgba(255,255,255,0.2)', letterSpacing:'2px', marginBottom:'2px' }}>{l}</p><p style={{ fontSize:'12px', fontWeight:'600', color:'rgba(255,255,255,0.75)' }}>{v}</p></div>
              ))}
            </div>
          </div>
          {localResult && <button onClick={()=>printPatientReport(patient,localResult,lang)} style={{ padding:'9px 18px', background:'rgba(255,183,3,0.1)', border:'1px solid rgba(255,183,3,0.35)', color:'#FFB703', borderRadius:'6px', cursor:'pointer', fontSize:'11px', fontWeight:'800', letterSpacing:'1px', fontFamily:'inherit', transition:'all 0.2s' }} onMouseEnter={e=>e.currentTarget.style.background='rgba(255,183,3,0.18)'} onMouseLeave={e=>e.currentTarget.style.background='rgba(255,183,3,0.1)'}>📄 PDF</button>}
        </div>
        <div style={{ display:'flex', gap:'4px', marginTop:'14px' }}>
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setActiveTab(t.id)} style={{ padding:'6px 14px', background:activeTab===t.id?'rgba(0,180,216,0.15)':'transparent', border:`1px solid ${activeTab===t.id?'rgba(0,180,216,0.4)':'rgba(255,255,255,0.08)'}`, borderRadius:'5px', color:activeTab===t.id?'#00B4D8':'rgba(255,255,255,0.4)', fontSize:'11px', fontWeight:'700', cursor:'pointer', transition:'all 0.15s', fontFamily:'inherit', display:'flex', alignItems:'center', gap:'5px' }}>
              {t.l}
              {t.cnt && <span style={{ fontSize:'9px', background:'rgba(255,255,255,0.08)', color:'rgba(255,255,255,0.35)', padding:'1px 5px', borderRadius:'8px' }}>{t.cnt}</span>}
              {t.done && <span style={{ fontSize:'8px', background:'#10B981', color:'#05080F', padding:'1px 5px', borderRadius:'3px', fontWeight:'800' }}>✓</span>}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'22px 24px' }}>
        {activeTab==='overview' && (
          <div style={{ animation:'fadeIn 0.2s ease' }}>
            <div style={{ background:'rgba(10,22,40,0.5)', border:'1px solid rgba(255,255,255,0.05)', borderRadius:'8px', padding:'18px', marginBottom:'12px' }}>
              <p style={{ fontSize:'8px', color:'rgba(255,255,255,0.2)', letterSpacing:'3px', marginBottom:'10px', fontWeight:'600' }}>{isFr?'HISTORIQUE CLINIQUE':'CLINICAL HISTORY'}</p>
              <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.6)', lineHeight:'1.85' }}>{patient.history}</p>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'12px' }}>
              {[['ALLERGIES',patient.allergies,'#E63946'],[isFr?'MÉDICAMENTS':'MEDICATIONS',patient.medications,'#00B4D8']].map(([title,items,color])=>(
                <div key={title} style={{ background:'rgba(10,22,40,0.5)', border:'1px solid rgba(255,255,255,0.05)', borderRadius:'8px', padding:'16px' }}>
                  <p style={{ fontSize:'8px', color:'rgba(255,255,255,0.2)', letterSpacing:'3px', marginBottom:'10px', fontWeight:'600' }}>{title}</p>
                  {items.map((a,i)=><div key={i} style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'6px' }}><div style={{ width:'5px', height:'5px', borderRadius:'50%', background:color, flexShrink:0 }}/><span style={{ fontSize:'12px', color:'rgba(255,255,255,0.55)' }}>{a}</span></div>)}
                </div>
              ))}
            </div>
            {localResult
              ? <div style={{ background:`${CLASS_COLORS[localResult.prediction]}0A`, border:`1px solid ${CLASS_COLORS[localResult.prediction]}33`, borderRadius:'8px', padding:'16px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'10px' }}>
                  <div><p style={{ fontSize:'8px', color:'rgba(255,255,255,0.25)', letterSpacing:'3px', marginBottom:'4px' }}>{isFr?'DERNIER RÉSULTAT':'LATEST RESULT'}</p><p style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'22px', color:CLASS_COLORS[localResult.prediction], letterSpacing:'2px' }}>{localResult.prediction.toUpperCase()}</p></div>
                  <div style={{ display:'flex', gap:'12px', alignItems:'center' }}>
                    <div style={{ textAlign:'right' }}><p style={{ fontSize:'8px', color:'rgba(255,255,255,0.25)', letterSpacing:'2px', marginBottom:'4px' }}>{isFr?'CONFIANCE':'CONFIDENCE'}</p><p style={{ fontSize:'26px', fontWeight:'900', color:'#10B981' }}>{(localResult.confidence*100).toFixed(1)}%</p></div>
                    <button onClick={()=>setActiveTab('scan')} style={{ padding:'7px 14px', background:'rgba(0,180,216,0.1)', border:'1px solid rgba(0,180,216,0.25)', color:'#00B4D8', borderRadius:'5px', cursor:'pointer', fontSize:'10px', fontWeight:'800', fontFamily:'inherit' }}>{isFr?'HEATMAPS →':'HEATMAPS →'}</button>
                  </div>
                </div>
              : <div style={{ background:'rgba(0,180,216,0.03)', border:'1px dashed rgba(0,180,216,0.2)', borderRadius:'8px', padding:'18px', textAlign:'center' }}>
                  <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.28)', marginBottom:'12px' }}>{isFr?"Aucune analyse IA effectuée pour ce patient.":"No AI analysis run yet for this patient."}</p>
                  <button onClick={()=>setActiveTab('scan')} style={{ padding:'8px 20px', background:'#00B4D8', color:'#05080F', border:'none', borderRadius:'5px', cursor:'pointer', fontSize:'11px', fontWeight:'800', fontFamily:'inherit' }}>⚡ {isFr?'LANCER SCAN':'RUN SCAN'}</button>
                </div>
            }
          </div>
        )}

        {activeTab==='history' && (
          <div style={{ animation:'fadeIn 0.2s ease' }}>
            <p style={{ fontSize:'8px', color:'rgba(255,255,255,0.2)', letterSpacing:'3px', marginBottom:'16px', fontWeight:'600' }}>{patient.scanHistory.length} {isFr?'ENTRÉES':'ENTRIES'} — {isFr?'RÉCENT EN PREMIER':'MOST RECENT FIRST'}</p>
            <div style={{ position:'relative' }}>
              <div style={{ position:'absolute', left:'15px', top:0, bottom:0, width:'1px', background:'rgba(255,255,255,0.06)' }} />
              {patient.scanHistory.map((s,i)=>{
                const isAI=s.provider==='IllumaDX AI System'
                const dc=isAI?'#00B4D8':i===0?'#10B981':'rgba(255,255,255,0.18)'
                return (
                  <div key={i} style={{ display:'flex', gap:'14px', marginBottom:'14px', position:'relative' }}>
                    <div style={{ width:'31px', flexShrink:0, display:'flex', justifyContent:'center' }}><div style={{ width:'10px', height:'10px', borderRadius:'50%', background:dc, border:`2px solid ${dc}`, marginTop:'5px', flexShrink:0, boxShadow:i===0?`0 0 10px ${dc}55`:undefined }} /></div>
                    <div style={{ flex:1, background:isAI?'rgba(0,180,216,0.04)':'rgba(10,22,40,0.4)', border:`1px solid ${isAI?'rgba(0,180,216,0.18)':'rgba(255,255,255,0.04)'}`, borderRadius:'7px', padding:'12px 14px' }}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'5px', flexWrap:'wrap', gap:'5px' }}>
                        <div><p style={{ fontSize:'13px', fontWeight:'700', color:'#fff', marginBottom:'2px' }}>{s.result}</p><p style={{ fontSize:'10px', color:'rgba(255,255,255,0.28)' }}>{s.type} · {s.provider}</p></div>
                        <span style={{ fontSize:'10px', color:i===0?'#10B981':'rgba(255,255,255,0.25)', fontWeight:i===0?'700':'400', background:i===0?'rgba(16,185,129,0.08)':'transparent', padding:'2px 7px', borderRadius:'3px', border:i===0?'1px solid rgba(16,185,129,0.18)':'none', whiteSpace:'nowrap' }}>{s.date}</span>
                      </div>
                      <p style={{ fontSize:'11px', color:'rgba(255,255,255,0.38)', lineHeight:'1.65' }}>{s.notes}</p>
                      {isAI && <div style={{ marginTop:'7px', display:'flex', gap:'5px', alignItems:'center' }}><div style={{ width:'5px', height:'5px', borderRadius:'50%', background:'#00B4D8' }}/><span style={{ fontSize:'9px', color:'#00B4D8', fontWeight:'700', letterSpacing:'1px' }}>ILLUMADX AI · GRADCAM++ VERIFIED</span></div>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {activeTab==='scan' && (
          <div style={{ animation:'fadeIn 0.2s ease' }}>
            <div style={{ background:'rgba(0,180,216,0.03)', border:'1px solid rgba(0,180,216,0.14)', borderRadius:'10px', padding:'22px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'16px' }}>
                <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#00B4D8', animation:'ripple 2s infinite' }} />
                <span style={{ fontSize:'10px', color:'#00B4D8', letterSpacing:'3px', fontWeight:'700' }}>{isFr?'ANALYSE ILLUMADX':'ILLUMADX ANALYSIS'}</span>
              </div>

              {scanPhase==='idle' && (
                <div>
                  <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.38)', marginBottom:'14px', lineHeight:'1.75' }}>{isFr?"Téléchargez l'IRM pour lancer l'analyse IA avec GradCAM++.":"Upload this patient's MRI scan to run real-time AI analysis with GradCAM++."}</p>
                  <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={e=>handleFile(e.target.files[0])} />
                  <button onClick={()=>fileRef.current.click()} style={{ padding:'12px 28px', background:'#00B4D8', color:'#05080F', border:'none', borderRadius:'6px', cursor:'pointer', fontSize:'11px', fontWeight:'800', letterSpacing:'1px', fontFamily:'inherit' }}>⚡ {isFr?'LANCER SCAN':'RUN ILLUMADX SCAN'}</button>
                </div>
              )}

              {scanPhase==='loading' && (
                <div style={{ textAlign:'center', padding:'28px' }}>
                  <div style={{ width:'40px', height:'40px', border:'3px solid rgba(0,180,216,0.2)', borderTop:'3px solid #00B4D8', borderRadius:'50%', animation:'spin 1s linear infinite', margin:'0 auto 14px' }} />
                  <p style={{ color:'#00B4D8', fontSize:'12px', letterSpacing:'2px', fontWeight:'700' }}>{isFr?'ANALYSE...':'ANALYSING...'}</p>
                </div>
              )}

              {(scanPhase==='not_mri'||scanPhase==='invalid'||scanPhase==='error') && (
                <div style={{ textAlign:'center', padding:'20px' }}>
                  <p style={{ color:'#E63946', fontWeight:'800', fontSize:'14px', marginBottom:'7px' }}>{scanPhase==='not_mri'?(isFr?'PAS UNE IRM':'NOT A BRAIN MRI'):(isFr?'CONFIANCE INSUFFISANTE':'LOW CONFIDENCE')}</p>
                  <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={e=>handleFile(e.target.files[0])} />
                  <button onClick={()=>fileRef.current.click()} style={{ marginTop:'8px', padding:'8px 18px', background:'rgba(0,180,216,0.1)', color:'#00B4D8', border:'1px solid rgba(0,180,216,0.3)', borderRadius:'4px', cursor:'pointer', fontSize:'11px', fontWeight:'700', fontFamily:'inherit' }}>{isFr?'RÉESSAYER':'TRY AGAIN'}</button>
                </div>
              )}

              {scanPhase==='done' && localResult && (
                <div>
                  <div style={{ background:`${CLASS_COLORS[localResult.prediction]}0F`, border:`1px solid ${CLASS_COLORS[localResult.prediction]}33`, borderRadius:'8px', padding:'16px 20px', marginBottom:'14px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'8px' }}>
                    <div><p style={{ fontSize:'8px', color:'rgba(255,255,255,0.28)', letterSpacing:'3px', marginBottom:'3px' }}>{isFr?'DIAGNOSTIC':'DIAGNOSIS'}</p><h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'28px', color:CLASS_COLORS[localResult.prediction], letterSpacing:'2px', margin:0 }}>{localResult.prediction.toUpperCase()}</h3></div>
                    <div style={{ textAlign:'right' }}><p style={{ fontSize:'8px', color:'rgba(255,255,255,0.28)', letterSpacing:'3px', marginBottom:'3px' }}>{isFr?'CONFIANCE':'CONFIDENCE'}</p><p style={{ fontSize:'32px', fontWeight:'900', color:'#10B981', letterSpacing:'-1px' }}>{(localResult.confidence*100).toFixed(1)}%</p></div>
                  </div>
                  <div style={{ marginBottom:'14px' }}>
                    {['glioma','meningioma','notumor','pituitary'].map(cls=>{
                      const p=(localResult.probabilities[cls]||0)*100; const isTop=cls===localResult.prediction
                      return (<div key={cls} style={{ marginBottom:'6px' }}>
                        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'2px' }}><span style={{ fontSize:'10px', color:isTop?CLASS_COLORS[cls]:'rgba(255,255,255,0.3)', fontWeight:isTop?'700':'400', textTransform:'uppercase', letterSpacing:'1px' }}>{cls}</span><span style={{ fontSize:'10px', color:isTop?CLASS_COLORS[cls]:'rgba(255,255,255,0.3)', fontWeight:isTop?'700':'400' }}>{p.toFixed(1)}%</span></div>
                        <div style={{ height:'4px', background:'rgba(255,255,255,0.05)', borderRadius:'2px', overflow:'hidden' }}><div style={{ height:'100%', width:`${p}%`, background:isTop?CLASS_COLORS[cls]:'rgba(255,255,255,0.08)', borderRadius:'2px', transition:'width 1s cubic-bezier(0.16,1,0.3,1)' }} /></div>
                      </div>)
                    })}
                  </div>
                  {localResult.heatmap_b && (
                    <div style={{ marginBottom:'12px' }}>
                      <p style={{ fontSize:'8px', color:'rgba(255,255,255,0.2)', letterSpacing:'3px', marginBottom:'8px', fontWeight:'600' }}>GRADCAM++</p>
                      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'6px', marginBottom:'6px' }}>
                        {[{k:'heatmap_b',l:'Group B — Basic ✓',c:'#10B981'},{k:'heatmap_d',l:'Group D — Domain',c:'#FFB703'}].map(({k,l,c})=>(
                          <div key={k} style={{ border:`1px solid ${c}33`, borderRadius:'5px', overflow:'hidden' }}>
                            <img src={`data:image/png;base64,${localResult[k]}`} alt={l} style={{ width:'100%', display:'block' }} />
                            <div style={{ padding:'5px 8px', background:`${c}0A` }}><p style={{ fontSize:'8px', color:c, fontWeight:'700', margin:0 }}>{l}</p></div>
                          </div>
                        ))}
                      </div>
                      <div style={{ border:'1px solid rgba(0,180,216,0.3)', borderRadius:'5px', overflow:'hidden' }}>
                        <img src={`data:image/png;base64,${localResult.heatmap_consensus}`} alt="consensus" style={{ width:'100%', display:'block' }} />
                        <div style={{ padding:'6px 10px', background:'rgba(0,180,216,0.06)' }}><p style={{ fontSize:'9px', color:'#00B4D8', fontWeight:'700', margin:0 }}>⬡ CONSENSUS B+D</p></div>
                      </div>
                    </div>
                  )}
                  <div style={{ display:'flex', gap:'7px' }}>
                    <button onClick={()=>printPatientReport(patient,localResult,lang)} style={{ flex:1, padding:'9px', background:'rgba(255,183,3,0.1)', border:'1px solid rgba(255,183,3,0.3)', color:'#FFB703', borderRadius:'5px', cursor:'pointer', fontSize:'10px', fontWeight:'800', fontFamily:'inherit' }}>📄 PDF</button>
                    <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={e=>handleFile(e.target.files[0])} />
                    <button onClick={()=>fileRef.current.click()} style={{ flex:1, padding:'9px', background:'rgba(0,180,216,0.07)', border:'1px solid rgba(0,180,216,0.18)', color:'#00B4D8', borderRadius:'5px', cursor:'pointer', fontSize:'10px', fontWeight:'800', fontFamily:'inherit' }}>↺ {isFr?'NOUVEAU':'NEW SCAN'}</button>
                  </div>
                </div>
              )}
            </div>
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

  return (
    <div onClick={onClose} style={{ position:'fixed', inset:0, zIndex:1000, background:'rgba(5,8,15,0.92)', backdropFilter:'blur(20px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:'#0A1628', border:'1px solid rgba(0,180,216,0.2)', borderRadius:'12px', width:'100%', maxWidth:phase==='result'?'900px':'520px', maxHeight:'90vh', overflowY:'auto', padding:'36px', position:'relative', boxShadow:'0 40px 120px rgba(0,0,0,0.8)', transition:'max-width 0.5s cubic-bezier(0.16,1,0.3,1)' }}>
        <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes ripple{0%{box-shadow:0 0 0 0 rgba(16,185,129,0.5)}70%{box-shadow:0 0 0 14px rgba(16,185,129,0)}100%{box-shadow:0 0 0 0 rgba(16,185,129,0)}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>
        <button onClick={onClose} style={{ position:'absolute', top:'16px', right:'16px', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.5)', borderRadius:'6px', width:'32px', height:'32px', cursor:'pointer', fontSize:'16px', display:'flex', alignItems:'center', justifyContent:'center' }}>×</button>
        <div style={{ marginBottom:'24px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'8px' }}><div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#10B981', animation:'ripple 2s infinite' }}/><span style={{ fontSize:'9px', color:'#10B981', letterSpacing:'3px', fontWeight:'700' }}>{isFr?'SYSTÈME EN DIRECT':'LIVE SYSTEM'}</span></div>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'32px', color:'#fff', letterSpacing:'2px', margin:0 }}>Illuma<span style={{ color:'#00B4D8' }}>DX</span> {isFr?'ANALYSE':'ANALYSIS'}</h2>
          <p style={{ color:'rgba(255,255,255,0.3)', fontSize:'12px', marginTop:'6px' }}>{isFr?'Téléchargez une IRM pour une analyse en temps réel':'Upload a brain MRI scan for real-time AI analysis'}</p>
        </div>

        {phase==='idle' && (
          <div onDragOver={e=>{e.preventDefault();setDragOver(true)}} onDragLeave={()=>setDragOver(false)} onDrop={e=>{e.preventDefault();setDragOver(false);handleFile(e.dataTransfer.files[0])}} onClick={()=>fileRef.current.click()}
            style={{ border:`2px dashed ${dragOver?'#00B4D8':'rgba(0,180,216,0.25)'}`, borderRadius:'8px', padding:'60px 24px', textAlign:'center', cursor:'pointer', background:dragOver?'rgba(0,180,216,0.05)':'rgba(0,180,216,0.02)', transition:'all 0.2s' }}>
            <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={e=>handleFile(e.target.files[0])} />
            <div style={{ fontSize:'48px', marginBottom:'16px' }}>🧠</div>
            <p style={{ color:'#00B4D8', fontSize:'14px', fontWeight:'700', marginBottom:'8px' }}>{isFr?'Glissez une IRM ici':'Drop MRI scan here'}</p>
            <p style={{ color:'rgba(255,255,255,0.25)', fontSize:'12px', marginBottom:'24px' }}>{isFr?'ou cliquez pour parcourir':'or click to browse'} · PNG, JPG, JPEG</p>
            <div style={{ display:'inline-block', padding:'10px 20px', background:'#00B4D8', color:'#05080F', borderRadius:'4px', fontSize:'11px', fontWeight:'800', letterSpacing:'1px' }}>{isFr?'CHOISIR FICHIER':'CHOOSE FILE'}</div>
          </div>
        )}

        {phase==='loading' && (
          <div style={{ textAlign:'center', padding:'60px 24px' }}>
            {preview && <img src={preview} alt="scan" style={{ width:'120px', height:'120px', objectFit:'cover', borderRadius:'8px', marginBottom:'20px', opacity:0.6, border:'1px solid rgba(0,180,216,0.3)' }} />}
            <div style={{ width:'48px', height:'48px', border:'3px solid rgba(0,180,216,0.2)', borderTop:'3px solid #00B4D8', borderRadius:'50%', animation:'spin 1s linear infinite', margin:'0 auto 18px' }} />
            <p style={{ color:'#00B4D8', fontSize:'13px', fontWeight:'700', letterSpacing:'2px' }}>{isFr?'ANALYSE EN COURS...':'ANALYSING SCAN...'}</p>
          </div>
        )}

        {phase==='not_mri' && <div style={{ textAlign:'center', padding:'48px 24px' }}><div style={{ fontSize:'48px', marginBottom:'14px' }}>🧠</div><h3 style={{ color:'#E63946', fontSize:'18px', fontWeight:'800', marginBottom:'10px' }}>{isFr?'PAS UNE IRM':'NOT A BRAIN MRI'}</h3><p style={{ color:'rgba(255,255,255,0.4)', fontSize:'13px', maxWidth:'340px', margin:'0 auto 24px' }}>{isFr?'IRM cérébrale valide requise.':'Please upload a valid greyscale brain MRI.'}</p><button onClick={reset} style={{ padding:'10px 24px', background:'#00B4D8', color:'#05080F', border:'none', borderRadius:'4px', fontSize:'11px', fontWeight:'800', cursor:'pointer' }}>{isFr?'RÉESSAYER':'TRY AGAIN'}</button></div>}
        {phase==='invalid' && <div style={{ textAlign:'center', padding:'48px 24px' }}><div style={{ fontSize:'48px', marginBottom:'14px' }}>🛡</div><h3 style={{ color:'#E63946', fontSize:'18px', fontWeight:'800', marginBottom:'10px' }}>{isFr?'SCAN INVALIDE':'INVALID SCAN'}</h3><p style={{ color:'rgba(255,255,255,0.4)', fontSize:'13px', maxWidth:'340px', margin:'0 auto 24px' }}>{isFr?'Confiance < 60%.':'Model confidence below 60%.'}</p><button onClick={reset} style={{ padding:'10px 24px', background:'#00B4D8', color:'#05080F', border:'none', borderRadius:'4px', fontSize:'11px', fontWeight:'800', cursor:'pointer' }}>{isFr?'RÉESSAYER':'TRY AGAIN'}</button></div>}
        {phase==='error' && <div style={{ textAlign:'center', padding:'48px 24px' }}><div style={{ fontSize:'48px', marginBottom:'14px' }}>⚠️</div><h3 style={{ color:'#E63946', fontSize:'18px', fontWeight:'800', marginBottom:'10px' }}>{isFr?'ERREUR':'CONNECTION ERROR'}</h3><button onClick={reset} style={{ padding:'10px 24px', background:'#00B4D8', color:'#05080F', border:'none', borderRadius:'4px', fontSize:'11px', fontWeight:'800', cursor:'pointer' }}>{isFr?'RÉESSAYER':'TRY AGAIN'}</button></div>}

        {phase==='result' && result && (
          <div style={{ animation:'fadeIn 0.4s ease' }}>
            <div style={{ background:'rgba(16,185,129,0.06)', border:'1px solid rgba(16,185,129,0.25)', borderRadius:'8px', padding:'22px', marginBottom:'20px', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'10px' }}>
              <div><p style={{ fontSize:'10px', color:'rgba(255,255,255,0.3)', letterSpacing:'3px', marginBottom:'5px' }}>{isFr?'PRÉDICTION':'PREDICTION'}</p><h3 style={{ fontSize:'28px', fontFamily:"'Bebas Neue',sans-serif", letterSpacing:'2px', color:CLASS_COLORS[result.prediction]||'#10B981', margin:0 }}>{result.prediction.toUpperCase()}</h3></div>
              <div style={{ textAlign:'right' }}><p style={{ fontSize:'10px', color:'rgba(255,255,255,0.3)', letterSpacing:'3px', marginBottom:'5px' }}>{isFr?'CONFIANCE':'CONFIDENCE'}</p><p style={{ fontSize:'36px', fontWeight:'900', color:'#10B981', margin:0, letterSpacing:'-1px' }}>{(result.confidence*100).toFixed(1)}%</p></div>
            </div>
            <div style={{ marginBottom:'24px' }}>
              {['glioma','meningioma','notumor','pituitary'].map(cls=>{
                const p=(result.probabilities[cls]||0)*100; const isTop=cls===result.prediction
                return (<div key={cls} style={{ marginBottom:'9px' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'3px' }}><span style={{ fontSize:'11px', color:isTop?CLASS_COLORS[cls]:'rgba(255,255,255,0.38)', fontWeight:isTop?'700':'400', textTransform:'uppercase', letterSpacing:'1px' }}>{cls}</span><span style={{ fontSize:'11px', color:isTop?CLASS_COLORS[cls]:'rgba(255,255,255,0.38)', fontWeight:isTop?'700':'400' }}>{p.toFixed(1)}%</span></div>
                  <div style={{ height:'5px', background:'rgba(255,255,255,0.05)', borderRadius:'3px', overflow:'hidden' }}><div style={{ height:'100%', width:`${p}%`, background:isTop?CLASS_COLORS[cls]:'rgba(255,255,255,0.1)', borderRadius:'3px', transition:'width 1s cubic-bezier(0.16,1,0.3,1)' }} /></div>
                </div>)
              })}
            </div>
            <div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px', marginBottom:'8px' }}>
                {[{k:'heatmap_b',l:isFr?'Groupe B ✓':'Group B — Basic ✓',c:'#10B981'},{k:'heatmap_d',l:isFr?'Groupe D':'Group D — Domain',c:'#FFB703'}].map(({k,l,c})=>(
                  <div key={k} style={{ border:`1px solid ${c}33`, borderRadius:'7px', overflow:'hidden' }}>
                    <img src={`data:image/png;base64,${result[k]}`} alt={l} style={{ width:'100%', display:'block' }} />
                    <div style={{ padding:'7px 10px', background:`${c}0A` }}><p style={{ fontSize:'10px', color:c, fontWeight:'700', margin:0 }}>{l}</p></div>
                  </div>
                ))}
              </div>
              <div style={{ border:'1px solid rgba(0,180,216,0.35)', borderRadius:'7px', overflow:'hidden' }}>
                <img src={`data:image/png;base64,${result.heatmap_consensus}`} alt="consensus" style={{ width:'100%', display:'block' }} />
                <div style={{ padding:'9px 12px', background:'rgba(0,180,216,0.06)' }}><p style={{ fontSize:'10px', color:'#00B4D8', fontWeight:'700', margin:0 }}>⬡ {isFr?'CONSENSUS B+D':'CONSENSUS B+D — FINAL HEATMAP'}</p></div>
              </div>
            </div>
            <div style={{ marginTop:'16px', padding:'10px 14px', background:'rgba(255,183,3,0.05)', border:'1px solid rgba(255,183,3,0.15)', borderRadius:'5px' }}>
              <p style={{ fontSize:'10px', color:'rgba(255,183,3,0.7)', margin:0, lineHeight:'1.6' }}>⚠ {isFr?'Outil de recherche uniquement.':'Research tool only. Not a substitute for clinical diagnosis.'}</p>
            </div>
            <button onClick={reset} style={{ marginTop:'16px', width:'100%', padding:'11px', background:'rgba(0,180,216,0.08)', border:'1px solid rgba(0,180,216,0.2)', color:'#00B4D8', borderRadius:'5px', fontSize:'11px', fontWeight:'800', cursor:'pointer', letterSpacing:'1.5px' }}>{isFr?'← ANALYSER UN AUTRE SCAN':'← ANALYSE ANOTHER SCAN'}</button>
          </div>
        )}
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
  const [hoveredStat, setHoveredStat] = useState(null)
  const [hoveredFeature, setHoveredFeature] = useState(null)
  const [hoveredNav, setHoveredNav] = useState(null)
  const [lang, setLang] = useState('en')
  const [isMobile, setIsMobile] = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  const [activePage, setActivePage] = useState(null)

  const t = T[lang]

  useEffect(()=>{const c=()=>setIsMobile(window.innerWidth<768);c();window.addEventListener('resize',c);return()=>window.removeEventListener('resize',c)},[])
  useEffect(()=>{const t2=setTimeout(()=>setLoaded(true),100);return()=>clearTimeout(t2)},[])
  useEffect(()=>{const fn=()=>setScrollY(window.scrollY);window.addEventListener('scroll',fn,{passive:true});return()=>window.removeEventListener('scroll',fn)},[])
  useEffect(()=>{const fn=e=>{setMouseX((e.clientX/window.innerWidth-0.5)*30);setMouseY((e.clientY/window.innerHeight-0.5)*30)};window.addEventListener('mousemove',fn,{passive:true});return()=>window.removeEventListener('mousemove',fn)},[])

  const handleNavClick = item => {
    if (item.id==='system') setShowUpload(true)
    else if (item.id==='patients') setActivePage('patients')
    else if (item.id==='pdf') setActivePage('pdf')
    else if (item.id==='research') setActivePage('research')
    else if (item.id==='ethics') setActivePage('ethics')
  }

  const stats = [
    { value:'99.69%', label:t.peakAcc, color:'#10B981' },
    { value:'33×', label:t.lossGap, color:'#E63946' },
    { value:'40', label:t.modelsTrained, color:'#00B4D8' },
    { value:'300K+', label:t.patients, color:'#FFB703' },
  ]

  const visibleNav = isMobile ? NAV.filter(n=>n.mobile) : NAV

  return (
    <div style={{ background:'#05080F', minHeight:'100vh', overflowX:'hidden', fontFamily:"'Inter',system-ui,sans-serif" }}>
      <style>{BASE_CSS}</style>

      <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', backgroundImage:`linear-gradient(rgba(0,180,216,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,180,216,0.025) 1px,transparent 1px)`, backgroundSize:'80px 80px' }} />
      <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', background:`radial-gradient(800px circle at ${50+mouseX*0.4}% ${50+mouseY*0.4}%,rgba(0,180,216,0.065),transparent 60%)` }} />

      {showUpload && <UploadModal onClose={()=>setShowUpload(false)} lang={lang} />}
      {activePage==='patients' && <PatientRecordsPage lang={lang} onClose={()=>setActivePage(null)} />}
      {activePage==='pdf' && <PDFReportPage lang={lang} onClose={()=>setActivePage(null)} />}
      {activePage==='research' && <ResearchPage lang={lang} onClose={()=>setActivePage(null)} />}
      {activePage==='ethics' && <EthicsPage lang={lang} onClose={()=>setActivePage(null)} />}

      {/* NAV */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:100, padding:'0 24px', height:'60px', display:'flex', justifyContent:'space-between', alignItems:'center', background:scrollY>60?'rgba(5,8,15,0.94)':'rgba(5,8,15,0.6)', backdropFilter:'blur(24px)', borderBottom:'1px solid rgba(255,255,255,0.05)', transition:'background 0.4s', opacity:loaded?1:0, animation:loaded?'fadeSlideIn 0.8s ease 0.2s both':'none' }}>
        <div onClick={()=>setActivePage(null)} style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:isMobile?'22px':'26px', letterSpacing:'2px', cursor:'pointer', flexShrink:0 }}>
          <span style={{ color:'#fff' }}>Illuma</span><span style={{ color:'#00B4D8' }}>DX</span>
        </div>
        <div style={{ display:'flex', gap:isMobile?'4px':'6px', alignItems:'center' }}>
          {visibleNav.map((item,i)=>(
            <div key={item.id} className="nav-btn" onMouseEnter={()=>setHoveredNav(i)} onMouseLeave={()=>setHoveredNav(null)} onClick={()=>handleNavClick(item)} style={{ position:'relative', cursor:'pointer' }}>
              <div style={{ display:'flex', alignItems:'center', gap:isMobile?'4px':'6px', padding:isMobile?'6px 8px':'7px 14px', background:hoveredNav===i?item.bg:'transparent', border:`1px solid ${hoveredNav===i?item.border:'transparent'}`, borderRadius:'6px', transition:'all 0.2s' }}>
                <span style={{ fontSize:isMobile?'11px':'12px' }}>{item.icon}</span>
                <span style={{ fontSize:isMobile?'11px':'14px', fontWeight:'600', color:hoveredNav===i?item.color:'rgba(255,255,255,0.5)', transition:'color 0.2s', whiteSpace:'nowrap' }}>
                  {isMobile?(lang==='fr'?item.labelFr:item.label).split(' ')[0]:(lang==='fr'?item.labelFr:item.label)}
                </span>
              </div>
              {!isMobile && <div className="nav-tooltip" style={{ position:'absolute', top:'calc(100% + 8px)', left:'50%', transform:'translateX(-50%) translateY(4px)', background:'rgba(10,22,40,0.98)', border:`1px solid ${item.border}`, borderRadius:'5px', padding:'5px 10px', whiteSpace:'nowrap', fontSize:'10px', color:item.color, letterSpacing:'0.5px', opacity:0, transition:'opacity 0.2s,transform 0.2s', pointerEvents:'none', backdropFilter:'blur(12px)', zIndex:200 }}>{lang==='fr'?item.descFr:item.desc}</div>}
            </div>
          ))}
        </div>
        <button onClick={()=>setShowUpload(true)} style={{ padding:isMobile?'6px 12px':'8px 18px', background:'#00B4D8', color:'#05080F', border:'none', borderRadius:'4px', fontSize:isMobile?'10px':'11px', fontWeight:'800', cursor:'pointer', letterSpacing:'1px', transition:'all 0.2s', boxShadow:'0 0 20px rgba(0,180,216,0.2)', fontFamily:'inherit', flexShrink:0 }}
          onMouseEnter={e=>{e.currentTarget.style.boxShadow='0 0 40px rgba(0,180,216,0.5)';e.currentTarget.style.transform='translateY(-1px)'}}
          onMouseLeave={e=>{e.currentTarget.style.boxShadow='0 0 20px rgba(0,180,216,0.2)';e.currentTarget.style.transform='translateY(0)'}}>
          {isMobile?'UPLOAD':t.upload}
        </button>
      </nav>

      {/* HERO */}
      <section style={{ minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', textAlign:'center', padding:isMobile?'80px 20px 40px':'80px 24px 40px', position:'relative', zIndex:1 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'28px', animation:loaded?'fadeSlideIn 0.8s ease 0.4s both':'none', opacity:0 }}>
          <div style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#10B981', animation:'ripple 2s infinite' }} />
          <span style={{ fontSize:isMobile?'9px':'11px', color:'#10B981', letterSpacing:'3px', fontWeight:'700' }}>{t.live}</span>
        </div>
        <div style={{ animation:loaded?'fadeSlideIn 1s cubic-bezier(0.16,1,0.3,1) 0.5s both':'none', opacity:0 }}>
          <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:isMobile?'clamp(72px,22vw,130px)':'clamp(80px,13vw,160px)', fontWeight:'400', letterSpacing:'6px', lineHeight:'0.9', margin:0, transform:`translate(${mouseX*0.15}px,${mouseY*0.1}px)`, transition:'transform 0.2s', userSelect:'none' }}>
            <span style={{ color:'#fff' }}>Illuma</span><span style={{ color:'#00B4D8' }}>DX</span>
          </h1>
        </div>
        <div style={{ animation:loaded?'fadeSlideIn 0.8s ease 0.8s both':'none', opacity:0, marginTop:'28px' }}>
          <p style={{ fontSize:isMobile?'9px':'11px', color:'#00B4D8', letterSpacing:isMobile?'2px':'4px', fontWeight:'600', marginBottom:'14px' }}>{t.tagline}</p>
          <p style={{ fontSize:isMobile?'13px':'15px', color:'rgba(255,255,255,0.3)', maxWidth:'500px', lineHeight:'1.85', margin:'0 auto 44px' }}>{t.desc}</p>
        </div>
        <div style={{ display:'flex', gap:'10px', justifyContent:'center', flexWrap:'wrap', animation:loaded?'fadeSlideIn 0.8s ease 1s both':'none', opacity:0 }}>
          <button onClick={()=>setShowUpload(true)} style={{ padding:isMobile?'12px 28px':'14px 40px', background:'#00B4D8', color:'#05080F', border:'none', borderRadius:'3px', fontSize:'13px', fontWeight:'800', cursor:'pointer', letterSpacing:'1.5px', boxShadow:'0 0 40px rgba(0,180,216,0.25)', transition:'all 0.25s', fontFamily:'inherit' }}
            onMouseEnter={e=>{e.currentTarget.style.boxShadow='0 0 70px rgba(0,180,216,0.55)';e.currentTarget.style.transform='translateY(-2px)'}}
            onMouseLeave={e=>{e.currentTarget.style.boxShadow='0 0 40px rgba(0,180,216,0.25)';e.currentTarget.style.transform='translateY(0)'}}>
            {t.upload}
          </button>
          <button onClick={()=>setActivePage('research')} style={{ padding:isMobile?'12px 28px':'14px 40px', background:'transparent', color:'rgba(255,255,255,0.65)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:'3px', fontSize:'13px', fontWeight:'500', cursor:'pointer', transition:'all 0.25s', fontFamily:'inherit' }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.3)';e.currentTarget.style.color='#fff';e.currentTarget.style.transform='translateY(-2px)'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.12)';e.currentTarget.style.color='rgba(255,255,255,0.65)';e.currentTarget.style.transform='translateY(0)'}}>
            {t.research}
          </button>
        </div>
        <div style={{ display:'flex', gap:'8px', marginTop:'56px', flexWrap:'wrap', justifyContent:'center', animation:loaded?'fadeSlideIn 0.8s ease 1.2s both':'none', opacity:0 }}>
          {stats.map((stat,i)=>(
            <div key={i} onMouseEnter={()=>setHoveredStat(i)} onMouseLeave={()=>setHoveredStat(null)}
              style={{ padding:isMobile?'12px 14px':'18px 22px', border:`1px solid ${hoveredStat===i?stat.color+'55':'rgba(255,255,255,0.06)'}`, borderRadius:'6px', background:hoveredStat===i?stat.color+'0A':'rgba(255,255,255,0.015)', textAlign:'center', minWidth:isMobile?'70px':'110px', cursor:'default', transition:'all 0.3s', transform:hoveredStat===i?'translateY(-4px)':'translateY(0)' }}>
              <div style={{ fontSize:isMobile?'16px':'24px', fontWeight:'900', color:stat.color, letterSpacing:'-0.5px' }}>{stat.value}</div>
              <div style={{ fontSize:'8px', color:'rgba(255,255,255,0.28)', marginTop:'4px', letterSpacing:'1px', fontWeight:'600' }}>{stat.label.toUpperCase()}</div>
            </div>
          ))}
        </div>
        <div style={{ position:'absolute', bottom:'32px', left:'50%', transform:'translateX(-50%)', opacity:0.4 }}>
          <div style={{ width:'1px', height:'52px', background:'linear-gradient(to bottom,transparent,#00B4D8)', animation:'scrollline 2s ease-in-out infinite' }} />
        </div>
      </section>

      {/* HAWKING QUOTE */}
      <section style={{ minHeight:'50vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', textAlign:'center', padding:isMobile?'80px 20px':'100px 24px', position:'relative', zIndex:1, borderTop:'1px solid rgba(255,255,255,0.04)', background:'linear-gradient(180deg,rgba(0,180,216,0.02) 0%,transparent 100%)' }}>
        <FadeUp><p style={{ fontSize:'10px', color:'rgba(255,255,255,0.25)', letterSpacing:'5px', marginBottom:'44px', fontWeight:'600' }}>{t.thesis}</p></FadeUp>
        <FadeUp delay={0.12}><blockquote style={{ fontSize:isMobile?'clamp(18px,5vw,28px)':'clamp(20px,3.5vw,40px)', fontWeight:'300', color:'rgba(255,255,255,0.72)', lineHeight:'1.5', maxWidth:'800px', margin:'0 auto 16px', fontStyle:'italic', fontFamily:'Georgia,serif' }}>{t.hawkingLine1}<br /><span style={{ color:'#fff', fontWeight:'400' }}>{t.hawkingLine2}</span></blockquote></FadeUp>
        <FadeUp delay={0.22}><p style={{ fontSize:'11px', color:'rgba(255,255,255,0.2)', letterSpacing:'3px', marginBottom:'48px' }}>— STEPHEN HAWKING</p></FadeUp>
        <FadeUp delay={0.34}><p style={{ fontSize:isMobile?'14px':'clamp(14px,1.8vw,17px)', color:'rgba(255,255,255,0.38)', maxWidth:'520px', lineHeight:'1.9' }}>{t.hawkingBody}</p></FadeUp>
      </section>

      {/* FEATURES */}
      <section style={{ padding:isMobile?'80px 20px':'100px 48px', position:'relative', zIndex:1, borderTop:'1px solid rgba(255,255,255,0.04)' }}>
        <FadeUp>
          <p style={{ fontSize:'10px', color:'#00B4D8', letterSpacing:'5px', marginBottom:'14px', fontWeight:'700', textAlign:'center' }}>{t.features}</p>
          <h2 style={{ fontSize:isMobile?'clamp(28px,8vw,48px)':'clamp(32px,5vw,60px)', fontWeight:'900', textAlign:'center', letterSpacing:'-2px', marginBottom:'14px', color:'#fff' }}>{t.featuresTitle}</h2>
          <p style={{ textAlign:'center', color:'rgba(255,255,255,0.35)', fontSize:'15px', maxWidth:'500px', margin:'0 auto 60px', lineHeight:'1.7' }}>{t.featuresDesc}</p>
        </FadeUp>
        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'repeat(auto-fit,minmax(280px,1fr))', gap:'12px', maxWidth:'1000px', margin:'0 auto' }}>
          {FEATURES.map((f,i)=>(
            <FadeUp key={f.title} delay={i*0.07}>
              <div onMouseEnter={()=>setHoveredFeature(i)} onMouseLeave={()=>setHoveredFeature(null)}
                onClick={()=>{ if(f.page==='system')setShowUpload(true); else if(f.page)setActivePage(f.page) }}
                style={{ padding:'28px 26px', border:`1px solid ${hoveredFeature===i?f.color+'40':'rgba(255,255,255,0.05)'}`, borderRadius:'8px', background:hoveredFeature===i?f.color+'08':'rgba(255,255,255,0.015)', transition:'all 0.35s cubic-bezier(0.16,1,0.3,1)', transform:hoveredFeature===i?'translateY(-5px)':'translateY(0)', cursor:'pointer', height:'100%' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'14px' }}>
                  <span style={{ fontSize:'26px' }}>{f.icon}</span>
                  <span style={{ fontSize:'9px', fontWeight:'700', color:f.color, border:`1px solid ${f.color}44`, padding:'3px 8px', borderRadius:'20px', letterSpacing:'1px' }}>{lang==='fr'?f.tagFr:f.tag}</span>
                </div>
                <p style={{ fontSize:'15px', fontWeight:'700', color:'#fff', marginBottom:'8px' }}>{lang==='fr'?f.titleFr:f.title}</p>
                <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.38)', lineHeight:'1.7' }}>{lang==='fr'?f.descFr:f.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* BEYOND ACCURACY */}
      <section style={{ padding:isMobile?'80px 20px 100px':'100px 48px 140px', position:'relative', zIndex:1, borderTop:'1px solid rgba(255,255,255,0.04)' }}>
        <FadeUp>
          <p style={{ fontSize:'10px', color:'#00B4D8', letterSpacing:'5px', marginBottom:'14px', fontWeight:'700', textAlign:'center' }}>{t.finding}</p>
          <h2 style={{ fontSize:isMobile?'clamp(36px,10vw,64px)':'clamp(40px,7vw,88px)', fontWeight:'900', textAlign:'center', letterSpacing:'-3px', marginBottom:'72px', lineHeight:'0.9', color:'#fff' }}>{lang==='fr'?'Au-Delà de la Précision':'Beyond Accuracy'}</h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div style={{ maxWidth:'800px', margin:'0 auto 60px', padding:isMobile?'36px 24px':'48px', background:'rgba(230,57,70,0.03)', border:'1px solid rgba(230,57,70,0.14)', borderRadius:'8px', textAlign:'center', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(ellipse at 50% -10%,rgba(230,57,70,0.1),transparent 55%)' }} />
            <div style={{ fontSize:isMobile?'clamp(60px,18vw,100px)':'clamp(72px,12vw,140px)', fontWeight:'900', color:'#E63946', letterSpacing:'-5px', lineHeight:'1', marginBottom:'18px', animation:'subtleGlow 3s ease-in-out infinite' }}>33×</div>
            <p style={{ fontSize:isMobile?'13px':'15px', color:'rgba(255,255,255,0.5)', maxWidth:'460px', margin:'0 auto', lineHeight:'1.85' }}>{t.finding33x}</p>
          </div>
        </FadeUp>
        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr 1fr':'repeat(auto-fit,minmax(215px,1fr))', gap:'10px', maxWidth:'960px', margin:'0 auto' }}>
          {GROUPS.map((g,i)=>(
            <FadeUp key={g.g} delay={i*0.08}>
              <div style={{ padding:'20px 16px', border:`1px solid ${g.color}18`, borderRadius:'6px', background:`${g.color}04`, transition:'all 0.35s cubic-bezier(0.16,1,0.3,1)', cursor:'default', height:'100%' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=g.color+'44';e.currentTarget.style.background=g.color+'0C';e.currentTarget.style.transform='translateY(-5px)'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=g.color+'18';e.currentTarget.style.background=g.color+'04';e.currentTarget.style.transform='translateY(0)'}}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'10px' }}>
                  <span style={{ fontSize:'28px', fontWeight:'900', color:g.color, lineHeight:1 }}>G{g.g}</span>
                  {(g.winner||g.danger) && <span style={{ fontSize:'8px', fontWeight:'800', color:g.color, border:`1px solid ${g.color}55`, padding:'2px 6px', borderRadius:'2px', letterSpacing:'0.5px' }}>{g.winner?(lang==='fr'?'✓ GAGNANT':'✓ WINNER'):(lang==='fr'?'✗ DANGER':'✗ DANGER')}</span>}
                </div>
                <p style={{ fontSize:'11px', fontWeight:'700', color:'#fff', marginBottom:'4px' }}>{t.groupLabels[i]}</p>
                <p style={{ fontSize:'10px', color:'rgba(255,255,255,0.28)', lineHeight:'1.5', marginBottom:'12px' }}>{t.groupDescs[i]}</p>
                <div style={{ display:'flex', flexDirection:'column', gap:'5px', borderTop:'1px solid rgba(255,255,255,0.04)', paddingTop:'10px' }}>
                  {[[t.statLabels[0],g.acc,'#fff'],[t.statLabels[1],g.ece,g.g==='C'?'#E63946':'#10B981'],[t.statLabels[2],g.loss,g.g==='C'?'#E63946':'rgba(255,255,255,0.45)']].map(([label,val,col])=>(
                    <div key={label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                      <span style={{ fontSize:'9px', color:'rgba(255,255,255,0.25)' }}>{label}</span>
                      <span style={{ fontSize:'10px', fontWeight:'700', color:col }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
        <FadeUp delay={0.2}>
          <div style={{ maxWidth:'600px', margin:'60px auto 0', textAlign:'center', padding:'36px 28px', borderTop:'1px solid rgba(255,255,255,0.04)' }}>
            <p style={{ fontSize:isMobile?'14px':'16px', color:'rgba(255,255,255,0.4)', lineHeight:'1.9', fontStyle:'italic', fontFamily:'Georgia,serif' }}>{t.quote}</p>
            <button onClick={()=>setActivePage('research')} style={{ marginTop:'24px', padding:'10px 24px', background:'transparent', border:'1px solid rgba(0,180,216,0.3)', color:'#00B4D8', borderRadius:'4px', cursor:'pointer', fontSize:'11px', fontWeight:'700', letterSpacing:'1px', fontFamily:'inherit', transition:'all 0.2s' }}
              onMouseEnter={e=>{e.currentTarget.style.background='rgba(0,180,216,0.08)'}}
              onMouseLeave={e=>{e.currentTarget.style.background='transparent'}}>
              {lang==='fr'?'VOIR LA RECHERCHE COMPLÈTE →':'VIEW FULL RESEARCH →'}
            </button>
          </div>
        </FadeUp>
      </section>

      {/* LANGUAGE TOGGLE */}
      <div style={{ position:'fixed', bottom:'28px', right:'28px', zIndex:200, display:'flex', alignItems:'center', background:'rgba(10,22,40,0.95)', border:'1px solid rgba(0,180,216,0.2)', borderRadius:'40px', overflow:'hidden', backdropFilter:'blur(20px)', boxShadow:'0 8px 32px rgba(0,0,0,0.5)', animation:loaded?'fadeSlideIn 0.8s ease 1.5s both':'none', opacity:0 }}>
        {['en','fr'].map(l=>(
          <button key={l} onClick={()=>setLang(l)} style={{ padding:'10px 18px', background:lang===l?'#00B4D8':'transparent', color:lang===l?'#05080F':'rgba(255,255,255,0.4)', border:'none', cursor:'pointer', fontSize:'11px', fontWeight:'800', letterSpacing:'1.5px', transition:'all 0.25s', fontFamily:'inherit' }}>{l.toUpperCase()}</button>
        ))}
      </div>
    </div>
  )
}