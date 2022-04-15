const mongoose = require('mongoose');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = require('graphql');

const Lyric = mongoose.model('lyric');

const LyricType = new GraphQLObjectType({
  name: 'LyricType',
  fields: () => ({
    id: { type: GraphQLID },
    likes: { type: GraphQLInt },
    content: { type: GraphQLString },
    song: {
      type: require('./song_type'),
      resolve(parentValue) {
        return Lyric.findById(parentValue)
          .populate('song')
          .then((lyric) => {
            return lyric.song;
          });
      }
    }
  })
});

module.exports = LyricType;
