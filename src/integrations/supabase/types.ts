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
          category: string | null
          id: number
          name: string
          parameters: string | null
          price: number
        }
        Insert: {
          category?: string | null
          id?: number
          name: string
          parameters?: string | null
          price: number
        }
        Update: {
          category?: string | null
          id?: number
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
          id?: number
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
          id?: number
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
          id?: number
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
          id?: number
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
      users: {
        Row: {
          id: number
          password: string
          role: string
          username: string
        }
        Insert: {
          id?: number
          password: string
          role: string
          username: string
        }
        Update: {
          id?: number
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
