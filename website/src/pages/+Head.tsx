import React from 'react';
import { usePageContext } from 'vike-react/usePageContext';
import { SHORT_SITE_NAME, SITE_NAME, SITE_URL } from '~/constants.js';
import { getSetting } from '~/utils/getSetting.js';

export function Head() {
    const pageContext = usePageContext();

    const title = getSetting(pageContext, 'title') ?? '';
    const description = getSetting(pageContext, 'description') ?? '';
    const previewImageUrl = getSetting(pageContext, 'previewImageUrl') ?? `${SITE_URL}preview.jpg`;

    return (
        <>
            {description && <meta name="description" content={description} />}
            <meta name="content-language" content="ru" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="apple-mobile-web-app-title" content={SHORT_SITE_NAME} />
            <meta name="application-name" content={SHORT_SITE_NAME} />
            <meta name="msapplication-TileColor" content="#221f27" />
            <meta name="theme-color" content="#ffffff" />
            <meta name="referrer" content="origin-when-crossorigin" />

            {/* OPEN GRAPH */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:url" content={`${SITE_URL}${pageContext.urlPathname}`} />
            <meta property="og:image" content={previewImageUrl} />
            <meta property="og:description" content={description} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:locale" content="ru_RU" />

            {/* TWITTER */}
            <meta name="twitter:site" content={SITE_NAME} />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:creator" content={SITE_URL} />
            <meta name="twitter:domain" content={SITE_URL} />
            <meta name="twitter:title" content={title} />
            {description && <meta name="twitter:description" content={description} />}
            {previewImageUrl && <meta name="twitter:image:src" content={previewImageUrl} />}

            <link
                rel="preload"
                href="/subset-Roboto-Regular.woff2"
                as="font"
                type="font/woff2"
                crossOrigin="anonymous"
            />
            <link
                rel="preload"
                href="/subset-Roboto-Bold.woff2"
                as="font"
                type="font/woff2"
                crossOrigin="anonymous"
            />
            <link
                rel="preload"
                href="/subset-Montserrat-ExtraBold.woff2"
                as="font"
                type="font/woff2"
                crossOrigin="anonymous"
            />

            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon shortcut" type="image/png" href="/favicon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/webmanifest.json" />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@graph': [
                            {
                                '@type': 'WebPage',
                                '@id': `${SITE_URL}${pageContext.urlPathname}`,
                                name: title || SITE_NAME,
                                description,
                                inLanguage: 'ru-RU',
                                url: `${SITE_URL}${pageContext.urlPathname}`,
                                isPartOf: {
                                    '@id': `${SITE_URL}#website`,
                                },
                                potentialAction: [
                                    {
                                        '@type': 'ReadAction',
                                        target: `${SITE_URL}${pageContext.urlPathname}`,
                                    },
                                ],
                            },
                            {
                                '@type': 'WebSite',
                                '@id': `${SITE_URL}#website`,
                                url: SITE_URL,
                                name: SITE_NAME,
                                description:
                                    'Разработка Web3 проектов и продвижение их. Авторские курсы и статьи от признанного эксперта и крипто-энтузиаста',
                                inLanguage: 'ru-RU',
                                publisher: { '@id': `${SITE_URL}#author` },
                            },
                            {
                                '@type': 'Person',
                                '@id': `${SITE_URL}#author`,
                                name: 'Влад Орлов',
                                alternateName: 'Vladislav Orlov',
                                affiliation: {
                                    '@type': 'Organization',
                                    '@id': 'https://www.meetsidekick.com/#organization',
                                    name: 'Sidekick Browser',
                                },
                                url: SITE_URL,
                                image: `${SITE_URL}avatar.jpg`,
                                alumniOf: {
                                    '@type': 'CollegeOrUniversity',
                                    name: 'СибГУТИ',
                                },
                                knowsAbout: ['Web3-developer', 'Computer Science'],
                                sameAs: [
                                    'https://twitter.com/w7itcom',
                                    'https://instagram.com/w7itcom',
                                    'https://t.me/w7itcom',
                                    'https://github.com/w7it',
                                ],
                            },
                        ],
                    }),
                }}
            />
        </>
    );
}
