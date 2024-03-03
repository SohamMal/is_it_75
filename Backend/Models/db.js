const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://admin:Soham%4001@cluster0.mtb58px.mongodb.net/attendance_app');

const UserSchema=new mongoose.Schema({
    username:String,
    password:String
});

const SubjectSchema=new mongoose.Schema({
    subject_name:String,
});

const attendancesSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users' 
    },
    subject_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subjects' 
    },
    date: String,
    present: Boolean
});


const Users=mongoose.model('Users', UserSchema);
const Subjects=mongoose.model('Subjects', SubjectSchema);
const AttendanceList=mongoose.model('AttendanceList', attendancesSchema);

module.exports={
    Users,
    Subjects,
    AttendanceList
}