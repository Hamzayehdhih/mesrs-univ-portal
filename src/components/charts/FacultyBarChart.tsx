import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FacultyBarChartProps {
  data: Array<{
    faculty: string;
    students: number;
    color: string;
  }>;
  language: 'ar' | 'fr';
}

const FacultyBarChart = ({ data, language }: FacultyBarChartProps) => {
  const title = language === 'ar' ? 'الإحصائيات حسب الكلية' : 'Statistiques par Filière';
  const subtitle = language === 'ar' ? 'عدد الطلاب في كل كلية' : 'Nombre d\'étudiants par domaine d\'études';

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="mesrs-card p-3 shadow-lg border border-primary/20">
          <p className="font-medium text-card-foreground mb-1">{label}</p>
          <p className="text-primary font-semibold">
            {`${payload[0].value.toLocaleString('fr-FR')} étudiants`}
          </p>
        </div>
      );
    }
    return null;
  };

  // Truncate long faculty names for display
  const processedData = data.map(item => ({
    ...item,
    shortName: item.faculty.length > 20 ? item.faculty.substring(0, 18) + '...' : item.faculty
  }));

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
            <BarChart 
              data={processedData} 
              margin={{ top: 10, right: 30, left: 0, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="shortName"
                stroke="hsl(var(--muted-foreground))"
                fontSize={10}
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                content={<CustomTooltip />}
                labelFormatter={(label) => {
                  const fullData = data.find(d => d.faculty.startsWith(label.replace('...', '')));
                  return fullData ? fullData.faculty : label;
                }}
              />
              <Bar 
                dataKey="students" 
                radius={[4, 4, 0, 0]}
                stroke="hsl(var(--primary))"
                strokeWidth={1}
              >
                {processedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default FacultyBarChart;