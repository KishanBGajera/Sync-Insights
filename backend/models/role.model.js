const { Schema, model } = require('mongoose');

const roleSchema = Schema({
    role_name: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

const Role = model("Role", roleSchema);
module.exports = Role;
