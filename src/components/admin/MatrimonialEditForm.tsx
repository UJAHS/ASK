"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageInput from "@/components/common/ImageInput";

type Locale = "en" | "hi" | "gu";

type Props = {
  locale: Locale;
  profile: any;
};

const labels: Record<Locale, Record<string, string>> = {
  en: {
    title: "Edit Matrimonial Profile",
    subtitle: "Update matrimonial profile information",
    back: "Back to Matrimonial Profiles",

    member: "Member Information",
    memberNumber: "Member Number",
    email: "Email",

    personal: "Personal Information",
    firstName: "First Name",
    lastName: "Last Name",
    gender: "Gender",
    male: "Male",
    female: "Female",
    other: "Other",
    dob: "Date of Birth",
    height: "Height",
    maritalStatus: "Marital Status",
    neverMarried: "Never Married",
    divorced: "Divorced",
    widowed: "Widowed",
    separated: "Separated",

    professional: "Education & Profession",
    education: "Education",
    profession: "Profession",
    occupation: "Occupation",
    company: "Company / Organization",

    location: "Location",
    city: "City",
    state: "State",
    country: "Country",
    pincode: "Pincode",

    community: "Community Information",
    religion: "Religion",
    communityName: "Community",
    subCommunity: "Sub Community",
    gotra: "Gotra",

    family: "Family Information",
    father: "Father Name",
    mother: "Mother Name",
    siblings: "Siblings",
    familyDetails: "Family Details",

    about: "About",
    aboutMe: "About Me",
    expectations: "Partner Expectations",

    settings: "Profile Settings",
    image: "Profile Image URL",
    contact: "Contact Preference",
    adminOnly: "Admin Only",
    membersOnly: "Members Only",
    visibility: "Profile Visibility",
    private: "Private",
    public: "Public",

    status: "Profile Status",
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
    blocked: "Blocked",

    save: "Save Changes",
    saving: "Saving...",
    cancel: "Cancel",
    failed: "Failed to update matrimonial profile.",
    saved: "Profile updated successfully.",
  },

  hi: {
    title: "वैवाहिक प्रोफ़ाइल संपादित करें",
    subtitle: "वैवाहिक प्रोफ़ाइल की जानकारी अपडेट करें",
    back: "वैवाहिक प्रोफ़ाइल पर वापस जाएँ",

    member: "सदस्य जानकारी",
    memberNumber: "सदस्य संख्या",
    email: "ईमेल",

    personal: "व्यक्तिगत जानकारी",
    firstName: "पहला नाम",
    lastName: "अंतिम नाम",
    gender: "लिंग",
    male: "पुरुष",
    female: "महिला",
    other: "अन्य",
    dob: "जन्म तिथि",
    height: "कद",
    maritalStatus: "वैवाहिक स्थिति",
    neverMarried: "कभी विवाहित नहीं",
    divorced: "तलाकशुदा",
    widowed: "विधवा/विधुर",
    separated: "अलग",

    professional: "शिक्षा और व्यवसाय",
    education: "शिक्षा",
    profession: "व्यवसाय",
    occupation: "पेशा",
    company: "कंपनी / संगठन",

    location: "स्थान",
    city: "शहर",
    state: "राज्य",
    country: "देश",
    pincode: "पिनकोड",

    community: "समुदाय की जानकारी",
    religion: "धर्म",
    communityName: "समुदाय",
    subCommunity: "उप-समुदाय",
    gotra: "गोत्र",

    family: "पारिवारिक जानकारी",
    father: "पिता का नाम",
    mother: "माता का नाम",
    siblings: "भाई-बहन",
    familyDetails: "परिवार का विवरण",

    about: "मेरे बारे में",
    aboutMe: "मेरे बारे में",
    expectations: "जीवनसाथी की अपेक्षाएँ",

    settings: "प्रोफ़ाइल सेटिंग्स",
    image: "प्रोफ़ाइल इमेज URL",
    contact: "संपर्क प्राथमिकता",
    adminOnly: "केवल एडमिन",
    membersOnly: "केवल सदस्य",
    visibility: "प्रोफ़ाइल दृश्यता",
    private: "निजी",
    public: "सार्वजनिक",

    status: "प्रोफ़ाइल स्थिति",
    pending: "लंबित",
    approved: "स्वीकृत",
    rejected: "अस्वीकृत",
    blocked: "ब्लॉक",

    save: "परिवर्तन सहेजें",
    saving: "सहेजा जा रहा है...",
    cancel: "रद्द करें",
    failed: "वैवाहिक प्रोफ़ाइल अपडेट करने में विफल।",
    saved: "प्रोफ़ाइल सफलतापूर्वक अपडेट हुई।",
  },

  gu: {
    title: "\u0ab5\u0abf\u0ab5\u0abe\u0ab9 \u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0ab8\u0ac1\u0aa7\u0abe\u0ab0\u0acb",
    subtitle: "\u0ab5\u0abf\u0ab5\u0abe\u0ab9 \u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2\u0aa8\u0ac0 \u0aae\u0abe\u0ab9\u0abf\u0aa4\u0ac0 \u0a85\u0aaa\u0aa1\u0ac7\u0a9f \u0a95\u0ab0\u0acb",
    back: "\u0ab5\u0abf\u0ab5\u0abe\u0ab9 \u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0aaa\u0ab0 \u0aaa\u0abe\u0a9b\u0abe \u0a9c\u0abe\u0a93",

    member: "\u0ab8\u0aad\u0acd\u0aaf\u0aa8\u0ac0 \u0aae\u0abe\u0ab9\u0abf\u0aa4\u0ac0",
    memberNumber: "\u0ab8\u0aad\u0acd\u0aaf \u0aa8\u0a82\u0aac\u0ab0",
    email: "\u0a87\u0aae\u0ac7\u0a87\u0ab2",

    personal: "\u0ab5\u0acd\u0aaf\u0a95\u0acd\u0aa4\u0abf\u0a97\u0aa4 \u0aae\u0abe\u0ab9\u0abf\u0aa4\u0ac0",
    firstName: "\u0aaa\u0acd\u0ab0\u0aa5\u0aae \u0aa8\u0abe\u0aae",
    lastName: "\u0a85\u0a82\u0aa4\u0abf\u0aae \u0aa8\u0abe\u0aae",
    gender: "\u0ab2\u0abf\u0a82\u0a97",
    male: "\u0aaa\u0ac1\u0ab0\u0ac1\u0ab7",
    female: "\u0ab8\u0acd\u0aa4\u0acd\u0ab0\u0ac0",
    other: "\u0a85\u0aa8\u0acd\u0aaf",
    dob: "\u0a9c\u0aa8\u0acd\u0aae \u0aa4\u0abe\u0ab0\u0ac0\u0a96",
    height: "\u0a8a\u0a82\u0a9a\u0abe\u0a88",
    maritalStatus: "\u0ab5\u0ac8\u0ab5\u0abe\u0ab9\u0abf\u0a95 \u0ab8\u0acd\u0aa5\u0abf\u0aa4\u0abf",
    neverMarried: "\u0a95\u0acd\u0aaf\u0abe\u0ab0\u0ac7 \u0aaa\u0aa3 \u0aaa\u0acd\u0ab0\u0aa3\u0ac0\u0aa4 \u0aa8\u0aa5\u0ac0",
    divorced: "\u0a9b\u0ac2\u0a9f\u0abe\u0a9b\u0ac7\u0aa1\u0abe",
    widowed: "\u0ab5\u0abf\u0aa7\u0ab5\u0abe/\u0ab5\u0abf\u0aa7\u0ac1\u0ab0",
    separated: "\u0a85\u0ab2\u0a97",

    professional: "\u0ab6\u0abf\u0a95\u0acd\u0ab7\u0aa3 \u0a85\u0aa8\u0ac7 \u0ab5\u0acd\u0aaf\u0ab5\u0ab8\u0abe\u0aaf",
    education: "\u0ab6\u0abf\u0a95\u0acd\u0ab7\u0aa3",
    profession: "\u0ab5\u0acd\u0aaf\u0ab5\u0ab8\u0abe\u0aaf",
    occupation: "\u0ab5\u0acd\u0aaf\u0ab5\u0ab8\u0abe\u0aaf",
    company: "\u0a95\u0a82\u0aaa\u0aa8\u0ac0 / \u0ab8\u0a82\u0ab8\u0acd\u0aa5\u0abe",

    location: "\u0ab8\u0acd\u0aa5\u0ab3",
    city: "\u0ab6\u0ab9\u0ac7\u0ab0",
    state: "\u0ab0\u0abe\u0a9c\u0acd\u0aaf",
    country: "\u0aa6\u0ac7\u0ab6",
    pincode: "\u0aaa\u0abf\u0aa8\u0a95\u0acb\u0aa1",

    community: "\u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf\u0aa8\u0ac0 \u0aae\u0abe\u0ab9\u0abf\u0aa4\u0ac0",
    religion: "\u0aa7\u0ab0\u0acd\u0aae",
    communityName: "\u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf",
    subCommunity: "\u0aaa\u0ac7\u0a9f\u0abe \u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf",
    gotra: "\u0a97\u0acb\u0aa4\u0acd\u0ab0",

    family: "\u0a95\u0ac1\u0a9f\u0ac1\u0a82\u0aac \u0aae\u0abe\u0ab9\u0abf\u0aa4\u0ac0",
    father: "\u0aaa\u0abf\u0aa4\u0abe\u0aa8\u0ac1\u0a82 \u0aa8\u0abe\u0aae",
    mother: "\u0aae\u0abe\u0aa4\u0abe\u0aa8\u0ac1\u0a82 \u0aa8\u0abe\u0aae",
    siblings: "\u0aad\u0abe\u0a88-\u0aac\u0ab9\u0ac7\u0aa8",
    familyDetails: "\u0a95\u0ac1\u0a9f\u0ac1\u0a82\u0aac\u0aa8\u0ac0 \u0ab5\u0abf\u0a97\u0aa4",

    about: "\u0aae\u0abe\u0ab0\u0abe \u0ab5\u0abf\u0ab6\u0ac7",
    aboutMe: "\u0aae\u0abe\u0ab0\u0abe \u0ab5\u0abf\u0ab6\u0ac7",
    expectations: "\u0a9c\u0ac0\u0ab5\u0aa8\u0ab8\u0abe\u0aa5\u0ac0\u0aa8\u0ac0 \u0a85\u0aaa\u0ac7\u0a95\u0acd\u0ab7\u0abe\u0a93",

    settings: "\u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0ab8\u0ac7\u0a9f\u0abf\u0a82\u0a97\u0acd\u0ab8",
    image: "\u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0a87\u0aae\u0ac7\u0a9c URL",
    contact: "\u0ab8\u0a82\u0aaa\u0ab0\u0acd\u0a95 \u0aaa\u0acd\u0ab8\u0a82\u0aa6\u0a97\u0ac0",
    adminOnly: "\u0aae\u0abe\u0aa4\u0acd\u0ab0 \u0a8f\u0aa1\u0acd\u0aae\u0abf\u0aa8",
    membersOnly: "\u0aae\u0abe\u0aa4\u0acd\u0ab0 \u0ab8\u0aad\u0acd\u0aaf\u0acb",
    visibility: "\u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0aa6\u0ac3\u0ab6\u0acd\u0aaf\u0aa4\u0abe",
    private: "\u0a96\u0abe\u0aa8\u0a97\u0ac0",
    public: "\u0a9c\u0abe\u0ab9\u0ac7\u0ab0",

    status: "\u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0ab8\u0acd\u0aa5\u0abf\u0aa4\u0abf",
    pending: "\u0aac\u0abe\u0a95\u0ac0",
    approved: "\u0aae\u0a82\u0a9c\u0ac2\u0ab0",
    rejected: "\u0aa8\u0abe\u0a95\u0abe\u0ab0\u0ac7\u0ab2",
    blocked: "\u0aac\u0acd\u0ab2\u0acb\u0a95",

    save: "\u0aac\u0aa6\u0ab2\u0abe\u0ab5 \u0ab8\u0abe\u0a9a\u0ab5\u0acb",
    saving: "\u0ab8\u0abe\u0a9a\u0ab5\u0abe\u0a88 \u0ab0\u0ab9\u0acd\u0aaf\u0ac1\u0a82 \u0a9b\u0ac7...",
    cancel: "\u0ab0\u0aa6 \u0a95\u0ab0\u0acb",
    failed: "\u0ab5\u0abf\u0ab5\u0abe\u0ab9 \u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0a85\u0aaa\u0aa1\u0ac7\u0a9f \u0a95\u0ab0\u0ab5\u0abe\u0aae\u0abe\u0a82 \u0aa8\u0abf\u0ab7\u0acd\u0aab\u0ab3.",
    saved: "\u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0ab8\u0aab\u0ab3\u0aa4\u0abe\u0aaa\u0ac2\u0ab0\u0acd\u0ab5\u0a95 \u0a85\u0aaa\u0aa1\u0ac7\u0a9f \u0aa5\u0a88.",
  },
};

