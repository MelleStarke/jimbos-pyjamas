package shared_package;

import lejos.hardware.port.SensorPort;
import lejos.hardware.sensor.EV3ColorSensor;
import lejos.hardware.sensor.SensorMode;

public class AmbientSensor {

	private float ratioModifier = 1.0f; // 1 for normal ratio. < 1 for reduced
										// ratio, > 1 for increased ratio

	private SensorMode leftProvider;
	private SensorMode rightProvider;
	private float leftSample[];
	private float rightSample[];

	public AmbientSensor(EV3ColorSensor leftSensor, EV3ColorSensor rightSensor) {
		this.rightProvider = rightSensor.getAmbientMode();
		this.leftProvider = leftSensor.getAmbientMode();
		this.leftSample = new float[this.leftProvider.sampleSize()];
		this.rightSample = new float[this.rightProvider.sampleSize()];
	}

	/**
	 * get ambient lighting rating for the left sensor
	 * 
	 * @return
	 */
	public float getLeftAmbiance() {
		this.leftProvider.fetchSample(leftSample, 0);
		//System.out.println("L: "+leftSample[0]+"\tR: "+rightSample[0]);
		return leftSample[0];
	}

	/**
	 * get ambient lighting rating for the right sensor
	 * 
	 * @return
	 */
	public float getRightAmbiance() {
		this.rightProvider.fetchSample(rightSample, 0);
		return rightSample[0];
	}

	/**
	 * get overall ambient lighting rating
	 * 
	 * @return
	 */
	public float getOverallAmbiance() {
		this.leftProvider.fetchSample(leftSample, 0);
		this.rightProvider.fetchSample(rightSample, 0);
		return (this.leftSample[0] + this.rightSample[0]) / 2;
	}

	/**
	 * returns 1 for equal ratio between left and right sensor, > 1 for higher
	 * light values in the right sensor and < 1 for higher light values in the
	 * left sensor
	 * 
	 * @return
	 */
	public float getRatio() {
		this.leftProvider.fetchSample(leftSample, 0);
		this.rightProvider.fetchSample(rightSample, 0);
		float ratio = this.rightSample[0] / this.leftSample[0];
		return (float) Math.pow(ratio, ratioModifier);

	}

}
