import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Heart,
  Users,
  Sparkles,
  ShieldCheck,
  MapPin,
  Images,
  HandHeart,
  UserRoundPlus,
  Newspaper,
} from "lucide-react";

import PublicHero from "@/components/public/PublicHero";
import { prisma } from "@/lib/prisma";

type Locale = "en" | "hi" | "gu";

const content: Record<
  Locale,
  {
    introLabel: string;
    introTitle: string;
    introText: string;

    missionLabel: string;
    missionTitle: string;
    missionText: string;

    activitiesLabel: string;
    activitiesTitle: string;
    activitiesText: string;

    cultureLabel: string;
    cultureTitle: string;
    cultureText: string;

    eventsLabel: string;
    eventsTitle: string;
    eventsText: string;

    newsLabel: string;
    newsTitle: string;
    newsText: string;

    galleryLabel: string;
    galleryTitle: string;
    galleryText: string;

    membershipLabel: string;
    membershipTitle: string;
    membershipText: string;

    ctaTitle: string;
    ctaText: string;

    join: string;
    explore: string;
    viewAll: string;
    viewEvents: string;
    viewNews: string;
    viewGallery: string;
    noContent: string;

    community: string;
    culture: string;
    activities: string;
    events: string;
    values: string;
    members: string;
    news: string;
  }
