import { Subject } from 'rxjs';

const noop = () => { /* nothing to do */ };

export class ComponentLifeCycle {
  willMount$ = new Subject<any>();
  didMount$ = new Subject<any>();
  willUnmount$ = new Subject<any>();
  willUpdate$ = new Subject<any>();
  didUpdate$ = new Subject<any>();
  willReceiveProps$ = new Subject<any>();

  constructor(component: React.Component<any>) {
    const monkeyPatchLifeCycle = (lifeCycleName: string, lifecycleSubject: Subject<any>, doesComplete?: boolean) => {
      const oldLifeCylcleFn = component[lifeCycleName] || noop;

      component[lifeCycleName] = function() {
        lifecycleSubject.next(arguments);
        if (doesComplete) {
          lifecycleSubject.complete();
        }

        return oldLifeCylcleFn.apply(component, arguments);
      }
    }

    monkeyPatchLifeCycle('componentWillMount', this.willMount$, true);
    monkeyPatchLifeCycle('componentDidMount', this.didMount$, true);
    monkeyPatchLifeCycle('componentWillUnmount', this.willUnmount$, true);
    monkeyPatchLifeCycle('componentWillUpdate', this.willUpdate$)
    monkeyPatchLifeCycle('componentDidUpdate', this.didUpdate$)
    monkeyPatchLifeCycle('componentWillReceiveProps', this.willReceiveProps$)
  }
}