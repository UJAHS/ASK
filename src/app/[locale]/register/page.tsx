"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

type Locale = "en" | "hi" | "gu";

const translations = {
  en: {
    title: "Ahhichatra Sanskar Kendra",
    subtitle: "Community Member Registration",

    basicInformation: "Basic Information",
    addressInformation: "Address Information",
    accountSecurity: "Account Security",

    firstName: "First Name",
    lastName: "Last Name",
    email: "Email Address",
    phone: "Phone Number",
    gender: "Gender",
    dateOfBirth: "Date of Birth",
    address: "Address",
    city: "City",
    state: "State",
    country: "Country",
    pincode: "Pincode",

    firstNamePlaceholder: "Enter first name",
    lastNamePlaceholder: "Enter last name",
    emailPlaceholder: "Enter email address",
    phonePlaceholder: "Enter phone number",
    genderPlaceholder: "Select gender",
    addressPlaceholder: "Enter your address",
    cityPlaceholder: "City",
    statePlaceholder: "State",
    countryPlaceholder: "Country",
    pincodePlaceholder: "Pincode",

    male: "Male",
    female: "Female",
    other: "Other",

    password: "Password",
    confirmPassword: "Confirm Password",
    passwordPlaceholder: "Minimum 8 characters",
    confirmPasswordPlaceholder: "Confirm your password",

    passwordMismatch: "Passwords do not match.",
    passwordLength: "Password must be at least 8 characters long.",
    registrationFailed:
      "Registration failed. Please try again.",
    registrationSuccess:
      "Registration successful. Your account is pending approval.",
    genericError:
      "Something went wrong. Please try again.",

    creatingAccount: "Creating Account...",
    createAccount: "Create Account",

    alreadyAccount: "Already have an account?",
    signIn: "Sign In",

    approvalNotice:
      "Your registration will be reviewed before your account is approved.",
  },

  hi: {
    title: "अहिच्छत्र संस्कार केंद्र",
    subtitle: "सामुदायिक सदस्य पंजीकरण",

    basicInformation: "मूल जानकारी",
    addressInformation: "पता संबंधी जानकारी",
    accountSecurity: "खाता सुरक्षा",

    firstName: "पहला नाम",
    lastName: "उपनाम",
    email: "ईमेल पता",
    phone: "फोन नंबर",
    gender: "लिंग",
    dateOfBirth: "जन्म तिथि",
    address: "पता",
    city: "शहर",
    state: "राज्य",
    country: "देश",
    pincode: "पिनकोड",

    firstNamePlaceholder: "पहला नाम दर्ज करें",
    lastNamePlaceholder: "उपनाम दर्ज करें",
    emailPlaceholder: "ईमेल पता दर्ज करें",
    phonePlaceholder: "फोन नंबर दर्ज करें",
    genderPlaceholder: "लिंग चुनें",
    addressPlaceholder: "अपना पता दर्ज करें",
    cityPlaceholder: "शहर",
    statePlaceholder: "राज्य",
    countryPlaceholder: "देश",
    pincodePlaceholder: "पिनकोड",

    male: "पुरुष",
    female: "महिला",
    other: "अन्य",

    password: "पासवर्ड",
    confirmPassword: "पासवर्ड की पुष्टि करें",
    passwordPlaceholder: "न्यूनतम 8 अक्षर",
    confirmPasswordPlaceholder: "अपना पासवर्ड दोबारा दर्ज करें",

    passwordMismatch: "पासवर्ड मेल नहीं खाते हैं।",
    passwordLength:
      "पासवर्ड कम से कम 8 अक्षरों का होना चाहिए।",
    registrationFailed:
      "पंजीकरण विफल हुआ। कृपया पुनः प्रयास करें।",
    registrationSuccess:
      "पंजीकरण सफल हुआ। आपका खाता अनुमोदन के लिए लंबित है।",
    genericError:
      "कुछ गलत हो गया। कृपया पुनः प्रयास करें।",

    creatingAccount: "खाता बनाया जा रहा है...",
    createAccount: "खाता बनाएं",

    alreadyAccount: "क्या आपके पास पहले से खाता है?",
    signIn: "लॉगिन करें",

    approvalNotice:
      "आपके खाते को अनुमोदित करने से पहले आपके पंजीकरण की समीक्षा की जाएगी।",
  },

  gu: {
    title: "અહિચ્છત્ર સંસ્કાર કેન્દ્ર",
    subtitle: "સમુદાય સભ્ય રજીસ્ટ્રેશન",

    basicInformation: "મૂળભૂત માહિતી",
    addressInformation: "સરનામાની માહિતી",
    accountSecurity: "એકાઉન્ટ સુરક્ષા",

    firstName: "પ્રથમ નામ",
    lastName: "અટક",
    email: "ઇમેઇલ સરનામું",
    phone: "ફોન નંબર",
    gender: "લિંગ",
    dateOfBirth: "જન્મ તારીખ",
    address: "સરનામું",
    city: "શહેર",
    state: "રાજ્ય",
    country: "દેશ",
    pincode: "પિનકોડ",

    firstNamePlaceholder: "પ્રથમ નામ દાખલ કરો",
    lastNamePlaceholder: "અટક દાખલ કરો",
    emailPlaceholder: "ઇમેઇલ સરનામું દાખલ કરો",
    phonePlaceholder: "ફોન નંબર દાખલ કરો",
    genderPlaceholder: "લિંગ પસંદ કરો",
    addressPlaceholder: "તમારું સરનામું દાખલ કરો",
    cityPlaceholder: "શહેર",
    statePlaceholder: "રાજ્ય",
    countryPlaceholder: "દેશ",
    pincodePlaceholder: "પિનકોડ",

    male: "પુરુષ",
    female: "સ્ત્રી",
    other: "અન્ય",

    password: "પાસવર્ડ",
    confirmPassword: "પાસવર્ડની પુષ્ટિ કરો",
    passwordPlaceholder: "ઓછામાં ઓછા 8 અક્ષરો",
    confirmPasswordPlaceholder:
      "તમારો પાસવર્ડ ફરીથી દાખલ કરો",

    passwordMismatch: "પાસવર્ડ મેળ ખાતા નથી.",
    passwordLength:
      "પાસવર્ડ ઓછામાં ઓછો 8 અક્ષરોનો હોવો જોઈએ.",
    registrationFailed:
      "રજીસ્ટ્રેશન નિષ્ફળ થયું. કૃપા કરીને ફરી પ્રયાસ કરો.",
    registrationSuccess:
      "રજીસ્ટ્રેશન સફળ થયું. તમારું એકાઉન્ટ મંજૂરી માટે પેન્ડિંગ છે.",
    genericError:
      "કંઈક ખોટું થયું. કૃપા કરીને ફરી પ્રયાસ કરો.",

    creatingAccount: "એકાઉન્ટ બનાવવામાં આવી રહ્યું છે...",
    createAccount: "એકાઉન્ટ બનાવો",

    alreadyAccount: "શું તમારી પાસે પહેલેથી એકાઉન્ટ છે?",
    signIn: "લૉગિન કરો",

    approvalNotice:
      "તમારું એકાઉન્ટ મંજૂર થાય તે પહેલાં તમારા રજીસ્ટ્રેશનની સમીક્ષા કરવામાં આવશે.",
  },
} as const;

