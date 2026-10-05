/**
 * Geo-Farm — Onion Field Intelligence knowledge base (Nashik pilot).
 *
 * Structured, source-backed reference for the student portal.
 * Content basis: uploaded onion references (Bayer guide + western-Odisha
 * research paper). Odisha-derived weather values are labelled as
 * "Reference study signal — local calibration required", NEVER as
 * Nashik-certified thresholds.
 *
 * AI + field guide = preliminary support, NOT diagnosis.
 */

export const NASHIK_BELT = {
  label: 'Nashik Onion Belt',
  zone: 'Nashik Onion Monitoring Zone',
  district: 'Nashik District, Maharashtra',
  areas: ['Niphad', 'Lasalgaon', 'Nashik', 'Sinnar', 'Malegaon'],
  note: 'Pilot Surveillance Areas — key onion areas in the Nashik belt.',
};

export const ONION_FILTERS = ['ALL', 'FOLIAR', 'ROOT / BULB', 'STORAGE', 'PEST', 'OTHER'];

export const ONION_DISEASES = [
  {
    id: 'purple-blotch',
    name: 'Purple Blotch',
    agent: 'Alternaria porri',
    type: 'FOLIAR',
    category: 'FOLIAR',
    symptoms: ['Water-soaked / whitish lesions', 'Purple/brown progression', 'Lesions enlarge and can girdle leaves', 'Severe infection can cause leaf collapse'],
    conditions: ['Warm / humid conditions', 'Leaf wetness is important', 'Weather-based monitoring supports early warning'],
    fieldCheck: ['Inspect older leaves first', 'Note lesion colour + spread pattern', 'Check neighbouring plants', 'Record leaf-wetness conditions'],
    management: { MONITOR: 'Observe lesion spread across leaves and plants.', CULTURAL: 'Field sanitation; avoid working in wet canopy.', 'WATER / MICROCLIMATE': 'Reduce prolonged leaf wetness where possible.', BIOLOGICAL: 'See approved biocontrol reference — confirm with officer.', CHEMICAL: 'Approved fungicide reference only — expert/label confirmation required.' },
    source: 'Bayer guide reference; research-supported environmental signal — local calibration required.',
  },
  {
    id: 'stemphylium-blight',
    name: 'Stemphylium Blight / Leaf Blight',
    agent: 'Stemphylium vesicarium',
    type: 'FOLIAR',
    category: 'FOLIAR',
    symptoms: ['Leaf blight lesions', 'Tip die-back', 'Progressive leaf drying'],
    conditions: ['Warm / humid conditions', 'Leaf wetness favours development', 'Reference study signal — local calibration required'],
    fieldCheck: ['Check leaf tips and margins', 'Compare across field patches', 'Capture close-up + field context'],
    management: { MONITOR: 'Track blighted leaf area per plant.', CULTURAL: 'Remove severely affected debris after harvest.', 'WATER / MICROCLIMATE': 'Avoid evening overhead wetting.', BIOLOGICAL: 'Reference only — confirm with officer.', CHEMICAL: 'Label-confirmed reference only.' },
    source: 'Onion reference set — local calibration required.',
  },
  {
    id: 'downy-mildew',
    name: 'Downy Mildew',
    agent: 'Peronospora destructor',
    type: 'FOLIAR',
    category: 'FOLIAR',
    symptoms: ['Pale / yellowish patches', 'Greyish downy growth under humidity', 'Leaf collapse in severe cases'],
    conditions: ['Cool / humid nights', 'Leaf wetness important', 'Reference study signal — local calibration required'],
    fieldCheck: ['Inspect early morning for downy growth', 'Check lower and inner leaves', 'Note patch distribution'],
    management: { MONITOR: 'Morning inspection for downy signs.', CULTURAL: 'Spacing and airflow; sanitation.', 'WATER / MICROCLIMATE': 'Limit prolonged wetness.', BIOLOGICAL: 'Reference only.', CHEMICAL: 'Label-confirmed reference only.' },
    source: 'Onion reference set — local calibration required.',
  },
  {
    id: 'damping-off',
    name: 'Damping-off',
    agent: 'Pythium / Rhizoctonia spp.',
    type: 'SEEDLING',
    category: 'OTHER',
    symptoms: ['Seedling collapse at soil line', 'Patchy emergence', 'Rotting stem base'],
    conditions: ['Excess soil moisture', 'Dense sowing', 'Reference study signal'],
    fieldCheck: ['Check emergence patches', 'Inspect stem base at soil line', 'Note drainage spots'],
    management: { MONITOR: 'Map patch locations.', CULTURAL: 'Raised beds; avoid overwatering.', 'WATER / MICROCLIMATE': 'Improve drainage.', BIOLOGICAL: 'Reference only.', CHEMICAL: 'Seed-treatment reference only — expert confirmation.' },
    source: 'Onion reference set.',
  },
  {
    id: 'fusarium-basal-rot',
    name: 'Fusarium Basal Rot',
    agent: 'Fusarium oxysporum f.sp. cepae',
    type: 'ROOT / BULB',
    category: 'ROOT / BULB',
    symptoms: ['Yellowing / wilting', 'Basal plate rot', 'Progressive plant decline'],
    conditions: ['Warm soil conditions', 'Stressed / wounded bulbs', 'Reference study signal'],
    fieldCheck: ['Gently check basal plate', 'Note wilting pattern (patch vs scattered)', 'Record soil moisture'],
    management: { MONITOR: 'Flag wilting clusters.', CULTURAL: 'Crop rotation; remove affected plants.', 'WATER / MICROCLIMATE': 'Avoid waterlogging.', BIOLOGICAL: 'Reference only.', CHEMICAL: 'No standalone chemical claim — expert required.' },
    source: 'Onion reference set.',
  },
  {
    id: 'white-rot',
    name: 'White Rot',
    agent: 'Sclerotium cepivorum',
    type: 'ROOT / BULB',
    category: 'ROOT / BULB',
    symptoms: ['Yellowing / wilting', 'White mycelium at bulb base', 'Patch-wise decline'],
    conditions: ['Cool / moist soil', 'Persists in soil', 'Reference study signal'],
    fieldCheck: ['Check patch centres', 'Inspect bulb base carefully', 'Do not spread soil across field'],
    management: { MONITOR: 'Map patches precisely.', CULTURAL: 'Long rotation; sanitation of tools.', 'WATER / MICROCLIMATE': 'Avoid moving infested soil.', BIOLOGICAL: 'Reference only.', CHEMICAL: 'Expert confirmation required.' },
    source: 'Onion reference set.',
  },
  {
    id: 'pink-root',
    name: 'Pink Root',
    agent: 'Phoma terrestris',
    type: 'ROOT / BULB',
    category: 'ROOT / BULB',
    symptoms: ['Pink discolouration of roots', 'Stunted plants', 'Reduced bulb size'],
    conditions: ['Warm soil', 'Stressed plants', 'Reference study signal'],
    fieldCheck: ['Lift sample plants to inspect roots', 'Compare root colour across plants', 'Note stunting pattern'],
    management: { MONITOR: 'Sample roots across patches.', CULTURAL: 'Rotation; healthy seedlings.', 'WATER / MICROCLIMATE': 'Balanced irrigation.', BIOLOGICAL: 'Reference only.', CHEMICAL: 'Expert confirmation required.' },
    source: 'Onion reference set.',
  },
  {
    id: 'black-mould',
    name: 'Black Mould',
    agent: 'Aspergillus niger',
    type: 'STORAGE / BULB',
    category: 'STORAGE',
    symptoms: ['Black powdery mass on bulbs', 'Outer-scale discolouration', 'Storage spoilage'],
    conditions: ['Warm / humid storage', 'Bruised bulbs', 'Reference study signal'],
    fieldCheck: ['Inspect outer scales', 'Check storage ventilation', 'Separate affected bulbs'],
    management: { MONITOR: 'Grade bulbs at storage entry.', CULTURAL: 'Cure bulbs; ventilated storage.', 'WATER / MICROCLIMATE': 'Dry before storage.', BIOLOGICAL: 'Reference only.', CHEMICAL: 'Storage-hygiene first; chemicals label-only.' },
    source: 'Onion reference set.',
  },
  {
    id: 'bacterial-soft-rot',
    name: 'Bacterial Soft Rot',
    agent: 'Pectobacterium spp.',
    type: 'BULB',
    category: 'ROOT / BULB',
    symptoms: ['Soft / watery bulb decay', 'Foul odour in advanced cases', 'Inner-scale collapse'],
    conditions: ['Wounds + wet conditions', 'Poor storage airflow', 'Reference study signal'],
    fieldCheck: ['Press-test suspect bulbs gently', 'Check for wound entry points', 'Isolate affected lots'],
    management: { MONITOR: 'Remove rotting bulbs promptly.', CULTURAL: 'Gentle handling; cure well.', 'WATER / MICROCLIMATE': 'Keep storage dry and aired.', BIOLOGICAL: 'Reference only.', CHEMICAL: 'Hygiene first; expert required.' },
    source: 'Onion reference set.',
  },
  {
    id: 'yellow-dwarf',
    name: 'Onion Yellow Dwarf',
    agent: 'Onion yellow dwarf virus (aphid-vectored)',
    type: 'VIRUS',
    category: 'FOLIAR',
    symptoms: ['Yellow streaking / dwarfing', 'Crinkled leaves', 'Reduced bulb size'],
    conditions: ['Aphid vector presence', 'Nearby infected hosts', 'Reference study signal'],
    fieldCheck: ['Look for streak + stunting clusters', 'Check aphid presence', 'Map affected patches'],
    management: { MONITOR: 'Scout aphids alongside symptoms.', CULTURAL: 'Remove infected plants; weed hosts.', 'WATER / MICROCLIMATE': 'Balanced crop vigour.', BIOLOGICAL: 'Vector-management reference only.', CHEMICAL: 'Vector-control label only — expert required.' },
    source: 'Onion reference set.',
  },
  {
    id: 'anthracnose-twister',
    name: 'Anthracnose / Twister',
    agent: 'Colletotrichum spp.',
    type: 'FOLIAR',
    category: 'FOLIAR',
    symptoms: ['Twisting / abnormal leaf curl', 'Lesions on leaves and neck', 'Distorted growth'],
    conditions: ['Warm / wet conditions', 'Leaf wetness favours spread', 'Reference study signal'],
    fieldCheck: ['Note twisting vs normal leaves', 'Inspect neck region', 'Record wetness conditions'],
    management: { MONITOR: 'Count twisted plants per patch.', CULTURAL: 'Sanitation; rotation.', 'WATER / MICROCLIMATE': 'Reduce wetness duration.', BIOLOGICAL: 'Reference only.', CHEMICAL: 'Label-only; expert required.' },
    source: 'Onion reference set.',
  },
  {
    id: 'thrips',
    name: 'Thrips Damage',
    agent: 'Thrips tabaci',
    type: 'PEST',
    category: 'PEST',
    symptoms: ['Silvery leaf streaks', 'Leaf-tip drying', 'Stunted bulbs under heavy pressure'],
    conditions: ['Warm / dry spells', 'Weedy field edges host thrips', 'Reference study signal'],
    fieldCheck: ['Tap leaves over white paper', 'Inspect leaf neck region', 'Check blue sticky traps'],
    management: { MONITOR: 'Trap + leaf-tap counts.', CULTURAL: 'Manage field-edge weeds; rotation with non-hosts.', 'WATER / MICROCLIMATE': 'Avoid overhead irrigation during outbreaks.', BIOLOGICAL: 'Approved biocontrol reference — confirm with officer.', CHEMICAL: 'Label-confirmed reference only.' },
    source: 'Onion reference set.',
  },
];