> = {
  en: {
    introLabel: "ABOUT ASK",
    introTitle:
      "A community built around people, culture and connection.",
    introText:
      "Ahhichatra Sanskar Kendra is a community platform created to bring people together, celebrate shared values, encourage participation and create meaningful connections across generations.",

    missionLabel: "OUR PURPOSE",
    missionTitle:
      "Keeping our community connected in a changing world",
    missionText:
      "ASK brings community members together through cultural activities, social participation, events and a shared digital space where everyone can stay connected.",

    activitiesLabel: "COMMUNITY LIFE",
    activitiesTitle: "There is always something happening.",
    activitiesText:
      "Discover the latest activities published by the ASK community.",

    cultureLabel: "CULTURE & VALUES",
    cultureTitle: "Traditions that connect generations.",
    cultureText: "Our community values culture, relationships, respect and togetherness while creating opportunities that connect generations.",
    eventsLabel: "UPCOMING EVENTS",
    eventsTitle: "Meet. Celebrate. Participate.",
    eventsText:
      "Stay informed about community gatherings, cultural celebrations and activities happening around ASK.",

    newsLabel: "LATEST NEWS",
    newsTitle: "What's happening in our community.",
    newsText:
      "Read the latest announcements, updates and stories published by ASK.",

    galleryLabel: "COMMUNITY GALLERY",
    galleryTitle: "Moments that bring us together.",
    galleryText:
      "Explore the latest memories and photographs shared by the ASK community.",

    membershipLabel: "BECOME PART OF ASK",
    membershipTitle:
      "Your community is stronger when you participate.",
    membershipText:
      "Join ASK and create your community profile, discover activities, connect with members and stay informed about what is happening.",

    ctaTitle: "Let's stay connected.",
    ctaText:
      "Join the ASK Community Portal and become part of a growing community built around connection, culture and participation.",

    join: "Join ASK",
    explore: "Explore Community",
    viewAll: "View All",
    viewEvents: "View All Events",
    viewNews: "View All News",
    viewGallery: "View Gallery",
    noContent: "No published content available yet.",

    community: "Community",
    culture: "Culture",
    activities: "Activities",
    events: "Events",
    values: "Shared Values",
    members: "Members",
    news: "News",
  },
  hi: {
    introLabel: "\u0041\u0053\u004b\u0020\u0915\u0947\u0020\u092c\u093e\u0930\u0947\u0020\u092e\u0947\u0902",
    introTitle: "\u0932\u094b\u0917\u094b\u0902\u002c\u0020\u0938\u0902\u0938\u094d\u0915\u0943\u0924\u093f\u0020\u0914\u0930\u0020\u091c\u0941\u0921\u093c\u093e\u0935\u0020\u0938\u0947\u0020\u092c\u0928\u093e\u0020\u090f\u0915\u0020\u0938\u092e\u0941\u0926\u093e\u092f\u0964",
    introText: "\u0905\u0939\u093f\u091a\u094d\u091b\u0924\u094d\u0930\u0020\u0938\u0902\u0938\u094d\u0915\u093e\u0930\u0020\u0915\u0947\u0902\u0926\u094d\u0930\u0020\u090f\u0915\u0020\u0938\u093e\u092e\u0941\u0926\u093e\u092f\u093f\u0915\u0020\u092e\u0902\u091a\u0020\u0939\u0948\u0020\u091c\u094b\u0020\u0932\u094b\u0917\u094b\u0902\u0020\u0915\u094b\u0020\u091c\u094b\u0921\u093c\u0928\u0947\u002c\u0020\u0938\u093e\u091d\u093e\u0020\u092e\u0942\u0932\u094d\u092f\u094b\u0902\u0020\u0915\u094b\u0020\u0906\u0917\u0947\u0020\u092c\u0922\u093c\u093e\u0928\u0947\u002c\u0020\u092d\u093e\u0917\u0940\u0926\u093e\u0930\u0940\u0020\u0915\u094b\u0020\u092a\u094d\u0930\u094b\u0924\u094d\u0938\u093e\u0939\u093f\u0924\u0020\u0915\u0930\u0928\u0947\u0020\u0914\u0930\u0020\u092a\u0940\u0922\u093c\u093f\u092f\u094b\u0902\u0020\u0915\u0947\u0020\u092c\u0940\u091a\u0020\u0938\u093e\u0930\u094d\u0925\u0915\u0020\u0938\u0902\u092c\u0902\u0927\u0020\u092c\u0928\u093e\u0928\u0947\u0020\u0915\u0947\u0020\u0932\u093f\u090f\u0020\u092c\u0928\u093e\u092f\u093e\u0020\u0917\u092f\u093e\u0020\u0939\u0948\u0964",
    missionLabel: "\u0939\u092e\u093e\u0930\u093e\u0020\u0909\u0926\u094d\u0926\u0947\u0936\u094d\u092f",
    missionTitle: "\u092c\u0926\u0932\u0924\u0940\u0020\u0926\u0941\u0928\u093f\u092f\u093e\u0020\u092e\u0947\u0902\u0020\u0905\u092a\u0928\u0947\u0020\u0938\u092e\u0941\u0926\u093e\u092f\u0020\u0915\u094b\u0020\u091c\u0941\u0921\u093c\u0947\u0020\u0930\u0916\u0928\u093e\u0964",
    missionText: "\u0041\u0053\u004b\u0020\u0938\u093e\u0902\u0938\u094d\u0915\u0943\u0924\u093f\u0915\u0020\u0917\u0924\u093f\u0935\u093f\u0927\u093f\u092f\u094b\u0902\u002c\u0020\u0938\u093e\u092e\u093e\u091c\u093f\u0915\u0020\u092d\u093e\u0917\u0940\u0926\u093e\u0930\u0940\u002c\u0020\u0915\u093e\u0930\u094d\u092f\u0915\u094d\u0930\u092e\u094b\u0902\u0020\u0914\u0930\u0020\u0921\u093f\u091c\u093f\u091f\u0932\u0020\u0938\u092e\u0941\u0926\u093e\u092f\u0020\u0915\u0947\u0020\u092e\u093e\u0927\u094d\u092f\u092e\u0020\u0938\u0947\u0020\u0938\u0926\u0938\u094d\u092f\u094b\u0902\u0020\u0915\u094b\u0020\u090f\u0915\u0020\u0938\u093e\u0925\u0020\u091c\u094b\u0921\u093c\u0924\u093e\u0020\u0939\u0948\u0964",
    activitiesLabel: "\u0938\u093e\u092e\u0941\u0926\u093e\u092f\u093f\u0915\u0020\u091c\u0940\u0935\u0928",
    activitiesTitle: "\u0939\u092e\u093e\u0930\u0947\u0020\u0938\u092e\u0941\u0926\u093e\u092f\u0020\u092e\u0947\u0902\u0020\u0939\u092e\u0947\u0936\u093e\u0020\u0915\u0941\u091b\u0020\u0928\u0020\u0915\u0941\u091b\u0020\u0939\u094b\u0924\u093e\u0020\u0930\u0939\u0924\u093e\u0020\u0939\u0948\u0964",
    activitiesText: "\u0041\u0053\u004b\u0020\u0938\u092e\u0941\u0926\u093e\u092f\u0020\u0926\u094d\u0935\u093e\u0930\u093e\u0020\u092a\u094d\u0930\u0915\u093e\u0936\u093f\u0924\u0020\u0928\u0935\u0940\u0928\u0924\u092e\u0020\u0917\u0924\u093f\u0935\u093f\u0927\u093f\u092f\u094b\u0902\u0020\u0915\u094b\u0020\u0926\u0947\u0916\u0947\u0902\u0964",
    cultureLabel: "\u0938\u0902\u0938\u094d\u0915\u0943\u0924\u093f\u0020\u0914\u0930\u0020\u092e\u0942\u0932\u094d\u092f",
    cultureTitle: "\u0910\u0938\u0940 \u092a\u0930\u0902\u092a\u0930\u093e\u090f\u0902 \u091c\u094b \u092a\u0940\u0922\u093c\u093f\u092f\u094b\u0902 \u0915\u094b \u091c\u094b\u0921\u0924\u0940 \u0939\u0948\u0902\u0964",
    cultureText: "\u0939\u092e \u0938\u0902\u0938\u094d\u0915\u0943\u0924\u093f\u002c \u0930\u093f\u0936\u094d\u0924\u094b\u0902\u002c \u0938\u092e\u094d\u092e\u093e\u0928 \u0914\u0930 \u0938\u093e\u0925 \u0930\u0939\u0928\u0947 \u0915\u0940 \u092d\u093e\u0935\u0928\u093e \u0915\u094b \u092e\u0939\u0924\u094d\u0935 \u0926\u0947\u0924\u0947 \u0939\u0948\u0902 \u0914\u0930 \u0938\u092d\u0940 \u092a\u0940\u0922\u093c\u093f\u092f\u094b\u0902 \u0915\u094b \u091c\u094b\u0921\u093c\u0928\u0947 \u0915\u0947 \u0905\u0935\u0938\u0930 \u092c\u0928\u093e\u0924\u0947 \u0939\u0948\u0902\u0964",
    eventsLabel: "\u0906\u0917\u093e\u092e\u0940\u0020\u0915\u093e\u0930\u094d\u092f\u0915\u094d\u0930\u092e",
    eventsTitle: "\u092e\u093f\u0932\u0947\u0902\u0964\u0020\u0909\u0924\u094d\u0938\u0935\u0020\u092e\u0928\u093e\u090f\u0902\u0964\u0020\u092d\u093e\u0917\u0020\u0932\u0947\u0902\u0964",
    eventsText: "\u0041\u0053\u004b\u0020\u0915\u0947\u0020\u0938\u093e\u092e\u0941\u0926\u093e\u092f\u093f\u0915\u0020\u0915\u093e\u0930\u094d\u092f\u0915\u094d\u0930\u092e\u094b\u0902\u002c\u0020\u0938\u093e\u0902\u0938\u094d\u0915\u0943\u0924\u093f\u0915\u0020\u0938\u092e\u093e\u0930\u094b\u0939\u094b\u0902\u0020\u0914\u0930\u0020\u0917\u0924\u093f\u0935\u093f\u0927\u093f\u092f\u094b\u0902\u0020\u0915\u0940\u0020\u091c\u093e\u0928\u0915\u093e\u0930\u0940\u0020\u092a\u094d\u0930\u093e\u092a\u094d\u0924\u0020\u0915\u0930\u0947\u0902\u0964",
    newsLabel: "\u0928\u0935\u0940\u0928\u0924\u092e\u0020\u0938\u092e\u093e\u091a\u093e\u0930",
    newsTitle: "\u0939\u092e\u093e\u0930\u0947\u0020\u0938\u092e\u0941\u0926\u093e\u092f\u0020\u092e\u0947\u0902\u0020\u0915\u094d\u092f\u093e\u0020\u0939\u094b\u0020\u0930\u0939\u093e\u0020\u0939\u0948\u0964",
    newsText: "\u0041\u0053\u004b\u0020\u0926\u094d\u0935\u093e\u0930\u093e\u0020\u092a\u094d\u0930\u0915\u093e\u0936\u093f\u0924\u0020\u0928\u0935\u0940\u0928\u0924\u092e\u0020\u0918\u094b\u0937\u0923\u093e\u090f\u0902\u002c\u0020\u0905\u092a\u0921\u0947\u091f\u0020\u0914\u0930\u0020\u0938\u092e\u093e\u091a\u093e\u0930\u0020\u092a\u0922\u093c\u0947\u0902\u0964",
    galleryLabel: "\u0938\u093e\u092e\u0941\u0926\u093e\u092f\u093f\u0915\u0020\u0917\u0948\u0932\u0930\u0940",
    galleryTitle: "\u0935\u0947\u0020\u092a\u0932\u0020\u091c\u094b\u0020\u0939\u092e\u0947\u0902\u0020\u0938\u093e\u0925\u0020\u0932\u093e\u0924\u0947\u0020\u0939\u0948\u0902\u0964",
    galleryText: "\u0041\u0053\u004b\u0020\u0938\u092e\u0941\u0926\u093e\u092f\u0020\u0926\u094d\u0935\u093e\u0930\u093e\u0020\u0938\u093e\u091d\u093e\u0020\u0915\u0940\u0020\u0917\u0908\u0020\u0928\u0935\u0940\u0928\u0924\u092e\u0020\u0924\u0938\u094d\u0935\u0940\u0930\u094b\u0902\u0020\u0914\u0930\u0020\u092f\u093e\u0926\u094b\u0902\u0020\u0915\u094b\u0020\u0926\u0947\u0916\u0947\u0902\u0964",
    membershipLabel: "\u0041\u0053\u004b\u0020\u0915\u093e\u0020\u0939\u093f\u0938\u094d\u0938\u093e\u0020\u092c\u0928\u0947\u0902",
    membershipTitle: "\u0906\u092a\u0915\u0940\u0020\u092d\u093e\u0917\u0940\u0926\u093e\u0930\u0940\u0020\u0938\u0947\u0020\u0906\u092a\u0915\u093e\u0020\u0938\u092e\u0941\u0926\u093e\u092f\u0020\u092e\u091c\u092c\u0942\u0924\u0020\u0939\u094b\u0924\u093e\u0020\u0939\u0948\u0964",
    membershipText: "\u0041\u0053\u004b\u0020\u0938\u0947\u0020\u091c\u0941\u0921\u093c\u0947\u0902\u002c\u0020\u0905\u092a\u0928\u093e\u0020\u0938\u092e\u0941\u0926\u093e\u092f\u0020\u092a\u094d\u0930\u094b\u092b\u093e\u0907\u0932\u0020\u092c\u0928\u093e\u090f\u0902\u002c\u0020\u0917\u0924\u093f\u0935\u093f\u0927\u093f\u092f\u093e\u0902\u0020\u0926\u0947\u0916\u0947\u0902\u002c\u0020\u0938\u0926\u0938\u094d\u092f\u094b\u0902\u0020\u0938\u0947\u0020\u091c\u0941\u0921\u093c\u0947\u0902\u0020\u0914\u0930\u0020\u0938\u092e\u0941\u0926\u093e\u092f\u0020\u0915\u0940\u0020\u091c\u093e\u0928\u0915\u093e\u0930\u0940\u0020\u092a\u094d\u0930\u093e\u092a\u094d\u0924\u0020\u0915\u0930\u0947\u0902\u0964",
    ctaTitle: "\u0906\u0907\u090f\u0020\u091c\u0941\u0921\u093c\u0947\u0020\u0930\u0939\u0947\u0902\u0964",
    ctaText: "\u0041\u0053\u004b\u0020\u0043\u006f\u006d\u006d\u0075\u006e\u0069\u0074\u0079\u0020\u0050\u006f\u0072\u0074\u0061\u006c\u0020\u0938\u0947\u0020\u091c\u0941\u0921\u093c\u0947\u0902\u0020\u0914\u0930\u0020\u091c\u0941\u0921\u093e\u0935\u002c\u0020\u0938\u0902\u0938\u094d\u0915\u0943\u0924\u093f\u0020\u0914\u0930\u0020\u092d\u093e\u0917\u0940\u0926\u093e\u0930\u0940\u0020\u092a\u0930\u0020\u0906\u0927\u093e\u0930\u093f\u0924\u0020\u092c\u0922\u093c\u0924\u0947\u0020\u0938\u092e\u0941\u0926\u093e\u092f\u0020\u0915\u093e\u0020\u0939\u093f\u0938\u094d\u0938\u093e\u0020\u092c\u0928\u0947\u0902\u0964",
    join: "\u0041\u0053\u004b\u0020\u0938\u0947\u0020\u091c\u0941\u0921\u093c\u0947\u0902",
    explore: "\u0938\u092e\u0941\u0926\u093e\u092f\u0020\u0926\u0947\u0916\u0947\u0902",
    viewAll: "\u0938\u092d\u0940\u0020\u0926\u0947\u0916\u0947\u0902",
    viewEvents: "\u0938\u092d\u0940\u0020\u0915\u093e\u0930\u094d\u092f\u0915\u094d\u0930\u092e\u0020\u0926\u0947\u0916\u0947\u0902",
    viewNews: "\u0938\u092d\u0940\u0020\u0938\u092e\u093e\u091a\u093e\u0930\u0020\u0926\u0947\u0916\u0947\u0902",
    viewGallery: "\u0938\u093e\u092e\u0941\u0926\u093e\u092f\u093f\u0915\u0020\u0917\u0948\u0932\u0930\u0940\u0020\u0926\u0947\u0916\u0947\u0902",
    noContent: "\u0905\u092d\u0940\u0020\u0915\u094b\u0908\u0020\u0938\u093e\u092e\u0917\u094d\u0930\u0940\u0020\u0909\u092a\u0932\u092c\u094d\u0927\u0020\u0928\u0939\u0940\u0902\u0020\u0939\u0948\u0964",
    community: "\u0938\u092e\u0941\u0926\u093e\u092f",
    culture: "\u0938\u0902\u0938\u094d\u0915\u0943\u0924\u093f",
    activities: "\u0917\u0924\u093f\u0935\u093f\u0927\u093f\u092f\u093e\u0902",
    events: "\u0915\u093e\u0930\u094d\u092f\u0915\u094d\u0930\u092e",
    values: "\u092e\u0942\u0932\u094d\u092f",
    members: "\u0938\u0926\u0938\u094d\u092f",
    news: "\u0938\u092e\u093e\u091a\u093e\u0930"
  },
  gu: {
    introLabel: "\u0041\u0053\u004b\u0020\u0ab5\u0abf\u0ab6\u0ac7",
    introTitle: "\u0ab2\u0acb\u0a95\u0acb\u002c\u0020\u0ab8\u0a82\u0ab8\u0acd\u0a95\u0ac3\u0aa4\u0abf\u0020\u0a85\u0aa8\u0ac7\u0020\u0a9c\u0acb\u0aa1\u0abe\u0aa3\u0aa5\u0ac0\u0020\u0aac\u0aa8\u0ac7\u0ab2\u0acb\u0020\u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf\u002e",
    introText: "\u0a85\u0ab9\u0abf\u0a9a\u0acd\u0a9b\u0aa4\u0acd\u0ab0\u0020\u0ab8\u0a82\u0ab8\u0acd\u0a95\u0abe\u0ab0\u0020\u0a95\u0ac7\u0aa8\u0acd\u0aa6\u0acd\u0ab0\u0020\u0a8f\u0a95\u0020\u0ab8\u0abe\u0aae\u0ac1\u0aa6\u0abe\u0aaf\u0abf\u0a95\u0020\u0aaa\u0acd\u0ab2\u0ac7\u0a9f\u0aab\u0acb\u0ab0\u0acd\u0aae\u0020\u0a9b\u0ac7\u0020\u0a9c\u0ac7\u0020\u0ab2\u0acb\u0a95\u0acb\u0aa8\u0ac7\u0020\u0a9c\u0acb\u0aa1\u0ab5\u0abe\u002c\u0020\u0ab8\u0ab9\u0abf\u0aaf\u0abe\u0ab0\u0abe\u0020\u0aae\u0ac2\u0ab2\u0acd\u0aaf\u0acb\u0aa8\u0ac7\u0020\u0a86\u0a97\u0ab3\u0020\u0ab5\u0aa7\u0abe\u0ab0\u0ab5\u0abe\u002c\u0020\u0aad\u0abe\u0a97\u0ac0\u0aa6\u0abe\u0ab0\u0ac0\u0aa8\u0ac7\u0020\u0aaa\u0acd\u0ab0\u0acb\u0aa4\u0acd\u0ab8\u0abe\u0ab9\u0abf\u0aa4\u0020\u0a95\u0ab0\u0ab5\u0abe\u0020\u0a85\u0aa8\u0ac7\u0020\u0aaa\u0ac7\u0aa2\u0ac0\u0a93\u0020\u0ab5\u0a9a\u0acd\u0a9a\u0ac7\u0020\u0a85\u0ab0\u0acd\u0aa5\u0aaa\u0ac2\u0ab0\u0acd\u0aa3\u0020\u0ab8\u0a82\u0aac\u0a82\u0aa7\u0acb\u0020\u0aac\u0aa8\u0abe\u0ab5\u0ab5\u0abe\u0020\u0aae\u0abe\u0a9f\u0ac7\u0020\u0aac\u0aa8\u0abe\u0ab5\u0ab5\u0abe\u0020\u0aae\u0abe\u0a82\u0020\u0a86\u0ab5\u0acd\u0aaf\u0ac1\u0a82\u0020\u0a9b\u0ac7\u002e",
    missionLabel: "\u0a85\u0aae\u0abe\u0ab0\u0acb\u0020\u0ab9\u0ac7\u0aa4\u0ac1",
    missionTitle: "\u0aac\u0aa6\u0ab2\u0abe\u0aa4\u0ac0\u0020\u0aa6\u0ac1\u0aa8\u0abf\u0aaf\u0abe\u0aae\u0abe\u0a82\u0020\u0a86\u0aaa\u0aa3\u0abe\u0020\u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf\u0aa8\u0ac7\u0020\u0a9c\u0acb\u0aa1\u0abe\u0aaf\u0ac7\u0ab2\u0acb\u0020\u0ab0\u0abe\u0a96\u0ab5\u0acb\u002e",
    missionText: "\u0041\u0053\u004b\u0020\u0ab8\u0abe\u0a82\u0ab8\u0acd\u0a95\u0ac3\u0aa4\u0abf\u0a95\u0020\u0aaa\u0acd\u0ab0\u0ab5\u0ac3\u0aa4\u0acd\u0aa4\u0abf\u0a93\u002c\u0020\u0ab8\u0abe\u0aae\u0abe\u0a9c\u0abf\u0a95\u0020\u0aad\u0abe\u0a97\u0ac0\u0aa6\u0abe\u0ab0\u0ac0\u002c\u0020\u0a95\u0abe\u0ab0\u0acd\u0aaf\u0a95\u0acd\u0ab0\u0aae\u0acb\u0020\u0a85\u0aa8\u0ac7\u0020\u0aa1\u0abf\u0a9c\u0abf\u0a9f\u0ab2\u0020\u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf\u0020\u0aa6\u0acd\u0ab5\u0abe\u0ab0\u0abe\u0020\u0ab8\u0aad\u0acd\u0aaf\u0acb\u0aa8\u0ac7\u0020\u0a8f\u0a95\u0ab8\u0abe\u0aa5\u0ac7\u0020\u0a9c\u0acb\u0aa1\u0ac7\u0020\u0a9b\u0ac7\u002e",
    activitiesLabel: "\u0ab8\u0abe\u0aae\u0ac1\u0aa6\u0abe\u0aaf\u0abf\u0a95\u0020\u0a9c\u0ac0\u0ab5\u0aa8",
    activitiesTitle: "\u0a86\u0aaa\u0aa3\u0abe\u0020\u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf\u0aae\u0abe\u0a82\u0020\u0ab9\u0a82\u0aae\u0ac7\u0ab6\u0abe\u0020\u0a95\u0a82\u0a88\u0a95\u0020\u0aa8\u0ab5\u0ac1\u0a82\u0020\u0aa5\u0aa4\u0ac1\u0a82\u0020\u0ab0\u0ab9\u0ac7\u0020\u0a9b\u0ac7\u002e",
    activitiesText: "\u0041\u0053\u004b\u0020\u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf\u0020\u0aa6\u0acd\u0ab5\u0abe\u0ab0\u0abe\u0020\u0aaa\u0acd\u0ab0\u0a95\u0abe\u0ab6\u0abf\u0aa4\u0020\u0aa8\u0ab5\u0ac0\u0aa8\u0aa4\u0aae\u0020\u0aaa\u0acd\u0ab0\u0ab5\u0ac3\u0aa4\u0acd\u0aa4\u0abf\u0a93\u0020\u0a9c\u0ac1\u0a93\u002e",
    cultureLabel: "\u0ab8\u0a82\u0ab8\u0acd\u0a95\u0ac3\u0aa4\u0abf\u0020\u0a85\u0aa8\u0ac7\u0020\u0aae\u0ac2\u0ab2\u0acd\u0aaf\u0acb",
    cultureTitle: "\u0aaa\u0ac7\u0aa2\u0ac0\u0a93\u0aa8\u0ac7 \u0a9c\u0acb\u0aa1\u0aa4\u0ac0 \u0aaa\u0ab0\u0a82\u0aaa\u0ab0\u0abe\u0a93\u002e",
    cultureText: "\u0a85\u0aae\u0abe\u0ab0\u0acb \u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf \u0ab8\u0a82\u0ab8\u0acd\u0a95\u0ac3\u0aa4\u0abf\u002c \u0ab8\u0a82\u0aac\u0a82\u0aa7\u0acb\u002c \u0ab8\u0aa8\u0acd\u0aae\u0abe\u0aa8 \u0a85\u0aa8\u0ac7 \u0a8f\u0a95\u0aa4\u0abe\u0aa8\u0ac7 \u0aae\u0ab9\u0aa4\u0acd\u0ab5 \u0a86\u0aaa\u0ac7 \u0a9b\u0ac7 \u0a85\u0aa8\u0ac7 \u0ab5\u0abf\u0ab5\u0abf\u0aa7 \u0aaa\u0ac7\u0aa2\u0ac0\u0a93\u0aa8\u0ac7 \u0a9c\u0acb\u0aa1\u0abe\u0ab5\u0abe\u0aa8\u0ac0 \u0aa4\u0a95\u0acb \u0a86\u0aaa\u0ac7 \u0a9b\u0ac7\u002e",
    eventsLabel: "\u0a86\u0a97\u0abe\u0aae\u0ac0\u0020\u0a95\u0abe\u0ab0\u0acd\u0aaf\u0a95\u0acd\u0ab0\u0aae\u0acb",
    eventsTitle: "\u0aae\u0ab3\u0acb\u002e\u0020\u0a89\u0a9c\u0ab5\u0acb\u002e\u0020\u0aad\u0abe\u0a97\u0020\u0ab2\u0acb\u002e",
    eventsText: "\u0041\u0053\u004b\u0aa8\u0abe\u0020\u0ab8\u0abe\u0aae\u0ac1\u0aa6\u0abe\u0aaf\u0abf\u0a95\u0020\u0a95\u0abe\u0ab0\u0acd\u0aaf\u0a95\u0acd\u0ab0\u0aae\u0acb\u002c\u0020\u0ab8\u0abe\u0a82\u0ab8\u0acd\u0a95\u0ac3\u0aa4\u0abf\u0a95\u0020\u0a89\u0a9c\u0ab5\u0aa3\u0ac0\u0a93\u0020\u0a85\u0aa8\u0ac7\u0020\u0aaa\u0acd\u0ab0\u0ab5\u0ac3\u0aa4\u0acd\u0aa4\u0abf\u0a93\u0020\u0ab5\u0abf\u0ab6\u0ac7\u0020\u0aae\u0abe\u0ab9\u0abf\u0aa4\u0a97\u0abe\u0ab0\u0020\u0ab0\u0ab9\u0acb\u002e",
    newsLabel: "\u0aa8\u0ab5\u0ac0\u0aa8\u0aa4\u0aae\u0020\u0ab8\u0aae\u0abe\u0a9a\u0abe\u0ab0",
    newsTitle: "\u0a86\u0aaa\u0aa3\u0abe\u0020\u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf\u0aae\u0abe\u0a82\u0020\u0ab6\u0ac1\u0a82\u0020\u0aa5\u0a88\u0020\u0ab0\u0ab9\u0acd\u0aaf\u0ac1\u0a82\u0020\u0a9b\u0ac7\u002e",
    newsText: "\u0041\u0053\u004b\u0020\u0aa6\u0acd\u0ab5\u0abe\u0ab0\u0abe\u0020\u0aaa\u0acd\u0ab0\u0a95\u0abe\u0ab6\u0abf\u0aa4\u0020\u0aa8\u0ab5\u0ac0\u0aa8\u0aa4\u0aae\u0020\u0a9c\u0abe\u0ab9\u0ac7\u0ab0\u0abe\u0aa4\u0acb\u002c\u0020\u0a85\u0aaa\u0aa1\u0ac7\u0a9f\u0acd\u0ab8\u0020\u0a85\u0aa8\u0ac7\u0020\u0ab8\u0aae\u0abe\u0a9a\u0abe\u0ab0\u0020\u0ab5\u0abe\u0a82\u0a9a\u0acb\u002e",
    galleryLabel: "\u0ab8\u0abe\u0aae\u0ac1\u0aa6\u0abe\u0aaf\u0abf\u0a95\u0020\u0a97\u0ac7\u0ab2\u0ac7\u0ab0\u0ac0",
    galleryTitle: "\u0a8f\u0020\u0aaa\u0ab3\u0acb\u0020\u0a9c\u0ac7\u0020\u0a86\u0aaa\u0aa3\u0aa8\u0ac7\u0020\u0ab8\u0abe\u0aa5\u0ac7\u0020\u0ab2\u0abe\u0ab5\u0ac7\u0020\u0a9b\u0ac7\u002e",
    galleryText: "\u0041\u0053\u004b\u0020\u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf\u0020\u0aa6\u0acd\u0ab5\u0abe\u0ab0\u0abe\u0020\u0ab6\u0ac7\u0ab0\u0020\u0a95\u0ab0\u0ab5\u0abe\u0aae\u0abe\u0a82\u0020\u0a86\u0ab5\u0ac7\u0ab2\u0ac0\u0020\u0aa8\u0ab5\u0ac0\u0aa8\u0aa4\u0aae\u0020\u0aa4\u0ab8\u0ab5\u0ac0\u0ab0\u0acb\u0020\u0a85\u0aa8\u0ac7\u0020\u0aaf\u0abe\u0aa6\u0acb\u0020\u0a9c\u0ac1\u0a93\u002e",
    membershipLabel: "\u0041\u0053\u004b\u0aa8\u0acb\u0020\u0aad\u0abe\u0a97\u0020\u0aac\u0aa8\u0acb",
    membershipTitle: "\u0aa4\u0aae\u0abe\u0ab0\u0ac0\u0020\u0aad\u0abe\u0a97\u0ac0\u0aa6\u0abe\u0ab0\u0ac0\u0aa5\u0ac0\u0020\u0aa4\u0aae\u0abe\u0ab0\u0acb\u0020\u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf\u0020\u0ab5\u0aa7\u0ac1\u0020\u0aae\u0a9c\u0aac\u0ac2\u0aa4\u0020\u0aac\u0aa8\u0ac7\u0020\u0a9b\u0ac7\u002e",
    membershipText: "\u0041\u0053\u004b\u0020\u0ab8\u0abe\u0aa5\u0ac7\u0020\u0a9c\u0acb\u0aa1\u0abe\u0a93\u002c\u0020\u0aa4\u0aae\u0abe\u0ab0\u0ac0\u0020\u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf\u0020\u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2\u0020\u0aac\u0aa8\u0abe\u0ab5\u0acb\u002c\u0020\u0aaa\u0acd\u0ab0\u0ab5\u0ac3\u0aa4\u0acd\u0aa4\u0abf\u0a93\u0020\u0ab6\u0acb\u0aa7\u0acb\u002c\u0020\u0ab8\u0aad\u0acd\u0aaf\u0acb\u0020\u0ab8\u0abe\u0aa5\u0ac7\u0020\u0a9c\u0acb\u0aa1\u0abe\u0a93\u0020\u0a85\u0aa8\u0ac7\u0020\u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf\u0aa8\u0ac0\u0020\u0aae\u0abe\u0ab9\u0abf\u0aa4\u0ac0\u0020\u0aae\u0ac7\u0ab3\u0ab5\u0acb\u002e",
    ctaTitle: "\u0a9a\u0abe\u0ab2\u0acb\u0020\u0a9c\u0acb\u0aa1\u0abe\u0aaf\u0ac7\u0ab2\u0abe\u0020\u0ab0\u0ab9\u0ac0\u0a8f\u002e",
    ctaText: "\u0041\u0053\u004b\u0020\u0043\u006f\u006d\u006d\u0075\u006e\u0069\u0074\u0079\u0020\u0050\u006f\u0072\u0074\u0061\u006c\u0020\u0ab8\u0abe\u0aa5\u0ac7\u0020\u0a9c\u0acb\u0aa1\u0abe\u0a93\u0020\u0a85\u0aa8\u0ac7\u0020\u0a9c\u0acb\u0aa1\u0abe\u0aa3\u002c\u0020\u0ab8\u0a82\u0ab8\u0acd\u0a95\u0ac3\u0aa4\u0abf\u0020\u0a85\u0aa8\u0ac7\u0020\u0aad\u0abe\u0a97\u0ac0\u0aa6\u0abe\u0ab0\u0ac0\u0020\u0aaa\u0ab0\u0020\u0a86\u0aa7\u0abe\u0ab0\u0abf\u0aa4\u0020\u0ab5\u0aa7\u0aa4\u0abe\u0020\u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf\u0aa8\u0acb\u0020\u0aad\u0abe\u0a97\u0020\u0aac\u0aa8\u0acb\u002e",
    join: "\u0041\u0053\u004b\u0020\u0ab8\u0abe\u0aa5\u0ac7\u0020\u0a9c\u0acb\u0aa1\u0abe\u0a93",
    explore: "\u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf\u0020\u0a9c\u0ac1\u0a93",
    viewAll: "\u0aac\u0aa7\u0ac1\u0a82\u0020\u0a9c\u0ac1\u0a93",
    viewEvents: "\u0aac\u0aa7\u0abe\u0020\u0a95\u0abe\u0ab0\u0acd\u0aaf\u0a95\u0acd\u0ab0\u0aae\u0acb\u0020\u0a9c\u0ac1\u0a93",
    viewNews: "\u0aac\u0aa7\u0abe\u0020\u0ab8\u0aae\u0abe\u0a9a\u0abe\u0ab0\u0020\u0a9c\u0ac1\u0a93",
    viewGallery: "\u0ab8\u0abe\u0aae\u0ac1\u0aa6\u0abe\u0aaf\u0abf\u0a95\u0020\u0a97\u0ac7\u0ab2\u0ac7\u0ab0\u0ac0\u0020\u0a9c\u0ac1\u0a93",
    noContent: "\u0ab9\u0abe\u0ab2\u0aae\u0abe\u0a82\u0020\u0a95\u0acb\u0a88\u0020\u0ab8\u0abe\u0aae\u0a97\u0acd\u0ab0\u0ac0\u0020\u0a89\u0aaa\u0ab2\u0aac\u0acd\u0aa7\u0020\u0aa8\u0aa5\u0ac0\u002e",
    community: "\u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf",
    culture: "\u0ab8\u0a82\u0ab8\u0acd\u0a95\u0ac3\u0aa4\u0abf",
    activities: "\u0aaa\u0acd\u0ab0\u0ab5\u0ac3\u0aa4\u0acd\u0aa4\u0abf\u0a93",
    events: "\u0a95\u0abe\u0ab0\u0acd\u0aaf\u0a95\u0acd\u0ab0\u0aae\u0acb",
    values: "\u0aae\u0ac2\u0ab2\u0acd\u0aaf\u0acb",
    members: "\u0ab8\u0aad\u0acd\u0aaf\u0acb",
    news: "\u0ab8\u0aae\u0abe\u0a9a\u0abe\u0ab0"
  }

};

