import logotypeWebPicture from "./logotype.webp";
import logotypeWebPicture2x from "./logotype@2x.webp";
import logotypeImage from "./logotype.jpg";
import logotypeImage2x from "./logotype@2x.jpg";

type Props = { readonly fixed?: boolean };

export const Header: React.FC<Props> = () => {
    return (
        <nav>
            <div className="container py-4 px-8 mx-auto flex justify-between">
                <div className="">
                    <a className="inline-flex items-center" href="/">
                        <picture className="rounded-full w-8 h-8 mr-2 overflow-hidden">
                            <source
                                srcSet={`${logotypeWebPicture2x} 2x, ${logotypeWebPicture}`}
                                type="image/webp"
                            />
                            <img
                                src={logotypeImage}
                                srcSet={`${logotypeImage2x} 2x, ${logotypeImage}`}
                                width="32"
                                height="32"
                                alt="Logo"
                            />
                        </picture>

                        <span className="flex flex-col">
                            <span className="text-lg leading-5">W7IT.com</span>
                            <span className="text-sm text-gray-600 leading-5">
                                Владислав Орлов
                            </span>
                        </span>
                    </a>
                </div>
                <div className="">
                    <a
                        href="https://t.me/w7it_bot"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-primary text-white rounded py-2 px-3 font-bold hover:bg-primary/90"
                    >
                        Связаться{" "}
                        <span className="hidden sm:inline">со мной</span>
                    </a>
                </div>
            </div>
        </nav>
    );
};
