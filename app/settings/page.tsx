'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Alert from '@/components/ui/Alert';
import { Store, User, Bell, Shield, Database } from 'lucide-react';

export default function SettingsPage() {
  const [showAlert, setShowAlert] = useState(false);

  const handleSave = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-slate-100">
      <Sidebar />
      
      <div className="lg:ml-72">
        <Header title="Configuración" subtitle="Ajustes del sistema" />
        
        <main className="p-6 sm:p-8 lg:p-10">
          {showAlert && (
            <div className="mb-4">
              <Alert variant="success" onClose={() => setShowAlert(false)}>
                Configuración guardada exitosamente
              </Alert>
            </div>
          )}

          <div className="max-w-3xl space-y-6">
            {/* Business Info */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Store className="w-5 h-5 text-primary-600" />
                  <CardTitle>Información del Negocio</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Nombre de la botica"
                    defaultValue="Nova Salud"
                  />
                  <Input
                    label="RUC"
                    defaultValue="20123456789"
                  />
                </div>
                <Input
                  label="Dirección"
                  defaultValue="Av. Principal 123, Lima"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Teléfono"
                    defaultValue="01 234-5678"
                  />
                  <Input
                    label="Email"
                    defaultValue="contacto@novasalud.com"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary-600" />
                  <CardTitle>Notificaciones</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-gray-900">Alertas de stock bajo</p>
                    <p className="text-sm text-gray-500">Notificar cuando un producto esté por debajo del mínimo</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-gray-900">Alertas de vencimiento</p>
                    <p className="text-sm text-gray-500">Notificar productos próximos a vencer</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-gray-900">Reportes diarios</p>
                    <p className="text-sm text-gray-500">Enviar resumen de ventas al final del día</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Inventory Settings */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-primary-600" />
                  <CardTitle>Configuración de Inventario</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Días de anticipación para alertas de vencimiento"
                    type="number"
                    defaultValue="60"
                  />
                  <Input
                    label="Margen de stock de seguridad (%)"
                    type="number"
                    defaultValue="20"
                  />
                </div>
              </CardContent>
            </Card>

            {/* User Profile */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary-600" />
                  <CardTitle>Perfil de Usuario</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Nombre"
                    defaultValue="Administrador"
                  />
                  <Input
                    label="Email"
                    defaultValue="admin@novasalud.com"
                  />
                </div>
                <Input
                  label="Contraseña actual"
                  type="password"
                  placeholder="••••••••"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Nueva contraseña"
                    type="password"
                    placeholder="••••••••"
                  />
                  <Input
                    label="Confirmar contraseña"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button variant="primary" size="lg" onClick={handleSave}>
                Guardar Cambios
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
