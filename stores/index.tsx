/**
 * Storages index collector
 */
import userStore from './User.store';
import notificationStore from './Notification.store';
import packageStore from './Package.store';
import profilesStore from './Profiles.store';
import authStore from './Auth.store';
import lessonStore from './Lesson.store';
import evaluationStore from './Evaluation.store';
import statisticsStore from './Statistics.store';
import paymentsStore from './Payments.store';
import detailsStudentStore from './DetailsStudent.store';
import detailsTeacherStore from './DetailsTeacher.store';
import detailsPartnerStore from './DetailsPartner.store';
import packageCreateStore from './PackageCreate.store';
import rescheduleStore from './Reshedule.store';
import chatStore from './Chat.store';

const stores = {
    authStore,
    userStore,
    notificationStore,
    packageStore,
    profilesStore,
    lessonStore,
    evaluationStore,
    detailsStudentStore,
    detailsTeacherStore,
    detailsPartnerStore,
    statisticsStore,
    paymentsStore,
    packageCreateStore,
    rescheduleStore,
    chatStore,
};

export default stores;
