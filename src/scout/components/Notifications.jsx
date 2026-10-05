import React, { useEffect } from 'react';
import { AlertTriangle, Info, CheckCircle2, Clock } from 'lucide-react';
import { useScout } from '../ScoutContext.jsx';
import { useLanguage } from '../../contexts/LanguageContext.jsx';

const LEVEL_STYLE = {
  critical: { icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50 border-red-200' },
  warning: { icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50 border-orange-200' },
  info: { icon: Info, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200' },
  success: { icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50 border-green-200' },
};

export default function Notifications() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useScout();
  const { t } = useLanguage();

  useEffect(() => {
    markAllNotificationsRead();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getLocalizedTitle = (n) => {
    if (n.id === 'N1') return t('notifTitle_N1');
    if (n.id === 'N2') return t('notifTitle_N2');
    if (n.id === 'N3') return t('notifTitle_N3');
    if (n.id === 'N4') return t('notifTitle_N4');
    if (n.title === 'New assignment') return t('notifTitle_new_assignment');
    return n.title;
  };

  const getLocalizedBody = (n) => {
    if (n.id === 'N1') return t('notifBody_N1');
    if (n.id === 'N2') return t('notifBody_N2');
    if (n.id === 'N3') return t('notifBody_N3');
    if (n.id === 'N4') return t('notifBody_N4');
    return n.body;
  };

  return (
    <div className="space-y-4 max-w-xl mx-auto page-enter">
      <div className="bg-[#123C2A] text-white rounded-2xl px-5 py-4 relative overflow-hidden panel-accent">
        <div className="absolute top-0 left-0 right-0 h-[3px] flex">
          <span className="flex-1 bg-[#E7973B]" /><span className="flex-1 bg-white" /><span className="flex-1 bg-[#2B8A5B]" />
        </div>
        <p className="eyebrow !text-[#E8B96A]">Onion alerts · Nashik belt</p>
        <h1 className="display text-white text-[22px] mt-1">{t('notificationsTitle')}</h1>
        <p className="text-[13px] text-white/70 mt-0.5">{t('notificationsSubtitle')}</p>
      </div>

      <div className="space-y-2">
        {notifications.map((n) => {
          const style = LEVEL_STYLE[n.level] || LEVEL_STYLE.info;
          const levelLabel = n.level === 'critical' ? 'High priority' : n.level === 'warning' ? 'Assignment' : n.level === 'success' ? 'Verified' : 'Update';
          return (
            <button
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              className={`card-hover w-full text-left rounded-2xl border p-3.5 flex gap-3 bg-white ${n.level === 'critical' ? 'border-[#C33B45]/40' : n.level === 'warning' ? 'border-[#E7973B]/40' : 'border-[#DCE4DC]'} ${n.read ? 'opacity-70' : ''}`}
            >
              <span className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${n.level === 'critical' ? 'bg-[#C33B45]' : n.level === 'warning' ? 'bg-[#E7973B]' : n.level === 'success' ? 'bg-[#0A6B45]' : 'bg-[#267A70]'} ${!n.read && n.level === 'critical' ? 'urgent-dot' : ''}`} />
              <style.icon size={18} className={`shrink-0 mt-0.5 ${style.color}`} />
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#66756D]">{levelLabel}</p>
                <p className="text-sm font-bold text-gov-navy mt-0.5">{getLocalizedTitle(n)}</p>
                <p className="text-xs text-gov-text mt-0.5">{getLocalizedBody(n)}</p>
                <p className="text-[11px] text-gov-textSec mt-1 flex items-center gap-1"><Clock size={10} /> {n.time}</p>
              </div>
              {!n.read && <span className="w-2 h-2 rounded-full bg-[#0A6B45] shrink-0 mt-1" />}
            </button>
          );
        })}

        {notifications.length === 0 && (
          <div className="bg-white border border-dashed border-[#DCE4DC] rounded-2xl py-12 px-6 text-center">
            <p className="text-[14px] font-bold text-[#183027]">No onion alerts right now</p>
            <p className="text-[12px] text-[#66756D] mt-1">New field verifications will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
