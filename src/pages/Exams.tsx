import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Award, Calendar, MapPin, Users, Search, Plus } from "lucide-react";

interface ExamsProps {
  language: 'ar' | 'fr';
}

const Exams = ({ language }: ExamsProps) => {
  const content = {
    fr: {
      title: "Examens",
      subtitle: "Gestion du calendrier des examens",
      search: "Rechercher un examen...",
      newExam: "Nouvel examen",
      date: "Date",
      room: "Salle",
      students: "Étudiants",
      duration: "Durée",
      upcoming: "À venir",
      ongoing: "En cours",
      completed: "Terminé",
      results: "Résultats"
    },
    ar: {
      title: "الامتحانات",
      subtitle: "إدارة جدول الامتحانات", 
      search: "البحث عن امتحان...",
      newExam: "امتحان جديد",
      date: "التاريخ",
      room: "القاعة",
      students: "الطلاب",
      duration: "المدة",
      upcoming: "قادم",
      ongoing: "جاري",
      completed: "مكتمل",
      results: "النتائج"
    }
  };

  const t = content[language];

  const exams = [
    {
      id: 1,
      subject: language === 'fr' ? "Algorithmes et Structures de Données" : "الخوارزميات وهياكل البيانات",
      course: language === 'fr' ? "Informatique L2" : "علوم الحاسوب س2",
      date: "2024-01-25",
      time: "09:00",
      room: "A-101",
      students: 45,
      duration: "3h",
      status: "upcoming"
    },
    {
      id: 2,
      subject: language === 'fr' ? "Anatomie Générale" : "التشريح العام",
      course: language === 'fr' ? "Médecine 2ème année" : "الطب السنة الثانية",
      date: "2024-01-22",
      time: "14:00",
      room: "B-203",
      students: 38,
      duration: "4h",
      status: "ongoing"
    },
    {
      id: 3,
      subject: language === 'fr' ? "Comptabilité Générale" : "المحاسبة العامة",
      course: language === 'fr' ? "Gestion L1" : "الإدارة س1",
      date: "2024-01-18",
      time: "10:00",
      room: "C-105",
      students: 52,
      duration: "2h",
      status: "completed"
    }
  ];

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming':
        return t.upcoming;
      case 'ongoing':
        return t.ongoing;
      case 'completed':
        return t.completed;
      default:
        return status;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'secondary';
      case 'ongoing':
        return 'default';
      case 'completed':
        return 'outline';
      default:
        return 'secondary';
    }
  };

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

        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-mesrs-muted" />
            <Input 
              placeholder={t.search}
              className="pl-10 mesrs-input"
            />
          </div>
          <Button className="mesrs-button-primary">
            <Plus className="h-4 w-4 mr-2" />
            {t.newExam}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {exams.map((exam) => (
          <Card key={exam.id} className="mesrs-card">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className={`${language === 'ar' ? 'font-arabic text-right' : 'font-latin text-left'}`}>
                    {exam.subject}
                  </CardTitle>
                  <CardDescription className={`${language === 'ar' ? 'font-arabic text-right' : 'font-latin text-left'}`}>
                    {exam.course}
                  </CardDescription>
                </div>
                <Badge variant={getStatusVariant(exam.status)} className="mesrs-badge">
                  {getStatusText(exam.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-mesrs-secondary" />
                  <span className="text-mesrs-foreground">{exam.date} {exam.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-mesrs-secondary" />
                  <span className="text-mesrs-foreground">{exam.room}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-mesrs-secondary" />
                  <span className="text-mesrs-foreground">{exam.students} {t.students}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-mesrs-secondary" />
                  <span className="text-mesrs-foreground">{exam.duration}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="mesrs-button-outline flex-1">
                  Détails
                </Button>
                {exam.status === 'completed' && (
                  <Button size="sm" className="mesrs-button-primary flex-1">
                    {t.results}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Exams;