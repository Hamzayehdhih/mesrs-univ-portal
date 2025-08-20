import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  UserCheck,
  BookOpen,
  FileText,
  Award,
  Wallet,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  language: 'ar' | 'fr';
}

const Sidebar = ({ isOpen, onToggle, language }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = {
    fr: [
      { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard, path: '/' },
      { id: 'universities', label: 'Universités', icon: GraduationCap, path: '/universites' },
      { id: 'students', label: 'Étudiants', icon: Users, path: '/etudiants' },
      { id: 'teachers', label: 'Enseignants', icon: UserCheck, path: '/enseignants' },
      { id: 'courses', label: 'Formations', icon: BookOpen, path: '/formations' },
      { id: 'enrollments', label: 'Inscriptions', icon: FileText, path: '/inscriptions' },
      { id: 'exams', label: 'Examens', icon: Award, path: '/examens' },
      { id: 'scholarships', label: 'Bourses', icon: Wallet, path: '/bourses' },
      { id: 'statistics', label: 'Statistiques', icon: BarChart3, path: '/statistiques' },
      { id: 'settings', label: 'Paramètres', icon: Settings, path: '/parametres' },
    ],
    ar: [
      { id: 'dashboard', label: 'لوحة التحكم', icon: LayoutDashboard, path: '/' },
      { id: 'universities', label: 'الجامعات', icon: GraduationCap, path: '/universites' },
      { id: 'students', label: 'الطلاب', icon: Users, path: '/etudiants' },
      { id: 'teachers', label: 'الأساتذة', icon: UserCheck, path: '/enseignants' },
      { id: 'courses', label: 'التكوينات', icon: BookOpen, path: '/formations' },
      { id: 'enrollments', label: 'التسجيلات', icon: FileText, path: '/inscriptions' },
      { id: 'exams', label: 'الامتحانات', icon: Award, path: '/examens' },
      { id: 'scholarships', label: 'المنح', icon: Wallet, path: '/bourses' },
      { id: 'statistics', label: 'الإحصائيات', icon: BarChart3, path: '/statistiques' },
      { id: 'settings', label: 'الإعدادات', icon: Settings, path: '/parametres' },
    ]
  };

  const currentMenuItems = menuItems[language];

  const handleItemClick = (path: string) => {
    navigate(path);
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out lg:relative lg:top-0 lg:h-screen",
          isOpen ? "w-64 translate-x-0" : "w-16 -translate-x-full lg:translate-x-0",
          "lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Toggle Button */}
          <div className="p-4 border-b border-sidebar-border">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="mesrs-button-ghost w-full justify-center hover:bg-sidebar-accent"
            >
              {isOpen ? (
                <ChevronLeft className="h-5 w-5 text-sidebar-foreground" />
              ) : (
                <ChevronRight className="h-5 w-5 text-sidebar-foreground" />
              )}
            </Button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {currentMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.path)}
                  className={cn(
                    "mesrs-sidebar-item w-full",
                    isActive && "active",
                    !isOpen && "justify-center px-2"
                  )}
                  title={!isOpen ? item.label : undefined}
                >
                  <Icon className={cn(
                    "h-5 w-5 flex-shrink-0",
                    isActive ? "text-sidebar-primary-foreground" : "text-secondary"
                  )} />
                  {isOpen && (
                    <span className={cn(
                      "text-sm font-medium transition-opacity duration-200",
                      language === 'ar' ? 'font-arabic text-right' : 'font-latin text-left'
                    )}>
                      {item.label}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          {isOpen && (
            <div className="p-4 border-t border-sidebar-border">
              <div className="text-xs text-sidebar-foreground/60 text-center font-latin">
                MESRS © 2024
                <br />
                Version 1.0.0
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;