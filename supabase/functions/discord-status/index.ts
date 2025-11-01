import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Discord Widget API - requires widget to be enabled in server settings
    const guildId = "1372331989281275994";
    const response = await fetch(`https://discord.com/api/guilds/${guildId}/widget.json`);
    
    if (!response.ok) {
      throw new Error('Widget not enabled or invalid guild ID');
    }
    
    const data = await response.json();

    return new Response(
      JSON.stringify({
        members: data.presence_count || 0,
        name: data.name || 'Cristo.gg'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error fetching Discord status:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch Discord status', members: 0 }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
