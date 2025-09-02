import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Student = Database['public']['Tables']['students']['Row'];
type StudentInsert = Database['public']['Tables']['students']['Insert'];
type StudentUpdate = Database['public']['Tables']['students']['Update'];
type Profile = Database['public']['Tables']['profiles']['Row'];

interface StudentWithProfile extends Student {
  profiles: Profile;
  universities: { name: string; code: string };
  formations: { name: string; code: string } | null;
}

class StudentService {
  async getAllStudents() {
    const { data, error } = await supabase
      .from('students')
      .select(`
        *,
        profiles!inner(
          first_name,
          last_name,
          email,
          phone,
          date_of_birth,
          national_id,
          address,
          avatar_url
        ),
        universities!inner(name, code),
        formations(name, code)
      `)
      .order('student_number');

    if (error) throw error;
    return data as StudentWithProfile[];
  }

  async getStudentById(id: string) {
    const { data, error } = await supabase
      .from('students')
      .select(`
        *,
        profiles!inner(*),
        universities!inner(*),
        formations(*),
        academic_years(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async getStudentByUserId(userId: string) {
    const { data, error } = await supabase
      .from('students')
      .select(`
        *,
        profiles!inner(*),
        universities!inner(*),
        formations(*),
        academic_years(*)
      `)
      .eq('profiles.user_id', userId)
      .single();

    if (error) throw error;
    return data;
  }

  async createStudent(student: StudentInsert) {
    const { data, error } = await supabase
      .from('students')
      .insert(student)
      .select()
      .single();

    if (error) throw error;
    
    // Log activity
    await supabase.rpc('log_activity', {
      action_name: 'CREATE',
      resource_type_name: 'student',
      resource_id_value: data.id,
      details_json: { student_number: data.student_number }
    });

    return data;
  }

  async updateStudent(id: string, updates: StudentUpdate) {
    const { data, error } = await supabase
      .from('students')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
    // Log activity
    await supabase.rpc('log_activity', {
      action_name: 'UPDATE',
      resource_type_name: 'student',
      resource_id_value: id,
      details_json: updates
    });

    return data;
  }

  async deleteStudent(id: string) {
    const { error } = await supabase
      .from('students')
      .delete()
      .eq('id', id);

    if (error) throw error;
    
    // Log activity
    await supabase.rpc('log_activity', {
      action_name: 'DELETE',
      resource_type_name: 'student',
      resource_id_value: id
    });
  }

  async getStudentsByUniversity(universeityId: string) {
    const { data, error } = await supabase
      .from('students')
      .select(`
        *,
        profiles!inner(first_name, last_name, email),
        formations(name, code)
      `)
      .eq('university_id', universeityId)
      .order('student_number');

    if (error) throw error;
    return data;
  }

  async getStudentsByFormation(formationId: string) {
    const { data, error } = await supabase
      .from('students')
      .select(`
        *,
        profiles!inner(first_name, last_name, email),
        universities!inner(name, code)
      `)
      .eq('formation_id', formationId)
      .order('student_number');

    if (error) throw error;
    return data;
  }

  async generateStudentNumber(universityCode: string): Promise<string> {
    const year = new Date().getFullYear();
    const { data, error } = await supabase
      .from('students')
      .select('student_number')
      .like('student_number', `${universityCode}${year}%`)
      .order('student_number', { ascending: false })
      .limit(1);

    if (error) throw error;

    let nextNumber = 1;
    if (data && data.length > 0) {
      const lastNumber = data[0].student_number;
      const numberPart = lastNumber.substring(universityCode.length + 4);
      nextNumber = parseInt(numberPart) + 1;
    }

    return `${universityCode}${year}${nextNumber.toString().padStart(4, '0')}`;
  }
}

export const studentService = new StudentService();