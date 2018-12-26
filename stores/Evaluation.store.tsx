import { observable, action, computed } from 'mobx';
import { ILazyObservable, lazyObservable } from 'mobx-utils';

import { evaluationsQuestionApiService, userApiService, meApiService } from '../services';
import { EvaluationsQuestion, EvaluationsQuestionsVariant, UsersEvaluationTest, NewUsersEvaluation, UsersEvaluation } from '../services/api';
import UserStore from './User.store';

interface EvaluationsQuestionVariants extends EvaluationsQuestion {
    // TODO: regenerate php doc
    id: number;
    variants: EvaluationsQuestionsVariant[];
}
export class EvaluationStore {
    @observable evaluationsQuestions$: ILazyObservable<EvaluationsQuestionVariants[]> = lazyObservable((sink) =>
        this.evaluationsQuestionApi().evaluationQuestionsGet(0, process.env.NODE_ENV === 'dev' ? 5 : 100, undefined , undefined, undefined, 'variants')
            .then((response) => sink(response.data as EvaluationsQuestionVariants[])),
        [],
    );

    @observable meEvaluations$: ILazyObservable<UsersEvaluation[]> = lazyObservable((sink) => {
        this.meApi().meEvaluationsGet(0, 100)
            .then((response) => sink(response.data));
        },
        undefined,
    );

    @observable currentStep: number = 1;

    @observable answers: UsersEvaluationTest[] = [];

    @observable isWritingFinished: boolean = false;
    @observable isGrammarFinished: boolean = false;

    constructor(
        protected evaluationsQuestionApi = evaluationsQuestionApiService,
        protected userApi = userApiService,
        protected meApi = meApiService,
        protected userStore = UserStore,
    ) {}

    @computed get totalSteps(): number {
        return this.evaluationsQuestions$.current().length;
    }
    @computed get currentQuestion(): EvaluationsQuestionVariants {
        return this.evaluationsQuestions$.current() &&
            this.evaluationsQuestions$.current()[this.currentStep - 1];
    }
    @computed get resultsRate(): number {
        return this.answers.reduce((sum, answer) => sum + answer.rate , 0);

    }
    @computed get resultsEvaluationRate(): number {
        return this.resultsRate / this.totalSteps * 12;

    }
    // @computed get isGrammarFinished(): boolean {
    //     return this.currentQuestion && this.currentStep > this.totalSteps;
    // }

    @action('nextStep') nextStep(): void {
        this.currentStep++;
    }
    @action('answerQuestion') async answerQuestion(answer: UsersEvaluationTest): Promise<void> {
        this.userApi().usersUserIdEvaluationsTestPost(this.userStore.meId, answer);
        this.answers.push(answer);
        if (this.currentStep < this.totalSteps) {
            this.nextStep();
        }
    }
    @action('saveGrammarResults') async saveGrammarResults(): Promise<void> {
        await this.userApi().usersUserIdEvaluationsPost(this.userStore.meId, {
            teacher_id: UserStore.meId,
            rate: this.resultsEvaluationRate,
            content: '',
            comment: '',
            type: NewUsersEvaluation.TypeEnum.GRAMMAR,
        });
        this.meEvaluations$.refresh();
        this.isGrammarFinished = true;
    }
    @action('saveResults') async saveResults(content: string, type: NewUsersEvaluation.TypeEnum, rate = 0, comment = ''): Promise<void> {
        await this.userApi().usersUserIdEvaluationsPost(this.userStore.meId, {
            teacher_id: UserStore.meId,
            rate,
            comment,
            content,
            type,
        });
        this.meEvaluations$.refresh();
        this.isWritingFinished = true;
    }

}

const evaluationStore = new EvaluationStore();

export default evaluationStore;
