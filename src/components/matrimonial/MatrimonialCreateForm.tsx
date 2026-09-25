"use client";

import { FormEvent, useState } from "react";
import ImageInput from "@/components/common/ImageInput";
import { useRouter } from "next/navigation";

type Props = {
  locale: string;
  initialData?: {
    firstName?: string | null;
    lastName?: string | null;
    city?: string | null;
    state?: string | null;
    country?: string | null;
    profileImage?: string | null;
  };
};

const translations = {
  en: {
    title: "Create Matrimonial Profile",
    subtitle:
      "Complete your profile to participate in the ASK Community matrimonial section.",

    personal: "Personal Information",
    professional: "Professional & Education",
    location: "Location",
    family: "Family Information",
    about: "About You",
    partner: "Partner Expectations",
    settings: "Privacy & Contact Settings",

    firstName: "First Name",
    lastName: "Last Name",
    gender: "Gender",
    dateOfBirth: "Date of Birth",
    height: "Height",
    maritalStatus: "Marital Status",

    male: "Male",
    female: "Female",
    other: "Other",

    neverMarried: "Never Married",
    divorced: "Divorced",
    widowed: "Widowed",
    separated: "Separated",

    education: "Education",
    profession: "Profession",
    occupation: "Occupation",
    company: "Company / Organization",

    city: "City",
    state: "State",
    country: "Country",
    pincode: "PIN Code",

    religion: "Religion",
    community: "Community",
    subCommunity: "Sub Community",
    gotra: "Gotra",

    fatherName: "Father's Name",
    motherName: "Mother's Name",
    siblings: "Siblings",
    familyDetails: "Family Details",

    aboutMe: "About Me",
    partnerExpectation: "Partner Expectations",

    profileImage: "Profile Image URL",

    contactPreference: "Contact Preference",
    adminOnly: "Contact through Admin",
    membersOnly: "Approved Members Only",

    profileVisibility: "Profile Visibility",
    private: "Private",
    membersVisibility: "Members Only",
    public: "Public",

    privateHelp:
      "Only you and administrators can view this profile.",
    membersHelp:
      "Approved members can view this profile.",
    publicHelp:
      "Anyone can view this approved profile.",

    required: "Required",
    optional: "Optional",

    submit: "Create Profile",
    creating: "Creating Profile...",
    cancel: "Cancel",

    success:
      "Your matrimonial profile has been submitted for admin approval.",
    error: "Unable to create matrimonial profile.",
  },

  hi: {
    title: "à¤µà¤¿à¤µà¤¾à¤¹ à¤ªà¥à¤°à¥‹à¤«à¤¼à¤¾à¤‡à¤² à¤¬à¤¨à¤¾à¤à¤",
    subtitle:
      "ASK Community à¤•à¥‡ à¤µà¤¿à¤µà¤¾à¤¹ à¤…à¤¨à¥à¤­à¤¾à¤— à¤®à¥‡à¤‚ à¤­à¤¾à¤— à¤²à¥‡à¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤…à¤ªà¤¨à¥€ à¤ªà¥à¤°à¥‹à¤«à¤¼à¤¾à¤‡à¤² à¤ªà¥‚à¤°à¥€ à¤•à¤°à¥‡à¤‚à¥¤",

    personal: "à¤µà¥à¤¯à¤•à¥à¤¤à¤¿à¤—à¤¤ à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€",
    professional: "à¤µà¥à¤¯à¤µà¤¸à¤¾à¤¯ à¤”à¤° à¤¶à¤¿à¤•à¥à¤·à¤¾",
    location: "à¤¸à¥à¤¥à¤¾à¤¨",
    family: "à¤ªà¤°à¤¿à¤µà¤¾à¤° à¤•à¥€ à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€",
    about: "à¤…à¤ªà¤¨à¥‡ à¤¬à¤¾à¤°à¥‡ à¤®à¥‡à¤‚",
    partner: "à¤œà¥€à¤µà¤¨à¤¸à¤¾à¤¥à¥€ à¤•à¥€ à¤…à¤ªà¥‡à¤•à¥à¤·à¤¾à¤à¤",
    settings: "à¤—à¥‹à¤ªà¤¨à¥€à¤¯à¤¤à¤¾ à¤”à¤° à¤¸à¤‚à¤ªà¤°à¥à¤• à¤¸à¥‡à¤Ÿà¤¿à¤‚à¤—à¥à¤¸",

    firstName: "à¤ªà¤¹à¤²à¤¾ à¤¨à¤¾à¤®",
    lastName: "à¤‰à¤ªà¤¨à¤¾à¤®",
    gender: "à¤²à¤¿à¤‚à¤—",
    dateOfBirth: "à¤œà¤¨à¥à¤® à¤¤à¤¿à¤¥à¤¿",
    height: "à¤•à¤¦",
    maritalStatus: "à¤µà¥ˆà¤µà¤¾à¤¹à¤¿à¤• à¤¸à¥à¤¥à¤¿à¤¤à¤¿",

    male: "à¤ªà¥à¤°à¥à¤·",
    female: "à¤®à¤¹à¤¿à¤²à¤¾",
    other: "à¤…à¤¨à¥à¤¯",

    neverMarried: "à¤•à¤­à¥€ à¤µà¤¿à¤µà¤¾à¤¹ à¤¨à¤¹à¥€à¤‚ à¤¹à¥à¤†",
    divorced: "à¤¤à¤²à¤¾à¤•à¤¶à¥à¤¦à¤¾",
    widowed: "à¤µà¤¿à¤§à¤µà¤¾ / à¤µà¤¿à¤§à¥à¤°",
    separated: "à¤…à¤²à¤— à¤°à¤¹ à¤°à¤¹à¥‡ à¤¹à¥ˆà¤‚",

    education: "à¤¶à¤¿à¤•à¥à¤·à¤¾",
    profession: "à¤ªà¥‡à¤¶à¤¾",
    occupation: "à¤µà¥à¤¯à¤µà¤¸à¤¾à¤¯",
    company: "à¤•à¤‚à¤ªà¤¨à¥€ / à¤¸à¤‚à¤¸à¥à¤¥à¤¾",

    city: "à¤¶à¤¹à¤°",
    state: "à¤°à¤¾à¤œà¥à¤¯",
    country: "à¤¦à¥‡à¤¶",
    pincode: "à¤ªà¤¿à¤¨ à¤•à¥‹à¤¡",

    religion: "à¤§à¤°à¥à¤®",
    community: "à¤¸à¤®à¥à¤¦à¤¾à¤¯",
    subCommunity: "à¤‰à¤ª-à¤¸à¤®à¥à¤¦à¤¾à¤¯",
    gotra: "à¤—à¥‹à¤¤à¥à¤°",

    fatherName: "à¤ªà¤¿à¤¤à¤¾ à¤•à¤¾ à¤¨à¤¾à¤®",
    motherName: "à¤®à¤¾à¤¤à¤¾ à¤•à¤¾ à¤¨à¤¾à¤®",
    siblings: "à¤­à¤¾à¤ˆ-à¤¬à¤¹à¤¨",
    familyDetails: "à¤ªà¤°à¤¿à¤µà¤¾à¤° à¤•à¤¾ à¤µà¤¿à¤µà¤°à¤£",

    aboutMe: "à¤®à¥‡à¤°à¥‡ à¤¬à¤¾à¤°à¥‡ à¤®à¥‡à¤‚",
    partnerExpectation: "à¤œà¥€à¤µà¤¨à¤¸à¤¾à¤¥à¥€ à¤•à¥€ à¤…à¤ªà¥‡à¤•à¥à¤·à¤¾à¤à¤",

    profileImage: "à¤ªà¥à¤°à¥‹à¤«à¤¼à¤¾à¤‡à¤² à¤‡à¤®à¥‡à¤œ URL",

    contactPreference: "à¤¸à¤‚à¤ªà¤°à¥à¤• à¤ªà¥à¤°à¤¾à¤¥à¤®à¤¿à¤•à¤¤à¤¾",
    adminOnly: "à¤à¤¡à¤®à¤¿à¤¨ à¤•à¥‡ à¤®à¤¾à¤§à¥à¤¯à¤® à¤¸à¥‡ à¤¸à¤‚à¤ªà¤°à¥à¤•",
    membersOnly: "à¤•à¥‡à¤µà¤² à¤¸à¥à¤µà¥€à¤•à¥ƒà¤¤ à¤¸à¤¦à¤¸à¥à¤¯",

    profileVisibility: "à¤ªà¥à¤°à¥‹à¤«à¤¼à¤¾à¤‡à¤² à¤¦à¥ƒà¤¶à¥à¤¯à¤¤à¤¾",
    private: "à¤¨à¤¿à¤œà¥€",
    membersVisibility: "à¤•à¥‡à¤µà¤² à¤¸à¤¦à¤¸à¥à¤¯",
    public: "à¤¸à¤¾à¤°à¥à¤µà¤œà¤¨à¤¿à¤•",

    privateHelp:
      "à¤¯à¤¹ à¤ªà¥à¤°à¥‹à¤«à¤¼à¤¾à¤‡à¤² à¤•à¥‡à¤µà¤² à¤†à¤ª à¤”à¤° à¤à¤¡à¤®à¤¿à¤¨ à¤¦à¥‡à¤– à¤¸à¤•à¤¤à¥‡ à¤¹à¥ˆà¤‚à¥¤",
    membersHelp:
      "à¤¸à¥à¤µà¥€à¤•à¥ƒà¤¤ à¤¸à¤¦à¤¸à¥à¤¯ à¤¯à¤¹ à¤ªà¥à¤°à¥‹à¤«à¤¼à¤¾à¤‡à¤² à¤¦à¥‡à¤– à¤¸à¤•à¤¤à¥‡ à¤¹à¥ˆà¤‚à¥¤",
    publicHelp:
      "à¤¸à¥à¤µà¥€à¤•à¥ƒà¤¤ à¤ªà¥à¤°à¥‹à¤«à¤¼à¤¾à¤‡à¤² à¤¸à¤­à¥€ à¤²à¥‹à¤— à¤¦à¥‡à¤– à¤¸à¤•à¤¤à¥‡ à¤¹à¥ˆà¤‚à¥¤",

    required: "à¤†à¤µà¤¶à¥à¤¯à¤•",
    optional: "à¤µà¥ˆà¤•à¤²à¥à¤ªà¤¿à¤•",

    submit: "à¤ªà¥à¤°à¥‹à¤«à¤¼à¤¾à¤‡à¤² à¤¬à¤¨à¤¾à¤à¤",
    creating: "à¤ªà¥à¤°à¥‹à¤«à¤¼à¤¾à¤‡à¤² à¤¬à¤¨à¤¾à¤ˆ à¤œà¤¾ à¤°à¤¹à¥€ à¤¹à¥ˆ...",
    cancel: "à¤°à¤¦à¥à¤¦ à¤•à¤°à¥‡à¤‚",

    success:
      "à¤†à¤ªà¤•à¥€ à¤µà¤¿à¤µà¤¾à¤¹ à¤ªà¥à¤°à¥‹à¤«à¤¼à¤¾à¤‡à¤² à¤à¤¡à¤®à¤¿à¤¨ à¤…à¤¨à¥à¤®à¥‹à¤¦à¤¨ à¤•à¥‡ à¤²à¤¿à¤ à¤­à¥‡à¤œ à¤¦à¥€ à¤—à¤ˆ à¤¹à¥ˆà¥¤",
    error: "à¤µà¤¿à¤µà¤¾à¤¹ à¤ªà¥à¤°à¥‹à¤«à¤¼à¤¾à¤‡à¤² à¤¬à¤¨à¤¾à¤¨à¥‡ à¤®à¥‡à¤‚ à¤¸à¤®à¤¸à¥à¤¯à¤¾ à¤¹à¥à¤ˆà¥¤",
  },

  gu: {
    title: "\u0ab5\u0abf\u0ab5\u0abe\u0ab9 \u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0aac\u0aa8\u0abe\u0ab5\u0acb",
    subtitle:
      "ASK Community àª¨àª¾ àªµàª¿àªµàª¾àª¹ àªµàª¿àª­àª¾àª—àª®àª¾àª‚ àª­àª¾àª— àª²à«‡àªµàª¾ àª®àª¾àªŸà«‡ àª¤àª®àª¾àª°à«€ àªªà«àª°à«‹àª«àª¾àª‡àª² àªªà«‚àª°à«àª£ àª•àª°à«‹.",

    personal: "\u0ab5\u0acd\u0aaf\u0a95\u0acd\u0aa4\u0abf\u0a97\u0aa4 \u0aae\u0abe\u0ab9\u0abf\u0aa4\u0ac0",
    professional: "\u0ab5\u0acd\u0aaf\u0ab5\u0ab8\u0abe\u0aaf \u0a85\u0aa8\u0ac7 \u0ab6\u0abf\u0a95\u0acd\u0ab7\u0aa3",
    location: "\u0ab8\u0acd\u0aa5\u0abe\u0aa8",
    family: "\u0aaa\u0ab0\u0abf\u0ab5\u0abe\u0abe\u0ab0\u0aa8\u0ac0 \u0aae\u0abe\u0ab9\u0abf\u0aa4\u0ac0",
    about: "\u0aa4\u0aae\u0abe\u0ab0\u0abe \u0ab5\u0abf\u0ab6\u0ac7",
    partner: "\u0a9c\u0ac0\u0ab5\u0aa8\u0ab8\u0abe\u0aa5\u0ac0 \u0aae\u0abe\u0a9f\u0ac7\u0aa8\u0ac0 \u0a85\u0aaa\u0ac7\u0a95\u0acd\u0ab7\u0abe\u0a93",
    settings: "\u0a97\u0acb\u0aaa\u0aa8\u0ac0\u0aaf\u0aa4\u0abe \u0a85\u0aa8\u0ac7 \u0ab8\u0a82\u0aaa\u0ab0\u0acd\u0a95 \u0ab8\u0ac7\u0a9f\u0abf\u0a82\u0a97\u0acd\u0ab8",

    firstName: "\u0aaa\u0acd\u0ab0\u0aa5\u0aae \u0aa8\u0abe\u0aae",
    lastName: "\u0a85\u0a9f\u0a95",
    gender: "\u0ab2\u0abf\u0a82\u0a97",
    dateOfBirth: "\u0a9c\u0aa8\u0acd\u0aae \u0aa4\u0abe\u0ab0\u0ac0\u0a96",
    height: "\u0a8a\u0a82\u0a9a\u0abe\u0a88",
    maritalStatus: "\u0ab5\u0abf\u0ab5\u0abe\u0ab9\u0abf\u0aa4 \u0ab8\u0acd\u0aa5\u0abf\u0aa4\u0abf",

    male: "\u0aaa\u0ac1\u0ab0\u0ac1\u0ab7",
    female: "\u0ab8\u0acd\u0aa4\u0acd\u0ab0\u0ac0",
    other: "\u0a85\u0aa8\u0acd\u0aaf",

    neverMarried: "\u0a95\u0acd\u0aaf\u0abe\u0ab0\u0ac7 \u0ab2\u0a97\u0acd\u0aa8 \u0aa5\u0aaf\u0abe \u0aa8\u0aa5\u0ac0",
    divorced: "\u0a9b\u0ac2\u0a9f\u0abe\u0a9b\u0ac7\u0aa1\u0abe",
    widowed: "\u0ab5\u0abf\u0aa7\u0ab5\u0abe / \u0ab5\u0abf\u0aa7\u0ac1\u0ab0",
    separated: "\u0a85\u0ab2\u0a97 \u0ab0\u0ab9\u0ac7\u0ab5\u0abe",

    education: "\u0ab6\u0abf\u0a95\u0acd\u0ab7\u0aa3",
    profession: "\u0ab5\u0acd\u0aaf\u0ab5\u0ab8\u0abe\u0aaf",
    occupation: "\u0ab0\u0acb\u0a9c\u0a97\u0abe\u0ab0",
    company: "\u0a95\u0a82\u0aaa\u0aa8\u0ac0 / \u0ab8\u0a82\u0ab8\u0acd\u0aa5\u0abe",

    city: "\u0ab6\u0ab9\u0ac7\u0ab0",
    state: "\u0ab0\u0abe\u0a9c\u0acd\u0aaf",
    country: "\u0aa6\u0ac7\u0ab6",
    pincode: "\u0aaa\u0abf\u0aa8 \u0a95\u0acb\u0aa1",

    religion: "\u0aa7\u0ab0\u0acd\u0aae",
    community: "\u0ab8\u0aae\u0abe\u0a9c",
    subCommunity: "\u0aaa\u0c9f\u0ab8\u0aae\u0abe\u0a9c",
    gotra: "\u0a97\u0acb\u0aa4\u0acd\u0ab0",

    fatherName: "\u0aaa\u0abf\u0aa4\u0abe\u0aa8\u0ac1\u0a82 \u0aa8\u0abe\u0aae",
    motherName: "\u0aae\u0abe\u0aa4\u0abe\u0aa8\u0ac1\u0a82 \u0aa8\u0abe\u0aae",
    siblings: "\u0aad\u0abe\u0a88-\u0aac\u0ab9\u0ac7\u0aa8",
    familyDetails: "\u0aaa\u0ab0\u0abf\u0ab5\u0abe\u0ab0\u0aa8\u0ac0 \u0ab5\u0abf\u0a97\u0aa4",

    aboutMe: "\u0aae\u0abe\u0ab0\u0abe \u0ab5\u0abf\u0ab6\u0ac7",
    partnerExpectation: "\u0a9c\u0ac0\u0ab5\u0aa8\u0ab8\u0abe\u0aa5\u0ac0 \u0aae\u0abe\u0a9f\u0ac7\u0aa8\u0ac0 \u0a85\u0aaa\u0ac7\u0a95\u0acd\u0ab7\u0abe\u0a93",

    profileImage: "\u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0a87\u0aae\u0ac7\u0a9c URL",

    contactPreference: "\u0ab8\u0a82\u0aaa\u0ab0\u0acd\u0a95 \u0aaa\u0acd\u0ab0\u0abe\u0aa5\u0aae\u0abf\u0a95\u0aa4\u0abe",
    adminOnly: "\u0a8f\u0aa1\u0aae\u0abf\u0aa8 \u0aa6\u0acd\u0ab5\u0abe\u0ab0\u0abe \u0ab8\u0a82\u0aaa\u0ab0\u0acd\u0a95",
    membersOnly: "\u0aae\u0abe\u0aa4\u0acd\u0ab0 \u0aae\u0a82\u0a9c\u0ac2\u0ab0 \u0ab8\u0aad\u0acd\u0aaf\u0acb",

    profileVisibility: "\u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0aa6\u0ac3\u0ab6\u0acd\u0aaf\u0aa4\u0abe",
    private: "\u0a96\u0abe\u0aa8\u0a97\u0ac0",
    membersVisibility: "\u0aae\u0abe\u0aa4\u0acd\u0ab0 \u0ab8\u0aad\u0acd\u0aaf\u0acb",
    public: "\u0a9c\u0abe\u0ab9\u0ac7\u0ab0",

    privateHelp:
      "\u0a86 \u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0aae\u0abe\u0aa4\u0acd\u0ab0 \u0aa4\u0aae\u0ac7 \u0a85\u0aa8\u0ac7 \u0a8f\u0aa1\u0aae\u0abf\u0aa8 \u0a9c\u0acb\u0a88 \u0ab6\u0a95\u0ac7 \u0a9b\u0acb.",
    membersHelp:
      "\u0aae\u0a82\u0a9c\u0ac2\u0ab0 \u0ab8\u0aad\u0acd\u0aaf\u0acb \u0a86 \u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0a9c\u0acb\u0a88 \u0ab6\u0a95\u0ac7 \u0a9b\u0ac7.",
    publicHelp:
      "\u0aae\u0a82\u0a9c\u0ac2\u0ab0 \u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0aa6\u0ab0\u0ac7\u0a95 \u0ab5\u0acd\u0aaf\u0a95\u0acd\u0aa4\u0abf \u0a9c\u0acb\u0a88 \u0ab6\u0a95\u0ac7 \u0a9b\u0ac7.",

    required: "\u0aab\u0ab0\u0a9c\u0abf\u0aaf\u0abe\u0aa4",
    optional: "\u0ab5\u0ac8\u0a95\u0ab2\u0acd\u0aaa\u0abf\u0a95",

    submit: "\u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0aac\u0aa8\u0abe\u0ab5\u0acb",
    creating: "\u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0aac\u0aa8\u0abe\u0ab5\u0abe\u0a88 \u0ab0\u0ab9\u0ac0 \u0a9b\u0ac7...",
    cancel: "\u0ab0\u0aa6 \u0a95\u0ab0\u0acb",

    success:
      "\u0aa4\u0aae\u0abe\u0ab0\u0ac0 \u0ab5\u0abf\u0ab5\u0abe\u0ab9 \u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0a8f\u0aa1\u0aae\u0abf\u0aa8 \u0aae\u0a82\u0a9c\u0ac2\u0ab0\u0ac0 \u0aae\u0abe\u0a9f\u0ac7 \u0aae\u0acb\u0a95\u0ab2\u0ab5\u0abe\u0aae\u0abe\u0a82 \u0a86\u0ab5\u0ac0 \u0a9b\u0ac7.",
    error:
      "\u0ab5\u0abf\u0ab5\u0abe\u0ab9 \u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0aac\u0aa8\u0abe\u0ab5\u0ab5\u0abe\u0aae\u0abe\u0a82 \u0aaa\u0acd\u0ab0\u0ab6\u0acd\u0aa8 \u0aa5\u0aaf\u0acb.",
  },
} as const;

