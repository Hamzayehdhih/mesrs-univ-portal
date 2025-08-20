// Mock data for MESRS University Management System

export const universities = [
  {
    id: 1,
    name: "Université de Nouakchott Al Aasriya",
    nameAr: "جامعة نواكشوط العصرية",
    city: "Nouakchott",
    students: 15420,
    faculties: 8,
    established: 1981,
    logo: "/api/placeholder/80/80",
    website: "www.una.mr"
  },
  {
    id: 2,
    name: "Université de Nouakchott",
    nameAr: "جامعة نواكشوط",
    city: "Nouakchott",
    students: 12800,
    faculties: 6,
    established: 1970,
    logo: "/api/placeholder/80/80",
    website: "www.univ-nkc.mr"
  },
  {
    id: 3,
    name: "École Nationale d'Administration",
    nameAr: "المدرسة الوطنية للإدارة",
    city: "Nouakchott",
    students: 850,
    faculties: 3,
    established: 1966,
    logo: "/api/placeholder/80/80",
    website: "www.ena.mr"
  },
  {
    id: 4,
    name: "Institut Supérieur de Comptabilité",
    nameAr: "المعهد العالي للمحاسبة",
    city: "Nouakchott",
    students: 1200,
    faculties: 2,
    established: 1990,
    logo: "/api/placeholder/80/80",
    website: "www.iscae.mr"
  }
];

export const students = [
  {
    id: 1,
    firstName: "Ahmed",
    lastName: "Ould Mohamed",
    nameAr: "أحمد ولد محمد",
    email: "ahmed.mohamed@student.una.mr",
    phone: "+222 44 55 66 77",
    cni: "1234567890123",
    matricule: "UNA2024001",
    university: "Université de Nouakchott Al Aasriya",
    faculty: "Sciences Juridiques",
    level: "Master 1",
    year: 2024,
    birthDate: "1998-03-15",
    gender: "M",
    photo: "/api/placeholder/60/60"
  },
  {
    id: 2,
    firstName: "Fatima",
    lastName: "Mint Abdallah",
    nameAr: "فاطمة بنت عبدالله",
    email: "fatima.abdallah@student.una.mr",
    phone: "+222 44 55 66 78",
    cni: "1234567890124",
    matricule: "UNA2024002",
    university: "Université de Nouakchott Al Aasriya",
    faculty: "Sciences Économiques",
    level: "Licence 3",
    year: 2024,
    birthDate: "2000-07-22",
    gender: "F",
    photo: "/api/placeholder/60/60"
  }
];

export const teachers = [
  {
    id: 1,
    firstName: "Mohamed",
    lastName: "Ould Salem",
    nameAr: "محمد ولد سالم",
    email: "mohamed.salem@una.mr",
    phone: "+222 44 55 66 79",
    speciality: "Droit Public",
    university: "Université de Nouakchott Al Aasriya",
    faculty: "Sciences Juridiques",
    grade: "Professeur",
    experience: 15,
    courses: ["Droit Constitutionnel", "Droit Administratif"],
    photo: "/api/placeholder/60/60"
  },
  {
    id: 2,
    firstName: "Aisha",
    lastName: "Mint Mohamed",
    nameAr: "عائشة بنت محمد",
    email: "aisha.mohamed@una.mr",
    phone: "+222 44 55 66 80",
    speciality: "Économie",
    university: "Université de Nouakchott Al Aasriya",
    faculty: "Sciences Économiques",
    grade: "Maître de Conférences",
    experience: 8,
    courses: ["Microéconomie", "Macroéconomie"],
    photo: "/api/placeholder/60/60"
  }
];

export const courses = [
  {
    id: 1,
    name: "Licence en Droit",
    nameAr: "إجازة في القانون",
    faculty: "Sciences Juridiques",
    duration: "3 ans",
    credits: 180,
    level: "Licence",
    university: "Université de Nouakchott Al Aasriya",
    description: "Formation complète en droit mauritanien et international"
  },
  {
    id: 2,
    name: "Master en Économie",
    nameAr: "ماجستير في الاقتصاد",
    faculty: "Sciences Économiques",
    duration: "2 ans",
    credits: 120,
    level: "Master",
    university: "Université de Nouakchott Al Aasriya",
    description: "Spécialisation en économie du développement"
  }
];

