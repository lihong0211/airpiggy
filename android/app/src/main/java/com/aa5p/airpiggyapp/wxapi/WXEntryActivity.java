package com.aa5p.airpiggyapp.wxapi;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.tencent.mm.opensdk.constants.ConstantsAPI;
import com.tencent.mm.opensdk.modelbase.BaseReq;
import com.tencent.mm.opensdk.modelbase.BaseResp;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.IWXAPIEventHandler;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;

import com.aa5p.airpiggyapp.WeChatSDKModule;

public class WXEntryActivity extends Activity implements IWXAPIEventHandler {
    private static final String TAG = "WXEntryActivity";
    private IWXAPI api;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG, "WXEntryActivity onCreate");

        api = WXAPIFactory.createWXAPI(this, "wx8a3afbe6c5606590", false);

        try {
            Intent intent = getIntent();
            api.handleIntent(intent, this);
        } catch (Exception e) {
            Log.e(TAG, "处理微信Intent失败", e);
        }
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        Log.d(TAG, "WXEntryActivity onNewIntent");
        setIntent(intent);
        api.handleIntent(intent, this);
    }

    @Override
    public void onReq(BaseReq req) {
        Log.d(TAG, "WXEntryActivity onReq: " + req.getType());
        finish();
    }

    @Override
    public void onResp(BaseResp resp) {
        Log.d(TAG, "WXEntryActivity onResp: " + resp.getType());
        Log.d(TAG, "WXEntryActivity errCode: " + resp.errCode);

        // 将回调转发给WeChatSDKModule
        try {
            WeChatSDKModule.getInstance().handleWeChatResponse(resp);
        } catch (Exception e) {
            Log.e(TAG, "转发微信回调失败", e);
        }

        finish();
    }
}
