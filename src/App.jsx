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

const CLASS_COLORS = { glioma: '#E63946', meningioma: '#FFB703', notumor: '#10B981', pituitary: '#00B4D8' }

const INITIAL_PATIENTS = [
  {
    id: 'AHS-10042', name: 'James Okafor',
    age: 54, dob: '1970-03-12', sex: 'Male', bloodType: 'O+',
    physician: 'Dr. R. Patel', facility: 'Northern Lights Regional Hospital', dept: 'Neurology',
    scanDate: '2026-04-10', status: 'Awaiting Analysis', statusColor: '#FFB703',
    allergies: ['Penicillin', 'Sulfa drugs'],
    medications: ['Metformin 500mg', 'Lisinopril 10mg'],
    history: 'Presented with recurring headaches and vision disturbances for 3 weeks. MRI ordered after CT showed possible mass. Patient is a non-smoker with Type 2 diabetes and hypertension. Family history of glioblastoma (father, deceased 2019).',
    scanHistory: [
      { date: '2026-01-15', type: 'MRI Brain', result: 'No abnormality detected', provider: 'Dr. R. Patel', notes: 'Routine screening. No acute findings.' },
      { date: '2025-08-22', type: 'CT Head', result: 'Mild cortical atrophy noted', provider: 'Dr. M. Wong', notes: 'Patient complained of intermittent dizziness.' },
      { date: '2025-03-10', type: 'MRI Brain', result: 'No abnormality detected', provider: 'Dr. R. Patel', notes: 'Annual surveillance given family history.' },
    ],
    latestResult: null,
  },
  {
    id: 'AHS-10078', name: 'Sarah Mahmoud',
    age: 38, dob: '1987-09-24', sex: 'Female', bloodType: 'A-',
    physician: 'Dr. L. Chen', facility: 'Northern Lights Regional Hospital', dept: 'Oncology',
    scanDate: '2026-04-14', status: 'Scan Complete', statusColor: '#E63946',
    allergies: ['Latex', 'Codeine'],
    medications: ['Dexamethasone 4mg', 'Ondansetron 8mg', 'Levetiracetam 500mg'],
    history: 'Post-surgical resection follow-up for Grade II meningioma (right frontal lobe, resected Nov 2025). Patient reports fatigue, intermittent nausea, and mild cognitive changes. Currently receiving adjuvant radiotherapy.',
    scanHistory: [
      { date: '2026-04-14', type: 'MRI Brain — IllumaDX AI Analysis', result: 'MENINGIOMA — 88.3% confidence (IllumaDX)', provider: 'IllumaDX AI System', notes: 'Automated GradCAM++ analysis. GroupB ResNet-18. Consensus heatmap generated. Meningioma confirmed with high confidence.' },
      { date: '2026-02-28', type: 'MRI Brain + Contrast', result: 'Meningioma — post-resection, no recurrence', provider: 'Dr. L. Chen', notes: 'Surgical cavity stable. Enhancement consistent with post-op changes only.' },
      { date: '2025-11-12', type: 'Post-op MRI', result: 'Meningioma — surgical resection confirmed', provider: 'Dr. L. Chen', notes: 'Gross total resection achieved. Small residual enhancement at margin under observation.' },
      { date: '2025-10-02', type: 'MRI Brain', result: 'Meningioma detected — surgical consult initiated', provider: 'Dr. A. Singh', notes: 'Right frontal lobe mass 2.8cm. Biopsy confirmed Grade II meningioma.' },
      { date: '2025-06-18', type: 'MRI Brain', result: 'Incidental finding — right frontal hyperdensity', provider: 'Dr. R. Patel', notes: 'First detection. Patient presented for headaches. Follow-up recommended.' },
    ],
    latestResult: { prediction: 'meningioma', confidence: 0.8831, probabilities: { glioma: 0.052, meningioma: 0.8831, notumor: 0.031, pituitary: 0.034 }, heatmap_b: null, heatmap_d: null, heatmap_consensus: null },
  },
  {
    id: 'AHS-10113', name: 'David Tremblay',
    age: 67, dob: '1958-11-05', sex: 'Male', bloodType: 'B+',
    physician: 'Dr. A. Singh', facility: 'Northern Lights Regional Hospital', dept: 'Neurology',
    scanDate: '2026-04-16', status: 'Scan Complete', statusColor: '#E63946',
    allergies: ['NSAIDs'],
    medications: ['Cabergoline 0.5mg', 'Atorvastatin 20mg', 'Aspirin 81mg'],
    history: 'Known pituitary adenoma (macroadenoma, 1.4cm) under active surveillance. On cabergoline for prolactin suppression. Stable for 18 months. Retired teacher. Visual field testing normal last visit.',
    scanHistory: [
      { date: '2026-04-16', type: 'MRI Brain — IllumaDX AI Analysis', result: 'PITUITARY — 91.6% confidence (IllumaDX)', provider: 'IllumaDX AI System', notes: 'Automated GradCAM++ analysis. GroupB ResNet-18. Pituitary adenoma confirmed with high confidence.' },
      { date: '2025-12-10', type: 'MRI Pituitary Protocol', result: 'Pituitary adenoma — stable, no growth', provider: 'Dr. A. Singh', notes: 'Tumor stable at 1.4cm. Prolactin within therapeutic range.' },
      { date: '2025-08-03', type: 'MRI Pituitary Protocol', result: 'Pituitary adenoma — mild enlargement', provider: 'Dr. A. Singh', notes: 'Growth from 1.2cm to 1.4cm. Cabergoline dose increased.' },
      { date: '2025-02-15', type: 'MRI Brain', result: 'Pituitary adenoma — macroadenoma 1.2cm', provider: 'Dr. M. Wong', notes: 'Initial detection. Endocrinology referral made.' },
    ],
    latestResult: { prediction: 'pituitary', confidence: 0.9156, probabilities: { glioma: 0.031, meningioma: 0.028, notumor: 0.025, pituitary: 0.9156 }, heatmap_b: null, heatmap_d: null, heatmap_consensus: null },
  },
  {
    id: 'AHS-10157', name: 'Priya Nair',
    age: 29, dob: '1996-07-18', sex: 'Female', bloodType: 'AB+',
    physician: 'Dr. R. Patel', facility: 'Northern Lights Regional Hospital', dept: 'Emergency Neurology',
    scanDate: '2026-04-17', status: 'Awaiting Analysis', statusColor: '#FFB703',
    allergies: ['None known'],
    medications: ['Levetiracetam 1000mg (post-seizure)', 'Acetaminophen PRN'],
    history: 'Acute emergency presentation. Sudden onset severe headache followed by tonic-clonic seizure in ER. No prior neurological history. No family history of malignancy. GCS 14 on admission.',
    scanHistory: [
      { date: '2026-04-17', type: 'CT Head (Emergency)', result: 'Hyperdense lesion right temporal lobe — MRI urgent', provider: 'Dr. R. Patel', notes: 'Possible mass effect. MRI with contrast ordered stat. Neurosurgery on standby.' },
    ],
    latestResult: null,
  },
  {
    id: 'AHS-10201', name: 'Marc Bouchard',
    age: 45, dob: '1980-02-28', sex: 'Male', bloodType: 'O-',
    physician: 'Dr. L. Chen', facility: 'Northern Lights Regional Hospital', dept: 'Neurology',
    scanDate: '2026-04-18', status: 'Scan Complete', statusColor: '#10B981',
    allergies: ['Contrast dye (mild — premedicate)'],
    medications: ['Loratadine 10mg', 'Vitamin D 2000IU'],
    history: 'Annual surveillance for glioma family history risk (mother — GBM, deceased 2022; uncle — glioma, 2019). Asymptomatic. Software engineer. Non-smoker, physically active. Enrolled in Northern Lights Cancer Screening Registry.',
    scanHistory: [
      { date: '2026-04-18', type: 'MRI Brain — IllumaDX AI Analysis', result: 'NO TUMOR — 94.2% confidence (IllumaDX)', provider: 'IllumaDX AI System', notes: 'Automated GradCAM++ analysis. GroupB ResNet-18. No tumor detected with high confidence.' },
      { date: '2025-04-10', type: 'MRI Brain + Contrast', result: 'No abnormality detected', provider: 'Dr. L. Chen', notes: 'Annual surveillance. Stable appearance.' },
      { date: '2024-04-08', type: 'MRI Brain + Contrast', result: 'No abnormality detected', provider: 'Dr. L. Chen', notes: 'Annual surveillance. Normal.' },
      { date: '2023-04-14', type: 'MRI Brain', result: 'No abnormality detected', provider: 'Dr. M. Wong', notes: 'First surveillance scan after maternal diagnosis.' },
    ],
    latestResult: { prediction: 'notumor', confidence: 0.9421, probabilities: { glioma: 0.021, meningioma: 0.018, notumor: 0.9421, pituitary: 0.019 }, heatmap_b: null, heatmap_d: null, heatmap_consensus: null },
  },
]

