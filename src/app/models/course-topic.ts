import { CourseLesson } from "./course-lesson";

export interface CourseTopic {
    id: number;
    courseId: string;
    topicName: string;
    courseName: string;
    isActive: boolean;
    sequence: number;
    lessons:CourseLesson[];
  }