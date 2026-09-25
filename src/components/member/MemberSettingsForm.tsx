"use client";

import {
  useEffect,
  useState,
} from "react";
import {
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Languages,
  LogOut,
  Mail,
  Moon,
  ShieldCheck,
  Sun,
  UserCircle,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";

type Locale = "en" | "hi" | "gu";

type Props = {
  locale: Locale;
  email: string;
  status: string;
};

const translations: Record<
  Locale,
  {
    settings: string;
    description: string;
    account: string;
    accountDescription: string;
    email: string;
    accountStatus: string;
    member: string;
    role: string;
    accountType: string;
    memberAccount: string;
    security: string;
    securityDescription: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    changePassword: string;
    changing: string;
    language: string;
    languageDescription: string;
    theme: string;
    themeDescription: string;
    light: string;
    dark: string;
    system: string;
    logout: string;
    logoutDescription: string;
    logoutButton: string;
    passwordChanged: string;
    passwordError: string;
    allFieldsRequired: string;
    passwordMinimum: string;
    passwordsMismatch: string;
    currentPasswordWrong: string;
    passwordDifferent: string;
    approved: string;
    pending: string;
    rejected: string;
    blocked: string;
    securityNote: string;
  }
> = {
  en: {
    settings: "Settings",
    description: "Manage your account, security and preferences.",
    account: "Account Information",
    accountDescription: "Your ASK Community account information.",
    email: "Email Address",
    accountStatus: "Account Status",
    member: "Member",
    role: "Role",
    accountType: "Account Type",
    memberAccount: "Community Member",
    security: "Password & Security",
    securityDescription:
      "Keep your account secure by regularly updating your password.",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmPassword: "Confirm New Password",
    changePassword: "Change Password",
    changing: "Changing Password...",
    language: "Language",
    languageDescription: "Choose your preferred portal language.",
    theme: "Theme",
    themeDescription: "Choose how the portal should appear.",
    light: "Light",
    dark: "Dark",
    system: "System",
    logout: "Logout",
    logoutDescription: "Sign out from your ASK Community account.",
    logoutButton: "Sign Out",
    passwordChanged: "Password changed successfully.",
    passwordError: "Unable to change password.",
    allFieldsRequired: "All password fields are required.",
    passwordMinimum:
      "New password must be at least 8 characters.",
    passwordsMismatch: "New passwords do not match.",
    currentPasswordWrong: "Current password is incorrect.",
    passwordDifferent:
      "New password must be different from current password.",
    approved: "Approved",
    pending: "Pending",
    rejected: "Rejected",
    blocked: "Blocked",
    securityNote:
      "Use a strong password containing letters, numbers and special characters.",
  },

  hi: {
    settings: "\u0938\u0947\u091f\u093f\u0902\u0917\u094d\u0938",
    description:
      "\u0905\u092a\u0928\u0947 \u0916\u093e\u0924\u0947, \u0938\u0941\u0930\u0915\u094d\u0937\u093e \u0914\u0930 \u092a\u0938\u0902\u0926\u0917\u0940 \u0915\u094b \u092a\u094d\u0930\u092c\u0902\u0927\u093f\u0924 \u0915\u0930\u0947\u0902\u0964",
    account:
      "\u0916\u093e\u0924\u093e \u091c\u093e\u0928\u0915\u093e\u0930\u0940",
    accountDescription:
      "\u0906\u092a\u0915\u0947 ASK \u0938\u092e\u0941\u0926\u093e\u092f \u0916\u093e\u0924\u0947 \u0915\u0940 \u091c\u093e\u0928\u0915\u093e\u0930\u0940\u0964",
    email:
      "\u0908\u092e\u0947\u0932 \u092a\u0924\u093e",
    accountStatus:
      "\u0916\u093e\u0924\u093e \u0938\u094d\u0925\u093f\u0924\u093f",
    member:
      "\u0938\u0926\u0938\u094d\u092f",
    role:
      "\u092d\u0942\u092e\u093f\u0915\u093e",
    accountType:
      "\u0916\u093e\u0924\u093e \u092a\u094d\u0930\u0915\u093e\u0930",
    memberAccount:
      "\u0938\u092e\u0941\u0926\u093e\u092f \u0938\u0926\u0938\u094d\u092f",
    security:
      "\u092a\u093e\u0938\u0935\u0930\u094d\u0921 \u0914\u0930 \u0938\u0941\u0930\u0915\u094d\u0937\u093e",
    securityDescription:
      "\u0928\u093f\u092f\u092e\u093f\u0924 \u0930\u0942\u092a \u0938\u0947 \u092a\u093e\u0938\u0935\u0930\u094d\u0921 \u092c\u0926\u0932\u0915\u0930 \u0905\u092a\u0928\u0947 \u0916\u093e\u0924\u0947 \u0915\u094b \u0938\u0941\u0930\u0915\u094d\u0937\u093f\u0924 \u0930\u0916\u0947\u0902\u0964",
    currentPassword:
      "\u0935\u0930\u094d\u0924\u092e\u093e\u0928 \u092a\u093e\u0938\u0935\u0930\u094d\u0921",
    newPassword:
      "\u0928\u092f\u093e \u092a\u093e\u0938\u0935\u0930\u094d\u0921",
    confirmPassword:
      "\u0928\u092f\u093e \u092a\u093e\u0938\u0935\u0930\u094d\u0921 \u0915\u0940 \u092a\u0941\u0937\u094d\u091f\u093f \u0915\u0930\u0947\u0902",
    changePassword:
      "\u092a\u093e\u0938\u0935\u0930\u094d\u0921 \u092c\u0926\u0932\u0947\u0902",
    changing:
      "\u092a\u093e\u0938\u0935\u0930\u094d\u0921 \u092c\u0926\u0932\u093e \u091c\u093e \u0930\u0939\u093e \u0939\u0948...",
    language:
      "\u092d\u093e\u0937\u093e",
    languageDescription:
      "\u0905\u092a\u0928\u0940 \u092a\u0938\u0902\u0926\u0940\u0926\u093e \u092a\u094b\u0930\u094d\u091f\u0932 \u092d\u093e\u0937\u093e \u091a\u0941\u0928\u0947\u0902\u0964",
    theme:
      "\u0925\u0940\u092e",
    themeDescription:
      "\u092a\u094b\u0930\u094d\u091f\u0932 \u0915\u0948\u0938\u093e \u0926\u093f\u0916\u0947 \u092f\u0939 \u091a\u0941\u0928\u0947\u0902\u0964",
    light:
      "\u0932\u093e\u0907\u091f",
    dark:
      "\u0921\u093e\u0930\u094d\u0915",
    system:
      "\u0938\u093f\u0938\u094d\u091f\u092e",
    logout:
      "\u0932\u0949\u0917\u0906\u0909\u091f",
    logoutDescription:
      "\u0905\u092a\u0928\u0947 ASK \u0938\u092e\u0941\u0926\u093e\u092f \u0916\u093e\u0924\u0947 \u0938\u0947 \u0938\u093e\u0907\u0928 \u0906\u0909\u091f \u0915\u0930\u0947\u0902\u0964",
    logoutButton:
      "\u0938\u093e\u0907\u0928 \u0906\u0909\u091f",
    passwordChanged:
      "\u092a\u093e\u0938\u0935\u0930\u094d\u0921 \u0938\u092b\u0932\u0924\u093e\u092a\u0942\u0930\u094d\u0935\u0915 \u092c\u0926\u0932 \u0926\u093f\u092f\u093e \u0917\u092f\u093e\u0964",
    passwordError:
      "\u092a\u093e\u0938\u0935\u0930\u094d\u0921 \u092c\u0926\u0932\u0928\u0947 \u092e\u0947\u0902 \u0905\u0938\u092e\u0930\u094d\u0925\u0964",
    allFieldsRequired:
      "\u0938\u092d\u0940 \u092a\u093e\u0938\u0935\u0930\u094d\u0921 \u092b\u0940\u0932\u094d\u0921 \u0906\u0935\u0936\u094d\u092f\u0915 \u0939\u0948\u0902\u0964",
    passwordMinimum:
      "\u0928\u092f\u093e \u092a\u093e\u0938\u0935\u0930\u094d\u0921 \u0915\u092e \u0938\u0947 \u0915\u092e 8 \u0905\u0915\u094d\u0937\u0930\u094b\u0902 \u0915\u093e \u0939\u094b\u0928\u093e \u091a\u093e\u0939\u093f\u090f\u0964",
    passwordsMismatch:
      "\u0928\u090f \u092a\u093e\u0938\u0935\u0930\u094d\u0921 \u090f\u0915 \u0926\u0942\u0938\u0930\u0947 \u0938\u0947 \u092e\u0947\u0932 \u0928\u0939\u0940\u0902 \u0916\u093e\u0924\u0947\u0964",
    currentPasswordWrong:
      "\u0935\u0930\u094d\u0924\u092e\u093e\u0928 \u092a\u093e\u0938\u0935\u0930\u094d\u0921 \u0917\u0932\u0924 \u0939\u0948\u0964",
    passwordDifferent:
      "\u0928\u092f\u093e \u092a\u093e\u0938\u0935\u0930\u094d\u0921 \u0935\u0930\u094d\u0924\u092e\u093e\u0928 \u092a\u093e\u0938\u0935\u0930\u094d\u0921 \u0938\u0947 \u0905\u0932\u0917 \u0939\u094b\u0928\u093e \u091a\u093e\u0939\u093f\u090f\u0964",
    approved:
      "\u0905\u0928\u0941\u092e\u094b\u0926\u093f\u0924",
    pending:
      "\u0932\u0902\u092c\u093f\u0924",
    rejected:
      "\u0905\u0938\u094d\u0935\u0940\u0915\u0943\u0924",
    blocked:
      "\u092c\u094d\u0932\u0949\u0915",
    securityNote:
      "\u0905\u0915\u094d\u0937\u0930\u094b\u0902, \u0905\u0902\u0915\u094b\u0902 \u0914\u0930 \u0935\u093f\u0936\u0947\u0937 \u091a\u093f\u0928\u094d\u0939\u094b\u0902 \u0935\u093e\u0932\u093e \u092e\u091c\u092c\u0942\u0924 \u092a\u093e\u0938\u0935\u0930\u094d\u0921 \u0909\u092a\u092f\u094b\u0917 \u0915\u0930\u0947\u0902\u0964",
  },

  gu: {
    settings:
      "\u0ab8\u0ac7\u0a9f\u0abf\u0a82\u0a97\u0acd\u0ab8",
    description:
      "\u0aa4\u0aae\u0abe\u0ab0\u0abe \u0a96\u0abe\u0aa4\u0abe, \u0ab8\u0ac1\u0ab0\u0a95\u0acd\u0ab7\u0abe \u0a85\u0aa8\u0ac7 \u0aaa\u0ab8\u0a82\u0aa6\u0a97\u0ac0\u0a93\u0aa8\u0ac7 \u0ab5\u0acd\u0aaf\u0ab5\u0ab8\u0acd\u0aa5\u0abf\u0aa4 \u0a95\u0ab0\u0acb.",
    account:
      "\u0a96\u0abe\u0aa4\u0abe \u0aae\u0abe\u0ab9\u0abf\u0aa4\u0ac0",
    accountDescription:
      "\u0aa4\u0aae\u0abe\u0abe\u0ab0\u0abe ASK \u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf \u0a96\u0abe\u0aa4\u0abe\u0aa8\u0ac0 \u0aae\u0abe\u0ab9\u0abf\u0aa4\u0ac0.",
    email:
      "\u0a87\u0aae\u0ac7\u0ab2 \u0ab8\u0ab0\u0aa8\u0abe\u0aae\u0ac1\u0a82",
    accountStatus:
      "\u0a96\u0abe\u0aa4\u0abe\u0aa8\u0ac0 \u0ab8\u0acd\u0aa5\u0abf\u0aa4\u0abf",
    member:
      "\u0ab8\u0aad\u0acd\u0aaf",
    role:
      "\u0aad\u0ac2\u0aae\u0abf\u0a95\u0abe",
    accountType:
      "\u0a96\u0abe\u0aa4\u0abe \u0aaa\u0acd\u0ab0\u0a95\u0abe\u0ab0",
    memberAccount:
      "\u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf \u0ab8\u0aad\u0acd\u0aaf",
    security:
      "\u0aaa\u0abe\u0ab8\u0ab5\u0ab0\u0acd\u0aa1 \u0a85\u0aa8\u0ac7 \u0ab8\u0ac1\u0ab0\u0a95\u0acd\u0ab7\u0abe",
    securityDescription:
      "\u0aa8\u0abf\u0caf\u0aae\u0abf\u0aa4 \u0ab0\u0ac2\u0aaa\u0ac7 \u0aaa\u0abe\u0ab8\u0ab5\u0ab0\u0acd\u0aa1 \u0aac\u0aa6\u0ab2\u0ac0\u0aa8\u0ac7 \u0aa4\u0aae\u0abe\u0ab0\u0abe \u0a96\u0abe\u0aa4\u0abe\u0aa8\u0ac7 \u0ab8\u0ac1\u0ab0\u0a95\u0acd\u0ab7\u0abf\u0aa4 \u0ab0\u0abe\u0a96\u0acb.",
    currentPassword:
      "\u0ab5\u0ab0\u0acd\u0aa4\u0aae\u0abe\u0aa8 \u0aaa\u0abe\u0ab8\u0ab5\u0ab0\u0acd\u0aa1",
    newPassword:
      "\u0aa8\u0ab5\u0acb \u0aaa\u0abe\u0ab8\u0ab5\u0ab0\u0acd\u0aa1",
    confirmPassword:
      "\u0aa8\u0ab5\u0abe \u0aaa\u0abe\u0ab8\u0ab5\u0ab0\u0acd\u0aa1\u0aa8\u0ac0 \u0aaa\u0ac1\u0ab7\u0acd\u0a9f\u0abf \u0a95\u0ab0\u0acb",
    changePassword:
      "\u0aaa\u0abe\u0ab8\u0ab5\u0ab0\u0acd\u0aa1 \u0aac\u0aa6\u0ab2\u0acb",
    changing:
      "\u0aaa\u0abe\u0ab8\u0ab5\u0ab0\u0acd\u0aa1 \u0aac\u0aa6\u0ab2\u0abe\u0a88 \u0ab0\u0ab9\u0acd\u0aaf\u0ac1\u0a82 \u0a9b\u0ac7...",
    language:
      "\u0aad\u0abe\u0ab7\u0abe",
    languageDescription:
      "\u0aa4\u0aae\u0abe\u0ab0\u0ac0 \u0aaa\u0ab8\u0a82\u0aa6\u0aa8\u0ac0 \u0aaa\u0acb\u0ab0\u0acd\u0a9f\u0ab2 \u0aad\u0abe\u0ab7\u0abe \u0aaa\u0ab8\u0a82\u0aa6 \u0a95\u0ab0\u0acb.",
    theme:
      "\u0aa5\u0ac0\u0aae",
    themeDescription:
      "\u0aaa\u0acb\u0ab0\u0acd\u0a9f\u0ab2 \u0a95\u0ac7\u0ab5\u0ac1\u0a82 \u0aa6\u0ac7\u0a96\u0abe\u0aaf \u0aa4\u0ac7 \u0aaa\u0ab8\u0a82\u0aa6 \u0a95\u0ab0\u0acb.",
    light:
      "\u0ab2\u0abe\u0a87\u0a9f",
    dark:
      "\u0aa1\u0abe\u0ab0\u0acd\u0a95",
    system:
      "\u0ab8\u0abf\u0ab8\u0acd\u0a9f\u0aae",
    logout:
      "\u0ab2\u0ac9\u0a97\u0a86\u0a89\u0a9f",
    logoutDescription:
      "\u0aa4\u0aae\u0abe\u0abe\u0ab0\u0abe ASK \u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf \u0a96\u0abe\u0aa4\u0abe\u0aae\u0abe\u0a82\u0aa5\u0ac0 \u0ab8\u0abe\u0a87\u0aa8 \u0a86\u0a89\u0a9f \u0a95\u0ab0\u0acb.",
    logoutButton:
      "\u0ab8\u0abe\u0a87\u0aa8 \u0a86\u0a89\u0a9f",
    passwordChanged:
      "\u0aaa\u0abe\u0ab8\u0ab5\u0ab0\u0acd\u0aa1 \u0ab8\u0aab\u0ab3\u0aa4\u0abe\u0aaa\u0ac2\u0ab0\u0acd\u0ab5\u0a95 \u0aac\u0aa6\u0ab2\u0abe\u0aaf\u0acb.",
    passwordError:
      "\u0aaa\u0abe\u0ab8\u0ab5\u0ab0\u0acd\u0aa1 \u0aac\u0aa6\u0ab2\u0ab5\u0abe\u0aae\u0abe\u0a82 \u0a85\u0ab8\u0aae\u0ab0\u0acd\u0aa5.",
    allFieldsRequired:
      "\u0aaa\u0abe\u0ab8\u0ab5\u0ab0\u0acd\u0aa1\u0aa8\u0abe \u0aa4\u0aae\u0abe\u0aae \u0aab\u0ac0\u0ab2\u0acd\u0aa1 \u0aab\u0ab0\u0a9c\u0abf\u0aaf\u0abe\u0aa4 \u0a9b\u0ac7.",
    passwordMinimum:
      "\u0aa8\u0ab5\u0abe \u0aaa\u0abe\u0ab8\u0ab5\u0ab0\u0acd\u0aa1\u0aae\u0abe\u0a82 \u0a93\u0a9b\u0abe\u0aae\u0abe\u0a82 \u0a93\u0a9b\u0abe 8 \u0a85\u0a95\u0acd\u0ab7\u0ab0\u0acb \u0ab9\u0acb\u0ab5\u0abe \u0a9c\u0acb\u0a87\u0a8f.",
    passwordsMismatch:
      "\u0aa8\u0ab5\u0abe \u0aaa\u0abe\u0ab8\u0ab5\u0ab0\u0acd\u0aa1 \u0a8f\u0a95\u0aac\u0ac0\u0a9c\u0abe \u0ab8\u0abe\u0aa5\u0ac7 \u0aae\u0ac7\u0ab3 \u0a96\u0abe\u0aa4\u0abe \u0aa8\u0aa5\u0ac0.",
    currentPasswordWrong:
      "\u0ab5\u0ab0\u0acd\u0aa4\u0aae\u0abe\u0aa8 \u0aaa\u0abe\u0ab8\u0ab5\u0ab0\u0acd\u0aa1 \u0a96\u0acb\u0a9f\u0acb \u0a9b\u0ac7.",
    passwordDifferent:
      "\u0aa8\u0ab5\u0acb \u0aaa\u0abe\u0ab8\u0ab5\u0ab0\u0acd\u0aa1 \u0ab5\u0ab0\u0acd\u0aa4\u0aae\u0abe\u0aa8 \u0aaa\u0abe\u0ab8\u0ab5\u0ab0\u0acd\u0aa1\u0aa5\u0ac0 \u0a85\u0ab2\u0a97 \u0ab9\u0acb\u0ab5\u0acb \u0a9c\u0acb\u0a87\u0a8f.",
    approved:
      "\u0aae\u0a82\u0a9c\u0ac2\u0ab0",
    pending:
      "\u0aac\u0abe\u0a95\u0ac0",
    rejected:
      "\u0ab8\u0acd\u0ab5\u0ac0\u0a95\u0abe\u0ab0\u0acd\u0aaf \u0aa8\u0aa5\u0ac0",
    blocked:
      "\u0aac\u0acd\u0ab2\u0ac9\u0a95",
    securityNote:
      "\u0a85\u0a95\u0acd\u0ab7\u0ab0\u0acb, \u0a85\u0a82\u0a95\u0acb \u0a85\u0aa8\u0ac7 \u0ab5\u0abf\u0ab6\u0ac7\u0ab7 \u0a9a\u0abf\u0ab9\u0acd\u0aa8\u0acb \u0ab5\u0abe\u0ab3\u0abe \u0aae\u0a9c\u0aac\u0ac2\u0aa4 \u0aaa\u0abe\u0ab8\u0ab5\u0ab0\u0acd\u0aa1\u0aa8\u0acb \u0a89\u0aaa\u0aaf\u0acb\u0a97 \u0a95\u0ab0\u0acb.",
  },
};

function statusLabel(
  status: string,
  t: (typeof translations)["en"]
) {
  switch (status) {
    case "APPROVED":
      return t.approved;
    case "REJECTED":
      return t.rejected;
    case "BLOCKED":
      return t.blocked;
    default:
      return t.pending;
  }
}

export default function MemberSettingsForm({
  locale,
  email,
  status,
}: Props) {
  const t = translations[locale];
  const { theme, setTheme } = useTheme();

  const [currentPassword, setCurrentPassword] =
    useState("");
  const [newPassword, setNewPassword] =
    useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showCurrent, setShowCurrent] =
    useState(false);
  const [showNew, setShowNew] =
    useState(false);
  const [showConfirm, setShowConfirm] =
    useState(false);

  const [changing, setChanging] =
    useState(false);
  const [success, setSuccess] =
    useState("");
  const [error, setError] =
    useState("");

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handlePasswordChange(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSuccess("");
    setError("");

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      setError(t.allFieldsRequired);
      return;
    }

    if (newPassword.length < 8) {
      setError(t.passwordMinimum);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(t.passwordsMismatch);
      return;
    }

    if (currentPassword === newPassword) {
      setError(t.passwordDifferent);
      return;
    }

    try {
      setChanging(true);

      const response = await fetch(
        "/api/member/password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            currentPassword,
            newPassword,
            confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error || t.passwordError
        );
        return;
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setSuccess(t.passwordChanged);
    } catch (err) {
      console.error(
        "PASSWORD CHANGE ERROR:",
        err
      );
      setError(t.passwordError);
    } finally {
      setChanging(false);
    }
  }

  function selectLanguage(nextLocale: Locale) {
    if (nextLocale === locale) {
      return;
    }

    const pathParts =
      window.location.pathname
        .split("/")
        .filter(Boolean);

    if (pathParts.length === 0) {
      return;
    }

    pathParts[0] = nextLocale;

    window.location.href =
      "/" + pathParts.join("/");
  }

  function statusClasses(value: string) {
    switch (value) {
      case "APPROVED":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
      case "BLOCKED":
        return "bg-red-200 text-red-800 dark:bg-red-950/50 dark:text-red-300";
      case "REJECTED":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300";
      default:
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
    }
  }

  const themeValue =
    mounted && theme
      ? theme
      : "system";

  return (
    <div className="mx-auto max-w-6xl space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t.settings}
        </h1>

        <p className="mt-1 text-gray-600 dark:text-red-100/70">
          {t.description}
        </p>
      </div>

      {/* Account */}
      <section
        className="
          overflow-hidden rounded-2xl
          border border-red-200/70
          bg-gradient-to-br from-[#ffdfe5] via-[#ffd2da] to-[#ffc4ce]
          shadow-lg shadow-red-900/10
          dark:border-red-300/10
          dark:bg-gradient-to-br
          dark:from-[#68131f]
          dark:via-[#570e18]
          dark:to-[#410810]
        "
      >
        <div className="border-b border-red-300/40 px-6 py-5 dark:border-red-200/10">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-700 text-white shadow-md">
              <UserCircle className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-red-950 dark:text-white">
                {t.account}
              </h2>

              <p className="text-sm text-red-800/70 dark:text-red-100/60">
                {t.accountDescription}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 p-6 md:grid-cols-2">

          <div className="rounded-xl border border-red-200 bg-white/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg dark:border-red-100/10 dark:bg-[#751a28]/70 dark:hover:bg-[#841e2d]">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-red-800 dark:text-red-200">
              <Mail className="h-4 w-4" />
              {t.email}
            </div>

            <p className="break-all font-medium text-gray-900 dark:text-white">
              {email || "-"}
            </p>
          </div>

          <div className="rounded-xl border border-red-200 bg-white/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg dark:border-red-100/10 dark:bg-[#751a28]/70 dark:hover:bg-[#841e2d]">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-red-800 dark:text-red-200">
              <ShieldCheck className="h-4 w-4" />
              {t.accountStatus}
            </div>

            <span
              className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${statusClasses(status)}`}
            >
              {statusLabel(status, t)}
            </span>
          </div>

          <div className="rounded-xl border border-red-200 bg-white/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg dark:border-red-100/10 dark:bg-[#751a28]/70 dark:hover:bg-[#841e2d]">
            <div className="mb-2 text-sm font-semibold text-red-800 dark:text-red-200">
              {t.role}
            </div>

            <p className="font-semibold text-gray-900 dark:text-white">
              {t.member}
            </p>
          </div>

          <div className="rounded-xl border border-red-200 bg-white/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg dark:border-red-100/10 dark:bg-[#751a28]/70 dark:hover:bg-[#841e2d]">
            <div className="mb-2 text-sm font-semibold text-red-800 dark:text-red-200">
              {t.accountType}
            </div>

            <p className="font-semibold text-gray-900 dark:text-white">
              {t.memberAccount}
            </p>
          </div>
        </div>
      </section>

      {/* Security */}
      <section
        className="
          overflow-hidden rounded-2xl
          border border-red-200/70
          bg-gradient-to-br from-[#ffdfe5] via-[#ffd2da] to-[#ffc4ce]
          shadow-lg shadow-red-900/10
          dark:border-red-300/10
          dark:bg-gradient-to-br
          dark:from-[#68131f]
          dark:via-[#570e18]
          dark:to-[#410810]
        "
      >
        <div className="border-b border-red-300/40 px-6 py-5 dark:border-red-200/10">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-700 text-white shadow-md">
              <KeyRound className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-red-950 dark:text-white">
                {t.security}
              </h2>

              <p className="text-sm text-red-800/70 dark:text-red-100/60">
                {t.securityDescription}
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handlePasswordChange}
          className="space-y-5 p-6"
        >
          {success && (
            <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-green-700 dark:border-green-400/20 dark:bg-green-900/20 dark:text-green-300">
              <CheckCircle2 className="h-5 w-5 shrink-0" />
              <span className="font-medium">
                {success}
              </span>
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-red-700 dark:border-red-400/20 dark:bg-red-950/30 dark:text-red-300">
              {error}
            </div>
          )}

          <div className="grid gap-5 md:grid-cols-3">

            <PasswordField
              label={t.currentPassword}
              value={currentPassword}
              onChange={setCurrentPassword}
              visible={showCurrent}
              onToggle={() =>
                setShowCurrent((value) => !value)
              }
            />

            <PasswordField
              label={t.newPassword}
              value={newPassword}
              onChange={setNewPassword}
              visible={showNew}
              onToggle={() =>
                setShowNew((value) => !value)
              }
            />

            <PasswordField
              label={t.confirmPassword}
              value={confirmPassword}
              onChange={setConfirmPassword}
              visible={showConfirm}
              onToggle={() =>
                setShowConfirm((value) => !value)
              }
            />
          </div>

          <div className="rounded-xl border border-red-200 bg-white/50 px-4 py-3 text-sm text-red-800/80 dark:border-red-100/10 dark:bg-[#751a28]/50 dark:text-red-100/70">
            {t.securityNote}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={changing}
              className="
                inline-flex items-center justify-center gap-2
                rounded-xl bg-gradient-to-r
                from-red-700 to-red-900
                px-6 py-3
                font-semibold text-white
                shadow-md shadow-red-900/20
                transition-all duration-300
                hover:-translate-y-0.5
                hover:from-red-600 hover:to-red-800
                hover:shadow-xl
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              <KeyRound className="h-4 w-4" />

              {changing
                ? t.changing
                : t.changePassword}
            </button>
          </div>
        </form>
      </section>

      {/* Preferences */}
      <section
        className="
          overflow-hidden rounded-2xl
          border border-red-200/70
          bg-gradient-to-br from-[#ffdfe5] via-[#ffd2da] to-[#ffc4ce]
          shadow-lg shadow-red-900/10
          dark:border-red-300/10
          dark:bg-gradient-to-br
          dark:from-[#68131f]
          dark:via-[#570e18]
          dark:to-[#410810]
        "
      >
        <div className="border-b border-red-300/40 px-6 py-5 dark:border-red-200/10">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-700 text-white shadow-md">
              <Languages className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-red-950 dark:text-white">
                {t.language} & {t.theme}
              </h2>

              <p className="text-sm text-red-800/70 dark:text-red-100/60">
                {t.languageDescription}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">

          {/* Language */}
          <div className="rounded-xl border border-red-200 bg-white/60 p-5 dark:border-red-100/10 dark:bg-[#751a28]/60">
            <div className="mb-4 flex items-center gap-2">
              <Languages className="h-5 w-5 text-red-700 dark:text-red-300" />

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {t.language}
                </h3>

                <p className="text-sm text-gray-600 dark:text-red-100/60">
                  {t.languageDescription}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  ["en", "English"],
                  ["hi", "\u0939\u093f\u0928\u094d\u0926\u0940"],
                  ["gu", "\u0a97\u0ac1\u0a9c\u0ab0\u0abe\u0aa4\u0ac0"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    selectLanguage(value)
                  }
                  className={`
                    rounded-xl border px-3 py-3 text-sm font-semibold
                    transition-all duration-300
                    ${
                      locale === value
                        ? "border-red-700 bg-red-700 text-white shadow-md"
                        : "border-red-200 bg-white/70 text-red-900 hover:-translate-y-0.5 hover:border-red-500 hover:bg-red-50 dark:border-red-100/10 dark:bg-[#64131f] dark:text-red-100 dark:hover:border-red-400 dark:hover:bg-[#841e2d]"
                    }
                  `}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Theme */}
          <div className="rounded-xl border border-red-200 bg-white/60 p-5 dark:border-red-100/10 dark:bg-[#751a28]/60">
            <div className="mb-4 flex items-center gap-2">
              {themeValue === "dark" ? (
                <Moon className="h-5 w-5 text-red-700 dark:text-red-300" />
              ) : (
                <Sun className="h-5 w-5 text-red-700 dark:text-red-300" />
              )}

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {t.theme}
                </h3>

                <p className="text-sm text-gray-600 dark:text-red-100/60">
                  {t.themeDescription}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">

              <button
                type="button"
                onClick={() => setTheme("light")}
                className={`
                  flex items-center justify-center gap-1 rounded-xl border px-3 py-3 text-sm font-semibold
                  transition-all duration-300
                  ${
                    themeValue === "light"
                      ? "border-red-700 bg-red-700 text-white shadow-md"
                      : "border-red-200 bg-white/70 text-red-900 hover:-translate-y-0.5 hover:border-red-500 hover:bg-red-50 dark:border-red-100/10 dark:bg-[#64131f] dark:text-red-100 dark:hover:border-red-400 dark:hover:bg-[#841e2d]"
                  }
                `}
              >
                <Sun className="h-4 w-4" />
                {t.light}
              </button>

              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={`
                  flex items-center justify-center gap-1 rounded-xl border px-3 py-3 text-sm font-semibold
                  transition-all duration-300
                  ${
                    themeValue === "dark"
                      ? "border-red-700 bg-red-700 text-white shadow-md"
                      : "border-red-200 bg-white/70 text-red-900 hover:-translate-y-0.5 hover:border-red-500 hover:bg-red-50 dark:border-red-100/10 dark:bg-[#64131f] dark:text-red-100 dark:hover:border-red-400 dark:hover:bg-[#841e2d]"
                  }
                `}
              >
                <Moon className="h-4 w-4" />
                {t.dark}
              </button>

              <button
                type="button"
                onClick={() => setTheme("system")}
                className={`
                  rounded-xl border px-3 py-3 text-sm font-semibold
                  transition-all duration-300
                  ${
                    themeValue === "system"
                      ? "border-red-700 bg-red-700 text-white shadow-md"
                      : "border-red-200 bg-white/70 text-red-900 hover:-translate-y-0.5 hover:border-red-500 hover:bg-red-50 dark:border-red-100/10 dark:bg-[#64131f] dark:text-red-100 dark:hover:border-red-400 dark:hover:bg-[#841e2d]"
                  }
                `}
              >
                {t.system}
              </button>

            </div>
          </div>
        </div>
      </section>

      {/* Logout */}
      <section
        className="
          rounded-2xl
          border border-red-300/60
          bg-gradient-to-br from-[#ffdfe5] via-[#ffd2da] to-[#ffc4ce]
          p-6
          shadow-lg shadow-red-900/10
          dark:border-red-300/10
          dark:bg-gradient-to-br
          dark:from-[#68131f]
          dark:via-[#570e18]
          dark:to-[#410810]
        "
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-800 text-white">
                <LogOut className="h-5 w-5" />
              </div>

              <h2 className="text-xl font-bold text-red-950 dark:text-white">
                {t.logout}
              </h2>
            </div>

            <p className="mt-2 text-sm text-red-800/70 dark:text-red-100/60">
              {t.logoutDescription}
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              signOut({
                callbackUrl: `/${locale}/login`,
              })
            }
            className="
              inline-flex items-center justify-center gap-2
              rounded-xl border border-red-700
              bg-white/70 px-5 py-3
              font-semibold text-red-800
              transition-all duration-300
              hover:-translate-y-0.5
              hover:bg-red-700
              hover:text-white
              hover:shadow-lg
              dark:border-red-300/30
              dark:bg-[#64131f]
              dark:text-red-100
              dark:hover:bg-red-700
            "
          >
            <LogOut className="h-4 w-4" />
            {t.logoutButton}
          </button>
        </div>
      </section>
    </div>
  );
}

function PasswordField({
  label,
  value,
  onChange,
  visible,
  onToggle,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  visible: boolean;
  onToggle: () => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-red-900 dark:text-red-100">
        {label}
      </label>

      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          autoComplete="new-password"
          className="
            h-12 w-full rounded-xl
            border border-red-200
            bg-white/80
            px-4 pr-12
            text-gray-900
            outline-none
            transition-all duration-300
            placeholder:text-gray-400
            focus:border-red-600
            focus:ring-4
            focus:ring-red-600/10
            dark:border-red-100/10
            dark:bg-[#51101a]
            dark:text-white
            dark:placeholder:text-red-100/40
            dark:focus:border-red-400
            dark:focus:ring-red-400/10
          "
        />

        <button
          type="button"
          onClick={onToggle}
          className="
            absolute right-2 top-1/2
            flex h-8 w-8
            -translate-y-1/2
            items-center justify-center
            rounded-lg
            text-red-700
            transition-colors
            hover:bg-red-100
            dark:text-red-200
            dark:hover:bg-red-900/40
          "
          aria-label={
            visible
              ? "Hide password"
              : "Show password"
          }
        >
          {visible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}