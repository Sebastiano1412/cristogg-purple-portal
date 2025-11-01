import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Check, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/hero-bg.jpg";
import logoImage from "@/assets/logo.png";

const Hero = () => {
  const [copiedIP, setCopiedIP] = useState(false);
  const [onlinePlayers, setOnlinePlayers] = useState(0);
  const [discordMembers, setDiscordMembers] = useState(0);
  const serverIP = "cristo.gg";

  useEffect(() => {
    const fetchMinecraftStatus = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('minecraft-status');
        if (!error && data) {
          setOnlinePlayers(data.players);
        }
      } catch (error) {
        console.error('Error fetching Minecraft status:', error);
      }
    };

    const fetchDiscordStatus = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('discord-status');
        if (!error && data) {
          setDiscordMembers(data.members);
        }
      } catch (error) {
        console.error('Error fetching Discord status:', error);
      }
    };

    fetchMinecraftStatus();
    fetchDiscordStatus();

    // Refresh every 60 seconds
    const interval = setInterval(() => {
      fetchMinecraftStatus();
      fetchDiscordStatus();
    }, 60000);

    return () => clearInterval(interval);
  }, []);
  const copyIP = () => {
    navigator.clipboard.writeText(serverIP);
    setCopiedIP(true);
    setTimeout(() => setCopiedIP(false), 2000);
  };
  return <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image - Altezza ridotta */}
      <div className="absolute inset-0 bg-cover bg-center" style={{
      backgroundImage: `url(${heroImage})`
    }}>
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20 pb-12">
        <div className="flex justify-center mb-12">
          <img src={logoImage} alt="Cristo.gg" className="h-48 md:h-64 w-auto animate-float drop-shadow-[0_0_40px_rgba(168,85,247,0.6)]" />
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Server IP Card */}
          <Card className="bg-card/90 backdrop-blur-sm border-primary/30 p-6 hover:shadow-glow transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground font-poppins">Server Minecraft</span>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <Users className="w-4 h-4" />
                <span className="font-bold font-poppins">{onlinePlayers} online</span>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2 font-poppins">IP del Server</p>
              <p className="text-2xl font-poppins font-bold bg-gradient-primary bg-clip-text text-transparent">
                {serverIP}
              </p>
            </div>
            <Button onClick={copyIP} className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 font-poppins font-semibold" size="lg">
              {copiedIP ? <>
                  <Check className="w-5 h-5 mr-2" />
                  Copiato!
                </> : <>
                  <Copy className="w-5 h-5 mr-2" />
                  Copia IP
                </>}
            </Button>
          </Card>

          {/* Discord Card */}
          <Card className="bg-card/90 backdrop-blur-sm border-primary/30 p-6 hover:shadow-glow transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground font-poppins">Server Discord</span>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <Users className="w-4 h-4" />
                <span className="font-bold font-poppins">{discordMembers} online</span>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2 font-poppins">Discord Server</p>
              <p className="text-2xl font-poppins font-bold bg-gradient-primary bg-clip-text text-transparent">
                discord.gg/cristogg
              </p>
            </div>
            <Button asChild className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 font-poppins font-semibold" size="lg">
              <a href="https://discord.gg/cristogg" target="_blank" rel="noopener noreferrer">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                Unisciti al Discord
              </a>
            </Button>
          </Card>
        </div>
      </div>
    </section>;
};
export default Hero;