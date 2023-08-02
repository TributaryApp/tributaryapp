export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Projects: {
        Row: {
          about: string | null
          coverphoto: string | null
          created_at: string | null
          created_by: string | null
          id: number
          name: string | null
          photo: string | null
          slug: string | null
        }
        Insert: {
          about?: string | null
          coverphoto?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: number
          name?: string | null
          photo?: string | null
          slug?: string | null
        }
        Update: {
          about?: string | null
          coverphoto?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: number
          name?: string | null
          photo?: string | null
          slug?: string | null
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
