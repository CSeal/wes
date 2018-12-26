import { UserStore } from '../stores/User.store';
// tslint:disable-next-line:no-submodule-imports
import { TranslateHocProps } from 'react-i18next/src/translate';
import { TranslationFunction } from 'react-i18next';
import { NotificationStore } from '../stores/Notification.store';
import { PackageStore } from '../stores/Package.store';
import { ProfilesStore } from '../stores/Profiles.store';
import { AuthStore } from '../stores/Auth.store';
import { LessonStore } from '../stores/Lesson.store';
import { EvaluationStore } from '../stores/Evaluation.store';
import { StatisticsStore } from '../stores/Statistics.store';
import { RescheduleStore } from '../stores/Reshedule.store';
import { PackageCreateStore } from '../stores/PackageCreate.store';
import { ChatStore } from '../stores/Chat.store';

export interface GenericProps extends TranslateHocProps {
    authStore?: AuthStore;
    chatStore?: ChatStore;
    userStore?: UserStore;
    notificationStore?: NotificationStore;
    packageStore?: PackageStore;
    packageCreateStore?: PackageCreateStore;
    profilesStore?: ProfilesStore;
    lessonStore?: LessonStore;
    evaluationStore?: EvaluationStore;
    statisticsStore?: StatisticsStore;
    rescheduleStore?: RescheduleStore;
    // location?: any;
    t?: TranslationFunction;
}
