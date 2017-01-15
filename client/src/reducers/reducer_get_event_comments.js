export default function (state = { comments: [], posterInfo: [] }, action) {
  switch (action.type) {
    case 'GET_EVENT_COMMENTS':
      return !action.payload.data.length === 0 ? { comments: [], posterInfo: [] } : action.payload.data;
    case 'ADD_EVENT_COMMENT':
      const newComments = state.comments.slice();
      let newPosterInfo = state.posterInfo.slice();
      let commentObj = action.payload.data.comment;
      commentObj.fullname = action.payload.data.posterInfo.fullname;
      newComments.push(commentObj);
      newPosterInfo.push(action.payload.data.posterInfo);
      return { comments: newComments, posterInfo: newPosterInfo };
    case 'REMOVE_EVENT_COMMENT':
      const commentId = action.payload.commentId;
      let newComments2 = state.comments.filter((comment) => {
        return comment.id !== commentId;
      })
      return { comments: newComments2, posterInfo: state.posterInfo };
      case 'REFRESH_EVENT_COMMENTS':
        return { comments: [], posterInfo: [] };
    default:
      return state;
  }
}
