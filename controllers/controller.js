const Admin = require("../models/AdminReferral");
const User = require("../models/Users");
const referralCodeGenerator = require("../utils/referralCodeGenerator");
const pdf = require("html-pdf");
const pdfTemplate = require("../documents");
const fs = require("fs");
const path = require("path")

console.log(path.dirname("/company_test/logicode/file.xls"))

module.exports = {
  async adminReferral(req, res) {
    try {
      const { amount } = req.body;
      if (!amount) {
        return res.json({ statusCode: 400, message: "Bad request" });
      }
      const referralCode = referralCodeGenerator();
      const adminReferral = await Admin.create({ referralCode, amount });
      return res.json({ statusCode: 201, adminReferral });
    } catch (err) {
      return res.json({ statusCode: 500, message: "Server Error" });
    }
  },
  async registerUser(req, res) {
    try {
      const { email, fname, lname, password, referralCode } = req.body;
      if (!email || !password || !fname || !lname) {
        return res.json({ statusCode: 400, message: "Bad request" });
      }
      const check = await User.findOne({ email });
      if (check)
        return res.json({
          statusCode: 401,
          msg: "Bad request Email Already exist :(",
        });
      const empReferralCode = referralCodeGenerator();
      const user = await User.create({
        email,
        fname,
        lname,
        password,
        empReferralCode,
      });

      const adminref = await Admin.find({ referralCode });
      const userRef = await User.find({ empReferralCode: referralCode });
      if (adminref.length !== 0) {
        if (adminref[0].status == "active") {
          await user.updateOne({ earning: adminref[0].amount });
        }
      } else if (userRef.length !== 0) {
        await user.updateOne({ earning: 100 });
        await userRef[0].updateOne({ earning: userRef[0].earning + 200 });
      } else {
        await user.updateOne({ earning: 50 });
      }
      return res.json({ statusCode: 201, message: "User Registered" });
    } catch (err) {
      return res.json({ statusCode: 500, message: "Server Error" });
    }
  },
  async loginUser(req, res) {
    try {
      const user = req.user;
      const accessToken = await user.generateToken();
      return res.json({
        statusCode: 200,
        user,
        accessToken: `JWT ${accessToken}`,
        expiresIn: "12h",
      });
    } catch (err) {
      return res.json({ statusCode: 500, message: "Server Error" });
    }
  },
  async pdfGeneration(req, res) {
    try {
      pdf.create(pdfTemplate(req.body), {}).toFile(`${__dirname}/result.pdf`, (err) => {
        if (err) {
          res.send(Promise.reject());
        }

        res.send(Promise.resolve());
      });
    } catch (err) {
      return res.json({ statusCode: 500, message: "Server Error" });
    }
  },
  async fetchPdf(req, res) {
    try {
          res.sendFile(`${__dirname}/result.pdf`)
    } catch (err) {
      return res.json({ statusCode: 500, message: "Server Error" });
    }
  },
  async excelFile(req, res) {
    try {

      const { fname , lname , email , earning } = req.body
      var writeStream = fs.createWriteStream(`${__dirname}/file.xls`);

      var header = "Sr No" + "\t" + "First Name" + "\t" + "Last Name" +"\t" + "Email" + "\t" + "Earning" + "\n";
      var row = `1  \t${fname}  \t${lname}  \t${email}  \t${earning}`;

      writeStream.write(header);
      writeStream.write(row);

      writeStream.close();
      return res.json({ statusCode: 200, message: "excel" });
    } catch (err) {
      return res.json({ statusCode: 500, message: "Server Error" });
    }
  },

  async fetchexcelFile(req, res) {
    try {
      res.sendFile(`${__dirname}/file.xls`);
    } catch (err) {
      return res.json({ statusCode: 500, message: "Server Error" });
    }
  },
  async commonLogOut(req, res) {
    try {
      const user = req.user;
      await user.updateOne({ accessToken: "" });
      user.save();
      return res
        .status(200)
        .json({ statusCode: 200, message: "LogOut Successfully" });
    } catch (err) {
      return res.status(500).json({ statusCode: 500, message: "Server Error" });
    }
  },
  async getAdminReferrals(req,res){
    try{
        const referrals = await Admin.find({})
        res
        .json({ statusCode: 200, referrals });

    }catch(err){
      return res.status(500).json({ statusCode: 500, message: "Server Error" });
    }
  }
};
