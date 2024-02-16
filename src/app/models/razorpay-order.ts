export class razorpayOrder {
    constructor(
        public grandTotal: number,
        public currency: string,
        public receipt: string) {

    }
}