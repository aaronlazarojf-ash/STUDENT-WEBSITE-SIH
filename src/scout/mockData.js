/**
 * Geo-Farm Field Operations — Field Scout mock data
 * Geo-Farm: Early detection & management of crop diseases and pest infestations
 *
 * This is the frontend-demo "ground truth" data set for the Field Scout /
 * Agriculture Student portal. No backend exists yet — every value here is
 * realistic mock data standing in for what would come from the Geo-Farm
 * mission-assignment engine, smart traps, and microclimate sensors.
 */

import { diseaseImage, ONION_HERO_IMAGE } from './data/onionKnowledge.js';

// Case/disease imagery resolves through the central onion reference map
// (disease.id → local asset) so every surface shows identical visuals.
const caseImg = (diseaseId) => {
  const hit = diseaseImage(diseaseId);
  return hit ? hit.src : null;
};
const caseAlt = (diseaseId, fallback) => {
  const hit = diseaseImage(diseaseId);
  return hit ? hit.alt : fallback;
};

export const SCOUT_PROFILE = {
  name: 'Aarav Patil',
  role: 'Agricultural Student',
  programme: 'B.Sc. Agriculture',
  specialization: 'Crop Protection / Plant Pathology',
  scoutId: 'GFS-AG-0248',
  college: 'Mahatma Phule Krishi Vidyapeeth',
  department: 'Agriculture',
  year: '3rd Year',
  district: 'Nashik',
  block: 'Dindori Block',
  operatingRadiusKm: 22,
  primaryCrops: ['Onion'],
  operatingZone: 'Nashik Onion Monitoring Zone',
  status: 'Verified',
  accountStatus: 'Active — Verified',
  email: 'aarav.patil@mpkv.ac.in',
  phone: '+91 98221 74409',
  studentId: 'AG2024-248',
  joined: 'Aug 2025',
  registeredLocation: 'Nashik, Maharashtra',
  registeredVillage: 'Dindori',
  registeredTaluka: 'Dindori',
  lastFieldActivity: 'Today, 8:45 AM',
  lastSync: '12 min ago',
  // Frontend-demo counters only — not connected to a scoring or ranking
  // system. Kept for internal analytics screens; not surfaced as a
  // gamified score on the student-facing profile.
  points: 1240,
  rank: 3,
  credits: 12,
  communityHours: 48,
  stats: {
    missionsCompleted: 24,
    reportsSubmitted: 22,
    reportsVerified: 19,
    reportsAwaitingReview: 2,
    revisitRequests: 1,
    verificationRate: 86,
    dataQuality: 92,
  },
};

export const MISSION_STATUS = {
  PENDING: 'Pending',
  ACCEPTED: 'Accepted',
  EN_ROUTE: 'En Route',
  IN_PROGRESS: 'In Progress',
  SUBMITTED: 'Submitted',
  UNDER_REVIEW: 'Under Review',
  VERIFIED: 'Verified',
  NEEDS_REVISIT: 'Needs Revisit',
  COMPLETED: 'Completed',
};

