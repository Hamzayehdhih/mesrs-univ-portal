import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'info';
}

const variantStyles = {
  primary: 'gradient-primary text-white',
  secondary: 'gradient-secondary text-secondary-foreground',
  accent: 'gradient-accent text-white',
  success: 'bg-green-500 text-white',
  warning: 'bg-orange-500 text-white',
  info: 'bg-blue-500 text-white',
};

const StatCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  className,
  variant = 'primary' 
}: StatCardProps) => {
  return (
    <Card className={cn("mesrs-stat-card overflow-hidden relative", className)}>
      <div className={cn("absolute inset-0", variantStyles[variant])} />
      <CardContent className="relative z-10 p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium opacity-90">
              {title}
            </p>
            <div className="space-y-1">
              <p className="text-3xl font-bold tracking-tight">
                {typeof value === 'number' ? value.toLocaleString('fr-FR') : value}
              </p>
              {subtitle && (
                <p className="text-xs opacity-75">
                  {subtitle}
                </p>
              )}
              {trend && (
                <div className={cn(
                  "flex items-center text-xs font-medium",
                  trend.isPositive ? "text-green-200" : "text-red-200"
                )}>
                  <span className={cn(
                    "mr-1",
                    trend.isPositive ? "text-green-300" : "text-red-300"
                  )}>
                    {trend.isPositive ? "↗" : "↘"}
                  </span>
                  {trend.value}% vs mois dernier
                </div>
              )}
            </div>
          </div>
          <div className="p-3 rounded-lg bg-white/20 backdrop-blur-sm">
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;