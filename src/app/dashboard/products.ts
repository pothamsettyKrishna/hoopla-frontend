export class Products {
    '_id': string;
    pName: string;
    pDescription: string;
    pRating: number;
    pCategory: string;
    price: number;
    color: string;
    image: string;
    pSeller: {
        s_Id: string,
        pDiscount: number,
        pQuantity: number,
        pShippingCharges: number
    };
}
