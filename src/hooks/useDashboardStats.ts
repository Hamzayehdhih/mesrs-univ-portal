import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface DashboardStats {
  total_students: number;
  total_teachers: number;
  total_universities: number;
  total_formations: number;
  pending_enrollments: number;
  active_scholarships: number;
}

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async (): Promise<DashboardStats> => {
      const { data, error } = await supabase.rpc('get_dashboard_stats');
      
      if (error) {
        console.error('Error fetching dashboard stats:', error);
        throw error;
      }
      
      return data as DashboardStats;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // Refresh every 5 minutes
  });
};

export const useEnrollmentTrends = (monthsBack: number = 12) => {
  return useQuery({
    queryKey: ['enrollment-trends', monthsBack],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_enrollment_trends', { 
        months_back: monthsBack 
      });
      
      if (error) {
        console.error('Error fetching enrollment trends:', error);
        throw error;
      }
      
      // Transform data to match chart component expectations
      return data.map((item: any) => ({
        month: item.month_year.split('-')[1], // Extract month from YYYY-MM
        students: item.new_enrollments,
        year: parseInt(item.month_year.split('-')[0]) // Extract year
      }));
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useFormationStats = () => {
  return useQuery({
    queryKey: ['formation-stats'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_enrollment_stats_by_formation');
      
      if (error) {
        console.error('Error fetching formation stats:', error);
        throw error;
      }
      
      // Transform data to match bar chart component expectations
      const colors = [
        'hsl(var(--primary))',
        'hsl(var(--secondary))',
        'hsl(var(--accent))',
        '#10B981', // emerald-500
        '#F59E0B', // amber-500
        '#8B5CF6', // violet-500
        '#EF4444', // red-500
        '#06B6D4', // cyan-500
      ];
      
      return data.map((item: any, index: number) => ({
        faculty: item.formation_name,
        students: item.student_count,
        color: colors[index % colors.length]
      }));
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useUniversityStats = () => {
  return useQuery({
    queryKey: ['university-stats'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_university_stats');
      
      if (error) {
        console.error('Error fetching university stats:', error);
        throw error;
      }
      
      // Transform data to match pie chart component expectations
      const colors = [
        'hsl(var(--primary))',
        'hsl(var(--secondary))',
        'hsl(var(--accent))',
        '#10B981', // emerald-500
        '#F59E0B', // amber-500
        '#8B5CF6', // violet-500
        '#EF4444', // red-500
        '#06B6D4', // cyan-500
      ];
      
      return data.map((item: any, index: number) => ({
        name: item.university_name,
        students: item.student_count,
        color: colors[index % colors.length]
      }));
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useRecentActivities = (limit: number = 10) => {
  return useQuery({
    queryKey: ['recent-activities', limit],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_recent_activities', { 
        limit_count: limit 
      });
      
      if (error) {
        console.error('Error fetching recent activities:', error);
        throw error;
      }
      
      return data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes for activities
    refetchInterval: 2 * 60 * 1000, // Refresh every 2 minutes
  });
};