type Translation = { [K in keyof typeof translations.en]: string };

function getTranslation(locale: string): Translation {
  if (locale === "hi") return translations.hi;
  if (locale === "gu") return translations.gu;
  return translations.en;
}

const inputClass =
  "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white";

const labelClass =
  "mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200";

const sectionClass =
  "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950";

export default function MatrimonialCreateForm({
  locale,
  initialData,
}: Props) {
  const router = useRouter();
  const t = getTranslation(locale);

  const [form, setForm] = useState({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    gender: "",
    dateOfBirth: "",
    height: "",
    maritalStatus: "NEVER_MARRIED",

    education: "",
    profession: "",
    occupation: "",
    company: "",

    city: initialData?.city || "",
    state: initialData?.state || "",
    country: initialData?.country || "India",
    pincode: "",

    religion: "",
    community: "",
    subCommunity: "",
    gotra: "",

    fatherName: "",
    motherName: "",
    siblings: "",
    familyDetails: "",

    aboutMe: "",
    partnerExpectation: "",

    profileImage: initialData?.profileImage || "",

    contactPreference: "ADMIN_ONLY",
    profileVisibility: "PRIVATE",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateField(
    field: string,
    value: string
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/member/matrimonial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t.error);
      }

      alert(t.success);

      router.push(`/${locale}/dashboard/matrimonial`);
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : t.error
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 pb-12"
    >
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
          {error}
        </div>
      )}

      <section className={sectionClass}>
        <h2 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
          {t.personal}
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>
              {t.firstName} *
            </label>
            <input
              required
              value={form.firstName}
              onChange={(e) =>
                updateField("firstName", e.target.value)
              }
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              {t.lastName}
            </label>
            <input
              value={form.lastName}
              onChange={(e) =>
                updateField("lastName", e.target.value)
              }
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              {t.gender} *
            </label>
            <select
              required
              value={form.gender}
              onChange={(e) =>
                updateField("gender", e.target.value)
              }
              className={inputClass}
            >
              <option value="">--</option>
              <option value="MALE">{t.male}</option>
              <option value="FEMALE">{t.female}</option>
              <option value="OTHER">{t.other}</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>
              {t.dateOfBirth}
            </label>
            <input
              type="date"
              value={form.dateOfBirth}
              onChange={(e) =>
                updateField("dateOfBirth", e.target.value)
              }
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              {t.height}
            </label>
            <input
              placeholder="e.g. 5 ft 8 in"
              value={form.height}
              onChange={(e) =>
                updateField("height", e.target.value)
              }
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              {t.maritalStatus}
            </label>
            <select
              value={form.maritalStatus}
              onChange={(e) =>
                updateField("maritalStatus", e.target.value)
              }
              className={inputClass}
            >
              <option value="NEVER_MARRIED">
                {t.neverMarried}
              </option>
              <option value="DIVORCED">
                {t.divorced}
              </option>
              <option value="WIDOWED">
                {t.widowed}
              </option>
              <option value="SEPARATED">
                {t.separated}
              </option>
            </select>
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
          {t.professional}
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>
              {t.education}
            </label>
            <input
              value={form.education}
              onChange={(e) =>
                updateField("education", e.target.value)
              }
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              {t.profession}
            </label>
            <input
              value={form.profession}
              onChange={(e) =>
                updateField("profession", e.target.value)
              }
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              {t.occupation}
            </label>
            <input
              value={form.occupation}
              onChange={(e) =>
                updateField("occupation", e.target.value)
              }
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              {t.company}
            </label>
            <input
              value={form.company}
              onChange={(e) =>
                updateField("company", e.target.value)
              }
              className={inputClass}
            />
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
          {t.location}
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>
              {t.city}
            </label>
            <input
              value={form.city}
              onChange={(e) =>
                updateField("city", e.target.value)
              }
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              {t.state}
            </label>
            <input
              value={form.state}
              onChange={(e) =>
                updateField("state", e.target.value)
              }
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              {t.country}
            </label>
            <input
              value={form.country}
              onChange={(e) =>
                updateField("country", e.target.value)
              }
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              {t.pincode}
            </label>
            <input
              value={form.pincode}
              onChange={(e) =>
                updateField("pincode", e.target.value)
              }
              className={inputClass}
            />
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
          {t.family}
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>
              {t.fatherName}
            </label>
            <input
              value={form.fatherName}
              onChange={(e) =>
                updateField("fatherName", e.target.value)
              }
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              {t.motherName}
            </label>
            <input
              value={form.motherName}
              onChange={(e) =>
                updateField("motherName", e.target.value)
              }
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              {t.siblings}
            </label>
            <input
              value={form.siblings}
              onChange={(e) =>
                updateField("siblings", e.target.value)
              }
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              {t.gotra}
            </label>
            <input
              value={form.gotra}
              onChange={(e) =>
                updateField("gotra", e.target.value)
              }
              className={inputClass}
            />
          </div>
        </div>

        <div className="mt-5">
          <label className={labelClass}>
            {t.familyDetails}
          </label>
          <textarea
            rows={4}
            value={form.familyDetails}
            onChange={(e) =>
              updateField("familyDetails", e.target.value)
            }
            className={inputClass}
          />
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
          {t.about}
        </h2>

        <div className="mt-6">
          <label className={labelClass}>
            {t.aboutMe}
          </label>
          <textarea
            rows={5}
            value={form.aboutMe}
            onChange={(e) =>
              updateField("aboutMe", e.target.value)
            }
            className={inputClass}
          />
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
          {t.partner}
        </h2>

        <div className="mt-6">
          <label className={labelClass}>
            {t.partnerExpectation}
          </label>
          <textarea
            rows={5}
            value={form.partnerExpectation}
            onChange={(e) =>
              updateField(
                "partnerExpectation",
                e.target.value
              )
            }
            className={inputClass}
          />
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
          {t.settings}
        </h2>

        <div className="mt-6 space-y-6">
          <div className="md:col-span-2">
            <ImageInput
              locale={locale}
              value={form.profileImage}
              onChange={(value) =>
                updateField("profileImage", value)
              }
              label={t.profileImage}
              maxSizeMB={5}
            />
          </div>

          <div>
            <label className={labelClass}>
              {t.contactPreference}
            </label>

            <div className="grid gap-3 md:grid-cols-2">
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4 dark:border-gray-800">
                <input
                  type="radio"
                  name="contactPreference"
                  value="ADMIN_ONLY"
                  checked={
                    form.contactPreference === "ADMIN_ONLY"
                  }
                  onChange={(e) =>
                    updateField(
                      "contactPreference",
                      e.target.value
                    )
                  }
                />
                <span className="text-sm text-gray-700 dark:text-gray-200">
                  {t.adminOnly}
                </span>
              </label>

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4 dark:border-gray-800">
                <input
                  type="radio"
                  name="contactPreference"
                  value="MEMBERS_ONLY"
                  checked={
                    form.contactPreference === "MEMBERS_ONLY"
                  }
                  onChange={(e) =>
                    updateField(
                      "contactPreference",
                      e.target.value
                    )
                  }
                />
                <span className="text-sm text-gray-700 dark:text-gray-200">
                  {t.membersOnly}
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className={labelClass}>
              {t.profileVisibility}
            </label>

            <div className="grid gap-3 md:grid-cols-3">
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 p-4 dark:border-gray-800">
                <input
                  type="radio"
                  name="profileVisibility"
                  value="PRIVATE"
                  checked={
                    form.profileVisibility === "PRIVATE"
                  }
                  onChange={(e) =>
                    updateField(
                      "profileVisibility",
                      e.target.value
                    )
                  }
                />

                <span>
                  <span className="block text-sm font-medium text-gray-900 dark:text-white">
                    {t.private}
                  </span>
                  <span className="mt-1 block text-xs text-gray-500">
                    {t.privateHelp}
                  </span>
                </span>
              </label>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 p-4 dark:border-gray-800">
                <input
                  type="radio"
                  name="profileVisibility"
                  value="MEMBERS_ONLY"
                  checked={
                    form.profileVisibility ===
                    "MEMBERS_ONLY"
                  }
                  onChange={(e) =>
                    updateField(
                      "profileVisibility",
                      e.target.value
                    )
                  }
                />

                <span>
                  <span className="block text-sm font-medium text-gray-900 dark:text-white">
                    {t.membersVisibility}
                  </span>
                  <span className="mt-1 block text-xs text-gray-500">
                    {t.membersHelp}
                  </span>
                </span>
              </label>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 p-4 dark:border-gray-800">
                <input
                  type="radio"
                  name="profileVisibility"
                  value="PUBLIC"
                  checked={
                    form.profileVisibility === "PUBLIC"
                  }
                  onChange={(e) =>
                    updateField(
                      "profileVisibility",
                      e.target.value
                    )
                  }
                />

                <span>
                  <span className="block text-sm font-medium text-gray-900 dark:text-white">
                    {t.public}
                  </span>
                  <span className="mt-1 block text-xs text-gray-500">
                    {t.publicHelp}
                  </span>
                </span>
              </label>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() =>
            router.push(`/${locale}/dashboard/matrimonial`)
          }
          disabled={loading}
          className="rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-900"
        >
          {t.cancel}
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-red-600 px-7 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? t.creating : t.submit}
        </button>
      </div>
    </form>
  );
}