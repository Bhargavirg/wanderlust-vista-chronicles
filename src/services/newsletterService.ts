
import { supabase } from "@/integrations/supabase/client";

export async function subscribeToNewsletter(email: string) {
  try {
    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .insert({
        email: email
      })
      .select();

    if (error) {
      console.error('Error subscribing to newsletter:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in subscribeToNewsletter:', error);
    throw error;
  }
}

export async function checkNewsletterSubscription(email: string) {
  try {
    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .select('*')
      .eq('email', email)
      .eq('is_active', true)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error checking newsletter subscription:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in checkNewsletterSubscription:', error);
    return null;
  }
}
