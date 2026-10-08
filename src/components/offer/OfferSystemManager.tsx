'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import TopOfferBanner from './TopOfferBanner';
import OfferPopupModal from './OfferPopupModal';
import { getApiUrl } from '@/lib/api';

export default function OfferSystemManager() {
  const pathname = usePathname();
  const router = useRouter();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [offerConfig, setOfferConfig] = useState<any>(null);

  const isOfferPage = pathname === '/offer' || pathname === '/offer/';

  useEffect(() => {
    // Fetch active offer configuration
    fetch(getApiUrl('/api/offer'))
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.offer) {
          setOfferConfig(data.offer);
        }
      })
      .catch(() => {});

    // If we're on the dedicated offer page, do not open the popup
    if (isOfferPage) {
      setIsPopupOpen(false);
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

  // If offer is globally disabled by admin, do not render banner or popup
  if (offerConfig && offerConfig.enabled === false) {
    return null;
  }

  return (
    <>
      {/* Slim Top Offer Banner directly above the Navbar */}
      <TopOfferBanner
        isVisible={isBannerVisible}
        bannerText={offerConfig?.bannerText}
        price={offerConfig?.price}
        bannerCta={offerConfig?.bannerCta}
      />

      {/* Animated Promotional Offer Popup Modal */}
      <OfferPopupModal
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onClaim={handleClaimOffer}
        headline={offerConfig?.headline}
        price={offerConfig?.price}
        supportingText={offerConfig?.popupSupportingText}
        benefits={offerConfig?.benefits}
      />
    </>
  );
}
