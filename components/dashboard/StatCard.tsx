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
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <span className={
              `inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${changeColors[changeType]}`
            }>
              {change}
            </span>
          )}
        </div>
        <div className={`p-3 rounded-xl ${iconBg}`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}
