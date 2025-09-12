import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { BackHeader } from '../../components/BackHeader';
import { themeColors } from '../../themes/colors';

interface UserAgreementProps {
  navigation: any;
}

export const UserAgreement: React.FC<UserAgreementProps> = ({ navigation }) => {
  const [loading, setLoading] = React.useState(true);

  // Tab 控制逻辑现在由 SettingNavigator 统一处理

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader title="用户协议" />
      
      <View style={styles.webViewContainer}>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={themeColors.primary} />
          </View>
        )}
        <WebView
          source={{ uri: 'https://www.aa5p.com/user-agreement/' }}
          style={styles.webView}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onError={() => setLoading(false)}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          mixedContentMode="compatibility"
          allowsBackForwardNavigationGestures={true}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  webViewContainer: {
    flex: 1,
    position: 'relative',
  },
  webView: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    zIndex: 1,
  },
});

export default UserAgreement;
