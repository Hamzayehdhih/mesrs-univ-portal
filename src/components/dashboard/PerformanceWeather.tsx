import { motion } from 'framer-motion';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  AlertTriangle,
  TrendingUp,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PerformanceWeatherProps {
  language: 'ar' | 'fr';
  overallScore?: number; // 0-100
  metrics?: {
    students: number;
    teachers: number;
    courses: number;
    success_rate: number;
  };
}

type WeatherStatus = 'excellent' | 'good' | 'average' | 'attention';

const weatherConfig = {
  excellent: {
    icon: Sun,
    color: 'text-green-500 bg-green-500/10 border-green-500/20',
    bgGradient: 'from-green-500/20 to-green-400/10',
    ar: { status: 'ممتاز', description: 'الأداء العام ممتاز' },
    fr: { status: 'Excellent', description: 'Performance globale excellente' }
  },
  good: {
    icon: Sun,
    color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    bgGradient: 'from-blue-500/20 to-blue-400/10',
    ar: { status: 'جيد', description: 'الأداء العام جيد' },
    fr: { status: 'Bon', description: 'Bonne performance globale' }
  },
  average: {
    icon: Cloud,
    color: 'text-orange-500 bg-orange-500/10 border-orange-500/20',
    bgGradient: 'from-orange-500/20 to-orange-400/10',
    ar: { status: 'متوسط', description: 'الأداء قابل للتحسين' },
    fr: { status: 'Moyen', description: 'Performance à améliorer' }
  },
  attention: {
    icon: CloudRain,
    color: 'text-red-500 bg-red-500/10 border-red-500/20',
    bgGradient: 'from-red-500/20 to-red-400/10',
    ar: { status: 'تحتاج انتباه', description: 'يتطلب تدخل فوري' },
    fr: { status: 'Attention', description: 'Intervention requise' }
  }
};

const getWeatherStatus = (score: number): WeatherStatus => {
  if (score >= 85) return 'excellent';
  if (score >= 70) return 'good';
  if (score >= 50) return 'average';
  return 'attention';
};

const generateRecommendations = (
  status: WeatherStatus, 
  language: 'ar' | 'fr',
  metrics?: any
) => {
  const recommendations = {
    excellent: {
      ar: ['مواصلة الجهود الحالية', 'تطوير برامج جديدة', 'زيادة المنح الدراسية'],
      fr: ['Maintenir les efforts actuels', 'Développer de nouveaux programmes', 'Augmenter les bourses']
    },
    good: {
      ar: ['تحسين معدل النجاح', 'تعزيز التكوين المستمر', 'تطوير البنية التحتية'],
      fr: ['Améliorer le taux de réussite', 'Renforcer la formation continue', 'Développer l\'infrastructure']
    },
    average: {
      ar: ['مراجعة المناهج الدراسية', 'تدريب الأساتذة', 'تحسين المرافق'],
      fr: ['Réviser les programmes', 'Former les enseignants', 'Améliorer les installations']
    },
    attention: {
      ar: ['تدخل عاجل مطلوب', 'إعادة تقييم شاملة', 'وضع خطة طوارئ'],
      fr: ['Intervention urgente requise', 'Réévaluation complète', 'Plan d\'urgence']
    }
  };

  return recommendations[status][language];
};

const PerformanceWeather = ({ 
  language, 
  overallScore = 78,
  metrics = {
    students: 95,
    teachers: 88,
    courses: 92,
    success_rate: 76
  }
}: PerformanceWeatherProps) => {
  const status = getWeatherStatus(overallScore);
  const config = weatherConfig[status];
  const recommendations = generateRecommendations(status, language, metrics);
  const WeatherIcon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "p-6 rounded-2xl backdrop-blur-md bg-gradient-to-br border shadow-lg",
        config.bgGradient,
        config.color.split(' ')[2] // border color
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: status === 'excellent' ? 360 : 0 }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className={cn(
              "p-3 rounded-xl backdrop-blur-sm border",
              config.color
            )}
          >
            <WeatherIcon className="h-6 w-6" />
          </motion.div>
          <div>
            <h3 className={cn(
              "text-lg font-semibold",
              language === 'ar' ? 'font-arabic' : 'font-latin'
            )}>
              {language === 'ar' ? 'مؤشر الأداء' : 'Météo Performance'}
            </h3>
            <p className="text-sm opacity-80">
              {config[language].status}
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-3xl font-bold">
            {overallScore}%
          </div>
          <div className="text-xs opacity-70">
            {language === 'ar' ? 'النتيجة الإجمالية' : 'Score Global'}
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { 
            key: 'students', 
            value: metrics.students, 
            label: language === 'ar' ? 'الطلاب' : 'Étudiants',
            icon: TrendingUp
          },
          { 
            key: 'teachers', 
            value: metrics.teachers, 
            label: language === 'ar' ? 'الأساتذة' : 'Enseignants',
            icon: CheckCircle
          },
          { 
            key: 'courses', 
            value: metrics.courses, 
            label: language === 'ar' ? 'المقررات' : 'Cours',
            icon: TrendingUp
          },
          { 
            key: 'success_rate', 
            value: metrics.success_rate, 
            label: language === 'ar' ? 'النجاح' : 'Réussite',
            icon: metrics.success_rate >= 75 ? CheckCircle : AlertCircle
          },
        ].map((metric, index) => (
          <motion.div
            key={metric.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-3 rounded-lg bg-white/10 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-bold">
                  {metric.value}%
                </div>
                <div className="text-xs opacity-70">
                  {metric.label}
                </div>
              </div>
              <metric.icon className="h-4 w-4 opacity-60" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Description */}
      <p className="text-sm opacity-80 mb-4">
        {config[language].description}
      </p>

      {/* Recommendations */}
      <div>
        <h4 className="text-sm font-medium mb-2">
          {language === 'ar' ? 'التوصيات:' : 'Recommandations:'}
        </h4>
        <ul className="space-y-1">
          {recommendations.slice(0, 2).map((rec, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="text-xs opacity-70 flex items-center gap-2"
            >
              <div className="w-1 h-1 rounded-full bg-current opacity-50"></div>
              {rec}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default PerformanceWeather;