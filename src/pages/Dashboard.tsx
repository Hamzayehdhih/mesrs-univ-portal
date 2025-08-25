import { 
  Users, 
  GraduationCap, 
  TrendingUp, 
  Wallet, 
  UserCheck, 
  BookOpen 
} from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import EnrollmentChart from '@/components/charts/EnrollmentChart';
import UniversityPieChart from '@/components/charts/UniversityPieChart';
import FacultyBarChart from '@/components/charts/FacultyBarChart';
import { dashboardStats, chartData } from '@/data/mockData';

interface DashboardProps {
  language: 'ar' | 'fr';
}

const Dashboard = ({ language }: DashboardProps) => {
  const icons = [Users, GraduationCap, TrendingUp, Wallet, UserCheck, BookOpen];
  
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
              {dashboardStats.map((stat, index) => {
                const Icon = icons[index];
                return (
                  <div
                    key={stat.title}
                    className="group relative animate-fade-in-up hover:scale-105 transition-all duration-500"
                    style={{animationDelay: `${index * 150}ms`}}
                  >
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                    
                    <StatCard
                      title={language === 'ar' ? stat.titleAr : stat.title}
                      value={stat.value}
                      subtitle={stat.subtitle}
                      icon={Icon}
                      trend={stat.trend}
                      variant={stat.variant}
                      className="relative z-10 border-2 border-transparent group-hover:border-primary/30 transition-all duration-300"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Trend Chart */}
        <div className="lg:col-span-2">
          <EnrollmentChart 
            data={chartData.enrollmentTrend} 
            language={language}
          />
        </div>
        
        {/* University Distribution */}
        <UniversityPieChart 
          data={chartData.universityDistribution} 
          language={language}
        />
        
        {/* Faculty Statistics */}
        <FacultyBarChart 
          data={chartData.facultyStats} 
          language={language}
        />
      </div>

      {/* Quick Actions */}
      <div className="mesrs-card p-6">
        <h3 className={`text-lg font-semibold mb-4 ${language === 'ar' ? 'font-arabic text-right' : 'font-latin'}`}>
          {language === 'ar' ? 'الإجراءات السريعة' : 'Actions Rapides'}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { 
              label: language === 'ar' ? 'تسجيل طالب جديد' : 'Nouveau Étudiant',
              icon: Users,
              color: 'primary'
            },
            { 
              label: language === 'ar' ? 'إضافة أستاذ' : 'Ajouter Enseignant',
              icon: UserCheck,
              color: 'secondary'
            },
            { 
              label: language === 'ar' ? 'إنشاء تكوين' : 'Créer Formation',
              icon: BookOpen,
              color: 'accent'
            },
            { 
              label: language === 'ar' ? 'منح دراسية' : 'Bourses d\'Études',
              icon: Wallet,
              color: 'success'
            },
          ].map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                className="p-4 rounded-xl border border-border/20 hover:border-primary/40 transition-all duration-200 hover:scale-105 group"
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-foreground">
                    {action.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;