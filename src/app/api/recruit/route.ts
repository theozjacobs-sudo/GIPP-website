import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { recruitSchema } from '@/types/forms';
import { appendSubmission } from '@/lib/submissions';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = recruitSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.flatten() },
        { status: 400 }
      );
    }

    await appendSubmission('recruit', {
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
