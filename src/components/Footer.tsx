const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-8 px-4">
      <div className="container mx-auto text-center">
        <p className="text-muted-foreground mb-4">
          &copy; {new Date().getFullYear()} Cristo.gg - Tutti i diritti riservati
        </p>
        <p className="text-sm text-muted-foreground">
          Minecraft è un marchio registrato di Mojang AB. Questo sito non è affiliato con Mojang AB.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
