import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Universities from "./pages/Universities";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Courses from "./pages/Courses";
import Enrollments from "./pages/Enrollments";
import Exams from "./pages/Exams";
import Scholarships from "./pages/Scholarships";
import Statistics from "./pages/Statistics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { useOutletContext } from "react-router-dom";

const queryClient = new QueryClient();

// Wrapper components to pass language prop
const DashboardPage = () => {
  const { language } = useOutletContext<{ language: 'ar' | 'fr' }>();
  return <Dashboard language={language} />;
};

const UniversitiesPage = () => {
  const { language } = useOutletContext<{ language: 'ar' | 'fr' }>();
  return <Universities language={language} />;
};

const StudentsPage = () => {
  const { language } = useOutletContext<{ language: 'ar' | 'fr' }>();
  return <Students language={language} />;
};

const TeachersPage = () => {
  const { language } = useOutletContext<{ language: 'ar' | 'fr' }>();
  return <Teachers language={language} />;
};

const CoursesPage = () => {
  const { language } = useOutletContext<{ language: 'ar' | 'fr' }>();
  return <Courses language={language} />;
};

const EnrollmentsPage = () => {
  const { language } = useOutletContext<{ language: 'ar' | 'fr' }>();
  return <Enrollments language={language} />;
};

const ExamsPage = () => {
  const { language } = useOutletContext<{ language: 'ar' | 'fr' }>();
  return <Exams language={language} />;
};

const ScholarshipsPage = () => {
  const { language } = useOutletContext<{ language: 'ar' | 'fr' }>();
  return <Scholarships language={language} />;
};

const StatisticsPage = () => {
  const { language } = useOutletContext<{ language: 'ar' | 'fr' }>();
  return <Statistics language={language} />;
};

const SettingsPage = () => {
  const { language } = useOutletContext<{ language: 'ar' | 'fr' }>();
  return <Settings language={language} />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="universites" element={<UniversitiesPage />} />
            <Route path="etudiants" element={<StudentsPage />} />
            <Route path="enseignants" element={<TeachersPage />} />
            <Route path="formations" element={<CoursesPage />} />
            <Route path="inscriptions" element={<EnrollmentsPage />} />
            <Route path="examens" element={<ExamsPage />} />
            <Route path="bourses" element={<ScholarshipsPage />} />
            <Route path="statistiques" element={<StatisticsPage />} />
            <Route path="parametres" element={<SettingsPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
