import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { execSync } from 'node:child_process';
import { paraglideVitePlugin } from '@inlang/paraglide-js';

const versionText = (() => {
  const CI = Boolean(process.env.CI || false);
  const commitHash = execSync('git rev-parse --short HEAD').toString().trim();
  const nowISO = new Date().toISOString();
  const buildDate = CI ? nowISO.replace(/(?=T).+?(?=Z)/, '') : nowISO;
  const prefix = CI ? 'Version' : 'Develop';

  return `${commitHash} (${buildDate})`;
})();

console.log(versionText);

export default defineConfig({
  plugins: [
    sveltekit(),
    paraglideVitePlugin({
      project: './project.inlang',
      outdir: './src/lib/paraglide',
      strategy: ['url', 'localStorage', 'cookie', 'preferredLanguage', 'baseLocale'],
      disableAsyncLocalStorage: true,
    }),
  ],
  define: {
    __VITE_BUILD_VERSION: JSON.stringify(versionText),
  },
});
