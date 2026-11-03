/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './i18n/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { ActivePageView, Navbar } from './components/Navbar';
import { NavigationDrawer } from './components/NavigationDrawer';
import { HeroSection } from './components/HeroSection';
import { VideoShowcaseSection } from './components/VideoShowcaseSection';
import { OfficialScreenshotsGallery } from './components/OfficialScreenshotsGallery';
import { BentoFeaturesSection } from './components/BentoFeaturesSection';
import { PrivacyDriveSection } from './components/PrivacyDriveSection';
import { UpdatesChangelogSection } from './components/UpdatesChangelogSection';
import { VisionMissionSection } from './components/VisionMissionSection';
import { OfficialFaqSection } from './components/OfficialFaqSection';
import { PrivacyPolicyView } from './components/PrivacyPolicyView';
import { Footer } from './components/Footer';
import { EASE_OUT_EXPO } from './components/motionPrimitives';

function AppShell() {
  const [activeView, setActiveView] = useState<ActivePageView>(() =>
    typeof window !== 'undefined' && window.location.hash === '#privacy-policy'
      ? 'privacy-policy'
      : 'home'
  );
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash === '#privacy-policy') {
        setActiveView('privacy-policy');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (activeView === 'privacy-policy') {
        setActiveView('home');
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [activeView]);

  const handleOpenPrivacyPolicy = () => {
    setActiveView('privacy-policy');
    window.history.replaceState(
      null,
      '',
      `${window.location.pathname}${window.location.search}#privacy-policy`
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateSection = (sectionId: string) => {
    if (activeView !== 'home') {
      setActiveView('home');
      window.history.replaceState(
        null,
        '',
        sectionId === 'top'
          ? `${window.location.pathname}${window.location.search}`
          : `${window.location.pathname}${window.location.search}#${sectionId}`
      );
      setTimeout(() => {
        if (sectionId === 'top') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }
      }, 60);
      return;
    }

    if (sectionId === 'top') {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.history.replaceState(
        null,
        '',
        `${window.location.pathname}${window.location.search}#${sectionId}`
      );
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#060B16] text-slate-900 dark:text-slate-100 transition-colors duration-150">
      <Navbar
        activeView={activeView}
        onNavigateSection={handleNavigateSection}
        onOpenPrivacyPolicy={handleOpenPrivacyPolicy}
        onOpenDrawer={() => setDrawerOpen(true)}
      />

      <NavigationDrawer
        isOpen={drawerOpen}
        activeView={activeView}
        onClose={() => setDrawerOpen(false)}
        onNavigateSection={handleNavigateSection}
        onOpenPrivacyPolicy={handleOpenPrivacyPolicy}
      />

      <AnimatePresence mode="wait">
        {activeView === 'privacy-policy' ? (
          <motion.div
            key="privacy-policy-view"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: EASE_OUT_EXPO }}
            className="flex-1"
          >
            <PrivacyPolicyView onBackHome={() => handleNavigateSection('top')} />
          </motion.div>
        ) : (
          <motion.main
            key="home-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: EASE_OUT_EXPO }}
            className="flex-1"
          >
            <HeroSection
              onExploreFeatures={() => handleNavigateSection('gallery')}
              onWatchVideo={() => handleNavigateSection('video-showcase')}
              onNavigateUpdates={() => handleNavigateSection('updates')}
            />
            <VideoShowcaseSection
              onExploreGallery={() => handleNavigateSection('gallery')}
            />
            <OfficialScreenshotsGallery />
            <BentoFeaturesSection />
            <PrivacyDriveSection onOpenPrivacyPolicy={handleOpenPrivacyPolicy} />
            <UpdatesChangelogSection />
            <VisionMissionSection
              onNavigateUpdates={() => handleNavigateSection('updates')}
            />
            <OfficialFaqSection
              onNavigateUpdates={() => handleNavigateSection('updates')}
            />
          </motion.main>
        )}
      </AnimatePresence>

      <Footer
        onNavigateSection={handleNavigateSection}
        onOpenPrivacyPolicy={handleOpenPrivacyPolicy}
      />
    </div>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <AppShell />
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </MotionConfig>
  );
}
