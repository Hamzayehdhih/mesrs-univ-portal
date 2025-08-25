import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

interface ModernStatCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  sparklineData?: Array<{ value: number }>;
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'info';
  className?: string;
  index?: number;
}

const variantColors = {
  primary: 'from-primary/20 to-primary/10 border-primary/30',
  secondary: 'from-secondary/20 to-secondary/10 border-secondary/30',
  accent: 'from-accent/20 to-accent/10 border-accent/30',
  success: 'from-green-500/20 to-green-400/10 border-green-500/30',
  warning: 'from-orange-500/20 to-orange-400/10 border-orange-500/30',
  info: 'from-blue-500/20 to-blue-400/10 border-blue-500/30',
};

const iconColors = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  success: 'text-green-500',
  warning: 'text-orange-500',
  info: 'text-blue-500',
};

const ModernStatCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend,
  sparklineData = [],
  variant = 'primary',
  className,
  index = 0
}: ModernStatCardProps) => {
  const numericValue = typeof value === 'number' ? value : parseFloat(value.toString().replace(/[^\d.-]/g, ''));
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.02, 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className={cn(
        "relative overflow-hidden rounded-2xl p-6 backdrop-blur-md bg-white/10 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 group",
        `bg-gradient-to-br ${variantColors[variant]}`,
        className
      )}
    >
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      
      <div className="relative z-10">
        {/* Header with Icon */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground/70 mb-1">
              {title}
            </p>
            <div className="flex items-baseline gap-2">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="text-3xl font-bold text-foreground"
              >
                {typeof value === 'number' ? (
                  <CountUp 
                    end={numericValue} 
                    duration={2}
                    separator=" "
                    delay={index * 0.1}
                  />
                ) : (
                  value
                )}
              </motion.div>
              
              {trend && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  className={cn(
                    "flex items-center text-sm font-medium px-2 py-1 rounded-full",
                    trend.isPositive 
                      ? "bg-green-500/20 text-green-600 dark:text-green-400" 
                      : "bg-red-500/20 text-red-600 dark:text-red-400"
                  )}
                >
                  <span className="mr-1">
                    {trend.isPositive ? "↗" : "↘"}
                  </span>
                  {trend.value}%
                </motion.div>
              )}
            </div>
            
            {subtitle && (
              <p className="text-xs text-foreground/60 mt-1">
                {subtitle}
              </p>
            )}
          </div>
          
          <motion.div
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
            whileHover={{ rotate: 10, scale: 1.1 }}
            className={cn(
              "p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20",
              iconColors[variant]
            )}
          >
            <Icon className="h-6 w-6" />
          </motion.div>
        </div>

        {/* Sparkline Chart */}
        {sparklineData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: index * 0.1 + 0.7, duration: 0.8 }}
            className="h-16 mt-4"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineData}>
                <defs>
                  <linearGradient id={`gradient-${variant}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="currentColor" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="currentColor" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="currentColor"
                  strokeWidth={2}
                  fill={`url(#gradient-${variant})`}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        )}
      </div>
      
      {/* Ripple effect overlay */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 0.1 }}
        className="absolute inset-0 bg-white rounded-2xl pointer-events-none"
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
};

export default ModernStatCard;