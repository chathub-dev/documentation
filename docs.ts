/**
 * This file generates the docs.json file.
 */

import fs from 'node:fs'

interface Navigation {
  tabs: Tab[]
}

interface Tab {
  tab: string
  groups: Group[]
}

interface Group {
  group: string
  pages: (string | Group)[]
}

const DEFAULT_NAVIGATION: Navigation = {
  tabs: [
    {
      tab: 'Documentation',
      groups: [
        {
          group: 'Overview',
          pages: ['introduction', 'overview/web-app', 'overview/chrome-extension', 'overview/ios-android-app'],
        },
        {
          group: 'Features',
          pages: [
            'features/chat-simultaneously',
            'features/image-upload',
            'features/prompt-library',
            'features/chat-history',
            'features/custom-instructions',
            'premium-features/file-upload',
            'features/code-interpreter',
          ],
        },
        {
          group: 'Premium Features',
          pages: [
            'premium-features/web-access',
            'premium-features/summarize-chat',
            'premium-features/code-preview',
            'premium-features/side-panel',
            {
              group: 'Custom Chatbots',
              pages: [
                'custom-chatbots/index',
                'custom-chatbots/openai',
                'custom-chatbots/openrouter',
                'custom-chatbots/ollama',
                'custom-chatbots/straico',
                'custom-chatbots/together',
                'custom-chatbots/xinference',
              ],
            },
          ],
        },
        {
          group: 'Membership',
          pages: ['membership/comparison', 'membership/subscription'],
        },
        {
          group: 'ChatHub AI Service',
          pages: ['cloud/index', 'cloud/image-generation'],
        },
        {
          group: 'Use Cases',
          pages: [
            'use-cases/educators',
            'use-cases/researchers',
            'use-cases/content-creators',
            'use-cases/hr',
            'use-cases/students',
          ],
        },
        {
          group: 'Miscellaneous',
          pages: [
            'miscellaneous/contact',
            'miscellaneous/faq',
            'miscellaneous/troubleshooting',
            'miscellaneous/desktop-app',
            'miscellaneous/update-manually',
          ],
        },
      ],
    },
    {
      tab: 'Changelog',
      groups: [
        {
          group: 'Changelog',
          pages: ['changelog/overview'],
        },
      ],
    },
  ],
}

interface LocaleConfig {
  language: string
  names: Record<string, string>
  translatedPages: string[]
}

const LOCALES: LocaleConfig[] = [
  {
    language: 'es',
    names: {
      Documentation: 'Documentación',
      Changelog: 'Registro de cambios',
    },
    translatedPages: [],
  },
  {
    language: 'pt',
    names: {
      Documentation: 'Documentação',
      Changelog: 'Registro de alterações',
    },
    translatedPages: [],
  },
  {
    language: 'fr',
    names: {
      Documentation: 'Documentation',
      Changelog: 'Journal des modifications',
    },
    translatedPages: [],
  },
  {
    language: 'jp',
    names: {
      Documentation: 'ドキュメント',
      Changelog: '更新履歴',
    },
    translatedPages: [],
  },
  {
    language: 'cn',
    names: {
      Documentation: '文档',
      Changelog: '更新日志',
    },
    translatedPages: ['membership/comparison'],
  },
]

function localize(navigation: Navigation, config: LocaleConfig): Navigation {
  const localizeGroup = (group: Group): Group => {
    return {
      group: config.names[group.group] ?? group.group,
      pages: group.pages.map((page) => {
        if (typeof page === 'string') {
          return config.translatedPages.includes(page) ? `${config.language}/${page}` : page
        }
        return localizeGroup(page)
      }),
    }
  }
  return {
    tabs: navigation.tabs.map((tab) => {
      return {
        tab: config.names[tab.tab] ?? tab.tab,
        groups: tab.groups.map(localizeGroup),
      }
    }),
  }
}

const configuration = {
  $schema: 'https://mintlify.com/docs.json',
  theme: 'mint',
  name: 'ChatHub Learning Center',
  colors: {
    primary: '#76afcc',
    light: '#76afcc',
    dark: '#449ac7',
  },
  favicon: '/logo/logo.png',
  navigation: {
    languages: [
      {
        language: 'en',
        ...DEFAULT_NAVIGATION,
      },
      ...LOCALES.map((config) => ({
        language: config.language,
        ...localize(DEFAULT_NAVIGATION, config),
      })),
    ],
    global: {
      anchors: [
        {
          anchor: 'Support',
          href: 'https://chathub.gg/support',
          icon: 'headset',
        },
      ],
    },
  },
  logo: {
    light: '/logo/logo.png',
    dark: '/logo/logo.png',
  },
  navbar: {
    links: [],
    primary: {
      type: 'button',
      label: 'Go to chathub.gg',
      href: 'https://chathub.gg',
    },
  },
  seo: {
    indexing: 'all',
  },
  footer: {
    socials: {
      website: 'https://chathub.gg',
      x: 'https://x.com/chathub_app',
      discord: 'https://discord.gg/sfxCcTjV98',
      youtube: 'https://www.youtube.com/@chathub_gg',
    },
  },
  integrations: {
    plausible: {
      domain: 'doc.chathub.gg',
      server: 'plausible.midway.run',
    },
  },
}

fs.writeFileSync('docs.json', JSON.stringify(configuration, null, 2))
