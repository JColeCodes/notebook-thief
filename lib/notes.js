const fs = require('fs');
const path = require('path');

// CREATE NOTE
function createNote(body, notesArray) {
    const note = body;
    notesArray.unshift(note);

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );

    return note;
}

// DELETE NOTE
function deleteNote(paramsId, notesArray) {
    // Find position in array and remove
    for (let i = 0; i < notesArray.length; i++) {
        if (notesArray[i].id === paramsId) {
            notesArray.splice(i, 1);
            break;
        }
    }

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );

    return notesArray;
}

// EDIT NOTE
function editNote(body, paramsId, notesArray) {
    // Remove old message
    for (let i = 0; i < notesArray.length; i++) {
        if (notesArray[i].id === paramsId) {
            notesArray.splice(i, 1);
            break;
        }
    }
    // Add newly edited message to top
    notesArray.unshift(body);

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );

    return notesArray;
}

// VALIDATE
function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

// Get date-time as a string for the id to always keep a fresh id
function getDateId() {
    function formatDateNum(number) {
        return ("0" + String(number)).slice(-2);
    }
    const d = new Date();
    let year = String(d.getFullYear());
    let month = formatDateNum(d.getMonth() + 1);
    let day = formatDateNum(d.getDate());
    let hour = formatDateNum(d.getHours());
    let minute = formatDateNum(d.getMinutes());
    let second = formatDateNum(d.getSeconds());
    
    return year + month + day + "-" + hour + minute + second;
}

module.exports = {
    createNote,
    deleteNote,
    editNote,
    validateNote,
    getDateId
};