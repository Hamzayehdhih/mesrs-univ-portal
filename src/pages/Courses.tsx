import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Clock, Users, Search, Filter } from "lucide-react";

interface CoursesProps {
  language: 'ar' | 'fr';
}

const Courses = ({ language }: CoursesProps) => {
  const content = {
    fr: {
      title: "Formations",
      subtitle: "Catalogue des formations disponibles",
      search: "Rechercher une formation...",
      filter: "Filtrer",
      license: "Licence",
      master: "Master",
      doctorate: "Doctorat",
      duration: "Durée",
      students: "Étudiants",
      credits: "Crédits",
      viewDetails: "Voir détails"
    },
    ar: {
      title: "التكوينات",
      subtitle: "كتالوج التكوينات المتاحة",
      search: "البحث عن تكوين...",
      filter: "تصفية",
      license: "إجازة",
      master: "ماجستير", 
      doctorate: "دكتوراه",
      duration: "المدة",
      students: "الطلاب",
      credits: "النقاط",
      viewDetails: "عرض التفاصيل"
    }
  };

  const t = content[language];

  const courses = [
    {
      id: 1,
      name: language === 'fr' ? "Informatique" : "علوم الحاسوب",
      level: t.license,
      duration: "3 ans",
      credits: 180,
      students: 245,
      university: "UNM"
    },
    {
      id: 2,
      name: language === 'fr' ? "Médecine" : "الطب",
      level: t.doctorate,
      duration: "7 ans",
      credits: 420,
      students: 189,
      university: "USFM"
    },
    {
      id: 3,
      name: language === 'fr' ? "Gestion" : "الإدارة",
      level: t.master,
      duration: "2 ans",
      credits: 120,
      students: 156,
      university: "UCAO"
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

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-mesrs-muted" />
            <Input 
              placeholder={t.search}
              className="pl-10 mesrs-input"
            />
          </div>
          <Button variant="outline" className="mesrs-button-outline">
            <Filter className="h-4 w-4 mr-2" />
            {t.filter}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="mesrs-card hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <BookOpen className="h-8 w-8 text-mesrs-primary" />
                <Badge variant="secondary" className="mesrs-badge">
                  {course.level}
                </Badge>
              </div>
              <CardTitle className={`${language === 'ar' ? 'font-arabic text-right' : 'font-latin text-left'}`}>
                {course.name}
              </CardTitle>
              <CardDescription className={`${language === 'ar' ? 'font-arabic text-right' : 'font-latin text-left'}`}>
                {course.university}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-mesrs-secondary" />
                  <span className="text-mesrs-foreground">{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-mesrs-secondary" />
                  <span className="text-mesrs-foreground">{course.students}</span>
                </div>
              </div>
              <div className="text-center">
                <span className="text-2xl font-bold text-mesrs-primary">{course.credits}</span>
                <p className="text-sm text-mesrs-muted">{t.credits}</p>
              </div>
              <Button className="mesrs-button-primary w-full">
                {t.viewDetails}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Courses;