export const enrollments = [
  {
    id: 1,
    studentId: 1,
    studentName: "Ahmed Ould Mohamed",
    course: "Master en Droit Public",
    university: "Université de Nouakchott Al Aasriya",
    status: "Validée",
    date: "2024-09-15",
    academicYear: "2024-2025"
  },
  {
    id: 2,
    studentId: 2,
    studentName: "Fatima Mint Abdallah",
    course: "Licence en Économie",
    university: "Université de Nouakchott Al Aasriya",
    status: "En cours",
    date: "2024-09-10",
    academicYear: "2024-2025"
  }
];

export const scholarships = [
  {
    id: 1,
    name: "Bourse Excellence Académique",
    nameAr: "منحة التفوق الأكاديمي",
    type: "Mérite",
    amount: 50000,
    currency: "UM",
    duration: "1 an",
    criteria: "Moyenne générale > 16/20",
    available: 50,
    allocated: 32
  },
  {
    id: 2,
    name: "Bourse Sociale",
    nameAr: "المنحة الاجتماعية",
    type: "Social",
    amount: 30000,
    currency: "UM",
    duration: "1 an",
    criteria: "Revenus familiaux < 100,000 UM/mois",
    available: 200,
    allocated: 156
  }
];

export const dashboardStats = [
  {
    title: "Total Étudiants",
    titleAr: "مجموع الطلاب",
    value: 30270,
    subtitle: "Inscrits 2024-2025",
    trend: { value: 8.2, isPositive: true },
    variant: 'primary' as const
  },
  {
    title: "Universités Actives",
    titleAr: "الجامعات النشطة",
    value: 12,
    subtitle: "Établissements publics",
    trend: { value: 2.1, isPositive: true },
    variant: 'secondary' as const
  },
  {
    title: "Taux de Réussite",
    titleAr: "معدل النجاح",
    value: "87.5%",
    subtitle: "Session 2023-2024",
    trend: { value: 3.4, isPositive: true },
    variant: 'success' as const
  },
  {
    title: "Bourses Attribuées",
    titleAr: "المنح الممنوحة",
    value: 1847,
    subtitle: "Pour l'année courante",
    trend: { value: 12.8, isPositive: true },
    variant: 'info' as const
  },
  {
    title: "Corps Professoral",
    titleAr: "الهيئة التدريسية",
    value: 2156,
    subtitle: "Enseignants actifs",
    trend: { value: 5.7, isPositive: true },
    variant: 'warning' as const
  },
  {
    title: "Formations Disponibles",
    titleAr: "التكوينات المتاحة",
    value: 156,
    subtitle: "Licence, Master, Doctorat",
    trend: { value: 1.2, isPositive: true },
    variant: 'accent' as const
  }
];

export const chartData = {
  enrollmentTrend: [
    { month: 'Jan', students: 24500, year: 2024 },
    { month: 'Fév', students: 25200, year: 2024 },
    { month: 'Mar', students: 26800, year: 2024 },
    { month: 'Avr', students: 27500, year: 2024 },
    { month: 'Mai', students: 28200, year: 2024 },
    { month: 'Jun', students: 28900, year: 2024 },
    { month: 'Jul', students: 29400, year: 2024 },
    { month: 'Aoû', students: 29800, year: 2024 },
    { month: 'Sep', students: 30270, year: 2024 },
  ],
  
  universityDistribution: [
    { name: 'UNA', students: 15420, color: '#006233' },
    { name: 'UN', students: 12800, color: '#00A652' },
    { name: 'ENA', students: 850, color: '#FFC72C' },
    { name: 'ISCAE', students: 1200, color: '#CE1126' },
  ],
  
  facultyStats: [
    { faculty: 'Sciences Juridiques', students: 8500, color: '#006233' },
    { faculty: 'Sciences Économiques', students: 7200, color: '#00A652' },
    { faculty: 'Lettres & Sciences Humaines', students: 6800, color: '#FFC72C' },
    { faculty: 'Sciences & Techniques', students: 4200, color: '#CE1126' },
    { faculty: 'Médecine', students: 2100, color: '#8B5CF6' },
    { faculty: 'Sciences de l\'Éducation', students: 1470, color: '#F59E0B' },
  ]
};