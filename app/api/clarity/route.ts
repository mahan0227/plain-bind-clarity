import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getOpenAIApiKey } from "@/lib/openai-key";

export async function POST(request: NextRequest) {
  const apiKey = getOpenAIApiKey(request);
  if (!apiKey) {
    return NextResponse.json(
      { error: "Send Authorization: Bearer <your OpenAI API key> on each request." },
      { status: 401 },
    );
  }

  let body: { text?: string; context?: string; model?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body.text?.trim()) {
    return NextResponse.json({ error: "`text` is required." }, { status: 400 });
  }

  const client = new OpenAI({ apiKey });
  const model = body.model?.trim() || "gpt-4o-mini";

  const system = `You are Plain Bind Clarity — translate dense policy/contract language into accountable plain English.
NOT legal advice. Flag uncertainty honestly.
Return JSON:
- elevator_summary: string
- who_does_what: { party: string; obligations: string[]; rights: string[] }[]
- money_and_time: { item: string; detail: string }[]
- risks_and_ambiguities: { clause_ref: string; risk: string; question_to_resolve: string }[]
- defined_terms: { term: string; plain_meaning: string }[]
- red_flags: string[] (when to escalate to counsel)
- checklist_before_signing: string[]`;

  const user = `EXTRA_CONTEXT:\n${body.context?.trim() || "none"}\n\nDOCUMENT:\n---\n${body.text}\n---`;

  try {
    const completion = await client.chat.completions.create({
      model,
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    });
    const text = completion.choices[0]?.message?.content;
    if (!text) return NextResponse.json({ error: "Empty model response." }, { status: 502 });
    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      return NextResponse.json({ raw: text }, { status: 200 });
    }
    return NextResponse.json({ result: parsed, model });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "OpenAI request failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
