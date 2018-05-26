import Note from '../models/note_model';


export const getNotes = () => {
  return Note.find({}).then((notes) => {
    return notes.reduce((result, item) => {
      result[item.id] = item;
      return result;
    }, {});
  });
};

export const deleteNote = (id) => {
  Note.PostModel.findByIdAndRemove(id)
    .then(() => {
      console.log('Note removed!');
    })
    .catch((error) => {
      console.log(error);
    });
  // to quote Prof. Cormen: left as an exercise to the reader
  // remember to return the mongoose function you use rather than just delete
};

export const createNote = (fields) => {
  const note = new Note();
  note.title = fields.title;
  note.x = fields.x;
  note.y = fields.y;
  note.zIndex = fields.zIndex;
  note.text = fields.text;
  return note.save();
  // you know the drill. create a new Note mongoose object
  // return .save()
};

export const updateNote = (id, fields) => {
  return Note.findById(id)
    .then((note) => {
    // check out this classy way of updating only the fields necessary
      Object.keys(fields).forEach((k) => {
        note[k] = fields[k];
      });
      return note.save();
    });
};
