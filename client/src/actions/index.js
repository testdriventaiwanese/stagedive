export function selectEvent(event) {
  // selectBook is an ActionCreator, it needs to return an action,
  // an object with a type property.
  return {
    type: 'EVENT_SELECTED',
    payload: event
  };
}
