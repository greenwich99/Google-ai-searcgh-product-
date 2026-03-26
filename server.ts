import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.post("/api/scan", async (req, res) => {
    const { query, platforms } = req.body;
    
    // In a real app, we'd call Gemini here to analyze the query and generate a report.
    // For this demo, we'll simulate a sophisticated AI response.
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 3000));

    const mockData = {
      winningScore: 85 + Math.floor(Math.random() * 10),
      productName: query.length > 20 ? query.substring(0, 20) + "..." : query || "Produit Tendance",
      summary: `Bentayeb a scanné 11 plateformes françaises pour "${query}". Score de produit gagnant : très élevé. La demande est en forte hausse sur Amazon FR et TikTok. Faible concurrence détectée sur LeBonCoin. Opportunité de marge brute estimée à 62%.`,
      metrics: {
        demande: "Très forte",
        tendance: "+38% ce mois",
        concurrence: "Modérée",
        margeBrute: "58–67%",
        volumeMensuel: "4 200 ventes/mois",
        prixMoyen: "34,90 €"
      },
      trend30j: Array.from({ length: 30 }, () => 40 + Math.floor(Math.random() * 60)),
      insights: [
        { type: "good", icon: "🔥", title: "Produit en forte accélération", text: "Volume de recherche +38% sur les 30 derniers jours. Signal fort de croissance." },
        { type: "good", icon: "💰", title: "Marge excellente", text: "Prix d'achat AliExpress ~8€, prix de vente Amazon FR ~35€. Marge nette ~62% après frais." },
        { type: "warn", icon: "⚡", title: "Concurrents publicité active", text: "3 dropshippers FR actifs sur Facebook Ads. Budget moyen estimé 800€/jour." },
        { type: "info", icon: "🎯", title: "Opportunité LeBonCoin", text: "Produits similaires sur LeBonCoin 40% moins chers que sur Amazon. Arbitrage possible." }
      ],
      platforms: [
        { name: "Amazon.fr", icon: "📦", score: 9, trend: "HOT", listings: 847, stats: { ventes: "4 200/mois", nouvelles: "23 nouvelles fiches", reviews: "12 500+" } },
        { name: "TikTok Ads", icon: "🎵", score: 9, trend: "EN HAUSSE", listings: 34, stats: { vues: "2.4M de vues", pubs: "34 pubs actives", engagement: "8.2% ER moyen" } },
        { name: "Facebook Ads", icon: "📣", score: 7, trend: "ACTIF", listings: 18, stats: { pubs: "18 pubs actives", duree: "12j moy. active", budget: "~800€/j estimé" } },
        { name: "AliExpress", icon: "🛒", score: 8, trend: "STABLE", listings: 1240, stats: { commandes: "50k+ commandes", délai: "12–18j France", vendeurs: "340 vendeurs" } }
      ],
      ads: [
        { platform: "TikTok Ads", emoji: "🎵", title: "Gadget maison #1 France — TikTok viral", views: "2.4M", ctr: "4.8%", status: "HOT" },
        { platform: "Facebook Ads", emoji: "📣", title: "Tu en avais besoin sans le savoir...", views: "840K", ctr: "3.2%", status: "ACTIF" },
        { platform: "Instagram", emoji: "📸", title: "Le gadget dont tout le monde parle", views: "710K", ctr: "3.6%", status: "ACTIF" }
      ],
      ranking: [
        { rank: 1, name: "Gadget Maison Connectée Pro", cat: "Tech & Maison", score: 94, marge: "64%", volumeMensuel: "4 200", plateforme: "Amazon FR + TikTok", tendance: "HOT" },
        { rank: 2, name: "Accessoire Fitness Premium", cat: "Sport & Lifestyle", score: 88, marge: "58%", volumeMensuel: "3 100", plateforme: "Amazon FR + Instagram", tendance: "EN HAUSSE" },
        { rank: 3, name: "Produit Beauté Niche", cat: "Beauté & Soins", score: 82, marge: "71%", volumeMensuel: "2 400", plateforme: "TikTok + Vinted", tendance: "ÉMERGENT" }
      ],
      strategy: {
        approach: "Stratégie dropshipping rapide : sourcing AliExpress (~8€), vente Amazon FR (~35€). Marge nette estimée 62% après frais Amazon FBA (15%) et publicités (15%). Budget de démarrage recommandé : 1 500–2 500€.",
        supply: [
          { name: "Fournisseur Principal AliExpress", prix: "7,80–8,50€", délai: "12–18 jours", note: "★ 4.5 · 50k+ commandes" },
          { name: "Grossiste Alibaba (100 unités min)", prix: "5,20–6,10€", délai: "20–30 jours", note: "Idéal volume · certifié CE" }
        ],
        launch: "Semaine 1-2 : Créer compte Seller Amazon FR + SIRET. Commander 20 unités test. Semaine 3-4 : Fiche produit optimisée + visuels pros. Lancer campagne Sponsored Products (budget 20€/j)."
      }
    };

    res.json({ success: true, data: mockData });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