export const INITIAL_MISSIONS = [
  {
    id: 'GF-1042',
    title: 'Purple Blotch Surveillance',
    location: 'Niphad, Nashik',
    fieldName: 'Niphad Onion Block A12',
    coords: [20.0571, 73.834],
    crop: 'Onion',
    priority: 'HIGH',
    assignedLabel: 'Today, 9:00 AM',
    farmerName: 'Suresh Pawar',
    farmerPhone: '+91 98220 40001',
    farmerId: 'F-8821',
    fieldId: 'FLD-901',
    plotNumber: 'Survey No. 45/2',
    visitDate: '20 Sep 2026',
    preferredTime: '9:00 AM - 12:00 PM',
    status: MISSION_STATUS.PENDING,
    distanceKm: 4.2,
    assignedBy: 'Agriculture Officer — Nashik Division',
    surveyType: 'Disease surveillance',
    cropStage: 'Bulb development',
    lastObservation: '2 days ago',
    trapId: 'GF-TRAP-018',
    concern: 'Purple Blotch',
    riskLevel: 'HIGH',
    whyPriority: 'High humidity + favourable temperature pattern + nearby observations',
    reason: {
      humidity: 87,
      leafWetness: 'Elevated',
      previousObservation: 'Purple blotch risk signal — leaf lesions reported',
      nearbyReports: 3,
      riskModel: 'HIGH',
    },
    recommendedChecks: [
      'Lower / older leaves',
      'Lesion colour and spread',
      'Nearby plants',
      'Leaf wetness conditions',
    ],
  },
  {
    id: 'GF-1038',
    title: 'Downy Mildew Field Survey',
    location: 'Lasalgaon, Nashik',
    fieldName: 'Lasalgaon Onion Block C4',
    coords: [20.0844, 74.111],
    crop: 'Onion',
    priority: 'MEDIUM',
    assignedLabel: 'Yesterday, 8:30 AM',
    farmerName: 'Anil Shinde',
    farmerPhone: '+91 94230 10002',
    farmerId: 'F-8842',
    fieldId: 'FLD-912',
    plotNumber: 'Survey No. 12/1',
    visitDate: '19 Sep 2026',
    preferredTime: '8:00 AM - 11:00 AM',
    status: MISSION_STATUS.COMPLETED,
    distanceKm: 11.6,
    assignedBy: 'Agriculture Officer — Nashik Division',
    surveyType: 'Disease surveillance',
    cropStage: 'Bulb development',
    lastObservation: '5 days ago',
    trapId: 'GF-TRAP-011',
    concern: 'Downy Mildew',
    riskLevel: 'MEDIUM',
    whyPriority: 'Cool humid nights + moderate leaf wetness in the belt',
    reason: {
      humidity: 74,
      leafWetness: 'Moderate',
      previousObservation: 'Pale patches reported; early-morning check advised',
      nearbyReports: 1,
      riskModel: 'MEDIUM',
    },
    recommendedChecks: ['Inner leaves at dawn', 'Patch distribution', 'Neighbouring plants'],
  },
  {
    id: 'GF-1035',
    title: 'Onion Thrips Check',
    location: 'Sinnar, Nashik',
    fieldName: 'Sinnar Onion Plot B2',
    coords: [19.8496, 73.9866],
    crop: 'Onion',
    priority: 'LOW',
    assignedLabel: 'Tomorrow, 10:00 AM',
    farmerName: 'Meera Jadhav',
    farmerPhone: '+91 91122 30003',
    farmerId: 'F-8855',
    fieldId: 'FLD-920',
    plotNumber: 'Survey No. 8/4',
    visitDate: '21 Sep 2026',
    preferredTime: '10:00 AM - 1:00 PM',
    status: MISSION_STATUS.ACCEPTED,
    distanceKm: 18.3,
    assignedBy: 'Agriculture Officer — Nashik Division',
    surveyType: 'Routine surveillance',
    cropStage: 'Bulb development',
    lastObservation: '9 days ago',
    trapId: null,
    concern: 'Onion Thrips',
    riskLevel: 'LOW',
    whyPriority: 'No prior symptoms; routine surveillance in pilot zone',
    reason: {
      humidity: 58,
      leafWetness: 'Low',
      previousObservation: 'No prior symptoms',
      nearbyReports: 0,
      riskModel: 'LOW',
    },
    recommendedChecks: ['Leaf tips', 'Neck region', 'Blue sticky trap'],
  },
  {
    id: 'GF-1029',
    title: 'Purple Blotch Follow-up Verification',
    location: 'Makhmalabad, Nashik',
    fieldName: 'Makhmalabad Onion Block B7',
    coords: [20.0498, 73.8261],
    crop: 'Onion',
    priority: 'HIGH',
    assignedLabel: '6 days ago',
    farmerName: 'Ramesh Gaikwad',
    farmerPhone: '+91 98220 40004',
    farmerId: 'F-8834',
    fieldId: 'FLD-905',
    plotNumber: 'Survey No. 51/3',
    visitDate: '15 Sep 2026',
    preferredTime: '9:00 AM - 12:00 PM',
    status: MISSION_STATUS.NEEDS_REVISIT,
    distanceKm: 6.8,
    assignedBy: 'Agriculture Officer \u2014 Nashik Division',
    surveyType: 'Disease surveillance',
    cropStage: 'Bulb development',
    lastObservation: '6 days ago',
    trapId: null,
    concern: 'Purple Blotch',
    riskLevel: 'HIGH',
    whyPriority: 'Follow-up: earlier evidence unclear; re-verify lesions + spread',
    reason: {
      humidity: 84,
      leafWetness: 'Elevated',
      previousObservation: 'Purple blotch risk signal',
      nearbyReports: 2,
      riskModel: 'HIGH',
    },
    recommendedChecks: ['Lesion close-up', 'Leaf distribution', 'Field spread pattern'],
  },
];

