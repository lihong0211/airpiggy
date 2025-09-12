#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTBridge.h>
#import <React/RCTEventDispatcher.h>
#import <React/RCTLinkingManager.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"Airpiggy";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

// 处理微信回调和 Universal Links
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
  // 检查微信回调 scheme (使用我们的 AppID)
  if ([url.scheme isEqualToString:@"wx8a3afbe6c5606590"]) {
    // 解析微信回调参数
    NSString *query = url.query;
    NSMutableDictionary *params = [NSMutableDictionary dictionary];
    NSArray *pairs = [query componentsSeparatedByString:@"&"];
    
    for (NSString *pair in pairs) {
      NSArray *keyValue = [pair componentsSeparatedByString:@"="];
      if (keyValue.count == 2) {
        NSString *key = [keyValue[0] stringByRemovingPercentEncoding];
        NSString *value = [keyValue[1] stringByRemovingPercentEncoding];
        params[key] = value;
      }
    }
    
    NSString *code = params[@"code"];
    NSString *state = params[@"state"];
    NSString *error = params[@"error"];
    
    // 发送事件到 React Native
    if (self.bridge) {
      NSDictionary *result = @{
        @"code": code ?: [NSNull null],
        @"state": state ?: [NSNull null],
        @"error": error ?: [NSNull null],
        @"success": @(code != nil && error == nil)
      };
      
      [self.bridge.eventDispatcher sendAppEventWithName:@"WeChatLoginResult" body:result];
    }
    
    return YES;
  }
  
  // 处理 Universal Links
  return [RCTLinkingManager application:application openURL:url options:options];
}

// 处理 Universal Links (iOS 9+)
- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler {
  return [RCTLinkingManager application:application continueUserActivity:userActivity restorationHandler:restorationHandler];
}

@end
