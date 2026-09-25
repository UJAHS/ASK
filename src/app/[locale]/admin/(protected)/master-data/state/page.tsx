"use client";

import {
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useParams } from "next/navigation";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  RefreshCw,
  CheckCircle2,
  XCircle,
  MapPin,
  Globe2,
} from "lucide-react";

type Locale = "en" | "hi" | "gu";

type Translation = {
  id?: string;
  locale: Locale;
  name: string;
};

type Country = {
  id: string;
  name: string;
  isActive: boolean;
  translations?: Translation[];
};

type StateRecord = {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  translations?: Translation[];
  StateTranslation?: Translation[];
  country?: {
    id: string;
    name: string;
    translations?: Translation[];
  } | null;
};

type FormState = {
  en: string;
  hi: string;
  gu: string;
  countryId: string;
  isActive: boolean;
};

const LOCALES: Locale[] = ["en", "hi", "gu"];

const ui = {
  en: {
    title: "State Master",
    description:
      "Manage states and regions with English, Hindi, and Gujarati names.",
    addState: "Add State",
    search: "Search",
    searchPlaceholder: "Search states...",
    allCountries: "All Countries",
    all: "All",
    active: "Active",
    inactive: "Inactive",
    english: "English",
    hindi: "Hindi",
    gujarati: "Gujarati",
    country: "Country",
    status: "Status",
    actions: "Actions",
    activeStatus: "Active",
    inactiveStatus: "Inactive",
    activate: "Activate",
    deactivate: "Deactivate",
    edit: "Edit",
    delete: "Delete",
    loading: "Loading...",
    noRecords: "No states found.",
    addTitle: "Add New State",
    editTitle: "Edit State",
    englishName: "State Name (English)",
    hindiName: "State Name (Hindi)",
    gujaratiName: "State Name (Gujarati)",
    selectCountry: "Select country",
    activeState: "State is active",
    inactiveState: "State is inactive",
    save: "Save State",
    update: "Update State",
    saving: "Saving...",
    cancel: "Cancel",
    close: "Close",
    requiredEnglish: "English state name is required.",
    duplicate: "State already exists.",
    loadError: "Unable to load states.",
    countryLoadError: "Unable to load countries.",
    saveSuccess: "State saved successfully.",
    updateSuccess: "State updated successfully.",
    deleteSuccess: "State deleted successfully.",
    statusSuccess: "State status updated successfully.",
    genericError: "Something went wrong. Please try again.",
    deleteTitle: "Delete State",
    deleteMessage:
      "Are you sure you want to delete this state?",
    linkedCities:
      "This state has linked cities and cannot be deleted. Deactivate it instead.",
    yesDelete: "Yes, Delete",
    refresh: "Refresh",
    records: "states",
  },

  hi: {
    title: "\u0930\u093e\u091c\u094d\u092f \u092e\u093e\u0938\u094d\u091f\u0930",
    description:
      "\u0905\u0902\u0917\u094d\u0930\u0947\u091c\u093c\u0940, \u0939\u093f\u0902\u0926\u0940 \u0914\u0930 \u0917\u0941\u091c\u0930\u093e\u0924\u0940 \u0928\u093e\u092e\u094b\u0902 \u0915\u0947 \u0938\u093e\u0925 \u0930\u093e\u091c\u094d\u092f\u094b\u0902 \u0915\u093e \u092a\u094d\u0930\u092c\u0902\u0927\u0928 \u0915\u0930\u0947\u0902\u0964",
    addState: "\u0928\u092f\u093e \u0930\u093e\u091c\u094d\u092f",
    search: "\u0916\u094b\u091c",
    searchPlaceholder: "\u0930\u093e\u091c\u094d\u092f \u0916\u094b\u091c\u0947\u0902...",
    allCountries: "\u0938\u092d\u0940 \u0926\u0947\u0936",
    all: "\u0938\u092d\u0940",
    active: "\u0938\u0915\u094d\u0930\u093f\u092f",
    inactive: "\u0928\u093f\u0937\u094d\u0915\u094d\u0930\u093f\u092f",
    english: "\u0905\u0902\u0917\u094d\u0930\u0947\u091c\u093c\u0940",
    hindi: "\u0939\u093f\u0902\u0926\u0940",
    gujarati: "\u0917\u0941\u091c\u0930\u093e\u0924\u0940",
    country: "\u0926\u0947\u0936",
    status: "\u0938\u094d\u0925\u093f\u0924\u093f",
    actions: "\u0915\u093e\u0930\u094d\u0930\u0935\u093e\u0908",
    activeStatus: "\u0938\u0915\u094d\u0930\u093f\u092f",
    inactiveStatus: "\u0928\u093f\u0937\u094d\u0915\u094d\u0930\u093f\u092f",
    activate: "\u0938\u0915\u094d\u0930\u093f\u092f \u0915\u0930\u0947\u0902",
    deactivate: "\u0928\u093f\u0937\u094d\u0915\u094d\u0930\u093f\u092f \u0915\u0930\u0947\u0902",
    edit: "\u0938\u0902\u092a\u093e\u0926\u093f\u0924 \u0915\u0930\u0947\u0902",
    delete: "\u0939\u091f\u093e\u090f\u0902",
    loading: "\u0932\u094b\u0921 \u0939\u094b \u0930\u0939\u093e \u0939\u0948...",
    noRecords:
      "\u0915\u094b\u0908 \u0930\u093e\u091c\u094d\u092f \u0928\u0939\u0940\u0902 \u092e\u093f\u0932\u093e\u0964",
    addTitle: "\u0928\u092f\u093e \u0930\u093e\u091c\u094d\u092f \u091c\u094b\u0921\u093c\u0947\u0902",
    editTitle: "\u0930\u093e\u091c\u094d\u092f \u0938\u0902\u092a\u093e\u0926\u093f\u0924 \u0915\u0930\u0947\u0902",
    englishName: "\u0930\u093e\u091c\u094d\u092f \u0928\u093e\u092e (\u0905\u0902\u0917\u094d\u0930\u0947\u091c\u093c\u0940)",
    hindiName: "\u0930\u093e\u091c\u094d\u092f \u0928\u093e\u092e (\u0939\u093f\u0902\u0926\u0940)",
    gujaratiName: "\u0930\u093e\u091c\u094d\u092f \u0928\u093e\u092e (\u0917\u0941\u091c\u0930\u093e\u0924\u0940)",
    selectCountry: "\u0926\u0947\u0936 \u091a\u0941\u0928\u0947\u0902",
    activeState: "\u0930\u093e\u091c\u094d\u092f \u0938\u0915\u094d\u0930\u093f\u092f \u0939\u0948",
    inactiveState: "\u0930\u093e\u091c\u094d\u092f \u0928\u093f\u0937\u094d\u0915\u094d\u0930\u093f\u092f \u0939\u0948",
    save: "\u0930\u093e\u091c\u094d\u092f \u0938\u0947\u0935 \u0915\u0930\u0947\u0902",
    update: "\u0930\u093e\u091c\u094d\u092f \u0905\u092a\u0921\u0947\u091f \u0915\u0930\u0947\u0902",
    saving: "\u0938\u0947\u0935 \u0939\u094b \u0930\u0939\u093e \u0939\u0948...",
    cancel: "\u0930\u0926\u094d\u0926 \u0915\u0930\u0947\u0902",
    close: "\u092c\u0902\u0926 \u0915\u0930\u0947\u0902",
    requiredEnglish:
      "\u0905\u0902\u0917\u094d\u0930\u0947\u091c\u093c\u0940 \u0930\u093e\u091c\u094d\u092f \u0928\u093e\u092e \u0906\u0935\u0936\u094d\u092f\u0915 \u0939\u0948\u0964",
    duplicate: "\u0930\u093e\u091c\u094d\u092f \u092a\u0939\u0932\u0947 \u0938\u0947 \u092e\u094c\u091c\u0942\u0926 \u0939\u0948\u0964",
    loadError:
      "\u0930\u093e\u091c\u094d\u092f \u0932\u094b\u0921 \u0928\u0939\u0940\u0902 \u0939\u094b \u0938\u0915\u0947\u0964",
    countryLoadError:
      "\u0926\u0947\u0936 \u0932\u094b\u0921 \u0928\u0939\u0940\u0902 \u0939\u094b \u0938\u0915\u0947\u0964",
    saveSuccess:
      "\u0930\u093e\u091c\u094d\u092f \u0938\u092b\u0932\u0924\u093e\u092a\u0942\u0930\u094d\u0935\u0915 \u0938\u0947\u0935 \u0915\u093f\u092f\u093e \u0917\u092f\u093e\u0964",
    updateSuccess:
      "\u0930\u093e\u091c\u094d\u092f \u0938\u092b\u0932\u0924\u093e\u092a\u0942\u0930\u094d\u0935\u0915 \u0905\u092a\u0921\u0947\u091f \u0939\u0941\u0906\u0964",
    deleteSuccess:
      "\u0930\u093e\u091c\u094d\u092f \u0938\u092b\u0932\u0924\u093e\u092a\u0942\u0930\u094d\u0935\u0915 \u0939\u091f\u093e\u092f\u093e \u0917\u092f\u093e\u0964",
    statusSuccess:
      "\u0930\u093e\u091c\u094d\u092f \u0915\u0940 \u0938\u094d\u0925\u093f\u0924\u093f \u0905\u092a\u0921\u0947\u091f \u0939\u0941\u0908\u0964",
    genericError:
      "\u0915\u0941\u091b \u0917\u0932\u0924 \u0939\u0941\u0906\u0964 \u092a\u0941\u0928\u0903 \u092a\u094d\u0930\u092f\u093e\u0938 \u0915\u0930\u0947\u0902\u0964",
    deleteTitle: "\u0930\u093e\u091c\u094d\u092f \u0939\u091f\u093e\u090f\u0902",
    deleteMessage:
      "\u0915\u094d\u092f\u093e \u0906\u092a \u0935\u093e\u0915\u0908 \u0907\u0938 \u0930\u093e\u091c\u094d\u092f \u0915\u094b \u0939\u091f\u093e\u0928\u093e \u091a\u093e\u0939\u0924\u0947 \u0939\u0948\u0902?",
    linkedCities:
      "\u0907\u0938 \u0930\u093e\u091c\u094d\u092f \u0938\u0947 \u0936\u0939\u0930 \u091c\u0941\u0921\u093c\u0947 \u0939\u0948\u0902\u0964 \u0907\u0938\u0947 \u0939\u091f\u093e\u092f\u093e \u0928\u0939\u0940\u0902 \u091c\u093e \u0938\u0915\u0924\u093e\u0964 \u0907\u0938\u0947 \u0928\u093f\u0937\u094d\u0915\u094d\u0930\u093f\u092f \u0915\u0930\u0947\u0902\u0964",
    yesDelete: "\u0939\u093e\u0901, \u0939\u091f\u093e\u090f\u0902",
    refresh: "\u0924\u093e\u091c\u093c\u093e \u0915\u0930\u0947\u0902",
    records: "\u0930\u093e\u091c\u094d\u092f",
  },

  gu: {
    title: "\u0930\u093e\u091c\u094d\u092f \u092e\u093e\u0938\u094d\u091f\u0930",
    description:
      "\u0a85\u0a82\u0a97\u0acd\u0ab0\u0ac7\u0a9c\u0ac0, \u0ab9\u0abf\u0aa8\u0acd\u0aa6\u0ac0 \u0a85\u0aa8\u0ac7 \u0a97\u0ac1\u0a9c\u0ab0\u0abe\u0aa4\u0ac0 \u0aa8\u0abe\u0aae \u0ab8\u0abe\u0aa5\u0ac7 \u0ab0\u0abe\u0a9c\u0acd\u0aaf\u0acb\u0aa8\u0ac1\u0a82 \u0ab5\u0acd\u0aaf\u0ab5\u0ab8\u0acd\u0aa5\u0abe\u0aaa\u0aa8 \u0a95\u0ab0\u0acb.",
    addState: "\u0aa8\u0ab5\u0ac1\u0a82 \u0ab0\u0abe\u0a9c\u0acd\u0aaf",
    search: "\u0ab6\u0acb\u0aa7",
    searchPlaceholder: "\u0ab0\u0abe\u0a9c\u0acd\u0aaf \u0ab6\u0acb\u0aa7\u0acb...",
    allCountries: "\u0aa4\u0aae\u0abe\u0aae \u0aa6\u0ac7\u0ab6\u0acb",
    all: "\u0aa4\u0aae\u0abe\u0aae",
    active: "\u0ab8\u0a95\u0acd\u0ab0\u0abf\u0aaf",
    inactive: "\u0aa8\u0abf\u0ab7\u0acd\u0a95\u0acd\u0ab0\u0abf\u0aaf",
    english: "\u0a85\u0a82\u0a97\u0acd\u0ab0\u0ac7\u0a9c\u0ac0",
    hindi: "\u0ab9\u0abf\u0aa8\u0acd\u0aa6\u0ac0",
    gujarati: "\u0a97\u0ac1\u0a9c\u0ab0\u0abe\u0aa4\u0ac0",
    country: "\u0aa6\u0ac7\u0ab6",
    status: "\u0ab8\u0acd\u0aa5\u0abf\u0aa4\u0abf",
    actions: "\u0a95\u0abe\u0ab0\u0acd\u0aaf\u0ab5\u0abe\u0ab9\u0ac0",
    activeStatus: "\u0ab8\u0a95\u0acd\u0ab0\u0abf\u0aaf",
    inactiveStatus: "\u0aa8\u0abf\u0ab7\u0acd\u0a95\u0acd\u0ab0\u0abf\u0aaf",
    activate: "\u0ab8\u0a95\u0acd\u0ab0\u0abf\u0aaf \u0a95\u0ab0\u0acb",
    deactivate: "\u0aa8\u0abf\u0ab7\u0acd\u0a95\u0acd\u0ab0\u0abf\u0aaf \u0a95\u0ab0\u0acb",
    edit: "\u0ab8\u0a82\u0aaa\u0abe\u0aa6\u0aa8",
    delete: "\u0aa6\u0ac2\u0ab0 \u0a95\u0ab0\u0acb",
    loading: "\u0ab2\u0acb\u0aa1 \u0aa5\u0a88 \u0ab0\u0ab9\u0acd\u0aaf\u0ac1\u0a82 \u0a9b\u0ac7...",
    noRecords: "\u0a95\u0acb\u0a87 \u0ab0\u0abe\u0a9c\u0acd\u0aaf \u0aae\u0ab3\u0acd\u0aaf\u0ac1\u0a82 \u0aa8\u0aa5\u0ac0.",
    addTitle: "\u0aa8\u0ab5\u0ac1\u0a82 \u0ab0\u0abe\u0a9c\u0acd\u0aaf \u0a89\u0aae\u0ac7\u0ab0\u0acb",
    editTitle: "\u0ab0\u0abe\u0a9c\u0acd\u0aaf \u0ab8\u0a82\u0aaa\u0abe\u0aa6\u0abf\u0aa4 \u0a95\u0ab0\u0acb",
    englishName: "\u0ab0\u0abe\u0a9c\u0acd\u0aaf \u0aa8\u0abe\u0aae (\u0a85\u0a82\u0a97\u0acd\u0ab0\u0ac7\u0a9c\u0ac0)",
    hindiName: "\u0ab0\u0abe\u0a9c\u0acd\u0aaf \u0aa8\u0abe\u0aae (\u0ab9\u0abf\u0aa8\u0acd\u0aa6\u0ac0)",
    gujaratiName: "\u0ab0\u0abe\u0a9c\u0acd\u0aaf \u0aa8\u0abe\u0aae (\u0a97\u0ac1\u0a9c\u0ab0\u0abe\u0aa4\u0ac0)",
    selectCountry: "\u0aa6\u0ac7\u0ab6 \u0aaa\u0ab8\u0a82\u0aa6 \u0a95\u0ab0\u0acb",
    activeState: "\u0ab0\u0abe\u0a9c\u0acd\u0aaf \u0ab8\u0a95\u0acd\u0ab0\u0abf\u0aaf \u0a9b\u0ac7",
    inactiveState: "\u0ab0\u0abe\u0a9c\u0acd\u0aaf \u0aa8\u0abf\u0ab7\u0acd\u0a95\u0acd\u0ab0\u0abf\u0aaf \u0a9b\u0ac7",
    save: "\u0ab0\u0abe\u0a9c\u0acd\u0aaf \u0ab8\u0ac7\u0ab5 \u0a95\u0ab0\u0acb",
    update: "\u0ab0\u0abe\u0a9c\u0acd\u0aaf \u0a85\u0aaa\u0aa1\u0ac7\u0a9f \u0a95\u0ab0\u0acb",
    saving: "\u0ab8\u0ac7\u0ab5 \u0aa5\u0a88 \u0ab0\u0ab9\u0acd\u0aaf\u0ac1\u0a82 \u0a9b\u0ac7...",
    cancel: "\u0ab0\u0aa6 \u0a95\u0ab0\u0acb",
    close: "\u0aac\u0a82\u0aa7 \u0a95\u0ab0\u0acb",
    requiredEnglish:
      "\u0a85\u0a82\u0a97\u0acd\u0ab0\u0ac7\u0a9c\u0ac0 \u0ab0\u0abe\u0a9c\u0acd\u0aaf \u0aa8\u0abe\u0aae \u0a9c\u0ab0\u0ac2\u0ab0\u0ac0 \u0a9b\u0ac7.",
    duplicate: "\u0a86 \u0ab0\u0abe\u0a9c\u0acd\u0aaf \u0aaa\u0ab9\u0ac7\u0ab2\u0abe\u0aa5\u0ac0 \u0a9c \u0a85\u0ab8\u0acd\u0aa4\u0abf\u0aa4\u0acd\u0ab5\u0aae\u0abe\u0a82 \u0a9b\u0ac7.",
    loadError: "\u0ab0\u0abe\u0a9c\u0acd\u0aaf \u0ab2\u0acb\u0aa1 \u0a95\u0ab0\u0ac0 \u0ab6\u0a95\u0abe\u0aaf\u0abe \u0aa8\u0ab9\u0ac0\u0a82.",
    countryLoadError: "\u0aa6\u0ac7\u0ab6 \u0ab2\u0acb\u0aa1 \u0a95\u0ab0\u0ac0 \u0ab6\u0a95\u0abe\u0aaf\u0abe \u0aa8\u0ab9\u0ac0\u0a82.",
    saveSuccess: "\u0ab0\u0abe\u0a9c\u0acd\u0aaf \u0ab8\u0aab\u0ab3\u0aa4\u0abe\u0aaa\u0ac2\u0ab0\u0acd\u0ab5\u0a95 \u0ab8\u0ac7\u0ab5 \u0aa5\u0aaf\u0ac1\u0a82.",
    updateSuccess: "\u0ab0\u0abe\u0a9c\u0acd\u0aaf \u0ab8\u0ab3\u0abf\u0aaf\u0aa4\u0abe\u0aaa\u0ac2\u0ab0\u0acd\u0ab5\u0a95 \u0a85\u0aaa\u0aa1\u0ac7\u0a9f \u0aa5\u0aaf\u0ac1\u0a82.",
    deleteSuccess: "\u0ab0\u0abe\u0a9c\u0acd\u0aaf \u0ab8\u0aab\u0ab3\u0aa4\u0abe\u0aaa\u0ac2\u0ab0\u0acd\u0ab5\u0a95 \u0aa6\u0ac2\u0ab0 \u0aa5\u0aaf\u0ac1\u0a82.",
    statusSuccess: "\u0ab0\u0abe\u0a9c\u0acd\u0aaf\u0aa8\u0ac0 \u0ab8\u0acd\u0aa5\u0abf\u0aa4\u0abf \u0a85\u0aaa\u0aa1\u0ac7\u0a9f \u0aa5\u0a88.",
    genericError: "\u0a95\u0a82\u0a87\u0a95 \u0a96\u0acb\u0a9f\u0ac1\u0a82 \u0aa5\u0aaf\u0ac1\u0a82. \u0aab\u0ab0\u0ac0 \u0aaa\u0acd\u0ab0\u0aaf\u0abe\u0ab8 \u0a95\u0ab0\u0acb.",
    deleteTitle: "\u0ab0\u0abe\u0a9c\u0acd\u0aaf \u0aa6\u0ac2\u0ab0 \u0a95\u0ab0\u0acb",
    deleteMessage:
      "\u0ab6\u0ac1\u0a82 \u0aa4\u0aae\u0ac7 \u0a96\u0ab0\u0ac7\u0a96\u0ab0 \u0a86 \u0ab0\u0abe\u0a9c\u0acd\u0aaf \u0aa6\u0ac2\u0ab0 \u0a95\u0ab0\u0ab5\u0abe \u0aae\u0abe\u0a82\u0a97\u0acb \u0a9b\u0acb?",
    linkedCities:
      "\u0a86 \u0ab0\u0abe\u0a9c\u0acd\u0aaf \u0ab8\u0abe\u0aa5\u0ac7 \u0ab6\u0ab9\u0ac7\u0ab0\u0acb \u0ab2\u0abf\u0a82\u0a95 \u0a9b\u0ac7, \u0aa4\u0ac7\u0aa5\u0ac0 \u0aa6\u0ac2\u0ab0 \u0a95\u0ab0\u0ac0 \u0ab6\u0a95\u0abe\u0aaf\u0ac1\u0a82 \u0aa8\u0aa5\u0ac0. \u0aa4\u0ac7\u0aa8\u0ac7 \u0aa8\u0abf\u0ab7\u0acd\u0a95\u0acd\u0ab0\u0abf\u0aaf \u0a95\u0ab0\u0acb.",
    yesDelete: "\u0ab9\u0abe, \u0aa6\u0ac2\u0ab0 \u0a95\u0ab0\u0acb",
    refresh: "\u0ab0\u0abf\u0aab\u0acd\u0ab0\u0ac7\u0ab6",
    records: "\u0ab0\u0abe\u0a9c\u0acd\u0aaf\u0acb",
  },
};

