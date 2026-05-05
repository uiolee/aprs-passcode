import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const CI = Boolean(process.env.CI || false);

/** @type {import('@sveltejs/kit').Config} */
const config = {
  compilerOptions: {
    // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
    runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true),
  },
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      // default options are shown. On some platforms
      // these options are set automatically — see below
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: CI,
      strict: true,
    }),
    paths: {
      relative: false,
    },
    csp: {
      directives: {
        'default-src': ['none'],
        'base-uri': ['self'],
        'connect-src': ['self', 'https://cdnjs.cloudflare.com', 'https://cloudflareinsights.com'],
        'font-src': ['self', 'https:'],
        'form-action': ['self'],
        'frame-ancestors': ['self'],
        'img-src': ['self', 'https:', 'data:'],
        'manifest-src': ['self'],
        'object-src': ['none'],
        'script-src': ['self', 'https://static.cloudflareinsights.com', 'unsafe-inline'],
        'style-src': ['self', 'https:', 'unsafe-inline'],
        'worker-src': ['self'],
      },
    },
  },
};

export default config;