export const TRAPS = {
  'GF-TRAP-018': {
    id: 'GF-TRAP-018',
    location: 'Niphad Onion Block A12',
    crop: 'Onion',
    type: 'Blue Sticky Trap (thrips)',
    lastScan: '2 days ago',
    battery: 78,
    lastSynced: '12 min ago',
    history: [
      { day: 'Day 1', count: 8 },
      { day: 'Day 3', count: 12 },
      { day: 'Day 5', count: 18 },
      { day: 'Day 7', count: 27 },
    ],
    previousTotal: 27,
  },
  'GF-TRAP-011': {
    id: 'GF-TRAP-011',
    location: 'Lasalgaon Onion Block C4',
    crop: 'Onion',
    type: 'Blue Sticky Trap (thrips)',
    lastScan: '5 days ago',
    battery: 54,
    lastSynced: '2 hr ago',
    history: [
      { day: 'Day 1', count: 4 },
      { day: 'Day 3', count: 6 },
      { day: 'Day 5', count: 9 },
      { day: 'Day 7', count: 11 },
    ],
    previousTotal: 11,
  },
};

export const INITIAL_REPORTS = [
  {
    id: 'GF-RPT-1039',
    missionId: 'GF-1038',
    scoutId: 'GFS-AG-0248',
    scoutName: 'Aarav Patil',
    field: 'Lasalgaon',
    crop: 'Onion',
    finding: 'Downy Mildew',
    risk: 'MEDIUM',
    status: 'Verified',
    submittedAt: 'Yesterday, 11:20 AM',
    dataQuality: 90,
    aiConfidence: 81,
    trapCount: 11,
    trend: '+22%',
    photos: 3,
    // Officer identification fields — sourced from the linked mission
    // (GF-1038) so the Officer Report Detail can show real farmer/field
    // identifiers rather than inventing them.
    farmerId: 'F-8842',
    fieldId: 'FLD-912',
    plotNumber: 'Survey No. 12/1',
    officerName: 'Agriculture Officer — Nashik Division',
    reviewedAt: 'Yesterday, 12:10 PM',
    reviewHistory: [
      { decision: 'Verified', officerName: 'Agriculture Officer — Nashik Division', note: '', reviewedAt: 'Yesterday, 12:10 PM' },
    ],
    timeline: [
      { time: '08:31', icon: 'pin', label: 'Field check-in' },
      { time: '08:34', icon: 'camera', label: 'Onion leaf image captured' },
      { time: '08:35', icon: 'ai', label: 'Preliminary AI assessment (demo)' },
      { time: '08:37', icon: 'grad', label: 'Scout confirmed symptoms' },
      { time: '08:40', icon: 'trap', label: 'Sticky trap scanned' },
      { time: '08:42', icon: 'chart', label: 'Risk recalculated' },
      { time: '08:45', icon: 'cloud', label: 'Report uploaded' },
      { time: '09:10', icon: 'gov', label: 'Verified by Agriculture Officer' },
    ],
  },
  {
    id: 'GF-RPT-1031',
    missionId: null,
    scoutId: 'GFS-AG-0248',
    scoutName: 'Aarav Patil',
    field: 'Sinnar',
    crop: 'Onion',
    finding: 'No major issue',
    risk: 'LOW',
    status: 'Verified',
    submittedAt: '4 days ago',
    dataQuality: 88,
    aiConfidence: 74,
    trapCount: null,
    trend: null,
    photos: 2,
    visitOutcome: 'no_issue_found',
    outcomeLabel: 'No Issue Found',
    outcomeNote: 'Leaf-tip drying appears to be moisture stress, not pest-related.',
    // No linked mission (missionId: null) — no farmer/field identifiers available.
    farmerId: null,
    fieldId: null,
    plotNumber: null,
    officerName: 'Agriculture Officer — Nashik Division',
    reviewedAt: '3 days ago',
    reviewHistory: [
      { decision: 'Verified', officerName: 'Agriculture Officer — Nashik Division', note: '', reviewedAt: '3 days ago' },
    ],
    timeline: [
      { time: '10:02', icon: 'pin', label: 'Field check-in' },
      { time: '10:05', icon: 'camera', label: 'Onion leaf image captured' },
      { time: '10:06', icon: 'ai', label: 'Preliminary AI assessment (demo)' },
      { time: '10:07', icon: 'grad', label: 'Scout confirmed: healthy' },
      { time: '10:09', icon: 'cloud', label: 'Report uploaded' },
      { time: '13:40', icon: 'gov', label: 'Verified by Agriculture Officer' },
    ],
  },
  {
    id: 'GF-RPT-1028',
    missionId: 'GF-1029',
    scoutId: 'GFS-AG-0248',
    scoutName: 'Aarav Patil',
    farmer: 'Ramesh Gaikwad',
    field: 'Makhmalabad',
    crop: 'Onion',
    finding: 'Purple Blotch',
    risk: 'HIGH',
    // Mock: simulates an officer requesting more evidence (no real officer portal yet).
    status: 'Needs Revisit',
    officerComment: 'Please capture a clearer close-up of the affected leaf surface. The existing photo is too blurry to confirm the diagnosis.',
    submittedAt: '6 days ago',
    dataQuality: 71,
    aiConfidence: 82,
    trapCount: null,
    trend: null,
    photos: 1,
    visitOutcome: 'inconclusive',
    outcomeLabel: 'Symptoms Inconclusive',
    outcomeNote: 'Symptoms partially visible but could not get a clear close-up due to wind.',
    scoutVerification: { status: 'unsure', note: 'Hard to tell from the angle available.' },
    // Sourced from the linked mission (GF-1029).
    farmerId: 'F-8834',
    fieldId: 'FLD-905',
    plotNumber: 'Survey No. 51/3',
    officerName: 'Agriculture Officer — Nashik Division',
    reviewedAt: '6 days ago',
    reviewHistory: [
      { decision: 'Needs Revisit', officerName: 'Agriculture Officer — Nashik Division', note: 'Please capture a clearer close-up of the affected leaf surface. The existing photo is too blurry to confirm the diagnosis.', reviewedAt: '6 days ago' },
    ],
    timeline: [
      { time: '09:10', icon: 'pin', label: 'Field check-in' },
      { time: '09:14', icon: 'camera', label: 'Photo captured' },
      { time: '09:15', icon: 'ai', label: 'AI analysis completed' },
      { time: '09:17', icon: 'grad', label: 'Scout: inconclusive' },
      { time: '09:20', icon: 'cloud', label: 'Report uploaded' },
      { time: '11:00', icon: 'gov', label: 'Officer requested revisit' },
    ],
  },
];

