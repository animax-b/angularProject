export interface CourseLesson {
    id: number;
    lessonName: string;
    videoPath: string;
    contentPath: string;
    duration: string;
    sequence: number;
    isPreview: boolean;
    isActive: boolean;
    courseTopicId: number;
    createdDate: Date;
    updatedDate: Date;
}
