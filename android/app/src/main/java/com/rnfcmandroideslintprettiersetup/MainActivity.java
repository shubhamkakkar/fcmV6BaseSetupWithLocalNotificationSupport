package com.rnfcmandroideslintprettiersetup;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity {
  @Override
  protected String getMainComponentName() {
    return "RNFCMAndroidEslintPrettierSetup";
  }
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
   return new ReactActivityDelegate(this, getMainComponentName()) {
     @Override
     protected ReactRootView createRootView() {
      return new RNGestureHandlerEnabledRootView(MainActivity.this);
     }
   };
 }
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
     if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {    
      NotificationChannel notificationChannel = new NotificationChannel("500", "MainChannel", NotificationManager.IMPORTANCE_HIGH);
      notificationChannel.setShowBadge(true);
      notificationChannel.enableVibration(true);
      notificationChannel.enableLights(true);
      notificationChannel.setVibrationPattern(new long[]{400, 200, 400});
      NotificationManager manager = getSystemService(NotificationManager.class);
      manager.createNotificationChannel(notificationChannel);
    }      
  }
}
