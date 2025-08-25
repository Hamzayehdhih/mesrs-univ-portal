import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Download, 
  RefreshCw, 
  Filter, 
  ToggleLeft,
  ToggleRight,
  FileText,
  FileSpreadsheet
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface DashboardHeaderProps {
  language: 'ar' | 'fr';
  onTimeFilterChange: (filter: string) => void;
  onRefresh: () => void;
  onExport: (type: 'pdf' | 'excel') => void;
  isComparisonMode: boolean;
  onComparisonToggle: () => void;
}

const DashboardHeader = ({
  language,
  onTimeFilterChange,
  onRefresh,
  onExport,
  isComparisonMode,
  onComparisonToggle
}: DashboardHeaderProps) => {
  const [activeFilter, setActiveFilter] = useState('month');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const timeFilters = [
    { value: 'day', label: language === 'ar' ? 'يوم' : 'Jour' },
    { value: 'week', label: language === 'ar' ? 'أسبوع' : 'Semaine' },
    { value: 'month', label: language === 'ar' ? 'شهر' : 'Mois' },
    { value: 'year', label: language === 'ar' ? 'سنة' : 'Année' },
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setLastUpdate(new Date());
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    onTimeFilterChange(filter);
  };

  const formatLastUpdate = () => {
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - lastUpdate.getTime()) / 60000);
    
    if (diffMinutes < 1) {
      return language === 'ar' ? 'الآن' : 'Maintenant';
    } else if (diffMinutes < 60) {
      return language === 'ar' 
        ? `منذ ${diffMinutes} دقيقة` 
        : `il y a ${diffMinutes} min`;
    } else {
      const diffHours = Math.floor(diffMinutes / 60);
      return language === 'ar' 
        ? `منذ ${diffHours} ساعة` 
        : `il y a ${diffHours}h`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl mb-6"
    >
      {/* Left side - Title and filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div>
          <h2 className={cn(
            "text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent",
            language === 'ar' ? 'font-arabic text-right' : 'font-latin'
          )}>
            {language === 'ar' ? 'نظرة عامة على النظام' : 'Aperçu du Système'}
          </h2>
          <p className="text-sm text-foreground/60">
            {formatLastUpdate()}
          </p>
        </div>

        {/* Time filters */}
        <div className="flex gap-2">
          {timeFilters.map((filter) => (
            <Button
              key={filter.value}
              variant={activeFilter === filter.value ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange(filter.value)}
              className="transition-all duration-200"
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-3">
        {/* Comparison mode toggle */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-foreground/70">
            {language === 'ar' ? 'مقارنة' : 'Comparaison'}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={onComparisonToggle}
            className="p-1"
          >
            {isComparisonMode ? (
              <ToggleRight className="h-5 w-5 text-primary" />
            ) : (
              <ToggleLeft className="h-5 w-5 text-foreground/50" />
            )}
          </Button>
        </div>

        {/* Export dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              {language === 'ar' ? 'تصدير' : 'Export'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onExport('pdf')}>
              <FileText className="h-4 w-4 mr-2" />
              PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onExport('excel')}>
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Excel
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Refresh button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="gap-2"
        >
          <RefreshCw className={cn(
            "h-4 w-4 transition-transform",
            isRefreshing && "animate-spin"
          )} />
          {language === 'ar' ? 'تحديث' : 'Actualiser'}
        </Button>
      </div>
    </motion.div>
  );
};

export default DashboardHeader;