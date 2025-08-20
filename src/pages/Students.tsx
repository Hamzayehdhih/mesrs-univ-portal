import { useState } from 'react';
import { Search, UserPlus, Filter, Download, Eye, Edit, Trash2 } from 'lucide-react';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { students } from '@/data/mockData';

interface StudentsProps {
  language: 'ar' | 'fr';
}

const Students = ({ language }: StudentsProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.matricule.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLevel = selectedLevel === 'all' || student.level === selectedLevel;
    
    return matchesSearch && matchesLevel;
  });

  const texts = {
    ar: {
      title: 'إدارة الطلاب',
      subtitle: 'قائمة جميع الطلاب المسجلين في النظام',
      search: 'البحث في الطلاب...',
      addNew: 'تسجيل طالب جديد',
      export: 'تصدير البيانات',
      filter: 'تصفية',
      all: 'الكل',
      name: 'الاسم',
      matricule: 'رقم التسجيل',
      university: 'الجامعة',
      faculty: 'الكلية',
      level: 'المستوى',
      year: 'السنة',
      actions: 'الإجراءات',
      view: 'عرض',
      edit: 'تعديل',
      delete: 'حذف',
      male: 'ذكر',
      female: 'أنثى'
    },
    fr: {
      title: 'Gestion des Étudiants',
      subtitle: 'Liste de tous les étudiants inscrits dans le système',
      search: 'Rechercher un étudiant...',
      addNew: 'Inscrire un nouvel étudiant',
      export: 'Exporter les données',
      filter: 'Filtrer',
      all: 'Tous',
      name: 'Nom',
      matricule: 'Matricule',
      university: 'Université',
      faculty: 'Faculté',
      level: 'Niveau',
      year: 'Année',
      actions: 'Actions',
      view: 'Voir',
      edit: 'Modifier',
      delete: 'Supprimer',
      male: 'Masculin',
      female: 'Féminin'
    }
  };

  const currentTexts = texts[language];

  const levels = ['Licence 1', 'Licence 2', 'Licence 3', 'Master 1', 'Master 2', 'Doctorat'];

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

      {/* Filters and Search */}
      <Card className="mesrs-card">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={currentTexts.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Level Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="min-w-[140px]">
                  <Filter className="h-4 w-4 mr-2" />
                  {selectedLevel === 'all' ? currentTexts.all : selectedLevel}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSelectedLevel('all')}>
                  {currentTexts.all}
                </DropdownMenuItem>
                {levels.map((level) => (
                  <DropdownMenuItem 
                    key={level} 
                    onClick={() => setSelectedLevel(level)}
                  >
                    {level}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card className="mesrs-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className={language === 'ar' ? 'font-arabic' : 'font-latin'}>
              {filteredStudents.length} {language === 'ar' ? 'طالب' : 'étudiants'}
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
                  <TableHead>{currentTexts.matricule}</TableHead>
                  <TableHead>{currentTexts.university}</TableHead>
                  <TableHead>{currentTexts.faculty}</TableHead>
                  <TableHead>{currentTexts.level}</TableHead>
                  <TableHead>{currentTexts.year}</TableHead>
                  <TableHead className="text-center">{currentTexts.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={student.photo} alt={student.firstName} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {student.firstName[0]}{student.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {student.firstName} {student.lastName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {student.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        {student.matricule}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[200px]">
                      <p className="truncate text-sm">
                        {student.university}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">
                        {student.faculty}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={
                          student.level.includes('Master') ? 'border-accent text-accent' :
                          student.level.includes('Licence') ? 'border-primary text-primary' :
                          'border-secondary text-secondary'
                        }
                      >
                        {student.level}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-muted-foreground">
                        {student.year}
                      </span>
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
      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <UserPlus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">
            {language === 'ar' ? 'لم يتم العثور على طلاب' : 'Aucun étudiant trouvé'}
          </h3>
          <p className="text-muted-foreground">
            {language === 'ar' ? 'جرب مصطلح بحث مختلف أو غير المرشحات' : 'Essayez un autre terme de recherche ou modifiez les filtres'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Students;