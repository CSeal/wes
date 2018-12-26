import * as React from 'react';
import { inject, observer} from 'mobx-react';
import transl from '../../../utils/t.decorator';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import { NewUsersQuiz, Quiz, User, UsersQuiz } from '../../../services/api';
import { Field } from 'react-final-form';
import { IQuizWithUser } from '../../../stores/User.store';

interface QuizComponentProps extends GenericProps {}
interface QuizComponentState {}

@transl()
@inject('userStore')
@observer
export default class QuizComponent extends React.Component<QuizComponentProps, QuizComponentState> {
    renderQuiz(quiz: IQuizWithUser[]): React.ReactNode {
        const me = this.props.userStore.me$.current();
        return quiz.map((el: IQuizWithUser, idx: number) => {
            const answers: UsersQuiz[] = el.user;
            let answer: string = '';
            answers.map((userQuiz: UsersQuiz) => {
                if (userQuiz.user_id === me.id) {
                    answer = userQuiz.answer;
                }
            });
            return (
                <Field
                    key={idx}
                    name={'quiz' + el.id}
                    render={({ input, meta }) => (
                        <fieldset>
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="form-group">
                                        <label>{el.title} <span>{el.content}</span></label>
                                        <textarea
                                            className="form-control"
                                            readOnly={!!answer}
                                            {...input}
                                            value={input.value !== '' ? input.value : answer}
                                        >
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    )}
                />
            );
        });
    }
    render() {
        const { t, userStore } = this.props;
        const quiz = userStore.quiz$.current();
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <legend>{t('Quiz')}</legend>
                    </div>
                </div>
                {quiz && this.renderQuiz(quiz as IQuizWithUser[])}
            </div>
        );
    }
}
