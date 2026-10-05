import React, { useMemo, useState } from 'react';
import { Search, MapPin, Clock, SearchX, ArrowRight } from 'lucide-react';
import { PriorityChip, distanceBand } from './Chips.jsx';
import AgriImage from './AgriImage.jsx';
import { NEARBY_CASES, NEARBY_CASE_DETAILS, MISSION_STATUS } from '../mockData.js';
import { useScout } from '../ScoutContext.jsx';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import RubberSegment from '../../components/bits/RubberSegment.jsx';

const FILTERS = ['All', 'High Risk', 'Medium', 'Low', 'Nearby', 'Regional'];

/**
 * Nearby Agricultural Cases — premium card grid (presentation only).
 */
export default function NearbyCases({ onOpenCase, acceptedIds = {} }) {
  const { missions } = useScout();
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');

  // Derive per-case progress from the shared mission status
  const caseProgress = (id) => {
    const mission = missions.find((m) => m.id === id);
    if (
      mission &&
      (mission.status === MISSION_STATUS.COMPLETED ||
        mission.status === MISSION_STATUS.UNDER_REVIEW ||
        mission.status === MISSION_STATUS.VERIFIED)
    ) {
      return 'Completed';
    }
    if (acceptedIds[id]) return 'Assigned';
    return null;
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return NEARBY_CASES.filter((c) => {
      if (filter === 'Nearby' && c.distanceKm >= 20) return false;
      if (filter === 'Regional' && (c.distanceKm < 20 || c.distanceKm >= 75)) return false;
      if (filter === 'High Risk' && c.priority !== 'HIGH') return false;
      if (filter === 'Medium' && c.priority !== 'MEDIUM') return false;
      if (filter === 'Low' && c.priority !== 'LOW') return false;
      if (!q) return true;
      const detail = NEARBY_CASE_DETAILS[c.id];
      return [c.farmer, c.crop, c.issue, c.village, detail?.problem, detail?.aiDiagnosis]
        .filter(Boolean)
        .some((v) => v.toLowerCase().includes(q));
    });
  }, [query, filter]);

  const filterLabelMap = {
    All: t('filterAll'),
    'High Risk': t('filterHighRisk'),
    Medium: t('filterMedium'),
    Low: t('filterLow'),
    Nearby: t('filterNearby'),
    Regional: t('filterRegional'),
  };

  return (
    <div className="space-y-4 page-enter">
      <div className="bg-[#123C2A] text-white rounded-xl px-5 py-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[3px] flex">
          <span className="flex-1 bg-[#E7973B]" /><span className="flex-1 bg-white" /><span className="flex-1 bg-[#2B8A5B]" />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E7973B]">Nashik onion belt · pilot surveillance areas</p>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight mt-0.5">Nearby Onion Cases</h1>
        <p className="text-[13px] text-white/75 mt-0.5">Prioritized field observations around the Nashik onion belt.</p>
      </div>

      <div className="flex items-center gap-1.5 text-[13px] text-gray-600 bg-white border border-[#e4eae4] rounded-2xl px-3 py-2.5">
        <MapPin size={14} className="text-[#0C3B2E] shrink-0" />
        <span className="font-semibold">Nashik Onion Belt: Niphad · Lasalgaon · Sinnar · Malegaon</span>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('searchCasesPlaceholder')}
          className="w-full pl-9 pr-3 py-2.5 text-sm border border-[#e4eae4] rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0C3B2E]/20 focus:border-[#0C3B2E]/30 placeholder:text-gray-400"
        />
      </div>

      <div className="flex pb-1 -mx-1 px-1">
        <RubberSegment
          items={FILTERS}
          value={filter}
          onChange={setFilter}
          getLabel={(f) => filterLabelMap[f] || f}
          ariaLabel="Filter nearby cases"
          size="sm"
        />
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((c) => {
          const detail = NEARBY_CASE_DETAILS[c.id];
          const progress = caseProgress(c.id);
          const imgSrc = c.image || detail?.image || null;
          const variety = 'Onion';
          return (
            <div key={c.id} className="bg-white border border-[#e4eae4] rounded-2xl shadow-[0_1px_3px_rgba(12,59,46,0.06)] overflow-hidden flex flex-col card-hover">
              <div className="relative">
                <AgriImage
                  src={imgSrc}
                  alt={c.imageAlt || `${c.issue} — onion reference illustration`}
                  label={t('fieldImageUnavailable') || 'Field image not available'}
                  className="w-full h-36"
                />
                <span className="absolute top-2 left-2 shadow">
                  <PriorityChip level={c.priority} />
                </span>
                {progress === 'Completed' && (
                  <span className="absolute top-2 right-2 text-[10px] font-bold text-white bg-green-600 rounded px-1.5 py-0.5 shadow">
                    {t('statusCompleted')}
                  </span>
                )}
                {progress === 'Assigned' && (
                  <span className="absolute top-2 right-2 text-[10px] font-bold text-green-800 bg-green-50 border border-green-200 rounded px-1.5 py-0.5 shadow">
                    {t('assigned')}
                  </span>
                )}
              </div>

              <div className="p-4 flex flex-col flex-1">
                <p className="text-[11px] font-bold text-gray-400">Case #{c.id}</p>
                <h3 className="text-[15px] font-bold text-gray-900 mt-0.5">{detail?.problem || c.issue}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{variety}</p>
                <p className="text-[13px] font-semibold text-gray-800 mt-2">{c.farmer}</p>
                <p className="text-xs text-gray-500">{c.village}</p>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 mt-2">
                  <span className="flex items-center gap-1"><MapPin size={13} /> {c.distanceKm} km · {distanceBand(c.distanceKm, t)}</span>
                  <span className="flex items-center gap-1"><Clock size={13} /> {c.reportedAt}</span>
                </div>

                {detail && (
                  <p className="text-xs text-gray-500 mt-2">
                    {t('aiConfidenceLabel') || 'AI confidence'}: <span className="font-bold text-[#0C3B2E]">{detail.aiConfidence}%</span>
                  </p>
                )}

                <button
                  onClick={() => onOpenCase(c.id)}
                  className="btn-primary mt-3 w-full text-sm py-2.5 flex items-center justify-center gap-1.5"
                >
                  {t('viewCaseDetails')} <ArrowRight size={15} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white border border-dashed border-[#DCE4DC] rounded-2xl py-12 px-6 text-center">
          <SearchX size={28} className="mx-auto text-[#B9C7B9]" />
          <p className="text-sm font-bold text-[#183027] mt-3">
            No active field observations
          </p>
          <p className="text-xs text-[#66756D] mt-1">{t('tryAnotherFilter')}</p>
        </div>
      )}
    </div>
  );
}
