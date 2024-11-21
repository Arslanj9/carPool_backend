const mongoose = require("mongoose");

const PublishSchema = new mongoose.Schema({
  fromLocation: {
    type: String,
    required: true,
  },
  toLocation: {
    type: String,
    required: true,
  },
  departureDate: {
    type: String,
    required: true,
  },
  departureTime: {
    type: String,
    required: true,
  },
  publisherRole: {
    type: String,
    enum: ["host", "commuter"],
    required: true,
  },
  publisherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  hostFields: {
    type: {
      price: {
        type: Number,
        required: function() { return this.publisherRole === "host"; },
      },
      vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle",
        required: function() { return this.publisherRole === "host"; },
      },
      amenities: {
        type: [String],
        default: [],
        required: function() { return this.publisherRole === "host"; },
      },
      totalAvailableSeats: {
        type: Number,
        required: function() { return this.publisherRole === "host"; },
      },
      remainingAvailableSeats: {
        type: Number,
        required: function() { return this.publisherRole === "host"; },
      },
      bookedSeats: [
        {
          gender: {
            type: String,
            enum: ["male", "female"],
            required: true,
          },
          bookedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          bookingDate: {
            type: Date,
            default: Date.now,
            required: true,
          },
          bookingTime: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
          numberOfBookedSeats: {
            type: Number,
            required: true,
          }
        },
      ],
    },
    required: false,
  },
  commuterFields: {
    type: {
      status: {
        type: String,
        enum: ["pending", "booked"],
        required: function() { return this.publisherRole === "commuter"; },
      },
      numberOfRequiredSeats: {
        type: Number,
        required: function() { return this.publisherRole === "commuter"; },
      },
      gender: {
        type: String,
        enum: ["male", "female"],
        required: function() { return this.publisherRole === "commuter"; },
      },
    },
    required: false,
  },
});

module.exports = mongoose.model("Publish", PublishSchema);
