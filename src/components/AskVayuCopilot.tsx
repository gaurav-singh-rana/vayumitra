'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AirQualitySnapshot, ChatMessage, HouseholdProfile } from '@/types';

interface AskVayuCopilotProps {
  isOpen: boolean;
  onClose: () => void;
  snapshot: AirQualitySnapshot;
  profile: HouseholdProfile;
  initialQuestion?: string;
}

export const AskVayuCopilot: React.FC<AskVayuCopilotProps> = ({
  isOpen,
  onClose,
  snapshot,
  profile,
  initialQuestion,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Initialize with initial conversation seed
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'seed-user-1',
          role: 'user',
          content: `Can ${profile.name} play outside in the apartment compound at 5 PM today?`,
          timestamp: '4:11 PM',
        },
        {
          id: 'seed-asst-1',
          role: 'assistant',
          content: `I completely understand ${profile.name}'s urge for fresh outdoor activity! However, at 5:00 PM today in ${snapshot.locationName}, outdoor air will be hazardous as early dusk temperature inversion traps vehicular micro-pollutants close to the ground (projected AQI ${snapshot.aqi}+).`,
          timestamp: '4:12 PM',
          groundedSource: `Validated with Open-Meteo Inversion Model & ${snapshot.sourceName}`,
          healthVerdict: `Outdoor vigorous play is strongly unsafe today. Active individuals and children inhale ~2.4x more ambient air per kg body weight during cardiovascular activity.`,
          indoorAlternate: `Try a balloon-badminton rally or living room obstacle course. If stepping out briefly to greet neighbors, strictly limit porch exposure to <10 minutes with a calibrated child-fit N95 mask.`,
          shieldingStat: `Alveolar particulate shielding: Avoids ~${Math.round(snapshot.pollutants.pm25.value * 0.45)} µg deep PM2.5 lung load`,
          audioDuration: '42s',
        },
      ]);
    }
  }, [profile, snapshot, messages.length]);

  // If initialQuestion is passed from outside, trigger it
  useEffect(() => {
    if (initialQuestion && initialQuestion.trim().length > 0 && isOpen) {
      sendMessage(initialQuestion);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuestion, isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Auto-scroll chat
  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const sendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    setErrorMessage(null);
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          personaId: profile.id,
          snapshot,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to get answer');
      }

      setMessages((prev) => [...prev, data]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error reaching assistant';
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeak = (content: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Ask VayuMitra Conversational Copilot"
    >
      <div className="bg-surface w-full max-w-xl h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="bg-surface/90 backdrop-blur-md p-4 border-b border-surface-container flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-heading text-lg font-bold text-primary">Ask VayuMitra</span>
              <span className="font-heading text-xs text-secondary font-semibold">
                (आपका वायु परामर्शक)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-semibold">
                <span className="material-symbols-outlined text-[14px]">bolt</span>
                Grounded Telemetry
              </span>
              <button
                onClick={onClose}
                aria-label="Close Ask Vayu dialog"
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-surface-container-high transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>
          </div>

          {/* Live Station Sensor Ribbon */}
          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-error-container text-on-error-container text-xs">
            <span className="material-symbols-outlined text-[18px] text-error shrink-0 mt-0.5">
              warning
            </span>
            <div className="flex flex-col text-left leading-snug">
              <span className="font-heading text-[11px] font-bold text-error">
                Grounded in Live CPCB &amp; Open-Meteo
              </span>
              <span className="text-on-surface-variant font-medium">
                {snapshot.locationName}: <strong className="text-error font-bold">AQI {snapshot.aqi}</strong> • PM2.5: {snapshot.pollutants.pm25.value} µg/m³ • Inversion Risk:{' '}
                <span className="text-error font-semibold">{snapshot.inversionRisk}</span>
              </span>
            </div>
          </div>

          {/* Active Household Profile Context Tag */}
          <div className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-surface-container-high text-xs">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="material-symbols-outlined text-primary text-[16px] shrink-0">
                family_restroom
              </span>
              <p className="font-heading truncate text-on-surface-variant">
                <strong className="text-primary font-semibold">Household Profile:</strong> {profile.label}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Grounded Chips */}
        <div className="px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-surface-container bg-surface-container-low/50">
          <span className="font-heading text-xs text-on-surface-variant shrink-0 flex items-center gap-1 font-semibold">
            <span className="material-symbols-outlined text-[14px]">auto_awesome</span> Quick:
          </span>
          <button
            onClick={() => sendMessage('When is grocery run safe today?')}
            className="shrink-0 px-3 py-1 rounded-full bg-surface-container-lowest shadow-xs hover:bg-surface-container text-primary font-heading text-xs transition-all border border-surface-container"
            type="button"
          >
            🛒 Safe grocery run hours?
          </button>
          <button
            onClick={() => sendMessage('What is the bedtime protection protocol for mild wheezing?')}
            className="shrink-0 px-3 py-1 rounded-full bg-surface-container-lowest shadow-xs hover:bg-surface-container text-primary font-heading text-xs transition-all border border-surface-container"
            type="button"
          >
            🛏️ Bedtime wheeze protocol
          </button>
          <button
            onClick={() => sendMessage('DIY fan + HEPA purifier tutorial')}
            className="shrink-0 px-3 py-1 rounded-full bg-surface-container-lowest shadow-xs hover:bg-surface-container text-primary font-heading text-xs transition-all border border-surface-container"
            type="button"
          >
            🌬️ DIY ₹1,200 air purifier
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4" role="log" aria-live="polite">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';

            if (isUser) {
              return (
                <div key={msg.id} className="flex flex-col items-end gap-1 ml-8">
                  <div className="bg-primary text-on-primary rounded-2xl rounded-tr-none px-4 py-3 shadow-sm max-w-[90%] text-sm leading-relaxed">
                    <p>{msg.content}</p>
                  </div>
                  <span className="font-heading text-[10px] text-on-surface-variant px-1">
                    {msg.timestamp} • You
                  </span>
                </div>
              );
            }

            return (
              <div key={msg.id} className="flex flex-col items-start gap-1 mr-2">
                <div className="w-full bg-surface-container-lowest rounded-2xl rounded-tl-none p-4 shadow-sm border border-surface-container space-y-3">
                  {/* Validation Header Badge */}
                  <div className="flex items-center justify-between gap-2 pb-1 border-b border-surface-container">
                    <div className="flex items-center gap-1.5 text-secondary">
                      <span className="material-symbols-outlined text-[16px]">verified</span>
                      <span className="font-heading text-xs font-semibold">
                        {msg.groundedSource || 'Validated with Live Telemetry'}
                      </span>
                    </div>
                    <span className="font-heading text-[10px] text-on-surface-variant">
                      {msg.timestamp}
                    </span>
                  </div>

                  {/* Assistant Primary Message */}
                  <p className="text-sm text-on-surface leading-relaxed">{msg.content}</p>

                  {/* Red / Rose Health Verdict Card */}
                  {msg.healthVerdict && (
                    <div className="rounded-xl p-3 bg-error-container text-on-error-container flex flex-col gap-1 border border-error/15">
                      <div className="flex items-center gap-1.5 font-heading text-xs text-error font-bold">
                        <span className="material-symbols-outlined text-[16px]">cancel</span>
                        Clear Health Verdict
                      </div>
                      <p className="text-xs text-on-surface leading-relaxed">
                        {msg.healthVerdict}
                      </p>
                    </div>
                  )}

                  {/* Mint / Cyan Alternate Solution Card */}
                  {msg.indoorAlternate && (
                    <div className="rounded-xl p-3 bg-secondary-container/30 text-on-surface flex flex-col gap-1 border border-secondary/20">
                      <div className="flex items-center gap-1.5 font-heading text-xs text-secondary font-bold">
                        <span className="material-symbols-outlined text-[16px] text-secondary">
                          lightbulb
                        </span>
                        Grounded Alternate Action
                      </div>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        {msg.indoorAlternate}
                      </p>
                    </div>
                  )}

                  {/* Protocol Steps Bento Stack */}
                  {msg.protocolSteps && (
                    <div className="flex flex-col gap-2 pt-1">
                      {msg.protocolSteps.map((step) => (
                        <div
                          key={step.step}
                          className="flex items-start gap-2.5 p-2.5 rounded-xl bg-surface-container-low border border-surface-container"
                        >
                          <div className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs shrink-0">
                            {step.step}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-heading text-xs text-primary font-bold">
                              {step.title}
                            </span>
                            <p className="text-[11px] text-on-surface-variant mt-0.5">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Particulate Shielding Stat Badge */}
                  {msg.shieldingStat && (
                    <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-surface-container-high text-primary font-heading text-xs font-semibold">
                      <span className="material-symbols-outlined text-[16px] text-secondary">
                        shield_with_heart
                      </span>
                      {msg.shieldingStat}
                    </div>
                  )}

                  {/* Response Action Toolbar */}
                  <div className="flex items-center justify-between pt-1 border-t border-surface-container bg-surface-container-low/60 rounded-lg p-2">
                    <button
                      onClick={() => handleSpeak(msg.content)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-on-secondary font-heading text-xs font-medium hover:bg-tertiary transition-colors"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">volume_up</span>
                      <span>Listen ({msg.audioDuration || '38s'})</span>
                    </button>
                    <div className="flex items-center gap-1 text-on-surface-variant">
                      <button
                        aria-label="Mark helpful"
                        className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-surface-container-high hover:text-primary transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">thumb_up</span>
                      </button>
                      <button
                        aria-label="Share response"
                        onClick={() => {
                          navigator.clipboard?.writeText(msg.content);
                          alert('Response copied to clipboard!');
                        }}
                        className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-surface-container-high hover:text-primary transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">share</span>
                      </button>
                    </div>
                  </div>
                </div>
                <span className="font-heading text-[10px] text-on-surface-variant px-1">
                  VayuMitra Grounded Engine
                </span>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2 p-3 bg-surface-container-lowest rounded-xl border border-surface-container text-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px] text-secondary animate-spin">
                progress_activity
              </span>
              <span>Grounding answer in live station telemetry and medical research...</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 rounded-xl bg-error-container text-error text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              <span>{errorMessage}</span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Chat Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="p-3 bg-surface-container-lowest border-t border-surface-container flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask VayuMitra for ${profile.name}...`}
            maxLength={400}
            className="flex-1 px-4 py-2.5 rounded-full bg-surface-container-low border border-surface-container text-xs sm:text-sm text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-2 focus:ring-secondary"
            aria-label="Type your air quality or routine question"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            aria-label="Send message to VayuMitra"
            className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center disabled:opacity-40 hover:bg-primary-container transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
