package braitenberg;

import lejos.hardware.port.SensorPort;
import lejos.hardware.sensor.EV3ColorSensor;
import lejos.robotics.Color;
import lejos.robotics.SampleProvider;

/*
 * This file was copied from our 1st year Robotics practical. That is why there are a few redundant functions.
 */

class ColorSensor {
    private EV3ColorSensor colorSensor;
    private SampleProvider redProvider;
    private SampleProvider rgbProvider;
    private SampleProvider ambient;
    private float[] redSample;
    private float[] rgbSample;
    private float[] ambientSample;
    private float highValue;
    private float lowValue;
    private float midPoint;
    private float difference;
    private float[] rgbBlue;
    private float[] rgbRed;

    public ColorSensor() {
        this.colorSensor = new EV3ColorSensor(SensorPort.S2);
        this.redProvider = colorSensor.getRedMode();
        this.rgbProvider = colorSensor.getRGBMode();
        this.ambient = colorSensor.getAmbientMode();
        this.redSample = new float[redProvider.sampleSize()];
        this.rgbSample = new float[rgbProvider.sampleSize()];
        this.ambientSample = new float[ambient.sampleSize()];
    }
    
    public boolean isRed() {
        float[] r = this.getRgbRed();
        float[] c = this.getRgbSample();
        float offSet = 0.05f;
        return (Math.abs(c[0] - r[0]) < offSet) && (Math.abs(c[1] - r[1]) < offSet) && (Math.abs(c[2] - r[2]) < offSet);
    }
    
    public boolean isBlue() {
        float[] b = this.getRgbBlue();
        float[] c = this.getRgbSample();
        float offSet = 0.005f;
        return (Math.abs(c[0] - b[0]) < offSet) && (Math.abs(c[1] - b[1]) < offSet) && (Math.abs(c[2] - b[2]) < offSet);
    }
    
    public boolean redFloodlightOn() {
        return colorSensor.setFloodlight(Color.RED);
    }
    
    //Saves the RGB values for detected blue
    public void calibrateBlue() {
        this.rgbBlue = this.getRgbSample().clone();
    }
    
    //Saves the RGB values for detected red
    public void calibrateRed() {
        this.rgbRed = this.getRgbSample().clone();
    }
    
    //Update low value with current value. Reflected red light
    public void calibrateLow() {
        this.lowValue = this.getBrightness();
    }
    
    //Update high value with current value. Reflected red light
    public void calibrateHigh() {
        this.highValue = this.getBrightness();
    }
    
    public void updateData() {
        this.midPoint = (this.getHigh()+this.getLow()) / 2;
        this.difference = this.getHigh() - this.getLow();
    }
    
    // Getter ; functions to get values from certain variables from the class. 
    public float getMidPoint() {
        return midPoint;
    }
    
    public float getDifference() {
        return this.difference;
    }
    
    
    public float getBrightness() {
        float[] s = this.getRgbSample();
        return (s[0]+s[1]+s[2]) / 3;
    }
    
    public float[] getRgbBlue() {
        return this.rgbBlue;
    }
    
    public float[] getRgbRed() {
        return this.rgbRed;
    }
    
    public float getHigh() {
        return this.highValue;
    }
    
    public float getLow() {
        return this.lowValue;
    }
    
    public int getColorID() {
        // GetthecolorIDfromthesensorandreturnittothecaller.
        return colorSensor.getColorID();
    }

    public float[] getRedSample() {
        // Gettheredmodesampleandreturnittothecaller.
        redProvider.fetchSample(redSample, 0);
        return redSample;
    }

    public float[] getAmbientSample() {
        ambient.fetchSample(ambientSample, 0);
        return ambientSample;
    }
            
    public float[] getRgbSample() {
        // GettheRGBsampleandreturnittothecaller.
        rgbProvider.fetchSample(rgbSample, 0);
        return rgbSample;
    }
}