package com.liang.barcode;

import HPRTAndroidSDK.HPRTPrinterHelper;
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
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.net.HttpURLConnection;
/**
 * This class echoes a string called from JavaScript.
 */
public class barcode extends CordovaPlugin {

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
        }
        return false;
    }

    private void open(String ble_mac_address, CallbackContext callbackContext) {
        // HPRTPrinterHelper HPRTPrinter=new HPRTPrinterHelper(Context,PrinterName);
        try{
            // if(!HPRTPrinterHelper.IsOpened()){
                HPRTPrinterHelper.PortOpen("Bluetooth,"+ble_mac_address);
            // }
        	
        }catch(Exception e){
            callbackContext.error( "连接错误：调用PortOpen时抛出异常");
        }
        callbackContext.success("不知道到底链接上了没有");

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
    public Bitmap getHttpBitmap(String url) 
    { 
        Bitmap bitmap = null; 
        try 
        { 
            URL pictureUrl = new URL(url); 
            InputStream in = pictureUrl.openStream(); 
            bitmap = BitmapFactory.decodeStream(in); 
            in.close(); 
        } catch (MalformedURLException e) 
        { 
            e.printStackTrace(); 
        } catch (IOException e) 
        { 
            e.printStackTrace(); 
        } 
        return bitmap; 
    } 
    public String getPictureString(String url) 
    { 
        String pictureName = "/mnt/sdcard/" + "car"+".jpg"; 
        File file = new File(pictureName); 
        FileOutputStream out; 
        try 
        { 
            out = new FileOutputStream(file);
            Bitmap bitmap = getHttpBitmap(url); 
            bitmap.compress(Bitmap.CompressFormat.JPEG, 100, out); 
            out.flush(); 
            out.close(); 
        } catch (FileNotFoundException e) 
        { 
            e.printStackTrace(); 
        } catch (IOException e) 
        { 
             e.printStackTrace(); 
        }
        return pictureName;
    } 
}
