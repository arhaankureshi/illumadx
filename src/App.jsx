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
  {
    id:'AHS-10042', name:'James Okafor', age:54, dob:'1970-03-12', sex:'Male', bloodType:'O+',
    ahcip:'52104-3382', primaryCare:'Dr. K. Adeyemi · Southlake Family Medicine',
    physician:'Dr. R. Patel', facility:'Northern Lights Regional Hospital', dept:'Neurology',
    scanDate:'2026-04-10', admitDate:'2026-04-08',
    status:'Awaiting Analysis', statusColor:'#FFB703',
    emergencyContact:{ name:'Amara Okafor', rel:'Wife', phone:'780-555-0147' },
    presentingComplaint:'Persistent right-sided headaches (3 weeks) with intermittent vision blurring, worse on waking. One episode of transient left-hand numbness (~10 min, self-resolved). No nausea, no seizure activity. CT brain showed possible right frontal hyperdensity — urgent MRI ordered.',
    vitals:{ bp:'142/88', hr:'78', temp:'36.6', o2:'98', weight:'86', height:'181', gcs:'15', ts:'2026-04-08 14:22' },
    allergies:['Penicillin — moderate (hives, facial swelling, 2014)','Sulfa drugs — mild rash'],
    medications:['Metformin 500mg PO BID · Type 2 DM','Lisinopril 10mg PO daily · HTN','Atorvastatin 20mg PO daily · Hyperlipidemia','Sumatriptan 50mg PRN · Migraine'],
    history:'54-year-old man with 3-week history of progressive right-sided headaches and intermittent blurred vision. Symptoms worse on waking and with Valsalva. Single episode of left-hand numbness 5 days ago, lasted ~10 minutes, self-resolved. No focal deficit on exam. Presented to GP, CT brain ordered which showed possible right frontal hyperdensity. Admitted for urgent MRI workup.',
    pmh:['Type 2 diabetes mellitus (dx 2018, HbA1c 6.8, well controlled)','Essential hypertension (dx 2020)','Hyperlipidemia (dx 2020)','Migraine without aura (since 2012, 2-3 episodes/year, stable)'],
    surgicalHistory:['Laparoscopic appendectomy (2008) — uncomplicated','Right ACL reconstruction (2015)'],
    familyHistory:['Father — Glioblastoma WHO IV (deceased 2019, age 68)','Paternal uncle — Glioma (deceased 2005, age 62)','Mother — Living (age 79), HTN, Type 2 DM','Sister (age 51) — Living, healthy'],
    socialHistory:{ smoking:'Never', alcohol:'2–3 drinks/week, social', occupation:'Senior accountant, office-based', activity:'Moderate — walks 4 km/day' },
    immunizations:'Up to date. Influenza 2025 (Fluad), Tdap 2022, COVID bivalent 2024, Shingrix 2-dose series 2023.',
    problemList:[{ code:'R51.9', label:'Headache, unspecified' },{ code:'H53.8', label:'Other visual disturbances' },{ code:'E11.9', label:'Type 2 DM without complications' },{ code:'I10', label:'Essential (primary) hypertension' },{ code:'Z80.8', label:'Family hx of malignant neoplasm of CNS' }],
    plan:'Urgent MRI brain + contrast completed 2026-04-10. IllumaDX AI analysis pending. If mass confirmed on imaging, stat neurosurgery consult within 48 h and neuro-oncology referral. Dexamethasone 4 mg PO BID to be initiated if peritumoral edema present. Continue current diabetes and hypertension regimens. Follow-up neurology clinic in 7 days or sooner if symptoms worsen. Patient counselled re: red-flag symptoms (worsening headache, new neurological deficit, seizure).',
    radiologyReport:{ technique:'MRI brain with and without IV gadolinium. Axial T1, T2, FLAIR, DWI, pre- and post-contrast sequences at 3.0 T.', findings:'MRI acquisition completed 2026-04-10. Image quality diagnostic. Study pending full radiologist interpretation and IllumaDX AI preliminary analysis.', impression:'Radiologist read pending. Clinical correlation with presenting symptoms and prior CT finding recommended.', comparison:'Compared with MRI Brain 2026-01-15 (no abnormality) and CT Head 2025-08-22.' },
    referrals:[{ to:'Neurosurgery', reason:'Urgent evaluation if mass confirmed on MRI', urgency:'Within 48 h', status:'On standby' },{ to:'Neuro-Oncology', reason:'Potential multidisciplinary tumor board review', urgency:'Routine', status:'Pending imaging' },{ to:'Ophthalmology', reason:'Formal visual field testing (Humphrey 24-2)', urgency:'Within 1 week', status:'Ordered' }],
    prescribedToday:['Dexamethasone 4 mg PO BID — conditional on peritumoral edema on MRI','Continue metformin 500 mg BID, lisinopril 10 mg daily, atorvastatin 20 mg daily (no changes)','Hold sumatriptan pending intracranial mass ruling','Ondansetron 8 mg PO Q8H PRN for any contrast- or steroid-induced nausea'],
    patientEducation:'Red-flag symptoms reviewed: worst-headache-ever pattern, new focal neurological deficit, seizure activity, persistent vomiting, altered mental status. Return-to-ER criteria provided in writing. Wife (Amara) present for entire discussion. Consent obtained for contrast-enhanced MRI after premedication review.',
    labs:[
      { panel:'Complete Blood Count', date:'2026-04-08', values:[{ name:'Hemoglobin', value:'148', unit:'g/L', range:'130–180', flag:'normal' },{ name:'WBC', value:'7.2', unit:'×10⁹/L', range:'4.0–11.0', flag:'normal' },{ name:'Platelets', value:'234', unit:'×10⁹/L', range:'150–400', flag:'normal' }] },
      { panel:'Basic Metabolic Panel', date:'2026-04-08', values:[{ name:'Sodium', value:'138', unit:'mmol/L', range:'135–145', flag:'normal' },{ name:'Creatinine', value:'78', unit:'µmol/L', range:'60–110', flag:'normal' },{ name:'Glucose (fasting)', value:'6.8', unit:'mmol/L', range:'3.9–5.6', flag:'high' },{ name:'HbA1c', value:'6.8', unit:'%', range:'<7.0 target', flag:'normal' }] },
    ],
    radiologist:'Pending — Dr. M. Chen (Neuroradiology)',
    nextImaging:'Repeat MRI in 3 months if no mass identified today, or per neurosurgery recommendation if mass confirmed.',
    scanHistory:[
      { date:'2026-01-15', type:'MRI Brain', result:'No abnormality detected', provider:'Dr. R. Patel', notes:'Routine screening given family history. No acute findings.' },
      { date:'2025-08-22', type:'CT Head', result:'Mild cortical atrophy, otherwise normal', provider:'Dr. M. Wong', notes:'Workup for intermittent dizziness. No acute intracranial pathology.' },
      { date:'2025-03-10', type:'MRI Brain', result:'No abnormality detected', provider:'Dr. R. Patel', notes:'Annual surveillance given strong family history of CNS malignancy.' },
    ],
    latestResult:null,
  },
  {
    id:'AHS-10078', name:'Sarah Mahmoud', age:38, dob:'1987-09-24', sex:'Female', bloodType:'A-',
    ahcip:'48219-7164', primaryCare:'Dr. H. Rahman · Glenora Family Health',
    physician:'Dr. L. Chen', facility:'Northern Lights Regional Hospital', dept:'Neuro-Oncology',
    scanDate:'2026-04-14', admitDate:'2025-10-28',
    status:'Scan Complete', statusColor:'#E63946',
    emergencyContact:{ name:'Tariq Mahmoud', rel:'Husband', phone:'780-555-0289' },
    presentingComplaint:'Routine 3-month post-resection MRI for right frontal Grade II meningioma. Currently undergoing adjuvant radiotherapy (cycle 4 of 6). Reports moderate fatigue and mild cognitive slowing, no new focal deficits. No new headaches.',
    vitals:{ bp:'118/75', hr:'82', temp:'36.5', o2:'99', weight:'62', height:'166', gcs:'15', ts:'2026-04-14 10:05' },
    allergies:['Latex — contact dermatitis (severe, avoids surgical gloves)','Codeine — moderate nausea and vomiting','Shellfish — mild urticaria'],
    medications:['Dexamethasone 4mg PO BID (tapering from 8mg) · Peritumoral edema','Ondansetron 8mg PO Q8H PRN · Chemo-induced nausea','Levetiracetam 500mg PO BID · Seizure prophylaxis','Salbutamol 100mcg MDI PRN · Asthma','Iron supplement 325mg daily · Mild anemia'],
    history:'38-year-old woman diagnosed with Grade II atypical meningioma in right frontal lobe June 2025, initially as incidental finding on workup for persistent headaches. Underwent right frontal craniotomy with gross total resection November 2025. Started adjuvant fractionated radiotherapy (54 Gy total) February 2026 — currently cycle 4 of 6. Tolerating treatment reasonably with manageable fatigue.',
    pmh:['Atypical meningioma WHO Grade II, right frontal (dx 2025-06, GTR 2025-11)','Mild asthma since childhood, exercise-induced','Iron-deficiency anemia (post-partum, ongoing supplementation)','G1P1 (1 child, age 3, spontaneous vaginal delivery 2022)'],
    surgicalHistory:['Right frontal craniotomy + meningioma resection (2025-11-12, Dr. L. Chen, gross total resection)','Spontaneous vaginal delivery (2022)','Wisdom teeth extraction (2007)'],
    familyHistory:['Father — Colon cancer Stage II (survived, remission 2018)','Mother — Living (age 64), healthy','Paternal grandmother — Ovarian cancer (deceased age 71)','Brother (age 41) — Living, healthy'],
    socialHistory:{ smoking:'Never', alcohol:'None since pregnancy (2021)', occupation:'Senior graphic designer, work from home 3 days/week', activity:'Light — walking, post-op yoga' },
    immunizations:'Up to date. Influenza 2025, Tdap 2020 (post-partum), HPV complete, COVID bivalent Q1 2024. MMR boosted pre-pregnancy 2021.',
    problemList:[{ code:'D32.0', label:'Benign neoplasm of cerebral meninges (atypical)' },{ code:'Z51.0', label:'Encounter for antineoplastic radiation therapy' },{ code:'J45.20', label:'Mild intermittent asthma, uncomplicated' },{ code:'D50.9', label:'Iron deficiency anemia, unspecified' }],
    plan:'Continue fractionated radiotherapy schedule — 2 cycles remaining (projected completion 2026-05-15). Today\'s MRI reviewed — post-resection cavity stable, no recurrence seen. Continue dexamethasone taper to 2 mg BID next week. Next surveillance MRI 2026-07-14. Repeat CBC with iron studies at radiotherapy completion. Referral to occupational therapy for cognitive rehabilitation. Patient counselled re: long-term surveillance.',
    radiologyReport:{ technique:'MRI brain with and without IV gadolinium. Tumor surveillance protocol at 3.0 T: axial T1, T2, FLAIR, DWI/ADC, post-contrast 3D T1 MPRAGE, coronal post-contrast T1.', findings:'Right frontal lobe demonstrates expected post-operative changes with a small resection cavity measuring 1.2 × 0.9 cm. Thin peripheral enhancement along cavity margin is stable and consistent with expected post-surgical granulation tissue. No new enhancing lesion. No mass effect, midline shift, or hydrocephalus. Ventricular system symmetric. Remainder of brain parenchyma unremarkable.', impression:'Stable post-resection appearance of right frontal meningioma. No evidence of tumor recurrence at 5-month follow-up.', comparison:'Compared with MRI 2026-02-28, 2025-11-12 (post-op), and 2025-10-02. Resection cavity and margin enhancement stable across serial studies.' },
    referrals:[{ to:'Radiation Oncology', reason:'Ongoing adjuvant radiotherapy (cycle 4 of 6)', urgency:'Routine', status:'Active' },{ to:'Occupational Therapy', reason:'Cognitive rehabilitation for post-treatment cognitive slowing', urgency:'Routine', status:'Ordered' },{ to:'Neurosurgery follow-up', reason:'6-month post-op review', urgency:'Routine', status:'Scheduled 2026-05-20' }],
    prescribedToday:['Dexamethasone taper: 4 mg BID → 2 mg BID × 2 weeks, then 1 mg BID × 2 weeks, then discontinue','Continue levetiracetam 500 mg BID for ongoing seizure prophylaxis','Continue ondansetron 8 mg Q8H PRN for radiotherapy-induced nausea','Iron supplement increased to 325 mg PO daily given continued mild anemia','Continue salbutamol MDI PRN for asthma'],
    patientEducation:'Discussed radiotherapy schedule — 2 cycles remaining with projected completion 2026-05-15. Counselled on expected side effects: fatigue, transient scalp irritation, cognitive slowing. Long-term surveillance plan reviewed (MRI q3 months × year 1, then q6 months). Husband (Tariq) present for discussion. Cognitive rehabilitation appointment confirmed. Written care summary provided in plain language.',
    labs:[
      { panel:'CBC with differential', date:'2026-04-12', values:[{ name:'Hemoglobin', value:'112', unit:'g/L', range:'120–160', flag:'low' },{ name:'Ferritin', value:'18', unit:'µg/L', range:'15–200', flag:'low' },{ name:'WBC', value:'5.4', unit:'×10⁹/L', range:'4.0–11.0', flag:'normal' },{ name:'Platelets', value:'198', unit:'×10⁹/L', range:'150–400', flag:'normal' }] },
      { panel:'Chemistry + LFTs', date:'2026-04-12', values:[{ name:'Creatinine', value:'62', unit:'µmol/L', range:'45–90', flag:'normal' },{ name:'ALT', value:'22', unit:'U/L', range:'<35', flag:'normal' },{ name:'Sodium', value:'139', unit:'mmol/L', range:'135–145', flag:'normal' }] },
    ],
    radiologist:'Dr. M. Chen · Neuroradiology',
    nextImaging:'Surveillance MRI brain + contrast on 2026-07-14 (3 months post-RT completion).',
    scanHistory:[
      { date:'2026-04-14', type:'MRI Brain + Contrast — IllumaDX AI', result:'MENINGIOMA — 88.3% (IllumaDX)', provider:'IllumaDX AI System', notes:'IllumaDX AI analysis with GradCAM++ interpretability. Post-resection cavity stable, no evidence of recurrence.' },
      { date:'2026-02-28', type:'MRI Brain + Contrast', result:'Meningioma post-resection — no recurrence', provider:'Dr. L. Chen', notes:'3-month post-surgical surveillance. Resection cavity stable, mild expected enhancement along margin. Radiotherapy to proceed.' },
      { date:'2025-11-12', type:'Post-op MRI (same-day)', result:'Meningioma — gross total resection confirmed', provider:'Dr. L. Chen', notes:'Immediate post-op imaging. Gross total resection achieved. Small residual enhancement at cavity margin — expected.' },
      { date:'2025-10-02', type:'MRI Brain + Contrast', result:'Meningioma — Grade II confirmed, surgical planning', provider:'Dr. A. Singh', notes:'Right frontal lobe mass 2.8cm × 2.2cm. Biopsy confirmed WHO Grade II atypical meningioma. Surgical resection scheduled.' },
      { date:'2025-06-18', type:'MRI Brain', result:'Incidental right frontal hyperdensity', provider:'Dr. R. Patel', notes:'Initial detection during headache workup. Referred neurosurgery for evaluation.' },
    ],
    latestResult:{ prediction:'meningioma', confidence:0.8831, probabilities:{ glioma:0.052, meningioma:0.8831, notumor:0.031, pituitary:0.034 }, heatmap_b:null, heatmap_d:null, heatmap_consensus:null },
  },
  {
    id:'AHS-10113', name:'David Tremblay', age:67, dob:'1958-11-05', sex:'Male', bloodType:'B+',
    ahcip:'39847-5521', primaryCare:'Dr. F. Dubois · Rivière-aux-Prairies Clinic',
    physician:'Dr. A. Singh', facility:'Northern Lights Regional Hospital', dept:'Neurology',
    scanDate:'2026-04-16', admitDate:'2024-02-15',
    status:'Scan Complete', statusColor:'#E63946',
    emergencyContact:{ name:'Catherine Tremblay', rel:'Daughter', phone:'780-555-0412' },
    presentingComplaint:'Routine 4-month surveillance MRI for known stable pituitary macroadenoma (1.4 cm) on cabergoline. Reports no new visual changes, no headaches. Energy improved since cabergoline dose increase 2025-08.',
    vitals:{ bp:'135/82', hr:'68', temp:'36.8', o2:'97', weight:'78', height:'174', gcs:'15', ts:'2026-04-16 08:45' },
    allergies:['NSAIDs — moderate (upper GI bleed 2018, avoid all NSAIDs and aspirin)','Latex — none reported'],
    medications:['Cabergoline 0.5mg PO 2x/week (Mon/Thu) · Prolactinoma','Atorvastatin 20mg PO daily · Hyperlipidemia','Aspirin 81mg PO daily · Cardiovascular risk reduction','Calcium carbonate 500mg + Vit D3 2000IU daily · Osteopenia','Pantoprazole 20mg PO daily · GI prophylaxis','Melatonin 3mg PO QHS · Insomnia'],
    history:'67-year-old retired high school teacher with pituitary macroadenoma (prolactinoma) initially discovered February 2024 during workup for new-onset morning headaches. Mass measured 1.2 cm at diagnosis, grew slowly to 1.4 cm by August 2025 — cabergoline dose increased from 0.25 mg to 0.5 mg twice weekly. Prolactin has normalized (most recent 14 ng/mL). Visual field testing remains normal. Under active surveillance with MRI every 4 months.',
    pmh:['Prolactin-secreting pituitary macroadenoma (dx 2024-02, 1.4 cm, stable on cabergoline)','Hyperlipidemia (dx 2010)','Osteopenia (dx 2022, DEXA T-score -1.8)','Chronic insomnia (since 2020, post-retirement)','Upper GI bleed from NSAID use (2018, resolved)'],
    surgicalHistory:['None (conservative management of adenoma)'],
    familyHistory:['Father — Ischemic stroke (deceased age 72)','Mother — Alzheimer\'s disease (deceased age 84)','Brother (age 70) — Living, Type 2 DM','2 daughters (ages 38, 42) — Living, healthy'],
    socialHistory:{ smoking:'Never', alcohol:'2–3 drinks/week (wine with dinner)', occupation:'Retired high school teacher (math, 35 years)', activity:'Daily 30-minute walks, weekly swimming' },
    immunizations:'Up to date. Influenza 2025 (Fluzone HD), Pneumovax 23 (2020), Prevnar 13 (2019), Shingrix 2022, COVID bivalent 2024.',
    problemList:[{ code:'D35.2', label:'Benign neoplasm of pituitary gland' },{ code:'E22.1', label:'Hyperprolactinemia' },{ code:'E78.5', label:'Hyperlipidemia, unspecified' },{ code:'M85.80', label:'Other specified disorders of bone density (osteopenia)' },{ code:'G47.00', label:'Insomnia, unspecified' }],
    plan:'Continue cabergoline 0.5 mg 2x/week — prolactin well controlled. Today\'s MRI shows stable adenoma at 1.4 cm, no interval growth. Visual field testing in 6 months. Next pituitary-protocol MRI 2026-08-16. DEXA scan due — refer to bone health. Consider sleep study if insomnia persists. Patient counselled on importance of medication compliance. No acute concerns.',
    radiologyReport:{ technique:'MRI pituitary dedicated protocol with and without IV gadolinium. Thin-slice (2 mm) sagittal and coronal T1 pre- and post-contrast, dynamic post-contrast sequences, T2 coronal.', findings:'Pituitary macroadenoma in sella turcica measures 1.4 × 1.2 × 1.1 cm (unchanged from 2025-12-10). No extension into suprasellar cistern. Optic chiasm well visualized, not compressed. Cavernous sinuses free of invasion. Pituitary stalk midline. No new enhancing lesion. Remainder of brain unremarkable.', impression:'Stable pituitary macroadenoma consistent with treated prolactinoma on cabergoline therapy. No interval growth. No mass effect on optic apparatus.', comparison:'Compared with MRI pituitary protocol 2025-12-10, 2025-08-03, 2025-02-15, and 2024-02-08 (baseline). Adenoma stable at 1.4 cm across 3 consecutive studies.' },
    referrals:[{ to:'Bone Health Clinic', reason:'DEXA scan follow-up for osteopenia surveillance', urgency:'Routine', status:'Ordered' },{ to:'Ophthalmology', reason:'Formal visual field testing (Humphrey 24-2) in 6 months', urgency:'Routine', status:'Scheduled 2026-10' }],
    prescribedToday:['Continue cabergoline 0.5 mg PO twice weekly (Mon/Thu) — no change','Continue atorvastatin 20 mg daily, aspirin 81 mg daily, calcium + vitamin D, pantoprazole 20 mg daily (no changes)','Consider short-term melatonin trial discontinuation — reassess insomnia at next visit','Advise avoidance of all NSAIDs given prior GI bleed'],
    patientEducation:'Reassured — adenoma stable and prolactin within normal range. Importance of medication compliance re-emphasized (missed doses can cause rapid rebound). Discussed long-term surveillance plan. Daughter (Catherine) present. Written visit summary provided. Patient verbalized understanding of treatment rationale.',
    labs:[
      { panel:'Hormone panel', date:'2026-04-14', values:[{ name:'Prolactin', value:'14', unit:'ng/mL', range:'2–18', flag:'normal' },{ name:'TSH', value:'1.8', unit:'mIU/L', range:'0.4–4.0', flag:'normal' },{ name:'Free T4', value:'14.2', unit:'pmol/L', range:'9.0–19.0', flag:'normal' },{ name:'LH', value:'5.2', unit:'IU/L', range:'1.7–8.6', flag:'normal' },{ name:'Testosterone total', value:'18.4', unit:'nmol/L', range:'8.6–29.0', flag:'normal' }] },
      { panel:'Lipid panel (fasting)', date:'2026-04-14', values:[{ name:'Total cholesterol', value:'4.6', unit:'mmol/L', range:'<5.2', flag:'normal' },{ name:'LDL-C', value:'2.4', unit:'mmol/L', range:'<3.5', flag:'normal' },{ name:'HDL-C', value:'1.3', unit:'mmol/L', range:'>1.0', flag:'normal' }] },
    ],
    radiologist:'Dr. M. Chen · Neuroradiology',
    nextImaging:'Next pituitary-protocol MRI on 2026-08-16 (4-month surveillance interval).',
    scanHistory:[
      { date:'2026-04-16', type:'MRI Pituitary Protocol — IllumaDX AI', result:'PITUITARY — 91.6% (IllumaDX)', provider:'IllumaDX AI System', notes:'IllumaDX AI analysis with GradCAM++ interpretability. Adenoma stable at 1.4cm, no interval growth since prior study.' },
      { date:'2025-12-10', type:'MRI Pituitary Protocol', result:'Pituitary adenoma — stable, no growth', provider:'Dr. A. Singh', notes:'Surveillance imaging. Stable at 1.4cm. Continuing current dose.' },
      { date:'2025-08-03', type:'MRI Pituitary Protocol', result:'Pituitary adenoma — mild enlargement 1.2→1.4cm', provider:'Dr. A. Singh', notes:'Growth noted. Cabergoline dose increased from 0.25mg to 0.5mg 2x/week.' },
      { date:'2025-02-15', type:'MRI Brain + Contrast', result:'Pituitary adenoma — macroadenoma 1.2cm', provider:'Dr. M. Wong', notes:'Baseline annual surveillance. Adenoma stable from initial diagnosis.' },
      { date:'2024-02-08', type:'MRI Brain + Contrast', result:'Pituitary adenoma — initial detection', provider:'Dr. M. Wong', notes:'Incidental finding during headache workup. 1.2cm macroadenoma, prolactin elevated at 187 ng/mL. Endocrine consult, cabergoline initiated.' },
    ],
    latestResult:{ prediction:'pituitary', confidence:0.9156, probabilities:{ glioma:0.031, meningioma:0.028, notumor:0.025, pituitary:0.9156 }, heatmap_b:null, heatmap_d:null, heatmap_consensus:null },
  },
  {
    id:'AHS-10157', name:'Priya Nair', age:29, dob:'1996-07-18', sex:'Female', bloodType:'AB+',
    ahcip:'61284-9037', primaryCare:'Dr. R. Iyer · South Edmonton Family Practice',
    physician:'Dr. R. Patel', facility:'Northern Lights Regional Hospital', dept:'Emergency Neurology',
    scanDate:'2026-04-17', admitDate:'2026-04-17',
    status:'Awaiting Analysis', statusColor:'#FFB703',
    emergencyContact:{ name:'Rohan Nair', rel:'Husband', phone:'780-555-0635' },
    presentingComplaint:'Emergency presentation. Sudden-onset severe right-sided headache at 14:30 described as "worst ever," followed by witnessed generalized tonic-clonic seizure in ER at 15:45 (duration ~90 s). Post-ictal confusion resolving. Transient left-sided weakness noted pre-seizure, now resolved. GCS 14 on arrival, now 15.',
    vitals:{ bp:'128/74', hr:'88', temp:'37.1', o2:'99', weight:'58', height:'164', gcs:'15', ts:'2026-04-17 17:10' },
    allergies:['No known drug allergies','No known food allergies'],
    medications:['Levetiracetam 1000mg IV loading → 500mg PO BID ongoing · Seizure management','Acetaminophen 500mg PO PRN · Pain','IV normal saline maintenance · Hydration'],
    history:'29-year-old previously healthy woman, G0P0, presenting via ambulance with acute-onset severe headache and witnessed tonic-clonic seizure in the ER. No prior seizure or neurological history. No recent head trauma, no illicit drugs, no family history of epilepsy. Post-ictal for ~20 minutes, now fully oriented. Neurological exam non-focal. CT head on arrival showed possible right temporal hyperdensity — urgent MRI ordered with neurosurgery on standby.',
    pmh:['No significant past medical history','Childhood varicella (uncomplicated)','No prior surgeries'],
    surgicalHistory:['Wisdom teeth extraction (2015) — uncomplicated'],
    familyHistory:['Father (age 62) — Type 2 DM','Mother (age 58) — Living, healthy','No family history of seizure disorder, stroke, or CNS malignancy','Maternal grandmother — Hypertension'],
    socialHistory:{ smoking:'Never', alcohol:'Occasional wine (~2 drinks/month)', occupation:'Senior software engineer, tech startup', activity:'Regular — runs 3x/week, yoga weekly' },
    immunizations:'Up to date per adult schedule. Influenza 2025, Tdap 2020, HPV complete, COVID bivalent 2024. MMR documented.',
    problemList:[{ code:'G40.909', label:'Epilepsy, unspecified, not intractable, without status epilepticus' },{ code:'R51.9', label:'Headache, unspecified' },{ code:'R56.9', label:'Unspecified convulsions' },{ code:'R29.818', label:'Other symptoms involving nervous system' }],
    plan:'Admit to neurology observation ward. Urgent MRI brain + contrast ordered. Continuous cardiac and neuro monitoring x 24 h. EEG scheduled within 24 h. Levetiracetam 500 mg PO BID ongoing — monitor for efficacy and side effects. If mass confirmed on MRI, stat neuro-oncology referral and neurosurgery consult. Safety precautions: no driving, no swimming alone, no operating heavy machinery until seizure-free 6 months. Patient and husband counselled re: seizure precautions and red-flag symptoms.',
    radiologyReport:{ technique:'Emergency CT head non-contrast completed 2026-04-17 at 15:05. MRI brain + contrast with tumor protocol ordered STAT; acquisition pending.', findings:'Emergency CT reviewed: hyperdense focus in right temporal lobe, ~1.8 cm, representing either a mass or subacute hemorrhage. Surrounding vasogenic edema mild. No midline shift or hydrocephalus. MRI pending for definitive tissue characterization and contrast enhancement pattern.', impression:'Right temporal intracranial lesion of indeterminate etiology. Urgent MRI with contrast required for characterization. High clinical suspicion for intracranial mass given post-ictal presentation.', comparison:'No prior cross-sectional imaging available for comparison — this is the baseline study.' },
    referrals:[{ to:'Neurosurgery', reason:'Urgent consult for right temporal lesion', urgency:'STAT', status:'Paged — en route' },{ to:'Neuro-Oncology', reason:'Multidisciplinary review pending tissue diagnosis', urgency:'Pending imaging', status:'On notice' },{ to:'Epileptology', reason:'EEG and long-term seizure management', urgency:'Within 24 h', status:'Ordered' }],
    prescribedToday:['Levetiracetam 1000 mg IV loading dose (administered in ER) → transition to 500 mg PO BID','Acetaminophen 500 mg PO Q6H PRN for pain','Dexamethasone 10 mg IV × 1 if vasogenic edema confirmed on MRI','Ondansetron 4 mg IV/PO Q8H PRN for nausea','Continuous cardiac and neurological monitoring × 24 h'],
    patientEducation:'Seizure precautions reviewed with patient and husband: no driving until cleared (minimum 6 months seizure-free per Alberta Transportation regulations), no swimming alone, no operating heavy machinery, avoid alcohol and sleep deprivation, ensure medication compliance. Emergency return criteria explained. Written seizure action plan provided. Patient overwhelmed but engaged; counselling support offered.',
    labs:[
      { panel:'CBC', date:'2026-04-17', values:[{ name:'Hemoglobin', value:'134', unit:'g/L', range:'120–160', flag:'normal' },{ name:'WBC', value:'8.9', unit:'×10⁹/L', range:'4.0–11.0', flag:'normal' },{ name:'Platelets', value:'267', unit:'×10⁹/L', range:'150–400', flag:'normal' }] },
      { panel:'Chemistry + β-hCG + Toxicology', date:'2026-04-17', values:[{ name:'Sodium', value:'140', unit:'mmol/L', range:'135–145', flag:'normal' },{ name:'Glucose', value:'5.4', unit:'mmol/L', range:'3.9–5.6', flag:'normal' },{ name:'Creatinine', value:'64', unit:'µmol/L', range:'45–90', flag:'normal' },{ name:'β-hCG (serum)', value:'<1', unit:'IU/L', range:'<5 (non-pregnant)', flag:'normal' },{ name:'Toxicology screen', value:'Negative', unit:'—', range:'—', flag:'normal' }] },
    ],
    radiologist:'Pending — Dr. M. Chen (on-call neuroradiology)',
    nextImaging:'Follow-up MRI with contrast in 48–72 h post-op if surgical resection proceeds; otherwise per neurosurgery recommendation.',
    scanHistory:[
      { date:'2026-04-17', type:'CT Head (Emergency)', result:'Hyperdense lesion right temporal — MRI urgent', provider:'Dr. R. Patel', notes:'Emergency CT post-seizure. Possible mass effect. MRI stat. Neurosurgery on standby.' },
    ],
    latestResult:null,
  },
  {
    id:'AHS-10201', name:'Marc Bouchard', age:45, dob:'1980-02-28', sex:'Male', bloodType:'O-',
    ahcip:'44720-1893', primaryCare:'Dr. J. Tremblay · Mill Woods Family Medicine',
    physician:'Dr. L. Chen', facility:'Northern Lights Regional Hospital', dept:'Neurology',
    scanDate:'2026-04-18', admitDate:'2022-04-10',
    status:'Scan Complete', statusColor:'#10B981',
    emergencyContact:{ name:'Claire Bouchard', rel:'Wife', phone:'780-555-0921' },
    presentingComplaint:'Annual surveillance MRI for strong family history of glial tumors (mother GBM, maternal uncle astrocytoma). Patient remains asymptomatic — no headaches, no seizures, no focal deficits. Enrolled in the Northern Lights Regional Familial CNS Malignancy Registry.',
    vitals:{ bp:'118/72', hr:'62', temp:'36.6', o2:'99', weight:'74', height:'179', gcs:'15', ts:'2026-04-18 09:30' },
    allergies:['Iodinated contrast — mild (flushing, mild urticaria in 2023; now premedicates with methylprednisolone + diphenhydramine)'],
    medications:['Methylprednisolone 32mg PO x 3 doses (13 h, 7 h, 1 h pre-contrast) · Contrast reaction prophylaxis','Diphenhydramine 50mg PO 1 h pre-contrast · Contrast reaction prophylaxis','Vitamin D3 2000IU PO daily','Loratadine 10mg PO PRN · Seasonal allergies'],
    history:'45-year-old software engineer, asymptomatic, enrolled in family cancer surveillance program since 2022 following the death of his mother from glioblastoma multiforme at age 58. Maternal uncle also died of astrocytoma at age 62. Genetic testing completed 2023 — no germline TP53 mutation, Li-Fraumeni ruled out. Continues annual MRI surveillance. Married, one child (age 8), financially stable, active lifestyle.',
    pmh:['No significant personal medical history','Mild contrast media hypersensitivity (premedication protocol in place)','Seasonal allergic rhinitis (mild, intermittent)','Annual surveillance for familial CNS malignancy risk'],
    surgicalHistory:['None'],
    familyHistory:['Mother — Glioblastoma multiforme (deceased 2022, age 58) ★★★','Maternal uncle — Astrocytoma WHO III (deceased 2019, age 62)','Maternal grandmother — Breast cancer (survived, deceased age 81 unrelated)','Father (age 72) — Living, hypertension','Son (age 8) — Healthy'],
    socialHistory:{ smoking:'Never', alcohol:'Rare — ~1 drink/month', occupation:'Senior software engineer, fully remote', activity:'Excellent — runs 3x/week 5–10 km, weekly meditation' },
    immunizations:'Up to date. Influenza 2025, Tdap 2023, COVID bivalent 2024. No travel-related vaccines needed.',
    problemList:[{ code:'Z80.8', label:'Family hx of malignant neoplasm of CNS (strong)' },{ code:'Z15.81', label:'Genetic susceptibility to multiple endocrine neoplasia' },{ code:'Z01.89', label:'Encounter for other specified special examinations' },{ code:'Z88.8', label:'Allergy status to other drugs (iodinated contrast)' }],
    plan:'Today\'s surveillance MRI reviewed — no tumor detected. Continue annual surveillance protocol. Next MRI scheduled 2027-04. Maintain enrolment in Familial CNS Malignancy Registry. Continue contrast premedication for all future contrast-enhanced imaging. Genetic counselling follow-up optional (no actionable finding). Patient reassured — no acute concerns. Encourage continued healthy lifestyle.',
    radiologyReport:{ technique:'MRI brain with and without IV gadolinium (patient premedicated per contrast reaction protocol). Standard tumor screening protocol at 3.0 T: axial T1, T2, FLAIR, DWI, post-contrast 3D T1 MPRAGE.', findings:'Brain parenchyma shows normal signal intensity throughout. Gray-white matter differentiation preserved. No focal signal abnormality, mass, or abnormal enhancement. Ventricular system normal in size and configuration. Midline structures intact. No evidence of acute infarct, hemorrhage, or mass lesion.', impression:'Normal brain MRI. No evidence of intracranial mass or other abnormality. No interval change from prior surveillance studies.', comparison:'Compared with annual surveillance MRIs from 2025-04-10, 2024-04-08, and 2023-04-14 — all normal and stable.' },
    referrals:[{ to:'Genetic Counselling', reason:'Optional discussion of ongoing familial risk and TP53 testing options', urgency:'Routine', status:'Patient may self-refer' },{ to:'Familial CNS Malignancy Registry', reason:'Annual registry re-enrolment and data update', urgency:'Routine', status:'Active' }],
    prescribedToday:['No medication changes today','Continue contrast premedication protocol (methylprednisolone 32 mg × 3 doses at 13 h, 7 h, and 1 h pre-contrast; diphenhydramine 50 mg 1 h pre-contrast) for all future IV contrast studies','Continue vitamin D3 2000 IU daily','Continue loratadine 10 mg PRN for seasonal allergies'],
    patientEducation:'Excellent result — no tumor detected. Reassured regarding ongoing surveillance protocol. Reviewed signs and symptoms that would warrant earlier re-evaluation: persistent or worsening headache, new focal neurological deficit, seizure activity, progressive cognitive change, visual disturbance. Encouraged continued healthy lifestyle. Wife (Claire) present. Written summary provided.',
    radiologist:'Dr. M. Chen · Neuroradiology',
    nextImaging:'Next annual surveillance MRI in April 2027 (12-month interval).',
    scanHistory:[
      { date:'2026-04-18', type:'MRI Brain + Contrast — IllumaDX AI', result:'NO TUMOR — 94.2% (IllumaDX)', provider:'IllumaDX AI System', notes:'IllumaDX AI analysis with GradCAM++ interpretability. No abnormal findings — brain parenchyma appears normal bilaterally.' },
      { date:'2025-04-10', type:'MRI Brain + Contrast', result:'No abnormality detected', provider:'Dr. L. Chen', notes:'Annual surveillance. Stable, no new findings.' },
      { date:'2024-04-08', type:'MRI Brain + Contrast', result:'No abnormality detected', provider:'Dr. L. Chen', notes:'Annual surveillance. Normal.' },
      { date:'2023-04-14', type:'MRI Brain', result:'No abnormality detected', provider:'Dr. M. Wong', notes:'First surveillance scan after maternal diagnosis.' },
    ],
    latestResult:{ prediction:'notumor', confidence:0.9421, probabilities:{ glioma:0.021, meningioma:0.018, notumor:0.9421, pituitary:0.019 }, heatmap_b:null, heatmap_d:null, heatmap_consensus:null },
  },
  {
    id:'AHS-10289', name:'Elena Vasquez', age:72, dob:'1953-06-14', sex:'Female', bloodType:'A+',
    ahcip:'51783-2984', primaryCare:'Dr. M. Wong · Mill Creek Family Clinic',
    physician:'Dr. L. Chen', facility:'Northern Lights Regional Hospital', dept:'Neuro-Oncology',
    scanDate:'2026-04-19', admitDate:'2025-08-18',
    status:'Scan Complete', statusColor:'#E63946',
    emergencyContact:{ name:'Maria Vasquez', rel:'Daughter', phone:'780-555-0273' },
    presentingComplaint:'Bi-monthly surveillance MRI during adjuvant temozolomide (cycle 7 of 12) for GBM post-resection. Reports increased fatigue and intermittent mild left-hand tremor over the past 2 weeks. No new seizures, no worsening headache. Appetite reduced.',
    vitals:{ bp:'132/78', hr:'72', temp:'36.8', o2:'97', weight:'58', height:'162', gcs:'15', ts:'2026-04-19 09:15' },
    allergies:['Carbamazepine — moderate (diffuse rash with fever, 2022)','IV contrast agents — mild (flushing, premedicate)','Adhesive tape — contact dermatitis'],
    medications:['Temozolomide 150mg/m² PO · Cycle 7 of 12, days 1–5 of 28-day cycle','Dexamethasone 2mg PO BID · Tapering from 4mg','Levetiracetam 500mg PO BID · Seizure prophylaxis','Ondansetron 8mg PO Q8H PRN · Chemo-induced nausea','Levothyroxine 75mcg PO daily · Primary hypothyroidism','Calcium carbonate 500mg + Vit D3 1000IU daily · Osteopenia','Gabapentin 300mg PO TID · Peripheral neuropathy','Acetaminophen 500mg PO Q6H PRN · Pain'],
    history:'72-year-old retired registered nurse, widowed, diagnosed with GBM WHO Grade IV, IDH-wildtype, MGMT methylated, August 2025 following a 3-week history of progressive right-hand weakness and expressive aphasia. Underwent left frontotemporal craniotomy with gross total resection September 2025. Completed concurrent chemoradiation (60 Gy radiotherapy + daily temozolomide) December 2025. Currently on adjuvant temozolomide cycle 7 of planned 12. Tolerating treatment with expected myelosuppression and fatigue. Residual enhancement at cavity margin monitored every 2 months.',
    pmh:['Glioblastoma multiforme WHO IV, IDH-wildtype, MGMT methylated (dx 2025-08)','Primary hypothyroidism (dx 2005, well-controlled on levothyroxine)','Bilateral knee osteoarthritis (dx 2015)','Hyperlipidemia (dx 2010)','Osteopenia (dx 2018, DEXA T-score -1.6)','Chemo-induced peripheral neuropathy (dx 2026-01)'],
    surgicalHistory:['Left frontotemporal craniotomy + GBM gross total resection (2025-09-15, Dr. L. Chen)','Right knee arthroscopy (2018)','Laparoscopic cholecystectomy (1998)','Total abdominal hysterectomy (1992, benign fibroids)'],
    familyHistory:['Sister (age 75) — Breast cancer Stage IIa (survived, remission 2019)','Mother — Alzheimer\'s disease (deceased 2012, age 84)','Father — Myocardial infarction (deceased 2008, age 81)','2 daughters (ages 44, 47) — Living, healthy','4 grandchildren — Healthy'],
    socialHistory:{ smoking:'Former — quit 1988, 10 pack-year history', alcohol:'Rare — holidays only', occupation:'Retired registered nurse (40 years, NICU)', activity:'Limited — short walks with daughter assist, chair yoga' },
    immunizations:'Up to date. Influenza 2025 (Fluad HD), COVID bivalent Q1 2025, Shingrix 2021 (2-dose), Pneumovax 23 (2019), Prevnar 13 (2018), Tdap 2022.',
    problemList:[{ code:'C71.1', label:'Malignant neoplasm of frontal lobe (GBM)' },{ code:'Z51.11', label:'Encounter for antineoplastic chemotherapy' },{ code:'E03.9', label:'Hypothyroidism, unspecified' },{ code:'G62.0', label:'Drug-induced polyneuropathy (chemotherapy)' },{ code:'M17.9', label:'Osteoarthritis of knee, bilateral' },{ code:'E78.5', label:'Hyperlipidemia, unspecified' }],
    plan:'Continue temozolomide cycle 7 of 12 on schedule if counts permit (CBC due tomorrow). Today\'s MRI reviewed — residual enhancement stable at cavity margin, no new lesions. Continue dexamethasone taper to 1 mg BID over next 4 weeks. Next surveillance MRI 2026-06-19. Neuro-oncology follow-up 2026-05-03. Increase gabapentin to 400 mg TID for worsening neuropathy. PT referral for left-side strength and balance. Social work consult for family support. Offer palliative care consultation for symptom management. Patient and daughter counselled — goals of care discussion scheduled.',
    radiologyReport:{ technique:'MRI brain with and without IV gadolinium. Neuro-oncology follow-up protocol at 3.0 T: axial T1, T2, FLAIR, DWI, perfusion-weighted imaging, post-contrast 3D T1 MPRAGE, coronal post-contrast T1.', findings:'Left frontotemporal post-surgical changes with resection cavity measuring 3.8 × 2.9 cm (unchanged from prior study). Thin enhancement at cavity margin measures up to 7 mm (stable; previously 8 mm in February 2026 — within measurement variability and consistent with expected post-treatment granulation). No new enhancing focus. Mild T2/FLAIR hyperintensity surrounding the cavity is stable and consistent with post-treatment effect. No restricted diffusion suggestive of new infarct. Mild mass effect; no significant midline shift. Ventricles asymmetric as before due to resection. No hydrocephalus.', impression:'Stable post-resection GBM with unchanged cavity margin enhancement. No evidence of progression or new lesion. Continued apparent response to adjuvant temozolomide.', comparison:'Compared with MRI 2026-02-22, 2025-12-10 (post-chemoradiation baseline), 2025-11-01 (mid-RT), and 2025-09-20 (immediate post-op). Margin enhancement stable across 3 consecutive studies.' },
    referrals:[{ to:'Palliative Care', reason:'Symptom management consultation — fatigue, neuropathy, goals of care discussion', urgency:'Routine', status:'Ordered' },{ to:'Physical Therapy', reason:'Left-side strength and balance rehabilitation', urgency:'Routine', status:'Ordered' },{ to:'Social Work', reason:'Family support, discharge planning, advance care planning', urgency:'Routine', status:'Ordered' },{ to:'Neuro-Oncology (tumor board)', reason:'Scheduled follow-up and cycle 7 review', urgency:'Scheduled', status:'Confirmed 2026-05-03' }],
    prescribedToday:['Continue temozolomide 150 mg/m² PO daily (cycle 7 of 12, days 1–5 of 28-day cycle) — pending ANC ≥ 1.5 on CBC 2026-04-20','Dexamethasone taper continued: 2 mg BID → 1 mg BID over the next 4 weeks, then reassess','Gabapentin increased from 300 mg TID to 400 mg TID for worsening chemo-induced peripheral neuropathy','Continue levetiracetam 500 mg BID, levothyroxine 75 mcg daily, calcium + vitamin D (no changes)','Ondansetron 8 mg PO Q8H PRN — scheduled before each TMZ dose','Consider Pneumocystis jirovecii prophylaxis (TMP-SMX) if lymphopenia persists'],
    patientEducation:'Reviewed MRI results with patient and daughter — good news, disease remains stable. Discussed TMZ cycle timing and critical importance of CBC monitoring prior to each cycle (ANC must be ≥ 1.5). Goals-of-care discussion formally introduced and scheduled with family and palliative care for 2026-05-03. Reviewed red-flag symptoms (new seizure, worsening weakness, severe headache, fever > 38°C) and when to seek urgent care. Patient and daughter verbalized understanding. Written care plan provided.',
    labs:[
      { panel:'CBC with differential', date:'2026-04-18', values:[{ name:'Hemoglobin', value:'108', unit:'g/L', range:'120–160', flag:'low' },{ name:'WBC', value:'3.1', unit:'×10⁹/L', range:'4.0–11.0', flag:'low' },{ name:'ANC', value:'1.4', unit:'×10⁹/L', range:'>1.5 for chemo', flag:'low' },{ name:'Platelets', value:'142', unit:'×10⁹/L', range:'150–400', flag:'low' }] },
      { panel:'Chemistry + LFTs + TSH', date:'2026-04-18', values:[{ name:'Creatinine', value:'71', unit:'µmol/L', range:'45–90', flag:'normal' },{ name:'ALT', value:'28', unit:'U/L', range:'<35', flag:'normal' },{ name:'AST', value:'24', unit:'U/L', range:'<35', flag:'normal' },{ name:'TSH', value:'2.4', unit:'mIU/L', range:'0.4–4.0', flag:'normal' },{ name:'Sodium', value:'137', unit:'mmol/L', range:'135–145', flag:'normal' },{ name:'Glucose', value:'6.1', unit:'mmol/L', range:'3.9–5.6', flag:'high (steroid effect)' }] },
      { panel:'Tumor molecular profile', date:'2025-09-22', values:[{ name:'IDH status', value:'Wildtype', unit:'—', range:'—', flag:'reference' },{ name:'MGMT promoter', value:'Methylated', unit:'—', range:'—', flag:'favorable' },{ name:'1p/19q codeletion', value:'Not codeleted', unit:'—', range:'—', flag:'reference' },{ name:'ATRX', value:'Retained', unit:'—', range:'—', flag:'reference' }] },
    ],
    radiologist:'Dr. M. Chen · Neuroradiology',
    nextImaging:'Bi-monthly surveillance MRI — next scan on 2026-06-19.',
    scanHistory:[
      { date:'2026-04-19', type:'MRI Brain + Contrast — IllumaDX AI', result:'GLIOMA — 76.4% (IllumaDX)', provider:'IllumaDX AI System', notes:'IllumaDX AI analysis with GradCAM++ interpretability. Residual enhancement in left frontal lobe stable compared to prior. No new lesions detected.' },
      { date:'2026-02-22', type:'MRI Brain + Contrast', result:'GBM — stable residual enhancement', provider:'Dr. L. Chen', notes:'Post-resection cavity stable. TMZ cycle 5 tolerated. Continuing surveillance.' },
      { date:'2025-12-10', type:'MRI Brain + Contrast', result:'GBM — post-chemoradiation baseline', provider:'Dr. L. Chen', notes:'End of concurrent phase. Residual enhancement 0.8cm at cavity margin. Starting adjuvant TMZ.' },
      { date:'2025-11-01', type:'MRI Brain + Contrast', result:'GBM — mid-radiotherapy', provider:'Dr. L. Chen', notes:'Pseudoprogression vs true progression — TMZ continued per protocol.' },
      { date:'2025-09-20', type:'Post-op MRI', result:'GBM — gross total resection confirmed', provider:'Dr. L. Chen', notes:'Successful GTR. <5% residual enhancement. Planning adjuvant chemoradiation start 2025-10-01.' },
      { date:'2025-08-18', type:'MRI Brain + Contrast', result:'GBM — initial diagnosis, left frontal', provider:'Dr. R. Patel', notes:'4.2cm enhancing mass with central necrosis in left frontal lobe. Urgent neurosurgery consult.' },
    ],
    latestResult:{ prediction:'glioma', confidence:0.7643, probabilities:{ glioma:0.7643, meningioma:0.12, notumor:0.04, pituitary:0.0757 }, heatmap_b:null, heatmap_d:null, heatmap_consensus:null },
  },
  {
    id:'AHS-10334', name:'Ahmed Hassan', age:19, dob:'2006-11-22', sex:'Male', bloodType:'O+',
    ahcip:'72914-3306', primaryCare:'Dr. S. Naseri · U of A Student Health',
    physician:'Dr. A. Singh', facility:'Northern Lights Regional Hospital', dept:'Endocrinology',
    scanDate:'2026-04-15', admitDate:'2026-03-02',
    status:'Awaiting Analysis', statusColor:'#FFB703',
    emergencyContact:{ name:'Fatima Hassan', rel:'Mother', phone:'780-555-0462' },
    presentingComplaint:'19-year-old male university student, initial MRI for suspected prolactinoma. Six-month history of progressive fatigue, gynecomastia, decreased libido, and mild bitemporal visual field reduction on formal testing. Prolactin 142 ng/mL (markedly elevated). MRI acquired today — awaiting IllumaDX AI analysis and radiologist review.',
    vitals:{ bp:'116/70', hr:'64', temp:'36.5', o2:'99', weight:'72', height:'178', gcs:'15', ts:'2026-04-15 14:20' },
    allergies:['No known drug allergies','No known food allergies'],
    medications:['Cabergoline 0.25mg PO twice weekly (Tue/Fri) · Prolactinoma, started 2026-03-05','Multivitamin daily','No other medications'],
    history:'Previously healthy 19-year-old male university engineering student, presented to GP with 6-month history of progressive fatigue, new gynecomastia, and decreased libido. GP ordered hormone panel which showed markedly elevated prolactin (142 ng/mL, normal <15). Formal visual field testing revealed mild bitemporal hemianopia. Urgent MRI pituitary protocol ordered. Started on low-dose cabergoline. Lives in university residence, family in Calgary.',
    pmh:['Prolactinoma (pituitary microadenoma, dx 2026-03)','Mild myopia (glasses since age 14)','Childhood asthma (outgrown, no current symptoms)','No other significant history'],
    surgicalHistory:['None'],
    familyHistory:['Mother — Hashimoto\'s thyroiditis (on levothyroxine)','Father — Type 2 DM (age 52)','Sister (age 16) — Healthy','No family history of pituitary disease or MEN syndromes','Maternal grandmother — Hypertension'],
    socialHistory:{ smoking:'Never', alcohol:'None (religious observance)', occupation:'Full-time engineering student, part-time tutor', activity:'Moderate — gym 2x/week, cricket weekly' },
    immunizations:'Up to date per adolescent schedule. Influenza 2025, HPV complete, Tdap 2020, MenACWY 2019, COVID bivalent 2024.',
    problemList:[{ code:'D35.2', label:'Benign neoplasm of pituitary gland (microadenoma)' },{ code:'E22.1', label:'Hyperprolactinemia' },{ code:'N60.89', label:'Gynecomastia' },{ code:'H53.46', label:'Homonymous bilateral visual field defects' }],
    plan:'Today\'s MRI confirms pituitary microadenoma consistent with prolactinoma. Continue cabergoline 0.25 mg twice weekly — repeat prolactin in 3 weeks to assess response. If inadequate suppression, increase to 0.5 mg twice weekly. Endocrinology follow-up 2026-05-13. Repeat MRI in 6 months. Formal visual field testing in 3 months to monitor for improvement. Patient reassured — prolactinomas generally respond well to medical therapy, surgery rarely needed. Counselled on side effects (nausea, dizziness, rare impulse control issues). Fertility counselling offered for future reference.',
    radiologyReport:{ technique:'MRI pituitary dedicated protocol with and without IV gadolinium. Thin-slice (2 mm) sagittal and coronal T1 pre- and post-contrast, dynamic post-contrast sequences.', findings:'MRI pituitary protocol acquired 2026-04-15. Image quality diagnostic. Study pending full radiologist interpretation and IllumaDX AI preliminary analysis.', impression:'Radiologist read pending. Clinical correlation with elevated prolactin (142 ng/mL) and bitemporal hemianopia strongly supports the working diagnosis of prolactinoma.', comparison:'No prior MRI available for comparison — this is the baseline imaging study.' },
    referrals:[{ to:'Endocrinology', reason:'Ongoing hormone management and cabergoline titration', urgency:'Routine', status:'Scheduled 2026-05-13' },{ to:'Ophthalmology', reason:'Formal visual field testing baseline (Humphrey 24-2)', urgency:'Within 2 weeks', status:'Ordered' }],
    prescribedToday:['Continue cabergoline 0.25 mg PO twice weekly (Tuesday/Friday)','Repeat serum prolactin level in 3 weeks (2026-05-06) to assess medical response','If inadequate response on repeat labs, plan to increase cabergoline to 0.5 mg twice weekly at endocrinology follow-up','Continue daily multivitamin','No other medications indicated at this time'],
    patientEducation:'Patient reassured — prolactinomas generally respond well to dopamine agonist therapy; surgery rarely required. Reviewed cabergoline side effects: nausea, dizziness, postural hypotension, rare impulse-control issues (gambling, hypersexuality). Fertility counselling discussed — preserved fertility is likely with treatment; offered written resources. Mother (Fatima) contacted by phone with patient consent to support treatment planning. Patient expressed concerns about academic performance; reassured symptoms should improve.',
    labs:[
      { panel:'Anterior pituitary hormones', date:'2026-03-28', values:[{ name:'Prolactin', value:'142', unit:'ng/mL', range:'2–18', flag:'high' },{ name:'TSH', value:'2.1', unit:'mIU/L', range:'0.4–4.0', flag:'normal' },{ name:'Free T4', value:'13.8', unit:'pmol/L', range:'9.0–19.0', flag:'normal' },{ name:'LH', value:'3.4', unit:'IU/L', range:'1.7–8.6', flag:'normal' },{ name:'FSH', value:'2.8', unit:'IU/L', range:'1.5–12.4', flag:'normal' },{ name:'Testosterone total', value:'9.1', unit:'nmol/L', range:'8.6–29.0', flag:'low-normal' },{ name:'Cortisol (morning)', value:'384', unit:'nmol/L', range:'140–690', flag:'normal' }] },
    ],
    radiologist:'Pending — Dr. M. Chen (Neuroradiology)',
    nextImaging:'Repeat MRI pituitary protocol in 6 months (target 2026-10-15) to assess medication response.',
    scanHistory:[
      { date:'2026-04-15', type:'MRI Pituitary Protocol (with contrast)', result:'Pending — AI analysis queued', provider:'Dr. A. Singh', notes:'MRI acquired today. Awaiting IllumaDX AI analysis and radiologist interpretation. Clinical context: elevated prolactin 142 ng/mL, mass suspected on formal visual field testing.' },
    ],
    latestResult:null,
  },
  {
    id:'AHS-10402', name:'Isabelle Laurent', age:55, dob:'1970-09-08', sex:'Female', bloodType:'AB-',
    ahcip:'33587-6741', primaryCare:'Dr. J. Beaulieu · Bonnie Doon Medical',
    physician:'Dr. L. Chen', facility:'Northern Lights Regional Hospital', dept:'Neurology',
    scanDate:'2026-04-20', admitDate:'2020-03-11',
    status:'Scan Complete', statusColor:'#10B981',
    emergencyContact:{ name:'Philippe Laurent', rel:'Husband', phone:'780-555-0808' },
    presentingComplaint:'5-year post-resection annual surveillance MRI for WHO Grade I meningioma (left parietal, resected 2020). Patient asymptomatic, reports no new headaches or focal deficits. No new medications since last visit.',
    vitals:{ bp:'122/76', hr:'70', temp:'36.7', o2:'99', weight:'64', height:'168', gcs:'15', ts:'2026-04-20 11:00' },
    allergies:['Bee stings — ANAPHYLAXIS (severe, carries EpiPen at all times, last reaction 2018)','No drug allergies reported'],
    medications:['Rizatriptan 10mg PO PRN · Migraine (uses ~1x/month)','Calcium carbonate 500mg + Vit D3 2000IU PO daily · Osteopenia','Multivitamin daily','EpiPen 0.3mg IM · Anaphylaxis emergency use (carries 2 auto-injectors)'],
    history:'55-year-old librarian, 5-year post-resection of WHO Grade I meningioma (left parietal). Originally presented in February 2020 with new-onset focal seizures and headaches — MRI revealed 3.2 cm left parietal meningioma. Underwent left parietal craniotomy with gross total resection March 2020. No adjuvant therapy required given Grade I pathology. Has remained recurrence-free on annual MRI surveillance for 5 years. Migraine history predates meningioma diagnosis and is unchanged. Married, two adult children.',
    pmh:['Meningioma WHO Grade I, left parietal (dx 2020-02, GTR 2020-03, no recurrence 5 years)','Migraine without aura (since early 20s, ~1–2 episodes/month)','Osteopenia (dx 2022, DEXA T-score -1.9, on calcium/Vit D)','Surgical menopause (post-hysterectomy 2016)'],
    surgicalHistory:['Left parietal craniotomy + meningioma resection (2020-03-11, Dr. L. Chen, gross total)','Total abdominal hysterectomy + bilateral salpingo-oophorectomy (2016, for symptomatic fibroids)','Laparoscopic cholecystectomy (2010)'],
    familyHistory:['Maternal aunt — Breast cancer Stage I (survived, remission 2008)','Mother (age 81) — Living, Type 2 DM, osteoporosis','Father — MI (deceased 2015, age 70)','Brother (age 58) — Living, hypertension','2 children (ages 26, 29) — Living, healthy'],
    socialHistory:{ smoking:'Never', alcohol:'Moderate — 1–2 glasses of wine/week', occupation:'Senior librarian (public library, 22 years)', activity:'Regular — hiking weekly, yoga 2x/week' },
    immunizations:'Up to date. Influenza 2025, Tdap 2023, Shingrix 2023 (2-dose), HPV not indicated (age), COVID bivalent Q1 2024. Anaphylaxis action plan on file.',
    problemList:[{ code:'Z85.841', label:'Personal hx of malignant neoplasm of brain (benign meningioma, surveillance)' },{ code:'G43.909', label:'Migraine, unspecified, not intractable, without status migrainosus' },{ code:'M85.80', label:'Other specified disorders of bone density (osteopenia)' },{ code:'T78.2XXA', label:'Anaphylactic shock, unspecified (insect venom hx)' },{ code:'Z90.722', label:'Acquired absence of other genital organ(s) (post-hysterectomy)' }],
    plan:'Today\'s surveillance MRI shows no evidence of recurrence — meningioma resection remains clean 5 years post-op. Transition from annual to biennial surveillance discussed — next MRI scheduled 2028-04. Continue migraine abortive therapy PRN. Verify EpiPen not expired (next refill due 2026-08). DEXA scan due — refer to bone health clinic. Continue annual physical with PCP. Patient reassured — excellent long-term prognosis. No acute concerns.',
    radiologyReport:{ technique:'MRI brain with and without IV gadolinium. Tumor surveillance protocol at 3.0 T: axial T1, T2, FLAIR, DWI, post-contrast 3D T1 MPRAGE.', findings:'Left parietal post-surgical changes with resection cavity measuring 2.1 × 1.6 cm. Cavity well-demarcated with thin, smooth enhancement along margin consistent with expected post-surgical granulation. No nodular enhancement. No new enhancing lesion elsewhere. Brain parenchyma otherwise unremarkable. Ventricles symmetric. Midline intact.', impression:'Stable 5-year post-resection appearance of WHO Grade I meningioma. No evidence of recurrence. Excellent long-term surgical result.', comparison:'Compared with MRI 2025-04-14, 2024-04-08, 2023-04-12, 2022-04-05, and 2020-03-20 (immediate post-op). Resection cavity stable across all 6 serial studies over 5 years.' },
    referrals:[{ to:'Bone Health Clinic', reason:'DEXA scan for osteopenia monitoring', urgency:'Routine', status:'Ordered' }],
    prescribedToday:['No medication changes today','Continue rizatriptan 10 mg PRN for migraine (use ~1×/month)','Continue calcium carbonate 500 mg + vitamin D3 2000 IU daily','Verify EpiPen expiry and refill — current set expires 2026-08','Continue daily multivitamin'],
    patientEducation:'Excellent 5-year result — no evidence of recurrence. Discussed transition from annual to biennial MRI surveillance given consistent stability. Anaphylaxis action plan reviewed; EpiPen technique demonstrated and confirmed. Discussed signs that would prompt earlier re-evaluation (new seizure, severe headache, focal deficit, vision change). Husband (Philippe) present for visit. Written visit summary provided.',
    labs:[
      { panel:'Routine annual panel', date:'2026-04-14', values:[{ name:'Hemoglobin', value:'136', unit:'g/L', range:'120–160', flag:'normal' },{ name:'WBC', value:'6.1', unit:'×10⁹/L', range:'4.0–11.0', flag:'normal' },{ name:'TSH', value:'1.6', unit:'mIU/L', range:'0.4–4.0', flag:'normal' },{ name:'Total cholesterol', value:'4.8', unit:'mmol/L', range:'<5.2', flag:'normal' },{ name:'Vitamin D 25-OH', value:'78', unit:'nmol/L', range:'75–250', flag:'normal' },{ name:'Creatinine', value:'66', unit:'µmol/L', range:'45–90', flag:'normal' }] },
    ],
    radiologist:'Dr. M. Chen · Neuroradiology',
    nextImaging:'Transitioning from annual to biennial surveillance — next MRI on 2028-04-20.',
    scanHistory:[
      { date:'2026-04-20', type:'MRI Brain + Contrast — IllumaDX AI', result:'NO TUMOR — 96.1% (IllumaDX)', provider:'IllumaDX AI System', notes:'IllumaDX AI analysis with GradCAM++ interpretability. Resection cavity remains stable, no evidence of recurrence. Expected post-surgical changes.' },
      { date:'2025-04-14', type:'MRI Brain + Contrast', result:'Post-resection, no recurrence', provider:'Dr. L. Chen', notes:'Year 4 surveillance. Resection cavity stable. No new findings.' },
      { date:'2024-04-08', type:'MRI Brain + Contrast', result:'Post-resection, no recurrence', provider:'Dr. L. Chen', notes:'Year 3 surveillance. Stable.' },
      { date:'2023-04-12', type:'MRI Brain + Contrast', result:'Post-resection, no recurrence', provider:'Dr. M. Wong', notes:'Year 2 surveillance. Stable.' },
      { date:'2022-04-05', type:'MRI Brain + Contrast', result:'Post-resection, no recurrence', provider:'Dr. M. Wong', notes:'Year 1 surveillance. Stable. Begin annual surveillance protocol.' },
      { date:'2020-03-20', type:'Post-op MRI', result:'Meningioma — gross total resection confirmed', provider:'Dr. L. Chen', notes:'Immediate post-op. Clean resection. WHO Grade I pathology.' },
      { date:'2020-02-15', type:'MRI Brain + Contrast', result:'Meningioma — 3.2cm left parietal', provider:'Dr. R. Patel', notes:'Initial detection following focal seizure. Surgical consult.' },
    ],
    latestResult:{ prediction:'notumor', confidence:0.9612, probabilities:{ glioma:0.013, meningioma:0.018, notumor:0.9612, pituitary:0.0078 }, heatmap_b:null, heatmap_d:null, heatmap_consensus:null },
  },
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
    case 'database': return <svg {...common}><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></svg>
    case 'cpu':      return <svg {...common}><rect x="5" y="5" width="14" height="14" rx="1"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/></svg>
    case 'chart':    return <svg {...common}><path d="M3 3v18h18"/><rect x="7" y="11" width="3" height="7"/><rect x="12" y="7" width="3" height="11"/><rect x="17" y="14" width="3" height="4"/></svg>
    case 'alert':    return <svg {...common}><path d="M12 3L2 20h20L12 3z"/><path d="M12 10v4"/><path d="M12 17h.01"/></svg>
    case 'globe':    return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 3 4 6 4 9s-1.5 6-4 9c-2.5-3-4-6-4-9s1.5-6 4-9z"/></svg>
    case 'zap':      return <svg {...common}><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></svg>
    case 'pill':     return <svg {...common}><path d="M10.5 20.5a5.5 5.5 0 0 0 7.8-7.8l-7.8-7.8a5.5 5.5 0 0 0-7.8 7.8z"/><path d="M8.5 8.5l7 7"/></svg>
    case 'user':     return <svg {...common}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></svg>
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
    let lastFlash = 0

    const onClick = (e) => {
      waves.push({ x: e.clientX, y: e.clientY, r: 0, life: 1, strong: true })
    }
    window.addEventListener('click', onClick, { passive: true })

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
        wv.r += wv.strong ? 3.2 : 1.6
        wv.life -= wv.strong ? 0.018 : 0.01
        if (wv.life <= 0) { waves.splice(i, 1); continue }
        // brighten nodes the wave passes through
        if (wv.strong) {
          for (const layer of layers) {
            for (const n of layer) {
              const dx = n.x - wv.x, dy = n.y - wv.y
              const d = Math.sqrt(dx*dx + dy*dy)
              if (Math.abs(d - wv.r) < 24) n.boost = Math.max(n.boost || 0, wv.life * 0.9)
            }
          }
        }
        ctx.beginPath()
        ctx.arc(wv.x, wv.y, wv.r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(0,180,216,${wv.life * (wv.strong ? 0.55 : 0.28)})`
        ctx.lineWidth = wv.strong ? 1.4 : 0.9
        ctx.stroke()
        if (wv.strong) {
          ctx.beginPath()
          ctx.arc(wv.x, wv.y, wv.r, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(120,230,255,${wv.life * 0.3})`
          ctx.lineWidth = 0.6
          ctx.stroke()
        }
      }

      // Constellation flash — every ~6s brighten a small cluster
      if (!reduced && tt - lastFlash > 6000 && Math.random() > 0.3) {
        const near = layers[2]
        const anchor = near[Math.floor(Math.random() * near.length)]
        const neighbors = near
          .map(n => ({ n, d:(n.x-anchor.x)**2+(n.y-anchor.y)**2 }))
          .sort((a,b) => a.d - b.d)
          .slice(0, 4)
        for (const { n } of neighbors) n.boost = 1
        lastFlash = tt
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
          n.boost = (n.boost || 0) * 0.94
          const base = 0.6 + 0.35 * Math.sin(n.p)
          const pulse = Math.min(1.4, base + n.boost * 0.9)
          ctx.beginPath()
          ctx.arc(n.x + ox, n.y + oy, n.r + n.boost * 1.6, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0,180,216,${Math.min(1, pulse * prop.opacity)})`
          ctx.fill()
          // halo — stronger when boosted; always on near layer
          if (li === 2 || n.boost > 0.15) {
            ctx.beginPath()
            ctx.arc(n.x + ox, n.y + oy, (n.r + n.boost * 2.4) * 2.6, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(0,180,216,${pulse * (0.08 + n.boost * 0.25)})`
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
      window.removeEventListener('click', onClick)
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
      <style>{BASE_CSS + LANDING_CSS + `@keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div style={{ background:'rgba(10,22,40,0.96)', borderBottom:`1px solid ${titleColor}33`, padding:'0 24px', height:'66px', display:'flex', alignItems:'center', justifyContent:'space-between', backdropFilter:'blur(24px) saturate(140%)', WebkitBackdropFilter:'blur(24px) saturate(140%)', flexShrink:0, position:'relative' }}>
        <CornerMark pos="tl" offset={10} color={titleColor} /><CornerMark pos="tr" offset={10} color={titleColor} />
        <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
          <button onClick={onClose} onMouseMove={tintMove} className="cta-ghost" style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', color:'rgba(255,255,255,0.6)', borderRadius:'6px', width:'34px', height:'34px', cursor:'pointer', fontSize:'14px', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'inherit' }}>←</button>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'24px', letterSpacing:'2px', lineHeight:1 }}><span style={{ color:'#fff' }}>Illuma</span><span style={{ color:'#00B4D8' }}>DX</span></div>
          <div style={{ width:'1px', height:'20px', background:'rgba(255,255,255,0.12)' }} />
          <span className="mono" style={{ fontSize:'10px', color:titleColor, letterSpacing:'2.5px', fontWeight:'700', textTransform:'uppercase' }}>{title}</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#10B981', animation:'ripple 2s infinite' }} />
          <span className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.45)', letterSpacing:'2px', textTransform:'uppercase' }}>IllumaDX · CWSF 2026</span>
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
    <div class="footer"><div>IllumaDX · CWSF 2026 Edmonton · illumadx.vercel.app · Arhaan Kureshi · arhaanie09@gmail.com · Fort McMurray AB</div><div>${isFr?'Généré le':'Generated'} ${now.toLocaleDateString('en-CA')}</div></div>
    <script>window.onload=()=>window.print()</script>
    </body></html>`)
    win.document.close()
  }

  const REJ = {
    not_mri: { title:isFr?'PAS UNE IRM CÉRÉBRALE':'NOT A BRAIN MRI',  code:isFr?'ERR · SCAN_INVALIDE':'ERR · NON_BRAIN_SCAN', icon:'brain',  color:'#E63946', desc:isFr?'Cette image n\'a pas été reconnue comme une IRM cérébrale valide. Veuillez téléverser un scan cérébral en niveaux de gris.':'This image was not recognized as a valid brain MRI. Please upload a greyscale brain MRI scan.' },
    invalid: { title:isFr?'CONFIANCE INSUFFISANTE':'LOW CONFIDENCE', code:isFr?'ERR · SEUIL_60%':'ERR · CONF_GATE_<60%',   icon:'shield', color:'#E63946', desc:isFr?'La confiance du modèle est inférieure au seuil de sécurité de 60%.':'Model confidence fell below the 60% safety threshold.' },
    error:   { title:isFr?'ERREUR DE CONNEXION':'CONNECTION ERROR',  code:'ERR · NETWORK',                                icon:'file',   color:'#FFB703', desc:isFr?'Impossible de joindre le serveur d\'inférence. Veuillez réessayer.':'Could not reach the inference server. Please try again.' },
  }

  return (
    <SubPageWrapper onClose={onClose} title={isFr?'Rapport PDF':'PDF Report'} titleColor="#FFB703" lang={lang}>
      <div style={{ maxWidth:'860px', margin:'0 auto', padding:'48px 24px 80px' }}>

        {/* Header */}
        <div style={{ marginBottom:'40px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'20px' }}>
            <span className="mono" style={{ fontSize:'9px', color:'#FFB703', letterSpacing:'2.5px', fontWeight:'700' }}>§ 00</span>
            <span style={{ width:'24px', height:'1px', background:'rgba(255,183,3,0.4)' }} />
            <span className="mono" style={{ fontSize:'10px', color:'#FFB703', letterSpacing:'3px', fontWeight:'700', textTransform:'uppercase' }}>{isFr?'Export Diagnostique':'Diagnostic Export'}</span>
          </div>
          <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(40px,6vw,72px)', color:'#fff', letterSpacing:'2px', lineHeight:'0.95', marginBottom:'18px' }}>
            {isFr?'RAPPORT DIAGNOSTIQUE':'DIAGNOSTIC REPORT'}
          </h1>
          <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.45)', lineHeight:'1.8', maxWidth:'560px', fontWeight:'300' }}>
            {isFr
              ? "Téléversez une IRM cérébrale pour générer un rapport PDF clinique complet avec la prédiction IA, la carte GradCAM++, les benchmarks du modèle et l'avertissement clinique."
              : "Upload a brain MRI scan to generate a complete clinical PDF report with the AI prediction, GradCAM++ heatmap, model benchmarks, and clinical disclaimer."}
          </p>
        </div>

        {/* IDLE — Dropzone */}
        {phase === 'idle' && (<>
          <div
            onDragOver={e=>{e.preventDefault();setDragOver(true)}} onDragLeave={()=>setDragOver(false)}
            onDrop={e=>{e.preventDefault();setDragOver(false);handleFile(e.dataTransfer.files[0])}}
            onClick={()=>fileRef.current.click()}
            onMouseMove={tintMove}
            style={{ position:'relative', border:`1px solid ${dragOver?'#FFB703':'rgba(255,183,3,0.25)'}`, borderRadius:'10px', padding:'72px 24px 60px', textAlign:'center', cursor:'pointer', background:dragOver?'rgba(255,183,3,0.05)':'rgba(255,183,3,0.012)', transition:'all 0.3s cubic-bezier(0.16,1,0.3,1)', overflow:'hidden', marginBottom:'28px', boxShadow:dragOver?'0 0 40px rgba(255,183,3,0.18) inset':'none' }}>
            <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={e=>handleFile(e.target.files[0])} />
            {/* grid overlay */}
            <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,183,3,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,183,3,0.05) 1px,transparent 1px)', backgroundSize:'40px 40px', maskImage:'radial-gradient(circle at 50% 50%,black 0%,transparent 78%)', WebkitMaskImage:'radial-gradient(circle at 50% 50%,black 0%,transparent 78%)', pointerEvents:'none' }} />
            {/* cursor glow */}
            <div style={{ position:'absolute', inset:0, background:`radial-gradient(240px circle at var(--mx,50%) var(--my,50%),rgba(255,183,3,${dragOver?0.22:0.1}),transparent 55%)`, pointerEvents:'none', transition:'background 0.3s' }} />
            {/* corner brackets */}
            <svg width="14" height="14" viewBox="0 0 12 12" style={{ position:'absolute', top:14, left:14, opacity:0.5 }}><path d="M0 12V0h12" stroke="#FFB703" strokeWidth="1" fill="none" /></svg>
            <svg width="14" height="14" viewBox="0 0 12 12" style={{ position:'absolute', top:14, right:14, opacity:0.5 }}><path d="M0 0h12v12" stroke="#FFB703" strokeWidth="1" fill="none" /></svg>
            <svg width="14" height="14" viewBox="0 0 12 12" style={{ position:'absolute', bottom:14, left:14, opacity:0.5 }}><path d="M0 0v12h12" stroke="#FFB703" strokeWidth="1" fill="none" /></svg>
            <svg width="14" height="14" viewBox="0 0 12 12" style={{ position:'absolute', bottom:14, right:14, opacity:0.5 }}><path d="M12 0v12H0" stroke="#FFB703" strokeWidth="1" fill="none" /></svg>
            <div style={{ position:'relative' }}>
              <div style={{ display:'inline-flex', color:'#FFB703', padding:'16px', border:'1px solid rgba(255,183,3,0.3)', borderRadius:'50%', background:'rgba(255,183,3,0.04)', marginBottom:'22px' }}>
                <Icon name="file" size={30} stroke={1.4} />
              </div>
              <p className="mono" style={{ color:'#FFB703', fontSize:'11px', fontWeight:'700', letterSpacing:'2.5px', textTransform:'uppercase', marginBottom:'10px' }}>{isFr?'Glissez votre IRM ici':'Drop your brain MRI here'}</p>
              <p style={{ color:'rgba(255,255,255,0.42)', fontSize:'12px', fontWeight:'300', marginBottom:'26px' }}>{isFr?'ou cliquez pour parcourir vos fichiers':'or click to browse your files'}</p>
              <div className="mono" style={{ display:'inline-flex', alignItems:'center', gap:'10px', padding:'12px 28px', background:'#FFB703', color:'#05080F', borderRadius:'4px', fontSize:'10px', fontWeight:'800', letterSpacing:'1.8px', textTransform:'uppercase', boxShadow:'0 0 28px rgba(255,183,3,0.3)' }}>
                {isFr?'Choisir fichier':'Choose file'}
                <Icon name="arrow" size={11} stroke={2.4} />
              </div>
            </div>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'32px', flexWrap:'wrap', gap:'10px' }}>
            <span className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.38)', letterSpacing:'2px', textTransform:'uppercase' }}>{isFr?'Formats · PNG · JPG · JPEG':'Accepted · PNG · JPG · JPEG'}</span>
            <span className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.38)', letterSpacing:'2px', textTransform:'uppercase' }}>{isFr?'Aucune donnée patient stockée':'No patient data stored'}</span>
          </div>
        </>)}

        {/* LOADING */}
        {phase === 'loading' && (
          <div style={{ textAlign:'center', padding:'72px 24px', border:'1px solid rgba(255,183,3,0.18)', borderRadius:'10px', background:'rgba(255,183,3,0.02)', marginBottom:'32px' }}>
            <div style={{ width:'44px', height:'44px', border:'2px solid rgba(255,183,3,0.18)', borderTop:'2px solid #FFB703', borderRadius:'50%', animation:'spin 0.9s linear infinite', margin:'0 auto 20px' }} />
            <p className="mono" style={{ color:'#FFB703', fontSize:'11px', fontWeight:'700', letterSpacing:'3.5px', textTransform:'uppercase', marginBottom:'10px' }}>{isFr?'Génération du rapport':'Generating report'}</p>
            <p className="mono" style={{ color:'rgba(255,255,255,0.4)', fontSize:'9px', letterSpacing:'2.2px', textTransform:'uppercase' }}>GroupB ResNet-18 · GradCAM++ · 60% {isFr?'seuil':'gate'}</p>
          </div>
        )}

        {/* REJECT phases */}
        {(phase==='not_mri'||phase==='invalid'||phase==='error') && (()=>{
          const r = REJ[phase]
          return (
            <div style={{ textAlign:'center', padding:'44px 28px', border:`1px solid ${r.color}33`, borderRadius:'10px', background:`${r.color}08`, marginBottom:'32px' }}>
              <div style={{ display:'inline-flex', color:r.color, padding:'14px', border:`1px solid ${r.color}55`, borderRadius:'50%', background:`${r.color}0D`, marginBottom:'20px' }}>
                <Icon name={r.icon} size={26} stroke={1.4} />
              </div>
              <p className="mono" style={{ color:r.color, fontSize:'9px', letterSpacing:'3px', fontWeight:'700', textTransform:'uppercase', marginBottom:'12px', opacity:0.82 }}>{r.code}</p>
              <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'28px', color:r.color, letterSpacing:'2.5px', marginBottom:'16px', lineHeight:1 }}>{r.title}</h3>
              <p style={{ color:'rgba(255,255,255,0.55)', fontSize:'13px', maxWidth:'420px', margin:'0 auto 26px', lineHeight:'1.75', fontWeight:'300' }}>{r.desc}</p>
              <button onClick={()=>setPhase('idle')} onMouseMove={tintMove} className="cta-primary" style={{ display:'inline-flex', alignItems:'center', gap:'10px', padding:'11px 28px', background:'#FFB703', color:'#05080F', border:'none', borderRadius:'4px', fontSize:'11px', fontWeight:'800', cursor:'pointer', letterSpacing:'1.8px', fontFamily:'inherit', textTransform:'uppercase' }}>
                <span style={{ display:'inline-flex', alignItems:'center', gap:'10px' }}>{isFr?'Réessayer':'Try again'}<Icon name="arrow" size={11} stroke={2.4} /></span>
              </button>
            </div>
          )
        })()}

        {/* DONE */}
        {phase === 'done' && result && (()=>{
          const predColor = CLASS_COLORS[result.prediction] || '#10B981'
          const confPct = result.confidence * 100
          return (
            <div style={{ animation:'fadeIn 0.45s ease' }}>
              {/* Result card */}
              <div style={{ position:'relative', border:`1px solid ${predColor}44`, borderRadius:'10px', padding:'24px 28px', marginBottom:'18px', background:`linear-gradient(180deg,${predColor}0D,transparent)`, overflow:'hidden' }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:`linear-gradient(90deg,transparent,${predColor},transparent)` }} />
                <div style={{ display:'grid', gridTemplateColumns:'1.3fr 1fr', gap:'24px', alignItems:'center', marginBottom:'22px' }}>
                  <div>
                    <p className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.4)', letterSpacing:'2.5px', marginBottom:'8px', textTransform:'uppercase', fontWeight:'700' }}>{isFr?'Diagnostic IA':'AI Diagnosis'}</p>
                    <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'44px', letterSpacing:'2.5px', color:predColor, margin:0, lineHeight:1, textTransform:'uppercase' }}>{result.prediction}</h2>
                    <div style={{ display:'flex', gap:'6px', marginTop:'14px', flexWrap:'wrap' }}>
                      <span className="mono" style={{ fontSize:'9px', padding:'3px 8px', border:`1px solid ${predColor}55`, borderRadius:'2px', color:predColor, letterSpacing:'1.3px', fontWeight:'800' }}>GROUPB</span>
                      <span className="mono" style={{ fontSize:'9px', padding:'3px 8px', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'2px', color:'rgba(255,255,255,0.55)', letterSpacing:'1.3px', fontWeight:'700' }}>RESNET-18</span>
                      <span className="mono" style={{ fontSize:'9px', padding:'3px 8px', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'2px', color:'rgba(255,255,255,0.55)', letterSpacing:'1.3px', fontWeight:'700' }}>GRADCAM++</span>
                    </div>
                  </div>
                  <div style={{ textAlign:'right' }}>
                    <p className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.4)', letterSpacing:'2.5px', marginBottom:'6px', textTransform:'uppercase', fontWeight:'700' }}>{isFr?'Confiance':'Confidence'}</p>
                    <p className="tnum" style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'54px', color:'#10B981', margin:0, letterSpacing:'-1px', lineHeight:1 }}>{confPct.toFixed(1)}<span style={{ fontSize:'0.5em', marginLeft:'2px' }}>%</span></p>
                  </div>
                </div>
                <div>
                  <p className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.42)', letterSpacing:'2.5px', marginBottom:'12px', textTransform:'uppercase', fontWeight:'700' }}>{isFr?'Distribution':'Probability distribution'}</p>
                  {['glioma','meningioma','notumor','pituitary'].map(cls=>{
                    const p=(result.probabilities[cls]||0)*100; const isTop=cls===result.prediction
                    return (
                      <div key={cls} style={{ marginBottom:'10px' }}>
                        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:'5px' }}>
                          <span className="mono" style={{ fontSize:'10px', color:isTop?CLASS_COLORS[cls]:'rgba(255,255,255,0.5)', fontWeight:isTop?'800':'600', textTransform:'uppercase', letterSpacing:'1.6px' }}>{cls}</span>
                          <span className="mono tnum" style={{ fontSize:'10px', color:isTop?CLASS_COLORS[cls]:'rgba(255,255,255,0.45)', fontWeight:isTop?'800':'600' }}>{p.toFixed(2)}%</span>
                        </div>
                        <div style={{ height:'4px', background:'rgba(255,255,255,0.05)', borderRadius:'2px', overflow:'hidden' }}>
                          <div style={{ height:'100%', width:`${p.toFixed(1)}%`, background:isTop?CLASS_COLORS[cls]:'rgba(255,255,255,0.12)', borderRadius:'2px', transition:'width 1.1s cubic-bezier(0.16,1,0.3,1)', boxShadow:isTop?`0 0 12px ${CLASS_COLORS[cls]}88`:'none' }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:'10px', marginBottom:'28px' }}>
                <button onClick={handlePrint} onMouseMove={tintMove} className="cta-primary" style={{ padding:'16px', background:'#FFB703', color:'#05080F', border:'none', borderRadius:'6px', cursor:'pointer', fontSize:'12px', fontWeight:'900', letterSpacing:'1.8px', fontFamily:'inherit', display:'inline-flex', alignItems:'center', justifyContent:'center', gap:'12px', textTransform:'uppercase', boxShadow:'0 0 32px rgba(255,183,3,0.3)' }}>
                  <span style={{ display:'inline-flex', alignItems:'center', gap:'10px' }}><Icon name="file" size={14} stroke={2} />{isFr?'Télécharger PDF':'Download PDF Report'}</span>
                </button>
                <button onClick={()=>{setPhase('idle');setResult(null)}} onMouseMove={tintMove} className="cta-ghost" style={{ padding:'16px', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.6)', borderRadius:'6px', cursor:'pointer', fontSize:'10px', fontWeight:'800', fontFamily:'inherit', letterSpacing:'1.6px', display:'inline-flex', alignItems:'center', justifyContent:'center', gap:'10px', textTransform:'uppercase' }}>
                  <span style={{ display:'inline-flex', alignItems:'center', gap:'9px' }}><Icon name="upload" size={12} stroke={1.8} />{isFr?'Nouveau scan':'New scan'}</span>
                </button>
              </div>

              {/* Report contents */}
              <div style={{ background:'rgba(10,22,40,0.5)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:'10px', padding:'24px 26px' }}>
                <p className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.42)', letterSpacing:'2.5px', marginBottom:'18px', fontWeight:'700', textTransform:'uppercase' }}>§ {isFr?'Contenu du rapport':'Report contents'}</p>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
                  {[
                    { icon:'brain', label:isFr?'Prédiction IA + confiance':'AI prediction + confidence', color:'#10B981' },
                    { icon:'zap', label:isFr?'Carte GradCAM++ (GroupB)':'GradCAM++ heatmap (GroupB)', color:'#00B4D8' },
                    { icon:'chart', label:isFr?'Benchmarks du modèle':'Model benchmarks (99.69%, AUC 0.9996)', color:'#FFB703' },
                    { icon:'database', label:isFr?'Contexte de la recherche':'Research context (ANOVA, Cohen\'s d)', color:'#00B4D8' },
                    { icon:'scale', label:isFr?'Avertissement clinique':'Clinical disclaimer', color:'rgba(255,255,255,0.55)' },
                    { icon:'shield', label:isFr?'Informations de l\'établissement':'Facility information', color:'rgba(255,255,255,0.55)' },
                  ].map(({icon,label,color},i)=>(
                    <div key={i} style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                      <span style={{ color, display:'inline-flex', flexShrink:0 }}><Icon name={icon} size={15} stroke={1.6} /></span>
                      <span style={{ fontSize:'11.5px', color, lineHeight:'1.5', fontWeight:'500' }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })()}

        {/* Info cards (idle only) */}
        {phase==='idle' && (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(230px,1fr))', gap:'10px' }}>
            {[
              { icon:'shield', title:isFr?'Privé par conception':'Private by design', desc:isFr?'Aucune image ne quitte votre navigateur. Aucune donnée patient stockée.':'No images leave your browser. No patient data stored.', color:'#10B981' },
              { icon:'zap',    title:isFr?'Inférence en temps réel':'Real-time inference', desc:isFr?'Résultats en quelques secondes via HuggingFace.':'Results in seconds via HuggingFace backend.', color:'#00B4D8' },
              { icon:'file',   title:isFr?'Prêt à imprimer':'Print-ready', desc:isFr?'Format clinique optimisé pour impression A4 et lettre.':'Clinical format optimized for A4 and letter print.', color:'#FFB703' },
            ].map(({icon,title,desc,color},i)=>(
              <div key={i} style={{ padding:'22px 24px', background:'rgba(10,22,40,0.4)', border:`1px solid ${color}2A`, borderRadius:'8px', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:`linear-gradient(90deg,transparent,${color},transparent)` }} />
                <span style={{ color, display:'inline-flex', marginBottom:'14px' }}><Icon name={icon} size={20} stroke={1.5} /></span>
                <p style={{ fontSize:'13px', fontWeight:'700', color:'#fff', marginBottom:'8px', letterSpacing:'-0.1px' }}>{title}</p>
                <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.42)', lineHeight:'1.7', fontWeight:'300' }}>{desc}</p>
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
    { id:'findings',    label:isFr?'Résultats Clés':'Key Findings',   num:'01' },
    { id:'groups',      label:isFr?'Les 4 Groupes':'The 4 Groups',    num:'02' },
    { id:'stats',       label:isFr?'Statistiques':'Statistics',        num:'03' },
    { id:'methodology', label:isFr?'Méthodologie':'Methodology',       num:'04' },
    { id:'deepdive',    label:isFr?'Approfondir':'Deeper Dive',         num:'05', featured:true },
  ]

  const PROJECT_BOARD_URL = 'https://partner.projectboard.world/ysc/project/beyond-accuracy-evaluating-data-augmentation-strategies-for-ai-brain-tumor-detection-with-gradcam-in'

  return (
    <SubPageWrapper onClose={onClose} title={isFr?'Recherche':'Research'} titleColor="#00B4D8" lang={lang}>
      <div style={{ maxWidth:'1040px', margin:'0 auto', padding:'48px 24px 80px' }}>
        {/* Header */}
        <div style={{ marginBottom:'44px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'20px' }}>
            <span className="mono" style={{ fontSize:'9px', color:'#00B4D8', letterSpacing:'2.5px', fontWeight:'700' }}>§ 00</span>
            <span style={{ width:'24px', height:'1px', background:'rgba(0,180,216,0.4)' }} />
            <span className="mono" style={{ fontSize:'10px', color:'#00B4D8', letterSpacing:'3px', fontWeight:'700', textTransform:'uppercase' }}>{isFr?'Protocole CWSF 2026':'CWSF 2026 · Research Protocol'}</span>
          </div>
          <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(36px,6vw,72px)', color:'#fff', letterSpacing:'2px', lineHeight:'0.95', marginBottom:'18px' }}>
            {isFr?'AU-DELÀ DE LA PRÉCISION':'BEYOND ACCURACY'}
          </h1>
          <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.45)', lineHeight:'1.8', maxWidth:'640px', fontWeight:'300' }}>
            {isFr
              ? "Évaluer les stratégies d'augmentation des données pour la détection IA des tumeurs cérébrales avec l'interprétabilité GradCAM++ et le déploiement clinique."
              : "Evaluating data augmentation strategies for AI brain tumor detection with GradCAM++ interpretability and clinical deployment."}
          </p>
        </div>

        {/* Tabs — underline style */}
        <div style={{ display:'flex', gap:'30px', marginBottom:'36px', borderBottom:'1px solid rgba(255,255,255,0.06)', flexWrap:'wrap' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={()=>setActiveTab(t.id)} style={{ padding:'0 0 14px', background:'transparent', border:'none', color:activeTab===t.id?'#fff':(t.featured?'#FFB703':'rgba(255,255,255,0.42)'), fontSize:'11px', fontWeight:activeTab===t.id?'700':'600', letterSpacing:'1.8px', textTransform:'uppercase', cursor:'pointer', position:'relative', fontFamily:'inherit', display:'inline-flex', alignItems:'center', gap:'8px', transition:'color .2s' }}
              onMouseEnter={e=>{if(activeTab!==t.id)e.currentTarget.style.color=t.featured?'#FFD766':'rgba(255,255,255,0.75)'}}
              onMouseLeave={e=>{if(activeTab!==t.id)e.currentTarget.style.color=t.featured?'#FFB703':'rgba(255,255,255,0.42)'}}>
              <span className="mono" style={{ fontSize:'9px', color:activeTab===t.id?(t.featured?'#FFB703':'#00B4D8'):(t.featured?'rgba(255,183,3,0.5)':'rgba(255,255,255,0.32)'), letterSpacing:'1.2px' }}>{t.num}</span>
              {t.label}
              {t.featured && <span style={{ fontSize:'11px' }}>↗</span>}
              {activeTab===t.id && <span style={{ position:'absolute', left:0, right:0, bottom:-1, height:'2px', background:t.featured?'#FFB703':'#00B4D8', borderRadius:'1px' }} />}
            </button>
          ))}
        </div>

        {/* FINDINGS TAB */}
        {activeTab==='findings' && (
          <div style={{ animation:'fadeIn 0.3s ease' }}>
            {/* 33× hero — static */}
            <div style={{ background:'linear-gradient(180deg,rgba(230,57,70,0.04),rgba(230,57,70,0.01))', border:'1px solid rgba(230,57,70,0.22)', borderRadius:'10px', padding:'48px 40px', textAlign:'center', marginBottom:'22px', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 0%,rgba(230,57,70,0.14),transparent 60%)', pointerEvents:'none' }} />
              <p className="mono" style={{ position:'relative', fontSize:'10px', color:'rgba(230,57,70,0.75)', letterSpacing:'3px', marginBottom:'22px', fontWeight:'700', textTransform:'uppercase' }}>{isFr?'Découverte Principale':'Core Finding · Training Loss Divergence'}</p>
              <div className="tnum" style={{ position:'relative', fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(80px,15vw,140px)', fontWeight:'400', color:'#E63946', letterSpacing:'-2px', lineHeight:'0.95', marginBottom:'22px' }}>33×</div>
              <p style={{ position:'relative', fontSize:'15px', color:'rgba(255,255,255,0.62)', maxWidth:'520px', margin:'0 auto', lineHeight:'1.8', fontWeight:'300' }}>
                {isFr
                  ? "Le Groupe C avait une perte d'entraînement 33× plus élevée que le Groupe B avec une précision presque identique. Même score. Fiabilité clinique complètement différente."
                  : "Group C had 33× higher training loss than Group B with nearly identical accuracy. Same score. Completely different clinical trustworthiness."}
              </p>
            </div>

            {/* Key stats grid */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(170px,1fr))', gap:0, marginBottom:'24px', borderTop:'1px solid rgba(255,255,255,0.06)', borderLeft:'1px solid rgba(255,255,255,0.06)' }}>
              {[
                { v:'99.69%',  l:isFr?'Précision GroupB':'GroupB Accuracy', s:'±0.14%',                                  c:'#10B981' },
                { v:'4.750',   l:"Cohen's d (B vs C)",                       s:isFr?'Effet large':'Large effect',        c:'#E63946' },
                { v:'F=38.93', l:'ANOVA',                                    s:'p < 0.000001',                           c:'#00B4D8' },
                { v:'p=0.857', l:isFr?'GroupB vs GroupD':'GroupB vs GroupD', s:isFr?'Hypothèse rejetée':'Hypothesis rejected', c:'#FFB703' },
                { v:'2.7×',    l:isFr?'Pire calibration C':'Worse ECE GroupC', s:'0.0082 vs 0.0030',                      c:'#E63946' },
                { v:'40',      l:isFr?'Modèles entraînés':'Models trained',  s:'10 seeds × 4 groups',                    c:'#00B4D8' },
              ].map(({v,l,s,c},i)=>(
                <div key={i} style={{ padding:'20px 22px', borderRight:'1px solid rgba(255,255,255,0.06)', borderBottom:'1px solid rgba(255,255,255,0.06)', transition:'background .3s', cursor:'default' }}
                  onMouseEnter={e=>{e.currentTarget.style.background=c+'06'}}
                  onMouseLeave={e=>{e.currentTarget.style.background='transparent'}}>
                  <div className="tnum" style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(24px,3vw,32px)', fontWeight:'400', color:c, letterSpacing:'0.5px', marginBottom:'8px', lineHeight:1 }}>{v}</div>
                  <div className="mono" style={{ fontSize:'10px', color:'rgba(255,255,255,0.65)', fontWeight:'700', marginBottom:'4px', letterSpacing:'0.5px', textTransform:'uppercase' }}>{l}</div>
                  <div className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.32)', letterSpacing:'1px', textTransform:'uppercase' }}>{s}</div>
                </div>
              ))}
            </div>

            {/* Thesis */}
            <div style={{ background:'linear-gradient(180deg,rgba(0,180,216,0.04),transparent)', border:'1px solid rgba(0,180,216,0.2)', borderRadius:'10px', padding:'32px 34px', marginBottom:'22px', position:'relative' }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,#00B4D8,transparent)' }} />
              <p className="mono" style={{ fontSize:'10px', color:'#00B4D8', letterSpacing:'3px', marginBottom:'16px', fontWeight:'700', textTransform:'uppercase' }}>{isFr?'§ La Thèse':'§ The Thesis'}</p>
              <blockquote style={{ fontSize:'clamp(15px,1.8vw,18px)', color:'rgba(255,255,255,0.78)', lineHeight:'1.85', fontStyle:'italic', fontFamily:'Georgia,Cambria,serif', fontWeight:'300' }}>
                {isFr
                  ? "\"La précision peut être trompeuse car un modèle peut obtenir la bonne réponse pour la mauvaise raison. Le Groupe C a une précision similaire au Groupe B, mais GradCAM++ révèle qu'il examine des régions cérébrales non pertinentes au lieu de la tumeur. Un modèle qui regarde la mauvaise zone échouera silencieusement sur les scans d'un autre hôpital. La précision mesure les résultats, pas le raisonnement. GradCAM++ mesure le raisonnement.\""
                  : '"Accuracy can be misleading because a model can get the right answer for the wrong reason. Group C has similar accuracy to Group B but GradCAM++ reveals it looks at irrelevant brain regions instead of the tumor. A model that looks at the wrong area will fail silently on new hospital scans. Accuracy measures outcomes, not reasoning. GradCAM++ measures reasoning."'}
              </blockquote>
            </div>

            {/* Wrong hypothesis */}
            <div style={{ background:'linear-gradient(180deg,rgba(255,183,3,0.04),transparent)', border:'1px solid rgba(255,183,3,0.22)', borderRadius:'10px', padding:'32px 34px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'16px' }}>
                <span style={{ color:'#FFB703', display:'inline-flex' }}><Icon name="alert" size={14} stroke={1.7} /></span>
                <p className="mono" style={{ fontSize:'10px', color:'#FFB703', letterSpacing:'3px', fontWeight:'700', textTransform:'uppercase' }}>{isFr?'§ L\'hypothèse erronée':'§ The Wrong Hypothesis'}</p>
              </div>
              <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.62)', lineHeight:'1.85', fontWeight:'300' }}>
                {isFr
                  ? "L'hypothèse initiale était que l'augmentation spécifique au domaine (Groupe D) surpasserait tous les autres groupes. Elle avait tort — l'augmentation de base (Groupe B) a gagné. Mais GroupB et GroupD ont une précision statistiquement identique (p=0.857, d=0.086), ce qui signifie que la conclusion réelle est que la surprécision de domaine n'apporte aucun avantage mesurable — et peut masquer d'autres problèmes."
                  : "The initial hypothesis was that domain-specific augmentation (Group D) would outperform all others. It was wrong — basic augmentation (Group B) won. But Group B and Group D have statistically identical accuracy (p=0.857, d=0.086), meaning the real conclusion is that domain over-engineering provides no measurable benefit — and the unexpected result is the finding itself."}
              </p>
              <div style={{ marginTop:'20px', display:'flex', gap:'10px', flexWrap:'wrap' }}>
                <div style={{ padding:'12px 18px', background:'rgba(16,185,129,0.06)', border:'1px solid rgba(16,185,129,0.25)', borderRadius:'6px' }}>
                  <p className="mono" style={{ fontSize:'9px', color:'#10B981', fontWeight:'800', marginBottom:'4px', letterSpacing:'1.5px', textTransform:'uppercase' }}>{isFr?'Gagnant réel':'Actual Winner'}</p>
                  <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.78)', fontWeight:'600' }}>Group B — Basic Augmentation</p>
                </div>
                <div style={{ padding:'12px 18px', background:'rgba(255,183,3,0.05)', border:'1px solid rgba(255,183,3,0.22)', borderRadius:'6px' }}>
                  <p className="mono" style={{ fontSize:'9px', color:'#FFB703', fontWeight:'800', marginBottom:'4px', letterSpacing:'1.5px', textTransform:'uppercase' }}>{isFr?'Gagnant prédit':'Predicted Winner'}</p>
                  <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.78)', fontWeight:'600' }}>Group D — Domain-Specific</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GROUPS TAB */}
        {activeTab==='groups' && (
          <div style={{ animation:'fadeIn 0.3s ease', display:'grid', gap:'14px' }}>
            {GROUPS.map(g=>(
              <div key={g.g} className="grp-card" onMouseMove={tintMove} style={{ background:'rgba(10,22,40,0.5)', border:`1px solid ${g.color}2A`, borderRadius:'10px', padding:'26px 28px', transition:'border-color 0.3s', '--tint':g.color+'22' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=g.color+'55'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=g.color+'2A'}}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'22px', flexWrap:'wrap', gap:'14px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'18px' }}>
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'54px', color:g.color, lineHeight:1, letterSpacing:'2px' }}>G{g.g}</div>
                    <div>
                      <p style={{ fontSize:'16px', fontWeight:'800', color:'#fff', letterSpacing:'-0.2px', marginBottom:'5px' }}>
                        {g.g==='A'?(isFr?'Aucune Augmentation — Contrôle':'No Augmentation — Control'):
                         g.g==='B'?(isFr?'Augmentation Basique · Gagnant':'Basic Augmentation · Winner'):
                         g.g==='C'?(isFr?'Augmentation Extrême · Danger':'Extreme Augmentation · Danger'):
                         (isFr?'Spécifique au Domaine':'Domain-Specific Augmentation')}
                      </p>
                      <p className="mono" style={{ fontSize:'10px', color:'rgba(255,255,255,0.4)', letterSpacing:'0.5px', textTransform:'uppercase' }}>
                        {g.g==='A'?'Baseline · No transforms applied':
                         g.g==='B'?'HorizontalFlip · Rotation 15° · ColorJitter 0.1':
                         g.g==='C'?'VerticalFlip · Rotation 90° · ColorJitter max · RandomErasing p=0.5':
                         'HorizontalFlip · Rotation 15° · GaussianBlur · RandomAffine shear 5°'}
                      </p>
                    </div>
                  </div>
                  {(g.winner||g.danger) && (
                    <span className="mono" style={{ fontSize:'9px', fontWeight:'800', color:g.color, border:`1px solid ${g.color}66`, padding:'4px 10px', borderRadius:'2px', letterSpacing:'1.5px', whiteSpace:'nowrap', textTransform:'uppercase' }}>
                      {g.winner?(isFr?'✓ Gagnant Réel':'✓ Actual Winner'):(isFr?'✗ Illusion de Connaissance':'✗ Illusion of Knowledge')}
                    </span>
                  )}
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(110px,1fr))', gap:0, borderTop:'1px solid rgba(255,255,255,0.05)', borderLeft:'1px solid rgba(255,255,255,0.05)' }}>
                  {[['Accuracy',g.acc+' '+g.pm,'#fff'],['AUC',g.auc,'rgba(255,255,255,0.72)'],['ECE',g.ece,g.g==='C'?'#E63946':'#10B981'],['Sensitivity',g.sens,'rgba(255,255,255,0.72)'],['Specificity',g.spec,'rgba(255,255,255,0.72)'],['Epoch 50 Loss',g.loss,g.g==='C'?'#E63946':'rgba(255,255,255,0.5)']].map(([l,v,c])=>(
                    <div key={l} style={{ padding:'12px 14px', borderRight:'1px solid rgba(255,255,255,0.05)', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
                      <p className="mono" style={{ fontSize:'8px', color:'rgba(255,255,255,0.35)', letterSpacing:'1.8px', marginBottom:'6px', textTransform:'uppercase', fontWeight:'700' }}>{l}</p>
                      <p className="mono tnum" style={{ fontSize:'13px', fontWeight:'800', color:c, letterSpacing:'0.2px' }}>{v}</p>
                    </div>
                  ))}
                </div>
                {g.g==='C' && (
                  <div style={{ marginTop:'18px', padding:'14px 18px', background:'rgba(230,57,70,0.06)', border:'1px solid rgba(230,57,70,0.22)', borderRadius:'6px', display:'flex', gap:'12px', alignItems:'flex-start' }}>
                    <span style={{ color:'#E63946', display:'inline-flex', flexShrink:0, marginTop:'2px' }}><Icon name="alert" size={14} stroke={1.7} /></span>
                    <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.55)', lineHeight:'1.75', fontWeight:'300' }}>
                      {isFr
                        ? "GroupC atteint une précision similaire mais avec une perte 33× plus élevée et un ECE 2,7× pire. L'analyse GradCAM++ révèle qu'il examine des régions cérébrales non pertinentes — la définition de l'illusion de connaissance de Hawking."
                        : "GroupC achieves similar accuracy but with 33× higher loss and 2.7× worse ECE. GradCAM++ reveals it attends to irrelevant brain regions — the definition of Hawking's illusion of knowledge."}
                    </p>
                  </div>
                )}
                {g.g==='D' && (
                  <div style={{ marginTop:'18px', padding:'14px 18px', background:'rgba(255,183,3,0.05)', border:'1px solid rgba(255,183,3,0.18)', borderRadius:'6px' }}>
                    <p className="mono" style={{ fontSize:'9px', color:'#FFB703', letterSpacing:'1.8px', fontWeight:'800', textTransform:'uppercase', marginBottom:'6px' }}>{isFr?'Note · Hypothèse initiale':'Note · Initial Hypothesis'}</p>
                    <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', lineHeight:'1.75', fontWeight:'300' }}>
                      {isFr
                        ? "GroupD était l'hypothèse initiale — la surprécision du domaine était supposée gagner. Statistiquement identique à GroupB (p=0.857, d=0.086). L'hypothèse a été rejetée."
                        : "GroupD was the initial hypothesis — domain over-engineering was expected to win. Statistically identical to GroupB (p=0.857, d=0.086). Hypothesis rejected."}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* STATS TAB */}
        {activeTab==='stats' && (
          <div style={{ animation:'fadeIn 0.3s ease' }}>
            {/* Full results */}
            <div style={{ background:'rgba(10,22,40,0.5)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:'10px', overflow:'hidden', marginBottom:'22px' }}>
              <div style={{ padding:'16px 22px', borderBottom:'1px solid rgba(255,255,255,0.05)', display:'flex', alignItems:'center', gap:'10px', flexWrap:'wrap' }}>
                <span className="mono" style={{ fontSize:'10px', color:'rgba(255,255,255,0.55)', letterSpacing:'2.5px', fontWeight:'700', textTransform:'uppercase' }}>{isFr?'Tableau complet des résultats':'Full Results Table'}</span>
                <span className="mono tnum" style={{ fontSize:'9px', color:'rgba(0,180,216,0.7)', letterSpacing:'1.5px', padding:'3px 8px', border:'1px solid rgba(0,180,216,0.22)', borderRadius:'2px', background:'rgba(0,180,216,0.06)', textTransform:'uppercase', fontWeight:'700' }}>40 {isFr?'modèles · 10 seeds/groupe':'models · 10 seeds/group'}</span>
              </div>
              <div style={{ overflowX:'auto' }}>
                <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'12px' }}>
                  <thead>
                    <tr style={{ borderBottom:'1px solid rgba(255,255,255,0.08)', background:'rgba(255,255,255,0.012)' }}>
                      {[isFr?'Groupe':'Group', isFr?'Précision':'Accuracy', 'AUC', 'ECE', isFr?'Sensibilité':'Sensitivity', isFr?'Spécificité':'Specificity', 'F1', isFr?'Perte Ép.50':'Loss (Ep. 50)'].map(h=>(
                        <th key={h} className="mono" style={{ padding:'12px 16px', textAlign:'left', fontSize:'9px', color:'rgba(255,255,255,0.45)', letterSpacing:'1.8px', fontWeight:'700', textTransform:'uppercase' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {GROUPS.map(g=>(
                      <tr key={g.g} style={{ borderBottom:'1px solid rgba(255,255,255,0.04)', transition:'background .2s' }}
                        onMouseEnter={e=>{e.currentTarget.style.background=g.color+'08'}}
                        onMouseLeave={e=>{e.currentTarget.style.background='transparent'}}>
                        <td style={{ padding:'13px 16px' }}>
                          <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                            <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:g.color, flexShrink:0, boxShadow:`0 0 8px ${g.color}88` }} />
                            <span className="mono" style={{ fontWeight:'800', color:g.color, letterSpacing:'1px' }}>Group {g.g}</span>
                            {g.winner && <span className="mono" style={{ fontSize:'8px', background:'rgba(16,185,129,0.14)', color:'#10B981', padding:'2px 5px', borderRadius:'2px', fontWeight:'800', letterSpacing:'0.5px' }}>✓</span>}
                            {g.danger && <span className="mono" style={{ fontSize:'8px', background:'rgba(230,57,70,0.14)', color:'#E63946', padding:'2px 5px', borderRadius:'2px', fontWeight:'800', letterSpacing:'0.5px' }}>!</span>}
                          </div>
                        </td>
                        <td className="mono tnum" style={{ padding:'13px 16px', color:'#fff', fontWeight:'700' }}>{g.acc} <span style={{ color:'rgba(255,255,255,0.35)', fontWeight:'400', fontSize:'10px' }}>{g.pm}</span></td>
                        <td className="mono tnum" style={{ padding:'13px 16px', color:'rgba(255,255,255,0.65)' }}>{g.auc}</td>
                        <td className="mono tnum" style={{ padding:'13px 16px', color:g.g==='C'?'#E63946':'#10B981', fontWeight:'800' }}>{g.ece}</td>
                        <td className="mono tnum" style={{ padding:'13px 16px', color:'rgba(255,255,255,0.65)' }}>{g.sens}</td>
                        <td className="mono tnum" style={{ padding:'13px 16px', color:'rgba(255,255,255,0.65)' }}>{g.spec}</td>
                        <td className="mono tnum" style={{ padding:'13px 16px', color:'rgba(255,255,255,0.65)' }}>{g.f1}</td>
                        <td className="mono tnum" style={{ padding:'13px 16px', color:g.g==='C'?'#E63946':'rgba(255,255,255,0.5)', fontWeight:g.g==='C'?'800':'500' }}>{g.loss}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ANOVA + Cohen's d */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px', marginBottom:'22px' }}>
              <div style={{ background:'linear-gradient(180deg,rgba(0,180,216,0.05),transparent)', border:'1px solid rgba(0,180,216,0.22)', borderRadius:'10px', padding:'24px 26px', position:'relative' }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,#00B4D8,transparent)' }} />
                <p className="mono" style={{ fontSize:'10px', color:'#00B4D8', letterSpacing:'3px', fontWeight:'700', marginBottom:'16px', textTransform:'uppercase' }}>ANOVA · {isFr?'Test F':'F-Test'}</p>
                <p className="tnum" style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'38px', color:'#00B4D8', margin:0, lineHeight:1, letterSpacing:'-0.5px' }}>F = 38.931</p>
                <p className="mono tnum" style={{ fontSize:'11px', color:'rgba(255,255,255,0.5)', marginTop:'8px', letterSpacing:'1px' }}>p = 0.000000 · p &lt; 0.000001</p>
                <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.55)', lineHeight:'1.75', marginTop:'14px', fontWeight:'300' }}>{isFr?"Les différences entre les groupes sont statistiquement significatives — pas dues au hasard.":"Group differences are statistically significant — not due to chance."}</p>
              </div>
              <div style={{ background:'linear-gradient(180deg,rgba(230,57,70,0.04),transparent)', border:'1px solid rgba(230,57,70,0.22)', borderRadius:'10px', padding:'24px 26px', position:'relative' }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,#E63946,transparent)' }} />
                <p className="mono" style={{ fontSize:'10px', color:'#E63946', letterSpacing:'3px', fontWeight:'700', marginBottom:'16px', textTransform:'uppercase' }}>Cohen's d · B vs C</p>
                <p className="tnum" style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'38px', color:'#E63946', margin:0, lineHeight:1, letterSpacing:'-0.5px' }}>d = 4.750</p>
                <p className="mono" style={{ fontSize:'11px', color:'rgba(255,255,255,0.5)', marginTop:'8px', letterSpacing:'1px', textTransform:'uppercase' }}>{isFr?'Effet Large · >0.8':'Large effect · >0.8'}</p>
                <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.55)', lineHeight:'1.75', marginTop:'14px', fontWeight:'300' }}>{isFr?"La différence entre GroupB et GroupC est cliniquement et statistiquement massive.":"The difference between GroupB and GroupC is clinically and statistically massive."}</p>
              </div>
            </div>

            {/* Literature comparison */}
            <div style={{ background:'rgba(10,22,40,0.5)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:'10px', overflow:'hidden' }}>
              <div style={{ padding:'16px 22px', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
                <span className="mono" style={{ fontSize:'10px', color:'rgba(255,255,255,0.55)', letterSpacing:'2.5px', fontWeight:'700', textTransform:'uppercase' }}>{isFr?'Comparaison avec la littérature':'Literature Comparison'}</span>
              </div>
              <div style={{ overflowX:'auto' }}>
                <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'12px' }}>
                  <thead>
                    <tr style={{ borderBottom:'1px solid rgba(255,255,255,0.05)', background:'rgba(255,255,255,0.012)' }}>
                      {['Study','Model','Accuracy','AUC','Dataset','N'].map(h=>(
                        <th key={h} className="mono" style={{ padding:'12px 16px', textAlign:'left', fontSize:'9px', color:'rgba(255,255,255,0.4)', letterSpacing:'1.8px', fontWeight:'700', textTransform:'uppercase' }}>{h}</th>
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
                      <tr key={study} style={{ borderBottom:'1px solid rgba(255,255,255,0.03)', background:highlight?'rgba(16,185,129,0.05)':'transparent', position:'relative' }}>
                        <td style={{ padding:'12px 16px', color:c, fontWeight:highlight?'800':'500', fontSize:highlight?'13px':'12px' }}>
                          {highlight && <span style={{ display:'inline-block', width:'3px', height:'14px', background:'#10B981', marginRight:'10px', verticalAlign:'middle', borderRadius:'1px' }} />}
                          {study}
                        </td>
                        <td className="mono" style={{ padding:'12px 16px', color:'rgba(255,255,255,0.55)', fontSize:'11px' }}>{model}</td>
                        <td className="mono tnum" style={{ padding:'12px 16px', color:highlight?'#10B981':'rgba(255,255,255,0.65)', fontWeight:highlight?'800':'500' }}>{acc}</td>
                        <td className="mono tnum" style={{ padding:'12px 16px', color:'rgba(255,255,255,0.45)' }}>{auc}</td>
                        <td className="mono" style={{ padding:'12px 16px', color:'rgba(255,255,255,0.4)', fontSize:'11px' }}>{ds}</td>
                        <td className="mono tnum" style={{ padding:'12px 16px', color:'rgba(255,255,255,0.4)' }}>{n}</td>
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
          <div style={{ animation:'fadeIn 0.3s ease', display:'grid', gap:'14px' }}>
            {[
              { icon:'database', title:isFr?'Jeu de Données':'Dataset', color:'#00B4D8', content:[
                ['Sources','3 merged Kaggle datasets (Sartaj Bhuvaji, Masoud Nickparvar, Br35H)'],
                [isFr?'Images uniques':'Unique images','7,627 after MD5 hash deduplication (removed 4,337 duplicates)'],
                [isFr?'Classes':'Classes','Glioma: 2,301 · Meningioma: 1,819 · No Tumor: 1,731 · Pituitary: 1,776'],
                [isFr?'Rééchantillonnage':'Sampling','Weighted random sampling — corrects class imbalance'],
                [isFr?'Division':'Split','80/20 train/val · Fixed seed · Val set: 1,525 images'],
                [isFr?'Passes d\'entraînement':'Training passes','380,000+ effective passes (7,627 × 50 epochs)'],
              ]},
              { icon:'cpu', title:isFr?'Architecture du Modèle':'Model Architecture', color:'#10B981', content:[
                ['Architecture','ResNet-18 pretrained on ImageNet (transfer learning)'],
                ['Transfer learning','Pre-trained on 1.2M images — already knows edges, textures, shapes'],
                [isFr?'Couche finale':'Final layer','1,000 ImageNet → 4 tumor classes'],
                ['Optimizer','Adam, LR 0.001, StepLR scheduler (step 20, gamma 0.1)'],
                ['Training','Batch size 32 · 50 epochs · 10 seeds per group'],
                [isFr?'Matériel':'Hardware','Kaggle T4×2 GPU (training) · P100 (evaluation)'],
              ]},
              { icon:'chart', title:isFr?'Analyse Statistique':'Statistical Analysis', color:'#FFB703', content:[
                ['ANOVA','One-way ANOVA across 4 groups × 10 seeds each (40 models total)'],
                ["Cohen's d","Effect size between GroupB and GroupC: d=4.750 (Large, >0.8)"],
                ['Bonferroni','Post-hoc correction applied for multiple comparisons'],
                ['ECE','Expected Calibration Error — measures confidence reliability'],
                ['GradCAM++','Class activation mapping on model.layer4[-1]'],
                [isFr?'Réplication':'Replication','10 independent seeds per group for statistical robustness'],
              ]},
              { icon:'brain', title:'GradCAM++ Interpretability', color:'#E63946', content:[
                ['Method','Gradient-weighted Class Activation Mapping (GradCAM++)'],
                ['Layer','model.layer4[-1] — final convolutional layer, sharpest activations'],
                ['Groups B/A/D','Tight, tumor-focused activation patterns'],
                ['Group C','Diffuse, tumor-irrelevant activation — attending to wrong regions'],
                ['Consensus','Average heatmap of GroupB + GroupD — most reliable combined view'],
                ['Clinical significance','Model reasoning verification — not just outcome verification'],
              ]},
            ].map(({icon,title,color,content},mi)=>(
              <div key={title} style={{ background:'rgba(10,22,40,0.5)', border:`1px solid ${color}2A`, borderRadius:'10px', overflow:'hidden', position:'relative' }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:`linear-gradient(90deg,transparent,${color},transparent)` }} />
                <div style={{ padding:'18px 24px', background:`${color}08`, borderBottom:`1px solid ${color}22`, display:'flex', alignItems:'center', gap:'14px' }}>
                  <span className="mono" style={{ fontSize:'10px', color, letterSpacing:'2px', fontWeight:'700' }}>0{mi+1}</span>
                  <span style={{ color, display:'inline-flex' }}><Icon name={icon} size={18} stroke={1.5} /></span>
                  <span style={{ fontSize:'13px', fontWeight:'700', color:'#fff', letterSpacing:'0.2px' }}>{title}</span>
                </div>
                <div>
                  {content.map(([l,v],ci)=>(
                    <div key={l} style={{ display:'flex', gap:'18px', padding:'12px 24px', borderBottom: ci < content.length-1 ? '1px solid rgba(255,255,255,0.04)' : 'none', alignItems:'flex-start' }}>
                      <span className="mono" style={{ fontSize:'10px', color, fontWeight:'800', width:'160px', flexShrink:0, letterSpacing:'1.2px', textTransform:'uppercase', paddingTop:'2px' }}>{l}</span>
                      <span style={{ fontSize:'12px', color:'rgba(255,255,255,0.6)', lineHeight:'1.7', fontWeight:'300' }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* DEEPER DIVE TAB — project board */}
        {activeTab==='deepdive' && (
          <div style={{ animation:'fadeIn 0.35s ease' }}>
            {/* Hero card */}
            <div style={{ position:'relative', background:'linear-gradient(180deg,rgba(255,183,3,0.06),rgba(255,183,3,0.01))', border:'1px solid rgba(255,183,3,0.28)', borderRadius:'12px', padding:'44px 40px', marginBottom:'18px', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,#FFB703,transparent)' }} />
              <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 0%,rgba(255,183,3,0.14),transparent 60%)', pointerEvents:'none' }} />
              <CornerMark pos="tl" offset={14} color="#FFB703" /><CornerMark pos="tr" offset={14} color="#FFB703" />
              <CornerMark pos="bl" offset={14} color="#FFB703" /><CornerMark pos="br" offset={14} color="#FFB703" />
              <div style={{ position:'relative', display:'flex', alignItems:'center', gap:'10px', marginBottom:'20px' }}>
                <span className="mono" style={{ fontSize:'9px', color:'#FFB703', letterSpacing:'2.5px', fontWeight:'700' }}>§ 05</span>
                <span style={{ width:'24px', height:'1px', background:'rgba(255,183,3,0.5)' }} />
                <span className="mono" style={{ fontSize:'10px', color:'#FFB703', letterSpacing:'3px', fontWeight:'700', textTransform:'uppercase' }}>{isFr?'Archive complète · documentation':'Complete archive · documentation'}</span>
              </div>
              <h2 style={{ position:'relative', fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(32px,5vw,56px)', color:'#fff', letterSpacing:'2px', lineHeight:'0.95', marginBottom:'18px' }}>
                {isFr?'TABLEAU DE PROJET · CWSF 2026':'PROJECT BOARD · CWSF 2026'}
              </h2>
              <p style={{ position:'relative', fontSize:'14px', color:'rgba(255,255,255,0.6)', lineHeight:'1.8', maxWidth:'640px', marginBottom:'28px', fontWeight:'300' }}>
                {isFr
                  ? "Cette page présente un résumé. Pour les juges, chercheurs et curieux qui veulent tout voir — le journal de recherche complet, les itérations de formation, les analyses statistiques, les visualisations GradCAM++, les citations et le processus complet — visitez le tableau de projet YSC officiel."
                  : "This website is a summary. For judges, researchers, and the curious who want the complete picture — full research journal, training iterations, statistical notebooks, GradCAM++ visualizations, citations, and the end-to-end process — visit the official YSC Project Board."}
              </p>
              <div style={{ position:'relative', display:'flex', gap:'12px', flexWrap:'wrap', alignItems:'center' }}>
                <a href={PROJECT_BOARD_URL} target="_blank" rel="noopener noreferrer" onMouseMove={tintMove} className="cta-primary" style={{ display:'inline-flex', alignItems:'center', gap:'12px', padding:'14px 32px', background:'#FFB703', color:'#05080F', borderRadius:'4px', fontSize:'12px', fontWeight:'900', cursor:'pointer', letterSpacing:'2px', textDecoration:'none', textTransform:'uppercase', boxShadow:'0 0 32px rgba(255,183,3,0.35)' }}>
                  <span style={{ display:'inline-flex', alignItems:'center', gap:'10px' }}>{isFr?'Ouvrir le tableau de projet':'Open Project Board'}<span style={{ fontSize:'14px' }}>↗</span></span>
                </a>
                <span className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.4)', letterSpacing:'1.5px', textTransform:'uppercase' }}>partner.projectboard.world</span>
              </div>
            </div>

            {/* What's on the board */}
            <div style={{ background:'rgba(10,22,40,0.5)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:'10px', padding:'28px 30px', marginBottom:'14px' }}>
              <p className="mono" style={{ fontSize:'10px', color:'rgba(255,255,255,0.55)', letterSpacing:'2.5px', fontWeight:'700', marginBottom:'18px', textTransform:'uppercase' }}>{isFr?'Ce que vous y trouverez':'What you\'ll find there'}</p>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'14px' }}>
                {[
                  { icon:'file',     title:isFr?'Journal de recherche':'Research Journal', desc:isFr?'Entrées datées · itérations · décisions clés':'Dated entries · iterations · key decisions', color:'#00B4D8' },
                  { icon:'chart',    title:isFr?'Analyses statistiques':'Statistical Analysis', desc:isFr?'Carnets ANOVA · Cohen\'s d · calibration':'ANOVA notebooks · Cohen\'s d · calibration', color:'#10B981' },
                  { icon:'cpu',      title:isFr?'Artefacts d\'entraînement':'Training Artifacts', desc:isFr?'40 modèles · courbes de perte · checkpoints':'40 models · loss curves · checkpoints', color:'#FFB703' },
                  { icon:'brain',    title:isFr?'Visualisations GradCAM++':'GradCAM++ Visualizations', desc:isFr?'Cartes de chaleur par groupe · analyse consensus':'Per-group heatmaps · consensus analysis', color:'#E63946' },
                  { icon:'database', title:isFr?'Sources de données':'Data Sources', desc:isFr?'3 jeux Kaggle · déduplication MD5 · méthodologie':'3 Kaggle datasets · MD5 dedup · methodology', color:'#00B4D8' },
                  { icon:'scale',    title:isFr?'Éthique & citations':'Ethics & Citations', desc:isFr?'Considérations complètes · littérature académique':'Full considerations · academic literature', color:'#FFB703' },
                ].map(({icon,title,desc,color},i)=>(
                  <div key={i} style={{ padding:'16px 18px', background:`${color}06`, border:`1px solid ${color}22`, borderRadius:'7px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'8px' }}>
                      <span style={{ color, display:'inline-flex' }}><Icon name={icon} size={15} stroke={1.6} /></span>
                      <p style={{ fontSize:'12px', fontWeight:'700', color:'#fff', letterSpacing:'-0.1px' }}>{title}</p>
                    </div>
                    <p style={{ fontSize:'11px', color:'rgba(255,255,255,0.5)', lineHeight:'1.6', fontWeight:'300' }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* About CWSF */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'14px' }}>
              <div style={{ background:'rgba(10,22,40,0.45)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:'10px', padding:'22px 24px' }}>
                <p className="mono" style={{ fontSize:'10px', color:'rgba(255,255,255,0.5)', letterSpacing:'2.2px', fontWeight:'700', marginBottom:'12px', textTransform:'uppercase' }}>{isFr?'À propos du projet':'About this project'}</p>
                <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.58)', lineHeight:'1.75', fontWeight:'300' }}>
                  {isFr
                    ? "Beyond Accuracy — évaluer les stratégies d'augmentation des données pour la détection IA des tumeurs cérébrales avec interprétabilité GradCAM++. Présenté à l'Expo-sciences pancanadienne 2026 (Edmonton, AB)."
                    : "Beyond Accuracy — evaluating data augmentation strategies for AI brain tumor detection with GradCAM++ interpretability. Presented at the Canada-Wide Science Fair 2026 (Edmonton, AB)."}
                </p>
              </div>
              <div style={{ background:'rgba(10,22,40,0.45)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:'10px', padding:'22px 24px' }}>
                <p className="mono" style={{ fontSize:'10px', color:'rgba(255,255,255,0.5)', letterSpacing:'2.2px', fontWeight:'700', marginBottom:'12px', textTransform:'uppercase' }}>{isFr?'Contact chercheur':'Researcher contact'}</p>
                <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.72)', lineHeight:'1.65', marginBottom:'6px', fontWeight:'500' }}>Arhaan Kureshi</p>
                <a href="mailto:arhaanie09@gmail.com" className="footer-link" style={{ fontSize:'11.5px', color:'#00B4D8', textDecoration:'none', fontFamily:'ui-monospace,SFMono-Regular,Menlo,monospace', letterSpacing:'0.3px' }}>arhaanie09@gmail.com</a>
                <p className="mono" style={{ fontSize:'10.5px', color:'rgba(255,255,255,0.45)', letterSpacing:'0.5px', lineHeight:'1.6', marginTop:'6px' }}>Fort McMurray, AB · Canada</p>
              </div>
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
    { id:'regulatory', label:isFr?'Réglementation':'Regulatory',  num:'01' },
    { id:'bias',       label:isFr?'Biais IA':'AI Bias',             num:'02' },
    { id:'privacy',    label:isFr?'Confidentialité':'Privacy',      num:'03' },
    { id:'cost',       label:isFr?'Analyse Coûts':'Cost Analysis',  num:'04' },
  ]

  return (
    <SubPageWrapper onClose={onClose} title={isFr?'Éthique':'Ethics'} titleColor="#FFB703" lang={lang}>
      <div style={{ maxWidth:'1040px', margin:'0 auto', padding:'48px 24px 80px' }}>
        {/* Header */}
        <div style={{ marginBottom:'44px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'20px' }}>
            <span className="mono" style={{ fontSize:'9px', color:'#FFB703', letterSpacing:'2.5px', fontWeight:'700' }}>§ 00</span>
            <span style={{ width:'24px', height:'1px', background:'rgba(255,183,3,0.4)' }} />
            <span className="mono" style={{ fontSize:'10px', color:'#FFB703', letterSpacing:'3px', fontWeight:'700', textTransform:'uppercase' }}>{isFr?'Santé Canada · Conformité · Biais':'Health Canada · Compliance · Bias'}</span>
          </div>
          <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(36px,6vw,72px)', color:'#fff', letterSpacing:'2px', lineHeight:'0.95', marginBottom:'18px' }}>
            {isFr?'ÉTHIQUE ET CONFORMITÉ':'ETHICS & COMPLIANCE'}
          </h1>
          <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.45)', lineHeight:'1.8', maxWidth:'640px', fontWeight:'300' }}>
            {isFr
              ? "IllumaDX est construit avec une conscience complète de ses limitations, des risques de biais et de la voie réglementaire requise avant tout déploiement clinique réel."
              : "IllumaDX is built with full awareness of its limitations, bias risks, and the regulatory pathway required before any real clinical deployment."}
          </p>
        </div>

        {/* Tabs — underline style */}
        <div style={{ display:'flex', gap:'30px', marginBottom:'36px', borderBottom:'1px solid rgba(255,255,255,0.06)', flexWrap:'wrap' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={()=>setActiveTab(t.id)} style={{ padding:'0 0 14px', background:'transparent', border:'none', color:activeTab===t.id?'#fff':'rgba(255,255,255,0.42)', fontSize:'11px', fontWeight:activeTab===t.id?'700':'600', letterSpacing:'1.8px', textTransform:'uppercase', cursor:'pointer', position:'relative', fontFamily:'inherit', display:'inline-flex', alignItems:'center', gap:'8px', transition:'color .2s' }}
              onMouseEnter={e=>{if(activeTab!==t.id)e.currentTarget.style.color='rgba(255,255,255,0.75)'}}
              onMouseLeave={e=>{if(activeTab!==t.id)e.currentTarget.style.color='rgba(255,255,255,0.42)'}}>
              <span className="mono" style={{ fontSize:'9px', color:activeTab===t.id?'#FFB703':'rgba(255,255,255,0.32)', letterSpacing:'1.2px' }}>{t.num}</span>
              {t.label}
              {activeTab===t.id && <span style={{ position:'absolute', left:0, right:0, bottom:-1, height:'2px', background:'#FFB703', borderRadius:'1px' }} />}
            </button>
          ))}
        </div>

        {/* REGULATORY */}
        {activeTab==='regulatory' && (
          <div style={{ animation:'fadeIn 0.3s ease' }}>
            <div style={{ background:'linear-gradient(180deg,rgba(255,183,3,0.04),transparent)', border:'1px solid rgba(255,183,3,0.22)', borderRadius:'10px', padding:'32px 34px', marginBottom:'18px', position:'relative' }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,#FFB703,transparent)' }} />
              <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'16px' }}>
                <span style={{ color:'#FFB703', display:'inline-flex' }}><Icon name="scale" size={16} stroke={1.6} /></span>
                <p className="mono" style={{ fontSize:'10px', color:'#FFB703', letterSpacing:'3px', fontWeight:'700', textTransform:'uppercase' }}>{isFr?'§ Voie Réglementaire Santé Canada':'§ Health Canada Regulatory Pathway'}</p>
              </div>
              <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.65)', lineHeight:'1.85', marginBottom:'24px', fontWeight:'300' }}>
                {isFr
                  ? "IllumaDX serait classifié comme un Logiciel en tant que Dispositif Médical (SaMD) de Classe II/III sous le règlement de Santé Canada. Voici les étapes requises avant le déploiement clinique :"
                  : "IllumaDX would be classified as a Class II/III Software as a Medical Device (SaMD) under Health Canada's Medical Device Regulations. The following pathway is required before clinical deployment:"}
              </p>
              <div style={{ display:'grid', gap:'8px' }}>
                {[
                  { step:'01', label:isFr?'Classification SaMD':'SaMD Classification', desc:isFr?'Classe II — risque modéré. Aide à la décision clinique, pas diagnostic autonome.':'Class II — moderate risk. Decision support, not autonomous diagnosis.', done:false },
                  { step:'02', label:isFr?'Approbation Santé Canada':'Health Canada Approval', desc:isFr?'Licence de dispositif médical (MDL) requise avant commercialisation.':'Medical Device License (MDL) required before commercialization.', done:false },
                  { step:'03', label:isFr?'Essais cliniques':'Clinical Trials', desc:isFr?'Validation prospective sur données patients réels, multi-sites.':'Prospective validation on real patient data, multi-site.', done:false },
                  { step:'04', label:isFr?'Validation radiologique':'Radiologist Validation', desc:isFr?'Outreach initié — Dr. Jacob Jaremko, U of Alberta (imagerie médicale IA).':'Outreach initiated — Dr. Jacob Jaremko, U of Alberta (AI medical imaging).', done:true },
                  { step:'05', label:isFr?'Surveillance post-marché':'Post-market Surveillance', desc:isFr?'Surveillance continue des performances en conditions réelles.':'Ongoing performance monitoring in real-world conditions.', done:false },
                ].map(({step,label,desc,done})=>(
                  <div key={step} style={{ display:'flex', gap:'16px', padding:'14px 18px', background:'rgba(10,22,40,0.4)', borderRadius:'7px', border:`1px solid ${done?'rgba(16,185,129,0.28)':'rgba(255,255,255,0.05)'}`, alignItems:'flex-start' }}>
                    <div style={{ width:'32px', height:'32px', borderRadius:'50%', background:done?'rgba(16,185,129,0.14)':'rgba(255,255,255,0.04)', border:`1px solid ${done?'#10B981':'rgba(255,255,255,0.1)'}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <span className="mono" style={{ fontSize:'10px', fontWeight:'800', color:done?'#10B981':'rgba(255,255,255,0.4)', letterSpacing:'0.5px' }}>{done?'✓':step}</span>
                    </div>
                    <div>
                      <p style={{ fontSize:'13px', fontWeight:'700', color:done?'#10B981':'#fff', marginBottom:'4px', letterSpacing:'-0.1px' }}>{label}</p>
                      <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', lineHeight:'1.65', fontWeight:'300' }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ padding:'22px 26px', background:'linear-gradient(180deg,rgba(230,57,70,0.06),transparent)', border:'1px solid rgba(230,57,70,0.28)', borderRadius:'10px', position:'relative' }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,#E63946,transparent)' }} />
              <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'10px' }}>
                <span style={{ color:'#E63946', display:'inline-flex' }}><Icon name="alert" size={14} stroke={1.7} /></span>
                <p className="mono" style={{ fontSize:'10px', fontWeight:'800', color:'#E63946', letterSpacing:'2.5px', textTransform:'uppercase' }}>{isFr?'Avertissement Clinique Important':'Important Clinical Warning'}</p>
              </div>
              <p style={{ fontSize:'12.5px', color:'rgba(255,255,255,0.62)', lineHeight:'1.85', fontWeight:'300' }}>
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
            <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.62)', lineHeight:'1.85', marginBottom:'22px', fontWeight:'300', maxWidth:'760px' }}>
              {isFr
                ? "L'équité en IA médicale exige une compréhension honnête de là où les données et les modèles peuvent échouer. Voici les biais connus dans IllumaDX :"
                : "Fairness in medical AI requires honest understanding of where the data and models may fail. Here are the known biases in IllumaDX:"}
            </p>
            <div style={{ display:'grid', gap:'12px' }}>
              {[
                { icon:'database', title:isFr?'Biais du jeu de données':'Dataset Bias', level:isFr?'Modéré':'Moderate', color:'#FFB703', items:[
                  isFr?'3 sources Kaggle — principalement des MRI T1 pondérées, pas représentatives de tous les protocoles':'3 Kaggle sources — primarily T1-weighted MRI, not representative of all scanner protocols',
                  isFr?"Aucune métadonnée démographique disponible — origine ethnique, âge, sexe non vérifiés":"No demographic metadata available — ethnicity, age, sex not verified across dataset",
                  isFr?'Scanners Kaggle provenant probablement de systèmes similaires — manque de diversité scanner':'Kaggle scans likely from similar scanner systems — lacks scanner diversity (Siemens vs GE vs Philips)',
                ]},
                { icon:'brain', title:isFr?'Biais du modèle':'Model Bias', level:isFr?'Faible':'Low', color:'#10B981', items:[
                  isFr?'ResNet-18 préentraîné sur ImageNet — domaine de transfert non médical':'ResNet-18 pre-trained on ImageNet — non-medical transfer domain',
                  isFr?'Déséquilibre des classes corrigé par rééchantillonnage pondéré':'Class imbalance corrected via weighted random sampling',
                  isFr?'10 seeds pour la robustesse statistique — variance bien caractérisée':'10 seeds for statistical robustness — variance well-characterized',
                ]},
                { icon:'globe', title:isFr?'Feuille de route de généralisation':'Generalization Roadmap', level:isFr?'Prochaine étape':'Next Milestone', color:'#FFB703', items:[
                  isFr?'Étape actuelle — 7 627 IRM dédupliquées validées avec réplication 10 seeds (p < 0.000001)':'Current — 7,627 deduplicated MRI images validated with 10-seed replication (p < 0.000001)',
                  isFr?'Prochaine étape — validation externe sur données hospitalières albertaines (Dr. Jacob Jaremko, U of Alberta) — contact initié':'Next milestone — external validation on Alberta hospital imaging data (outreach initiated with Dr. Jacob Jaremko, U of Alberta)',
                  isFr?'Au-delà — validation multi-scanner (Siemens · GE · Philips) avant toute considération clinique':'Beyond — multi-scanner validation (Siemens · GE · Philips) before any clinical consideration',
                ]},
              ].map(({icon,title,level,color,items},bi)=>(
                <div key={title} style={{ background:'rgba(10,22,40,0.5)', border:`1px solid ${color}2A`, borderRadius:'10px', overflow:'hidden', position:'relative' }}>
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:`linear-gradient(90deg,transparent,${color},transparent)` }} />
                  <div style={{ padding:'16px 22px', background:`${color}08`, borderBottom:`1px solid ${color}1F`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'14px' }}>
                      <span className="mono" style={{ fontSize:'10px', color, letterSpacing:'2px', fontWeight:'700' }}>0{bi+1}</span>
                      <span style={{ color, display:'inline-flex' }}><Icon name={icon} size={16} stroke={1.5} /></span>
                      <span style={{ fontSize:'13px', fontWeight:'700', color:'#fff', letterSpacing:'0.2px' }}>{title}</span>
                    </div>
                    <span className="mono" style={{ fontSize:'9px', fontWeight:'800', color, border:`1px solid ${color}55`, padding:'3px 9px', borderRadius:'2px', letterSpacing:'1.5px', textTransform:'uppercase' }}>{level}</span>
                  </div>
                  <div style={{ padding:'16px 22px' }}>
                    {items.map((item,i)=>(
                      <div key={i} style={{ display:'flex', gap:'12px', marginBottom:'10px', alignItems:'flex-start' }}>
                        <span className="mono" style={{ fontSize:'10px', color, marginTop:'1px', flexShrink:0, fontWeight:'700' }}>▸</span>
                        <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.62)', lineHeight:'1.7', fontWeight:'300' }}>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PRIVACY */}
        {activeTab==='privacy' && (
          <div style={{ animation:'fadeIn 0.3s ease', display:'grid', gap:'12px' }}>
            {[
              { icon:'shield', title:isFr?'Données Patient':'Patient Data', color:'#10B981', desc:isFr?'Tous les dossiers patients affichés dans IllumaDX sont des données simulées à des fins de démonstration uniquement. Aucune donnée patient réelle n\'est stockée ou traitée.':'All patient records displayed in IllumaDX are simulated data for demonstration purposes only. No real patient data is stored or processed.', points:[
                isFr?'Aucune image IRM téléchargée n\'est stockée sur nos serveurs':'No uploaded MRI images are stored on our servers',
                isFr?'L\'inférence est effectuée et les résultats sont immédiatement supprimés':'Inference is performed and results are immediately discarded',
                isFr?'Aucun identifiant patient n\'est collecté ou transmis':'No patient identifiers are collected or transmitted',
                isFr?'Toutes les données de démonstration sont entièrement fictives':'All demonstration data is entirely fictional',
              ]},
              { icon:'globe', title:isFr?'Infrastructure':'Infrastructure', color:'#00B4D8', desc:isFr?"L'inférence backend est hébergée sur HuggingFace Spaces — une plateforme ML open source de confiance. Le frontend est déployé sur Vercel.":"Backend inference is hosted on HuggingFace Spaces — a trusted open-source ML platform. Frontend deployed on Vercel.", points:[
                isFr?'Backend: HuggingFace Spaces (FastAPI + PyTorch)':'Backend: HuggingFace Spaces (FastAPI + PyTorch)',
                isFr?'Frontend: Vercel (React + Vite)':'Frontend: Vercel (React + Vite)',
                isFr?'Communication HTTPS uniquement':'HTTPS-only communication',
                isFr?'Aucune journalisation des requêtes médicales':'No logging of medical queries',
              ]},
              { icon:'scale', title:isFr?'Cadre LPRPDE':'PIPEDA Framework', color:'#FFB703', desc:isFr?"Dans un contexte de déploiement réel, IllumaDX respecterait les exigences de la Loi sur la protection des renseignements personnels et les documents électroniques (LPRPDE) du Canada.":"In a real deployment context, IllumaDX would comply with Canada's Personal Information Protection and Electronic Documents Act (PIPEDA) requirements.", points:[
                isFr?'Consentement explicite requis pour le traitement des données de santé':'Explicit consent required for health data processing',
                isFr?'Droits d\'accès et suppression des données pour les patients':'Data access and deletion rights for patients',
                isFr?'Officier de protection des données désigné':'Designated data protection officer',
                isFr?'Rapport annuel de confidentialité':'Annual privacy audit',
              ]},
            ].map(({icon,title,color,desc,points},pi)=>(
              <div key={title} style={{ background:'rgba(10,22,40,0.5)', border:`1px solid ${color}2A`, borderRadius:'10px', padding:'24px 26px', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:`linear-gradient(90deg,transparent,${color},transparent)` }} />
                <div style={{ display:'flex', alignItems:'center', gap:'14px', marginBottom:'14px' }}>
                  <span className="mono" style={{ fontSize:'10px', color, letterSpacing:'2px', fontWeight:'700' }}>0{pi+1}</span>
                  <span style={{ color, display:'inline-flex' }}><Icon name={icon} size={18} stroke={1.5} /></span>
                  <span style={{ fontSize:'14px', fontWeight:'700', color:'#fff', letterSpacing:'0.2px' }}>{title}</span>
                </div>
                <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.55)', lineHeight:'1.8', marginBottom:'16px', fontWeight:'300' }}>{desc}</p>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px 16px' }}>
                  {points.map((p,i)=>(
                    <div key={i} style={{ display:'flex', gap:'10px', alignItems:'flex-start' }}>
                      <span className="mono" style={{ fontSize:'10px', color, marginTop:'1px', flexShrink:0, fontWeight:'700' }}>▸</span>
                      <span style={{ fontSize:'11.5px', color:'rgba(255,255,255,0.55)', lineHeight:'1.6' }}>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* COST */}
        {activeTab==='cost' && (
          <div style={{ animation:'fadeIn 0.3s ease' }}>
            <div style={{ background:'linear-gradient(180deg,rgba(0,180,216,0.04),transparent)', border:'1px solid rgba(0,180,216,0.22)', borderRadius:'10px', padding:'32px 34px', marginBottom:'18px', position:'relative' }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,#00B4D8,transparent)' }} />
              <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
                <span style={{ color:'#00B4D8', display:'inline-flex' }}><Icon name="chart" size={16} stroke={1.6} /></span>
                <p className="mono" style={{ fontSize:'10px', color:'#00B4D8', letterSpacing:'3px', fontWeight:'700', textTransform:'uppercase' }}>{isFr?'§ Analyse Coûts · Canada':'§ Cost Analysis · Canada'}</p>
              </div>
              <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.62)', lineHeight:'1.85', marginBottom:'12px', fontWeight:'300' }}>
                {isFr
                  ? "Sous le régime public d'Alberta (AHCIP), les consultations spécialisées et les IRM médicalement nécessaires sont couvertes — mais le véritable obstacle est le temps d'attente. Les patients qui veulent un accès plus rapide paient une IRM privée de leur poche. IllumaDX réduit le délai de triage, pas le coût direct du scan."
                  : "Under Alberta's public health plan (AHCIP), medically necessary specialist consults and MRIs are covered — but the real bottleneck is wait time. Patients seeking faster access pay out of pocket for private MRI clinics. IllumaDX shortens triage delay, not the direct scan cost."}
              </p>
              <p className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.38)', letterSpacing:'1.5px', marginBottom:'26px', fontStyle:'italic' }}>
                {isFr?'Sources: Fraser Institute (temps d\'attente 2023) · Alberta Health Services · études d\'IRM privées de l\'AB':'Sources: Fraser Institute wait-time report 2023 · Alberta Health Services · AB private MRI clinic rate surveys'}
              </p>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'26px' }}>
                <div style={{ padding:'22px', background:'rgba(230,57,70,0.05)', border:'1px solid rgba(230,57,70,0.25)', borderRadius:'10px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
                    <span style={{ color:'#E63946', display:'inline-flex' }}><Icon name="alert" size={12} stroke={1.7} /></span>
                    <p className="mono" style={{ fontSize:'10px', color:'#E63946', letterSpacing:'2.5px', fontWeight:'800', textTransform:'uppercase' }}>{isFr?'Parcours standard':'Standard Pathway'}</p>
                  </div>
                  {[
                    [isFr?'Consultation neurologie · public':'Neurology consult · public','Covered · 3–6 mo wait'],
                    [isFr?'IRM publique · AHCIP':'MRI · public (AHCIP)','Covered · weeks–months'],
                    [isFr?'IRM privée · accès rapide':'Private MRI · fast-track','$450 – $1,000 CAD'],
                    [isFr?'Temps perdu · travail / trajet':'Time off work · travel','Indirect cost'],
                    [isFr?'Délai au diagnostic':'Delay to diagnosis','Weeks to months'],
                  ].map(([l,v])=>(
                    <div key={l} style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', padding:'9px 0', borderBottom:'1px solid rgba(255,255,255,0.05)', gap:'12px' }}>
                      <span className="mono" style={{ fontSize:'10px', color:'rgba(255,255,255,0.5)', letterSpacing:'1px', textTransform:'uppercase' }}>{l}</span>
                      <span className="mono tnum" style={{ fontSize:'11px', fontWeight:'800', color:'#E63946', letterSpacing:'0.2px', textAlign:'right' }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div style={{ padding:'22px', background:'rgba(16,185,129,0.05)', border:'1px solid rgba(16,185,129,0.25)', borderRadius:'10px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
                    <span style={{ color:'#10B981', display:'inline-flex' }}><Icon name="zap" size={12} stroke={1.7} /></span>
                    <p className="mono" style={{ fontSize:'10px', color:'#10B981', letterSpacing:'2.5px', fontWeight:'800', textTransform:'uppercase' }}>{isFr?'Avec IllumaDX':'With IllumaDX Triage'}</p>
                  </div>
                  {[
                    [isFr?'Pré-triage IA':'AI pre-triage','< 30 seconds'],
                    [isFr?'Priorisation des cas urgents':'Urgent-case flagging','Escalated review'],
                    [isFr?'Équité rurale':'Rural equity','Equal access via internet'],
                    [isFr?'Licence modèle':'Model licensing','Open source · $0'],
                    [isFr?'Hébergement serveur':'Server hosting','< $50 / month'],
                  ].map(([l,v])=>(
                    <div key={l} style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', padding:'9px 0', borderBottom:'1px solid rgba(255,255,255,0.05)', gap:'12px' }}>
                      <span className="mono" style={{ fontSize:'10px', color:'rgba(255,255,255,0.5)', letterSpacing:'1px', textTransform:'uppercase' }}>{l}</span>
                      <span className="mono tnum" style={{ fontSize:'11px', fontWeight:'800', color:'#10B981', letterSpacing:'0.2px', textAlign:'right' }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Patient journey — featured */}
              <div style={{ marginBottom:'10px', display:'flex', alignItems:'baseline', justifyContent:'space-between', gap:'10px', flexWrap:'wrap' }}>
                <p className="mono" style={{ fontSize:'10px', color:'#00B4D8', letterSpacing:'2.5px', fontWeight:'700', textTransform:'uppercase' }}>{isFr?'§ Parcours patient · Albertain':'§ Patient Journey · Alberta'}</p>
                <p className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.45)', letterSpacing:'1.5px', textTransform:'uppercase' }}>{isFr?'La partie la plus importante':'The part that matters most'}</p>
              </div>
              <div style={{ padding:'24px 20px', background:'rgba(10,22,40,0.35)', border:'1px solid rgba(0,180,216,0.18)', borderRadius:'10px', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,#00B4D8 30%,#10B981 70%,transparent)' }} />
                {/* Timeline axis */}
                <div style={{ display:'grid', gridTemplateColumns:'repeat(9,1fr)', gap:0, alignItems:'stretch', minWidth:'600px', overflowX:'auto' }}>
                  {[
                    { type:'step', step:isFr?'Symptômes':'Symptoms',      desc:isFr?'Maux de tête, changements visuels':'Headaches, vision changes', icon:'alert', color:'#E63946', t:isFr?'Jour 0':'Day 0' },
                    { type:'gap',  label:isFr?'jours – semaines':'days – weeks' },
                    { type:'step', step:isFr?'Scan IRM':'MRI Scan',        desc:isFr?'Public ou privé':'Public or private',             icon:'brain', color:'#FFB703', t:isFr?'Sem. 2 – 12':'Wk 2 – 12' },
                    { type:'gap',  label:isFr?'< 30 s avec IllumaDX':'< 30 s with IllumaDX', highlight:true },
                    { type:'step', step:isFr?'Triage IA':'AI Triage',      desc:isFr?'IllumaDX · GradCAM++':'IllumaDX · GradCAM++',     icon:'zap',   color:'#00B4D8', aiOnly:true, t:isFr?'Instantané':'Instant' },
                    { type:'gap',  label:isFr?'priorisation':'priority sort' },
                    { type:'step', step:isFr?'Radiologue':'Radiologist',   desc:isFr?'Lecture & confirmation':'Read & confirmation',    icon:'user',  color:'#10B981', t:isFr?'Sem. 3 – 14':'Wk 3 – 14' },
                    { type:'gap',  label:isFr?'référence':'referral' },
                    { type:'step', step:isFr?'Traitement':'Treatment',     desc:isFr?'Plan clinique initié':'Care plan initiated',       icon:'pill',  color:'#10B981', t:isFr?'Sem. 4 – 20':'Wk 4 – 20' },
                  ].map((it,i)=>{
                    if (it.type === 'gap') {
                      return (
                        <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'0 2px', minWidth:'48px' }}>
                          <div style={{ width:'100%', height:'1px', background:it.highlight?'linear-gradient(90deg,#00B4D8,#10B981)':'rgba(255,255,255,0.18)', marginBottom:'6px' }} />
                          <span className="mono" style={{ fontSize:'8px', color:it.highlight?'#00B4D8':'rgba(255,255,255,0.35)', letterSpacing:'0.8px', textTransform:'uppercase', fontWeight:it.highlight?'800':'600', textAlign:'center', lineHeight:1.3 }}>{it.label}</span>
                        </div>
                      )
                    }
                    return (
                      <div key={i} style={{ padding:'16px 12px 14px', background:`${it.color}0A`, border:`1px solid ${it.color}40`, borderRadius:'8px', textAlign:'center', position:'relative', minWidth:'108px', boxShadow:it.aiOnly?`0 0 24px ${it.color}22`:'none' }}>
                        <div style={{ position:'absolute', top:6, left:8, color:it.color }}><span className="mono" style={{ fontSize:'8.5px', fontWeight:'800', letterSpacing:'0.5px', opacity:0.75 }}>0{Math.floor(i/2)+1}</span></div>
                        <div style={{ color:it.color, display:'inline-flex', marginBottom:'8px', marginTop:'6px' }}><Icon name={it.icon} size={22} stroke={1.6} /></div>
                        <p className="mono" style={{ fontSize:'10px', fontWeight:'800', color:it.color, marginBottom:'4px', letterSpacing:'1px', textTransform:'uppercase' }}>{it.step}</p>
                        <p style={{ fontSize:'9px', color:'rgba(255,255,255,0.55)', lineHeight:'1.5', marginBottom:'8px' }}>{it.desc}</p>
                        <span className="mono tnum" style={{ fontSize:'9px', color:'rgba(255,255,255,0.5)', letterSpacing:'1px', textTransform:'uppercase', padding:'2px 7px', borderRadius:'2px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', fontWeight:'700' }}>{it.t}</span>
                        {it.aiOnly && <div className="mono" style={{ marginTop:'8px', fontSize:'8px', background:'rgba(0,180,216,0.25)', color:'#00B4D8', padding:'2px 6px', borderRadius:'2px', fontWeight:'800', letterSpacing:'1.2px' }}>{isFr?'SEUL. IA':'AI ONLY'}</div>}
                      </div>
                    )
                  })}
                </div>
                {/* Legend under timeline */}
                <div style={{ marginTop:'18px', paddingTop:'14px', borderTop:'1px dashed rgba(255,255,255,0.1)', display:'flex', gap:'20px', flexWrap:'wrap', justifyContent:'space-between', alignItems:'center' }}>
                  <div style={{ display:'flex', gap:'14px', flexWrap:'wrap' }}>
                    <span className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.45)', letterSpacing:'1.2px', textTransform:'uppercase', display:'inline-flex', alignItems:'center', gap:'6px' }}><span style={{ width:'8px', height:'8px', background:'#E63946', borderRadius:'50%' }} />{isFr?'Sans IA · semaines':'Without AI · weeks of delay'}</span>
                    <span className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.45)', letterSpacing:'1.2px', textTransform:'uppercase', display:'inline-flex', alignItems:'center', gap:'6px' }}><span style={{ width:'8px', height:'8px', background:'#00B4D8', borderRadius:'50%', boxShadow:'0 0 8px #00B4D8' }} />{isFr?'Avec IllumaDX · secondes':'With IllumaDX · seconds'}</span>
                  </div>
                  <span className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.35)', letterSpacing:'1px', textTransform:'uppercase', fontStyle:'italic' }}>{isFr?'Triage · pas remplacement':'Triage support · not replacement'}</span>
                </div>
              </div>
            </div>

            <div style={{ padding:'22px 26px', background:'linear-gradient(180deg,rgba(16,185,129,0.05),transparent)', border:'1px solid rgba(16,185,129,0.25)', borderRadius:'10px', position:'relative' }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,#10B981,transparent)' }} />
              <p className="mono" style={{ fontSize:'10px', fontWeight:'800', color:'#10B981', marginBottom:'10px', letterSpacing:'2.5px', textTransform:'uppercase' }}>
                {isFr?'Impact Potentiel':'Potential Impact'}
              </p>
              <p style={{ fontSize:'12.5px', color:'rgba(255,255,255,0.62)', lineHeight:'1.85', fontWeight:'300' }}>
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
  const hasMaps = result && (result.heatmap_b || result.heatmap_d || result.heatmap_consensus)
  const v = patient.vitals || {}
  const rr = patient.radiologyReport || null
  const refs = patient.referrals || []
  const rx = patient.prescribedToday || []
  const edu = patient.patientEducation || ''
  const labs = patient.labs || []
  const radiologist = patient.radiologist || null
  const nextImg = patient.nextImaging || ''
  const recentLabs = labs.slice(0,1).flatMap(p => p.values.filter(r => String(r.flag||'').toLowerCase().includes('high') || String(r.flag||'').toLowerCase().includes('low')).slice(0,4))
  const esc = (s) => String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
  // Plain-language dictionary — protects multi-word phrases before single tokens
  const specialtyPlain = {
    'Neuro-Oncology (tumor board)': isFr?'Oncologie · Comité de tumeur (équipe du cancer du cerveau)':'Neuro-Oncology Tumor Board (brain cancer team)',
    'Neuro-Oncology': isFr?'Oncologie (spécialiste du cancer du cerveau)':'Neuro-Oncology (brain cancer specialist)',
    'Neurosurgery follow-up': isFr?'Suivi de neurochirurgie':'Neurosurgery follow-up',
    'Neurosurgery': isFr?'Neurochirurgie':'Neurosurgery (brain surgery team)',
    'Radiation Oncology': isFr?'Radio-oncologie':'Radiation Oncology (radiation treatment team)',
    'Endocrinology': isFr?'Endocrinologie':'Endocrinology (hormone specialist)',
    'Ophthalmology': isFr?'Ophtalmologie':'Ophthalmology (eye specialist)',
    'Epileptology': isFr?'Épileptologie':'Epileptology (seizure specialist)',
    'Palliative Care': isFr?'Soins palliatifs':'Palliative Care (comfort & symptom support)',
    'Physical Therapy': isFr?'Physiothérapie':'Physical Therapy',
    'Occupational Therapy': isFr?'Ergothérapie':'Occupational Therapy (daily-living skills)',
    'Social Work': isFr?'Travail social':'Social Work (support services)',
    'Genetic Counselling': isFr?'Conseil génétique':'Genetic Counselling',
    'Bone Health Clinic': isFr?'Clinique de santé osseuse':'Bone Health Clinic',
    'Familial CNS Malignancy Registry': isFr?'Registre familial de cancer du SNC':'Family CNS Cancer Registry',
  }
  const friendlySpecialty = (name) => specialtyPlain[name] || name
  // Translate common medical abbreviations in long prose (plan, education, impression)
  const humanize = (t) => String(t||'')
    .replace(/\bPO\s+BID\b/g, 'by mouth, twice daily')
    .replace(/\bPO\s+TID\b/g, 'by mouth, three times daily')
    .replace(/\bPO\s+QID\b/g, 'by mouth, four times daily')
    .replace(/\bPO\s+daily\b/gi, 'by mouth, once daily')
    .replace(/\bPO\s+Q(\d+)H\s+PRN\b/g, 'by mouth every $1 hours as needed')
    .replace(/\bPO\s+Q(\d+)H\b/g, 'by mouth every $1 hours')
    .replace(/\bPO\s+QHS\b/g, 'by mouth at bedtime')
    .replace(/\bPO\s+PRN\b/g, 'by mouth as needed')
    .replace(/\bPRN\b/g, 'as needed')
    .replace(/\bPO\b/g, 'by mouth')
    .replace(/\bBID\b/g, 'twice daily')
    .replace(/\bTID\b/g, 'three times daily')
    .replace(/\bQID\b/g, 'four times daily')
    .replace(/\bSTAT\b/g, 'urgent')
    .replace(/\bstat\s/g, 'urgent ')
    .replace(/\bGTR\b/g, 'complete removal')
    .replace(/\bANC\b/g, 'white-cell count')
    .replace(/\bCBC\b/g, 'blood count')
    .replace(/\bHbA1c\b/g, 'HbA1c (3-month sugar)')
    .replace(/\bTMZ\b/g, 'temozolomide chemotherapy')
    .replace(/\bGBM\b/g, 'glioblastoma')
    .replace(/\bRT\s/g, 'radiation therapy ')
    .replace(/\bHTN\b/g, 'high blood pressure')
    .replace(/\bT2DM\b/g, 'Type 2 diabetes')
    .replace(/\bhr\b/g, 'hours')
    .replace(/\bw\/\b/g, 'with ')
    .replace(/peritumoral edema/gi, 'swelling around the tumor')
    .replace(/peri-tumoral edema/gi, 'swelling around the tumor')
    .replace(/vasogenic edema/gi, 'brain tissue swelling')
    .replace(/expressive aphasia/gi, 'trouble finding words (aphasia)')
    .replace(/bitemporal hemianopia/gi, 'loss of side vision in both eyes')
    .replace(/Valsalva/g, 'straining (lifting or coughing)')
    .replace(/\bG(\d+)P(\d+)\b/g, (m,g,p)=>`${g} pregnancies, ${p} births`)
    .replace(/\btumor board\b/gi, 'specialist team review')
    .replace(/\badjuvant\b/gi, 'additional')
  const win = window.open('', '_blank')
  win.document.write(`<!DOCTYPE html><html><head><title>IllumaDX AVS — ${esc(patient.name)}</title>
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Inter',-apple-system,sans-serif;background:#fff;color:#1a1a1a;padding:28px 32px;font-size:11.5px;line-height:1.5}
  .mono{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-variant-numeric:tabular-nums}
  .sim-banner{background:#E63946;color:#fff;padding:9px 16px;margin:-28px -32px 18px;display:flex;align-items:center;justify-content:center;gap:10px;font-family:ui-monospace,monospace;font-size:10px;font-weight:800;letter-spacing:2.5px;text-transform:uppercase;border-bottom:3px solid #b52a35}
  .sim-banner .dot{width:8px;height:8px;background:#fff;border-radius:50%;animation:none}
  .header{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #0A1628;padding-bottom:14px;margin-bottom:14px}
  .logo{font-size:24px;font-weight:900;letter-spacing:1.5px;line-height:1}
  .logo span{color:#00B4D8}
  .tagline{font-size:9px;color:#888;margin-top:4px;letter-spacing:2px;text-transform:uppercase;font-weight:700}
  .badge{display:inline-block;background:#0A1628;color:#fff;font-size:8px;font-weight:800;padding:3px 9px;border-radius:2px;letter-spacing:2.5px;margin-bottom:6px}
  .report-meta{text-align:right;font-size:9.5px;color:#555;line-height:1.75}
  .report-meta strong{color:#111;font-weight:700}
  .pt-strip{background:#f8fafc;border:1px solid #e0e6ed;border-radius:4px;padding:10px 14px;margin-bottom:14px;display:flex;flex-wrap:wrap;gap:16px;align-items:baseline;font-size:11px}
  .pt-name{font-size:14px;font-weight:800;color:#0A1628}
  .pt-strip .sep{color:#ccc}
  .pt-strip .lbl{font-family:ui-monospace,monospace;font-size:8.5px;color:#888;letter-spacing:1.5px;text-transform:uppercase;font-weight:700;margin-right:4px}
  .pt-strip .val{font-family:ui-monospace,monospace;font-weight:600;color:#222}
  .section{margin-bottom:14px;break-inside:avoid}
  .sec-title{font-size:10px;font-weight:800;letter-spacing:2.2px;color:#0A1628;margin-bottom:8px;padding-bottom:5px;border-bottom:1.5px solid #0A1628;text-transform:uppercase;display:flex;justify-content:space-between;align-items:baseline}
  .sec-title .num{color:#00B4D8;font-family:ui-monospace,monospace;font-weight:800;margin-right:2px}
  .sec-title .aux{font-family:ui-monospace,monospace;font-size:8.5px;color:#888;font-weight:600;letter-spacing:1.2px}
  p{font-size:11.5px;color:#333;line-height:1.65}
  .lead-text{font-size:12px;color:#222;line-height:1.7;padding:6px 0}
  .vitals-inline{background:#fafbfc;border:1px solid #e8e8e8;border-radius:4px;padding:8px 12px;font-family:ui-monospace,monospace;font-size:10.5px;color:#333;display:flex;flex-wrap:wrap;gap:12px;margin-top:6px}
  .vitals-inline .vi-lbl{color:#888;font-size:8.5px;letter-spacing:1.3px;text-transform:uppercase;font-weight:700;margin-right:4px}
  .vitals-inline .vi-val{color:#0A1628;font-weight:700}
  .result-row{display:grid;grid-template-columns:1.4fr 1fr;gap:14px;align-items:stretch;margin-bottom:10px}
  .impression-box{border:1px solid #d5dde5;border-left:3px solid #0A1628;border-radius:3px;padding:10px 14px;background:#f8fafc}
  .impression-box .imp-lbl{font-family:ui-monospace,monospace;font-size:8.5px;color:#0A1628;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:4px}
  .impression-box p{font-size:11.5px;color:#111;line-height:1.65;font-weight:500}
  .result-box{background:linear-gradient(180deg,#f8fafc,#fff);border:2px solid ${tumorColor};border-radius:5px;padding:12px 16px;display:flex;justify-content:space-between;align-items:center}
  .prediction{font-size:24px;font-weight:900;color:${tumorColor};letter-spacing:1.8px;text-transform:uppercase;line-height:1}
  .confidence{font-size:28px;font-weight:900;color:#10B981;font-variant-numeric:tabular-nums;line-height:1}
  .result-box .lbl{font-family:ui-monospace,monospace;font-size:8px;color:#999;letter-spacing:1.5px;text-transform:uppercase;font-weight:700;margin-bottom:4px}
  .bars{margin-top:8px}
  .bar-row{display:flex;align-items:center;gap:8px;margin-bottom:5px}
  .bar-label{width:80px;font-family:ui-monospace,monospace;font-size:8.5px;font-weight:800;text-transform:uppercase;letter-spacing:1.1px}
  .bar-track{flex:1;height:4px;background:#eee;border-radius:2px;overflow:hidden}
  .bar-fill{height:100%;border-radius:2px}
  .bar-val{width:42px;text-align:right;font-family:ui-monospace,monospace;font-size:9px;font-weight:700;font-variant-numeric:tabular-nums}
  .hm-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:5px;margin-top:8px}
  .hm-card{border:1px solid #e0e0e0;border-radius:3px;overflow:hidden;background:#fff}
  .hm-card img{width:100%;display:block}
  .hm-label{padding:4px 7px;font-family:ui-monospace,monospace;font-size:8px;font-weight:700;letter-spacing:1px;text-transform:uppercase;background:#fafafa;border-top:1px solid #eee;text-align:center}
  .ai-meta{font-family:ui-monospace,monospace;font-size:8.5px;color:#888;letter-spacing:1.2px;text-transform:uppercase;margin-top:5px;text-align:center}
  ul.cl{list-style:none;padding:0;margin:4px 0}
  ul.cl li{padding:3px 0 3px 14px;position:relative;font-size:11px;color:#333;line-height:1.55}
  ul.cl li::before{content:'▸';position:absolute;left:0;color:#00B4D8;font-weight:700}
  .new-tag{display:inline-block;font-family:ui-monospace,monospace;font-size:7.5px;font-weight:800;color:#fff;background:#E63946;padding:1.5px 5px;border-radius:2px;letter-spacing:1px;margin-right:7px;vertical-align:2px}
  .cont-tag{display:inline-block;font-family:ui-monospace,monospace;font-size:7.5px;font-weight:800;color:#666;background:#e5e5e5;padding:1.5px 5px;border-radius:2px;letter-spacing:1px;margin-right:7px;vertical-align:2px}
  .plan-box{background:#f0f9ff;border-left:3px solid #00B4D8;padding:10px 14px;border-radius:3px;font-size:11px;color:#1a3a4a;line-height:1.65}
  .edu-box{background:#f3fbf7;border-left:3px solid #10B981;padding:10px 14px;border-radius:3px;font-size:11px;color:#1a3a28;line-height:1.65}
  .problem-item{display:flex;gap:10px;padding:6px 0;font-size:11px;border-bottom:1px solid #f3f3f3;align-items:baseline}
  .problem-item:last-child{border-bottom:none}
  .problem-label{flex:1;color:#222;font-weight:600}
  .problem-code{font-family:ui-monospace,monospace;font-weight:700;color:#888;font-size:9.5px;background:#f3f4f6;padding:2px 7px;border-radius:2px;letter-spacing:0.5px;flex-shrink:0}
  .sec-caption{font-size:9.5px;color:#888;font-weight:400;letter-spacing:0.5px;text-transform:none;font-family:'Inter',sans-serif;margin-top:2px}
  .contact-box{margin-top:14px;background:#f3f4f6;border-radius:4px;padding:11px 14px;display:flex;justify-content:space-between;align-items:center;gap:14px;flex-wrap:wrap;font-size:10.5px}
  .contact-box .q{color:#0A1628;font-weight:700}
  .contact-box .n{font-family:ui-monospace,monospace;color:#333;font-variant-numeric:tabular-nums}
  .refs-row{display:flex;gap:10px;padding:5px 0;border-bottom:1px solid #f0f0f0;font-size:10.5px;align-items:baseline}
  .refs-row:last-child{border-bottom:none}
  .refs-to{font-weight:800;color:#0A1628;width:130px;flex-shrink:0}
  .refs-reason{flex:1;color:#444;font-size:10px;line-height:1.5}
  .refs-urg{font-family:ui-monospace,monospace;font-size:9px;letter-spacing:0.8px;text-transform:uppercase;flex-shrink:0;width:80px;text-align:right}
  .grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
  .sub-label{font-size:9px;color:#0A1628;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:5px;padding-bottom:3px;border-bottom:1px solid #e0e0e0}
  .scan-compact{display:flex;gap:8px;padding:5px 0;border-bottom:1px solid #f0f0f0;font-size:10.5px}
  .scan-compact:last-child{border-bottom:none}
  .scan-compact .dot{width:5px;height:5px;border-radius:50%;background:#0A1628;flex-shrink:0;margin-top:7px}
  .scan-compact .dot.ai{background:#00B4D8}
  .scan-compact .body{flex:1}
  .scan-compact .r{font-weight:700;color:#111}
  .scan-compact .m{font-family:ui-monospace,monospace;font-size:9px;color:#888;letter-spacing:0.4px;margin-top:1px}
  .labs-compact{display:flex;flex-wrap:wrap;gap:8px}
  .lab-chip{font-family:ui-monospace,monospace;font-size:10px;padding:3px 8px;border-radius:3px;border:1px solid #e0e0e0;background:#fafbfc}
  .lab-chip .l{color:#888;font-weight:700;letter-spacing:0.5px}
  .lab-chip .v{font-weight:800;margin-left:4px}
  .signoff{margin-top:14px;display:grid;grid-template-columns:1fr 1fr;gap:24px;font-size:9.5px}
  .sig-line{border-bottom:1px solid #999;height:22px}
  .sig-label{color:#888;margin-top:4px;letter-spacing:1.4px;text-transform:uppercase;font-weight:700;font-size:8px}
  .disclaimer-big{background:#fff3f4;border:2px solid #E63946;border-radius:5px;padding:14px 18px;margin-top:16px}
  .disclaimer-big .hd{display:flex;align-items:center;gap:8px;margin-bottom:6px}
  .disclaimer-big .hd-lbl{font-family:ui-monospace,monospace;font-size:10px;font-weight:800;color:#E63946;letter-spacing:2px;text-transform:uppercase}
  .disclaimer-big p{font-size:10.5px;color:#5a0f13;line-height:1.65}
  .disclaimer-big strong{color:#E63946}
  .footer{margin-top:14px;padding-top:10px;border-top:1px solid #eee;display:flex;justify-content:space-between;font-family:ui-monospace,monospace;font-size:8.5px;color:#aaa;letter-spacing:1px;text-transform:uppercase}
  @media print{body{padding:18px 24px}.sim-banner{margin:-18px -24px 14px}.section{page-break-inside:avoid}}
  </style>
  </head><body>

  <div class="sim-banner">
    <span class="dot"></span>
    ${isFr?'Données de Démonstration Simulées · Profil Patient Fictif · Aucune Personne Réelle':'Simulated Demonstration Data · Fictional Patient Profile · Not a Real Person'}
    <span class="dot"></span>
  </div>

  <div class="header">
    <div>
      <div class="logo">ILLUMA<span>DX</span></div>
      <div class="tagline">${isFr?'Résumé de Visite · After Visit Summary':'After Visit Summary'}</div>
    </div>
    <div class="report-meta">
      <div class="badge">${isFr?'Résumé de Visite':'After Visit Summary'}</div><br>
      <strong>${isFr?'Visite':'Visit'}:</strong> <span class="mono">${now.toLocaleDateString('en-CA')} · ${now.toLocaleTimeString('en-CA',{hour:'2-digit',minute:'2-digit'})}</span><br>
      <strong>${isFr?'Établissement':'Facility'}:</strong> ${esc(patient.facility)}<br>
      <strong>${isFr?'Médecin':'Provider'}:</strong> ${esc(patient.physician)} · ${esc(patient.dept)}
    </div>
  </div>

  <!-- PATIENT IDENTIFICATION STRIP -->
  <div class="pt-strip">
    <span class="pt-name">${esc(patient.name)}</span>
    <span class="sep">·</span>
    <span><span class="lbl">MRN</span><span class="val">${esc(patient.id)}</span></span>
    <span class="sep">·</span>
    <span><span class="lbl">DOB</span><span class="val">${esc(patient.dob)} (${patient.age}Y · ${esc(patient.sex)})</span></span>
    <span class="sep">·</span>
    <span><span class="lbl">Blood</span><span class="val">${esc(patient.bloodType)}</span></span>
    ${patient.ahcip ? `<span class="sep">·</span><span><span class="lbl">AHCIP</span><span class="val">${esc(patient.ahcip)}</span></span>` : ''}
  </div>

  <!-- §01 YOUR VISIT TODAY -->
  <div class="section">
    <div class="sec-title"><span><span class="num">§ 01</span> ${isFr?'Votre Visite Aujourd\'hui':'Your Visit Today'}</span><span class="aux">${esc(patient.scanDate)}</span></div>
    ${patient.presentingComplaint ? `<p class="lead-text"><strong>${isFr?'Motif':'Reason for visit'}:</strong> ${esc(humanize(patient.presentingComplaint))}</p>` : ''}
    ${v.bp ? `<div class="vitals-inline">
      <span><span class="vi-lbl">${isFr?'Tension':'Blood pressure'}</span><span class="vi-val">${esc(v.bp)}</span></span>
      ${v.hr ? `<span><span class="vi-lbl">${isFr?'Pouls':'Heart rate'}</span><span class="vi-val">${esc(v.hr)} bpm</span></span>` : ''}
      ${v.temp ? `<span><span class="vi-lbl">${isFr?'Temp.':'Temp.'}</span><span class="vi-val">${esc(v.temp)}°C</span></span>` : ''}
      ${v.o2 ? `<span><span class="vi-lbl">${isFr?'Oxygène':'Oxygen'}</span><span class="vi-val">${esc(v.o2)}%</span></span>` : ''}
      ${v.weight ? `<span><span class="vi-lbl">${isFr?'Poids':'Weight'}</span><span class="vi-val">${esc(v.weight)} kg</span></span>` : ''}
      ${v.gcs ? `<span><span class="vi-lbl">${isFr?'Éveil (GCS)':'Alertness (GCS)'}</span><span class="vi-val">${esc(v.gcs)}/15</span></span>` : ''}
    </div>` : ''}
  </div>

  <!-- §02 WHAT WE FOUND -->
  <div class="section">
    <div class="sec-title"><span><span class="num">§ 02</span> ${isFr?'Ce Que Nous Avons Trouvé':'What We Found'}</span><span class="aux">${isFr?'IRM · Analyse IA':'MRI · AI analysis'}</span></div>
    <div class="result-row">
      ${rr && rr.impression ? `<div class="impression-box">
        <div class="imp-lbl">${isFr?'Ce que le radiologue a vu':'What the radiologist saw'}</div>
        <p>${esc(humanize(rr.impression))}</p>
      </div>` : `<div class="impression-box">
        <div class="imp-lbl">${isFr?'Ce que le radiologue a vu':'What the radiologist saw'}</div>
        <p style="color:#888;font-style:italic">${isFr?'Le radiologue révise encore le scan — son interprétation complète suivra.':'The radiologist is still reviewing the scan — their full read will follow.'}</p>
      </div>`}
      <div class="result-box">
        <div>
          <div class="lbl">${isFr?'Évaluation IA':'AI assessment'}</div>
          <div class="prediction">${esc(result.prediction)}</div>
        </div>
        <div style="text-align:right">
          <div class="lbl">${isFr?'Confiance':'Confidence'}</div>
          <div class="confidence">${(result.confidence*100).toFixed(1)}%</div>
        </div>
      </div>
    </div>
    <div class="bars">
      ${['glioma','meningioma','notumor','pituitary'].map(cls=>{const p=(result.probabilities[cls]||0)*100;const isTop=cls===result.prediction;const c=CLASS_COLORS[cls];return`<div class="bar-row"><div class="bar-label" style="color:${isTop?c:'#666'}">${cls}</div><div class="bar-track"><div class="bar-fill" style="width:${p.toFixed(1)}%;background:${isTop?c:'#d5d5d5'}"></div></div><div class="bar-val" style="color:${isTop?c:'#888'}">${p.toFixed(1)}%</div></div>`}).join('')}
    </div>
    ${hasMaps ? `
    <div class="hm-grid">
      ${result.heatmap_b ? `<div class="hm-card"><img src="data:image/png;base64,${result.heatmap_b}" alt="Primary AI model heatmap" /><div class="hm-label" style="color:#10B981">${isFr?'Modèle principal':'Main AI model'}</div></div>` : ''}
      ${result.heatmap_d ? `<div class="hm-card"><img src="data:image/png;base64,${result.heatmap_d}" alt="Cross-check AI model heatmap" /><div class="hm-label" style="color:#FFB703">${isFr?'Vérification croisée':'Cross-check'}</div></div>` : ''}
      ${result.heatmap_consensus ? `<div class="hm-card"><img src="data:image/png;base64,${result.heatmap_consensus}" alt="Combined AI analysis heatmap" /><div class="hm-label" style="color:#00B4D8">${isFr?'Vue combinée':'Combined view'}</div></div>` : ''}
    </div>
    <div class="ai-meta">${isFr?'Les zones colorées montrent où l\'IA a regardé sur votre scan':'Colored areas show where the AI looked on your scan'}</div>` : ''}
  </div>

  ${patient.problemList && patient.problemList.length ? `
  <!-- §03 YOUR ACTIVE DIAGNOSES -->
  <div class="section">
    <div class="sec-title">
      <span><span class="num">§ 03</span> ${isFr?'Vos Diagnostics Actifs':'Your Active Diagnoses'}</span>
      <span class="aux">${isFr?'conditions gérées aujourd\'hui':'conditions managed today'}</span>
    </div>
    ${patient.problemList.map(p=>`<div class="problem-item"><span class="problem-label">${esc(p.label)}</span><span class="problem-code" title="${isFr?'Code de référence ICD-10':'ICD-10 reference code'}">${esc(p.code)}</span></div>`).join('')}
  </div>` : ''}

  <!-- §04 YOUR MEDICATIONS -->
  <div class="section">
    <div class="sec-title"><span><span class="num">§ 04</span> ${isFr?'Vos Médicaments':'Your Medications'}</span></div>
    ${rx.length ? `<div style="margin-bottom:8px">
      <div class="sub-label" style="color:#E63946">${isFr?'Nouveaux ou modifiés aujourd\'hui':'New or changed today'}</div>
      <ul class="cl">${rx.map(x=>`<li><span class="new-tag">${isFr?'NOUV':'NEW'}</span>${esc(humanize(x))}</li>`).join('')}</ul>
    </div>` : ''}
    <div>
      <div class="sub-label">${isFr?'Continués (sans changement)':'Continued (no change)'}</div>
      <ul class="cl">${patient.medications.map(x=>`<li><span class="cont-tag">${isFr?'CONT':'CONT'}</span>${esc(humanize(x))}</li>`).join('')}</ul>
    </div>
  </div>

  ${refs.length || nextImg ? `
  <!-- §05 ORDERED TODAY -->
  <div class="section">
    <div class="sec-title"><span><span class="num">§ 05</span> ${isFr?'Commandé Aujourd\'hui':'Ordered Today'}</span></div>
    ${refs.length ? `<div style="margin-bottom:${nextImg?'10px':'0'}">
      <div class="sub-label">${isFr?'Rendez-vous avec des spécialistes':'Specialist appointments'}</div>
      ${refs.map(r => `<div class="refs-row"><span class="refs-to">${esc(friendlySpecialty(r.to))}</span><span class="refs-reason">${esc(humanize(r.reason))}</span><span class="refs-urg" style="color:${String(r.urgency||'').toLowerCase().includes('stat')||String(r.urgency||'').toLowerCase().includes('48')?'#E63946':'#666'}">${esc(r.urgency)}</span></div>`).join('')}
    </div>` : ''}
    ${nextImg ? `<div>
      <div class="sub-label">${isFr?'Prochain examen d\'imagerie':'Your next scan'}</div>
      <p style="font-size:11px;color:#222;line-height:1.6;padding:4px 0">${esc(humanize(nextImg))}</p>
    </div>` : ''}
  </div>` : ''}

  ${edu ? `
  <!-- §06 YOUR INSTRUCTIONS -->
  <div class="section">
    <div class="sec-title"><span><span class="num">§ 06</span> ${isFr?'Vos Instructions':'Your Instructions'}</span></div>
    <div class="edu-box">${esc(humanize(edu))}</div>
  </div>` : ''}

  ${patient.plan ? `
  <!-- §07 FOLLOW-UP PLAN -->
  <div class="section">
    <div class="sec-title"><span><span class="num">§ 07</span> ${isFr?'Plan de Suivi':'Your Follow-up Plan'}</span></div>
    <div class="plan-box">${esc(humanize(patient.plan))}</div>
  </div>` : ''}

  <!-- §08 FOR YOUR RECORDS -->
  <div class="section" style="break-inside:avoid">
    <div class="sec-title"><span><span class="num">§ 08</span> ${isFr?'Pour Vos Dossiers':'For Your Records'}</span></div>
    <div class="grid2">
      <div>
        <div class="sub-label" style="color:#E63946">${isFr?'Vos Allergies':'Your Allergies'}</div>
        <ul class="cl">${patient.allergies.map(x=>`<li style="color:#5a0f13;font-size:10.5px">${esc(x)}</li>`).join('')}</ul>
      </div>
      <div>
        <div class="sub-label">${isFr?'Historique bref':'Brief History'}</div>
        <p style="font-size:10px;color:#555;line-height:1.55">${esc(humanize(patient.history.length > 260 ? patient.history.slice(0,260)+'…' : patient.history))}</p>
      </div>
    </div>
    ${recentLabs.length ? `<div style="margin-top:10px">
      <div class="sub-label">${isFr?'Résultats clés récents':'Key Recent Labs'} ${labs[0]?`<span class="mono" style="font-size:8px;color:#888;font-weight:600;margin-left:6px">${esc(labs[0].date)}</span>`:''}</div>
      <div class="labs-compact">${recentLabs.map(r => `<span class="lab-chip"><span class="l">${esc(r.name)}</span><span class="v" style="color:${String(r.flag||'').toLowerCase().includes('high')||String(r.flag||'').toLowerCase().includes('low')?'#E63946':'#10B981'}">${esc(r.value)}${esc(r.unit)?' '+esc(r.unit):''}</span></span>`).join('')}</div>
    </div>` : ''}
    <div style="margin-top:10px">
      <div class="sub-label">${isFr?'Imagerie récente':'Recent Imaging'} <span class="mono" style="font-size:8px;color:#888;font-weight:600;margin-left:6px">${isFr?'3 dernières':'last 3'}</span></div>
      ${patient.scanHistory.slice(0,3).map(s=>{const isAI=s.provider==='IllumaDX AI System';return`<div class="scan-compact"><div class="dot ${isAI?'ai':''}"></div><div class="body"><div class="r">${esc(s.result)}</div><div class="m">${esc(s.date)} · ${esc(s.type)}</div></div></div>`}).join('')}
    </div>
  </div>

  <!-- QUESTIONS / CONTACT -->
  <div class="contact-box">
    <span class="q">${isFr?'Des questions à propos de cette visite?':'Questions about this visit?'}</span>
    <span class="n">${esc(patient.facility)} · ${esc(patient.dept)}</span>
    <span class="n">${isFr?'Médecin':'Provider'}: ${esc(patient.physician)}</span>
    <span class="n">${isFr?'Urgence':'Urgent care'}: 911 · Health Link 811</span>
  </div>

  <!-- SIGNATURES -->
  <div class="signoff">
    <div>
      <div class="sig-line"></div>
      <div class="sig-label">${isFr?'Médecin Traitant':'Attending Physician'}</div>
      <div style="font-size:9.5px;color:#666;margin-top:3px">${esc(patient.physician)}</div>
    </div>
    <div>
      <div class="sig-line"></div>
      <div class="sig-label">${isFr?'Radiologue':'Radiologist'}</div>
      <div style="font-size:9.5px;color:#666;margin-top:3px">${esc(radiologist||'—')}</div>
    </div>
  </div>

  <!-- DISCLAIMER (prominent) -->
  <div class="disclaimer-big">
    <div class="hd">
      <span style="color:#E63946;font-size:14px">⚠</span>
      <span class="hd-lbl">${isFr?'Avis de Démonstration · Données Fictives':'Demonstration Notice · Fictional Data'}</span>
    </div>
    <p>${isFr?'<strong>Ce rapport est généré à partir de données patient entièrement fictives à des fins de démonstration uniquement.</strong> Tous les noms, numéros d\'identification, antécédents cliniques et détails médicaux sont inventés. Toute ressemblance avec des personnes réelles est fortuite. IllumaDX est un outil de recherche et n\'est pas approuvé par Santé Canada pour usage clinique.':'<strong>This report is generated from entirely fictional patient data for demonstration purposes only.</strong> All names, identification numbers, clinical histories, and medical details are invented. Any resemblance to real individuals is coincidental. IllumaDX is a research tool and is not approved by Health Canada for clinical use.'}</p>
  </div>

  <div class="footer">
    <div>IllumaDX · ${isFr?'Résumé de Visite Simulé':'Simulated After Visit Summary'} · ${esc(patient.id)}</div>
    <div>${now.toLocaleDateString('en-CA')}</div>
  </div>

  <script>window.onload=()=>setTimeout(()=>window.print(),300)</script>
  </body></html>`)
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
    const newEntry = { date:dateStr, type:'MRI Brain — IllumaDX AI Analysis', result:`${result.prediction.toUpperCase()} — ${(result.confidence*100).toFixed(1)}% confidence (IllumaDX)`, provider:'IllumaDX AI System', notes:`IllumaDX AI analysis with GradCAM++ interpretability. ${result.prediction.charAt(0).toUpperCase()+result.prediction.slice(1)} classification at ${(result.confidence*100).toFixed(1)}% confidence.` }
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

      {/* SIMULATED DATA BANNER */}
      <div style={{ background:'rgba(230,57,70,0.12)', borderBottom:'1px solid rgba(230,57,70,0.3)', padding:'8px 24px', display:'flex', alignItems:'center', justifyContent:'center', gap:'12px', flexShrink:0 }}>
        <span style={{ color:'#E63946', display:'inline-flex' }}><Icon name="alert" size={12} stroke={1.8} /></span>
        <span className="mono" style={{ fontSize:'9px', color:'#E63946', letterSpacing:'2.2px', textTransform:'uppercase', fontWeight:'800' }}>
          {isFr?'Données de démonstration simulées · profils fictifs · aucune personne réelle':'Simulated demonstration data · fictional patient profiles · no real persons'}
        </span>
      </div>

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
            <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'8px', flexWrap:'wrap' }}>
              <h2 style={{ fontSize:'22px', fontWeight:'800', color:'#fff', letterSpacing:'-0.4px', lineHeight:1 }}>{patient.name}</h2>
              <span className="mono" style={{ fontSize:'8px', fontWeight:'800', color:patient.statusColor, border:`1px solid ${patient.statusColor}55`, padding:'3px 8px', borderRadius:'2px', letterSpacing:'1.5px' }}>{patient.status==='Scan Complete'?(isFr?'TERMINÉ':'COMPLETE'):(isFr?'EN ATTENTE':'AWAITING')}</span>
              <span className="mono" style={{ fontSize:'8px', fontWeight:'800', color:'#E63946', border:'1px solid rgba(230,57,70,0.45)', padding:'3px 8px', borderRadius:'2px', letterSpacing:'1.5px', background:'rgba(230,57,70,0.1)', display:'inline-flex', alignItems:'center', gap:'5px' }}>
                <span style={{ display:'inline-flex' }}><Icon name="alert" size={9} stroke={2} /></span>
                {isFr?'DÉMO · SIMULÉ':'DEMO · SIMULATED'}
              </span>
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

            {/* § 01 Presenting complaint */}
            {patient.presentingComplaint && (
              <div style={{ border:'1px solid rgba(0,180,216,0.2)', borderRadius:'8px', padding:'20px 22px', marginBottom:'12px', background:'linear-gradient(180deg,rgba(0,180,216,0.04),transparent)', position:'relative' }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,#00B4D8,transparent)' }} />
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:'12px', flexWrap:'wrap', gap:'8px' }}>
                  <p className="mono" style={{ fontSize:'9px', color:'#00B4D8', letterSpacing:'2.5px', fontWeight:'700', textTransform:'uppercase' }}>§ 01 · {isFr?'Motif de consultation':'Presenting complaint'}</p>
                  <p className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.4)', letterSpacing:'1.5px', textTransform:'uppercase' }}>{patient.scanDate}</p>
                </div>
                <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.78)', lineHeight:'1.85', fontWeight:'400' }}>{patient.presentingComplaint}</p>
              </div>
            )}

            {/* § 02 Vitals */}
            {patient.vitals && (
              <div style={{ border:'1px solid rgba(255,255,255,0.06)', borderRadius:'8px', padding:'18px 22px', marginBottom:'12px', background:'rgba(10,22,40,0.4)' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:'14px', flexWrap:'wrap', gap:'8px' }}>
                  <p className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.45)', letterSpacing:'2.5px', fontWeight:'700', textTransform:'uppercase' }}>§ 02 · {isFr?'Signes vitaux à l\'admission':'Vitals on admission'}</p>
                  <p className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.4)', letterSpacing:'1.5px' }}>{patient.vitals.ts}</p>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(90px,1fr))', gap:0, borderTop:'1px solid rgba(255,255,255,0.06)', borderLeft:'1px solid rgba(255,255,255,0.06)' }}>
                  {[
                    ['BP',     patient.vitals.bp],
                    ['HR',     patient.vitals.hr && `${patient.vitals.hr} bpm`],
                    ['Temp',   patient.vitals.temp && `${patient.vitals.temp}°C`],
                    ['SpO₂',   patient.vitals.o2 && `${patient.vitals.o2}%`],
                    ['Weight', patient.vitals.weight && `${patient.vitals.weight} kg`],
                    ['Height', patient.vitals.height && `${patient.vitals.height} cm`],
                    ['GCS',    patient.vitals.gcs],
                  ].filter(([,v])=>v).map(([l,v])=>(
                    <div key={l} style={{ padding:'11px 14px', borderRight:'1px solid rgba(255,255,255,0.06)', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
                      <p className="mono" style={{ fontSize:'8px', color:'rgba(255,255,255,0.4)', letterSpacing:'1.6px', marginBottom:'5px', textTransform:'uppercase', fontWeight:'700' }}>{l}</p>
                      <p className="mono tnum" style={{ fontSize:'13px', fontWeight:'700', color:'#fff', letterSpacing:'0.2px' }}>{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* § 03 Clinical history */}
            <div style={{ border:'1px solid rgba(255,255,255,0.06)', borderRadius:'8px', padding:'20px 22px', marginBottom:'12px', background:'rgba(10,22,40,0.4)' }}>
              <p className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.45)', letterSpacing:'2.5px', marginBottom:'14px', fontWeight:'700', textTransform:'uppercase' }}>§ 03 · {isFr?'Antécédents cliniques':'Clinical history'}</p>

              <div style={{ marginBottom:'18px' }}>
                <p className="mono" style={{ fontSize:'8px', color:'#00B4D8', letterSpacing:'2px', marginBottom:'8px', fontWeight:'800', textTransform:'uppercase' }}>{isFr?'Histoire de la maladie actuelle':'History of Present Illness'}</p>
                <p style={{ fontSize:'12.5px', color:'rgba(255,255,255,0.72)', lineHeight:'1.8', fontWeight:'300' }}>{patient.history}</p>
              </div>

              {patient.pmh && patient.pmh.length > 0 && (
                <div style={{ marginBottom:'16px' }}>
                  <p className="mono" style={{ fontSize:'8px', color:'rgba(255,255,255,0.55)', letterSpacing:'2px', marginBottom:'8px', fontWeight:'800', textTransform:'uppercase' }}>{isFr?'Antécédents médicaux':'Past Medical History'}</p>
                  {patient.pmh.map((x,i)=>(
                    <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'10px', marginBottom:'5px' }}>
                      <span className="mono" style={{ fontSize:'10px', color:'#00B4D8', marginTop:'1px', flexShrink:0 }}>▸</span>
                      <span style={{ fontSize:'12px', color:'rgba(255,255,255,0.68)', lineHeight:'1.6' }}>{x}</span>
                    </div>
                  ))}
                </div>
              )}

              {patient.surgicalHistory && patient.surgicalHistory.length > 0 && (
                <div style={{ marginBottom:'16px' }}>
                  <p className="mono" style={{ fontSize:'8px', color:'rgba(255,255,255,0.55)', letterSpacing:'2px', marginBottom:'8px', fontWeight:'800', textTransform:'uppercase' }}>{isFr?'Antécédents chirurgicaux':'Surgical History'}</p>
                  {patient.surgicalHistory.map((x,i)=>(
                    <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'10px', marginBottom:'5px' }}>
                      <span className="mono" style={{ fontSize:'10px', color:'#00B4D8', marginTop:'1px', flexShrink:0 }}>▸</span>
                      <span style={{ fontSize:'12px', color:'rgba(255,255,255,0.68)', lineHeight:'1.6' }}>{x}</span>
                    </div>
                  ))}
                </div>
              )}

              {patient.familyHistory && patient.familyHistory.length > 0 && (
                <div style={{ marginBottom:'16px' }}>
                  <p className="mono" style={{ fontSize:'8px', color:'rgba(255,255,255,0.55)', letterSpacing:'2px', marginBottom:'8px', fontWeight:'800', textTransform:'uppercase' }}>{isFr?'Antécédents familiaux':'Family History'}</p>
                  {patient.familyHistory.map((x,i)=>(
                    <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'10px', marginBottom:'5px' }}>
                      <span className="mono" style={{ fontSize:'10px', color:'#00B4D8', marginTop:'1px', flexShrink:0 }}>▸</span>
                      <span style={{ fontSize:'12px', color:'rgba(255,255,255,0.68)', lineHeight:'1.6' }}>{x}</span>
                    </div>
                  ))}
                </div>
              )}

              {patient.socialHistory && (
                <div style={{ marginBottom:'16px' }}>
                  <p className="mono" style={{ fontSize:'8px', color:'rgba(255,255,255,0.55)', letterSpacing:'2px', marginBottom:'10px', fontWeight:'800', textTransform:'uppercase' }}>{isFr?'Habitudes de vie':'Social History'}</p>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px 18px' }}>
                    {[[isFr?'Tabac':'Smoking',patient.socialHistory.smoking],[isFr?'Alcool':'Alcohol',patient.socialHistory.alcohol],[isFr?'Profession':'Occupation',patient.socialHistory.occupation],[isFr?'Activité':'Activity',patient.socialHistory.activity]].filter(([,v])=>v).map(([l,v])=>(
                      <div key={l} style={{ display:'flex', gap:'8px', alignItems:'baseline' }}>
                        <span className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.4)', letterSpacing:'1.2px', textTransform:'uppercase', fontWeight:'700', flexShrink:0, minWidth:'68px' }}>{l}</span>
                        <span style={{ fontSize:'12px', color:'rgba(255,255,255,0.68)', lineHeight:'1.55' }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {patient.immunizations && (
                <div>
                  <p className="mono" style={{ fontSize:'8px', color:'rgba(255,255,255,0.55)', letterSpacing:'2px', marginBottom:'6px', fontWeight:'800', textTransform:'uppercase' }}>{isFr?'Vaccinations':'Immunizations'}</p>
                  <p style={{ fontSize:'11.5px', color:'rgba(255,255,255,0.58)', lineHeight:'1.6', fontWeight:'300' }}>{patient.immunizations}</p>
                </div>
              )}
            </div>

            {/* § 04 Allergies + Medications */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'12px' }}>
              {[[isFr?'Allergies':'Allergies',patient.allergies,'#E63946'],[isFr?'Médications':'Medications',patient.medications,'#00B4D8']].map(([title,items,color],idx)=>(
                <div key={title} style={{ border:'1px solid rgba(255,255,255,0.06)', borderRadius:'8px', padding:'18px 20px', background:'rgba(10,22,40,0.4)' }}>
                  <p className="mono" style={{ fontSize:'9px', color, letterSpacing:'2.5px', marginBottom:'12px', fontWeight:'700', textTransform:'uppercase' }}>§ 0{4+idx%1} · {title}</p>
                  {items.map((a,i)=>(
                    <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'10px', marginBottom:'8px' }}>
                      <div style={{ width:'4px', height:'4px', borderRadius:'50%', background:color, flexShrink:0, marginTop:'7px' }} />
                      <span style={{ fontSize:'12px', color:'rgba(255,255,255,0.72)', fontWeight:'400', lineHeight:'1.6' }}>{a}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* § 05 Problem list + Plan */}
            {(patient.problemList || patient.plan) && (
              <div style={{ display:'grid', gridTemplateColumns:patient.problemList && patient.plan ? '1fr 1.2fr' : '1fr', gap:'10px', marginBottom:'12px' }}>
                {patient.problemList && patient.problemList.length > 0 && (
                  <div style={{ border:'1px solid rgba(255,255,255,0.06)', borderRadius:'8px', padding:'18px 20px', background:'rgba(10,22,40,0.4)' }}>
                    <p className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.55)', letterSpacing:'2.5px', marginBottom:'14px', fontWeight:'700', textTransform:'uppercase' }}>§ 05 · {isFr?'Liste des problèmes':'Problem List'}</p>
                    {patient.problemList.map((p,i)=>(
                      <div key={i} style={{ display:'flex', gap:'12px', padding:'6px 0', borderBottom: i < patient.problemList.length-1 ? '1px solid rgba(255,255,255,0.04)' : 'none', alignItems:'baseline' }}>
                        <span className="mono tnum" style={{ fontSize:'10px', color:'#00B4D8', fontWeight:'800', letterSpacing:'0.5px', minWidth:'60px', flexShrink:0 }}>{p.code}</span>
                        <span style={{ fontSize:'12px', color:'rgba(255,255,255,0.72)', lineHeight:'1.55' }}>{p.label}</span>
                      </div>
                    ))}
                  </div>
                )}
                {patient.plan && (
                  <div style={{ border:'1px solid rgba(0,180,216,0.2)', borderLeft:'3px solid #00B4D8', borderRadius:'8px', padding:'18px 22px', background:'linear-gradient(180deg,rgba(0,180,216,0.04),transparent)' }}>
                    <p className="mono" style={{ fontSize:'9px', color:'#00B4D8', letterSpacing:'2.5px', marginBottom:'12px', fontWeight:'700', textTransform:'uppercase' }}>§ 06 · {isFr?'Plan clinique · prochaines étapes':'Clinical Plan · Next Steps'}</p>
                    <p style={{ fontSize:'12.5px', color:'rgba(255,255,255,0.75)', lineHeight:'1.8', fontWeight:'300' }}>{patient.plan}</p>
                  </div>
                )}
              </div>
            )}

            {/* § 07 Latest AI result */}
            {localResult ? (
              <div style={{ position:'relative', border:`1px solid ${CLASS_COLORS[localResult.prediction]}44`, borderRadius:'8px', padding:'18px 22px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'14px', background:`linear-gradient(180deg,${CLASS_COLORS[localResult.prediction]}0D,transparent)`, overflow:'hidden' }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:`linear-gradient(90deg,transparent,${CLASS_COLORS[localResult.prediction]},transparent)` }} />
                <div>
                  <p className="mono" style={{ fontSize:'9px', color:'rgba(255,255,255,0.4)', letterSpacing:'2.5px', marginBottom:'6px', textTransform:'uppercase', fontWeight:'700' }}>§ 07 · {isFr?'Dernier résultat IllumaDX':'Latest IllumaDX result'}</p>
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
                  <a href="https://partner.projectboard.world/ysc/project/beyond-accuracy-evaluating-data-augmentation-strategies-for-ai-brain-tumor-detection-with-gradcam-in" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ color:'#FFB703' }}>
                    {isFr?'Tableau de Projet CWSF':'CWSF Project Board'}<span style={{ fontSize:'10px' }}>↗</span>
                  </a>
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