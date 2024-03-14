import type React from "react";

export const Footer: React.FC = () => {
    return (
        <footer className="container my-4 p-4 mx-auto text-center text-gray-500 text-sm max-w-lg">
            © 2017-{new Date().getFullYear()} Все права защищены,
            ИП&nbsp;Орлов&nbsp;Владислав&nbsp;Олегович.
            ОГРНИП&nbsp;323420500109374&nbsp;ИНН&nbsp;425302732814{" "}
            <a
                href="https://github.com/w7it/w7it"
                target="_blank"
                rel="noreferrer"
                className="underline"
            >
                Исходники&nbsp;на&nbsp;GitHub
            </a>
            <span itemScope itemType="r" className="d-none">
                <meta itemProp="copyrightYear" content="%year%" />
                <meta
                    itemProp="copyrightHolder"
                    content="ИП Орлов Владислав Олегович"
                />
            </span>
        </footer>
    );
};
