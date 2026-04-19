import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

export default function StatCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  iconBg,
  iconColor,
}: StatCardProps) {
  const changeColors = {
    positive: 'text-green-600 bg-green-50',
    negative: 'text-danger-600 bg-danger-50',
    neutral: 'text-gray-600 bg-gray-50',
  };

  return (
    <div className="group relative bg-gradient-to-br from-white to-slate-50/80 rounded-2xl border border-slate-200/60 p-6 shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-500 tracking-wide uppercase">{title}</p>
          <p className="text-3xl font-extrabold text-slate-800 mt-2 bg-clip-text">{value}</p>
          {change && (
            <span className={
              `inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold mt-3 shadow-sm ${changeColors[changeType]}`
            }>
              {change}
            </span>
          )}
        </div>
        <div className={`p-4 rounded-2xl ${iconBg} shadow-glow group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-7 h-7 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}