function printPatientReport(patient, result, lang) {
  const isFr = lang === 'fr'
  const now = new Date()
  const dateStr = now.toLocaleDateString('en-CA')
  const timeStr = now.toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit' })
  const tumorColor = CLASS_COLORS[result.prediction] || '#10B981'
  const win = window.open('', '_blank')
  win.document.write(`<!DOCTYPE html><html><head><title>IllumaDX Report — ${patient.name}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
    *{box-sizing:border-box;margin:0;padding:0} body{font-family:'Inter',sans-serif;background:#fff;color:#111;padding:40px;font-size:13px}
    .header{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid #0A1628;padding-bottom:20px;margin-bottom:28px}
    .logo{font-size:28px;font-weight:900;letter-spacing:2px} .logo span{color:#00B4D8}
    .header-right{text-align:right;font-size:11px;color:#666;line-height:1.8}
    .badge{display:inline-block;background:#0A1628;color:#fff;font-size:9px;font-weight:800;padding:3px 10px;border-radius:3px;letter-spacing:2px;margin-bottom:6px}
    .section{margin-bottom:24px} .section-title{font-size:9px;font-weight:800;letter-spacing:3px;color:#888;margin-bottom:10px;text-transform:uppercase;border-bottom:1px solid #eee;padding-bottom:6px}
    .grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px} .grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}
    .field label{font-size:9px;color:#999;font-weight:700;letter-spacing:1px;display:block;margin-bottom:2px} .field p{font-size:13px;font-weight:600;color:#111}
    .result-box{background:#f8f9fa;border:2px solid ${tumorColor};border-radius:8px;padding:20px 24px;display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}
    .prediction{font-size:32px;font-weight:900;color:${tumorColor};letter-spacing:2px;text-transform:uppercase}
    .confidence{font-size:40px;font-weight:900;color:#10B981} .conf-label{font-size:9px;color:#999;letter-spacing:2px;margin-bottom:4px}
    .bar-row{display:flex;align-items:center;gap:10px;margin-bottom:8px} .bar-label{width:90px;font-size:11px;font-weight:600;text-transform:uppercase;color:#555}
    .bar-track{flex:1;height:8px;background:#eee;border-radius:4px;overflow:hidden} .bar-fill{height:100%;border-radius:4px}
    .bar-pct{width:45px;text-align:right;font-size:11px;font-weight:700}
    .disclaimer{background:#fff8e1;border:1px solid #FFB703;border-radius:6px;padding:14px 18px;font-size:11px;color:#7a5c00;line-height:1.7;margin-top:20px}
    .scan-row{display:flex;gap:12px;align-items:flex-start;padding:10px 0;border-bottom:1px solid #f0f0f0}
    .scan-dot{width:8px;height:8px;border-radius:50%;background:#0A1628;flex-shrink:0;margin-top:4px}
    .scan-date{font-size:10px;color:#888;width:90px;flex-shrink:0} .scan-result{font-size:12px;font-weight:600}
    .scan-notes{font-size:11px;color:#777;margin-top:2px}
    .footer{margin-top:32px;padding-top:16px;border-top:1px solid #eee;display:flex;justify-content:space-between;font-size:10px;color:#aaa}
    .pill{display:inline-block;background:#f0f0f0;padding:2px 8px;border-radius:20px;font-size:10px;margin:2px}
    @media print{body{padding:20px}}
  </style></head><body>
  <div class="header">
    <div><div class="logo">ILLUMA<span>DX</span></div><div style="font-size:10px;color:#888;margin-top:4px;letter-spacing:1px">BECAUSE DIAGNOSIS STARTS WITH CLARITY</div></div>
    <div class="header-right">
      <div class="badge">DIAGNOSTIC REPORT</div><br>
      ${isFr?'Date':'Report Date'}: ${dateStr} ${timeStr}<br>
      ${isFr?'Établissement':'Facility'}: ${patient.facility}<br>
      ${isFr?'Médecin':'Physician'}: ${patient.physician}<br>
      ${isFr?'Réf. Dossier':'Record ID'}: ${patient.id}
    </div>
  </div>
  <div class="section">
    <div class="section-title">${isFr?'Informations Patient':'Patient Information'}</div>
    <div class="grid3">
      <div class="field"><label>${isFr?'NOM COMPLET':'FULL NAME'}</label><p>${patient.name}</p></div>
      <div class="field"><label>${isFr?'DATE DE NAISSANCE':'DATE OF BIRTH'}</label><p>${patient.dob}</p></div>
      <div class="field"><label>${isFr?'ÂGE / SEXE':'AGE / SEX'}</label><p>${patient.age} ${isFr?'ans':'yrs'} · ${patient.sex}</p></div>
      <div class="field"><label>${isFr?'GROUPE SANGUIN':'BLOOD TYPE'}</label><p>${patient.bloodType}</p></div>
      <div class="field"><label>${isFr?'SERVICE':'DEPARTMENT'}</label><p>${patient.dept}</p></div>
      <div class="field"><label>${isFr?'DATE SCAN':'SCAN DATE'}</label><p>${patient.scanDate}</p></div>
    </div>
    <div style="margin-top:14px"><div class="field"><label>ALLERGIES</label><p>${patient.allergies.map(a=>`<span class="pill">${a}</span>`).join('')}</p></div></div>
    <div style="margin-top:10px"><div class="field"><label>${isFr?'MÉDICAMENTS':'MEDICATIONS'}</label><p>${patient.medications.map(m=>`<span class="pill">${m}</span>`).join('')}</p></div></div>
  </div>
  <div class="section">
    <div class="section-title">${isFr?'Résultat IllumaDX':'IllumaDX AI Result'}</div>
    <div class="result-box">
      <div><div class="conf-label">${isFr?'DIAGNOSTIC IA':'AI DIAGNOSIS'}</div><div class="prediction">${result.prediction}</div><div style="font-size:11px;color:#888;margin-top:6px">IllumaDX GroupB ResNet-18 · GradCAM++ Verified</div></div>
      <div style="text-align:right"><div class="conf-label">${isFr?'CONFIANCE':'CONFIDENCE'}</div><div class="confidence">${(result.confidence*100).toFixed(1)}%</div></div>
    </div>
    <div class="section-title" style="margin-top:16px">${isFr?'Distribution de Confiance':'Confidence Distribution'}</div>
    ${['glioma','meningioma','notumor','pituitary'].map(cls=>{const prob=result.probabilities[cls]||0;const pct=(prob*100).toFixed(1);const isTop=cls===result.prediction;const color=CLASS_COLORS[cls];return`<div class="bar-row"><div class="bar-label" style="color:${isTop?color:'#555'};font-weight:${isTop?'800':'600'}">${cls}</div><div class="bar-track"><div class="bar-fill" style="width:${pct}%;background:${isTop?color:'#ddd'}"></div></div><div class="bar-pct" style="color:${isTop?color:'#999'}">${pct}%</div></div>`}).join('')}
  </div>
  <div class="section">
    <div class="section-title">${isFr?'Benchmarks du Modèle':'Model Benchmarks'} (GroupB ResNet-18)</div>
    <div class="grid3">
      <div class="field"><label>ACCURACY</label><p style="color:#10B981;font-size:18px">99.69%</p></div>
      <div class="field"><label>AUC</label><p style="font-size:18px">0.9996</p></div>
      <div class="field"><label>ECE</label><p style="font-size:18px">0.0030</p></div>
      <div class="field"><label>COHEN'S D (B vs C)</label><p style="font-size:18px">4.750</p></div>
      <div class="field"><label>ANOVA F-STAT</label><p style="font-size:18px">38.931</p></div>
      <div class="field"><label>SEEDS TRAINED</label><p style="font-size:18px">10</p></div>
    </div>
  </div>
  <div class="section">
    <div class="section-title">${isFr?'Historique Complet des Scans':'Full Scan History'}</div>
    ${patient.scanHistory.map(s=>`<div class="scan-row"><div class="scan-dot"></div><div class="scan-date">${s.date}</div><div><div class="scan-result">${s.result}</div><div style="font-size:10px;color:#aaa;margin-top:1px">${s.type} · ${s.provider}</div><div class="scan-notes">${s.notes}</div></div></div>`).join('')}
  </div>
  <div class="disclaimer">⚠ <strong>${isFr?'Avertissement Clinique':'Clinical Disclaimer'}:</strong> ${isFr?'IllumaDX est un outil de recherche uniquement. Ce rapport ne remplace pas le diagnostic clinique. Non approuvé par Santé Canada. À des fins de démonstration.':'IllumaDX is a research tool only. This report does not replace clinical diagnosis by a qualified healthcare professional. Not approved by Health Canada. All patient data is simulated for demonstration purposes.'}</div>
  <div class="footer"><div>IllumaDX · CWSF 2026 · illumadx.vercel.app · Arhaan Kureshi, Westwood Community High School</div><div>${isFr?'Généré le':'Generated'} ${dateStr} ${timeStr}</div></div>
  <script>window.onload=()=>window.print()</script>
  </body></html>`)
  win.document.close()
}

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
    const newEntry = {
      date: dateStr,
      type: 'MRI Brain — IllumaDX AI Analysis',
      result: `${result.prediction.toUpperCase()} — ${(result.confidence * 100).toFixed(1)}% confidence (IllumaDX)`,
      provider: 'IllumaDX AI System',
      notes: `Automated GradCAM++ analysis. GroupB ResNet-18 model. Consensus heatmap generated. Result: ${result.prediction} with ${(result.confidence * 100).toFixed(1)}% confidence.`,
    }
    setPatients(prev => prev.map(p => {
      if (p.id !== patientId) return p
      const updated = { ...p, latestResult: result, status: 'Scan Complete', statusColor: result.prediction === 'notumor' ? '#10B981' : '#E63946', scanHistory: [newEntry, ...p.scanHistory] }
      setSelectedPatient(updated)
      return updated
    }))
  }

  return (
    <div style={{ position:'fixed', inset:0, zIndex:500, background:'#05080F', display:'flex', flexDirection:'column', fontFamily:"'Inter',system-ui,sans-serif", animation:'slideInRight 0.35s cubic-bezier(0.16,1,0.3,1)' }}>
      <style>{`
        @keyframes slideInRight{from{opacity:0;transform:translateX(16px)}to{opacity:1;transform:translateX(0)}}
        @keyframes ripple{0%{box-shadow:0 0 0 0 rgba(16,185,129,0.5)}70%{box-shadow:0 0 0 14px rgba(16,185,129,0)}100%{box-shadow:0 0 0 0 rgba(16,185,129,0)}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:transparent} ::-webkit-scrollbar-thumb{background:rgba(0,180,216,0.2);border-radius:2px}
        input:focus{border-color:rgba(0,180,216,0.5)!important;outline:none}
      `}</style>

      {/* Top bar */}
      <div style={{ background:'rgba(10,22,40,0.98)', borderBottom:'1px solid rgba(16,185,129,0.2)', padding:'0 24px', height:'60px', display:'flex', alignItems:'center', justifyContent:'space-between', backdropFilter:'blur(20px)', flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
          <button onClick={onClose} style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.6)', borderRadius:'6px', width:'32px', height:'32px', cursor:'pointer', fontSize:'18px', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'inherit' }}>←</button>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'22px', letterSpacing:'2px' }}><span style={{ color:'#fff' }}>Illuma</span><span style={{ color:'#00B4D8' }}>DX</span></div>
          <div style={{ width:'1px', height:'20px', background:'rgba(255,255,255,0.1)' }} />
          <span style={{ fontSize:'11px', color:'#10B981', letterSpacing:'3px', fontWeight:'700' }}>{isFr?'DOSSIERS PATIENTS':'PATIENT RECORDS'}</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
          <div style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#10B981', animation:'ripple 2s infinite' }} />
          <span style={{ fontSize:'10px', color:'rgba(255,255,255,0.3)', letterSpacing:'2px' }}>NORTHERN LIGHTS REGIONAL · CONNECT CARE</span>
        </div>
      </div>

      <div style={{ display:'flex', flex:1, overflow:'hidden' }}>
        {/* LEFT — Patient List */}
        <div style={{ width:'300px', borderRight:'1px solid rgba(255,255,255,0.06)', display:'flex', flexDirection:'column', flexShrink:0, background:'rgba(5,8,15,0.6)' }}>
          <div style={{ padding:'16px', borderBottom:'1px solid rgba(255,255,255,0.05)', flexShrink:0 }}>
            <p style={{ fontSize:'8px', color:'rgba(255,255,255,0.25)', letterSpacing:'3px', marginBottom:'8px', fontWeight:'600' }}>{isFr?'CHERCHER PAR ID':'SEARCH BY PATIENT ID'}</p>
            <div style={{ display:'flex', gap:'6px' }}>
              <input value={searchId} onChange={e=>{setSearchId(e.target.value);setSearchError(false)}} onKeyDown={e=>e.key==='Enter'&&handleSearch()}
                placeholder="AHS-10042"
                style={{ flex:1, background:'rgba(255,255,255,0.04)', border:`1px solid ${searchError?'#E63946':'rgba(255,255,255,0.1)'}`, borderRadius:'5px', padding:'8px 12px', color:'#fff', fontSize:'12px', fontFamily:'inherit' }} />
              <button onClick={handleSearch} style={{ padding:'8px 12px', background:'#10B981', color:'#05080F', border:'none', borderRadius:'5px', cursor:'pointer', fontSize:'10px', fontWeight:'800', fontFamily:'inherit' }}>GO</button>
            </div>
            {searchError && <p style={{ fontSize:'10px', color:'#E63946', marginTop:'6px' }}>{isFr?'Aucun patient trouvé.':'No patient found.'}</p>}
          </div>
          <div style={{ flex:1, overflowY:'auto', padding:'8px' }}>
            <p style={{ fontSize:'8px', color:'rgba(255,255,255,0.2)', letterSpacing:'3px', margin:'8px 8px 10px', fontWeight:'600' }}>{patients.length} {isFr?'DOSSIERS ACTIFS':'ACTIVE RECORDS'}</p>
            {patients.map((p,i) => (
              <div key={p.id} onClick={()=>{setSelectedPatient(p);setSearchError(false)}} onMouseEnter={()=>setHoveredRow(i)} onMouseLeave={()=>setHoveredRow(null)}
                style={{ padding:'12px 14px', borderRadius:'7px', cursor:'pointer', marginBottom:'3px', background:selectedPatient?.id===p.id?'rgba(16,185,129,0.08)':hoveredRow===i?'rgba(255,255,255,0.03)':'transparent', border:`1px solid ${selectedPatient?.id===p.id?'rgba(16,185,129,0.25)':'rgba(255,255,255,0.04)'}`, transition:'all 0.15s ease' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'5px' }}>
                  <div>
                    <p style={{ fontSize:'13px', fontWeight:'700', color:'#fff', marginBottom:'1px' }}>{p.name}</p>
                    <p style={{ fontSize:'9px', color:'rgba(255,255,255,0.3)', letterSpacing:'1px' }}>{p.id}</p>
                  </div>
                  <span style={{ fontSize:'7px', fontWeight:'800', color:p.statusColor, border:`1px solid ${p.statusColor}44`, padding:'2px 6px', borderRadius:'3px', letterSpacing:'0.5px', whiteSpace:'nowrap', marginLeft:'6px', flexShrink:0 }}>
                    {p.status==='Scan Complete'?(isFr?'TERMINÉ':'COMPLETE'):(isFr?'EN ATTENTE':'AWAITING')}
                  </span>
                </div>
                <div style={{ display:'flex', gap:'10px' }}>
                  <span style={{ fontSize:'10px', color:'rgba(255,255,255,0.25)' }}>{p.age}y · {p.sex}</span>
                  <span style={{ fontSize:'10px', color:'rgba(255,255,255,0.2)' }}>{p.dept}</span>
                </div>
                {p.latestResult && (
                  <div style={{ marginTop:'5px', display:'flex', alignItems:'center', gap:'5px' }}>
                    <div style={{ width:'5px', height:'5px', borderRadius:'50%', background:CLASS_COLORS[p.latestResult.prediction] }} />
                    <span style={{ fontSize:'9px', color:CLASS_COLORS[p.latestResult.prediction], fontWeight:'700', textTransform:'uppercase' }}>
                      {p.latestResult.prediction} · {(p.latestResult.confidence*100).toFixed(0)}%
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Detail */}
        {selectedPatient ? (
          <PatientDetail key={selectedPatient.id} patient={selectedPatient} lang={lang} onScanComplete={(result)=>handleScanComplete(selectedPatient.id,result)} />
        ) : (
          <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'12px' }}>
            <div style={{ fontSize:'48px', opacity:0.12 }}>🗂</div>
            <p style={{ fontSize:'11px', color:'rgba(255,255,255,0.2)', letterSpacing:'3px' }}>{isFr?'SÉLECTIONNER UN PATIENT':'SELECT A PATIENT'}</p>
            <p style={{ fontSize:'11px', color:'rgba(255,255,255,0.12)' }}>{isFr?'ou rechercher par ID':'or search by ID on the left'}</p>
          </div>
        )}
      </div>
    </div>
  )
}

function PatientDetail({ patient, lang, onScanComplete }) {
  const [scanPhase, setScanPhase] = useState(patient.latestResult ? 'done' : 'idle')
  const [localResult, setLocalResult] = useState(patient.latestResult || null)
  const [activeTab, setActiveTab] = useState('overview')
  const fileRef = useRef(null)
  const isFr = lang === 'fr'

  useEffect(() => { setScanPhase(patient.latestResult?'done':'idle'); setLocalResult(patient.latestResult||null) }, [patient.id])

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) return
    setScanPhase('loading')
    try {
      const formData = new FormData(); formData.append('file', file)
      const res = await fetch(`${API_URL}/predict`, { method:'POST', body:formData })
      const data = await res.json()
      if (!res.ok) { setScanPhase(data.error==='not_mri'?'not_mri':'invalid'); return }
      setLocalResult(data); setScanPhase('done'); onScanComplete(data)
    } catch { setScanPhase('error') }
  }

  const tabs = [
    { id:'overview', label:isFr?'Aperçu':'Overview' },
    { id:'history', label:isFr?'Historique':'Scan History', count:patient.scanHistory.length },
    { id:'scan', label:isFr?'Analyse IA':'AI Scan', done:!!localResult },
  ]

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', animation:'fadeIn 0.3s ease' }}>
      {/* Patient header */}
      <div style={{ padding:'20px 28px', borderBottom:'1px solid rgba(255,255,255,0.05)', background:'rgba(10,22,40,0.4)', flexShrink:0 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'12px' }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'4px' }}>
              <h2 style={{ fontSize:'20px', fontWeight:'800', color:'#fff' }}>{patient.name}</h2>
              <span style={{ fontSize:'7px', fontWeight:'800', color:patient.statusColor, border:`1px solid ${patient.statusColor}44`, padding:'3px 8px', borderRadius:'3px', letterSpacing:'1px' }}>
                {patient.status==='Scan Complete'?(isFr?'SCAN TERMINÉ':'SCAN COMPLETE'):(isFr?'EN ATTENTE':'AWAITING ANALYSIS')}
              </span>
            </div>
            <p style={{ fontSize:'10px', color:'#10B981', letterSpacing:'2px', fontWeight:'700', marginBottom:'10px' }}>{patient.id}</p>
            <div style={{ display:'flex', gap:'20px', flexWrap:'wrap' }}>
              {[[isFr?'ÂGE':'AGE',`${patient.age}y · ${patient.sex}`],[isFr?'MÉDECIN':'PHYSICIAN',patient.physician],[isFr?'SERVICE':'DEPT',patient.dept],[isFr?'DATE SCAN':'SCAN DATE',patient.scanDate],[isFr?'SANG':'BLOOD',patient.bloodType]].map(([l,v])=>(
                <div key={l}><p style={{ fontSize:'7px', color:'rgba(255,255,255,0.25)', letterSpacing:'2px', marginBottom:'2px' }}>{l}</p><p style={{ fontSize:'12px', fontWeight:'600', color:'rgba(255,255,255,0.8)' }}>{v}</p></div>
              ))}
            </div>
          </div>
          {localResult && (
            <button onClick={()=>printPatientReport(patient,localResult,lang)} style={{ padding:'10px 20px', background:'rgba(255,183,3,0.1)', border:'1px solid rgba(255,183,3,0.35)', color:'#FFB703', borderRadius:'6px', cursor:'pointer', fontSize:'11px', fontWeight:'800', letterSpacing:'1px', fontFamily:'inherit', display:'flex', alignItems:'center', gap:'8px', transition:'all 0.2s' }}
              onMouseEnter={e=>e.currentTarget.style.background='rgba(255,183,3,0.18)'}
              onMouseLeave={e=>e.currentTarget.style.background='rgba(255,183,3,0.1)'}>
              📄 {isFr?'IMPRIMER RAPPORT PDF':'PRINT PDF REPORT'}
            </button>
          )}
        </div>
        <div style={{ display:'flex', gap:'4px', marginTop:'16px' }}>
          {tabs.map(tab=>(
            <button key={tab.id} onClick={()=>setActiveTab(tab.id)} style={{ padding:'6px 16px', background:activeTab===tab.id?'rgba(0,180,216,0.15)':'transparent', border:`1px solid ${activeTab===tab.id?'rgba(0,180,216,0.4)':'rgba(255,255,255,0.08)'}`, borderRadius:'5px', color:activeTab===tab.id?'#00B4D8':'rgba(255,255,255,0.4)', fontSize:'11px', fontWeight:'700', cursor:'pointer', letterSpacing:'0.5px', transition:'all 0.15s', fontFamily:'inherit', display:'flex', alignItems:'center', gap:'6px' }}>
              {tab.label}
              {tab.count && <span style={{ fontSize:'9px', background:'rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.4)', padding:'1px 6px', borderRadius:'10px' }}>{tab.count}</span>}
              {tab.done && <span style={{ fontSize:'8px', background:'#10B981', color:'#05080F', padding:'1px 5px', borderRadius:'3px', fontWeight:'800' }}>✓</span>}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'24px 28px' }}>
        {/* OVERVIEW */}
        {activeTab==='overview' && (
          <div style={{ animation:'fadeIn 0.25s ease' }}>
            <div style={{ background:'rgba(10,22,40,0.5)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:'8px', padding:'20px', marginBottom:'14px' }}>
              <p style={{ fontSize:'8px', color:'rgba(255,255,255,0.25)', letterSpacing:'3px', marginBottom:'10px', fontWeight:'600' }}>{isFr?'HISTORIQUE CLINIQUE':'CLINICAL HISTORY'}</p>
              <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.65)', lineHeight:'1.85' }}>{patient.history}</p>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'14px' }}>
              <div style={{ background:'rgba(10,22,40,0.5)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:'8px', padding:'18px' }}>
                <p style={{ fontSize:'8px', color:'rgba(255,255,255,0.25)', letterSpacing:'3px', marginBottom:'10px', fontWeight:'600' }}>ALLERGIES</p>
                {patient.allergies.map((a,i)=>(
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'6px' }}>
                    <div style={{ width:'5px', height:'5px', borderRadius:'50%', background:'#E63946', flexShrink:0 }} />
                    <span style={{ fontSize:'12px', color:'rgba(255,255,255,0.6)' }}>{a}</span>
                  </div>
                ))}
              </div>
              <div style={{ background:'rgba(10,22,40,0.5)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:'8px', padding:'18px' }}>
                <p style={{ fontSize:'8px', color:'rgba(255,255,255,0.25)', letterSpacing:'3px', marginBottom:'10px', fontWeight:'600' }}>{isFr?'MÉDICAMENTS':'MEDICATIONS'}</p>
                {patient.medications.map((m,i)=>(
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'6px' }}>
                    <div style={{ width:'5px', height:'5px', borderRadius:'50%', background:'#00B4D8', flexShrink:0 }} />
                    <span style={{ fontSize:'12px', color:'rgba(255,255,255,0.6)' }}>{m}</span>
                  </div>
                ))}
              </div>
            </div>
            {localResult && (
              <div style={{ background:`${CLASS_COLORS[localResult.prediction]}0A`, border:`1px solid ${CLASS_COLORS[localResult.prediction]}33`, borderRadius:'8px', padding:'18px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'10px' }}>
                <div>
                  <p style={{ fontSize:'8px', color:'rgba(255,255,255,0.3)', letterSpacing:'3px', marginBottom:'4px' }}>{isFr?'DERNIER RÉSULTAT ILLUMADX':'LATEST ILLUMADX RESULT'}</p>
                  <p style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'24px', color:CLASS_COLORS[localResult.prediction], letterSpacing:'2px' }}>{localResult.prediction.toUpperCase()}</p>
                </div>
                <div style={{ display:'flex', gap:'16px', alignItems:'center' }}>
                  <div style={{ textAlign:'right' }}>
                    <p style={{ fontSize:'8px', color:'rgba(255,255,255,0.3)', letterSpacing:'2px', marginBottom:'4px' }}>{isFr?'CONFIANCE':'CONFIDENCE'}</p>
                    <p style={{ fontSize:'28px', fontWeight:'900', color:'#10B981' }}>{(localResult.confidence*100).toFixed(1)}%</p>
                  </div>
                  <button onClick={()=>setActiveTab('scan')} style={{ padding:'8px 16px', background:'rgba(0,180,216,0.1)', border:'1px solid rgba(0,180,216,0.25)', color:'#00B4D8', borderRadius:'5px', cursor:'pointer', fontSize:'10px', fontWeight:'800', fontFamily:'inherit' }}>
                    {isFr?'VOIR HEATMAPS →':'VIEW HEATMAPS →'}
                  </button>
                </div>
              </div>
            )}
            {!localResult && (
              <div style={{ background:'rgba(0,180,216,0.03)', border:'1px dashed rgba(0,180,216,0.2)', borderRadius:'8px', padding:'20px', textAlign:'center' }}>
                <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.3)', marginBottom:'12px' }}>{isFr?'Aucune analyse IA effectuée pour ce patient.':'No AI analysis run yet for this patient.'}</p>
                <button onClick={()=>setActiveTab('scan')} style={{ padding:'8px 20px', background:'#00B4D8', color:'#05080F', border:'none', borderRadius:'5px', cursor:'pointer', fontSize:'11px', fontWeight:'800', fontFamily:'inherit' }}>
                  ⚡ {isFr?'LANCER SCAN ILLUMADX':'RUN ILLUMADX SCAN'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* HISTORY */}
        {activeTab==='history' && (
          <div style={{ animation:'fadeIn 0.25s ease' }}>
            <p style={{ fontSize:'8px', color:'rgba(255,255,255,0.25)', letterSpacing:'3px', marginBottom:'16px', fontWeight:'600' }}>
              {patient.scanHistory.length} {isFr?'ENTRÉES — PLUS RÉCENT EN PREMIER':'ENTRIES — MOST RECENT FIRST'}
            </p>
            <div style={{ position:'relative' }}>
              <div style={{ position:'absolute', left:'15px', top:0, bottom:0, width:'1px', background:'rgba(255,255,255,0.07)' }} />
              {patient.scanHistory.map((s,i)=>{
                const isIllumaDX = s.provider==='IllumaDX AI System'
                const dotColor = isIllumaDX?'#00B4D8':i===0?'#10B981':'rgba(255,255,255,0.2)'
                return (
                  <div key={i} style={{ display:'flex', gap:'16px', marginBottom:'16px', position:'relative' }}>
                    <div style={{ width:'31px', flexShrink:0, display:'flex', justifyContent:'center' }}>
                      <div style={{ width:'10px', height:'10px', borderRadius:'50%', background:dotColor, border:`2px solid ${dotColor}`, marginTop:'5px', flexShrink:0, boxShadow:i===0?`0 0 10px ${dotColor}60`:undefined }} />
                    </div>
                    <div style={{ flex:1, background:isIllumaDX?'rgba(0,180,216,0.04)':'rgba(10,22,40,0.4)', border:`1px solid ${isIllumaDX?'rgba(0,180,216,0.2)':'rgba(255,255,255,0.05)'}`, borderRadius:'7px', padding:'14px 16px' }}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'6px', flexWrap:'wrap', gap:'6px' }}>
                        <div>
                          <p style={{ fontSize:'13px', fontWeight:'700', color:'#fff', marginBottom:'2px' }}>{s.result}</p>
                          <p style={{ fontSize:'10px', color:'rgba(255,255,255,0.3)' }}>{s.type} · {s.provider}</p>
                        </div>
                        <span style={{ fontSize:'10px', color:i===0?'#10B981':'rgba(255,255,255,0.3)', fontWeight:i===0?'700':'400', whiteSpace:'nowrap', background:i===0?'rgba(16,185,129,0.08)':'transparent', padding:'2px 8px', borderRadius:'3px', border:i===0?'1px solid rgba(16,185,129,0.2)':'none' }}>{s.date}</span>
                      </div>
                      <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.4)', lineHeight:'1.7' }}>{s.notes}</p>
                      {isIllumaDX && <div style={{ marginTop:'8px', display:'flex', alignItems:'center', gap:'6px' }}><div style={{ width:'5px', height:'5px', borderRadius:'50%', background:'#00B4D8' }} /><span style={{ fontSize:'9px', color:'#00B4D8', fontWeight:'700', letterSpacing:'1px' }}>ILLUMADX AI — GRADCAM++ VERIFIED</span></div>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* SCAN TAB */}
        {activeTab==='scan' && (
          <div style={{ animation:'fadeIn 0.25s ease' }}>
            <div style={{ background:'rgba(0,180,216,0.03)', border:'1px solid rgba(0,180,216,0.15)', borderRadius:'10px', padding:'24px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'18px' }}>
                <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#00B4D8', animation:'ripple 2s infinite' }} />
                <span style={{ fontSize:'10px', color:'#00B4D8', letterSpacing:'3px', fontWeight:'700' }}>{isFr?'ANALYSE ILLUMADX':'ILLUMADX ANALYSIS'}</span>
              </div>

              {scanPhase==='idle' && (
                <div>
                  <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.4)', marginBottom:'16px', lineHeight:'1.75' }}>
                    {isFr?"Téléchargez l'IRM de ce patient pour lancer l'analyse IA en temps réel avec GradCAM++.":"Upload this patient's MRI scan to run real-time AI analysis with GradCAM++ interpretability."}
                  </p>
                  <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={e=>handleFile(e.target.files[0])} />
                  <button onClick={()=>fileRef.current.click()} style={{ padding:'12px 28px', background:'#00B4D8', color:'#05080F', border:'none', borderRadius:'6px', cursor:'pointer', fontSize:'11px', fontWeight:'800', letterSpacing:'1px', fontFamily:'inherit' }}>
                    ⚡ {isFr?'LANCER SCAN ILLUMADX':'RUN ILLUMADX SCAN'}
                  </button>
                </div>
              )}

              {scanPhase==='loading' && (
                <div style={{ textAlign:'center', padding:'32px' }}>
                  <div style={{ width:'40px', height:'40px', border:'3px solid rgba(0,180,216,0.2)', borderTop:'3px solid #00B4D8', borderRadius:'50%', animation:'spin 1s linear infinite', margin:'0 auto 16px' }} />
                  <p style={{ color:'#00B4D8', fontSize:'12px', letterSpacing:'2px', fontWeight:'700' }}>{isFr?'ANALYSE EN COURS...':'ANALYSING...'}</p>
                  <p style={{ color:'rgba(255,255,255,0.2)', fontSize:'11px', marginTop:'6px' }}>{isFr?'GradCAM++ génère les cartes de chaleur':'GradCAM++ generating heatmaps'}</p>
                </div>
              )}

              {(scanPhase==='not_mri'||scanPhase==='invalid'||scanPhase==='error') && (
                <div style={{ textAlign:'center', padding:'24px' }}>
                  <p style={{ color:'#E63946', fontWeight:'800', fontSize:'14px', marginBottom:'8px' }}>
                    {scanPhase==='not_mri'?(isFr?'PAS UNE IRM':'NOT A BRAIN MRI'):scanPhase==='invalid'?(isFr?'CONFIANCE INSUFFISANTE':'LOW CONFIDENCE'):(isFr?'ERREUR':'CONNECTION ERROR')}
                  </p>
                  <p style={{ color:'rgba(255,255,255,0.35)', fontSize:'12px', marginBottom:'16px' }}>{isFr?'Veuillez télécharger une IRM cérébrale valide.':'Please upload a valid brain MRI scan.'}</p>
                  <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={e=>handleFile(e.target.files[0])} />
                  <button onClick={()=>fileRef.current.click()} style={{ padding:'8px 20px', background:'rgba(0,180,216,0.1)', color:'#00B4D8', border:'1px solid rgba(0,180,216,0.3)', borderRadius:'4px', cursor:'pointer', fontSize:'11px', fontWeight:'700', fontFamily:'inherit' }}>{isFr?'RÉESSAYER':'TRY AGAIN'}</button>
                </div>
              )}

              {scanPhase==='done' && localResult && (
                <div>
                  <div style={{ background:`${CLASS_COLORS[localResult.prediction]}0F`, border:`1px solid ${CLASS_COLORS[localResult.prediction]}33`, borderRadius:'8px', padding:'18px 22px', marginBottom:'16px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'10px' }}>
                    <div>
                      <p style={{ fontSize:'8px', color:'rgba(255,255,255,0.3)', letterSpacing:'3px', marginBottom:'4px' }}>{isFr?'DIAGNOSTIC ILLUMADX':'ILLUMADX DIAGNOSIS'}</p>
                      <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'30px', letterSpacing:'2px', color:CLASS_COLORS[localResult.prediction], margin:0 }}>{localResult.prediction.toUpperCase()}</h3>
                      <p style={{ fontSize:'10px', color:'rgba(255,255,255,0.25)', marginTop:'3px' }}>GroupB ResNet-18 · GradCAM++ Verified</p>
                    </div>
                    <div style={{ textAlign:'right' }}>
                      <p style={{ fontSize:'8px', color:'rgba(255,255,255,0.3)', letterSpacing:'3px', marginBottom:'4px' }}>{isFr?'CONFIANCE':'CONFIDENCE'}</p>
                      <p style={{ fontSize:'36px', fontWeight:'900', color:'#10B981', letterSpacing:'-1px' }}>{(localResult.confidence*100).toFixed(1)}%</p>
                    </div>
                  </div>

                  <div style={{ marginBottom:'16px' }}>
                    <p style={{ fontSize:'8px', color:'rgba(255,255,255,0.25)', letterSpacing:'3px', marginBottom:'10px', fontWeight:'600' }}>{isFr?'DISTRIBUTION':'CONFIDENCE DISTRIBUTION'}</p>
                    {['glioma','meningioma','notumor','pituitary'].map(cls=>{
                      const prob=localResult.probabilities[cls]||0; const pct=(prob*100).toFixed(1); const isTop=cls===localResult.prediction
                      return (
                        <div key={cls} style={{ marginBottom:'8px' }}>
                          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'3px' }}>
                            <span style={{ fontSize:'10px', color:isTop?CLASS_COLORS[cls]:'rgba(255,255,255,0.35)', fontWeight:isTop?'700':'400', textTransform:'uppercase', letterSpacing:'1px' }}>{cls}</span>
                            <span style={{ fontSize:'10px', color:isTop?CLASS_COLORS[cls]:'rgba(255,255,255,0.35)', fontWeight:isTop?'700':'400' }}>{pct}%</span>
                          </div>
                          <div style={{ height:'5px', background:'rgba(255,255,255,0.05)', borderRadius:'3px', overflow:'hidden' }}>
                            <div style={{ height:'100%', width:`${pct}%`, background:isTop?CLASS_COLORS[cls]:'rgba(255,255,255,0.1)', borderRadius:'3px', transition:'width 1s cubic-bezier(0.16,1,0.3,1)' }} />
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {localResult.heatmap_b && (
                    <div style={{ marginBottom:'14px' }}>
                      <p style={{ fontSize:'8px', color:'rgba(255,255,255,0.25)', letterSpacing:'3px', marginBottom:'10px', fontWeight:'600' }}>{isFr?'ANALYSE GRADCAM++':'GRADCAM++ ANALYSIS'}</p>
                      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px', marginBottom:'8px' }}>
                        {[{key:'heatmap_b',label:isFr?'Groupe B — Basique ✓':'Group B — Basic ✓',color:'#10B981'},{key:'heatmap_d',label:isFr?'Groupe D — Domaine':'Group D — Domain',color:'#FFB703'}].map(({key,label,color})=>(
                          <div key={key} style={{ border:`1px solid ${color}33`, borderRadius:'6px', overflow:'hidden' }}>
                            <img src={`data:image/png;base64,${localResult[key]}`} alt={label} style={{ width:'100%', display:'block' }} />
                            <div style={{ padding:'6px 10px', background:`${color}0A` }}><p style={{ fontSize:'9px', color, fontWeight:'700', margin:0 }}>{label}</p></div>
                          </div>
                        ))}
                      </div>
                      <div style={{ border:'1px solid rgba(0,180,216,0.3)', borderRadius:'6px', overflow:'hidden' }}>
                        <img src={`data:image/png;base64,${localResult.heatmap_consensus}`} alt="consensus" style={{ width:'100%', display:'block' }} />
                        <div style={{ padding:'8px 12px', background:'rgba(0,180,216,0.06)' }}>
                          <p style={{ fontSize:'9px', color:'#00B4D8', fontWeight:'700', margin:0 }}>{isFr?'⬡ CONSENSUS B+D':'⬡ CONSENSUS B+D — FINAL HEATMAP'}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div style={{ display:'flex', gap:'8px', marginTop:'14px' }}>
                    <button onClick={()=>printPatientReport(patient,localResult,lang)} style={{ flex:1, padding:'10px', background:'rgba(255,183,3,0.1)', border:'1px solid rgba(255,183,3,0.3)', color:'#FFB703', borderRadius:'5px', cursor:'pointer', fontSize:'10px', fontWeight:'800', letterSpacing:'0.5px', fontFamily:'inherit' }}>
                      📄 {isFr?'IMPRIMER PDF':'PRINT PDF REPORT'}
                    </button>
                    <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={e=>handleFile(e.target.files[0])} />
                    <button onClick={()=>fileRef.current.click()} style={{ flex:1, padding:'10px', background:'rgba(0,180,216,0.08)', border:'1px solid rgba(0,180,216,0.2)', color:'#00B4D8', borderRadius:'5px', cursor:'pointer', fontSize:'10px', fontWeight:'800', letterSpacing:'0.5px', fontFamily:'inherit' }}>
                      ↺ {isFr?'NOUVEAU SCAN':'NEW SCAN'}
                    </button>
                  </div>

                  <div style={{ marginTop:'12px', padding:'10px 14px', background:'rgba(255,183,3,0.05)', border:'1px solid rgba(255,183,3,0.15)', borderRadius:'5px' }}>
                    <p style={{ fontSize:'10px', color:'rgba(255,183,3,0.7)', margin:0, lineHeight:'1.6' }}>
                      ⚠ {isFr?'Outil de recherche uniquement. Ne remplace pas le diagnostic clinique.':'Research tool only. Not a substitute for clinical diagnosis. Not approved by Health Canada.'}
                    </p>
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

function UploadModal({ onClose, lang }) {
  const [phase, setPhase] = useState('idle')
  const [result, setResult] = useState(null)
  const [preview, setPreview] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef(null)
  const isFr = lang === 'fr'

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) return
    setPreview(URL.createObjectURL(file)); setPhase('loading')
    try {
      const formData = new FormData(); formData.append('file', file)
      const res = await fetch(`${API_URL}/predict`, { method:'POST', body:formData })
      const data = await res.json()
      if (!res.ok) { if(data.error==='not_mri'){setPhase('not_mri');return} setPhase('invalid');return }
      setResult(data); setPhase('result')
    } catch { setPhase('error') }
  }

  const handleDrop = (e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]) }
  const reset = () => { setPhase('idle'); setResult(null); setPreview(null) }

  return (
    <div onClick={onClose} style={{ position:'fixed', inset:0, zIndex:1000, background:'rgba(5,8,15,0.92)', backdropFilter:'blur(20px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:'#0A1628', border:'1px solid rgba(0,180,216,0.2)', borderRadius:'12px', width:'100%', maxWidth:phase==='result'?'900px':'520px', maxHeight:'90vh', overflowY:'auto', padding:'36px', position:'relative', boxShadow:'0 40px 120px rgba(0,0,0,0.8)', transition:'max-width 0.5s cubic-bezier(0.16,1,0.3,1)' }}>
        <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}} @keyframes ripple{0%{box-shadow:0 0 0 0 rgba(16,185,129,0.5)}70%{box-shadow:0 0 0 14px rgba(16,185,129,0)}100%{box-shadow:0 0 0 0 rgba(16,185,129,0)}}`}</style>
        <button onClick={onClose} style={{ position:'absolute', top:'16px', right:'16px', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.5)', borderRadius:'6px', width:'32px', height:'32px', cursor:'pointer', fontSize:'16px', display:'flex', alignItems:'center', justifyContent:'center' }}>×</button>
        <div style={{ marginBottom:'28px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'8px' }}>
            <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#10B981', animation:'ripple 2s infinite' }} />
            <span style={{ fontSize:'9px', color:'#10B981', letterSpacing:'3px', fontWeight:'700' }}>{isFr?'SYSTÈME EN DIRECT':'LIVE SYSTEM'}</span>
          </div>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'32px', color:'#fff', letterSpacing:'2px', margin:0 }}>Illuma<span style={{ color:'#00B4D8' }}>DX</span> {isFr?'ANALYSE':'ANALYSIS'}</h2>
          <p style={{ color:'rgba(255,255,255,0.3)', fontSize:'12px', marginTop:'6px' }}>{isFr?'Téléchargez une IRM cérébrale pour une analyse en temps réel':'Upload a brain MRI scan for real-time AI analysis'}</p>
        </div>

        {phase==='idle' && (
          <div onDragOver={e=>{e.preventDefault();setDragOver(true)}} onDragLeave={()=>setDragOver(false)} onDrop={handleDrop} onClick={()=>fileRef.current.click()}
            style={{ border:`2px dashed ${dragOver?'#00B4D8':'rgba(0,180,216,0.25)'}`, borderRadius:'8px', padding:'60px 24px', textAlign:'center', cursor:'pointer', background:dragOver?'rgba(0,180,216,0.05)':'rgba(0,180,216,0.02)', transition:'all 0.2s' }}>
            <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={e=>handleFile(e.target.files[0])} />
            <div style={{ fontSize:'48px', marginBottom:'16px' }}>🧠</div>
            <p style={{ color:'#00B4D8', fontSize:'14px', fontWeight:'700', marginBottom:'8px' }}>{isFr?'Glissez une IRM ici':'Drop MRI scan here'}</p>
            <p style={{ color:'rgba(255,255,255,0.25)', fontSize:'12px' }}>{isFr?'ou cliquez pour parcourir':'or click to browse'} · PNG, JPG, JPEG</p>
            <div style={{ marginTop:'24px', padding:'10px 20px', background:'#00B4D8', color:'#05080F', borderRadius:'4px', display:'inline-block', fontSize:'11px', fontWeight:'800', letterSpacing:'1px' }}>{isFr?'CHOISIR FICHIER':'CHOOSE FILE'}</div>
          </div>
        )}

        {phase==='loading' && (
          <div style={{ textAlign:'center', padding:'60px 24px' }}>
            {preview && <img src={preview} alt="scan" style={{ width:'120px', height:'120px', objectFit:'cover', borderRadius:'8px', marginBottom:'24px', opacity:0.6, border:'1px solid rgba(0,180,216,0.3)' }} />}
            <div style={{ width:'48px', height:'48px', border:'3px solid rgba(0,180,216,0.2)', borderTop:'3px solid #00B4D8', borderRadius:'50%', animation:'spin 1s linear infinite', margin:'0 auto 20px' }} />
            <p style={{ color:'#00B4D8', fontSize:'13px', fontWeight:'700', letterSpacing:'2px' }}>{isFr?'ANALYSE EN COURS...':'ANALYSING SCAN...'}</p>
            <p style={{ color:'rgba(255,255,255,0.25)', fontSize:'11px', marginTop:'8px' }}>{isFr?'GradCAM++ génère les cartes de chaleur':'GradCAM++ generating heatmaps'}</p>
          </div>
        )}

        {phase==='not_mri' && <div style={{ textAlign:'center', padding:'48px 24px' }}><div style={{ fontSize:'48px', marginBottom:'16px' }}>🧠</div><h3 style={{ color:'#E63946', fontSize:'18px', fontWeight:'800', marginBottom:'12px' }}>{isFr?'PAS UNE IRM':'NOT A BRAIN MRI'}</h3><p style={{ color:'rgba(255,255,255,0.4)', fontSize:'13px', maxWidth:'340px', margin:'0 auto 28px' }}>{isFr?'Veuillez télécharger une IRM cérébrale valide.':'Please upload a valid greyscale brain MRI.'}</p><button onClick={reset} style={{ padding:'10px 24px', background:'#00B4D8', color:'#05080F', border:'none', borderRadius:'4px', fontSize:'11px', fontWeight:'800', cursor:'pointer' }}>{isFr?'RÉESSAYER':'TRY AGAIN'}</button></div>}
        {phase==='invalid' && <div style={{ textAlign:'center', padding:'48px 24px' }}><div style={{ fontSize:'48px', marginBottom:'16px' }}>🛡</div><h3 style={{ color:'#E63946', fontSize:'18px', fontWeight:'800', marginBottom:'12px' }}>{isFr?'SCAN INVALIDE':'INVALID SCAN'}</h3><p style={{ color:'rgba(255,255,255,0.4)', fontSize:'13px', maxWidth:'340px', margin:'0 auto 28px' }}>{isFr?'Confiance insuffisante (<60%).':'Model confidence below 60%.'}</p><button onClick={reset} style={{ padding:'10px 24px', background:'#00B4D8', color:'#05080F', border:'none', borderRadius:'4px', fontSize:'11px', fontWeight:'800', cursor:'pointer' }}>{isFr?'RÉESSAYER':'TRY AGAIN'}</button></div>}
        {phase==='error' && <div style={{ textAlign:'center', padding:'48px 24px' }}><div style={{ fontSize:'48px', marginBottom:'16px' }}>⚠️</div><h3 style={{ color:'#E63946', fontSize:'18px', fontWeight:'800', marginBottom:'12px' }}>{isFr?'ERREUR':'CONNECTION ERROR'}</h3><p style={{ color:'rgba(255,255,255,0.4)', fontSize:'13px', maxWidth:'340px', margin:'0 auto 28px' }}>{isFr?'Impossible de contacter le serveur IA.':'Could not reach the AI server.'}</p><button onClick={reset} style={{ padding:'10px 24px', background:'#00B4D8', color:'#05080F', border:'none', borderRadius:'4px', fontSize:'11px', fontWeight:'800', cursor:'pointer' }}>{isFr?'RÉESSAYER':'TRY AGAIN'}</button></div>}

        {phase==='result' && result && (
          <div>
            <div style={{ background:'rgba(16,185,129,0.06)', border:'1px solid rgba(16,185,129,0.25)', borderRadius:'8px', padding:'24px', marginBottom:'24px', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'12px' }}>
              <div><p style={{ fontSize:'10px', color:'rgba(255,255,255,0.3)', letterSpacing:'3px', marginBottom:'6px' }}>{isFr?'PRÉDICTION':'TOP PREDICTION'}</p><h3 style={{ fontSize:'28px', fontFamily:"'Bebas Neue',sans-serif", letterSpacing:'2px', color:CLASS_COLORS[result.prediction]||'#10B981', margin:0 }}>{result.prediction.toUpperCase()}</h3></div>
              <div style={{ textAlign:'right' }}><p style={{ fontSize:'10px', color:'rgba(255,255,255,0.3)', letterSpacing:'3px', marginBottom:'6px' }}>{isFr?'CONFIANCE':'CONFIDENCE'}</p><p style={{ fontSize:'36px', fontWeight:'900', color:'#10B981', margin:0, letterSpacing:'-1px' }}>{(result.confidence*100).toFixed(1)}%</p></div>
            </div>
            <div style={{ marginBottom:'28px' }}>
              <p style={{ fontSize:'10px', color:'rgba(255,255,255,0.3)', letterSpacing:'3px', marginBottom:'14px' }}>{isFr?'DISTRIBUTION DE CONFIANCE':'CONFIDENCE DISTRIBUTION'}</p>
              {['glioma','meningioma','notumor','pituitary'].map(cls=>{
                const prob=result.probabilities[cls]||0; const pct=(prob*100).toFixed(1); const isTop=cls===result.prediction
                return (<div key={cls} style={{ marginBottom:'10px' }}><div style={{ display:'flex', justifyContent:'space-between', marginBottom:'4px' }}><span style={{ fontSize:'11px', color:isTop?CLASS_COLORS[cls]:'rgba(255,255,255,0.4)', fontWeight:isTop?'700':'400', textTransform:'uppercase', letterSpacing:'1px' }}>{cls}</span><span style={{ fontSize:'11px', color:isTop?CLASS_COLORS[cls]:'rgba(255,255,255,0.4)', fontWeight:isTop?'700':'400' }}>{pct}%</span></div><div style={{ height:'6px', background:'rgba(255,255,255,0.05)', borderRadius:'3px', overflow:'hidden' }}><div style={{ height:'100%', width:`${pct}%`, background:isTop?CLASS_COLORS[cls]:'rgba(255,255,255,0.12)', borderRadius:'3px', transition:'width 1s cubic-bezier(0.16,1,0.3,1)' }} /></div></div>)
              })}
            </div>
            <div>
              <p style={{ fontSize:'10px', color:'rgba(255,255,255,0.3)', letterSpacing:'3px', marginBottom:'14px' }}>{isFr?'ANALYSE GRADCAM++':'GRADCAM++ ANALYSIS'}</p>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'10px' }}>
                {[{key:'heatmap_b',label:isFr?'Groupe B ✓':'Group B — Basic ✓',color:'#10B981'},{key:'heatmap_d',label:isFr?'Groupe D':'Group D — Domain',color:'#FFB703'}].map(({key,label,color})=>(
                  <div key={key} style={{ border:`1px solid ${color}33`, borderRadius:'8px', overflow:'hidden' }}>
                    <img src={`data:image/png;base64,${result[key]}`} alt={label} style={{ width:'100%', display:'block' }} />
                    <div style={{ padding:'8px 10px', background:`${color}0A` }}><p style={{ fontSize:'10px', color, fontWeight:'700', margin:0 }}>{label}</p></div>
                  </div>
                ))}
              </div>
              <div style={{ border:'1px solid rgba(0,180,216,0.35)', borderRadius:'8px', overflow:'hidden' }}>
                <img src={`data:image/png;base64,${result.heatmap_consensus}`} alt="consensus" style={{ width:'100%', display:'block' }} />
                <div style={{ padding:'10px 14px', background:'rgba(0,180,216,0.06)' }}>
                  <p style={{ fontSize:'10px', color:'#00B4D8', fontWeight:'700', margin:0 }}>{isFr?'⬡ CONSENSUS B+D — HEATMAP FINALE':'⬡ CONSENSUS B+D — FINAL HEATMAP'}</p>
                  <p style={{ fontSize:'10px', color:'rgba(255,255,255,0.25)', margin:'2px 0 0' }}>{isFr?'Moyenne des deux modèles les plus performants':'Average of the two highest-performing models'}</p>
                </div>
              </div>
            </div>
            <div style={{ marginTop:'20px', padding:'12px 16px', background:'rgba(255,183,3,0.05)', border:'1px solid rgba(255,183,3,0.15)', borderRadius:'6px' }}>
              <p style={{ fontSize:'10px', color:'rgba(255,183,3,0.7)', margin:0, lineHeight:'1.6' }}>⚠ {isFr?'Outil de recherche uniquement. Non approuvé par Santé Canada.':'Research tool only. Not a substitute for clinical diagnosis. Not approved by Health Canada.'}</p>
            </div>
            <button onClick={reset} style={{ marginTop:'20px', width:'100%', padding:'12px', background:'rgba(0,180,216,0.1)', border:'1px solid rgba(0,180,216,0.25)', color:'#00B4D8', borderRadius:'6px', fontSize:'11px', fontWeight:'800', cursor:'pointer', letterSpacing:'1.5px' }}>{isFr?'← ANALYSER UN AUTRE SCAN':'← ANALYSE ANOTHER SCAN'}</button>
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
  const [activePage, setActivePage] = useState(null)

  const t = translations[lang]

  useEffect(()=>{const c=()=>setIsMobile(window.innerWidth<768);c();window.addEventListener('resize',c);return()=>window.removeEventListener('resize',c)},[])
  useEffect(()=>{const t2=setTimeout(()=>setLoaded(true),100);return()=>clearTimeout(t2)},[])
  useEffect(()=>{const fn=()=>setScrollY(window.scrollY);window.addEventListener('scroll',fn,{passive:true});return()=>window.removeEventListener('scroll',fn)},[])
  useEffect(()=>{const fn=(e)=>{setMouseX((e.clientX/window.innerWidth-0.5)*30);setMouseY((e.clientY/window.innerHeight-0.5)*30)};window.addEventListener('mousemove',fn,{passive:true});return()=>window.removeEventListener('mousemove',fn)},[])

  const handleNavClick=(item)=>{
    if(item.label==='System')setShowUpload(true)
    else if(item.label==='Patient Records')setActivePage('patients')
  }

  const stats=[{value:'99.69%',label:t.peakAcc,color:'#10B981'},{value:'33×',label:t.lossGap,color:'#E63946'},{value:'40',label:t.modelsTrained,color:'#00B4D8'},{value:'300K+',label:t.patients,color:'#FFB703'}]
  const visibleNavItems=isMobile?navItems.filter(n=>n.mobileShow):navItems

  return (
    <div style={{ background:'#05080F', minHeight:'100vh', overflowX:'hidden', fontFamily:"'Inter',system-ui,sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Bebas+Neue&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes ripple{0%{box-shadow:0 0 0 0 rgba(16,185,129,0.5)}70%{box-shadow:0 0 0 14px rgba(16,185,129,0)}100%{box-shadow:0 0 0 0 rgba(16,185,129,0)}}
        @keyframes scrollline{0%,100%{opacity:0.2}50%{opacity:0.7}}
        @keyframes subtleGlow{0%,100%{text-shadow:0 0 60px rgba(230,57,70,0.2)}50%{text-shadow:0 0 100px rgba(230,57,70,0.5)}}
        @keyframes fadeSlideIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        .nav-btn:hover .nav-tooltip{opacity:1!important;transform:translateX(-50%) translateY(0px)!important}
      `}</style>

      <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', backgroundImage:`linear-gradient(rgba(0,180,216,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,180,216,0.025) 1px,transparent 1px)`, backgroundSize:'80px 80px' }} />
      <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', background:`radial-gradient(800px circle at ${50+mouseX*0.4}% ${50+mouseY*0.4}%,rgba(0,180,216,0.065),transparent 60%)` }} />

      {showUpload && <UploadModal onClose={()=>setShowUpload(false)} lang={lang} />}
      {activePage==='patients' && <PatientRecordsPage lang={lang} onClose={()=>setActivePage(null)} />}

      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:100, padding:'0 24px', height:'60px', display:'flex', justifyContent:'space-between', alignItems:'center', background:scrollY>60?'rgba(5,8,15,0.94)':'rgba(5,8,15,0.6)', backdropFilter:'blur(24px)', borderBottom:'1px solid rgba(255,255,255,0.05)', transition:'background 0.4s', opacity:loaded?1:0, animation:loaded?'fadeSlideIn 0.8s ease 0.2s both':'none' }}>
        <div onClick={()=>setActivePage(null)} style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:isMobile?'22px':'26px', letterSpacing:'2px', cursor:'pointer', flexShrink:0 }}>
          <span style={{ color:'#fff' }}>Illuma</span><span style={{ color:'#00B4D8' }}>DX</span>
        </div>
        <div style={{ display:'flex', gap:isMobile?'4px':'6px', alignItems:'center' }}>
          {visibleNavItems.map((item,i)=>(
            <div key={item.label} className="nav-btn" onMouseEnter={()=>setHoveredNav(i)} onMouseLeave={()=>setHoveredNav(null)} onClick={()=>handleNavClick(item)} style={{ position:'relative', cursor:'pointer' }}>
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
            onMouseLeave={e=>{e.currentTarget.style.boxShadow='0 0 40px rgba(0,180,216,0.25)';e.currentTarget.style.transform='translateY(0)'}}>{t.upload}</button>
          <button style={{ padding:isMobile?'12px 28px':'14px 40px', background:'transparent', color:'rgba(255,255,255,0.65)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:'3px', fontSize:'13px', fontWeight:'500', cursor:'pointer', transition:'all 0.25s', fontFamily:'inherit' }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.3)';e.currentTarget.style.color='#fff';e.currentTarget.style.transform='translateY(-2px)'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.12)';e.currentTarget.style.color='rgba(255,255,255,0.65)';e.currentTarget.style.transform='translateY(0)'}}>{t.research}</button>
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

      <section style={{ minHeight:'50vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', textAlign:'center', padding:isMobile?'80px 20px':'100px 24px', position:'relative', zIndex:1, borderTop:'1px solid rgba(255,255,255,0.04)', background:'linear-gradient(180deg,rgba(0,180,216,0.02) 0%,transparent 100%)' }}>
        <FadeUp><p style={{ fontSize:'10px', color:'rgba(255,255,255,0.25)', letterSpacing:'5px', marginBottom:'44px', fontWeight:'600' }}>{t.thesis}</p></FadeUp>
        <FadeUp delay={0.12}><blockquote style={{ fontSize:isMobile?'clamp(18px,5vw,28px)':'clamp(20px,3.5vw,40px)', fontWeight:'300', color:'rgba(255,255,255,0.72)', lineHeight:'1.5', maxWidth:'800px', margin:'0 auto 16px', fontStyle:'italic', fontFamily:'Georgia,serif' }}>{t.hawkingLine1}<br /><span style={{ color:'#fff', fontWeight:'400' }}>{t.hawkingLine2}</span></blockquote></FadeUp>
        <FadeUp delay={0.22}><p style={{ fontSize:'11px', color:'rgba(255,255,255,0.2)', letterSpacing:'3px', marginBottom:'48px' }}>— STEPHEN HAWKING</p></FadeUp>
        <FadeUp delay={0.34}><p style={{ fontSize:isMobile?'14px':'clamp(14px,1.8vw,17px)', color:'rgba(255,255,255,0.38)', maxWidth:'520px', lineHeight:'1.9' }}>{t.hawkingBody1} <span style={{ color:'#fff', fontWeight:'600' }}>{t.hawkingBody2}</span> {t.hawkingBody3} <span style={{ color:'#E63946', fontWeight:'600' }}>{t.hawkingBody4}</span> {t.hawkingBody5}<br /><br />{t.hawkingBody6}</p></FadeUp>
      </section>

      <section style={{ padding:isMobile?'80px 20px':'100px 48px', position:'relative', zIndex:1, borderTop:'1px solid rgba(255,255,255,0.04)' }}>
        <FadeUp>
          <p style={{ fontSize:'10px', color:'#00B4D8', letterSpacing:'5px', marginBottom:'14px', fontWeight:'700', textAlign:'center' }}>{t.features}</p>
          <h2 style={{ fontSize:isMobile?'clamp(28px,8vw,48px)':'clamp(32px,5vw,60px)', fontWeight:'900', textAlign:'center', letterSpacing:'-2px', marginBottom:'14px', color:'#fff' }}>{t.featuresTitle}</h2>
          <p style={{ textAlign:'center', color:'rgba(255,255,255,0.35)', fontSize:'15px', maxWidth:'500px', margin:'0 auto 60px', lineHeight:'1.7' }}>{t.featuresDesc}</p>
        </FadeUp>
        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'repeat(auto-fit,minmax(280px,1fr))', gap:'12px', maxWidth:'1000px', margin:'0 auto' }}>
          {features.map((f,i)=>(
            <FadeUp key={f.title} delay={i*0.07}>
              <div onMouseEnter={()=>setHoveredFeature(i)} onMouseLeave={()=>setHoveredFeature(null)}
                onClick={()=>{if(f.title==='Live MRI Upload')setShowUpload(true);else if(f.title==='EHR Integration')setActivePage('patients')}}
                style={{ padding:'28px 26px', border:`1px solid ${hoveredFeature===i?f.color+'40':'rgba(255,255,255,0.05)'}`, borderRadius:'8px', background:hoveredFeature===i?f.color+'08':'rgba(255,255,255,0.015)', transition:'all 0.35s cubic-bezier(0.16,1,0.3,1)', transform:hoveredFeature===i?'translateY(-5px)':'translateY(0)', cursor:(f.title==='Live MRI Upload'||f.title==='EHR Integration')?'pointer':'default', height:'100%' }}>
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
          {groups.map((g,i)=>(
            <FadeUp key={g.group} delay={i*0.08}>
              <div style={{ padding:'20px 16px', border:`1px solid ${g.color}18`, borderRadius:'6px', background:`${g.color}04`, transition:'all 0.35s cubic-bezier(0.16,1,0.3,1)', cursor:'default', height:'100%' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=g.color+'44';e.currentTarget.style.background=g.color+'0C';e.currentTarget.style.transform='translateY(-5px)'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=g.color+'18';e.currentTarget.style.background=g.color+'04';e.currentTarget.style.transform='translateY(0)'}}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'10px' }}>
                  <span style={{ fontSize:'28px', fontWeight:'900', color:g.color, lineHeight:1 }}>G{g.group}</span>
                  {g.badge && <span style={{ fontSize:'8px', fontWeight:'800', color:g.color, border:`1px solid ${g.color}55`, padding:'2px 6px', borderRadius:'2px', letterSpacing:'0.5px' }}>{g.badgeType==='winner'?(lang==='fr'?'✓ GAGNANT':'✓ WINNER'):'✗ DANGER'}</span>}
                </div>
                <p style={{ fontSize:'11px', fontWeight:'700', color:'#fff', marginBottom:'4px' }}>{t.groupLabels[i]}</p>
                <p style={{ fontSize:'10px', color:'rgba(255,255,255,0.28)', lineHeight:'1.5', marginBottom:'12px' }}>{t.groupDescs[i]}</p>
                <div style={{ display:'flex', flexDirection:'column', gap:'5px', borderTop:'1px solid rgba(255,255,255,0.04)', paddingTop:'10px' }}>
                  {[[t.statLabels[0],g.acc,'#fff'],[t.statLabels[1],g.ece,g.group==='C'?'#E63946':'#10B981'],[t.statLabels[2],g.loss,g.group==='C'?'#E63946':'rgba(255,255,255,0.45)']].map(([label,val,col])=>(
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
          </div>
        </FadeUp>
      </section>

      <div style={{ position:'fixed', bottom:'28px', right:'28px', zIndex:200, display:'flex', alignItems:'center', background:'rgba(10,22,40,0.95)', border:'1px solid rgba(0,180,216,0.2)', borderRadius:'40px', overflow:'hidden', backdropFilter:'blur(20px)', boxShadow:'0 8px 32px rgba(0,0,0,0.5)', animation:loaded?'fadeSlideIn 0.8s ease 1.5s both':'none', opacity:0 }}>
        {['en','fr'].map(l=>(
          <button key={l} onClick={()=>setLang(l)} style={{ padding:'10px 18px', background:lang===l?'#00B4D8':'transparent', color:lang===l?'#05080F':'rgba(255,255,255,0.4)', border:'none', cursor:'pointer', fontSize:'11px', fontWeight:'800', letterSpacing:'1.5px', transition:'all 0.25s', fontFamily:'inherit' }}>{l.toUpperCase()}</button>
        ))}
      </div>
    </div>
  )
}