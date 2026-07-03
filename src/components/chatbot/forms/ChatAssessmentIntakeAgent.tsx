"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, CheckCircle, Mic, MicOff, Send } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Card, CardContent } from "../../ui/card";
import FormPrivacyConsent from "@/components/form/FormPrivacyConsent";
import { validatePhoneSimple } from "@/lib/phoneValidation";
import { FIELD_MAX } from "@/lib/inputLimits";
import { trackAssessmentIntakeEvent } from "@/lib/analytics/gtmEvents";

type IntakeField =
  | "assessmentType"
  | "grade"
  | "subjectInterest"
  | "mainConcern"
  | "studentName"
  | "parentName"
  | "email"
  | "phone"
  | "mode"
  | "preferredDay"
  | "preferredTime";

type IntakeState = Record<IntakeField, string>;

type SpeechRecognitionResultLike = {
  readonly length: number;
  readonly isFinal: boolean;
  [index: number]: { transcript: string };
};

type SpeechRecognitionEventLike = {
  readonly resultIndex: number;
  readonly results: {
    readonly length: number;
    [index: number]: SpeechRecognitionResultLike;
  };
};

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

type SpeechWindow = Window & {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
};

interface ChatAssessmentIntakeAgentProps {
  onSuccess: (message: string) => void;
  onCancel: () => void;
}

const INITIAL_STATE: IntakeState = {
  assessmentType: "",
  grade: "",
  subjectInterest: "",
  mainConcern: "",
  studentName: "",
  parentName: "",
  email: "",
  phone: "",
  mode: "",
  preferredDay: "",
  preferredTime: "",
};

const QUESTIONS: Array<{
  field: IntakeField;
  question: string;
  helper?: string;
  options?: readonly string[];
  maxLength?: number;
}> = [
  {
    field: "assessmentType",
    question: "How would you like to start?",
    options: ["Free 30-Minute Assessment", "Full Diagnostic"],
  },
  {
    field: "grade",
    question: "What grade is your child in?",
    helper: "Example: Grade 6",
    options: [
      "Grade 1",
      "Grade 2",
      "Grade 3",
      "Grade 4",
      "Grade 5",
      "Grade 6",
      "Grade 7",
      "Grade 8",
      "Grade 9",
      "Grade 10",
      "Grade 11",
      "Grade 12",
    ],
  },
  {
    field: "subjectInterest",
    question: "Is the concern Math, English, or both?",
    options: ["Math", "English", "Both"],
  },
  {
    field: "mainConcern",
    question: "What are you noticing?",
    helper: "Example: careless mistakes, low confidence, writing takes too long",
    maxLength: 240,
  },
  { field: "studentName", question: "What is your child's first name?", maxLength: FIELD_MAX.name },
  { field: "parentName", question: "What is the parent name?", maxLength: FIELD_MAX.name },
  { field: "email", question: "What email should we send confirmation to?", maxLength: FIELD_MAX.email },
  { field: "phone", question: "What phone number should we use for confirmation?", maxLength: FIELD_MAX.phone },
  {
    field: "mode",
    question: "Do you prefer in-person in Dublin or online?",
    options: ["In-person in Dublin", "Online", "Flexible"],
  },
  {
    field: "preferredDay",
    question: "Which day usually works best?",
    options: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Sunday", "Flexible"],
  },
  {
    field: "preferredTime",
    question: "What time usually works best?",
    helper: "Example: after 4 PM, Sunday morning, flexible",
    options: ["3:00 PM - 4:00 PM", "4:00 PM - 5:00 PM", "5:00 PM - 6:00 PM", "11:00 AM - 12:00 PM", "Flexible"],
  },
] as const;

const REVIEW_LABELS: Record<IntakeField, string> = {
  assessmentType: "Assessment",
  grade: "Grade",
  subjectInterest: "Subject",
  mainConcern: "Concern",
  studentName: "Student",
  parentName: "Parent",
  email: "Email",
  phone: "Phone",
  mode: "Mode",
  preferredDay: "Preferred day",
  preferredTime: "Preferred time",
};

function getSpeechRecognitionConstructor(): SpeechRecognitionConstructor | null {
  if (typeof window === "undefined") return null;
  const w = window as SpeechWindow;
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

function useNativeSpeech(onTranscript: (text: string) => void) {
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const [isSupported] = useState(() => Boolean(getSpeechRecognitionConstructor()));
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  const toggle = () => {
    setError("");
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = getSpeechRecognitionConstructor();
    if (!SpeechRecognition) {
      setError("Mic unavailable. You can type instead.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        transcript += event.results[i][0]?.transcript ?? "";
      }
      if (transcript.trim()) onTranscript(transcript.trim());
    };
    recognition.onerror = () => {
      setError("Mic unavailable. You can type instead.");
      setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
    trackAssessmentIntakeEvent("assessment_intake_voice_used");
  };

  return { isSupported, isListening, error, toggle };
}

function validateIntake(data: IntakeState, agree: boolean): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const question of QUESTIONS) {
    if (!data[question.field].trim()) errors[question.field] = "Required";
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Invalid email";
  }
  const phoneCheck = validatePhoneSimple(data.phone);
  if (data.phone && !phoneCheck.isValid) {
    errors.phone = phoneCheck.errorMessage || "Invalid phone";
  }
  if (!agree) errors.agree = "Please agree before sending.";
  return errors;
}

