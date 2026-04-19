'use client';

import { Bell, Search } from 'lucide-react';
import { storage } from '@/lib/data';
import { useEffect, useState } from 'react';
import { InventoryAlert } from '@/types';
import Link from 'next/link';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  const [unreadAlerts, setUnreadAlerts] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const alerts = storage.getAlerts();
    setUnreadAlerts(alerts.filter((a: InventoryAlert) => !a.resolved).length);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Title */}
          <div className="lg:ml-0 ml-12">
            <h1 className="text-2xl font-bold text-gradient">{title}</h1>
            {subtitle && <p className="text-sm text-slate-500 mt-1 font-medium">{subtitle}</p>}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-64 rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-sm transition-all hover:shadow-soft"
              />
            </div>

            {/* Notifications */}
            <Link
              href="/alerts"
              className="relative p-2.5 text-slate-500 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200 hover:shadow-soft"
            >
              <Bell className="w-5 h-5" />
              {unreadAlerts > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-gradient-to-br from-danger-500 to-danger-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-glow animate-pulse-glow">
                  {unreadAlerts > 9 ? '9+' : unreadAlerts}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
