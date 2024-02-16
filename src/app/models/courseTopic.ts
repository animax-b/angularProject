import { CourseLesson } from "./courselesson";


export interface CourseTopic {
    id: number;
    topicName: string;
    isActive: boolean;
    courseId: number;
    lessons: CourseLesson[];
}
