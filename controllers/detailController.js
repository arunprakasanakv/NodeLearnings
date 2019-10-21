var detail = {
    getDetails: async function(req,res){
        res.send("Get User");
    },
    addDetails: async function(req,res){
        res.send("Add User");
    },
    editDetails: async function(req,res){
        res.send("Edit User");
    },
    deleteDetails: async function(req,res){
        res.send("Delete User");
    }
}

module.exports = detail;