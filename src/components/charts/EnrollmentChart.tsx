import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface EnrollmentChartProps {
  data: Array<{
    month: string;
    students: number;
    year: number;
  }>;
  language: 'ar' | 'fr';
}

const EnrollmentChart = ({ data, language }: EnrollmentChartProps) => {
  const title = language === 'ar' ? 'تطور التسجيلات' : 'Évolution des Inscriptions';
  const subtitle = language === 'ar' ? 'عدد الطلاب المسجلين شهريا' : 'Nombre d\'étudiants inscrits par mois';

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="mesrs-card p-3 shadow-lg border border-primary/20">
          <p className="font-medium text-card-foreground">{`${label} 2024`}</p>
          <p className="text-primary font-semibold">
            {`${payload[0].value.toLocaleString('fr-FR')} étudiants`}
          </p>
        </div>
      );
    }
    return null;
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
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="enrollmentGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="students"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                fill="url(#enrollmentGradient)"
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2, fill: 'hsl(var(--background))' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnrollmentChart;