# Plain Bind Clarity

Turn dense **policy, contract, or legal-ish** language into **plain-English** obligations, risks, defined terms, and a **pre-sign checklist**—with explicit uncertainty flags. **Not legal advice**; a thinking partner for review.

## What it is

A BYOK Next.js app that structures **accountability**: who must do what, where money/time binds, and which clauses need a human lawyer. It refuses to overclaim when the text is ambiguous.

## Why it’s useful

- Speeds **first-pass comprehension** for non-lawyers on the business side.
- Surfaces **questions to resolve** before signatures or board approval.
- Produces **glossary** entries aligned to the actual document language.
- Helps **sales and CS** understand what they can promise customers.

## Where you can use it

- **Startups** — vendor MSAs, order forms, DPAs under counsel oversight.
- **HR & people ops** — handbooks and equity docs (still verify with counsel).
- **Procurement** — SLA and liability caps comparison language.
- **Founders** — SAFE / side letter comprehension before investor meetings.

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · OpenAI Chat Completions (JSON mode)

## Run locally

```bash
npm install
npm run dev
```

## Production check

```bash
npm run build
npm run start
```

## API

`POST /api/clarity` · Header `Authorization: Bearer <key>`

Body: `text` (required), optional `context`, `model`.

## Suite brochure

[`docs/neuron-suite-brochure.html`](docs/neuron-suite-brochure.html) · [`docs/neuron-suite-ig-square.svg`](docs/neuron-suite-ig-square.svg)

## License

MIT
