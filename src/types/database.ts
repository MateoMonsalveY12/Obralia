export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      budget_items: {
        Row: {
          chapter: string | null
          created_at: string | null
          description: string
          executed_quantity: number | null
          id: string
          item_code: string | null
          organization_id: string
          project_id: string
          quantity: number | null
          unit: string
          unit_price: number | null
          updated_at: string | null
        }
        Insert: {
          chapter?: string | null
          description: string
          executed_quantity?: number | null
          id?: string
          item_code?: string | null
          organization_id: string
          project_id: string
          quantity?: number | null
          unit: string
          unit_price?: number | null
        }
        Update: {
          chapter?: string | null
          description?: string
          executed_quantity?: number | null
          item_code?: string | null
          organization_id?: string
          project_id?: string
          quantity?: number | null
          unit?: string
          unit_price?: number | null
        }
        Relationships: []
      }
      demo_requests: {
        Row: {
          active_projects_count: string | null
          company_name: string
          company_type: string | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          message: string | null
          phone: string | null
          status: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          active_projects_count?: string | null
          company_name: string
          company_type?: string | null
          email: string
          full_name: string
          id?: string
          message?: string | null
          phone?: string | null
          status?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          active_projects_count?: string | null
          company_name?: string
          company_type?: string | null
          email?: string
          full_name?: string
          message?: string | null
          phone?: string | null
          status?: string | null
        }
        Relationships: []
      }
      interventoria_reports: {
        Row: {
          content: Json | null
          created_at: string | null
          created_by: string | null
          financial_advance_pct: number | null
          id: string
          observations: string | null
          organization_id: string
          period_end: string | null
          period_start: string | null
          physical_advance_pct: number | null
          project_id: string
          report_number: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          content?: Json | null
          created_by?: string | null
          financial_advance_pct?: number | null
          id?: string
          observations?: string | null
          organization_id: string
          period_end?: string | null
          period_start?: string | null
          physical_advance_pct?: number | null
          project_id: string
          report_number?: string | null
          type?: string | null
        }
        Update: {
          content?: Json | null
          financial_advance_pct?: number | null
          observations?: string | null
          period_end?: string | null
          period_start?: string | null
          physical_advance_pct?: number | null
          report_number?: string | null
          type?: string | null
        }
        Relationships: []
      }
      organization_members: {
        Row: {
          id: string
          invited_by: string | null
          joined_at: string | null
          organization_id: string
          role: string
          user_id: string
        }
        Insert: {
          id?: string
          invited_by?: string | null
          organization_id: string
          role: string
          user_id: string
        }
        Update: {
          role?: string
        }
        Relationships: []
      }
      organizations: {
        Row: {
          address: string | null
          city: string | null
          created_at: string | null
          department: string | null
          id: string
          logo_url: string | null
          name: string
          nit: string | null
          phone: string | null
          plan: string
          plan_expires_at: string | null
          slug: string
          type: string
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          department?: string | null
          id?: string
          logo_url?: string | null
          name: string
          nit?: string | null
          phone?: string | null
          plan?: string
          plan_expires_at?: string | null
          slug: string
          type: string
        }
        Update: {
          address?: string | null
          city?: string | null
          logo_url?: string | null
          name?: string
          nit?: string | null
          phone?: string | null
          plan?: string
          plan_expires_at?: string | null
          slug?: string
          type?: string
        }
        Relationships: []
      }
      personnel: {
        Row: {
          arl: string | null
          cedula: string | null
          created_at: string | null
          email: string | null
          entry_date: string | null
          eps: string | null
          exit_date: string | null
          full_name: string
          id: string
          is_active: boolean | null
          organization_id: string
          pension: string | null
          phone: string | null
          project_id: string | null
          role: string
          speciality: string | null
          updated_at: string | null
        }
        Insert: {
          arl?: string | null
          cedula?: string | null
          email?: string | null
          entry_date?: string | null
          eps?: string | null
          exit_date?: string | null
          full_name: string
          id?: string
          is_active?: boolean | null
          organization_id: string
          pension?: string | null
          phone?: string | null
          project_id?: string | null
          role: string
          speciality?: string | null
        }
        Update: {
          arl?: string | null
          cedula?: string | null
          email?: string | null
          entry_date?: string | null
          eps?: string | null
          exit_date?: string | null
          full_name?: string
          is_active?: boolean | null
          pension?: string | null
          phone?: string | null
          project_id?: string | null
          role?: string
          speciality?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          email: string
          full_name?: string | null
          id: string
          phone?: string | null
        }
        Update: {
          avatar_url?: string | null
          email?: string
          full_name?: string | null
          phone?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          address: string | null
          budget_total: number | null
          client_name: string | null
          code: string | null
          contract_number: string | null
          contract_value: number | null
          created_at: string | null
          created_by: string | null
          department: string | null
          description: string | null
          director_id: string | null
          end_date: string | null
          id: string
          latitude: number | null
          location: string | null
          longitude: number | null
          municipality: string | null
          name: string
          organization_id: string
          start_date: string | null
          status: string
          type: string
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          budget_total?: number | null
          client_name?: string | null
          code?: string | null
          contract_number?: string | null
          contract_value?: number | null
          created_by?: string | null
          department?: string | null
          description?: string | null
          director_id?: string | null
          end_date?: string | null
          id?: string
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          municipality?: string | null
          name: string
          organization_id: string
          start_date?: string | null
          status?: string
          type: string
        }
        Update: {
          address?: string | null
          budget_total?: number | null
          client_name?: string | null
          code?: string | null
          contract_number?: string | null
          contract_value?: number | null
          department?: string | null
          description?: string | null
          director_id?: string | null
          end_date?: string | null
          location?: string | null
          municipality?: string | null
          name?: string
          start_date?: string | null
          status?: string
          type?: string
        }
        Relationships: []
      }
      schedule_activities: {
        Row: {
          created_at: string | null
          description: string | null
          end_date: string
          id: string
          name: string
          organization_id: string
          parent_id: string | null
          progress_pct: number | null
          project_id: string
          responsible_id: string | null
          start_date: string
          updated_at: string | null
        }
        Insert: {
          description?: string | null
          end_date: string
          id?: string
          name: string
          organization_id: string
          parent_id?: string | null
          progress_pct?: number | null
          project_id: string
          responsible_id?: string | null
          start_date: string
        }
        Update: {
          description?: string | null
          end_date?: string
          name?: string
          parent_id?: string | null
          progress_pct?: number | null
          responsible_id?: string | null
          start_date?: string
        }
        Relationships: []
      }
      sst_documents: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          document_url: string | null
          id: string
          organization_id: string
          project_id: string | null
          responsible_id: string | null
          status: string | null
          title: string
          type: string
          updated_at: string | null
          valid_until: string | null
        }
        Insert: {
          created_by?: string | null
          description?: string | null
          document_url?: string | null
          id?: string
          organization_id: string
          project_id?: string | null
          responsible_id?: string | null
          status?: string | null
          title: string
          type: string
          valid_until?: string | null
        }
        Update: {
          description?: string | null
          document_url?: string | null
          responsible_id?: string | null
          status?: string | null
          title?: string
          type?: string
          valid_until?: string | null
        }
        Relationships: []
      }
      sst_incidents: {
        Row: {
          corrective_actions: string | null
          created_at: string | null
          created_by: string | null
          date: string
          description: string
          id: string
          incident_type: string
          injured_personnel_id: string | null
          location: string | null
          organization_id: string
          project_id: string
          reported_to_arl: boolean | null
          reported_to_mintrabajo: boolean | null
          root_cause: string | null
          severity: string | null
          updated_at: string | null
        }
        Insert: {
          corrective_actions?: string | null
          created_by?: string | null
          date: string
          description: string
          id?: string
          incident_type: string
          injured_personnel_id?: string | null
          location?: string | null
          organization_id: string
          project_id: string
          reported_to_arl?: boolean | null
          reported_to_mintrabajo?: boolean | null
          root_cause?: string | null
          severity?: string | null
        }
        Update: {
          corrective_actions?: string | null
          date?: string
          description?: string
          incident_type?: string
          injured_personnel_id?: string | null
          location?: string | null
          reported_to_arl?: boolean | null
          reported_to_mintrabajo?: boolean | null
          root_cause?: string | null
          severity?: string | null
        }
        Relationships: []
      }
      subcontractors: {
        Row: {
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          contract_end: string | null
          contract_start: string | null
          contract_value: number | null
          created_at: string | null
          id: string
          name: string
          nit: string | null
          organization_id: string
          project_id: string | null
          specialty: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          contract_end?: string | null
          contract_start?: string | null
          contract_value?: number | null
          id?: string
          name: string
          nit?: string | null
          organization_id: string
          project_id?: string | null
          specialty?: string | null
          status?: string | null
        }
        Update: {
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          contract_end?: string | null
          contract_start?: string | null
          contract_value?: number | null
          name?: string
          nit?: string | null
          project_id?: string | null
          specialty?: string | null
          status?: string | null
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: {
      get_org_role: { Args: { org_id: string }; Returns: string }
      is_org_member: { Args: { org_id: string }; Returns: boolean }
    }
    Enums: Record<string, never>
  }
}

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type TablesInsert<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert']

export type TablesUpdate<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update']
