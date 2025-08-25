import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FloatingActionCardProps {
  label: string;
  icon: LucideIcon;
  color: 'primary' | 'secondary' | 'accent' | 'success';
  onClick: () => void;
  index?: number;
  description?: string;
}

const colorClasses = {
  primary: 'from-primary/20 to-primary/10 border-primary/30 hover:from-primary/30 hover:to-primary/20 text-primary',
  secondary: 'from-secondary/20 to-secondary/10 border-secondary/30 hover:from-secondary/30 hover:to-secondary/20 text-secondary',
  accent: 'from-accent/20 to-accent/10 border-accent/30 hover:from-accent/30 hover:to-accent/20 text-accent',
  success: 'from-green-500/20 to-green-400/10 border-green-500/30 hover:from-green-500/30 hover:to-green-400/20 text-green-500',
};

const FloatingActionCard = ({
  label,
  icon: Icon,
  color,
  onClick,
  index = 0,
  description
}: FloatingActionCardProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.05, 
        y: -5,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "group relative p-6 rounded-2xl backdrop-blur-md bg-gradient-to-br border shadow-lg hover:shadow-2xl transition-all duration-300 w-full",
        colorClasses[color]
      )}
    >
      {/* Ripple effect background */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <motion.div
          initial={{ scale: 0, opacity: 0.5 }}
          whileHover={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-white rounded-2xl"
        />
      </div>

      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl"></div>

      <div className="relative z-10 flex flex-col items-center text-center space-y-4">
        {/* Icon container with pulse animation */}
        <motion.div
          whileHover={{ rotate: 10 }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-full bg-current opacity-10 animate-pulse"></div>
          <div className="relative p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <Icon className="h-8 w-8" />
          </div>
        </motion.div>

        {/* Label */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-1">
            {label}
          </h3>
          {description && (
            <p className="text-xs text-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Corner accent */}
      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-current opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
    </motion.button>
  );
};

export default FloatingActionCard;