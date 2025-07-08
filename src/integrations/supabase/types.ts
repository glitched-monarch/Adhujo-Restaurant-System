export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
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
          id?: number
          parameters?: string | null
          success: boolean
          user_id?: number | null
        }
        Update: {
          action?: string
          action_timestamp?: string | null
          id?: number
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
          id?: number
          low_stock_threshold: number
          name: string
          quantity: number
          unit: string
        }
        Update: {
          category_name?: string | null
          cost_per_unit?: number
          expiry_date?: string | null
          id?: number
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
          id?: number
          ingredient_id: number
          menu_item_id: number
          quantity_used: number
        }
        Update: {
          id?: number
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
          availability: boolean | null
          category: string | null
          created_at: string | null
          description: string | null
          id: number
          name: string
          parameters: string | null
          price: number
          updated_at: string | null
        }
        Insert: {
          availability?: boolean | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          name: string
          parameters?: string | null
          price: number
          updated_at?: string | null
        }
        Update: {
          availability?: boolean | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
          parameters?: string | null
          price?: number
          updated_at?: string | null
        }
        Relationships: []
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
          id?: number
          menu_item_id: number
          parameters?: string | null
          quantity: number
          sales_id: number
          unit_price: number
        }
        Update: {
          category?: string | null
          id?: number
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
      sale_refunds: {
        Row: {
          id: number
          original_sale_id: number | null
          reason: string | null
          refund_amount: number
          refund_date: string | null
          refunded_by: number | null
        }
        Insert: {
          id?: number
          original_sale_id?: number | null
          reason?: string | null
          refund_amount: number
          refund_date?: string | null
          refunded_by?: number | null
        }
        Update: {
          id?: number
          original_sale_id?: number | null
          reason?: string | null
          refund_amount?: number
          refund_date?: string | null
          refunded_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sale_refunds_original_sale_id_fkey"
            columns: ["original_sale_id"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sale_refunds_refunded_by_fkey"
            columns: ["refunded_by"]
            isOneToOne: false
            referencedRelation: "users"
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
          status: string | null
          subtotal: number | null
          tax_amount: number | null
          total_amount: number | null
        }
        Insert: {
          action_timestamp?: string | null
          amount_paid: number
          customer_name?: string | null
          date: string
          id?: number
          parameters?: string | null
          payment_date: string
          payment_method: string
          payment_ref?: string | null
          performed_by?: number | null
          phone_number?: number | null
          status?: string | null
          subtotal?: number | null
          tax_amount?: number | null
          total_amount?: number | null
        }
        Update: {
          action_timestamp?: string | null
          amount_paid?: number
          customer_name?: string | null
          date?: string
          id?: number
          parameters?: string | null
          payment_date?: string
          payment_method?: string
          payment_ref?: string | null
          performed_by?: number | null
          phone_number?: number | null
          status?: string | null
          subtotal?: number | null
          tax_amount?: number | null
          total_amount?: number | null
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
      system_settings: {
        Row: {
          description: string | null
          id: number
          setting_key: string
          setting_value: string
          updated_at: string | null
        }
        Insert: {
          description?: string | null
          id?: number
          setting_key: string
          setting_value: string
          updated_at?: string | null
        }
        Update: {
          description?: string | null
          id?: number
          setting_key?: string
          setting_value?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          id: number
          id_number: string | null
          NameOfUser: string | null
          password: string
          phone_number: string | null
          role: string
          username: string
        }
        Insert: {
          id?: number
          id_number?: string | null
          NameOfUser?: string | null
          password: string
          phone_number?: string | null
          role: string
          username: string
        }
        Update: {
          id?: number
          id_number?: string | null
          NameOfUser?: string | null
          password?: string
          phone_number?: string | null
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
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
