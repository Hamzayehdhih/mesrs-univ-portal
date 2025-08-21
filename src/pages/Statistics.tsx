import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import EnrollmentChart from "@/components/charts/EnrollmentChart";
import UniversityPieChart from "@/components/charts/UniversityPieChart";
import FacultyBarChart from "@/components/charts/FacultyBarChart";
import { chartData } from "@/data/mockData";
import { TrendingUp, TrendingDown, Users, GraduationCap, Award, Wallet } from "lucide-react";

interface StatisticsProps {
  language: 'ar' | 'fr';
}

const Statistics = ({ language }: StatisticsProps) => {
  const content = {
    fr: {
      title: "Statistiques",
      subtitle: "Tableau de bord analytique du système éducatif",
      enrollmentTrend: "Évolution des inscriptions",
      universityDistribution: "Répartition par université",
      facultyStats: "Statistiques par faculté",
      totalStudents: "Total étudiants",
      successRate: "Taux de réussite",
      activeScholarships: "Bourses actives",
      graduateRate: "Taux de diplômés",
      increase: "Augmentation",
      decrease: "Diminution"
    },
    ar: {
      title: "الإحصائيات",
      subtitle: "لوحة التحكم التحليلية للنظام التعليمي",
      enrollmentTrend: "تطور التسجيلات",
      universityDistribution: "التوزيع حسب الجامعة",
      facultyStats: "إحصائيات الكليات",
      totalStudents: "إجمالي الطلاب",
      successRate: "معدل النجاح",
      activeScholarships: "المنح النشطة",
      graduateRate: "معدل التخرج",
      increase: "زيادة",
      decrease: "نقصان"
    }
  };

  const t = content[language];

  const kpiData = [
    {
      title: t.totalStudents,
      value: "15,847",
      change: "+12.5%",
      trend: "up",
      icon: Users
    },
    {
      title: t.successRate,
      value: "78.3%",
      change: "+3.2%",
      trend: "up",
      icon: Award
    },
    {
      title: t.activeScholarships,
      value: "1,234",
      change: "+8.7%",
      trend: "up",
      icon: Wallet
    },
    {
      title: t.graduateRate,
      value: "85.1%",
      change: "-1.2%",
      trend: "down",
      icon: GraduationCap
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col space-y-4">
        <div>
          <h1 className={`text-3xl font-bold text-mesrs-primary ${language === 'ar' ? 'font-arabic text-right' : 'font-latin text-left'}`}>
            {t.title}
          </h1>
          <p className={`text-mesrs-muted ${language === 'ar' ? 'font-arabic text-right' : 'font-latin text-left'}`}>
            {t.subtitle}
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index} className="mesrs-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`text-sm font-medium text-mesrs-muted ${language === 'ar' ? 'font-arabic' : 'font-latin'}`}>
                  {kpi.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-mesrs-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-mesrs-primary">{kpi.value}</div>
                <div className="flex items-center text-xs text-mesrs-muted">
                  {kpi.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                  )}
                  <span className={kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                    {kpi.change}
                  </span>
                  <span className="ml-1">
                    {kpi.trend === 'up' ? t.increase : t.decrease}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="mesrs-card">
          <CardHeader>
            <CardTitle className={`${language === 'ar' ? 'font-arabic text-right' : 'font-latin text-left'}`}>
              {t.enrollmentTrend}
            </CardTitle>
            <CardDescription className={`${language === 'ar' ? 'font-arabic text-right' : 'font-latin text-left'}`}>
              Évolution mensuelle des nouvelles inscriptions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EnrollmentChart data={chartData.enrollmentTrend} language={language} />
          </CardContent>
        </Card>

        <Card className="mesrs-card">
          <CardHeader>
            <CardTitle className={`${language === 'ar' ? 'font-arabic text-right' : 'font-latin text-left'}`}>
              {t.universityDistribution}
            </CardTitle>
            <CardDescription className={`${language === 'ar' ? 'font-arabic text-right' : 'font-latin text-left'}`}>
              Répartition des étudiants par établissement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UniversityPieChart data={chartData.universityDistribution} language={language} />
          </CardContent>
        </Card>
      </div>

      <Card className="mesrs-card">
        <CardHeader>
          <CardTitle className={`${language === 'ar' ? 'font-arabic text-right' : 'font-latin text-left'}`}>
            {t.facultyStats}
          </CardTitle>
          <CardDescription className={`${language === 'ar' ? 'font-arabic text-right' : 'font-latin text-left'}`}>
            Nombre d'enseignants par faculté et université
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FacultyBarChart data={chartData.facultyStats} language={language} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Statistics;