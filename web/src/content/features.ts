/**
 * Features of Luna WorkStation 1.0.0, verified against the application's source code and documentation.
 * Do not add features that are not shipped in the public build.
 */
import type { IconName } from '../components/Icon';

export interface Feature {
  icon: IconName;
  title: string;
  text: string;
  /** Shown with an "Experimental" badge: available, but off by default. */
  experimental?: boolean;
}

export const features: Feature[] = [
  {
    icon: 'monitor',
    title: 'Local desktops in tabs',
    text:
      'Each desktop is a Remote Desktop session on this computer, embedded in its own tab with the native Windows ' +
      'Remote Desktop control. No separate Remote Desktop windows to juggle.',
  },
  {
    icon: 'grid',
    title: 'Grid 2×2 view',
    text:
      'Watch up to four live sessions at once. Press Grid 2×2 again to return to the tab you came from; sessions ' +
      'stay connected while you switch.',
  },
  {
    icon: 'fullscreen',
    title: 'Full screen and resolution',
    text:
      'Switch a session to full screen, change its resolution or fit it to the window, and send Ctrl+Alt+Del ' +
      'from the toolbar.',
  },
  {
    icon: 'home',
    title: 'Desktop library and Home',
    text:
      'Create, search, pin and reorder desktops. Home summarizes configured desktops, open tabs, connected ' +
      'sessions and the Remote Desktop status, and can enable Remote Desktop for you.',
  },
  {
    icon: 'shield',
    title: 'Windows account management',
    text:
      'Create the local Windows account for a desktop and add it to Remote Desktop Users, with optional ' +
      'administrator rights. For existing accounts, Luna lists every change before applying it and verifies the result.',
  },
  {
    icon: 'logoff',
    title: 'Disconnect or log off',
    text:
      'Disconnect to keep the Windows session running in the background, or log off to end it. Luna only acts ' +
      'on the exact session that belongs to each tab, never on sessions matched by user name.',
  },
  {
    icon: 'sliders',
    title: 'Per-desktop settings',
    text:
      'Give each desktop its own name, audio, resolution and graphics mode: Quality keeps the full Windows ' +
      'experience, Performance drops wallpaper, animations and visual effects.',
  },
  {
    icon: 'play',
    title: 'Automation with AutoHotkey',
    text:
      'Launch programs when a desktop connects, with window detection, an optional trigger key and a start delay. ' +
      'Restart sessions on a schedule, reconnect after unexpected disconnections and cap the Roblox frame rate. ' +
      'AutoHotkey v2 is included in the installer.',
  },
  {
    icon: 'folder',
    title: 'Folders and files',
    text: 'Keep local folders as templates and deploy them to any desktop at a relative path, such as Desktop\\Macro.',
  },
  {
    icon: 'palette',
    title: 'Appearance',
    text:
      'Dark interface with six accent presets or your own color, thin square borders (Windows 10 style) or ' +
      'rounded borders (Windows 11 style), in English or Spanish.',
  },
  {
    icon: 'activity',
    title: 'System monitor and Discord',
    text:
      'Optional CPU, RAM, GPU, temperature and uptime readings in the status bar, where the computer provides them, ' +
      'and optional Discord Rich Presence.',
  },
  {
    icon: 'refresh',
    title: 'Built-in updates',
    text:
      'Luna checks the official Releases for new stable versions, verifies the installer with SHA-256 and updates ' +
      'while keeping your settings, desktops and profiles.',
  },
  {
    icon: 'flask',
    title: 'Resource limits',
    text:
      'Limit the memory and CPU cores used by the processes of a desktop session with Windows Job Objects. Turn ' +
      'on experimental features in Settings to use it.',
    experimental: true,
  },
];

/** Security notes shown under the feature grid. */
export const securityNotes: string[] = [
  'Only local targets are allowed: loopback addresses from 127.0.0.2 to 127.0.0.254.',
  'Desktop passwords are encrypted with Windows DPAPI and never written to logs.',
  'Accounts are managed through the Windows API, without passing passwords on command lines.',
];
