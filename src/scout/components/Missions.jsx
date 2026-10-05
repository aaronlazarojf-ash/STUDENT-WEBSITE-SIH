import React, { useState } from 'react';
import { Navigation2, ClipboardList, ArrowRight } from 'lucide-react';
import { useScout } from '../ScoutContext.jsx';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import { MISSION_STATUS, STUDENT_PROGRESS } from '../mockData.js';
import { isWithinOperatingRadius } from '../config.js';
import { PriorityChip, MissionStatusChip } from './Chips.jsx';
import RubberSegment from '../../components/bits/RubberSegment.jsx';

const FILTERS = ['All', 'Pending', 'Accepted', 'In Progress', 'Needs Revisit', 'Completed'];

// Done bucket mirrors the 'Completed' filter below: submitted assignments
// can never restart a field visit — they link to their report instead.
const DONE_STATUSES = [MISSION_STATUS.COMPLETED, MISSION_STATUS.UNDER_REVIEW, MISSION_STATUS.VERIFIED];

/**
 * My Assignments — premium layout (presentation only).
 * Filter/status/report-link logic unchanged; counts derive from the
 * same shared missions array. Case images resolved via NEARBY_CASES.
 */
export default function Missions({ onOpenMission, onStartVisit, onOpenReport }) {
  const { missions, reports } = useScout();
  const { t } = useLanguage();
  const [filter, setFilter] = useState('All');

  const assignedCount = missions.filter((m) => m.status === MISSION_STATUS.ACCEPTED).length;
  const activeCount = missions.filter(
    (m) => m.status === MISSION_STATUS.IN_PROGRESS || m.status === MISSION_STATUS.EN_ROUTE
  ).length;
  const completedCount = missions.filter((m) => DONE_STATUSES.includes(m.status)).length;
  const weeklyGoal = STUDENT_PROGRESS.visitsGoal;

  const filtered = missions.filter((m) => {
    if (filter === 'All') return true;
    if (filter === 'Completed') return DONE_STATUSES.includes(m.status);
    return m.status === filter;
  });

  const filterLabelMap = {
    All: t('filterAll'),
    Pending: t('filterPending'),
    Accepted: t('filterAccepted'),
    'In Progress': t('filterInProgress'),
    'Needs Revisit': t('filterNeedsRevisit'),
    Completed: t('statusCompleted'),
  };

  return (
    <div className="space-y-4 page-enter">
      <div className="bg-[#123C2A] text-white rounded-xl px-5 py-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[3px] flex">
          <span className="flex-1 bg-[#E7973B]" /><span className="flex-1 bg-white" /><span className="flex-1 bg-[#2B8A5B]" />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">My Onion Assignments</h1>
        <p className="text-[13px] text-white/75 mt-0.5">Nashik onion belt · verify before damage spreads · {t('assignmentsSubtitle')}</p>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        <div className="bg-white border border-[#e4eae4] rounded-2xl py-3 px-2 text-center shadow-[0_1px_3px_rgba(12,59,46,0.06)]">
          <p className="text-xl font-bold text-gray-900">{assignedCount}</p>
          <p className="text-[10px] font-semibold text-gray-500">{t('assigned')}</p>
        </div>
        <div className="bg-white border border-[#e4eae4] rounded-2xl py-3 px-2 text-center shadow-[0_1px_3px_rgba(12,59,46,0.06)]">
          <p className="text-xl font-bold text-gray-900">{activeCount}</p>
          <p className="text-[10px] font-semibold text-gray-500">{t('filterInProgress')}</p>
        </div>
        <div className="bg-white border border-[#e4eae4] rounded-2xl py-3 px-2 text-center shadow-[0_1px_3px_rgba(12,59,46,0.06)]">
          <p className="text-xl font-bold text-gray-900">{completedCount}</p>
          <p className="text-[10px] font-semibold text-gray-500">{t('statusCompleted')}</p>
        </div>
        <div className="bg-white border border-[#e4eae4] rounded-2xl py-3 px-2 text-center shadow-[0_1px_3px_rgba(12,59,46,0.06)]">
          <p className="text-xl font-bold text-gray-900">{completedCount}/{weeklyGoal}</p>
          <p className="text-[10px] font-semibold text-gray-500">{t('thisWeek')}</p>
        </div>
      </div>

      <div className="flex pb-1 -mx-1 px-1">
        <RubberSegment
          items={FILTERS}
          value={filter}
          onChange={setFilter}
          getLabel={(f) => filterLabelMap[f] || f}
          ariaLabel="Filter assignments by status"
          size="sm"
        />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {filtered.map((m) => {
          const done = DONE_STATUSES.includes(m.status);
          const report = done ? reports.find((r) => r.missionId === m.id) : null;
          const priorityAccent = {
            HIGH: 'border-l-4 border-l-[#C33B45]',
            MEDIUM: 'border-l-4 border-l-[#E7973B]',
            LOW: 'border-l-4 border-l-[#2B8A5B]',
          }[m.priority] || '';
          return (
            <div
              key={m.id}
              className={`mission-card w-full bg-white border border-[#DCE4DC] rounded-xl p-3 flex flex-col ${priorityAccent}`}
            >
              <button
                onClick={() => onOpenMission(m.id)}
                className="w-full text-left group"
              >
                <div className="flex items-center gap-2">
                  <PriorityChip level={m.priority} size="sm" />
                  <span className="text-[11px] font-bold text-[#9AAA9A]">{m.id}</span>
                  <span className="ml-auto"><MissionStatusChip status={m.status} size="sm" /></span>
                </div>
                <h3 className="display text-[16px] mt-1.5">{m.title}</h3>
                <p className="text-[12px] font-semibold text-[#66756D] mt-0.5">{m.location}</p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-[11px] font-semibold text-[#3D4A3D]">
                  <span className="inline-flex items-center gap-1"><Navigation2 size={11} className="text-[#E7973B]" /> {m.distanceKm} {t('kmAway')}</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#E7F1E8] border border-[#0A6B45]/20 text-[#123C2A] font-bold">Onion</span>
                  <span>{m.assignedLabel}</span>
                  {!isWithinOperatingRadius(m.distanceKm) && (
                    <span className="text-red-600 font-bold">• {t('outsideOperatingRadius')}</span>
                  )}
                </div>
                {m.whyPriority && (
                  <div className="mt-2 rounded-lg bg-[#F5F7F2] border border-[#DCE4DC] px-2.5 py-1.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#0A6B45]">Why priority</p>
                    <p className="text-[12px] text-[#3D4A3D] mt-px line-clamp-2">{m.whyPriority}</p>
                  </div>
                )}
              </button>
              {done && onOpenReport && (
                <button
                  onClick={() => (report ? onOpenReport(report.id) : onOpenMission(m.id))}
                  className="btn-secondary mt-3 w-full text-sm py-2.5 inline-flex items-center justify-center gap-1.5"
                >
                  {t('viewReport')} <ArrowRight size={14} />
                </button>
              )}
              {!done && onStartVisit && m.status === MISSION_STATUS.ACCEPTED && (
                isWithinOperatingRadius(m.distanceKm) ? (
                  <button
                    onClick={() => onStartVisit(m.id)}
                    className="btn-primary mt-3 w-full text-sm py-2.5 inline-flex items-center justify-center gap-1.5"
                  >
                    {t('startFieldVisit')} <ArrowRight size={14} />
                  </button>
                ) : (
                  <div className="mt-3 w-full bg-red-50 border border-red-200 text-red-700 text-xs font-semibold py-2.5 rounded-[10px] text-center">
                    {t('outsideOperatingRadiusMsg')}
                  </div>
                )
              )}
              {!done && onStartVisit && m.status === MISSION_STATUS.IN_PROGRESS && (
                <button
                  onClick={() => onStartVisit(m.id)}
                  className="btn-primary mt-3 w-full text-sm py-2.5 inline-flex items-center justify-center gap-1.5"
                >
                  {t('continueFieldVisit')} <ArrowRight size={14} />
                </button>
              )}
              {!done && onStartVisit && m.status === MISSION_STATUS.NEEDS_REVISIT && (
                <button
                  onClick={() => onStartVisit(m.id)}
                  className="mt-3 w-full bg-[#C33B45] hover:bg-[#a82f39] text-white text-sm font-bold py-2.5 rounded-[10px] transition-all inline-flex items-center justify-center gap-1.5 hover:-translate-y-px"
                >
                  {t('startRevisit')} <ArrowRight size={14} />
                </button>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="bg-white border border-dashed border-[#DCE4DC] rounded-2xl py-12 px-6 text-center">
            <ClipboardList size={28} className="mx-auto text-[#B9C7B9]" />
            <p className="text-sm font-bold text-[#183027] mt-3">No onion missions in this view</p>
            <p className="text-xs text-[#66756D] mt-1">{t('tryAnotherFilter')}</p>
          </div>
        )}
      </div>
    </div>
  );
}