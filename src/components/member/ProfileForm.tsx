"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import ImageInput from "@/components/common/ImageInput";

type Locale = "en" | "hi" | "gu";

type Profile = {
  firstName: string;
  lastName: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  gotra: string;
  education: string;
  occupation: string;
  profession: string;
  profileImage: string;
};

const emptyProfile: Profile = {
  firstName: "",
  lastName: "",
  phone: "",
  gender: "",
  dateOfBirth: "",
  address: "",
  city: "",
  state: "",
  country: "India",
  pincode: "",
  gotra: "",
  education: "",
  occupation: "",
  profession: "",
  profileImage: "",
};

const translations = {
  en: {
    myProfile: "My Profile",
    profileDescription: "View and update your community member profile.",
    loading: "Loading your profile...",
    updated: "Profile updated successfully.",
    unableLoad: "Unable to load your profile.",
    unableSave: "Unable to save your profile. Please try again.",
    member: "Community Member",
    memberSince: "Member since",
    profileCompletion: "Profile Completion",
    personal: "Personal Information",
    personalDescription: "Enter your basic personal details.",
    firstName: "First Name",
    lastName: "Last Name",
    gender: "Gender",
    selectGender: "Select gender",
    male: "Male",
    female: "Female",
    other: "Other",
    dateOfBirth: "Date of Birth",
    contact: "Contact Information",
    contactDescription: "Your registered contact information.",
    email: "Email Address",
    phone: "Phone Number",
    addressInfo: "Address Information",
    addressDescription: "Enter your current residential address.",
    address: "Address",
    city: "City",
    state: "State",
    country: "Country",
    pincode: "Pincode",
    community: "Community Information",
    communityDescription: "Community-related information.",
    gotra: "Gotra",
    professional: "Education & Professional Information",
    professionalDescription:
      "Tell us about your education and profession.",
    education: "Education",
    occupation: "Occupation",
    profession: "Profession",
    profilePhoto: "Profile Photo",
    profilePhotoDescription:
      "Upload a profile photo or provide an image URL.",
    save: "Save Profile",
    saving: "Saving Profile...",
    enterFirstName: "Enter first name",
    enterLastName: "Enter last name",
    enterPhone: "Enter phone number",
    enterAddress: "Enter complete address",
    enterCity: "Enter city",
    enterState: "Enter state",
    enterCountry: "Enter country",
    enterPincode: "Enter pincode",
    enterGotra: "Enter gotra",
    educationPlaceholder: "e.g. B.Tech, MBA, B.Com",
    enterOccupation: "Enter occupation",
    enterProfession: "Enter profession",
  },

  hi: {
    myProfile:
      "\u092e\u0947\u0930\u0940 \u092a\u094d\u0930\u094b\u092b\u093c\u093e\u0907\u0932",
    profileDescription:
      "\u0905\u092a\u0928\u0940 \u0915\u092e\u094d\u092f\u0941\u0928\u093f\u091f\u0940 \u0938\u0926\u0938\u094d\u092f \u092a\u094d\u0930\u094b\u092b\u093c\u093e\u0907\u0932 \u0926\u0947\u0916\u0947\u0902 \u0914\u0930 \u0905\u092a\u0921\u0947\u091f \u0915\u0930\u0947\u0902\u0964",
    loading:
      "\u0906\u092a\u0915\u0940 \u092a\u094d\u0930\u094b\u092b\u093c\u093e\u0907\u0932 \u0932\u094b\u0921 \u0939\u094b \u0930\u0939\u0940 \u0939\u0948...",
    updated:
      "\u092a\u094d\u0930\u094b\u092b\u093c\u093e\u0907\u0932 \u0938\u092b\u0932\u0924\u093e\u092a\u0942\u0930\u094d\u0935\u0915 \u0905\u092a\u0921\u0947\u091f \u0939\u094b \u0917\u0908\u0964",
    unableLoad:
      "\u0906\u092a\u0915\u0940 \u092a\u094d\u0930\u094b\u092b\u093c\u093e\u0907\u0932 \u0932\u094b\u0921 \u0928\u0939\u0940\u0902 \u0939\u094b \u0938\u0915\u0940\u0964",
    unableSave:
      "\u092a\u094d\u0930\u094b\u092b\u093c\u093e\u0907\u0932 \u0938\u0947\u0935 \u0928\u0939\u0940\u0902 \u0939\u094b \u0938\u0915\u0940\u0964 \u0915\u0943\u092a\u092f\u093e \u092b\u093f\u0930 \u0938\u0947 \u092a\u094d\u0930\u092f\u093e\u0938 \u0915\u0930\u0947\u0902\u0964",
    member:
      "\u0915\u092e\u094d\u092f\u0941\u0928\u093f\u091f\u0940 \u0938\u0926\u0938\u094d\u092f",
    memberSince:
      "\u0938\u0926\u0938\u094d\u092f \u092c\u0928\u0947",
    profileCompletion:
      "\u092a\u094d\u0930\u094b\u092b\u093c\u093e\u0907\u0932 \u092a\u0942\u0930\u094d\u0923\u0924\u093e",
    personal:
      "\u0935\u094d\u092f\u0915\u094d\u0924\u093f\u0917\u0924 \u091c\u093e\u0928\u0915\u093e\u0930\u0940",
    personalDescription:
      "\u0905\u092a\u0928\u0940 \u092e\u0942\u0932 \u0935\u094d\u092f\u0915\u094d\u0924\u093f\u0917\u0924 \u091c\u093e\u0928\u0915\u093e\u0930\u0940 \u0926\u0930\u094d\u091c \u0915\u0930\u0947\u0902\u0964",
    firstName:
      "\u092a\u0939\u0932\u093e \u0928\u093e\u092e",
    lastName:
      "\u0909\u092a\u0928\u093e\u092e",
    gender:
      "\u0932\u093f\u0902\u0917",
    selectGender:
      "\u0932\u093f\u0902\u0917 \u091a\u0941\u0928\u0947\u0902",
    male:
      "\u092a\u0941\u0930\u0941\u0937",
    female:
      "\u092e\u0939\u093f\u0932\u093e",
    other:
      "\u0905\u0928\u094d\u092f",
    dateOfBirth:
      "\u091c\u0928\u094d\u092e \u0924\u093f\u0925\u093f",
    contact:
      "\u0938\u0902\u092a\u0930\u094d\u0915 \u091c\u093e\u0928\u0915\u093e\u0930\u0940",
    contactDescription:
      "\u0906\u092a\u0915\u0940 \u092a\u0902\u091c\u0940\u0915\u0943\u0924 \u0938\u0902\u092a\u0930\u094d\u0915 \u091c\u093e\u0928\u0915\u093e\u0930\u0940\u0964",
    email:
      "\u0908\u092e\u0947\u0932 \u092a\u0924\u093e",
    phone:
      "\u092b\u094b\u0928 \u0928\u0902\u092c\u0930",
    addressInfo:
      "\u092a\u0924\u093e \u091c\u093e\u0928\u0915\u093e\u0930\u0940",
    addressDescription:
      "\u0905\u092a\u0928\u093e \u0935\u0930\u094d\u0924\u092e\u093e\u0928 \u0906\u0935\u093e\u0938\u0940\u092f \u092a\u0924\u093e \u0926\u0930\u094d\u091c \u0915\u0930\u0947\u0902\u0964",
    address:
      "\u092a\u0924\u093e",
    city:
      "\u0936\u0939\u0930",
    state:
      "\u0930\u093e\u091c\u094d\u092f",
    country:
      "\u0926\u0947\u0936",
    pincode:
      "\u092a\u093f\u0928\u0915\u094b\u0921",
    community:
      "\u0915\u092e\u094d\u092f\u0941\u0928\u093f\u091f\u0940 \u091c\u093e\u0928\u0915\u093e\u0930\u0940",
    communityDescription:
      "\u0915\u092e\u094d\u092f\u0941\u0928\u093f\u091f\u0940 \u0938\u0947 \u0938\u0902\u092c\u0902\u0927\u093f\u0924 \u091c\u093e\u0928\u0915\u093e\u0930\u0940\u0964",
    gotra:
      "\u0917\u094b\u0924\u094d\u0930",
    professional:
      "\u0936\u093f\u0915\u094d\u0937\u093e \u090f\u0935\u0902 \u0935\u094d\u092f\u093e\u0935\u0938\u093e\u092f\u093f\u0915 \u091c\u093e\u0928\u0915\u093e\u0930\u0940",
    professionalDescription:
      "\u0905\u092a\u0928\u0940 \u0936\u093f\u0915\u094d\u0937\u093e \u0914\u0930 \u092a\u0947\u0936\u0947 \u0915\u0947 \u092c\u093e\u0930\u0947 \u092e\u0947\u0902 \u092c\u0924\u093e\u090f\u0902\u0964",
    education:
      "\u0936\u093f\u0915\u094d\u0937\u093e",
    occupation:
      "\u0935\u094d\u092f\u0935\u0938\u093e\u092f",
    profession:
      "\u092a\u0947\u0936\u093e",
    profilePhoto:
      "\u092a\u094d\u0930\u094b\u092b\u093c\u093e\u0907\u0932 \u092b\u094b\u091f\u094b",
    profilePhotoDescription:
      "\u092a\u094d\u0930\u094b\u092b\u093c\u093e\u0907\u0932 \u092b\u094b\u091f\u094b \u0905\u092a\u0932\u094b\u0921 \u0915\u0930\u0947\u0902 \u092f\u093e \u0907\u092e\u0947\u091c URL \u0926\u0947\u0902\u0964",
    save:
      "\u092a\u094d\u0930\u094b\u092b\u093c\u093e\u0907\u0932 \u0938\u0947\u0935 \u0915\u0930\u0947\u0902",
    saving:
      "\u092a\u094d\u0930\u094b\u092b\u093c\u093e\u0907\u0932 \u0938\u0947\u0935 \u0939\u094b \u0930\u0939\u0940 \u0939\u0948...",
    enterFirstName:
      "\u092a\u0939\u0932\u093e \u0928\u093e\u092e \u0926\u0930\u094d\u091c \u0915\u0930\u0947\u0902",
    enterLastName:
      "\u0909\u092a\u0928\u093e\u092e \u0926\u0930\u094d\u091c \u0915\u0930\u0947\u0902",
    enterPhone:
      "\u092b\u094b\u0928 \u0928\u0902\u092c\u0930 \u0926\u0930\u094d\u091c \u0915\u0930\u0947\u0902",
    enterAddress:
      "\u092a\u0942\u0930\u093e \u092a\u0924\u093e \u0926\u0930\u094d\u091c \u0915\u0930\u0947\u0902",
    enterCity:
      "\u0936\u0939\u0930 \u0926\u0930\u094d\u091c \u0915\u0930\u0947\u0902",
    enterState:
      "\u0930\u093e\u091c\u094d\u092f \u0926\u0930\u094d\u091c \u0915\u0930\u0947\u0902",
    enterCountry:
      "\u0926\u0947\u0936 \u0926\u0930\u094d\u091c \u0915\u0930\u0947\u0902",
    enterPincode:
      "\u092a\u093f\u0928\u0915\u094b\u0921 \u0926\u0930\u094d\u091c \u0915\u0930\u0947\u0902",
    enterGotra:
      "\u0917\u094b\u0924\u094d\u0930 \u0926\u0930\u094d\u091c \u0915\u0930\u0947\u0902",
    educationPlaceholder:
      "\u091c\u0948\u0938\u0947 B.Tech, MBA, B.Com",
    enterOccupation:
      "\u0935\u094d\u092f\u0935\u0938\u093e\u092f \u0926\u0930\u094d\u091c \u0915\u0930\u0947\u0902",
    enterProfession:
      "\u092a\u0947\u0936\u093e \u0926\u0930\u094d\u091c \u0915\u0930\u0947\u0902",
  },

  gu: {
    myProfile:
      "\u0aae\u0abe\u0ab0\u0ac0 \u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2",
    profileDescription:
      "\u0aa4\u0aae\u0abe\u0ab0\u0ac0 \u0a95\u0aae\u0acd\u0aaf\u0ac1\u0aa8\u0abf\u0a9f\u0ac0 \u0ab8\u0aad\u0acd\u0aaf \u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0a9c\u0ac1\u0a93 \u0a85\u0aa8\u0ac7 \u0a85\u0aaa\u0aa1\u0ac7\u0a9f \u0a95\u0ab0\u0acb.",
    loading:
      "\u0aa4\u0aae\u0abe\u0ab0\u0ac0 \u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0ab2\u0acb\u0aa1 \u0aa5\u0a88 \u0ab0\u0ab9\u0ac0 \u0a9b\u0ac7...",
    updated:
      "\u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0ab8\u0aab\u0ab3\u0aa4\u0abe\u0aaa\u0ac2\u0ab0\u0acd\u0ab5\u0a95 \u0a85\u0aaa\u0aa1\u0ac7\u0a9f \u0aa5\u0a88.",
    unableLoad:
      "\u0aa4\u0aae\u0abe\u0ab0\u0ac0 \u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0ab2\u0abe\u0ab5\u0ac0 \u0ab6\u0a95\u0abe\u0aaf\u0ac0 \u0aa8\u0aa5\u0ac0.",
    unableSave:
      "\u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0ab8\u0ac7\u0ab5 \u0aa5\u0a88 \u0ab6\u0a95\u0ac0 \u0aa8\u0ab9\u0ac0\u0a82. \u0aab\u0ab0\u0ac0 \u0aaa\u0acd\u0ab0\u0aaf\u0aa4\u0acd\u0aa8 \u0a95\u0ab0\u0acb.",
    member:
      "\u0a95\u0aae\u0acd\u0aaf\u0ac1\u0aa8\u0abf\u0a9f\u0ac0 \u0ab8\u0aad\u0acd\u0aaf",
    memberSince:
      "\u0ab8\u0aad\u0acd\u0aaf \u0aa4\u0ab0\u0ac0\u0a95\u0ac7",
    profileCompletion:
      "\u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0aaa\u0ac2\u0ab0\u0acd\u0aa3\u0aa4\u0abe",
    personal:
      "\u0ab5\u0acd\u0aaf\u0a95\u0acd\u0aa4\u0abf\u0a97\u0aa4 \u0aae\u0abe\u0ab9\u0abf\u0aa4\u0ac0",
    personalDescription:
      "\u0aa4\u0aae\u0abe\u0ab0\u0ac0 \u0aae\u0ac2\u0ab3\u0aad\u0ac2\u0aa4 \u0ab5\u0acd\u0aaf\u0a95\u0acd\u0aa4\u0abf\u0a97\u0aa4 \u0ab5\u0abf\u0a97\u0aa4\u0acb \u0aa6\u0abe\u0a96\u0ab2 \u0a95\u0ab0\u0acb.",
    firstName:
      "\u0aaa\u0acd\u0ab0\u0aa5\u0aae \u0aa8\u0abe\u0aae",
    lastName:
      "\u0a85\u0a9f\u0a95",
    gender:
      "\u0ab2\u0abf\u0a82\u0a97",
    selectGender:
      "\u0ab2\u0abf\u0a82\u0a97 \u0aaa\u0ab8\u0a82\u0aa6 \u0a95\u0ab0\u0acb",
    male:
      "\u0aaa\u0ac1\u0ab0\u0ac1\u0ab7",
    female:
      "\u0ab8\u0acd\u0aa4\u0acd\u0ab0\u0ac0",
    other:
      "\u0a85\u0aa8\u0acd\u0aaf",
    dateOfBirth:
      "\u0a9c\u0aa8\u0acd\u0aae \u0aa4\u0abe\u0ab0\u0ac0\u0a96",
    contact:
      "\u0ab8\u0a82\u0aaa\u0ab0\u0acd\u0a95 \u0aae\u0abe\u0ab9\u0abf\u0aa4\u0ac0",
    contactDescription:
      "\u0aa4\u0aae\u0abe\u0ab0\u0ac0 \u0aa8\u0acb\u0a82\u0aa7\u0abe\u0aaf\u0ac7\u0ab2\u0ac0 \u0ab8\u0a82\u0aaa\u0ab0\u0acd\u0a95 \u0aae\u0abe\u0ab9\u0abf\u0aa4\u0ac0.",
    email:
      "\u0a87\u0aae\u0ac7\u0ab2 \u0ab8\u0ab0\u0aa8\u0abe\u0aae\u0ac1\u0a82",
    phone:
      "\u0aab\u0acb\u0aa8 \u0aa8\u0a82\u0aac\u0ab0",
    addressInfo:
      "\u0ab8\u0ab0\u0aa8\u0abe\u0aae\u0ac1\u0a82",
    addressDescription:
      "\u0aa4\u0aae\u0abe\u0ab0\u0ac1\u0a82 \u0ab5\u0ab0\u0acd\u0aa4\u0aae\u0abe\u0aa8 \u0ab0\u0ab9\u0ac7\u0aa0\u0abe\u0aa3 \u0ab8\u0ab0\u0aa8\u0abe\u0aae\u0ac1\u0a82 \u0aa6\u0abe\u0a96\u0ab2 \u0a95\u0ab0\u0acb.",
    address:
      "\u0ab8\u0ab0\u0aa8\u0abe\u0aae\u0ac1\u0a82",
    city:
      "\u0ab6\u0ab9\u0ac7\u0ab0",
    state:
      "\u0ab0\u0abe\u0a9c\u0acd\u0aaf",
    country:
      "\u0aa6\u0ac7\u0ab6",
    pincode:
      "\u0aaa\u0abf\u0aa8\u0a95\u0acb\u0aa1",
    community:
      "\u0a95\u0aae\u0acd\u0aaf\u0ac1\u0aa8\u0abf\u0a9f\u0ac0 \u0aae\u0abe\u0ab9\u0abf\u0aa4\u0ac0",
    communityDescription:
      "\u0a95\u0aae\u0acd\u0aaf\u0ac1\u0aa8\u0abf\u0a9f\u0ac0 \u0ab8\u0a82\u0aac\u0a82\u0aa7\u0abf\u0aa4 \u0aae\u0abe\u0ab9\u0abf\u0aa4\u0ac0.",
    gotra:
      "\u0a97\u0acb\u0aa4\u0acd\u0ab0",
    professional:
      "\u0ab6\u0abf\u0a95\u0acd\u0ab7\u0aa3 \u0a85\u0aa8\u0ac7 \u0ab5\u0acd\u0aaf\u0ab5\u0ab8\u0abe\u0aaf\u0abf\u0a95 \u0aae\u0abe\u0ab9\u0abf\u0aa4\u0ac0",
    professionalDescription:
      "\u0aa4\u0aae\u0abe\u0ab0\u0abe \u0ab6\u0abf\u0a95\u0acd\u0ab7\u0aa3 \u0a85\u0aa8\u0ac7 \u0ab5\u0acd\u0aaf\u0ab5\u0ab8\u0abe\u0aaf \u0ab5\u0abf\u0ab6\u0ac7 \u0aae\u0abe\u0ab9\u0abf\u0aa4\u0ac0 \u0a86\u0aaa\u0acb.",
    education:
      "\u0ab6\u0abf\u0a95\u0acd\u0ab7\u0aa3",
    occupation:
      "\u0ab5\u0acd\u0aaf\u0ab5\u0ab8\u0abe\u0aaf",
    profession:
      "\u0aaa\u0ac7\u0ab6\u0acb",
    profilePhoto:
      "\u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0aab\u0acb\u0a9f\u0acb",
    profilePhotoDescription:
      "\u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0aab\u0acb\u0a9f\u0acb \u0a85\u0aaa\u0ab2\u0acb\u0aa1 \u0a95\u0ab0\u0acb \u0a85\u0aa5\u0ab5\u0abe \u0a87\u0aae\u0ac7\u0a9c URL \u0a86\u0aaa\u0acb.",
    save:
      "\u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0ab8\u0ac7\u0ab5 \u0a95\u0ab0\u0acb",
    saving:
      "\u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0ab8\u0ac7\u0ab5 \u0aa5\u0a88 \u0ab0\u0ab9\u0ac0 \u0a9b\u0ac7...",
    enterFirstName:
      "\u0aaa\u0acd\u0ab0\u0aa5\u0aae \u0aa8\u0abe\u0aae \u0aa6\u0abe\u0a96\u0ab2 \u0a95\u0ab0\u0acb",
    enterLastName:
      "\u0a85\u0a9f\u0a95 \u0aa6\u0abe\u0a96\u0ab2 \u0a95\u0ab0\u0acb",
    enterPhone:
      "\u0aab\u0acb\u0aa8 \u0aa8\u0a82\u0aac\u0ab0 \u0aa6\u0abe\u0a96\u0ab2 \u0a95\u0ab0\u0acb",
    enterAddress:
      "\u0a86\u0a96\u0ac1\u0a82 \u0ab8\u0ab0\u0aa8\u0abe\u0aae\u0ac1\u0a82 \u0aa6\u0abe\u0a96\u0ab2 \u0a95\u0ab0\u0acb",
    enterCity:
      "\u0ab6\u0ab9\u0ac7\u0ab0 \u0aa6\u0abe\u0a96\u0ab2 \u0a95\u0ab0\u0acb",
    enterState:
      "\u0ab0\u0abe\u0a9c\u0acd\u0aaf \u0aa6\u0abe\u0a96\u0ab2 \u0a95\u0ab0\u0acb",
    enterCountry:
      "\u0aa6\u0ac7\u0ab6 \u0aa6\u0abe\u0a96\u0ab2 \u0a95\u0ab0\u0acb",
    enterPincode:
      "\u0aaa\u0abf\u0aa8\u0a95\u0acb\u0aa1 \u0aa6\u0abe\u0a96\u0ab2 \u0a95\u0ab0\u0acb",
    enterGotra:
      "\u0a97\u0acb\u0aa4\u0acd\u0ab0 \u0aa6\u0abe\u0a96\u0ab2 \u0a95\u0ab0\u0acb",
    educationPlaceholder:
      "\u0a89\u0aa6\u0abe. B.Tech, MBA, B.Com",
    enterOccupation:
      "\u0ab5\u0acd\u0aaf\u0ab5\u0ab8\u0abe\u0aaf \u0aa6\u0abe\u0a96\u0ab2 \u0a95\u0ab0\u0acb",
    enterProfession:
      "\u0aaa\u0ac7\u0ab6\u0acb \u0aa6\u0abe\u0a96\u0ab2 \u0a95\u0ab0\u0acb",
  },
};

