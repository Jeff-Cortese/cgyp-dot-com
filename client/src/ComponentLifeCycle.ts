import { Subject } from 'rxjs';

export class ComponentLifeCycle {
  public willMount$ = new Subject<any>();
  public didMount$ = new Subject<any>();
  public willUnmount$ = new Subject<any>();
  public willUpdate$ = new Subject<any>();
  public didUpdate$ = new Subject<any>();
  public willReceiveProps$ = new Subject<any>();

  constructor(component: React.Component<any>) {
    const monkeyPatchLifeCycle = (lifeCycleName: string, lifeCycleSubject: Subject<any>, doesComplete?: boolean) => {
      const oldLifeCylcleFn = component[lifeCycleName];

      component[lifeCycleName] = function() {
        lifeCycleSubject.next(arguments);

        if (doesComplete) {
          lifeCycleSubject.complete();
        }

        return oldLifeCylcleFn && oldLifeCylcleFn.apply(component, arguments);
      }
    }

    monkeyPatchLifeCycle('componentWillMount', this.willMount$, true);
    monkeyPatchLifeCycle('componentDidMount', this.didMount$, true);
    monkeyPatchLifeCycle('componentWillUnmount', this.willUnmount$, true);
    monkeyPatchLifeCycle('componentWillUpdate', this.willUpdate$);
    monkeyPatchLifeCycle('componentDidUpdate', this.didUpdate$);
    monkeyPatchLifeCycle('componentWillReceiveProps', this.willReceiveProps$);
  }
}