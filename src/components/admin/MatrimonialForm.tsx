"use client";

import Link from "next/link";
import { useState } from "react";
import ImageInput from "@/components/common/ImageInput";
import { useRouter } from "next/navigation";

type Locale = "en" | "hi" | "gu";

type Member = {
  id: string;
  email: string;
  memberNumber: number;
  memberProfile: {
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
    city: string | null;
    state: string | null;
    profileImage: string | null;
  } | null;
};

type Props = {
  locale: Locale;
  members: Member[];
  dictionary: any;
};

const labels: Record<
  Locale,
  Record<string, string>
> = {
  en: {
    title: "Add Matrimonial Profile",
    subtitle: "Create a matrimonial profile for an approved community member",
    member: "Select Member",
    selectMember: "Select a member",
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
    profile: "Profile Settings",
    image: "Profile Image",
    contact: "Contact Preference",
    adminOnly: "Admin Only",
    membersOnly: "Members Only",
    visibility: "Profile Visibility",
    private: "Private",
    public: "Public",
    save: "Create Profile",
    cancel: "Cancel",
    saving: "Creating...",
    required: "Please select a member and fill all required fields.",
    failed: "Failed to create matrimonial profile.",
    back: "Back to Matrimonial Profiles",
  },

  hi: {
    title: "वैवाहिक प्रोफ़ाइल जोड़ें",
    subtitle: "स्वीकृत सामुदायिक सदस्य के लिए वैवाहिक प्रोफ़ाइल बनाएँ",
    member: "सदस्य चुनें",
    selectMember: "सदस्य चुनें",
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
    profile: "प्रोफ़ाइल सेटिंग्स",
    image: "प्रोफ़ाइल इमेज",
    contact: "संपर्क प्राथमिकता",
    adminOnly: "केवल एडमिन",
    membersOnly: "केवल सदस्य",
    visibility: "प्रोफ़ाइल दृश्यता",
    private: "निजी",
    public: "सार्वजनिक",
    save: "प्रोफ़ाइल बनाएँ",
    cancel: "रद्द करें",
    saving: "बनाया जा रहा है...",
    required: "कृपया सदस्य चुनें और सभी आवश्यक फ़ील्ड भरें।",
    failed: "वैवाहिक प्रोफ़ाइल बनाने में विफल।",
    back: "वैवाहिक प्रोफ़ाइल पर वापस जाएँ",
  },

  gu: {
    title: "\u0ab5\u0abf\u0ab5\u0abe\u0ab9 \u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0a89\u0aae\u0ac7\u0ab0\u0acb",
    subtitle: "\u0aae\u0a82\u0a9c\u0ac2\u0ab0 \u0ab8\u0aae\u0ac1\u0aa6\u0abe\u0aaf\u0abf\u0a95 \u0ab8\u0aad\u0acd\u0aaf \u0aae\u0abe\u0a9f\u0ac7 \u0ab5\u0abf\u0ab5\u0abe\u0ab9 \u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0aac\u0aa8\u0abe\u0ab5\u0acb",
    member: "\u0ab8\u0aad\u0acd\u0aaf \u0aaa\u0ab8\u0a82\u0aa6 \u0a95\u0ab0\u0acb",
    selectMember: "\u0ab8\u0aad\u0acd\u0aaf \u0aaa\u0ab8\u0a82\u0aa6 \u0a95\u0ab0\u0acb",
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
    profile: "\u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0ab8\u0ac7\u0a9f\u0abf\u0a82\u0a97\u0acd\u0ab8",
    image: "\u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0a87\u0aae\u0ac7\u0a9c",
    contact: "\u0ab8\u0a82\u0aaa\u0ab0\u0acd\u0a95 \u0aaa\u0acd\u0ab8\u0a82\u0aa6\u0a97\u0ac0",
    adminOnly: "\u0aae\u0abe\u0aa4\u0acd\u0ab0 \u0a8f\u0aa1\u0acd\u0aae\u0abf\u0aa8",
    membersOnly: "\u0aae\u0abe\u0aa4\u0acd\u0ab0 \u0ab8\u0aad\u0acd\u0aaf\u0acb",
    visibility: "\u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0aa6\u0ac3\u0ab6\u0acd\u0aaf\u0aa4\u0abe",
    private: "\u0a96\u0abe\u0aa8\u0a97\u0ac0",
    public: "\u0a9c\u0abe\u0ab9\u0ac7\u0ab0",
    save: "\u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0aac\u0aa8\u0abe\u0ab5\u0acb",
    cancel: "\u0ab0\u0aa6 \u0a95\u0ab0\u0acb",
    saving: "\u0aac\u0aa8\u0abe\u0ab5\u0ac0 \u0ab0\u0ab9\u0acd\u0aaf\u0ac1\u0a82 \u0a9b\u0ac7...",
    required: "\u0a95\u0ac3\u0aaa\u0abe \u0ab8\u0aad\u0acd\u0aaf \u0aaa\u0ab8\u0a82\u0aa6 \u0a95\u0ab0\u0acb \u0a85\u0aa8\u0ac7 \u0aac\u0aa7\u0abe \u0aab\u0ab0\u0a9c\u0abf\u0aaf\u0abe\u0aa4 \u0aab\u0ac0\u0ab2\u0acd\u0aa1 \u0aad\u0ab0\u0acb.",
    failed: "\u0ab5\u0abf\u0ab5\u0abe\u0ab9 \u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0aac\u0aa8\u0abe\u0ab5\u0ab5\u0abe\u0aae\u0abe\u0a82 \u0aa8\u0abf\u0ab7\u0acd\u0aab\u0ab3.",
    back: "\u0ab5\u0abf\u0ab5\u0abe\u0ab9 \u0aaa\u0acd\u0ab0\u0acb\u0aab\u0abe\u0a87\u0ab2 \u0aaa\u0ab0 \u0aaa\u0abe\u0a9b\u0abe \u0a9c\u0abe\u0a93",
  },
};

