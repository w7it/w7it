import type React from "react";

export const Footer: React.FC = () => {
    return (
        <footer className="container my-4 p-4 mx-auto text-center text-gray-500 text-sm max-w-lg">
            <div>
                © 2017-{new Date().getFullYear()} Все права защищены,
                ИП&nbsp;Орлов&nbsp;Владислав&nbsp;Олегович.
                <span itemScope itemType="r" className="d-none">
                    <meta itemProp="copyrightYear" content="%year%" />
                    <meta
                        itemProp="copyrightHolder"
                        content="ИП Орлов Владислав Олегович"
                    />
                </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:gap-2 justify-center">
                <a href="/terms-of-service" className="underline">
                    Публичная оферта
                </a>
                <a href="/privacy-policy" className="underline">
                    Политика конфиденциальности
                </a>
                <a
                    href="https://github.com/w7it/w7it"
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                >
                    Исходники
                </a>
            </div>
        </footer>
    );
};
