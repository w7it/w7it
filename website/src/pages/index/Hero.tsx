import React from 'react';
import TelegramFillIcon from 'remixicon-react/TelegramFillIcon.js';
import InstagramFillIcon from 'remixicon-react/InstagramFillIcon.js';
import LinkedinFillIcon from 'remixicon-react/LinkedinFillIcon.js';
import { HeroImage } from '~/components/HeroImage.js';
import { SidekickIcon } from './SidekickIcon.js';
import { HuntAssessmentIcon } from './HuntAssessmentIcon.js';
import { TwitterXFillIcon } from './TwitterXFillIcon.js';

export const Hero: React.FC = () => {
    return (
        <div className="overflow-x-hidden">
            <div className="container mx-auto p-8">
                <div className="grid gap-x-4 gap-y-16 lg:grid-cols-2 items-center">
                    <div className="lg:order-last">
                        <HeroImage />
                    </div>

                    <div>
                        <h1 className="font-display text-3xl">Приветствую!</h1>
                        <p className="text-xl mt-2">
                            Меня зовут Влад, я айтишник со стажем. Здесь вы можете узнать больше обо
                            мне и моих проектах.
                        </p>

                        <h2 className="font-display text-3xl mt-8">Коротко обо мне</h2>
                        <ul className="mt-2 text-xl list-disc ms-8">
                            <li>
                                За плечами 10+ лет опыта в качестве full-stack разработчика в разных
                                командах и компаниях
                            </li>
                            <li>Понимаю как создавать продукты и их продавать</li>
                            <li>
                                Пишу мысли о стартапах/бизнесах в{' '}
                                <a
                                    href="https://t.me/+6SmymYLA1b1jOTZi"
                                    className="text-primary underline"
                                >
                                    свой блог
                                </a>
                            </li>
                        </ul>
                        <a
                            className="block text-center text-gray-800 px-8 py-4 rounded-lg border border-primary/25 transition hover:bg-primary-light hover:text-white font-bold mt-4 text-lg"
                            href="/about"
                        >
                            Читать другие 100 фактов обо мне
                        </a>
                    </div>
                </div>

                <h2 className="font-display text-3xl mt-8">Мои проекты</h2>
                <p className="text-xl mt-2">
                    Я начинал и участвовал во многих проектах. Ниже проекты, которым я уделяю свое
                    внимание и время в данный момент:
                </p>
                <div className="grid md:grid-cols-2 mt-4 gap-4">
                    <ExternalLink
                        href="https://meetsidekick.com/?utm_source=w7it"
                        icon={<SidekickIcon size={48} />}
                        title="Sidekick Browser"
                        description="Браузер для продуктивных людей"
                    />
                    <ExternalLink
                        href="https://huntassessment.ru/?utm_source=w7it"
                        icon={<HuntAssessmentIcon size={32} />}
                        title="ХантАссессмент.ру"
                        description="Uber для ассессмента IT-специалистов"
                    />
                </div>

                <h2 className="font-display text-3xl mt-8">Где меня найти</h2>
                <p className="text-xl mt-2">
                    Я публично доступен в нескольких социальных сетях, которые лично сам и веду.
                </p>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <ExternalLink
                        href="https://t.me/+6SmymYLA1b1jOTZi"
                        icon={<TelegramFillIcon size={32} />}
                        title="Telegram"
                        description="Канал куда я выгружаю умные мысли"
                    />
                    <ExternalLink
                        href="https://instagram.com/orlov_vo"
                        icon={<InstagramFillIcon size={32} />}
                        title="Instagram"
                        description="Фоточки и сториз из моей жизни"
                    />
                    <ExternalLink
                        href="https://linkedin.com/in/w7it"
                        icon={<LinkedinFillIcon size={32} />}
                        title="LinkedIn"
                        description="Мой рабочий профиль"
                    />
                    <ExternalLink
                        href="https://x.com/w7itcom"
                        icon={<TwitterXFillIcon size={32} />}
                        title="X.com (ex. Twitter)"
                        description="Тут просто шитпостинг"
                    />
                </div>
            </div>
        </div>
    );
};

type ExternalLinkProps = {
    href: string;
    icon: React.ReactNode;
    title: string;
    description?: string;
};

function ExternalLink(props: ExternalLinkProps) {
    const { href, icon, title, description } = props;
    return (
        <a
            className="group flex text-center text-primary p-4 gap-2 rounded-lg border border-primary/25 items-center transition hover:bg-primary-light hover:text-white"
            href={href}
            target="_blank"
        >
            <div className="w-12 flex-0 flex justify-center">{icon}</div>
            <div className="text-start">
                <div className="text-lg leading-6 text-gray-800 font-bold transition group-hover:text-white">
                    {title}
                </div>
                {description && (
                    <div className="text-md text-gray-600 transition group-hover:text-gray-200/80">
                        {description}
                    </div>
                )}
            </div>
        </a>
    );
}
