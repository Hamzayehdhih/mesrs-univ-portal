import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface UniversityPieChartProps {
  data: Array<{
    name: string;
    students: number;
    color: string;
  }>;
  language: 'ar' | 'fr';
}

const UniversityPieChart = ({ data, language }: UniversityPieChartProps) => {
  const title = language === 'ar' ? 'توزيع الطلاب حسب الجامعة' : 'Répartition par Établissement';
  const subtitle = language === 'ar' ? 'النسبة المئوية للطلاب' : 'Pourcentage d\'étudiants par université';

  const total = data.reduce((sum, item) => sum + item.students, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.students / total) * 100).toFixed(1);
      return (
        <div className="mesrs-card p-3 shadow-lg border border-primary/20">
          <p className="font-medium text-card-foreground">{data.name}</p>
          <p className="text-primary font-semibold">
            {`${data.students.toLocaleString('fr-FR')} étudiants (${percentage}%)`}
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    if (percent < 0.05) return null; // Don't show labels for slices smaller than 5%
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className="mesrs-card">
      <CardHeader>
        <CardTitle className={`text-lg font-bold ${language === 'ar' ? 'font-arabic text-right' : 'font-latin'}`}>
          {title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={CustomLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="students"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value, entry: any) => (
                  <span style={{ color: entry.color, fontSize: '12px' }}>
                    {value} ({entry.payload.students.toLocaleString('fr-FR')})
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default UniversityPieChart;