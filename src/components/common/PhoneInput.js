import React, { useState, useEffect } from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";

export default function CustomPhoneInput({ value, onChange, defaultCountry }) {
  // internal state but keep in sync with optional controlled prop `value`
  const [phone, setPhone] = useState(value || "");

  useEffect(() => {
    setPhone(value || "");
  }, [value]);

  const handleChange = (nextPhone, data, event, formattedValue) => {
    setPhone(nextPhone);
    if (typeof onChange === "function") {
      onChange(nextPhone, data, event, formattedValue);
    }
  };

  return (
    <PhoneInput
      // don't force a single country so the full country list is available
      {...(defaultCountry ? { country: defaultCountry } : {})}
      value={phone}
      onChange={handleChange}
      // allow searching the country list
      enableSearch
      // show country code as non-editable to avoid user removing it accidentally
      countryCodeEditable={false}
    />
  );
}
