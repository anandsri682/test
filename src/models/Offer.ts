import mongoose, { Schema, Document } from 'mongoose';

export interface IOfferBenefit {
  title: string;
  desc: string;
  highlight: string;
}

export interface IOfferPackage {
  id: string;
  name: string;
  enabled: boolean;
  isPrimary: boolean;
  headline: string;
  price: string;
  bannerText: string;
  bannerCta: string;
  popupSupportingText: string;
  landingHeadline: string;
  landingSubtext: string;
  ctaLink: string;
  benefits: IOfferBenefit[];
}

export interface IOfferConfig extends Document {
  enabled: boolean;
  headline: string;
  price: string;
  bannerText: string;
  bannerCta: string;
  popupSupportingText: string;
  landingHeadline: string;
  landingSubtext: string;
  ctaLink: string;
  benefits: IOfferBenefit[];
  offers: IOfferPackage[];
  updatedAt: Date;
}

const OfferBenefitSchema = new Schema<IOfferBenefit>({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  highlight: { type: String, required: true },
});

const OfferPackageSchema = new Schema<IOfferPackage>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  enabled: { type: Boolean, default: true },
  isPrimary: { type: Boolean, default: false },
  headline: { type: String, required: true },
  price: { type: String, required: true },
  bannerText: { type: String, required: true },
  bannerCta: { type: String, required: true },
  popupSupportingText: { type: String, required: true },
  landingHeadline: { type: String, required: true },
  landingSubtext: { type: String, required: true },
  ctaLink: { type: String, default: '/offer/' },
  benefits: [OfferBenefitSchema],
});

const OfferConfigSchema = new Schema<IOfferConfig>(
  {
    enabled: { type: Boolean, default: true },
    headline: { type: String, default: 'Launch Your Business Website for Just' },
    price: { type: String, default: '₹2,499' },
    bannerText: { type: String, default: 'Website + WhatsApp + 3-Month Maintenance' },
    bannerCta: { type: String, default: 'View Offer' },
    popupSupportingText: {
      type: String,
      default:
        'Take your business online with an affordable website package designed to help your business build a professional digital presence.',
    },
    landingHeadline: { type: String, default: 'Your Business Website Starts at Just' },
    landingSubtext: {
      type: String,
      default:
        'Everything you need to establish your business online, with WhatsApp integration, three months of maintenance, and a domain included for the first year.',
    },
    ctaLink: { type: String, default: '/offer/' },
    benefits: {
      type: [OfferBenefitSchema],
      default: [
        {
          title: 'Website Development',
          desc: 'Complete 5-page business website built on modern Next.js architecture.',
          highlight: '₹2,499 Setup',
        },
        {
          title: '3 Months Maintenance',
          desc: '3 months of dedicated technical support, updates, and monitoring.',
          highlight: '3 Months Included',
        },
        {
          title: 'WhatsApp Integration',
          desc: 'Direct click-to-chat WhatsApp lead capture button integrated on every page.',
          highlight: 'Integration Included',
        },
        {
          title: 'Free Domain (1 Year)',
          desc: 'Free .com or .in domain registration included for your first year.',
          highlight: '1st Year Included',
        },
      ],
    },
    offers: {
      type: [OfferPackageSchema],
      default: [
        {
          id: 'offer-2499',
          name: '₹2,499 Starter Website Offer',
          enabled: true,
          isPrimary: true,
          headline: 'Launch Your Business Website for Just',
          price: '₹2,499',
          bannerText: 'Website + WhatsApp + 3-Month Maintenance',
          bannerCta: 'View Offer',
          popupSupportingText:
            'Take your business online with an affordable website package designed to help your business build a professional digital presence.',
          landingHeadline: 'Your Business Website Starts at Just',
          landingSubtext:
            'Everything you need to establish your business online, with WhatsApp integration, three months of maintenance, and a domain included for the first year.',
          ctaLink: '/offer/',
          benefits: [
            {
              title: 'Website Development',
              desc: 'Complete 5-page business website built on modern Next.js architecture.',
              highlight: '₹2,499 Setup',
            },
            {
              title: '3 Months Maintenance',
              desc: '3 months of dedicated technical support, updates, and monitoring.',
              highlight: '3 Months Included',
            },
            {
              title: 'WhatsApp Integration',
              desc: 'Direct click-to-chat WhatsApp lead capture button integrated on every page.',
              highlight: 'Integration Included',
            },
            {
              title: 'Free Domain (1 Year)',
              desc: 'Free .com or .in domain registration included for your first year.',
              highlight: '1st Year Included',
            },
          ],
        },
      ],
    },
  },
  { timestamps: true }
);

export const DEFAULT_OFFER_DATA = {
  enabled: true,
  headline: 'Launch Your Business Website for Just',
  price: '₹2,499',
  bannerText: 'Website + WhatsApp + 3-Month Maintenance',
  bannerCta: 'View Offer',
  popupSupportingText:
    'Take your business online with an affordable website package designed to help your business build a professional digital presence.',
  landingHeadline: 'Your Business Website Starts at Just',
  landingSubtext:
    'Everything you need to establish your business online, with WhatsApp integration, three months of maintenance, and a domain included for the first year.',
  ctaLink: '/offer/',
  benefits: [
    {
      title: 'Website Development',
      desc: 'Complete 5-page business website built on modern Next.js architecture.',
      highlight: '₹2,499 Setup',
    },
    {
      title: '3 Months Maintenance',
      desc: '3 months of dedicated technical support, updates, and monitoring.',
      highlight: '3 Months Included',
    },
    {
      title: 'WhatsApp Integration',
      desc: 'Direct click-to-chat WhatsApp lead capture button integrated on every page.',
      highlight: 'Integration Included',
    },
    {
      title: 'Free Domain (1 Year)',
      desc: 'Free .com or .in domain registration included for your first year.',
      highlight: '1st Year Included',
    },
  ],
  offers: [
    {
      id: 'offer-2499',
      name: '₹2,499 Starter Website Offer',
      enabled: true,
      isPrimary: true,
      headline: 'Launch Your Business Website for Just',
      price: '₹2,499',
      bannerText: 'Website + WhatsApp + 3-Month Maintenance',
      bannerCta: 'View Offer',
      popupSupportingText:
        'Take your business online with an affordable website package designed to help your business build a professional digital presence.',
      landingHeadline: 'Your Business Website Starts at Just',
      landingSubtext:
        'Everything you need to establish your business online, with WhatsApp integration, three months of maintenance, and a domain included for the first year.',
      ctaLink: '/offer/',
      benefits: [
        {
          title: 'Website Development',
          desc: 'Complete 5-page business website built on modern Next.js architecture.',
          highlight: '₹2,499 Setup',
        },
        {
          title: '3 Months Maintenance',
          desc: '3 months of dedicated technical support, updates, and monitoring.',
          highlight: '3 Months Included',
        },
        {
          title: 'WhatsApp Integration',
          desc: 'Direct click-to-chat WhatsApp lead capture button integrated on every page.',
          highlight: 'Integration Included',
        },
        {
          title: 'Free Domain (1 Year)',
          desc: 'Free .com or .in domain registration included for your first year.',
          highlight: '1st Year Included',
        },
      ],
    },
  ],
};

export default mongoose.models.OfferConfig ||
  mongoose.model<IOfferConfig>('OfferConfig', OfferConfigSchema);
