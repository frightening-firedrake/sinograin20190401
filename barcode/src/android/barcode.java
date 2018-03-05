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
            String bar_code = args.getString(0);
            String offset = args.getString(1);
            String xDpi = args.getString(2);
            String hDpi = args.getString(3);
            String h = args.getString(4);

            this.printBarCode(bar_code,offset,xDpi,hDpi,h,callbackContext);
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
            if(!HPRTPrinterHelper.IsOpened()){
                HPRTPrinterHelper.PortOpen("Bluetooth,"+ble_mac_address);
            }
        }catch(Exception e){
           
            callbackContext.error( "连接错误："+e.getMessage().toString());
        }
        callbackContext.success("连接成功");
    }

    private void printBarCode(String bar_code,String offset,String xDpi,String hDpi,String h, CallbackContext callbackContext) {
        // HPRTPrinterHelper HPRTPrinter=new HPRTPrinterHelper(Context,PrinterName);
        try{
            HPRTPrinterHelper.printAreaSize(offset,xDpi,hDpi,h,"1");
            HPRTPrinterHelper.Expanded("0","0",getPictureString(bar_code));
            HPRTPrinterHelper.Form();
            HPRTPrinterHelper.Print();
            // HPRTPrinterHelper.PageWidth(500);
            // HPRTPrinterHelper.Align(HPRTPrinterHelper.CENTER);
            // HPRTPrinterHelper.Barcode(HPRTPrinterHelper.BARCODE,HPRTPrinterHelper.code93,"1","1","150","0","0",true,"7","0","5",bar_code);
            // HPRTPrinterHelper.Form();
 
           HPRTPrinterHelper.Print();

        }catch(Exception e){
            callbackContext.error("打印错误："+ e.getMessage().toString());
        }  
        callbackContext.success("调用打印条形码结束！");
    }


    private void close(CallbackContext callbackContext) {
        // HPRTPrinterHelper HPRTPrinter=new HPRTPrinterHelper(Context,PrinterName);
        try{
            HPRTPrinterHelper.PortClose();
        }catch(Exception e){
            callbackContext.success("关闭错误："+ e.getMessage().toString());
        }  
        callbackContext.success("连接已关闭");
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
