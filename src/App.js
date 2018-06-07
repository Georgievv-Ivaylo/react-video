import React, { Component } from 'react';
import VideoList from './components/video/VideoList';
import Header from './components/navigations/Header';
import Video from './components/video/Video';
import { Switch, Route } from 'react-router-dom'

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      header: []
    };
  }

  componentDidMount() {

    fetch('/data/get/navigations')
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({ header: result.header })
      },
      (error) => {}
    )
  }

  render() {
    const headerData = this.state.header;
    let routeComponents = {};
    const routesComponents = {'list': VideoList};
    if (headerData.length >= 1) {
      routeComponents = headerData.map(
        (thisEl) => <Route exact
          path={thisEl.link}
          render={(props) => {
            const ComponentName = routesComponents[thisEl.type];
            return <ComponentName vlid={thisEl.id} {...props} />
          }}
          key={thisEl.id}
          listId={thisEl.id} />
        );
    }
    return (
      <div className="App">
        <Header headerData={headerData} />
        <Switch>
          <Route exact path='/' component={Video}/>
          <Route exact path='/videos' component={VideoList}/>
          <Route path='/video' component={Video}/>
          {headerData.length >= 1 && routeComponents}
        </Switch>
      </div>
    );
  }
}

export default App;
