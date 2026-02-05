const footerLinks = {
  "À propos": ["Qui sommes-nous", "Emplois", "Presse"],
  Aide: ["FAQ", "Centre d'aide", "Compte", "Contact"],
  Légal: ["Confidentialité", "Conditions d'utilisation", "Mentions légales"],
  Réseaux: ["Facebook", "Twitter", "Instagram", "YouTube"],
};

const socialIcons = [
  { name: "Facebook", logo: "f" },
  { name: "Twitter", logo: "𝕏" },
  { name: "Instagram", logo: "📷" },
  { name: "YouTube", logo: "▶" },
];

function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-12 px-8 md:px-16 border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        
        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="flex flex-col">
              <h3 className="text-white font-bold mb-4">{category}</h3>
              <ul className="space-y-2 text-sm">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:underline">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mb-8">
          {socialIcons.map((icon) => (
            <a 
              key={icon.name} 
              href="#" 
              className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors"
            >
              <span>{icon.logo}</span>
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-gray-500">
          <p>© 2026 Netflix Clone - Projet pédagogique IUT Informatique - Limoges</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;