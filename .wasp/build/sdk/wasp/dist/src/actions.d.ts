export function fetchGuestData(args: any, context: any): Promise<{
    travel: {
        TrainNumber: any;
        SeatType: any;
        SeatNo: any;
        CoachNo: any;
    };
    stay: {
        Hotel: any;
        RoomNo: any;
    };
}>;
