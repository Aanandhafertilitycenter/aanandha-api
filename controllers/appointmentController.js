const AppModel = require('../models/AppModel');
const { sendEmail } = require('../mailer/mailer');

const create = async (req, res) => {
  const {
    name,
    email,
    phone = '',
    description = '',
    active = 1,
    created_by = 0,
    modified_by = 0,
    delete: deleted = 0
  } = req.body;

  const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const data = {
    name,
    email,
    phone,
    description,
    active,
    created_by,
    modified_by,
    delete: deleted,
    created: now,
    modified: now
  };

  try {
    const result = await AppModel.insert('appointment_request', data);

    await sendEmail({
      name,
      email,
      phone,
      description
    });

    res.status(201).json({ code: 201, message: 'Appointment created & email sent', id: result.insertId });
  } catch (err) {
    console.error('Insert Error:', err);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
};

module.exports = { create };
