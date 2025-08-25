import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface KPIWidgetProps {
  title: string;
  value: number;
  maxValue?: number;
  unit?: string;
  type: 'progress' | 'circular' | 'gauge';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  className?: string;
  index?: number;
}

const colorClasses = {
  primary: 'text-primary border-primary/30 bg-primary/10',
  secondary: 'text-secondary border-secondary/30 bg-secondary/10',
  success: 'text-green-500 border-green-500/30 bg-green-500/10',
  warning: 'text-orange-500 border-orange-500/30 bg-orange-500/10',
  danger: 'text-red-500 border-red-500/30 bg-red-500/10',
};

const CircularProgress = ({ value, maxValue = 100, color = 'primary' }: { value: number; maxValue?: number; color?: string }) => {
  const percentage = (value / maxValue) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-24 h-24">
      <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="opacity-20"
        />
        {/* Progress circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={{ strokeDashoffset }}
          transition={{ duration: 2, ease: "easeInOut" }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold">
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  );
};

const GaugeChart = ({ value, maxValue = 100, color = 'primary' }: { value: number; maxValue?: number; color?: string }) => {
  const percentage = (value / maxValue) * 100;
  const angle = (percentage / 100) * 180; // Semi-circle gauge

  return (
    <div className="relative w-24 h-12">
      <svg className="w-24 h-12" viewBox="0 0 100 50">
        {/* Background arc */}
        <path
          d="M 10 45 A 35 35 0 0 1 90 45"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="opacity-20"
        />
        {/* Progress arc */}
        <motion.path
          d="M 10 45 A 35 35 0 0 1 90 45"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray="110"
          strokeDashoffset={110 - (percentage / 100) * 110}
          initial={{ strokeDashoffset: 110 }}
          animate={{ strokeDashoffset: 110 - (percentage / 100) * 110 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          strokeLinecap="round"
        />
        {/* Needle */}
        <motion.line
          x1="50"
          y1="45"
          x2="50"
          y2="20"
          stroke="currentColor"
          strokeWidth="2"
          initial={{ rotate: -90 }}
          animate={{ rotate: angle - 90 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          style={{ transformOrigin: '50px 45px' }}
        />
      </svg>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <span className="text-xs font-bold">
          {value}/{maxValue}
        </span>
      </div>
    </div>
  );
};

const KPIWidget = ({
  title,
  value,
  maxValue = 100,
  unit = '',
  type,
  color = 'primary',
  className,
  index = 0
}: KPIWidgetProps) => {
  const renderVisualization = () => {
    switch (type) {
      case 'circular':
        return <CircularProgress value={value} maxValue={maxValue} color={color} />;
      case 'gauge':
        return <GaugeChart value={value} maxValue={maxValue} color={color} />;
      default:
        return (
          <div className="w-full">
            <Progress 
              value={(value / maxValue) * 100} 
              className="h-2 mb-2" 
            />
            <div className="text-right text-xs text-foreground/60">
              {value}{unit} / {maxValue}{unit}
            </div>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className={cn(
        "p-4 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300",
        colorClasses[color],
        className
      )}
    >
      <div className="flex flex-col items-center text-center">
        <h4 className="text-sm font-medium text-foreground/80 mb-3">
          {title}
        </h4>
        
        <div className="mb-2">
          {renderVisualization()}
        </div>
        
        <div className="text-lg font-bold">
          {value}{unit}
        </div>
      </div>
    </motion.div>
  );
};

export default KPIWidget;