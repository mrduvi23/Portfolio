"use client";

import { useState, type FormEvent } from "react";
import { DownloadIcon } from "@/components/icons/DownloadIcon";
import { LoaderIcon } from "@/components/icons/LoaderIcon";
import { TickIcon } from "@/components/icons/TickIcon";
import { WarningIcon } from "@/components/icons/WarningIcon";
import "./contact-form.css";

const DOWNLOAD_CV_LABEL = "Download CV";

const DOWNLOAD_CV_MOTION =
  "transition-transform duration-200 [transition-timing-function:cubic-bezier(0.2,0,0,1)]";

export function AboutDownloadCv({ href }: { href: string }) {
  return (
    <a
      href={href}
      download="David Arreba - CV.pdf"
      className="about-download-cv group inline-flex gap-2 type-label uppercase outline-offset-4"
    >
      <span className="h-[24px] overflow-hidden">
        <span
          className={`flex flex-col gap-[10px] ${DOWNLOAD_CV_MOTION} group-hover:-translate-y-[34px] group-focus-visible:-translate-y-[34px]`}
        >
          <span className="text-[var(--color-heading)] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4 group-focus-visible:underline group-focus-visible:decoration-1 group-focus-visible:underline-offset-4">
            {DOWNLOAD_CV_LABEL}
          </span>
          <span className="text-[var(--color-primitives-grey-90)] underline decoration-1 underline-offset-4">
            {DOWNLOAD_CV_LABEL}
          </span>
        </span>
      </span>
      <DownloadIcon className="about-download-cv__icon shrink-0 text-[var(--color-heading)] transition-colors duration-200 group-hover:text-[var(--color-primitives-grey-90)] group-focus-visible:text-[var(--color-primitives-grey-90)]" />
    </a>
  );
}

type FieldKey = "name" | "email" | "message";

type FieldConfig = {
  id: FieldKey;
  label: string;
  placeholder: string;
  type?: "text" | "email";
  multiline?: boolean;
};

const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;

const FIELDS: FieldConfig[] = [
  { id: "name", label: "Name", placeholder: "Enter your name" },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "hello@example.com",
  },
  {
    id: "message",
    label: "Message",
    placeholder: "Tell me about your idea",
    multiline: true,
  },
];

type FormValues = Record<FieldKey, string>;

const EMPTY_VALUES: FormValues = {
  name: "",
  email: "",
  message: "",
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validate(values: FormValues): Partial<Record<FieldKey, string>> {
  const errors: Partial<Record<FieldKey, string>> = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  } else if (values.name.trim().length > MAX_NAME) {
    errors.name = "Name is too long.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (values.email.trim().length > MAX_EMAIL) {
    errors.email = "Email is too long.";
  } else if (!isValidEmail(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.message.trim()) {
    errors.message = "Please enter a message.";
  } else if (values.message.trim().length > MAX_MESSAGE) {
    errors.message = "Message is too long.";
  }

  return errors;
}

type ContactFieldProps = {
  id: FieldKey;
  label: string;
  placeholder: string;
  type?: "text" | "email";
  multiline?: boolean;
  maxLength?: number;
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

function ContactField({
  id,
  label,
  placeholder,
  type = "text",
  multiline = false,
  maxLength,
  value,
  error,
  onChange,
}: ContactFieldProps) {
  const inputClassName = [
    "contact-field__input type-body",
    multiline ? "contact-field__input--textarea" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-2">
        <label htmlFor={id} className="type-label text-[var(--color-heading)]">
          {label}
        </label>
        {multiline ? (
          <textarea
            id={id}
            name={id}
            rows={4}
            maxLength={maxLength}
            value={value}
            placeholder={placeholder}
            aria-invalid={Boolean(error)}
            data-invalid={error ? "true" : undefined}
            className={inputClassName}
            onChange={(event) => onChange(event.target.value)}
          />
        ) : (
          <input
            id={id}
            name={id}
            type={type}
            maxLength={maxLength}
            value={value}
            placeholder={placeholder}
            aria-invalid={Boolean(error)}
            data-invalid={error ? "true" : undefined}
            className={inputClassName}
            onChange={(event) => onChange(event.target.value)}
          />
        )}
      </div>
      {error ? (
        <p className="contact-field__error type-body" role="alert">
          <WarningIcon className="shrink-0" />
          <span>{error}</span>
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [submitError, setSubmitError] = useState<string | null>(null);

  function updateField(id: FieldKey, value: string) {
    setValues((current) => ({ ...current, [id]: value }));
    setErrors((current) => {
      if (!current[id]) return current;
      const next = { ...current };
      delete next[id];
      return next;
    });
    if (status === "error" || status === "sent") {
      setStatus("idle");
      setSubmitError(null);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setStatus("sending");
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(data?.error ?? "Failed to send message.");
      }

      setStatus("sent");
      setValues(EMPTY_VALUES);
      setErrors({});
    } catch (error) {
      setStatus("error");
      setSubmitError(
        error instanceof Error ? error.message : "Failed to send message.",
      );
    }
  }

  return (
    <form className="flex flex-col gap-10" onSubmit={handleSubmit} noValidate>
      {FIELDS.map((field) => (
        <ContactField
          key={field.id}
          {...field}
          maxLength={
            field.id === "name"
              ? MAX_NAME
              : field.id === "email"
                ? MAX_EMAIL
                : MAX_MESSAGE
          }
          value={values[field.id]}
          error={errors[field.id]}
          onChange={(value) => updateField(field.id, value)}
        />
      ))}
      <button
        type="submit"
        disabled={status === "sending"}
        className={[
          "contact-submit type-label",
          status === "sent" ? "contact-submit--success" : "",
          status === "error" ? "contact-submit--error" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-live="polite"
      >
        {status === "sending" ? (
          <LoaderIcon className="contact-submit__loader shrink-0" />
        ) : status === "sent" ? (
          <span className="contact-submit__content">
            <span>Message sent successfully</span>
            <TickIcon className="shrink-0" />
          </span>
        ) : status === "error" ? (
          <span className="contact-submit__content contact-submit__content--error">
            <WarningIcon className="shrink-0" />
            <span>{submitError ?? "Failed to send message."}</span>
          </span>
        ) : (
          "Send message"
        )}
      </button>
    </form>
  );
}
