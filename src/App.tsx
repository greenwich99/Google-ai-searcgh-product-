import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { 
  Search, 
  TrendingUp, 
  LayoutDashboard, 
  Layers, 
  CreditCard, 
  User, 
  ChevronRight, 
  Zap, 
  BarChart3, 
  AlertCircle, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowDownRight,
  Download,
  Save,
  RefreshCw,
  Menu,
  X,
  Globe,
  ShoppingBag,
  Video,
  Facebook,
  Instagram,
  Smartphone,
  Calculator,
  History,
  Star,
  ExternalLink,
  Play,
  ShieldCheck,
  Users,
  Trophy,
  Bell,
  Info,
  Ghost,
  Shirt,
  MessageSquare,
  FileText,
  Rocket,
  FileEdit,
  PenTool,
  Target,
  Sparkles,
  Dumbbell,
  Home,
  ChevronLeft,
  Search as SearchIcon,
  ShoppingBag as ShoppingBagIcon,
  Video as VideoIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Smartphone as SmartphoneIcon,
  Users as UsersIcon,
  Calculator as CalculatorIcon,
  FileText as FileTextIcon,
  Target as TargetIcon,
  Sparkles as SparklesIcon,
  Dumbbell as DumbbellIcon,
  Home as HomeIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Zap as ZapIcon,
  RefreshCw as RefreshCwIcon,
  ShieldCheck as ShieldCheckIcon,
  Trophy as TrophyIcon,
  ArrowUpRight as ArrowUpRightIcon,
  ArrowDownRight as ArrowDownRightIcon,
  Download as DownloadIcon,
  Save as SaveIcon,
  History as HistoryIcon,
  Star as StarIcon,
  ExternalLink as ExternalLinkIcon,
  Play as PlayIcon,
  Menu as MenuIcon,
  X as XIcon,
  Globe as GlobeIcon,
  CheckCircle2 as CheckCircle2Icon,
  AlertCircle as AlertCircleIcon,
  BarChart3 as BarChart3Icon,
  LayoutDashboard as LayoutDashboardIcon,
  Layers as LayersIcon,
  CreditCard as CreditCardIcon,
  User as UserIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { cn } from './lib/utils';

const PlatformLogo = ({ name, size = "md" }: { name: string, size?: "sm" | "md" | "lg" }) => {
  const isAmazon = name.toLowerCase().includes('amazon');
  const isTikTok = name.toLowerCase().includes('tiktok');
  
  if (isAmazon) {
    return (
      <div className="flex flex-col items-start leading-none">
        <span className={cn(
          "font-black tracking-tighter text-[#FF9900] italic",
          size === "sm" ? "text-sm" : size === "md" ? "text-xl" : "text-2xl"
        )}>
          amazon
          <span className="text-white/50 not-italic ml-1 text-[10px] font-bold uppercase tracking-widest">
            {name.toLowerCase().includes('fr') ? 'FR' : ''}
          </span>
        </span>
        <div className={cn(
          "h-1 bg-[#FF9900] rounded-full mt-[-4px] ml-1",
          size === "sm" ? "w-8" : "w-12"
        )} style={{ borderRadius: '100% 100% 0 0', transform: 'rotate(-5deg)' }} />
      </div>
    );
  }

  if (isTikTok) {
    return (
      <div className="flex items-center gap-2 leading-none">
        <div className="relative">
          <span className={cn(
            "font-black tracking-tighter text-white relative z-10",
            size === "sm" ? "text-sm" : size === "md" ? "text-xl" : "text-2xl"
          )}>
            TikTok
          </span>
          <span className={cn(
            "font-black tracking-tighter text-[#00f2ea] absolute -left-[1px] -top-[1px] opacity-70",
            size === "sm" ? "text-sm" : size === "md" ? "text-xl" : "text-2xl"
          )}>
            TikTok
          </span>
          <span className={cn(
            "font-black tracking-tighter text-[#ff0050] absolute left-[1px] top-[1px] opacity-70",
            size === "sm" ? "text-sm" : size === "md" ? "text-xl" : "text-2xl"
          )}>
            TikTok
          </span>
        </div>
        {name.toLowerCase().includes('ads') && (
          <span className="text-[10px] font-bold bg-white/10 px-1.5 py-0.5 rounded text-slate-400 uppercase tracking-tighter">Ads</span>
        )}
      </div>
    );
  }

  return <span className={cn("font-bold text-white", size === "sm" ? "text-xs" : "text-base")}>{name}</span>;
};

// --- Types ---

interface ScanResult {
  winningScore: number;
  productName: string;
  summary: string;
  metrics: {
    demande: string;
    tendance: string;
    concurrence: string;
    margeBrute: string;
    volumeMensuel: string;
    prixMoyen: string;
  };
  trend30j: number[];
  insights: {
    type: 'good' | 'warn' | 'info';
    icon: string;
    title: string;
    text: string;
  }[];
  platforms: {
    name: string;
    icon: string;
    score: number;
    trend: string;
    listings: number;
    stats: Record<string, string>;
  }[];
  ads: {
    platform: string;
    emoji: string;
    title: string;
    views: string;
    ctr: string;
    status: string;
  }[];
  ranking: {
    rank: number;
    name: string;
    cat: string;
    score: number;
    marge: string;
    volumeMensuel: string;
    plateforme: string;
    tendance: string;
  }[];
  strategy: {
    approach: string;
    supply: { name: string; prix: string; délai: string; note: string }[];
    launch: string;
  };
}

// --- Components ---

const Notification = ({ message, type, onClose }: { message: string, type: 'success' | 'info' | 'error', onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, x: '-50%' }}
      animate={{ opacity: 1, y: 0, x: '-50%' }}
      exit={{ opacity: 0, y: 50, x: '-50%' }}
      className={cn(
        "fixed bottom-8 left-1/2 z-[100] px-6 py-3 rounded-2xl shadow-2xl border flex items-center gap-3 min-w-[300px]",
        type === 'success' ? "bg-lime text-ink border-lime/20" : 
        type === 'error' ? "bg-rose text-white border-rose/20" : "bg-ink-lighter text-white border-white/10"
      )}
    >
      {type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : 
       type === 'error' ? <AlertCircle className="w-5 h-5" /> : <Info className="w-5 h-5" />}
      <span className="font-bold text-sm">{message}</span>
    </motion.div>
  );
};

