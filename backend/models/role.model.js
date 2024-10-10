const { Schema, model } = require('mongoose');

const roleSchema = Schema({
    role_id: {
        type: Number,
    },
    role_name: {
        type: String,
        required: true,
    },
    permissions: {
        type: [String]
    },
}, {
    timestamps: true
});

const Role = model("Role", roleSchema);
module.exports = Role;
