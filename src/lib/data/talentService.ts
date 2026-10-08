import { MOCK_CATEGORIES, MOCK_RATE_CARDS, MOCK_TALENTS, MOCK_STUDIOS } from './mockData';
import { Talent, Category, RateCard, Studio } from '@/types/database';
import { createClient } from '@/lib/supabase/server';

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();
  if (supabase) {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true });
    if (!error && data && data.length > 0) return data;
  }
  return MOCK_CATEGORIES;
}

export async function getRateCards(categoryId?: number): Promise<RateCard[]> {
  const supabase = await createClient();
  if (supabase) {
    let query = supabase.from('rate_cards').select('*');
    if (categoryId) query = query.eq('category_id', categoryId);
    const { data, error } = await query;
    if (!error && data && data.length > 0) return data;
  }
  if (categoryId) {
    return MOCK_RATE_CARDS.filter(r => r.category_id === categoryId);
  }
  return MOCK_RATE_CARDS;
}

export async function getTalents(params?: {
  kategori?: string;
  kota?: string;
  q?: string;
}): Promise<Talent[]> {
  const supabase = await createClient();
  if (supabase) {
    let query = supabase
      .from('talents')
      .select('*, categories(*), portfolio_items(*), talent_services(*, rate_cards(*))')
      .eq('verification_status', 'verified');

    if (params?.q) {
      query = query.ilike('display_name', `%${params.q}%`);
    }
    if (params?.kota) {
      query = query.ilike('city', `%${params.kota}%`);
    }

    const { data, error } = await query;
    if (!error && data && data.length > 0) {
      return data;
    }
  }

  // Fallback to Mock Data
  let filtered = [...MOCK_TALENTS];

  if (params?.kategori) {
    const cat = MOCK_CATEGORIES.find(c => c.slug === params.kategori);
    if (cat) {
      filtered = filtered.filter(t => t.category_id === cat.id);
    }
  }

  if (params?.kota) {
    filtered = filtered.filter(t => 
      t.city.toLowerCase().includes(params.kota!.toLowerCase()) || 
      t.province.toLowerCase().includes(params.kota!.toLowerCase())
    );
  }

  if (params?.q) {
    const queryStr = params.q.toLowerCase();
    filtered = filtered.filter(t =>
      t.display_name.toLowerCase().includes(queryStr) ||
      t.headline?.toLowerCase().includes(queryStr) ||
      t.bio?.toLowerCase().includes(queryStr)
    );
  }

  return filtered;
}

export async function getTalentBySlug(slug: string): Promise<Talent | null> {
  const supabase = await createClient();
  if (supabase) {
    const { data, error } = await supabase
      .from('talents')
      .select('*, categories(*), portfolio_items(*), talent_services(*, rate_cards(*))')
      .eq('slug', slug)
      .single();
    if (!error && data) return data;
  }

  const found = MOCK_TALENTS.find(t => t.slug === slug);
  return found || null;
}

export async function getStudios(): Promise<Studio[]> {
  const supabase = await createClient();
  if (supabase) {
    const { data, error } = await supabase
      .from('studios')
      .select('*')
      .eq('verification_status', 'verified');
    if (!error && data && data.length > 0) return data;
  }
  return MOCK_STUDIOS;
}
