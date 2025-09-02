import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type University = Database['public']['Tables']['universities']['Row'];
type UniversityInsert = Database['public']['Tables']['universities']['Insert'];
type UniversityUpdate = Database['public']['Tables']['universities']['Update'];

class UniversityService {
  async getAllUniversities() {
    const { data, error } = await supabase
      .from('universities')
      .select('*')
      .order('name');

    if (error) throw error;
    return data;
  }

  async getActiveUniversities() {
    const { data, error } = await supabase
      .from('universities')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) throw error;
    return data;
  }

  async getUniversityById(id: string) {
    const { data, error } = await supabase
      .from('universities')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async createUniversity(university: UniversityInsert) {
    const { data, error } = await supabase
      .from('universities')
      .insert(university)
      .select()
      .single();

    if (error) throw error;
    
    // Log activity
    await supabase.rpc('log_activity', {
      action_name: 'CREATE',
      resource_type_name: 'university',
      resource_id_value: data.id,
      details_json: { name: data.name }
    });

    return data;
  }

  async updateUniversity(id: string, updates: UniversityUpdate) {
    const { data, error } = await supabase
      .from('universities')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
    // Log activity
    await supabase.rpc('log_activity', {
      action_name: 'UPDATE',
      resource_type_name: 'university',
      resource_id_value: id,
      details_json: updates
    });

    return data;
  }

  async deleteUniversity(id: string) {
    const { error } = await supabase
      .from('universities')
      .delete()
      .eq('id', id);

    if (error) throw error;
    
    // Log activity
    await supabase.rpc('log_activity', {
      action_name: 'DELETE',
      resource_type_name: 'university',
      resource_id_value: id
    });
  }

  async getUniversityStats() {
    const { data, error } = await supabase.rpc('get_university_stats');
    if (error) throw error;
    return data;
  }
}

export const universityService = new UniversityService();