function normalizeLocale(value: string): Locale {
  if (value === "hi") {
    return "hi";
  }

  if (value === "gu") {
    return "gu";
  }

  return "en";
}

export default function RegisterPage() {
  const router = useRouter();
  const params = useParams<{ locale: string }>();

  const locale = normalizeLocale(params?.locale || "en");
  const t = translations[locale];

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function updateField(
    field: keyof typeof form,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      setError(t.passwordMismatch);
      return;
    }

    if (form.password.length < 8) {
      setError(t.passwordLength);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
          phone: form.phone,
          gender: form.gender,
          dateOfBirth: form.dateOfBirth,
          address: form.address,
          city: form.city,
          state: form.state,
          country: form.country,
          pincode: form.pincode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data?.message || t.registrationFailed
        );
        setLoading(false);
        return;
      }

      setSuccess(
        data?.message || t.registrationSuccess
      );

      setTimeout(() => {
        router.push(`/${locale}/login`);
      }, 1800);
    } catch (error) {
      console.error("Registration error:", error);

      setError(t.genericError);
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10 dark:bg-[#3b0710]">
      <div className="mx-auto w-full max-w-4xl">
        <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-8 dark:bg-[#64131f]">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-red-800 dark:text-red-100">
              {t.title}
            </h1>

            <p className="mt-2 text-gray-600 dark:text-red-100/80">
              {t.subtitle}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <section>
              <h2 className="mb-4 border-b border-gray-200 pb-2 text-lg font-semibold text-gray-900 dark:border-red-300/20 dark:text-red-50">
                {t.basicInformation}
              </h2>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-sm font-semibold text-gray-700 dark:text-red-50"
                  >
                    {t.firstName} *
                  </label>

                  <input
                    id="firstName"
                    type="text"
                    value={form.firstName}
                    onChange={(e) =>
                      updateField(
                        "firstName",
                        e.target.value
                      )
                    }
                    placeholder={t.firstNamePlaceholder}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-red-700 focus:ring-2 focus:ring-red-100 dark:border-red-300/30 dark:bg-[#51101a] dark:text-white dark:placeholder:text-red-100/50 dark:focus:border-red-300 dark:focus:ring-red-300/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-sm font-semibold text-gray-700 dark:text-red-50"
                  >
                    {t.lastName} *
                  </label>

                  <input
                    id="lastName"
                    type="text"
                    value={form.lastName}
                    onChange={(e) =>
                      updateField(
                        "lastName",
                        e.target.value
                      )
                    }
                    placeholder={t.lastNamePlaceholder}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-red-700 focus:ring-2 focus:ring-red-100 dark:border-red-300/30 dark:bg-[#51101a] dark:text-white dark:placeholder:text-red-100/50 dark:focus:border-red-300 dark:focus:ring-red-300/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-gray-700 dark:text-red-50"
                  >
                    {t.email} *
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      updateField(
                        "email",
                        e.target.value
                      )
                    }
                    placeholder={t.emailPlaceholder}
                    autoComplete="email"
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-red-700 focus:ring-2 focus:ring-red-100 dark:border-red-300/30 dark:bg-[#51101a] dark:text-white dark:placeholder:text-red-100/50 dark:focus:border-red-300 dark:focus:ring-red-300/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-gray-700 dark:text-red-50"
                  >
                    {t.phone}
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      updateField(
                        "phone",
                        e.target.value
                      )
                    }
                    placeholder={t.phonePlaceholder}
                    autoComplete="tel"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-red-700 focus:ring-2 focus:ring-red-100 dark:border-red-300/30 dark:bg-[#51101a] dark:text-white dark:placeholder:text-red-100/50 dark:focus:border-red-300 dark:focus:ring-red-300/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="gender"
                    className="mb-2 block text-sm font-semibold text-gray-700 dark:text-red-50"
                  >
                    {t.gender}
                  </label>

                  <select
                    id="gender"
                    value={form.gender}
                    onChange={(e) =>
                      updateField(
                        "gender",
                        e.target.value
                      )
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-red-700 focus:ring-2 focus:ring-red-100 dark:border-red-300/30 dark:bg-[#51101a] dark:text-white dark:focus:border-red-300 dark:focus:ring-red-300/20"
                  >
                    <option value="">
                      {t.genderPlaceholder}
                    </option>

                    <option value="Male">
                      {t.male}
                    </option>

                    <option value="Female">
                      {t.female}
                    </option>

                    <option value="Other">
                      {t.other}
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="dateOfBirth"
                    className="mb-2 block text-sm font-semibold text-gray-700 dark:text-red-50"
                  >
                    {t.dateOfBirth}
                  </label>

                  <input
                    id="dateOfBirth"
                    type="date"
                    value={form.dateOfBirth}
                    onChange={(e) =>
                      updateField(
                        "dateOfBirth",
                        e.target.value
                      )
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-red-700 focus:ring-2 focus:ring-red-100 dark:border-red-300/30 dark:bg-[#51101a] dark:text-white dark:focus:border-red-300 dark:focus:ring-red-300/20"
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-4 border-b border-gray-200 pb-2 text-lg font-semibold text-gray-900 dark:border-red-300/20 dark:text-red-50">
                {t.addressInformation}
              </h2>

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="address"
                    className="mb-2 block text-sm font-semibold text-gray-700 dark:text-red-50"
                  >
                    {t.address}
                  </label>

                  <textarea
                    id="address"
                    value={form.address}
                    onChange={(e) =>
                      updateField(
                        "address",
                        e.target.value
                      )
                    }
                    placeholder={t.addressPlaceholder}
                    rows={3}
                    className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none placeholder:text-gray-400 focus:border-red-700 focus:ring-2 focus:ring-red-100 dark:border-red-300/30 dark:bg-[#51101a] dark:text-white dark:placeholder:text-red-100/50"
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                  <div>
                    <label
                      htmlFor="city"
                      className="mb-2 block text-sm font-semibold text-gray-700 dark:text-red-50"
                    >
                      {t.city}
                    </label>

                    <input
                      id="city"
                      type="text"
                      value={form.city}
                      onChange={(e) =>
                        updateField(
                          "city",
                          e.target.value
                        )
                      }
                      placeholder={t.cityPlaceholder}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none placeholder:text-gray-400 focus:border-red-700 focus:ring-2 focus:ring-red-100 dark:border-red-300/30 dark:bg-[#51101a] dark:text-white dark:placeholder:text-red-100/50"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="state"
                      className="mb-2 block text-sm font-semibold text-gray-700 dark:text-red-50"
                    >
                      {t.state}
                    </label>

                    <input
                      id="state"
                      type="text"
                      value={form.state}
                      onChange={(e) =>
                        updateField(
                          "state",
                          e.target.value
                        )
                      }
                      placeholder={t.statePlaceholder}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none placeholder:text-gray-400 focus:border-red-700 focus:ring-2 focus:ring-red-100 dark:border-red-300/30 dark:bg-[#51101a] dark:text-white dark:placeholder:text-red-100/50"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="pincode"
                      className="mb-2 block text-sm font-semibold text-gray-700 dark:text-red-50"
                    >
                      {t.pincode}
                    </label>

                    <input
                      id="pincode"
                      type="text"
                      value={form.pincode}
                      onChange={(e) =>
                        updateField(
                          "pincode",
                          e.target.value
                        )
                      }
                      placeholder={t.pincodePlaceholder}
                      inputMode="numeric"
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none placeholder:text-gray-400 focus:border-red-700 focus:ring-2 focus:ring-red-100 dark:border-red-300/30 dark:bg-[#51101a] dark:text-white dark:placeholder:text-red-100/50"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="mb-2 block text-sm font-semibold text-gray-700 dark:text-red-50"
                  >
                    {t.country}
                  </label>

                  <input
                    id="country"
                    type="text"
                    value={form.country}
                    onChange={(e) =>
                      updateField(
                        "country",
                        e.target.value
                      )
                    }
                    placeholder={t.countryPlaceholder}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none placeholder:text-gray-400 focus:border-red-700 focus:ring-2 focus:ring-red-100 dark:border-red-300/30 dark:bg-[#51101a] dark:text-white dark:placeholder:text-red-100/50"
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-4 border-b border-gray-200 pb-2 text-lg font-semibold text-gray-900 dark:border-red-300/20 dark:text-red-50">
                {t.accountSecurity}
              </h2>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-gray-700 dark:text-red-50"
                  >
                    {t.password} *
                  </label>

                  <input
                    id="password"
                    type="password"
                    value={form.password}
                    onChange={(e) =>
                      updateField(
                        "password",
                        e.target.value
                      )
                    }
                    placeholder={t.passwordPlaceholder}
                    autoComplete="new-password"
                    required
                    minLength={8}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none placeholder:text-gray-400 focus:border-red-700 focus:ring-2 focus:ring-red-100 dark:border-red-300/30 dark:bg-[#51101a] dark:text-white dark:placeholder:text-red-100/50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-semibold text-gray-700 dark:text-red-50"
                  >
                    {t.confirmPassword} *
                  </label>

                  <input
                    id="confirmPassword"
                    type="password"
                    value={form.confirmPassword}
                    onChange={(e) =>
                      updateField(
                        "confirmPassword",
                        e.target.value
                      )
                    }
                    placeholder={
                      t.confirmPasswordPlaceholder
                    }
                    autoComplete="new-password"
                    required
                    minLength={8}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none placeholder:text-gray-400 focus:border-red-700 focus:ring-2 focus:ring-red-100 dark:border-red-300/30 dark:bg-[#51101a] dark:text-white dark:placeholder:text-red-100/50"
                  />
                </div>
              </div>
            </section>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-300/30 dark:bg-red-950/30 dark:text-red-200">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-300/30 dark:bg-green-950/30 dark:text-green-200">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-red-800 px-4 py-3 font-semibold text-white transition hover:bg-red-900 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-red-600 dark:hover:bg-red-500"
            >
              {loading
                ? t.creatingAccount
                : t.createAccount}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-red-100/70">
            {t.alreadyAccount}{" "}
            <Link
              href={`/${locale}/login`}
              className="font-semibold text-red-700 hover:underline dark:text-red-300"
            >
              {t.signIn}
            </Link>
          </div>

          <div className="mt-4 text-center text-xs text-gray-500 dark:text-red-100/50">
            {t.approvalNotice}
          </div>
        </div>
      </div>
    </main>
  );
}