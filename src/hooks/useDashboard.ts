import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/services/dashboardService';

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => dashboardService.getDashboardStats(),
    refetchInterval: 30000, // Refresh every 30 seconds
  });
}

export function useEnrollmentTrends(monthsBack: number = 12) {
  return useQuery({
    queryKey: ['enrollment-trends', monthsBack],
    queryFn: () => dashboardService.getEnrollmentTrends(monthsBack),
    refetchInterval: 60000, // Refresh every minute
  });
}

export function useEnrollmentStatsByFormation() {
  return useQuery({
    queryKey: ['enrollment-stats-by-formation'],
    queryFn: () => dashboardService.getEnrollmentStatsByFormation(),
    refetchInterval: 60000,
  });
}

export function useUniversityStats() {
  return useQuery({
    queryKey: ['university-stats'],
    queryFn: () => dashboardService.getUniversityStats(),
    refetchInterval: 60000,
  });
}

export function useRecentActivities(limit: number = 10) {
  return useQuery({
    queryKey: ['recent-activities', limit],
    queryFn: () => dashboardService.getRecentActivities(limit),
    refetchInterval: 30000,
  });
}

export function useFormationPerformance() {
  return useQuery({
    queryKey: ['formation-performance'],
    queryFn: () => dashboardService.getFormationPerformance(),
    refetchInterval: 300000, // Refresh every 5 minutes
  });
}

export function useMonthlyGrowthStats() {
  return useQuery({
    queryKey: ['monthly-growth-stats'],
    queryFn: () => dashboardService.getMonthlyGrowthStats(),
    refetchInterval: 300000, // Refresh every 5 minutes
  });
}

export function useSuccessRate() {
  return useQuery({
    queryKey: ['success-rate'],
    queryFn: () => dashboardService.getSuccessRate(),
    refetchInterval: 300000, // Refresh every 5 minutes
  });
}