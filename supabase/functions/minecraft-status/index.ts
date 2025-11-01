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
    const serverIP = "cristo.gg";
    const response = await fetch(`https://api.mcsrvstat.us/3/${serverIP}`);
    const data = await response.json();

    return new Response(
      JSON.stringify({
        online: data.online || false,
        players: data.players?.online || 0,
        maxPlayers: data.players?.max || 0
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error fetching Minecraft status:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch server status', online: false, players: 0 }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
