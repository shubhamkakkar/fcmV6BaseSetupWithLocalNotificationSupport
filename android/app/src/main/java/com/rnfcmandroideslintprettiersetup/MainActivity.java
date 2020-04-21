package com.rnfcmandroideslintprettiersetup;
import com.facebook.react.ReactActivity;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.os.Build;
import android.os.Bundle;

public class MainActivity extends ReactActivity {
  @Override
  protected String getMainComponentName() {
    return "RNFCMAndroidEslintPrettierSetup";
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
