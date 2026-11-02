const CONTENT_OWNER = 'Divyansh-Gupta-Web3';
const CONTENT_REPO = 'Bookish';
const CONTENT_FILE = 'site-content.enc.json';
const CONTENT_BRANCH = 'main';

const SITE_REPO = 'Bookish-Aspirants';
const SITE_WORKFLOW = 'deploy.yml';
const SITE_BRANCH = 'main';

const CONTENTS_URL = `https://api.github.com/repos/${CONTENT_OWNER}/${CONTENT_REPO}/contents/${CONTENT_FILE}`;
const DISPATCH_URL = `https://api.github.com/repos/${CONTENT_OWNER}/${SITE_REPO}/actions/workflows/${SITE_WORKFLOW}/dispatches`;

export const TOKEN_STORAGE_KEY = 'bookish-admin-token';

function headers(token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
}

async function githubError(response: Response): Promise<Error> {
  if (response.status === 401) return new Error('This GitHub token is invalid or expired.');
  if (response.status === 403 || response.status === 404) {
    return new Error('This GitHub token does not have access to the content repository.');
  }
  const body = (await response.json().catch(() => ({}))) as { message?: string };
  return new Error(`GitHub responded ${response.status}: ${body.message ?? response.statusText}`);
}

function decodeBase64Utf8(value: string): string {
  const binary = atob(value.replace(/\n/g, ''));
  return new TextDecoder().decode(Uint8Array.from(binary, (char) => char.charCodeAt(0)));
}

function encodeBase64Utf8(value: string): string {
  const bytes = new TextEncoder().encode(value);
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

export async function readContentFile(token: string): Promise<{ sha: string; content: unknown }> {
  const response = await fetch(`${CONTENTS_URL}?ref=${CONTENT_BRANCH}`, { headers: headers(token), cache: 'no-store' });
  if (!response.ok) throw await githubError(response);
  const file = (await response.json()) as { sha: string; content: string };
  return { sha: file.sha, content: JSON.parse(decodeBase64Utf8(file.content)) };
}

export async function writeContentFile(token: string, content: unknown): Promise<string> {
  const { sha } = await readContentFile(token);
  const response = await fetch(CONTENTS_URL, {
    method: 'PUT',
    headers: { ...headers(token), 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: `Update site content from admin panel (${new Date().toISOString()})`,
      content: encodeBase64Utf8(`${JSON.stringify(content, null, 2)}\n`),
      sha,
      branch: CONTENT_BRANCH,
    }),
  });
  if (!response.ok) throw await githubError(response);
  const result = (await response.json()) as { commit: { html_url: string } };
  return result.commit.html_url;
}

export async function triggerRedeploy(token: string): Promise<boolean> {
  const response = await fetch(DISPATCH_URL, {
    method: 'POST',
    headers: { ...headers(token), 'Content-Type': 'application/json' },
    body: JSON.stringify({ ref: SITE_BRANCH }),
  });
  return response.status === 204;
}
