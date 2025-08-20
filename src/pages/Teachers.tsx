import { useState } from 'react';
import { Search, UserPlus, Filter, Download, Eye, Edit, Trash2, BookOpen, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { teachers } from '@/data/mockData';

interface TeachersProps {
  language: 'ar' | 'fr';
}

const Teachers = ({ language }: TeachersProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredTeachers = teachers.filter(teacher =>
    teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.speciality.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const texts = {
    ar: {
      title: 'إدارة الأساتذة',
      subtitle: 'قائمة جميع الأساتذة والهيئة التدريسية',
      search: 'البحث في الأساتذة...',
      addNew: 'إضافة أستاذ جديد',
      export: 'تصدير البيانات',
      name: 'الاسم',
      speciality: 'التخصص',
      university: 'الجامعة',
      faculty: 'الكلية',
      grade: 'الدرجة',
      experience: 'سنوات الخبرة',
      courses: 'المقررات',
      actions: 'الإجراءات',
      view: 'عرض',
      edit: 'تعديل',
      delete: 'حذف',
      years: 'سنة'
    },
    fr: {
      title: 'Gestion des Enseignants',
      subtitle: 'Liste de tous les enseignants et membres du corps professoral',
      search: 'Rechercher un enseignant...',
      addNew: 'Ajouter un nouvel enseignant',
      export: 'Exporter les données',
      name: 'Nom',
      speciality: 'Spécialité',
      university: 'Université',
      faculty: 'Faculté',
      grade: 'Grade',
      experience: 'Expérience',
      courses: 'Cours',
      actions: 'Actions',
      view: 'Voir',
      edit: 'Modifier',
      delete: 'Supprimer',
      years: 'ans'
    }
  };

  const currentTexts = texts[language];

  return (
    <div className="flex-1 space-y-6 p-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
          <h1 className={`text-responsive-2xl font-bold text-primary ${language === 'ar' ? 'font-arabic' : 'font-latin'}`}>
            {currentTexts.title}
          </h1>
          <p className="text-responsive-base text-muted-foreground font-latin">
            {currentTexts.subtitle}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="mesrs-button-ghost">
            <Download className="h-4 w-4 mr-2" />
            {currentTexts.export}
          </Button>
          <Button className="mesrs-button-primary">
            <UserPlus className="h-4 w-4 mr-2" />
            {currentTexts.addNew}
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card className="mesrs-card">
        <CardContent className="p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={currentTexts.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Teachers Table */}
      <Card className="mesrs-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className={language === 'ar' ? 'font-arabic' : 'font-latin'}>
              {filteredTeachers.length} {language === 'ar' ? 'أستاذ' : 'enseignants'}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className={language === 'ar' ? 'text-right' : 'text-left'}>
                    {currentTexts.name}
                  </TableHead>
                  <TableHead>{currentTexts.speciality}</TableHead>
                  <TableHead>{currentTexts.university}</TableHead>
                  <TableHead>{currentTexts.grade}</TableHead>
                  <TableHead>{currentTexts.experience}</TableHead>
                  <TableHead>{currentTexts.courses}</TableHead>
                  <TableHead className="text-center">{currentTexts.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeachers.map((teacher) => (
                  <TableRow key={teacher.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={teacher.photo} alt={teacher.firstName} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {teacher.firstName[0]}{teacher.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {teacher.firstName} {teacher.lastName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {teacher.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">
                        {teacher.speciality}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[200px]">
                      <p className="truncate text-sm">
                        {teacher.university}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {teacher.faculty}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className="border-accent text-accent font-medium"
                      >
                        {teacher.grade}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-secondary" />
                        <span className="text-sm font-medium">
                          {teacher.experience} {currentTexts.years}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {teacher.courses.slice(0, 2).map((course, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {course}
                          </Badge>
                        ))}
                        {teacher.courses.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{teacher.courses.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-1">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Empty State */}
      {filteredTeachers.length === 0 && (
        <div className="text-center py-12">
          <UserPlus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">
            {language === 'ar' ? 'لم يتم العثور على أساتذة' : 'Aucun enseignant trouvé'}
          </h3>
          <p className="text-muted-foreground">
            {language === 'ar' ? 'جرب مصطلح بحث مختلف' : 'Essayez un autre terme de recherche'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Teachers;