export const NOTIFICATIONS = [
  {
    id: 'N1',
    level: 'critical',
    title: 'High priority: new onion field verification',
    body: 'Niphad — Purple Blotch risk signal. Verification requested.',
    time: '8:15 AM',
    read: false,
  },
  {
    id: 'N2',
    level: 'warning',
    title: 'New onion surveillance mission',
    body: 'Sinnar — onion thrips check requested. Trap GF-TRAP-018 due today.',
    time: 'Yesterday',
    read: false,
  },
  {
    id: 'N3',
    level: 'info',
    title: 'Follow-up verification required',
    body: 'Makhmalabad — clearer lesion close-up requested by Agriculture Officer.',
    time: 'Yesterday',
    read: true,
  },
  {
    id: 'N4',
    level: 'success',
    title: 'Report verified',
    body: 'Your report GF-RPT-1039 (Lasalgaon, Onion) was verified.',
    time: '2 days ago',
    read: true,
  },
];

export const FIELD_GUIDE_SECTIONS = [
  {
    title: 'How to photograph a leaf',
    steps: [
      'Use natural light, not flash',
      'Keep the leaf in focus, fill the frame',
      'Capture both healthy and affected areas',
      'Avoid harsh shadows',
      'Include multiple leaves when possible',
    ],
  },
  {
    title: 'How to inspect a sticky trap',
    steps: [
      'Confirm the Trap ID before scanning',
      'Check trap condition and remaining stickiness',
      'Capture a full, well-lit trap image',
      'Ensure the image is clear and not blurred',
      'Review the AI pest count',
      'Confirm or correct the result',
    ],
  },
];

export const DISEASE_GUIDE = [
  {
    name: 'Purple Blotch',
    crop: 'Onion',
    symptoms: 'Water-soaked / whitish lesions turning purple-brown; lesions can girdle leaves.',
    action: 'Monitor spread; record leaf wetness; confirm with field verification before action.',
  },
  {
    name: 'Stemphylium Blight',
    crop: 'Onion',
    symptoms: 'Leaf blight lesions with tip die-back and progressive drying.',
    action: 'Map blighted area; check patches vs scattered plants; verify in field.',
  },
  {
    name: 'Downy Mildew',
    crop: 'Onion',
    symptoms: 'Pale patches with greyish downy growth in humid mornings.',
    action: 'Inspect at dawn; note patch distribution; verify before action.',
  },
  {
    name: 'Fusarium Basal Rot',
    crop: 'Onion',
    symptoms: 'Yellowing / wilting with basal plate rot and plant decline.',
    action: 'Flag wilting clusters; check basal plate; record soil moisture.',
  },
  {
    name: 'Thrips Damage',
    crop: 'Onion',
    symptoms: 'Silvery leaf streaks, leaf-tip drying, stunted bulbs.',
    action: 'Tap leaves over white paper; check neck region and blue sticky traps.',
  },
];