export default function MatrimonialEditForm({
  locale,
  profile,
}: Props) {
  const router = useRouter();
  const t = labels[locale];

  const [firstName, setFirstName] = useState(profile.firstName || "");
  const [lastName, setLastName] = useState(profile.lastName || "");
  const [gender, setGender] = useState(profile.gender || "MALE");

  const [dateOfBirth, setDateOfBirth] = useState(
    profile.dateOfBirth
      ? new Date(profile.dateOfBirth)
          .toISOString()
          .slice(0, 10)
      : ""
  );

  const [height, setHeight] = useState(profile.height || "");
  const [maritalStatus, setMaritalStatus] = useState(
    profile.maritalStatus || "NEVER_MARRIED"
  );

  const [education, setEducation] = useState(profile.education || "");
  const [profession, setProfession] = useState(profile.profession || "");
  const [occupation, setOccupation] = useState(profile.occupation || "");
  const [company, setCompany] = useState(profile.company || "");

  const [city, setCity] = useState(profile.city || "");
  const [state, setState] = useState(profile.state || "");
  const [country, setCountry] = useState(profile.country || "India");
  const [pincode, setPincode] = useState(profile.pincode || "");

  const [religion, setReligion] = useState(profile.religion || "");
  const [community, setCommunity] = useState(profile.community || "");
  const [subCommunity, setSubCommunity] = useState(profile.subCommunity || "");
  const [gotra, setGotra] = useState(profile.gotra || "");

  const [fatherName, setFatherName] = useState(profile.fatherName || "");
  const [motherName, setMotherName] = useState(profile.motherName || "");
  const [siblings, setSiblings] = useState(profile.siblings || "");
  const [familyDetails, setFamilyDetails] = useState(
    profile.familyDetails || ""
  );

  const [aboutMe, setAboutMe] = useState(profile.aboutMe || "");
  const [partnerExpectation, setPartnerExpectation] = useState(
    profile.partnerExpectation || ""
  );

  const [profileImage, setProfileImage] = useState(
    profile.profileImage || ""
  );

  const [contactPreference, setContactPreference] = useState(
    profile.contactPreference || "ADMIN_ONLY"
  );

  const [profileVisibility, setProfileVisibility] = useState(
    profile.profileVisibility || "PRIVATE"
  );

  const [status, setStatus] = useState(
    profile.status || "PENDING"
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!firstName || !gender) {
      setError("First Name and Gender are required.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        `/api/admin/matrimonial/${profile.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            gender,
            dateOfBirth: dateOfBirth || null,
            height,
            maritalStatus,
            education,
            profession,
            occupation,
            company,
            city,
            state,
            country,
            pincode,
            religion,
            community,
            subCommunity,
            gotra,
            fatherName,
            motherName,
            siblings,
            familyDetails,
            aboutMe,
            partnerExpectation,
            profileImage,
            contactPreference,
            profileVisibility,
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || t.failed);
      }

      setSuccess(t.saved);

      setTimeout(() => {
        router.push(`/${locale}/admin/matrimonial`);
        router.refresh();
      }, 700);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : t.failed
      );
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-red-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white";

  const labelClass =
    "mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300";

  const memberProfile = profile.user?.memberProfile;

  const memberName = [
    memberProfile?.firstName,
    memberProfile?.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="min-h-screen bg-slate-50 p-4 dark:bg-slate-950 sm:p-6">
      <div className="mx-auto max-w-6xl">

        <div className="mb-6">
          <Link
            href={`/${locale}/admin/matrimonial`}
            className="text-sm font-medium text-red-600 hover:text-red-700"
          >
            ← {t.back}
          </Link>

          <h1 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
            {t.title}
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {t.subtitle}
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 dark:border-green-900/50 dark:bg-green-950/30 dark:text-green-400">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          <Section title={t.member}>
            <Info label={t.memberNumber}>
              #{profile.user?.memberNumber ?? "-"}
            </Info>

            <Info label={t.email}>
              {profile.user?.email || "-"}
            </Info>

            <Info label={t.firstName}>
              {memberName || "-"}
            </Info>

            <Info label={t.status}>
              {profile.user?.status || "-"}
            </Info>
          </Section>

          <Section title={t.personal}>
            <Field label={t.firstName} required>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={inputClass}
                required
              />
            </Field>

            <Field label={t.lastName}>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label={t.gender} required>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className={inputClass}
              >
                <option value="MALE">{t.male}</option>
                <option value="FEMALE">{t.female}</option>
                <option value="OTHER">{t.other}</option>
              </select>
            </Field>

            <Field label={t.dob}>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label={t.height}>
              <input
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label={t.maritalStatus}>
              <select
                value={maritalStatus}
                onChange={(e) =>
                  setMaritalStatus(e.target.value)
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
            </Field>
          </Section>

          <Section title={t.professional}>
            <Field label={t.education}>
              <input
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label={t.profession}>
              <input
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label={t.occupation}>
              <input
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label={t.company}>
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className={inputClass}
              />
            </Field>
          </Section>

          <Section title={t.location}>
            <Field label={t.city}>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label={t.state}>
              <input
                value={state}
                onChange={(e) => setState(e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label={t.country}>
              <input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label={t.pincode}>
              <input
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className={inputClass}
              />
            </Field>
          </Section>

          <Section title={t.community}>
            <Field label={t.religion}>
              <input
                value={religion}
                onChange={(e) => setReligion(e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label={t.communityName}>
              <input
                value={community}
                onChange={(e) => setCommunity(e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label={t.subCommunity}>
              <input
                value={subCommunity}
                onChange={(e) => setSubCommunity(e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label={t.gotra}>
              <input
                value={gotra}
                onChange={(e) => setGotra(e.target.value)}
                className={inputClass}
              />
            </Field>
          </Section>

          <Section title={t.family}>
            <Field label={t.father}>
              <input
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label={t.mother}>
              <input
                value={motherName}
                onChange={(e) => setMotherName(e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label={t.siblings}>
              <input
                value={siblings}
                onChange={(e) => setSiblings(e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label={t.familyDetails} full>
              <textarea
                value={familyDetails}
                onChange={(e) =>
                  setFamilyDetails(e.target.value)
                }
                rows={4}
                className={inputClass}
              />
            </Field>
          </Section>

          <Section title={t.about}>
            <Field label={t.aboutMe} full>
              <textarea
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
                rows={5}
                className={inputClass}
              />
            </Field>

            <Field label={t.expectations} full>
              <textarea
                value={partnerExpectation}
                onChange={(e) =>
                  setPartnerExpectation(e.target.value)
                }
                rows={5}
                className={inputClass}
              />
            </Field>
          </Section>

          <Section title={t.settings}>
            <div className="md:col-span-2">
              <ImageInput
                locale={locale}
                value={profileImage}
                onChange={setProfileImage}
                label={t.image}
                maxSizeMB={5}
              />
            </div>

            <Field label={t.contact}>
              <select
                value={contactPreference}
                onChange={(e) =>
                  setContactPreference(e.target.value)
                }
                className={inputClass}
              >
                <option value="ADMIN_ONLY">
                  {t.adminOnly}
                </option>
                <option value="MEMBERS_ONLY">
                  {t.membersOnly}
                </option>
              </select>
            </Field>

            <Field label={t.visibility}>
              <select
                value={profileVisibility}
                onChange={(e) =>
                  setProfileVisibility(e.target.value)
                }
                className={inputClass}
              >
                <option value="PRIVATE">{t.private}</option>
                <option value="MEMBERS_ONLY">
                  {t.membersOnly}
                </option>
                <option value="PUBLIC">{t.public}</option>
              </select>
            </Field>

            <Field label={t.status}>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={inputClass}
              >
                <option value="PENDING">{t.pending}</option>
                <option value="APPROVED">{t.approved}</option>
                <option value="REJECTED">{t.rejected}</option>
                <option value="BLOCKED">{t.blocked}</option>
              </select>
            </Field>
          </Section>

          <div className="flex justify-end gap-3 border-t border-slate-200 pt-6 dark:border-slate-800">
            <Link
              href={`/${locale}/admin/matrimonial`}
              className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {t.cancel}
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-red-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? t.saving : t.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <h2 className="mb-5 border-b border-slate-200 pb-3 text-lg font-bold text-slate-900 dark:border-slate-800 dark:text-white">
        {title}
      </h2>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {children}
      </div>
    </section>
  );
}

function Field({
  label,
  children,
  required = false,
  full = false,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  full?: boolean;
}) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
        {required && " *"}
      </label>

      {children}
    </div>
  );
}

function Info({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </p>

      <p className="rounded-lg bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-900 dark:bg-slate-950 dark:text-white">
        {children}
      </p>
    </div>
  );
}