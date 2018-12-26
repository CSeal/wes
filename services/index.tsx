import { AuthService } from './Auth.service';
import {
    UserApi,
    Configuration,
    NotificationApi,
    MeApi,
    PackageApi,
    LessonApi,
    UserToUserFeedbackApi,
    QuizApi,
    EvaluationsQuestionApi,
    DocumentApi,
    StatisticApi,
    PaypalApi,
    StripeApi,
    TransactionApi,
    CountryApi,
} from './api';

// AuthService().getToken();

function getConfig () {
  return new Configuration({
    accessToken: AuthService().token + '1',
    basePath: process.env.URL_API,
  });
}

export function userApiService () { return new  UserApi(getConfig()); }
export function notificationApiService () { return new  NotificationApi(getConfig()); }
export function meApiService () { return  new MeApi(getConfig()); }
export function countryApiService () { return  new CountryApi(getConfig()); }
export function packageApiService () { return  new PackageApi(getConfig()); }
export function lessonApiService () { return  new LessonApi(getConfig()); }
export function userToUserApiService () { return new UserToUserFeedbackApi(getConfig()); }
export function quizApiService () { return new QuizApi(getConfig()); }
export function documentApiService () { return new DocumentApi(getConfig()); }
export function evaluationsQuestionApiService () { return new EvaluationsQuestionApi(getConfig()); }
export function statisticsService () { return new StatisticApi(getConfig()); }
export function paymentsPaypalApiService () { return new PaypalApi(getConfig()); }
export function paymentsStripeApiService () { return new StripeApi(getConfig()); }
export function transactionApiService () { return new TransactionApi(getConfig()); }