export const SYMPTOM_OPTIONS = [
  'Water-soaked / whitish lesions',
  'Purple-brown lesions',
  'Leaf tip drying',
  'Silvery leaf streaks',
  'Pale / yellowish patches',
  'Leaf blight / die-back',
  'Yellowing / wilting',
  'Twisted leaves',
  'Soft / rotting bulbs',
  'No visible symptoms',
  'Other',
];

// Evidence photo categories — guided slots so every photo has a purpose.
export const EVIDENCE_CATEGORIES = [
  { key: 'plant', label: 'Whole plant', placeholder: 'Full onion plant in frame' },
  { key: 'symptom', label: 'Close-up symptom', placeholder: 'Capture lesions clearly' },
  { key: 'bulb', label: 'Leaf / bulb affected area', placeholder: 'Affected leaf or bulb zone' },
  { key: 'field', label: 'Field context', placeholder: 'Patches or across-field spread' },
  { key: 'trap', label: 'Trap / sample evidence', placeholder: 'Trap or sample close-up (if applicable)' },
];

/**
 * Phase 1 — Agricultural Student Portal mock data.
 * UI-only. No backend, GPS, camera, or AI integration yet.
 * Reuses INITIAL_MISSIONS as the source of truth for map/case links
 * (GF-1042, GF-1038, GF-1035) plus student-specific views below.
 */

export const NEARBY_CASES = [
  {
    id: 'GF-1042',
    farmer: 'Suresh Pawar',
    issue: 'Purple Blotch Risk — Onion',
    village: 'Niphad, Nashik',
    distanceKm: 4.2,
    priority: 'HIGH',
    crop: 'Onion',
    reportedAt: 'Today, 8:15 AM',
    concern: 'Purple Blotch',
    diseaseId: 'purple-blotch',
    symptoms: 'Leaf lesions reported · humidity signal elevated',
    image: caseImg('purple-blotch'),
    imageAlt: caseAlt('purple-blotch', 'Purple Blotch — Onion'),
  },
  {
    id: 'GF-1038',
    farmer: 'Anil Shinde',
    issue: 'Downy Mildew Risk — Onion',
    village: 'Lasalgaon, Nashik',
    distanceKm: 11.6,
    priority: 'MEDIUM',
    crop: 'Onion',
    reportedAt: 'Yesterday, 4:40 PM',
    concern: 'Downy Mildew',
    diseaseId: 'downy-mildew',
    symptoms: 'Pale patches reported · cool humid nights',
    image: caseImg('downy-mildew'),
    imageAlt: caseAlt('downy-mildew', 'Downy Mildew — Onion'),
  },
  {
    id: 'GF-1045',
    farmer: 'Ravi Deshmukh',
    issue: 'Purple Blotch Watch — Onion',
    village: 'Nashik',
    distanceKm: 14.5,
    priority: 'HIGH',
    crop: 'Onion',
    reportedAt: 'Today, 7:05 AM',
    concern: 'Purple Blotch',
    diseaseId: 'purple-blotch',
    symptoms: 'Lesion spread suspected · verification requested',
    image: caseImg('purple-blotch'),
    imageAlt: caseAlt('purple-blotch', 'Purple Blotch — Onion'),
  },
];

export const FARMER_REQUESTS = [
  {
    id: 'FR-301',
    farmer: 'Suresh Pawar',
    village: 'Niphad, Nashik',
    crop: 'Onion',
    message: 'Purple spots on onion leaves spreading. Please visit today.',
    time: '35 min ago',
    urgent: true,
  },
  {
    id: 'FR-302',
    farmer: 'Meera Jadhav',
    village: 'Sinnar, Nashik',
    crop: 'Onion',
    message: 'Leaf tips drying. Need advice on field check.',
    time: '2 hrs ago',
    urgent: false,
  },
];

export const STUDENT_PROGRESS = {
  visitsThisWeek: 4,
  visitsGoal: 6,
  casesResolved: 18,
  pendingVisits: 2,
  participationPct: 72,
  nextMilestone: 'Field Expert — 1500 pts',
  pointsToNext: 260,
};

export const LEADERBOARD = [
  { rank: 1, name: 'Priya Nair', college: 'MPKV Rahuri', points: 1480, visits: 31, casesAssisted: 27 },
  { rank: 2, name: 'Rahul Mane', college: 'MPKV Pune', points: 1355, visits: 28, casesAssisted: 24 },
  { rank: 3, name: 'Aarav Patil', college: 'Mahatma Phule Krishi Vidyapeeth', points: 1240, visits: 24, casesAssisted: 21, you: true },
  { rank: 4, name: 'Sneha Kulkarni', college: 'MPKV Nashik', points: 1180, visits: 22, casesAssisted: 19 },
  { rank: 5, name: 'Amit Thorat', college: 'MPKV Kolhapur', points: 1095, visits: 20, casesAssisted: 17 },
];

