'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { recruitSchema } from '@/types/forms';
import { Loader2, CheckCircle2 } from 'lucide-react';

const POSITION_OPTIONS = [
  { value: '', label: 'Select a position' },
  { value: 'GK', label: 'Goalkeeper' },
  { value: 'DEF', label: 'Defender' },
  { value: 'MID', label: 'Midfielder' },
  { value: 'FWD', label: 'Forward' },
];

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export function RecruitForm() {
  const [state, setState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setState('submitting');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      position: formData.get('position') as string,
      experience: formData.get('experience') as string,
      highlightTapeUrl: formData.get('highlightTapeUrl') as string,
      whyGipp: formData.get('whyGipp') as string,
    };

    const result = recruitSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as string;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      setState('idle');
      return;
    }

    try {
      const res = await fetch('/api/recruit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      });

      if (!res.ok) throw new Error('Request failed');
      setState('success');
      (e.target as HTMLFormElement).reset();
    } catch {
      setState('error');
    }
  }

  if (state === 'success') {
    return (
      <div className="rounded-xl bg-green-50 border border-green-200 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-green-600 mb-3" aria-hidden="true" />
        <h3 className="text-lg font-bold text-green-900">Application Received!</h3>
        <p className="mt-2 text-green-700">We&apos;ll review your tape and be in touch.</p>
        <button
          onClick={() => setState('idle')}
          className="mt-4 text-sm text-green-600 underline hover:text-green-800"
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input id="name" name="name" label="Name" error={errors.name} required />
        <Input id="email" name="email" label="Email" type="email" error={errors.email} required />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Select
          id="position"
          name="position"
          label="Preferred Position"
          options={POSITION_OPTIONS}
          error={errors.position}
        />
        <Input
          id="highlightTapeUrl"
          name="highlightTapeUrl"
          label="Highlight Tape URL"
          type="url"
          placeholder="https://youtube.com/watch?v=..."
          error={errors.highlightTapeUrl}
          required
        />
      </div>

      <Textarea
        id="experience"
        name="experience"
        label="Tell us about your experience"
        rows={3}
        error={errors.experience}
        required
      />

      <Textarea
        id="whyGipp"
        name="whyGipp"
        label="Why GIPP?"
        rows={4}
        placeholder="What draws you to Good Intent, Poor Product?"
        error={errors.whyGipp}
        required
      />

      {state === 'error' && (
        <p className="text-sm text-gipp-red" role="alert">
          Something went wrong. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'submitting'}
        className="inline-flex items-center gap-2 rounded-lg bg-gipp-orange px-6 py-3 font-semibold text-white transition-colors hover:bg-gipp-orange-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-gipp-orange focus-visible:ring-offset-2 disabled:opacity-50"
      >
        {state === 'submitting' && (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        )}
        {state === 'submitting' ? 'Submitting...' : 'Submit Application'}
      </button>
    </form>
  );
}