function getLocale(value: string): Locale {
  if (value === "hi") return "hi";
  if (value === "gu") return "gu";
  return "en";
}

function formatDate(date: Date, locale: Locale) {
  const localeMap = {
    en: "en-IN",
    hi: "hi-IN",
    gu: "gu-IN",
  };

  return new Intl.DateTimeFormat(localeMap[locale], {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default async function PublicHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = getLocale(rawLocale);
  const t = content[locale];

  const now = new Date();

  const oneYearAgo = new Date(now);
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const [activities, events, newsItems, galleries] =
    await Promise.all([
      prisma.activity.findMany({
        where: {
          status: "PUBLISHED",
          OR: [
            {
              activityDate: {
                gte: oneYearAgo,
              },
            },
            {
              activityDate: null,
              createdAt: {
                gte: oneYearAgo,
              },
            },
          ],
        },
        orderBy: [
          {
            activityDate: "desc",
          },
          {
            createdAt: "desc",
          },
        ],
        take: 4,
      }),

      prisma.event.findMany({
        where: {
          status: "PUBLISHED",
          eventDate: {
            gte: oneYearAgo,
          },
        },
        include: {
          translations: true,
        },
        orderBy: {
          eventDate: "asc",
        },
        take: 3,
      }),

      prisma.news.findMany({
        where: {
          status: "PUBLISHED",
          publishedAt: {
            gte: oneYearAgo,
            lte: now,
          },
        },
        include: {
          translations: true,
        },
        orderBy: {
          publishedAt: "desc",
        },
        take: 3,
      }),

      prisma.gallery.findMany({
        where: {
          status: "PUBLISHED",
          createdAt: {
            gte: oneYearAgo,
            lte: now,
          },
        },
        include: {
          translations: true,
          images: {
            orderBy: {
              sortOrder: "asc",
            },
            take: 6,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      }),
    ]);

  const localizedEvents = events.map((event) => ({
    ...event,
    translation:
      event.translations.find(
        (item) => item.locale === locale,
      ) ??
      event.translations.find(
        (item) => item.locale === "en",
      ) ??
      event.translations[0] ??
      null,
  }));

  const localizedNews = newsItems.map((news) => ({
    ...news,
    translation:
      news.translations.find(
        (item) => item.locale === locale,
      ) ??
      news.translations.find(
        (item) => item.locale === "en",
      ) ??
      news.translations[0] ??
      null,
  }));

  const latestGallery = galleries[0] ?? null;

  const galleryImages =
    latestGallery?.images ?? [];

  return (
    <main className="ask-public-home overflow-hidden bg-[#fff7f8] text-[#3b0710] transition-colors duration-500 dark:bg-[#24040a] dark:text-white">
      {/* TRADITIONAL HERO */}
      <section
        className="
          relative
          overflow-hidden
          border-b
          border-[#d9ad55]/40
          bg-[#fff8e8]
          text-[#5b0714]
          dark:bg-[#5b0714]
          dark:text-[#fff8e8]
        "
      >

        {/* Heritage background ornament */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div
            className="
              absolute
              left-1/2
              top-[45%]
              h-[680px]
              w-[680px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border
              border-[#d9ad55]/25
              dark:border-[#d9ad55]/20
            "
          />

          <div
            className="
              absolute
              left-1/2
              top-[45%]
              h-[500px]
              w-[500px]
              -translate-x-1/2
              -translate-y-1/2
              rotate-45
              border
              border-[#d9ad55]/15
              dark:border-[#d9ad55]/15
            "
          />

          <div
            className="
              absolute
              left-1/2
              top-[20%]
              h-80
              w-80
              -translate-x-1/2
              rounded-full
              bg-[#d9ad55]/10
              blur-3xl
              dark:bg-[#d9ad55]/8
            "
          />

        </div>


        {/* HERO CONTENT */}
        <div
          className="
            relative
            z-10
            mx-auto
            max-w-7xl
            px-5
            pb-16
            pt-12
            text-center
            sm:px-8
            sm:pb-20
            sm:pt-16
            lg:px-10
            lg:pb-24
            lg:pt-20
          "
        >

          {/* =================================================
              ORGANIZATION NAME
          ================================================== */}

          <div className="mx-auto max-w-6xl">

            <div className="mb-8 flex items-center justify-center gap-4">

              <span
                className="
                  hidden
                  h-px
                  w-16
                  bg-[#d9ad55]
                  sm:block
                "
              />

              <h2
                className="
                  font-serif
                  text-4xl
                  font-black
                  leading-tight
                  tracking-tight
                  text-[#5b0714]
                  drop-shadow-[0_3px_8px_rgba(91,7,20,0.28)]
                  dark:text-[#fff8e8]
                  dark:drop-shadow-[0_3px_10px_rgba(255,255,255,0.72)]
                  sm:text-5xl
                  lg:text-6xl
                  xl:text-[68px]
                "
              >
                Ahhichatra Sanskar Kendra
              </h2>

              <span
                className="
                  hidden
                  h-px
                  w-16
                  bg-[#d9ad55]
                  sm:block
                "
              />

            </div>


            {/* =================================================
                SHIVA IMAGE
            ================================================== */}

            <div className="mx-auto flex justify-center">

              <div
                className="
                  relative
                  h-[360px]
                  w-[245px]
                  overflow-hidden
                  rounded-[50%]
                  border
                  border-[#d9ad55]
                  bg-[#fff8e8]
                  p-1
                  shadow-[0_18px_50px_rgba(91,7,20,0.30)]
                  dark:shadow-[0_0_55px_rgba(255,255,255,0.24)]
                  sm:h-[430px]
                  sm:w-[285px]
                  lg:h-[500px]
                  lg:w-[330px]
                "
              >

                <div
                  className="
                    h-full
                    w-full
                    overflow-hidden
                    rounded-[50%]
                    border
                    border-[#f0c96b]/70
                    bg-[#fff8e8]
                  "
                >

                  <img
                    src="/images/ask-shiva-logo.jpg"
                    alt="Ahhichatra Sanskar Kendra Shiva heritage symbol"
                    className="
                      h-full
                      w-full
                      rounded-[50%]
                      object-contain
                      object-center
                    "
                  />

                </div>

              </div>

            </div>


            {/* =================================================
                DECORATIVE DIVIDER
            ================================================== */}

            <div className="mx-auto mt-8 flex max-w-3xl items-center justify-center gap-4">

              <span
                className="
                  h-px
                  flex-1
                  bg-gradient-to-r
                  from-transparent
                  via-[#d9ad55]
                  to-[#d9ad55]
                "
              />

              <span
                className="
                  h-3
                  w-3
                  rotate-45
                  border
                  border-[#d9ad55]
                  bg-[#f0c96b]
                  shadow-[0_2px_8px_rgba(217,173,85,0.35)]
                "
              />

              <span
                className="
                  h-px
                  flex-1
                  bg-gradient-to-l
                  from-transparent
                  via-[#d9ad55]
                  to-[#d9ad55]
                "
              />

            </div>


            {/* =================================================
                MISSION HEADING
            ================================================== */}

            <h1
              className="
                mx-auto
                mt-8
                max-w-6xl
                font-serif
                text-3xl
                font-bold
                leading-[1.12]
                tracking-tight
                text-[#5b0714]
                drop-shadow-[0_2px_5px_rgba(91,7,20,0.18)]
                dark:text-[#fff8e8]
                dark:drop-shadow-[0_3px_8px_rgba(255,255,255,0.45)]
                sm:text-4xl
                md:text-5xl
                lg:text-6xl
                xl:text-[64px]
              "
            >
              {t.missionTitle}

              <span
                className="
                  mt-2
                  block
                  text-[#9b6b12]
                  dark:text-[#e2b85d]
                "
              >
                {t.cultureTitle}
              </span>

            </h1>


            {/* =================================================
                DESCRIPTION
            ================================================== */}

            <p
              className="
                mx-auto
                mt-7
                max-w-3xl
                text-base
                leading-8
                text-[#6f2735]
                dark:text-[#f8e7c8]/85
                sm:text-lg
              "
            >
              {t.missionText}
            </p>


            {/* =================================================
                TRADITIONAL DIVIDER
            ================================================== */}

            <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-3">

              <span
                className="
                  h-px
                  flex-1
                  bg-gradient-to-r
                  from-transparent
                  to-[#d9ad55]
                "
              />

              <span className="text-xl text-[#9b6b12] dark:text-[#e2b85d]">
                {String.fromCodePoint(0x0950)}
              </span>

              <span
                className="
                  h-px
                  flex-1
                  bg-gradient-to-l
                  from-transparent
                  to-[#d9ad55]
                "
              />

            </div>


            {/* =================================================
                BUTTONS
            ================================================== */}

            <div className="mt-9 flex flex-wrap justify-center gap-4">

              <Link
                href={`/${locale}/about`}
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border-2
                  border-[#d9ad55]
                  bg-[#d9ad55]
                  px-7
                  py-3.5
                  text-sm
                  font-bold
                  text-[#5b0714]
                  shadow-[0_8px_30px_rgba(91,7,20,0.18)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#f0c96b]
                  hover:shadow-[0_12px_35px_rgba(91,7,20,0.28)]
                "
              >
                {t.explore}

                <ArrowRight
                  className="
                    h-4
                    w-4
                    transition-transform
                    group-hover:translate-x-1
                  "
                />
              </Link>


              <Link
                href={`/${locale}/activities`}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border-2
                  border-[#9b6b12]/50
                  bg-[#fff8e8]/70
                  px-7
                  py-3.5
                  text-sm
                  font-bold
                  text-[#5b0714]
                  shadow-[0_8px_25px_rgba(91,7,20,0.10)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#d9ad55]
                  hover:bg-[#f0c96b]/20
                  dark:border-[#f2d99d]/50
                  dark:bg-white/5
                  dark:text-[#fff8e8]
                  dark:shadow-none
                  dark:hover:border-[#d9ad55]
                  dark:hover:bg-[#d9ad55]/10
                "
              >
                {t.viewAll}
              </Link>

            </div>

          </div>

        </div>


        {/* Traditional bottom border */}
        <div
          className="
            relative
            h-3
            border-y
            border-[#d9ad55]/50
            bg-[#f0c96b]/20
            dark:bg-[#7a0b1c]
          "
        >
          <div className="mx-auto h-full max-w-5xl border-x border-[#d9ad55]/30" />
        </div>

      </section>

      {/* ABOUT */}
      <section className="relative bg-[#fff7f8] py-20 dark:bg-[#24040a] sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <span className="text-xs font-bold tracking-[0.22em] text-red-700 dark:text-red-300">
                {t.introLabel}
              </span>

              <h2 className="mt-4 max-w-xl text-3xl font-black tracking-tight text-[#3b0710] dark:text-white sm:text-4xl lg:text-5xl">
                {t.introTitle}
              </h2>
            </div>

            <div>
              <p className="max-w-3xl text-lg leading-8 text-[#6f2735] dark:text-red-100/70">
                {t.introText}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  t.community,
                  t.culture,
                  t.activities,
                  t.events,
                  t.news,
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-800 shadow-sm dark:border-red-400/20 dark:bg-red-950/40 dark:text-red-100"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PURPOSE */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#5a0915] via-[#760d1d] to-[#3b0710] py-20 text-white dark:from-[#3b0710] dark:via-[#520914] dark:to-[#1d0308] sm:py-24">
        <div className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-red-400/10 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-pink-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="text-xs font-bold tracking-[0.22em] text-red-200">
                {t.missionLabel}
              </span>

              <h2 className="mt-4 max-w-xl text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                {t.missionTitle}
              </h2>

              <p className="mt-6 max-w-xl text-base leading-8 text-red-100/70 sm:text-lg">
                {t.missionText}
              </p>

              <Link
                href={`/${locale}/about`}
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-red-900 transition hover:-translate-y-0.5 hover:bg-red-50"
              >
                {t.explore}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: Users,
                  title: t.community,
                  image: "/community-gallery/05-community-group.jpeg",
                },
                {
                  icon: Sparkles,
                  title: t.culture,
                  image: "/community-gallery/03-cultural-satsang.jpeg",
                },
                {
                  icon: CalendarDays,
                  title: t.events,
                  image: "/community-gallery/07-community-event.jpeg",
                },
                {
                  icon: Heart,
                  title: t.values,
                  image: "/community-gallery/09-community-women-gathering.jpeg",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="
                      group
                      relative
                      h-44
                      overflow-hidden
                      rounded-2xl
                      border
                      border-[#d9ad55]/50
                      bg-[#5b0712]
                      shadow-lg
                      transition-all
                      duration-500
                      hover:-translate-y-1
                      hover:border-[#f0c96b]
                      hover:shadow-[0_15px_40px_rgba(0,0,0,0.35)]
                    "
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="
                        absolute
                        inset-0
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-110
                      "
                    />

                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-[#3b0710]/95
                        via-[#5b0712]/55
                        to-[#5b0712]/15
                      "
                    />

                    <div
                      className="
                        absolute
                        inset-x-0
                        bottom-0
                        p-5
                      "
                    >
                      <div
                        className="
                          mb-3
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-xl
                          border
                          border-[#f0c96b]/70
                          bg-[#7a0b1c]/90
                          text-[#f0c96b]
                          shadow-lg
                        "
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      <p
                        className="
                          font-serif
                          text-lg
                          font-bold
                          text-[#fff8e8]
                          drop-shadow-md
                          sm:text-xl
                        "
                      >
                        {item.title}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* LIVE ACTIVITIES */}
      <section className="bg-[#fff7f8] py-20 dark:bg-[#28040a] sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-bold tracking-[0.22em] text-red-700 dark:text-red-300">
                {t.activitiesLabel}
              </span>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-[#3b0710] dark:text-white sm:text-4xl">
                {t.activitiesTitle}
              </h2>

              <p className="mt-4 max-w-2xl text-[#6f2735] dark:text-red-100/65">
                {t.activitiesText}
              </p>
            </div>

            <Link
              href={`/${locale}/activities`}
              className="inline-flex items-center gap-2 text-sm font-bold text-red-700 hover:text-red-500 dark:text-red-300"
            >
              {t.viewAll}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {activities.length === 0 ? (
            <div className="mt-10 rounded-3xl border border-red-100 bg-white p-10 text-center text-sm text-[#7b3442] dark:border-red-400/10 dark:bg-red-950/25 dark:text-red-100/60">
              {t.noContent}
            </div>
          ) : (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {activities.map((activity) => (
                <article
                  key={activity.id}
                  className="group overflow-hidden rounded-2xl border border-red-100 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:border-red-300 hover:shadow-xl dark:border-red-400/15 dark:bg-red-950/25"
                >
                  {activity.image ? (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={activity.image}
                        alt={activity.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="flex h-48 items-center justify-center bg-gradient-to-br from-red-100 to-red-200 dark:from-red-950/70 dark:to-red-900/40">
                      <HandHeart className="h-12 w-12 text-red-700 dark:text-red-300" />
                    </div>
                  )}

                  <div className="p-6">
                    {activity.category && (
                      <span className="text-xs font-bold uppercase tracking-wider text-red-700 dark:text-red-300">
                        {activity.category}
                      </span>
                    )}

                    <h3 className="mt-2 font-bold text-[#4a0a15] dark:text-white">
                      {activity.title}
                    </h3>

                    {activity.description && (
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#7b3442] dark:text-red-100/60">
                        {activity.description}
                      </p>
                    )}

                    <div className="mt-5 space-y-2 text-xs text-[#7b3442] dark:text-red-100/55">
                      {activity.activityDate && (
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-red-600 dark:text-red-300" />
                          {formatDate(activity.activityDate, locale)}
                        </div>
                      )}

                      {activity.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-red-600 dark:text-red-300" />
                          <span className="line-clamp-1">
                            {activity.location}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CULTURE */}
      <section className="bg-[#fff0f2] py-20 dark:bg-[#31050c] sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative min-h-[420px]">
              <div className="absolute left-0 top-0 h-[330px] w-[72%] overflow-hidden rounded-[28px] border-4 border-[#d4af37]/70 bg-[#3b0710] shadow-2xl">
                <img
                  src="/community-gallery/01-temple-idol-featured.jpeg"
                  alt="ASK Community heritage"
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3b0710]/55 via-transparent to-transparent" />
              </div>

              <div className="absolute right-0 top-8 h-[190px] w-[42%] overflow-hidden rounded-[24px] border-8 border-[#fff0f2] bg-[#3b0710] shadow-2xl dark:border-[#31050c]">
                <img
                  src="/community-gallery/02-community-worship.jpeg"
                  alt="ASK Community worship"
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />
              </div>

              <div className="absolute bottom-0 right-0 h-[190px] w-[52%] overflow-hidden rounded-[24px] border-8 border-[#fff0f2] bg-[#3b0710] shadow-2xl dark:border-[#31050c]">
                <img
                  src="/community-gallery/03-cultural-satsang.jpeg"
                  alt="ASK Community cultural gathering"
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />
              </div>

              <div className="absolute bottom-8 left-[42%] h-24 w-24 overflow-hidden rounded-2xl border-4 border-[#d4af37] bg-[#3b0710] shadow-2xl">
                <img
                  src="/community-gallery/04-community-leaders.jpeg"
                  alt="ASK Community leaders"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="absolute bottom-10 left-[48%] flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d4af37]/70 bg-[#8f0014] text-white shadow-xl">
                <Heart className="h-6 w-6 fill-current" />
              </div>
            </div>

            <div>
              <span className="text-xs font-bold tracking-[0.22em] text-red-700 dark:text-red-300">
                {t.cultureLabel}
              </span>

              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#3b0710] dark:text-white sm:text-4xl">
                {t.cultureTitle}
              </h2>

              <p className="mt-5 leading-8 text-[#6f2735] dark:text-red-100/65">
                {t.cultureText}
              </p>

              <div className="mt-8 space-y-4">
                {[
                  {
                    icon: Users,
                    title: t.community,
                  },
                  {
                    icon: Sparkles,
                    title: t.culture,
                  },
                  {
                    icon: HandHeart,
                    title: t.activities,
                  },
                  {
                    icon: ShieldCheck,
                    title: t.values,
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="flex items-center gap-4 rounded-2xl border border-red-100 bg-white/70 p-4 dark:border-red-400/10 dark:bg-red-950/20"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-200">
                        <Icon className="h-4 w-4" />
                      </div>

                      <h3 className="text-sm font-bold text-[#4a0a15] dark:text-white">
                        {item.title}
                      </h3>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* LIVE EVENTS */}
      <section className="bg-[#fff7f8] py-20 dark:bg-[#24040a] sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-bold tracking-[0.22em] text-red-700 dark:text-red-300">
                {t.eventsLabel}
              </span>

              <h2 className="mt-3 text-3xl font-black text-[#3b0710] dark:text-white sm:text-4xl">
                {t.eventsTitle}
              </h2>

              <p className="mt-4 max-w-2xl text-[#6f2735] dark:text-red-100/60">
                {t.eventsText}
              </p>
            </div>

            <Link
              href={`/${locale}/events`}
              className="inline-flex items-center gap-2 text-sm font-bold text-red-700 dark:text-red-300"
            >
              {t.viewEvents}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {localizedEvents.length === 0 ? (
            <div className="mt-10 rounded-3xl border border-red-100 bg-white p-10 text-center text-sm text-[#7b3442] dark:border-red-400/10 dark:bg-red-950/25 dark:text-red-100/60">
              {t.noContent}
            </div>
          ) : (
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {localizedEvents.map((event) => (
                <article
                  key={event.id}
                  className="group overflow-hidden rounded-2xl border border-red-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-300 hover:shadow-xl dark:border-red-400/15 dark:bg-red-950/25"
                >
                  <div className="relative h-52 overflow-hidden bg-gradient-to-br from-red-800 to-red-950">
                    {event.image ? (
                      <img
                        src={event.image}
                        alt={event.translation?.title || event.slug}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <CalendarDays className="h-16 w-16 text-white/30" />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                    <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-red-900">
                      {formatDate(event.eventDate, locale)}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-bold text-[#4a0a15] dark:text-white">
                      {event.translation?.title || event.slug}
                    </h3>

                    {event.translation?.description && (
                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#7b3442] dark:text-red-100/60">
                        {event.translation.description}
                      </p>
                    )}

                    {event.translation?.location && (
                      <div className="mt-4 flex items-center gap-2 text-sm text-[#7b3442] dark:text-red-100/55">
                        <MapPin className="h-4 w-4 text-red-600" />
                        <span className="line-clamp-1">
                          {event.translation.location}
                        </span>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* LIVE NEWS */}
      <section className="bg-[#fff0f2] py-20 dark:bg-[#31050c] sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-bold tracking-[0.22em] text-red-700 dark:text-red-300">
                {t.newsLabel}
              </span>

              <h2 className="mt-3 text-3xl font-black text-[#3b0710] dark:text-white sm:text-4xl">
                {t.newsTitle}
              </h2>

              <p className="mt-4 max-w-2xl text-[#6f2735] dark:text-red-100/60">
                {t.newsText}
              </p>
            </div>

            <Link
              href={`/${locale}/news`}
              className="inline-flex items-center gap-2 text-sm font-bold text-red-700 dark:text-red-300"
            >
              {t.viewNews}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {localizedNews.length === 0 ? (
            <div className="mt-10 rounded-3xl border border-red-100 bg-white p-10 text-center text-sm text-[#7b3442] dark:border-red-400/10 dark:bg-red-950/25 dark:text-red-100/60">
              {t.noContent}
            </div>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {localizedNews.map((news) => (
                <article
                  key={news.id}
                  className="group overflow-hidden rounded-2xl border border-red-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-red-400/15 dark:bg-red-950/25"
                >
                  <div className="relative h-52 overflow-hidden bg-gradient-to-br from-red-800 to-red-950">
                    {news.image ? (
                      <img
                        src={news.image}
                        alt={
                          news.translation?.title ||
                          news.slug
                        }
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Newspaper className="h-16 w-16 text-white/30" />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />

                    <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-red-900">
                      {news.publishedAt
                        ? formatDate(
                            news.publishedAt,
                            locale,
                          )
                        : ""}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="line-clamp-2 font-bold text-[#4a0a15] dark:text-white">
                      {news.translation?.title ||
                        news.slug}
                    </h3>

                    {news.translation?.excerpt && (
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#7b3442] dark:text-red-100/60">
                        {news.translation.excerpt}
                      </p>
                    )}

                    {news.translation?.location && (
                      <div className="mt-4 flex items-center gap-2 text-sm text-[#7b3442] dark:text-red-100/55">
                        <MapPin className="h-4 w-4 text-red-600" />
                        <span className="line-clamp-1">
                          {news.translation.location}
                        </span>
                      </div>
                    )}

                    <Link
                      href={`/${locale}/news/${news.slug}`}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-red-700 dark:text-red-300"
                    >
                      {t.viewAll}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* LIVE GALLERY */}
      <section className="bg-[#fff7f8] py-20 dark:bg-[#24040a] sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-bold tracking-[0.22em] text-red-700 dark:text-red-300">
                {t.galleryLabel}
              </span>

              <h2 className="mt-3 text-3xl font-black text-[#3b0710] dark:text-white sm:text-4xl">
                {t.galleryTitle}
              </h2>

              <p className="mt-4 max-w-2xl text-[#6f2735] dark:text-red-100/60">
                {t.galleryText}
              </p>
            </div>

            <Link
              href={`/${locale}/gallery`}
              className="inline-flex items-center gap-2 text-sm font-bold text-red-700 dark:text-red-300"
            >
              {t.viewGallery}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {galleryImages.length === 0 ? (
            <div className="mt-10 rounded-3xl border border-red-100 bg-white p-10 text-center text-sm text-[#7b3442] dark:border-red-400/10 dark:bg-red-950/25 dark:text-red-100/60">
              {t.noContent}
            </div>
          ) : (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {galleryImages.map((image, index) => (
                <Link
                  key={image.id}
                  href={`/${locale}/gallery`}
                  className={`group relative overflow-hidden rounded-3xl ${
                    index === 0
                      ? "sm:col-span-2 sm:row-span-2"
                      : ""
                  }`}
                >
                  <div
                    className={
                      index === 0
                        ? "relative h-[420px]"
                        : "relative h-[200px]"
                    }
                  >
                    <img
                      src={image.imageUrl}
                      alt={latestGallery?.slug || "ASK Community"}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    <div className="absolute bottom-5 left-5 flex items-center gap-2 text-sm font-bold text-white">
                      <Images className="h-4 w-4" />
                      {t.community}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* MEMBERSHIP */}
      <section className="bg-[#fff0f2] py-20 dark:bg-[#31050c] sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="overflow-hidden rounded-[32px] border border-red-200 bg-gradient-to-br from-white via-[#fff1f3] to-[#ffdfe5] p-8 shadow-xl dark:border-red-400/15 dark:from-[#4a0812] dark:via-[#3b0710] dark:to-[#28040a] sm:p-12">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.8fr]">
              <div>
                <span className="text-xs font-bold tracking-[0.22em] text-red-700 dark:text-red-300">
                  {t.membershipLabel}
                </span>

                <h2 className="mt-4 max-w-2xl text-3xl font-black text-[#3b0710] dark:text-white sm:text-4xl">
                  {t.membershipTitle}
                </h2>

                <p className="mt-5 max-w-xl leading-8 text-[#6f2735] dark:text-red-100/65">
                  {t.membershipText}
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href={`/${locale}/register`}
                    className="inline-flex items-center gap-2 rounded-xl bg-red-700 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-300/30 transition hover:-translate-y-0.5 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-500"
                  >
                    <UserRoundPlus className="h-4 w-4" />
                    {t.join}
                  </Link>

                  <Link
                    href={`/${locale}/members`}
                    className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-6 py-3.5 text-sm font-bold text-red-800 transition hover:bg-red-50 dark:border-red-400/20 dark:bg-red-950/40 dark:text-red-100 dark:hover:bg-red-900/50"
                  >
                    <Users className="h-4 w-4" />
                    {t.community}
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: Users,
                    title: t.members,
                  },
                  {
                    icon: CalendarDays,
                    title: t.events,
                  },
                  {
                    icon: Sparkles,
                    title: t.activities,
                  },
                  {
                    icon: ShieldCheck,
                    title: t.values,
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-red-200 bg-white/80 p-5 shadow-sm dark:border-red-400/10 dark:bg-red-950/30"
                    >
                      <Icon className="h-5 w-5 text-red-700 dark:text-red-300" />

                      <p className="mt-5 text-sm font-bold text-[#4a0a15] dark:text-white">
                        {item.title}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#8f0014] via-[#c90018] to-[#ef001d] py-20 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] dark:from-[#240209] dark:via-[#520914] dark:to-[#180107] sm:py-24">
        <div className="pointer-events-none absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />

        <div className="pointer-events-none absolute -right-32 -top-20 h-96 w-96 rounded-full bg-pink-300/15 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-6 text-center sm:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
            <Heart className="h-6 w-6 fill-current" />
          </div>

          <h2 className="mt-7 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            {t.ctaTitle}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-red-50/80 sm:text-lg">
            {t.ctaText}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href={`/${locale}/register`}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-red-800 shadow-xl transition hover:-translate-y-0.5 hover:bg-red-50"
            >
              {t.join}
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href={`/${locale}/about`}
              className="inline-flex items-center rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
            >
              {t.explore}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}