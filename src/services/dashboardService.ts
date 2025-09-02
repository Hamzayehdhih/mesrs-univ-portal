import { supabase } from '@/integrations/supabase/client';

export interface DashboardStats {
  total_students: number;
  total_teachers: number;
  total_universities: number;
  total_formations: number;
  pending_enrollments: number;
  active_scholarships: number;
}

export interface EnrollmentTrend {
  month_year: string;
  new_enrollments: number;
}

export interface FormationStats {
  formation_name: string;
  student_count: number;
}

export interface UniversityStats {
  university_name: string;
  student_count: number;
  teacher_count: number;
}

export interface RecentActivity {
  action: string;
  resource_type: string;
  resource_id: string;
  details: any;
  user_name: string;
  created_at: string;
}

export interface FormationPerformance {
  formation_name: string;
  total_students: number;
  average_gpa: number;
  pass_rate: number;
}

class DashboardService {
  async getDashboardStats(): Promise<DashboardStats> {
    const { data, error } = await supabase.rpc('get_dashboard_stats');
    if (error) throw error;
    return data as unknown as DashboardStats;
  }

  async getEnrollmentTrends(monthsBack: number = 12): Promise<EnrollmentTrend[]> {
    const { data, error } = await supabase.rpc('get_enrollment_trends', {
      months_back: monthsBack
    });
    if (error) throw error;
    return data;
  }

  async getEnrollmentStatsByFormation(): Promise<FormationStats[]> {
    const { data, error } = await supabase.rpc('get_enrollment_stats_by_formation');
    if (error) throw error;
    return data;
  }

  async getUniversityStats(): Promise<UniversityStats[]> {
    const { data, error } = await supabase.rpc('get_university_stats');
    if (error) throw error;
    return data;
  }

  async getRecentActivities(limit: number = 10): Promise<RecentActivity[]> {
    const { data, error } = await supabase.rpc('get_recent_activities', {
      limit_count: limit
    });
    if (error) throw error;
    return data;
  }

  async getFormationPerformance(): Promise<FormationPerformance[]> {
    const { data, error } = await supabase.rpc('get_formation_performance');
    if (error) throw error;
    return data;
  }

  async getMonthlyGrowthStats() {
    const currentDate = new Date();
    const lastMonth = new Date(currentDate);
    lastMonth.setMonth(currentDate.getMonth() - 1);
    
    const [currentStudents, lastMonthStudents, currentEnrollments, lastMonthEnrollments] = await Promise.all([
      supabase
        .from('students')
        .select('id', { count: 'exact' })
        .gte('enrollment_date', currentDate.toISOString().split('T')[0]),
      
      supabase
        .from('students')
        .select('id', { count: 'exact' })
        .gte('enrollment_date', lastMonth.toISOString().split('T')[0])
        .lt('enrollment_date', currentDate.toISOString().split('T')[0]),
      
      supabase
        .from('enrollments')
        .select('id', { count: 'exact' })
        .eq('status', 'pending')
        .gte('enrollment_date', currentDate.toISOString().split('T')[0]),
      
      supabase
        .from('enrollments')
        .select('id', { count: 'exact' })
        .eq('status', 'pending')
        .gte('enrollment_date', lastMonth.toISOString().split('T')[0])
        .lt('enrollment_date', currentDate.toISOString().split('T')[0])
    ]);

    const studentGrowth = ((currentStudents.count || 0) - (lastMonthStudents.count || 0)) / Math.max(lastMonthStudents.count || 1, 1) * 100;
    const enrollmentGrowth = ((currentEnrollments.count || 0) - (lastMonthEnrollments.count || 0)) / Math.max(lastMonthEnrollments.count || 1, 1) * 100;

    return {
      studentGrowth: Math.round(studentGrowth * 100) / 100,
      enrollmentGrowth: Math.round(enrollmentGrowth * 100) / 100,
      newStudentsThisMonth: currentStudents.count || 0,
      pendingEnrollmentsThisMonth: currentEnrollments.count || 0
    };
  }

  async getSuccessRate() {
    const { data, error } = await supabase
      .from('exam_results')
      .select('is_passed')
      .not('is_passed', 'is', null);

    if (error) throw error;

    const totalExams = data.length;
    const passedExams = data.filter(result => result.is_passed).length;
    
    return totalExams > 0 ? Math.round((passedExams / totalExams) * 100) : 0;
  }
}

export const dashboardService = new DashboardService();