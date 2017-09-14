package braitenberg;

import lejos.*;
import lejos.hardware.motor.Motor;
import lejos.robotics.subsumption.Behavior;

class Behavior_Fear implements Behavior
{  
  private static boolean suppressed;
  private ColorSensor cs1;
  private ColorSensor cs2;
  private final int speed = 100;
  
  public Behavior_Fear(ColorSensor cs1, ColorSensor cs2)
  {
    this.cs1 = cs1;
    this.cs2 = cs2;
  }
  
  
  @Override
  public boolean takeControl()
  {
    //Temporary
    return true;
  }

  @Override
  public void action()
  {
    if (!this.suppressed)
    {
      float cs1sample = cs1.getAmbientSample()[1];
      float cs2sample = cs2.getAmbientSample()[1];
      Motor.A.setSpeed(speed + cs1sample);
      Motor.B.setSpeed(speed + cs2sample);
      
      Motor.A.forward();
      Motor.B.forward();
    }
  }

  @Override
  public void suppress()
  {
    this.suppressed = true;
    Motor.A.stop();
    Motor.B.stop();
  }
  
}

