export type VerificationStatus = 'pending' | 'verified' | 'rejected';
export type InquiryStatus = 'new' | 'read' | 'replied' | 'closed';
export type CategoryGroup = 'pertunjukan' | 'kriya' | 'konsultan';

export interface Category {
  id: number;
  slug: string;
  name: string;
  group_name: CategoryGroup;
  description?: string;
  sort_order: number;
}

export interface RateCard {
  id: number;
  category_id: number;
  service_name: string;
  unit: string;
  min_price: number;
  max_price: number;
  notes?: string;
}

export interface PortfolioItem {
  id: string;
  talent_id: string;
  title: string;
  description?: string;
  image_url: string;
  year?: number;
}

export interface TalentService {
  talent_id: string;
  rate_card_id: number;
  custom_title?: string;
  price: number;
  rate_card?: RateCard;
}

export interface Talent {
  id: string;
  user_id: string;
  slug: string;
  display_name: string;
  headline?: string;
  bio?: string;
  category_id: number;
  category?: Category;
  city: string;
  province: string;
  avatar_url?: string;
  whatsapp?: string;
  experience_years?: number;
  verification_status: VerificationStatus;
  is_featured: boolean;
  created_at: string;
  portfolio_items?: PortfolioItem[];
  talent_services?: TalentService[];
}

export interface Studio {
  id: string;
  owner_id: string;
  slug: string;
  name: string;
  description?: string;
  city: string;
  province: string;
  address?: string;
  whatsapp?: string;
  cover_url?: string;
  verification_status: VerificationStatus;
  created_at: string;
}

export interface Inquiry {
  id: string;
  talent_id: string;
  client_name: string;
  client_email: string;
  client_company?: string;
  service_requested?: string;
  message: string;
  status: InquiryStatus;
  created_at: string;
}
