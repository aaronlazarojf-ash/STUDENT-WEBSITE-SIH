import React, { useState } from 'react';
import { ChevronRight, Cloud, CloudUpload } from 'lucide-react';
import { useScout } from '../ScoutContext.jsx';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import { RiskChip, MissionStatusChip } from './Chips.jsx';

const FILTERS = ['All', 'Verified', 'Under Review', 'Needs Revisit'];

export default function Reports({ onOpenReport }) {
  const { reports } = useScout();
  const { t } = useLanguage();
  const [filter, setFilter] = useState('All');
  const filtered = reports.filter((r) => {
    if (filter === 'All') return true;
    if (filter === 'Under Review') return r.status === 'Awaiting Officer Review' || r.status === 'Under Review';
    return r.status === filter;
  });

  return (
    <div className="space-y-4 page-enter">
      <div className="bg-[#123C2A] text-white rounded-xl px-5 py-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[3px] flex">
          <span className="flex-1 bg-[#E7973B]" /><span className="flex-1 bg-white" /><span className="flex-1 bg-[#2B8A5B]" />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E7973B]">Onion · Nashik · student-verified</p>
        <h1 className="text-xl font-bold tracking-tight mt-0.5">Field Visit History</h1>
        <p className="text-[13px] text-white/75 mt-0.5">Date · field · disease/pest · risk · verification · status.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-colors ${filter === f ? 'bg-[#123C2A] text-white border-[#123C2A]' : 'bg-white text-gray-500 border-[#DCE4DC]'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-2">
        <div className="bg-white border border-gov-border rounded-lg p-2.5 text-center">
          <p className="text-[10px] font-bold text-gov-textSec uppercase tracking-tight">{t('visitsLabel')}</p>
          <p className="text-lg font-bold text-gov-navy leading-none mt-1">{reports.length}</p>
        </div>
        <div className="bg-white border border-green-200 rounded-lg p-2.5 text-center">
          <p className="text-[10px] font-bold text-green-700 uppercase tracking-tight">{t('verifiedLabel')}</p>
          <p className="text-lg font-bold text-green-700 leading-none mt-1">{reports.filter((r) => r.status === 'Verified').length}</p>
        </div>
        <div className="bg-white border border-purple-200 rounded-lg p-2.5 text-center">
          <p className="text-[10px] font-bold text-purple-700 uppercase tracking-tight">{t('reviewLabel')}</p>
          <p className="text-lg font-bold text-purple-700 leading-none mt-1">{reports.filter((r) => r.status === 'Awaiting Officer Review' || r.status === 'Under Review').length}</p>
        </div>
        <div className="bg-white border border-red-200 rounded-lg p-2.5 text-center">
          <p className="text-[10px] font-bold text-red-700 uppercase tracking-tight">{t('revisitLabel')}</p>
          <p className="text-lg font-bold text-red-700 leading-none mt-1">{reports.filter((r) => r.status === 'Needs Revisit').length}</p>
        </div>
      </div>

      {/* Desktop: compact table */}
      <div className="hidden md:block bg-white border border-[#DCE4DC] rounded-xl overflow-hidden">
        <table className="w-full text-left text-[12px]">
          <thead>
            <tr className="bg-[#F5F7F2] text-[#66756D] text-[10px] uppercase tracking-wider">
              <th className="font-bold px-3 py-2">Date</th>
              <th className="font-bold px-3 py-2">Field</th>
              <th className="font-bold px-3 py-2">Concern</th>
              <th className="font-bold px-3 py-2">Severity</th>
              <th className="font-bold px-3 py-2">Verification</th>
              <th className="font-bold px-3 py-2">Status</th>
              <th className="px-3 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EBF0EB]">
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-[#F5F7F2] transition-colors">
                <td className="px-3 py-2.5 font-semibold text-[#3D4A3D] whitespace-nowrap">{r.submittedAt}</td>
                <td className="px-3 py-2.5 font-bold text-[#183027]">{r.field} <span className="font-semibold text-[#66756D]">· {r.crop}</span></td>
                <td className="px-3 py-2.5 text-[#3D4A3D]">{r.finding}</td>
                <td className="px-3 py-2.5 text-[#3D4A3D]">{r.severity?.affectedArea || (r.severity?.rating != null ? `Rating ${r.severity.rating}` : '—')}</td>
                <td className="px-3 py-2.5 text-[#3D4A3D]">{r.scoutVerification?.status || '—'}</td>
                <td className="px-3 py-2.5"><MissionStatusChip status={r.status} size="sm" /></td>
                <td className="px-3 py-2.5 text-right">
                  <button onClick={() => onOpenReport(r.id)} className="btn-tertiary">Open <ChevronRight size={12} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-10 text-sm text-gov-textSec">No active field observations for this filter.</div>
        )}
      </div>

      <div className="space-y-3 md:hidden">
        {filtered.map((r) => (
          <button
            key={r.id}
            onClick={() => onOpenReport(r.id)}
            className="w-full text-left bg-white border border-gov-border rounded-xl p-4 shadow-card hover:border-gov-blue transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-gov-textSec">{r.id}</p>
                <h3 className="text-sm font-bold text-gov-navy mt-0.5">{r.finding}</h3>
                <p className="text-xs text-gov-textSec mt-0.5">{r.field} • {r.crop} • {r.submittedAt}</p>
                {r.outcomeLabel && (
                  <p className="text-[11px] font-semibold text-gov-navy mt-1.5 flex items-center gap-1 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-gov-blue">
                    {r.outcomeLabel}
                  </p>
                )}
              </div>
              <ChevronRight size={16} className="text-gov-textSec shrink-0 mt-1" />
            </div>
            <div className="flex items-center gap-2 mt-3">
              <RiskChip level={r.risk} size="sm" />
              <MissionStatusChip status={r.status} size="sm" />
              <span className="text-xs text-gov-textSec ml-auto flex items-center gap-3">
                {r.synced === false ? (
                  <span className="flex items-center gap-1 text-orange-600 font-semibold">
                    <CloudUpload size={12} /> {t('waitingToSync')}
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-green-700 font-semibold">
                    <Cloud size={12} /> {t('synced')}
                  </span>
                )}
                <span>{t('dataQuality')} {r.dataQuality}%</span>
              </span>
            </div>
            {r.status === 'Needs Revisit' && (
              <p className="text-[11px] font-semibold text-red-700 bg-red-50 border border-red-200 rounded-lg px-2.5 py-1.5 mt-2">
                {t('officerRevisitNote')}
              </p>
            )}
          </button>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-10 text-sm text-gov-textSec bg-white border border-dashed border-[#DCE4DC] rounded-xl">No active field observations for this filter.</div>
        )}
        {reports.length === 0 && (
          <div className="text-center py-10 text-sm text-gov-textSec">{t('noReportsYet')}</div>
        )}
      </div>
    </div>
  );
}
