import moment from 'moment';

class CommentAdapter {
  constructor(comment) {
    this.id = comment[`id`];
    this.author = comment[`author`];
    this.emotion = comment[`emotion`];
    this.comment = comment[`comment`];
    this.date = Number(moment(comment[`date`]).format(`x`));
  }

  static parseComment(comment) {
    return new CommentAdapter(comment);
  }

  static parseComments(comment) {
    return comment.map(CommentAdapter.parseComment);
  }

  toRAW() {
    return {
      'id': this.id,
      'author': this.author,
      'comment': this.comment,
      'date': this.date,
      'emotion': this.emotion,
    };
  }
}

export default CommentAdapter;
