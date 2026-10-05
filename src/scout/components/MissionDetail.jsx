import React from 'react';
import { ArrowLeft, Droplets, Leaf, Users, Activity, CheckSquare, MapPin, ArrowRight, Target, AlertTriangle, Navigation, User, Phone, Calendar, Clock } from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card.jsx';
import { useScout } from '../ScoutContext.jsx';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import { PriorityChip, MissionStatusChip } from './Chips.jsx';
import SpringCheck from '../../components/bits/SpringCheck.jsx';
import { MISSION_STATUS } from '../mockData.js';
import { STUDENT_OPERATING_RADIUS_KM, isWithinOperatingRadius } from '../config.js';

export default function MissionDetail({ missionId, onBack, onStartVisit }) {
  const { missions, reports, updateMissionStatus, farmerAvailabilities, updateFarmerAvailability } = useScout();
  const { t } = useLanguage();
  const mission = missions.find((m) => m.id === missionId);

  const [hasDraft, setHasDraft] = React.useState(false);
  React.useEffect(() => {
    setHasDraft(!!localStorage.getItem(`geofarm_draft_${missionId}`));
  }, [missionId]);

  // FIELD CHECK state — persisted per mission so scouts keep their
  // preparation progress across sessions.
  const FIELD_CHECK_ITEMS = [
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
  const checkKey = `geofarm_fieldcheck_${missionId}`;
  const [fieldCheck, setFieldCheck] = React.useState(() => {
    try {
      const raw = localStorage.getItem(checkKey);
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  });
  const toggleCheck = (item, next) => {
    setFieldCheck((prev) => {
      const updated = next ? [...new Set([...prev, item])] : prev.filter((x) => x !== item);
      try {
        localStorage.setItem(checkKey, JSON.stringify(updated));
      } catch {
        /* ignore */
      }
      return updated;
    });
  };

  if (!mission) {
    return (
      <div className="space-y-4">
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm font-semibold text-gov-textSec">
          <ArrowLeft size={16} /> {t('backToMissions')}
        </button>
        <p className="text-sm text-gov-textSec">{t('missionNotFound')}</p>
      </div>
    );
  }

  const inProgress = mission.status === MISSION_STATUS.IN_PROGRESS;
  // Officer sent this mission's report back — show the feedback and label the CTA accordingly.
  const revisitReport = reports.find((r) => r.missionId === mission.id && r.status === 'Needs Revisit');
  const isRevisit = !!revisitReport;
  const withinRadius = isWithinOperatingRadius(mission.distanceKm);

  // Mirrors the unified Field Visit workflow's steps — localized on render
  const objectiveChecklist = [
    t('objConfirmLocation'),
    t('objRecordCropStage'),
    t('objRecordSymptoms'),
    t('objCaptureFieldEvidence'),
    t('objCaptureCloseUp'),
    ...(mission.trapId ? [t('objRecordSmartTrap')] : []),
    t('objEstimateAreaSpread'),
    t('objAddFieldNotes'),
  ];

  const handleStart = () => {
    updateMissionStatus(mission.id, MISSION_STATUS.IN_PROGRESS);
    onStartVisit(mission.id);
  };

  const hasCoords =
    Array.isArray(mission.coords) &&
    mission.coords.length === 2 &&
    typeof mission.coords[0] === 'number' &&
    typeof mission.coords[1] === 'number';
  const hasLocation = typeof mission.location === 'string' && mission.location.trim().length > 0;

  let googleMapsUrl = null;
  if (hasCoords) {
    googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mission.coords[0]},${mission.coords[1]}`;
  } else if (hasLocation) {
    googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mission.location.trim())}`;
  }

  const handleNavigate = () => {
    if (googleMapsUrl) window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  const avail = farmerAvailabilities[mission.id];
  const availMap = {
    'Available': t('availableOption'),
    'Unavailable': t('unavailableOption'),
    'Not Contacted': t('notContactedOption'),
    'Unable to Reach': t('unableToReachOption'),
  };

  return (
    <div className="space-y-4 page-enter">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm font-semibold text-gov-textSec hover:text-gov-navy">
        <ArrowLeft size={16} /> {t('backToMissions')}
      </button>

      {/* Field brief — compact reusable header */}
      <div className="bg-[#123C2A] text-white rounded-2xl px-4 py-3.5 relative overflow-hidden panel-accent">
        <div className="absolute top-0 left-0 right-0 h-[3px] flex">
          <span className="flex-1 bg-[#E7973B]" /><span className="flex-1 bg-white" /><span className="flex-1 bg-[#2B8A5B]" />
        </div>
        <div className="flex items-center gap-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E7973B]">Onion field brief</p>
          <span className="ml-auto"><PriorityChip level={mission.priority} /></span>
        </div>
        <h1 className="display text-white text-[19px] mt-1">{mission.title}</h1>
        <p className="text-[11px] font-bold uppercase tracking-wider text-white/60 mt-0.5">{mission.location} · {t('missionNo')} {mission.id}</p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-[12px] font-semibold text-white/85">
          <span>{mission.distanceKm} km</span>
          <span className="w-1 h-1 rounded-full bg-white/40" />
          <span>Onion</span>
          <span className="w-1 h-1 rounded-full bg-white/40" />
          <span>{mission.priority}</span>
          <span className="w-1 h-1 rounded-full bg-white/40" />
          <span>{mission.visitDate}</span>
        </div>
        {mission.whyPriority && (
          <div className="mt-2.5 rounded-[10px] bg-white/[0.07] border border-white/15 px-3 py-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#E8B96A]">Why this field?</p>
            <p className="text-[12px] text-white/90 mt-0.5">{mission.whyPriority}</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#E8B96A] mt-2">Your task</p>
            <p className="text-[12px] text-white/90 mt-0.5">Verify symptoms, estimate spread and collect evidence.</p>
          </div>
        )}
      </div>

      {revisitReport && (
        <Card className="border-red-200 bg-red-50">
          <p className="text-xs font-bold text-red-700 uppercase tracking-wide mb-1">{t('needsRevisitFeedback')}</p>
          <p className="text-sm text-red-800">{revisitReport.officerComment || t('officerRevisitGeneric')}</p>
          {(revisitReport.officerName || revisitReport.reviewedAt) && (
            <p className="text-[11px] text-red-700/80 mt-2">
              {revisitReport.officerName ? `— ${revisitReport.officerName}` : ''}
              {revisitReport.officerName && revisitReport.reviewedAt ? ' • ' : ''}
              {revisitReport.reviewedAt || ''}
            </p>
          )}
        </Card>
      )}

      <Card>
        <CardHeader icon={User} title={t('farmerField')} />
        <dl className="grid grid-cols-2 gap-y-3 text-sm">
          <dt className="text-gov-textSec">{t('farmerName')}</dt>
          <dd className="font-semibold text-gov-navy text-right">{mission.farmerName || '—'}</dd>
          
          <dt className="text-gov-textSec">{t('farmerId')}</dt>
          <dd className="font-semibold text-gov-navy text-right">{mission.farmerId || '—'}</dd>
          
          <dt className="text-gov-textSec">{t('fieldId')}</dt>
          <dd className="font-semibold text-gov-navy text-right">{mission.fieldId || '—'}</dd>
          
          <dt className="text-gov-textSec">{t('plotNumber')}</dt>
          <dd className="font-semibold text-gov-navy text-right">{mission.plotNumber || '—'}</dd>
          
          <dt className="text-gov-textSec">{t('villageLocation')}</dt>
          <dd className="font-semibold text-gov-navy text-right">{mission.location}</dd>
          
          <dt className="text-gov-textSec">{t('cropLabel')}</dt>
          <dd className="font-semibold text-gov-navy text-right">{mission.crop}</dd>
        </dl>
        
        <div className="mt-4 pt-4 border-t border-gray-100 flex gap-3">
          {mission.farmerPhone ? (
            <a 
              href={`tel:${mission.farmerPhone.replace(/\s+/g, '')}`}
              className="flex-1 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Phone size={15} /> {t('callFarmer')}
            </a>
          ) : (
            <div className="flex-1 bg-gray-50 text-gray-400 border border-gray-200 font-semibold py-2 rounded-lg flex items-center justify-center gap-2 cursor-not-allowed">
              <Phone size={15} /> {t('noPhone')}
            </div>
          )}
        </div>
      </Card>

      <Card>
        <CardHeader icon={Calendar} title={t('visitSchedulePrep')} />
        <dl className="grid grid-cols-2 gap-y-3 text-sm mb-4">
          <dt className="text-gov-textSec flex items-center gap-1.5"><Calendar size={13} /> {t('visitDate')}</dt>
          <dd className="font-semibold text-gov-navy text-right">{mission.visitDate || '—'}</dd>
          
          <dt className="text-gov-textSec flex items-center gap-1.5"><Clock size={13} /> {t('preferredTime')}</dt>
          <dd className="font-semibold text-gov-navy text-right">{mission.preferredTime || '—'}</dd>
        </dl>

        <div className="pt-3 border-t border-gray-100">
          <label className="block text-xs font-bold text-gov-textSec uppercase tracking-wide mb-1.5">
            {t('farmerAvailability')}
          </label>
          <select 
            value={farmerAvailabilities[mission.id] || ''}
            onChange={(e) => updateFarmerAvailability(mission.id, e.target.value)}
            className="w-full bg-white border border-gov-border rounded-lg p-2.5 text-sm focus:outline-none focus:border-gov-blue text-gov-navy font-semibold"
          >
            <option value="" disabled>{t('selectAvailability')}</option>
            <option value="Available">{t('availableOption')}</option>
            <option value="Unavailable">{t('unavailableOption')}</option>
            <option value="Not Contacted">{t('notContactedOption')}</option>
            <option value="Unable to Reach">{t('unableToReachOption')}</option>
          </select>
        </div>
      </Card>

      <Card>
        <CardHeader title={t('missionOverview')} />
        <dl className="grid grid-cols-2 gap-y-3 text-sm">
          <dt className="text-gov-textSec">{t('assignedBy')}</dt>
          <dd className="font-semibold text-gov-navy text-right">{mission.assignedBy}</dd>
          <dt className="text-gov-textSec">{t('target')}</dt>
          <dd className="font-semibold text-gov-navy text-right">{mission.crop} {t('field').toLowerCase()}</dd>
          <dt className="text-gov-textSec">{t('surveyType')}</dt>
          <dd className="font-semibold text-gov-navy text-right">{mission.surveyType}</dd>
          <dt className="text-gov-textSec">{t('field')}</dt>
          <dd className="font-semibold text-gov-navy text-right">{mission.fieldName}</dd>
          <dt className="text-gov-textSec">{t('coordinates')}</dt>
          <dd className="font-semibold text-gov-navy text-right">{mission.coords[0].toFixed(4)}° N, {mission.coords[1].toFixed(4)}° E</dd>
          <dt className="text-gov-textSec">{t('distance')}</dt>
          <dd className={`font-semibold text-right ${withinRadius ? 'text-gov-navy' : 'text-red-600'}`}>
            {mission.distanceKm} km {withinRadius ? '' : `(${t('operatingRadiusLimit').toLowerCase()})`}
          </dd>
          <dt className="text-gov-textSec">{t('cropStage')}</dt>
          <dd className="font-semibold text-gov-navy text-right">{mission.cropStage}</dd>
          <dt className="text-gov-textSec">{t('lastObservation')}</dt>
          <dd className="font-semibold text-gov-navy text-right">{mission.lastObservation}</dd>
          <dt className="text-gov-textSec">{t('status')}</dt>
          <dd className="text-right">
            {hasDraft ? (
              <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-bold text-gray-700 border border-gray-200">
                {t('draft')}
              </span>
            ) : (
              <MissionStatusChip status={mission.status} size="sm" />
            )}
          </dd>
        </dl>
      </Card>

      <Card>
        <CardHeader icon={Activity} title={t('whyMissionCreated')} subtitle={t('earlyWarning')} />
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gov-bg rounded-lg p-3 border border-gov-border">
            <div className="flex items-center gap-1.5 text-gov-textSec text-xs font-semibold"><Droplets size={13} /> {t('humidityLabel')}</div>
            <p className="text-lg font-bold text-gov-navy mt-0.5">{mission.reason.humidity}%</p>
          </div>
          <div className="bg-gov-bg rounded-lg p-3 border border-gov-border">
            <div className="flex items-center gap-1.5 text-gov-textSec text-xs font-semibold"><Leaf size={13} /> {t('leafWetnessLabel')}</div>
            <p className="text-lg font-bold text-gov-navy mt-0.5">{mission.reason.leafWetness}</p>
          </div>
          <div className="bg-gov-bg rounded-lg p-3 border border-gov-border">
            <div className="flex items-center gap-1.5 text-gov-textSec text-xs font-semibold"><Users size={13} /> {t('nearbyReports')}</div>
            <p className="text-lg font-bold text-gov-navy mt-0.5">{mission.reason.nearbyReports}</p>
          </div>
          <div className="bg-gov-bg rounded-lg p-3 border border-gov-border">
            <div className="text-gov-textSec text-xs font-semibold">{t('riskModel')}</div>
            <p className="text-lg font-bold text-red-600 mt-0.5">{mission.reason.riskModel}</p>
          </div>
        </div>
        <p className="text-xs text-gov-textSec mt-3">
          {t('previousObservation')}: <span className="font-semibold text-gov-navy">{mission.reason.previousObservation}</span>
        </p>
      </Card>

      <Card>
        <CardHeader icon={CheckSquare} title={t('recommendedFieldAction')} subtitle={t('inspectFollowing')} />
        <ul className="space-y-2">
          {mission.recommendedChecks.map((c) => (
            <li key={c} className="flex items-center gap-2 text-sm text-gov-text">
              <span className="w-1.5 h-1.5 rounded-full bg-gov-blue shrink-0" /> {c}
            </li>
          ))}
        </ul>
        <div className="mt-3 flex flex-wrap gap-1.5 text-[10px] font-bold">
          <span className="px-2 py-1 rounded bg-gray-100 border border-gray-200 text-gray-600">WEATHER · last updated</span>
          <span className="px-2 py-1 rounded bg-gray-100 border border-gray-200 text-gray-600">SATELLITE · recent observation</span>
          <span className="px-2 py-1 rounded bg-gray-100 border border-gray-200 text-gray-600">FIELD REPORT · student verified</span>
          <span className="px-2 py-1 rounded bg-amber-50 border border-amber-200 text-amber-800">DEMO DATA</span>
        </div>
      </Card>

      {/* Observation checklist */}
      <Card>
        <CardHeader icon={CheckSquare} title="Field check" subtitle={`Before submitting your observation · ${fieldCheck.length}/${FIELD_CHECK_ITEMS.length} done`} />
        <div className="grid sm:grid-cols-2 gap-x-3 gap-y-0.5" role="group" aria-label="Field inspection checklist">
          {FIELD_CHECK_ITEMS.map((c) => (
            <SpringCheck
              key={c}
              label={c}
              name={`fieldcheck-${mission.id}`}
              checked={fieldCheck.includes(c)}
              onChange={(next) => toggleCheck(c, next)}
            />
          ))}
        </div>
      </Card>

      {/* Risk timeline */}
      <Card>
        <CardHeader icon={Target} title="Risk timeline" subtitle="Signal → verification → follow-up" />
        <ol className="space-y-0">
          {['Signal detected', 'Field flagged', 'Mission assigned', 'Student verified', 'Report submitted', 'Follow-up'].map((s, i, arr) => (
            <li key={s} className="flex gap-2.5">
              <div className="flex flex-col items-center">
                <span className={`w-2.5 h-2.5 rounded-full mt-1 ${i < 3 ? 'bg-[#0A6B45]' : 'bg-[#DCE4DC] border border-[#0A6B45]/40'}`} />
                {i < arr.length - 1 && <span className="w-px flex-1 bg-[#DCE4DC]" />}
              </div>
              <p className={`text-[13px] pb-3 ${i < 3 ? 'font-bold text-[#183027]' : 'text-[#66756D]'}`}>{s}{i === 2 && ' · you are here'}</p>
            </li>
          ))}
        </ol>
      </Card>

      <Card>
        <CardHeader icon={Target} title={t('fieldVisitObjective')} subtitle={t('whyBeingSent')} />

        <p className="text-xs font-bold text-gov-textSec uppercase tracking-wide mb-1.5">{t('whyThisVisit')}</p>
        <p className="text-sm text-gov-text mb-4">
          {t('verify')} {mission.reason.previousObservation.toLowerCase()} {t('field').toLowerCase()}.
        </p>

        <p className="text-xs font-bold text-gov-textSec uppercase tracking-wide mb-1.5">{t('whatToCollect')}</p>
        <ul className="space-y-1.5 mb-4">
          {objectiveChecklist.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2 text-sm text-gov-text">
              <CheckSquare size={13} className="text-gov-blue shrink-0" /> {item}
            </li>
          ))}
        </ul>

        <p className="text-xs text-gov-textSec border-t border-gray-100 pt-3">
          {t('reportSentToOfficer2')}
        </p>
      </Card>

      <Card>
        <CardHeader title={t('beforeYouVisit')} subtitle={t('prepChecklist')} />
        <ul className="space-y-2 text-sm text-gov-navy font-semibold">
          <li className="flex items-center gap-2">
            <CheckSquare size={14} className={mission.farmerName ? 'text-green-600' : 'text-gray-300'} /> 
            {t('farmerInformation')} {mission.farmerName ? t('farmerInfoAvailable') : t('farmerInfoMissing')}
          </li>
          <li className="flex items-center gap-2">
            <CheckSquare size={14} className={hasCoords || hasLocation ? 'text-green-600' : 'text-gray-300'} /> 
            {t('fieldLocationLabel')} {hasCoords || hasLocation ? t('farmerInfoAvailable') : t('farmerInfoMissing')}
          </li>
          <li className="flex items-center gap-2">
            <CheckSquare size={14} className={googleMapsUrl ? 'text-green-600' : 'text-gray-300'} /> 
            {t('navigateToField')} {googleMapsUrl ? t('navigationAvailable') : t('navigationUnavailable')}
          </li>
          <li className="flex items-center gap-2">
            <CheckSquare size={14} className={mission.visitDate ? 'text-green-600' : 'text-gray-300'} /> 
            {t('visitDate')} {mission.visitDate ? t('visitDateScheduled') : t('visitDateNotScheduled')}
          </li>
          <li className="flex items-center gap-2">
            <CheckSquare size={14} className={avail && avail !== 'Not Contacted' ? 'text-green-600' : 'text-gray-300'} /> 
            {t('farmerAvailability')} {avail ? `(${availMap[avail] || avail})` : `(${t('farmerAvailRecorded')})`}
          </li>
        </ul>
      </Card>

      {/* ── Navigate to Field ─────────────────────────────────────── */}
      <div className="border border-gov-border rounded-lg p-4 bg-white">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs font-bold text-gov-textSec uppercase tracking-wide">{t('fieldLocationLabel')}</p>
            <p className="text-sm font-semibold text-gov-navy mt-0.5 flex items-center gap-1">
              <MapPin size={13} className="shrink-0" /> {mission.location}
            </p>
            {mission.fieldName && (
              <p className="text-xs text-gov-textSec mt-0.5">{mission.fieldName}</p>
            )}
            {hasCoords && (
              <p className="text-xs text-gov-textSec mt-0.5">
                {mission.coords[0].toFixed(4)}° N, {mission.coords[1].toFixed(4)}° E
              </p>
            )}
          </div>
        </div>
        {googleMapsUrl ? (
          <button
            onClick={handleNavigate}
            className="w-full flex items-center justify-center gap-2 border border-gov-blue text-gov-blue hover:bg-gov-blue hover:text-white font-bold text-sm py-2.5 rounded-lg transition-colors"
          >
            <Navigation size={15} />
            {t('navigateToField')}
          </button>
        ) : (
          <div className="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-400 text-sm py-2.5 rounded-lg cursor-not-allowed bg-gray-50">
            <Navigation size={15} />
            {t('navigationUnavailableMsg')}
          </div>
        )}
        {hasCoords && (
          <p className="text-[11px] text-gov-textSec mt-2 text-center">{t('opensGoogleMaps')}</p>
        )}
      </div>

      <div className="sticky bottom-16 lg:bottom-0 lg:static pt-2">
        {mission.status === MISSION_STATUS.COMPLETED || mission.status === MISSION_STATUS.UNDER_REVIEW || mission.status === MISSION_STATUS.VERIFIED ? (
          <div className="bg-green-50 border border-green-200 text-green-700 text-sm font-semibold rounded-lg py-3 text-center">
            {t('missionAlreadySubmitted')}
          </div>
        ) : !withinRadius && !inProgress ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3.5 text-center">
            <p className="text-sm font-bold text-red-700 flex items-center justify-center gap-1.5">
              <AlertTriangle size={15} /> {t('operatingRadiusLimit')}
            </p>
            <p className="text-xs text-red-700 mt-1">
              {t('outsideRadiusDetail')} {mission.distanceKm} {t('kmLimit')} {STUDENT_OPERATING_RADIUS_KM} {t('km')}
            </p>
          </div>
        ) : (
          <button
            onClick={handleStart}
            className="btn-primary w-full py-3.5 shadow-lg flex items-center justify-center gap-2 text-[15px]"
          >
            {isRevisit && !inProgress ? t('startRevisit') : inProgress ? t('continueFieldVisitBtn') : t('startFieldVisitBtn')} <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
