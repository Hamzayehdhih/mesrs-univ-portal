import { useState } from 'react';
import { Search, MapPin, Users, BookOpen, ExternalLink, Plus, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { universities } from '@/data/mockData';

interface UniversitiesProps {
  language: 'ar' | 'fr';
}

const Universities = ({ language }: UniversitiesProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredUniversities = universities.filter(uni =>
    uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    uni.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const texts = {
    ar: {
      title: 'إدارة الجامعات',
      subtitle: 'قائمة جميع الجامعات والمؤسسات التعليمية',
      search: 'البحث في الجامعات...',
      addNew: 'إضافة جامعة جديدة',
      students: 'طالب',
      faculties: 'كلية',
      established: 'تأسست في',
      website: 'الموقع الإلكتروني',
      viewDetails: 'عرض التفاصيل',
      location: 'الموقع'
    },
    fr: {
      title: 'Gestion des Universités',
      subtitle: 'Liste de toutes les universités et établissements d\'enseignement',
      search: 'Rechercher une université...',
      addNew: 'Ajouter une nouvelle université',
      students: 'étudiants',
      faculties: 'facultés',
      established: 'Fondée en',
      website: 'Site web',
      viewDetails: 'Voir les détails',
      location: 'Localisation'
    }
  };

  const currentTexts = texts[language];

  return (
    <div className="flex-1 space-y-6 p-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
          <h1 className={`text-responsive-2xl font-bold text-primary ${language === 'ar' ? 'font-arabic' : 'font-latin'}`}>
            {currentTexts.title}
          </h1>
          <p className="text-responsive-base text-muted-foreground font-latin">
            {currentTexts.subtitle}
          </p>
        </div>
        <Button className="mesrs-button-primary">
          <Plus className="h-4 w-4 mr-2" />
          {currentTexts.addNew}
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={currentTexts.search}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Universities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredUniversities.map((university, index) => (
          <Card key={university.id} className="mesrs-stat-card group">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {/* University Logo Placeholder */}
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className={`line-clamp-2 text-base ${language === 'ar' ? 'font-arabic text-right' : 'font-latin'}`}>
                      {language === 'ar' ? university.nameAr : university.name}
                    </CardTitle>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground font-latin">
                        {university.city}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Statistics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg bg-primary/10">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-lg font-bold text-primary">
                    {university.students.toLocaleString('fr-FR')}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {currentTexts.students}
                  </p>
                </div>
                
                <div className="text-center p-3 rounded-lg bg-secondary/10">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <BookOpen className="h-4 w-4 text-secondary-foreground" />
                  </div>
                  <p className="text-lg font-bold text-secondary-foreground">
                    {university.faculties}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {currentTexts.faculties}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    {currentTexts.established}:
                  </span>
                  <Badge variant="outline" className="font-mono">
                    {university.established}
                  </Badge>
                </div>
                
                {university.website && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      {currentTexts.website}:
                    </span>
                    <a 
                      href={`https://${university.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-light flex items-center gap-1 text-xs"
                    >
                      <ExternalLink className="h-3 w-3" />
                      {university.website}
                    </a>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <Button 
                variant="outline" 
                className="w-full mesrs-nav-link group-hover:border-primary group-hover:text-primary"
              >
                {currentTexts.viewDetails}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredUniversities.length === 0 && (
        <div className="text-center py-12">
          <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">
            {language === 'ar' ? 'لم يتم العثور على نتائج' : 'Aucun résultat trouvé'}
          </h3>
          <p className="text-muted-foreground">
            {language === 'ar' ? 'جرب مصطلح بحث مختلف' : 'Essayez un autre terme de recherche'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Universities;