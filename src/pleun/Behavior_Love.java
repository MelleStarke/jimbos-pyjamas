package pleun;

import lejos.*;
import lejos.hardware.motor.Motor;
import lejos.robotics.subsumption.Behavior;

class Behavior_Love implements Behavior {
	private boolean suppressed;
	private ColorSensor csLeft;
	private ColorSensor csRight;
	private static final int SPEED = 250;
	
	public Behavior_Love(ColorSensor csLeft, ColorSensor csRight)
  {
	suppressed = false;
    this.csLeft = csLeft;
    this.csRight = csRight;
  }

	@Override
	public boolean takeControl() {
		//Temporary
		return true;
	}

	@Override
	public void action() {
		if ( !suppressed ) {
			//A right & D left
			float csLeftSample = csLeft.getAmbientSample()[0];
			float csRightSample = csRight.getAmbientSample()[0];
			Motor.A.setSpeed( SPEED - csRightSample * 900 );
			Motor.D.setSpeed( SPEED - csLeftSample * 900 );

			Motor.A.forward();
			Motor.D.forward();
		}
	}

	@Override
	public void suppress() {
		this.suppressed = true;
		Motor.A.stop();
		Motor.B.stop();
	}

}
