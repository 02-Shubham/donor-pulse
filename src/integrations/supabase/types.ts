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
      blood_bank_inventory: {
        Row: {
          blood_type: Database["public"]["Enums"]["blood_type"]
          created_at: string | null
          hospital_id: string | null
          id: string
          last_updated_by: string | null
          units_available: number
          updated_at: string | null
        }
        Insert: {
          blood_type: Database["public"]["Enums"]["blood_type"]
          created_at?: string | null
          hospital_id?: string | null
          id?: string
          last_updated_by?: string | null
          units_available?: number
          updated_at?: string | null
        }
        Update: {
          blood_type?: Database["public"]["Enums"]["blood_type"]
          created_at?: string | null
          hospital_id?: string | null
          id?: string
          last_updated_by?: string | null
          units_available?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blood_bank_inventory_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blood_bank_inventory_last_updated_by_fkey"
            columns: ["last_updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      blood_requests: {
        Row: {
          blood_type: Database["public"]["Enums"]["blood_type"]
          contact_name: string
          contact_phone: string
          created_at: string | null
          hospital_address: string
          hospital_latitude: number
          hospital_longitude: number
          hospital_name: string
          id: string
          matched_donor_id: string | null
          notes: string | null
          requestor_id: string | null
          status: Database["public"]["Enums"]["request_status"] | null
          units_needed: number
          updated_at: string | null
          urgency_level: string
        }
        Insert: {
          blood_type: Database["public"]["Enums"]["blood_type"]
          contact_name: string
          contact_phone: string
          created_at?: string | null
          hospital_address: string
          hospital_latitude: number
          hospital_longitude: number
          hospital_name: string
          id?: string
          matched_donor_id?: string | null
          notes?: string | null
          requestor_id?: string | null
          status?: Database["public"]["Enums"]["request_status"] | null
          units_needed: number
          updated_at?: string | null
          urgency_level: string
        }
        Update: {
          blood_type?: Database["public"]["Enums"]["blood_type"]
          contact_name?: string
          contact_phone?: string
          created_at?: string | null
          hospital_address?: string
          hospital_latitude?: number
          hospital_longitude?: number
          hospital_name?: string
          id?: string
          matched_donor_id?: string | null
          notes?: string | null
          requestor_id?: string | null
          status?: Database["public"]["Enums"]["request_status"] | null
          units_needed?: number
          updated_at?: string | null
          urgency_level?: string
        }
        Relationships: [
          {
            foreignKeyName: "blood_requests_matched_donor_id_fkey"
            columns: ["matched_donor_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blood_requests_requestor_id_fkey"
            columns: ["requestor_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      donations: {
        Row: {
          blood_type: Database["public"]["Enums"]["blood_type"]
          created_at: string | null
          donation_date: string
          donor_id: string | null
          hospital_id: string | null
          id: string
          notes: string | null
          request_id: string | null
          units_donated: number
        }
        Insert: {
          blood_type: Database["public"]["Enums"]["blood_type"]
          created_at?: string | null
          donation_date: string
          donor_id?: string | null
          hospital_id?: string | null
          id?: string
          notes?: string | null
          request_id?: string | null
          units_donated: number
        }
        Update: {
          blood_type?: Database["public"]["Enums"]["blood_type"]
          created_at?: string | null
          donation_date?: string
          donor_id?: string | null
          hospital_id?: string | null
          id?: string
          notes?: string | null
          request_id?: string | null
          units_donated?: number
        }
        Relationships: [
          {
            foreignKeyName: "donations_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donations_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donations_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "blood_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          address: string | null
          blood_type: Database["public"]["Enums"]["blood_type"] | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          is_available: boolean | null
          last_donation_date: string | null
          latitude: number | null
          longitude: number | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          blood_type?: Database["public"]["Enums"]["blood_type"] | null
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          is_available?: boolean | null
          last_donation_date?: string | null
          latitude?: number | null
          longitude?: number | null
          phone?: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          blood_type?: Database["public"]["Enums"]["blood_type"] | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          is_available?: boolean | null
          last_donation_date?: string | null
          latitude?: number | null
          longitude?: number | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      nearby_donors: {
        Args: {
          request_latitude: number
          request_longitude: number
          radius_km: number
          required_blood_type: Database["public"]["Enums"]["blood_type"]
        }
        Returns: {
          id: string
          distance_km: number
          full_name: string
          blood_type: Database["public"]["Enums"]["blood_type"]
          phone: string
        }[]
      }
    }
    Enums: {
      blood_type:
        | "A_POSITIVE"
        | "A_NEGATIVE"
        | "B_POSITIVE"
        | "B_NEGATIVE"
        | "AB_POSITIVE"
        | "AB_NEGATIVE"
        | "O_POSITIVE"
        | "O_NEGATIVE"
      request_status: "PENDING" | "MATCHED" | "COMPLETED" | "CANCELLED"
      user_role: "DONOR" | "HOSPITAL" | "RECIPIENT"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
