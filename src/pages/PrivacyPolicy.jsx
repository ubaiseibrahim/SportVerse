import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Eye, Share2, Mail, Trash2, ChevronRight } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

export default function PrivacyPolicy() {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      icon: Eye,
      title: "Information We Collect",
      content: "When you use ScoreVerse, we collect information you provide directly to us, such as your name, email address, phone number, and location data when you book a turf or register for a tournament. We also automatically collect certain device and usage data to improve your experience."
    },
    {
      icon: Shield,
      title: "How We Use Data",
      content: "We use the information we collect to provide, maintain, and improve our services. This includes processing transactions, sending notifications about bookings and match updates, running player auctions, and personalizing your dashboard experience on the platform."
    },
    {
      icon: Lock,
      title: "Data Security",
      content: "We implement industry-standard security measures, including end-to-end encryption for payment processing and secure data storage, to protect your personal information from unauthorized access, alteration, or disclosure."
    },
    {
      icon: Share2,
      title: "Sharing of Information",
      content: "We do not sell your personal data. We only share necessary information with turf owners (e.g., your name and phone number) to facilitate your bookings, or with trusted service providers who assist us in operating the platform securely."
    },
    {
      icon: Trash2,
      title: "Account Deletion",
      content: (
        <>
          You have the right to request the deletion of your account and associated personal data at any time. To request account deletion, please email us at <a href="mailto:supportatscoreverse@gmail.com" className="text-warning text-decoration-none fw-semibold">supportatscoreverse@gmail.com</a> with the subject "Account Deletion Request". We process requests within 7 business days.
        </>
      )
    },
    {
      icon: Mail,
      title: "Contact Us",
      content: (
        <>
          If you have any questions, concerns, or requests regarding this Privacy Policy or your data, please reach out to our privacy team at <a href="mailto:supportatscoreverse@gmail.com" className="text-warning text-decoration-none fw-semibold">supportatscoreverse@gmail.com</a>.
        </>
      )
    }
  ];

  return (
    <section className="sv-section py-24 position-relative" style={{ minHeight: '100vh', paddingTop: '120px' }}>
      <div className="container-xl position-relative z-10">

        <SectionTitle
          title="Privacy Policy"
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
                      <motion.div layoutId="activeIndicator">
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
