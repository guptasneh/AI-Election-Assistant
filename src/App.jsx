import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { DataProvider } from './context/DataContext';
import { Layout } from './components/layout/Layout';

// Stubs for lazy loaded routes
import { Home } from './pages/Home';

// Lazy load major modules
const Login = React.lazy(() => import('./pages/auth/Login').catch(() => ({ default: () => <div className="p-10">Module Loading...</div> })));
const AadhaarVerification = React.lazy(() => import('./pages/auth/AadhaarVerification').catch(() => ({ default: () => <div className="p-10">Module Loading...</div> })));
const VoterDashboard = React.lazy(() => import('./pages/dashboard/VoterDashboard').catch(() => ({ default: () => <div className="p-10 text-white">Module Loading...</div> })));
const AdminDashboard = React.lazy(() => import('./pages/dashboard/AdminDashboard').catch(() => ({ default: () => <div className="p-10 text-white">Module Loading...</div> })));

const ManifestoComparator = React.lazy(() => import('./pages/election/ManifestoComparator').catch(() => ({ default: () => <div className="p-10 text-white">Module Loading...</div> })));
const CandidateProfile = React.lazy(() => import('./pages/election/CandidateProfile').catch(() => ({ default: () => <div className="p-10 text-white">Module Loading...</div> })));
const TruthShield = React.lazy(() => import('./pages/ai/TruthShield').catch(() => ({ default: () => <div className="p-10 text-white">Module Loading...</div> })));
const VoteMatchAI = React.lazy(() => import('./pages/ai/VoteMatchAI').catch(() => ({ default: () => <div className="p-10 text-white">Module Loading...</div> })));
const LiveElectionInsights = React.lazy(() => import('./pages/ai/LiveElectionInsights').catch(() => ({ default: () => <div className="p-10 text-white">Module Loading...</div> })));
const SentimentAnalyzer = React.lazy(() => import('./pages/ai/SentimentAnalyzer').catch(() => ({ default: () => <div className="p-10 text-white">Module Loading...</div> })));
const BoothNavMap = React.lazy(() => import('./pages/map/BoothNavMap').catch(() => ({ default: () => <div className="p-10 text-white">Module Loading...</div> })));
const ReportIssue = React.lazy(() => import('./pages/dashboard/ReportIssue').catch(() => ({ default: () => <div className="p-10 text-white">Module Loading...</div> })));

const EducationHub = React.lazy(() => import('./pages/education/EducationHub').catch(() => ({ default: () => <div className="p-10 text-white">Module Loading...</div> })));
const EVMSimulator = React.lazy(() => import('./pages/education/EVMSimulator').catch(() => ({ default: () => <div className="p-10 text-white">Module Loading...</div> })));

const LoadingFallback = () => (
  <div className="flex justify-center items-center h-64">
    <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <DataProvider>
            <Layout>
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/auth" element={<Login />} />
                  <Route path="/verify-aadhaar" element={<AadhaarVerification />} />
                  <Route path="/dashboard" element={<VoterDashboard />} />
                  <Route path="/admin-dashboard" element={<AdminDashboard />} />
                  
                  <Route path="/compare-manifesto" element={<ManifestoComparator />} />
                  <Route path="/candidate/:id" element={<CandidateProfile />} />
                  <Route path="/fact-check" element={<TruthShield />} />
                  <Route path="/quiz" element={<VoteMatchAI />} />
                  <Route path="/insights" element={<LiveElectionInsights />} />
                  <Route path="/sentiment-analyzer" element={<SentimentAnalyzer />} />
                  <Route path="/booth-locator" element={<BoothNavMap />} />
                  <Route path="/report-issue" element={<ReportIssue />} />
                  
                  <Route path="/education" element={<EducationHub />} />
                  <Route path="/evm-simulator" element={<EVMSimulator />} />
                  
                  <Route path="*" element={<div className="p-20 text-center text-gray-500 font-heading text-2xl">Page under construction via BoothNav Assist™</div>} />
                </Routes>
              </Suspense>
            </Layout>
          </DataProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
