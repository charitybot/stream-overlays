import * as React from 'react';
import { observer, inject } from 'mobx-react';

@inject('rootStore')
@observer
export default class Total extends React.Component<{}, {}> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return <p>Hello, World!</p>;
  }
}
