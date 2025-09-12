package com.aa5p.airpiggyapp;

import android.content.Intent;
import android.util.Log;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.tencent.mm.opensdk.constants.ConstantsAPI;
import com.tencent.mm.opensdk.modelbase.BaseReq;
import com.tencent.mm.opensdk.modelbase.BaseResp;
import com.tencent.mm.opensdk.modelmsg.SendAuth;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.IWXAPIEventHandler;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;

@ReactModule(name = "WeChatSDKModule")
public class WeChatSDKModule extends ReactContextBaseJavaModule implements IWXAPIEventHandler, ActivityEventListener {
    private static final String TAG = "WeChatSDK";
    private IWXAPI api;
    private static final String APP_ID = "wx8a3afbe6c5606590";
    private static WeChatSDKModule instance;

    public WeChatSDKModule(ReactApplicationContext reactContext) {
        super(reactContext);
        instance = this;
        reactContext.addActivityEventListener(this);
        initWeChatAPI();
    }

    public static WeChatSDKModule getInstance() {
        return instance;
    }

    public void handleWeChatResponse(com.tencent.mm.opensdk.modelbase.BaseResp resp) {
        Log.d(TAG, "从WXEntryActivity收到微信回调");
        onResp(resp);
    }

    @Override
    public String getName() {
        return "WeChatSDKModule";
    }

    private void initWeChatAPI() {
        try {
            api = WXAPIFactory.createWXAPI(getReactApplicationContext(), APP_ID, true);
            Log.d(TAG, "创建WXAPI实例成功，AppID: " + APP_ID);

            boolean registerResult = api.registerApp(APP_ID);
            Log.d(TAG, "微信SDK初始化完成，注册结果: " + registerResult);

            if (!registerResult) {
                Log.w(TAG, "微信SDK注册失败，请检查AppID和包名配置");
            }

            Log.d(TAG, "微信SDK初始化完成");

        } catch (Exception e) {
            Log.e(TAG, "微信SDK初始化失败", e);
        }
    }

    @ReactMethod
    public void isWeChatInstalled(Promise promise) {
        try {
            boolean installed = api.isWXAppInstalled();
            Log.d(TAG, "微信是否已安装: " + installed);
            promise.resolve(installed);
        } catch (Exception e) {
            Log.e(TAG, "检查微信安装状态失败", e);
            promise.reject("CHECK_INSTALL_FAILED", e.getMessage());
        }
    }

    @ReactMethod
    public void getAppSignature(Promise promise) {
        try {
            String signature = getSignature(getReactApplicationContext(),
                    getReactApplicationContext().getPackageName());
            Log.d(TAG, "应用签名 (MD5): " + signature);
            promise.resolve(signature);
        } catch (Exception e) {
            Log.e(TAG, "获取应用签名失败", e);
            promise.reject("GET_SIGNATURE_FAILED", e.getMessage());
        }
    }

    private String getSignature(android.content.Context context, String packageName) {
        try {
            android.content.pm.PackageInfo info = context.getPackageManager().getPackageInfo(packageName,
                    android.content.pm.PackageManager.GET_SIGNATURES);
            for (android.content.pm.Signature signature : info.signatures) {
                java.security.MessageDigest md = java.security.MessageDigest.getInstance("MD5");
                md.update(signature.toByteArray());
                String sign = toHexString(md.digest());
                return sign.toLowerCase();
            }
        } catch (Exception e) {
            Log.e(TAG, "获取签名失败", e);
        }
        return "";
    }

    private String toHexString(byte[] bytes) {
        StringBuilder hexString = new StringBuilder();
        for (int i = 0; i < bytes.length; i++) {
            String hex = Integer.toHexString(0xFF & bytes[i]);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }

    @ReactMethod
    public void sendAuthRequest(String scope, String state, Promise promise) {
        try {
            Log.d(TAG, "=== 开始发送微信授权请求 ===");
            Log.d(TAG, "AppID: " + APP_ID);
            Log.d(TAG, "Scope: " + scope);
            Log.d(TAG, "State: " + state);

            if (!api.isWXAppInstalled()) {
                Log.e(TAG, "微信未安装");
                promise.reject("WECHAT_NOT_INSTALLED", "微信未安装");
                return;
            }

            Log.d(TAG, "微信已安装，准备发送授权请求");

            SendAuth.Req req = new SendAuth.Req();
            req.scope = scope;
            req.state = state;

            Log.d(TAG, "准备发送请求，请求对象: " + req.toString());

            boolean result = api.sendReq(req);
            Log.d(TAG, "发送授权请求结果: " + result);

            if (result) {
                Log.d(TAG, "授权请求发送成功，等待微信回调...");
                promise.resolve("授权请求已发送");
            } else {
                Log.e(TAG, "发送授权请求失败 - API返回false");
                promise.reject("SEND_REQUEST_FAILED", "发送授权请求失败");
            }
        } catch (Exception e) {
            Log.e(TAG, "发送授权请求异常", e);
            promise.reject("SEND_REQUEST_FAILED", e.getMessage());
        }
    }

    @Override
    public void onReq(BaseReq baseReq) {
        Log.d(TAG, "onReq: " + baseReq.getType());
    }

    @Override
    public void onResp(BaseResp baseResp) {
        Log.d(TAG, "=== 收到微信回调 ===");
        Log.d(TAG, "onResp: " + baseResp.getType());
        Log.d(TAG, "errCode: " + baseResp.errCode);
        Log.d(TAG, "errStr: " + baseResp.errStr);

        // 详细的错误码说明
        String errorMsg = "";
        switch (baseResp.errCode) {
            case 0:
                errorMsg = "成功";
                break;
            case -1:
                errorMsg = "一般错误";
                break;
            case -2:
                errorMsg = "用户取消";
                break;
            case -3:
                errorMsg = "发送失败";
                break;
            case -4:
                errorMsg = "授权被拒绝";
                break;
            case -5:
                errorMsg = "微信不支持";
                break;
            default:
                errorMsg = "未知错误码: " + baseResp.errCode;
                break;
        }
        Log.d(TAG, "错误码含义: " + errorMsg);

        WritableMap result = Arguments.createMap();
        result.putInt("errCode", baseResp.errCode);
        result.putString("errStr", baseResp.errStr);

        if (baseResp.getType() == ConstantsAPI.COMMAND_SENDAUTH) {
            SendAuth.Resp authResp = (SendAuth.Resp) baseResp;
            result.putString("code", authResp.code);
            result.putString("state", authResp.state);
            result.putString("country", authResp.country);
            result.putString("lang", authResp.lang);
        }

        // 发送事件到React Native
        sendEvent("WeChatAuthResult", result);
    }

    @Override
    public void onActivityResult(android.app.Activity activity, int requestCode, int resultCode, Intent data) {
        Log.d(TAG, "onActivityResult: requestCode=" + requestCode + ", resultCode=" + resultCode);
    }

    @Override
    public void onNewIntent(Intent intent) {
        Log.d(TAG, "onNewIntent: " + intent.getDataString());
        api.handleIntent(intent, this);
    }

    public void handleIntent(Intent intent) {
        Log.d(TAG, "handleIntent: " + intent.getDataString());
        api.handleIntent(intent, this);
    }

    private void sendEvent(String eventName, WritableMap params) {
        // 发送事件到React Native
        getReactApplicationContext()
                .getJSModule(com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}
