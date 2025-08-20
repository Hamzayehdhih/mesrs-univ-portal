import { useState } from 'react';
import { Bell, User, Menu, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  onToggleSidebar: () => void;
  language: 'ar' | 'fr';
  onLanguageChange: (lang: 'ar' | 'fr') => void;
}

const Header = ({ onToggleSidebar, language, onLanguageChange }: HeaderProps) => {
  const [notifications] = useState(3);

  const texts = {
    ar: {
      ministry: 'وزارة التعليم العالي والبحث العلمي',
      subtitle: 'الجمهورية الإسلامية الموريتانية',
      profile: 'الملف الشخصي',
      settings: 'الإعدادات',
      logout: 'تسجيل الخروج',
      notifications: 'الإشعارات'
    },
    fr: {
      ministry: 'Ministère de l\'Enseignement Supérieur et de la Recherche Scientifique',
      subtitle: 'République Islamique de Mauritanie',
      profile: 'Mon Profil',
      settings: 'Paramètres',
      logout: 'Déconnexion',
      notifications: 'Notifications'
    }
  };

  const currentTexts = texts[language];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-gradient-primary backdrop-blur supports-[backdrop-filter]:bg-gradient-primary/95">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left: Menu Button + Logo + Title */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="mesrs-button-ghost hover:bg-white/20"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-4">
            {/* Official Logo */}
            <div className="flex-shrink-0">
              <img 
                src="/lovable-uploads/fb6c9af2-4a2b-463c-af5e-6fd60e9d1ce1.png" 
                alt="Logo MESRS" 
                className="h-10 w-10 rounded-full object-cover border-2 border-white/30"
              />
            </div>
            
            {/* Ministry Title - Bilingual */}
            <div className={`hidden md:block ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              <h1 className={`text-lg font-bold text-white leading-tight ${language === 'ar' ? 'font-arabic' : 'font-latin'}`}>
                {currentTexts.ministry}
              </h1>
              <p className="text-xs text-white/80 font-latin">
                {currentTexts.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Language Switch + Notifications + Profile */}
        <div className="flex items-center gap-3">
          {/* Language Switch */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLanguageChange(language === 'ar' ? 'fr' : 'ar')}
            className="mesrs-button-ghost text-xs font-medium"
          >
            <Languages className="h-4 w-4 mr-1" />
            {language === 'ar' ? 'FR' : 'عر'}
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="mesrs-button-ghost relative">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs animate-pulse"
                  >
                    {notifications}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-card/95 backdrop-blur-sm">
              <div className="p-4">
                <h3 className="font-semibold text-card-foreground mb-2">{currentTexts.notifications}</h3>
                <div className="space-y-2 text-sm">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                    <p className="font-medium text-primary">Nouvelle inscription</p>
                    <p className="text-muted-foreground">5 nouveaux étudiants inscrits</p>
                  </div>
                  <div className="p-2 rounded-lg bg-secondary/10 border border-secondary/20">
                    <p className="font-medium text-secondary-foreground">Résultats d'examen</p>
                    <p className="text-muted-foreground">Les résultats sont disponibles</p>
                  </div>
                  <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                    <p className="font-medium text-accent-foreground">Système de bourses</p>
                    <p className="text-muted-foreground">Mise à jour importante</p>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="mesrs-button-ghost flex items-center gap-2 px-3">
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                  <User className="h-4 w-4 text-secondary-foreground" />
                </div>
                <span className="hidden md:block text-white text-sm font-medium">
                  Admin MESRS
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-card/95 backdrop-blur-sm">
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                {currentTexts.profile}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                {currentTexts.settings}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-destructive">
                {currentTexts.logout}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;