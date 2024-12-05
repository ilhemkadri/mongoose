const mongoose =require("mongoose");
const dotenv=require("dotenv");
const { name } = require( "pug" );
dotenv.config();

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected!")
    } catch (error) {
        console.log("Not Connected!")
    }
    
}
connectToDatabase()

const personSchema=new mongoose.Schema({
name:{type:String,
    required:true
},
age:Number,
favoriteFoods:[String]
});
const personModel=mongoose.model('Person',personSchema);

async function addUser(user) {
    try {
        const newUser=new personModel(user);
        await newUser.save();
        console.log("User in !")
    } catch (error) {
        console.log("Error"+error);
    }
}
//addUser({name:"Ilhem",age:6,favoriteFoods:["mom's Pizza","Pasta","Kosksi"]});

async function addManyUsers(arr) {
    try {
        await personModel.create(arr);
        console.log("Users Added!");
    } catch (error) {
        console.log("Error"+error);
    }
    
}
//addManyUsers([
  //  {name:"lobna",age:20,favoriteFoods:["slata","ma"]},
   // {name:"samar",age:20,favoriteFoods:["khobz","tben"]},
   // {name:"iheb",age:20,favoriteFoods:["lobiya","rass 3alouch"]}

//])

async function findByName(name) {
    try {
        const users= await personModel.find({name})
        console.log(users)
    } catch (error) {
        console.log(error)
        
    }
}
//findByName("Ilhem")
async function findOneByFood(favfood) {
    try {
        const user=await personModel.findOne({favoriteFoods, favFood});
        console.log(user)
    } catch (error) {
        console.log(error)
    }
}
//findOneByFood(["pizza"]);

async function findById(id) {
    try {
        const user =await personModel.findById(id);
        console.log(user);
    } catch (error) {
        console.log(error);
    }
}
//findById('675187f71b5aab5d33cf23ae');

async function addFood(userID) {
    try {
        const user=await personModel.findById(userID);
        if (user) {
            user.favoriteFoods.push('Hamburger');
            await user.save();
            console.log("Food Added!");
        }
    } catch (error) {
        console.log(error)
    }
    
}
//addFood('675187f71b5aab5d33cf23ae');

async function findPerson(name,age) {
    try {
        const user= await personModel.findOneAndUpdate({name},{age},{new:true});
        console.log(user)
    } catch (error) {
        console.log(error)
    }
}
//findPerson("lobna", 20);

async function deleteById(userID) {
    try {
        const user= await personModel.findByIdAndDelete(userID)
        console.log(user);
    } catch (error) {
        console.log(error);
    }
}
//deleteById('6750c73d899f2adaef5315a8');

async function deleteManyUsers(name) {
    try {
        const res=await personModel.deleteMany({name});
        console.log(res)
    } catch (error) {
        console.log(error);
    }
}
//deleteManyUsers("samar");

async function chained(foodName) {
    try {
        const users= await personModel
        .find({favoriteFoods:{$in:foodName}})
        .limit(2)
        .select({age:0})
        .sort({name:1})
        .exec();
        console.log(users);
    } catch (error) {
        console.log(error);
    }
}
chained("khobz");