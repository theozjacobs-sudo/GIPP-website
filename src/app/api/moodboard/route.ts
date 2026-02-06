import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { moodboardSchema } from '@/types/forms';
import { readSubmissions, appendSubmission } from '@/lib/submissions';
import type { MoodboardItem } from '@/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const week = searchParams.get('week');

    let items = await readSubmissions<MoodboardItem>('moodboard');

    if (week) {
      const weekNum = parseInt(week, 10);
      if (!isNaN(weekNum)) {
        items = items.filter((item) => item.week === weekNum);
      }
    }

    items.sort(
      (a, b) =>
        new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );

    return NextResponse.json(items);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = moodboardSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.flatten() },
        { status: 400 }
      );
    }

    await appendSubmission('moodboard', {
      ...result.data,
      id: crypto.randomUUID(),
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
