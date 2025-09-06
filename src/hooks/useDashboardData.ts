import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface DashboardStats {
  totalStudents: number;
  totalUniversities: number;
  totalFormations: number;
  totalScholarships: number;
  totalTeachers: number;
  totalEnrollments: number;
}

export interface EnrollmentTrendData {
  month: string;
  students: number;
  year: number;
}

export interface UniversityDistributionData {
  name: string;
  students: number;
  color: string;
}

export interface FacultyStatsData {
  faculty: string;
  students: number;
  color: string;
}

export interface ActivityData {
  id: string;
  action: string;
  resourceType: string;
  userName: string;
  timestamp: string;
  details: any;
}

const useDashboardData = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [enrollmentTrend, setEnrollmentTrend] = useState<EnrollmentTrendData[]>([]);
  const [universityDistribution, setUniversityDistribution] = useState<UniversityDistributionData[]>([]);
  const [facultyStats, setFacultyStats] = useState<FacultyStatsData[]>([]);
  const [activities, setActivities] = useState<ActivityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const colors = ['#006233', '#00A652', '#FFC72C', '#CE1126', '#8B5CF6', '#F59E0B', '#EC4899', '#10B981'];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch basic statistics
        const [
          studentsCount,
          universitiesCount,
          formationsCount,
          scholarshipsCount,
          teachersCount,
          enrollmentsCount
        ] = await Promise.all([
          supabase.from('students').select('*', { count: 'exact', head: true }),
          supabase.from('universities').select('*', { count: 'exact', head: true }).eq('is_active', true),
          supabase.from('formations').select('*', { count: 'exact', head: true }).eq('is_active', true),
          supabase.from('scholarships').select('*', { count: 'exact', head: true }).eq('is_active', true),
          supabase.from('teachers').select('*', { count: 'exact', head: true }),
          supabase.from('enrollments').select('*', { count: 'exact', head: true }).eq('status', 'active')
        ]);

        setStats({
          totalStudents: studentsCount.count || 0,
          totalUniversities: universitiesCount.count || 0,
          totalFormations: formationsCount.count || 0,
          totalScholarships: scholarshipsCount.count || 0,
          totalTeachers: teachersCount.count || 0,
          totalEnrollments: enrollmentsCount.count || 0
        });

        // Fetch enrollment trends (mock data for now since we don't have enough historical data)
        const currentYear = new Date().getFullYear();
        const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
        const trendData = months.slice(0, 9).map((month, index) => ({
          month,
          students: Math.floor((studentsCount.count || 0) * (0.3 + (index * 0.08))),
          year: currentYear
        }));
        setEnrollmentTrend(trendData);

        // Fetch university distribution
        const { data: universities, error: univError } = await supabase
          .from('universities')
          .select(`
            name,
            code,
            student_count
          `)
          .eq('is_active', true)
          .order('student_count', { ascending: false });

        if (univError) throw univError;

        const universityData = universities?.map((univ, index) => ({
          name: univ.code || univ.name,
          students: univ.student_count || 0,
          color: colors[index % colors.length]
        })) || [];
        setUniversityDistribution(universityData);

        // Fetch formation statistics grouped by university
        const { data: formations, error: formError } = await supabase
          .from('formations')
          .select(`
            name,
            capacity,
            universities!inner(name)
          `)
          .eq('is_active', true)
          .order('capacity', { ascending: false })
          .limit(6);

        if (formError) throw formError;

        const formationData = formations?.map((formation, index) => ({
          faculty: formation.name,
          students: Math.floor((formation.capacity || 0) * 0.8), // Assume 80% capacity
          color: colors[index % colors.length]
        })) || [];
        setFacultyStats(formationData);

        // Fetch recent activities
        const { data: recentActivities, error: actError } = await supabase
          .rpc('get_recent_activities', { limit_count: 10 });

        if (actError) throw actError;

        const activitiesData = recentActivities?.map((activity: any) => ({
          id: activity.resource_id || Math.random().toString(),
          action: activity.action,
          resourceType: activity.resource_type,
          userName: activity.user_name || 'Système',
          timestamp: activity.created_at,
          details: activity.details
        })) || [];
        setActivities(activitiesData);

      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const refreshData = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading
    // In a real app, you would refetch the data here
  };

  return {
    stats,
    enrollmentTrend,
    universityDistribution,
    facultyStats,
    activities,
    loading,
    error,
    refreshData
  };
};

export default useDashboardData;