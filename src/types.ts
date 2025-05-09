
export interface User{
    name: string;
    email:string;
    password:string;
    id:string;
    courses: string[];
    role: 'student' | 'teacher';
    createdAt: Date;
    updatedAt: Date;
}

export type CourseOption = {
    label: string;
    value: string;
  };