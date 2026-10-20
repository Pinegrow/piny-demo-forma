FORMA component guide

With Piny Pro or a trial, use the FORMA categories in Insert for ready-to-use studio components. Each
component has a useful default and several named presets. Presets write ordinary
JSX props, import the component when needed, and use Piny's shared source Undo.

Studio heading
A small overline, a page title, and supporting copy. Choose left alignment for
the workspace or the centered preset for a presentation. Description uses a
multiline editor; title and description have deliberately generous length limits.

Studio metric
Display values are strings, allowing intentional formatting such as €48.2k.
Show comparison controls the presentation of the comparison text and direction
fields. Turning it off retains those values in the source. Highlight is an
optional boolean; Add uses false, while the revenue preset explicitly writes true.

Project card
The native image picker selects a public image URL. Image description supplies
the accessible alt text. Open project uses the named-route picker; Completion
uses a range from 0 to 100 with a step of 1. Presets provide coherent sample
values, but project status and progress stay independent editorial choices.

Studio announcement
The announcement has warm, neutral and ink surfaces, a hexadecimal accent color,
and an optional action. Show action controls the two action fields without
deleting their authored values. The quiet preset is useful for a simple note.

Studio action
A scalar wrapper around the unchanged shadcn/ui Button and Radix Slot. The
destination accepts relative URLs or HTTP(S), mailto and tel links. A disabled
action becomes an actual disabled button. The disabled control is Advanced.

Selection and scope
Shift-click a component in the preview, or select its usage in the Tree, to edit
that invocation's props. Ordinary clicks can enter the component implementation.
Repeated invocations share their JSX source. A source record feeding a mapped
card can also be edited through the Content workspace's proven record fields.
Metadata describes supported scalar props; it does not override source proofs.
Every curated wrapper also forwards an optional className to its outer element.
Use Visual Properties or Class Inspector to style one usage; the raw className
is hidden from the scalar metadata form to avoid presenting two competing fields.

Static previews
The Library previews are static HTML snapshots generated from these wrappers.
They use the application's CSS and the same public photographs. They do not run
component interactions. To refresh after a component or sample change, run the
project's previews script.

Deliberate boundaries
The original shadcn Button and Card sources are unchanged, with provenance in
registry-sources.json and their MIT notice in SHADCN-LICENSE. Their complex types
and cva definitions are not advertised as scalar insertion contracts. The demo
does not declare unsupported metadata slot policies, page templates, design
semantics, or Content mapping rules. Its Content behavior comes from the actual
React source, independently of this metadata.