export const FIELD_CHECKLIST = [
  'Confirm crop is onion',
  'Confirm crop stage',
  'Inspect lower / older leaves',
  'Check visible lesions',
  'Check spread pattern',
  'Inspect nearby plants',
  'Capture close-up image',
  'Capture field-context image',
  'Record severity (0–5)',
  'Complete verification',
];

export const RISK_TIMELINE = [
  'Signal detected',
  'Field flagged',
  'Mission assigned',
  'Student verified',
  'Report submitted',
  'Follow-up',
];

export const SEVERITY_SCALE = [
  { v: 0, label: 'Healthy' },
  { v: 1, label: 'Trace' },
  { v: 2, label: 'Light' },
  { v: 3, label: 'Moderate' },
  { v: 4, label: 'High' },
  { v: 5, label: 'Very High' },
];

/**
 * Central onion reference-imagery map — disease.id → local asset.
 *
 * Local hand-built SVG reference illustrations under public/images/onion/,
 * each drawn strictly from the approved symptom descriptions above
 * (lesion colour/pattern, affected plant part). They are labelled as
 * reference illustrations via alt text — never presented as field photos.
 * Swap any entry for a real photograph later without touching components:
 * every UI surface resolves imagery through diseaseImage() / the KB
 * article's image field, never a hardcoded path.
 */
