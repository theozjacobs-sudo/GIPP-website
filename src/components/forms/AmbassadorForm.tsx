'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { ambassadorSchema } from '@/types/forms';
import { Loader2, CheckCircle2 } from 'lucide-react';

const CONTENT_TYPES = [
  { value: '', label: 'Select content type' },
  { value: 'photo', label: 'Photo' },
  { value: 'video', label: 'Video' },
  { value: 'reel', label: 'Reel' },
  { value: 'story', label: 'Story' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'other', label: 'Other' },
];

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export function AmbassadorForm() {
  const [state, setState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setState('submitting');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      instagram: formData.get('instagram') as string,
      contentType: formData.get('contentType') as string,
      contentUrl: formData.get('contentUrl') as string,
      message: (formData.get('message') as string) || undefined,
    };

    const result = ambassadorSchema.safeParse(data);
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
      const res = await fetch('/api/ambassadors', {
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
        <h3 className="text-lg font-bold text-green-900">Submission Received!</h3>
        <p className="mt-2 text-green-700">We&apos;ll review it shortly. Welcome aboard.</p>
        <button
          onClick={() => setState('idle')}
          className="mt-4 text-sm text-green-600 underline hover:text-green-800"
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input id="amb-name" name="name" label="Name" error={errors.name} required />
        <Input
          id="amb-instagram"
          name="instagram"
          label="Instagram Handle"
          placeholder="@yourhandle"
          error={errors.instagram}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Select
          id="amb-contentType"
          name="contentType"
          label="Content Type"
          options={CONTENT_TYPES}
          error={errors.contentType}
        />
        <Input
          id="amb-contentUrl"
          name="contentUrl"
          label="Content URL"
          type="url"
          placeholder="https://..."
          error={errors.contentUrl}
          required
        />
      </div>

      <Textarea
        id="amb-message"
        name="message"
        label="Message (optional)"
        rows={3}
        placeholder="Tell us about your content or why you want to represent GIPP"
        error={errors.message}
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
        {state === 'submitting' ? 'Submitting...' : 'Submit Content'}
      </button>
    </form>
  );
}
