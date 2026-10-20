# Forma Studio

A fictional design studio with projects, a dashboard and reusable components.
Use [Piny](https://getpiny.com) to make it your own, visually and with your AI agent.

## Open with your AI agent

Choose **Use this template** on GitHub or download the ZIP. Open your copy in
your AI editor, then paste this prompt:

```text
Start this Forma Studio demo with Piny.

Work in this project's folder. Inspect package.json and vite.config.ts first.
It is a standalone React + Vite + Tailwind v4 app, already configured with
Piny. Do not add another plugin or change the app source.

Use Node ^20.19.0 || >=22.12.0 and npm. Piny follows npm's latest tag; keep
"@pinegrow/piny": "latest" in package.json. Run npm install, then
npm update @pinegrow/piny so an existing lockfile also receives the current
Piny release. Keep all other dependency versions unchanged. If a required
version is unavailable, report the error instead of substituting a different one.
Keep the generated package-lock.json for repeatable installs; a plain npm install
can reuse its locked version.
Read node_modules/@pinegrow/piny/AGENT_SETUP.md for the installed instructions.

Run npm run dev. Reuse an existing server for this project if one is running;
warn before restarting because that clears Piny's Undo history. The Vite config
binds to 127.0.0.1, chooses an available port and opens /__piny/.
Run npx --no-install piny doctor --json and npx --no-install piny status --json.
Use the actual server.editorUrl from status. Open it in a local desktop
Chromium browser, or give me that URL if you cannot open it.
Keep the server on HTTP loopback and use one active editor session.

Piny and this app share an origin, so use trusted source and dependencies.
Do not enable a remote host, add HTTPS, start a license trial, or activate a
license for me. Leave existing license settings unchanged.
Free is enough for the first edits below.

Keep piny.project.json, .piny/components.json, .piny/internal.json and the
static previews: they describe the pages and component library.
Keep .piny/metadata-reviews.json with them: it records the reviewed demo baseline.
Piny reports when later source, descriptions or preview inputs need review.
If I later change component examples, run npm run previews to refresh them.
Do not commit .piny/local.json, .piny/cache, node_modules or dist.

Report the installed Piny version, editor URL and any setup problem, without
exposing secrets.
```

## Try your first edits

These work with Piny Free:

1. Click **IN THE MAKING** above the large photo and change its text.
2. Give that text a different color in Properties.
3. Use **Undo** to restore your changes.

Turn on **Test clicks** to browse projects and use the app's buttons.
Projects you add in the app disappear when you reload.

## Explore with Pro

With Piny Pro or a trial, use **Content** to edit the featured project details.
Visit **Component guide** to try component settings and browse the **Insert**
library. Existing Piny Pro users can use their current license.

## Make it yours

The demo code and included images are available under [MIT](LICENSE).
[shadcn/ui notices](SHADCN-LICENSE) are included. Piny has its own license.
The studio, people and projects are fictional.

For help with Piny, [contact support](mailto:support@pinegrow.com).