export const CERTIFICATES = [
  {
    id: 'GF-CERT-001',
    title: 'Field Survey Basics',
    student: 'Aarav Patil',
    achievement: 'Completed 10 verified field visits',
    issuer: 'Geo-Farm + MPKV',
    date: 'Jul 2026',
    credits: 4,
    status: 'Earned',
  },
  {
    id: 'GF-CERT-002',
    title: 'Pest Identification — Level 1',
    student: 'Aarav Patil',
    achievement: 'Identified 5 pest cases with evidence',
    issuer: 'Geo-Farm + MPKV',
    date: 'Aug 2026',
    credits: 4,
    status: 'Earned',
  },
  {
    id: 'GF-CERT-003',
    title: 'Community Field Service — 50 hrs',
    student: 'Aarav Patil',
    achievement: 'Log 50 community field-service hours',
    issuer: 'Geo-Farm',
    date: 'In progress',
    credits: 4,
    status: 'In Progress',
    progressPct: 78,
  },
];

export const KNOWLEDGE_SPOTLIGHT = [
  {
    name: 'Purple Blotch',
    crop: 'Onion',
    summary: 'Water-soaked lesions turning purple-brown. Check older leaves first.',
  },
  {
    name: 'Downy Mildew',
    crop: 'Onion',
    summary: 'Pale patches; inspect at dawn for downy growth in humid weather.',
  },
  {
    name: 'Onion Thrips',
    crop: 'Onion',
    summary: 'Silvery streaks + tip drying. Tap leaves over white paper.',
  },
];

export const CHAT_THREADS = [
  {
    id: 'CH-1',
    farmer: 'Suresh Pawar',
    village: 'Niphad',
    caseId: 'GF-1042',
    caseLabel: 'Purple Blotch — Onion',
    lastMessage: 'Sir, purple spots increased since morning.',
    time: '10 min ago',
    unread: 2,
  },
  {
    id: 'CH-2',
    farmer: 'Anil Shinde',
    village: 'Lasalgaon',
    caseId: 'GF-1038',
    caseLabel: 'Downy Mildew — Onion',
    lastMessage: 'Patch photo sent. Please check.',
    time: '1 hr ago',
    unread: 0,
  },
  {
    id: 'CH-3',
    farmer: 'Meera Jadhav',
    village: 'Sinnar',
    caseId: null,
    caseLabel: 'Onion leaf-tip drying',
    lastMessage: 'Thank you for yesterday’s visit!',
    time: 'Yesterday',
    unread: 0,
  },
];

/**
 * Phase 2 — Nearby Cases detail (mock only, additive).
 * NEARBY_CASES above stays the list source (Dashboard + list screen).
 * This map adds per-case detail: AI diagnosis, symptoms, contact,
 * photo labels. No backend, no real upload.
 */
export const NEARBY_CASE_DETAILS = {
  'GF-1042': {
    problem: 'Purple Blotch',
    aiDiagnosis: 'Purple Blotch (preliminary)',
    aiConfidence: 87,
    symptoms: ['Water-soaked / whitish lesions', 'Purple-brown progression', 'Humidity signal elevated'],
    farmerPhone: '+91 98220 4XXXX',
    photoLabels: ['Leaf close-up', 'Affected patch', 'Field context'],
    image: caseImg('purple-blotch'),
    imageAlt: caseAlt('purple-blotch', 'Purple Blotch — Onion'),
    symptomImages: null,
    whyPriority: ['High humidity', 'Leaf wetness elevated', 'Nearby observations (3)'],
  },
  'GF-1038': {
    problem: 'Downy Mildew',
    aiDiagnosis: 'Downy Mildew (preliminary)',
    aiConfidence: 82,
    symptoms: ['Pale patches', 'Humid-night signal', 'Patch distribution'],
    farmerPhone: '+91 94230 1XXXX',
    photoLabels: ['Leaf close-up', 'Patch overview'],
    image: caseImg('downy-mildew'),
    imageAlt: caseAlt('downy-mildew', 'Downy Mildew — Onion'),
    symptomImages: null,
    whyPriority: ['Cool humid nights', 'Moderate leaf wetness', 'Nearby observations (1)'],
  },
  'GF-1045': {
    problem: 'Purple Blotch',
    aiDiagnosis: 'Purple Blotch (preliminary)',
    aiConfidence: 79,
    symptoms: ['Lesion spread suspected', 'Verification requested', 'Belt signal elevated'],
    farmerPhone: '+91 98500 7XXXX',
    photoLabels: ['Lesion close-up', 'Field overview'],
    image: caseImg('purple-blotch'),
    imageAlt: caseAlt('purple-blotch', 'Purple Blotch — Onion'),
    symptomImages: null,
    whyPriority: ['Belt signal elevated', 'Nearby observations (2)', 'Crop-stage relevance high'],
  },
};

