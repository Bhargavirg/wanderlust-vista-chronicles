
import { supabase } from "@/integrations/supabase/client";

export async function submitCommunityJoinRequest(
  fullName: string, 
  email: string, 
  areasOfInterest: string
) {
  try {
    const { data, error } = await supabase
      .from('community_join_requests')
      .insert({
        full_name: fullName,
        email: email,
        areas_of_interest: areasOfInterest
      })
      .select();

    if (error) {
      console.error('Error submitting community join request:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in submitCommunityJoinRequest:', error);
    throw error;
  }
}

export async function getCommunityJoinRequests() {
  try {
    const { data, error } = await supabase
      .from('community_join_requests')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (error) {
      console.error('Error getting community join requests:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getCommunityJoinRequests:', error);
    return [];
  }
}
