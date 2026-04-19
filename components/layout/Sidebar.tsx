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
          'fixed top-0 left-0 z-40 h-screen w-72 bg-white border-r border-slate-200 shadow-[4px_0_24px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-in-out',
          'lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-4 px-6 py-6 bg-gradient-to-r from-primary-600 to-primary-500">
          <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg">
            <Pill className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white drop-shadow-md">Nova Salud</h1>
            <p className="text-xs text-primary-100 font-semibold tracking-wider">SISTEMA DE GESTIÓN</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto bg-slate-50/50">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 group mx-1',
                  isActive
                    ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-500/40 translate-x-1'
                    : 'text-slate-600 hover:bg-white hover:shadow-md hover:text-primary-600 hover:translate-x-1'
                )}
              >
                <Icon className={cn('w-5 h-5 transition-transform group-hover:scale-110', isActive ? 'text-white' : 'text-slate-400 group-hover:text-primary-500')} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-slate-200 bg-white">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
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
