'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Bell,
  Settings,
  Menu,
  X,
  Pill,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Inventario', href: '/inventory', icon: Package },
  { name: 'Punto de Venta', href: '/pos', icon: ShoppingCart },
  { name: 'Ventas', href: '/sales', icon: BarChart3 },
  { name: 'Clientes', href: '/customers', icon: Users },
  { name: 'Alertas', href: '/alerts', icon: Bell },
  { name: 'Configuración', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-glow hover:shadow-elevated transition-all duration-300"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-screen w-72 bg-gradient-to-b from-white to-slate-50/80 backdrop-blur-xl border-r border-white/50 shadow-elevated transition-transform duration-300 ease-in-out',
          'lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-4 px-6 py-6 border-b border-slate-100">
          <div className="p-3 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-glow">
            <Pill className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gradient">Nova Salud</h1>
            <p className="text-xs text-slate-500 font-medium tracking-wide">SISTEMA DE GESTIÓN</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 group',
                  isActive
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-glow shadow-primary-500/30'
                    : 'text-slate-600 hover:bg-white hover:shadow-soft hover:text-primary-600'
                )}
              >
                <Icon className={cn('w-5 h-5 transition-transform group-hover:scale-110', isActive ? 'text-white' : 'text-slate-400 group-hover:text-primary-500')} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-slate-100 bg-gradient-to-r from-slate-50/50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-sm shadow-glow">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-800 truncate">Administrador</p>
              <p className="text-xs text-slate-500 truncate">admin@novasalud.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
