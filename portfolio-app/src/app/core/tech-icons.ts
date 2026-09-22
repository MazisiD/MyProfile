// Maps technology / framework / tool names (as they appear in the resume and
// Firestore content) to simple-icons (https://simpleicons.org) slugs, served
// via the public cdn.simpleicons.org CDN so no icon assets need to be bundled.
// Names with no known slug simply render without an icon (graceful fallback).
const TECH_ICON_SLUGS: Record<string, string> = {
  'c#': 'csharp',
  '.net': 'dotnet',
  angular: 'angular',
  typescript: 'typescript',
  javascript: 'javascript',
  python: 'python',
  java: 'openjdk',
  'c++': 'cplusplus',
  mysql: 'mysql',
  postgresql: 'postgresql',
  django: 'django',
  git: 'git',
  'azure devops': 'azuredevops',
  'azure pipelines': 'azuredevops',
  'github copilot': 'githubcopilot',
  claude: 'claude',
  github: 'github',
  html: 'html5',
  css: 'css3',
};

/**
 * Returns a CDN URL for a small colored icon matching the given technology
 * name, or `null` if there's no known icon for it (caller should render
 * just the text label in that case).
 */
export function techIconUrl(name: string, color = '7d8ea0'): string | null {
  const slug = TECH_ICON_SLUGS[name.trim().toLowerCase()];
  return slug ? `https://cdn.simpleicons.org/${slug}/${color}` : null;
}
