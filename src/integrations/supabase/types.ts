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
      article_comments: {
        Row: {
          comment_text: string
          content_id: string
          created_at: string
          id: string
          parent_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          comment_text: string
          content_id: string
          created_at?: string
          id?: string
          parent_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          comment_text?: string
          content_id?: string
          created_at?: string
          id?: string
          parent_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "article_comments_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "article_comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "article_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "article_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      article_interactions: {
        Row: {
          content_id: string
          created_at: string
          id: string
          interaction_type: string
          user_id: string | null
        }
        Insert: {
          content_id: string
          created_at?: string
          id?: string
          interaction_type: string
          user_id?: string | null
        }
        Update: {
          content_id?: string
          created_at?: string
          id?: string
          interaction_type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "article_interactions_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "article_interactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      audios: {
        Row: {
          author: string
          categories: string[] | null
          cover_image: string | null
          created_at: string
          description: string | null
          duration: string | null
          file_url: string
          id: string
          title: string
          updated_at: string
        }
        Insert: {
          author: string
          categories?: string[] | null
          cover_image?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          file_url: string
          id?: string
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          categories?: string[] | null
          cover_image?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          file_url?: string
          id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      author_profiles: {
        Row: {
          created_at: string
          expertise: string[] | null
          featured: boolean | null
          id: string
          publications_count: number | null
          qualification: string | null
          social_links: Json | null
          updated_at: string
          verified: boolean | null
        }
        Insert: {
          created_at?: string
          expertise?: string[] | null
          featured?: boolean | null
          id: string
          publications_count?: number | null
          qualification?: string | null
          social_links?: Json | null
          updated_at?: string
          verified?: boolean | null
        }
        Update: {
          created_at?: string
          expertise?: string[] | null
          featured?: boolean | null
          id?: string
          publications_count?: number | null
          qualification?: string | null
          social_links?: Json | null
          updated_at?: string
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "author_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      community_join_requests: {
        Row: {
          areas_of_interest: string | null
          email: string
          full_name: string
          id: string
          status: string | null
          submitted_at: string
        }
        Insert: {
          areas_of_interest?: string | null
          email: string
          full_name: string
          id?: string
          status?: string | null
          submitted_at?: string
        }
        Update: {
          areas_of_interest?: string | null
          email?: string
          full_name?: string
          id?: string
          status?: string | null
          submitted_at?: string
        }
        Relationships: []
      }
      content: {
        Row: {
          additional_images: string[] | null
          author_id: string | null
          category_id: string | null
          cover_image: string | null
          created_at: string
          description: string | null
          educational_metadata: Json | null
          featured: boolean | null
          id: string
          likes_count: number | null
          location: string | null
          main_content: string | null
          published: boolean | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string
          video_type: string | null
          video_url: string | null
          views_count: number | null
        }
        Insert: {
          additional_images?: string[] | null
          author_id?: string | null
          category_id?: string | null
          cover_image?: string | null
          created_at?: string
          description?: string | null
          educational_metadata?: Json | null
          featured?: boolean | null
          id?: string
          likes_count?: number | null
          location?: string | null
          main_content?: string | null
          published?: boolean | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string
          video_type?: string | null
          video_url?: string | null
          views_count?: number | null
        }
        Update: {
          additional_images?: string[] | null
          author_id?: string | null
          category_id?: string | null
          cover_image?: string | null
          created_at?: string
          description?: string | null
          educational_metadata?: Json | null
          featured?: boolean | null
          id?: string
          likes_count?: number | null
          location?: string | null
          main_content?: string | null
          published?: boolean | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          video_type?: string | null
          video_url?: string | null
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "content_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "author_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      interaction_counts: {
        Row: {
          content_id: string
          created_at: string
          id: string
          likes_count: number | null
          saves_count: number | null
          shares_count: number | null
          updated_at: string
          views_count: number | null
        }
        Insert: {
          content_id: string
          created_at?: string
          id?: string
          likes_count?: number | null
          saves_count?: number | null
          shares_count?: number | null
          updated_at?: string
          views_count?: number | null
        }
        Update: {
          content_id?: string
          created_at?: string
          id?: string
          likes_count?: number | null
          saves_count?: number | null
          shares_count?: number | null
          updated_at?: string
          views_count?: number | null
        }
        Relationships: []
      }
      kids_stories: {
        Row: {
          age_group: string
          author_id: string
          category: string
          content: string | null
          created_at: string
          description: string
          duration: string
          featured: boolean | null
          id: string
          likes_count: number | null
          published: boolean | null
          thumbnail_url: string
          title: string
          updated_at: string
          video_url: string | null
          views_count: number | null
        }
        Insert: {
          age_group: string
          author_id: string
          category: string
          content?: string | null
          created_at?: string
          description: string
          duration: string
          featured?: boolean | null
          id?: string
          likes_count?: number | null
          published?: boolean | null
          thumbnail_url: string
          title: string
          updated_at?: string
          video_url?: string | null
          views_count?: number | null
        }
        Update: {
          age_group?: string
          author_id?: string
          category?: string
          content?: string | null
          created_at?: string
          description?: string
          duration?: string
          featured?: boolean | null
          id?: string
          likes_count?: number | null
          published?: boolean | null
          thumbnail_url?: string
          title?: string
          updated_at?: string
          video_url?: string | null
          views_count?: number | null
        }
        Relationships: []
      }
      newsletter_subscriptions: {
        Row: {
          email: string
          id: string
          is_active: boolean | null
          subscribed_at: string
        }
        Insert: {
          email: string
          id?: string
          is_active?: boolean | null
          subscribed_at?: string
        }
        Update: {
          email?: string
          id?: string
          is_active?: boolean | null
          subscribed_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          location: string | null
          updated_at: string
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          location?: string | null
          updated_at?: string
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          location?: string | null
          updated_at?: string
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
      thought_comments: {
        Row: {
          avatar_url: string | null
          comment_text: string
          created_at: string
          id: string
          thought_id: string | null
          user_id: string | null
          username: string
        }
        Insert: {
          avatar_url?: string | null
          comment_text: string
          created_at?: string
          id?: string
          thought_id?: string | null
          user_id?: string | null
          username: string
        }
        Update: {
          avatar_url?: string | null
          comment_text?: string
          created_at?: string
          id?: string
          thought_id?: string | null
          user_id?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "thought_comments_thought_id_fkey"
            columns: ["thought_id"]
            isOneToOne: false
            referencedRelation: "thoughts"
            referencedColumns: ["id"]
          },
        ]
      }
      thought_likes: {
        Row: {
          created_at: string
          id: string
          thought_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          thought_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          thought_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "thought_likes_thought_id_fkey"
            columns: ["thought_id"]
            isOneToOne: false
            referencedRelation: "thoughts"
            referencedColumns: ["id"]
          },
        ]
      }
      thoughts: {
        Row: {
          avatar_url: string | null
          content: string
          created_at: string
          id: string
          likes_count: number | null
          updated_at: string
          user_id: string | null
          username: string
        }
        Insert: {
          avatar_url?: string | null
          content: string
          created_at?: string
          id?: string
          likes_count?: number | null
          updated_at?: string
          user_id?: string | null
          username: string
        }
        Update: {
          avatar_url?: string | null
          content?: string
          created_at?: string
          id?: string
          likes_count?: number | null
          updated_at?: string
          user_id?: string | null
          username?: string
        }
        Relationships: []
      }
      videos: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          duration: string | null
          embed_id: string
          id: string
          thumbnail: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          embed_id: string
          id?: string
          thumbnail?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          embed_id?: string
          id?: string
          thumbnail?: string | null
          title?: string
          updated_at?: string
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