function getLocale(value: unknown): Locale {
  return value === "hi" || value === "gu" ? value : "en";
}

function getTranslation(
  item: StateRecord,
  locale: Locale
): string {
  const translations =
    Array.isArray(item.translations)
      ? item.translations
      : Array.isArray(item.StateTranslation)
        ? item.StateTranslation
        : [];

  return (
    translations.find(
      (translation) => translation.locale === locale
    )?.name ||
    translations.find(
      (translation) => translation.locale === "en"
    )?.name ||
    item.name ||
    ""
  );
}

function getCountryName(
  country: Country | StateRecord["country"] | null | undefined,
  locale: Locale
): string {
  if (!country) return "";

  const translations = Array.isArray(country.translations)
    ? country.translations
    : [];

  return (
    translations.find(
      (translation) => translation.locale === locale
    )?.name ||
    translations.find(
      (translation) => translation.locale === "en"
    )?.name ||
    country.name ||
    ""
  );
}

function getFormTranslations(item: StateRecord | null) {
  if (!item) {
    return {
      en: "",
      hi: "",
      gu: "",
    };
  }

  return {
    en: getTranslation(item, "en"),
    hi: getTranslation(item, "hi"),
    gu: getTranslation(item, "gu"),
  };
}

export default function StateMasterPage() {
  const params = useParams();

  const locale = getLocale(params?.locale);
  const t = ui[locale];

  const [states, setStates] = useState<StateRecord[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);

  const [loading, setLoading] = useState(true);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState<
    "ALL" | "ACTIVE" | "INACTIVE"
  >("ALL");

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [editingState, setEditingState] =
    useState<StateRecord | null>(null);
  const [deletingState, setDeletingState] =
    useState<StateRecord | null>(null);

  const [form, setForm] = useState<FormState>({
    en: "",
    hi: "",
    gu: "",
    countryId: "",
    isActive: true,
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadCountries() {
    try {
      setLoadingCountries(true);

      const response = await fetch(
        `/api/admin/countries?locale=${locale}`,
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || t.countryLoadError
        );
      }

      setCountries(
        Array.isArray(data)
          ? data
          : Array.isArray(data.items)
            ? data.items
            : []
      );
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : t.countryLoadError
      );
    } finally {
      setLoadingCountries(false);
    }
  }

  async function loadStates() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `/api/admin/states?locale=${locale}`,
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t.loadError);
      }

      setStates(
        Array.isArray(data)
          ? data
          : Array.isArray(data.items)
            ? data.items
            : []
      );
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : t.loadError
      );
    } finally {
      setLoading(false);
    }
  }

  async function refreshAll() {
    setMessage("");
    setError("");
    await Promise.all([
      loadStates(),
      loadCountries(),
    ]);
  }

  useEffect(() => {
    loadStates();
    loadCountries();
  }, [locale]);

  const filteredStates = useMemo(() => {
    const query = search.trim().toLowerCase();

    return states.filter((state) => {
      const names = [
        getTranslation(state, "en"),
        getTranslation(state, "hi"),
        getTranslation(state, "gu"),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query || names.includes(query);

      const matchesCountry =
        countryFilter === "ALL" ||
        state.country?.id === countryFilter;

      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "ACTIVE" && state.isActive) ||
        (statusFilter === "INACTIVE" && !state.isActive);

      return (
        matchesSearch &&
        matchesCountry &&
        matchesStatus
      );
    });
  }, [
    states,
    search,
    countryFilter,
    statusFilter,
  ]);

  function openAddModal() {
    setEditingState(null);
    setForm({
      en: "",
      hi: "",
      gu: "",
      countryId: "",
      isActive: true,
    });
    setError("");
    setMessage("");
    setModalOpen(true);
  }

  function openEditModal(state: StateRecord) {
    const translations = getFormTranslations(state);

    setEditingState(state);

    setForm({
      en: translations.en,
      hi: translations.hi,
      gu: translations.gu,
      countryId: state.country?.id || "",
      isActive: state.isActive,
    });

    setError("");
    setMessage("");
    setModalOpen(true);
  }

  function closeModal() {
    if (saving) return;

    setModalOpen(false);
    setEditingState(null);
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setMessage("");

    const englishName = form.en.trim();

    if (!englishName) {
      setError(t.requiredEnglish);
      return;
    }

    const payload = {
      name: englishName,
      countryId: form.countryId || null,
      isActive: form.isActive,
      translations: {
        en: englishName,
        hi: form.hi.trim(),
        gu: form.gu.trim(),
      },
    };

    try {
      setSaving(true);

      const url = editingState
        ? `/api/admin/states/${editingState.id}`
        : "/api/admin/states";

      const response = await fetch(url, {
        method: editingState ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            (editingState
              ? t.genericError
              : t.genericError)
        );
      }

      setModalOpen(false);
      setEditingState(null);

      setMessage(
        editingState
          ? t.updateSuccess
          : t.saveSuccess
      );

      await loadStates();
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : t.genericError
      );
    } finally {
      setSaving(false);
    }
  }

  function openDeleteModal(state: StateRecord) {
    setDeletingState(state);
    setError("");
    setMessage("");
    setDeleteOpen(true);
  }

  function closeDeleteModal() {
    setDeleteOpen(false);
    setDeletingState(null);
  }

  async function handleDelete() {
    if (!deletingState) return;

    setError("");
    setMessage("");

    try {
      setSaving(true);

      const response = await fetch(
        `/api/admin/states/${deletingState.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || t.genericError
        );
      }

      closeDeleteModal();
      setMessage(t.deleteSuccess);

      await loadStates();
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : t.genericError
      );
    } finally {
      setSaving(false);
    }
  }

  async function toggleStatus(state: StateRecord) {
    setError("");
    setMessage("");

    const translations = getFormTranslations(state);

    try {
      const response = await fetch(
        `/api/admin/states/${state.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: translations.en || state.name,
            countryId: state.country?.id || null,
            isActive: !state.isActive,
            translations: {
              en: translations.en || state.name,
              hi: translations.hi,
              gu: translations.gu,
            },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || t.genericError
        );
      }

      setMessage(t.statusSuccess);
      await loadStates();
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : t.genericError
      );
    }
  }

  return (
    <div className="space-y-6">
      <div
        className="
          rounded-3xl
          border
          border-red-950/10
          bg-white/80
          p-6
          shadow-xl
          backdrop-blur
          dark:border-white/10
          dark:bg-slate-950/60
        "
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <div
              className="
                flex
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-red-700
                via-red-800
                to-red-950
                text-white
                shadow-lg
              "
            >
              <MapPin className="h-7 w-7" />
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {t.title}
              </h2>

              <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                {t.description}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={refreshAll}
              disabled={loading || loadingCountries}
              title={t.refresh}
              className="
                inline-flex
                items-center
                justify-center
                rounded-xl
                border
                border-slate-200
                bg-white
                p-3
                text-slate-700
                shadow-sm
                transition
                hover:-translate-y-0.5
                hover:shadow-md
                disabled:cursor-not-allowed
                disabled:opacity-50
                dark:border-white/10
                dark:bg-white/5
                dark:text-slate-200
              "
            >
              <RefreshCw
                className={`h-5 w-5 ${
                  loading ? "animate-spin" : ""
                }`}
              />
            </button>

            <button
              type="button"
              onClick={openAddModal}
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-red-800
                via-red-700
                to-red-900
                px-4
                py-3
                text-sm
                font-semibold
                text-white
                shadow-lg
                transition
                hover:-translate-y-0.5
                hover:shadow-xl
              "
            >
              <Plus className="h-5 w-5" />
              {t.addState}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div
          className="
            flex
            items-start
            gap-3
            rounded-2xl
            border
            border-red-200
            bg-red-50
            px-4
            py-3
            text-sm
            text-red-800
            dark:border-red-900/50
            dark:bg-red-950/30
            dark:text-red-200
          "
        >
          <XCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {message && (
        <div
          className="
            flex
            items-start
            gap-3
            rounded-2xl
            border
            border-emerald-200
            bg-emerald-50
            px-4
            py-3
            text-sm
            text-emerald-800
            dark:border-emerald-900/50
            dark:bg-emerald-950/30
            dark:text-emerald-200
          "
        >
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      <div
        className="
          rounded-3xl
          border
          border-red-950/10
          bg-white/80
          p-5
          shadow-xl
          backdrop-blur
          dark:border-white/10
          dark:bg-slate-950/60
        "
      >
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
          <div className="relative min-w-0 flex-1">
            <Search
              className="
                pointer-events-none
                absolute
                left-3
                top-1/2
                h-5
                w-5
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder={t.searchPlaceholder}
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                bg-white
                py-3
                pl-10
                pr-4
                text-sm
                text-slate-900
                outline-none
                transition
                focus:border-red-500
                focus:ring-4
                focus:ring-red-500/10
                dark:border-white/10
                dark:bg-slate-900
                dark:text-white
              "
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              value={countryFilter}
              onChange={(event) =>
                setCountryFilter(event.target.value)
              }
              className="
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-3
                text-sm
                text-slate-900
                outline-none
                focus:border-red-500
                focus:ring-4
                focus:ring-red-500/10
                dark:border-white/10
                dark:bg-slate-900
                dark:text-white
              "
            >
              <option value="ALL">
                {t.allCountries}
              </option>

              {countries.map((country) => (
                <option
                  key={country.id}
                  value={country.id}
                >
                  {country.name}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value as
                    | "ALL"
                    | "ACTIVE"
                    | "INACTIVE"
                )
              }
              className="
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-3
                text-sm
                text-slate-900
                outline-none
                focus:border-red-500
                focus:ring-4
                focus:ring-red-500/10
                dark:border-white/10
                dark:bg-slate-900
                dark:text-white
              "
            >
              <option value="ALL">
                {t.all}
              </option>
              <option value="ACTIVE">
                {t.active}
              </option>
              <option value="INACTIVE">
                {t.inactive}
              </option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
          <span>
            {filteredStates.length}{" "}
            {t.records}
          </span>

          <span>
            {search || countryFilter !== "ALL"
              ? `${t.search}: ${filteredStates.length}`
              : ""}
          </span>
        </div>
      </div>

      <div
        className="
          overflow-hidden
          rounded-3xl
          border
          border-red-950/10
          bg-white/80
          shadow-xl
          backdrop-blur
          dark:border-white/10
          dark:bg-slate-950/60
        "
      >
        <div className="overflow-x-auto">
          <table className="min-w-[1100px] w-full">
            <thead>
              <tr
                className="
                  border-b
                  border-slate-200
                  bg-slate-50
                  dark:border-white/10
                  dark:bg-white/5
                "
              >
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  #
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  {t.english}
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  {t.hindi}
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  {t.gujarati}
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  {t.country}
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  {t.status}
                </th>

                <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  {t.actions}
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 dark:divide-white/10">
              {loading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-16 text-center"
                  >
                    <div className="flex flex-col items-center gap-3 text-slate-500 dark:text-slate-400">
                      <RefreshCw className="h-7 w-7 animate-spin" />
                      <span>{t.loading}</span>
                    </div>
                  </td>
                </tr>
              ) : filteredStates.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-16 text-center"
                  >
                    <div className="flex flex-col items-center gap-3 text-slate-500 dark:text-slate-400">
                      <MapPin className="h-10 w-10 opacity-40" />
                      <span>{t.noRecords}</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredStates.map((state, index) => (
                  <tr
                    key={state.id}
                    className="
                      transition
                      hover:bg-red-50/50
                      dark:hover:bg-white/[0.03]
                    "
                  >
                    <td className="px-5 py-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                      {index + 1}
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {getTranslation(state, "en") || "—"}
                      </div>
                    </td>

                    <td
                      className="
                        px-5
                        py-4
                        text-sm
                        text-slate-700
                        dark:text-slate-200
                      "
                    >
                      {getTranslation(state, "hi") || "—"}
                    </td>

                    <td
                      className="
                        px-5
                        py-4
                        text-sm
                        text-slate-700
                        dark:text-slate-200
                      "
                    >
                      {getTranslation(state, "gu") || "—"}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
                        <Globe2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                        {getCountryName(
                          state.country,
                          locale
                        ) || "—"}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => toggleStatus(state)}
                        title={
                          state.isActive
                            ? t.deactivate
                            : t.activate
                        }
                        className={`
                          inline-flex
                          items-center
                          gap-2
                          rounded-full
                          px-3
                          py-1.5
                          text-xs
                          font-bold
                          transition
                          ${
                            state.isActive
                              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/10 dark:text-slate-300"
                          }
                        `}
                      >
                        {state.isActive ? (
                          <>
                            <CheckCircle2 className="h-4 w-4" />
                            {t.activeStatus}
                          </>
                        ) : (
                          <>
                            <XCircle className="h-4 w-4" />
                            {t.inactiveStatus}
                          </>
                        )}
                      </button>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            openEditModal(state)
                          }
                          title={t.edit}
                          className="
                            inline-flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-slate-200
                            bg-white
                            text-slate-600
                            transition
                            hover:border-red-300
                            hover:bg-red-50
                            hover:text-red-700
                            dark:border-white/10
                            dark:bg-white/5
                            dark:text-slate-300
                            dark:hover:bg-red-950/30
                            dark:hover:text-red-300
                          "
                        >
                          <Pencil className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            openDeleteModal(state)
                          }
                          title={t.delete}
                          className="
                            inline-flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-red-200
                            bg-red-50
                            text-red-600
                            transition
                            hover:bg-red-100
                            dark:border-red-900/40
                            dark:bg-red-950/20
                            dark:text-red-300
                            dark:hover:bg-red-950/40
                          "
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-slate-950/60
            p-4
            backdrop-blur-sm
          "
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            className="
              max-h-[92vh]
              w-full
              max-w-2xl
              overflow-y-auto
              rounded-3xl
              border
              border-red-950/10
              bg-white
              p-6
              shadow-2xl
              dark:border-white/10
              dark:bg-slate-950
            "
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {editingState
                    ? t.editTitle
                    : t.addTitle}
                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {t.description}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="
                  inline-flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-slate-200
                  text-slate-500
                  hover:bg-slate-100
                  dark:border-white/10
                  dark:text-slate-300
                  dark:hover:bg-white/10
                "
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {t.englishName}
                    <span className="ml-1 text-red-600">
                      *
                    </span>
                  </label>

                  <input
                    value={form.en}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        en: event.target.value,
                      }))
                    }
                    placeholder="Gujarat"
                    maxLength={100}
                    autoFocus
                    className="
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-4
                      py-3
                      text-sm
                      text-slate-900
                      outline-none
                      focus:border-red-500
                      focus:ring-4
                      focus:ring-red-500/10
                      dark:border-white/10
                      dark:bg-white/5
                      dark:text-white
                    "
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {t.hindiName}
                  </label>

                  <input
                    value={form.hi}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        hi: event.target.value,
                      }))
                    }
                    placeholder="\u0917\u0941\u091c\u0930\u093e\u0924"
                    maxLength={100}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-4
                      py-3
                      text-sm
                      text-slate-900
                      outline-none
                      focus:border-red-500
                      focus:ring-4
                      focus:ring-red-500/10
                      dark:border-white/10
                      dark:bg-white/5
                      dark:text-white
                    "
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {t.gujaratiName}
                  </label>

                  <input
                    value={form.gu}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        gu: event.target.value,
                      }))
                    }
                    placeholder="\u0a97\u0ac1\u0a9c\u0ab0\u0abe\u0aa4"
                    maxLength={100}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-4
                      py-3
                      text-sm
                      text-slate-900
                      outline-none
                      focus:border-red-500
                      focus:ring-4
                      focus:ring-red-500/10
                      dark:border-white/10
                      dark:bg-white/5
                      dark:text-white
                    "
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {t.country}
                  </label>

                  <select
                    value={form.countryId}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        countryId:
                          event.target.value,
                      }))
                    }
                    disabled={loadingCountries}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-4
                      py-3
                      text-sm
                      text-slate-900
                      outline-none
                      focus:border-red-500
                      focus:ring-4
                      focus:ring-red-500/10
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                      dark:border-white/10
                      dark:bg-white/5
                      dark:text-white
                    "
                  >
                    <option value="">
                      {t.selectCountry}
                    </option>

                    {countries.map((country) => (
                      <option
                        key={country.id}
                        value={country.id}
                      >
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <label
                className="
                  flex
                  cursor-pointer
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-4
                  py-3
                  dark:border-white/10
                  dark:bg-white/5
                "
              >
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      isActive:
                        event.target.checked,
                    }))
                  }
                  className="
                    h-5
                    w-5
                    rounded
                    border-slate-300
                    text-red-700
                    focus:ring-red-500
                  "
                />

                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {form.isActive
                    ? t.activeState
                    : t.inactiveState}
                </span>
              </label>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end dark:border-white/10">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="
                    rounded-xl
                    border
                    border-slate-200
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-slate-700
                    transition
                    hover:bg-slate-100
                    disabled:opacity-50
                    dark:border-white/10
                    dark:text-slate-200
                    dark:hover:bg-white/10
                  "
                >
                  {t.cancel}
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-gradient-to-r
                    from-red-800
                    via-red-700
                    to-red-900
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    shadow-lg
                    transition
                    hover:-translate-y-0.5
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {saving && (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  )}

                  {saving
                    ? t.saving
                    : editingState
                      ? t.update
                      : t.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteOpen && deletingState && (
        <div
          className="
            fixed
            inset-0
            z-[110]
            flex
            items-center
            justify-center
            bg-slate-950/70
            p-4
            backdrop-blur-sm
          "
        >
          <div
            className="
              w-full
              max-w-md
              rounded-3xl
              border
              border-red-200
              bg-white
              p-6
              shadow-2xl
              dark:border-red-900/40
              dark:bg-slate-950
            "
          >
            <div className="mb-5 flex items-start gap-4">
              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-red-100
                  text-red-700
                  dark:bg-red-950/30
                  dark:text-red-300
                "
              >
                <Trash2 className="h-6 w-6" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {t.deleteTitle}
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {t.deleteMessage}
                </p>
              </div>
            </div>

            <div
              className="
                mb-5
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                px-4
                py-3
                dark:border-white/10
                dark:bg-white/5
              "
            >
              <div className="font-semibold text-slate-900 dark:text-white">
                {getTranslation(
                  deletingState,
                  "en"
                )}
              </div>

              <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {getCountryName(
                  deletingState.country,
                  locale
                )}
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={saving}
                className="
                  rounded-xl
                  border
                  border-slate-200
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-slate-700
                  hover:bg-slate-100
                  disabled:opacity-50
                  dark:border-white/10
                  dark:text-slate-200
                  dark:hover:bg-white/10
                "
              >
                {t.cancel}
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={saving}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-red-700
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg
                  hover:bg-red-800
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {saving && (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                )}

                {t.yesDelete}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}