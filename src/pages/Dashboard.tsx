import { 
  Users, 
  GraduationCap, 
  TrendingUp, 
  Wallet, 
  UserCheck, 
  BookOpen 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';
import ModernStatCard from '@/components/dashboard/ModernStatCard';
import KPIWidget from '@/components/dashboard/KPIWidget';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import FloatingActionCard from '@/components/dashboard/FloatingActionCard';
import ActivityTimeline from '@/components/dashboard/ActivityTimeline';
import PerformanceWeather from '@/components/dashboard/PerformanceWeather';
import EnrollmentChart from '@/components/charts/EnrollmentChart';
import UniversityPieChart from '@/components/charts/UniversityPieChart';
import FacultyBarChart from '@/components/charts/FacultyBarChart';
import { 
  useDashboardStats, 
  useEnrollmentTrends, 
  useFormationStats, 
  useUniversityStats,
  useRecentActivities 
} from '@/hooks/useDashboardStats';

interface DashboardProps {
  language: 'ar' | 'fr';
}

const Dashboard = ({ language }: DashboardProps) => {
  const icons = [Users, GraduationCap, TrendingUp, Wallet, UserCheck, BookOpen];
  
  // Fetch real data from Supabase
  const { data: dashboardStats, isLoading: statsLoading } = useDashboardStats();
  const { data: enrollmentTrends, isLoading: trendsLoading } = useEnrollmentTrends();
  const { data: formationStats, isLoading: formationLoading } = useFormationStats();
  const { data: universityStats, isLoading: universityLoading } = useUniversityStats();
  const { data: recentActivities, isLoading: activitiesLoading } = useRecentActivities();
  
  const welcomeText = {
    ar: {
      title: 'مرحباً بك في نظام إدارة الجامعات',
      subtitle: 'وزارة التعليم العالي والبحث العلمي - الجمهورية الإسلامية الموريتانية',
      overview: 'نظرة عامة على النظام'
    },
    fr: {
      title: 'Bienvenue dans le Système de Gestion Universitaire',
      subtitle: 'Ministère de l\'Enseignement Supérieur et de la Recherche Scientifique',
      overview: 'Aperçu du système'
    }
  };

  const currentTexts = welcomeText[language];

  // Mock sparkline data for demonstration
  const sparklineData = Array.from({ length: 12 }, (_, i) => ({
    value: Math.random() * 100 + 50
  }));

  // Handler functions for the dashboard
  const handleTimeFilterChange = (filter: string) => {
    toast({
      title: language === 'ar' ? 'تم تطبيق المرشح' : 'Filtre appliqué',
      description: `${filter} ${language === 'ar' ? 'فترة' : 'période'}`,
    });
  };

  const handleRefresh = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: language === 'ar' ? 'تم التحديث' : 'Actualisé',
      description: language === 'ar' ? 'البيانات محدثة' : 'Données mises à jour',
    });
  };

  const handleExport = (type: 'pdf' | 'excel') => {
    toast({
      title: language === 'ar' ? 'جاري التصدير' : 'Export en cours',
      description: `${type.toUpperCase()} ${language === 'ar' ? 'ملف' : 'file'}`,
    });
  };

  const handleActionClick = (action: string) => {
    toast({
      title: language === 'ar' ? 'إجراء سريع' : 'Action rapide',
      description: action,
    });
  };

  return (
    <div className="flex-1 space-y-6 p-6 animate-fade-in-up">
      {/* Welcome Section */}
      <div className="mesrs-card p-6 gradient-glass border border-primary/20">
        <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
          <h1 className={`text-responsive-2xl font-bold text-primary mb-2 ${language === 'ar' ? 'font-arabic' : 'font-latin'}`}>
            {currentTexts.title}
          </h1>
          <p className="text-responsive-base text-muted-foreground font-latin">
            {currentTexts.subtitle}
          </p>
        </div>
      </div>

      {/* Modern Dashboard Header */}
      <DashboardHeader
        language={language}
        onTimeFilterChange={handleTimeFilterChange}
        onRefresh={handleRefresh}
        onExport={handleExport}
        isComparisonMode={false}
        onComparisonToggle={() => {}}
      />

      {/* Statistics Cards - System Overview */}
      <div className="relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl blur-3xl -z-10"></div>
        
        <div className="mesrs-card p-8 relative overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-secondary rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-accent rounded-full blur-2xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-primary shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className={`text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent ${language === 'ar' ? 'font-arabic text-right' : 'font-latin'}`}>
                  {currentTexts.overview}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {language === 'ar' ? 'إحصائيات النظام المباشرة' : 'Statistiques du système en temps réel'}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {statsLoading ? (
                // Loading state
                Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="mesrs-card p-6 animate-pulse">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                        <div className="h-8 bg-muted rounded w-1/2"></div>
                        <div className="h-3 bg-muted rounded w-2/3"></div>
                      </div>
                      <div className="w-12 h-12 bg-muted rounded-lg"></div>
                    </div>
                  </div>
                ))
              ) : dashboardStats ? (
                // Real data
                [
                  {
                    title: language === 'ar' ? 'إجمالي الطلاب' : 'Total Étudiants',
                    titleAr: 'إجمالي الطلاب',
                    value: dashboardStats.total_students,
                    subtitle: language === 'ar' ? 'طالب مسجل' : 'étudiants inscrits',
                    variant: 'primary' as const,
                    trend: { value: 5.2, isPositive: true }
                  },
                  {
                    title: language === 'ar' ? 'إجمالي الأساتذة' : 'Total Enseignants', 
                    titleAr: 'إجمالي الأساتذة',
                    value: dashboardStats.total_teachers,
                    subtitle: language === 'ar' ? 'أستاذ نشط' : 'enseignants actifs',
                    variant: 'secondary' as const,
                    trend: { value: 2.1, isPositive: true }
                  },
                  {
                    title: language === 'ar' ? 'الجامعات النشطة' : 'Universités Actives',
                    titleAr: 'الجامعات النشطة',
                    value: dashboardStats.total_universities,
                    subtitle: language === 'ar' ? 'مؤسسة تعليمية' : 'établissements',
                    variant: 'accent' as const,
                    trend: { value: 0, isPositive: true }
                  },
                  {
                    title: language === 'ar' ? 'التكوينات المتاحة' : 'Formations Disponibles',
                    titleAr: 'التكوينات المتاحة',
                    value: dashboardStats.total_formations,
                    subtitle: language === 'ar' ? 'برنامج تكويني' : 'programmes',
                    variant: 'success' as const,
                    trend: { value: 1.8, isPositive: true }
                  },
                  {
                    title: language === 'ar' ? 'الطلبات المعلقة' : 'Inscriptions en Attente',
                    titleAr: 'الطلبات المعلقة',
                    value: dashboardStats.pending_enrollments,
                    subtitle: language === 'ar' ? 'طلب معلق' : 'en attente',
                    variant: 'warning' as const,
                    trend: { value: -12.5, isPositive: false }
                  },
                  {
                    title: language === 'ar' ? 'المنح النشطة' : 'Bourses Actives',
                    titleAr: 'المنح النشطة', 
                    value: dashboardStats.active_scholarships,
                    subtitle: language === 'ar' ? 'منحة متاحة' : 'bourses disponibles',
                    variant: 'info' as const,
                    trend: { value: 8.3, isPositive: true }
                  }
                ].map((stat, index) => {
                  const Icon = icons[index];
                  return (
                    <ModernStatCard
                      key={stat.title}
                      title={language === 'ar' ? stat.titleAr : stat.title}
                      value={stat.value}
                      subtitle={stat.subtitle}
                      icon={Icon}
                      trend={stat.trend}
                      variant={stat.variant}
                      sparklineData={sparklineData}
                      index={index}
                    />
                  );
                })
              ) : (
                // Error state
                <div className="col-span-full text-center p-8">
                  <p className="text-muted-foreground">
                    {language === 'ar' ? 'خطأ في تحميل البيانات' : 'Erreur lors du chargement des données'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* KPI Widgets Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
      >
        <KPIWidget
          title={language === 'ar' ? 'معدل النجاح' : 'Taux de Réussite'}
          value={87}
          maxValue={100}
          unit="%"
          type="circular"
          color="success"
          index={0}
        />
        <KPIWidget
          title={language === 'ar' ? 'نسبة الطلاب/الأساتذة' : 'Ratio Étu./Ens.'}
          value={24}
          maxValue={30}
          type="gauge"
          color="primary"
          index={1}
        />
        <KPIWidget
          title={language === 'ar' ? 'إشغال القاعات' : 'Occupation Salles'}
          value={78}
          maxValue={100}
          unit="%"
          type="progress"
          color="warning"
          index={2}
        />
        <KPIWidget
          title={language === 'ar' ? 'الأداء المؤسسي' : 'Performance Inst.'}
          value={91}
          maxValue={100}
          type="circular"
          color="secondary"
          index={3}
        />
      </motion.div>

      {/* Performance Weather & Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <PerformanceWeather language={language} />
        </div>
        <ActivityTimeline language={language} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Trend Chart */}
        <div className="lg:col-span-2">
          {trendsLoading ? (
            <div className="mesrs-card p-6 animate-pulse">
              <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
              <div className="h-64 bg-muted rounded"></div>
            </div>
          ) : (
            <EnrollmentChart 
              data={enrollmentTrends || []} 
              language={language}
            />
          )}
        </div>
        
        {/* University Distribution */}
        {universityLoading ? (
          <div className="mesrs-card p-6 animate-pulse">
            <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
            <div className="h-64 bg-muted rounded-full mx-auto w-64"></div>
          </div>
        ) : (
          <UniversityPieChart 
            data={universityStats || []} 
            language={language}
          />
        )}
        
        {/* Formation Statistics */}
        {formationLoading ? (
          <div className="mesrs-card p-6 animate-pulse">
            <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-8 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        ) : (
          <FacultyBarChart 
            data={formationStats || []} 
            language={language}
          />
        )}
      </div>

      {/* Floating Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mesrs-card p-6"
      >
        <h3 className={`text-lg font-semibold mb-6 ${language === 'ar' ? 'font-arabic text-right' : 'font-latin'}`}>
          {language === 'ar' ? 'الإجراءات السريعة' : 'Actions Rapides'}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { 
              label: language === 'ar' ? 'تسجيل طالب جديد' : 'Nouveau Étudiant',
              description: language === 'ar' ? 'إضافة طالب جديد للنظام' : 'Ajouter un étudiant au système',
              icon: Users,
              color: 'primary' as const
            },
            { 
              label: language === 'ar' ? 'إضافة أستاذ' : 'Ajouter Enseignant',
              description: language === 'ar' ? 'تسجيل أستاذ جديد' : 'Enregistrer un nouvel enseignant',
              icon: UserCheck,
              color: 'secondary' as const
            },
            { 
              label: language === 'ar' ? 'إنشاء تكوين' : 'Créer Formation',
              description: language === 'ar' ? 'إضافة برنامج تكويني' : 'Ajouter un programme de formation',
              icon: BookOpen,
              color: 'accent' as const
            },
            { 
              label: language === 'ar' ? 'منح دراسية' : 'Bourses d\'Études',
              description: language === 'ar' ? 'إدارة المنح الدراسية' : 'Gérer les bourses d\'études',
              icon: Wallet,
              color: 'success' as const
            },
          ].map((action, index) => (
            <FloatingActionCard
              key={action.label}
              label={action.label}
              description={action.description}
              icon={action.icon}
              color={action.color}
              onClick={() => handleActionClick(action.label)}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;