type Translation = {
  [K in keyof typeof translations.en]: string;
};

function getLocale(): Locale {
  if (typeof window === "undefined") {
    return "en";
  }

  const segment = window.location.pathname.split("/")[1];

  if (segment === "hi" || segment === "gu") {
    return segment;
  }

  return "en";
}

export default function ProfileForm() {
  const [locale, setLocale] = useState<Locale>("en");
  const [profile, setProfile] = useState<Profile>(emptyProfile);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const currentLocale = getLocale();
    setLocale(currentLocale);

    async function loadProfile() {
      try {
        setLoading(true);

        const response = await fetch("/api/member/profile", {
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Failed to load profile"
          );
        }

        setEmail(data.user?.email || "");
        setStatus(data.user?.status || "");

        if (data.user?.createdAt) {
          setCreatedAt(
            new Date(data.user.createdAt).toLocaleDateString(
              currentLocale === "hi"
                ? "hi-IN"
                : currentLocale === "gu"
                  ? "gu-IN"
                  : "en-IN",
              {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }
            )
          );
        }

        if (data.profile) {
          setProfile({
            firstName: data.profile.firstName || "",
            lastName: data.profile.lastName || "",
            phone: data.profile.phone || "",
            gender: data.profile.gender || "",
            dateOfBirth: data.profile.dateOfBirth
              ? new Date(data.profile.dateOfBirth)
                  .toISOString()
                  .split("T")[0]
              : "",
            address: data.profile.address || "",
            city: data.profile.city || "",
            state: data.profile.state || "",
            country: data.profile.country || "India",
            pincode: data.profile.pincode || "",
            gotra: data.profile.gotra || "",
            education: data.profile.education || "",
            occupation: data.profile.occupation || "",
            profession: data.profile.profession || "",
            profileImage: data.profile.profileImage || "",
          });
        }
      } catch (err) {
        console.error(err);
        setError(
          translations[currentLocale].unableLoad
        );
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  const t: Translation =
    translations[locale] || translations.en;

  function updateField(
    field: keyof Profile,
    value: string
  ) {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));

    setSaved(false);
  }

  const completion = useMemo(() => {
    const fields = [
      profile.firstName,
      profile.lastName,
      profile.phone,
      profile.gender,
      profile.dateOfBirth,
      profile.address,
      profile.city,
      profile.state,
      profile.country,
      profile.pincode,
      profile.gotra,
      profile.education,
      profile.occupation,
      profile.profession,
    ];

    const completed = fields.filter(
      (field) => field.trim() !== ""
    ).length;

    return Math.round(
      (completed / fields.length) * 100
    );
  }, [profile]);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      setSaving(true);
      setSaved(false);
      setError("");

      const response = await fetch(
        "/api/member/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profile),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to update profile"
        );
      }

      setSaved(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (err) {
      console.error(err);
      setError(t.unableSave);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl">
        <div
          className="
            rounded-2xl border border-red-300/80
            bg-gradient-to-br from-[#ffdfe5] via-[#ffd2da] to-[#ffc4ce]
            p-8 text-center shadow-sm
            dark:border-red-400/40
            dark:from-[#68131f] dark:via-[#570e18] dark:to-[#410810]
          "
        >
          <p className="font-medium text-red-900/70 dark:text-red-100/70">
            {t.loading}
          </p>
        </div>
      </div>
    );
  }

  const initials =
    `${profile.firstName?.charAt(0) || ""}${profile.lastName?.charAt(0) || ""}`
      .toUpperCase() || "M";

  return (
    <div className="mx-auto max-w-7xl">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t.myProfile}
        </h1>

        <p className="mt-1 text-red-900/75 dark:text-red-100/70">
          {t.profileDescription}
        </p>
      </div>

      {/* SUCCESS */}
      {saved && (
        <div
          className="
            mb-5 rounded-2xl border border-green-300
            bg-green-50 px-5 py-4 text-green-700
            dark:border-green-500/30 dark:bg-green-500/10
            dark:text-green-300
          "
        >
          <p className="font-semibold">{t.updated}</p>
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div
          className="
            mb-5 rounded-2xl border border-red-300
            bg-red-50 px-5 py-4 text-red-700
            dark:border-red-400/30 dark:bg-red-500/10
            dark:text-red-300
          "
        >
          {error}
        </div>
      )}

      {/* PROFILE SUMMARY */}
      <div
        className="
          mb-6 rounded-2xl border border-red-300/80
          bg-gradient-to-br from-[#ffdfe5] via-[#ffd2da] to-[#ffc4ce]
          p-6 shadow-sm transition-all duration-300
          hover:border-red-400
          hover:shadow-[0_18px_40px_rgba(190,24,93,0.14)]
          dark:border-red-400/40
          dark:from-[#68131f] dark:via-[#570e18] dark:to-[#410810]
          dark:hover:border-red-300/60
        "
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-center">

          <div className="shrink-0">
            {profile.profileImage ? (
              <img
                src={profile.profileImage}
                alt={t.profilePhoto}
                className="
                  h-24 w-24 rounded-full border-4
                  border-red-200 object-cover shadow-md
                  dark:border-red-300/40
                "
              />
            ) : (
              <div
                className="
                  flex h-24 w-24 items-center justify-center
                  rounded-full bg-gradient-to-br from-red-800 to-red-600
                  text-3xl font-bold text-white shadow-md
                "
              >
                {initials}
              </div>
            )}
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {profile.firstName || profile.lastName
                ? `${profile.firstName} ${profile.lastName}`.trim()
                : t.member}
            </h2>

            <p className="mt-1 text-red-900/60 dark:text-red-100/60">
              {email}
            </p>

            <div className="mt-3 flex flex-wrap gap-3">

              <span
                className={`
                  rounded-full px-3 py-1 text-sm font-semibold
                  ${
                    status === "APPROVED"
                      ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
                      : status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300"
                        : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300"
                  }
                `}
              >
                {status || "MEMBER"}
              </span>

              {createdAt && (
                <span
                  className="
                    rounded-full border border-red-300/60
                    bg-[#fff0f2] px-3 py-1 text-sm
                    text-red-900/70
                    dark:border-red-300/20 dark:bg-[#5c111b]
                    dark:text-red-100/70
                  "
                >
                  {t.memberSince} {createdAt}
                </span>
              )}

            </div>
          </div>

          <div className="w-full md:w-48">
            <div className="mb-2 flex justify-between">
              <span className="text-sm font-semibold text-red-900/75 dark:text-red-100/75">
                {t.profileCompletion}
              </span>

              <span className="text-sm font-bold text-red-800 dark:text-red-200">
                {completion}%
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-red-200/70 dark:bg-red-950/60">
              <div
                className="
                  h-full rounded-full
                  bg-gradient-to-r from-red-800 to-red-500
                  transition-all duration-500
                "
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>

        </div>
      </div>

      <form onSubmit={handleSubmit}>

        {/* PERSONAL */}
        <Section
          title={t.personal}
          description={t.personalDescription}
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            <Field
              label={t.firstName}
              value={profile.firstName}
              onChange={(value) =>
                updateField("firstName", value)
              }
              placeholder={t.enterFirstName}
            />

            <Field
              label={t.lastName}
              value={profile.lastName}
              onChange={(value) =>
                updateField("lastName", value)
              }
              placeholder={t.enterLastName}
            />

            <div>
              <label className="mb-2 block text-sm font-semibold text-red-900/80 dark:text-red-100/80">
                {t.gender}
              </label>

              <select
                value={profile.gender}
                onChange={(e) =>
                  updateField(
                    "gender",
                    e.target.value
                  )
                }
                className="
                  w-full rounded-xl border border-red-300/80
                  bg-[#fff0f2] px-4 py-3 text-gray-900
                  outline-none transition-all
                  focus:border-red-600 focus:ring-2 focus:ring-red-200
                  dark:border-red-300/30 dark:bg-[#4f0d16]
                  dark:text-white dark:focus:border-red-300
                  dark:focus:ring-red-400/20
                "
              >
                <option value="">
                  {t.selectGender}
                </option>
                <option value="MALE">{t.male}</option>
                <option value="FEMALE">{t.female}</option>
                <option value="OTHER">{t.other}</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-red-900/80 dark:text-red-100/80">
                {t.dateOfBirth}
              </label>

              <input
                type="date"
                value={profile.dateOfBirth}
                onChange={(e) =>
                  updateField(
                    "dateOfBirth",
                    e.target.value
                  )
                }
                className="
                  w-full rounded-xl border border-red-300/80
                  bg-[#fff0f2] px-4 py-3 text-gray-900
                  outline-none transition-all
                  focus:border-red-600 focus:ring-2 focus:ring-red-200
                  dark:border-red-300/30 dark:bg-[#4f0d16]
                  dark:text-white dark:focus:border-red-300
                  dark:focus:ring-red-400/20
                "
              />
            </div>

          </div>
        </Section>

        {/* CONTACT */}
        <Section
          title={t.contact}
          description={t.contactDescription}
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            <Field
              label={t.email}
              value={email}
              onChange={() => {}}
              disabled
            />

            <Field
              label={t.phone}
              value={profile.phone}
              onChange={(value) =>
                updateField("phone", value)
              }
              placeholder={t.enterPhone}
            />

          </div>
        </Section>

        {/* ADDRESS */}
        <Section
          title={t.addressInfo}
          description={t.addressDescription}
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-red-900/80 dark:text-red-100/80">
                {t.address}
              </label>

              <textarea
                value={profile.address}
                onChange={(e) =>
                  updateField(
                    "address",
                    e.target.value
                  )
                }
                placeholder={t.enterAddress}
                rows={3}
                className="
                  w-full resize-none rounded-xl
                  border border-red-300/80
                  bg-[#fff0f2] px-4 py-3 text-gray-900
                  outline-none transition-all
                  focus:border-red-600 focus:ring-2 focus:ring-red-200
                  dark:border-red-300/30 dark:bg-[#4f0d16]
                  dark:text-white dark:placeholder:text-red-100/40
                  dark:focus:border-red-300
                  dark:focus:ring-red-400/20
                "
              />
            </div>

            <Field
              label={t.city}
              value={profile.city}
              onChange={(value) =>
                updateField("city", value)
              }
              placeholder={t.enterCity}
            />

            <Field
              label={t.state}
              value={profile.state}
              onChange={(value) =>
                updateField("state", value)
              }
              placeholder={t.enterState}
            />

            <Field
              label={t.country}
              value={profile.country}
              onChange={(value) =>
                updateField("country", value)
              }
              placeholder={t.enterCountry}
            />

            <Field
              label={t.pincode}
              value={profile.pincode}
              onChange={(value) =>
                updateField("pincode", value)
              }
              placeholder={t.enterPincode}
            />

          </div>
        </Section>

        {/* COMMUNITY */}
        <Section
          title={t.community}
          description={t.communityDescription}
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            <Field
              label={t.gotra}
              value={profile.gotra}
              onChange={(value) =>
                updateField("gotra", value)
              }
              placeholder={t.enterGotra}
            />

          </div>
        </Section>

        {/* PROFESSIONAL */}
        <Section
          title={t.professional}
          description={t.professionalDescription}
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            <Field
              label={t.education}
              value={profile.education}
              onChange={(value) =>
                updateField("education", value)
              }
              placeholder={t.educationPlaceholder}
            />

            <Field
              label={t.occupation}
              value={profile.occupation}
              onChange={(value) =>
                updateField("occupation", value)
              }
              placeholder={t.enterOccupation}
            />

            <Field
              label={t.profession}
              value={profile.profession}
              onChange={(value) =>
                updateField("profession", value)
              }
              placeholder={t.enterProfession}
            />

          </div>
        </Section>

        {/* PROFILE PHOTO */}
        <div
          className="
            mb-6 rounded-2xl border border-red-300/80
            bg-gradient-to-br from-[#ffdfe5] via-[#ffd2da] to-[#ffc4ce]
            p-6 shadow-sm transition-all duration-300
            hover:border-red-400
            hover:shadow-[0_18px_40px_rgba(190,24,93,0.14)]
            dark:border-red-400/40
            dark:from-[#68131f] dark:via-[#570e18] dark:to-[#410810]
            dark:hover:border-red-300/60
          "
        >
          <div className="mb-6 border-b border-red-300/60 pb-4 dark:border-red-300/20">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t.profilePhoto}
            </h2>

            <p className="mt-1 text-sm text-red-900/65 dark:text-red-100/60">
              {t.profilePhotoDescription}
            </p>
          </div>

          <ImageInput
            locale={locale}
            value={profile.profileImage}
            onChange={(value) =>
              updateField("profileImage", value)
            }
            label={t.profilePhoto}
            maxSizeMB={5}
          />
        </div>

        {/* SAVE */}
        <div className="flex justify-end pb-8">
          <button
            type="submit"
            disabled={saving}
            className="
              rounded-xl bg-gradient-to-r from-red-800 to-red-700
              px-8 py-3 font-semibold text-white shadow-sm
              transition-all duration-300
              hover:-translate-y-0.5
              hover:from-red-700 hover:to-red-600
              hover:shadow-lg
              dark:from-red-700 dark:to-red-600
              dark:hover:from-red-600 dark:hover:to-red-500
              disabled:cursor-not-allowed disabled:opacity-60
            "
          >
            {saving ? t.saving : t.save}
          </button>
        </div>

      </form>
    </div>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        mb-6 rounded-2xl border border-red-300/80
        bg-gradient-to-br from-[#ffdfe5] via-[#ffd2da] to-[#ffc4ce]
        p-6 shadow-sm transition-all duration-300
        hover:border-red-400
        hover:shadow-[0_18px_40px_rgba(190,24,93,0.12)]
        dark:border-red-400/40
        dark:from-[#68131f] dark:via-[#570e18] dark:to-[#410810]
        dark:hover:border-red-300/60
      "
    >
      <div className="mb-6 border-b border-red-300/60 pb-4 dark:border-red-300/20">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>

        <p className="mt-1 text-sm text-red-900/65 dark:text-red-100/60">
          {description}
        </p>
      </div>

      {children}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-red-900/80 dark:text-red-100/80">
        {label}
      </label>

      <input
        type="text"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full rounded-xl border border-red-300/80
          px-4 py-3 outline-none transition-all
          focus:border-red-600 focus:ring-2 focus:ring-red-200
          dark:border-red-300/30
          dark:text-white
          dark:focus:border-red-300
          dark:focus:ring-red-400/20
          ${
            disabled
              ? "cursor-not-allowed bg-red-100/60 text-red-900/50 dark:bg-[#431019] dark:text-red-100/40"
              : "bg-[#fff0f2] text-gray-900 placeholder:text-red-900/40 dark:bg-[#4f0d16] dark:placeholder:text-red-100/40"
          }
        `}
      />
    </div>
  );
}