const ONION_IMAGE_DEFS = {
  'purple-blotch': ['/images/onion/purple-blotch.svg', 'Onion leaves showing purple blotch lesions'],
  'stemphylium-blight': ['/images/onion/stemphylium-blight.svg', 'Onion leaves showing Stemphylium blight tip die-back'],
  'downy-mildew': ['/images/onion/downy-mildew.svg', 'Onion foliage showing downy mildew symptoms'],
  'damping-off': ['/images/onion/damping-off.svg', 'Onion seedlings collapsed from damping-off'],
  'fusarium-basal-rot': ['/images/onion/fusarium-basal-rot.svg', 'Onion basal plate and roots affected by fusarium basal rot'],
  'white-rot': ['/images/onion/white-rot.svg', 'Onion bulb base showing white rot mycelium'],
  'pink-root': ['/images/onion/pink-root.svg', 'Onion roots affected by pink root disease'],
  'black-mould': ['/images/onion/black-mould.svg', 'Onion bulb showing black mould on outer scales'],
  'bacterial-soft-rot': ['/images/onion/bacterial-soft-rot.svg', 'Onion bulb collapsed from bacterial soft rot'],
  'yellow-dwarf': ['/images/onion/onion-yellow-dwarf.svg', 'Onion plants showing yellow dwarf stunting and yellowing'],
  'anthracnose-twister': ['/images/onion/anthracnose-twister.svg', 'Onion foliage showing anthracnose twisting symptoms'],
  thrips: ['/images/onion/thrips-damage.svg', 'Onion foliage with silvery thrips damage streaks'],
};

ONION_DISEASES.forEach((d) => {
  const def = ONION_IMAGE_DEFS[d.id];
  if (def) {
    d.image = def[0];
    d.imageAlt = def[1];
  }
});

/** Name-keyed map for convenience (mirrors the approved reference list). */
export const ONION_DISEASE_IMAGES = Object.fromEntries(
  ONION_DISEASES.filter((d) => d.image).map((d) => [d.name, d.image])
);

/** Resolve the reference illustration + alt text for a disease id. */
export function diseaseImage(id) {
  const d = ONION_DISEASES.find((x) => x.id === id);
  return d && d.image ? { src: d.image, alt: d.imageAlt } : null;
}

/** Healthy-cultivation hero (field rows) — never a disease close-up. */
export const ONION_HERO_IMAGE = '/images/onion/onion-field-hero.svg';

/** Neutral onion-silhouette fallback for genuinely missing imagery. */
export const ONION_PLACEHOLDER_IMAGE = '/images/onion/onion-silhouette.svg';
