import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModernStatCardProps {
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
  delay?: number;
}

const variantStyles = {
  primary: 'bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 text-white shadow-primary',
  secondary: 'bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-white shadow-secondary',
  accent: 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white shadow-accent',
  success: 'bg-gradient-to-br from-green-500 via-green-600 to-green-700 text-white',
  warning: 'bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 text-white',
  info: 'bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-700 text-white',
};

const ModernStatCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  className,
  variant = 'primary',
  delay = 0
}: ModernStatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: delay,
        type: "spring",
        stiffness: 100,
        damping: 10
      }}
      whileHover={{ 
        scale: 1.05, 
        y: -8,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "stat-card-modern stat-card-glow particle-effect relative overflow-hidden cursor-pointer",
        variantStyles[variant],
        className
      )}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -40, -20],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-8">
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <motion.p 
              className="text-sm font-medium opacity-90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.2 }}
            >
              {title}
            </motion.p>
            
            <div className="space-y-2">
              <motion.p 
                className="text-4xl font-bold tracking-tight"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  delay: delay + 0.4,
                  type: "spring",
                  stiffness: 200,
                  damping: 10
                }}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: delay + 0.6 }}
                >
                  {typeof value === 'number' ? (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: delay + 0.8 }}
                    >
                      {value.toLocaleString('fr-FR')}
                    </motion.span>
                  ) : value}
                </motion.span>
              </motion.p>
              
              {subtitle && (
                <motion.p 
                  className="text-xs opacity-80"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: delay + 0.6 }}
                >
                  {subtitle}
                </motion.p>
              )}
              
              {trend && (
                <motion.div 
                  className={cn(
                    "flex items-center text-xs font-medium",
                    trend.isPositive ? "text-green-200" : "text-red-200"
                  )}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: delay + 0.8 }}
                >
                  <motion.span 
                    className={cn(
                      "mr-2 text-lg",
                      trend.isPositive ? "text-green-300" : "text-red-300"
                    )}
                    animate={{
                      y: trend.isPositive ? [-2, 2, -2] : [2, -2, 2],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {trend.isPositive ? "↗" : "↘"}
                  </motion.span>
                  {trend.value}% vs mois dernier
                </motion.div>
              )}
            </div>
          </div>
          
          <motion.div 
            className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm floating-animation"
            whileHover={{ 
              scale: 1.1,
              rotate: [0, -10, 10, 0],
              transition: { duration: 0.5 }
            }}
            initial={{ rotate: -10, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ 
              delay: delay + 0.3,
              type: "spring",
              stiffness: 200
            }}
          >
            <Icon className="h-8 w-8" />
          </motion.div>
        </div>
      </div>
      
      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
    </motion.div>
  );
};

export default ModernStatCard;