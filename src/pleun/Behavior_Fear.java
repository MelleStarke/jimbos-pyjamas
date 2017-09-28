package pleun;

import lejos.hardware.motor.Motor;
import lejos.robotics.subsumption.Behavior;

public class Behavior_Fear implements Behavior {
	private boolean suppressed;
	private ColorSensor csLeft;
	private ColorSensor csRight;
	private static final int SPEED = 80;
	
	public Behavior_Fear(ColorSensor csLeft, ColorSensor csRight)
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
			Motor.A.setSpeed( SPEED + csRightSample * 1000 );
			Motor.D.setSpeed( SPEED + csLeftSample * 1000 );

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
