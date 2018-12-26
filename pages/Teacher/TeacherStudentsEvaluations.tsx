import * as React from 'react';
import { GenericProps } from '../../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';
import transl from '../../utils/t.decorator';
import { RouteComponentProps } from 'react-router';
import { observable } from 'mobx';
import { ILazyObservable, lazyObservable } from 'mobx-utils';
import { userApiService } from '../../services';
import { User, UsersEvaluation, UsersEvaluationTest, EvaluationsQuestion } from '../../services/api';
import LazyLoad from '../../components/LazyLoad';
import WesDate from '../../components/WesDate';
import * as moment from 'moment';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

export interface TeacherStudentsEvaluationsProps extends GenericProps, RouteComponentProps<{id: number}>  {
}

interface UsersEvaluationTestExtended extends UsersEvaluationTest {
  evaluationsQuestion: EvaluationsQuestion;
}

@transl()
@inject('profilesStore')
@observer
export class TeacherStudentsEvaluationsPage extends React.Component<TeacherStudentsEvaluationsProps> {
  @observable studentId = this.props.match.params.id;
  @observable user$: ILazyObservable<User> = lazyObservable((sink) => {
    this.userApi().usersIdGet(this.studentId, 'evaluations').then((response) => sink(response.data));
  });

  @observable userEvaluations$: ILazyObservable<UsersEvaluation[]> = lazyObservable((sink) => {
    this.userApi().usersIdEvaluationsGet(this.studentId, 0, 200).then((response) => sink(response.data));
  });
  @observable userEvaluationsTest$: ILazyObservable<UsersEvaluationTestExtended[]> = lazyObservable((sink) => {
    this.userApi()
      .usersIdEvaluationsTestGet(this.studentId, 0, 200, undefined, undefined, undefined, 'evaluationsQuestion')
      .then((response) => sink(response.data as UsersEvaluationTestExtended[]));
  });
  constructor (
    props: TeacherStudentsEvaluationsProps, context?: any,
    protected userApi = userApiService,
  ) {
    super(props);
  }

  render(): JSX.Element {
    const { t } = this.props;
    const user = this.user$.current();
    const userEvaluations = this.userEvaluations$.current();
    const userEvaluationsTest = this.userEvaluationsTest$.current();
    const grammarEvaluation = userEvaluations && userEvaluations.find((ue) => ue.type === 'GRAMMAR');

    return (
      <LazyLoad $={user}>
        {() =>
          <div className="row">
            <div className="col-md-12">
                <h1>{user.name} {t('evaluations')}</h1>
                {grammarEvaluation &&
                  <div>
                    <h2>{t('Evaluation Grammar')}</h2>
                    <p><strong>{t('Date')}:</strong> {grammarEvaluation.created_at} </p>
                    <p><strong>{t('Result')}:</strong> {grammarEvaluation.rate}</p>
                  </div>
                }
                {this.renderEvaluationsTest(userEvaluationsTest)}
                <h2>{t('Evaluation Writing')}</h2>
                {this.renderEvaluationWriting(userEvaluations)}
            </div>
          </div>
        }
      </LazyLoad>
    );
  }

  renderEvaluationsTest(userEvaluationsTest: UsersEvaluationTestExtended[]): React.ReactNode {
    const { t } = this.props;

    return <LazyLoad $={userEvaluationsTest && userEvaluationsTest.length > 0}>
      {() =>
        <table className="table table-striped table-condensed">
        <thead>
            <tr>
                <th>{t('Rate')}</th>
                <th>{t('Answer')}</th>
                <th>{t('Question')}</th>
            </tr>
        </thead>
        <tbody>
            {
            userEvaluationsTest.map((evt) =>
              <tr key={evt.evaluations_question_id}>
                <td>{evt.rate}</td>
                <td><strong style={{color: evt.rate > 0 ? 'green' : 'red'}}>{evt.answer}</strong></td>
                <td>{evt.evaluationsQuestion.content}</td>
              </tr>,
            )
            }
        </tbody>
        </table>
      }
      </LazyLoad>;
  }
  renderEvaluationWriting(userEvaluations: UsersEvaluation[]): React.ReactNode {
    return <LazyLoad $={userEvaluations && userEvaluations.length > 0}>
        {() =>
          userEvaluations.find((ue) => ue.type === 'WRITING').content
        }
      </LazyLoad>;
  }

}
