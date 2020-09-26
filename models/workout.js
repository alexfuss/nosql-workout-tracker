// Require mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Add schema for workout data
const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [{
    type: {
      type: String,
      trim: true,
      required: 'exercise field cannot be blank.'
    },
    name: {
      type: String,
      required: 'enter a name for exercise.'
    },
    duration: {
      type: Number
    },
    weight: {
      type: Number
    },
    reps: {
      type: Number
    },
    sets: {
      type: Number
    },
    distance: {
      type: Number
      }
    }
  ]
},
{
    toJSON: {
      // include any virtual properties when data is requested
      virtuals: true
    }
  }
);

// adds a dynamically-created property to schema
workoutSchema.virtual("totalDuration").get(function() {
    // "reduce" array of exercises down to just the sum of their durations
    return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});

// Use a reduce function to add in the total duration --> Add another property to the model that reduces the exercise durations into the single workout
// Reference custom methods activity

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;