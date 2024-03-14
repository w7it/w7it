import type React from "react";
import meWebPicture from "./me.webp";
import meImage from "./me.png";

export const HeroImage: React.FC = () => {
    return (
        <div
            className="
                relative max-w-md mx-auto
                before:absolute before:bg-primary/30 before:rounded-full before:w-80 before:h-80 before:-z-10 before:top-8 before:left-48
                after:absolute after:bg-alt/10 after:rounded-full after:w-52 after:h-52 after:-z-10 after:top-32 after:right-64
            "
        >
            <figure>
                <picture>
                    <source srcSet={meWebPicture} type="image/webp" />
                    <img
                        src={meImage}
                        width="448"
                        height="640"
                        alt="Влад Орлов"
                    />
                </picture>

                <figcaption className="bg-primary/60 text-white px-6 py-4 rounded-lg absolute right-0 bottom-16">
                    <strong className="font-display font-extrabold text-lg">
                        Влад Орлов
                    </strong>
                    <div>Более 10 лет в IT-разработке</div>
                </figcaption>
            </figure>
        </div>
    );
};
