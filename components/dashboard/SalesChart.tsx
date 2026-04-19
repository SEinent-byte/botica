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
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
          <YAxis stroke="#6b7280" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '12px',
            }}
          />
          <Line
            type="monotone"
            dataKey="actual"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ fill: '#10b981', strokeWidth: 2 }}
            name="Ventas Actuales"
          />
          <Line
            type="monotone"
            dataKey="previo"
            stroke="#6b7280"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: '#6b7280', strokeWidth: 2 }}
            name="Mes Anterior"
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={salesData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
        <YAxis stroke="#6b7280" fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '12px',
          }}
          formatter={(value: number) => [`S/ ${value.toFixed(2)}`, 'Ventas']}
        />
        <Bar
          dataKey="ventas"
          fill="#10b981"
          radius={[4, 4, 0, 0]}
          name="Ventas"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
