export interface Exercise {
    id: string;
    name: string;
    duration: number;
    calories: number;
    date?: Date; //Date is optional
    state?: 'completed' | 'cancelled' | null; //State is optional 
}