const ProfitCalculator = ({ initialPrice = 35, initialCost = 8 }) => {
  const [sellPrice, setSellPrice] = useState(initialPrice);
  const [costPrice, setCostPrice] = useState(initialCost);
  const [adSpend, setAdSpend] = useState(5);
  const [shipping, setShipping] = useState(2);

  const revenue = sellPrice;
  const totalCosts = costPrice + adSpend + shipping + (sellPrice * 0.15); // 15% marketplace fee
  const profit = revenue - totalCosts;
  const margin = (profit / revenue) * 100;

  return (
    <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-lime/10 flex items-center justify-center">
          <Calculator className="w-5 h-5 text-lime" />
        </div>
        <h4 className="text-lg font-display font-bold text-white">Calculateur de Profit</h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-2">Prix de Vente (€)</label>
            <input 
              type="number" 
              value={sellPrice} 
              onChange={(e) => setSellPrice(Number(e.target.value))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-lime/50 focus:ring-0 transition-all"
            />
          </div>
          <div>
            <label className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-2">Coût Produit (€)</label>
            <input 
              type="number" 
              value={costPrice} 
              onChange={(e) => setCostPrice(Number(e.target.value))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-lime/50 focus:ring-0 transition-all"
            />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-2">Pub par vente (€)</label>
            <input 
              type="number" 
              value={adSpend} 
              onChange={(e) => setAdSpend(Number(e.target.value))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-lime/50 focus:ring-0 transition-all"
            />
          </div>
          <div>
            <label className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-2">Logistique (€)</label>
            <input 
              type="number" 
              value={shipping} 
              onChange={(e) => setShipping(Number(e.target.value))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-lime/50 focus:ring-0 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-lime/5 border border-lime/20 flex items-center justify-between">
        <div>
          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase">Profit Net / Unité</div>
          <div className="text-2xl font-display font-bold text-lime">{profit.toFixed(2)} €</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase">Marge Nette</div>
          <div className="text-2xl font-display font-bold text-white">{margin.toFixed(1)}%</div>
        </div>
      </div>
    </div>
  );
};

const Navbar = ({ activeTab, setActiveTab, onNotify }: { activeTab: string, setActiveTab: (t: string) => void, onNotify: (m: string, t: any) => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Exploration', icon: Search },
    { id: 'dashboard', label: 'Analytique', icon: LayoutDashboard },
    { id: 'integrations', label: 'Écosystème', icon: Layers },
    { id: 'pricing', label: 'Offres', icon: CreditCard },
  ];

  return (
    <nav className="sticky top-0 z-50 h-16 px-4 md:px-8 flex items-center justify-between bg-ink/90 backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
        <div className="w-8 h-8 rounded-lg bg-lime flex items-center justify-center">
          <Zap className="w-5 h-5 text-ink fill-ink" />
        </div>
        <span className="font-display text-xl font-bold text-white tracking-tight">
          Ben<span className="text-lime">tayeb</span>
        </span>
        <span className="hidden sm:inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
          FR MARKET
        </span>
      </div>

      {/* Desktop Links */}
      <div className="hidden lg:flex items-center gap-1">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => setActiveTab(link.id)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
              activeTab === link.id ? "text-lime bg-lime/10" : "text-slate-400 hover:text-white hover:bg-white/5"
            )}
          >
            {link.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-amber/10 border border-amber/20 text-[10px] font-mono font-bold text-amber">
          <div className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
          Mode démo (backend hors ligne)
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNotify("Connexion simulée réussie !", "success")}
            className="hidden sm:flex px-4 py-2 rounded-lg text-sm font-semibold text-slate-400 hover:text-white transition-colors border border-white/10"
          >
            Connexion
          </button>
          <button 
            onClick={() => setActiveTab('pricing')}
            className="px-4 py-2 rounded-lg text-sm font-bold bg-lime text-ink hover:bg-lime/90 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
          >
            Commencer
            <ChevronRight className="w-4 h-4" />
          </button>
          <button 
            className="lg:hidden p-2 text-slate-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 right-0 bg-ink-lighter border-b border-white/5 p-4 flex flex-col gap-2 lg:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setIsMenuOpen(false);
                }}
                className={cn(
                  "px-4 py-3 rounded-lg text-left text-sm font-medium flex items-center gap-3",
                  activeTab === link.id ? "text-lime bg-lime/10" : "text-slate-400"
                )}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const MarketOverview = () => {
  const trends = [
    { cat: 'Maison & Jardin', growth: '+24%', status: 'HOT', color: 'text-lime', bg: 'bg-lime/10', icon: HomeIcon },
    { cat: 'Beauté & Soins', growth: '+18%', status: 'STABLE', color: 'text-electric', bg: 'bg-electric/10', icon: SparklesIcon },
    { cat: 'Tech & Gadgets', growth: '+32%', status: 'VIRAL', color: 'text-amber', bg: 'bg-amber/10', icon: SmartphoneIcon },
    { cat: 'Sport & Fitness', growth: '+15%', status: 'EN HAUSSE', color: 'text-rose', bg: 'bg-rose/10', icon: DumbbellIcon },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-24 border-t border-white/5">
      <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">Mis à jour il y a 5 min</span>
          </div>
          <h2 className="text-4xl font-display font-bold text-white mb-4">Tendances du Marché Français</h2>
          <p className="text-slate-400 max-w-xl">Analyse en temps réel des segments à forte croissance sur le territoire national.</p>
        </div>
        <div className="flex gap-2">
          <button className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all">
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all">
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {trends.map((t) => (
          <div key={t.cat} className="p-8 rounded-[32px] bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-all group relative overflow-hidden">
            <div className={cn("absolute top-0 right-0 w-32 h-32 blur-3xl opacity-10 transition-opacity group-hover:opacity-20", t.bg)} />
            
            <div className="flex items-center justify-between mb-8">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", t.bg)}>
                <t.icon className={cn("w-6 h-6", t.color)} />
              </div>
              <div className={cn("text-[10px] font-bold px-3 py-1 rounded-full border", t.color, t.bg, "border-current/20")}>
                {t.status}
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="text-3xl font-display font-bold text-white">{t.growth}</div>
              <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Croissance Mensuelle</div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
              <span className="font-bold text-white">{t.cat}</span>
              <ArrowUpRightIcon className="w-4 h-4 text-slate-700 group-hover:text-white transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const ToolsSection = ({ onToolClick }: { onToolClick: (query: string) => void }) => {
  const categories = [
    {
      title: "DÉTECTION DE TENDANCES",
      tools: [
        { title: "Produits viraux TikTok France", desc: "Détecte les produits qui explosent sur TikTok FR", tags: ["viral score", "vues", "engagement"], icon: VideoIcon },
        { title: "Tendances Amazon Best-Sellers", desc: "Analyse les meilleures ventes Amazon.fr en temps réel", tags: ["rank", "reviews", "BSR"], icon: ShoppingBagIcon },
        { title: "Niches sous-exploitées", desc: "Trouve les niches avec forte demande et peu de concurrence", tags: ["niche score", "competition", "marge"], icon: SearchIcon },
        { title: "Alertes produits émergents", desc: "Notification dès qu'un produit commence à monter", tags: ["alertes", "temps réel"], icon: Bell },
      ]
    },
    {
      title: "ANALYSE PUBLICITAIRE",
      tools: [
        { title: "Spy Facebook Ads Library", desc: "Analyse les publicités de tes concurrents sur Facebook", tags: ["créatifs", "ciblage", "budget"], icon: FacebookIcon },
        { title: "TikTok Creative Center", desc: "Identifie les formats publicitaires qui performent sur TikTok", tags: ["hooks", "formats", "CTR"], icon: VideoIcon },
        { title: "Snapchat Ads Analysis", desc: "Découvre les campagnes Snap qui cartonnent en France", tags: ["stories", "swipe-up", "ROAS"], icon: Ghost },
        { title: "Instagram Ads Spy", desc: "Analyse les meilleures publicités Instagram de ta niche", tags: ["visuels", "copy", "engagement"], icon: InstagramIcon },
      ]
    },
    {
      title: "SCAN MARKETPLACES",
      tools: [
        { title: "LeBonCoin Arbitrage Finder", desc: "Produits pas chers sur LeBonCoin à revendre sur Amazon", tags: ["marge", "disponibilité", "volume"], icon: GlobeIcon },
        { title: "AliExpress Winning Products", desc: "Produits AliExpress avec fort potentiel dropshipping en FR", tags: ["délai", "prix", "évaluations"], icon: ShoppingBagIcon },
        { title: "Vinted Tendances Mode", desc: "Articles mode Vinted avec la plus forte rotation", tags: ["marques", "tailles", "prix"], icon: Shirt },
        { title: "Cdiscount vs Amazon Gaps", desc: "Produits disponibles sur Cdiscount mais absents d'Amazon", tags: ["gap", "opportunité", "prix"], icon: LayersIcon },
      ]
    },
    {
      title: "ANALYSE CONCURRENTIELLE",
      tools: [
        { title: "Analyse Dropshippers FR", desc: "Identifie ce que vendent les dropshippers français en ce moment", tags: ["stores", "produits", "ads"], icon: UsersIcon },
        { title: "Estimation marge & coût", desc: "Calcule la marge réelle d'un produit (achat + ads + frais)", tags: ["marge nette", "ROAS", "seuil"], icon: CalculatorIcon },
        { title: "Analyse avis & sentiment", desc: "Analyse les avis Amazon pour détecter les points de douleur", tags: ["avis", "sentiment", "opportunité"], icon: MessageSquare },
        { title: "Rapport concurrents complet", desc: "Vue 360° sur tes concurrents directs dans une niche", tags: ["trafic", "ads", "produits"], icon: FileTextIcon },
      ]
    },
    {
      title: "STRATÉGIE & LANCEMENT",
      tools: [
        { title: "Plan de lancement produit", desc: "Stratégie complète pour lancer un produit gagnant en France", tags: ["timeline", "budget", "canaux"], icon: Rocket },
        { title: "Générateur fiche Amazon FR", desc: "Titre, bullets, description optimisés SEO Amazon.fr", tags: ["titre", "mots-clés", "A+"], icon: FileEdit },
        { title: "Brief créatif publicité", desc: "Script vidéo TikTok/Reels pour ton produit gagnant", tags: ["hook", "script", "CTA"], icon: PenTool },
        { title: "Stratégie prix & positionnement", desc: "Prix optimal pour maximiser conversions et marge", tags: ["prix", "positionnement", "test A/B"], icon: TargetIcon },
      ]
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-24 border-t border-white/5">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-display font-bold text-white mb-4">Laboratoire de Recherche IA</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">Activez nos algorithmes spécialisés ou formulez votre propre requête pour une analyse stratégique.</p>
      </div>

      <div className="space-y-16">
        {categories.map((cat, idx) => (
          <div key={idx}>
            <h3 className="text-xs font-mono font-bold text-lime tracking-[0.2em] mb-8 uppercase">{cat.title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {cat.tools.map((tool, tIdx) => (
                <div 
                  key={tIdx} 
                  onClick={() => onToolClick(tool.title)}
                  className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.08] hover:border-lime/30 transition-all cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-lime/10 group-hover:text-lime transition-all">
                    <tool.icon className="w-5 h-5 text-slate-400 group-hover:text-lime" />
                  </div>
                  <h4 className="font-bold text-white mb-2 group-hover:text-lime transition-colors">{tool.title}</h4>
                  <p className="text-xs text-slate-500 mb-4 line-clamp-2">{tool.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {tool.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-mono font-bold text-slate-600 uppercase bg-white/5 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const TrustSection = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-20 border-t border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
            <ShieldCheck className="w-8 h-8 text-lime" />
          </div>
          <h4 className="text-xl font-display font-bold text-white mb-3">Fiabilité des Données</h4>
          <p className="text-sm text-slate-500 leading-relaxed">Nos algorithmes croisent les données de plus de 15 sources officielles pour garantir une précision décisionnelle.</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
            <Users className="w-8 h-8 text-electric" />
          </div>
          <h4 className="text-xl font-display font-bold text-white mb-3">Communauté d'Experts</h4>
          <p className="text-sm text-slate-500 leading-relaxed">Rejoignez plus de 12 000 e-commerçants qui propulsent leur activité grâce à notre intelligence.</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
            <Trophy className="w-8 h-8 text-amber" />
          </div>
          <h4 className="text-xl font-display font-bold text-white mb-3">Leader Francophone</h4>
          <p className="text-sm text-slate-500 leading-relaxed">Élu meilleur outil d'intelligence produit par les experts du marché européen en 2025.</p>
        </div>
      </div>
    </div>
  );
};

const Hero = ({ onSearch, query, setQuery, selectedPlatforms, setSelectedPlatforms }: { 
  onSearch: (q: string, p: string[]) => void,
  query: string,
  setQuery: (q: string) => void,
  selectedPlatforms: string[],
  setSelectedPlatforms: (p: string[]) => void
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const platforms = [
    { id: 'leboncoin', label: 'LeBonCoin', color: '#F03D00' },
    { id: 'amazon', label: 'Amazon FR', color: '#FF9900' },
    { id: 'aliexpress', label: 'AliExpress', color: '#FF6900' },
    { id: 'vinted', label: 'Vinted', color: '#09B1BA' },
    { id: 'facebook', label: 'Facebook Ads', color: '#1877F2' },
    { id: 'tiktok', label: 'TikTok Ads', color: '#010101' },
    { id: 'snapchat', label: 'Snapchat', color: '#FFFC00' },
    { id: 'instagram', label: 'Instagram', color: '#E1306C' },
    { id: 'cdiscount', label: 'Cdiscount', color: '#0082B4' },
    { id: 'fnac', label: 'Fnac/Darty', color: '#E1001A' },
    { id: 'temu', label: 'Temu', color: '#FF6000' },
    { id: 'alibaba', label: 'Alibaba', color: '#FF6600' },
    { id: 'shopify', label: 'Shopify', color: '#96BF48' },
  ];

  const quickPrompts = [
    "Produits tendance femmes 18-35 ans",
    "Gadgets tech viral TikTok France",
    "Produits dropshipping marge élevée",
    "Niche beauté & skincare sous-exploitée",
    "Analyse pub Facebook concurrents fitness",
    "Produit LeBonCoin à revendre sur Amazon"
  ];

  const togglePlatform = (id: string) => {
    setSelectedPlatforms(selectedPlatforms.includes(id) 
      ? selectedPlatforms.filter(p => p !== id) 
      : [...selectedPlatforms, id]
    );
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <section className="relative py-24 px-4 md:px-8 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-lime/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-electric/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Background Grid - Subtler and less busy */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lime/10 border border-lime/20 text-lime text-xs font-mono font-bold mb-8"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
          IA • Marché Français • Temps Réel
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-8xl font-display font-bold text-white leading-[0.9] tracking-tight mb-8"
        >
          L'IA qui déniche vos <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime to-lime-hover">Produits Gagnants</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-lg max-w-3xl mx-auto mb-16 leading-relaxed"
        >
          L'intelligence artificielle au service de votre croissance. Scannez, analysez et dominez le marché français en identifiant les opportunités à haute rentabilité en temps réel.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {platforms.slice(0, 10).map(p => (
              <div key={p.id} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.color }} />
                {p.label}
              </div>
            ))}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400">
              <div className="w-1.5 h-1.5 rounded-full bg-lime" />
              + 15 sources
            </div>
          </div>

          <div className="p-2 bg-white/5 border border-white/10 rounded-[32px] shadow-2xl backdrop-blur-sm focus-within:border-lime/30 focus-within:ring-4 focus-within:ring-lime/5 transition-all">
            <div className="flex flex-col items-stretch gap-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <textarea
                  ref={textareaRef}
                  value={query}
                  onChange={handleInput}
                  placeholder="Ex: trouve les produits tendance pour femmes 25-35 ans sur TikTok et Amazon FR..."
                  className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder:text-slate-600 p-6 resize-none min-h-[72px] max-h-40 text-lg"
                  rows={1}
                />
                <button
                  onClick={() => onSearch(query, selectedPlatforms)}
                  disabled={!query.trim()}
                  className="m-2 px-10 py-4 bg-lime text-ink font-display font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-lime/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-lg"
                >
                  <ZapIcon className="w-5 h-5 fill-ink" />
                  Scanner
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2 p-4 border-t border-white/5">
                {platforms.map(p => (
                  <button
                    key={p.id}
                    onClick={() => togglePlatform(p.id)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all",
                      selectedPlatforms.includes(p.id) 
                        ? "bg-lime/10 border-lime/30 text-lime" 
                        : "bg-white/5 border-white/10 text-slate-500 hover:text-slate-300"
                    )}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.color }} />
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-10">
            {quickPrompts.map((p) => (
              <button
                key={p}
                onClick={() => {
                  setQuery(p);
                  onSearch(p, selectedPlatforms);
                }}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-slate-500 hover:text-lime hover:border-lime/30 hover:bg-lime/5 transition-all"
              >
                {p}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const LoadingState = () => {
  const [progress, setProgress] = useState(0);
  const steps = [
    "Scan LeBonCoin...",
    "Analyse Amazon FR...",
    "Scraping AliExpress...",
    "Lecture TikTok Ads...",
    "Vinted tendances...",
    "Scoring IA..."
  ];
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 1;
      });
    }, 30);

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
    };
  }, []);

  return (
    <div className="py-20 flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-lime flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(184,255,60,0.3)] animate-pulse">
        <RefreshCw className="w-8 h-8 text-ink animate-spin" />
      </div>
      <h3 className="text-2xl font-display font-bold text-white mb-2">Analyse en cours...</h3>
      <p className="text-slate-500 font-mono text-sm mb-8">{steps[currentStep]}</p>
      
      <div className="w-full max-w-md h-1.5 bg-white/5 rounded-full overflow-hidden mb-6">
        <motion.div 
          className="h-full bg-lime"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {steps.map((s, i) => (
          <span 
            key={s} 
            className={cn(
              "px-3 py-1 rounded-full text-[10px] font-bold border transition-all duration-300",
              i === currentStep 
                ? "bg-lime/10 border-lime/30 text-lime" 
                : "bg-white/5 border-white/10 text-slate-600"
            )}
          >
            {s.toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  );
};

const Results = ({ result, onReset, onNotify, onSave }: { result: ScanResult, onReset: () => void, onNotify: (m: string, t: any) => void, onSave: () => void }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const chartData = result.trend30j.map((val, i) => ({
    day: i + 1,
    value: val
  }));

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bentayeb-report-${result.productName.replace(/\s+/g, '-').toLowerCase()}.json`;
    a.click();
    onNotify("Rapport téléchargé avec succès !", "success");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto px-4 md:px-8 pb-20"
    >
      <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-10">
        <div>
          <h2 className="text-3xl font-display font-bold text-white mb-2">Rapport Produit Gagnant</h2>
          <p className="text-slate-500 font-mono text-sm">Analyse basée sur 15+ sources de données FR</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleDownload}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-lime hover:bg-white/10 transition-all"
          >
            <Download className="w-5 h-5" />
          </button>
          <button 
            onClick={onSave}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-lime hover:bg-white/10 transition-all"
          >
            <Save className="w-5 h-5" />
          </button>
          <button 
            onClick={onReset}
            className="px-5 py-2.5 rounded-xl bg-lime/10 border border-lime/20 text-lime font-bold hover:bg-lime/20 transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Nouveau Scan
          </button>
        </div>
      </div>

      {/* Score Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 mb-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-lime/5 blur-[100px] -mr-32 -mt-32 rounded-full" />
        
        <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
          <div className="text-center">
            <div className="relative inline-block">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-white/5"
                />
                <motion.circle
                  cx="64"
                  cy="64"
                  r="58"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={364.4}
                  initial={{ strokeDashoffset: 364.4 }}
                  animate={{ strokeDashoffset: 364.4 - (364.4 * result.winningScore) / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="text-lime"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-display font-bold text-white leading-none">{result.winningScore}</span>
                <span className="text-[10px] font-mono font-bold text-slate-500 mt-1">SCORE</span>
              </div>
            </div>
          </div>

          <div className="flex-1 text-center lg:text-left">
            <h3 className="text-2xl font-display font-bold text-white mb-3">{result.productName}</h3>
            <p className="text-slate-400 leading-relaxed max-w-2xl">{result.summary}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
            {Object.entries(result.metrics).slice(0, 4).map(([key, val]) => (
              <div key={key} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] font-mono font-bold text-slate-500 uppercase mb-1">{key}</div>
                <div className="text-lg font-display font-bold text-white">{val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/5 mb-8 overflow-x-auto no-scrollbar">
        {['overview', 'platforms', 'ads', 'ranking', 'strategy'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-6 py-4 text-sm font-bold transition-all border-b-2 whitespace-nowrap",
              activeTab === tab 
                ? "text-lime border-lime" 
                : "text-slate-500 border-transparent hover:text-slate-300"
            )}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2 space-y-8">
              {/* Trend Chart */}
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-sm font-mono font-bold text-slate-400 uppercase tracking-widest">Tendance 30 Jours</h4>
                  <div className="flex items-center gap-2 text-lime text-xs font-bold">
                    <TrendingUp className="w-4 h-4" />
                    +42% Croissance
                  </div>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#B8FF3C" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#B8FF3C" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                      <XAxis 
                        dataKey="day" 
                        stroke="#475569" 
                        fontSize={10} 
                        tickLine={false} 
                        axisLine={false}
                        tickFormatter={(v) => `J-${30-v}`}
                      />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0D1120', border: '1px solid #ffffff10', borderRadius: '12px' }}
                        itemStyle={{ color: '#B8FF3C', fontWeight: 'bold' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#B8FF3C" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorValue)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Insights List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.insights.map((insight, i) => (
                  <div 
                    key={i}
                    className={cn(
                      "p-5 rounded-2xl border flex gap-4",
                      insight.type === 'good' ? "bg-lime/5 border-lime/20" : 
                      insight.type === 'warn' ? "bg-rose/5 border-rose/20" : "bg-white/5 border-white/10"
                    )}
                  >
                    <div className="text-2xl">{insight.icon}</div>
                    <div>
                      <h5 className="font-bold text-white text-sm mb-1">{insight.title}</h5>
                      <p className="text-xs text-slate-400 leading-relaxed">{insight.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                <h4 className="text-sm font-mono font-bold text-slate-400 uppercase tracking-widest mb-6">Top Plateformes</h4>
                <div className="space-y-4">
                  {result.platforms.slice(0, 4).map((p) => (
                    <div key={p.name} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                          {p.name.includes('Amazon') ? <ShoppingBag className="w-4 h-4 text-orange-400" /> : 
                           p.name.includes('TikTok') ? <Video className="w-4 h-4 text-white" /> : 
                           <Globe className="w-4 h-4 text-lime" />}
                        </div>
                        <div>
                          <PlatformLogo name={p.name} size="sm" />
                          <div className="text-[10px] text-slate-500">{p.listings} annonces</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-lime">{p.score}/10</div>
                        <div className="text-[10px] font-bold text-slate-600 uppercase">{p.trend}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-lime text-ink">
                <h4 className="font-display font-bold text-lg mb-2">Prêt à lancer ?</h4>
                <p className="text-sm font-medium opacity-80 mb-6">Nous avons généré un plan de lancement complet pour ce produit.</p>
                <button 
                  onClick={() => setActiveTab('strategy')}
                  className="w-full py-3 bg-ink text-white font-bold rounded-xl text-sm hover:opacity-90 transition-all"
                >
                  Voir la Stratégie →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'platforms' && (
          <motion.div
            key="platforms"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {result.platforms.map((p) => (
              <div key={p.name} className="p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col md:flex-row items-center gap-8">
                <div className="flex items-center gap-4 min-w-[200px]">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-2xl">
                    {p.icon}
                  </div>
                  <div>
                    <PlatformLogo name={p.name} />
                    <p className="text-xs text-slate-500">{p.listings} résultats</p>
                  </div>
                </div>
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {Object.entries(p.stats).map(([k, v]) => (
                    <div key={k}>
                      <div className="text-[10px] font-mono font-bold text-slate-500 uppercase">{k}</div>
                      <div className="text-sm font-bold text-white">{v}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 rounded-full bg-lime/10 border border-lime/20 text-lime text-[10px] font-bold">
                    {p.trend}
                  </span>
                  <div className="w-12 h-12 rounded-full border-2 border-lime flex items-center justify-center font-mono font-bold text-lime">
                    {p.score}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'ads' && (
          <motion.div
            key="ads"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {result.ads.map((ad, i) => (
              <div key={i} className="rounded-3xl bg-white/5 border border-white/10 overflow-hidden group hover:border-lime/30 transition-all flex flex-col">
                <div className="aspect-[9/16] bg-ink-lighter relative overflow-hidden flex items-center justify-center group/video">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/80 z-10" />
                  <div className="text-6xl z-0 opacity-20 group-hover:scale-110 transition-transform duration-500">{ad.emoji}</div>
                  
                  {/* Simulated Video UI */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <div className="w-16 h-16 rounded-full bg-lime/20 backdrop-blur-md border border-lime/30 flex items-center justify-center">
                      <Play className="w-8 h-8 text-lime fill-lime" />
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 z-20 flex items-end justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="px-2 py-0.5 rounded bg-lime text-ink text-[10px] font-bold w-fit">
                        {ad.status}
                      </span>
                      <h5 className="text-white font-bold text-sm line-clamp-1">{ad.title}</h5>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                          <Star className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-[10px] text-white font-bold mt-1">SAVE</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-white/[0.02] border-t border-white/5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center text-xs">
                        {ad.emoji}
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">{ad.platform}</span>
                    </div>
                    <button className="text-lime hover:text-white transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="text-[10px] text-slate-500 uppercase mb-1">Vues</div>
                      <div className="text-sm font-bold text-white">{ad.views}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="text-[10px] text-slate-500 uppercase mb-1">CTR</div>
                      <div className="text-sm font-bold text-lime">{ad.ctr}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'ranking' && (
          <motion.div
            key="ranking"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-3xl bg-white/5 border border-white/10 overflow-hidden"
          >
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="p-6 text-[10px] font-mono font-bold text-slate-500 uppercase">Rang</th>
                  <th className="p-6 text-[10px] font-mono font-bold text-slate-500 uppercase">Produit</th>
                  <th className="p-6 text-[10px] font-mono font-bold text-slate-500 uppercase">Score</th>
                  <th className="p-6 text-[10px] font-mono font-bold text-slate-500 uppercase">Marge</th>
                  <th className="p-6 text-[10px] font-mono font-bold text-slate-500 uppercase">Tendance</th>
                </tr>
              </thead>
              <tbody>
                {result.ranking.map((r) => (
                  <tr key={r.rank} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="p-6">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold",
                        r.rank === 1 ? "bg-lime text-ink" : "bg-white/5 text-slate-400"
                      )}>
                        {r.rank}
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="font-bold text-white">{r.name}</div>
                      <div className="text-[10px] text-slate-500">{r.cat}</div>
                    </td>
                    <td className="p-6 font-mono font-bold text-lime">{r.score}</td>
                    <td className="p-6">
                      <span className="px-2 py-1 rounded bg-electric/10 text-electric text-[10px] font-bold border border-electric/20">
                        {r.marge}
                      </span>
                    </td>
                    <td className="p-6">
                      <span className="px-2 py-1 rounded bg-amber/10 text-amber text-[10px] font-bold border border-amber/20">
                        {r.tendance}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {activeTab === 'strategy' && (
          <motion.div
            key="strategy"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2 space-y-8">
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                <h4 className="text-sm font-mono font-bold text-slate-400 uppercase tracking-widest mb-6">Approche Recommandée</h4>
                <p className="text-slate-300 leading-relaxed">{result.strategy.approach}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                  <h4 className="text-sm font-mono font-bold text-slate-400 uppercase tracking-widest mb-6">Sourcing</h4>
                  <div className="space-y-4">
                    {result.strategy.supply.map((s, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex justify-between items-center">
                        <div>
                          <div className="font-bold text-white text-sm">{s.name}</div>
                          <div className="text-[10px] text-slate-500">{s.note}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-bold text-lime">{s.prix}</div>
                          <div className="text-[10px] text-slate-500">{s.délai}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                  <h4 className="text-sm font-mono font-bold text-slate-400 uppercase tracking-widest mb-6">Plan de Lancement</h4>
                  <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-line">{result.strategy.launch}</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <ProfitCalculator 
                initialPrice={parseFloat(result.metrics.prixMoyen.replace(' €', '').replace(',', '.'))} 
                initialCost={8} 
              />
              
              <div className="p-6 rounded-3xl bg-electric/10 border border-electric/20">
                <h4 className="font-display font-bold text-lg text-white mb-2">Besoin d'aide ?</h4>
                <p className="text-sm text-slate-400 mb-6">Nos experts peuvent vous accompagner dans la mise en place de cette stratégie.</p>
                <button className="w-full py-3 bg-electric text-white font-bold rounded-xl text-sm hover:opacity-90 transition-all">
                  Réserver un Appel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [history, setHistory] = useState<{ q: string, t: string }[]>([]);
  const [savedReports, setSavedReports] = useState<ScanResult[]>([]);
  const [notification, setNotification] = useState<{ m: string, t: 'success' | 'info' | 'error' } | null>(null);
  const [query, setQuery] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState(['amazon', 'tiktok']);

  useEffect(() => {
    const savedHist = localStorage.getItem('bt_history');
    if (savedHist) setHistory(JSON.parse(savedHist));
    
    const savedReps = localStorage.getItem('bt_saved_reports');
    if (savedReps) setSavedReports(JSON.parse(savedReps));
  }, []);

  const notify = (m: string, t: 'success' | 'info' | 'error' = 'info') => {
    setNotification({ m, t });
  };

  const handleSaveReport = () => {
    if (!result) return;
    const isAlreadySaved = savedReports.some(r => r.productName === result.productName);
    if (isAlreadySaved) {
      notify("Ce rapport est déjà sauvegardé.", "info");
      return;
    }
    const newSaved = [result, ...savedReports.slice(0, 9)];
    setSavedReports(newSaved);
    localStorage.setItem('bt_saved_reports', JSON.stringify(newSaved));
    notify("Rapport sauvegardé dans votre dashboard !", "success");
  };

  const handleSearch = async (q: string, platforms: string[]) => {
    if (!q.trim()) return;
    setIsScanning(true);
    setResult(null);
    
    try {
      // Use Gemini AI to generate the report
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      
      const prompt = `Analyse le produit ou la niche suivante pour le marché français : "${q}".
      Simule une analyse approfondie sur les plateformes suivantes : ${platforms.join(', ')}.
      Retourne un rapport détaillé en JSON respectant strictement le schéma fourni.
      Sois précis sur les tendances FR, les prix en euros, et les stratégies de sourcing (AliExpress, Alibaba).
      Le ton doit être professionnel, expert en e-commerce.
      
      IMPORTANT: Pour les graphiques, génère 30 points de données réalistes pour la tendance sur 30 jours.
      Pour les publicités, invente des exemples crédibles de créatifs qui fonctionnent sur les plateformes demandées.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              winningScore: { type: Type.NUMBER },
              productName: { type: Type.STRING },
              summary: { type: Type.STRING },
              metrics: {
                type: Type.OBJECT,
                properties: {
                  demande: { type: Type.STRING },
                  tendance: { type: Type.STRING },
                  concurrence: { type: Type.STRING },
                  margeBrute: { type: Type.STRING },
                  volumeMensuel: { type: Type.STRING },
                  prixMoyen: { type: Type.STRING }
                }
              },
              trend30j: { type: Type.ARRAY, items: { type: Type.NUMBER } },
              insights: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    type: { type: Type.STRING, enum: ['good', 'warn', 'info'] },
                    icon: { type: Type.STRING },
                    title: { type: Type.STRING },
                    text: { type: Type.STRING }
                  }
                }
              },
              platforms: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    icon: { type: Type.STRING },
                    score: { type: Type.NUMBER },
                    trend: { type: Type.STRING },
                    listings: { type: Type.NUMBER },
                    stats: { type: Type.OBJECT, additionalProperties: { type: Type.STRING } }
                  }
                }
              },
              ads: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    platform: { type: Type.STRING },
                    emoji: { type: Type.STRING },
                    title: { type: Type.STRING },
                    views: { type: Type.STRING },
                    ctr: { type: Type.STRING },
                    status: { type: Type.STRING }
                  }
                }
              },
              ranking: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    rank: { type: Type.NUMBER },
                    name: { type: Type.STRING },
                    cat: { type: Type.STRING },
                    score: { type: Type.NUMBER },
                    marge: { type: Type.STRING },
                    volumeMensuel: { type: Type.STRING },
                    plateforme: { type: Type.STRING },
                    tendance: { type: Type.STRING }
                  }
                }
              },
              strategy: {
                type: Type.OBJECT,
                properties: {
                  approach: { type: Type.STRING },
                  supply: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING },
                        prix: { type: Type.STRING },
                        délai: { type: Type.STRING },
                        note: { type: Type.STRING }
                      }
                    }
                  },
                  launch: { type: Type.STRING }
                }
              }
            },
            required: ["winningScore", "productName", "summary", "metrics", "trend30j", "insights", "platforms", "ads", "ranking", "strategy"]
          }
        }
      });

      const resultData = JSON.parse(response.text || '{}');
      setResult(resultData);
      
      const newHist = [{ q, t: new Date().toISOString() }, ...history.slice(0, 19)];
      setHistory(newHist);
      localStorage.setItem('bt_history', JSON.stringify(newHist));

    } catch (error) {
      console.error("Scan failed:", error);
      // Fallback to mock if AI fails or key is missing
      alert("Note: Utilisation du mode démo (Clé API non configurée ou erreur).");
      const fallbackResponse = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q, platforms })
      });
      const data = await fallbackResponse.json();
      if (data.success) {
        setResult(data.data);
      }
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="glow-2" />
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} onNotify={notify} />
      
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {!isScanning && !result && (
                <>
                  <Hero 
                    onSearch={handleSearch} 
                    query={query} 
                    setQuery={setQuery} 
                    selectedPlatforms={selectedPlatforms} 
                    setSelectedPlatforms={setSelectedPlatforms} 
                  />
                  <MarketOverview />
                  <ToolsSection onToolClick={(q) => {
                    setQuery(q);
                    handleSearch(q, selectedPlatforms);
                  }} />
                  <TrustSection />
                </>
              )}
              {isScanning && <LoadingState />}
              {result && <Results result={result} onReset={() => setResult(null)} onNotify={notify} onSave={handleSaveReport} />}
            </motion.div>
          )}

          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-6xl mx-auto px-4 md:px-8 py-12"
            >
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="text-3xl font-display font-bold text-white">Mon Dashboard</h2>
                  <p className="text-slate-500 text-sm mt-1">Gérez vos recherches et analysez les tendances du marché.</p>
                </div>
                <button 
                  onClick={() => setActiveTab('home')}
                  className="px-6 py-3 rounded-xl bg-lime text-ink font-bold text-sm shadow-[0_0_20px_rgba(184,255,60,0.2)] hover:scale-105 transition-all"
                >
                  + Nouveau Rapport
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                  { label: 'Recherches', value: history.length.toString(), icon: Search, color: 'text-lime' },
                  { label: 'Rapports Sauvés', value: savedReports.length.toString(), icon: Save, color: 'text-electric' },
                  { label: 'Watchlist', value: '3', icon: TrendingUp, color: 'text-amber' },
                  { label: 'Plateformes', value: '11', icon: Layers, color: 'text-rose' },
                ].map((stat) => (
                  <div key={stat.label} className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-all group">
                    <div className="flex items-center justify-between mb-4">
                      <stat.icon className={cn("w-6 h-6", stat.color)} />
                      <ArrowUpRight className="w-4 h-4 text-slate-700 group-hover:text-white transition-colors" />
                    </div>
                    <div className="text-3xl font-display font-bold text-white">{stat.value}</div>
                    <div className="text-xs font-mono font-bold text-slate-500 uppercase mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  {/* Market Trends Chart */}
                  <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-xl font-display font-bold text-white">Tendances Globales (FR)</h3>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-lime" />
                          <span className="text-[10px] font-bold text-slate-500 uppercase">E-commerce</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-electric" />
                          <span className="text-[10px] font-bold text-slate-500 uppercase">Social Ads</span>
                        </div>
                      </div>
                    </div>
                    <div className="h-[250px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={[
                          { name: 'Jan', ecom: 4000, ads: 2400 },
                          { name: 'Feb', ecom: 3000, ads: 1398 },
                          { name: 'Mar', ecom: 2000, ads: 9800 },
                          { name: 'Apr', ecom: 2780, ads: 3908 },
                          { name: 'May', ecom: 1890, ads: 4800 },
                          { name: 'Jun', ecom: 2390, ads: 3800 },
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                          <XAxis dataKey="name" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                          <YAxis hide />
                          <Tooltip contentStyle={{ backgroundColor: '#0D1120', border: '1px solid #ffffff10', borderRadius: '12px' }} />
                          <Area type="monotone" dataKey="ecom" stroke="#B8FF3C" fill="#B8FF3C" fillOpacity={0.1} />
                          <Area type="monotone" dataKey="ads" stroke="#3C8CFF" fill="#3C8CFF" fillOpacity={0.1} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-display font-bold text-white">Rapports Sauvegardés</h3>
                      <button className="text-xs font-bold text-lime hover:underline">Voir tout</button>
                    </div>
                    {savedReports.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {savedReports.map((r, i) => (
                          <div 
                            key={i} 
                            onClick={() => {
                              setResult(r);
                              setActiveTab('home');
                            }}
                            className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-lime/30 transition-all cursor-pointer group"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="w-8 h-8 rounded-lg bg-lime/10 flex items-center justify-center text-lime font-bold text-xs">
                                {r.winningScore}
                              </div>
                              <ArrowUpRight className="w-4 h-4 text-slate-700 group-hover:text-lime" />
                            </div>
                            <div className="font-bold text-white group-hover:text-lime transition-colors truncate">{r.productName}</div>
                            <div className="text-[10px] text-slate-500 mt-1">{r.metrics.volumeMensuel} ventes/mois</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-slate-500 font-mono text-sm border border-dashed border-white/10 rounded-2xl">
                        Aucun rapport sauvegardé.
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 mb-6">
                      <History className="w-5 h-5 text-slate-500" />
                      <h3 className="text-xl font-display font-bold text-white">Historique</h3>
                    </div>
                    {history.length > 0 ? (
                      <div className="space-y-4">
                        {history.slice(0, 6).map((h, i) => (
                          <div 
                            key={i} 
                            onClick={() => {
                              setQuery(h.q);
                              handleSearch(h.q, ['amazon', 'tiktok']);
                              setActiveTab('home');
                            }}
                            className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-lime/30 transition-all cursor-pointer group"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="font-bold text-white group-hover:text-lime transition-colors truncate">{h.q}</div>
                              <div className="text-[10px] text-slate-500 font-mono">{new Date(h.t).toLocaleDateString('fr-FR')}</div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-lime" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-slate-500 font-mono text-sm">
                        Aucune recherche.
                      </div>
                    )}
                  </div>

                  <div className="p-8 rounded-3xl bg-gradient-to-br from-lime to-lime-2 text-ink">
                    <Zap className="w-8 h-8 mb-4 fill-ink" />
                    <h4 className="font-display font-bold text-xl mb-2">Passez à l'Elite</h4>
                    <p className="text-sm font-medium opacity-80 mb-6">Accédez aux données exclusives du marché FR et aux signaux faibles avant tout le monde.</p>
                    <button 
                      onClick={() => setActiveTab('pricing')}
                      className="w-full py-3 bg-ink text-white font-bold rounded-xl text-sm hover:opacity-90 transition-all"
                    >
                      Voir les Offres
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'integrations' && (
            <motion.div
              key="integrations"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-6xl mx-auto px-4 md:px-8 py-12"
            >
              <div className="max-w-2xl mb-12">
                <h2 className="text-3xl font-display font-bold text-white mb-4">Écosystème</h2>
                <p className="text-slate-400">Connectez vos outils stratégiques pour automatiser votre veille concurrentielle et votre sourcing.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Amazon FR', type: 'Marketplace', status: 'Connecté', icon: ShoppingBag },
                  { name: 'AliExpress', type: 'Sourcing', status: 'Connecté', icon: Globe },
                  { name: 'TikTok Ads', type: 'Social Ads', status: 'Connecté', icon: Video },
                  { name: 'Facebook Ads', type: 'Social Ads', status: 'Connecté', icon: Facebook },
                  { name: 'Instagram', type: 'Social Ads', status: 'Connecté', icon: Instagram },
                  { name: 'Shopify', type: 'E-commerce', status: 'Connecté', icon: Smartphone },
                  { name: 'Temu', type: 'Marketplace', status: 'Connecté', icon: ShoppingBag },
                  { name: 'Alibaba', type: 'Sourcing', status: 'Connecté', icon: Globe },
                ].map((int) => (
                  <div key={int.name} className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between group hover:border-lime/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-lime/10 transition-all">
                        <int.icon className="w-6 h-6 text-slate-400 group-hover:text-lime" />
                      </div>
                      <div>
                        <PlatformLogo name={int.name} size="sm" />
                        <div className="text-xs text-slate-500">{int.type}</div>
                      </div>
                    </div>
                    <div className={cn(
                      "text-[10px] font-bold px-2 py-1 rounded-md border",
                      int.status === 'Connecté' ? "bg-lime/10 border-lime/20 text-lime" : "bg-white/5 border-white/10 text-slate-600"
                    )}>
                      {int.status.toUpperCase()}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'pricing' && (
            <motion.div
              key="pricing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-6xl mx-auto px-4 md:px-8 py-12"
            >
              <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-4xl font-display font-bold text-white mb-4">Nos Solutions</h2>
                <p className="text-slate-400">Sélectionnez le niveau d'accompagnement adapté à vos ambitions de croissance.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { name: 'Starter', price: '0', desc: 'Idéal pour l\'exploration initiale', features: ['10 analyses / mois', 'Amazon & AliExpress', 'Score de potentiel de base'] },
                  { name: 'Pro', price: '49', desc: 'La référence pour les e-commerçants', features: ['Analyses illimitées', 'Accès complet aux plateformes', 'Ads Library Insights', 'Alertes stratégiques en temps réel'], popular: true },
                  { name: 'Elite', price: '149', desc: 'Performance maximale pour les experts', features: ['Tout le plan Pro', 'Accès API complet', 'Accompagnement Dédié', 'Gestion multi-comptes'] },
                ].map((plan) => (
                  <div 
                    key={plan.name} 
                    className={cn(
                      "p-8 rounded-[32px] border flex flex-col relative overflow-hidden",
                      plan.popular ? "bg-white/5 border-lime/30 shadow-[0_0_40px_rgba(184,255,60,0.05)]" : "bg-white/[0.02] border-white/10"
                    )}
                  >
                    {plan.popular && (
                      <div className="absolute top-4 right-4 bg-lime text-ink text-[10px] font-bold px-3 py-1 rounded-full">
                        POPULAIRE
                      </div>
                    )}
                    <div className="text-slate-500 font-mono text-xs font-bold mb-2 uppercase">{plan.name}</div>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-5xl font-display font-bold text-white">{plan.price}€</span>
                      <span className="text-slate-500">/mois</span>
                    </div>
                    <p className="text-sm text-slate-400 mb-8">{plan.desc}</p>
                    
                    <div className="space-y-4 mb-10 flex-1">
                      {plan.features.map(f => (
                        <div key={f} className="flex items-center gap-3 text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-lime" />
                          {f}
                        </div>
                      ))}
                    </div>

                    <button className={cn(
                      "w-full py-4 rounded-2xl font-display font-bold text-sm transition-all",
                      plan.popular ? "bg-lime text-ink hover:bg-lime/90" : "bg-white/10 text-white hover:bg-white/20"
                    )}>
                      Choisir ce plan
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-24 px-4 md:px-8 border-t border-white/5 bg-ink-lighter relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:100px_100px]" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-lime flex items-center justify-center">
                  <ZapIcon className="w-5 h-5 text-ink fill-ink" />
                </div>
                <span className="font-display text-2xl font-bold text-white tracking-tight">
                  Ben<span className="text-lime">tayeb</span>
                </span>
              </div>
              <p className="text-slate-500 max-w-sm mb-8">
                L'intelligence artificielle au service des e-commerçants français. Scannez, analysez et lancez vos produits gagnants en quelques secondes.
              </p>
              <div className="flex gap-4">
                {[FacebookIcon, InstagramIcon, VideoIcon, GlobeIcon].map((Icon, i) => (
                  <button key={i} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-lime hover:border-lime/30 transition-all">
                    <Icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Produit</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><button onClick={() => setActiveTab('home')} className="hover:text-lime transition-colors">Exploration IA</button></li>
                <li><button onClick={() => setActiveTab('dashboard')} className="hover:text-lime transition-colors">Analytique</button></li>
                <li><button onClick={() => setActiveTab('integrations')} className="hover:text-lime transition-colors">Écosystème</button></li>
                <li><button onClick={() => setActiveTab('pricing')} className="hover:text-lime transition-colors">Offres</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Légal</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-lime transition-colors">Mentions Légales</a></li>
                <li><a href="#" className="hover:text-lime transition-colors">CGU / CGV</a></li>
                <li><a href="#" className="hover:text-lime transition-colors">Confidentialité</a></li>
                <li><a href="#" className="hover:text-lime transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-slate-600 text-[10px] font-mono uppercase tracking-widest">
              © 2026 BENTAYEB AI · INTELLIGENCE PRODUIT MARCHÉ FR · TOUS DROITS RÉSERVÉS
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-[10px] font-mono font-bold text-slate-700 uppercase">
              <span>LeBonCoin</span>
              <span>Amazon FR</span>
              <span>AliExpress</span>
              <span>Vinted</span>
              <span>Facebook Ads</span>
              <span>TikTok Ads</span>
              <span>Snapchat</span>
              <span>Cdiscount</span>
              <span>Fnac</span>
              <span>Temu</span>
              <span>Alibaba</span>
              <span>Shopify</span>
            </div>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {notification && (
          <Notification 
            message={notification.m} 
            type={notification.t} 
            onClose={() => setNotification(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
