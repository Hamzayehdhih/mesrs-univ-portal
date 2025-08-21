import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Search, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface EnrollmentsProps {
  language: 'ar' | 'fr';
}

const Enrollments = ({ language }: EnrollmentsProps) => {
  const content = {
    fr: {
      title: "Inscriptions",
      subtitle: "Gestion des demandes d'inscription",
      search: "Rechercher une inscription...",
      newEnrollment: "Nouvelle inscription",
      pending: "En cours",
      approved: "Validée",
      rejected: "Rejetée",
      status: "Statut",
      student: "Étudiant",
      course: "Formation",
      date: "Date",
      actions: "Actions"
    },
    ar: {
      title: "التسجيلات",
      subtitle: "إدارة طلبات التسجيل",
      search: "البحث عن تسجيل...",
      newEnrollment: "تسجيل جديد",
      pending: "قيد المراجعة",
      approved: "مقبول",
      rejected: "مرفوض",
      status: "الحالة",
      student: "الطالب",
      course: "التكوين",
      date: "التاريخ",
      actions: "الإجراءات"
    }
  };

  const t = content[language];

  const enrollments = [
    {
      id: 1,
      student: language === 'fr' ? "Ahmed Ben Salem" : "أحمد بن سالم",
      course: language === 'fr' ? "Informatique L1" : "علوم الحاسوب س1",
      status: "pending",
      date: "2024-01-15"
    },
    {
      id: 2,
      student: language === 'fr' ? "Fatima Mint Mohamed" : "فاطمة بنت محمد",
      course: language === 'fr' ? "Médecine 1ère année" : "الطب السنة الأولى",
      status: "approved",
      date: "2024-01-10"
    },
    {
      id: 3,
      student: language === 'fr' ? "Mohamed Vall" : "محمد فال",
      course: language === 'fr' ? "Gestion M1" : "الإدارة م1",
      status: "rejected",
      date: "2024-01-12"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="h-4 w-4" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return t.pending;
      case 'approved':
        return t.approved;
      case 'rejected':
        return t.rejected;
      default:
        return status;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'approved':
        return 'default';
      case 'rejected':
        return 'destructive';
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
            <FileText className="h-4 w-4 mr-2" />
            {t.newEnrollment}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {enrollments.map((enrollment) => (
          <Card key={enrollment.id} className="mesrs-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className={`${language === 'ar' ? 'font-arabic text-right' : 'font-latin text-left'}`}>
                  {enrollment.student}
                </CardTitle>
                <Badge variant={getStatusVariant(enrollment.status)} className="mesrs-badge">
                  <div className="flex items-center gap-1">
                    {getStatusIcon(enrollment.status)}
                    {getStatusText(enrollment.status)}
                  </div>
                </Badge>
              </div>
              <CardDescription className={`${language === 'ar' ? 'font-arabic text-right' : 'font-latin text-left'}`}>
                {enrollment.course}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm text-mesrs-muted">{enrollment.date}</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="mesrs-button-outline">
                    Voir
                  </Button>
                  <Button variant="outline" size="sm" className="mesrs-button-outline">
                    Modifier
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Enrollments;