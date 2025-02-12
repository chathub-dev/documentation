/**
 * This file generates the docs.json file.
 */

import fs from 'fs'

const languages = ['en', 'es', 'pt', 'jp', 'cn']

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
    languages: languages.map((language) => ({
      language,
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
              ],
            },
            {
              group: 'Premium Features',
              pages: [
                'premium-features/file-upload',
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
              pages: ['membership/comparison', 'membership/subscription', 'membership/lifetime'],
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
    })),
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
