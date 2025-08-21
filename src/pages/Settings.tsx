import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Settings as SettingsIcon, User, Bell, Shield, Database, Palette, Globe } from "lucide-react";

interface SettingsProps {
  language: 'ar' | 'fr';
}

const Settings = ({ language }: SettingsProps) => {
  const content = {
    fr: {
      title: "Paramètres",
      subtitle: "Configuration du système et préférences",
      profile: "Profil Utilisateur",
      notifications: "Notifications",
      security: "Sécurité",
      system: "Système",
      appearance: "Apparence",
      language: "Langue",
      name: "Nom",
      email: "Email",
      phone: "Téléphone",
      role: "Rôle",
      emailNotif: "Notifications par email",
      pushNotif: "Notifications push",
      smsNotif: "Notifications SMS",
      twoFactor: "Authentification à deux facteurs",
      passwordChange: "Changer le mot de passe",
      darkMode: "Mode sombre",
      compactMode: "Mode compact",
      autoBackup: "Sauvegarde automatique",
      dataRetention: "Rétention des données",
      save: "Enregistrer",
      cancel: "Annuler"
    },
    ar: {
      title: "الإعدادات",
      subtitle: "تكوين النظام والتفضيلات",
      profile: "الملف الشخصي",
      notifications: "الإشعارات",
      security: "الأمان",
      system: "النظام",
      appearance: "المظهر",
      language: "اللغة",
      name: "الاسم",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      role: "الدور",
      emailNotif: "إشعارات البريد الإلكتروني",
      pushNotif: "الإشعارات المباشرة",
      smsNotif: "إشعارات الرسائل القصيرة",
      twoFactor: "المصادقة الثنائية",
      passwordChange: "تغيير كلمة المرور",
      darkMode: "الوضع المظلم",
      compactMode: "الوضع المضغوط",
      autoBackup: "النسخ الاحتياطي التلقائي",
      dataRetention: "الاحتفاظ بالبيانات",
      save: "حفظ",
      cancel: "إلغاء"
    }
  };

  const t = content[language];

  const settingSections = [
    {
      title: t.profile,
      icon: User,
      items: [
        { label: t.name, type: "input", value: "Mohamed Ould Salem" },
        { label: t.email, type: "input", value: "mohamed.salem@mesrs.gov.mr" },
        { label: t.phone, type: "input", value: "+222 45 67 89 12" },
        { label: t.role, type: "input", value: "Administrateur", disabled: true }
      ]
    },
    {
      title: t.notifications,
      icon: Bell,
      items: [
        { label: t.emailNotif, type: "switch", value: true },
        { label: t.pushNotif, type: "switch", value: true },
        { label: t.smsNotif, type: "switch", value: false }
      ]
    },
    {
      title: t.security,
      icon: Shield,
      items: [
        { label: t.twoFactor, type: "switch", value: false },
        { label: t.passwordChange, type: "button", action: "change-password" }
      ]
    },
    {
      title: t.appearance,
      icon: Palette,
      items: [
        { label: t.darkMode, type: "switch", value: false },
        { label: t.compactMode, type: "switch", value: false },
        { label: t.language, type: "select", value: language }
      ]
    },
    {
      title: t.system,
      icon: Database,
      items: [
        { label: t.autoBackup, type: "switch", value: true },
        { label: t.dataRetention, type: "input", value: "12 mois" }
      ]
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {settingSections.map((section, index) => {
          const Icon = section.icon;
          return (
            <Card key={index} className="mesrs-card">
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${language === 'ar' ? 'font-arabic text-right' : 'font-latin text-left'}`}>
                  <Icon className="h-5 w-5 text-mesrs-primary" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className={`text-sm font-medium ${language === 'ar' ? 'font-arabic' : 'font-latin'}`}>
                        {item.label}
                      </Label>
                      {item.type === 'switch' && (
                        <Switch 
                          checked={item.value as boolean}
                          className="mesrs-switch"
                        />
                      )}
                      {item.type === 'button' && (
                        <Button variant="outline" size="sm" className="mesrs-button-outline">
                          {item.label}
                        </Button>
                      )}
                    </div>
                    {item.type === 'input' && (
                      <Input 
                        value={item.value as string}
                        disabled={item.disabled}
                        className="mesrs-input"
                      />
                    )}
                    {itemIndex < section.items.length - 1 && (
                      <Separator className="my-3" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" className="mesrs-button-outline">
          {t.cancel}
        </Button>
        <Button className="mesrs-button-primary">
          {t.save}
        </Button>
      </div>
    </div>
  );
};

export default Settings;