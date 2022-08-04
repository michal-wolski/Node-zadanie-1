//Module import
const fs = require("fs").promises;
const path = require("path");
const buffer = require("buffer");
//Veribles
const contactsPath = path.join(__dirname, "db", "contacts.json");
//CODE
async function getListContacts() {
  try {
    return JSON.parse(await fs.readFile(contactsPath, "utf8"));
  } catch (error) {
    return console.error(error.message);
  }
}
async function listContacts() {
  const data = await getListContacts();
  console.table(data);
}

async function getContactById(contactId) {
  const contacts = await getListContacts();
  const filtredContacts = contacts?.find(({ id }) => id === contactId);
  console.table(filtredContacts);
}
async function removeContact(contactId) {
  const contacts = await getListContacts();
  const filtredContacts = contacts?.filter(({ id }) => id !== contactId);
  console.table(filtredContacts);
}
async function addContact(name, email, phone) {
  const contacts = await getListContacts();
  const newUser = {
    name: name,
    email: email,
    phone: phone,
  };
  contacts.push(newUser);
  newContacts = JSON.stringify(contacts);
  await fs.writeFile(contactsPath, newContacts);
  console.table(contacts);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
