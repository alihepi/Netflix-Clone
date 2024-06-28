const mongoose = require("mongoose");
const Admin = mongoose.model("admin");

const createResponse = (res, status, content) => {
  res.status(status).json(content);
};

const getAdmin = async (req, res, callback) => {
  try {
    if (req.auth && req.auth.nickname) {
      const admin = await Admin.findOne({ nickname: req.auth.nickname });
      if (admin) {
        callback(req, res, admin.name);
      } else {
        createResponse(res, 404, { status: "Admin Bulunamadı" });
      }
    } else {
      createResponse(res, 400, { status: "Token Girilmedi" });
    }
  } catch (error) {
    createResponse(res, 500, { status: "Internal Server Error" });
  }
}

const adminInf = async (req, res) => {
  try {
    await getAdmin(req, res, async (req, res, adminName) => {
      const adminId = req.params.adminid;
      const admin = await Admin.findById(adminId, 'name nickname _id');

      if (!admin) {
        createResponse(res, 404, { status: "Admin bulunamadı." });
      } else {
        createResponse(res, 200, admin); 
      }
    });
  } catch (error) {
    createResponse(res, 500, { status: "Admin bilgileri getirilirken bir hata oluştu." });
  }
};

const updateAdmin = async (req, res) => {
  try {
    await getAdmin(req, res, async (req, res, adminName) => {
      const adminId = req.params.adminid;
      const updateObject = {};

      if (req.body.nickname) {
        const newNickname = req.body.nickname;

        if (newNickname !== adminName) {
          const existingAdmin = await Admin.findOne({ nickname: newNickname });
          if (existingAdmin) {
            return createResponse(res, 400, { status: "Bu nickname'e sahip bir hesap zaten var." });
          }
        }
        updateObject.nickname = newNickname;
      }
      if (req.body.name) {
        updateObject.name = req.body.name;
      }
      if (req.body.password) {
        const admin = await Admin.findById(adminId);
        admin.setPassword(req.body.password);
        await admin.save();
      }

      const updatedAdmin = await Admin.findByIdAndUpdate(adminId, updateObject, { new: true });
      if (!updatedAdmin) {
        return createResponse(res, 404, { status: "Güncellenecek admin bulunamadı." });
      }

      createResponse(res, 200, updatedAdmin);
    });
  } catch (error) {
    createResponse(res, 400, { status: "Admin güncellenirken bir hata oluştu." });
  }
};


const deleteAdmin = async (req, res) => {
  try {
    await getAdmin(req, res, async (req, res, adminName) => {
      console.log("Silinecek Admin ID:", req.params.adminid);
      const deletedAdmin = await Admin.findByIdAndDelete(req.params.adminid);
      if (!deletedAdmin) {
        return createResponse(res, 404, { status: "Silinecek admin bulunamadı." });
      }
      createResponse(res, 200, { status: "Admin başarıyla silindi." });
    });
  } catch (error) {
    createResponse(res, 400, { status: "Admin silinirken bir hata oluştu." });
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({}, 'name nickname');
    createResponse(res, 200, admins);
  } catch (error) {
    console.error('Error fetching admins:', error);
    createResponse(res, 500, { status: "Adminler listelenirken bir hata oluştu." });
  }
};


module.exports = {
  adminInf,
  updateAdmin,
  deleteAdmin,
  getAllAdmins
};