export default function MatrimonialForm({
  locale,
  members,
}: Props) {
  const router = useRouter();
  const t = labels[locale];

  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("MALE");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [height, setHeight] = useState("");
  const [maritalStatus, setMaritalStatus] =
    useState("NEVER_MARRIED");

  const [education, setEducation] = useState("");
  const [profession, setProfession] = useState("");
  const [occupation, setOccupation] = useState("");
  const [company, setCompany] = useState("");

  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("India");
  const [pincode, setPincode] = useState("");

  const [religion, setReligion] = useState("");
  const [community, setCommunity] = useState("");
  const [subCommunity, setSubCommunity] = useState("");
  const [gotra, setGotra] = useState("");

  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [siblings, setSiblings] = useState("");
  const [familyDetails, setFamilyDetails] = useState("");

  const [aboutMe, setAboutMe] = useState("");
  const [partnerExpectation, setPartnerExpectation] =
    useState("");

  const [profileImage, setProfileImage] = useState("");
  const [contactPreference, setContactPreference] =
    useState("ADMIN_ONLY");
  const [profileVisibility, setProfileVisibility] =
    useState("PRIVATE");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleMemberChange(id: string) {
    setUserId(id);

    const member = members.find((item) => item.id === id);

    if (!member) return;

    const profile = member.memberProfile;

    if (!profile) return;

    setFirstName(profile.firstName || "");
    setLastName(profile.lastName || "");
    setCity(profile.city || "");
    setState(profile.state || "");
    setProfileImage(profile.profileImage || "");
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (!userId || !firstName || !gender) {
      setError(t.required);
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        "/api/admin/matrimonial",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
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
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t.failed);
      }

      router.push(`/${locale}/admin/matrimonial`);
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : t.failed
      );
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-red-200 bg-white/90 px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/10 dark:border-red-900/80 dark:bg-[#64131f] dark:text-white dark:focus:border-red-500";

  const labelClass =
    "mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300";

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="mx-auto max-w-6xl">

        <div className="mb-6">
          <Link
            href={`/${locale}/admin/matrimonial`}
            className="text-sm font-semibold text-red-700 transition hover:text-red-900 dark:text-red-300 dark:hover:text-white"
          >
            ← {t.back}
          </Link>

          <h1 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
            {t.title}
          </h1>

          <p className="mt-1 text-sm text-slate-600 dark:text-red-100/75">
            {t.subtitle}
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          <Section title={t.member}>
            <div className="md:col-span-2">
              <label className={labelClass}>
                {t.selectMember} *
              </label>

              <select
                value={userId}
                onChange={(event) =>
                  handleMemberChange(event.target.value)
                }
                className={inputClass}
                required
              >
                <option value="">
                  {t.selectMember}
                </option>

                {members.map((member) => {
                  const profile = member.memberProfile;

                  const name = [
                    profile?.firstName,
                    profile?.lastName,
                  ]
                    .filter(Boolean)
                    .join(" ");

                  return (
                    <option key={member.id} value={member.id}>
                      #{member.memberNumber} —{" "}
                      {name || member.email} —{" "}
                      {member.email}
                    </option>
                  );
                })}
              </select>
            </div>
          </Section>

          <Section title={t.personal}>
            <Field label={t.firstName} required>
              <input
                value={firstName}
                onChange={(event) =>
                  setFirstName(event.target.value)
                }
                className={inputClass}
                required
              />
            </Field>

            <Field label={t.lastName}>
              <input
                value={lastName}
                onChange={(event) =>
                  setLastName(event.target.value)
                }
                className={inputClass}
              />
            </Field>

            <Field label={t.gender} required>
              <select
                value={gender}
                onChange={(event) =>
                  setGender(event.target.value)
                }
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
                onChange={(event) =>
                  setDateOfBirth(event.target.value)
                }
                className={inputClass}
              />
            </Field>

            <Field label={t.height}>
              <input
                value={height}
                onChange={(event) =>
                  setHeight(event.target.value)
                }
                placeholder="e.g. 5'8&quot;"
                className={inputClass}
              />
            </Field>

            <Field label={t.maritalStatus}>
              <select
                value={maritalStatus}
                onChange={(event) =>
                  setMaritalStatus(event.target.value)
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
                onChange={(event) =>
                  setEducation(event.target.value)
                }
                className={inputClass}
              />
            </Field>

            <Field label={t.profession}>
              <input
                value={profession}
                onChange={(event) =>
                  setProfession(event.target.value)
                }
                className={inputClass}
              />
            </Field>

            <Field label={t.occupation}>
              <input
                value={occupation}
                onChange={(event) =>
                  setOccupation(event.target.value)
                }
                className={inputClass}
              />
            </Field>

            <Field label={t.company}>
              <input
                value={company}
                onChange={(event) =>
                  setCompany(event.target.value)
                }
                className={inputClass}
              />
            </Field>
          </Section>

          <Section title={t.location}>
            <Field label={t.city}>
              <input
                value={city}
                onChange={(event) =>
                  setCity(event.target.value)
                }
                className={inputClass}
              />
            </Field>

            <Field label={t.state}>
              <input
                value={state}
                onChange={(event) =>
                  setState(event.target.value)
                }
                className={inputClass}
              />
            </Field>

            <Field label={t.country}>
              <input
                value={country}
                onChange={(event) =>
                  setCountry(event.target.value)
                }
                className={inputClass}
              />
            </Field>

            <Field label={t.pincode}>
              <input
                value={pincode}
                onChange={(event) =>
                  setPincode(event.target.value)
                }
                className={inputClass}
              />
            </Field>
          </Section>

          <Section title={t.community}>
            <Field label={t.religion}>
              <input
                value={religion}
                onChange={(event) =>
                  setReligion(event.target.value)
                }
                className={inputClass}
              />
            </Field>

            <Field label={t.communityName}>
              <input
                value={community}
                onChange={(event) =>
                  setCommunity(event.target.value)
                }
                className={inputClass}
              />
            </Field>

            <Field label={t.subCommunity}>
              <input
                value={subCommunity}
                onChange={(event) =>
                  setSubCommunity(event.target.value)
                }
                className={inputClass}
              />
            </Field>

            <Field label={t.gotra}>
              <input
                value={gotra}
                onChange={(event) =>
                  setGotra(event.target.value)
                }
                className={inputClass}
              />
            </Field>
          </Section>

          <Section title={t.family}>
            <Field label={t.father}>
              <input
                value={fatherName}
                onChange={(event) =>
                  setFatherName(event.target.value)
                }
                className={inputClass}
              />
            </Field>

            <Field label={t.mother}>
              <input
                value={motherName}
                onChange={(event) =>
                  setMotherName(event.target.value)
                }
                className={inputClass}
              />
            </Field>

            <Field label={t.siblings}>
              <input
                value={siblings}
                onChange={(event) =>
                  setSiblings(event.target.value)
                }
                className={inputClass}
              />
            </Field>

            <Field label={t.familyDetails} full>
              <textarea
                value={familyDetails}
                onChange={(event) =>
                  setFamilyDetails(event.target.value)
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
                onChange={(event) =>
                  setAboutMe(event.target.value)
                }
                rows={5}
                className={inputClass}
              />
            </Field>

            <Field label={t.expectations} full>
              <textarea
                value={partnerExpectation}
                onChange={(event) =>
                  setPartnerExpectation(event.target.value)
                }
                rows={5}
                className={inputClass}
              />
            </Field>
          </Section>

          <Section title={t.profile}>
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
                onChange={(event) =>
                  setContactPreference(event.target.value)
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
                onChange={(event) =>
                  setProfileVisibility(event.target.value)
                }
                className={inputClass}
              >
                <option value="PRIVATE">
                  {t.private}
                </option>
                <option value="MEMBERS_ONLY">
                  {t.membersOnly}
                </option>
                <option value="PUBLIC">
                  {t.public}
                </option>
              </select>
            </Field>
          </Section>

          <div className="flex justify-end gap-3 border-t border-red-200 pt-6 dark:border-red-900/70">
            <Link
              href={`/${locale}/admin/matrimonial`}
              className="rounded-xl border border-red-200 bg-white/50 px-5 py-2.5 text-sm font-semibold text-red-800 transition hover:bg-white dark:border-red-900 dark:bg-transparent dark:text-red-50 dark:hover:bg-red-900/40"
            >
              {t.cancel}
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-red-700 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-950/20 transition hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
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
    <section className="rounded-2xl border border-red-200/80 bg-gradient-to-br from-[#fff0f2] via-[#ffe0e5] to-[#ffd0d8] p-5 shadow-xl shadow-red-950/10 dark:border-red-900/80 dark:bg-gradient-to-br dark:from-[#751a28] dark:via-[#64131f] dark:to-[#51101a] sm:p-6">
      <h2 className="mb-5 border-b border-red-200 pb-3 text-lg font-bold text-slate-900 dark:border-red-900/70 dark:text-white">
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
      <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-red-50/90">
        {label}
        {required && " *"}
      </label>

      {children}
    </div>
  );
}