export interface CourseLesson {
    id: number;
    lessonName: string;
    videoPath: string;
    contentPath: string;
    isPreview: boolean;
    isActive: boolean;
    duration: string;
    sequence: number;
    courseTopicId?: number;
    createdDate: Date;
    updatedDate: Date;
  }
  