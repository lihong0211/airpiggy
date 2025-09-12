package com.aa5p.airpiggyapp

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import android.os.Bundle
import android.content.Intent
import android.util.Log

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "Airpiggy"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    // 处理微信回调
    handleWeChatCallback(intent)
  }

  // 处理新的Intent（微信回调）
  override fun onNewIntent(intent: Intent) {
    super.onNewIntent(intent)
    setIntent(intent)
    Log.d("WeChatSDK", "MainActivity onNewIntent called")
    handleWeChatCallback(intent)
  }

  private fun handleWeChatCallback(intent: Intent) {
    Log.d("WeChatSDK", "MainActivity handleWeChatCallback called")
    Log.d("WeChatSDK", "Intent action: ${intent.action}")
    Log.d("WeChatSDK", "Intent data: ${intent.dataString}")
    
    // 只使用微信官方SDK处理回调
    val reactInstanceManager = reactInstanceManager
    if (reactInstanceManager != null) {
      val currentReactContext = reactInstanceManager.currentReactContext
      if (currentReactContext != null) {
        try {
          val weChatSDKModule = currentReactContext.getNativeModule(WeChatSDKModule::class.java)
          if (weChatSDKModule != null) {
            Log.d("WeChatSDK", "找到 WeChatSDKModule，处理Intent")
            weChatSDKModule.handleIntent(intent)
          } else {
            Log.d("WeChatSDK", "WeChatSDKModule 未找到")
          }
        } catch (e: Exception) {
          Log.e("WeChatSDK", "处理微信回调失败: ${e.message}", e)
        }
      } else {
        Log.d("WeChatSDK", "React Context 未初始化")
      }
    } else {
      Log.d("WeChatSDK", "ReactInstanceManager 未找到")
    }
  }
}
