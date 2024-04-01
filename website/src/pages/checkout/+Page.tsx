import type React from "react";
import { useEffect, useRef } from "react";
import { usePaymentBlocks } from "#hooks/usePaymentBlocks.js";
import { CLOUD_PAYMENTS_PUBLIC_ID } from "#constants.mjs";

export const Page: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const PaymentsBlock = usePaymentBlocks();

    useEffect(() => {
        if (!PaymentsBlock) return;
        if (!ref.current) return;

        const blocksApp = new PaymentsBlock(
            {
                publicId: CLOUD_PAYMENTS_PUBLIC_ID,
                description: "Оплата консультации в w7it.com",
                amount: 5000,
                currency: "RUB",
                requireEmail: true,
            },
            {
                appearance: {
                    colors: {
                        primaryButtonColor: "#375d8d",
                        primaryButtonTextColor: "#ffffff",
                        primaryHoverButtonColor: "#839fc4",
                        primaryButtonHoverTextColor: "#ffffff",
                        activeInputColor: "#0b1e46",
                        inputBackground: "#ffffff",
                        inputColor: "#8c949f",
                        inputBorderColor: "#e2e8ef",
                        errorColor: "#eb5757",
                    },
                    borders: {
                        radius: "8px",
                    },
                },
            },
        );

        blocksApp.mount(ref.current);

        return () => {
            blocksApp.unmount();
        };
    }, [PaymentsBlock]);

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl text-center font-display mb-8">
                Оплата консультации
            </h1>

            <p>
                После оплаты с вами свяжутся и пришлют ссылку на выбор времени и
                даты для проведения устной консультации
            </p>

            <div
                className="mt-16 max-w-xl mx-auto border border-primary/10 rounded-xl min-h-80 p-8"
                ref={ref}
            />
        </div>
    );
};
