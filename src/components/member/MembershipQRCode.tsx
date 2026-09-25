"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

export default function MembershipQRCode({
  memberNumber,
}: {
  memberNumber: number;
}) {
  const [qrCode, setQrCode] = useState("");

  useEffect(() => {
    const url =
      `${window.location.origin}/verify-member/${memberNumber}`;

    QRCode.toDataURL(url, {
      width: 180,
      margin: 2,
      errorCorrectionLevel: "H",
    })
      .then(setQrCode)
      .catch((error) => {
        console.error("QR generation error:", error);
      });
  }, [memberNumber]);

  if (!qrCode) {
    return (
      <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center text-xs text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <img
      src={qrCode}
      alt="Membership verification QR code"
      className="w-24 h-24 rounded-lg bg-white p-1"
    />
  );
}