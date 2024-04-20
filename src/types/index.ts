export interface ICourse {
  id?: string | number;
  title: string;
  description: string;
  createdBy: string | number;
  featuredImage?: string | File | File[];
  courseTags?: ITag[];
  lessons?: ILesson[];
  quizzies?: IQuiz[];
  resources?: IResource[];
}

export interface IResource {
  id?: string | number;
  name: string;
  type: 'video' | 'pdf' | 'article' | 'image';
  url: string;
}

export interface IQuiz {
  id?: string | number;
  title: string;
  courseId?: number | string;
  questions?: IQuestion[];
}

export interface IQuestion {
  id?: string | number;
  title: string;
  quizId: string | number;
  answers: IAnswer[];
}

export interface ILesson {
  id?: string | number;
  courseId?: string | number;
  title: string;
  content: string;
  attachments?: IAttachment[];
}

export interface IAttachment {
  id?: string | number;
  lessonId?: string | number;
  src: string;
  type: 'image' | 'video' | 'pdf';
}

export interface ITag {
  id?: string | number;
  name: string;
}

export interface IUser {
  id?: string | number;
  firstName: string;
  lastName: string;
  username: string;
  dob: Date | string;
  confirm_password: string;
  email: string;
  role?: 'teacher' | 'student' | 'admin' | string;
  password: string;
  avatarUrl?: string;
}

export interface IFeedback {
  id?: string | number;
  userId: string | number;
  courseId: string | number;
  rating: string | number;
  comment?: string;
}

export interface IAnswer {
  id: string | number;
  content: string;
  isCorrect: boolean;
  questionId: string | number;
}

export interface IForum {
  id: string | number;
  userId: string | number;
  content: string;
}

export interface IGroup {
  id: string | number;
  name: string;
  createdBy: string | number;
  courseId: string | number;
}

export interface ICourseProgress {
  id: string | number;
  userId: string | number;
  courseId: string | number;
  lessonId: string | number;
  completed: boolean;
  progressPercentage: string | number;
  lastAccessedAt: Date;
}

export interface INtofication {
  id: string | number;
  userId: string | number;
  message: string;
  read: boolean;
}
