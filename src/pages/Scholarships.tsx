import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wallet, Search, DollarSign, GraduationCap, Calendar, Users } from "lucide-react";

interface ScholarshipsProps {
  language: 'ar' | 'fr';
}

const Scholarships = ({ language }: ScholarshipsProps) => {
  const content = {
    fr: {
      title: "Bourses",
      subtitle: "Gestion des bourses d'études",
      search: "Rechercher une bourse...",
      apply: "Postuler",
      amount: "Montant",
      recipients: "Bénéficiaires",
      deadline: "Date limite",
      available: "Disponible",
      closed: "Fermée",
      criteria: "Critères",
      viewDetails: "Voir détails"
    },
    ar: {
      title: "المنح",
      subtitle: "إدارة المنح الدراسية",
      search: "البحث عن منحة...",
      apply: "تقديم طلب",
      amount: "المبلغ",
      recipients: "المستفيدون",
      deadline: "آخر موعد",
      available: "متاحة",
      closed: "مغلقة",
      criteria: "المعايير",
      viewDetails: "عرض التفاصيل"
    }
  };

  const t = content[language];

  const scholarships = [
    {
      id: 1,
      name: language === 'fr' ? "Bourse d'Excellence Académique" : "منحة التفوق الأكاديمي",
      description: language === 'fr' ? "Pour les étudiants avec mention très bien" : "للطلاب الحاصلين على تقدير ممتاز",
      amount: "50,000 MRU",
      recipients: 25,
      deadline: "2024-02-15",
      status: "available",
      category: language === 'fr' ? "Mérite académique" : "الجدارة الأكاديمية"
    },
    {
      id: 2,
      name: language === 'fr' ? "Bourse Sociale" : "المنحة الاجتماعية",
      description: language === 'fr' ? "Aide financière pour étudiants démunis" : "مساعدة مالية للطلاب المحتاجين",
      amount: "30,000 MRU",
      recipients: 100,
      deadline: "2024-01-30",
      status: "available",
      category: language === 'fr' ? "Aide sociale" : "المساعدة الاجتماعية"
    },
    {
      id: 3,
      name: language === 'fr' ? "Bourse de Recherche" : "منحة البحث",
      description: language === 'fr' ? "Financement des projets de recherche" : "تمويل مشاريع البحث",
      amount: "80,000 MRU",
      recipients: 10,
      deadline: "2024-01-15",
      status: "closed",
      category: language === 'fr' ? "Recherche" : "البحث"
    }
  ];

  const getStatusText = (status: string) => {
    return status === 'available' ? t.available : t.closed;
  };

  const getStatusVariant = (status: string) => {
    return status === 'available' ? 'default' : 'secondary';
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

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-mesrs-muted" />
          <Input 
            placeholder={t.search}
            className="pl-10 mesrs-input"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {scholarships.map((scholarship) => (
          <Card key={scholarship.id} className="mesrs-card">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className={`${language === 'ar' ? 'font-arabic text-right' : 'font-latin text-left'}`}>
                    {scholarship.name}
                  </CardTitle>
                  <CardDescription className={`${language === 'ar' ? 'font-arabic text-right' : 'font-latin text-left'}`}>
                    {scholarship.description}
                  </CardDescription>
                </div>
                <Badge variant={getStatusVariant(scholarship.status)} className="mesrs-badge">
                  {getStatusText(scholarship.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-mesrs-accent/10 rounded-lg">
                  <DollarSign className="h-5 w-5 text-mesrs-secondary mx-auto mb-1" />
                  <div className="text-lg font-bold text-mesrs-primary">{scholarship.amount}</div>
                  <div className="text-xs text-mesrs-muted">{t.amount}</div>
                </div>
                <div className="text-center p-3 bg-mesrs-accent/10 rounded-lg">
                  <Users className="h-5 w-5 text-mesrs-secondary mx-auto mb-1" />
                  <div className="text-lg font-bold text-mesrs-primary">{scholarship.recipients}</div>
                  <div className="text-xs text-mesrs-muted">{t.recipients}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-mesrs-secondary" />
                <span className="text-mesrs-muted">{t.deadline}:</span>
                <span className="text-mesrs-foreground">{scholarship.deadline}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <GraduationCap className="h-4 w-4 text-mesrs-secondary" />
                <span className="text-mesrs-foreground">{scholarship.category}</span>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="mesrs-button-outline flex-1">
                  {t.viewDetails}
                </Button>
                {scholarship.status === 'available' && (
                  <Button size="sm" className="mesrs-button-primary flex-1">
                    <Wallet className="h-4 w-4 mr-1" />
                    {t.apply}
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

export default Scholarships;