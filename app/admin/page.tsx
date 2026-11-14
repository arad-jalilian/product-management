'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/pocketbase';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip as ChartTooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ChartTooltip, Legend);

export default function AdminPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const records = await db.collection('products').getFullList();
        setProducts(records);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="p-8 text-center text-xl">Loading stats...</div>;

  if (products.length === 0) return <div className="p-8 text-center text-xl">No products found in database.</div>;

  const brandCounts: Record<string, number> = {};
  products.forEach(p => {
    brandCounts[p.brand] = (brandCounts[p.brand] || 0) + 1;
  });
  const barData = Object.keys(brandCounts).map(brand => ({
    brand,
    count: brandCounts[brand]
  }));

  const lineData = {
    labels: products.map(p => p.model),
    datasets: [
      {
        label: 'Laptop Price (£)',
        data: products.map(p => p.price),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="bg-white p-6 rounded-lg shadow border">
        <h2 className="text-xl font-bold mb-4">Quantity of Each Brand in Stock (Recharts)</h2>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="brand" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border">
        <h2 className="text-xl font-bold mb-4">Laptop Prices by Model (Chart.js)</h2>
        <div className="h-80 w-full">
          <Line data={lineData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
}