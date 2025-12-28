import { useEffect } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LogOut, FileText, BookOpen } from 'lucide-react';
import logoImage from '@/assets/logo.png';

const Admin = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/admin/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) return null;

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-card/50 backdrop-blur-xl border-r border-primary/20 p-6">
        <div className="flex items-center gap-3 mb-8">
          <img src={logoImage} alt="Logo" className="w-10 h-10" />
          <span className="font-russo text-lg bg-gradient-primary bg-clip-text text-transparent">
            Admin
          </span>
        </div>

        <nav className="space-y-2">
          <Link
            to="/admin/regolamento"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground hover:bg-primary/20 transition-colors"
          >
            <FileText className="w-5 h-5" />
            Regolamento
          </Link>
          <Link
            to="/admin/guide"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground hover:bg-primary/20 transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            Guide
          </Link>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Esci
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;
