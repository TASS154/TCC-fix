package io.ionic.starter;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import android.webkit.WebView;
import android.webkit.WebSettings;

public class MainActivity extends BridgeActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    WebView webView = (WebView) this.bridge.getWebView();
    WebSettings settings = webView.getSettings();
    settings.setAllowUniversalAccessFromFileURLs(true);
    settings.setJavaScriptEnabled(true);
    settings.setDomStorageEnabled(true);
    settings.setMediaPlaybackRequiresUserGesture(false);
    settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
    settings.setAllowFileAccess(true);
    settings.setAllowUniversalAccessFromFileURLs(true);
  }
}
