const { Schema, model} = require('mongoose');

 const SongSchema = Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    albumName: {
        type: String,
        required: true
    },
    intDuration: {
        type: Number,
    },
    genre: {
        type: String, 
    },
    albumPhoto: {
        type: String,
        required: true
    },
    backgroundPhoto: {
        type: String,  
    },
    isFavourite: {
        type: Boolean, 
    },
    intTotalPlays: {
        type: Number,  
    },
    releseDate: {
        type: String,  
    }
 });

 SongSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
 });

 module.exports = model('Song', SongSchema);