function normalizeSpeechChoice(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function matchSpokenOption(answer: string, options?: readonly string[]): string | null {
  if (!options || !answer.trim()) return null;
  const normalizedAnswer = normalizeSpeechChoice(answer);
  return (
    options.find((option) => {
      const normalizedOption = normalizeSpeechChoice(option);
      return normalizedOption.includes(normalizedAnswer) || normalizedAnswer.includes(normalizedOption);
    }) ?? null
  );
}

export default function ChatAssessmentIntakeAgent({ onSuccess, onCancel }: ChatAssessmentIntakeAgentProps) {
  const [data, setData] = useState<IntakeState>(INITIAL_STATE);
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const [isReviewing, setIsReviewing] = useState(false);
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasTrackedReview, setHasTrackedReview] = useState(false);
  const [usedVoice, setUsedVoice] = useState(false);

  const currentQuestion = QUESTIONS[step];
  const speech = useNativeSpeech((text) => {
    setUsedVoice(true);
    setAnswer(text);
  });
  const spokenOptionMatch = matchSpokenOption(answer, currentQuestion.options);

  useEffect(() => {
    trackAssessmentIntakeEvent("assessment_intake_started");
    return () => {
      if (!isReviewing) {
        trackAssessmentIntakeEvent("assessment_intake_abandoned", { step });
      }
    };
    // Track mount/unmount only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const progressLabel = useMemo(() => `Step ${Math.min(step + 1, QUESTIONS.length)}`, [step]);

  const saveCurrentAnswer = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) {
      setErrors({ [currentQuestion.field]: "Required" });
      return;
    }
    setData((prev) => ({ ...prev, [currentQuestion.field]: trimmed }));
    setErrors({});
    setAnswer("");
    if (step + 1 >= QUESTIONS.length) {
      setIsReviewing(true);
      if (!hasTrackedReview) {
        trackAssessmentIntakeEvent("assessment_intake_review_shown");
        setHasTrackedReview(true);
      }
      return;
    }
    setStep((prev) => prev + 1);
  };

  const goBack = () => {
    if (step === 0) return;
    const previousStep = step - 1;
    setStep(previousStep);
    setAnswer(data[QUESTIONS[previousStep].field]);
    setIsReviewing(false);
    setErrors({});
  };

  const updateReviewField = (field: IntakeField, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async () => {
    const nextErrors = validateIntake(data, agree);
    setErrors(nextErrors);
    setSubmitError("");
    if (Object.keys(nextErrors).length > 0) return;

    const schedule = `${data.preferredDay} - ${data.preferredTime}`;
    const source = usedVoice ? "chatbot-assessment-voice-intake" : "chatbot-assessment-intake";
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentName: data.parentName.trim(),
          email: data.email.trim(),
          countryCode: "+1",
          phone: data.phone.trim(),
          studentName: data.studentName.trim(),
          grade: data.grade,
          subjects: [data.subjectInterest],
          assessmentType: data.assessmentType,
          mode: data.mode,
          schedule,
          hearAboutUs: source,
          notes: data.mainConcern.trim(),
          sms_consent: agree,
          agreeToCommunications: agree,
        }),
      });
      const result = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        error?: string;
        message?: string;
      };
      if (!response.ok || result.success === false) {
        setSubmitError(result.error || result.message || `Request failed (${response.status})`);
        return;
      }
      trackAssessmentIntakeEvent("assessment_intake_submitted", {
        assessment_type: data.assessmentType,
        voice_used: usedVoice,
      });
      onSuccess(
        `You're all set. We sent a confirmation email to ${data.email.trim()}. Our team will call or text within 24 hours to confirm the exact assessment time.\n\nHow else can I help you? I can explain programs, pricing, class format, or what happens during the assessment.`,
      );
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isReviewing) {
    return (
      <Card className="bg-white/95 border-2 border-[#1F396D]/10">
        <CardContent className="p-4 space-y-3">
          <div>
            <h3 className="text-sm font-bold text-[#1F396D]">Review before sending</h3>
            <p className="mt-1 text-xs text-slate-600">You can edit anything Growy captured.</p>
          </div>

          <div className="grid gap-2">
            {QUESTIONS.map((question) => (
              <div key={question.field}>
                <Label htmlFor={`intake-${question.field}`} className="text-xs font-medium text-gray-700">
                  {REVIEW_LABELS[question.field]}
                </Label>
                <Input
                  id={`intake-${question.field}`}
                  value={data[question.field]}
                  onChange={(event) => updateReviewField(question.field, event.target.value)}
                  className={`mt-1 h-9 text-xs ${errors[question.field] ? "border-red-300" : ""}`}
                  disabled={isSubmitting}
                />
                {errors[question.field] ? (
                  <p className="mt-1 text-xs text-red-600">{errors[question.field]}</p>
                ) : null}
              </div>
            ))}
          </div>

          <FormPrivacyConsent
            checkboxId="assessment-intake-agree"
            checked={agree}
            onCheckedChange={setAgree}
            error={errors.agree}
            required
            showSubmitDisclaimer={false}
            variant="compact"
          />

          {submitError ? <p className="rounded-lg bg-red-50 p-2 text-xs text-red-700">{submitError}</p> : null}

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => setIsReviewing(false)} disabled={isSubmitting}>
              Edit answers
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || !agree}
              className="flex-1 bg-gradient-to-r from-[#F16112] to-[#F1894F] text-white"
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send request
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/95 border-2 border-[#1F396D]/10">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#F16112]">Growy can help</p>
            <h3 className="mt-1 text-sm font-bold text-[#1F396D]">{currentQuestion.question}</h3>
            {currentQuestion.helper ? <p className="mt-1 text-xs text-slate-600">{currentQuestion.helper}</p> : null}
          </div>
          <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
            {progressLabel}
          </span>
        </div>

        {currentQuestion.options ? (
          <div className="space-y-3">
            <div className="rounded-xl border border-[#F16112]/20 bg-[#FFF7ED] p-3">
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={speech.toggle}
                  aria-label={speech.isListening ? "Stop microphone" : "Use microphone"}
                  className="h-10 w-10 shrink-0 rounded-full border-[#F16112]/40 bg-white p-0 text-[#F16112]"
                >
                  {speech.isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <div>
                  <p className="text-xs font-bold text-[#1F396D]">
                    {speech.isListening ? "Listening..." : "Prefer talking? Tap the mic."}
                  </p>
                  <p className="text-xs text-slate-600">
                    {speech.isSupported
                      ? "Say your answer, then review before sending."
                      : "Mic unavailable. You can type or tap an option instead."}
                  </p>
                </div>
              </div>
              {answer.trim() ? (
                <div className="mt-3 rounded-lg bg-white px-3 py-2 text-xs text-slate-700 ring-1 ring-slate-200">
                  <span className="font-semibold text-[#1F396D]">Heard:</span> {answer}
                  {spokenOptionMatch ? (
                    <p className="mt-1 text-[#1F396D]">Matched to: {spokenOptionMatch}</p>
                  ) : null}
                </div>
              ) : null}
              {speech.error ? <p className="mt-2 text-xs text-red-600">{speech.error}</p> : null}
              {answer.trim() ? (
                <Button
                  type="button"
                  onClick={() => saveCurrentAnswer(spokenOptionMatch ?? answer)}
                  className="mt-3 w-full bg-[#F16112] text-white hover:bg-[#d94f0d]"
                >
                  Continue with spoken answer
                </Button>
              ) : null}
            </div>

            <div className="grid gap-2">
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => saveCurrentAnswer(option)}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:border-[#F16112] hover:bg-[#FFF7ED]"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                value={answer}
                onChange={(event) => setAnswer(event.target.value.slice(0, currentQuestion.maxLength ?? 240))}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    saveCurrentAnswer(answer);
                  }
                }}
                maxLength={currentQuestion.maxLength ?? 240}
                placeholder="Type your answer"
                className={errors[currentQuestion.field] ? "border-red-300" : ""}
              />
              <Button
                type="button"
                variant="outline"
                onClick={speech.toggle}
                aria-label={speech.isListening ? "Stop microphone" : "Use microphone"}
                className="h-10 w-10 shrink-0 rounded-full p-0"
              >
                {speech.isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-xs text-slate-500">
              {speech.isSupported
                ? "Tap mic and answer in your own words. You can review before sending."
                : "Mic unavailable. You can type instead."}
            </p>
            {speech.error ? <p className="text-xs text-red-600">{speech.error}</p> : null}
            {errors[currentQuestion.field] ? (
              <p className="text-xs text-red-600">{errors[currentQuestion.field]}</p>
            ) : null}
            <Button
              type="button"
              onClick={() => saveCurrentAnswer(answer)}
              disabled={!answer.trim()}
              className="w-full bg-[#F16112] text-white hover:bg-[#d94f0d]"
            >
              Continue
            </Button>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-slate-100 pt-2">
          <Button type="button" variant="ghost" onClick={goBack} disabled={step === 0} className="h-8 px-2 text-xs">
            <ArrowLeft className="mr-1 h-3 w-3" />
            Back
          </Button>
          <button type="button" onClick={onCancel} className="text-xs font-semibold text-slate-500 hover:text-slate-700">
            I'll fill it myself
          </button>
        </div>

        {step > 0 ? (
          <div className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-xs text-green-800">
            <CheckCircle className="h-4 w-4" />
            Growy is building your request as you answer.
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
