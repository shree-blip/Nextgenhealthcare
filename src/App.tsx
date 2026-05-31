import { Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Seo from './components/Seo';
import { SITE_WIDE_SCHEMAS } from './lib/schema';
import { PageTransition, SmoothScroll, useAutoReveal } from './lib/motion';
import Home from './spa-pages/Home';
import About from './spa-pages/About';
import ValueDetail from './spa-pages/About/ValueDetail';
import Services from './spa-pages/Services';
import SEO from './spa-pages/SEO';
import GoogleBusinessProfile from './spa-pages/GoogleBusinessProfile';
import GoogleAds from './spa-pages/GoogleAds';
import Analytics from './spa-pages/Analytics';
import EmailCampaigns from './spa-pages/EmailCampaigns';
import Branding from './spa-pages/Branding';
import WebsiteDesign from './spa-pages/WebsiteDesign';
import SocialMedia from './spa-pages/SocialMedia';
import ContentMarketing from './spa-pages/ContentMarketing';
import Team from './spa-pages/Team';
import Industries from './spa-pages/Industries';
import CaseStudies from './spa-pages/CaseStudies';
import CaseStudyDetail from './spa-pages/CaseStudies/CaseStudyDetail';
import HealthcareNews from './spa-pages/HealthcareNews';
import NewsDetail from './spa-pages/HealthcareNews/NewsDetail';
import HealthcareContent from './spa-pages/HealthcareContent';
import HealthcareGrowthEngine from './spa-pages/HealthcareGrowthEngine';
import GrowthPlan from './spa-pages/GrowthPlan';
import MetaAds from './spa-pages/MetaAds';
import HipaaCompliance from './spa-pages/HipaaCompliance';
import ReviewsReputation from './spa-pages/ReviewsReputation';
import PatientExperience from './spa-pages/PatientExperience';
import CitationBuilding from './spa-pages/CitationBuilding';
import HyperLocalContent from './spa-pages/HyperLocalContent';
import AeoSchema from './spa-pages/AeoSchema';
import Automation from './spa-pages/Automation';
import AutomationMoreInfo from './spa-pages/Automation/MoreInfo';
import AutomationTemplates from './spa-pages/Automation/Templates';
import PatientIntakeWorkflow from './spa-pages/Automation/Templates/PatientIntakeWorkflow';
import ReminderCadenceWorkflow from './spa-pages/Automation/Templates/ReminderCadenceWorkflow';
import ReviewCollectionWorkflow from './spa-pages/Automation/Templates/ReviewCollectionWorkflow';
import EligibilityBotWorkflow from './spa-pages/Automation/Templates/EligibilityBotWorkflow';
import GptChatbotWorkflow from './spa-pages/Automation/Templates/GptChatbotWorkflow';
import SocialAutoPosterWorkflow from './spa-pages/Automation/Templates/SocialAutoPosterWorkflow';
import OnsiteFieldMarketing from './spa-pages/OnsiteFieldMarketing';
import MedicalAutomation from './spa-pages/MedicalAutomation';
import FreeGrowthAudit from './spa-pages/FreeGrowthAudit';
import OurWork from './spa-pages/OurWork';
import OurWorkDetail from './spa-pages/OurWork/OurWorkDetail';
import Pricing from './spa-pages/Pricing';
import Blog from './spa-pages/Blog';
import BlogPost from './spa-pages/Blog/BlogPost';
import FAQ from './spa-pages/FAQ';
import Contact from './spa-pages/Contact';
import Phase1 from './spa-pages/Phases/Phase1';
import Phase2 from './spa-pages/Phases/Phase2';
import Phase3 from './spa-pages/Phases/Phase3';
import IndustryDetail from './spa-pages/Industries/IndustryDetail';
import IndustryClinics from './spa-pages/Industries/Clinics';
import IndustryMedSpas from './spa-pages/Industries/MedSpas';
import IndustrySpecialtyEmergency from './spa-pages/Industries/SpecialtyEmergency';
import GrowthTeam from './spa-pages/Infrastructure/GrowthTeam';
import ComplianceProtocol from './spa-pages/Infrastructure/ComplianceProtocol';
import ServiceLevelAgreements from './spa-pages/Infrastructure/ServiceLevelAgreements';
import Privacy from './spa-pages/Legal/Privacy';
import Terms from './spa-pages/Legal/Terms';
import Accessibility from './spa-pages/Legal/Accessibility';
import Sitemap from './spa-pages/Legal/Sitemap';
import NotFound from './spa-pages/NotFound';
import Login from './spa-pages/Login/Login';
import Dashboard from './spa-pages/Dashboard/Dashboard';
import AdminDashboard from './spa-pages/Dashboard/AdminDashboard';
import AdminLeads from './spa-pages/Dashboard/admin/Leads';
import AdminSubscribers from './spa-pages/Dashboard/admin/Subscribers';
import AdminChatReports from './spa-pages/Dashboard/admin/ChatReports';
import AdminAiCreator from './spa-pages/Dashboard/admin/AiCreator';
import AdminBlogList from './spa-pages/Dashboard/admin/BlogList';
import AdminBlogNew from './spa-pages/Dashboard/admin/BlogNew';
import AdminBlogEdit from './spa-pages/Dashboard/admin/BlogEdit';
import AdminNewsList from './spa-pages/Dashboard/admin/NewsList';
import { SitePreferencesProvider } from './spa-pages/Dashboard/components/SitePreferencesProvider';
import { AdminPreferencesProvider } from './spa-pages/Dashboard/components/AdminPreferencesProvider';
import { AuthProvider } from './lib/AuthContext';
import { RequireAuth, RedirectIfAuthed } from './lib/RequireAuth';
import ChatBot from './components/ChatBot';
import { useLocation } from 'react-router-dom';

const AdminGate = ({ children }: { children: React.ReactNode }) => (
  <RequireAuth role="admin">
    <SitePreferencesProvider>
      <AdminPreferencesProvider>{children}</AdminPreferencesProvider>
    </SitePreferencesProvider>
  </RequireAuth>
);

// Chatbot is mounted only on public marketing pages — hidden on /dashboard/* and /login.
const PublicChatBot = () => {
  const { pathname } = useLocation();
  if (pathname.startsWith('/dashboard') || pathname === '/login') return null;
  return <ChatBot />;
};

const App = () => {
  // Auto-attach scroll-reveal observers to known structural patterns
  // (sections, headers, card grids) on every route mount.
  useAutoReveal();

  return (
    <AuthProvider>
    <SitePreferencesProvider>
    <div className="shell">
      {/* Site-wide SEO foundation. Emits Organization + WebSite +
          ProfessionalService JSON-LD on every route. Page-level <Seo />
          (added per page in later waves) layers title / description /
          canonical / OG / page-specific schema on top.

          ProfessionalService (not MedicalBusiness) is the correct
          LocalBusiness subtype for a healthcare marketing agency —
          MedicalBusiness would misrepresent this site as a medical
          provider. */}
      <Seo schema={SITE_WIDE_SCHEMAS} />

      <div className="grid-overlay" aria-hidden="true" />
      <ScrollToTop />
      <SmoothScroll />
      <Navbar />
      <PageTransition>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/value/:slug" element={<ValueDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/seo" element={<SEO />} />
          <Route
            path="/services/seo-local-search"
            element={<Navigate to="/services/seo" replace />}
          />
          <Route path="/services/google-business-profile" element={<GoogleBusinessProfile />} />
          <Route path="/services/google-ads" element={<GoogleAds />} />
          <Route path="/services/analytics-reporting" element={<Analytics />} />
          <Route path="/services/email-drip-campaigns" element={<EmailCampaigns />} />
          <Route path="/services/brand-identity-design" element={<Branding />} />
          <Route path="/services/website-design-dev" element={<WebsiteDesign />} />
          <Route path="/services/social-media-marketing" element={<SocialMedia />} />
          <Route path="/services/content-copywriting" element={<ContentMarketing />} />
          <Route path="/team" element={<Team />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
          <Route path="/healthcare-news" element={<HealthcareNews />} />
          <Route path="/healthcare-news/:slug" element={<NewsDetail />} />
          <Route path="/healthcare-content" element={<HealthcareContent />} />
          <Route path="/growth-plan" element={<GrowthPlan />} />
          <Route path="/meta-ads" element={<MetaAds />} />
          <Route path="/hipaa-compliance" element={<HipaaCompliance />} />
          <Route path="/healthcare-growth-engine" element={<HealthcareGrowthEngine />} />
          <Route path="/reviews-reputation" element={<ReviewsReputation />} />
          <Route path="/patient-experience" element={<PatientExperience />} />
          <Route path="/citation-building" element={<CitationBuilding />} />
          <Route path="/hyper-local-content" element={<HyperLocalContent />} />
          <Route path="/aeo-schema" element={<AeoSchema />} />
          <Route path="/automation" element={<Automation />} />
          <Route path="/automation/more-info" element={<AutomationMoreInfo />} />
          <Route path="/automation/templates" element={<AutomationTemplates />} />
          <Route
            path="/automation/templates/patient-intake"
            element={<PatientIntakeWorkflow />}
          />
          <Route
            path="/automation/templates/reminder-cadence"
            element={<ReminderCadenceWorkflow />}
          />
          <Route
            path="/automation/templates/review-collection"
            element={<ReviewCollectionWorkflow />}
          />
          <Route
            path="/automation/templates/eligibility-bot"
            element={<EligibilityBotWorkflow />}
          />
          <Route
            path="/automation/templates/gpt-chatbot"
            element={<GptChatbotWorkflow />}
          />
          <Route
            path="/automation/templates/social-auto-poster"
            element={<SocialAutoPosterWorkflow />}
          />
          <Route path="/onsite-field-marketing" element={<OnsiteFieldMarketing />} />
          <Route path="/medical-automation" element={<MedicalAutomation />} />
          <Route path="/free-growth-audit" element={<FreeGrowthAudit />} />
          <Route path="/our-work" element={<OurWork />} />
          <Route path="/our-work/:kind/:slug" element={<OurWorkDetail />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/methodology/phase-1" element={<Phase1 />} />
          <Route path="/methodology/phase-2" element={<Phase2 />} />
          <Route path="/methodology/phase-3" element={<Phase3 />} />
          <Route path="/industries/detail/:slug" element={<IndustryDetail />} />
          <Route path="/industries/clinics" element={<IndustryClinics />} />
          <Route path="/industries/medspas" element={<IndustryMedSpas />} />
          <Route path="/industries/specialty-emergency" element={<IndustrySpecialtyEmergency />} />
          <Route path="/infrastructure/growth-team" element={<GrowthTeam />} />
          <Route path="/infrastructure/compliance-protocol" element={<ComplianceProtocol />} />
          <Route
            path="/infrastructure/service-level-agreements"
            element={<ServiceLevelAgreements />}
          />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route
            path="/login"
            element={
              <RedirectIfAuthed>
                <Login />
              </RedirectIfAuthed>
            }
          />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/dashboard/client"
            element={
              <RequireAuth role="client">
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route path="/dashboard/admin" element={<AdminGate><AdminDashboard /></AdminGate>} />
          <Route path="/dashboard/admin/leads" element={<AdminGate><AdminLeads /></AdminGate>} />
          <Route path="/dashboard/admin/subscribers" element={<AdminGate><AdminSubscribers /></AdminGate>} />
          <Route path="/dashboard/admin/chat-reports" element={<AdminGate><AdminChatReports /></AdminGate>} />
          <Route path="/dashboard/admin/ai-creator" element={<AdminGate><AdminAiCreator /></AdminGate>} />
          <Route path="/dashboard/admin/blog" element={<AdminGate><AdminBlogList /></AdminGate>} />
          <Route path="/dashboard/admin/blog/new" element={<AdminGate><AdminBlogNew /></AdminGate>} />
          <Route path="/dashboard/admin/blog/edit/:id" element={<AdminGate><AdminBlogEdit /></AdminGate>} />
          <Route path="/dashboard/admin/news" element={<AdminGate><AdminNewsList /></AdminGate>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
      <Footer />
      <PublicChatBot />
    </div>
    </SitePreferencesProvider>
    </AuthProvider>
  );
};

export default App;
