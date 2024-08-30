
export interface requestInterface {
    id: String
    request_type: string;
    request_book: string;
    createdAt: Date;
}

export interface Student {
        student_name: string;
        father_name: string;
        mother_name: string;
        dob: Date;
        blood_group: string;
        contact_number: string;
        email: string;
        password: string;
        address: string;
}