import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, UserCheck, AlertTriangle, Scale, CreditCard, ChevronRight } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

export default function TermsAndConditions() {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      icon: FileText,
      title: "Agreement to Terms",
      content: "By accessing or using the ScoreVerse platform, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service. These terms apply to all visitors, users, and others who access or use ScoreVerse."
    },
    {
      icon: UserCheck,
      title: "User Accounts",
      content: "When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service."
    },
    {
      icon: CreditCard,
      title: "Bookings and Payments",
      content: "All turf bookings and tournament registrations are subject to availability. Payments must be made in full at the time of booking. Cancellation and refund policies vary by specific turf owners and will be clearly displayed during the checkout process."
    },
    {
      icon: AlertTriangle,
      title: "User Conduct",
      content: "You agree not to use the platform for any unlawful purpose or to conduct any activity that would constitute a civil or criminal offense. Harassment, abusive language, or fraudulent activities during player auctions or on the platform will result in immediate account termination."
    },
    {
      icon: Scale,
      title: "Limitation of Liability",
      content: "ScoreVerse acts as an intermediary platform between users and turf/tournament owners. We are not liable for any physical injuries, disputes, or damages that occur at the venues booked through our platform. All matches and events are attended at your own risk."
    }
  ];

  return (
    <section className="sv-section py-24 position-relative" style={{ minHeight: '100vh', paddingTop: '120px' }}>
      <div className="container-xl position-relative z-10">
        
        <SectionTitle 
          title="Terms of Service" 
          subtitle={`Effective Date: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`}
          centered={true}
        />

        <div className="row g-4 mt-2 mx-auto" style={{ maxWidth: '1000px' }}>
          {/* Sidebar / Tabs */}
          <div className="col-12 col-lg-4">
            <div className="d-flex flex-column gap-2" style={{ position: 'sticky', top: '100px' }}>
              {sections.map((section, idx) => {
                const Icon = section.icon;
                const isActive = activeTab === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className="btn text-start d-flex align-items-center justify-content-between p-3 rounded-4 border-0 transition-all"
                    style={{
                      background: isActive ? 'rgba(255, 212, 0, 0.1)' : 'transparent',
                      color: isActive ? '#FFD400' : 'rgba(255, 255, 255, 0.6)',
                      boxShadow: isActive ? 'inset 0 0 0 1px rgba(255, 212, 0, 0.2)' : 'none'
                    }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <Icon size={20} className={isActive ? 'text-warning' : 'opacity-50'} />
                      <span className="fw-medium">{section.title}</span>
                    </div>
                    {isActive && (
                      <motion.div layoutId="activeIndicatorTerms">
                        <ChevronRight size={18} className="text-warning" />
                      </motion.div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Area */}
          <div className="col-12 col-lg-8">
            <div 
              className="p-4 p-md-5 rounded-4 h-100"
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div className="p-3 rounded-3" style={{ background: 'rgba(255, 212, 0, 0.1)' }}>
                      {React.createElement(sections[activeTab].icon, { size: 28, className: 'text-warning' })}
                    </div>
                    <h3 className="text-white fw-bold m-0 fs-3">{sections[activeTab].title}</h3>
                  </div>
                  
                  <p className="text-white-50 fs-5 mb-0" style={{ lineHeight: '1.8' }}>
                    {sections[activeTab].content}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
