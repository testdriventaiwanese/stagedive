export default function (state = { comments: [], posterInfo: [] }, action) {
  switch (action.type) {
    case 'GET_EVENT_COMMENTS':
    console.log('GET EVENT COMMENTS ACTION: ', action)
      return action.payload.data.length === 0 ? { comments: [], posterInfo: [] } : action.payload.data;
    case 'ADD_EVENT_COMMENT':
      console.log('ACTION IN ADD COMMENT: ', action.payload);
      const newComments = state.comments.slice();
      let newPosterInfo = state.posterInfo.slice();
      let commentObj = action.payload.data.comment;
      commentObj.fullname = action.payload.data.posterInfo.fullname;
      newComments.push(commentObj);
      newPosterInfo.push(action.payload.data.posterInfo);
      console.log('STATE IN ADD COMMENT: ', state);
      return { comments: newComments, posterInfo: newPosterInfo };
    case 'REMOVE_EVENT_COMMENT':
      console.log('ACTION IN REMOVE COMMENT: ', action.payload);
      const commentId = action.payload.commentId;
      console.log('STATE IN REMOVE COMMENT: ', state);
      let newComments2 = state.comments.filter((comment) => {
        return comment.id !== commentId;
      })
      return { comments: newComments2, posterInfo: state.posterInfo };
    default:
      return state;
  }
}
