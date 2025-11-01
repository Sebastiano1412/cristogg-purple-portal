import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const ServerInfo = () => {
  const [copied, setCopied] = useState(false);
  const serverIP = "cristo.gg";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(serverIP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Come <span className="bg-gradient-primary bg-clip-text text-transparent">Entrare</span>
        </h2>
        
        <Card className="bg-card border-primary/20 p-8 md:p-12 shadow-glow">
          <div className="text-center space-y-6">
            <div>
              <p className="text-muted-foreground mb-2">Nome Server:</p>
              <p className="text-2xl font-bold text-foreground">Cristo.gg</p>
            </div>
            
            <div>
              <p className="text-muted-foreground mb-2">IP del Server:</p>
              <div className="flex items-center justify-center gap-4">
                <p className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  {serverIP}
                </p>
                <Button
                  onClick={copyToClipboard}
                  size="icon"
                  className="bg-primary hover:bg-secondary transition-colors"
                >
                  {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                </Button>
              </div>
            </div>

            <div className="pt-4">
              <p className="text-muted-foreground">Versioni supportate</p>
              <p className="text-lg font-semibold text-foreground">1.8 - 1.21+</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ServerInfo;
