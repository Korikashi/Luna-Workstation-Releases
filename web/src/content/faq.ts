/**
 * Frequently asked questions. Every answer is based on verified information from the application, its installer
 * and its documentation. Do not add answers that cannot be verified.
 */
import { site } from '../config/site';

export interface FaqItem {
  question: string;
  /** Paragraphs of the answer. */
  answer: string[];
}

export const faq: FaqItem[] = [
  {
    question: 'What is Luna WorkStation?',
    answer: [
      'Luna WorkStation is a desktop application for Windows that manages local Remote Desktop sessions. Each ' +
        'desktop runs as an independent Remote Desktop session on the same computer and is shown inside a tab of ' +
        'a single window, using the Remote Desktop control built into Windows.',
    ],
  },
  {
    question: 'What is it for?',
    answer: [
      'It lets you work with several Windows accounts on one computer at the same time: open each account in its ' +
        'own local session, view up to four of them in the Grid 2×2 view, and automate what happens when a desktop ' +
        'connects. It can also create and configure the local Windows accounts used by each desktop.',
      'Luna only connects to the computer it runs on (loopback addresses 127.0.0.2 to 127.0.0.254). It is not a ' +
        'client for remote computers.',
    ],
  },
  {
    question: 'Which versions of Windows are supported?',
    answer: [
      'Luna WorkStation requires 64-bit Windows; the installer stops on 32-bit systems. It relies on the Remote ' +
        'Desktop components included with Windows (mstscax.dll and atl.dll) and on the Remote Desktop service of ' +
        'the computer, which Luna can enable from its Home page.',
    ],
  },
  {
    question: 'What do I need to run it?',
    answer: [
      'A 64-bit Windows computer, an account with administrator rights and the Windows Remote Desktop components. ' +
        'Luna must be started from a local session of the computer: it does not start inside a Remote Desktop ' +
        'session, and only one instance can run on the computer at a time.',
      'AutoHotkey v2, used for automation, is included in the installer; no separate installation is needed.',
    ],
  },
  {
    question: 'Why does it ask for administrator permissions?',
    answer: [
      'Luna asks for administrator permissions (UAC) every time it starts, and the installer requires an ' +
        'administrator account. They are needed to enable Remote Desktop, create and configure local Windows ' +
        'accounts, log off Windows sessions, apply resource limits and run automations inside each session.',
    ],
  },
  {
    question: 'How do I install it?',
    answer: [
      `Download ${site.installerFileName} and run it. The installer is available in English and Spanish and ` +
        'shows the license agreement, which must be accepted. You can choose desktop and Start menu shortcuts and ' +
        'the installation folder (by default Program Files\\Luna WorkStation).',
      'Luna can be removed from Installed apps in Windows. Uninstalling keeps your settings and desktops, and ' +
        'never deletes the Windows accounts created or managed with Luna.',
    ],
  },
  {
    question: 'How do I update it?',
    answer: [
      'Luna checks the official Releases for new versions and can download and install them for you; the ' +
        'installer is verified with SHA-256 before it runs. You can also download the latest installer from this ' +
        'page and install it over the current version. Settings, desktops and profiles are preserved.',
    ],
  },
  {
    question: 'Is it free?',
    answer: [
      'Yes. Luna WorkStation is free of charge for personal and commercial use, under a proprietary license ' +
        `(EULA) shown during installation. Its source code is not public. If you want to support its development, ` +
        'you can do it on Ko-fi.',
    ],
  },
  {
    question: 'How do I report a problem?',
    answer: [
      `Write to ${site.contactEmail} describing what happened, your Windows version and the Luna version shown in ` +
        'Settings → About.',
      'If possible, attach the relevant lines of the debug log, found at %APPDATA%\\LunaWorkstation\\debug.log ' +
        '(the debug console of the application shows the same information). Review the log before sharing it: it ' +
        'may contain desktop names and Windows user names.',
    ],
  },
];
