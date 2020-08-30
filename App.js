import React from 'react';
import {StyleSheet, View, BackHandler, StatusBar} from 'react-native';
import {WebView} from 'react-native-webview';
import Spinner from 'react-native-loading-spinner-overlay';

class App extends React.Component {
  webviewRef = React.createRef(null);

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      canGoBack: false,
      canGoForward: false,
      currentUrl: '',
    };
    this.hideSpinner = this.hideSpinner.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backButtonHandler);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.backButtonHandler,
    );
  }

  backButtonHandler = () => {
    if (this.webviewRef.current && this.state.canGoBack) {
      this.webviewRef.current.goBack();
      return true;
    }
  };

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack,
      setCanGoForward: navState.canGoForward,
      setCurrentUrl: navState.url,
    });
  }

  hideSpinner() {
    this.setState({isLoading: false});
  }
  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <StatusBar
          backgroundColor="#680085"
          barStyle="light-content"
        />
        <View style={[styles.loading]}>
          <Spinner
            visible={this.state.isLoading}
            textContent={'Loading...'}
            color="#680085"
            animation="fade"
            textStyle={styles.spinnerTextStyle}
          />
        </View>
        <WebView
          ref={this.webviewRef}
          onLoad={this.hideSpinner}
          source={{uri: 'http://w6n.a08.myftpupload.com/'}}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  spinnerTextStyle: {
    color: '#680085',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default App;