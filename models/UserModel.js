const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  userRole: { 
    type: String,
    enum: ["host", "commuter"],
    required: true,
  },
  password: { type: String, required: true },
  profilePic: String,
  contactInfo: Number,
  rating: Number,
  reviews: Number,
  about: String,
  designation: String,      
  department: String,       
  workCity: String,
  vehicles: [
    {
      make: String,
      model: String,
      year: Number,
      licensePlate: String,
      images: [String]
    }
  ]          
});

module.exports = mongoose.model("User", UserSchema);





// Default User Fields

// {
//   "name": "John Doe",
//   "userRole": "commuter",
//   "password": "johnDoePass",
//   "profilePic": "somePicUrl",
//   "contactInfo": 1234567890,
//   "rating": 0,
//   "reviews": 0,
//   "about": "Some info",
//   "designation": "Developer",
//   "department": "IT",
//   "workCity": "New York",
//   "vehicles": [] // Empty array for commuter
// }

