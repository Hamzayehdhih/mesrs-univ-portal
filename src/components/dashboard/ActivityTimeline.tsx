import { motion } from 'framer-motion';
import { 
  UserPlus, 
  BookOpen, 
  GraduationCap, 
  FileText, 
  Users,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Activity {
  id: string;
  type: 'student' | 'course' | 'exam' | 'document' | 'teacher';
  title: string;
  description: string;
  timestamp: Date;
  user?: string;
}

interface ActivityTimelineProps {
  language: 'ar' | 'fr';
  activities?: Activity[];
}

const activityIcons = {
  student: UserPlus,
  course: BookOpen,
  exam: GraduationCap,
  document: FileText,
  teacher: Users,
};

const activityColors = {
  student: 'text-primary bg-primary/10 border-primary/20',
  course: 'text-secondary bg-secondary/10 border-secondary/20',
  exam: 'text-accent bg-accent/10 border-accent/20',
  document: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
  teacher: 'text-green-500 bg-green-500/10 border-green-500/20',
};

const defaultActivities: Activity[] = [
  {
    id: '1',
    type: 'student',
    title: 'Nouveau étudiant inscrit',
    description: 'Ahmed Mohamed - Faculté de Médecine',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    user: 'Ahmed Mohamed'
  },
  {
    id: '2',
    type: 'exam',
    title: 'Examen programmé',
    description: 'Mathématiques I - 1ère année',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
  },
  {
    id: '3',
    type: 'course',
    title: 'Nouveau cours ajouté',
    description: 'Physique Quantique - M2',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
  },
  {
    id: '4',
    type: 'teacher',
    title: 'Enseignant recruté',
    description: 'Dr. Fatima Hassan - Département Informatique',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    user: 'Dr. Fatima Hassan'
  },
  {
    id: '5',
    type: 'document',
    title: 'Document publié',
    description: 'Règlement intérieur mis à jour',
    timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000), // 10 hours ago
  }
];

const formatTimeAgo = (timestamp: Date, language: 'ar' | 'fr') => {
  const now = new Date();
  const diffMinutes = Math.floor((now.getTime() - timestamp.getTime()) / 60000);
  
  if (diffMinutes < 1) {
    return language === 'ar' ? 'الآن' : 'maintenant';
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

const ActivityTimeline = ({ 
  language, 
  activities = defaultActivities 
}: ActivityTimelineProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-6 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
          <Clock className="h-5 w-5 text-primary" />
        </div>
        <h3 className={cn(
          "text-lg font-semibold",
          language === 'ar' ? 'font-arabic' : 'font-latin'
        )}>
          {language === 'ar' ? 'النشاطات الأخيرة' : 'Activités Récentes'}
        </h3>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activityIcons[activity.type];
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors duration-200 group"
            >
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={cn(
                  "flex-shrink-0 p-2 rounded-lg border backdrop-blur-sm",
                  activityColors[activity.type]
                )}
              >
                <Icon className="h-4 w-4" />
              </motion.div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-foreground truncate">
                    {activity.title}
                  </h4>
                  <span className="text-xs text-foreground/50 ml-2 flex-shrink-0">
                    {formatTimeAgo(activity.timestamp, language)}
                  </span>
                </div>
                <p className="text-xs text-foreground/70 mt-1">
                  {activity.description}
                </p>
                {activity.user && (
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-2 h-2 rounded-full bg-current opacity-50"></div>
                    <span className="text-xs text-foreground/60">
                      {activity.user}
                    </span>
                  </div>
                )}
              </div>

              {/* Hover indicator */}
              <div className="w-1 h-8 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </motion.div>
          );
        })}
      </div>

      {/* View all link */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        className="w-full mt-4 p-3 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors duration-200 border border-primary/20"
      >
        {language === 'ar' ? 'عرض جميع النشاطات' : 'Voir toutes les activités'}
      </motion.button>
    </motion.div>
  );
};

export default ActivityTimeline;