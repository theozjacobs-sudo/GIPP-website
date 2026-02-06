import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { ambassadorSchema } from '@/types/forms';
import { appendSubmission, getApprovedAmbassadors } from '@/lib/submissions';

export async function GET() {
  try {
    const approved = await getApprovedAmbassadors();
    return NextResponse.json(approved);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = ambassadorSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.flatten() },
        { status: 400 }
      );
    }

    await appendSubmission('ambassadors', {
      ...result.data,
      id: crypto.randomUUID(),
      submittedAt: new Date().toISOString(),
      approved: false,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
