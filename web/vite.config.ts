import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { site } from './src/config/site';

/** Ensures a leading and trailing slash (`/repo/`, `/`). */
function normalizeBase(value: string): string {
  const trimmed = value.trim().replace(/^\/+|\/+$/g, '');
  return trimmed ? `/${trimmed}/` : '/';
}

/** Ensures a trailing slash on an absolute URL. */
function normalizeUrl(value: string): string {
  return value.trim().replace(/\/*$/, '/');
}

/**
 * Fills the `{{TOKENS}}` of index.html (canonical URL, Open Graph, structured data) from the build mode and the
 * central site configuration, so the version and the URLs are defined in one place only.
 */
function htmlTokens(siteUrl: string): Plugin {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: site.name,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Windows',
    softwareVersion: site.version,
    downloadUrl: site.downloadUrl,
    url: siteUrl,
    author: { '@type': 'Person', name: site.developer },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };
  const tokens: Record<string, string> = {
    SITE_URL: siteUrl,
    SITE_NAME: site.name,
    VERSION: site.version,
    DESCRIPTION: site.description,
    DEVELOPER: site.developer,
    DOWNLOAD_URL: site.downloadUrl,
    REPOSITORY_URL: site.repositoryUrl,
    STRUCTURED_DATA: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
  };
  return {
    name: 'luna-html-tokens',
    transformIndexHtml(html) {
      return html.replace(/\{\{([A-Z_]+)\}\}/g, (match, key: string) => tokens[key] ?? match);
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'SITE_');
  const base = normalizeBase(env.SITE_BASE ?? '/');
  const siteUrl = normalizeUrl(env.SITE_URL ?? `https://korikashi.github.io${base}`);

  return {
    base,
    plugins: [react(), htmlTokens(siteUrl)],
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      assetsInlineLimit: 0,
    },
  };
});
