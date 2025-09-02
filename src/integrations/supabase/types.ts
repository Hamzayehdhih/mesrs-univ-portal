export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      academic_years: {
        Row: {
          created_at: string
          end_date: string
          id: string
          is_current: boolean | null
          name: string
          start_date: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          end_date: string
          id?: string
          is_current?: boolean | null
          name: string
          start_date: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          end_date?: string
          id?: string
          is_current?: boolean | null
          name?: string
          start_date?: string
          updated_at?: string
        }
        Relationships: []
      }
      activity_logs: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          id: string
          ip_address: unknown | null
          resource_id: string | null
          resource_type: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource_id?: string | null
          resource_type: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource_id?: string | null
          resource_type?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      courses: {
        Row: {
          academic_year_id: string
          code: string
          created_at: string
          credits: number
          description: string | null
          formation_id: string
          id: string
          max_students: number | null
          name: string
          schedule: Json | null
          semester: number
          teacher_id: string | null
          updated_at: string
        }
        Insert: {
          academic_year_id: string
          code: string
          created_at?: string
          credits?: number
          description?: string | null
          formation_id: string
          id?: string
          max_students?: number | null
          name: string
          schedule?: Json | null
          semester?: number
          teacher_id?: string | null
          updated_at?: string
        }
        Update: {
          academic_year_id?: string
          code?: string
          created_at?: string
          credits?: number
          description?: string | null
          formation_id?: string
          id?: string
          max_students?: number | null
          name?: string
          schedule?: Json | null
          semester?: number
          teacher_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "courses_academic_year_id_fkey"
            columns: ["academic_year_id"]
            isOneToOne: false
            referencedRelation: "academic_years"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courses_formation_id_fkey"
            columns: ["formation_id"]
            isOneToOne: false
            referencedRelation: "formations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courses_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      enrollments: {
        Row: {
          academic_year_id: string
          created_at: string
          enrollment_date: string | null
          formation_id: string
          id: string
          notes: string | null
          status: Database["public"]["Enums"]["enrollment_status"]
          student_id: string
          updated_at: string
          validated_by: string | null
          validation_date: string | null
        }
        Insert: {
          academic_year_id: string
          created_at?: string
          enrollment_date?: string | null
          formation_id: string
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["enrollment_status"]
          student_id: string
          updated_at?: string
          validated_by?: string | null
          validation_date?: string | null
        }
        Update: {
          academic_year_id?: string
          created_at?: string
          enrollment_date?: string | null
          formation_id?: string
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["enrollment_status"]
          student_id?: string
          updated_at?: string
          validated_by?: string | null
          validation_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_academic_year_id_fkey"
            columns: ["academic_year_id"]
            isOneToOne: false
            referencedRelation: "academic_years"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_formation_id_fkey"
            columns: ["formation_id"]
            isOneToOne: false
            referencedRelation: "formations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_validated_by_fkey"
            columns: ["validated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      exam_results: {
        Row: {
          comments: string | null
          created_at: string
          exam_id: string
          grade: string | null
          id: string
          is_passed: boolean | null
          score: number | null
          student_id: string
          updated_at: string
        }
        Insert: {
          comments?: string | null
          created_at?: string
          exam_id: string
          grade?: string | null
          id?: string
          is_passed?: boolean | null
          score?: number | null
          student_id: string
          updated_at?: string
        }
        Update: {
          comments?: string | null
          created_at?: string
          exam_id?: string
          grade?: string | null
          id?: string
          is_passed?: boolean | null
          score?: number | null
          student_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "exam_results_exam_id_fkey"
            columns: ["exam_id"]
            isOneToOne: false
            referencedRelation: "exams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exam_results_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      exams: {
        Row: {
          coefficient: number | null
          course_id: string
          created_at: string
          end_time: string
          exam_date: string
          id: string
          instructions: string | null
          location: string | null
          max_score: number | null
          name: string
          session: Database["public"]["Enums"]["exam_session"]
          start_time: string
          updated_at: string
        }
        Insert: {
          coefficient?: number | null
          course_id: string
          created_at?: string
          end_time: string
          exam_date: string
          id?: string
          instructions?: string | null
          location?: string | null
          max_score?: number | null
          name: string
          session?: Database["public"]["Enums"]["exam_session"]
          start_time: string
          updated_at?: string
        }
        Update: {
          coefficient?: number | null
          course_id?: string
          created_at?: string
          end_time?: string
          exam_date?: string
          id?: string
          instructions?: string | null
          location?: string | null
          max_score?: number | null
          name?: string
          session?: Database["public"]["Enums"]["exam_session"]
          start_time?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "exams_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      formations: {
        Row: {
          capacity: number | null
          code: string
          created_at: string
          credits: number
          description: string | null
          duration_years: number
          id: string
          is_active: boolean | null
          name: string
          university_id: string
          updated_at: string
        }
        Insert: {
          capacity?: number | null
          code: string
          created_at?: string
          credits?: number
          description?: string | null
          duration_years?: number
          id?: string
          is_active?: boolean | null
          name: string
          university_id: string
          updated_at?: string
        }
        Update: {
          capacity?: number | null
          code?: string
          created_at?: string
          credits?: number
          description?: string | null
          duration_years?: number
          id?: string
          is_active?: boolean | null
          name?: string
          university_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "formations_university_id_fkey"
            columns: ["university_id"]
            isOneToOne: false
            referencedRelation: "universities"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          created_at: string
          date_of_birth: string | null
          email: string
          first_name: string
          id: string
          is_active: boolean | null
          last_name: string
          national_id: string | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          created_at?: string
          date_of_birth?: string | null
          email: string
          first_name: string
          id?: string
          is_active?: boolean | null
          last_name: string
          national_id?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string
          first_name?: string
          id?: string
          is_active?: boolean | null
          last_name?: string
          national_id?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      scholarship_applications: {
        Row: {
          application_date: string | null
          comments: string | null
          created_at: string
          decision_by: string | null
          decision_date: string | null
          documents: Json | null
          id: string
          motivation_letter: string | null
          scholarship_id: string
          score: number | null
          status: Database["public"]["Enums"]["application_status"]
          student_id: string
          updated_at: string
        }
        Insert: {
          application_date?: string | null
          comments?: string | null
          created_at?: string
          decision_by?: string | null
          decision_date?: string | null
          documents?: Json | null
          id?: string
          motivation_letter?: string | null
          scholarship_id: string
          score?: number | null
          status?: Database["public"]["Enums"]["application_status"]
          student_id: string
          updated_at?: string
        }
        Update: {
          application_date?: string | null
          comments?: string | null
          created_at?: string
          decision_by?: string | null
          decision_date?: string | null
          documents?: Json | null
          id?: string
          motivation_letter?: string | null
          scholarship_id?: string
          score?: number | null
          status?: Database["public"]["Enums"]["application_status"]
          student_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "scholarship_applications_decision_by_fkey"
            columns: ["decision_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scholarship_applications_scholarship_id_fkey"
            columns: ["scholarship_id"]
            isOneToOne: false
            referencedRelation: "scholarships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scholarship_applications_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      scholarships: {
        Row: {
          academic_year_id: string
          amount: number
          created_at: string
          criteria: string | null
          deadline: string
          description: string | null
          duration_months: number
          id: string
          is_active: boolean | null
          max_recipients: number | null
          name: string
          type: Database["public"]["Enums"]["scholarship_type"]
          updated_at: string
        }
        Insert: {
          academic_year_id: string
          amount: number
          created_at?: string
          criteria?: string | null
          deadline: string
          description?: string | null
          duration_months?: number
          id?: string
          is_active?: boolean | null
          max_recipients?: number | null
          name: string
          type: Database["public"]["Enums"]["scholarship_type"]
          updated_at?: string
        }
        Update: {
          academic_year_id?: string
          amount?: number
          created_at?: string
          criteria?: string | null
          deadline?: string
          description?: string | null
          duration_months?: number
          id?: string
          is_active?: boolean | null
          max_recipients?: number | null
          name?: string
          type?: Database["public"]["Enums"]["scholarship_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "scholarships_academic_year_id_fkey"
            columns: ["academic_year_id"]
            isOneToOne: false
            referencedRelation: "academic_years"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          academic_year_id: string | null
          created_at: string
          enrollment_date: string | null
          formation_id: string | null
          gpa: number | null
          graduation_date: string | null
          id: string
          is_graduated: boolean | null
          level: number | null
          profile_id: string
          student_number: string
          university_id: string
          updated_at: string
        }
        Insert: {
          academic_year_id?: string | null
          created_at?: string
          enrollment_date?: string | null
          formation_id?: string | null
          gpa?: number | null
          graduation_date?: string | null
          id?: string
          is_graduated?: boolean | null
          level?: number | null
          profile_id: string
          student_number: string
          university_id: string
          updated_at?: string
        }
        Update: {
          academic_year_id?: string | null
          created_at?: string
          enrollment_date?: string | null
          formation_id?: string | null
          gpa?: number | null
          graduation_date?: string | null
          id?: string
          is_graduated?: boolean | null
          level?: number | null
          profile_id?: string
          student_number?: string
          university_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "students_academic_year_id_fkey"
            columns: ["academic_year_id"]
            isOneToOne: false
            referencedRelation: "academic_years"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_formation_id_fkey"
            columns: ["formation_id"]
            isOneToOne: false
            referencedRelation: "formations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_university_id_fkey"
            columns: ["university_id"]
            isOneToOne: false
            referencedRelation: "universities"
            referencedColumns: ["id"]
          },
        ]
      }
      teachers: {
        Row: {
          created_at: string
          department: string | null
          employee_number: string
          hire_date: string | null
          id: string
          profile_id: string
          salary: number | null
          specialization: string | null
          title: string | null
          university_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          department?: string | null
          employee_number: string
          hire_date?: string | null
          id?: string
          profile_id: string
          salary?: number | null
          specialization?: string | null
          title?: string | null
          university_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          department?: string | null
          employee_number?: string
          hire_date?: string | null
          id?: string
          profile_id?: string
          salary?: number | null
          specialization?: string | null
          title?: string | null
          university_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "teachers_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teachers_university_id_fkey"
            columns: ["university_id"]
            isOneToOne: false
            referencedRelation: "universities"
            referencedColumns: ["id"]
          },
        ]
      }
      universities: {
        Row: {
          address: string | null
          code: string
          created_at: string
          email: string | null
          id: string
          is_active: boolean | null
          latitude: number | null
          longitude: number | null
          name: string
          phone: string | null
          rector_name: string | null
          student_count: number | null
          updated_at: string
          website: string | null
        }
        Insert: {
          address?: string | null
          code: string
          created_at?: string
          email?: string | null
          id?: string
          is_active?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name: string
          phone?: string | null
          rector_name?: string | null
          student_count?: number | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: string | null
          code?: string
          created_at?: string
          email?: string | null
          id?: string
          is_active?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name?: string
          phone?: string | null
          rector_name?: string | null
          student_count?: number | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["user_role"]
      }
      get_dashboard_stats: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_enrollment_stats_by_formation: {
        Args: Record<PropertyKey, never>
        Returns: {
          formation_name: string
          student_count: number
        }[]
      }
      get_university_stats: {
        Args: Record<PropertyKey, never>
        Returns: {
          student_count: number
          teacher_count: number
          university_name: string
        }[]
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_student: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_teacher: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      log_activity: {
        Args: {
          action_name: string
          details_json?: Json
          resource_id_value?: string
          resource_type_name: string
        }
        Returns: undefined
      }
    }
    Enums: {
      application_status: "pending" | "approved" | "rejected"
      enrollment_status:
        | "pending"
        | "approved"
        | "rejected"
        | "active"
        | "completed"
      exam_session: "normal" | "catch_up"
      scholarship_type: "excellence" | "social" | "research"
      user_role: "admin" | "student" | "teacher" | "staff"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      application_status: ["pending", "approved", "rejected"],
      enrollment_status: [
        "pending",
        "approved",
        "rejected",
        "active",
        "completed",
      ],
      exam_session: ["normal", "catch_up"],
      scholarship_type: ["excellence", "social", "research"],
      user_role: ["admin", "student", "teacher", "staff"],
    },
  },
} as const
