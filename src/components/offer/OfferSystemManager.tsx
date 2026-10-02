'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import TopOfferBanner from './TopOfferBanner';
import OfferPopupModal from './OfferPopupModal';

export default function OfferSystemManager() {
  const pathname = usePathname();
  const router = useRouter();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  const isOfferPage = pathname === '/offer' || pathname === '/offer/';

  useEffect(() => {
    // If we're on the dedicated offer page, do not open the popup
    if (isOfferPage) {
      setIsPopupOpen(false);
      // Keep banner visible or hide depending on layout
      setIsBannerVisible(true);
      return;
    }

    try {
      const isClosedInSession = sessionStorage.getItem('avm_offer_popup_closed') === 'true';

      if (isClosedInSession) {
        setIsBannerVisible(true);
        setIsPopupOpen(false);
      } else {
        // Open popup after ~1s natural delay on initial visit
        const timer = setTimeout(() => {
          setIsPopupOpen(true);
        }, 1000);

        return () => clearTimeout(timer);
      }
    } catch (e) {
      // Fallback if sessionStorage is disabled/blocked
      const timer = setTimeout(() => {
        setIsPopupOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [pathname, isOfferPage]);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setIsBannerVisible(true);
    try {
      sessionStorage.setItem('avm_offer_popup_closed', 'true');
    } catch (e) {
      // Ignore storage errors
    }
  };

  const handleClaimOffer = () => {
    setIsPopupOpen(false);
    setIsBannerVisible(true);
    try {
      sessionStorage.setItem('avm_offer_popup_closed', 'true');
    } catch (e) {
      // Ignore storage errors
    }
    router.push('/offer/');
  };

  return (
    <>
      {/* Slim Top Offer Banner directly above the Navbar */}
      <TopOfferBanner isVisible={isBannerVisible} />

      {/* Animated Promotional Offer Popup Modal */}
      <OfferPopupModal
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onClaim={handleClaimOffer}
      />
    </>
  );
}
