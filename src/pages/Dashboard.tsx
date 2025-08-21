import { 
  Users, 
  GraduationCap, 
  TrendingUp, 
  Wallet, 
  UserCheck, 
  BookOpen 
} from 'lucide-react';
import { motion } from 'framer-motion';
import ModernStatCard from '@/components/dashboard/ModernStatCard';
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
    <div className="flex-1 space-y-8 p-6 gradient-mesh min-h-screen">
      {/* Welcome Section */}
      <motion.div 
        className="modern-card p-8 glassmorphism border border-white/30"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
          <motion.h1 
            className={`text-responsive-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3 ${language === 'ar' ? 'font-arabic' : 'font-latin'}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {currentTexts.title}
          </motion.h1>
          <motion.p 
            className="text-responsive-base text-muted-foreground font-latin"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {currentTexts.subtitle}
          </motion.p>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      <div className="space-y-6">
        <motion.h2 
          className={`text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent ${language === 'ar' ? 'font-arabic text-right' : 'font-latin'}`}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {currentTexts.overview}
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dashboardStats.map((stat, index) => {
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
                delay={index * 0.1}
              />
            );
          })}
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