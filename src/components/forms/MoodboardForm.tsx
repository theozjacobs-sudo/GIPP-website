'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { moodboardSchema } from '@/types/forms';
import { Loader2, CheckCircle2 } from 'lucide-react';

const TYPE_OPTIONS = [
  { value: '', label: 'Select type' },
  { value: 'image', label: 'Image URL' },
  { value: 'quote', label: 'Quote' },
  { value: 'link', label: 'Link' },
  { value: 'video', label: 'Video URL' },
];

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export function MoodboardForm() {
  const [state, setState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [contentType, setContentType] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setState('submitting');

    const formData = new FormData(e.currentTarget);
    const data = {
      submittedBy: formData.get('submittedBy') as string,
      type: formData.get('type') as string,
      content: formData.get('content') as string,
      caption: (formData.get('caption') as string) || undefined,
      week: parseInt(formData.get('week') as string, 10),
    };

    const result = moodboardSchema.safeParse(data);
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
      const res = await fetch('/api/moodboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      });
      if (!res.ok) throw new Error('Request failed');
      setState('success');
      (e.target as HTMLFormElement).reset();
      setContentType('');
    } catch {
      setState('error');
    }
  }

  if (state === 'success') {
    return (
      <div className="rounded-xl bg-green-50 border border-green-200 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-green-600 mb-3" aria-hidden="true" />
        <h3 className="text-lg font-bold text-green-900">Added to the Board!</h3>
        <p className="mt-2 text-green-700">Your inspiration has been posted.</p>
        <button
          onClick={() => setState('idle')}
          className="mt-4 text-sm text-green-600 underline hover:text-green-800"
        >
          Post another
        </button>
      </div>
    );
  }

  const currentWeek = Math.ceil(
    (Date.now() - new Date(new Date().getFullYear(), 0, 1).getTime()) /
      (7 * 24 * 60 * 60 * 1000)
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Input
          id="mood-name"
          name="submittedBy"
          label="Your Name"
          error={errors.submittedBy}
          required
        />
        <Select
          id="mood-type"
          name="type"
          label="Content Type"
          options={TYPE_OPTIONS}
          error={errors.type}
          onChange={(e) => setContentType((e.target as HTMLSelectElement).value)}
        />
        <Input
          id="mood-week"
          name="week"
          label="Week Number"
          type="number"
          min={1}
          max={52}
          defaultValue={currentWeek}
          error={errors.week}
          required
        />
      </div>

      {contentType === 'quote' ? (
        <Textarea
          id="mood-content"
          name="content"
          label="Quote"
          rows={3}
          placeholder="Enter the quote text..."
          error={errors.content}
          required
        />
      ) : (
        <Input
          id="mood-content"
          name="content"
          label={contentType === 'image' ? 'Image URL' : contentType === 'video' ? 'Video URL' : 'URL'}
          type="url"
          placeholder="https://..."
          error={errors.content}
          required
        />
      )}

      <Input
        id="mood-caption"
        name="caption"
        label="Caption (optional)"
        placeholder="Why does this inspire you?"
        error={errors.caption}
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
        {state === 'submitting' ? 'Posting...' : 'Post to Moodboard'}
      </button>
    </form>
  );
}
