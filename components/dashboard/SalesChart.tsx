'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

const salesData = [
  { name: 'Lun', ventas: 450 },
  { name: 'Mar', ventas: 380 },
  { name: 'Mie', ventas: 520 },
  { name: 'Jue', ventas: 490 },
  { name: 'Vie', ventas: 650 },
  { name: 'Sab', ventas: 720 },
  { name: 'Dom', ventas: 580 },
];

const trendData = [
  { name: 'Sem 1', actual: 2100, previo: 1900 },
  { name: 'Sem 2', actual: 2400, previo: 2200 },
  { name: 'Sem 3', actual: 2800, previo: 2500 },
  { name: 'Sem 4', actual: 2847, previo: 2600 },
];

interface SalesChartProps {
  type?: 'bar' | 'line';
}

export default function SalesChart({ type = 'bar' }: SalesChartProps) {
  if (type === 'line') {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={trendData}>
          <defs>
            <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255,255,255,0.95)',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '12px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Line
            type="monotone"
            dataKey="actual"
            stroke="url(#colorActual)"
            strokeWidth={3}
            dot={{ fill: '#059669', strokeWidth: 2, r: 5 }}
            activeDot={{ r: 7, strokeWidth: 0, fill: '#059669' }}
            name="Ventas Actuales"
          />
          <Line
            type="monotone"
            dataKey="previo"
            stroke="#94a3b8"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: '#64748b', strokeWidth: 0, r: 4 }}
            name="Mes Anterior"
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={salesData}>
        <defs>
          <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.9}/>
            <stop offset="95%" stopColor="#059669" stopOpacity={0.7}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
        <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          cursor={{ fill: 'rgba(5, 150, 105, 0.05)' }}
          contentStyle={{
            backgroundColor: 'rgba(255,255,255,0.95)',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '12px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          }}
          formatter={(value: number) => [`S/ ${value.toFixed(2)}`, 'Ventas']}
        />
        <Bar
          dataKey="ventas"
          fill="url(#colorVentas)"
          radius={[8, 8, 0, 0]}
          name="Ventas"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
