package com.liang.barcode;

import HPRTAndroidSDKA300.HPRTPrinterHelper;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;  
import java.io.IOException;  
import java.io.InputStream;  
import java.io.InputStreamReader;  
import java.net.MalformedURLException;  
import java.net.URL;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.net.HttpURLConnection;


import android.app.Activity;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.widget.Toast;
import org.apache.cordova.PluginResult;
import org.json.JSONObject;
import android.util.Log;
import android.widget.ArrayAdapter;

/**
 * This class echoes a string called from JavaScript.
 */
public class barcode extends CordovaPlugin {
    BluetoothAdapter mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
    BroadcastReceiver mReceiver =null;

    private ArrayAdapter<String> mAdapter;
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("open")) {
            String ble_mac_address = args.getString(0);
            this.open(ble_mac_address, callbackContext);
            return true;
        }else if(action.equals("printBarCode")){
            String barcode = args.getString(0);
            String h = args.getString(1);
            String x = args.getString(2);
            String y = args.getString(3);
            String codeh = args.getString(4);
            String num = args.getString(5);

            this.printBarCode(barcode,h,x,y,codeh,num,callbackContext);
            return true;
        }else if(action.equals("close")){
            this.close(callbackContext);
            return true;
        }else if(action.equals("registerReceiver")){  //如果action==“registerReceiver”注册
                String message = args.getString(0);
                this.registerReceiver(callbackContext);   //自定义方法后面讲
                return true;
        }else if(action.equals("unregisterReceiver")){ //如果action==“unregisterReceiver” 取消
            this.unregisterReceiver(callbackContext);  //自定义方法后面讲
        }else if(action.equals("search")){
            this.search(callbackContext);
            return true;
        }
        return false;
    }
    private void registerReceiver(final CallbackContext callbackContext) throws JSONException {
            final JSONArray unpairedDevices = new JSONArray(); //new  JSONArray对象
            mReceiver = new BroadcastReceiver() {           //new广播对象
            @Override
            public void onReceive(Context context, Intent intent) {
                String action = intent.getAction();
            if (BluetoothAdapter.ACTION_DISCOVERY_STARTED.equals(action)) {
                // Log.d(TAG, "开始扫描...");
			}else
            // Toast.makeText(context,"BroadcastReceiver",Toast.LENGTH_SHORT).show();how();
            if(intent.getAction().equals(BluetoothDevice.ACTION_FOUND)){      
                    BluetoothDevice device = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);//获取设备对象
                    try {
                            JSONObject o = deviceToJSON(device,"CONNECTED");  //生成json格式的device信息
                            unpairedDevices.put(o);
                            if (callbackContext != null) {
                                PluginResult res = new PluginResult(PluginResult.Status.OK, o);//将信息写入 同时设置后续还有返回信息
                                res.setKeepCallback(true);
                                callbackContext.sendPluginResult(res); 
                            }
                        } catch (JSONException e) {}
                // Toast.makeText(context,"接受到已连接，消息为："+device.getName()+"address: "+device.getAddress(),Toast.LENGTH_LONG).show();
                }else
            if (BluetoothAdapter.ACTION_DISCOVERY_FINISHED.equals(action)) {
				// Log.d(TAG, "扫描结束.");
			}
                }
            };
            Activity activity = cordova.getActivity();
            activity.registerReceiver(mReceiver, makeFilter());
        };
        public void search(final CallbackContext callbackContext){
            mBluetoothAdapter.startDiscovery();
            callbackContext.success("打开了搜索");
        };
        public void unregisterReceiver(final CallbackContext callbackContext){
            Activity activity = cordova.getActivity();
            activity.unregisterReceiver(mReceiver);
        };
        /*
        @deviceToJSON 将收到的设备对象转化为JSONObject对象方便与js交互数据
        @device 设备对象，当监听到设备变化后接受到的设备对象
        @connectType如果是连接发出的消息值为 CONNECTED 如果是断开连接发出的消息为 DISCONNECTED
        */
        private final JSONObject deviceToJSON(BluetoothDevice device,String connectType) throws JSONException {
            JSONObject json = new JSONObject();    //创建JSONObject对象
            json.put("name", device.getName());     //设备名字
            json.put("address", device.getAddress());   //设备地址
            json.put("id", device.getAddress());   //设备唯一编号使用地址表示
            json.put("connectType",connectType);
            if (device.getBluetoothClass() != null) {
                json.put("class", device.getBluetoothClass().getMajorDeviceClass());  //设备类型 主要分别设备是哪一种设备
            }
            return json;
        };
        private IntentFilter makeFilter() {
            IntentFilter filter = new IntentFilter();
            filter.addAction(BluetoothDevice.ACTION_FOUND);            
            filter.addAction(BluetoothAdapter.ACTION_DISCOVERY_STARTED);
            filter.addAction(BluetoothAdapter.ACTION_DISCOVERY_FINISHED);
            return filter;
        }

    private void open(String ble_mac_address, CallbackContext callbackContext) {
       
        // HPRTPrinterHelper HPRTPrinter=new HPRTPrinterHelper(Context,PrinterName);
        try{
            // if (callbackContext != null) {
            //     PluginResult res = new PluginResult(PluginResult.Status.OK, o);//将信息写入 同时设置后续还有返回信息
            //     res.setKeepCallback(true);
            //     callbackContext.sendPluginResult(res); 
            // }
            // if(!HPRTPrinterHelper.IsOpened()){
               int portOpen = HPRTPrinterHelper.PortOpen("Bluetooth,"+ble_mac_address);
                HPRTPrinterHelper.logcat("portOpen:"+portOpen);
                callbackContext.success(portOpen);  
                
            // }
        	
        }catch(Exception e){
            callbackContext.error( "连接错误：调用PortOpen时抛出异常");
        }
        // callbackContext.success("不知道到底链接上了没有");

    }

    private void printBarCode(String barcode,String h,String x,String y,String codeh,String num,CallbackContext callbackContext) {
        // HPRTPrinterHelper HPRTPrinter=new HPRTPrinterHelper(Context,PrinterName);
        try{
        	// if(HPRTPrinterHelper.IsOpened()){

	            HPRTPrinterHelper.printAreaSize("0","200","200",h,num);
	            // HPRTPrinterHelper.Expanded("0","0",getPictureString(img_url));
	            // HPRTPrinterHelper.Form();
	            // HPRTPrinterHelper.Print();
	            // HPRTPrinterHelper.PageWidth(500);
	            HPRTPrinterHelper.Align(HPRTPrinterHelper.CENTER);
	            HPRTPrinterHelper.Barcode(HPRTPrinterHelper.BARCODE,HPRTPrinterHelper.code39,"1","1",codeh,x,y,true,"7","0","5",barcode);
                HPRTPrinterHelper.Form();
                HPRTPrinterHelper.Print();
                HPRTPrinterHelper.PortClose();
        		callbackContext.success("条码打印指令已发出");
        	// }else{
        	// 	callbackContext.error("打印错误：设备未连接");
        	// }

        }catch(Exception e){
            callbackContext.error("打印错误："+ e.getMessage().toString());
        }  
    }


    private void close(CallbackContext callbackContext) {
        // HPRTPrinterHelper HPRTPrinter=new HPRTPrinterHelper(Context,PrinterName);
        try{
        	// if(HPRTPrinterHelper.IsOpened()){
            	HPRTPrinterHelper.PortClose();
        	// }
        	callbackContext.success("连接已关闭");
        }catch(Exception e){
            callbackContext.success("关闭错误："+ e.getMessage().toString());
        }  
    }
    // public Bitmap getHttpBitmap(String url) 
    // { 
    //     Bitmap bitmap = null; 
    //     try 
    //     { 
    //         URL pictureUrl = new URL(url); 
    //         InputStream in = pictureUrl.openStream(); 
    //         bitmap = BitmapFactory.decodeStream(in); 
    //         in.close(); 
    //     } catch (MalformedURLException e) 
    //     { 
    //         e.printStackTrace(); 
    //     } catch (IOException e) 
    //     { 
    //         e.printStackTrace(); 
    //     } 
    //     return bitmap; 
    // } 
    // public String getPictureString(String url) 
    // { 
    //     String pictureName = "/mnt/sdcard/" + "car"+".jpg"; 
    //     File file = new File(pictureName); 
    //     FileOutputStream out; 
    //     try 
    //     { 
    //         out = new FileOutputStream(file);
    //         Bitmap bitmap = getHttpBitmap(url); 
    //         bitmap.compress(Bitmap.CompressFormat.JPEG, 100, out); 
    //         out.flush(); 
    //         out.close(); 
    //     } catch (FileNotFoundException e) 
    //     { 
    //         e.printStackTrace(); 
    //     } catch (IOException e) 
    //     { 
    //          e.printStackTrace(); 
    //     }
    //     return pictureName;
    // } 
}
