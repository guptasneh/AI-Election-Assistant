import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, UserCheck, Search, FileText, CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EducationHub() {
  const steps = [
    {
      icon: UserCheck,
      title: "1. Voter Registration",
      desc: "Ensure your name is on the electoral roll. You can apply online via the NVSP portal (Form 6) if you are 18+.",
      color: "text-blue-400"
    },
    {
      icon: Search,
      title: "2. Find Your Booth",
      desc: "Use our Booth Locator to find your designated polling station. Check the expected queue times before you leave.",
      color: "text-purple-400"
    },
    {
      icon: FileText,
      title: "3. Carry Valid ID",
      desc: "Bring your Voter ID (EPIC) or an approved alternative like an Aadhaar Card, Passport, or Driving License.",
      color: "text-orange-400"
    },
    {
      icon: CheckCircle,
      title: "4. Cast Your Vote",
      desc: "Verify your identity, get inked, proceed to the EVM compartment, press the blue button, and check the VVPAT slip.",
      color: "text-emerald-400"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 flex justify-center items-center gap-4">
          <BookOpen className="text-emerald-500 w-12 h-12" />
          Voter Education Hub
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Empowering citizens with the knowledge to participate in democracy confidently. Learn the process, know your rights, and practice voting.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        
        {/* Practice Module */}
        <div className="lg:col-span-1">
          <div className="glass-panel p-8 rounded-3xl border border-emerald-500/30 relative overflow-hidden h-full flex flex-col">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full -z-10 blur-xl"></div>
            
            <h2 className="text-2xl font-bold text-white mb-4">New to Voting?</h2>
            <p className="text-gray-400 mb-8 flex-1">
              Are you voting for the first time? Familiarize yourself with the Electronic Voting Machine (EVM) in our safe, interactive simulator. 
              Learn how to press the button and verify your choice on the VVPAT slip.
            </p>
            
            <Link to="/evm-simulator" className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-center transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              Try the EVM Simulator
            </Link>
          </div>
        </div>

        {/* Voting Journey */}
        <div className="lg:col-span-2 glass-panel p-8 rounded-3xl">
          <h2 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">The Voting Journey</h2>
          
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-[#0f172a] bg-gray-800 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <Icon className={`w-5 h-5 ${step.color}`} />
                  </div>
                  
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-4 rounded-xl border border-white/5 bg-white/5 shadow-lg group-hover:bg-white/10 transition-colors">
                    <h3 className={`font-bold text-lg mb-1 ${step.color}`}>{step.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Know Your Rights */}
      <div className="glass-panel p-8 rounded-3xl">
        <h2 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4 flex items-center gap-3">
          <ShieldCheck className="text-blue-500" />
          Know Your Rights
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-gray-200 mb-2">Right to Secret Ballot</h3>
            <p className="text-gray-400 text-sm">
              Your vote is completely confidential. No one can track who you voted for through the EVM. Polling agents are strictly prohibited from observing your vote.
            </p>
          </div>
          
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-gray-200 mb-2">Rule 49-O (NOTA)</h3>
            <p className="text-gray-400 text-sm">
              If you do not find any candidate suitable, you have the right to register a negative vote by pressing the "None Of The Above" (NOTA) button on the EVM.
            </p>
          </div>
          
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-gray-200 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" /> Name Missing from Roll?
            </h3>
            <p className="text-gray-400 text-sm">
              If you have a valid Voter ID but your name is not on the list at the polling booth, you unfortunately cannot vote. Always verify your name on the electoral roll days *before* the election.
            </p>
          </div>
          
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-gray-200 mb-2">Tendered Vote</h3>
            <p className="text-gray-400 text-sm">
              If someone has already cast a vote in your name, you can still vote! The Presiding Officer will issue you a "Tendered Ballot Paper" to cast your vote manually.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
