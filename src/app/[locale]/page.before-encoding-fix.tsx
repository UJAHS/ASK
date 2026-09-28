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
    cultureText:
      "Our community celebrates culture, relationships, respect and togetherness while creating opportunities for younger and older generations to connect.",

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
    introLabel: "ASK à¤•à¥‡ à¤¬à¤¾à¤°à¥‡ à¤®à¥‡à¤‚",
    introTitle:
      "à¤²à¥‹à¤—à¥‹à¤‚, à¤¸à¤‚à¤¸à¥à¤•à¥ƒà¤¤à¤¿ à¤”à¤° à¤œà¥à¤¡à¤¼à¤¾à¤µ à¤¸à¥‡ à¤¬à¤¨à¤¾ à¤à¤• à¤¸à¤®à¥à¤¦à¤¾à¤¯à¥¤",
    introText:
      "à¤…à¤¹à¤¿à¤šà¥à¤›à¤¤à¥à¤° à¤¸à¤‚à¤¸à¥à¤•à¤¾à¤° à¤•à¥‡à¤‚à¤¦à¥à¤° à¤à¤• à¤¸à¤¾à¤®à¥à¤¦à¤¾à¤¯à¤¿à¤• à¤®à¤‚à¤š à¤¹à¥ˆ à¤œà¥‹ à¤²à¥‹à¤—à¥‹à¤‚ à¤•à¥‹ à¤œà¥‹à¤¡à¤¼à¤¨à¥‡, à¤¸à¤¾à¤à¤¾ à¤®à¥‚à¤²à¥à¤¯à¥‹à¤‚ à¤•à¥‹ à¤†à¤—à¥‡ à¤¬à¤¢à¤¼à¤¾à¤¨à¥‡, à¤­à¤¾à¤—à¥€à¤¦à¤¾à¤°à¥€ à¤•à¥‹ à¤ªà¥à¤°à¥‹à¤¤à¥à¤¸à¤¾à¤¹à¤¿à¤¤ à¤•à¤°à¤¨à¥‡ à¤”à¤° à¤ªà¥€à¤¢à¤¼à¤¿à¤¯à¥‹à¤‚ à¤•à¥‡ à¤¬à¥€à¤š à¤¸à¤¾à¤°à¥à¤¥à¤• à¤¸à¤‚à¤¬à¤‚à¤§ à¤¬à¤¨à¤¾à¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤¬à¤¨à¤¾à¤¯à¤¾ à¤—à¤¯à¤¾ à¤¹à¥ˆà¥¤",

    missionLabel: "à¤¹à¤®à¤¾à¤°à¤¾ à¤‰à¤¦à¥à¤¦à¥‡à¤¶à¥à¤¯",
    missionTitle:
      "à¤¬à¤¦à¤²à¤¤à¥€ à¤¦à¥à¤¨à¤¿à¤¯à¤¾ à¤®à¥‡à¤‚ à¤…à¤ªà¤¨à¥‡ à¤¸à¤®à¥à¤¦à¤¾à¤¯ à¤•à¥‹ à¤œà¥à¤¡à¤¼à¥‡ à¤°à¤–à¤¨à¤¾à¥¤",
    missionText:
      "ASK à¤¸à¤¾à¤‚à¤¸à¥à¤•à¥ƒà¤¤à¤¿à¤• à¤—à¤¤à¤¿à¤µà¤¿à¤§à¤¿à¤¯à¥‹à¤‚, à¤¸à¤¾à¤®à¤¾à¤œà¤¿à¤• à¤­à¤¾à¤—à¥€à¤¦à¤¾à¤°à¥€, à¤•à¤¾à¤°à¥à¤¯à¤•à¥à¤°à¤®à¥‹à¤‚ à¤”à¤° à¤¡à¤¿à¤œà¤¿à¤Ÿà¤² à¤¸à¤®à¥à¤¦à¤¾à¤¯ à¤•à¥‡ à¤®à¤¾à¤§à¥à¤¯à¤® à¤¸à¥‡ à¤¸à¤¦à¤¸à¥à¤¯à¥‹à¤‚ à¤•à¥‹ à¤à¤• à¤¸à¤¾à¤¥ à¤œà¥‹à¤¡à¤¼à¤¤à¤¾ à¤¹à¥ˆà¥¤",

    activitiesLabel: "à¤¸à¤¾à¤®à¥à¤¦à¤¾à¤¯à¤¿à¤• à¤œà¥€à¤µà¤¨",
    activitiesTitle:
      "à¤¹à¤®à¤¾à¤°à¥‡ à¤¸à¤®à¥à¤¦à¤¾à¤¯ à¤®à¥‡à¤‚ à¤¹à¤®à¥‡à¤¶à¤¾ à¤•à¥à¤› à¤¨ à¤•à¥à¤› à¤¹à¥‹à¤¤à¤¾ à¤°à¤¹à¤¤à¤¾ à¤¹à¥ˆà¥¤",
    activitiesText:
      "ASK à¤¸à¤®à¥à¤¦à¤¾à¤¯ à¤¦à¥à¤µà¤¾à¤°à¤¾ à¤ªà¥à¤°à¤•à¤¾à¤¶à¤¿à¤¤ à¤¨à¤µà¥€à¤¨à¤¤à¤® à¤—à¤¤à¤¿à¤µà¤¿à¤§à¤¿à¤¯à¥‹à¤‚ à¤•à¥‹ à¤¦à¥‡à¤–à¥‡à¤‚à¥¤",

    cultureLabel: "à¤¸à¤‚à¤¸à¥à¤•à¥ƒà¤¤à¤¿ à¤”à¤° à¤®à¥‚à¤²à¥à¤¯",
    cultureTitle:
      "à¤à¤¸à¥€ à¤ªà¤°à¤‚à¤ªà¤°à¤¾à¤à¤‚ à¤œà¥‹ à¤ªà¥€à¤¢à¤¼à¤¿à¤¯à¥‹à¤‚ à¤•à¥‹ à¤œà¥‹à¤¡à¤¼à¤¤à¥€ à¤¹à¥ˆà¤‚à¥¤",
    cultureText:
      "à¤¹à¤® à¤¸à¤‚à¤¸à¥à¤•à¥ƒà¤¤à¤¿, à¤°à¤¿à¤¶à¥à¤¤à¥‹à¤‚, à¤¸à¤®à¥à¤®à¤¾à¤¨ à¤”à¤° à¤¸à¤¾à¤¥ à¤°à¤¹à¤¨à¥‡ à¤•à¥€ à¤­à¤¾à¤µà¤¨à¤¾ à¤•à¥‹ à¤®à¤¹à¤¤à¥à¤µ à¤¦à¥‡à¤¤à¥‡ à¤¹à¥ˆà¤‚ à¤”à¤° à¤¸à¤­à¥€ à¤ªà¥€à¤¢à¤¼à¤¿à¤¯à¥‹à¤‚ à¤•à¥‹ à¤œà¥‹à¤¡à¤¼à¤¨à¥‡ à¤•à¥‡ à¤…à¤µà¤¸à¤° à¤¬à¤¨à¤¾à¤¤à¥‡ à¤¹à¥ˆà¤‚à¥¤",

    eventsLabel: "à¤†à¤—à¤¾à¤®à¥€ à¤•à¤¾à¤°à¥à¤¯à¤•à¥à¤°à¤®",
    eventsTitle: "à¤®à¤¿à¤²à¥‡à¤‚à¥¤ à¤‰à¤¤à¥à¤¸à¤µ à¤®à¤¨à¤¾à¤à¤‚à¥¤ à¤­à¤¾à¤— à¤²à¥‡à¤‚à¥¤",
    eventsText:
      "ASK à¤•à¥‡ à¤¸à¤¾à¤®à¥à¤¦à¤¾à¤¯à¤¿à¤• à¤•à¤¾à¤°à¥à¤¯à¤•à¥à¤°à¤®à¥‹à¤‚, à¤¸à¤¾à¤‚à¤¸à¥à¤•à¥ƒà¤¤à¤¿à¤• à¤¸à¤®à¤¾à¤°à¥‹à¤¹à¥‹à¤‚ à¤”à¤° à¤—à¤¤à¤¿à¤µà¤¿à¤§à¤¿à¤¯à¥‹à¤‚ à¤•à¥€ à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€ à¤ªà¥à¤°à¤¾à¤ªà¥à¤¤ à¤•à¤°à¥‡à¤‚à¥¤",

    newsLabel: "à¤¨à¤µà¥€à¤¨à¤¤à¤® à¤¸à¤®à¤¾à¤šà¤¾à¤°",
    newsTitle: "à¤¹à¤®à¤¾à¤°à¥‡ à¤¸à¤®à¥à¤¦à¤¾à¤¯ à¤®à¥‡à¤‚ à¤•à¥à¤¯à¤¾ à¤¹à¥‹ à¤°à¤¹à¤¾ à¤¹à¥ˆà¥¤",
    newsText:
      "ASK à¤¦à¥à¤µà¤¾à¤°à¤¾ à¤ªà¥à¤°à¤•à¤¾à¤¶à¤¿à¤¤ à¤¨à¤µà¥€à¤¨à¤¤à¤® à¤˜à¥‹à¤·à¤£à¤¾à¤à¤‚, à¤…à¤ªà¤¡à¥‡à¤Ÿ à¤”à¤° à¤¸à¤®à¤¾à¤šà¤¾à¤° à¤ªà¤¢à¤¼à¥‡à¤‚à¥¤",

    galleryLabel: "à¤¸à¤¾à¤®à¥à¤¦à¤¾à¤¯à¤¿à¤• à¤—à¥ˆà¤²à¤°à¥€",
    galleryTitle:
      "à¤µà¥‡ à¤ªà¤² à¤œà¥‹ à¤¹à¤®à¥‡à¤‚ à¤¸à¤¾à¤¥ à¤²à¤¾à¤¤à¥‡ à¤¹à¥ˆà¤‚à¥¤",
    galleryText:
      "ASK à¤¸à¤®à¥à¤¦à¤¾à¤¯ à¤¦à¥à¤µà¤¾à¤°à¤¾ à¤¸à¤¾à¤à¤¾ à¤•à¥€ à¤—à¤ˆ à¤¨à¤µà¥€à¤¨à¤¤à¤® à¤¤à¤¸à¥à¤µà¥€à¤°à¥‹à¤‚ à¤”à¤° à¤¯à¤¾à¤¦à¥‹à¤‚ à¤•à¥‹ à¤¦à¥‡à¤–à¥‡à¤‚à¥¤",

    membershipLabel: "ASK à¤•à¤¾ à¤¹à¤¿à¤¸à¥à¤¸à¤¾ à¤¬à¤¨à¥‡à¤‚",
    membershipTitle:
      "à¤†à¤ªà¤•à¥€ à¤­à¤¾à¤—à¥€à¤¦à¤¾à¤°à¥€ à¤¸à¥‡ à¤†à¤ªà¤•à¤¾ à¤¸à¤®à¥à¤¦à¤¾à¤¯ à¤®à¤œà¤¬à¥‚à¤¤ à¤¹à¥‹à¤¤à¤¾ à¤¹à¥ˆà¥¤",
    membershipText:
      "ASK à¤¸à¥‡ à¤œà¥à¤¡à¤¼à¥‡à¤‚, à¤…à¤ªà¤¨à¤¾ à¤¸à¤®à¥à¤¦à¤¾à¤¯ à¤ªà¥à¤°à¥‹à¤«à¤¾à¤‡à¤² à¤¬à¤¨à¤¾à¤à¤‚, à¤—à¤¤à¤¿à¤µà¤¿à¤§à¤¿à¤¯à¤¾à¤‚ à¤¦à¥‡à¤–à¥‡à¤‚, à¤¸à¤¦à¤¸à¥à¤¯à¥‹à¤‚ à¤¸à¥‡ à¤œà¥à¤¡à¤¼à¥‡à¤‚ à¤”à¤° à¤¸à¤®à¥à¤¦à¤¾à¤¯ à¤•à¥€ à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€ à¤ªà¥à¤°à¤¾à¤ªà¥à¤¤ à¤•à¤°à¥‡à¤‚à¥¤",

    ctaTitle: "à¤†à¤‡à¤ à¤œà¥à¤¡à¤¼à¥‡ à¤°à¤¹à¥‡à¤‚à¥¤",
    ctaText:
      "ASK Community Portal à¤¸à¥‡ à¤œà¥à¤¡à¤¼à¥‡à¤‚ à¤”à¤° à¤œà¥à¤¡à¤¼à¤¾à¤µ, à¤¸à¤‚à¤¸à¥à¤•à¥ƒà¤¤à¤¿ à¤”à¤° à¤­à¤¾à¤—à¥€à¤¦à¤¾à¤°à¥€ à¤ªà¤° à¤†à¤§à¤¾à¤°à¤¿à¤¤ à¤¬à¤¢à¤¼à¤¤à¥‡ à¤¸à¤®à¥à¤¦à¤¾à¤¯ à¤•à¤¾ à¤¹à¤¿à¤¸à¥à¤¸à¤¾ à¤¬à¤¨à¥‡à¤‚à¥¤",

    join: "ASK à¤¸à¥‡ à¤œà¥à¤¡à¤¼à¥‡à¤‚",
    explore: "à¤¸à¤®à¥à¤¦à¤¾à¤¯ à¤¦à¥‡à¤–à¥‡à¤‚",
    viewAll: "à¤¸à¤­à¥€ à¤¦à¥‡à¤–à¥‡à¤‚",
    viewEvents: "à¤¸à¤­à¥€ à¤•à¤¾à¤°à¥à¤¯à¤•à¥à¤°à¤® à¤¦à¥‡à¤–à¥‡à¤‚",
    viewNews: "à¤¸à¤­à¥€ à¤¸à¤®à¤¾à¤šà¤¾à¤° à¤¦à¥‡à¤–à¥‡à¤‚",
    viewGallery: "à¤—à¥ˆà¤²à¤°à¥€ à¤¦à¥‡à¤–à¥‡à¤‚",
    noContent: "à¤…à¤­à¥€ à¤•à¥‹à¤ˆ à¤ªà¥à¤°à¤•à¤¾à¤¶à¤¿à¤¤ à¤¸à¤¾à¤®à¤—à¥à¤°à¥€ à¤‰à¤ªà¤²à¤¬à¥à¤§ à¤¨à¤¹à¥€à¤‚ à¤¹à¥ˆà¥¤",

    community: "à¤¸à¤®à¥à¤¦à¤¾à¤¯",
    culture: "à¤¸à¤‚à¤¸à¥à¤•à¥ƒà¤¤à¤¿",
    activities: "à¤—à¤¤à¤¿à¤µà¤¿à¤§à¤¿à¤¯à¤¾à¤‚",
    events: "à¤•à¤¾à¤°à¥à¤¯à¤•à¥à¤°à¤®",
    values: "à¤¸à¤¾à¤à¤¾ à¤®à¥‚à¤²à¥à¤¯",
    members: "à¤¸à¤¦à¤¸à¥à¤¯",
    news: "à¤¸à¤®à¤¾à¤šà¤¾à¤°",
  },

  gu: {
    introLabel: "ASK àªµàª¿àª¶à«‡",
    introTitle:
      "àª²à«‹àª•à«‹, àª¸àª‚àª¸à«àª•à«ƒàª¤àª¿ àª…àª¨à«‡ àªœà«‹àª¡àª¾àª£àª¥à«€ àª¬àª¨à«‡àª²à«‹ àª¸àª®à«àª¦àª¾àª¯.",
    introText:
      "àª…àª¹àª¿àªšà«àª›àª¤à«àª° àª¸àª‚àª¸à«àª•àª¾àª° àª•à«‡àª¨à«àª¦à«àª° àªàª• àª¸àª¾àª®à«àª¦àª¾àª¯àª¿àª• àªªà«àª²à«‡àªŸàª«à«‹àª°à«àª® àª›à«‡ àªœà«‡ àª²à«‹àª•à«‹àª¨à«‡ àªœà«‹àª¡àªµàª¾, àª¸àª¹àª¿àª¯àª¾àª°àª¾ àª®à«‚àª²à«àª¯à«‹àª¨à«‡ àª†àª—àª³ àªµàª§àª¾àª°àªµàª¾, àª­àª¾àª—à«€àª¦àª¾àª°à«€àª¨à«‡ àªªà«àª°à«‹àª¤à«àª¸àª¾àª¹àª¿àª¤ àª•àª°àªµàª¾ àª…àª¨à«‡ àªªà«‡àª¢à«€àª“ àªµàªšà«àªšà«‡ àª…àª°à«àª¥àªªà«‚àª°à«àª£ àª¸àª‚àª¬àª‚àª§à«‹ àª¬àª¨àª¾àªµàªµàª¾ àª®àª¾àªŸà«‡ àª¬àª¨àª¾àªµàªµàª¾àª®àª¾àª‚ àª†àªµà«àª¯à«àª‚ àª›à«‡.",

    missionLabel: "àª…àª®àª¾àª°à«‹ àª¹à«‡àª¤à«",
    missionTitle:
      "àª¬àª¦àª²àª¾àª¤à«€ àª¦à«àª¨àª¿àª¯àª¾àª®àª¾àª‚ àª†àªªàª£àª¾ àª¸àª®à«àª¦àª¾àª¯àª¨à«‡ àªœà«‹àª¡àª¾àª¯à«‡àª²à«‹ àª°àª¾àª–àªµà«‹.",
    missionText:
      "ASK àª¸àª¾àª‚àª¸à«àª•à«ƒàª¤àª¿àª• àªªà«àª°àªµà«ƒàª¤à«àª¤àª¿àª“, àª¸àª¾àª®àª¾àªœàª¿àª• àª­àª¾àª—à«€àª¦àª¾àª°à«€, àª•àª¾àª°à«àª¯àª•à«àª°àª®à«‹ àª…àª¨à«‡ àª¡àª¿àªœàª¿àªŸàª² àª¸àª®à«àª¦àª¾àª¯ àª¦à«àªµàª¾àª°àª¾ àª¸àª­à«àª¯à«‹àª¨à«‡ àªàª•àª¸àª¾àª¥à«‡ àªœà«‹àª¡à«‡ àª›à«‡.",

    activitiesLabel: "àª¸àª¾àª®à«àª¦àª¾àª¯àª¿àª• àªœà«€àªµàª¨",
    activitiesTitle:
      "àª†àªªàª£àª¾ àª¸àª®à«àª¦àª¾àª¯àª®àª¾àª‚ àª¹àª‚àª®à«‡àª¶àª¾ àª•àª‚àªˆàª• àª¨àªµà«àª‚ àª¥àª¤à«àª‚ àª°àª¹à«‡ àª›à«‡.",
    activitiesText:
      "ASK àª¸àª®à«àª¦àª¾àª¯ àª¦à«àªµàª¾àª°àª¾ àªªà«àª°àª•àª¾àª¶àª¿àª¤ àª¨àªµà«€àª¨àª¤àª® àªªà«àª°àªµà«ƒàª¤à«àª¤àª¿àª“ àªœà«àª“.",

    cultureLabel: "àª¸àª‚àª¸à«àª•à«ƒàª¤àª¿ àª…àª¨à«‡ àª®à«‚àª²à«àª¯à«‹",
    cultureTitle:
      "àªªà«‡àª¢à«€àª“àª¨à«‡ àªœà«‹àª¡àª¤à«€ àªªàª°àª‚àªªàª°àª¾àª“.",
    cultureText:
      "àª…àª®àª¾àª°à«‹ àª¸àª®à«àª¦àª¾àª¯ àª¸àª‚àª¸à«àª•à«ƒàª¤àª¿, àª¸àª‚àª¬àª‚àª§à«‹, àª¸àª¨à«àª®àª¾àª¨ àª…àª¨à«‡ àªàª•àª¤àª¾àª¨à«‡ àª®àª¹àª¤à«àªµ àª†àªªà«‡ àª›à«‡ àª…àª¨à«‡ àªµàª¿àªµàª¿àª§ àªªà«‡àª¢à«€àª“àª¨à«‡ àªœà«‹àª¡àª¾àªµàª¾àª¨à«€ àª¤àª•à«‹ àª†àªªà«‡ àª›à«‡.",

    eventsLabel: "àª†àª—àª¾àª®à«€ àª•àª¾àª°à«àª¯àª•à«àª°àª®à«‹",
    eventsTitle: "àª®àª³à«‹. àª‰àªœàªµà«‹. àª­àª¾àª— àª²à«‹.",
    eventsText:
      "ASKàª¨àª¾ àª¸àª¾àª®à«àª¦àª¾àª¯àª¿àª• àª•àª¾àª°à«àª¯àª•à«àª°àª®à«‹, àª¸àª¾àª‚àª¸à«àª•à«ƒàª¤àª¿àª• àª‰àªœàªµàª£à«€àª“ àª…àª¨à«‡ àªªà«àª°àªµà«ƒàª¤à«àª¤àª¿àª“ àªµàª¿àª¶à«‡ àª®àª¾àª¹àª¿àª¤àª—àª¾àª° àª°àª¹à«‹.",

    newsLabel: "àª¨àªµà«€àª¨àª¤àª® àª¸àª®àª¾àªšàª¾àª°",
    newsTitle:
      "àª†àªªàª£àª¾ àª¸àª®à«àª¦àª¾àª¯àª®àª¾àª‚ àª¶à«àª‚ àª¥àªˆ àª°àª¹à«àª¯à«àª‚ àª›à«‡.",
    newsText:
      "ASK àª¦à«àªµàª¾àª°àª¾ àªªà«àª°àª•àª¾àª¶àª¿àª¤ àª¨àªµà«€àª¨àª¤àª® àªœàª¾àª¹à«‡àª°àª¾àª¤à«‹, àª…àªªàª¡à«‡àªŸà«àª¸ àª…àª¨à«‡ àª¸àª®àª¾àªšàª¾àª° àªµàª¾àª‚àªšà«‹.",

    galleryLabel: "àª¸àª¾àª®à«àª¦àª¾àª¯àª¿àª• àª—à«‡àª²à«‡àª°à«€",
    galleryTitle:
      "àª àªªàª³à«‹ àªœà«‡ àª†àªªàª£àª¨à«‡ àª¸àª¾àª¥à«‡ àª²àª¾àªµà«‡ àª›à«‡.",
    galleryText:
      "ASK àª¸àª®à«àª¦àª¾àª¯ àª¦à«àªµàª¾àª°àª¾ àª¶à«‡àª° àª•àª°àªµàª¾àª®àª¾àª‚ àª†àªµà«‡àª²à«€ àª¨àªµà«€àª¨àª¤àª® àª¤àª¸àªµà«€àª°à«‹ àª…àª¨à«‡ àª¯àª¾àª¦à«‹ àªœà«àª“.",

    membershipLabel: "ASKàª¨à«‹ àª­àª¾àª— àª¬àª¨à«‹",
    membershipTitle:
      "àª¤àª®àª¾àª°à«€ àª­àª¾àª—à«€àª¦àª¾àª°à«€àª¥à«€ àª¤àª®àª¾àª°à«‹ àª¸àª®à«àª¦àª¾àª¯ àªµàª§à« àª®àªœàª¬à«‚àª¤ àª¬àª¨à«‡ àª›à«‡.",
    membershipText:
      "ASK àª¸àª¾àª¥à«‡ àªœà«‹àª¡àª¾àª“, àª¤àª®àª¾àª°à«€ àª¸àª®à«àª¦àª¾àª¯ àªªà«àª°à«‹àª«àª¾àª‡àª² àª¬àª¨àª¾àªµà«‹, àªªà«àª°àªµà«ƒàª¤à«àª¤àª¿àª“ àª¶à«‹àª§à«‹, àª¸àª­à«àª¯à«‹ àª¸àª¾àª¥à«‡ àªœà«‹àª¡àª¾àª“ àª…àª¨à«‡ àª¸àª®à«àª¦àª¾àª¯àª¨à«€ àª®àª¾àª¹àª¿àª¤à«€ àª®à«‡àª³àªµà«‹.",

    ctaTitle: "àªšàª¾àª²à«‹ àªœà«‹àª¡àª¾àª¯à«‡àª²àª¾ àª°àª¹à«€àª.",
    ctaText:
      "ASK Community Portal àª¸àª¾àª¥à«‡ àªœà«‹àª¡àª¾àª“ àª…àª¨à«‡ àªœà«‹àª¡àª¾àª£, àª¸àª‚àª¸à«àª•à«ƒàª¤àª¿ àª…àª¨à«‡ àª­àª¾àª—à«€àª¦àª¾àª°à«€ àªªàª° àª†àª§àª¾àª°àª¿àª¤ àªµàª§àª¤àª¾ àª¸àª®à«àª¦àª¾àª¯àª¨à«‹ àª­àª¾àª— àª¬àª¨à«‹.",

    join: "ASK àª¸àª¾àª¥à«‡ àªœà«‹àª¡àª¾àª“",
    explore: "àª¸àª®à«àª¦àª¾àª¯ àªœà«àª“",
    viewAll: "àª¬àª§à«àª‚ àªœà«àª“",
    viewEvents: "àª¬àª§àª¾ àª•àª¾àª°à«àª¯àª•à«àª°àª®à«‹ àªœà«àª“",
    viewNews: "àª¬àª§àª¾ àª¸àª®àª¾àªšàª¾àª° àªœà«àª“",
    viewGallery: "àª—à«‡àª²à«‡àª°à«€ àªœà«àª“",
    noContent: "àª¹àª¾àª²àª®àª¾àª‚ àª•à«‹àªˆ àªªà«àª°àª•àª¾àª¶àª¿àª¤ àª¸àª¾àª®àª—à«àª°à«€ àª‰àªªàª²àª¬à«àª§ àª¨àª¥à«€.",

    community: "àª¸àª®à«àª¦àª¾àª¯",
    culture: "àª¸àª‚àª¸à«àª•à«ƒàª¤àª¿",
    activities: "àªªà«àª°àªµà«ƒàª¤à«àª¤àª¿àª“",
    events: "àª•àª¾àª°à«àª¯àª•à«àª°àª®à«‹",
    values: "àª¸àª¹àª¿àª¯àª¾àª°àª¾ àª®à«‚àª²à«àª¯à«‹",
    members: "àª¸àª­à«àª¯à«‹",
    news: "àª¸àª®àª¾àªšàª¾àª°",
  },
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
    <main className="overflow-hidden bg-[#fff7f8] text-[#3b0710] transition-colors duration-500 dark:bg-[#24040a] dark:text-white">

      {/* TRADITIONAL HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#650000] via-[#A30505] to-[#D92727] text-[#fff7e6]">
        {/* Traditional ornamental background */}
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div
            className="
              absolute
              left-1/2
              top-1/2
              h-[520px]
              w-[520px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border
              border-[#d9ad55]
              [box-shadow:0_0_0_18px_rgba(217,173,85,0.08),0_0_0_36px_rgba(217,173,85,0.05),0_0_0_72px_rgba(217,173,85,0.04)]
            "
          />

          <div
            className="
              absolute
              left-1/2
              top-1/2
              h-[390px]
              w-[390px]
              -translate-x-1/2
              -translate-y-1/2
              rotate-45
              border
              border-[#d9ad55]/70
            "
          />

          <div
            className="
              absolute
              left-1/2
              top-1/2
              h-[275px]
              w-[275px]
              -translate-x-1/2
              -translate-y-1/2
              rotate-45
              border
              border-[#d9ad55]/50
            "
          />
        </div>

        {/* Corner ornaments */}
        <div className="pointer-events-none absolute left-5 top-5 h-24 w-24 border-l-2 border-t-2 border-[#d9ad55]/70 sm:left-10 sm:top-10 sm:h-32 sm:w-32" />

        <div className="pointer-events-none absolute right-5 top-5 h-24 w-24 border-r-2 border-t-2 border-[#d9ad55]/70 sm:right-10 sm:top-10 sm:h-32 sm:w-32" />

        <div className="pointer-events-none absolute bottom-5 left-5 h-24 w-24 border-b-2 border-l-2 border-[#d9ad55]/70 sm:bottom-10 sm:left-10 sm:h-32 sm:w-32" />

        <div className="pointer-events-none absolute bottom-5 right-5 h-24 w-24 border-b-2 border-r-2 border-[#d9ad55]/70 sm:bottom-10 sm:right-10 sm:h-32 sm:w-32" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-5xl text-center">

            {/* Traditional symbol */}
            <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#d9ad55] bg-[#7a0b1c] shadow-[0_0_40px_rgba(217,173,85,0.18)]">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#d9ad55]/70 text-3xl text-[#f0c96b]">
                à¥
              </div>
            </div>

            {/* Decorative title */}
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-[#d9ad55]" />
              <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#e7c16b]">
                Ahhichatra Sanskar Kendra
              </span>
              <span className="h-px w-12 bg-[#d9ad55]" />
            </div>

            <h1
              className="
                mx-auto
                max-w-4xl
                font-serif
                text-4xl
                font-bold
                leading-tight
                tracking-tight
                text-[#fff8e8]
                sm:text-5xl
                lg:text-7xl
              "
            >
              Keeping Our Community
              <span className="block text-[#e2b85d]">
                Connected Through Culture
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-[#f8e7c8]/85 sm:text-lg">
              A community space where people, traditions, relationships
              and shared values come together across generations.
            </p>

            {/* Traditional divider */}
            <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-3">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d9ad55]" />
              <span className="text-xl text-[#e2b85d]">âœ¦</span>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d9ad55]" />
            </div>

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
                  shadow-[0_8px_30px_rgba(217,173,85,0.20)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#f0c96b]
                  hover:shadow-[0_12px_35px_rgba(217,173,85,0.35)]
                "
              >
                {t.explore}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href={`/${locale}/activities`}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border-2
                  border-[#f2d99d]/50
                  bg-white/5
                  px-7
                  py-3.5
                  text-sm
                  font-bold
                  text-[#fff8e8]
                  backdrop-blur-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#d9ad55]
                  hover:bg-[#d9ad55]/10
                "
              >
                {t.viewAll}
              </Link>
            </div>
          </div>
        </div>

        {/* Traditional bottom border */}
        <div className="relative h-3 border-y border-[#d9ad55]/50 bg-[#7a0b1c]">
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
                { icon: Users, title: t.community },
                { icon: Sparkles, title: t.culture },
                { icon: CalendarDays, title: t.events },
                { icon: Heart, title: t.values },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group rounded-2xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/[0.12]"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/20 text-red-200">
                      <Icon className="h-5 w-5" />
                    </div>

                    <p className="mt-6 font-bold">
                      {item.title}
                    </p>
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
              <div className="absolute left-0 top-0 h-[330px] w-[72%] overflow-hidden rounded-[28px] bg-gradient-to-br from-red-800 to-red-950 shadow-2xl">
                <div className="flex h-full items-center justify-center">
                  <Heart className="h-24 w-24 text-white/30" />
                </div>
              </div>

              <div className="absolute bottom-0 right-0 flex h-[230px] w-[52%] items-center justify-center overflow-hidden rounded-[24px] border-8 border-[#fff0f2] bg-gradient-to-br from-red-500 to-red-800 shadow-2xl dark:border-[#31050c]">
                <Users className="h-20 w-20 text-white/30" />
              </div>

              <div className="absolute bottom-10 left-[48%] flex h-14 w-14 items-center justify-center rounded-2xl bg-red-700 text-white shadow-xl">
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