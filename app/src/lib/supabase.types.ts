// Supabase TypeScript types generated from the database schema.
// Regenerate with: bunx supabase gen types typescript --project-id YOUR_PROJECT_ID

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          price: number;
          original_price: number | null;
          product_type: "physical" | "combo";
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["products"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["products"]["Insert"]>;
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          customer_name: string;
          phone: string;
          email: string;
          delivery_address: string | null;
          city: string | null;
          state: string | null;
          pincode: string | null;
          subtotal: number;
          discount_amount: number;
          final_amount: number;
          order_status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
          payment_status: "pending" | "paid" | "failed" | "refunded";
          razorpay_order_id: string | null;
          razorpay_payment_id: string | null;
          payment_verified_at: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["orders"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["orders"]["Insert"]>;
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          product_name_snapshot: string;
          quantity: number;
          unit_price: number;
          total_price: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["order_items"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["order_items"]["Insert"]>;
      };
      admin_users: {
        Row: {
          id: string;
          email: string;
          password_hash: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["admin_users"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["admin_users"]["Insert"]>;
      };
    };
  };
}