/**
 * Master phase — Cluster / group farm visits (mock only).
 * Coordinates are demo positions near the case villages, not live GPS.
 */
export const CLUSTER_VISITS = [
  {
    id: 'CL-01',
    name: 'Niphad Onion Cluster',
    village: 'Niphad, Nashik',
    coords: [20.0621, 73.839],
    date: '24 September',
    time: '8:00 AM',
    organizer: 'Aarav Patil',
    participants: 12,
    maxParticipants: 15,
    focus: 'Purple blotch sweep across Onion Block A12',
    farmers: ['Suresh Pawar', 'Vikas More'],
  },
  {
    id: 'CL-02',
    name: 'Lasalgaon Verification Drive',
    village: 'Lasalgaon, Nashik',
    coords: [20.0894, 74.116],
    date: '26 September',
    time: '7:30 AM',
    organizer: 'Priya Nair',
    participants: 8,
    maxParticipants: 15,
    focus: 'Downy mildew dawn checks in Onion Block C4',
    farmers: ['Anil Shinde'],
  },
];

/**
 * Master phase — Knowledge Library articles (educational reference only).
 * Not professional agricultural advice — confirm with a college mentor
 * or agriculture officer before acting in the field.
 */
export const KNOWLEDGE_CATEGORIES = [
  'All',
  'Diseases',
  'Pests',
  'Storage',
  'Field Identification',
];

export const KNOWLEDGE_LIBRARY = [
  {
    id: 'KB-01',
    title: 'Purple Blotch',
    crop: 'Onion',
    category: 'Diseases',
    symptoms: ['Water-soaked / whitish lesions', 'Purple-brown progression', 'Lesions girdle leaves'],
    identification: 'Older leaves first; water-soaked lesions turning purple-brown. Reference study signal — local calibration required.',
    treatment: 'Management support only: monitor spread + record wetness; chemical reference requires expert/label confirmation.',
    prevention: 'Reference: sanitation, airflow, avoid prolonged leaf wetness.',
    image: null,
    fieldNotes: 'Photograph lesions + whole-leaf + field context in natural light.',
  },
  {
    id: 'KB-02',
    title: 'Downy Mildew',
    crop: 'Onion',
    category: 'Diseases',
    symptoms: ['Pale / yellowish patches', 'Greyish downy growth', 'Leaf collapse'],
    identification: 'Inspect at dawn in humid weather; check inner and lower leaves.',
    treatment: 'Management support only: map patches; expert/label confirmation before any action.',
    prevention: 'Reference: spacing, airflow, limit prolonged wetness.',
    image: null,
    fieldNotes: 'Dawn inspection finds downy growth before it dries.',
  },
  {
    id: 'KB-03',
    title: 'Stemphylium Blight',
    crop: 'Onion',
    category: 'Diseases',
    symptoms: ['Leaf blight lesions', 'Tip die-back', 'Progressive drying'],
    identification: 'Tips and margins first; compare patches across the field.',
    treatment: 'Management support only; record blighted area per plant.',
    prevention: 'Reference: debris management after harvest.',
    image: null,
    fieldNotes: 'Capture close-up + field-context pair for every patch.',
  },
  {
    id: 'KB-04',
    title: 'Onion Thrips',
    crop: 'Onion',
    category: 'Pests',
    symptoms: ['Silvery leaf streaks', 'Leaf-tip drying', 'Stunted bulbs'],
    identification: 'Tap leaves over white paper — tiny yellow-black thrips become visible.',
    treatment: 'Reference: blue sticky traps for monitoring; avoid overhead irrigation during outbreaks.',
    prevention: 'Reference: rotate onion with non-host crops and manage field-edge weeds.',
    image: null,
    fieldNotes: 'Check the leaf neck region where thrips shelter.',
  },
  {
    id: 'KB-05',
    title: 'Fusarium Basal Rot',
    crop: 'Onion',
    category: 'Diseases',
    symptoms: ['Yellowing / wilting', 'Basal plate rot', 'Plant decline'],
    identification: 'Wilting clusters; gently check basal plate; note soil moisture.',
    treatment: 'Management support only: flag clusters; rotation reference; expert required.',
    prevention: 'Reference: rotation, drainage, remove affected plants.',
    image: null,
    fieldNotes: 'Record wilting pattern: patch vs scattered.',
  },
  {
    id: 'KB-06',
    title: 'Reading a Sticky Trap (Onion)',
    crop: 'Onion',
    category: 'Field Identification',
    symptoms: ['Uneven insect spread', 'Dust-covered surface', 'Full trap'],
    identification: 'Blue sticky traps just above canopy; count weekly on a fixed schedule.',
    treatment: 'Reference: replace traps when full or no longer sticky.',
    prevention: 'Reference: keep traps serviced through the surveillance cycle.',
    image: null,
    fieldNotes: 'Confirm the Trap ID before scanning so counts attach to the right field.',
  },
  {
    id: 'KB-07',
    title: 'Onion Growth Stages',
    crop: 'Onion',
    category: 'Field Identification',
    symptoms: ['Seedling', 'Vegetative', 'Bulb development', 'Maturity'],
    identification: 'Note the dominant stage across the block — mixed stages are normal at edges.',
    treatment: 'Reference: align surveillance intensity with bulb-development window.',
    prevention: 'Reference: keep written stage records each season.',
    image: null,
    fieldNotes: 'Record stage on every visit; officers use it to prioritize cases.',
  },
  {
    id: 'KB-08',
    title: 'White Rot & Pink Root (Soil)',
    crop: 'Onion',
    category: 'Diseases',
    symptoms: ['Patch-wise yellowing', 'Root discolouration', 'Stunting'],
    identification: 'Lift sample plants; compare roots; map patches precisely.',
    treatment: 'Management support only: long rotation + sanitation; expert required.',
    prevention: 'Reference: do not move infested soil across the field.',
    image: null,
    fieldNotes: 'Clean tools between patches to avoid spreading soil.',
  },
  {
    id: 'KB-09',
    title: 'Black Mould & Soft Rot (Bulb/Storage)',
    crop: 'Onion',
    category: 'Storage',
    symptoms: ['Black powdery mass', 'Soft watery decay', 'Outer-scale damage'],
    identification: 'Inspect outer scales; press-test gently; check storage airflow.',
    treatment: 'Reference: cure bulbs, ventilate storage, grade at entry.',
    prevention: 'Reference: gentle handling; dry before storage.',
    image: null,
    fieldNotes: 'Separate affected bulbs immediately.',
  },
];

