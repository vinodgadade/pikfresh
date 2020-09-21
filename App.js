/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  StatusBar,
  Linking,
  BackHandler,
} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: 'https://pikfresh.online',
      statusBarStyle: 'dark-content',
    };
    this.openLink();
  }
  
  sleep(timeout) {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  }

  async openLink() {
    const {url, statusBarStyle} = this.state;
    try {
      if (await InAppBrowser.isAvailable()) {
        // A delay to change the StatusBar when the browser is opened
        const animated = true;
        const delay = animated && Platform.OS === 'ios' ? 400 : 0;
        setTimeout(() => StatusBar.setBarStyle('light-content'), delay);
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'partialCurl',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: false,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          headers: {
            'my-custom-header': 'my custom header value',
          },
        });
        // A delay to show an alert when the browser is closed
        await this.sleep(100);
        BackHandler.exitApp();
      } else {
        Linking.openURL(url);
      }
    } catch (error) {
      this.openLink();
    } finally {
      // Restore the previous StatusBar of the App
      StatusBar.setBarStyle(statusBarStyle);
    }
  }

  render() {
    const {statusBarStyle} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle={statusBarStyle} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 30,
  },
});