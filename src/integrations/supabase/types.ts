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
      access_logs: {
        Row: {
          action: string
          action_timestamp: string | null
          id: number
          parameters: string | null
          success: boolean
          user_id: number | null
        }
        Insert: {
          action: string
          action_timestamp?: string | null
          id?: never
          parameters?: string | null
          success: boolean
          user_id?: number | null
        }
        Update: {
          action?: string
          action_timestamp?: string | null
          id?: never
          parameters?: string | null
          success?: boolean
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "access_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ingredients: {
        Row: {
          category_name: string | null
          cost_per_unit: number
          expiry_date: string | null
          id: number
          low_stock_threshold: number
          name: string
          quantity: number
          unit: string
        }
        Insert: {
          category_name?: string | null
          cost_per_unit: number
          expiry_date?: string | null
          id?: never
          low_stock_threshold: number
          name: string
          quantity: number
          unit: string
        }
        Update: {
          category_name?: string | null
          cost_per_unit?: number
          expiry_date?: string | null
          id?: never
          low_stock_threshold?: number
          name?: string
          quantity?: number
          unit?: string
        }
        Relationships: []
      }
      menu_ingredients: {
        Row: {
          id: number
          ingredient_id: number
          menu_item_id: number
          quantity_used: number
        }
        Insert: {
          id?: never
          ingredient_id: number
          menu_item_id: number
          quantity_used: number
        }
        Update: {
          id?: never
          ingredient_id?: number
          menu_item_id?: number
          quantity_used?: number
        }
        Relationships: [
          {
            foreignKeyName: "menu_ingredients_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "menu_ingredients_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          },
        ]
      }
      menu_items: {
        Row: {
          category: string | null
          id: number
          name: string
          parameters: string | null
          price: number
        }
        Insert: {
          category?: string | null
          id?: never
          name: string
          parameters?: string | null
          price: number
        }
        Update: {
          category?: string | null
          id?: never
          name?: string
          parameters?: string | null
          price?: number
        }
        Relationships: []
      }
      reports_expenses: {
        Row: {
          action_timestamp: string | null
          category: string | null
          entry_date: string
          entry_type: string
          id: number
          notes: string | null
          parameters: string | null
          performed_by: number | null
          report_type: string | null
          total: number | null
        }
        Insert: {
          action_timestamp?: string | null
          category?: string | null
          entry_date: string
          entry_type: string
          id?: never
          notes?: string | null
          parameters?: string | null
          performed_by?: number | null
          report_type?: string | null
          total?: number | null
        }
        Update: {
          action_timestamp?: string | null
          category?: string | null
          entry_date?: string
          entry_type?: string
          id?: never
          notes?: string | null
          parameters?: string | null
          performed_by?: number | null
          report_type?: string | null
          total?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_expenses_performed_by_fkey"
            columns: ["performed_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      sale_items: {
        Row: {
          category: string | null
          id: number
          menu_item_id: number
          parameters: string | null
          quantity: number
          sales_id: number
          unit_price: number
        }
        Insert: {
          category?: string | null
          id?: never
          menu_item_id: number
          parameters?: string | null
          quantity: number
          sales_id: number
          unit_price: number
        }
        Update: {
          category?: string | null
          id?: never
          menu_item_id?: number
          parameters?: string | null
          quantity?: number
          sales_id?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "sale_items_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sale_items_sales_id_fkey"
            columns: ["sales_id"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["id"]
          },
        ]
      }
      sales: {
        Row: {
          action_timestamp: string | null
          amount_paid: number
          customer_name: string | null
          date: string
          id: number
          parameters: string | null
          payment_date: string
          payment_method: string
          payment_ref: string | null
          performed_by: number | null
          phone_number: number | null
        }
        Insert: {
          action_timestamp?: string | null
          amount_paid: number
          customer_name?: string | null
          date: string
          id?: never
          parameters?: string | null
          payment_date: string
          payment_method: string
          payment_ref?: string | null
          performed_by?: number | null
          phone_number?: number | null
        }
        Update: {
          action_timestamp?: string | null
          amount_paid?: number
          customer_name?: string | null
          date?: string
          id?: never
          parameters?: string | null
          payment_date?: string
          payment_method?: string
          payment_ref?: string | null
          performed_by?: number | null
          phone_number?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_performed_by_fkey"
            columns: ["performed_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: number
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          id: number
          password: string
          role: string
          username: string
        }
        Insert: {
          id?: never
          password: string
          role: string
          username: string
        }
        Update: {
          id?: never
          password?: string
          role?: string
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { _user_id: number }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: number
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "manager" | "staff"
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
      app_role: ["admin", "manager", "staff"],
    },
  },
} as const
