declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]] & Render;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<S>;
		}) => string | Promise<string>;
	};
	export function defineCollection<S extends BaseSchema>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	type EntryMapKeys = keyof typeof entryMap;
	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidEntrySlug<C extends EntryMapKeys> = AllValuesOf<(typeof entryMap)[C]>['slug'];

	export function getEntryBySlug<
		C extends keyof typeof entryMap,
		E extends ValidEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getCollection<C extends keyof typeof entryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof typeof entryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		Required<ContentConfig['collections'][C]>['schema']
	>;

	type Render = {
		render(): Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	};

	const entryMap: {
		"blog": {
"1-test-article.md": {
  id: "1-test-article.md",
  slug: "1-test-article",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"a-simple-pubsub-module-in-javascript.md": {
  id: "a-simple-pubsub-module-in-javascript.md",
  slug: "a-simple-pubsub-module-in-javascript",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"adding-tab-support-to-textareas.md": {
  id: "adding-tab-support-to-textareas.md",
  slug: "adding-tab-support-to-textareas",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"automatically-adapting-the-height-textarea.md": {
  id: "automatically-adapting-the-height-textarea.md",
  slug: "automatically-adapting-the-height-textarea",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"automatically-loading-grunt-tasks-with-matchdep.md": {
  id: "automatically-loading-grunt-tasks-with-matchdep.md",
  slug: "automatically-loading-grunt-tasks-with-matchdep",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"better-webfont-loading-with-localstorage-and-woff2.md": {
  id: "better-webfont-loading-with-localstorage-and-woff2.md",
  slug: "better-webfont-loading-with-localstorage-and-woff2",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"building-desktop-apps-with-node-js-and-web-technologies.md": {
  id: "building-desktop-apps-with-node-js-and-web-technologies.md",
  slug: "building-desktop-apps-with-node-js-and-web-technologies",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"comparison-helper-for-handlebars.md": {
  id: "comparison-helper-for-handlebars.md",
  slug: "comparison-helper-for-handlebars",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"defining-properties-in-javascript.md": {
  id: "defining-properties-in-javascript.md",
  slug: "defining-properties-in-javascript",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"defining-properties-on-prototypes-in-javascript.md": {
  id: "defining-properties-on-prototypes-in-javascript.md",
  slug: "defining-properties-on-prototypes-in-javascript",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"demistifying-angularjs-dependency-injection.md": {
  id: "demistifying-angularjs-dependency-injection.md",
  slug: "demistifying-angularjs-dependency-injection",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"developing-single-page-apps-with-mithril.md": {
  id: "developing-single-page-apps-with-mithril.md",
  slug: "developing-single-page-apps-with-mithril",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"displaying-icons-with-custom-elements.md": {
  id: "displaying-icons-with-custom-elements.md",
  slug: "displaying-icons-with-custom-elements",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"error-handling-in-javascript.md": {
  id: "error-handling-in-javascript.md",
  slug: "error-handling-in-javascript",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"fat-arrows-for-javascript.md": {
  id: "fat-arrows-for-javascript.md",
  slug: "fat-arrows-for-javascript",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"finally-always-wins-unless-you-crash-your-computer-meanwhile.md": {
  id: "finally-always-wins-unless-you-crash-your-computer-meanwhile.md",
  slug: "finally-always-wins-unless-you-crash-your-computer-meanwhile",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"finding-a-random-document-in-mongodb.md": {
  id: "finding-a-random-document-in-mongodb.md",
  slug: "finding-a-random-document-in-mongodb",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"first-year-of-blogging.md": {
  id: "first-year-of-blogging.md",
  slug: "first-year-of-blogging",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"generating-sound-effects-with-client-side-javascript.md": {
  id: "generating-sound-effects-with-client-side-javascript.md",
  slug: "generating-sound-effects-with-client-side-javascript",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"hosting-static-web-pages-and-assets-with-google-drive.md": {
  id: "hosting-static-web-pages-and-assets-with-google-drive.md",
  slug: "hosting-static-web-pages-and-assets-with-google-drive",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"how-to-create-uuid-with-javascript.md": {
  id: "how-to-create-uuid-with-javascript.md",
  slug: "how-to-create-uuid-with-javascript",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"how-to-redirect-www-to-naked-domain-and-vice-versa-with-nginx.md": {
  id: "how-to-redirect-www-to-naked-domain-and-vice-versa-with-nginx.md",
  slug: "how-to-redirect-www-to-naked-domain-and-vice-versa-with-nginx",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"how-to-register-a-bower-package.md": {
  id: "how-to-register-a-bower-package.md",
  slug: "how-to-register-a-bower-package",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"loading-webfonts-with-high-performance.md": {
  id: "loading-webfonts-with-high-performance.md",
  slug: "loading-webfonts-with-high-performance",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"logging-javascript-errors.md": {
  id: "logging-javascript-errors.md",
  slug: "logging-javascript-errors",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"mailto-url-parameters.md": {
  id: "mailto-url-parameters.md",
  slug: "mailto-url-parameters",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"one-more-reason-to-check-for-strict-equality-in-javascript.md": {
  id: "one-more-reason-to-check-for-strict-equality-in-javascript.md",
  slug: "one-more-reason-to-check-for-strict-equality-in-javascript",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"optimistic-page-loading-with-instantclick-io.md": {
  id: "optimistic-page-loading-with-instantclick-io.md",
  slug: "optimistic-page-loading-with-instantclick-io",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"panning-and-scrolling-background-images-using-the-canvas-element.md": {
  id: "panning-and-scrolling-background-images-using-the-canvas-element.md",
  slug: "panning-and-scrolling-background-images-using-the-canvas-element",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"plain-javascript-event-delegation.md": {
  id: "plain-javascript-event-delegation.md",
  slug: "plain-javascript-event-delegation",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"playing-mario-in-the-browser.md": {
  id: "playing-mario-in-the-browser.md",
  slug: "playing-mario-in-the-browser",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"practical-feature-toggles.md": {
  id: "practical-feature-toggles.md",
  slug: "practical-feature-toggles",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"serve-a-practical-command-line-webserver.md": {
  id: "serve-a-practical-command-line-webserver.md",
  slug: "serve-a-practical-command-line-webserver",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"simple-usability-trick-for-google-maps.md": {
  id: "simple-usability-trick-for-google-maps.md",
  slug: "simple-usability-trick-for-google-maps",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"static-site-generation-boilerplate.md": {
  id: "static-site-generation-boilerplate.md",
  slug: "static-site-generation-boilerplate",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"strange-error-when-installing-npm-package-globally-on-ubuntu.md": {
  id: "strange-error-when-installing-npm-package-globally-on-ubuntu.md",
  slug: "strange-error-when-installing-npm-package-globally-on-ubuntu",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"strong-caching-with-nginx.md": {
  id: "strong-caching-with-nginx.md",
  slug: "strong-caching-with-nginx",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"switching-background-color-with-gimp.md": {
  id: "switching-background-color-with-gimp.md",
  slug: "switching-background-color-with-gimp",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"things-we-can-lear-from-game-developers.md": {
  id: "things-we-can-lear-from-game-developers.md",
  slug: "things-we-can-lear-from-game-developers",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"tracking-clicks-with-google-analytics.md": {
  id: "tracking-clicks-with-google-analytics.md",
  slug: "tracking-clicks-with-google-analytics",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"video-douglas-crockford-about-the-new-good-parts.md": {
  id: "video-douglas-crockford-about-the-new-good-parts.md",
  slug: "video-douglas-crockford-about-the-new-good-parts",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"what-a-browser-can-do.md": {
  id: "what-a-browser-can-do.md",
  slug: "what-a-browser-can-do",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"why-i-chose-a-statically-generated-website.md": {
  id: "why-i-chose-a-statically-generated-website.md",
  slug: "why-i-chose-a-statically-generated-website",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"wow-i-started-a-blog.md": {
  id: "wow-i-started-a-blog.md",
  slug: "wow-i-started-a-blog",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
},
"snippets": {
"00001.md": {
  id: "00001.md",
  slug: "00001",
  body: string,
  collection: "snippets",
  data: any
},
"00002.md": {
  id: "00002.md",
  slug: "00002",
  body: string,
  collection: "snippets",
  data: any
},
"00003.md": {
  id: "00003.md",
  slug: "00003",
  body: string,
  collection: "snippets",
  data: any
},
"00004.md": {
  id: "00004.md",
  slug: "00004",
  body: string,
  collection: "snippets",
  data: any
},
},

	};

	type ContentConfig = typeof import("../src/content/config");
}