// Article → disease linkage: every card/carousel/detail visual resolves
// through the central onion reference map (disease.id → local asset),
// so imagery stays identical on all surfaces.
const KB_DISEASE_MAP = {
  'KB-01': 'purple-blotch',
  'KB-02': 'downy-mildew',
  'KB-03': 'stemphylium-blight',
  'KB-04': 'thrips',
  'KB-05': 'fusarium-basal-rot',
  'KB-08': 'white-rot',
  'KB-09': 'black-mould',
};
KNOWLEDGE_LIBRARY.forEach((a) => {
  const did = KB_DISEASE_MAP[a.id];
  if (did) {
    a.diseaseId = did;
    const hit = diseaseImage(did);
    if (hit) {
      a.image = hit.src;
      a.imageAlt = hit.alt;
    }
  }
});
// Growth-stage guide uses the healthy-cultivation hero visual (never a disease close-up).
const kbGrowth = KNOWLEDGE_LIBRARY.find((a) => a.id === 'KB-07');
if (kbGrowth) {
  kbGrowth.image = ONION_HERO_IMAGE;
  kbGrowth.imageAlt = 'Healthy onion field rows in cultivation';
}

// Prototype farmer estimates — NOT official government data. Replace with verified census when available.
export const FARMER_ESTIMATES = {
  Ahmednagar: 156000,
  Akola: 98000,
  Amravati: 112000,
  Aurangabad: 134000,
  Bhandara: 87000,
  Bid: 121000,
  Buldana: 105000,
  Chandrapur: 93000,
  Dhule: 102000,
  Garhchiroli: 68000,
  Gondiya: 79000,
  'Greater Bombay': 45000,
  Hingoli: 76000,
  Jalgaon: 142000,
  Jalna: 88000,
  Kolhapur: 165000,
  Latur: 110000,
  Nagpur: 148000,
  Nanded: 128000,
  Nandurbar: 82000,
  Nashik: 218000,
  Osmanabad: 95000,
  Parbhani: 90000,
  Pune: 194000,
  Raigarh: 108000,
  Ratnagiri: 74000,
  Sangli: 138000,
  Satara: 125000,
  Sindhudurg: 62000,
  Solapur: 171000,
  Thane: 132000,
  Wardha: 85000,
  Washim: 71000,
  Yavatmal: 118000,
};
