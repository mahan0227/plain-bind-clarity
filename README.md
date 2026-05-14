# Plain Bind Clarity

Translate dense **policy / contract** language into plain-English obligations, risks, defined terms, and pre-signing checklists — with explicit “not legal advice” posture and honest ambiguity flags. **BYO OpenAI API key.**

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · OpenAI Chat Completions (JSON mode)

## Run locally

```bash
npm install
npm run dev
```

## API

`POST /api/clarity` · Header `Authorization: Bearer <key>`

Body: `text` (document), optional `context`, optional `model`.

## License

MIT
