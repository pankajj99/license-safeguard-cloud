
import React from 'react';
import { BarChart as RechartsBarChart, Bar, LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', licenses: 40, revenue: 2400 },
  { name: 'Feb', licenses: 45, revenue: 2700 },
  { name: 'Mar', licenses: 55, revenue: 3300 },
  { name: 'Apr', licenses: 60, revenue: 3500 },
  { name: 'May', licenses: 75, revenue: 4500 },
  { name: 'Jun', licenses: 80, revenue: 5000 },
  { name: 'Jul', licenses: 90, revenue: 5500 },
];

export const BarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="licenses" fill="#2684FF" name="Licenses" />
        <Bar dataKey="revenue" fill="#0A2540" name="Revenue ($)" />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export const LineChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="licenses" stroke="#2684FF" name="Licenses" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="revenue" stroke="#0A2540" name="Revenue ($)" />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};
