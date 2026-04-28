import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Map, Activity, BarChart3, ChevronRight, Fingerprint, Lock, BookOpen } from 'lucide-react';

export const Home = () => {

  const features = [
    { title: 'Voter Education Hub', desc: 'Learn the voting process, know your rights, and try our EVM Simulator.', icon: BookOpen, color: 'emerald', link: '/education' },
    { title: 'BoothNav™', desc: 'Real-time queue tracking & smart map routing to your polling center.', icon: Map, color: 'blue', link: '/booth-locator' },
    { title: 'TruthShield™', desc: 'AI-powered fact-checking for election news and deepfakes.', icon: ShieldCheck, color: 'emerald', link: '/fact-check' },
    { title: 'VoteMatch AI™', desc: 'Match your personal priority issues with candidate manifestos.', icon: Activity, color: 'purple', link: '/quiz' },
    { title: 'LiveElectionInsights™', desc: 'Real-time turnout, demographic analytics, and sentiment indexing.', icon: BarChart3, color: 'orange', link: '/insights' }
  ];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/20 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] rounded-full bg-blue-500/20 blur-[150px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto text-center z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-semibold mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Live: National Election 2026
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold text-white leading-tight mb-6 tracking-tight">
             <span className="block">The Future of Voting is Here</span>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500">
               Secured by AI
             </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            Empowering citizens with AI-driven election intelligence, seamless booth navigation, and verified promises.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth" className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(16,185,129,0.4)] group">
              <Fingerprint className="w-6 h-6 group-hover:scale-110 transition-transform" /> Access Voter Dashboard
            </Link>
            <Link to="/booth-locator" className="w-full sm:w-auto px-8 py-4 glass-panel border border-white/10 hover:border-white/20 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all group">
              Find My Booth <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Trust Banner */}
      <section className="border-y border-white/5 bg-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-around items-center gap-8 opacity-60">
           <div className="flex items-center gap-2 font-heading font-bold text-xl"><Lock className="w-5 h-5"/> ECI Compliant</div>
           <div className="font-heading font-bold text-xl tracking-widest text-emerald-500">PROMISEPULSE™</div>
           <div className="font-heading font-bold text-xl tracking-widest text-blue-500">QUEUESENSE™</div>
           <div className="font-heading font-bold text-xl tracking-widest text-purple-500">TRUSTINDEX™</div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto z-10 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">Ecosystem Intelligence</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Seamless modules designed to bring unprecedented transparency to the electoral process.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link to={feat.link} className="block h-full glass-panel p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all hover:-translate-y-2 group">
                  <div className={`w-14 h-14 rounded-2xl bg-${feat.color}-500/20 flex items-center justify-center mb-6 border border-${feat.color}-500/30 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-7 h-7 text-${feat.color}-400`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-6">{feat.desc}</p>
                  <div className={`text-sm font-semibold text-${feat.color}-400 flex items-center gap-1 group-hover:gap-2 transition-all`}>
                    Explore module <ChevronRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </section>
      
      {/* Footer Call to Action */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center relative z-10">
         <div className="glass-panel p-12 rounded-[3rem] border border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.15)] bg-gradient-to-b from-emerald-900/20 to-transparent">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">Ready to shape the future?</h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">Verify your identity instantly using our mock Aadhaar verification flow and explore your personalized constituency data.</p>
            <Link to="/auth" className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors">
              Begin Demo
            </Link>
         </div>
      </section>
    </div>
  );
};

