import { useEffect, useState } from "react";
import { useLoadScript } from "./useLoadScript.js";

declare class Widget {
    constructor(
        options: {
            /** Язык виджета (необязательно) */
            language?: "en-US" | "ru-RU";
            /** Поддержка ApplePay (необязательно) */
            applePaySupport?: boolean;
            /** Поддержка GooglePay (необязательно) */
            googlePaySupport?: boolean;
            /** Идентификатор сайта, который находится в ЛК */
            publicId: string;
            /** Сумма оплаты */
            amount: number;
            /** Валюта @see https://developers.cloudpayments.ru/#spisok-valyut */
            currency: "RUB" | "USD" | "EUR";
            /** Идентификатор пользователя (Обязательный для создания подписки) */
            accountId?: string;
            /** Описание назначения оплаты в произвольном формате */
            description?: string;
            /** Номер заказа или счета */
            invoiceId?: string;
            /** E-mail плательщика, на который будет отправлена квитанция об оплате (необязательно) */
            email?: string;
            /** Требование указать e-mail адрес пользователя в виджете */
            requireEmail?: boolean;
            /** Доп. поле, куда передается информация о плательщике. */
            payer?: {
                firstName?: string;
                lastName?: string;
                middleName?: string;
                birth?: string;
                street?: string;
                address?: string;
                city?: string;
                country?: string;
                phone?: string;
                postcode?: string;
            };
        },
        configuration?: {
            appearance?: {
                colors?: {
                    primaryButtonColor?: string;
                    primaryButtonTextColor?: string;
                    primaryHoverButtonColor?: string;
                    primaryButtonHoverTextColor?: string;
                    activeInputColor?: string;
                    inputBackground?: string;
                    inputColor?: string;
                    inputBorderColor?: string;
                    errorColor?: string;
                };
                borders?: { radius?: `${number}px` };
            };
        },
    );

    public mount(element: HTMLElement): void;
    public unmount(): void;
}

declare global {
    interface CloudPaymentsScope {
        PaymentBlocks: typeof Widget;
    }

    // eslint-disable-next-line no-var
    var cp: CloudPaymentsScope | undefined;
}

export const usePaymentBlocks = (): typeof Widget | undefined => {
    const [scope, setScope] = useState(globalThis.cp);
    const status = useLoadScript(
        "https://widget.cloudpayments.ru/bundles/paymentblocks.js",
    );
    useEffect(() => {
        if (status !== "ready") return;
        setScope(globalThis.cp);
    }, [status]);

    return scope?.PaymentBlocks;
};
