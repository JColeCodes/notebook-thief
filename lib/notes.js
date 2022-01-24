const fs = require('fs');
const path = require('path');

function createNote(body, notesArray) {
    const note = body;
    notesArray.unshift(note);

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );

    return note;
}

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

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

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
    validateNote,
    getDateId
};